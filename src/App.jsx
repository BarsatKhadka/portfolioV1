import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { FiMail, FiGithub, FiLinkedin, FiFileText, FiMapPin } from 'react-icons/fi';
import { FaStar, FaCodeBranch } from 'react-icons/fa';
import projectImage from './assets/image.png';
import canvasImage from './components/canvas.png';

// --- Data ---
const ongoingProjects = [
  {
    title: 'Vinaya Journal',
    description: 'Offline-first AI journaling app with private local LLM and mood analysis.',
    link: 'https://vinaya-journal.vercel.app/',
    github: 'https://github.com/BarsatKhadka/Vinaya-Journal',
    status: 'ongoing'
  }
];

const previousProjects = [
  {
    title: 'Wordbuddy.ai',
    description: 'Voice-driven, gamified learning for kids with dyslexia support.',
    github: 'https://github.com/BarsatKhadka/WordBuddy.ai',
    status: '2024',
    year: '2024'
  },
  {
    title: 'EasyRepo',
    description: 'GitHub Repository Management System with OAuth and interactive graphs.',
    github: 'https://github.com/BarsatKhadka/Easy-Repo',
    status: '2023',
    year: '2023'
  },
  {
    title: 'PrepAI',
    description: 'AI-powered assistant that turns PDFs into quizzes, flashcards, and study plans.',
    github: 'https://github.com/BarsatKhadka/PrepAI',
    status: '2024',
    year: '2024'
  }
];

const research = [
  {
    title: 'Multiphase Social Engineering Attack Detection using GNN and BERT',
    status: 'ongoing',
    link: null
  },
  {
    title: 'Comprehensive Graph Dataset for Placement-CTS Interaction in RTL to GSDII Flow',
    status: 'ongoing',
    link: null
  }
];

const publications = [
  {
    title: 'Converting Netlist to VCD and VCD to SAIF Open Source',
    description: 'Open source tool for EDA workflows',
    type: 'Tool',
    year: '2024'
  }
];

const education = {
  school: "The University of Southern Mississippi",
  degree: "Computer Engineering",
  year: "Class of 2028"
};

