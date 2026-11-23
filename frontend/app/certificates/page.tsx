// Halaman Certificates — daftar sertifikat diedit di data/portfolio.ts (CERTIFICATES).

"use client";

import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { certificates, ui } from "../../data/portfolio";

export default function CertificatesPage() {
  return (
    <section className="content-section certificates-page">
      <h1 className="page-title">{ui.certificates.title}</h1>

      <div className="page-accent-line" />

      <div className="certificate-heading">
        <GraduationCap size={24} />
        <h3>{ui.certificates.heading}</h3>
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
                  {ui.certificates.view}
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
          {ui.certificates.note}
        </p>
      </motion.div>
    </section>
  );
}
