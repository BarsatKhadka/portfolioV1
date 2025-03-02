import { IoFolderOpenOutline } from "react-icons/io5";
import { FaGithub, FaClock, FaDatabase, FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";

export const WebProjects = () => {
  return (
    <>
      <div className="ml-8 mt-16 lg:ml-48">
        <div className="flex items-center gap-2 mb-6">
          <IoFolderOpenOutline className="text-[#6DB33F] w-8 h-8" />
          <p className="text-2xl font-bold text-white">Web Projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mr-8 lg:mr-8">
          {/** Project Cards */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#] p-6 rounded-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:shadow-[#eebc86]/20 cursor-pointer"
            >
              <h3 className="text-[#ebffff] text-xl font-semibold mb-8 sm:mb-4 flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-center mb-4 lg:mb-1">
                  {project.icon}
                  <span className="cursor-text ml-4">{project.name}</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative bg-gradient-to-r from-[#6DB33F] to-[#8BC34A] text-black text-xs px-4 py-2 rounded-lg border border-[#6DB33F]/50 hover:shadow-lg hover:shadow-[#6DB33F]/40 transition-all duration-300 hover:scale-105 group"
                  >
                    <FaGithub className="inline text-black" /> Source
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></span>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative bg-gradient-to-r from-[#6DB33F] to-[#8BC34A] text-black text-xs px-4 py-2 rounded-lg border border-[#6DB33F]/50 hover:shadow-lg hover:shadow-[#6DB33F]/40 transition-all duration-300 hover:scale-105 group"
                    >
                      Demo Video
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></span>
                    </a>
                  )}
                </div>
              </h3>
              <p className="text-gray-400 text-sm mb-4 cursor-text">{project.description}</p>
              <ul className="text-gray-300 text-sm mb-4 list-disc list-inside cursor-text">
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className={`bg-[${tech.color}]/10 text-[${tech.color}] text-xs px-3 py-1 rounded-full cursor-text`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const projects = [
  {
    name: "PunchClock Plus",
    icon: <FaClock className="w-8 h-8 text-blue-500" />, 
    source: "https://github.com/BarsatKhadka/Punch-Clock-Plus",
    description: "Employee Time-Tracking Application",
    features: [
      "Built an intuitive punch clock web app with a 75% user satisfaction rate.",
      "Developed a PIN-based punch-in/out system with precise server-side time tracking.",
      "Implemented a reporting module for admins to generate downloadable punch card reports.",
      "Integrated GeoFencing to restrict punch-ins outside designated locations."
    ],
    technologies: [
      { name: "React.js", color: "#61DAFB" },
      { name: "SpringBoot", color: "#6DB33F" },
      { name: "MySQL", color: "#00758F" }
    ]
  },
  {
    "name": "JsonSQL",
    "icon": <FaDatabase className="w-8 h-8 text-green-500" />,
    "source": "https://github.com/BarsatKhadka/JsonSQL",
    "description": "JSON Data Manipulation Library",
    "features": [
      "Built a Java library to filter, sort, and extract data from JSON using SQL-like syntax.",
      "Packaged as a Maven dependency with a simple API, reducing JSON processing complexity.",
      "Saved development time by 30% for JSON data manipulation tasks."
    ],
    "technologies": [
      { "name": "Java", "color": "#E76F00" },
      { "name": "Jackson", "color": "#6DB33F" },
      { "name": "Maven", "color": "#00758F" }
    ]
  },
  {
    "name": "Easy Repo",
    "icon": <img src="./EasyRepoLogo.png" alt="Easy Repo Logo" className="w-8 h-8" />,
    "source": "https://github.com/BarsatKhadka/Easy-Repo",
    "demo": "https://easy-repo-six.vercel.app/",
    "description": "GitHub Repository Management Tool",
    "features": [
      "Secure OAuth2 login with GitHub for seamless authentication.",
      "Organize repositories into groups, rename or delete them with ease.",
      "Explore repositories in a detailed tree structure and analyze lines of code.",
      "Manage repositories through an integrated CLI available on the website."
    ],
    "technologies": [
      { "name": "SpringBoot", "color": "#6DB33F" },
      { "name": "React + Typescript", "color": "#61DAFB" },
      { "name": "PostgreSQL", "color": "#00758F" },
      { "name": "Spring Security", "color": "#4EA225" }
    ]
  },
  {
    "name": "WordBuddy.ai",
    "icon": <FaRobot className="w-8 h-8 text-purple-500" />,
    "source": "https://github.com/BarsatKhadka/WordBuddy.ai/tree/master",
    "demo": "https://www.youtube.com/watch?v=DELud7Xqsaw",
    "description": "AI-Powered Interactive Word Tutor for Kids",
    "features": [
      "Developed story-based word adventures with AI-crafted narratives for engaging learning.",
      "Implemented dyslexia support tools including OpenDyslexic font and phonetic highlighting.",
      "Created location-based disaster awareness features that adapt content to user's region.",
      "Built voice-only learning mode with visual phoneme breakdown and tap-to-listen functionality."
    ],
    "technologies": [
      { "name": "React.js", "color": "#61DAFB" },
      { "name": "Node.js", "color": "#339933" },
      { "name": "MySQL", "color": "#00758F" },
      { "name": "Zustand", "color": "#FF4154" }
    ]
  }

];
