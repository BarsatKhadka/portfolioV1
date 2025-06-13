import React from "react";
import { SiPython, SiTypescript, SiMysql, SiReact, SiSpringboot, SiFastapi, SiTailwindcss, SiGit, SiPostman, SiSwagger } from "react-icons/si";
import { DiJava } from "react-icons/di";
import { FiDatabase } from "react-icons/fi";
import { IoLogoJavascript } from "react-icons/io";

const skills = [
  {
    category: "Languages",
    items: [
      { name: "Java", icon: <DiJava className="inline mr-1" color="#007396" /> },
      { name: "Python", icon: <SiPython className="inline mr-1" color="#3776AB" /> },
      { name: "JavaScript", icon: <IoLogoJavascript className="inline mr-1" color="#F7DF1E" size="1.2em" /> },
      { name: "TypeScript", icon: <SiTypescript className="inline mr-1" color="#3178C6" /> },
      { name: "SQL", icon: <SiMysql className="inline mr-1" color="#00758F" /> },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "React", icon: <SiReact className="inline mr-1" color="#61DAFB" /> },
      { name: "Spring Boot", icon: <SiSpringboot className="inline mr-1" color="#6DB33F" /> },
      { name: "FastAPI", icon: <SiFastapi className="inline mr-1" color="#009688" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="inline mr-1" color="#38BDF8" /> },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: <SiGit className="inline mr-1" color="#F05032" /> },
      { name: "Postman", icon: <SiPostman className="inline mr-1" color="#FF6C37" /> },
      { name: "DBeaver", icon: <FiDatabase className="inline mr-1" color="#4A90E2" /> },
      { name: "REST APIs", icon: <SiSwagger className="inline mr-1" color="#85EA2D" /> },
    ],
  },
];

/**
 * Skills component that adapts its look & feel based on the `isDarkMode` prop.
 *
 * @param {Object} props
 * @param {boolean} props.isDarkMode - Toggles between dark and light variants.
 */
export default function Skills({ isDarkMode = false }) {
  const headingClass = `
  text-2xl font-semibold mb-8 font-header 
  ${isDarkMode ? '!text-white' : 'text-black'}
`;
  const groupClass = isDarkMode
    ? "rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-5 hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
    : "rounded-lg border border-gray-200 bg-white/80 p-4";
  const codeClass = isDarkMode
    ? "text-sm bg-gray-800/60 border border-gray-700/40 px-3 py-1.5 rounded-lg font-mono text-gray-200 flex items-center hover:bg-gray-700/60 hover:border-gray-600/60 transition-all duration-200 hover:scale-105"
    : "text-sm bg-slate-100 px-2 py-1 rounded font-mono text-gray-700 flex items-center";

  return (
    <section className="my-8 w-full">
      <h2 className= {headingClass}>Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((group) => (
          <div key={group.category} className={groupClass}>
            <div className={`font-semibold mb-3 text-sm uppercase tracking-wide ${isDarkMode ? "text-blue-400" : "text-gray-800"}`}>
              {group.category}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <code key={item.name} className={codeClass}>
                  {item.icon}
                  {item.name}
                </code>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
