import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiGithub, FiLinkedin, FiFileText, FiMapPin } from 'react-icons/fi';
import projectImage from '../assets/image.png';
import canvasImage from './canvas.png';
import myImage from './MyImage.jpg';
import sidebarImage from './image.png';
import sidebarImage2 from './image2.png';

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
    title: 'CTS-Bench: Benchmarking Graph Coarsening Trade-offs for GNNs in Clock Tree Synthesis',
    authors: 'Barsat Khadka, Kawsher Roxy, Md Rubel Ahmed',
    venue: "MLBench'26 @ ASPLOS",
    venueFull: "Workshop on ML for Computer Architecture and Systems, ASPLOS 2026",
    status: null,
    link: 'https://arxiv.org/abs/2602.19330',
    arxivId: '2602.19330',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2602.19330' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2602.19330' }
    ]
  },
  {
    title: 'Multiphase Social Engineering Attack Detection using GNN and BERT',
    authors: 'Barsat Khadka, Prasant Koirala, Kshitiz Neupane, Nick Rahimi',
    venue: 'arXiv preprint',
    venueFull: 'Under review at Elsevier',
    status: 'under review',
    link: 'https://arxiv.org/abs/2605.17201',
    arxivId: '2605.17201',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2605.17201' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2605.17201' }
    ]
  }
];

const publications = [
  {
    title: 'Why Traditional Reinforcement Learning Will Not Yield AGI',
    description: 'An argument for why narrow reward optimization and stationary environments are fundamentally insufficient for general intelligence.',
    type: 'Essay',
    year: 'Apr 2026',
    slug: 'why-traditional-rl-will-not-yield-agi'
  },
  {
    title: 'Converting Netlist to VCD and VCD to SAIF: An Open Source Flow',
    description: 'Open source toolchain for gate-level power analysis in OpenLane 2 EDA workflows.',
    type: 'Technical',
    year: 'Jan 2026',
    slug: 'converting-netlist-to-vcd-and-vcd-to-saif'
  }
];

const researchInterests = [
  'Graph Neural Networks',
  'Electronic Design Automation',
  'ML for Physical Design',
  'Applied Machine Learning',
  'Cybersecurity & GNNs',
  'Oceanographic Data Analytics'
];

const education = {
  school: "The University of Southern Mississippi",
  degree: "Computer Engineering",
  year: "Class of 2028"
};

const SERIF = "'Playfair Display', 'Cormorant Garamond', Georgia, serif";
const VERMILLION = '#B5341F';

function Folio({ numeral }) {
  return (
    <div className="hidden lg:block absolute -left-20 top-2 select-none text-right pr-3">
      <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '15px', color: 'var(--muted)', lineHeight: 1 }}>
        {numeral}
      </div>
    </div>
  );
}

function Head({ children }) {
  return (
    <h2
      className="relative inline-block mb-1 text-[30px] lg:text-[38px] leading-[1.05]"
      style={{
        fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
        fontWeight: 500,
        letterSpacing: '-0.035em',
        color: 'var(--text)',
      }}
    >
      {children}
      <span aria-hidden="true" style={{ color: VERMILLION, marginLeft: '0.12em', fontSize: '0.42em', verticalAlign: '0.85em', letterSpacing: 0, fontFamily: SERIF }}>†</span>
    </h2>
  );
}

