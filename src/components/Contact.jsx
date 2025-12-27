import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

import contact1 from "../assets/img/contact-1.webp";
import contact2 from "../assets/img/contact-2.webp";
import swordman from "../assets/img/swordman.webp";
import swordman1 from "../assets/img/swordman-1200.webp"; // Using 1200 as replacement for missing swordman-1

const ImageClipBox = ({ src, clipClass }) => (
    <div className={clipClass}>
        <img src={src} className="will-change-transform" />
    </div>
);

const Contact = () => {
    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate images
            gsap.from(".contact-clip-path-1", {
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                duration: 1.5,
                ease: "power2.out", // Smoother ease
                willChange: "clip-path, transform", // Hint browser
                scrollTrigger: {
                    trigger: ".contact-clip-path-1",
                    start: "top 80%",
                }
            });

            gsap.from(".contact-clip-path-2", {
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                duration: 1.5,
                delay: 0.1,
                ease: "power2.out",
                willChange: "clip-path, transform",
                scrollTrigger: {
                    trigger: ".contact-clip-path-2",
                    start: "top 80%",
                }
            });

            gsap.from(".sword-man-clip-path", {
                clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
                duration: 1.5,
                ease: "power2.out",
                willChange: "clip-path, transform",
                scrollTrigger: {
                    trigger: ".sword-man-clip-path",
                    start: "top 80%",
                }
            });


            // Animate Text
            gsap.from("#contact-sub", {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                willChange: "transform, opacity",
                scrollTrigger: {
                    trigger: "#contact-sub",
                    start: "top 90%",
                }
            });

            gsap.from("#contact-main b, #contact-main span", {
                y: 30, // Reduced distance for smoother feel
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power2.out",
                willChange: "transform, opacity",
                scrollTrigger: {
                    trigger: "#contact-main",
                    start: "top 80%",
                }
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" className="w-screen bg-black overflow-hidden pointer-events-auto">
            <div ref={container} className="relative py-24 text-blue-50 sm:overflow-hidden transform-gpu">
                <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
                    <ImageClipBox
                        src={contact1}
                        clipClass="contact-clip-path-1 will-change-[clip-path]"
                    />
                    <ImageClipBox
                        src={contact2}
                        clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60 will-change-[clip-path]"
                    />
                </div>

                <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
                    <ImageClipBox
                        src={swordman}
                        clipClass="absolute md:scale-125 will-change-transform"
                    />
                    <ImageClipBox
                        src={swordman1}
                        clipClass="sword-man-clip-path md:scale-125 will-change-[clip-path]"
                    />
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <p id="contact-sub" className="font-general text-[10px] uppercase">
                        Join HackWithIndia
                    </p>
                    <h1 id="contact-main" className="special-font mt-10 w-full font-zentry text-4xl leading-[0.9] md:text-6xl lg:text-7xl">
                        Let's b<b>u</b>ild the <br /> new era of <br /> t<b>e</b>chnology t<b>o</b>gether
                    </h1>

                    <div className="mt-10 flex flex-col gap-10 md:flex-row">
                        {/* Organize with Us Card */}
                        <div className="group relative flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-blue-500/20 hover:border-white/20">
                            {/* Reflective shine effect */}
                            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                            <h3 className="font-zentry text-3xl uppercase tracking-wide text-blue-50 drop-shadow-md group-hover:text-white transition-colors">
                                Organize with Us
                            </h3>

                            <div className="w-full space-y-4">
                                <input
                                    type="text"
                                    placeholder="College Name"
                                    className="w-full rounded-lg bg-black/20 p-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 border border-white/5 transition-all duration-300 hover:bg-black/30"
                                />
                                <input
                                    type="email"
                                    placeholder="Official Email"
                                    className="w-full rounded-lg bg-black/20 p-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 border border-white/5 transition-all duration-300 hover:bg-black/30"
                                />
                            </div>

                            <Button title="Submit Proposal" containerClass="mt-2 w-full cursor-pointer !bg-blue-50 !text-black font-bold tracking-wider hover:!bg-white transition-colors" />
                        </div>

                        {/* General Enquiries Card */}
                        <div className="group relative flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/20 hover:border-white/20">
                            {/* Reflective shine effect */}
                            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                            <h3 className="font-zentry text-3xl uppercase tracking-wide text-blue-50 drop-shadow-md group-hover:text-white transition-colors">
                                General Enquiries
                            </h3>

                            <div className="w-full space-y-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full rounded-lg bg-black/20 p-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 border border-white/5 transition-all duration-300 hover:bg-black/30"
                                />
                                <textarea
                                    placeholder="Message"
                                    className="w-full rounded-lg bg-black/20 p-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 border border-white/5 transition-all duration-300 hover:bg-black/30 resize-none"
                                    rows={4}
                                />
                            </div>

                            <Button title="Contact Us" containerClass="mt-2 w-full cursor-pointer !bg-blue-50 !text-black font-bold tracking-wider hover:!bg-white transition-colors" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
