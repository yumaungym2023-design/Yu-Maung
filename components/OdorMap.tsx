
import React, { useState } from 'react';

interface OdorMapProps {
  onSelect: (vibe: string) => void;
  activeVibe: string;
}

const OdorMap: React.FC<OdorMapProps> = ({ onSelect, activeVibe }) => {
  const vibes = [
    { name: 'Fresh', angle: 0, color: 'from-blue-400 to-cyan-400' },
    { name: 'Floral', angle: 90, color: 'from-pink-400 to-purple-400' },
    { name: 'Woody', angle: 180, color: 'from-amber-600 to-orange-800' },
    { name: 'Spicy', angle: 270, color: 'from-red-600 to-yellow-600' },
  ];

  return (
    <div className="relative w-64 h-64 mx-auto mb-10 flex items-center justify-center">
      {/* Central Point */}
      <div className="absolute w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.6)] z-10 animate-pulse"></div>
      
      {/* Outer Circle */}
      <div className="absolute inset-0 rounded-full border border-yellow-500/10 animate-spin-slow"></div>
      <div className="absolute inset-8 rounded-full border border-yellow-500/5"></div>

      {vibes.map((v) => {
        const isActive = activeVibe === v.name;
        const radian = (v.angle * Math.PI) / 180;
        const x = Math.cos(radian) * 110;
        const y = Math.sin(radian) * 110;

        return (
          <button
            key={v.name}
            onClick={() => onSelect(v.name)}
            className={`absolute w-20 h-20 rounded-full glass-card border-2 transition-all duration-700 flex items-center justify-center group ${
              isActive 
                ? `border-yellow-500 shadow-2xl scale-125 z-20` 
                : 'border-yellow-500/10 hover:border-yellow-500/50'
            }`}
            style={{ 
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <div className={`absolute inset-1 rounded-full bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-20 transition-opacity ${isActive ? 'opacity-30' : ''}`}></div>
            <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-yellow-500' : 'text-gray-500'}`}>
                {v.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default OdorMap;
