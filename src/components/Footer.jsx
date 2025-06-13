import React from "react";

/**
 * Footer component that toggles styles based on `isDarkMode` prop.
 *
 * @param {Object} props
 * @param {boolean} props.isDarkMode - Enable dark theme if true; defaults to light.
 */
export default function Footer({ isDarkMode = false }) {
  const wrapperClass = isDarkMode
    ? "mt-12 text-center text-xs text-gray-500 border-t border-gray-800/50 pt-6"
    : "mt-12 text-center text-xs text-gray-400";

  return (
    <footer className={wrapperClass}>
      {isDarkMode ? (
        <div className="flex items-center justify-center gap-2">
          <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
          <span>&copy; {new Date().getFullYear()} Barsat Khadka. All rights reserved.</span>
          <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
        </div>
      ) : (
        <div>&copy; {new Date().getFullYear()} Barsat Khadka. All rights reserved.</div>
      )}
    </footer>
  );
}
