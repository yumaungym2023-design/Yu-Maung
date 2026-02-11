
import React, { useState, useEffect } from 'react';
import { fragranceService } from '../services/geminiService';
import { PerfumeDiscovery } from '../types';

interface DiscoveryCardsProps {
  vibe: string;
  isDarkMode: boolean;
  onAction?: (query: string) => void;
}

const DiscoveryCards: React.FC<DiscoveryCardsProps> = ({ vibe, isDarkMode, onAction }) => {
  const [cards, setCards] = useState<PerfumeDiscovery[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState<PerfumeDiscovery[]>([]);

  useEffect(() => {
    loadCards();
  }, [vibe]);

  const loadCards = async () => {
    setIsLoading(true);
    const data = await fragranceService.getDiscoveryCards(vibe);
    setCards(data);
    setCurrentIndex(0);
    setIsLoading(false);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setWishlist(prev => [...prev, cards[currentIndex]]);
    }
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
        loadCards();
    }
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    loadCards();
  };

  if (isLoading) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
           <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-yellow-500/10 rounded-full"></div>
              <div className="absolute inset-0 border-t-4 border-yellow-500 rounded-full animate-spin"></div>
           </div>
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 animate-pulse text-center">
             အနံ့သစ်များကို ပေါင်းစပ်နေပါတယ်... <br/>
             <span className="text-[8px] mt-2 block opacity-60 italic font-medium">AI is matching bottle heritage</span>
           </p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) return (
    <div className="h-[200px] flex flex-col items-center justify-center space-y-4">
      <p className="text-sm font-bold text-gray-500">ရှာမတွေ့နိုင်ဖြစ်နေပါသည်။</p>
      <button onClick={loadCards} className="px-6 py-2 bg-yellow-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">Retry Search</button>
    </div>
  );

  return (
    <div className="mb-24 py-10 relative">
        {/* Refresh Action */}
        <div className="flex justify-end mb-6 px-4">
           <button 
              onClick={handleRefresh}
              className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-yellow-600 hover:text-yellow-500 transition-colors group"
           >
              <span>Refresh Matches</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
           </button>
        </div>

        <div className="relative max-w-xl mx-auto h-[820px] flex items-center justify-center perspective-1000">
            {cards.map((card, idx) => {
                if (idx < currentIndex) return null;
                const isCurrent = idx === currentIndex;
                
                return (
                    <div 
                        key={card.id}
                        className={`absolute w-full h-full glass-panel rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-700 border border-yellow-500/15 flex flex-col ${
                            isCurrent ? 'z-20 opacity-100 scale-100 rotate-0 translate-y-0' : 'z-10 opacity-30 scale-90 translate-y-16 rotate-3'
                        }`}
                        style={{ display: idx > currentIndex + 2 ? 'none' : 'flex' }}
                    >
                        {/* Enhanced Prominent Perfume Photo Area */}
                        <div className="h-[380px] relative group overflow-hidden bg-zinc-200 dark:bg-zinc-900">
                           <img 
                              src={card.imageUrl || `https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800`} 
                              alt={card.name} 
                              className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-115" 
                           />
                           
                           {/* Luxury Shimmer Overlay */}
                           <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                           
                           {/* Glass Reflection Effect */}
                           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 group-hover:to-black/50 transition-colors duration-700"></div>
                           
                           {/* Brand Tagging */}
                           <div className="absolute top-8 left-8 z-10 flex flex-col space-y-2">
                              <div className="glass-card px-4 py-2 rounded-full border border-white/30 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-xl shadow-xl">
                                 {card.vibe} Collection
                              </div>
                           </div>

                           {/* Shine Effect Animation */}
                           <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:left-[150%] transition-all duration-[1.5s] ease-in-out pointer-events-none"></div>
                        </div>

                        <div className="flex-1 overflow-y-auto scrollbar-none p-8 pt-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-yellow-600">{card.brand}</span>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Premium Selection</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                   <span className="text-[10px] font-black text-yellow-600 uppercase tracking-widest">Scent Trail</span>
                                   <span className="text-[9px] font-bold text-gray-400">Extra Long-lasting</span>
                                </div>
                            </div>

                            <h4 className="luxury-font text-3xl font-black mb-4 tracking-tight leading-tight">{card.name}</h4>
                            
                            <div className="grid grid-cols-2 gap-3 mb-6">
                               <div className="p-3 rounded-2xl glass-card border border-yellow-500/10 flex flex-col items-center text-center">
                                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Aura</span>
                                  <span className="text-[10px] font-black text-yellow-600 uppercase tracking-tighter">{card.vibe}</span>
                               </div>
                               <div className="p-3 rounded-2xl glass-card border border-yellow-500/10 flex flex-col items-center text-center">
                                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">Concentration</span>
                                  <span className="text-[10px] font-black text-yellow-600 uppercase tracking-tighter">Parfum</span>
                               </div>
                            </div>

                            <p className={`text-[13px] leading-relaxed mb-6 italic opacity-90 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                "{card.description}"
                            </p>

                            {/* Exploration Action Row */}
                            <div className="flex gap-2 mb-4">
                                <button 
                                  onClick={() => onAction?.(`${card.name} နဲ့ တူတဲ့ တခြားရေမွှေးတွေနဲ့ ယှဉ်ပြပေးပါ`)}
                                  className="flex-1 py-3 rounded-xl border border-yellow-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-white transition-all shadow-sm active:scale-95"
                                >
                                  Compare
                                </button>
                                <button 
                                  onClick={() => onAction?.(`${card.name} အတွက် ဈေးသက်သာတဲ့ Dupe ရှာပေးပါ`)}
                                  className="flex-1 py-3 rounded-xl border border-yellow-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-white transition-all shadow-sm active:scale-95"
                                >
                                  Find Dupe
                                </button>
                                <button 
                                  onClick={() => onAction?.(`${card.name} ရဲ့ Sample ဗူး အကြောင်း သိချင်ပါတယ်`)}
                                  className="flex-1 py-3 rounded-xl border border-yellow-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-white transition-all shadow-sm active:scale-95"
                                >
                                  Try Sample
                                </button>
                            </div>
                        </div>

                        {/* Main Swipe Buttons */}
                        <div className="flex justify-center space-x-12 items-center pb-10 pt-4 px-10 border-t border-yellow-500/5 bg-white/5 backdrop-blur-md">
                            <button 
                                onClick={() => handleSwipe('left')}
                                className="w-16 h-16 rounded-full glass-card border border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all hover:scale-110 active:scale-90 shadow-2xl"
                                title="Pass"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <button 
                                onClick={() => handleSwipe('right')}
                                className="w-16 h-16 rounded-full glass-card border border-green-500/20 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all hover:scale-110 active:scale-90 shadow-2xl"
                                title="Add to Collection"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
        
        {wishlist.length > 0 && (
            <div className="mt-16 text-center animate-in fade-in duration-1000 px-4">
                <div className="flex items-center justify-center space-x-6 mb-10">
                   <div className="h-px w-16 bg-yellow-500/20"></div>
                   <h5 className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-500">Your Signature Collection</h5>
                   <div className="h-px w-16 bg-yellow-500/20"></div>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    {wishlist.map((w, i) => (
                        <div key={i} className="group relative w-24 h-24 rounded-3xl overflow-hidden glass-card border border-yellow-500/30 animate-in zoom-in duration-500 shadow-xl hover:scale-110 transition-transform cursor-help">
                            <img src={w.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={w.name} />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 group-hover:opacity-0 transition-opacity">
                               <span className="text-[8px] font-black text-white uppercase text-center px-1 tracking-tighter">{w.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};

export default DiscoveryCards;
