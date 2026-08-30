"use client";

import { motion } from "motion/react";
import {
  BriefcaseBusiness,
  CalendarDays,
  Globe2,
  GraduationCap,
  Users,
} from "lucide-react";

const journeyItems = [
  {
    icon: GraduationCap,
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
    icon: Globe2,
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
    icon: Users,
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

export default function JourneyPage() {
  return (
    <section className="content-section journey-page">
        <h2>My Journey</h2>

        <div className="page-accent-line" />

        <p className="journey-intro">
          My path so far through education, international exchange, and
          organization experience.
        </p>

        <div className="journey-timeline">
          {journeyItems.map((item, index) => {
            const Icon = item.icon;

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
            <h3>What comes next?</h3>
            <p>
              I am continuing to build stronger projects and prepare for
              internship opportunities in software development.
            </p>
          </div>
        </motion.div>
    </section>
  );
}
