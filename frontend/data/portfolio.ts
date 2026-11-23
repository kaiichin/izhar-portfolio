// ============================================================
//  DATA PORTFOLIO — EDIT SEMUA TEKS WEBSITE DI SINI
//  File ini satu-satunya tempat untuk ganti teks, link, dan daftar isi.
//  - Mau ganti nama / email / link? Edit bagian PROFILE
//  - Mau tambah project? Tambah 1 blok di PROJECTS
//  - Mau tambah sertifikat / riwayat? Tambah 1 blok di CERTIFICATES / JOURNEY
//  - Tidak perlu buka file lain untuk ganti teks.
// ============================================================

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string; // kosongkan ("") kalau belum ada gambar
  link?: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  href: string | null; // null = tidak ada tombol "View certificate"
};

export type JourneyItem = {
  date: string;
  title: string;
  subtitle: string;
  points: string[];
};

// ---------------- PROFILE ----------------
// Tampil di sidebar kiri + halaman contact.
export const profile = {
  name: "Izhar Octafirlian Susilo",
  role: "System & Business Analyst",
  currentRole: "System Analyst Intern at RPX",
  location: "Indonesia",
  email: "izharsusilo12@gmail.com",
  availability: "Open to Future SA/BA Roles",
  github: "https://github.com/kaiichin",
  linkedin: "https://www.linkedin.com/in/izhar-octafirlian-susilo",
  whatsapp: "https://wa.me/6281524102005",
  resumePath: "/resume/Izhar_Octafirlian_Susilo.pdf",
  photoPath: "/profile/izhar.jpeg",
  logoPath: "/profile/logo.jpg",
};

// ---------------- UI TEXT ----------------
// Shared labels, page headings, and status messages live here too.
export const ui = {
  navigation: {
    about: "About Me",
    projects: "Projects",
    journey: "Journey",
    certificates: "Certificates",
    main: "Main navigation",
  },
  shared: {
    darkMode: "Dark Mode",
    contactInformation: "Contact information",
    downloadCv: "Download CV",
    currentRole: "Current Role",
    location: "Location",
    availability: "Status",
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
  },
  about: {
    greetings: ["Hello, welcome.", "System & Business Analyst."],
    focus: "Primary Focus",
    details: "Highlights & Languages",
    highlights: "Highlights",
    languages: "Languages",
    techStack: "Analyst & Tech Toolkit",
    folderHint: "Open toolkit folder",
    openFolder: "Open toolkit folder",
    closeFolder: "Close toolkit folder",
    strengths: "How I Work",
  },
  projects: {
    title: "My Projects",
    view: "View Project ↗",
    missingLink: "Link added soon",
  },
  journey: {
    title: "My Journey",
    intro:
      "My path so far across industry internship experience, international exchange, student organizations, and Computer Science studies.",
    futureTitle: "What comes next?",
    futureText:
      "Wrapping up my System Analyst internship at RPX and finishing my final-year thesis at BINUS—while growing in System & Business Analysis and exploring future career and Master's opportunities.",
  },
  certificates: {
    title: "My Certificates",
    heading: "Credentials & Achievements",
    view: "View certificate",
    note: "More certificates will be added as I continue learning and building new skills.",
  },
  contact: {
    title: "Contact",
    emailDescription:
      "Email is the best way to contact me about internships, collaborations, or project opportunities.",
    locationDescription: `Currently based in ${profile.location}. Open to remote and international opportunities.`,
    socialTitle: "Find My Work",
    socialDescription:
      "You can see my projects, code, and professional profile through these platforms.",
    copy: "Copy",
    copied: "Copied",
    copying: "Copying…",
    copyError:
      "Could not copy automatically. Select the email address above and copy it manually.",
  },
  metadata: {
    title: `${profile.name} | System & Business Analyst`,
    description:
      "System Analyst Intern at RPX Logistics and Computer Science student focused on business workflows, API blueprints, SQL data checks, and integration testing.",
    socialDescription:
      "System Analyst & Business Analyst portfolio covering logistics workflows, FSD blueprints, SQL data checking, and API testing.",
    logoAlt: `${profile.name} logo`,
  },
};

