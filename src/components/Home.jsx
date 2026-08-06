/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiGithub, FiLinkedin, FiFileText, FiMapPin } from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';
import projectImage from '../assets/image.png';
import canvasImage from './canvas.png';
import myImage from './MyImage.webp';
import plateImage from './image.webp';
import plateImage2 from './image2.webp';
import heroSplash from './heroSplash.webp';

// --- Data ---

const ongoingProjects = [
  {
    title: 'Vinaya Journal',
    description: 'Offline-first AI journaling app with a private local LLM and mood analysis.',
    link: 'https://vinaya-journal.vercel.app/',
    github: 'https://github.com/BarsatKhadka/Vinaya-Journal',
    status: 'ongoing',
    year: '2025'
  }
];

const previousProjects = [
  {
    title: 'Wordbuddy.ai',
    description: 'Voice-driven, gamified learning for kids, with dyslexia support.',
    github: 'https://github.com/BarsatKhadka/WordBuddy.ai',
    status: '2024',
    year: '2024'
  },
  {
    title: 'EasyRepo',
    description: 'GitHub repository management system with OAuth and interactive commit graphs.',
    github: 'https://github.com/BarsatKhadka/Easy-Repo',
    status: '2024',
    year: '2024'
  },
  {
    title: 'PrepAI',
    description: 'Turns PDFs into quizzes, flashcards, and study plans. 1st runner-up, VOXO Hackathon.',
    github: 'https://github.com/BarsatKhadka/PrepAI',
    status: '2024',
    year: '2024'
  }
];

// Research — accepted first, then preprints under review.
const research = [
  {
    title: 'CTS-Bench: Benchmarking Graph Coarsening Trade-offs for GNNs in Clock Tree Synthesis',
    authors: 'Barsat Khadka, Dr. Kawsher Roxy, Dr. Md Rubel Ahmed',
    venue: 'MLBench @ ASPLOS 2026',
    status: 'accepted',
    link: 'https://arxiv.org/abs/2602.19330',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2602.19330' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2602.19330' }
    ]
  },
  {
    title: 'SwiftCTS: Fast Cross-Design Prediction and Pareto Optimization of Clock Tree Metrics via Few-Shot Calibration',
    authors: 'Barsat Khadka, Dr. Kawsher Roxy, Dr. Md Rubel Ahmed',
    venue: 'ICCAD 2026',
    status: 'under review',
    link: 'https://arxiv.org/abs/2606.11348',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2606.11348' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2606.11348' }
    ]
  },
  {
    title: 'MechRL: Reinforcement Learning Agents Perform Circuit Discovery for Mechanistic Interpretability',
    authors: 'Barsat Khadka',
    venue: 'TMLR',
    status: 'under review',
    link: 'https://arxiv.org/abs/2605.26343',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2605.26343' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2605.26343' }
    ]
  },
  {
    title: 'Filter then Verify: Multiphase Social Engineering Attack Detection using GNN and BERT',
    authors: 'Barsat Khadka, Prasant Koirala, Kshitiz Neupane, Dr. Nick Rahimi',
    venue: 'Springer',
    status: 'under review',
    link: 'https://arxiv.org/abs/2605.17201',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2605.17201' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2605.17201' }
    ]
  },
];

const publications = [
  {
    title: 'Reverse-Engineering an ASIC From Its Layout',
    description: 'Recovering a gate-level netlist from a raw GDS, verifying it against known-good references, and solving the Star Battle puzzle hidden in the silicon.',
    type: 'Technical',
    year: 'Aug 2026',
    slug: 'reverse-engineering-an-asic-from-its-layout'
  },
  {
    title: 'Why Traditional Reinforcement Learning Will Not Yield AGI',
    description: 'An argument for why narrow reward optimization and stationary environments are fundamentally insufficient for general intelligence.',
    type: 'Essay',
    year: 'Apr 2026',
    slug: 'why-traditional-rl-will-not-yield-agi'
  },
  {
    title: 'Converting Netlist to VCD and VCD to SAIF: An Open Source Flow',
    description: 'An open-source toolchain for gate-level power analysis in OpenLane 2 EDA workflows.',
    type: 'Technical',
    year: 'Jan 2026',
    slug: 'converting-netlist-to-vcd-and-vcd-to-saif'
  }
];

