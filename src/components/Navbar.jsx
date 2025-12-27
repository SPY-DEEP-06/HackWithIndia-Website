import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import Button from "./Button";

import loopAudio from "../assets/files/music.mp3";

// Custom hook to avoid extra dependency for now, or just use window listener
const navItems = ["Our Team", "Gallery", "Past Events", "Contact"];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFloating, setIsFloating] = useState(false);
    const location = useLocation();

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);

    // Simple scroll listener
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            // Set floating state based on scroll position
            setIsFloating(currentY > 0);

            if (currentY === 0) {
                setIsNavVisible(true);
                navContainerRef.current.classList.remove("floating-nav");
            } else if (currentY > lastScrollY) {
                // Scrolling down
                setIsNavVisible(false);
                navContainerRef.current.classList.add("floating-nav");
            } else if (currentY < lastScrollY) {
                // Scrolling up
                setIsNavVisible(true);
                navContainerRef.current.classList.add("floating-nav");
            }

            setLastScrollY(currentY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    }

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);

    // Close mobile menu on route change or hash change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    // Dynamic text color logic
    const isLightPage = ["/team"].includes(location.pathname);
    // If we are on a light page AND NOT floating (at the top), use black text.
    // Otherwise (dark page or floating/scrolled), use white/blue-50 text.
    const textColorClass = (isLightPage && !isFloating) ? "text-black" : "text-blue-50";

    return (
        <>
            <div
                ref={navContainerRef}
                className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
            >
                <header className="absolute top-1/2 w-full -translate-y-1/2">
                    <nav className="flex size-full items-center justify-between p-4">
                        {/* Logo and Product button */}
                        <div className="flex items-center gap-7">
                            <img src="/img/logo.png" alt="logo" className="w-10" />

                            <Link to="/" onClick={(e) => {
                                if (location.pathname === "/") {
                                    e.preventDefault();
                                    if (window.lenisRef) {
                                        window.lenisRef.scrollTo(0);
                                    }
                                }
                            }}>
                                <Button
                                    id="product-button"
                                    title="Home"
                                    rightIcon={<TiLocationArrow />}
                                    containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                                />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex h-full items-center">
                            <div className="hidden md:block">
                                {navItems.map((item, index) => {
                                    const isTeam = item === "Our Team";
                                    const isPastEvents = item === "Past Events";
                                    const targetId = item.toLowerCase().replace(" ", "-");

                                    if (isTeam || isPastEvents || item === "Gallery") {
                                        let route = "/";
                                        if (isTeam) route = "/team";
                                        if (isPastEvents) route = "/past-events";
                                        if (item === "Gallery") route = "/gallery";

                                        const isActive = location.pathname === route;

                                        return (
                                            <Link
                                                key={index}
                                                to={route}
                                                className={`nav-hover-btn ${textColorClass} ${isActive ? "nav-active" : ""}`}
                                            >
                                                {item}
                                            </Link>
                                        );
                                    }

                                    return (
                                        <a
                                            key={index}
                                            href={`/#${targetId}`}
                                            className={`nav-hover-btn ${textColorClass}`}
                                            onClick={(e) => {
                                                if (location.pathname === "/") {
                                                    e.preventDefault();
                                                    const element = document.getElementById(targetId);
                                                    if (element && window.lenisRef) {
                                                        window.lenisRef.scrollTo(element);
                                                    }
                                                }
                                            }}
                                        >
                                            {item}
                                        </a>
                                    );
                                })}
                            </div>

                            <button
                                onClick={toggleAudioIndicator}
                                className="ml-10 flex items-center space-x-0.5"
                            >
                                <audio
                                    ref={audioElementRef}
                                    className="hidden"
                                    src={loopAudio}
                                    loop
                                />
                                {[1, 2, 3, 4].map((bar) => (
                                    <div
                                        key={bar}
                                        className={`indicator-line ${isIndicatorActive ? "active" : ""
                                            }`}
                                        style={{
                                            animationDelay: `${bar * 0.1}s`,
                                            backgroundColor: (isLightPage && !isFloating) ? "black" : "white"
                                        }}
                                    />
                                ))}
                            </button>
                        </div>

                        {/* Mobile Navigation Controls */}
                        <div className="flex md:hidden items-center gap-4">
                            <button
                                onClick={toggleAudioIndicator}
                                className="flex items-center space-x-0.5"
                            >
                                <audio
                                    ref={audioElementRef}
                                    className="hidden"
                                    src={loopAudio}
                                    loop
                                />
                                {[1, 2, 3, 4].map((bar) => (
                                    <div
                                        key={bar}
                                        className={`indicator-line ${isIndicatorActive ? "active" : ""
                                            }`}
                                        style={{
                                            animationDelay: `${bar * 0.1}s`,
                                        }}
                                    />
                                ))}
                            </button>

                            <button
                                onClick={toggleMobileMenu}
                                className={`focus:outline-none z-50 relative ${textColorClass}`}
                            >
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </nav>
                </header>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center transition-opacity duration-300 md:hidden overflow-y-auto ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex flex-col items-center gap-8 py-10">
                    <Link
                        to="/"
                        className="text-2xl font-general text-blue-50 uppercase hover:text-yellow-300 hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                    </Link>

                    {navItems.map((item, index) => {
                        const isTeam = item === "Our Team";
                        const isGallery = item === "Gallery";
                        const isPastEvents = item === "Past Events";
                        const targetId = item.toLowerCase().replace(" ", "-");

                        if (isTeam || isPastEvents || isGallery) {
                            let route = "/";
                            if (isTeam) route = "/team";
                            if (isPastEvents) route = "/past-events";
                            if (isGallery) route = "/gallery";

                            return (
                                <Link
                                    key={index}
                                    to={route}
                                    className="text-2xl font-general text-blue-50 uppercase hover:text-yellow-300 hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            );
                        }

                        return (
                            <a
                                key={index}
                                href={`/#${targetId}`}
                                className="text-2xl font-general text-blue-50 uppercase hover:text-yellow-300 hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out"
                                onClick={(e) => {
                                    setIsMobileMenuOpen(false);
                                    if (location.pathname === "/") {
                                        e.preventDefault();
                                        const element = document.getElementById(targetId);
                                        if (element && window.lenisRef) {
                                            window.lenisRef.scrollTo(element);
                                        }
                                    }
                                }}
                            >
                                {item}
                            </a>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Navbar;
