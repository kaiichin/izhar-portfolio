// Halaman Journey — daftar riwayat diedit di data/portfolio.ts (JOURNEY).

"use client";

import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Globe2,
  GraduationCap,
  Users,
} from "lucide-react";
import { journeyItems, ui } from "../../data/portfolio";

// Urutan icon harus sama dengan urutan daftar di data/portfolio.ts
const journeyIcons = [GraduationCap, Users, Globe2, Building2];

export default function JourneyPage() {
  return (
    <section className="content-section journey-page">
      <h1 className="page-title">{ui.journey.title}</h1>

      <div className="page-accent-line" />

      <p className="journey-intro">
        {ui.journey.intro}
      </p>

      <div className="journey-timeline">
        {journeyItems.map((item, index) => {
          const Icon = journeyIcons[index] ?? GraduationCap;

          return (
            <motion.article
              key={item.title}
              className={`journey-entry ${
                index % 2 === 0 ? "journey-entry-right" : "journey-entry-left"
              }`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <div className="journey-date-pill">
                <CalendarDays size={13} />
                <span>{item.date}</span>
              </div>

              <div className="journey-marker">
                <Icon size={18} />
              </div>

              <div className="journey-card">
                <h3>{item.title}</h3>
                <p className="journey-subtitle">{item.subtitle}</p>

                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        className="journey-future-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <BriefcaseBusiness size={24} />
        <div>
          <h3>{ui.journey.futureTitle}</h3>
          <p>
            {ui.journey.futureText}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
