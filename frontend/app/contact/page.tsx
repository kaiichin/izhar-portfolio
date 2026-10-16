// Halaman Contact — email / link diedit di data/portfolio.ts (PROFILE).

"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { profile, ui } from "../../data/portfolio";

export default function ContactPage() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const emailRef = useRef<HTMLSpanElement>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (resetTimer.current !== null) clearTimeout(resetTimer.current);
    };
  }, []);

  async function copyEmail() {
    if (resetTimer.current !== null) clearTimeout(resetTimer.current);
    setCopyStatus("copying");

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(profile.email);
      if (!mounted.current) return;
      setCopyStatus("copied");
      resetTimer.current = setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      if (!mounted.current) return;
      setCopyStatus("error");
      if (emailRef.current) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(emailRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }

  return (
    <section className="content-section contact-page">
      <h2>{ui.contact.title}</h2>

      <div className="page-accent-line" />

      <div className="contact-page-grid">
        <article className="contact-page-card">
          <Mail size={29} />

          <h3>{ui.shared.email}</h3>

          <p>
            {ui.contact.emailDescription}
          </p>

          <div className="email-copy-row">
            <span ref={emailRef}>{profile.email}</span>

            <button type="button" onClick={copyEmail} disabled={copyStatus === "copying"}>
              {copyStatus === "copied" ? <Check size={15} /> : <Copy size={15} />}
              <span aria-live="polite">
                {copyStatus === "copied" ? ui.contact.copied : copyStatus === "copying" ? ui.contact.copying : ui.contact.copy}
              </span>
            </button>
          </div>
          <p className="copy-feedback" role="status">
            {copyStatus === "error" ? ui.contact.copyError : ""}
          </p>
        </article>

        <article className="contact-page-card">
          <MapPin size={29} />

          <h3>{ui.shared.location}</h3>

          <p>
            {ui.contact.locationDescription}
          </p>

          <span className="contact-card-detail">{profile.location}</span>
        </article>

        <article className="contact-page-card contact-social-card">
          <h3>{ui.contact.socialTitle}</h3>

          <p>
            {ui.contact.socialDescription}
          </p>

          <div className="contact-social-row">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label={ui.shared.github}
            >
              <Github size={24} />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={ui.shared.linkedin}
            >
              <Linkedin size={24} />
            </a>

            <a href={`mailto:${profile.email}`} aria-label={ui.shared.email}>
              <Mail size={24} />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