// ---------------- ABOUT ----------------
// Urutan icon diatur di app/page.tsx (focusIcons, skillIcons, strengthIcons)
// jadi di sini cukup tulis teks saja.

export const aboutIntro = [
  "I'm Izhar, a Computer Science student at BINUS University and currently a System Analyst Intern at RPX Logistics. I contributed to RPX's Bea Cukai (CEISA 4.0) customs integration—working on blueprints, SQL data checks, API testing, and user meetings.",
  "Before that, I completed an exchange at Saxion University in the Netherlands building Unity games, and built web, AI, and internal system projects at BINUS. That mix helps me bridge business needs and developers cleanly. Outside of work, I'm a big fan of games and football.",
];

export const focusAreas = [
  {
    title: "System Analyst Internship",
    text: "Growing in my role at RPX Logistics through real projects, specs, data checks, and team meetings.",
  },
  {
    title: "Finishing My Thesis",
    text: "Working toward completing my final-year Computer Science thesis at BINUS University.",
  },
  {
    title: "Career & Skill Growth",
    text: "Sharpening System & Business Analyst skills through courses, real practice, and preparing for my next role.",
  },
  {
    title: "Master's Study Abroad",
    text: "Exploring and preparing for a future Master's degree abroad to keep growing internationally.",
  },
];

export const highlights = [
  "Contributed to RPX's Bea Cukai (CEISA 4.0) integration—joining user meetings, drafting blueprints, checking SQL data, and testing APIs",
  "Completed an exchange at Saxion University in the Netherlands and built a 3D Unity game for a Dutch client",
  "Active in HIMTI BINUS across event committees (HIMTI Care, HISHOT, SESVENT) and earned Best Mentor",
  "Currently finishing my final-year Computer Science thesis at BINUS University",
];

export const languages = [
  { name: "English", level: "Upper-Intermediate · IELTS 6.5", width: "65%" },
  { name: "Indonesian", level: "Native", width: "100%" },
];

export const skills = [
  { name: "SQL", category: "Data & Queries" },
  { name: "Postman", category: "API Testing" },
  { name: "Git & GitHub", category: "Version Control" },
  { name: "Excalidraw & Draw.io", category: "Diagrams" },
  { name: "Excel & Sheets", category: "Data Checks" },
  { name: "Figma", category: "UI Mockups" },
];

export const strengths = [
  {
    title: "Use AI Smartly",
    text: "I use AI tools to learn faster, organize notes, and speed up repetitive tasks—while always checking the real facts myself.",
  },
  {
    title: "Ask & Listen First",
    text: "I ask questions early and listen closely to users, mentors, and developers so everyone is aligned before building.",
  },
  {
    title: "Test, Then Confirm",
    text: "I investigate problems with the data I have first, form a clear assumption, and confirm it with my mentor or team.",
  },
];

// ---------------- PROJECTS ----------------
// Tambah project baru: copy 1 blok { ... }, ganti isinya.
export const projects: Project[] = [
  {
    title: "The Amber Shade",
    description:
      "A folklore-inspired Unity horror game developed with an international team for a Dutch client, where players navigate a wheat maze while evading the Korengeest.",
    tags: ["Unity", "3D", "Horror", "Folklore"],
    image: "",
    link: "https://netherox.itch.io/the-amber-shade",
  },
  {
    title: "ODOL Truck Detection",
    description:
      "A two-stage computer vision web application that detects trucks with YOLOv8 and classifies them as NORMAL or ODOL with MobileNetV2 through FastAPI.",
    tags: ["YOLOv8", "MobileNetV2", "FastAPI", "Docker", "Hugging Face Spaces"],
    image: "",
    link: "https://github.com/kaiichin/ODOL-Truck-Detection",
  },
  {
    title: "Zero-DCE Low-Light Enhancement",
    description:
      "A group computer vision application that enhances low-light images using Zero-DCE and TensorFlow/Keras through an interactive Streamlit interface.",
    tags: ["Zero-DCE", "TensorFlow/Keras", "Python", "Streamlit"],
    image: "",
    link: "https://github.com/kaiichin/Zero-DCE-Low-Light-Enhancement",
  },
  {
    title: "NLP Music Genre Classifier",
    description:
      "A group NLP research project that classifies six music genres from 60,000 song lyrics using TF-IDF, NMF topic features, and Random Forest.",
    tags: ["Python", "NLP", "TF-IDF", "NMF", "Random Forest"],
    image: "",
    link: "https://github.com/kaiichin/Classify-Music-Genre-NMF",
  },
];

