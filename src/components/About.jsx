import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import aboutImg from "../assets/img/about.webp";
import swordmanImg from "../assets/img/swordman.webp";
import entranceImg from "../assets/img/entrance.webp";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#about",
                start: "center bottom",
                end: "center center",
                toggleActions: "play none none reverse",
            },
        });

        clipAnimation.from(".about-subtext", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        })
            .from(".about-title", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.5");

        // Parallax mechanism for images: They move as you scroll past
        gsap.to(".about-image-left", {
            y: -50, // Move up slightly
            scrollTrigger: {
                trigger: "#about",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5, // Slower/smoother scrub for weight
            }
        });

        gsap.to(".about-image-right", {
            y: -80, // Move up more (different depth)
            scrollTrigger: {
                trigger: "#about",
                start: "top bottom",
                end: "bottom top",
                scrub: 2, // Even smoother
            }
        });

    }, { scope: containerRef });

    return (
        <div id="about" className="min-h-screen w-screen relative z-0 bg-black text-blue-50 flex items-center justify-center overflow-hidden" ref={containerRef}>

            <div className="relative z-10 flex flex-col items-center gap-5 text-center px-4">
                <p className="font-general text-sm uppercase md:text-[10px] about-subtext tracking-widest">
                    JOIN HACKWITHINDIA
                </p>

                <div className="about-title max-w-7xl mx-auto mt-20">
                    <h1 className="font-zentry text-6xl md:text-[8rem] leading-[0.8] uppercase text-blue-50">
                        Let's b<b>u</b>ild the <br /> new era of <br /> technology t<b>o</b>gether
                    </h1>
                </div>
            </div>

            {/* Floating Images */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60vh] w-1/3 opacity-80 about-image-left hidden md:block pointer-events-none">
                <img src={entranceImg} alt="Entrance" className="w-full h-full object-contain object-left" />
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[60vh] w-1/3 opacity-80 about-image-right hidden md:block pointer-events-none">
                <img src={swordmanImg} alt="Swordman" className="w-full h-full object-contain object-right" />
            </div>
        </div>
    );
};

export default About;
