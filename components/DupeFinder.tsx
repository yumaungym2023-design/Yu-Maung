
import React, { useState } from 'react';
import { fragranceService } from '../services/geminiService';

interface DupeResult {
  dupeName: string;
  brand: string;
  similarity: string;
  pricePoint: string;
  reason: string;
}

const DupeFinder: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DupeResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedName, setSearchedName] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setSearchedName(query);
    const dupes = await fragranceService.findDupes(query);
    setResults(dupes);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div id="dupe-finder-section" className={`glass-panel rounded-[3rem] p-8 md:p-12 mb-16 shadow-2xl shadow-yellow-900/5 transition-all duration-700`}>
      <div className="text-center mb-10">
        <h3 className={`luxury-font text-3xl md:text-4xl font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Scent <span className="gold-text-gradient">Dupe</span> Finder
        </h3>
        <div className="flex items-center justify-center space-x-4 mt-3">
            <div className="h-px w-8 bg-yellow-500/30"></div>
            <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-yellow-500/60' : 'text-yellow-700/60'}`}>
              High-end scents at affordable prices
            </p>
            <div className="h-px w-8 bg-yellow-500/30"></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 mb-14">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="ဥပမာ- Creed Aventus, BR 540..."
          className={`flex-1 px-6 py-5 rounded-[1.5rem] glass-card border focus:outline-none transition-all text-sm font-medium ${
            isDarkMode 
              ? 'text-white border-yellow-900/20 focus:border-yellow-500/50' 
              : 'text-gray-900 border-gray-100 focus:border-yellow-400'
          }`}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className={`px-10 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-3 group relative overflow-hidden ${
            isDarkMode ? 'bg-yellow-600 text-white hover:bg-yellow-500' : 'bg-gray-900 text-white hover:bg-black'
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Find Alternatives</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </>
          )}
        </button>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-yellow-500/10"></div>
            <div className="absolute inset-0 rounded-full border-t-4 border-yellow-500 animate-spin"></div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 animate-pulse">Scanning Global Heritage...</p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="flex items-center justify-between mb-8 px-4">
                <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Heritage Match for: <span className="text-yellow-500 italic">{searchedName}</span>
                </h4>
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item, idx) => (
              <div 
                key={idx}
                className={`p-8 rounded-[2rem] glass-card border transition-all hover:translate-y-[-8px] hover:shadow-2xl group ${
                  isDarkMode 
                    ? 'border-yellow-900/10 hover:border-yellow-500/30' 
                    : 'border-gray-100 hover:border-yellow-300'
                }`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    isDarkMode ? 'bg-yellow-900/40 text-yellow-400' : 'bg-yellow-100/50 text-yellow-700'
                  }`}>
                    {item.similarity} Match
                  </div>
                  <span className={`text-[10px] font-black tracking-widest uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {item.pricePoint}
                  </span>
                </div>
                <h5 className={`font-bold luxury-font text-xl mb-1 group-hover:text-yellow-500 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.dupeName}
                </h5>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-600 mb-6">
                  {item.brand}
                </p>
                <p className={`text-[11px] leading-loose italic ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  "{item.reason}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && results.length === 0 && searchedName && (
        <div className="text-center py-20 glass-card rounded-3xl border-dashed border-2 border-yellow-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-yellow-500/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">တောင်းပန်ပါတယ်၊ အဆိုပါရေမွှေးအတွက် <br/> Dupe ရှာမတွေ့သေးပါ။</p>
        </div>
      )}
    </div>
  );
};

export default DupeFinder;