// ---------------- JOURNEY ----------------
export const journeyItems: JourneyItem[] = [
  {
    date: "2023 – 2027",
    title: "BINUS University",
    subtitle: "Computer Science – Global Class",
    points: [
      "Studying Computer Science and building hands-on projects across web apps, computer vision, NLP, and internal systems.",
      "Collaborated on university coursework, data analysis, and software team projects.",
      "Currently finishing my final-year thesis while completing my System Analyst internship.",
    ],
  },
  {
    date: "2024 – 2025",
    title: "HIMTI BINUS University",
    subtitle: "Organization & Committee Experience",
    points: [
      "Active in HIMTI Care and served on event committees for HISHOT (Sponsorship) and SESVENT (Equipment & Security).",
      "Worked with teams on event planning, partner outreach, and on-site logistics.",
      "Earned Best Mentor while guiding fellow students and coordinating across teams.",
    ],
  },
  {
    date: "2026",
    title: "Saxion University of Applied Sciences",
    subtitle: "Exchange Student – Creative Media & Game Technologies",
    points: [
      "Completed an international exchange program in the Netherlands.",
      "Built a 3D Unity game with an international team for a Dutch client alongside VR and interactive projects.",
      "Strengthened cross-cultural communication and teamwork in an international environment.",
    ],
  },
  {
    date: "Sep 2026 – Present",
    title: "RPX Logistics",
    subtitle: "System Analyst Intern",
    points: [
      "Contributed to RPX's Bea Cukai (CEISA 4.0) customs integration—helping write an API blueprint (FSD), map fields, and test endpoints in Postman.",
      "Checked SQL outputs against real warehouse exports to investigate duplicate or missing rows, and helped optimize a live query.",
      "Joined engineering meetings, airport warehouse observations, and Ops user checks, plus logged clear bug tickets in Odoo and sketched Figma UI mockups.",
    ],
  },
];

// ---------------- CERTIFICATES ----------------
export const certificates: Certificate[] = [
  {
    title: "Alibaba Cloud Certified Associate (ACA) – Cloud Engineer",
    issuer: "Alibaba Cloud",
    year: "2025–2027",
    description:
      "Validates foundational knowledge of cloud computing, storage, networking, databases, security, and deployment.",
    href: "/certificates/alibaba-cloud-aca.pdf",
  },
  {
    title: "IELTS Academic",
    issuer: "British Council",
    year: "2025",
    description:
      "Achieved Overall Band 6.5 at CEFR B2, including Band 7.0 in Reading and Speaking.",
    href: null,
  },
  {
    title: "HIMTI Care – Activist",
    issuer: "HIMTI BINUS University",
    year: "2024–2025",
    description:
      "Recognized for contributing as an activist in HIMTI Care during the 2024/2025 term.",
    href: "/certificates/himti-care-2024-2025.pdf",
  },
  {
    title: "HISHOT 2024 – Sponsorship Staff",
    issuer: "HIMTI BINUS University",
    year: "2024",
    description:
      "Recognized for service and dedication as Staff of the Sponsorship Division for HISHOT 2024.",
    href: "/certificates/hishot-2024.pdf",
  },
  {
    title: "SESVENT 2024 – Equipment & Security Staff",
    issuer: "HIMTI BINUS University",
    year: "2024",
    description:
      "Served in the Equipment and Security Division for HIMTI SESVENT JKT–BDG 2024.",
    href: "/certificates/sesvent-2024.pdf",
  },
];
