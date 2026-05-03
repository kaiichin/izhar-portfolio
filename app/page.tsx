"use client";

import { useEffect, useState } from "react";
import Reveal from "../components/Reveal";
import AnimatedRole from "../components/AnimatedRole";
import TiltWrapper from "../components/TiltWrapper";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Calendar,
  ChevronRight,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Server,
  Sparkles,
  TerminalSquare,
  UserRound,
  Workflow
} from "lucide-react";

const links = {
  github: "https://github.com/kaiichin",
  linkedin: "https://linkedin.com/in/izhar-octafirlian-susilo",
  email: "mailto:Izharsusilo12@gmail.com",
  resume: "/resume/Izhar_Octafirlian_Susilo.pdf"
};

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

const roles = [
  "Game Developer",
  "Web Developer",
  "AI/ML Builder",
  "Pro Valorant Player",
];

const codeLines = [
  ["const", " developer = {"],
  ["", "  name: 'Izhar Octafirlian Susilo',"],
  ["", "  age: '20 years old',"],
  ["", "  skills: ['AI', 'Web', 'Unity'],"],
  ["", "  location: 'Indonesia, South Tangerang'"],
  ["", "  availableForInternship: true,"],
  ["", "};"],
  ["developer", ".showcase();"]
];

const stats = [
  { value: "3.53", label: "GPA" },
  { value: "7+", label: "PROJECTS" },
  { value: "4", label: "STACK AREAS" }
];

const skillTiles = [
  { icon: Workflow, name: "YOLOv8", label: "Computer Vision" },
  { icon: Server, name: "FastAPI", label: "Backend" },
  { icon: Database, name: "MySQL", label: "Database" },
  { icon: Code2, name: "Laravel", label: "Web App" },
  { icon: Sparkles, name: "TensorFlow", label: "Deep Learning" },
  { icon: TerminalSquare, name: "Python", label: "Language" },
  { icon: Code2, name: "Tailwind CSS", label: "Interface" },
  { icon: Workflow, name: "Unity + C#", label: "Interactive" },
  { icon: Github, name: "GitHub", label: "Versioning" },
  { icon: Server, name: "Docker", label: "Deployment" }
];

