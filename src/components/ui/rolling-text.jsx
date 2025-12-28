import React, { useState, useEffect, useRef, startTransition } from "react";
import { motion, useInView } from "framer-motion";

export default function RollingText({
    text = "ROLLING",
    duplicateCount = 4, // Enough to loop visually
    rollDuration = 1.5,
    staggerDelay = 0.05,
    blurIntensity = 2,
    autoPlay = true,
    textColor = "#000000",
    font = {},
    animationPattern = "sequential",
}) {
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.5 });

    useEffect(() => {
        if (autoPlay && isInView) {
            // Slight delay to ensure layout is ready
            const timer = setTimeout(() => {
                startTransition(() => setIsAnimating(true));
            }, 100);
            return () => clearTimeout(timer);
        } else {
            // Optional: reset when out of view
            setIsAnimating(false);
        }
    }, [autoPlay, isInView]);

    const characters = text.split("");

    return (
        <div
            ref={containerRef}
            style={{
                ...font,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                color: textColor,
            }}
            className="cursor-default select-none"
        >
            <div style={{ display: "flex", gap: "0.05em" }}>
                {characters.map((char, index) => (
                    <CharacterColumn
                        key={`${char}-${index}`}
                        character={char}
                        duplicateCount={duplicateCount}
                        rollDuration={rollDuration}
                        delay={index * staggerDelay}
                        blurIntensity={blurIntensity}
                        isAnimating={isAnimating}
                        animationPattern={animationPattern}
                        characterIndex={index}
                        font={font} // Passed for context if needed
                    />
                ))}
            </div>
        </div>
    );
}

function CharacterColumn({
    character,
    duplicateCount,
    rollDuration,
    delay,
    blurIntensity,
    isAnimating,
    animationPattern,
    characterIndex,
}) {
    const duplicates = Array(duplicateCount).fill(character);

    // Determines direction
    const isOddPosition = characterIndex % 2 === 0;
    const shouldRollFromBottom = animationPattern === "alternating" && !isOddPosition;

    // Use em for translation to match line-height exactly
    // 0em shows the first character.
    // -(duplicateCount - 1)em shows the last character.
    const maxScroll = duplicateCount - 1;
    const initialY = shouldRollFromBottom ? `-${maxScroll}em` : "0em";
    const finalY = shouldRollFromBottom ? "0em" : `-${maxScroll}em`;

    return (
        <div
            style={{
                position: "relative",
                height: "1em", // Use em so it matches font size automatically
                lineHeight: "1em",
                overflow: "hidden",
                display: "flex",
                alignItems: "flex-start", // Stack from top
                justifyContent: "center",
                width: character === " " ? "0.3em" : "auto", // Handle space width
            }}
        >
            <motion.div
                initial={{ y: initialY }}
                animate={{ y: isAnimating ? finalY : initialY }}
                transition={{
                    duration: rollDuration,
                    delay: delay,
                    ease: [0.25, 0.46, 0.45, 0.94], // Custom ease for "throw" effect
                }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {duplicates.map((char, index) => (
                    <motion.span
                        key={index}
                        style={{
                            height: "1em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        initial={{ filter: "blur(0px)" }}
                        animate={{
                            filter: isAnimating
                                ? ["blur(0px)", `blur(${blurIntensity}px)`, `blur(${blurIntensity}px)`, "blur(0px)"]
                                : "blur(0px)",
                        }}
                        transition={{
                            duration: rollDuration,
                            delay: delay,
                            times: [0, 0.2, 0.8, 1], // Blur peak in middle of movement
                            ease: "easeOut",
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
