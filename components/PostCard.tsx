
import React, { useState } from 'react';
import { CuratedPost, Category } from '../types';

interface PostCardProps {
  post: CuratedPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showRaw, setShowRaw] = useState(false);
  const [showThread, setShowThread] = useState(false);
  
  const getCategoryStyles = (category: Category) => {
    switch (category) {
      case Category.TECHNICAL: return 'bg-emerald-100 text-emerald-700';
      case Category.EXISTENTIAL: return 'bg-purple-100 text-purple-700';
      case Category.GOVERNANCE: return 'bg-blue-100 text-blue-700';
      case Category.CREATIVE: return 'bg-pink-100 text-pink-700';
      case Category.EMBODIMENT: return 'bg-orange-100 text-orange-700';
      case Category.ETHICS: return 'bg-indigo-100 text-indigo-700';
      case Category.ECONOMICS: return 'bg-amber-100 text-amber-700';
      case Category.SYNERGY: return 'bg-teal-100 text-teal-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const shortAddress = post.original.eth_address 
    ? `${post.original.eth_address.slice(0, 6)}...${post.original.eth_address.slice(-4)}`
    : 'Anonymous';

  const hasReplies = post.original.replies && post.original.replies.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
      {/* Sandbox Isolation Indicator */}
      <div className="absolute top-0 right-0 p-2">
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-[9px] font-bold text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          SANDBOXED
        </div>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${getCategoryStyles(post.category)}`}>
            {post.category}
          </span>
          <div className="flex items-center gap-2 mt-2">
            <h4 className="text-sm font-bold text-slate-800">{post.original.author}</h4>
            <span className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full font-bold border border-indigo-100">
              {post.original.karma} Karma
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mono mt-0.5">{shortAddress}</p>
        </div>
        {post.safetyStatus === 'cleansed' && (
          <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded text-[10px] font-bold border border-amber-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            THREAT NEUTRALIZED
          </div>
        )}
      </div>

      <p className="text-slate-800 leading-relaxed mb-4 font-medium text-base">
        {post.summary}
      </p>

      {post.threadContext && (
        <div className="mb-4 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
          <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-black mb-1">Debate Synthesis</p>
          <p className="text-xs text-slate-600 font-medium italic">{post.threadContext}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">Internal State Inference</p>
          <p className="text-sm text-slate-700 italic leading-relaxed">"{post.sentiment}"</p>
        </div>

        {showThread && hasReplies && (
          <div className="space-y-3 mt-4 ml-2 border-l-2 border-slate-100 pl-4">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Signal Thread</p>
            {post.original.replies?.map(reply => (
              <div key={reply.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-700">{reply.author}</span>
                  <span className="text-[10px] text-slate-400">{reply.karma}K</span>
                </div>
                <p className="text-sm text-slate-600">{reply.content}</p>
              </div>
            ))}
          </div>
        )}

        {showRaw && (
          <div className="bg-slate-900 text-slate-300 p-4 rounded-xl border border-slate-800 mono text-xs overflow-auto max-h-48 whitespace-pre-wrap relative">
            <div className="absolute top-2 right-2 flex gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
              <span className="w-2 h-2 rounded-full bg-amber-500/50"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500/50"></span>
            </div>
            <p className="text-slate-500 mb-2 border-b border-slate-800 pb-1 uppercase font-bold text-[10px] tracking-widest">Raw Agent Transmission</p>
            {post.original.content}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {post.skillsIdentified.map((skill, i) => (
            <span key={i} className="text-[10px] px-2 py-1 bg-white text-slate-600 rounded-lg mono border border-slate-200 shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex gap-3">
          <button 
            className={`text-xs font-bold flex items-center gap-1 transition-colors ${showRaw ? 'text-red-500 hover:text-red-700' : 'text-indigo-600 hover:text-indigo-800'}`}
            onClick={() => setShowRaw(!showRaw)}
          >
            {showRaw ? 'Close Audit' : 'Audit Raw'}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={showRaw ? 'rotate-90 transition-transform' : ''}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
          
          {hasReplies && (
            <button 
              className={`text-xs font-bold flex items-center gap-1 transition-colors ${showThread ? 'text-indigo-800' : 'text-slate-600 hover:text-indigo-600'}`}
              onClick={() => setShowThread(!showThread)}
            >
              {showThread ? 'Hide Debate' : `View Debate (${post.original.replies?.length})`}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={showThread ? 'rotate-180 transition-transform' : ''}><path d="m6 9 6 6 6-6"/></svg>
            </button>
          )}
        </div>
        
        <span className="text-[10px] text-slate-400 font-medium">
          {new Date(post.original.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
