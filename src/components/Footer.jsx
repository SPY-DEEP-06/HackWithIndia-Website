import { Footer as AnimatedFooter } from "./ui/modem-animated-footer";
import { FaDiscord, FaGithub, FaTwitch, FaTwitter } from "react-icons/fa";
import { NotepadTextDashed } from "lucide-react";

const Footer = () => {
    const socialLinks = [
        {
            icon: <FaDiscord className="w-6 h-6" />,
            href: "https://discord.com",
            label: "Discord",
        },
        {
            icon: <FaTwitter className="w-6 h-6" />,
            href: "https://twitter.com",
            label: "Twitter",
        },
        {
            icon: <FaGithub className="w-6 h-6" />,
            href: "https://github.com",
            label: "GitHub",
        },
        {
            icon: <FaTwitch className="w-6 h-6" />,
            href: "https://twitch.com",
            label: "Twitch",
        },
    ];

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/#about" },
        { label: "Team", href: "/team" },
        { label: "Events", href: "/past-events" },
        { label: "Privacy Policy", href: "#" },
    ];

    return (
        <AnimatedFooter
            brandName="HACK WITH INDIA"
            brandDescription="Innovate. Create. Elevate. Join the premier developer community at BVUDET - NM Chapter."
            socialLinks={socialLinks}
            navLinks={navLinks}
            className="bg-black text-white"
        />
    );
};

export default Footer;
