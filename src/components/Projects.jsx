import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaUsers, FaRegClipboard, FaCheck } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';

function ProjectCard({ title, tech, description, bullets, github, live, demo, maven, golden, silver, bronze, inProgress, silverBadge, isDarkMode }) {
  const mavenDependency = `<dependency>\n    <groupId>io.github.barsatkhadka</groupId>\n    <artifactId>JsonSQL</artifactId>\n    <version>1.0.0</version>\n</dependency>`;
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(mavenDependency.replace(/\\n/g, '\n'));
    setCopied(true);
    setShowToast(true);
    setTimeout(() => setCopied(false), 1200);
    setTimeout(() => setShowToast(false), 1500);
  };

  let cardClass = `
    relative group backdrop-blur border rounded-xl 
    p-4 sm:p-6 
    min-h-[320px] sm:min-h-[340px] 
    flex flex-col justify-between 
    transition-all hover:shadow-lg hover:-translate-y-1
  `;
  
  if (isDarkMode) {
    cardClass += 'bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700/50 hover:border-gray-600/50 hover:shadow-blue-500/10 ';
  } else {
    cardClass += 'hover:border-blue-500 ';
    if (golden) {
      cardClass += 'bg-gradient-to-br from-amber-100 via-amber-200 to-yellow-100 border-amber-300 shadow-lg ';
    } else if (silver) {
      cardClass += 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 border-gray-300 shadow-lg ';
    } else if (bronze) {
      cardClass += 'bg-gradient-to-br from-yellow-100 via-orange-200 to-amber-400 border-yellow-400 shadow-lg ';
    } else {
      cardClass += 'bg-white/80 border-transparent shadow-md ';
    }
  }

  return (
    <div className={cardClass}>
      {/* Featured/Progress Badges */}
      {golden && (
        <span className={`absolute -top-3 left-2 sm:left-4 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-md border z-10 uppercase tracking-wide ${
          isDarkMode 
            ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black border-amber-400'
            : 'bg-amber-400 text-amber-900 border-black'
        }`}>
          Check this out!
        </span>
      )}
      {silverBadge && (
        <span className={`absolute -top-3 left-2 sm:left-4 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-md border z-10 uppercase tracking-wide ${
          isDarkMode
            ? 'bg-gradient-to-r from-gray-400 to-gray-300 text-gray-900 border-gray-300'
            : 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 text-gray-800 border-gray-300'
        }`}>
          1st Runner Up – Voxo Hatchathon
        </span>
      )}
      {inProgress && (
        <span className={`absolute -top-3 left-2 sm:left-4 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-md border z-10 uppercase tracking-wide ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white border-blue-400'
            : 'bg-gradient-to-r from-blue-200 via-blue-100 to-blue-300 text-blue-900 border-blue-300'
        }`}>
          In Progress
        </span>
      )}
      
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute left-1/2 -translate-x-1/2 top-3 z-20 bg-black/90 text-white text-xs px-4 py-2 rounded shadow-lg animate-slide-down-fade pointer-events-none">
          Copied to clipboard!
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-2">
        <h3 className={`font-mono text-base sm:text-lg font-semibold leading-tight ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>{title}</h3>
        <div className="flex flex-wrap gap-2 items-center">
          {/* Action buttons */}
          {github && (
            <a 
              href={github} 
              className={`border rounded px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium hover:opacity-80 flex items-center gap-1 ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-800 text-gray-200'
                  : 'border-gray-800 bg-[#24292e] text-white hover:bg-[#2c3238]'
              }`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaGithub className="text-xs sm:text-sm" />
              <span>GitHub</span>
              <FaExternalLinkAlt className="text-[8px] sm:text-xs" />
            </a>
          )}
          {maven && (
            <div className="relative">
              <button 
                className={`border rounded px-2 py-1 text-xs font-medium hover:opacity-80 flex items-center gap-1 group/button ${
                  isDarkMode
                    ? 'border-orange-400 bg-gray-800/60 text-orange-400'
                    : 'border-orange-500 bg-white/80 text-orange-600 hover:bg-orange-50'
                }`}
                type="button"
                onClick={handleCopy}
              >
                <span className="flex items-center gap-1">
                  Maven Dependency
                  <span className={`ml-1 ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} title="Copy Maven dependency">
                    {copied ? <FaCheck className="text-xs" /> : <FaRegClipboard className="text-xs" />}
                  </span>
                </span>
                <div className={`absolute right-0 top-full mt-2 w-64 p-3 text-xs rounded shadow-lg opacity-0 invisible group-hover/button:opacity-100 group-hover/button:visible transition-all duration-200 z-10 ${
                  isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-800 text-gray-200'
                }`}>
                  <pre className="whitespace-pre-wrap font-mono">
{`<dependency>
    <groupId>io.github.barsatkhadka</groupId>
    <artifactId>JsonSQL</artifactId>
    <version>1.0.0</version>
</dependency>`}
                  </pre>
                </div>
              </button>
            </div>
          )}
          {live && (
            <a 
              href={live} 
              className={`relative border rounded px-2 py-1 text-xs font-medium hover:opacity-80 flex items-center gap-1 ${
                isDarkMode
                  ? 'border-green-400 bg-gray-800/60 text-green-400'
                  : 'border-green-100 bg-white/80 text-green-700 hover:bg-green-50'
              }`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Live</span>
              <FaExternalLinkAlt className="text-xs" />
            </a>
          )}
          {demo && (
            <a 
              href={demo} 
              className={`border rounded px-2 py-1 text-xs font-medium hover:opacity-80 flex items-center gap-1 ${
                isDarkMode
                  ? 'border-red-400 bg-gray-800/60 text-red-400'
                  : 'border-red-600 bg-white/80 text-red-600 hover:bg-red-50'
              }`}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-sm" />
              <span>Demo</span>
              <FaExternalLinkAlt className="text-xs" />
            </a>
          )}
        </div>
      </div>

      {/* Tech stack tags */}
      <div className="flex flex-wrap gap-1 mb-2">
        {tech.split(',').map((t, i) => (
          <code 
            key={i} 
            className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-mono flex items-center gap-1 ${
              t.trim() === 'UMiami Horizon AI' 
                ? isDarkMode
                  ? 'bg-gradient-to-r from-amber-500/20 to-amber-400/20 text-amber-300 border border-amber-500/30'
                  : 'bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 text-amber-900 border border-amber-300 shadow-sm relative overflow-hidden group'
                : t.trim() === 'Team of 4'
                ? isDarkMode
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
                : isDarkMode
                ? 'bg-gray-700/60 text-gray-200 border border-gray-600/40'
                : 'bg-slate-100 text-gray-700'
            }`}
          >
            {t.trim() === 'UMiami Horizon AI' && !isDarkMode && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            )}
            {t.trim() === 'Team of 4' && <FaUsers className="text-xs" />}
            {t.trim()}
          </code>
        ))}
      </div>

      <p className={`text-xs sm:text-sm mb-2 leading-relaxed ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>{description}</p>

      <ul className={`list-disc list-inside text-[10px] sm:text-xs mb-2 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-700'
      }`}>
        {bullets.map((b, i) => <li key={i} className="mb-1">{b}</li>)}
      </ul>
    </div>
  );
}

const projectPage = [
  {
    title: 'Vinaya Journal',
    tech: 'Typescript, Python, Java, JavaScript, FastAPI, SpringBoot, React, SQLite, Chroma-db, Electron.js, pandas',
    description: 'Offline-first AI journaling app with local LLM and mood analysis.',
    bullets: [
      'Cross-platform journaling app with private, local AI.',
      'Semantic search, mood insights, and clean UI.'
    ],
    github: 'https://github.com/BarsatKhadka/Vinaya-Journal',
    live: 'https://vinaya-journal.vercel.app/',
    golden: true
  },
  {
    title: 'Wordbuddy ai',
    tech: 'React, Node.js, OpenAI API, Eleven Labs API , UMiami Horizon AI , Team of 4',
    description: 'AI-powered word tutor for kids with voice and story-based learning.',
    bullets: [
      'Voice-driven, gamified learning for ages 4–12.',
      'Dyslexia support, sign language, and demo video.'
    ],
    github: 'https://github.com/BarsatKhadka/WordBuddy.ai',
    demo: 'https://www.youtube.com/watch?v=DELud7Xqsaw',
    silver: true
  },
  {
    title: 'JsonSQL',
    tech: 'Java, Jackson, Maven, SQL, JSON',
    description: 'Lightweight Java library for querying JSON data using SQL-like syntax.',
    bullets: [
      'SQL-like queries for JSON data with zero configuration',
      'Supports files, URLs, and JSON strings as input sources',
      'Features SELECT, WHERE, and AS clauses with more planned'
    ],
    github: 'https://github.com/BarsatKhadka/JsonSQL',
    maven: true,
    bronze: true
  }
];

const projectPage2 = [
  {
    title: 'PrepAI',
    tech: 'React, Spring Boot, OpenAI API, PDFBox, Team of 5, 1st Runner Up Voxo Hatchathon',
    description: 'AI-powered assistant that turns PDFs into quizzes, flashcards, and study plans.',
    bullets: [
      'Quiz generator, flashcards, and personalized study planner for any PDF.'
    ],
    github: 'https://github.com/BarsatKhadka/PrepAI',
    silverBadge: true
  },
  {
    title: 'Dependent Origination Visualizer',
    tech: 'Javascript, React.js, Python',
    description: 'Designed and developed an interactive web application to visualize the 12 links of Dependent Origination (Pratītyasamutpāda) for Buddhist philosophy scholars.',
    bullets: [
      'Deployed the app using Vercel and implemented CI/CD pipelines using GitHub Actions for automated testing and deployment.',
      'Achieved 100% test pass rate during integration.'
    ],
    live: 'https://dovisualizer.vercel.app/',
    github: 'https://github.com/BarsatKhadka/Dependent-Origination-Visualizer',
  },
  {
    title: 'EasyRepo',
    tech: 'SpringBoot, React.js, Tailwind CSS, Typescript, Postgresql',
    description: 'Built a full stack Github Repository Management System with OAuth authentication, adopted by 10+ active developers for their repository management.',
    bullets: [
      'Developed REST APIs for repository data, and features like collection grouping, interactive commit calendar, and a dynamic file tree viewer using GitHub\'s Tree API, improving repo navigation efficiency by 40%.'
    ],
    github: 'https://github.com/BarsatKhadka/Easy-Repo',
  }
];

const projectPage3 = [
  {
    title: 'Shellmate',
    tech: 'Python',
    description: 'Automate shell commands and your shell experience with Gen AI.',
    bullets: [],
    github: 'https://github.com/BarsatKhadka/Shellmate',
    inProgress: true
  },
  {
    title: 'Sutta Sort',
    tech: 'TypeScript, React, JSON',
    description: '',
    bullets: [
      'Tags historical textual documents by thematic categories to support research and study in Buddhist philosophy.',
      'Developed classification pipelines to auto-label content using doctrinal themes.',
      'Aids academic researchers and scholars working with large canonical corpora.'
    ],
    github: 'https://github.com/BarsatKhadka/Sutta-Sort',
    inProgress: true
  }
];

export default function Projects({ isDarkMode }) {
  const [page, setPage] = useState(0);
  const pages = [projectPage, projectPage2, projectPage3];

  return (
    <section className="my-4">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
          <h2 className={`text-xl sm:text-2xl font-semibold font-header ${
            isDarkMode ? '!text-white' : 'text-black'
          }`}>Projects</h2>

          {/* Page Selector Buttons */}
          <div className="flex gap-2">
            {[0, 1, 2].map(idx => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm font-bold transform transition-all duration-200 ease-in-out
                  ${page === idx
                    ? isDarkMode
                      ? 'bg-blue-500 text-white border-blue-500 scale-110 shadow-md shadow-blue-500/30'
                      : 'bg-blue-600 text-white border-blue-600 scale-110 shadow-md shadow-blue-300'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                  }`}
                aria-label={`Go to page ${idx + 1}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pages[page].map((props, i) => (
            <ProjectCard key={props.title + i} {...props} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
}