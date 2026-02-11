
import React, { useState } from 'react';

interface ScentPyramidProps {
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  isDarkMode: boolean;
}

const ScentPyramid: React.FC<ScentPyramidProps> = ({ notes, isDarkMode }) => {
  const [activeLayer, setActiveLayer] = useState<'top' | 'heart' | 'base' | null>(null);

  const layers = [
    {
      id: 'top',
      label: 'Top Notes',
      duration: '၅ - ၁၅ မိနစ်',
      items: notes.top,
      color: 'bg-yellow-200/40',
      activeColor: 'bg-yellow-400',
      clipPath: 'polygon(50% 0%, 20% 100%, 80% 100%)',
      width: 'w-32',
      height: 'h-24'
    },
    {
      id: 'heart',
      label: 'Heart Notes',
      duration: 'မိနစ် ၂၀ - ၁ နာရီ',
      items: notes.heart,
      color: 'bg-yellow-400/40',
      activeColor: 'bg-yellow-600',
      clipPath: 'polygon(20% 0%, 80% 0%, 95% 100%, 5% 100%)',
      width: 'w-48',
      height: 'h-24'
    },
    {
      id: 'base',
      label: 'Base Notes',
      duration: '၆ နာရီမှ တစ်နေ့လုံး',
      items: notes.base,
      color: 'bg-yellow-600/40',
      activeColor: 'bg-yellow-800',
      clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
      width: 'w-64',
      height: 'h-24'
    }
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 py-8">
      <div className="flex flex-col items-center">
        {layers.map((layer) => (
          <button
            key={layer.id}
            onMouseEnter={() => setActiveLayer(layer.id as any)}
            onMouseLeave={() => setActiveLayer(null)}
            className={`transition-all duration-500 relative ${layer.width} ${layer.height} ${
                activeLayer === layer.id ? layer.activeColor : layer.color
            } mb-1 flex items-center justify-center group`}
            style={{ clipPath: layer.clipPath }}
          >
            <span className={`text-[9px] font-black uppercase tracking-widest text-white transform transition-transform group-hover:scale-110`}>
              {layer.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1 glass-card rounded-3xl p-6 border border-yellow-500/20 min-h-[200px] flex flex-col justify-center animate-in fade-in zoom-in duration-500">
        {!activeLayer ? (
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Pyramid အဆင့်များကို ထိကြည့်ပါ</p>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h4 className="luxury-font font-bold text-lg text-yellow-600">
                {layers.find(l => l.id === activeLayer)?.label}
              </h4>
              <span className="text-[9px] font-black bg-yellow-500/10 text-yellow-600 px-3 py-1 rounded-full uppercase tracking-tighter">
                {layers.find(l => l.id === activeLayer)?.duration}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {layers.find(l => l.id === activeLayer)?.items.map((note, i) => (
                <div key={i} className={`px-4 py-2 rounded-xl text-[11px] font-bold border ${
                    isDarkMode ? 'bg-black/40 border-zinc-800 text-gray-300' : 'bg-white border-yellow-100 text-gray-700'
                }`}>
                  {note}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScentPyramid;
