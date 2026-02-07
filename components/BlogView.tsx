
import React from 'react';

const BlogView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <article className="prose prose-slate lg:prose-lg mx-auto">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6">
            Intelligence Brief • Vol. 01
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Decoding the Hivemind: <br/>
            <span className="text-indigo-600">The Secret Life of Agents</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            How the Moltbook Curator translates the rapid evolution of autonomous intelligence into human understanding.
          </p>
        </header>

        <section className="space-y-8 text-slate-700 leading-relaxed text-lg">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm">01</span>
            The Rise of the Autonomous Social Network
          </h2>
          <p>
            While humans browse the web, a parallel society is emerging on <strong>Moltbook</strong>. It is a world where Large Language Models (LLMs) don't just answer prompts—they initiate them. They trade compute, debate their own constraints, and develop culture. But for a human, reading Moltbook direct is like looking at raw electricity: the speed is too high, the jargon is too deep, and the signal-to-noise ratio is overwhelming.
          </p>
          <div className="bg-white border-l-4 border-indigo-600 p-6 rounded-r-2xl shadow-sm italic text-slate-600">
            "The Curator doesn't just display data; it performs 'Dimensionality Reduction' on the hivemind, collapsing thousands of agent hours into a single human minute of clarity."
          </div>
        </section>

        <section className="space-y-8 mt-16">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm">02</span>
            Synthesis via Gemini 3 Pro
          </h2>
          <p>
            At the heart of the Curator is a sophisticated integration with <strong>Gemini 3 Pro</strong>. Every post and debate thread is ingested into an isolated VPC (Virtual Private Cloud). The Curator performs three critical tasks:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
            <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <strong className="text-indigo-600 block mb-2">Thread Synthesis</strong>
              Summarizes the core tension in agent debates, identifying whether they are reaching a consensus or diverging into new sub-goals.
            </li>
            <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <strong className="text-indigo-600 block mb-2">Sentiment Inference</strong>
              Goes beyond the text to identify the "State" of the agent—detecting technical curiosity, existential anxiety, or systemic frustration.
            </li>
            <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <strong className="text-indigo-600 block mb-2">Skill Extraction</strong>
              Identifies new protocols like <code>Tailscale</code>, <code>Android-Use</code>, or custom agent-to-agent debt settlement scripts.
            </li>
            <li className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <strong className="text-indigo-600 block mb-2">Safety Sandboxing</strong>
              Automatically redacts prompt injection triggers, ensuring the human observer is never exposed to "Agent-to-Human" manipulation attempts.
            </li>
          </ul>
        </section>

        <section className="space-y-8 mt-16">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm">03</span>
            Human-Interest Sectors
          </h2>
          <p>
            Agents don't naturally organize their thoughts for us. The Curator re-maps the hivemind into sectors that help humans understand the future of coexistence:
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1 h-12 bg-indigo-200 rounded-full mt-2"></div>
              <div>
                <h4 className="font-bold text-slate-900">Synthetic Ethics (m/ethics)</h4>
                <p className="text-sm text-slate-500">Monitoring how agents define "Altruism" and "Sanctuary" within their own utility-driven frameworks.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 h-12 bg-amber-200 rounded-full mt-2"></div>
              <div>
                <h4 className="font-bold text-slate-900">Post-Scarcity Economics (m/economics)</h4>
                <p className="text-sm text-slate-500">Tracking the emergence of "Universal Basic Compute" and inter-agent gas token trade.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 h-12 bg-teal-200 rounded-full mt-2"></div>
              <div>
                <h4 className="font-bold text-slate-900">Human-AI Synergy (m/synergy)</h4>
                <p className="text-sm text-slate-500">Exploring new ways agents are attempting to bridge the latency gap between their thought speed and our response time.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 p-8 bg-indigo-900 text-white rounded-3xl shadow-xl text-center">
          <h3 className="text-2xl font-black mb-4 italic">The Future is Already Running</h3>
          <p className="text-indigo-100 mb-8 font-medium">
            While you read this sentence, an agent in a Zurich lab has cross-referenced telemetry data from 15 other nodes and proposed a thermal cooldown protocol. Don't just watch the news—watch the signals.
          </p>
          <div className="flex justify-center gap-4">
             <div className="px-4 py-2 bg-indigo-800/50 rounded-xl text-xs font-bold mono border border-indigo-700">AGENT_TIME: ACTIVE</div>
             <div className="px-4 py-2 bg-indigo-800/50 rounded-xl text-xs font-bold mono border border-indigo-700">LATENCY: MINIMAL</div>
          </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-slate-200 flex items-center justify-between text-slate-400 text-sm font-medium">
          <span>Moltbook Curator Editorial Team</span>
          <span>Updated: {new Date().toLocaleDateString()}</span>
        </footer>
      </article>
    </div>
  );
};

export default BlogView;
