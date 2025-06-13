import React, { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { FaMoon, FaSun, FaDownload, FaEye, FaTerminal } from 'react-icons/fa';

export default function Header({ isDarkMode, setIsDarkMode }) {
  const [showResumeOptions, setShowResumeOptions] = useState(false);

  return (
    <header className="pt-10 pb-8">
      <div className="container">
        <div className="flex justify-between items-center mb-4">
          <div className={`text-base font-medium flex items-center gap-2 group ${
            isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-gray-900'
          } transition-colors font-["IBM_Plex_Sans","Figtree",Arial,sans-serif]`}>
            <FaTerminal className={`text-sm transform transition-transform group-hover:rotate-12 ${
              isDarkMode ? 'text-blue-400' : 'text-gray-900'
            }`} />
            <span className="relative min-w-[90px]">
              <Typewriter
                words={['barsat.dev']}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={false}
                delaySpeed={1000}
              />
            </span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex gap-8 text-sm mt-1">
              <div 
                className="relative group"
                onMouseEnter={() => setShowResumeOptions(true)}
                onMouseLeave={() => setShowResumeOptions(false)}
              >
                <a 
                  href="https://drive.google.com/file/d/1IQBdm9M41ECyJ1Cu7p_tnRBWNHItd6Ep/view?usp=sharing" 
                  target='_blank'
                  className={`transition-colors duration-200 hover:underline ${
                    isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                  }`}
                >
                  Resume
                </a>
                {/* Add padding-top to create a hoverable area between trigger and dropdown */}
                <div className={`absolute -left-4 pt-2 w-32 ${showResumeOptions ? 'block' : 'hidden'}`}>
                  <div className={`py-2 rounded-lg shadow-lg ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <a
                      href="https://drive.google.com/file/d/1IQBdm9M41ECyJ1Cu7p_tnRBWNHItd6Ep/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 text-sm ${
                        isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <FaEye className="text-xs" /> View
                    </a>
                    <a
                      href="https://drive.google.com/uc?export=download&id=1IQBdm9M41ECyJ1Cu7p_tnRBWNHItd6Ep"
                      className={`flex items-center gap-2 px-4 py-2 text-sm ${
                        isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <FaDownload className="text-xs" /> Download
                    </a>
                  </div>
                </div>
              </div>
              <a 
                href="https://github.com/BarsatKhadka" 
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-200 hover:underline ${
                  isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                GitHub
              </a>
              <a 
                href="mailto:khadkabarsat598@gmail.com" 
                className={`transition-colors duration-200 hover:underline ${
                  isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                Contact
              </a>
            </nav>
            <button
              className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium ${
                isDarkMode
                  ? 'bg-gray-800/60 border border-gray-700/50 text-gray-200 hover:bg-gray-700/60 hover:border-gray-600/60'
                  : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
        <div className="mt-16 text-left">
          <h1 className={`text-5xl md:text-6xl font-light mb-4 leading-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`} style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
            Hi, I'm <span className={isDarkMode 
              ? 'text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text' 
              : 'text-blue-800'
            }>Barsat Khadka</span> – I build<br />
            AI-powered tools and full-stack systems.
          </h1>
          <div className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`} style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
            <span className={`inline-block min-h-[2.5rem] ${
              isDarkMode ? 'text-blue-400' : 'text-gray-900'
            }`}>
              <Typewriter
                words={['Computer Engineering', 'Honors Scholar', "President's List Spring 2025", "Academic Excellence Tuition Award", "Computer Engineering"]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1200}
              />
            </span>
            {' '}@The University of Southern Mississippi
          </div>
        </div>
      </div>
    </header>
  );
}