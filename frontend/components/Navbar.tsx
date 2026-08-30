"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Award,
  FolderKanban,
  Route,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import "./Navbar.css";

export type NavPage = "About" | "Projects" | "Journey" | "Certificates" | "Contact";

type NavbarProps = {
  activePage: NavPage;
};

const items: { label: NavPage; title: string; href: string; icon: LucideIcon }[] = [
  { label: "About", title: "About Me", href: "/", icon: UserRound },
  { label: "Projects", title: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Journey", title: "Journey", href: "/journey", icon: Route },
  { label: "Certificates", title: "Certificates", href: "/certificates", icon: Award },
];

type AnimatedNavItemProps = (typeof items)[number] & {
  active: boolean;
  mouseX: ReturnType<typeof useMotionValue<number>>;
};

function AnimatedNavItem({
  label,
  title,
  href,
  icon: Icon,
  active,
  mouseX,
}: AnimatedNavItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const distance = useTransform(mouseX, (value) => {
    const rect = ref.current?.getBoundingClientRect();
    return value - (rect?.left ?? 0) - (rect?.width ?? 42) / 2;
  });
  const targetSize = useTransform(distance, [-120, 0, 120], [42, 58, 42]);
  const size = useSpring(targetSize, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      className={`navbar-icon-item${active ? " active" : ""}`}
      style={{ width: size, height: size }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={href} aria-label={title} aria-current={active ? "page" : undefined}>
        <Icon aria-hidden="true" />
      </Link>

      <AnimatePresence>
        {hovered && (
          <motion.span
            className="navbar-icon-label"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function NavigationDock({ activePage }: NavbarProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className="navbar-icon-dock"
      onMouseMove={(event) => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {items.map((item) => (
        <AnimatedNavItem
          key={item.href}
          {...item}
          active={activePage === item.label}
          mouseX={mouseX}
        />
      ))}
    </div>
  );
}

export default function Navbar({ activePage }: NavbarProps) {
  return (
    <nav className="portfolio-navbar" aria-label="Main navigation">
      <Link
        href="/"
        className={`navbar-avatar${activePage === "About" ? " active" : ""}`}
        aria-label="About"
        aria-current={activePage === "About" ? "page" : undefined}
      >
        <Image
          src="/profile/logo.jpg"
          alt="Izhar Octafirlian Susilo"
          width={42}
          height={42}
          priority
        />
      </Link>

      <NavigationDock activePage={activePage} />
    </nav>
  );
}