const featuredProjects = [
  {
    title: "ODOL Truck Detection",
    type: "Computer Vision + Web App",
    summary:
      "Two-stage AI pipeline for detecting overloaded trucks using YOLOv8, MobileNetV2, and a FastAPI interface.",
    impact:
      "Built a Hugging Face demo and documented CCTV angle limitations for side-profile versus top-down images.",
    tech: ["YOLOv8", "MobileNetV2", "FastAPI", "Docker", "JavaScript"],
    repo: "https://github.com/kaiichin/ODOL-Truck-Detection",
    demo: "https://huggingface.co/spaces/Kaiichin/odol-truck-detection-website",
    accent: "from-rust/30 via-amber-200/30 to-moss/25",
    preview: "odol",
    image: ""
  },
  {
    title: "HomeHeal",
    type: "Full-Stack Healthcare Platform",
    summary:
      "Digital rehabilitation platform for therapist-patient workflows, protocols, assignment, and progress tracking.",
    impact:
      "Shipped a Laravel app with authentication, MySQL storage, clinical logs, and authorization policies.",
    tech: ["Laravel 11", "Tailwind CSS", "Alpine.js", "MySQL", "Vercel"],
    repo: "https://github.com/kaiichin/HomeHeal",
    demo: "https://home-heal.vercel.app/",
    accent: "from-moss/25 via-white/45 to-rust/25",
    preview: "homeheal",
    image: ""
  },
  {
    title: "Zero-DCE Low-Light Enhancement",
    type: "Deep Learning Image Enhancement",
    summary:
      "Zero-reference low-light enhancement system using a lightweight TensorFlow model and Streamlit interface.",
    impact:
      "Implemented DCE-Net losses and reported PSNR, SSIM, NIQE, and GMSD results on the LOL dataset.",
    tech: ["TensorFlow", "Keras", "Streamlit", "OpenCV"],
    repo: "https://github.com/kaiichin/Zero-DCE-Low-Light-Enhancement",
    accent: "from-ink/15 via-steel/20 to-amber-200/35",
    preview: "generic",
    image: ""
  },
  {
    title: "NLP Music Genre Classifier",
    type: "NLP + Machine Learning",
    summary:
      "Research project classifying music genres from lyrics with TF-IDF, NMF topic modeling, and supervised classifiers.",
    impact:
      "Processed a balanced 60K-song dataset and compared Logistic Regression, Linear SVM, and Random Forest.",
    tech: ["Python", "NLP", "NMF", "TF-IDF", "Random Forest"],
    repo: "https://github.com/kaiichin/Classify-Music-Genre-NMF",
    accent: "from-rust/25 via-white/35 to-steel/20",
    preview: "generic",
    image: ""
  },
  {
    title: "The Cabin",
    type: "Unity Horror Prototype",
    summary:
      "First-person Unity horror exploration game with flashlight mechanics, environmental audio, and interactions.",
    impact:
      "Focused on atmosphere, player navigation, and moment-to-moment interaction design.",
    tech: ["Unity", "C#", "Game Design"],
    repo: "https://github.com/kaiichin/the-cabin",
    accent: "from-ink/20 via-moss/20 to-rust/20",
    preview: "cabin",
    image: "/projects/the-cabin.jpeg"
  },
  {
    title: "Higher Lower TCP Game",
    type: "Unity + Networking",
    summary:
      "Unity client and C# TCP server number guessing game with server-side logic and attempt tracking.",
    impact:
      "Practiced client-server flow, feedback states, and interactive networking basics.",
    tech: ["Unity", "C#", "TCP Networking"],
    repo: "https://github.com/kaiichin/Higher-Lower-Game-Project",
    accent: "from-moss/25 via-amber-200/25 to-white/45",
    preview: "generic",
    image: ""
  }
];

const visibleProjectTitles = new Set([
  "ODOL Truck Detection",
  "HomeHeal",
  "The Cabin"
]);

const timeline = [
  {
    date: "2023 - 2027",
    title: "BINUS University",
    subtitle: "Computer Science - Global Class",
    points: [
      "GPA 3.53 with Global Class curriculum and international exchange requirement.",
      "Built projects across AI, web systems, and interactive technology."
    ]
  },
  {
    date: "Feb 2026 - Jul 2026",
    title: "Saxion University of Applied Sciences",
    subtitle: "Creative Media & Game Technologies",
    points: [
      "Exchange student in the Netherlands, expanding CS work into games, interaction, and creative technology.",
      "Studied practical development workflows across interactive systems."
    ]
  },
  {
    date: "Jun 2024 - Dec 2025",
    title: "HIMTI BINUS University",
    subtitle: "Committee Staff & Activist",
    points: [
      "Head of Event for HIMTI MEET and activist in HIMTI Care community initiatives.",
      "Sponsorship staff for HISHOT, supporting external partnerships for a cybersecurity event.",
      "Best Mentor award at SESVENT while supporting logistics and participant guidance."
    ]
  }
];

function useActiveSection() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Whenever a section crosses into our trigger window, set it as active
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      // This creates a narrow invisible "trigger band" roughly 30% down from the top of your screen.
      // It completely ignores the height of your sections, making it bulletproof.
      { rootMargin: "-30% 0px -60% 0px" }
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}


