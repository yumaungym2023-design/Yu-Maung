import React, { useRef, useState, useEffect } from 'react';
import Layout from './components/Layout';
import ChatInterface, { ChatInterfaceHandle } from './components/ChatInterface';
import ScentFinder from './components/ScentFinder';
import DupeFinder from './components/DupeFinder';
import OdorMap from './components/OdorMap';
import DiscoveryCards from './components/DiscoveryCards';
import ScentDNA from './components/ScentDNA';
import { UserProfile, ScentDNA as ScentDNAType } from './types';

const App: React.FC = () => {
  const chatRef = useRef<ChatInterfaceHandle>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeVibe, setActiveVibe] = useState<string>('Fresh');
  
  // Initialize with a default profile since onboarding is removed
  const [userProfile, setUserProfile] = useState<UserProfile>({
    gender: 'Unisex',
    vibe: 'Fresh',
    occasion: 'Daily',
    collection: []
  });

  const [scentDNA, setScentDNA] = useState<ScentDNAType>({
    woody: 45,
    fresh: 70,
    floral: 30,
    spicy: 20,
    sweet: 35
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0a0a0a';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
    }
  }, [isDarkMode]);

  // Update DNA and Profile when vibe changes via OdorMap or Finder
  useEffect(() => {
    const newDNA = { ...scentDNA };
    const vibe = activeVibe.toLowerCase();
    
    // Reset and boost the active vibe in DNA visualization
    newDNA.fresh = vibe === 'fresh' ? 85 : 40;
    newDNA.woody = vibe === 'woody' ? 85 : 30;
    newDNA.floral = vibe === 'floral' ? 85 : 25;
    newDNA.spicy = vibe === 'spicy' ? 85 : 20;
    newDNA.sweet = vibe === 'sweet' ? 85 : 35;
    
    setScentDNA(newDNA);
    setUserProfile(prev => ({ ...prev, vibe: activeVibe }));
  }, [activeVibe]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const getThemeStyles = () => {
    switch(activeVibe.toLowerCase()) {
      case 'fresh': return 'radial-gradient(at 0% 0%, rgba(56, 189, 248, 0.15) 0, transparent 50%)';
      case 'floral': return 'radial-gradient(at 0% 0%, rgba(232, 121, 249, 0.15) 0, transparent 50%)';
      case 'woody': return 'radial-gradient(at 0% 0%, rgba(184, 134, 11, 0.15) 0, transparent 50%)';
      case 'spicy': return 'radial-gradient(at 0% 0%, rgba(220, 38, 38, 0.15) 0, transparent 50%)';
      default: return 'radial-gradient(at 0% 0%, rgba(212, 175, 55, 0.15) 0, transparent 50%)';
    }
  };

  const handleQuickQuestion = (question: string) => {
    const chatElement = document.getElementById('chat-section');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        chatRef.current?.sendMessage(question);
      }, 500);
    }
  };

  const openCameraSearch = () => {
    const chatElement = document.getElementById('chat-section');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={isDarkMode ? 'dark bg-black text-white min-h-screen transition-colors duration-1000' : 'bg-white text-gray-900 min-h-screen transition-colors duration-1000'} style={{ backgroundImage: getThemeStyles() }}>
      
      {/* Interactive dynamic background blobs for glass effect */}
      <div className={`fixed top-[15%] left-[5%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 pointer-events-none -z-10 ${
          activeVibe === 'Fresh' ? 'bg-cyan-500' : 
          activeVibe === 'Floral' ? 'bg-fuchsia-500' : 
          activeVibe === 'Woody' ? 'bg-amber-800' : 'bg-rose-500'
      }`}></div>
      <div className={`fixed bottom-[15%] right-[5%] w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 transition-colors duration-1000 pointer-events-none -z-10 ${
          activeVibe === 'Fresh' ? 'bg-blue-400' : 
          activeVibe === 'Floral' ? 'bg-pink-400' : 
          activeVibe === 'Woody' ? 'bg-yellow-700' : 'bg-orange-600'
      }`}></div>

      <Layout isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode}>
        {/* Hero Section */}
        <div className="py-16 md:py-24 text-center relative overflow-hidden">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] blur-[150px] rounded-full -z-10 animate-pulse transition-colors duration-1000 ${
              activeVibe === 'Fresh' ? 'bg-blue-500/15' : 
              activeVibe === 'Floral' ? 'bg-purple-500/15' : 
              activeVibe === 'Woody' ? 'bg-amber-900/15' : 'bg-red-500/15'
          }`}></div>
          
          <h2 className={`luxury-font text-5xl md:text-8xl font-black mb-8 animate-in fade-in slide-in-from-top-6 duration-1000 tracking-tight transition-all px-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            မင်းရဲ့ ကိုယ်ပိုင်အနံ့ကို ရှာဖွေပါ၊ <br/> <span className="gold-text-gradient">မင်းရဲ့ အမှတ်အသားကို ချန်ထားပါ။</span>
          </h2>
          <p className={`max-w-3xl mx-auto text-sm md:text-xl mb-12 px-6 leading-loose font-medium italic transition-colors opacity-90 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ရေမွှေးပေါင်း သောင်းကျော်ထဲကမှ မင်းနဲ့ အလိုက်ဖက်ဆုံး တစ်ပုလင်းကို AI နည်းပညာနဲ့ ရှာဖွေပေးမယ့် မင်းရဲ့ တစ်ဦးတည်းသော Scent Expert။
          </p>

          <div className="flex flex-col items-center justify-center mb-16 px-4">
             <button 
                onClick={openCameraSearch}
                className="group relative w-24 h-24 mb-6 rounded-full glass-panel border-4 border-yellow-500/50 flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95 overflow-hidden"
             >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
                <div className="absolute inset-0 rounded-full bg-yellow-500/20 animate-ping"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-600 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
             </button>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-600">Search with Camera</span>
          </div>

          <OdorMap activeVibe={activeVibe} onSelect={setActiveVibe} />
        </div>

        {/* Discovery Feed Section */}
        <section className="mb-24 px-4" id="discovery-section">
          <div className="flex flex-col md:flex-row gap-8 items-start">
             <div className="flex-1 w-full">
                <div className="mb-10 text-center md:text-left">
                  <h3 className="luxury-font text-3xl font-bold uppercase tracking-widest text-yellow-600">Matches for You</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mt-2">Curated for your {activeVibe} preference</p>
                </div>
                <DiscoveryCards vibe={activeVibe} isDarkMode={isDarkMode} onAction={handleQuickQuestion} />
             </div>
             <div className="w-full md:w-80">
                <ScentDNA dna={scentDNA} isDarkMode={isDarkMode} />
             </div>
          </div>
        </section>

        <ScentFinder onFind={handleQuickQuestion} isDarkMode={isDarkMode} />

        <DupeFinder isDarkMode={isDarkMode} />

        <div className="pb-16">
          <ChatInterface ref={chatRef} isDarkMode={isDarkMode} />
        </div>

        <section className={`glass-panel rounded-[3rem] p-10 md:p-16 text-center mb-20 shadow-2xl relative overflow-hidden group`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[80px] -z-10 group-hover:bg-yellow-500/10 transition-all duration-1000"></div>
          <h3 className={`luxury-font text-3xl md:text-4xl font-bold mb-8 uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Expert Inquiries</h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "အကောင်းဆုံး Dupe ရေမွှေးများ",
              "EDP နဲ့ EDT ကွာခြားချက်",
              "\"Scent Dupe\" Finder",
              "ရေမွှေး အတု/အစစ် စစ်နည်း"
            ].map((text, i) => (
              <button 
                key={i} 
                onClick={() => handleQuickQuestion(text)}
                className={`px-8 py-4 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest shadow-sm hover:shadow-xl transition-all border glass-card active:scale-95 ${
                  isDarkMode 
                  ? 'text-gray-300 border-yellow-900/20 hover:border-yellow-500 hover:text-yellow-500' 
                  : 'text-gray-800 border-yellow-100 hover:border-yellow-600 hover:text-yellow-700'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default App;