export default function App() {
  const [activeProjectType, setActiveProjectType] = useState('ongoing');
  const [repoStats, setRepoStats] = useState({ stars: 0, forks: 0 });
  const [activeSection, setActiveSection] = useState('about');
  const sectionsRef = useRef({});

  useEffect(() => {
    const fetchRepoStats = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/BarsatKhadka/Vinaya-Journal');
        const data = await response.json();
        setRepoStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0
        });
      } catch (error) {
        console.error('Failed to fetch repo stats:', error);
      }
    };

    fetchRepoStats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px' }
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Analytics />

      <div className="flex">
        {/* Left Sidebar - Sticky */}
        <aside className="sidebar w-[420px] flex-shrink-0 border-r border-[#e5e7eb] bg-white sticky top-0 h-screen overflow-y-auto">
          <div className="p-8">
            {/* Name */}
            <h1 className="mb-2 mt-2 text-6xl">Barsat Khadka</h1>
            <p className="mb-4 text-sm text-[#6b7280] flex items-center gap-2">
              <FiMapPin size={14} />
              Greater Hattiesburg Area, Mississippi, USA
            </p>
            
            {/* Title/Affiliation */}
            <div className="mb-8 text-base text-[#6b7280] leading-relaxed">
              <div className="flex items-start gap-3 mt-4 pt-4">
                <div className="w-12 h-12 rounded-lg bg-[#FFD700] flex items-center justify-center flex-shrink-0">
                  <img src={canvasImage} alt="University" className="w-8 h-8 object-contain -mt-0.5" />
                </div>
                <p className="text-sm leading-[1.1]">
                  {education.school}
                  <br />
                  {education.degree}
                  <br />
                  {education.year}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mb-8">
              <ul className="space-y-2 text-lg font-['Inter']">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('about');
                    }}
                    className={`block py-2 transition-colors ${
                      activeSection === 'about' 
                        ? 'text-[#1e40af] font-medium' 
                        : 'text-[#0a0a0a]/70 hover:text-[#1e40af]'
                    }`}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#research"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('research');
                    }}
                    className={`block py-2 transition-colors ${
                      activeSection === 'research' 
                        ? 'text-[#1e40af] font-medium' 
                        : 'text-[#0a0a0a]/70 hover:text-[#1e40af]'
                    }`}
                  >
                    Research
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('projects');
                    }}
                    className={`block py-2 transition-colors ${
                      activeSection === 'projects' 
                        ? 'text-[#1e40af] font-medium' 
                        : 'text-[#0a0a0a]/70 hover:text-[#1e40af]'
                    }`}
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#publications"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('publications');
                    }}
                    className={`block py-2 transition-colors ${
                      activeSection === 'publications' 
                        ? 'text-[#1e40af] font-medium' 
                        : 'text-[#0a0a0a]/70 hover:text-[#1e40af]'
                    }`}
                  >
                    Blogs
                  </a>
                </li>
              </ul>
            </nav>

            {/* Contact Icons moved to About section */}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content flex-1 max-w-[900px] px-0" style={{ marginLeft: '80px' }}>
          {/* About Section */}
          <section
            id="about"
            ref={(el) => (sectionsRef.current.about = el)}
            className="pt-8 mb-[60px] px-8"
          >
            <div className="text-[16px] leading-[1.9] max-w-none">
              <h2 className="mb-4">
                Currently
              </h2>
              <p className="mb-4">
                Research Assistant,{' '}
                <a
                  href="https://www.usm.edu/advanced-analytics-security/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide external-link"
                >
                  Institute of Advanced Analytics and Security
                </a>
              </p>
              <p className="mb-8">ML Researcher, Cyber Innovations Lab</p>
              <div className="mb-6 space-y-4">
                <p>
                  Growing up in Nepal shaped my belief in open source as a way to expand access to knowledge. It's why I'm so invested in projects like Vinaya and exploring the OpenLane 2 ecosystem. I believe that open source isn't just a way to build software; it's a way to level the playing field.
                </p>
                <p>
                  I've always had the vision of being a scientist, and I love doing research for the sake of science and the craft. Most of my time is spent between research papers, quiet work, music, commute to university, meetings, cooking, and gaming.
                </p>
                <p>
                  My handles are below. feel free to reach out if something in my work interests you or if you'd like to talk or collaborate.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 text-[15px] font-['Inter']">
                <a
                  href="mailto:khadkabarsat598@gmail.com"
                  className="link-slide flex items-center gap-2"
                >
                  <FiMail size={16} />
                  Email
                </a>
                <a
                  href="https://github.com/BarsatKhadka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide flex items-center gap-2"
                >
                  <FiGithub size={16} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/barsat-khadka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide flex items-center gap-2"
                >
                  <FiLinkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href="https://drive.google.com/file/d/1wOP0CS3UARHHvoPbmoC4Q2dHNSnyMDn8/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide flex items-center gap-2"
                >
                  <FiFileText size={16} />
                  Resume
                </a>
              </div>
            </div>
          </section>

          {/* Research Section */}
          <section
            id="research"
            ref={(el) => (sectionsRef.current.research = el)}
            className="mb-[120px] px-8"
          >
            <h2 className="mb-[60px]">Research</h2>
            <div className="space-y-6">
              {research.map((item, index) => (
                <div key={index} className="card bg-white rounded p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="max-w-3xl text-lg font-normal font-['Inter']">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="link-slide external-link">
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </h3>
                    <span className={`status-badge ${item.status === 'ongoing' ? 'status-ongoing' : ''}`}>
                      [{item.status.toUpperCase()}]
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            ref={(el) => (sectionsRef.current.projects = el)}
            className="mb-[120px] px-8"
          >
            <div className="flex items-center justify-between mb-[60px]">
              <h2>Projects</h2>
              <div className="flex gap-4 text-sm font-['Inter']">
                <button
                  onClick={() => setActiveProjectType('ongoing')}
                  className={`transition-colors ${
                    activeProjectType === 'ongoing'
                      ? 'text-[#1e40af] font-medium'
                      : 'text-[#0a0a0a]/60 hover:text-[#1e40af]'
                  }`}
                >
                  Ongoing
                </button>
                <span className="text-[#0a0a0a]/30">/</span>
                <button
                  onClick={() => setActiveProjectType('previous')}
                  className={`transition-colors ${
                    activeProjectType === 'previous'
                      ? 'text-[#1e40af] font-medium'
                      : 'text-[#0a0a0a]/60 hover:text-[#1e40af]'
                  }`}
                >
                  Previous
                </button>
              </div>
            </div>

            <div className="space-y-10">
              {activeProjectType === 'ongoing' && ongoingProjects.map((project, index) => (
                <article key={index} className="card bg-white rounded p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3>
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-slide external-link">
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <span className={`status-badge ${project.status === 'ongoing' ? 'status-ongoing' : ''}`}>
                      [{project.status.toUpperCase()}]
                    </span>
                  </div>

                  <div className="indent-25 mb-6">
                    <p className="text-[16px] leading-[1.9] text-[#0a0a0a]/70">{project.description}</p>
                  </div>

                  {project.title === 'Vinaya Journal' && (
                    <div className="mb-6 flex items-center gap-4 text-[13px] text-[#6b7280] font-['Inter']">
                      <span>★ {repoStats.stars}</span>
                      <span>⑂ {repoStats.forks}</span>
                    </div>
                  )}

                  <div className="space-y-2 text-[13px] font-['Inter'] text-[#6b7280]">
                    {project.github && (
                      <div>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-slide external-link text-[#1e40af]"
                        >
                          {project.github.replace('https://', '')}
                        </a>
                      </div>
                    )}
                    {project.link && (
                      <div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-slide external-link text-[#1e40af]"
                        >
                          {project.link.replace('https://', '')}
                        </a>
                      </div>
                    )}
                  </div>

                  {project.title === 'Vinaya Journal' && (
                    <div className="mt-8">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={projectImage}
                          alt="Vinaya Journal"
                          className="w-full rounded border border-[#e5e7eb]"
                        />
                      </a>
                    </div>
                  )}
                </article>
              ))}

              {activeProjectType === 'previous' && previousProjects.map((project, index) => (
                <article key={index} className="card bg-white rounded p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-slide external-link">
                          {project.title}
                        </a>
                      )}
                    </h3>
                    <span className="status-badge">[{project.status}]</span>
                  </div>

                  <div className="indent-25 mb-6">
                    <p className="text-[16px] leading-[1.9] text-[#0a0a0a]/70">{project.description}</p>
                  </div>

                  {project.github && (
                    <div className="text-[13px] font-['Inter'] text-[#6b7280]">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-slide external-link text-[#1e40af]"
                      >
                        {project.github.replace('https://', '')}
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Blogs Section */}
          <section
            id="publications"
            ref={(el) => (sectionsRef.current.publications = el)}
            className="mb-[120px] px-8"
          >
            <h2 className="mb-[60px]">Blogs</h2>
            <div className="space-y-8">
              {publications.map((pub, index) => (
                <div key={index} className="text-[16px] leading-[1.9]">
                  <p className="mb-2 font-medium">{pub.title}</p>
                  <p className="text-[#0a0a0a]/70 mb-2">{pub.description}</p>
                  <p className="meta-text">{pub.type} • {pub.year}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Right Sidebar - Previously */}
        <aside className="hidden lg:block w-[260px] flex-shrink-0 ml-16 mr-16 pt-8 text-sm font-['Inter']">
          <h2 className="mb-4">
            Previously
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-1">Software Engineering Intern</p>
              <p className="text-[#6b7280] text-xs">Sports Media</p>
            </div>
            <div>
              <p className="font-medium mb-1">Web/App Developer Intern</p>
              <p className="text-[#6b7280] text-xs">Crystal ERP</p>
            </div>
            <div>
              <p className="font-medium mb-1">Computer Hardware Repairing Intern</p>
              <p className="text-[#6b7280] text-xs">Namo Buddha Computer Service Center</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
