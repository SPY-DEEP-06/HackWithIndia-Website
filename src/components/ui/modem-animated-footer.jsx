import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    NotepadTextDashed,
    Twitter,
    Linkedin,
    Github,
    Mail,
} from "lucide-react";
import { cn } from "../../lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Footer = ({
    brandName = "YourBrand",
    brandDescription = "Your description here",
    socialLinks = [],
    navLinks = [],
    creatorName,
    creatorUrl,
    className,
}) => {
    const footerRef = useRef(null);
    const textRef = useRef(null);
    const contentRef = useRef(null);
    const location = useLocation();
    const isTeamPage = location.pathname === '/team';

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Text Animation
            gsap.fromTo(textRef.current,
                { y: 100 }, // Start slightly lower (reduced from 300 to prevent "too much scroll down")
                {
                    y: -50, // Move slightly up
                    ease: "none", // Linear movement for parallax
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top bottom", // When footer top enters viewport
                        end: "bottom bottom", // When footer bottom hits viewport bottom (End of page)
                        scrub: true,
                    }
                }
            );



        }, footerRef);

        return () => ctx.revert();
    }, [location.pathname]);

    return (
        <section ref={footerRef} className={cn("relative w-full mt-0 overflow-hidden bg-black text-white", className)}>
            {/* Smooth Page Transition Gradient (White to Black) - Only on Team Page */}
            {isTeamPage && (
                <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-zinc-50 to-transparent z-10 pointer-events-none" />
            )}

            <footer className="relative w-full flex flex-col justify-between py-10 px-10">

                {/* Large background text (Parallax) */}
                <div
                    ref={textRef}
                    className="absolute top-10 left-1/2 -translate-x-1/2 font-zentry font-black tracking-tighter text-center w-full whitespace-nowrap opacity-30 mix-blend-difference pointer-events-none select-none z-20"
                    style={{
                        fontSize: 'clamp(1rem, 10vw, 10rem)', // Reduced min to 1rem to allow shrinking on mobile
                        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    UPSKILL AND RISE
                </div>

                <div ref={contentRef} className="max-w-7xl mx-auto w-full relative z-30 flex flex-col items-center justify-center h-full">
                    {/* Brand Header */}
                    <div className="flex flex-col items-center mb-6">
                        <img src="/img/logo.png" alt={brandName} className="w-48 h-auto mb-4 opacity-80 hover:opacity-100 transition-opacity duration-500" />
                        <h2 className="sr-only">
                            {brandName}
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl text-center max-w-2xl font-robert leading-relaxed">
                            {brandDescription}
                        </p>
                    </div>

                    {/* Social Icons (Creative Hover) */}
                    {socialLinks.length > 0 && (
                        <div className="flex gap-6 mb-8">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:border-white transition-all duration-500 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <div className="relative z-10 text-white group-hover:text-black transition-colors duration-500">
                                        {React.cloneElement(link.icon, { size: 24 })}
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Nav Links */}
                    {navLinks.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-8 mb-8">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    to={link.href}
                                    className="text-white/60 hover:text-white uppercase tracking-widest text-sm font-bold transition-all duration-300 hover:tracking-[0.2em]"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Footer Bottom */}
                    <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
                        <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
                        <p className="mt-2 text-center md:mt-0">Forged with ⚡ and Code by the Tech Team</p>
                    </div>
                </div>

                {/* Bottom shadow/Glow */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
            </footer>
        </section>
    );
};
