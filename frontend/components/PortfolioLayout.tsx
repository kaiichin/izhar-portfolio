"use client";

import { AnimatePresence, motion } from "motion/react";
import { BriefcaseBusiness, Download, Github, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { profile } from "../data/portfolio";
import Lanyard from "./InteractiveLanyard";
import { NavigationDock, type NavPage } from "./Navbar";
import StarBorder from "./StarBorder";

type PortfolioLayoutProps = {
  children: ReactNode;
};

const pageNames: Record<string, NavPage> = {
  "/": "About",
  "/projects": "Projects",
  "/journey": "Journey",
  "/certificates": "Certificates",
  "/contact": "Contact",
};

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
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
      <Link href="/" className="site-logo" aria-label="About">
        <Image
          src="/profile/logo.jpg"
          alt="Izhar Octafirlian Susilo"
          width={42}
          height={42}
          priority
        />
      </Link>

      <nav className="standalone-nav-dock" aria-label="Main navigation">
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
        <span>Dark Mode</span>
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
          aria-label="Contact information"
        >
          <div className="sidebar-contact-content">
          <div className="sidebar-contact-heading">
            <h2>{profile.name}</h2>
            <a
              className="sidebar-cv-button"
              href="/resume/Izhar_Octafirlian_Susilo.pdf"
              download
            >
              <Download aria-hidden="true" />
              Download CV
            </a>
          </div>

          <div className="sidebar-contact-row">
            <MapPin aria-hidden="true" />
            <div>
              <span>Location</span>
              <p>{profile.location}</p>
            </div>
          </div>

          <div className="sidebar-contact-row">
            <BriefcaseBusiness aria-hidden="true" />
            <div>
              <span>Availability</span>
              <p>{profile.availability}</p>
            </div>
          </div>

          <div className="sidebar-social-links">
            <a href={`mailto:${profile.email}`} aria-label="Email" title="Email">
              <Mail />
            </a>
            <a href="https://github.com/kaiichin" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/izhar-octafirlian-susilo"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Linkedin />
            </a>
            <a
              href="https://wa.me/6281524102005"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
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
