
import React, { useState } from 'react';

interface ScentFinderProps {
  onFind: (query: string) => void;
  isDarkMode: boolean;
}

const ScentFinder: React.FC<ScentFinderProps> = ({ onFind, isDarkMode }) => {
  const [selections, setSelections] = useState({
    gender: '',
    weather: '',
    budget: '',
    vibe: ''
  });

  const categories = [
    { id: 'gender', label: 'Gender', options: ['Male', 'Female', 'Unisex'] },
    { id: 'weather', label: 'Weather', options: ['Summer', 'Winter', 'Rainy'] },
    { id: 'budget', label: 'Budget', options: ['Budget', 'Mid', 'Luxury'] },
    { id: 'vibe', label: 'Vibe', options: ['Woody', 'Floral', 'Fresh', 'Spicy'] }
  ];

  const handleSelect = (category: string, value: string) => {
    setSelections(prev => ({ ...prev, [category]: value }));
  };

  const handleFind = () => {
    const { gender, weather, budget, vibe } = selections;
    if (!gender || !weather || !budget || !vibe) {
      alert("ကျေးဇူးပြု၍ ကဏ္ဍအားလုံးကို ရွေးချယ်ပေးပါခင်ဗျာ။");
      return;
    }
    onFind(`${gender} အတွက်၊ ${weather} ရာသီ၊ ${budget} ဈေး၊ ${vibe} ရနံ့ အကြံပေးပါ။`);
  };

  return (
    <div className={`glass-panel rounded-[2.5rem] p-8 md:p-10 shadow-2xl mb-12 transition-all duration-700 hover:shadow-yellow-500/5`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {categories.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <h4 className={`text-[10px] font-black uppercase tracking-[0.25em] border-b pb-2 ${
              isDarkMode ? 'text-yellow-500/80 border-yellow-900/30' : 'text-yellow-700/80 border-yellow-100'
            }`}>
              {cat.label}
            </h4>
            <div className="flex flex-wrap gap-2">
              {cat.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(cat.id, opt)}
                  className={`px-3.5 py-2 rounded-xl text-[10px] font-bold transition-all border glass-card ${
                    selections[cat.id as keyof typeof selections] === opt
                      ? 'bg-yellow-500 text-white border-yellow-400 shadow-lg scale-110 z-10'
                      : (isDarkMode ? 'text-gray-400 border-yellow-900/10 hover:border-yellow-600/50' : 'text-gray-600 border-gray-100 hover:bg-yellow-50/50 hover:border-yellow-200')
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleFind}
          className={`px-10 py-4 rounded-2xl font-bold luxury-font text-sm tracking-[0.2em] transition-all shadow-xl active:scale-95 flex items-center space-x-3 group relative overflow-hidden ${
            isDarkMode ? 'bg-yellow-600 text-white' : 'bg-gray-900 text-white'
          }`}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span>FIND MY SCENT</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ScentFinder;
