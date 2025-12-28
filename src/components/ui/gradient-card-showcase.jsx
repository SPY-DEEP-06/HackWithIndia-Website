import React, { useRef } from 'react';
import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { useInView } from "framer-motion";

const GradientCard = ({ name, role, desc, img, gradientFrom, gradientTo, github, linkedin, instagram }) => {
    const ref = useRef(null);
    const [isTouch, setIsTouch] = React.useState(false);

    React.useEffect(() => {
        const checkTouch = () => {
            setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    // Trigger earlier (at 20% visibility) for smoother feeling on scroll
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });

    // Only apply active state automatically on touch devices
    const isActive = isTouch && isInView;

    return (
        <div
            ref={ref}
            className={`group relative w-[300px] h-[380px] m-[10px] transition-all duration-700 ease-out will-change-transform ${isActive ? "active" : ""}`}
        >
            {/* Skewed gradient panels */}
            <span
                className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-700 ease-out group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)] group-[.active]:skew-x-0 group-[.active]:left-[20px] group-[.active]:w-[calc(100%-40px)]"
                style={{
                    background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                }}
            />
            <span
                className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-700 ease-out group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-40px)] group-[.active]:skew-x-0 group-[.active]:left-[20px] group-[.active]:w-[calc(100%-40px)]"
                style={{
                    background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                }}
            />

            {/* Animated blurs */}
            <span className="pointer-events-none absolute inset-0 z-10">
                <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob group-hover:top-[-40px] group-hover:left-[40px] group-hover:w-[80px] group-hover:h-[80px] group-hover:opacity-100 group-[.active]:top-[-40px] group-[.active]:left-[40px] group-[.active]:w-[80px] group-[.active]:h-[80px] group-[.active]:opacity-100" />
                <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob group-hover:bottom-[-40px] group-hover:right-[40px] group-hover:w-[80px] group-hover:h-[80px] group-hover:opacity-100 group-[.active]:bottom-[-40px] group-[.active]:right-[40px] group-[.active]:w-[80px] group-[.active]:h-[80px] group-[.active]:opacity-100" style={{ animationDelay: '1s' }} />
            </span>

            {/* Content */}
            <div className="relative z-20 left-0 h-full flex flex-col justify-between p-[20px_40px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-lg rounded-lg text-white transition-all duration-700 ease-out group-hover:left-[-15px] group-hover:p-[40px_40px] border border-white/10 group-hover:border-white/20 group-[.active]:left-[-15px] group-[.active]:p-[40px_40px] group-[.active]:border-white/20">

                {/* Top Section: Name & Role */}
                <div className="relative z-30 transition-all duration-500 group-hover:z-10 group-hover:opacity-90 group-hover:scale-95 group-[.active]:z-10 group-[.active]:opacity-90 group-[.active]:scale-95"> {/* Text drops BACK */}
                    <h2 className="text-2xl font-zentry uppercase font-bold mb-1 leading-tight drop-shadow-md">{name}</h2>
                    <p className="text-xs font-bold tracking-widest uppercase opacity-80 mb-4 drop-shadow-sm">{role}</p>
                </div>

                {/* Full Card Cutout Image */}
                {img && (
                    <div className="absolute bottom-0 left-0 right-0 h-[85%] z-20 pointer-events-none overflow-hidden rounded-b-lg transition-all duration-500 group-hover:z-40 group-hover:scale-105 group-[.active]:z-40 group-[.active]:scale-105"> {/* Image pops FRONT */}
                        <img
                            src={img}
                            alt={name}
                            className="w-full h-full object-contain object-bottom opacity-90 grayscale group-hover:grayscale-0 transition-all duration-500 group-[.active]:grayscale-0"
                        />
                        {/* Gradient overlay at bottom to make social icons readable */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    </div>
                )}

                {/* Bottom Section: Socials */}
                <div className="relative z-50 flex gap-4 mt-4"> {/* Socials ALWAYS on top */}
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 transform hover:scale-110"
                        >
                            <DiGithubBadge size={24} />
                        </a>
                    )}
                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#0077b5] transition-all duration-300 transform hover:scale-110"
                        >
                            <FaLinkedin size={20} />
                        </a>
                    )}
                    {instagram && (
                        <a
                            href={instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#E1306C] transition-all duration-300 transform hover:scale-110"
                        >
                            <FaInstagram size={20} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function GradientCardShowcase({ items }) {
    return (
        <div className="flex justify-center items-center flex-wrap gap-10 py-10">
            {items.map((item, idx) => (
                <GradientCard key={idx} {...item} />
            ))}
        </div>
    );
}
