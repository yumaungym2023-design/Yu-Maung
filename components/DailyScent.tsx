
import React from 'react';

interface DailyScentProps {
  isDarkMode: boolean;
  vibe: string;
  onConsult: (query: string) => void;
}

const DailyScent: React.FC<DailyScentProps> = ({ isDarkMode, vibe, onConsult }) => {
  const recommendations: Record<string, any> = {
    Fresh: { 
      name: "Bleu de Chanel", 
      brand: "CHANEL", 
      vibe: "Sophisticated, Modern", 
      notes: "Grapefruit, Mint, Cedar", 
      longevity: "8-10 Hours",
      imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
    },
    Floral: { 
      name: "Miss Dior", 
      brand: "DIOR", 
      vibe: "Elegant, Romantic", 
      notes: "Rose, Peony, Bergamot", 
      longevity: "6-8 Hours",
      imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
    },
    Woody: { 
      name: "Oud Wood", 
      brand: "TOM FORD", 
      vibe: "Mysterious, Powerful", 
      notes: "Oud, Sandalwood, Cardamom", 
      longevity: "10-12 Hours",
      imageUrl: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&q=80&w=800"
    },
    Spicy: { 
      name: "Spicebomb Infrared", 
      brand: "VIKTOR&ROLF", 
      vibe: "Intense, Warm", 
      notes: "Red Habanero, Cinnamon, Tobacco", 
      longevity: "8-10 Hours",
      imageUrl: "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&q=80&w=800"
    }
  };

  const current = recommendations[vibe] || recommendations.Fresh;

  return (
    <div className={`max-w-4xl mx-auto glass-panel rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row border border-yellow-500/10 shadow-2xl transform transition-all hover:scale-[1.01] duration-500`}>
      <div className="md:w-1/2 h-[450px] md:h-auto relative group overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <img 
          src={current.imageUrl} 
          alt={current.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute top-6 left-6 z-10 px-4 py-2 rounded-full glass-card border border-white/20 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
           Today's Highlight
        </div>
      </div>
      <div className="md:w-1/2 p-12 flex flex-col justify-center">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600 mb-3">{current.brand}</span>
        <h4 className="luxury-font text-4xl font-black mb-4 tracking-tight leading-tight">{current.name}</h4>
        <div className="flex items-center space-x-4 mb-8">
           <div className="px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 text-[10px] font-black uppercase tracking-widest border border-yellow-500/20">{current.vibe}</div>
           <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{current.longevity}</div>
        </div>
        <p className={`text-base leading-relaxed mb-10 italic opacity-85 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          "ယနေ့ရာသီဥတုနဲ့ အလိုက်ဖက်ဆုံး ရနံ့တစ်ခုဖြစ်ပြီး {current.brand} ရဲ့ Signature အနံ့လေးဖြစ်ပါတယ်။ {current.notes} ရနံ့တွေက သင့်ကို တစ်နေ့လုံး ယုံကြည်မှုရှိစေမှာပါ။"
        </p>
        <button 
          onClick={() => onConsult(`${current.name} အကြောင်း အသေးစိတ်သိချင်ပါတယ်`)}
          className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all border shadow-lg ${
            isDarkMode ? 'bg-black border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-white' : 'bg-white border-yellow-600 text-yellow-700 hover:bg-yellow-600 hover:text-white'
          }`}
        >
          Consult AI About This Scent
        </button>
      </div>
    </div>
  );
};

export default DailyScent;
