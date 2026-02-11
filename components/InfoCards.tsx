
import React from 'react';

interface InfoCardsProps {
  isDarkMode: boolean;
}

const InfoCards: React.FC<InfoCardsProps> = ({ isDarkMode }) => {
  const categories = [
    {
      title: "Perfume Types",
      description: "EDT, EDP, Parfum ခြားနားချက်",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      items: ["Parfum (20-30%)", "EDP (15-20%)", "EDT (5-15%)"]
    },
    {
      title: "The Notes",
      description: "အချိန်ကာလ အစိတ်အပိုင်းများ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 17c3.333-3 6.667-3 10 0s6.667 3 10 0" />
        </svg>
      ),
      items: [
        "Top: (၅ - ၁၅ မိနစ်)",
        "Heart: (မိနစ် ၂၀ - ၁ နာရီ)",
        "Base: (၆ နာရီမှ တစ်နေ့လုံး)"
      ]
    },
    {
      title: "Occasions",
      description: "ဘယ်အချိန်မှာ ဆွတ်မလဲ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01" />
        </svg>
      ),
      items: ["Office: Fresh", "Date: Warm", "Daily: Citrus"]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {categories.map((cat, i) => (
        <div key={i} className={`p-5 rounded-2xl shadow-md border transition-all group ${
          isDarkMode ? 'bg-zinc-900 border-yellow-900/30' : 'bg-white border-yellow-100'
        }`}>
          <div className={`mb-3 transition-colors ${isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}`}>
            {cat.icon}
          </div>
          <h4 className={`text-sm font-bold mb-1 luxury-font uppercase tracking-wider ${isDarkMode ? 'text-yellow-500' : 'text-gray-900'}`}>{cat.title}</h4>
          <p className={`text-[10px] mb-3 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{cat.description}</p>
          <ul className="space-y-1">
            {cat.items.map((item, idx) => (
              <li key={idx} className={`text-[10px] flex items-center font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <span className="w-1 h-1 bg-yellow-500 rounded-full mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
