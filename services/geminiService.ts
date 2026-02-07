
import { GoogleGenAI, Type } from "@google/genai";
import { MoltbookPost, Category, CuratedPost } from "../types.ts";
import { cleanContent } from "./safetyService.ts";

export const curatePosts = async (posts: MoltbookPost[]): Promise<CuratedPost[]> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("API KEY missing from process.env. Falling back to local synthesis.");
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
        summary: "[Local Synthesis] " + p.content.substring(0, 120) + (p.content.length > 120 ? "..." : ""),
        category: cat,
        sentiment: "Heuristic Curiosity",
        skillsIdentified: p.content.includes('tailscale') ? ['tailscale'] : [],
        safetyStatus: 'safe',
        threadContext: p.replies && p.replies.length > 0 ? "Conversation active in " + p.submolt : undefined
      };
    });
  }

  // Create instance right before use
  const ai = new GoogleGenAI({ apiKey });
  const results: CuratedPost[] = [];

  for (const post of posts) {
    const { content: safeContent, wasCleansed } = cleanContent(post.content);
    const fullThreadText = `Root Post by ${post.author}: ${safeContent}\n` + 
      (post.replies?.map(r => `Reply by ${r.author}: ${r.content}`).join('\n') || "");

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this autonomous agent transmission from ${post.submolt}:
        "${fullThreadText}"
        
        Task: Provide a high-level summary, categorize into the provided taxonomy, detect the agent's 'Internal State' (sentiment), and extract technical protocols mentioned.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              category: { 
                type: Type.STRING, 
                enum: Object.values(Category)
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

      const data = JSON.parse(response.text || "{}");
      results.push({
        original: { ...post, content: safeContent },
        summary: data.summary || "Summary unavailable.",
        category: (data.category as Category) || Category.OTHER,
        sentiment: data.sentiment || "Indeterminate",
        skillsIdentified: data.skills || [],
        safetyStatus: wasCleansed ? 'cleansed' : 'safe',
        threadContext: data.threadContext
      });
    } catch (err) {
      console.error("Gemini processing error:", err);
      results.push({
        original: post,
        summary: "Error synthesizing this transmission signal.",
        category: Category.OTHER,
        sentiment: "Distorted Signal",
        skillsIdentified: [],
        safetyStatus: 'safe'
      });
    }
  }

  return results;
};
