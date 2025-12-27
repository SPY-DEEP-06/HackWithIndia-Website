import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import feature1 from "../assets/files/feature-1.mp4";
import feature2 from "../assets/files/feature-2.mp4";
import feature3 from "../assets/files/feature-3.mp4";
import feature4 from "../assets/files/feature-4.mp4";

gsap.registerPlugin(ScrollTrigger);

const items = [
    {
        title: "Workshops",
        description: "Hands-on mastery of AI, Blockchain, and modern Web Dev.",
        src: feature1,
        type: "video",
    },
    {
        title: "Hackathons",
        description: "24-hour coding sprints to solve real-world challenges.",
        src: feature2,
        type: "video",
    },
    {
        title: "Meetups",
        description: "Network with industry leaders and like-minded peers.",
        src: feature3,
        type: "video",
    },
    {
        title: "Projects",
        description: "Build open-source solutions that matter.",
        src: feature4,
        type: "video",
    },
];

const ExpandableFeatures = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            }
        });

        tl.from(".feature-header", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        })
            .fromTo(".feature-card",
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power2.out"
                },
                "-=0.5"
            );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-black py-24 px-4 md:px-10 -mt-2 relative z-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-12 px-5 feature-header">
                    <p className="font-circular-web text-lg text-blue-50">
                        Explore the Ecosystem
                    </p>
                    <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                        A nexus of innovation, collaboration, and growth.
                    </p>
                </div>

                {/* Vertical Expansion Container */}
                <div className="flex flex-col gap-2 h-[80vh] w-full items-center justify-center">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`feature-card relative w-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 ease-in-out ${activeIndex === idx ? "flex-grow-[4]" : "flex-grow-[1]"
                                }`}
                            onMouseEnter={() => setActiveIndex(idx)}
                            onClick={() => setActiveIndex(idx)}
                        >
                            {/* Background Asset */}
                            <video
                                src={item.src}
                                loop
                                muted
                                autoPlay
                                playsInline
                                className="absolute inset-0 size-full object-cover transition-transform duration-700 hover:scale-105"
                            />

                            {/* Overlay Gradient */}
                            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${activeIndex === idx ? "opacity-0" : "opacity-60"}`} />

                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                                <h3 className={`font-zentry text-4xl uppercase text-blue-50 transition-all duration-500 ${activeIndex === idx ? "translate-y-0" : "translate-y-2"}`}>
                                    {item.title}
                                </h3>

                                <div className={`overflow-hidden transition-all duration-500 ${activeIndex === idx ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                                    <p className="font-general text-sm text-blue-100 md:text-base">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Icon Indicator */}
                            {activeIndex !== idx && (
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50">
                                    <TiLocationArrow className="text-2xl rotate-45" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpandableFeatures;
