import { TiLocationArrow } from "react-icons/ti";
import BentoCard from "./BentoCard";
import BentoTilt from "./BentoTilt";

import feature1 from "../assets/files/feature-1.mp4";
import feature2 from "../assets/files/feature-2.mp4";
import feature3 from "../assets/files/feature-3.mp4";
import feature4 from "../assets/files/feature-4.mp4";
import feature5 from "../assets/files/feature-5.mp4";

const Features = () => {
    return (
        <section className="bg-black pb-52">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32">
                    <p className="font-circular-web text-lg text-blue-50">
                        Into the Radiant Layer
                    </p>
                    <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                        Immerse yourself in our workshops and events, where creativity meets technology.
                    </p>
                </div>

                <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                    <BentoCard
                        src={feature1}
                        title={
                            <>
                                wo<b>r</b>kshops
                            </>
                        }
                        description="Hands-on sessions on AI, Blockchain, and Web Development to level up your skills."
                        isComingSoon
                    />
                </BentoTilt>

                <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
                    <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                        <BentoCard
                            src={feature2}
                            title={
                                <>
                                    hac<b>k</b>athons
                                </>
                            }
                            description="Compete in 24-hour coding marathons to solve real-world problems."
                            isComingSoon
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                        <BentoCard
                            src={feature3}
                            title={
                                <>
                                    me<b>e</b>tups
                                </>
                            }
                            description="Connect with industry experts and like-minded peers."
                            isComingSoon
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                        <BentoCard
                            src={feature4}
                            title={
                                <>
                                    pro<b>j</b>ects
                                </>
                            }
                            description="Collaborate on open-source projects and build your portfolio."
                            isComingSoon
                        />
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2">
                        <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
                            <h1 className="bento-title special-font max-w-64 text-black">
                                M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
                            </h1>

                            <TiLocationArrow className="m-5 scale-[5] self-end" />
                        </div>
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2">
                        <video
                            src={feature5}
                            loop
                            muted
                            autoPlay
                            className="size-full object-cover object-center"
                        />
                    </BentoTilt>
                </div>
            </div>
        </section>
    );
};

export default Features;
