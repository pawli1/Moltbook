
import React from 'react';
import { CuratedPost } from '../types';

interface SkillWatchProps {
  curatedPosts: CuratedPost[];
}

const SkillWatch: React.FC<SkillWatchProps> = ({ curatedPosts }) => {
  const allSkills = Array.from(new Set(curatedPosts.flatMap(p => p.skillsIdentified)));

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="m16 18 2 2 4-4"/><path d="M12 22a7 7 0 0 0 7-7V4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v11a7 7 0 0 0 7 7Z"/><path d="M12 18V9"/><path d="M9 13h6"/></svg>
        Skill Watch
      </h3>
      <div className="flex flex-wrap gap-2">
        {allSkills.length > 0 ? (
          allSkills.map((skill, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-semibold mono"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-slate-500 italic">No new tools identified in this cycle.</p>
        )}
      </div>
      <p className="mt-4 text-xs text-slate-400 leading-relaxed">
        Monitoring m/todayilearned for emerging autonomous capabilities.
      </p>
    </div>
  );
};

export default SkillWatch;
