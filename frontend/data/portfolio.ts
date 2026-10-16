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
  role: "Software Developer",
  location: "Indonesia",
  email: "izharsusilo12@gmail.com",
  availability: "Looking for Internship",
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
    location: "Location",
    availability: "Availability",
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
  },
  about: {
    greetings: ["Hello, welcome.", "A little about me."],
    focus: "Primary Focus",
    details: "Highlights & Languages",
    highlights: "Highlights",
    languages: "Languages",
    techStack: "Tech Stack",
    folderHint: "Open skill folder",
    openFolder: "Open skills folder",
    closeFolder: "Close skills folder",
    strengths: "Strengths",
  },
  projects: {
    title: "My Projects",
    view: "View Project ↗",
    missingLink: "Link added soon",
  },
  journey: {
    title: "My Journey",
    intro: "My path so far through education, international exchange, and organization experience.",
    futureTitle: "What comes next?",
    futureText: "I am continuing to build stronger projects and prepare for internship opportunities in software development.",
  },
  certificates: {
    title: "My Certificates",
    heading: "Credentials & Achievements",
    view: "View certificate",
    note: "More certificates will be added as I continue learning and building new skills.",
  },
  contact: {
    title: "Contact",
    emailDescription: "Email is the best way to contact me about internships, collaborations, or project opportunities.",
    locationDescription: `Currently based in ${profile.location}. Open to remote and international opportunities.`,
    socialTitle: "Find My Work",
    socialDescription: "You can see my projects, code, and professional profile through these platforms.",
    copy: "Copy",
    copied: "Copied",
    copying: "Copying…",
    copyError: "Could not copy automatically. Select the email address above and copy it manually.",
  },
  metadata: {
    title: `${profile.name} | CS Portfolio`,
    description: "Computer Science student building practical software across AI, web applications, and interactive systems.",
    socialDescription: "Portfolio for internship opportunities across AI, web applications, and interactive systems.",
    logoAlt: `${profile.name} logo`,
  },
};

// ---------------- ABOUT ----------------
// Urutan icon diatur di app/page.tsx (focusIcons, skillIcons, strengthIcons)
// jadi di sini cukup tulis teks saja.

export const aboutIntro = [
  "I'm Izhar, a Computer Science student at BINUS University. Recently completed an exchange program at Saxion University of Applied Sciences, studied Creative Media and Game Technologies (CMGT).",
  "Currently looking for a software development internship where I can contribute to real projects and continue building my skills. I'm interested in AI Engineer, Web Programming and Game Engineer. Outside of coding, I'm a big fan of games and football.",
];

export const focusAreas = [
  {
    title: "Web Development",
    text: "Creating clean, responsive websites with modern frontend and backend technologies",
  },
  {
    title: "Machine Learning & Computer Vision",
    text: "Training and evaluating models using data",
  },
  {
    title: "Game Engineering",
    text: "Exploring gameplay programming, game mechanics, and interactive systems using Unity",
  },
  {
    title: "AI & Automation",
    text: "Learning how AI tools and automation can improve useful products",
  },
];

export const highlights = [
  "Built and deployed computer vision applications",
  "Developed web platforms with FastAPI and Laravel",
  "Built a Unity game with an international team",
  "Led student events and earned Best Mentor at BINUS",
];

export const languages = [
  { name: "English", level: "Fluent", width: "85%" },
  { name: "Indonesian", level: "Native", width: "100%" },
];

export const skills = [
  { name: "React + Next.js", category: "Web" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Interface" },
  { name: "Unity + C#", category: "Interactive" },
  { name: "Python", category: "Language" },
  { name: "SQL", category: "Database" },
  { name: "JavaScript", category: "Language" },
  { name: "HTML + CSS", category: "Frontend" },
  { name: "Git", category: "Versioning" },
  { name: "GitHub", category: "Versioning" },
  { name: "Docker", category: "Deployment" },
  { name: "AI Tools", category: "Automation" },
];

export const strengths = [
  {
    title: "Adaptability",
    text: "I adapt quickly to different technologies, projects, and environments.",
  },
  {
    title: "Teamwork",
    text: "I collaborate effectively across academic, international, and organization teams.",
  },
  {
    title: "Problem Solving",
    text: "I break unfamiliar problems into smaller steps and test practical solutions.",
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
      "Studying Computer Science with interest in web development, AI, and game technology.",
      "Building practical projects to improve technical and problem-solving skills.",
      "Developing experience through university coursework and team projects.",
    ],
  },
  {
    date: "2026",
    title: "Saxion University of Applied Sciences",
    subtitle: "Exchange Student – Creative Media & Game Technologies",
    points: [
      "Joined an international exchange experience in the Netherlands.",
      "Studied creative technology, game development, and interactive systems.",
      "Gained experience adapting to a new academic and international environment.",
    ],
  },
  {
    date: "2024 – 2025",
    title: "HIMTI BINUS University",
    subtitle: "Organization and Committee Experience",
    points: [
      "Contributed to student organization activities and university events.",
      "Worked with teams on event preparation, coordination, and participant support.",
      "Improved communication, teamwork, and leadership experience.",
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
