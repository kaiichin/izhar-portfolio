"use client";

import React, { useState, useRef, MouseEvent } from "react";

export default function TiltWrapper({ children }: { children: React.ReactNode }) {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();

        // Get mouse position relative to the card's dimensions
        const width = rect.width;
        const height = rect.height;

        // Calculate mouse position from the center of the card
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        // Convert mouse position to rotation degrees
        // The "20" represents the max rotation intensity. Adjust this if you want more or less tilt!
        const rotateX = (mouseY / (height / 2)) * -20;
        const rotateY = (mouseX / (width / 2)) * 20;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        // Reset the card to flat when the mouse leaves
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: "1000px", // This gives it the 3D depth
                display: "inline-block",
                width: "100%",
            }}
        >
            <div
                style={{
                    transform: isHovering
                        ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                        : "rotateX(0deg) rotateY(0deg)",
                    // Snappy response when moving, slow smooth transition when mouse leaves
                    transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-in-out",
                    willChange: "transform",
                }}
            >
                {children}
            </div>
        </div>
    );
}