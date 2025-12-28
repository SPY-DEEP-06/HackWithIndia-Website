import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export const FlickerText = ({ text, className = "" }) => {
    const characters = useMemo(() => text.split(""), [text]);

    return (
        <div className={`relative inline-block ${className}`}>
            {characters.map((char, index) => (
                <FlickeringChar key={index} char={char} />
            ))}
        </div>
    );
};

const FlickeringChar = ({ char }) => {
    const [isFlickering, setIsFlickering] = useState(false);

    useEffect(() => {
        const triggerFlicker = () => {
            setIsFlickering(true);
            setTimeout(() => {
                setIsFlickering(false);
            }, Math.random() * 200 + 50); // Short burst 50-250ms
        };

        // Random interval loop
        const loop = () => {
            const nextTime = Math.random() * 2500 + 500; // Random time between 0.5s and 3s
            setTimeout(() => {
                if (Math.random() < 0.3) { // 30% chance to flicker
                    triggerFlicker();
                }
                loop();
            }, nextTime);
        };

        loop();

        return () => { }; // Cleanup not strictly needed for the self-perpetuating loop but good constraint if we used interval
    }, []);

    return (
        <motion.span
            animate={{
                opacity: isFlickering ? [1, 0.4, 0.1, 1, 0.2, 1] : 1,
                filter: isFlickering
                    ? ["drop-shadow(0 0 8px rgba(34,211,238,0.8))", "none", "drop-shadow(0 0 12px rgba(34,211,238,1))", "none"]
                    : "drop-shadow(0 0 8px rgba(34,211,238,0.5))", // Steady glow
                color: isFlickering
                    ? ["#22d3ee", "#4b5563", "#22d3ee", "#1f2937", "#22d3ee"]
                    : "#22d3ee", // Cyan-400 equivalent
            }}
            transition={{
                duration: isFlickering ? 0.4 : 0.2,
            }}
            className="inline-block"
            style={{
                textShadow: "0 0 10px rgba(34,211,238,0.5)"
            }}
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
};
