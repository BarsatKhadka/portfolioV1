import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="bg-[#1C1917] border-t border-[#000000]/20 py-4 fixed bottom-0 left-0 w-full sm:mt-4 shadow-lg shadow-black/10">
      <div className="container mx-auto px-4 lg:px-48">
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Barsat Khadka
            <span className="hidden sm:inline ml-2">- Friend of Computer</span>
          </p>

          <div className="flex gap-5">
            <a
              href="https://github.com/barsatKhadka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#eebc86] transition-all duration-300"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/barsat-khadka/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#eebc86] transition-all duration-300"
            >
              <FaLinkedin className="w-5 h-5"/>
            </a>
            <a
              href="https://leetcode.com/u/BarsatKhadka/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#eebc86] transition-all duration-300"
            >
              <SiLeetcode className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};