import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const JourneyMap = () => {
    // Defines the scrollable height of the section. 
    // The user scrolls through this height to drive the car around the track.
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Use direct scroll progress to ensure the car stays perfectly in sync with the scroll
    // and doesn't lag behind when the section ends.
    // Removed useSpring to prevent physics lag which caused the car to not finish before unsticking.
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const carProgress = useTransform(pathLength, [0, 1], ["0%", "100%"]);

    // A closed loop circuit path
    const pathd = "M 50 100 C 50 100 50 50 100 50 L 500 50 C 550 50 550 100 550 150 C 550 200 500 250 450 300 L 200 350 C 150 370 50 350 50 250 Z";

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-neutral-950 w-full z-0">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-4xl px-4 md:px-0 aspect-[3/2] flex items-center justify-center">

                    {/* The Track SVG */}
                    <svg
                        viewBox="0 0 600 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    >
                        {/* Track Outline (Outer Border) */}
                        <path
                            d={pathd}
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="20"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-sm"
                        />

                        {/* Filled Inner Track (The Road) */}
                        <path
                            d={pathd}
                            stroke="#1a1a1a"
                            strokeWidth="14"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Track Center Line (Dashed) */}
                        <path
                            d={pathd}
                            stroke="rgba(255, 255, 255, 0.2)"
                            strokeWidth="2"
                            strokeDasharray="10 10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Progress Line (Blue Glow) */}
                        <motion.path
                            d={pathd}
                            stroke="#3b82f6"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                pathLength: pathLength,
                                opacity: useTransform(pathLength, [0, 0.05], [0, 1])
                            }}
                        />
                    </svg>

                    {/* The Car */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    >
                        <svg viewBox="0 0 600 400" className="w-full h-full">
                            {/* Empty viewBox used for alignment guidance if needed */}
                        </svg>

                        {/* Car Container - Absolute overlay matching the SVG size */}
                        <div className="absolute inset-0 w-full h-full">
                            <motion.div
                                className="absolute w-12 h-12 z-20 flex items-center justify-center text-3xl"
                                style={{
                                    // CSS Motion Path is the most robust way to follow a complex path
                                    offsetPath: `path('${pathd}')`,
                                    offsetDistance: carProgress,
                                    // Rotate the car to follow the path
                                    offsetRotate: "auto 180deg",
                                }}
                            >
                                <span className="transform -rotate-90 filter drop-shadow-lg">🏎️</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Milestones - Positioned absolutely based on approximate percentages of the viewBox */}
                    {/* Top Left Start */}
                    <MilestoneCard
                        top="0%" left="0%"
                        year="Start" title="The Launch"
                        desc="Ignition sequence start."
                    />

                    {/* Top Straight */}
                    <MilestoneCard
                        top="10%" left="50%"
                        year="2024" title="First Commit"
                        desc="Laying the foundation."
                        align="center"
                    />

                    {/* Top Right Curve */}
                    <MilestoneCard
                        top="25%" right="0%"
                        year="Feb 2024" title="Expansion"
                        desc="Scaling up."
                        align="right"
                    />

                    {/* Bottom Loop Area */}
                    <MilestoneCard
                        bottom="15%" left="40%"
                        year="Oct 2024" title="Community"
                        desc="Growing together."
                    />

                    {/* End Loop */}
                    <MilestoneCard
                        bottom="30%" left="0%"
                        year="2025" title="Future"
                        desc="The next lap."
                        align="right"
                    />

                </div>
            </div>
        </div>
    );
};

// Simple card component
const MilestoneCard = ({ top, left, right, bottom, year, title, desc, align = "left" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className={`absolute flex flex-col p-4 md:min-w-[180px] bg-neutral-900/60 backdrop-blur-md rounded-xl border border-white/10 z-10
                ${align === 'right' ? 'items-end text-right' : align === 'center' ? 'items-center text-center' : 'items-start text-left'}
            `}
            style={{ top, left, right, bottom }}
        >
            <span className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-1">{year}</span>
            <h3 className="text-white font-zentry text-lg leading-none mb-1">{title}</h3>
            <p className="text-neutral-400 text-xs font-circular-web">{desc}</p>
        </motion.div>
    )
}

export default JourneyMap;
