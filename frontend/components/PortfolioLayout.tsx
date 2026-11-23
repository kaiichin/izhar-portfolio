// Layout utama: logo + menu + tombol dark mode + sidebar kontak.
// Semua halaman otomatis dibungkus layout ini (lihat app/layout.tsx).

"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  BriefcaseBusiness,
  Building2,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { profile, ui } from "../data/portfolio";
import Lanyard from "./InteractiveLanyard";
import { NavigationDock, type NavPage } from "./Navbar";
import StarBorder from "./StarBorder";

// URL → nama halaman aktif (untuk highlight menu)
const pageNames: Record<string, NavPage> = {
  "/": "About",
  "/projects": "Projects",
  "/journey": "Journey",
  "/certificates": "Certificates",
  "/contact": "Contact",
};

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const activePage = pageNames[pathname] ?? "About";
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const isDark = savedTheme === "dark";
    setDarkMode(isDark);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, []);

  function changeTheme(checked: boolean) {
    setDarkMode(checked);
    document.documentElement.dataset.theme = checked ? "dark" : "light";
    localStorage.setItem("portfolio-theme", checked ? "dark" : "light");
  }

  return (
    <main className="portfolio-page">
      <Link href="/" className="site-logo" aria-label={ui.navigation.about}>
        <Image
          src={profile.logoPath}
          alt={profile.name}
          width={42}
          height={42}
          priority
        />
      </Link>

      <nav className="standalone-nav-dock" aria-label={ui.navigation.main}>
        <NavigationDock activePage={activePage} />
      </nav>

      <label className="theme-switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(event) => changeTheme(event.target.checked)}
        />
        <span className="theme-switch-track" aria-hidden="true">
          <span className="theme-switch-thumb" />
        </span>
        <span>{ui.shared.darkMode}</span>
      </label>

      <Lanyard
        position={[0, 0, 30]}
        gravity={[0, -40, 0]}
        imageFit="contain"
        lanyardWidth={1}
      />

      <aside className="portfolio-sidebar">
        <StarBorder
          as="section"
          className="sidebar-contact-card"
          color="#d97757"
          speed="7s"
          aria-label={ui.shared.contactInformation}
        >
          <div className="sidebar-contact-content">
            <div className="sidebar-contact-heading">
              <h2>{profile.name}</h2>
              <a
                className="sidebar-cv-button"
                href={profile.resumePath}
                download
              >
                <Download aria-hidden="true" />
                {ui.shared.downloadCv}
              </a>
            </div>

            <div className="sidebar-contact-row">
              <Building2 aria-hidden="true" />
              <div>
                <span>{ui.shared.currentRole}</span>
                <p>{profile.currentRole}</p>
              </div>
            </div>

            <div className="sidebar-contact-row">
              <MapPin aria-hidden="true" />
              <div>
                <span>{ui.shared.location}</span>
                <p>{profile.location}</p>
              </div>
            </div>

            <div className="sidebar-contact-row">
              <BriefcaseBusiness aria-hidden="true" />
              <div>
                <span>{ui.shared.availability}</span>
                <p>{profile.availability}</p>
              </div>
            </div>

            <div className="sidebar-social-links">
              <a
                href={`mailto:${profile.email}`}
                aria-label={ui.shared.email}
                title={ui.shared.email}
              >
                <Mail />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label={ui.shared.github}
                title={ui.shared.github}
              >
                <Github />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={ui.shared.linkedin}
                title={ui.shared.linkedin}
              >
                <Linkedin />
              </a>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label={ui.shared.whatsapp}
                title={ui.shared.whatsapp}
              >
                <MessageCircle />
              </a>
            </div>
          </div>
        </StarBorder>
      </aside>

      <div className="portfolio-content">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
