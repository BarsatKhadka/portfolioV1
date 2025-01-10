import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";


export const Footer = () => {
  return (
    <footer className="bg-[#1C1917] border-t border-[#000000]/10 py-4 fixed  bottom-0 left-0 w-full sm:mt-4">
      <div className="container mx-auto px-4 lg:px-48">
        <div className="flex items-center justify-between">
          <p className="text-[#] text-sm">
            &copy; {new Date().getFullYear()} Barsat Khadka.
          </p>

          <div className="flex gap-4">
            <a
              href="https://github.com/barsatKhadka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#] hover:text-[#eebc86]/80 transition-all duration-300 hover:scale-110"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/barsat-khadka/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#] hover:text-[#eebc86]/80 transition-all duration-300 hover:scale-110"
            >
              <FaLinkedin className="w-5 h-5"/>
            </a>
            <a
              href="https://leetcode.com/u/BarsatKhadka/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[] hover:text-[#eebc86]/80 transition-all duration-300 hover:scale-110"
            >
              <SiLeetcode className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};