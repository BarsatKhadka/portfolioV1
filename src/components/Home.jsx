import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiGithub, FiLinkedin, FiFileText, FiMapPin } from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';
import projectImage from '../assets/image.png';
import canvasImage from './canvas.png';
import myImage from './MyImage.webp';
import sidebarImage from './image.webp';
import sidebarImage2 from './image2.webp';

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
    venueFull: 'MLBench workshop at ASPLOS',
    status: 'accepted',
    link: 'https://arxiv.org/abs/2602.19330',
    arxivId: '2602.19330',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2602.19330' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2602.19330' }
    ]
  },
  {
    title: 'MechRL: Reinforcement Learning Agents Perform Circuit Discovery for Mechanistic Interpretability',
    authors: 'Barsat Khadka',
    venue: 'Ongoing',
    venueFull: 'Open to suggestions and would love for people to explore this. open source and open science',
    status: 'ongoing',
    link: 'https://arxiv.org/abs/2605.26343',
    arxivId: '2605.26343',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2605.26343' },
      { label: 'PDF', href: 'https://arxiv.org/pdf/2605.26343' }
    ]
  },
  {
    title: 'Multiphase Social Engineering Attack Detection using GNN and BERT',
    authors: 'Barsat Khadka, Prasant Koirala, Kshitiz Neupane, Nick Rahimi',
    venue: 'arXiv preprint',
    venueFull: 'Under review at Springer',
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

const philosophyNotes = [
  {
    en: 'Mother nature, you are truly incomprehensible. Mother nature, you are truly infinite.',
    ne: 'आमा प्रकृति, तिमी साँच्चै बुझ्न नसकिने छौ। आमा प्रकृति, तिमी साँच्चै अनन्त छौ।'
  },
  {
    en: 'We must remember that we do not observe nature as it really exists but nature exposed to our methods of perception.',
    ne: 'हामीले यो कुरा सम्झनुपर्छ कि हामी प्रकृतिलाई जस्तो छ त्यस्तै रूपमा देख्दैनौँ, बरु हाम्रो अनुभूति र बुझाइका तरिकाहरूबाट छानिएर देखिएको प्रकृतिलाई मात्र देख्छौँ।'
  },
  {
    en: 'The manifestation of mother nature and reality is infinite and we are finite by design. Any attempt to explain the nature of reality is foolish.',
    ne: 'आमा प्रकृति र वास्तविकताको प्रकट रूप अनन्त छ, र हामी सीमित भएर बनाइएका छौँ। वास्तविकताको प्रकृतिलाई पूर्ण रूपमा व्याख्या गर्ने कुनै पनि प्रयास मूर्खता जस्तो लाग्न सक्छ।'
  },
  {
    en: 'Experience is not reality and reality cannot be experienced as it is. If I don’t know reality, the unknown, how can I search for it?',
    ne: 'अनुभव स्वयं वास्तविकता होइन, र वास्तविकतालाई जस्तो छ त्यस्तै रूपमा अनुभव गर्न सकिँदैन। यदि मलाई वास्तविकता, त्यो अज्ञात कुरा, थाहा छैन भने म त्यसलाई कसरी खोज्न सक्छु?'
  },
  {
    en: 'A man who is understanding life does not want beliefs, and I don’t know if it is possible for the human mind to understand the whole working of reality — but the pursuit of it is madness, and it is beautiful.',
    ne: 'जीवनलाई साँच्चै बुझ्ने मानिसलाई केवल विश्वासहरू चाहिँदैन। मलाई थाहा छैन कि मानव मस्तिष्कले वास्तविकताको सम्पूर्ण कार्यलाई बुझ्न सक्छ कि सक्दैन, तर त्यसको खोजी पागलपन जस्तो पनि छ र सुन्दर पनि।'
  },
  {
    en: 'This is philosophy at its most honest. Not the academic kind.',
    ne: 'यो दर्शन हो—सबैभन्दा इमानदार रूपमा। शैक्षिक प्रकारको होइन।'
  },
  {
    en: 'And I am no hunter of reality. I have completely surrendered to the vastness of it. These are just a couple of words on my relationship with whom I consider my most beloved: mother reality.',
    ne: 'र म वास्तविकताको शिकार गर्ने कोही होइन। मैले पूर्ण रूपमा यसको विशालतामा आत्मसमर्पण गरेको छु। यी केवल केही शब्दहरू हुन्—मेरो सम्बन्धका, जसलाई म मेरो सबैभन्दा प्रिय मान्छु: आमा वास्तविकता।'
  }
];

const philosophyPassage = {
  source: 'Yoga Vāsiṣṭha · Vairāgya Prakaraṇa',
  paragraphs: [
    'I grew up happily in my family’s abode; I was instructed by worthy teachers. Recently I went on a pilgrimage. During this period a trend of thought has taken hold of me, robbing me of all hope in this world. My heart begins to question: what do people call happiness, and can it be had in the ever-changing objects of this world?',
    'All beings in this world take birth but to die, and they die to be born! I do not perceive any meaning in all these transient phenomena which are the roots of suffering and sin. Unrelated beings come together; and the mind conjures up a relationship between them. Everything in this world is dependent upon the mind, upon one’s mental attitude. On examination, the mind itself appears to be unreal! But we are bewitched by it. We seem to be running after a mirage in the desert to slake our thirst!',
    'Sirs, surely we are not bond slaves sold to a master; yet we live a life of slavery, without any freedom whatever. Ignorant of the truth, we have been aimlessly wandering in this dense forest called the world. What is this world? What comes into being, grows, and dies? How does this suffering come to an end? My heart bleeds with sorrow, though I do not shed tears, in deference to these feelings, my friend.',
    'Equally useless, O sage, is wealth which deludes the ignorant. Unsteady and fleeting, this wealth gives birth to numerous worries and generates an insatiable craving for more. Wealth is no respecter of persons: both the good and the wicked can become wealthy. However, people are good, compassionate and friendly only till their hearts are hardened by the passionate pursuit of wealth. Wealth taints the heart even of the wise scholar, a hero, a man of gratitude and a dexterous and soft-spoken person. Wealth and happiness do not dwell together. Rare is that wealthy man who does not have rivals and enemies who scandalise him.',
    'To the lotus of right action, wealth is the night; to the white lotus of sorrow, it is the moonlight; to the lamp of clear insight, it is the wind; to the wave of enmity, it is the flood; to the cloud of confusion, it is the favourable wind; to the poison of despondency, it is the aggravating agent. It is like the serpent of evil thoughts and it adds fear to one’s distress; it is destructive snowfall to the creeper of dispassion; it is the nightfall to the owl of evil desires; it is the eclipse of the moon of wisdom. In its presence a person’s good nature shrivels. Indeed, wealth seeks him who has already been chosen by death.',
    'Even so is the lifespan, O sage. Its duration is like that of a water droplet on a leaf. The lifespan is fruitful only to those who have self-knowledge. We may encompass the wind, we may break up space, we may string waves into a garland, but we cannot pin our faith on the lifespan. Man vainly seeks to extend his lifespan, and thereby he earns more sorrow and extends the period of suffering. Only he lives who strives to gain self-knowledge, which alone is worth gaining in this world, thereby putting an end to future births; others exist here like donkeys.',
    'To the unwise, knowledge of scriptures is a burden; to one who is full of desires, even wisdom is a burden; to one who is restless, his own mind is a burden; and to one who has no self-knowledge, the body is a burden. The rat of time gnaws at the lifespan without respite. The termite of disease destroys the very vitals of the living being. Just as a cat intent on catching a rat looks at it with great alertness and readiness, death is ever keeping a watch over this lifespan.',
    'Holy sirs, I am bewildered and scared when I contemplate the coming into being of the dreadful enemy of wisdom known as egotism. It comes into being in the darkness of ignorance, and flourishes in ignorance. It generates endless sinful tendencies and sinful actions. All suffering surely revolves around egotism (it is the “I” who suffers); and egotism is the sole cause of mental distress.',
    'I feel that egotism is my worst disease! Spreading the net of worldly objects of pleasure, it is this egotism that traps living beings. Indeed, all the terrible calamities in this world are born of egotism. Egotism eclipses self-control, destroys virtue and dissipates equanimity. Giving up the egotistic notion and giving up all desires, I wish to rest in the self. I realise that whatever I have done with an egotistic notion is vain: non-egotism alone is truth. When I am under the influence of egotism, I am unhappy; when I am free from egotism I am happy. Egotism promotes cravings; without it they perish. It is this egotism alone, without rhyme or reason, that has spread the net of family and social relationships, to catch the unwary soul. I think I am free from egotism; yet, I am miserable. Pray, enlighten me.',
    'In his youth, man is a slave of sexual attraction. In the body which is no more than the aggregate of flesh, blood, bone, hair and skin, he perceives beauty and charm. If this beauty were permanent, there would be some justification to the imagination; but, alas, it does not last very long. On the contrary, very soon the very flesh that contributed to the attractiveness, the charm and the beauty of the beloved is transformed first into the shrivelled ugliness of old age, and later consumed by fire, or by worms, or by vultures. Yet, while it lasts this attraction consumes the heart and the wisdom of the man. By this is the creation maintained; when this attraction ceases, this samsara also ceases.',
    'When the child is dissatisfied with its childhood, youth takes over; when youth is plagued by dissatisfaction and frustration, old age overpowers it — how cruel is life. Even as wind tosses a dew-drop from a leaf, old age destroys the body. Even as a drop of poison when it enters the system soon pervades it, senility soon pervades the entire body and breaks it down, and makes it the laughing stock of other people.',
    'All enjoyments in this world are delusion, like the lunatic’s enjoyment of the taste of fruits reflected in a mirror. All the hopes of man in this world are consistently destroyed by Time. Time alone, O sage, wears everything out in this world; there is nothing in creation which is beyond its reach. Time alone creates innumerable universes, and in a very short time Time destroys everything. Time allows a glimpse of itself through its partial manifestation as the year, the age, and the epoch; but its essential nature is hidden.',
    'This Time overpowers everything. Time is merciless, inexorable, cruel, greedy and insatiable. Time is the greatest magician, full of deceptive tricks. This Time cannot be analysed; for however much it is divided it still survives indestructible. It has an insatiable appetite for everything — it consumes the smallest insects, the biggest mountains, and even the king of heaven! Even as a young boy plays with a ball for his pastime, Time uses the two balls known as the sun and the moon for his pastime. It is indeed Time alone that appears as the destroyer of the universe, the creator of the world, the king of heaven, the lord of wealth, and the nothingness of cosmic dissolution. It is indeed this Time that successively creates and dissolves the universe again and again. Just as even the great and mighty mountain is rooted on earth, this mighty Time is also established in the absolute being. Even though Time creates endless universes, it is not wearied, nor does it rejoice; it does not come, nor does it go; it does not rise, nor does it set.',
    'All beings in this world are tainted with evil; all relationships are bondage; all enjoyments are great diseases; and desire for happiness is only a mirage. One’s own senses are one’s enemies; the reality has become unreal; one’s own mind has become one’s worst enemy. Egotism is the foremost cause of evil; wisdom is weak; all actions lead to unpleasantness. One’s intelligence is governed by egotism, instead of being the other way round. Hence there is no peace nor happiness in one’s mind.',
    'Youth is fading. Company of holy ones is rare. There is no way out of this suffering. The realisation of truth is not to be seen in anyone. No one is happy at the prosperity and happiness of others, nor is compassion to be found in anyone’s heart. People are getting baser and baser by the day. Weakness has overcome strength, cowardice has overpowered courage. Evil company is easily had, good company is hard to come by. I wonder whither Time is driving humanity.'
  ]
};

const closingVerse = {
  attribution: 'Nāgārjuna · Ratnāvalī',
  stanzas: [
    [
      'Like the earth, water, wind, and fire,',
      'medicinal herbs, and the trees of the wilderness,',
      'may I always freely be an object of enjoyment,',
      'by all beings as they wish.'
    ],
    [
      'May I be beloved of beings, and may they',
      'be more beloved to me than myself.',
      'May I bear the results of their negativity,',
      'and may they have the results of all my virtue.'
    ],
    [
      'As long as there is even some single',
      'sentient being somewhere who is not yet free,',
      'may I remain in the world for that being’s sake,',
      'even if I have attained unexcelled awakening.'
    ]
  ]
};

const researchInterests = [
  'Graph Neural Networks',
  'ML for Physical Design (EDA)',
  'Mechanistic Interpretability',
  'Reinforcement Learning',
  'Security & GNNs',
  'Open Science & Open Source'
];

const education = {
  school: "The University of Southern Mississippi",
  degree: "Computer Engineering",
  year: "Class of 2028"
};

const SERIF = "'Playfair Display', 'Cormorant Garamond', Georgia, serif";
const DEVANAGARI = "'Noto Serif Devanagari', 'Tiro Devanagari Sanskrit', 'Mukta', 'Kohinoor Devanagari', serif";
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
  const [showPassage, setShowPassage] = useState(false);
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
              className="mt-2 text-[19px] leading-[1.3]"
              style={{ fontFamily: DEVANAGARI, color: VERMILLION }}
              lang="ne"
            >
              बर्सत खड्का
            </p>
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

                <SiGooglescholar size={13} style={{ color: 'var(--muted)' }} />
                <a href="https://scholar.google.com/citations?user=S0sDm5IAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="link-slide" style={{ color: 'var(--text)' }}>Google Scholar</a>

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
                  { id: 'philosophy', label: 'Philosophy', num: 'v' },
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
            data-reveal
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
                  T
                </span>
                wo things take up almost all my time: computer science research and philosophy — mostly early Buddhism, Krishnamurti, Spinoza, and the like.
              </p>
            </div>
          </section>


          {/* Research Section */}
          <section
            id="research"
            data-reveal
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
            data-reveal
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
            data-reveal
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

          {/* Philosophy Section */}
          <section
            id="philosophy"
            data-reveal
            ref={(el) => (sectionsRef.current.philosophy = el)}
            className="relative mb-10 lg:mb-16 px-4 lg:px-8"
          >
            <Folio numeral="v" label="Philosophy" />
            <Head>Philosophy</Head>
            <Rule />

            {/* Notes — English with Nepali beneath */}
            <div className="space-y-8 max-w-[64ch]">
              {philosophyNotes.map((note, index) => (
                <div key={index} className="relative">
                  <span
                    className="absolute -left-7 lg:-left-9 top-[6px] hidden sm:block"
                    style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: 'var(--muted)' }}
                  >
                    §{index + 1}
                  </span>
                  <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text)' }}>
                    {note.en}
                  </p>
                  <p
                    className="mt-1.5 text-[14.5px] leading-[2]"
                    style={{ fontFamily: DEVANAGARI, color: 'var(--muted)' }}
                    lang="ne"
                  >
                    {note.ne}
                  </p>
                </div>
              ))}
            </div>

            {/* Extended passage — a text returned to */}
            <div className="mt-14 max-w-[64ch]">
              <div className="flex items-center gap-3 mb-5" aria-hidden="true">
                <span style={{ width: 4, height: 4, background: VERMILLION, borderRadius: '50%' }} />
                <span className="h-px flex-1" style={{ background: 'rgba(26,26,26,0.16)' }} />
              </div>
              <p className="mb-6 text-[11px] tracking-[0.22em] uppercase" style={{ color: 'var(--muted)' }}>
                A passage I return to
                <span className="mx-2 opacity-40">—</span>
                <span style={{ fontFamily: SERIF, fontStyle: 'italic', textTransform: 'none', letterSpacing: 0, fontSize: 13.5 }}>
                  {philosophyPassage.source}
                </span>
              </p>
              <div
                className="relative pl-5 lg:pl-6"
                style={{ borderLeft: `2px solid ${VERMILLION}` }}
              >
                <div className="space-y-4">
                  {(showPassage ? philosophyPassage.paragraphs : philosophyPassage.paragraphs.slice(0, 2)).map((para, index) => (
                    <p key={index} className="text-[15px] leading-[1.85]" style={{ color: 'var(--text)' }}>
                      {para}
                    </p>
                  ))}
                </div>
                {!showPassage && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                    style={{ background: 'linear-gradient(to bottom, rgba(250,248,243,0), var(--bg))' }}
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowPassage((v) => !v)}
                className="mt-5 inline-flex items-baseline gap-2 group text-[12px] tracking-[0.16em] uppercase"
                style={{ color: 'var(--muted)' }}
              >
                <span className="link-slide" style={{ color: 'var(--text)' }}>
                  {showPassage ? 'Collapse passage' : 'Read the full passage'}
                </span>
                <span style={{ color: VERMILLION }}>{showPassage ? '↑' : '↓'}</span>
              </button>
            </div>
          </section>

          {/* Closing epigraph — the vow the whole page rests on */}
          <section data-reveal className="relative mb-16 lg:mb-24 px-4 lg:px-8">
            <div className="flex items-center gap-3 mb-10 max-w-[64ch] mx-auto" aria-hidden="true">
              <span className="h-px flex-1" style={{ background: 'rgba(26,26,26,0.14)' }} />
              <span style={{ color: VERMILLION, fontFamily: SERIF, fontStyle: 'italic', fontSize: 15 }}>❧</span>
              <span className="h-px flex-1" style={{ background: 'rgba(26,26,26,0.14)' }} />
            </div>
            <blockquote className="max-w-[58ch] mx-auto text-center">
              <div className="space-y-6">
                {closingVerse.stanzas.map((stanza, si) => (
                  <p
                    key={si}
                    style={{
                      fontFamily: SERIF,
                      fontStyle: 'italic',
                      fontSize: '18px',
                      lineHeight: 1.7,
                      color: 'var(--text)',
                    }}
                  >
                    {stanza.map((line, li) => (
                      <React.Fragment key={li}>
                        {line}
                        {li < stanza.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                ))}
              </div>
              <footer className="mt-9 text-[11px] tracking-[0.22em] uppercase" style={{ color: 'var(--muted)' }}>
                <span style={{ color: VERMILLION }}>—</span>&nbsp;&nbsp;{closingVerse.attribution}
              </footer>
            </blockquote>
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

            {/* Away from the desk — the human texture */}
            <div className="mt-9 pt-6" style={{ borderTop: '1px solid rgba(26,26,26,0.10)' }}>
              <p className="text-[10px] tracking-[0.28em] uppercase mb-3" style={{ color: 'var(--muted)' }}>
                Away from the desk
              </p>
              <p className="text-[13px] leading-[1.75]" style={{ color: 'var(--text)' }}>
                Music in the headphones, something on the stove, long commutes to read on, and the occasional late-night game.
              </p>
              <p className="text-[13px] leading-[1.75] mt-2.5" style={{ color: 'var(--muted)' }}>
                The rest of the day belongs to a quieter thing — sitting with the oldest questions and not minding that they stay open.
              </p>
            </div>

            {/* Plates — framed marginalia, captioned like a book */}
            <div className="mt-9 pt-6" style={{ borderTop: '1px solid rgba(26,26,26,0.10)' }}>
              <p className="text-[10px] tracking-[0.28em] uppercase mb-4" style={{ color: 'var(--muted)' }}>
                Plates
              </p>
              <div className="space-y-7">
                {[
                  { src: sidebarImage, num: 'i', caption: '“do something”' },
                  { src: sidebarImage2, num: 'ii', caption: 'nature, in a box of our own equations' },
                ].map((plate) => (
                  <figure key={plate.num} className="m-0">
                    <img
                      src={plate.src}
                      alt={plate.caption}
                      width={640}
                      height={427}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto"
                      style={{
                        filter: 'grayscale(0.12) saturate(0.9) contrast(1.01)',
                        boxShadow: '0 1px 0 rgba(26,26,26,0.10), 10px 10px 0 -1px rgba(181,52,31,0.06)',
                      }}
                    />
                    <figcaption
                      className="mt-2.5 text-[11.5px] leading-[1.45]"
                      style={{ color: 'var(--muted)' }}
                    >
                      <span style={{ fontFamily: SERIF, fontStyle: 'italic', color: VERMILLION, marginRight: 6 }}>
                        {plate.num}
                      </span>
                      {plate.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(26,26,26,0.10)' }}>
              <p
                className="text-[11px] leading-[1.75] tracking-tight"
                style={{ color: 'var(--muted)' }}
              >
                A long way from where it began — <br />
                grew up in Nepal, writing this from Hattiesburg. <br />
                Kept open on principle: <br />
                open source, open science. <br />
                <span style={{ color: VERMILLION }}>印</span> &nbsp; Made on warm paper.
              </p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
