"use client";

import { useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { ui } from "../data/portfolio";
import "./Folder.css";

type FolderProps = {
  color?: string;
  size?: number;
  items?: ReactNode[];
  expandedContent?: ReactNode;
  className?: string;
};

type PaperOffset = { x: number; y: number };

function darkenColor(hex: string, percent: number) {
  const value = hex.replace("#", "");
  const color = value.length === 3 ? value.split("").map((part) => part + part).join("") : value;
  const number = Number.parseInt(color.slice(0, 6), 16);
  const channel = (shift: number) => Math.max(0, Math.floor(((number >> shift) & 255) * (1 - percent)));
  return `#${[channel(16), channel(8), channel(0)].map((part) => part.toString(16).padStart(2, "0")).join("")}`;
}

export default function Folder({
  color = "#d97757",
  size = 1,
  items = [],
  expandedContent,
  className = "",
}: FolderProps) {
  const papers = [...items.slice(0, 3), null, null, null].slice(0, 3);
  const emptyOffsets = () => Array.from({ length: 3 }, () => ({ x: 0, y: 0 }));
  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<PaperOffset[]>(emptyOffsets);

  const toggleFolder = () => {
    setOpen((wasOpen) => {
      if (wasOpen) setPaperOffsets(emptyOffsets());
      return !wasOpen;
    });
  };

  const movePaper = (event: MouseEvent<HTMLDivElement>, index: number) => {
    if (!open) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const next = {
      x: (event.clientX - (rect.left + rect.width / 2)) * 0.15,
      y: (event.clientY - (rect.top + rect.height / 2)) * 0.15,
    };
    setPaperOffsets((current) => current.map((offset, itemIndex) => itemIndex === index ? next : offset));
  };

  const folderStyle = {
    "--folder-color": color,
    "--folder-back-color": darkenColor(color, 0.12),
  } as CSSProperties;

  return (
    <div className={`rb-folder-shell${open ? " is-open" : ""} ${className}`}>
      <div className="rb-folder-expanded" aria-hidden={!open}>
        {expandedContent}
      </div>

      <div className="rb-folder-scale" style={{ transform: `scale(${size})` }}>
        <div
          className={`rb-folder${open ? " is-open" : ""}`}
          style={folderStyle}
          onClick={toggleFolder}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggleFolder();
            }
          }}
          tabIndex={0}
          role="button"
          aria-expanded={open}
          aria-label={open ? ui.about.closeFolder : ui.about.openFolder}
        >
          <div className="rb-folder-back">
            {papers.map((item, index) => item && (
              <div
                className={`rb-folder-paper paper-${index + 1}`}
                key={index}
                onMouseMove={(event) => movePaper(event, index)}
                onMouseLeave={() => setPaperOffsets((current) => current.map((offset, itemIndex) => itemIndex === index ? { x: 0, y: 0 } : offset))}
                style={{
                  "--paper-x": `${paperOffsets[index].x}px`,
                  "--paper-y": `${paperOffsets[index].y}px`,
                } as CSSProperties}
              >
                {item}
              </div>
            ))}
            <div className="rb-folder-front" />
            <div className="rb-folder-front right" />
          </div>
        </div>
      </div>
    </div>
  );
}