function SectionTitle({
  eyebrow,
  title,
  accent,
  children
}: {
  eyebrow: string;
  title: string;
  accent: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-title reveal-up">
      <div className="section-eyebrow">
        <span />
        {eyebrow}
        <span />
      </div>
      <h2>
        {title} <strong>{accent}</strong>
      </h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

function SocialLink({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a className="social-tile" href={href} aria-label={label} title={label}>
      {children}
    </a>
  );
}

function ActionLink({
  href,
  children,
  primary,
  download
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
  download?: boolean;
}) {
  return (
    <a
      className={primary ? "cta-button primary" : "cta-button secondary"}
      href={href}
      download={download}
    >
      {children}
    </a>
  );
}

function CodeWindow() {
  return (
    <div className="code-window reveal-up">
      <div className="code-header">
        <div className="traffic-lights">
          <span />
          <span />
          <span />
        </div>
        <p>
          <span />
          Portfolio.ts
        </p>
      </div>
      <div className="code-body">
        {codeLines.map(([keyword, value], index) => (
          <div className="code-row" key={`${keyword}-${value}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <code>
              {keyword ? <strong>{keyword}</strong> : null}
              {value}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index
}: {
  project: (typeof featuredProjects)[number];
  index: number;
}) {
  return (
    <article className="project-card group reveal-up transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_25px_65px_rgba(20,20,20,0.12)]">
      <div className={`project-visual project-preview-${project.preview}`}>

        {/* Number Badge */}
        <span className="project-number group-hover:bg-[#c85a4a]/10 group-hover:text-[#c85a4a] transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* ====================================================== */}
        {/* THE FIX: 'absolute inset-0' prevents the height from   */}
        {/* collapsing to zero. Now it will smoothly scale down!   */}
        {/* ====================================================== */}
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[0.94] origin-center">

          {project.preview === "odol" ? (
            <div className="preview-odol" aria-label="ODOL Truck Detection interface preview">
              <div className="preview-browser-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p>ODOL Truck Detector</p>
              <div className="preview-upload">
                <span aria-hidden="true" />
                <strong>Drag & drop image or browse</strong>
              </div>
              <div className="preview-primary-bar group-hover:bg-[#326ee6] transition-colors duration-500">Detect</div>
            </div>
          ) : null}

          {project.preview === "homeheal" ? (
            <div className="preview-homeheal" aria-label="HomeHeal landing page preview">
              <div className="preview-homeheal-nav">
                <strong>H</strong>
                <span>HomeHeal</span>
              </div>
              <div className="preview-homeheal-badge">Physical Therapy Platform</div>
              <p>
                Your Recovery,
                <span> Our Priority</span>
              </p>
              <div className="preview-homeheal-actions">
                <span className="group-hover:bg-[#008a67] transition-colors duration-500" />
                <span />
              </div>
            </div>
          ) : null}

          {project.preview === "cabin" ? (
            <div
              className="preview-cabin"
              aria-label="The Cabin gameplay preview"
              style={{ backgroundImage: `url(${project.image})` }}
            />
          ) : null}

          {project.preview === "generic" ? <div className="preview-generic" /> : null}
        </div>

        {/* Inner Highlight Ring - Appears on Hover */}
        <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[#c85a4a]/10 transition-colors duration-500 pointer-events-none z-10 rounded-[1.05rem]" />
      </div>

      {/* Lower Card Text Content */}
      <div className="project-copy transition-transform duration-500 group-hover:-translate-y-1">
        <p className="project-type">{project.type}</p>
        <h3 className="group-hover:text-[#c85a4a] transition-colors duration-300">{project.title}</h3>
        <p>{project.summary}</p>
        <p className="impact">{project.impact}</p>

        <div className="tag-list">
          {project.tech.map((tech) => (
            <span key={tech} className="group-hover:border-[#c85a4a]/30 group-hover:bg-[#c85a4a]/5 transition-colors duration-300">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          {project.demo ? (
            <a href={project.demo}>
              <ExternalLink size={16} aria-hidden="true" />
              Live demo
            </a>
          ) : null}
          <a href={project.repo}>
            <Code2 size={16} aria-hidden="true" />
            Source
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const activeSection = useActiveSection();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If we scroll down more than 50px, change the header background
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main id="top">
      <div className="site-shell">
        <div className="ambient-grid" aria-hidden="true" />
        <div className="aurora-glow" aria-hidden="true" />

        {/* Dynamic Header */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${isScrolled
            ? "py-3 bg-[#fbf8f1]/85 backdrop-blur-lg border-b border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
            : "py-6 bg-transparent"
            }`}
        >
          {/* Logo */}
          <a href="#top" aria-label="Back to top" className="flex items-center justify-center relative group">
            {/* Make sure this src perfectly matches the image name in your public folder! */}
            <img
              src="/profile/logo.jpg"
              alt="Logo"
              className="w-14 h-14 rounded-full object-cover border-2 border-[#e5dfd3] shadow-sm group-hover:border-[#c85a4a]/50 group-hover:scale-105 transition-all duration-300"
            />
          </a>

          {/* Navigation */}
          <nav aria-label="Primary navigation" className="hidden md:flex gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative text-base font-bold transition-colors py-1 ${isActive ? "text-[#c56f47]" : "text-[#53606f] hover:text-[#141414]"
                    }`}
                >
                  {item.label}

                  {/* Sliding Underline Animation */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#c56f47] rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </header>

        <section className="hero-section">
          <div className="hero-copy">
            <Reveal delay={0.1}>
              <p className="pill">
                <Sparkles size={15} aria-hidden="true" />
                Welcome to my portfolio
              </p>
              <h1>
                Building <span>Software </span>
                <br />
                That
                <br />
                Solves
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="hero-intro">
                I&apos;m <strong>Izhar Octafirlian Susilo</strong>, a Computer Science
                student and a <strong className="rotating-role inline-flex"><AnimatedRole /></strong>
                <br />

              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="social-row">
                <SocialLink href={links.github} label="GitHub">
                  <Github size={24} aria-hidden="true" />
                </SocialLink>
                <SocialLink href={links.linkedin} label="LinkedIn">
                  <Linkedin size={24} aria-hidden="true" />
                </SocialLink>
                <SocialLink href={links.email} label="Email">
                  <Mail size={24} aria-hidden="true" />
                </SocialLink>
              </div>

              <div className="cta-row">
                <ActionLink href="#contact" primary>
                  Let&apos;s Connect <Send size={18} aria-hidden="true" />
                </ActionLink>
                <ActionLink href={links.resume} download>
                  Get Resume <Download size={18} aria-hidden="true" />
                </ActionLink>
              </div>
            </Reveal>
          </div>

          <div className="hero-code">
            <Reveal delay={0.4}>
              <TiltWrapper>
                <CodeWindow />
              </TiltWrapper>
            </Reveal>
          </div>
        </section>

        <section id="about" className="about-section">
          {/* Left Side: Text and Stats */}
          <div className="about-copy">
            <Reveal>
              <div className="section-kicker">
                <UserRound size={20} aria-hidden="true" />
                Discovery
              </div>
              <h2>
                About <span>The Builder</span>
              </h2>
            </Reveal>

            {/* This is the text you accidentally overwrote! */}
            <Reveal delay={0.2}>
              <div className="about-card">
                <Sparkles className="about-spark" size={92} aria-hidden="true" />
                <p>
                  I&apos;m Izhar, a Computer Science student from BINUS University 🇮🇩
                  currently on an exchange program at Saxion University of Applied Sciences 🇳🇱,
                  where I am studying Creative Media and Game Technologies (CMGT).
                </p>
                <p>
                  currently exploring diverse areas of software development,
                  including game development, web applications, and machine learning.
                  Beyond coding, I am also a huge game enthusiast and a football fan.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="stats-row">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Side: The Interactive 3D Photo Card */}
          <Reveal delay={0.4}>
            {/* Replaced 'portrait-stack' class with explicit Tailwind to bypass the 420px CSS limit and make it bigger */}
            <div className="relative mx-auto w-full max-w-[520px] rotate-[2deg] hover:rotate-0 hover:-translate-y-2 transition-all duration-300">
              <TiltWrapper>
                {/* Parent container: NO overflow-hidden, so the badge can pop out of the top */}
                <div className="relative w-full aspect-[4/5] group">

                  {/* Top Location Badge (Positioned absolute at the top center edge) */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#fbf9f6] border border-[#e5dfd3] text-[#c85a4a] text-[12px] font-extrabold tracking-widest shadow-xl uppercase whitespace-nowrap">
                      <MapPin size={16} />
                      Enschede, Netherlands
                    </div>
                  </div>

                  {/* The Image Container (This gets the border, shadow, and overflow-hidden to keep the image inside) */}
                  <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-[#e5dfd3]/50">

                    {/* The Image Background */}
                    <div
                      className="absolute inset-0 bg-cover transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                      style={{
                        backgroundImage: "url('/profile/izhar.jpeg')",
                        backgroundPosition: "center 44%"
                      }}
                      role="img"
                      aria-label="Portrait of Izhar Octafirlian Susilo"
                    />

                    {/* Inner Gradient Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>

                </div>
              </TiltWrapper>
            </div>
          </Reveal>
        </section>

        <section id="experience" className="journey-section">
          <Reveal>
            <SectionTitle
              eyebrow="Professional Journey"
              title="Education and leadership"
              accent="in motion"
            >
              A focused path through CS foundations, international exchange, and
              campus organization work.
            </SectionTitle>
          </Reveal>

          <div className="relative max-w-5xl mx-auto mt-16 pb-12">
            {/* The Center Vertical Line */}
            <div className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#e5dfd3] md:-translate-x-1/2 z-0"></div>

            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <Reveal delay={0.2 + index * 0.2} key={item.title}>

                  {/* ========================================== */}
                  {/* DESKTOP LAYOUT (Hidden on Mobile)            */}
                  {/* ========================================== */}
                  <div className="hidden md:flex relative items-center justify-between w-full mb-12">

                    {/* Left Column */}
                    <div className="w-[45%] flex justify-end pr-8">
                      {isEven ? (
                        // Date Badge on the Left
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#e5dfd3] bg-[#fbf9f6] text-sm text-[#c85a4a] font-medium shadow-sm">
                          <Calendar size={14} />
                          {item.date}
                        </div>
                      ) : (
                        // Card on the Left
                        <div className="w-full bg-[#fbf9f6] border border-[#e5dfd3] p-8 rounded-2xl shadow-sm hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)] hover:border-[#c85a4a]/50 transition-all duration-300 ease-out text-left">
                          <h3 className="text-2xl font-bold text-[#222] mb-1">{item.title}</h3>
                          <div className="flex items-center gap-2 text-[#64745b] text-sm font-semibold mb-5">
                            <BriefcaseBusiness size={14} />
                            {item.subtitle}
                          </div>
                          <ul className="space-y-3">
                            {item.points.map((point) => (
                              <li key={point} className="flex items-start gap-3 text-gray-600 text-[15px] leading-relaxed">
                                <ChevronRight size={18} className="text-[#c85a4a] shrink-0 mt-[2px]" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Center Glowing Icon */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 bg-[#fbf9f6] border-2 border-[#e5dfd3] rounded-xl z-10 shadow-sm">
                      {index === 0 ? (
                        <GraduationCap size={20} className="text-[#c85a4a]" />
                      ) : index === 1 ? (
                        <BookOpen size={20} className="text-[#c85a4a]" />
                      ) : (
                        <BriefcaseBusiness size={20} className="text-[#c85a4a]" />
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="w-[45%] flex justify-start pl-8">
                      {isEven ? (
                        // Card on the Right
                        <div className="w-full bg-[#fbf9f6] border border-[#e5dfd3] p-8 rounded-2xl shadow-sm hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(20,20,20,0.08)] hover:border-[#c85a4a]/50 transition-all duration-300 ease-out text-left">
                          <h3 className="text-2xl font-bold text-[#222] mb-1">{item.title}</h3>
                          <div className="flex items-center gap-2 text-[#64745b] text-sm font-semibold mb-5">
                            <BriefcaseBusiness size={14} />
                            {item.subtitle}
                          </div>
                          <ul className="space-y-3">
                            {item.points.map((point) => (
                              <li key={point} className="flex items-start gap-3 text-gray-600 text-[15px] leading-relaxed">
                                <ChevronRight size={18} className="text-[#c85a4a] shrink-0 mt-[2px]" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        // Date Badge on the Right
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#e5dfd3] bg-[#fbf9f6] text-sm text-[#c85a4a] font-medium shadow-sm">
                          <Calendar size={14} />
                          {item.date}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ========================================== */}
                  {/* MOBILE LAYOUT (Hidden on Desktop)            */}
                  {/* ========================================== */}
                  <div className="md:hidden relative flex flex-col items-start w-full mb-10 pl-20 pr-4">

                    {/* Center Icon (Shifted to Left Line) */}
                    <div className="absolute left-[12px] top-6 flex items-center justify-center w-12 h-12 bg-[#fbf9f6] border-2 border-[#e5dfd3] rounded-xl z-10 shadow-sm">
                      {index === 0 ? (
                        <GraduationCap size={20} className="text-[#c85a4a]" />
                      ) : index === 1 ? (
                        <BookOpen size={20} className="text-[#c85a4a]" />
                      ) : (
                        <BriefcaseBusiness size={20} className="text-[#c85a4a]" />
                      )}
                    </div>

                    {/* Mobile Card */}
                    <div className="w-full bg-[#fbf9f6] border border-[#e5dfd3] p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(20,20,20,0.08)] hover:border-[#c85a4a]/50 transition-all duration-300 ease-out">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-[#e5dfd3] bg-white text-xs text-[#c85a4a] font-medium">
                        <Calendar size={12} />
                        {item.date}
                      </div>

                      <h3 className="text-xl font-bold text-[#222] mb-1">{item.title}</h3>
                      <div className="flex items-center gap-2 text-[#64745b] text-sm font-semibold mb-4">
                        <BriefcaseBusiness size={14} />
                        {item.subtitle}
                      </div>
                      <ul className="space-y-3">
                        {item.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
                            <ChevronRight size={16} className="text-[#c85a4a] shrink-0 mt-[2px]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="skills" className="skills-section py-20 overflow-hidden">
          <Reveal>
            <SectionTitle eyebrow="Inventory" title="The" accent="Tech Stack" />
          </Reveal>

          {/* Full-width container with fade masks on the edges */}
          {/* FIX: Changed mt-12 to mt-4 and added py-8 so the hover shadow doesn't get clipped by the mask! */}
          <div
            className="relative w-[100vw] left-1/2 -translate-x-1/2 mt-4 flex flex-col gap-6 py-8"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
            }}
          >

            {/* ROW 1: Moving Left */}
            {/* Replaced motion.div with standard div and our custom CSS classes */}
            <div className="flex gap-6 w-max animate-marquee-left pause-on-hover cursor-pointer">
              {[...skillTiles, ...skillTiles, ...skillTiles].map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <article
                    key={`row-${index}`}
                    className="flex items-center gap-4 bg-[#fbf9f6] border border-[#e5dfd3] px-6 py-4 rounded-2xl w-[280px] shrink-0 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_15px_30px_-5px_rgba(200,90,74,0.2)] hover:border-[#c85a4a]/60 z-10 hover:z-20 relative"
                  >
                    <Icon size={28} className="text-[#c85a4a] group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                    <div>
                      <h3 className="text-[#222] font-bold text-lg leading-tight">{skill.name}</h3>
                      <p className="text-[#64745b] text-[11px] font-bold uppercase tracking-widest mt-1">{skill.label}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ROW 2: Moving Right */}
            {/* Replaced motion.div with standard div and our custom CSS classes */}
            <div className="flex gap-6 w-max animate-marquee-right pause-on-hover cursor-pointer">
              {[...skillTiles].reverse().concat([...skillTiles].reverse(), [...skillTiles].reverse()).map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <article
                    key={`row-${index}`}
                    className="flex items-center gap-4 bg-[#fbf9f6] border border-[#e5dfd3] px-6 py-4 rounded-2xl w-[280px] shrink-0 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_15px_30px_-5px_rgba(200,90,74,0.2)] hover:border-[#c85a4a]/60 z-10 hover:z-20 relative"
                  >
                    <Icon size={28} className="text-[#c85a4a] group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                    <div>
                      <h3 className="text-[#222] font-bold text-lg leading-tight">{skill.name}</h3>
                      <p className="text-[#64745b] text-[11px] font-bold uppercase tracking-widest mt-1">{skill.label}</p>
                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        </section>

        <section id="projects" className="projects-section">
          <SectionTitle
            eyebrow="Projects Showcase"
            title="Featured"
            accent="Creations"
          >
            Games, web apps, and AI projects built from start to finish.
          </SectionTitle>

          <div className="projects-grid">
            {featuredProjects
              .filter((project) => visibleProjectTitles.has(project.title))
              .map((project, index) => (
                <ProjectCard project={project} index={index} key={project.title} />
              ))}
          </div>

          <a className="archive-button" href={links.github}>
            Explore More in Github <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </section>

        <section id="contact" className="contact-section">
          <SectionTitle eyebrow="Communication" title="Let's" accent="Connect" />
          <div className="contact-grid">
            <div className="contact-panel contact-message reveal-up">
              <div className="contact-logo" aria-hidden="true">
                <Mail size={28} />
              </div>
              <p className="contact-kicker">Available for internship conversations</p>
              <h3>Let&apos;s build something useful.</h3>
              <p>
                Open to roles and collaborations across software, AI systems,
                web applications, and interactive technology.
              </p>
              <div className="contact-actions">
                <ActionLink href={links.email} primary>
                  Email Me <Mail size={18} aria-hidden="true" />
                </ActionLink>
                <ActionLink href={links.resume} download>
                  Resume <Download size={18} aria-hidden="true" />
                </ActionLink>
              </div>
            </div>

            <div className="contact-panel contact-directory reveal-up">
              <h3>Direct Contact</h3>
              <div className="contact-methods">
                <a className="contact-method" href={links.email}>
                  <Mail size={22} aria-hidden="true" />
                  <span>
                    <small>Email</small>
                    <strong>Izharsusilo12@gmail.com</strong>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <a className="contact-method" href={links.github}>
                  <Github size={22} aria-hidden="true" />
                  <span>
                    <small>GitHub</small>
                    <strong>github.com/kaiichin</strong>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <a className="contact-method" href={links.linkedin}>
                  <Linkedin size={22} aria-hidden="true" />
                  <span>
                    <small>LinkedIn</small>
                    <strong>Izhar Octafirlian Susilo</strong>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <div className="contact-method">
                  <MapPin size={22} aria-hidden="true" />
                  <span>
                    <small>Location</small>
                    <strong>South Tangerang, Indonesia</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div>
            {/* Replaced 'IS' text block with your image */}
            <a href="#top" aria-label="Back to top" className="inline-block mb-4 group">
              <img
                src="/profile/logo.jpg"
                alt="Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#e5dfd3] shadow-sm group-hover:border-[#c85a4a]/50 group-hover:scale-105 transition-all duration-300"
              />
            </a>
            <p>
              © 2026 Izhar Octafirlian Susilo
            </p>
          </div>
          <div>
            <h3>Navigation</h3>
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <h3>Connect</h3>
            <a href={links.email}>Izharsusilo12@gmail.com</a>
            <div className="footer-icons">
              <SocialLink href={links.github} label="GitHub">
                <Github size={20} aria-hidden="true" />
              </SocialLink>
              <SocialLink href={links.linkedin} label="LinkedIn">
                <Linkedin size={20} aria-hidden="true" />
              </SocialLink>
            </div>
          </div>
        </footer>

        <a className="to-top" href="#top" aria-label="Back to top">
          <ArrowUp size={18} aria-hidden="true" />
        </a>
      </div>
    </main>
  );
}
