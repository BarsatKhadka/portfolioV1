import { IoFolderOpenOutline } from "react-icons/io5";
import { FaGithub, FaCode, FaTerminal } from "react-icons/fa";
import { Link } from "react-router-dom";

export const LowLevelProjects = () => {
  return (
    <div className="ml-8 mt-16 lg:ml-48">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-6">
        <IoFolderOpenOutline className="text-[#6DB33F] w-8 h-8" />
        <p className="text-2xl font-bold text-white">Low Level Projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mr-8 lg:mr-8">
        {/* Interpreter Project Card */}
        <div className="bg-[#1E1E1E] p-6 rounded-lg hover:scale-105 transform transition-all duration-500 hover:shadow-2xl hover:shadow-[#eebc86]/20 cursor-pointer">
          <h3 className="text-[#ebffff] text-xl font-semibold mb-6 flex items-center gap-3">
            <FaCode className="w-7 h-7 text-yellow-400" />
            <span className="cursor-text">C Interpreter</span>
          </h3>

          <p className="text-gray-400 text-sm mb-4 cursor-text">
            A simple C-like interpreter built while following the{" "}
            <span className="text-[#61DAFB]">Crafting Interpreters</span> book.
          </p>

          <ul className="text-gray-300 text-sm mb-4 list-disc list-inside cursor-text">
            <li>Implements a tree-walk interpreter for an expression-based language.</li>
            <li>Supports arithmetic, boolean expressions, and control structures.</li>
            <li>Uses recursive descent parsing to generate an AST.</li>
            <li>Written in C with a focus on memory management and performance.</li>
          </ul>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-[#A8B9CC]/10 text-[#A8B9CC] text-xs px-3 py-1 rounded-full cursor-text">
              C
            </span>
            <span className="bg-[#E44D26]/10 text-[#E44D26] text-xs px-3 py-1 rounded-full cursor-text">
              Compilers
            </span>
            <span className="bg-[#F7DF1E]/10 text-[#F7DF1E] text-xs px-3 py-1 rounded-full cursor-text">
              Parsing
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <a
              href="https://github.com/BarsatKhadka/Simple-C-Interpreter"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#24292E] hover:bg-[#333] text-white text-xs px-4 py-2 rounded-md flex items-center gap-2 transition-all"
            >
              <FaGithub className="text-white" /> Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
