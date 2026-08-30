import type { HTMLAttributes, ReactNode } from "react";
import "./StarBorder.css";

type StarBorderProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "section";
  color?: string;
  speed?: string;
  thickness?: number;
  children: ReactNode;
};

export default function StarBorder({
  as: Component = "div",
  className = "",
  color = "white",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps) {
  return (
    <Component
      className={`star-border ${className}`}
      style={{ padding: thickness, ...style }}
      {...rest}
    >
      <span
        className="star-border-glow star-border-glow-bottom"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <span
        className="star-border-glow star-border-glow-top"
        style={{ background: `radial-gradient(circle, ${color}, transparent 10%)`, animationDuration: speed }}
      />
      <div className="star-border-content">{children}</div>
    </Component>
  );
}
