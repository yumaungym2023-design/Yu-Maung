
import React, { useState } from 'react';

interface BrandInfo {
  name: string;
  popular: string[];
}

interface CategoryInfo {
  title: string;
  description: string;
  keyPoints: string;
  brands: BrandInfo[];
  color: string;
}

const BrandShowcase: React.FC<{ isDarkMode: boolean; onConsult: (query: string) => void }> = ({ isDarkMode, onConsult }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const categories: CategoryInfo[] = [
    {
      title: "Designer Brands",
      description: "Fashion House တွေက ထုတ်တဲ့ လူကြိုက်များပြီး ခေတ်မီသော Brand များ",
      keyPoints: "ဝယ်ရလွယ်ကူခြင်း၊ လူကြိုက်များခြင်း၊ ဈေးနှုန်းသင့်တင့်ခြင်း။",
      color: "bg-blue-500",
      brands: [
        { name: "Chanel", popular: ["Bleu de Chanel", "No. 5", "Coco Mademoiselle", "Chance"] },
        { name: "Dior", popular: ["Sauvage", "J'adore", "Miss Dior", "Fahrenheit"] },
        { name: "Giorgio Armani", popular: ["Acqua di Gio", "Si", "Armani Code"] },
        { name: "YSL", popular: ["Y", "Black Opium", "Libre", "La Nuit de l'Homme"] },
        { name: "Versace", popular: ["Eros", "Bright Crystal", "Dylan Blue", "Pour Homme"] }
      ]
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h3 className={`luxury-font text-2xl md:text-3xl font-bold uppercase tracking-widest ${isDarkMode ? 'text-yellow-500' : 'text-gray-900'}`}>
          Fragrance Houses
        </h3>
        <p className={`text-[10px] mt-2 uppercase tracking-[0.3em] font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Discover your signature house</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {categories.map((cat, idx) => (
          <div 
            key={idx}
            className={`flex flex-col rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer ${
              activeCategory === idx 
                ? (isDarkMode ? 'border-yellow-500 bg-zinc-900 shadow-lg shadow-yellow-900/10' : 'border-yellow-400 bg-white shadow-xl shadow-yellow-100/50')
                : (isDarkMode ? 'border-zinc-800 bg-zinc-950 opacity-80' : 'border-gray-100 bg-gray-50 opacity-90')
            }`}
            onClick={() => {
                setActiveCategory(idx);
                setSelectedBrand(null);
            }}
          >
            <div className={`p-6 border-b ${isDarkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
              <h4 className={`luxury-font text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{cat.title}</h4>
              <p className={`text-[11px] leading-relaxed mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cat.description}</p>
              <div className={`p-3 rounded-xl text-[10px] font-bold ${isDarkMode ? 'bg-zinc-800 text-yellow-500' : 'bg-yellow-50 text-yellow-700'}`}>
                {cat.keyPoints}
              </div>
            </div>
            
            <div className="p-4 flex flex-wrap gap-2 flex-1">
              {cat.brands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBrand(selectedBrand === brand.name ? null : brand.name);
                    setActiveCategory(idx);
                  }}
                  className={`px-3 py-2 rounded-xl text-[10px] font-bold transition-all border uppercase tracking-wider ${
                    selectedBrand === brand.name
                      ? 'bg-yellow-500 text-white border-yellow-500 scale-105 shadow-md'
                      : (isDarkMode ? 'bg-black text-gray-400 border-zinc-700 hover:border-yellow-600' : 'bg-white text-gray-600 border-gray-200 hover:border-yellow-300')
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>

            {activeCategory === idx && selectedBrand && (
                <div className={`p-5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${isDarkMode ? 'bg-zinc-900' : 'bg-yellow-50/30'}`}>
                    <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-yellow-500' : 'text-yellow-700'}`}>Popular Scents</span>
                        <button 
                            onClick={() => onConsult(`${selectedBrand} ရေမွှေးတွေအကြောင်းနဲ့ popular ဖြစ်တာလေးတွေ ရှင်းပြပေးပါခင်ဗျာ။`)}
                            className="text-[9px] font-bold uppercase tracking-tighter underline opacity-70 hover:opacity-100"
                        >
                            Consult AI
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {cat.brands.find(b => b.name === selectedBrand)?.popular.map((perfume, i) => (
                            <div 
                                key={i}
                                className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all hover:translate-x-1 ${
                                    isDarkMode ? 'bg-black border-zinc-800 text-gray-300' : 'bg-white border-white text-gray-700'
                                }`}
                            >
                                <span className="text-yellow-500 mr-2">•</span> {perfume}
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandShowcase;
