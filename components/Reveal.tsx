"use client";

import { motion } from "framer-motion";

export default function Reveal({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    return (
        <motion.div
            // Starts transparent and pushed down 40px
            initial={{ opacity: 0, y: 40 }}
            // Animates to full opacity and original position when it enters the screen
            whileInView={{ opacity: 1, y: 0 }}
            // "once: true" ensures it only animates the first time you scroll to it
            // "amount: 0.2" means it waits until 20% of the element is visible before triggering
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.7,
                delay: delay,
                ease: [0.25, 0.25, 0, 1] // This creates a buttery smooth, slowing-down effect
            }}
        >
            {children}
        </motion.div>
    );
}