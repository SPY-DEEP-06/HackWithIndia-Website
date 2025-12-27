import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa";
import atharvaImg from "@/assets/img/atharva.png";
import aayushImg from "@/assets/img/aayush.png";
import { PinContainer } from "@/components/ui/3d-pin";
import deepanshuImg from "@/assets/img/deepanshu.png";
import anshImg from "@/assets/img/ansh_verma.png";
import krushaliImg from "@/assets/img/krushali.png";
import khushiImg from "@/assets/img/khushi.png";
import aakankshaImg from "@/assets/img/aakanksha.png";
import tanviImg from "@/assets/img/tanvi.png";
import krishnakantImg from "@/assets/img/krishnakant.png";
import aryanImg from "@/assets/img/aryan.png";
import ravikishanImg from "@/assets/img/ravikishan.png";
import GradientCardShowcase from "@/components/ui/gradient-card-showcase";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const TeamMember = ({ name, role, img, github, linkedin, titleStyle, imgStyle }) => {
    // ... item ...
    return (
        <div className="card-3d group">
            {/* Wrapper: Background & Tilt Effect */}
            <div className="card-3d-wrapper">
                {/* ... background ... */}
                <div className="w-full h-full bg-gradient-to-br from-[#100148] via-[#050020] to-black border border-white/10" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            </div>

            <div
                className="card-3d-title pointer-events-none transition-transform duration-500 group-hover:-translate-y-4"
                style={titleStyle}
            >
                {/* ... title content ... */}
                <div className="flex flex-col items-center justify-center px-4 pb-2 text-center w-full">
                    <h3 className="text-lg md:text-xl font-black text-white uppercase font-zentry tracking-wider drop-shadow-lg leading-tight">
                        {name}
                    </h3>
                    <p className="text-[10px] font-bold text-cyan-400 tracking-[0.2em] uppercase mt-2">
                        {role}
                    </p>
                </div>
            </div>

            {/* Character: The Pop-out Image */}
            <img
                src={img}
                alt={name}
                className="card-3d-character object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                style={imgStyle}
            />

            {/* Social Links */}
            <div className="absolute bottom-[-40px] left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500 z-50 pointer-events-auto">
                <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-violet-400 text-xl transform hover:scale-110 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                >
                    <DiGithubBadge />
                </a>
                <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 text-xl transform hover:scale-110 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FaLinkedin />
                </a>
            </div>
        </div>
    );
};

const Team = () => {
    // Team data with gradients
    // ... members ...
    const members = [
        {
            name: "Aayush Pandey",
            role: "President",
            desc: "Driving the vision and execution of HackWithIndia.",
            img: aayushImg,
            gradientFrom: "#ffbc00", // Gold
            gradientTo: "#ff0058",   // Pink
            github: "#",
            linkedin: "#"
        },
        {
            // ... other members truncated for brevity, but logically preserved
            name: "Deepanshu Ghosalkar",
            role: "Tech Lead",
            desc: "Mastermind behind the technical infrastructure.",
            img: deepanshuImg,
            gradientFrom: "#03a9f4", // Blue
            gradientTo: "#ff0058",   // Pink
            github: "#",
            linkedin: "#"
        },
        {
            name: "Ansh Verma",
            role: "Vice President",
            desc: "Crafting the visual identity and user experience.",
            img: anshImg,
            gradientFrom: "#4dff03", // Green
            gradientTo: "#00d0ff",   // Cyan
            github: "#",
            linkedin: "#"
        },
        {
            name: "Atharva Achare",
            role: "Social Media Head",
            desc: "Connecting with the community and partners.",
            img: atharvaImg,
            gradientFrom: "#7928ca", // Purple
            gradientTo: "#ff0080",   // Magenta
            github: "#",
            linkedin: "#",
            titleStyle: { paddingBottom: '0px' } // Reduced padding to lower text
        },
        {
            name: "Tanvi Patil",
            role: "Social Media Co-head",
            desc: "Amplifying our voice across digital platforms.",
            img: tanviImg,
            gradientFrom: "#ff4b1f", // Orange
            gradientTo: "#ff9068",   // Salmon
            github: "#",
            linkedin: "#"
        },
        {
            name: "Aryan Naik",
            role: "Editing Lead",
            desc: "Crafting cinematic experiences and visuals.",
            img: aryanImg,
            gradientFrom: "#00c6ff", // Light Blue
            gradientTo: "#0072ff",   // Royal Blue
            github: "#",
            linkedin: "#"
        },
        {
            name: "Ravikishan Singh",
            role: "Design Head",
            desc: "Visualizing ideas into stunning reality.",
            img: ravikishanImg,
            gradientFrom: "#bc4e9c", // Pink
            gradientTo: "#f80759",   // Red-Pink
            github: "#",
            linkedin: "#"
        },
        {
            name: "Khushi Chowta",
            role: "Event Management Head",
            desc: "Orchestrating seamless and memorable events.",
            img: khushiImg,
            gradientFrom: "#f12711", // Red
            gradientTo: "#f5af19",   // Yellow
            github: "#",
            linkedin: "#"
        },
        {
            name: "Krishnakant Sharma",
            role: "PR & Sponsorship Head",
            desc: "Building bridges with partners and sponsors.",
            img: krishnakantImg,
            gradientFrom: "#11998e", // Teal
            gradientTo: "#38ef7d",   // Lime
            github: "#",
            linkedin: "#",
            imgStyle: { transform: 'scale(1.35)', bottom: '-15px' }
        },
        {
            name: "Krushali Borhade",
            role: "Publicity Head",
            desc: "Spreading the word and building hype.",
            img: krushaliImg,
            gradientFrom: "#8e2de2", // Purple
            gradientTo: "#4a00e0",   // Violet
            github: "#",
            linkedin: "#"
        },
        {
            name: "Aakanksha Mishra",
            role: "Content Head",
            desc: "Curating stories that inspire and inform.",
            img: aakankshaImg,
            gradientFrom: "#ec008c", // Rose
            gradientTo: "#fc6767",   // Coral
            github: "#",
            linkedin: "#"
        },
    ];

    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".team-header", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".team-header",
                start: "top 90%",
            }
        });

        gsap.from(".team-grid", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".team-grid",
                start: "top 80%",
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="bg-zinc-50 py-24 text-black min-h-screen">
            <div className="container mx-auto px-10">
                <h2 className="team-header mb-10 font-zentry text-6xl uppercase leading-[0.9] text-black text-center">
                    Our <b>T</b>eam
                </h2>

                {/* New Gradient Skew Cards Component */}
                <div className="team-grid">
                    <GradientCardShowcase items={members} />
                </div>
            </div>
        </section>
    );
};

export default Team;
