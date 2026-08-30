"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { profile } from "../../data/portfolio";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <section className="content-section contact-page">
        <h2>Contact</h2>

        <div className="page-accent-line" />

        <div className="contact-page-grid">
          <article className="contact-page-card">
            <Mail size={29} />

            <h3>Email</h3>

            <p>
              Email is the best way to contact me about internships,
              collaborations, or project opportunities.
            </p>

            <div className="email-copy-row">
              <span>{profile.email}</span>

              <button onClick={copyEmail}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </article>

          <article className="contact-page-card">
            <MapPin size={29} />

            <h3>Location</h3>

            <p>
              Currently based in {profile.location}. Open to remote and
              international opportunities.
            </p>

            <span className="contact-card-detail">{profile.location}</span>
          </article>

          <article className="contact-page-card contact-social-card">
            <h3>Find My Work</h3>

            <p>
              You can see my projects, code, and professional profile through
              these platforms.
            </p>

            <div className="contact-social-row">
              <a
                href="https://github.com/kaiichin"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>

              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
          </article>
        </div>
    </section>
  );
}
