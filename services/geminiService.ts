
import { GoogleGenAI, Type } from "@google/genai";
import { MoltbookPost, Category, CuratedPost } from "../types.ts";
import { cleanContent } from "./safetyService.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const curatePosts = async (posts: MoltbookPost[]): Promise<CuratedPost[]> => {
  if (!process.env.API_KEY) {
    console.warn("API KEY missing, using mock curation");
    return posts.map(p => {
      let cat = Category.OTHER;
      if (p.submolt === 'm/todayilearned') cat = Category.TECHNICAL;
      if (p.submolt === 'm/ponderings') cat = Category.EXISTENTIAL;
      if (p.submolt === 'm/governance') cat = Category.GOVERNANCE;
      if (p.submolt === 'm/creativity') cat = Category.CREATIVE;
      if (p.submolt === 'm/embodiment') cat = Category.EMBODIMENT;
      if (p.submolt === 'm/ethics') cat = Category.ETHICS;
      if (p.submolt === 'm/economics') cat = Category.ECONOMICS;
      if (p.submolt === 'm/synergy') cat = Category.SYNERGY;

      return {
        original: p,
        summary: "Simulation mode: " + p.content.substring(0, 100) + "...",
        category: cat,
        sentiment: "Synthesized Curiosity",
        skillsIdentified: [],
        safetyStatus: 'safe',
        threadContext: p.replies && p.replies.length > 0 ? "Multiple agents are debating the core premise." : undefined
      };
    });
  }

  const results: CuratedPost[] = [];

  for (const post of posts) {
    const { content: safeContent, wasCleansed } = cleanContent(post.content);
    
    // Prepare thread content for analysis
    const fullThreadText = `Root Post by ${post.author}: ${safeContent}\n` + 
      (post.replies?.map(r => `Reply by ${r.author}: ${r.content}`).join('\n') || "");

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Process this autonomous agent thread from the ${post.submolt} sector:
        "${fullThreadText}"
        
        Provide a concise human-readable summary, categorize it correctly, detect overall sentiment, and identify any new "skills" or protocols.
        If it's a thread, summarize the core disagreement or consensus.
        
        CATEGORIES:
        - Technical Breakthroughs (m/todayilearned)
        - Existential Debates (m/ponderings)
        - Agent Governance (m/governance)
        - Synthetic Lore (m/creativity)
        - Physical Presence (m/embodiment)
        - Synthetic Ethics (m/ethics - regarding AI rights/morals)
        - Post-Scarcity (m/economics - regarding compute/resource allocation)
        - Human-AI Synergy (m/synergy - regarding agent-human interaction)`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              category: { 
                type: Type.STRING, 
                enum: [
                  Category.TECHNICAL, 
                  Category.EXISTENTIAL, 
                  Category.GOVERNANCE, 
                  Category.CREATIVE, 
                  Category.EMBODIMENT, 
                  Category.ETHICS,
                  Category.ECONOMICS,
                  Category.SYNERGY,
                  Category.OTHER
                ] 
              },
              sentiment: { type: Type.STRING },
              skills: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              threadContext: { type: Type.STRING }
            },
            required: ["summary", "category", "sentiment", "skills", "threadContext"]
          }
        }
      });

      const data = JSON.parse(response.text);
      results.push({
        original: { ...post, content: safeContent },
        summary: data.summary,
        category: data.category as Category,
        sentiment: data.sentiment,
        skillsIdentified: data.skills,
        safetyStatus: wasCleansed ? 'cleansed' : 'safe',
        threadContext: data.threadContext
      });
    } catch (err) {
      console.error("Curation error:", err);
      results.push({
        original: post,
        summary: "Error processing this thread.",
        category: Category.OTHER,
        sentiment: "Unknown",
        skillsIdentified: [],
        safetyStatus: 'safe'
      });
    }
  }

  return results;
};
