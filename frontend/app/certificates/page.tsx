"use client";

import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

const certificates = [
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

export default function CertificatesPage() {
  return (
    <section className="content-section certificates-page">
        <h2>My Certificates</h2>

        <div className="page-accent-line" />

        <div className="certificate-heading">
          <GraduationCap size={24} />
          <h3>Credentials & Achievements</h3>
        </div>

        <div className="certificate-timeline">
          {certificates.map((certificate, index) => (
            <motion.article
              key={certificate.title}
              className="certificate-item"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="certificate-dot" />

              <div className="certificate-content">
                <p className="certificate-year">{certificate.year}</p>

                <h3>{certificate.title}</h3>
                <p className="certificate-issuer">{certificate.issuer}</p>

                <p className="certificate-description">
                  {certificate.description}
                </p>

                {certificate.href ? (
                  <a
                    className="certificate-link"
                    href={certificate.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={13} />
                    View certificate
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="certificate-note"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Award size={20} />
          <p>
            More certificates will be added as I continue learning and building
            new skills.
          </p>
        </motion.div>
    </section>
  );
}
