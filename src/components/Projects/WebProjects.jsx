import { IoFolderOpenOutline } from "react-icons/io5";
import { FaGithub, FaClock, FaDatabase, FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";

export const WebProjects = () =>{
    return(
        <>
        <div className="ml-8 mt-16 lg:ml-48 "> 
        <div className="flex items-center gap-2 mb-6">
      <IoFolderOpenOutline className="text-[#6DB33F] w-8 h-8" />
      <p className="text-2xl font-bold text-white">Web Projects</p>
        </div>


        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mr-8 lg:mr-8">

          {/* PunchClock Plus Project Card */}
          <div className="bg-[#] p-6 rounded-lg hover:scale-105 transform transition-all duration-500 hover:shadow-2xl hover:shadow-[#eebc86]/20 cursor-pointer">
            <h3 className="text-[#ebffff] text-xl font-semibold mb-8 sm:mb-4 flex flex-col flex-row sm:items-center justify-between">
              <div className="flex items-center mb-4 lg:mb-1"> 
                <FaClock className="w-8 h-8 text-blue-500" /> {/* Clock Icon */}
                <span className="cursor-text ml-4">PunchClock Plus</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-[#000000]/10 text-white text-xs px-3 py-1 rounded-sm border border-[#95B5] flex items-center gap-1">
                  <a href="https://github.com/BarsatKhadka/Punch-Clock-Plus" target="_blank"><FaGithub className="inline text-white" /> Source</a>
                </span>
                <span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></span>
                </span>
              </div>
            </h3>
            <p className="text-gray-400 text-sm mb-4 cursor-text">
              Employee Time-Tracking Application
            </p>
            <p className="text-gray-300 text-sm mb-4 cursor-text">
              PunchClock Plus is a full-stack employee time-tracking application designed to help businesses manage employee attendance and shifts efficiently.
            </p>
            <ul className="text-gray-300 text-sm mb-4 list-disc list-inside cursor-text">
              <li>Built an intuitive punch clock web app with a 75% user satisfaction rate.</li>
              <li>Developed a PIN-based punch-in/out system with precise server-side time tracking.</li>
              <li>Implemented a reporting module for admins to generate downloadable punch card reports.</li>
              <li>Integrated GeoFencing to restrict punch-ins outside designated locations.</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#61DAFB]/10 text-[#61DAFB] text-xs px-3 py-1 rounded-full cursor-text">React.js</span>
              <span className="bg-[#6DB33F]/10 text-[#6DB33F] text-xs px-3 py-1 rounded-full cursor-text">SpringBoot</span>
              <span className="bg-[#00758F]/10 text-[#00758F] text-xs px-3 py-1 rounded-full cursor-text">MySQL</span>
            </div>
          </div>

          {/* JeonSQL Project Card */}
          <div className="bg-[#] p-6 rounded-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-[#eebc86]/20 cursor-pointer">
            <h3 className="text-[#ebffff] text-xl font-semibold mb-8 sm:mb-4 flex flex-col flex-row sm:items-center justify-between">
              <div className="flex items-center mb-4 lg:mb-1"> 
                <FaDatabase className="w-8 h-8 text-green-500" /> {/* Database Icon */}
                <span className="cursor-text ml-4">JsonSQL</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-[#000000]/10 text-white text-xs px-3 py-1 rounded-sm border border-[#95B5] flex items-center gap-1">
                  <a href="https://github.com/BarsatKhadka/JsonSQL" target="_blank"><FaGithub className="inline text-white" /> Source</a>
                </span>
              </div>
            </h3>
            <p className="text-gray-400 text-sm mb-4 cursor-text">
              JSON Data Manipulation Library
            </p>
            <p className="text-gray-300 text-sm mb-4 cursor-text">
              JeonSQL is a Java library that allows developers to query JSON data using SQL-like syntax.
            </p>
            <ul className="text-gray-300 text-sm mb-4 list-disc list-inside cursor-text">
              <li>Built a Java library to filter, sort, and extract data from JSON using SQL-like syntax.</li>
              <li>Packaged as a Maven dependency with a simple API, reducing JSON processing complexity.</li>
              <li>Saved development time by 30% for JSON data manipulation tasks.</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#E76F00]/10 text-[#E76F00] text-xs px-3 py-1 rounded-full cursor-text">Java</span>
              <span className="bg-[#6DB33F]/10 text-[#6DB33F] text-xs px-3 py-1 rounded-full cursor-text">Jackson</span>
              <span className="bg-[#00758F]/10 text-[#00758F] text-xs px-3 py-1 rounded-full cursor-text">Maven</span>
            </div>
          </div>

          {/* EasyRepo Project Card */}
          <div className="bg-[#] p-6 rounded-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-[#eebc86]/20 cursor-pointer">
            <h3 className="text-[#ebffff] text-xl font-semibold mb-8 sm:mb-4 flex flex-col flex-row sm:items-center justify-between">
              <div className="flex items-center mb-4 lg:mb-1"> 
                <img src="./EasyRepoLogo.png" alt="Easy Repo Logo" className="w-8 h-8" />
                <span className="cursor-text ml-4">Easy Repo</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-[#000000]/10 text-white text-xs px-3 py-1 rounded-sm border border-[#95B5] flex items-center gap-1">
                  <a href="https://github.com/BarsatKhadka/Easy-Repo" target="_blank"><FaGithub className="inline text-white" /> Source</a>
                </span>
                <a href="https://easy-repo-six.vercel.app/" target="_blank"> 
                  <span className="relative bg-gradient-to-r from-[#6DB33F] to-[#8BC34A] text-black text-xs px-4 py-2 rounded-lg border border-[#6DB33F]/50 hover:shadow-lg hover:shadow-[#6DB33F]/40 transition-all duration-300 hover:scale-105 group">
                    Visit
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></span>
                  </span>
                </a>
                <span className="relative bg-[#0A0A0A] text-white text-xs px-4 py-2 rounded-lg border border-[#6DB33F]/50 hover:shadow-lg hover:shadow-[#6DB33F]/40 transition-all duration-300 hover:scale-105 group">
                  <Link to="/HowToCLI">How to CLI guide</Link>
                </span>
              </div>
            </h3>
            <p className="text-gray-400 text-sm mb-4 cursor-text">
              GitHub Repository Management Tool
            </p>
            <p className="text-gray-300 text-sm mb-4 cursor-text">
              Easy Repo is a full-stack web application designed to simplify GitHub repository management.
            </p>
            <ul className="text-gray-300 text-sm mb-4 list-disc list-inside cursor-text">
              <li>Secure OAuth2 login with GitHub for seamless authentication.</li>
              <li>Organize repositories into groups, rename or delete them with ease.</li>
              <li>Explore repositories in a detailed tree structure and analyze lines of code.</li>
              <li>Manage repositories through an integrated CLI available on the website.</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#6DB33F]/10 text-[#6DB33F] text-xs px-3 py-1 rounded-full cursor-text">SpringBoot</span>
              <span className="bg-[#61DAFB]/10 text-[#61DAFB] text-xs px-3 py-1 rounded-full cursor-text">React + Typescript</span>
              <span className="bg-[#00758F]/10 text-[#00758F] text-xs px-3 py-1 rounded-full cursor-text">PostgreSQL</span>
              <span className="bg-[#4EA225]/10 text-[#4EA225] text-xs px-3 py-1 rounded-full cursor-text">Spring Security</span>
            </div>
          </div>

          
          <div className="bg-[#] p-6 rounded-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-[#eebc86]/20 cursor-pointer">
            <h3 className="text-[#ebffff] text-xl font-semibold mb-8 sm:mb-4 flex flex-col flex-row sm:items-center justify-between">
              <div className="flex items-center mb-4 lg:mb-1"> 
                <FaRobot className="w-8 h-8 text-purple-500" /> 
                <span className="cursor-text ml-4">WordBuddy.ai</span>
              </div>
              <div className="flex gap-2">
                <span className="bg-[#000000]/10 text-white text-xs px-3 py-1 rounded-sm border border-[#95B5] flex items-center gap-1">
                  <a href="https://github.com/BarsatKhadka/WordBuddy.ai/tree/master" target="_blank"><FaGithub className="inline text-white" /> Source</a>
                </span>
                <a
                  href="https://www.youtube.com/watch?v=DELud7Xqsaw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative bg-gradient-to-r from-[#6DB33F] to-[#8BC34A] text-black text-xs px-4 py-2 rounded-lg border border-[#6DB33F]/50 hover:shadow-lg hover:shadow-[#6DB33F]/40 transition-all duration-300 hover:scale-105 group"
                >
                  Demo Video
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></span>
                </a>
              </div>
            </h3>
            <p className="text-gray-400 text-sm mb-4 cursor-text">
              AI-Powered Interactive Word Tutor for Kids
            </p>
            <p className="text-gray-300 text-sm mb-4 cursor-text">
              WordBuddy.ai addresses the vocabulary gap by combining AI-driven personalization, story-driven immersion, and gamified learning to build vocabulary confidence in children aged 4-12.
            </p>
            <ul className="text-gray-300 text-sm mb-4 list-disc list-inside cursor-text">
              <li>Developed story-based word adventures with AI-crafted narratives for engaging learning</li>
              <li>Implemented dyslexia support tools including OpenDyslexic font and phonetic highlighting</li>
              <li>Created location-based disaster awareness features that adapt content to user's region</li>
              <li>Built voice-only learning mode with visual phoneme breakdown and tap-to-listen functionality</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#61DAFB]/10 text-[#61DAFB] text-xs px-3 py-1 rounded-full cursor-text">React.js</span>
              <span className="bg-[#339933]/10 text-[#339933] text-xs px-3 py-1 rounded-full cursor-text">Node.js</span>
              <span className="bg-[#00758F]/10 text-[#00758F] text-xs px-3 py-1 rounded-full cursor-text">MySQL</span>
              <span className="bg-[#FF4154]/10 text-[#FF4154] text-xs px-3 py-1 rounded-full cursor-text">Zustand</span>
            </div>
          </div>
        </div>
      </div>

        </>
    )
}