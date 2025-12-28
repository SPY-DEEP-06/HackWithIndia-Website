import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export const FlickerText = ({ text, className = "" }) => {
    const [flicker, setFlicker] = useState(1);

    useEffect(() => {
        const flickerInterval = setInterval(() => {
            // Random flicker opacity between 0.8 and 1
            setFlicker(Math.random() * (1 - 0.8) + 0.8);

            // Occasional glitch (low opacity)
            if (Math.random() < 0.05) {
                setFlicker(0.3);
            }
        }, 50);

        return () => clearInterval(flickerInterval);
    }, []);

    const characters = useMemo(() => text.split(""), [text]);

    return (
        <div className={`relative inline-block ${className}`}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: flicker,
                        textShadow: Math.random() < 0.1 ? "0 0 8px rgba(255,255,255,0.8)" : "none",
                    }}
                    transition={{ duration: 0.1 }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </div>
    );
};