// A few notes I keep — kept short on purpose.
const philosophyNotes = [
  'We do not observe nature as it really is, but nature exposed to our methods of perception.'
];

// Hero news — newest first.
const news = [
  {
    date: 'Now',
    text: 'Currently working on world model for chip design.'
  },
  {
    date: 'Aug 2',
    text: 'Completed Machine Learning Foundations, Break Through Tech.',
    href: '/Barsat-Khadka-eCornell-ML-Foundations.pdf'
  },
  {
    date: 'Jun 30',
    text: 'Updated MechRL — full version now on arXiv.',
    href: 'https://arxiv.org/abs/2605.26343'
  },
  {
    date: 'Jun 23 – 26',
    text: 'SDSC CIML Summer Institute, UC San Diego.',
    href: '/Barsat-Khadka-COA.pdf'
  },
  {
    date: 'May – Jul',
    text: 'Enrolled in the UR2PhD program (CRA).',
    href: 'https://cra.org/ur2phd/'
  },
  {
    date: 'Apr',
    text: 'Joined Open Source Club, USM as Secretary.',
    href: 'https://www.instagram.com/oscusm/'
  }
];

const researchInterests = [
  'Graph Neural Networks',
  'ML for Physical Design (EDA)',
  'Mechanistic Interpretability',
  'Reinforcement Learning',
  'Security & GNNs',
  'Open Science & Open Source'
];

const education = {
  school: 'The University of Southern Mississippi',
  degree: 'B.S., Computer Engineering',
  year: '2024 – Present · GPA 3.92'
};

const honors = [
  { title: 'Honors Scholar' },
  { title: 'Academic Excellence Scholarship', detail: 'full tuition' },
  { title: "President's List", detail: 'Spring 2025' },
];

const DISPLAY = "'Fraunces', 'Cormorant Garamond', Georgia, serif";
const SERIF = DISPLAY;
const UI = "'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif";
const DEVANAGARI = "'Noto Serif Devanagari', 'Tiro Devanagari Sanskrit', 'Mukta', 'Kohinoor Devanagari', serif";
const VERMILLION = '#B5341F';

// Status stamps — quiet outlines; accepted gets a small mark.
const STATUS_META = {
  accepted: { label: 'Accepted', seal: true, fg: VERMILLION, bg: 'rgba(181,52,31,0.06)', bd: 'rgba(181,52,31,0.30)' },
  'under review': { label: 'Under review', seal: false, fg: 'var(--faint)', bg: 'transparent', bd: 'var(--hairline)' },
};

function Folio({ numeral }) {
  return (
    <div className="hidden lg:block absolute -left-20 top-2 select-none text-right pr-3">
      <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '15px', color: 'var(--muted)', lineHeight: 1 }}>
        {numeral}
      </div>
    </div>
  );
}

