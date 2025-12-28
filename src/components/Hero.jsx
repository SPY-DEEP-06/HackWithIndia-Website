import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import video1 from "../assets/files/hero-1.mp4";
import video2 from "../assets/files/hero-2.mp4";
import video3 from "../assets/files/hero-3.mp4";
import video4 from "../assets/files/hero-4.mp4";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => {
            const newCount = prev + 1;
            if (newCount === totalVideos - 1) {
                setIsLoading(false);
            }
            return newCount;
        });
    };

    // 0 % 4 = 1 -> 1
    // 1 % 4 = 1 -> 2
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    };

    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set("#next-video", { visibility: "visible" });

                gsap.to("#next-video", {
                    transformOrigin: "center center",
                    scale: 1,
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                    onStart: () => nextVideoRef.current.play(),
                });

                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                });
            }
        },
        { dependencies: [currentIndex], revertOnUpdate: true }
    );

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
            borderRadius: "0 0 40% 10%",
        });

        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0 0 0 0",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });

    const getVideoSrc = (index) => {
        switch (index) {
            case 1: return video1;
            case 2: return video2;
            case 3: return video3;
            case 4: return video4;
            default: return video1;
        }
    };

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">

            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                    </div>
                </div>
            )}

            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                <div>
                    <div className="mask-clip-path absolute left-1/2 top-[20%] z-50 size-64 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-lg">
                        <div
                            onClick={handleMiniVdClick}
                            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                        >
                            <video
                                ref={nextVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>

                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />

                    <video
                        src={getVideoSrc(
                            currentIndex === totalVideos - 1 ? 1 : currentIndex
                        )}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                </div>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="flex size-full flex-col items-center justify-center px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">
                            HACK<b>W</b>ITH<b>I</b>NDIA
                        </h1>
                        import GlassyButton from "./ui/glassy-button";

                        // ... inside component ...

                        <p className="mb-5 max-w-64 text-center font-robert text-blue-100">
                            BVUDET - NM CHAPTER <br /> Innovate. Create. Elevate.
                        </p>
                        <GlassyButton id="watch-trailer">
                            <TiLocationArrow className="text-xl mr-1" /> Join Us
                        </GlassyButton>
                    </div>
                </div>

            </div>

            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                <b>C</b>ODING
            </h1>
        </div>
    );
};

export default Hero;
