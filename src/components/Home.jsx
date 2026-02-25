import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiGithub, FiLinkedin, FiFileText, FiMapPin } from 'react-icons/fi';
import projectImage from '../assets/image.png';
import canvasImage from './canvas.png';
import myImage from './MyImage.jpg';

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
    link: null,
    note: null
  },
  {
    title: 'CTS-Bench: Benchmarking Graph Coarsening Trade-offs for GNNs in Clock Tree Synthesis',
    status: null,
    link: 'https://arxiv.org/abs/2602.19330',
    arxivId: '2602.19330',
    note: "Accepted to MLBench'26 ASPLOS"
  }
];

const publications = [
  {
    title: 'Converting_Netlist_to_VCD_and_VCD_to_SAIF_Open_Source',
    description: 'Open source tool for EDA workflows',
    type: 'Tool',
    year: 'Jan 2026',
    slug: 'converting-netlist-to-vcd-and-vcd-to-saif'
  }
];

const education = {
  school: "The University of Southern Mississippi",
  degree: "Computer Engineering",
  year: "Class of 2028"
};

export default function Home() {
  const [activeProjectType, setActiveProjectType] = useState('ongoing');
  const [repoStats, setRepoStats] = useState({ stars: 0, forks: 0 });
  const [activeSection, setActiveSection] = useState('about');
  const [showMoreIntro, setShowMoreIntro] = useState(false);
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
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar - Sticky */}
        <aside className="sidebar w-full md:w-[320px] lg:w-[420px] flex-shrink-0 border-r border-[#e5e7eb] bg-white md:sticky md:top-0 md:h-screen overflow-y-auto">
          <div className="p-4 lg:p-8">
            {/* Profile Image */}
            <div className="mb-4 flex justify-start">
              <div className="relative">
                <img 
                  src={myImage} 
                  alt="Barsat Khadka" 
                  className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover border-2 border-[#e5e7eb]"
                  style={{ objectPosition: 'center 75%' }}
                />
              </div>
            </div>
            
            {/* Name */}
            <h1 className="mb-2 text-xl sm:text-2xl lg:text-3xl">Barsat Khadka</h1>
            <p className="mb-2 text-xs lg:text-sm text-[#6b7280] flex items-center gap-2">
              <FiMapPin size={14} />
              <span className="hidden sm:inline">Greater Hattiesburg Area, Mississippi, USA</span>
              <span className="sm:hidden">Hattiesburg, MS</span>
            </p>

            {/* Quick links (profile-style) */}
            <div className="mb-6">
              <div className="grid grid-cols-[16px_1fr] gap-x-2 gap-y-2 text-xs lg:text-sm text-[#6b7280]">
                <FiGithub size={14} className="mt-[2px]" />
                <a
                  href="https://github.com/BarsatKhadka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[#6b7280] hover:text-[color:var(--accent)] transition-colors"
                >
                  github.com/BarsatKhadka
                </a>

                <FiMail size={14} className="mt-[2px]" />
                <a
                  href="mailto:khadkabarsat598@gmail.com"
                  className="truncate text-[#6b7280] hover:text-[color:var(--accent)] transition-colors"
                >
                  khadkabarsat598@gmail.com
                </a>

                <FiLinkedin size={14} className="mt-[2px]" />
                <a
                  href="https://www.linkedin.com/in/barsat-khadka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[#6b7280] hover:text-[color:var(--accent)] transition-colors"
                >
                  in/barsat-khadka
                </a>
              </div>
            </div>
            
            {/* Title/Affiliation */}
            <div className="mb-6 lg:mb-8 text-sm lg:text-base text-[#6b7280] leading-relaxed">
              <div className="flex items-start gap-2 lg:gap-3 mt-4 pt-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-[#FFD700] flex items-center justify-center flex-shrink-0">
                  <img src={canvasImage} alt="University" className="w-6 h-6 lg:w-8 lg:h-8 object-contain -mt-0.5" />
                </div>
                <p className="text-xs lg:text-sm leading-[1.1]">
                  {education.school}
                  <br />
                  {education.degree}
                  <br />
                  {education.year}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mb-6 lg:mb-8">
              <ul className="space-y-1 lg:space-y-2 text-base lg:text-lg font-['Inter']">
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
        <main className="main-content flex-1 w-full lg:max-w-[900px] px-4 lg:px-0 lg:ml-20">
          {/* About Section */}
          <section
            id="about"
            ref={(el) => (sectionsRef.current.about = el)}
            className="pt-8 mb-12 lg:mb-[60px] px-4 lg:px-8"
          >
            <div className="text-sm lg:text-[16px] leading-[1.9] max-w-none">
              <h2 className="mb-4 text-2xl lg:text-3xl">
                Currently
              </h2>
              <p className="mb-4">
                Research Software Engineer,{' '}
                <a
                  href="https://www.usm.edu/advanced-analytics-security/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide external-link"
                >
                  Institute of Advanced Analytics and Security
                </a>
              </p>
              <p className="mb-8">Research Assistant, Cyber Innovations Lab</p>
              <div className="mb-6 space-y-4">
                <p>
                  Growing up in Nepal shaped my belief in open source as a way to expand access to knowledge. It's why I'm so invested in projects like <a href="https://vinaya-journal.vercel.app" target="_blank" rel="noopener noreferrer" className="link-slide external-link underline">Vinaya</a> and exploring the <a href="https://openlane2.readthedocs.io/en/latest/getting_started/newcomers/index.html" target="_blank" rel="noopener noreferrer" className="link-slide external-link underline">OpenLane 2</a> ecosystem. I believe that open source isn't just a way to build software; it's a way to level the playing field.
                  <>
                    {' '}
                    <button
                      type="button"
                      onClick={() => setShowMoreIntro((v) => !v)}
                      className="font-medium text-[var(--accent)] hover:underline"
                    >
                      {showMoreIntro ? 'Click for less' : 'Click for more'}
                    </button>
                  </>
                </p>
                {showMoreIntro && (
                  <>
                    <p>
                      I've always had the vision of being a scientist, and I love doing research for the sake of science and the craft. Most of my time is spent between research papers, quiet work, music, commute to university, meetings, cooking, and gaming.
                    </p>
                    <p>
                      My handles are below. feel free to reach out if something in my work interests you or if you'd like to talk or collaborate.
                    </p>
                  </>
                )}
              </div>
              {showMoreIntro && (
                <div className="flex flex-wrap gap-4 lg:gap-6 text-sm lg:text-[15px] font-['Inter']">
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
              )}
            </div>
          </section>

          {/* Research Section */}
          <section
            id="research"
            ref={(el) => (sectionsRef.current.research = el)}
            className="mb-12 lg:mb-[120px] px-4 lg:px-8"
          >
            <h2 className="mb-8 lg:mb-[60px] text-2xl lg:text-3xl">Research</h2>
            <div className="space-y-4 lg:space-y-6">
              {research.map((item, index) => (
                <div key={index} className="card bg-white rounded p-4 lg:p-8">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-2">
                    <h3 className="max-w-3xl text-base lg:text-lg font-normal font-['Inter']">
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#b31b1b] hover:text-[#8b0000] hover:underline font-medium">
                          {item.title}
                        </a>
                      ) : (
                        item.title
                      )}
                    </h3>
                    {item.status && (
                      <span className={`status-badge ${item.status === 'ongoing' ? 'status-ongoing' : ''}`}>
                        [{item.status.toUpperCase()}]
                      </span>
                    )}
                  </div>
                  {item.note && (
                    <p className="text-sm text-[#374151] mt-1">{item.note}</p>
                  )}
                  {item.arxivId && item.link && (
                    <p className="text-sm mt-2">
                      <span className="text-[#374151]">Read: </span>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#b31b1b] hover:text-[#8b0000] hover:underline">
                        arXiv:{item.arxivId}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            ref={(el) => (sectionsRef.current.projects = el)}
            className="mb-12 lg:mb-[120px] px-4 lg:px-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 lg:mb-[60px]">
              <h2 className="text-2xl lg:text-3xl">Projects</h2>
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

            <div className="space-y-6 lg:space-y-10">
              {activeProjectType === 'ongoing' && ongoingProjects.map((project, index) => (
                <article key={index} className="card bg-white rounded p-4 lg:p-8">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-4">
                    <h3 className="text-lg lg:text-xl">
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

                  <div className="indent-25 mb-4 lg:mb-6">
                    <p className="text-sm lg:text-[16px] leading-[1.9] text-[#0a0a0a]/70">{project.description}</p>
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

                  <div className="indent-25 mb-4 lg:mb-6">
                    <p className="text-sm lg:text-[16px] leading-[1.9] text-[#0a0a0a]/70">{project.description}</p>
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
            className="mb-12 lg:mb-[120px] px-4 lg:px-8"
          >
            <h2 className="mb-8 lg:mb-[60px] text-2xl lg:text-3xl">Blogs</h2>
            <div className="space-y-6 lg:space-y-8">
              {publications.map((pub, index) => (
                <div key={index} className="text-sm lg:text-[16px] leading-[1.9]">
                  <span className="text-[#0a0a0a]/30 mr-2">/</span>
                  <Link 
                    to={`/blogs/${pub.slug}`}
                    className="inline-block mb-2 font-medium text-[#1e40af] hover:text-[#1e3a8a] transition-colors"
                  >
                    {pub.title}
                  </Link>
                  <p className="text-[#0a0a0a]/70 mb-2 ml-4">{pub.description}</p>
                  <p className="meta-text ml-4">{pub.type} • {pub.year}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Research Interests Section */}
          <section
            id="research-interests"
            className="mb-12 lg:mb-[120px] px-4 lg:px-8"
          >
            <h2 className="mb-8 lg:mb-[60px] text-2xl lg:text-3xl">Research Interests</h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 text-xs lg:text-sm bg-[#f5f5f5] text-[#0a0a0a] rounded-md border border-[#e5e7eb] hover:bg-[#e5e7eb] transition-colors">
                Applied Machine Learning
              </span>
              <span className="px-3 py-1.5 text-xs lg:text-sm bg-[#f5f5f5] text-[#0a0a0a] rounded-md border border-[#e5e7eb] hover:bg-[#e5e7eb] transition-colors">
                Oceanographic Data Analytics
              </span>
              <span className="px-3 py-1.5 text-xs lg:text-sm bg-[#f5f5f5] text-[#0a0a0a] rounded-md border border-[#e5e7eb] hover:bg-[#e5e7eb] transition-colors">
                Graph Neural Networks (GNNs)
              </span>
              <span className="px-3 py-1.5 text-xs lg:text-sm bg-[#f5f5f5] text-[#0a0a0a] rounded-md border border-[#e5e7eb] hover:bg-[#e5e7eb] transition-colors">
                Electronic Design Automation (EDA)
              </span>
              <span className="px-3 py-1.5 text-xs lg:text-sm bg-[#f5f5f5] text-[#0a0a0a] rounded-md border border-[#e5e7eb] hover:bg-[#e5e7eb] transition-colors">
                ML for Physical Design
              </span>
            </div>
          </section>
        </main>

        {/* Right Sidebar - Previously */}
        <aside className="hidden xl:block w-[320px] flex-shrink-0 border-l border-[#e5e7eb] pl-8 xl:pl-12 pt-8 text-sm font-['Inter'] xl:translate-x-8">
          <h2 className="mb-4 text-2xl lg:text-3xl">
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
