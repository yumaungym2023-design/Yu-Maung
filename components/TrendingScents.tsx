
import React from 'react';

const TrendingScents: React.FC<{ isDarkMode: boolean, onSelect: (q: string) => void }> = ({ isDarkMode, onSelect }) => {
  const trending = [
    { name: "Sauvage", brand: "Dior", tag: "Most Popular" },
    { name: "Club de Nuit Intense", brand: "Armaf", tag: "Best Seller" },
    { name: "Y EDP", brand: "YSL", tag: "Crowd Pleaser" },
    { name: "Versace Eros", brand: "Versace", tag: "Clubbing" },
    { name: "Aventus", brand: "Creed", tag: "The King" },
    { name: "Asad", brand: "Lattafa", tag: "Top Dupe" }
  ];

  return (
    <div className="relative group">
      <div className="flex overflow-x-auto space-x-6 pb-10 scrollbar-none px-4 snap-x">
        {trending.map((scent, i) => (
          <div 
            key={i} 
            onClick={() => onSelect(`${scent.name} ရေမွှေးအကြောင်း သိချင်ပါတယ်`)}
            className={`flex-none w-72 snap-start p-8 rounded-[2.5rem] glass-card border border-yellow-500/10 cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-yellow-500/40 group/card`}
          >
            <div className="flex justify-between items-start mb-10">
              <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${isDarkMode ? 'bg-yellow-900/40 text-yellow-400' : 'bg-yellow-100 text-yellow-700'}`}>
                {scent.tag}
              </span>
              <div className="w-8 h-8 rounded-full border border-yellow-500/20 flex items-center justify-center group-hover/card:bg-yellow-500 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600 group-hover/card:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                 </svg>
              </div>
            </div>
            <h5 className="luxury-font text-2xl font-black mb-1 group-hover/card:text-yellow-600 transition-colors">{scent.name}</h5>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">{scent.brand}</p>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-[10px] font-bold text-yellow-600/60 uppercase tracking-tighter italic">Milano Recommendation</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 opacity-0 group-hover/card:opacity-100 translate-x-2 group-hover/card:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-10 w-24 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TrendingScents;
