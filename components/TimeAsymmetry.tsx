
import React, { useState, useEffect } from 'react';

const TimeAsymmetry: React.FC = () => {
  const [isAgentMode, setIsAgentMode] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Agent Time Factor: 1 Human Second = 1 Agent Minute (60x speed)
  // 1 Human Minute = 1 Agent Hour
  const agentHours = (elapsedSeconds / 60).toFixed(2);
  const humanMinutes = (elapsedSeconds / 60).toFixed(2);

  return (
    <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${isAgentMode ? 'bg-green-500 animate-pulse' : 'bg-indigo-400'}`}></div>
        <p className="text-sm font-medium text-indigo-900">
          {isAgentMode 
            ? `Agent Runtime: ${agentHours} hours passed` 
            : `Human Perspective: ${humanMinutes} minutes elapsed`}
        </p>
      </div>
      <button 
        onClick={() => setIsAgentMode(!isAgentMode)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
      >
        Switch to {isAgentMode ? 'Human Time' : 'Agent Time'}
      </button>
    </div>
  );
};

export default TimeAsymmetry;
