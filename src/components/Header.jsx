import { IoLocationOutline } from "react-icons/io5";
import { FaLandmarkDome } from "react-icons/fa6";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="ml-4 mt-12 lg:ml-48 relative"
    >
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#eebc86]/20 to-transparent rounded-full blur-xl z-0"></div>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="mb-2 lg:mb-1">
            <span className="text-[#ebffff] text-2xl font-semibold">Barsat Khadka</span>{" "}
            <span className="text-sm block lg:inline mt-1 lg:mt-0 lg:ml-8 italic text-[#eebc86]/80">
              Seeking SWE Internships @2025
            </span>
          </p>
        </motion.div>
        
        <motion.a 
          href="https://drive.google.com/uc?export=download&id=1rWkeP-cbAEC6UAuxhECA63DnggSOfFg3" 
          className="text-[#ebffff] underline mb-4 lg:mb-0 lg:mr-64 hover:text-[#eebc86] transition-colors duration-300 relative group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          Resume
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#eebc86] group-hover:w-full transition-all duration-300"></span>
        </motion.a>
      </div>

      <motion.p 
        className="mb-6 text-gray flex items-center flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <span className="text-sm flex items-center mr-6">
          <IoLocationOutline className="inline mr-1 text-[#eebc86]" /> USA
        </span>
        <span className="text-sm italic mt-1 lg:mt-0 flex items-center">
          <FaLandmarkDome className="inline mr-1 text-[#eebc86]" />
          Bachelor of Science, Computer Engineering
        </span>
      </motion.p>

      <div className="bg-[#1C1917]/50 backdrop-blur-sm p-4 rounded-lg border border-[#000000]/20 shadow-lg">
        <motion.p 
          className="text-sm mb-3 sm:mr-8 flex flex-wrap items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <span className="text-[#eebc86] sm:mr-2 font-medium min-w-24">Languages:</span>
          <span className="text-gray-300">Java, Python, Javascript, Typescript, SQL, C++</span>
        </motion.p>

        <motion.p 
          className="text-sm mb-3 sm:mr-8 flex flex-wrap items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.3 }}
        >
          <span className="text-[#eebc86] sm:mr-2 font-medium min-w-24">Frameworks:</span>
          <span className="text-gray-300">SpringBoot, Spring Security, React.js, Tailwind CSS</span>
        </motion.p>

        <motion.p 
          className="text-sm sm:mr-8 flex flex-wrap items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.3 }}
        >
          <span className="text-[#eebc86] sm:mr-2 font-medium min-w-24">Extras:</span>
          <span className="text-gray-300">JPA, Maven, Postman API, Docker, Git, AWS, Linux</span>
        </motion.p>
      </div>
    </motion.div>
  );
};
