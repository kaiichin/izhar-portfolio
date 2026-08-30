"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
    "Game Developer",
    "Web Developer",
    "AI/ML Builder",
    "Pro Valorant Player",
];

export default function AnimatedRole() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((current) => (current + 1) % roles.length);
        }, 3000); // 3 seconds gives the user time to read the longer titles

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="relative inline-block text-red-500 z-10">
            {/* Notice we removed mode="wait" so they crossfade beautifully */}
            <AnimatePresence>
                <motion.span
                    key={index}
                    className="inline-block whitespace-nowrap"
                    // Starts blurred and slightly below
                    initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                    // Snaps into sharp focus
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    // THE SECRET: Becomes absolute ONLY when exiting so it doesn't push the new word
                    exit={{
                        opacity: 0,
                        y: -15,
                        filter: "blur(8px)",
                        position: "absolute",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 15,
                        mass: 0.9,
                    }}
                >
                    {roles[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}