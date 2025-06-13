import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Footer from './components/Footer';

function App() {
  // Initialize state from localStorage or default to false
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Update localStorage when isDarkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const containerClass = `
    mx-auto w-full max-w-[1440px] mt-8 mb-0
    rounded-t-2xl border-t border-l border-r p-10 pb-0
    flex flex-col min-h-[calc(100vh-2rem)]
    ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-gray-700/50 shadow-[0_0_25px_10px_rgba(17,24,39,0.6)]'
      : 'bg-gradient-to-br from-white via-white to-gray-100 backdrop-blur-xl ring-1 ring-gray-200/60 ring-offset-2 ring-offset-[#F5F7FA] shadow-[0_0_25px_10px_rgba(0,0,0,0.08)]'}
  `;

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode
      ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100'
      : 'bg-[#F5F7FA] text-gray-900'}`}>
      <div className={containerClass}>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main className="flex-grow pb-16">
          <Projects isDarkMode={isDarkMode} />
          <div className="container">
            <div className="flex flex-nowrap gap-8 items-start mt-0">
              <div className="w-1/2">
                <Skills isDarkMode={isDarkMode} />
              </div>
              <div className="w-1/2">
                <Experience isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;