function Head({ children, kicker }) {
  return (
    <div className="mb-1">
      {kicker && (
        <p className="mb-2.5 flex items-center gap-2.5 text-[11px] tracking-[0.26em] uppercase" style={{ color: VERMILLION, fontFamily: UI }}>
          <span aria-hidden="true" style={{ width: 22, height: 1, background: VERMILLION, display: 'inline-block' }} />
          {kicker}
        </p>
      )}
      <h2
        className="text-[40px] lg:text-[54px] leading-[0.98]"
        style={{
          fontFamily: DISPLAY,
          fontWeight: 380,
          letterSpacing: '-0.025em',
          fontVariationSettings: "'SOFT' 5, 'opsz' 96",
          color: 'var(--text)',
        }}
      >
        {children}
      </h2>
    </div>
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

// Sends straight to Web3Forms — no backend of our own to run.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

function CollaborateForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  const inputStyle = {
    fontFamily: UI,
    color: 'var(--text)',
    background: 'transparent',
    border: '1px solid var(--hairline)',
    outline: 'none',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Collaboration note from ${values.name} — barsatkhadka.com`,
          from_name: values.name,
          ...values,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setValues({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--text)' }}>
        Thanks — that landed in my inbox. I&apos;ll get back to you.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[480px]">
      {/* Honeypot — hidden from people, tempting to bots */}
      <input type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" style={{ display: 'none' }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          className="w-full px-3 py-2.5 text-[14px]"
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className="w-full px-3 py-2.5 text-[14px]"
          style={inputStyle}
        />
      </div>
      <textarea
        name="message"
        required
        placeholder="What are you working on?"
        value={values.message}
        onChange={handleChange}
        rows={3}
        className="w-full px-3 py-2.5 mb-4 text-[14px] resize-y"
        style={inputStyle}
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-5 py-2.5 text-[12.5px] tracking-[0.14em] uppercase transition-opacity"
          style={{
            fontFamily: UI,
            background: VERMILLION,
            color: '#FAF8F3',
            opacity: status === 'sending' ? 0.6 : 1,
          }}
        >
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
        {status === 'error' && (
          <span className="text-[12.5px]" style={{ color: VERMILLION }}>
            Something went wrong — try emailing me directly instead.
          </span>
        )}
      </div>
    </form>
  );
}

export default function Home() {
  const [activeProjectType, setActiveProjectType] = useState('ongoing');
  const [repoStats, setRepoStats] = useState({ stars: 0, forks: 0 });
  const [activeSection, setActiveSection] = useState('about');
  const [showCollab, setShowCollab] = useState(false);
  const sectionsRef = useRef({});
  const heroSplashRef = useRef(null);

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

  // Splash art fades to nothing as you scroll past the hero — fixed in place,
  // opacity driven directly off scrollY so it never lags a frame behind.
  useEffect(() => {
    const FADE_DISTANCE = 420;
    const CEILING = 0.72; // fills the blank middle gap — no text there, so it can read at full presence
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = heroSplashRef.current;
      if (!el) return;
      const opacity = CEILING * Math.max(0, 1 - window.scrollY / FADE_DISTANCE);
      el.style.opacity = opacity;
      el.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Gentle reveal-on-scroll — only arms when motion is welcome
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const root = document.documentElement;
    root.classList.add('reveal-ready');
    const targets = Array.from(document.querySelectorAll('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = sectionsRef.current[sectionId];
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#16140F]">
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* ░░ Hero — a clean typographic masthead ░░ */}
      <header className="hero relative w-full min-h-[78svh] flex flex-col justify-between overflow-hidden px-6 sm:px-10 lg:px-24 pt-9 lg:pt-12 pb-7 lg:pb-9">
        <div aria-hidden="true" className="hero-aura" />

        {/* Splash art — pinned to the viewport, dissolves into the paper as you scroll past.
            One layer, one continuous falloff — no plateau-then-drop that reads as a ring,
            just a slow fade to zero long before the image's own edge. */}
        <div
          ref={heroSplashRef}
          aria-hidden="true"
          className="hidden xl:block"
          style={{
            position: 'fixed',
            top: '0vh',
            left: '49%',
            transform: 'translateX(-50%)',
            width: 'clamp(800px, 70vw, 1440px)',
            zIndex: 1,
            pointerEvents: 'none',
            willChange: 'opacity',
          }}
        >
          <img
            src={heroSplash}
            alt=""
            className="w-full h-auto block"
            style={{
              filter: 'saturate(1.05) contrast(1.12) brightness(1.08) blur(0.5px)',
              mixBlendMode: 'multiply',
              maskImage: 'radial-gradient(ellipse 76% 74% at 45% 44%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 24%, rgba(0,0,0,0.4) 46%, rgba(0,0,0,0.1) 56%, rgba(0,0,0,0.015) 64%, rgba(0,0,0,0.004) 74%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 76% 74% at 45% 44%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 24%, rgba(0,0,0,0.4) 46%, rgba(0,0,0,0.1) 56%, rgba(0,0,0,0.015) 64%, rgba(0,0,0,0.004) 74%, transparent 100%)',
            }}
          />
        </div>

        {/* Top line */}
        <div className="hero-fade relative z-10 flex items-center justify-between" style={{ animationDelay: '0.15s' }}>
          <span className="text-[10.5px] sm:text-[11px] tracking-[0.34em] uppercase" style={{ color: 'var(--muted)', fontFamily: UI }}>
            बर्सत खड्का
          </span>
          <span className="text-[10.5px] sm:text-[11px] tracking-[0.34em] uppercase" style={{ color: 'var(--muted)', fontFamily: UI }}>
            Hattiesburg, Mississippi
          </span>
        </div>

        {/* Middle — name + intro on the left, plates in the center, news on the right */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-10">
          <div className="min-w-0 lg:flex-1">
            <h1
              className="hero-name"
              style={{
                fontFamily: DISPLAY,
                lineHeight: 0.86,
                letterSpacing: '-0.035em',
                fontVariationSettings: "'SOFT' 4, 'opsz' 144",
                fontWeight: 360,
                fontSize: 'clamp(52px, 8vw, 124px)',
              }}
            >
              <span className="hero-line"><span className="hero-line-inner" style={{ animationDelay: '0.25s' }}>Barsat</span></span>
              <span className="hero-line"><span className="hero-line-inner" style={{ animationDelay: '0.4s', fontStyle: 'italic', color: 'var(--muted)' }}>Khadka</span></span>
            </h1>

            <p
              className="hero-fade mt-7 lg:mt-9 text-[17px] lg:text-[20px] leading-[1.6]"
              style={{ animationDelay: '0.78s', fontFamily: UI, color: 'var(--text)', maxWidth: '46ch' }}
            >
              Computer engineering student and researcher. I work on machine learning for
              chip design, reinforcement learning, world models, and interpretability and I
              read philosophy with the other half of my time.
            </p>

            <div className="hero-fade mt-4" style={{ animationDelay: '0.82s' }}>
              <button
                type="button"
                onClick={() => setShowCollab((v) => !v)}
                aria-expanded={showCollab}
                className="inline-flex items-baseline gap-2 text-[13px] tracking-wide"
                style={{ fontFamily: UI, color: 'var(--muted)' }}
              >
                <span style={{ color: VERMILLION }}>{showCollab ? '−' : '+'}</span>
                <span style={{ textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'var(--faint)' }}>
                  Interested in collaborating?
                </span>
              </button>
              {showCollab && (
                <div className="mt-4 max-w-[46ch]">
                  <CollaborateForm />
                </div>
              )}
            </div>
          </div>

          {/* News */}
          <aside
            className="hero-fade w-full lg:w-[400px] xl:w-[440px] lg:flex-shrink-0 border-t lg:border-t-0 lg:border-l pt-7 lg:pt-1 lg:pl-16"
            style={{ borderColor: 'var(--hairline)', animationDelay: '0.9s' }}
          >
            <p className="mb-6 flex items-center gap-3 text-[12.5px] tracking-[0.26em] uppercase" style={{ color: VERMILLION, fontFamily: UI }}>
              <span aria-hidden="true" style={{ width: 28, height: 1, background: VERMILLION, display: 'inline-block' }} />
              News
              <span className="normal-case tracking-normal" style={{ color: 'var(--faint)', fontSize: 11 }}>
                (click to view credential)
              </span>
            </p>
            <ol className="list-none p-0 m-0 space-y-6">
              {news.map((item, i) => (
                <li key={i} className="flex flex-col">
                  <span className="text-[11px] tracking-[0.2em] uppercase mb-1.5" style={{ color: 'var(--muted)', fontFamily: UI }}>
                    {item.date}
                  </span>
                  <span className="text-[16px] lg:text-[17px] leading-[1.5]" style={{ color: 'var(--text)' }}>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--accent)' }}>
                        {item.text}
                      </a>
                    ) : (
                      item.text
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        {/* Bottom — contents index */}
        <div className="hero-fade relative z-10 flex flex-wrap items-end justify-between gap-y-4 gap-x-8" style={{ animationDelay: '1s' }}>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              { id: 'about', n: 'i', label: 'Currently' },
              { id: 'research', n: 'ii', label: 'Research' },
              { id: 'projects', n: 'iii', label: 'Projects' },
              { id: 'publications', n: 'iv', label: 'Writing' },
              { id: 'philosophy', n: 'v', label: 'Philosophy' },
            ].map((s) => {
              const active = activeSection === s.id;
              return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                aria-current={active ? 'true' : undefined}
                className="group inline-flex items-baseline gap-2 text-[11px] sm:text-[12px] tracking-[0.16em] uppercase"
                style={{ color: 'var(--muted)', fontFamily: UI }}
              >
                <span style={{ fontFamily: SERIF, fontStyle: 'italic', color: VERMILLION, letterSpacing: 0, fontSize: 12 }}>{s.n}</span>
                <span className="link-slide" style={{ color: 'var(--text)' }}>{s.label}</span>
              </button>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="flex items-center gap-3 text-[10.5px] sm:text-[11px] tracking-[0.3em] uppercase"
            style={{ color: 'var(--muted)', fontFamily: UI }}
          >
            <span className="hero-scrollline" aria-hidden="true" />
            Scroll
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">

        {/* Left Sidebar */}
        <aside className="sidebar w-full md:w-[320px] lg:w-[420px] flex-shrink-0 border-r border-[color:var(--hairline)] md:sticky md:top-0 md:h-screen overflow-y-auto">
          <div className="p-4 lg:p-8">

            {/* Portrait */}
            <div className="mb-8 flex justify-start">
              <img
                src={myImage}
                alt="Barsat Khadka"
                loading="lazy"
                decoding="async"
                className="w-28 h-36 sm:w-32 sm:h-40 lg:w-36 lg:h-44 object-cover"
                style={{
                  objectPosition: 'center 28%',
                  filter: 'grayscale(0.15) contrast(1.02)',
                  boxShadow: '0 1px 0 rgba(26,26,26,0.10)'
                }}
              />
            </div>

            {/* Masthead name */}
            <p
              className="mb-1 leading-[0.92]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 380,
                fontSize: 'clamp(44px, 5.4vw, 62px)',
                letterSpacing: '-0.025em',
                fontVariationSettings: "'SOFT' 6, 'opsz' 120",
              }}
            >
              Barsat<br />
              <span style={{ fontStyle: 'italic', fontWeight: 360, color: 'var(--muted)' }}>Khadka</span>
            </p>
            <p
              className="mt-2 text-[19px] leading-[1.3]"
              style={{ fontFamily: DEVANAGARI, color: VERMILLION }}
              lang="ne"
            >
              बर्सत खड्का
            </p>
            <p
              className="mt-3 mb-6 text-[10.5px] tracking-[0.26em] uppercase"
              style={{ color: 'var(--muted)', fontFamily: UI }}
            >
              Computer Engineer · Researcher
            </p>

            {/* Letterhead block */}
            <address className="not-italic mb-6 text-[13px] leading-[1.5]" style={{ color: 'var(--text)' }}>
              <div className="grid grid-cols-[14px_1fr] gap-x-2.5 gap-y-[5px] items-center">
                <FiMapPin size={13} style={{ color: 'var(--muted)' }} />
                <span style={{ color: 'var(--muted)' }}>Hattiesburg, Mississippi</span>

                <FiMail size={13} style={{ color: 'var(--muted)' }} />
                <a href="mailto:khadkabarsat598@gmail.com" className="link-slide truncate">khadkabarsat598@gmail.com</a>

                <FiGithub size={13} style={{ color: 'var(--muted)' }} />
                <a href="https://github.com/BarsatKhadka" target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--text)' }}>github.com/BarsatKhadka</a>

                <SiGooglescholar size={13} style={{ color: 'var(--muted)' }} />
                <a href="https://scholar.google.com/citations?user=S0sDm5IAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--text)' }}>Google Scholar</a>

                <FiLinkedin size={13} style={{ color: 'var(--muted)' }} />
                <a href="https://www.linkedin.com/in/barsat-khadka" target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--text)' }}>in/barsat-khadka</a>

                <FiFileText size={13} style={{ color: 'var(--muted)' }} />
                <a
                  href="/Barsat-Khadka-CV.pdf"
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
              <p className="text-[10px] tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--muted)', fontFamily: UI }}>Studying at</p>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-md bg-[#FFD700] flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0 1px 0 rgba(26,26,26,0.10)' }}>
                  <img src={canvasImage} alt="USM" loading="lazy" decoding="async" className="w-7 h-7 lg:w-8 lg:h-8 object-contain" />
                </div>
                <div className="leading-snug pt-[1px]">
                  <p className="text-[14px] font-medium tracking-tight" style={{ color: 'var(--text)' }}>
                    {education.school}
                  </p>
                  <p className="text-[12.5px] leading-[1.35]" style={{ color: 'var(--muted)' }}>
                    {education.degree}
                  </p>
                  <p className="text-[12px] leading-[1.35]" style={{ color: 'var(--faint)' }}>
                    {education.year}
                  </p>
                </div>
              </div>

              {/* Distinctions */}
              <div className="mt-3.5 pt-3.5" style={{ borderTop: '1px solid var(--hairline)' }}>
                <p className="text-[9.5px] tracking-[0.3em] uppercase mb-2.5" style={{ color: 'var(--faint)', fontFamily: UI }}>
                  Distinctions
                </p>
                <ul className="space-y-[7px]">
                  {honors.map((h) => (
                    <li key={h.title} className="flex items-baseline gap-2">
                      <span
                        aria-hidden="true"
                        className="text-[10px] flex-shrink-0 translate-y-[-0.5px]"
                        style={{ color: VERMILLION, fontFamily: SERIF, fontStyle: 'italic' }}
                      >
                        ✶
                      </span>
                      <span className="text-[12.5px] leading-[1.3]" style={{ color: 'var(--text)' }}>
                        {h.title}
                        {h.detail && (
                          <span
                            className="ml-1.5 text-[12px]"
                            style={{ color: 'var(--faint)', fontFamily: SERIF, fontStyle: 'italic' }}
                          >
                            {h.detail}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mb-8">
              <ul className="space-y-[6px]">
                {[
                  { id: 'about', label: 'Currently', num: 'i' },
                  { id: 'research', label: 'Research', num: 'ii' },
                  { id: 'projects', label: 'Projects', num: 'iii' },
                  { id: 'publications', label: 'Writing', num: 'iv' },
                  { id: 'philosophy', label: 'Philosophy', num: 'v' },
                ].map(({ id, label, num }) => {
                  const active = activeSection === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                        aria-current={active ? 'true' : undefined}
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
              <p className="text-[10px] tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--muted)', fontFamily: UI }}>
                Research interests
              </p>
              <p className="text-[13.5px] leading-[1.7] tracking-tight" style={{ color: 'var(--text)' }}>
                {researchInterests.join(' · ')}
              </p>
            </div>

          </div>
        </aside>

        {/* Main Content */}
        <main id="main-content" className="main-content flex-1 w-full lg:max-w-[900px] px-4 lg:px-0 lg:ml-20">

          {/* About Section */}
          <section
            id="about"
            data-reveal
            ref={(el) => (sectionsRef.current.about = el)}
            className="relative pt-10 lg:pt-14 mb-16 lg:mb-24 px-4 lg:px-8"
          >
            <Folio numeral="i" />
            <Head kicker="at the moment">Currently</Head>
            <Rule />

            {/* Roles */}
            <dl className="mb-7 lg:mb-9 grid grid-cols-[6.5rem_1fr] sm:grid-cols-[7.5rem_1fr] gap-x-5 lg:gap-x-8 gap-y-1.5 text-[14.5px]">
              <dt className="uppercase tracking-[0.18em] text-[10.5px] pt-[5px]" style={{ color: 'var(--muted)', fontFamily: UI }}>Engineer</dt>
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
              <dt className="uppercase tracking-[0.18em] text-[10.5px] pt-[5px]" style={{ color: 'var(--muted)', fontFamily: UI }}>Researcher</dt>
              <dd className="leading-[1.5]">Research Assistant, Cyber Innovations Lab</dd>
              <dt className="uppercase tracking-[0.18em] text-[10.5px] pt-[5px]" style={{ color: 'var(--muted)', fontFamily: UI }}>Fellow</dt>
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
              <dt className="uppercase tracking-[0.18em] text-[10.5px] pt-[5px]" style={{ color: 'var(--muted)', fontFamily: UI }}>Secretary</dt>
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
              <p className="mb-3">
                I split my time between computer-science research and philosophy. The research
                is mostly machine learning for chip design and interpretability; the reading is
                mostly early Buddhism, Stoicism (I love Marcus Aurelius), and Krishnamurti. I like
                work that stays honest about what it does and doesn&apos;t know.
              </p>
            </div>
          </section>

          {/* Research Section */}
          <section
            id="research"
            data-reveal
            ref={(el) => (sectionsRef.current.research = el)}
            className="relative mb-16 lg:mb-24 px-4 lg:px-8"
          >
            <Folio numeral="ii" />
            <Head kicker="papers & preprints">Research</Head>
            <Rule />

            <ol className="list-none p-0 m-0 mt-1">
              {research.map((item, index) => {
                const st = STATUS_META[item.status];
                return (
                  <li
                    key={index}
                    className="paper group relative py-5 lg:py-6"
                    style={{ borderTop: index === 0 ? 'none' : '1px solid var(--hairline)' }}
                  >
                    {/* margin folio numeral */}
                    <span
                      className="absolute -left-9 lg:-left-14 top-[22px] lg:top-[27px] hidden sm:block select-none"
                      style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 18, color: 'var(--faint)', lineHeight: 1 }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="max-w-[70ch]">
                      {/* title + status stamp */}
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="leading-[1.32] tracking-tight" style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.018em' }}>
                          {item.link ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--accent)' }}>
                              {item.title}
                            </a>
                          ) : (
                            <span style={{ color: 'var(--accent)' }}>{item.title}</span>
                          )}
                        </h3>
                        {st && (
                          <span
                            className="flex-shrink-0 mt-[3px] inline-flex items-center gap-1.5 whitespace-nowrap"
                            style={{
                              fontFamily: UI, fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase',
                              color: st.fg, background: st.bg, border: `1px solid ${st.bd}`, padding: '3px 9px', borderRadius: '2px',
                            }}
                          >
                            {st.seal && <span aria-hidden="true" style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 10 }}>✶</span>}
                            {st.label}
                          </span>
                        )}
                      </div>

                      {/* authors */}
                      {item.authors && (
                        <p className="text-[13.5px] leading-[1.5] mt-1.5" style={{ color: 'var(--muted)' }}>
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

                      {/* venue + links */}
                      {(item.venue || (item.links && item.links.length)) && (
                        <div className="mt-2.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[12.5px]" style={{ color: 'var(--muted)' }}>
                          {item.venue && (
                            <span className="font-medium tracking-tight" style={{ color: 'var(--text)' }}>{item.venue}</span>
                          )}
                          {item.links && item.links.length > 0 && (
                            <>
                              <span className="opacity-40">·</span>
                              {item.links.map((l, i) => (
                                <React.Fragment key={l.label}>
                                  {i > 0 && <span className="opacity-30">/</span>}
                                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--accent)' }}>
                                    {l.label}
                                  </a>
                                </React.Fragment>
                              ))}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            data-reveal
            ref={(el) => (sectionsRef.current.projects = el)}
            className="relative mb-16 lg:mb-24 px-4 lg:px-8"
          >
            <Folio numeral="iii" />
            <Head kicker="built & building">Projects</Head>
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
                    {project.year ? `${project.year} —` : project.status}
                  </span>

                  <div className="flex items-baseline gap-3 mb-3">
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
                      <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--muted)', fontFamily: UI }}>
                        {repoStats.stars} stars
                        <span className="opacity-40">·</span>
                        {repoStats.forks} forks
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
                    <figure className="mt-8 max-w-[600px] m-0 overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--bg)', boxShadow: '0 26px 52px -30px rgba(22,20,15,0.42)' }}>
                      <div className="flex items-center gap-1.5 px-3.5 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: VERMILLION, display: 'inline-block' }} />
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(22,20,15,0.18)', display: 'inline-block' }} />
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(22,20,15,0.18)', display: 'inline-block' }} />
                        <span className="ml-3 text-[10.5px] tracking-[0.14em] uppercase" style={{ color: 'var(--muted)', fontFamily: UI }}>
                          vinaya-journal.vercel.app
                        </span>
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                        <img
                          src={projectImage}
                          alt="Vinaya Journal — offline-first AI journaling app"
                          loading="lazy"
                          decoding="async"
                          className="w-full block"
                          style={{ filter: 'grayscale(0.06) contrast(0.99)' }}
                        />
                      </a>
                    </figure>
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
            data-reveal
            ref={(el) => (sectionsRef.current.publications = el)}
            className="relative mb-16 lg:mb-24 px-4 lg:px-8"
          >
            <Folio numeral="iv" />
            <Head kicker="from the notebook">Writing</Head>
            <Rule />

            <p className="mb-7 text-[14px] max-w-[58ch] leading-[1.7]" style={{ color: 'var(--muted)' }}>
              Essays and technical notes — thinking out loud, in public.
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

          {/* Philosophy Section — kept brief and plain */}
          <section
            id="philosophy"
            data-reveal
            ref={(el) => (sectionsRef.current.philosophy = el)}
            className="relative mb-16 lg:mb-24 px-4 lg:px-8"
          >
            <Folio numeral="v" />
            <Head kicker="the other half of the day">Philosophy</Head>
            <Rule />

            <p className="max-w-[62ch] text-[15.5px] lg:text-[16px] leading-[1.8] mb-9" style={{ color: 'var(--text)' }}>
              When I&apos;m not doing research, I read philosophy — mostly early Buddhism,
              Stoicism (I love Marcus Aurelius), and Krishnamurti. I&apos;m not looking for a
              system that explains everything. I&apos;m more interested in keeping the oldest
              questions open and being honest about how little we actually see.
            </p>

            <ul className="list-none p-0 m-0 space-y-5 max-w-[64ch]">
              {philosophyNotes.map((note, i) => (
                <li key={i} className="relative pl-5" style={{ borderLeft: `2px solid ${VERMILLION}` }}>
                  <p className="text-[15px] leading-[1.75]" style={{ color: 'var(--text)' }}>
                    {note}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Footer */}
          <footer data-reveal className="relative px-4 lg:px-8 pb-20 lg:pb-28">
            <div className="max-w-[60ch] mx-auto pt-12 text-center" style={{ borderTop: '1px solid var(--hairline)' }}>
              <p style={{ fontFamily: DISPLAY, fontSize: 20, fontWeight: 400, letterSpacing: '-0.015em', lineHeight: 1.2, color: 'var(--muted)' }}>
                Barsat Khadka
                <span style={{ fontFamily: DEVANAGARI, color: VERMILLION, marginLeft: 10, fontSize: 19 }} lang="ne">बर्सत खड्का</span>
              </p>
              <nav className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px]" style={{ fontFamily: UI, color: 'var(--text)' }}>
                <a href="mailto:khadkabarsat598@gmail.com" className="link-slide">Email</a>
                <span style={{ color: 'var(--faint)' }}>·</span>
                <a href="https://github.com/BarsatKhadka" target="_blank" rel="noopener noreferrer" className="link-slide">GitHub</a>
                <span style={{ color: 'var(--faint)' }}>·</span>
                <a href="https://scholar.google.com/citations?user=S0sDm5IAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="link-slide">Scholar</a>
                <span style={{ color: 'var(--faint)' }}>·</span>
                <a href="https://www.linkedin.com/in/barsat-khadka" target="_blank" rel="noopener noreferrer" className="link-slide">LinkedIn</a>
              </nav>
              <p className="mt-7 text-[10.5px] tracking-[0.2em] uppercase" style={{ color: 'var(--muted)', fontFamily: UI }}>
                Grew up in Nepal · based in Hattiesburg · open source, open science
              </p>
            </div>
          </footer>

        </main>

        {/* Right Sidebar — marginalia */}
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
                { role: 'Software Engineering Intern', org: 'Sports Media (Dakdan Worldwide)' },
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

            <div className="mt-9 pt-6" style={{ borderTop: '1px solid rgba(26,26,26,0.10)' }}>
              <p className="text-[10px] tracking-[0.28em] uppercase mb-3" style={{ color: 'var(--muted)' }}>
                Away from the desk
              </p>
              <p className="text-[13px] leading-[1.75]" style={{ color: 'var(--text)' }}>
                Music in the headphones, something on the stove, and long reads on the commute.
                The rest of the day goes to sitting with the older questions.
              </p>

              <div className="mt-6 flex flex-col gap-5">
                {[
                  { src: plateImage, num: 'i', caption: '“do something”' },
                  { src: plateImage2, num: 'ii', caption: 'nature, in a box of our own equations' },
                ].map((plate) => (
                  <figure key={plate.num} className="m-0">
                    <img
                      src={plate.src}
                      alt={plate.caption}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto block"
                      style={{
                        filter: 'grayscale(0.1) saturate(0.92) contrast(1.01)',
                        boxShadow: '0 14px 30px -16px rgba(22,20,15,0.42), 1px 1px 0 rgba(26,26,26,0.08)',
                      }}
                    />
                    <figcaption className="mt-2 text-[11px] leading-[1.4]" style={{ color: 'var(--muted)', fontFamily: UI }}>
                      <span style={{ fontFamily: SERIF, fontStyle: 'italic', color: VERMILLION, marginRight: 6 }}>{plate.num}</span>
                      {plate.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
