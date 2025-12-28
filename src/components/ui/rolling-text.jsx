import React, { useState, useEffect, useRef, startTransition } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Vertical Text Rolling Animation
 * Adapted from Framer
 */
export default function RollingText({
    text = "ROLLING",
    duplicateCount = 4, // Reduced default for performance
    rollDuration = 1.5,
    staggerDelay = 0.1,
    blurIntensity = 4,
    autoPlay = true,
    backgroundColor = "transparent",
    textColor = "#FFFFFF",
    font,
    animationPattern = "sequential",
    style
}) {
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });
    const isStatic = false;

    useEffect(() => {
        if (autoPlay && isInView && !isStatic) {
            const timer = setTimeout(() => {
                startTransition(() => setIsAnimating(true));
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [autoPlay, isInView, isStatic]);

    const handleReplay = () => {
        startTransition(() => {
            setIsAnimating(false);
            setTimeout(() => {
                startTransition(() => setIsAnimating(true));
            }, 50);
        });
    };

    const characters = text.split("");

    return (
        <div
            ref={containerRef}
            style={{
                ...style,
                position: "relative",
                backgroundColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                cursor: "pointer",
                userSelect: "none"
            }}
            onClick={isStatic ? undefined : handleReplay}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.05em",
                    ...font
                }}
            >
                {characters.map((char, index) => (
                    <CharacterColumn
                        key={`${char}-${index}`}
                        character={char}
                        duplicateCount={duplicateCount}
                        rollDuration={rollDuration}
                        delay={index * staggerDelay}
                        blurIntensity={blurIntensity}
                        isAnimating={isAnimating}
                        textColor={textColor}
                        font={font}
                        isStatic={isStatic}
                        animationPattern={animationPattern}
                        characterIndex={index}
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
    textColor,
    font,
    isStatic,
    animationPattern,
    characterIndex
}) {
    // Create array of duplicate characters
    const duplicates = Array(duplicateCount).fill(character);

    // Calculate the height needed to show one character
    // Assuming 1em line height if not specified, but better to enforce
    const lineHeightVal = font?.lineHeight || "1em";
    // We need a number for calculation. 
    // If it's pure text, we might rely on the DOM measurement, but Framer code assumed px or em.
    // Let's simplify: We will wrap strictly in divs of known height if possible, 
    // but here we just follow the transform logic.
    // The original code calculated pixel height from fontSize "60px".
    // We'll try to use % or relative units if possible, but framer motion likes pixels for exact calculation.
    // Let's assume the parent font size is set via class or style.
    // The original code: const characterHeight = fontSize * lineHeight;
    // We don't have exact font size access if it's via CSS classes.
    // However, the animation logic relies on `initialY = -totalScrollDistance`.
    // Let's try to use % logic: translateY(-100% * (count - 1))?
    // Actually, `y` in framer motion works with %.

    // Logic: The column has `duplicateCount` items.
    // We want to show the LAST item finally.
    // So we slide UP by (duplicateCount - 1) * 100% of one character height?
    // No, standard flow is:
    // [Char]
    // [Char]
    // [Char] <-- Visible finally

    // If we duplicate 3 times:
    // 0: Char
    // 1: Char
    // 2: Char

    // We want to see index 0 initially? 
    // Framer code: 
    // totalScrollDistance = characterHeight * (duplicateCount - 1);
    // initialY = shouldRollFromBottom ? -totalScrollDistance : 0;
    // finalY = shouldRollFromBottom ? 0 : -totalScrollDistance;

    // If rolling from bottom (standard slot machine):
    // We start at Y = -totalDistance (showing the bottom-most clone?) and move to 0 (showing top-most?)
    // Let's verify.
    // If we translate Y by -distance, we move the element UP.
    // So if we start at -distance, we are looking at the BOTTOM of the strip.
    // If we move to 0, we look at the TOP.

    // Let's use % for robustness against font sizes!
    // One character is 1 unit.
    // We have `duplicateCount` units.
    // HEIGHT of the strip is `duplicateCount * 100%` of the visible window?
    // No, the parent masks it to 1 character height.
    // The inner div is height `auto`.
    // We need to move it by `(duplicateCount - 1) * 100%` relative to the character height.

    const isOddPosition = characterIndex % 2 === 0;
    const shouldRollFromBottom = animationPattern === "alternating" && !isOddPosition;

    // Using percentages based on Character Height
    const scrollPercent = (duplicateCount - 1) * 100;

    const initialY = shouldRollFromBottom ? `-${scrollPercent}%` : "0%";
    const finalY = shouldRollFromBottom ? "0%" : `-${scrollPercent}%`;

    return (
        <div
            style={{
                position: "relative",
                height: "1em", // Force 1em height for the mask
                lineHeight: "1em",
                overflow: "hidden",
                display: "flex", // Keep it inline-block-ish
                flexDirection: "column", // Though the inner div is column
                verticalAlign: "middle"
            }}
        >
            <motion.div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
                initial={{ y: initialY }}
                animate={isAnimating ? { y: finalY } : { y: initialY }}
                transition={{
                    duration: rollDuration,
                    delay: delay,
                    ease: [0.25, 0.46, 0.45, 0.94], // Custom ease
                    type: "tween"
                }}
            >
                {duplicates.map((char, index) => (
                    <motion.span
                        key={index}
                        style={{
                            color: textColor,
                            height: "1em", // Each character takes 1em height
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            lineHeight: "1em",
                            ...font
                        }}
                        initial={{ filter: "blur(0px)" }}
                        animate={
                            isAnimating
                                ? {
                                    filter: [
                                        "blur(0px)",
                                        `blur(${blurIntensity}px)`,
                                        `blur(${blurIntensity}px)`,
                                        "blur(0px)"
                                    ]
                                }
                                : { filter: "blur(0px)" }
                        }
                        transition={{
                            duration: rollDuration,
                            delay: delay,
                            times: [0, 0.2, 0.8, 1],
                            ease: "easeOut"
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
