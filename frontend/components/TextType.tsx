// Efek ketikan (typing) untuk judul — teks jalan seperti diketik.
// Contoh: <TextType as="h1" text={["Halo.", "Tentang saya."]} />

"use client";

import { useEffect, useRef, useState } from "react";
import "./TextType.css";

type TextTypeProps = {
  text: string | string[];
  as?: "div" | "h1";
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  initialDelay?: number;
  className?: string;
  showCursor?: boolean;
  cursorCharacter?: string;
};

export default function TextType({
  text,
  as: Component = "div",
  typingSpeed = 75,
  deletingSpeed = 45,
  pauseDuration = 1100,
  initialDelay = 150,
  className = "",
  showCursor = true,
  cursorCharacter = "|",
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // Kursor kedip pakai CSS (gantiin gsap biar 1 lib animasi saja)
  useEffect(() => {
    if (!showCursor) return;
    const timer = setInterval(() => {
      setCursorVisible((visible) => !visible);
    }, 500);
    return () => clearInterval(timer);
  }, [showCursor]);

  useEffect(() => {
    const texts = Array.isArray(text) ? text : [text];
    let textIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = texts[textIndex];

      if (!deleting) {
        charIndex += 1;
        setDisplayedText(current.slice(0, charIndex));

        if (charIndex === current.length) {
          deleting = true;
          timer = setTimeout(type, pauseDuration);
          return;
        }
      } else {
        charIndex -= 1;
        setDisplayedText(current.slice(0, charIndex));

        if (charIndex === 0) {
          deleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }

      timer = setTimeout(type, deleting ? deletingSpeed : typingSpeed);
    };

    timer = setTimeout(type, initialDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [deletingSpeed, initialDelay, pauseDuration, text, typingSpeed]);

  return (
    <Component className={`text-type ${className}`}>
      <span>{displayedText}</span>
      {showCursor && (
        <span className="text-type__cursor" style={{ opacity: cursorVisible ? 1 : 0 }}>
          {cursorCharacter}
        </span>
      )}
    </Component>
  );
}
