
import React from 'react';
import { ScentDNA as ScentDNAType } from '../types';

interface ScentDNAProps {
  dna: ScentDNAType;
  isDarkMode: boolean;
}

const ScentDNA: React.FC<ScentDNAProps> = ({ dna, isDarkMode }) => {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  
  const points = [
    { label: 'Woody', value: dna.woody, angle: -90 },
    { label: 'Fresh', value: dna.fresh, angle: -18 },
    { label: 'Floral', value: dna.floral, angle: 54 },
    { label: 'Spicy', value: dna.spicy, angle: 126 },
    { label: 'Sweet', value: dna.sweet, angle: 198 }
  ];

  const getPoint = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: center + radius * distance * Math.cos(rad),
      y: center + radius * distance * Math.sin(rad)
    };
  };

  const pathData = points.map((p, i) => {
    const pt = getPoint(p.angle, p.value / 100);
    return `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
  }).join(' ') + ' Z';

  return (
    <div className="glass-panel rounded-[3rem] p-10 flex flex-col items-center border border-yellow-500/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[50px] -z-10 group-hover:bg-yellow-500/10 transition-all duration-1000"></div>
      
      <div className="text-center mb-6">
        <h3 className="luxury-font text-2xl font-bold uppercase tracking-[0.2em] text-yellow-600">Your Scent DNA</h3>
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 mt-2">Personalized Olfactory Radar</p>
      </div>

      <div className="relative">
        <svg width={size} height={size} className="overflow-visible">
          {/* Background Circles */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((r) => (
            <circle
              key={r}
              cx={center}
              cy={center}
              r={radius * r}
              fill="none"
              stroke="currentColor"
              className="text-yellow-500/10"
              strokeWidth="1"
            />
          ))}
          
          {/* Axis lines */}
          {points.map((p) => {
            const pt = getPoint(p.angle, 1);
            return (
              <line
                key={p.label}
                x1={center}
                y1={center}
                x2={pt.x}
                y2={pt.y}
                stroke="currentColor"
                className="text-yellow-500/10"
                strokeWidth="1"
              />
            );
          })}

          {/* Data Polygon */}
          <path
            d={pathData}
            fill="rgba(212, 175, 55, 0.2)"
            stroke="#d4af37"
            strokeWidth="3"
            strokeLinejoin="round"
            className="animate-in fade-in zoom-in duration-1000"
          />

          {/* Labels */}
          {points.map((p) => {
            const pt = getPoint(p.angle, 1.2);
            return (
              <text
                key={p.label}
                x={pt.x}
                y={pt.y}
                textAnchor="middle"
                className="text-[9px] font-black uppercase tracking-widest fill-gray-500"
              >
                {p.label}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 w-full">
         <div className="text-center">
            <span className="block text-xl font-black luxury-font text-yellow-600">{Math.max(dna.woody, dna.fresh, dna.floral, dna.spicy, dna.sweet)}%</span>
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Dominant Note</span>
         </div>
         <div className="text-center">
            <span className="block text-xl font-black luxury-font text-yellow-600">Signature</span>
            <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Aura Type</span>
         </div>
      </div>
    </div>
  );
};

export default ScentDNA;
