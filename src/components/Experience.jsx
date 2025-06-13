import React from "react";

const experiences = [
  {
    company: "Crystal ERP",
    role: "Web/App Developer Intern",
    date: "May 2024 – Aug 2024",
    location: "Koshi, Nepal",
  },
  {
    company: "Namo Buddha Computer Service Center",
    role: "Computer Hardware Repairing Intern",
    date: "Dec 2023 – Mar 2024",
    location: "Koshi, Nepal",
  },
];

/**
 * Experience component that adapts between light and dark themes via `isDarkMode` prop.
 *
 * @param {Object} props
 * @param {boolean} props.isDarkMode - When true, renders the dark‑glass style; otherwise, light‑card variant.
 */
export default function Experience({ isDarkMode = false }) {
  const headingClass = `text-2xl font-semibold mb-8 font-header pt-2 ${isDarkMode ? "!text-white" : "text-black"}`;
  const cardClass = isDarkMode
    ? "bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-gray-600/50 hover:scale-[1.02]"
    : "bg-white/80 backdrop-blur border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md hover:border-gray-300";
  const roleClass = isDarkMode
    ? "text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200"
    : "text-lg font-semibold text-gray-900";
  const companyClass = isDarkMode ? "text-sm text-blue-400 font-medium" : "text-sm text-gray-600";
  const locationClass = isDarkMode ? "text-xs text-gray-400" : "text-xs text-gray-600";
  const dateClass = isDarkMode
    ? "text-xs text-gray-500 bg-gray-800/40 px-2 py-1 rounded-md w-fit mt-1"
    : "text-xs text-gray-500";

  return (
    <section className="my-6 w-full pl-4 font-sans">
      <h2 className={headingClass}>Experience</h2>
      <div className="grid gap-6">
        {experiences.map((exp, idx) => (
          <div key={idx} className={cardClass}>
            <div className="flex flex-col gap-2 group">
              <h3 className={roleClass}>{exp.role}</h3>
              <div className={companyClass}>{exp.company}</div>
              <div className="flex items-center gap-2">
                {isDarkMode && <span className="w-1 h-1 bg-gray-500 rounded-full" />} {/* dot only in dark mode */}
                <span className={locationClass}>{exp.location}</span>
              </div>
              <div className={dateClass}>{exp.date}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