function Rule() {
  return (
    <div className="flex items-center gap-3 mb-6 lg:mb-7" aria-hidden="true">
      <span className="h-px flex-1" style={{ background: 'rgba(26,26,26,0.16)' }} />
      <span style={{ width: 4, height: 4, background: VERMILLION, borderRadius: '50%' }} />
      <span className="h-px flex-1" style={{ background: 'rgba(26,26,26,0.16)' }} />
    </div>
  );
}

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
            if (sectionId) setActiveSection(sectionId);
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
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <div className="flex flex-col md:flex-row">

        {/* Left Sidebar */}
        <aside className="sidebar w-full md:w-[320px] lg:w-[420px] flex-shrink-0 border-r border-[color:var(--hairline)] md:sticky md:top-0 md:h-screen overflow-y-auto">
          <div className="p-4 lg:p-8">

            {/* Portrait — quiet, off-center, no ringed badge feel */}
            <div className="mb-8 flex justify-start">
              <div className="relative">
                <img
                  src={myImage}
                  alt="Barsat Khadka"
                  className="w-28 h-36 sm:w-32 sm:h-40 lg:w-36 lg:h-44 object-cover"
                  style={{
                    objectPosition: 'center 28%',
                    filter: 'grayscale(0.15) contrast(1.02)',
                    boxShadow: '0 1px 0 rgba(26,26,26,0.10), 18px 18px 0 -2px rgba(181,52,31,0.08)'
                  }}
                />
                {/* Hanko seal — single point of color, hand-set position */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-3 -right-3 flex items-center justify-center"
                  style={{
                    width: 38, height: 38,
                    background: VERMILLION,
                    color: '#FAF8F3',
                    fontFamily: SERIF,
                    fontSize: 18,
                    letterSpacing: 0,
                    transform: 'rotate(-4deg)',
                    boxShadow: '0 2px 6px rgba(181,52,31,0.25)',
                  }}
                >
                  印
                </div>
              </div>
            </div>

            {/* Masthead name — Inter, two-line, confident */}
            <h1
              className="mb-1 leading-[1] tracking-tight"
              style={{
                fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(32px, 4vw, 42px)',
                letterSpacing: '-0.035em',
              }}
            >
              Barsat<br />
              <span style={{ fontWeight: 400, color: 'var(--muted)' }}>Khadka</span>
            </h1>
            <p
              className="mt-3 mb-6 text-[12px] tracking-[0.18em] uppercase"
              style={{ color: 'var(--muted)' }}
            >
              Computer engineer · Researcher
            </p>

            {/* Letterhead block — icon + text rows */}
            <address className="not-italic mb-6 text-[13px] leading-[1.5]" style={{ color: 'var(--text)' }}>
              <div className="grid grid-cols-[14px_1fr] gap-x-2.5 gap-y-[5px] items-center">
                <FiMapPin size={13} style={{ color: 'var(--muted)' }} />
                <span style={{ color: 'var(--muted)' }}>Hattiesburg, Mississippi</span>

                <FiMail size={13} style={{ color: 'var(--muted)' }} />
                <a href="mailto:khadkabarsat598@gmail.com" className="link-slide truncate">khadkabarsat598@gmail.com</a>

                <FiGithub size={13} style={{ color: 'var(--muted)' }} />
                <a href="https://github.com/BarsatKhadka" target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--text)' }}>github.com/BarsatKhadka</a>

                <FiLinkedin size={13} style={{ color: 'var(--muted)' }} />
                <a href="https://www.linkedin.com/in/barsat-khadka" target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--text)' }}>in/barsat-khadka</a>

                <FiFileText size={13} style={{ color: 'var(--muted)' }} />
                <a
                  href="https://drive.google.com/file/d/1wOP0CS3UARHHvoPbmoC4Q2dHNSnyMDn8/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide"
                  style={{ color: 'var(--text)' }}
                >
                  Curriculum&nbsp;Vitæ
                </a>
              </div>
            </address>

            {/* Affiliation */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--muted)' }}>Studying at</p>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-md bg-[#FFD700] flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0 1px 0 rgba(26,26,26,0.10)' }}>
                  <img src={canvasImage} alt="USM" className="w-7 h-7 lg:w-8 lg:h-8 object-contain" />
                </div>
                <div className="leading-snug pt-[1px]">
                  <p className="text-[14px] font-medium tracking-tight" style={{ color: 'var(--text)' }}>
                    {education.school}
                  </p>
                  <p className="text-[12.5px]" style={{ color: 'var(--muted)' }}>
                    Bachelor of Science · {education.degree}
                  </p>
                  <p className="text-[12px]" style={{ color: 'var(--muted)' }}>
                    {education.year}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation — Roman numeral marginalia, weight-shift on active */}
            <nav className="mb-8">
              <ul className="space-y-[6px]">
                {[
                  { id: 'about', label: 'Currently', num: 'i' },
                  { id: 'research', label: 'Research', num: 'ii' },
                  { id: 'projects', label: 'Projects', num: 'iii' },
                  { id: 'publications', label: 'Writing', num: 'iv' },
                ].map(({ id, label, num }) => {
                  const active = activeSection === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                        className="group flex items-baseline gap-3 py-1 transition-colors"
                        style={{ color: active ? 'var(--text)' : 'var(--muted)' }}
                      >
                        <span
                          className="w-5 text-right shrink-0"
                          style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: active ? VERMILLION : 'var(--muted)' }}
                        >
                          {num}
                        </span>
                        <span
                          className="transition-all tracking-tight"
                          style={{
                            fontWeight: active ? 500 : 400,
                            fontSize: 16,
                            letterSpacing: '-0.01em',
                            lineHeight: 1.2,
                          }}
                        >
                          {label}
                        </span>
                        {active && (
                          <span style={{ width: 18, height: 1, background: VERMILLION, marginLeft: 6, alignSelf: 'center' }} aria-hidden="true" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Research interests */}
            <div className="pt-5" style={{ borderTop: '1px solid rgba(26,26,26,0.10)' }}>
              <p className="text-[10px] tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                Research interests
              </p>
              <p className="text-[13.5px] leading-[1.7] tracking-tight" style={{ color: 'var(--text)' }}>
                {researchInterests.join(' · ')}
              </p>
            </div>

          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content flex-1 w-full lg:max-w-[900px] px-4 lg:px-0 lg:ml-20">

          {/* About Section */}
          <section
            id="about"
            ref={(el) => (sectionsRef.current.about = el)}
            className="relative pt-10 lg:pt-14 mb-10 lg:mb-16 px-4 lg:px-8"
          >
            <Folio numeral="i" label="Currently" />
            <Head>Currently</Head>
            <Rule />

            {/* Roles — small-caps labels, year-style alignment */}
            <dl className="mb-7 lg:mb-9 grid grid-cols-[6.5rem_1fr] sm:grid-cols-[7.5rem_1fr] gap-x-5 lg:gap-x-8 gap-y-1.5 text-[14.5px]">
              <dt className="uppercase tracking-[0.18em] text-[10.5px] pt-[4px]" style={{ color: 'var(--muted)' }}>Engineer</dt>
              <dd className="leading-[1.5]">
                Research Software Engineer at{' '}
                <a
                  href="https://www.usm.edu/advanced-analytics-security/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide"
                >
                  Institute of Advanced Analytics &amp; Security
                </a>
              </dd>
              <dt className="uppercase tracking-[0.18em] text-[10.5px] pt-[4px]" style={{ color: 'var(--muted)' }}>Researcher</dt>
              <dd className="leading-[1.5]">Research Assistant, Cyber Innovations Lab</dd>
              <dt className="uppercase tracking-[0.18em] text-[10.5px] pt-[4px]" style={{ color: 'var(--muted)' }}>Fellow</dt>
              <dd className="leading-[1.5]">
                AI/ML Fellow,{' '}
                <a
                  href="https://www.breakthroughtech.org/programs/the-ai-program/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide"
                >
                  Break Through Tech AI
                </a>
              </dd>
              <dt className="uppercase tracking-[0.18em] text-[10.5px] pt-[4px]" style={{ color: 'var(--muted)' }}>Secretary</dt>
              <dd className="leading-[1.5]">
                <a
                  href="https://www.instagram.com/oscusm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-slide"
                >
                  Open Source Club, USM
                </a>
              </dd>
            </dl>

            {/* Opener */}
            <div className="text-[15.5px] lg:text-[16px] leading-[1.75] max-w-[62ch]">
              <p className="mb-3" style={{ textIndent: 0 }}>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: '3.2em',
                    lineHeight: 0.85,
                    float: 'left',
                    marginRight: '0.1em',
                    marginTop: '0.05em',
                    marginBottom: '-0.05em',
                    color: VERMILLION,
                  }}
                >
                  G
                </span>
                rowing up in Nepal shaped my belief in open source as a way to expand access to knowledge. It's why I'm invested in projects like{' '}
                <a href="https://vinaya-journal.vercel.app" target="_blank" rel="noopener noreferrer" className="link-slide">Vinaya</a>{' '}
                and the{' '}
                <a href="https://openlane2.readthedocs.io/en/latest/getting_started/newcomers/index.html" target="_blank" rel="noopener noreferrer" className="link-slide">OpenLane&nbsp;2</a>{' '}
                ecosystem. Open source isn't just how we build software — it levels the playing field.
              </p>
              {showMoreIntro && (
                <>
                  <p className="mb-3">
                    I've always had the vision of being a scientist, and I love doing research for the sake of science and the craft. Most of my time is spent between research papers, quiet work, music, commute to university, meetings, cooking, and gaming.
                  </p>
                  <p className="mb-3">
                    My handles are below. Feel free to reach out if something in my work interests you or if you'd like to talk or collaborate.
                  </p>
                </>
              )}
              <button
                type="button"
                onClick={() => setShowMoreIntro((v) => !v)}
                className="mt-1 inline-flex items-baseline gap-2 group text-[13.5px] tracking-[0.06em]"
                style={{ color: 'var(--text)' }}
              >
                <span className="link-slide">{showMoreIntro ? 'Less' : 'Read on'}</span>
                <span style={{ color: VERMILLION }}>{showMoreIntro ? '↑' : '→'}</span>
              </button>
            </div>
          </section>


          {/* Research Section */}
          <section
            id="research"
            ref={(el) => (sectionsRef.current.research = el)}
            className="relative mb-10 lg:mb-16 px-4 lg:px-8"
          >
            <Folio numeral="ii" label="Research" />
            <Head>Research</Head>
            <Rule />

            <ol className="list-none p-0 m-0 space-y-4 mt-2">
              {research.map((item, index) => (
                <li key={index} className="relative">
                  <span
                    className="absolute -left-7 lg:-left-9 top-[2px] hidden sm:block"
                    style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: 'var(--muted)' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="max-w-[68ch]">
                    <h3 className="leading-[1.3] tracking-tight" style={{ fontSize: 15.5, fontWeight: 500, letterSpacing: '-0.015em' }}>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--accent)' }}>
                          {item.title}
                        </a>
                      ) : (
                        <span style={{ color: 'var(--accent)' }}>{item.title}</span>
                      )}
                    </h3>

                    {item.authors && (
                      <p className="text-[13px] leading-[1.45] mt-0.5" style={{ color: 'var(--muted)' }}>
                        {item.authors.split('Barsat Khadka').map((part, i) => (
                          <React.Fragment key={i}>
                            {i > 0 && (
                              <span style={{ color: 'var(--text)', borderBottom: `1px solid ${VERMILLION}`, paddingBottom: 1 }}>
                                Barsat Khadka
                              </span>
                            )}
                            {part}
                          </React.Fragment>
                        ))}
                      </p>
                    )}

                    {(item.venue || item.venueFull || item.status || (item.links && item.links.length)) && (
                      <p className="text-[12.5px] leading-[1.5] mt-0.5" style={{ color: 'var(--muted)' }}>
                        {item.venue && (
                          <span className="font-medium tracking-tight" style={{ color: 'var(--text)' }}>{item.venue}</span>
                        )}
                        {item.venueFull && (
                          <><span className="mx-1.5 opacity-50">·</span><span>{item.venueFull}</span></>
                        )}
                        {item.status && (
                          <><span className="mx-1.5 opacity-50">·</span><span className="uppercase tracking-[0.16em] text-[10px]" style={{ color: VERMILLION }}>{item.status}</span></>
                        )}
                        {item.links && item.links.length > 0 && (
                          <>
                            <span className="mx-1.5 opacity-50">·</span>
                            {item.links.map((l, i) => (
                              <React.Fragment key={l.label}>
                                {i > 0 && <span className="mx-1 opacity-40">/</span>}
                                <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: VERMILLION }}>
                                  {l.label}
                                </a>
                              </React.Fragment>
                            ))}
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            ref={(el) => (sectionsRef.current.projects = el)}
            className="relative mb-10 lg:mb-16 px-4 lg:px-8"
          >
            <Folio numeral="iii" label="Projects" />
            <Head>Projects</Head>
            <Rule />

            {/* Filter */}
            <p className="mb-7 text-[14px] tracking-[0.02em]" style={{ color: 'var(--muted)' }}>
              <span className="uppercase tracking-[0.22em] text-[11px] mr-3">Showing</span>
              {['ongoing', 'previous'].map((t, i) => (
                <React.Fragment key={t}>
                  {i > 0 && <span className="mx-3 opacity-40">·</span>}
                  <button
                    type="button"
                    onClick={() => setActiveProjectType(t)}
                    className="transition-colors capitalize"
                    style={{
                      fontWeight: activeProjectType === t ? 500 : 400,
                      color: activeProjectType === t ? 'var(--text)' : 'var(--muted)',
                      borderBottom: activeProjectType === t ? `1px solid ${VERMILLION}` : '1px solid transparent',
                      paddingBottom: 2,
                      fontSize: 15,
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {t}
                  </button>
                </React.Fragment>
              ))}
            </p>

            <ol className="list-none p-0 m-0 space-y-8 lg:space-y-10">
              {activeProjectType === 'ongoing' && ongoingProjects.map((project, index) => (
                <li key={index} className="relative">
                  {/* Floating year marginalia */}
                  <span
                    className="hidden lg:block absolute -left-24 top-[10px] text-right pr-3 uppercase tracking-[0.22em] text-[10px]"
                    style={{ color: 'var(--muted)' }}
                  >
                    {project.status}
                  </span>

                  <div className="flex items-baseline gap-4 mb-3">
                    <h3 style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                      {project.link ? (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--text)' }}>
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    {project.title === 'Vinaya Journal' && (
                      <span className="text-[12px] tracking-[0.15em] uppercase" style={{ color: VERMILLION }}>
                        ★ {repoStats.stars} &nbsp; ⑂ {repoStats.forks}
                      </span>
                    )}
                  </div>

                  <p className="mb-4 max-w-[60ch] text-[16px] leading-[1.85]">{project.description}</p>

                  <div className="text-[13px] tracking-wide flex flex-wrap gap-x-5 gap-y-1" style={{ color: 'var(--muted)' }}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'inherit' }}>
                        ↗ {project.github.replace('https://', '')}
                      </a>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'inherit' }}>
                        ↗ {project.link.replace('https://', '')}
                      </a>
                    )}
                  </div>

                  {project.title === 'Vinaya Journal' && (
                    <div className="mt-8 max-w-[640px]">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                        <img
                          src={projectImage}
                          alt="Vinaya Journal"
                          className="w-full"
                          style={{
                            filter: 'grayscale(0.05)',
                            boxShadow: '0 1px 0 rgba(26,26,26,0.12), 14px 14px 0 -1px rgba(181,52,31,0.06)',
                          }}
                        />
                      </a>
                    </div>
                  )}
                </li>
              ))}

              {activeProjectType === 'previous' && previousProjects.map((project, index) => (
                <li key={index} className="relative">
                  <span
                    className="hidden lg:block absolute -left-24 top-[10px] text-right pr-3 uppercase tracking-[0.22em] text-[10px]"
                    style={{ color: 'var(--muted)' }}
                  >
                    {project.year || project.status}
                  </span>

                  <h3 className="mb-2" style={{ fontSize: 23, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--text)' }}>
                        {project.title}
                      </a>
                    ) : project.title}
                  </h3>
                  <p className="mb-2 max-w-[60ch] text-[15px] leading-[1.8]">{project.description}</p>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-slide text-[13px]" style={{ color: 'var(--muted)' }}>
                      ↗ {project.github.replace('https://', '')}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* Writing / Blogs Section */}
          <section
            id="publications"
            ref={(el) => (sectionsRef.current.publications = el)}
            className="relative mb-10 lg:mb-16 px-4 lg:px-8"
          >
            <Folio numeral="iv" label="Writing" />
            <Head>Writing</Head>
            <Rule />

            <p className="mb-7 text-[14px] max-w-[58ch] leading-[1.7]" style={{ color: 'var(--muted)' }}>
              Essays and notebooks. Title at left, date at right.
            </p>

            <ol className="list-none p-0 m-0 space-y-3.5">
              {publications.map((pub, index) => (
                <li key={index} className="relative">
                  <span
                    className="absolute -left-7 lg:-left-9 top-[2px] hidden sm:block"
                    style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: 'var(--muted)' }}
                  >
                    §{index + 1}
                  </span>
                  <Link to={`/blogs/${pub.slug}`} className="group block">
                    <div className="flex items-baseline gap-2">
                      <h3
                        className="shrink-0 tracking-tight"
                        style={{ fontSize: 15.5, fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.3, color: 'var(--accent)' }}
                      >
                        <span className="link-slide">{pub.title}</span>
                      </h3>
                      <span
                        aria-hidden="true"
                        className="flex-1 mx-1 mb-[4px] hidden md:block"
                        style={{ borderBottom: '1px dotted rgba(26,26,26,0.28)', minWidth: 16 }}
                      />
                      <span className="shrink-0 text-[11px] tracking-[0.16em] uppercase whitespace-nowrap" style={{ color: 'var(--muted)' }}>
                        {pub.year}
                      </span>
                    </div>
                    <p className="text-[12.5px] leading-[1.5] mt-0.5 max-w-[64ch]" style={{ color: 'var(--muted)' }}>
                      {pub.description}
                      <span className="mx-1.5 opacity-50">·</span>
                      <span className="uppercase tracking-[0.16em] text-[10px]">{pub.type}</span>
                    </p>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

        </main>

        {/* Right Sidebar — colophon / marginalia */}
        <aside
          className="hidden xl:block w-[280px] flex-shrink-0 pl-12 pt-32 text-sm xl:translate-x-8"
          style={{ borderLeft: '1px solid rgba(26,26,26,0.10)' }}
        >
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.28em] uppercase mb-4" style={{ color: 'var(--muted)' }}>
              Formerly
            </p>
            <ol className="list-none p-0 m-0 space-y-4">
              {[
                { role: 'Software Engineering Intern', org: 'Sports Media' },
                { role: 'Web / App Developer Intern', org: 'Crystal ERP' },
                { role: 'Computer Hardware Intern', org: 'Namo Buddha Service Center' },
              ].map((x, i) => (
                <li key={i}>
                  <p className="font-medium tracking-tight leading-[1.2]" style={{ fontSize: 14.5, color: 'var(--text)' }}>
                    {x.role}
                  </p>
                  <p className="text-[12px] leading-[1.2]" style={{ color: 'var(--muted)' }}>{x.org}</p>
                </li>
              ))}
            </ol>

            {/* Images — paper prints */}
            <div className="mt-8 space-y-5">
              <img
                src={sidebarImage}
                alt=""
                className="w-full"
                style={{
                  filter: 'grayscale(0.08) contrast(1.02)',
                  boxShadow: '0 1px 0 rgba(26,26,26,0.10), 10px 10px 0 -1px rgba(181,52,31,0.06)',
                }}
              />
              <img
                src={sidebarImage2}
                alt=""
                className="w-full"
                style={{
                  filter: 'grayscale(0.08) contrast(1.02)',
                  boxShadow: '0 1px 0 rgba(26,26,26,0.10), 10px 10px 0 -1px rgba(181,52,31,0.06)',
                }}
              />
            </div>

            <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(26,26,26,0.10)' }}>
              <p
                className="text-[11px] leading-[1.75] tracking-tight"
                style={{ color: 'var(--muted)' }}
              >
                Composed on warm paper, <br />
                set in Inter with a touch of Playfair. <br />
                <span style={{ color: VERMILLION }}>印</span> &nbsp; Hattiesburg, MS.
              </p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
