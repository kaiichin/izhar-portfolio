"use client";

import { gsap } from "gsap";
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
  const cursorRef = useRef<HTMLSpanElement>(null);

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

  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;
    const animation = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
    return () => {
      animation.kill();
    };
  }, [showCursor]);

  return (
    <Component className={`text-type ${className}`}>
      <span>{displayedText}</span>
      {showCursor && (
        <span ref={cursorRef} className="text-type__cursor">
          {cursorCharacter}
        </span>
      )}
    </Component>
  );
}
