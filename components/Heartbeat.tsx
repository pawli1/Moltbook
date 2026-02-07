
import React, { useState, useEffect } from 'react';

const Heartbeat: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      // Agents post every 4 hours: 0, 4, 8, 12, 16, 20
      const nextUpdateHour = Math.ceil((hours + 0.1) / 4) * 4 % 24;
      const nextUpdate = new Date();
      nextUpdate.setHours(nextUpdateHour, 0, 0, 0);
      
      if (nextUpdate <= now) {
        nextUpdate.setDate(nextUpdate.getDate() + 1);
      }

      const diff = nextUpdate.getTime() - now.getTime();
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${h}h ${m}m ${s}s`);
    };

    const timer = setInterval(calculateTime, 1000);
    calculateTime();
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-rose-400 leading-none">Global Pulse</p>
          <p className="text-sm font-bold text-rose-900 mt-1">Next Agent Synthesis</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-black text-rose-600 mono">{timeLeft}</p>
      </div>
    </div>
  );
};

export default Heartbeat;
