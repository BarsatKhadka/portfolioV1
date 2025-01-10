import { IoFolderOpenOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { FaRobot, FaHeart } from "react-icons/fa";

export const Projects = () => {
  return (
    <>
      <div className="ml-8 mt-16 lg:ml-48">
        <p className="text-[#ebffff] mb-6"> 
          <IoFolderOpenOutline className="inline mr-1" /> Projects 
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mr-8 lg:mr-48">

                {/* First Project Card */}
        <div className="bg-[#] p-6 rounded-lg hover:scale-105 transform transition-all duration-500 hover:shadow-2xl hover:shadow-[#eebc86]/20 cursor-pointer">
        <h3 className="text-[#ebffff] text-xl font-semibold mb-8 sm:mb-4 flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center mb-4 lg:mb-1"> 
            <img src="./EasyRepoLogo.png" alt="Easy Repo Logo" className="w-8 h-8" />
            <span className="cursor-text ml-4">Easy Repo</span>
            </div>
            <div className="flex gap-2">
            <span className="bg-[#000000]/10 text-white text-xs px-3 py-1 rounded-sm border border-[#95B5] flex items-center gap-1">
                <FaGithub className="inline text-white" /> Source
            </span>
            <span className="relative bg-gradient-to-r from-[#6DB33F] to-[#8BC34A] text-black text-xs px-4 py-2 rounded-lg border border-[#6DB33F]/50 hover:shadow-lg hover:shadow-[#6DB33F]/40 transition-all duration-300 hover:scale-105 group">
                Visit
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></span>
            </span>
            </div>
        </h3>
        <p className="text-gray-400 text-sm mb-4 cursor-text">
            GitHub Repository Management Tool
        </p>
        <p className="text-gray-300 text-sm mb-4 cursor-text">
            Easy Repo is a powerful full-stack web application designed to simplify your GitHub repository management experience. Key features include:
        </p>
        <ul className="text-gray-300 text-sm mb-4 list-disc list-inside cursor-text">
            <li>Secure <span className="font-bold text-[#95B54C]">OAuth2 login </span>with Github for seamless authentication.</li>
            <li> Organize repositories <span className="font-bold text-[#E58C8A]">into groups, rename or delete them</span> with ease.</li>
            <li>Open repositories directly in <span className="font-bold text-[#95B54C]">VS Code</span>.</li>
            <li>Explore repositories in a <span className="font-bold text-[#E58C8A]">detailed tree structure</span> and analyze lines of code.</li>
            <li>Manage repositories through an <span className="font-bold text-[#95B54C]">integrated CLI</span> available on the website.</li>
        </ul>
        <div className="flex flex-wrap gap-2">
            <span className="bg-[#6DB33F]/10 text-[#6DB33F] text-xs px-3 py-1 rounded-full cursor-text">SpringBoot</span>
            <span className="bg-[#61DAFB]/10 text-[#61DAFB] text-xs px-3 py-1 rounded-full cursor-text">React + Typescript</span>
            <span className="bg-[#00758F]/10 text-[#61DAFB] text-xs px-3 py-1 rounded-full cursor-text">MySQL</span>
            <span className="bg-[#4EA225]/10 text-[#4EA225] text-xs px-3 py-1 rounded-full cursor-text">Spring Security</span>
        </div>
        </div>

          {/* Second Project Card */}
        <div className="bg-[#] p-6 rounded-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-[#eebc86]/20 cursor-pointer">
        <h3 className="text-[#ebffff] text-xl font-semibold mb-8 sm:mb-4 flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center mb-4 lg:mb-1"> 
            <FaRobot className="w-8 h-8 text-pink-500" />
            <FaHeart className="w-4 h-4 text-red-500 -ml-2" />
            <span className="cursor-text ml-4">AI Dating Bot</span>
            </div>
            <div className="flex gap-2">
            <span className="bg-[#000000]/10 text-white text-xs px-3 py-1 rounded-sm border border-[#95B5] flex items-center gap-1">
                <FaGithub className="inline text-white" /> Source
            </span>
            <span className="relative bg-gradient-to-r from-[#6DB33F] to-[#8BC34A] text-black text-xs px-4 py-2 rounded-lg border border-[#6DB33F]/50 hover:shadow-lg hover:shadow-[#6DB33F]/40 transition-all duration-300 hover:scale-105 group">
                Read Me
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></span>
            </span>
            </div>
        </h3>
        <p className="text-gray-400 text-sm mb-4 cursor-text">
            AI-Powered Dating Application
        </p>
        <p className="text-gray-300 text-sm mb-4 cursor-text">
            The AI Dating Bot is a full-stack dating application that combines the swipe-and-match mechanics of popular dating apps with advanced AI capabilities. Key features include:
        </p>
        <ul className="text-gray-300 text-sm mb-4 list-disc list-inside cursor-text">
            <li> RESTful API development, <span className="font-bold text-[#6DB33F]">integration of AI services </span> (GPT-4, Stable Diffusion), and efficient data management using MongoDB.</li>
            <li><span className="font-bold text-[#D22D2B]">Developers can set up their own models or download models </span> from Hugging Face for custom image generation (e.g., creating their own waifu). Detailed instructions are provided for setup.</li>
            <li><span className="font-bold text-[#E58C8A]">AI-Generated Profiles</span>: GPT-4 generates diverse and interesting fictional profiles, showcasing dynamic content creation.</li>
            <li>Engage in conversations with AI-driven chatbots, each with a unique personality <span className="font-bold text-[#95B54C]">based on the generated profile.</span></li>
            <li>Profile pictures created using Stable Diffusion, demonstrating the<span className="font-bold text-[#FFD43B]"> integration of multiple AI models.</span></li>
        </ul>
        <div className="flex flex-wrap gap-2">
            <span className="bg-[#6DB33F]/10 text-[#6DB33F] text-xs px-3 py-1 rounded-full cursor-text">SpringBoot</span>
            <span className="bg-[#61DAFB]/10 text-[#61DAFB] text-xs px-3 py-1 rounded-full cursor-text">React.js</span>
            <span className="bg-[#FFD43B]/20 text-[#FFD43B] text-xs px-3 py-1 rounded-full cursor-text">Python</span>
            <span className="bg-[#6E6E6E]/10 text-[#6E6E6E] text-xs px-3 py-1 rounded-full cursor-text">Stable Diffusion</span>
            <span className="bg-[#47A248]/10 text-[#47A248] text-xs px-3 py-1 rounded-full cursor-text">MongoDB</span>
        </div>
        </div>

       {/* Third Project Card */}
<div className="bg-[#] p-6 rounded-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-[#eebc86]/20 cursor-pointer">
  <h3 className="text-[#ebffff] text-xl font-semibold mb-8 sm:mb-4 flex flex-col sm:flex-row sm:items-center justify-between">
    <div className="flex items-center mb-4 lg:mb-1"> 
      <BsDatabaseFillCheck className="w-8 h-8" /> 
      <span className="cursor-text ml-4">Safe Store DBMS</span>
    </div>
    <div className="flex gap-2">
      <span className="bg-[#000000]/10 text-white text-xs px-3 py-1 rounded-sm border border-[#95B5] flex items-center gap-1">
        <FaGithub className="inline text-white" /> Source
      </span>
      <span className="relative bg-gradient-to-r from-[#6DB33F] to-[#8BC34A] text-black text-xs px-4 py-2 rounded-lg border border-[#6DB33F]/50 hover:shadow-lg hover:shadow-[#6DB33F]/40 transition-all duration-300 hover:scale-105 group">
        How to Setup
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></span>
      </span>
    </div>
  </h3>
  <p className="text-gray-400 text-sm mb-4 cursor-text">
    Database Backup and Restore Utility
  </p>
  <p className="text-gray-300 text-sm mb-4 cursor-text">
    Safe Store DBMS is a CLI tool for automating database backups and restores. It supports 
    <span className="font-bold text-[#6DB33F]"> MySQL</span>, 
    <span className="font-bold text-[#336791]"> PostgreSQL</span>, and 
    <span className="font-bold text-[#47A248]"> MongoDB</span>. Features include:
  </p>
  <ul className="text-gray-300 text-sm mb-4 list-disc list-inside cursor-text">
    <li>Full, incremental, and differential backups with compression.</li>
    <li>Local and cloud storage (AWS S3, Google Cloud, Azure Blob).</li>
    <li>Selective restore for tables or collections.</li>
    <li>Logging and Slack notifications.</li>
  </ul>
  <div className="flex flex-wrap gap-2">
    <span className="bg-[#E76F00]/10 text-[#E76F00] text-xs px-3 py-1 rounded-full cursor-text">Java</span>
    <span className="bg-[#61DAFB]/10 text-[#61DAFB] text-xs px-3 py-1 rounded-full cursor-text">JDBC</span>
    <span className="bg-[#00758F]/10 text-[#00758F] text-xs px-3 py-1 rounded-full cursor-text">MySQL</span>
    <span className="bg-[#336791]/10 text-[#336791] text-xs px-3 py-1 rounded-full cursor-text">PostgreSQL</span>
    <span className="bg-[#47A248]/10 text-[#47A248] text-xs px-3 py-1 rounded-full cursor-text">MongoDB</span>
  </div>
</div>
        </div>
      </div>
    </>
  );
};