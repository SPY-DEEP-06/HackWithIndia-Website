import { useRef } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import ExpandableFeatures from "../components/ExpandableFeatures";

import Contact from "../components/Contact";
import { Globe } from "../components/ui/globe";

import GalleryPreview from "../components/GalleryPreview";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%", // Start animation when top of section hits 60% of viewport
                end: "center center",
                scrub: 1, // Smooth interaction
            }
        });

        tl.from(".animate-text", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        })
            .from(".animate-globe", {
                scale: 0.5,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out"
            }, "-=0.8");

    }, { scope: contentRef });

    return (
        <div className="bg-black w-full overflow-x-hidden">
            <Hero />

            <section ref={sectionRef} className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden py-20 -mt-2">
                <div ref={contentRef} className="w-full flex flex-col items-center z-10">
                    <div className="mx-auto max-w-6xl px-4 md:px-10 mb-10 text-center">
                        <p className="font-circular-web text-lg text-blue-50 animate-text">The Talent Nexus</p>
                        <h2 className="font-circular-web text-3xl md:text-4xl text-blue-50 opacity-50 mt-4 leading-relaxed max-w-4xl mx-auto animate-text">
                            Connecting talents, unlocking skills, and giving a platform to those who are able but lack the chance. We are here for you to upskill and rise with us.
                        </h2>
                    </div>

                    <div className="relative w-full max-w-lg aspect-square animate-globe">
                        <Globe className="scale-[1.2]" />
                    </div>
                </div>
            </section>

            <ExpandableFeatures />

            <GalleryPreview />

            <Contact />
        </div>
    );
};

export default Home;
