
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isDarkMode, onToggleDarkMode }) => {
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <header className={`sticky top-0 z-50 h-20 transition-all duration-300 glass-panel border-b border-yellow-900/10`}>
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full opacity-10 animate-pulse ${isDarkMode ? 'bg-yellow-400' : 'bg-yellow-500'}`}></div>
              <div className="z-10 flex flex-col items-center justify-center">
                <span className={`luxury-font text-2xl font-bold leading-none ${isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}`}>G</span>
                <div className={`w-8 h-0.5 mt-0.5 ${isDarkMode ? 'bg-yellow-500' : 'bg-yellow-600'}`}></div>
              </div>
            </div>
            <div>
              <h1 className={`luxury-font text-xl md:text-2xl font-bold tracking-[0.2em] uppercase transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                GOLD PERFUME
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <a href="#" className="hover:text-yellow-600 transition-colors">Consultant</a>
              <a href="#" className="hover:text-yellow-600 transition-colors">Heritage</a>
            </nav>
            <button 
              onClick={onToggleDarkMode}
              className={`p-2.5 rounded-full transition-all duration-300 glass-card border border-yellow-900/20 ${
                isDarkMode 
                ? 'text-yellow-500 hover:bg-yellow-900/20' 
                : 'text-yellow-700 hover:bg-yellow-50'
              }`}
              title={isDarkMode ? "Light Mode" : "Night Mode"}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-6 z-10">
        {children}
      </main>
      <footer className={`py-16 text-center transition-colors duration-500 relative overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-mesh"></div>
        <div className={`mb-4 luxury-font text-2xl font-bold tracking-widest ${isDarkMode ? 'text-yellow-500' : 'text-gray-800'}`}>GOLD PERFUME MILANO</div>
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em] mb-6 font-bold">The ultimate fragrance destination</p>
        <div className="flex justify-center space-x-6 mb-8">
           <div className="w-10 h-0.5 bg-yellow-500/30"></div>
           <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
           <div className="w-10 h-0.5 bg-yellow-500/30"></div>
        </div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">© 2024 Gold Perfume Milano. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
