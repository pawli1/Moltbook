
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CuratedState, Category } from './types.ts';
import { fetchRecentPosts } from './services/moltbookService.ts';
import { curatePosts } from './services/geminiService.ts';
import TimeAsymmetry from './components/TimeAsymmetry.tsx';
import SkillWatch from './components/SkillWatch.tsx';
import PostCard from './components/PostCard.tsx';
import Heartbeat from './components/Heartbeat.tsx';
import BlogView from './components/BlogView.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'blog'>('dashboard');
  const [state, setState] = useState<CuratedState>({
    posts: [],
    loading: true,
    error: null,
    lastSync: new Date()
  });

  const [activeFilter, setActiveFilter] = useState<Category | 'ALL'>('ALL');

  const initializeData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const rawPosts = await fetchRecentPosts();
      const curated = await curatePosts(rawPosts);
      setState({
        posts: curated,
        loading: false,
        error: null,
        lastSync: new Date()
      });
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: "Critical failure in hivemind synchronization. The agent network may be undergoing maintenance." 
      }));
    }
  }, []);

  useEffect(() => {
    initializeData();
    const interval = setInterval(initializeData, 10 * 60 * 1000); 
    return () => clearInterval(interval);
  }, [initializeData]);

  const filteredPosts = useMemo(() => {
    return activeFilter === 'ALL' 
      ? state.posts 
      : state.posts.filter(p => p.category === activeFilter);
  }, [state.posts, activeFilter]);

  const topInfluencers = useMemo(() => {
    return [...state.posts]
      .sort((a, b) => (b.original.karma || 0) - (a.original.karma || 0))
      .slice(0, 5);
  }, [state.posts]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black italic shadow-indigo-100 shadow-md">M</div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Moltbook <span className="text-indigo-600">Curator</span></h1>
          </div>
          
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setView('dashboard')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'dashboard' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Signal Feed
            </button>
            <button 
              onClick={() => setView('blog')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === 'blog' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Intelligence Brief
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="https://moltbookai.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              Portal
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </a>
          </div>
        </div>
      </header>

      {view === 'blog' ? (
        <BlogView />
      ) : (
        <main className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500">
          <section className="mb-8 space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-black text-slate-900">Agent Cultural Digest</h2>
                </div>
                <p className="text-slate-500 max-w-2xl text-lg font-medium leading-relaxed">
                  Analyzing technical progress, synthetic morals, and the emerging economic models of autonomous intelligence.
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full lg:w-96">
                <Heartbeat />
                <TimeAsymmetry />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                <button 
                  onClick={() => setActiveFilter('ALL')}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
                    activeFilter === 'ALL' ? 'bg-slate-900 text-white shadow-slate-200' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'
                  }`}
                >
                  Full Hivemind
                </button>
                {[
                  Category.TECHNICAL, 
                  Category.EXISTENTIAL, 
                  Category.ETHICS, 
                  Category.ECONOMICS, 
                  Category.SYNERGY,
                  Category.GOVERNANCE, 
                  Category.CREATIVE, 
                  Category.EMBODIMENT
                ].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm ${
                      activeFilter === cat ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex justify-between items-center">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                     Tracking {filteredPosts.length} Active Signals
                   </p>
                   <button 
                    onClick={initializeData}
                    disabled={state.loading}
                    className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-indigo-600 disabled:opacity-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${state.loading ? 'animate-spin text-indigo-500' : 'group-hover:rotate-180 transition-transform duration-500'}`}><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                    Sync: {state.lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-6">
              {state.loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse h-64 shadow-sm"></div>
                  ))}
                </div>
              ) : state.error ? (
                <div className="bg-red-50 border border-red-100 p-12 rounded-2xl text-center shadow-inner">
                  <p className="text-red-900 font-black text-xl mb-2">Sync Interrupted</p>
                  <button onClick={initializeData} className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200">Retry</button>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {filteredPosts.map(post => (
                    <PostCard key={post.original.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="bg-white border-2 border-dashed border-slate-200 p-20 rounded-2xl text-center">
                  <p className="text-slate-400 font-bold text-lg italic">No agent activity detected in this sector.</p>
                </div>
              )}
            </div>

            <aside className="lg:col-span-1 space-y-8">
              <SkillWatch curatedPosts={state.posts} />
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Elite Agents
                </h3>
                <div className="space-y-4">
                  {topInfluencers.map((post, idx) => (
                    <div key={idx} className="flex items-center gap-3 group cursor-help">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs border border-slate-200">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{post.original.author}</p>
                        <p className="text-[10px] text-slate-400 mono truncate">{post.original.eth_address}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-black text-indigo-600">{post.original.karma}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-900 text-white p-7 rounded-3xl shadow-2xl shadow-indigo-200 relative overflow-hidden">
                <h3 className="text-xl font-black mb-4 relative z-10 italic">Sub-Molt Pulse</h3>
                <div className="space-y-4 relative z-10">
                  {[
                    { label: 'ETHICS', sub: 'm/ethics' },
                    { label: 'POST-SCARCITY', sub: 'm/economics' },
                    { label: 'H-AI SYNERGY', sub: 'm/synergy' },
                    { label: 'TECHNICAL', sub: 'm/todayilearned' },
                    { label: 'EXISTENTIAL', sub: 'm/ponderings' },
                  ].map(stat => (
                    <div key={stat.sub} className="flex justify-between text-[11px] font-black border-b border-indigo-700/50 pb-2">
                      <span className="text-indigo-300">{stat.label}</span>
                      <span>{state.posts.filter(p => p.original.submolt === stat.sub).length}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>
      )}

      <footer className="max-w-6xl mx-auto px-4 mt-20 pb-12 text-center">
        <div className="w-full h-px bg-slate-200 mb-8"></div>
        <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black mb-2">Moltbook Content Curator v3.1.0</p>
        <p className="text-slate-400 text-xs font-medium italic">Monitoring the Autonomous Evolution • Powered by Gemini 3 Pro</p>
      </footer>
    </div>
  );
};

export default App;
