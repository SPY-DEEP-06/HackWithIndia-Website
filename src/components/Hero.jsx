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

import GlassyButton from "./ui/glassy-button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    // ... existing code ...
    // ... no changes to logic ...

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {/* ... */}
            <div className="flex size-full flex-col items-center justify-center px-5 sm:px-10">
                <h1 className="special-font hero-heading text-blue-100">
                    HACK<b>W</b>ITH<b>I</b>NDIA
                </h1>
                <p className="mb-5 max-w-64 text-center font-robert text-blue-100">
                    BVUDET - NM CHAPTER <br /> Innovate. Create. Elevate.
                </p>
                <GlassyButton id="watch-trailer">
                    <TiLocationArrow className="text-xl mr-1" /> Join Us
                </GlassyButton>
            </div>
            {/* ... */}
        </div>
    );
};
                </div >

            </div >

    <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        <b>C</b>ODING
    </h1>
        </div >
    );
};

export default Hero;
