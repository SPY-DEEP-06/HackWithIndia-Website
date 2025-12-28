import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { InfiniteSlider } from "@/components/ui/infinite-slider-horizontal";
import KineticScrollGallery from "@/components/ui/kinetic-scroll-gallery";
import { FramerThumbnailCarousel } from "@/components/ui/framer-thumbnail-carousel";

const sliderImages = [
    {
        title: "Event 1",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Event 2",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Event 3",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Event 4",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Event 5",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Event 6",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    },
];

const MotionSection = ({ children, className }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`relative z-10 ${className}`}
        >
            {children}
        </motion.section>
    );
};

const Gallery = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <div ref={containerRef} className="bg-black min-h-screen text-white relative overflow-hidden">
            {/* Unified Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[1] opacity-20 mix-blend-overlay"
                style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}>
            </div>

            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none z-[0]">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-blue-900/10 blur-[120px] rounded-full" />
                <div className="absolute top-[40%] right-[-10%] w-[50%] h-[60%] bg-purple-900/10 blur-[120px] rounded-full" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 pt-24 pb-0">

                {/* Page Title */}
                <motion.div
                    style={{ y }}
                    className="text-center mb-10 pt-10"
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-6xl md:text-[8rem] font-black font-zentry uppercase leading-[0.8] text-blue-50 tracking-tighter"
                    >
                        Galle<b>ry</b>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-6 text-lg text-neutral-400 font-circular-web max-w-xl mx-auto"
                    >
                        A visual journey through our innovations, events, and community moments.
                    </motion.p>
                </motion.div>

                {/* Unified Hero Gallery Section */}
                <MotionSection className="min-h-[90vh] flex flex-col justify-center items-center gap-12 mb-20 origin-center scale-90 md:scale-100">

                    {/* Top Ambient Slider (Reversed) */}
                    <div className="w-full opacity-60 hover:opacity-100 transition-opacity duration-700 will-change-transform">
                        <InfiniteSlider direction="horizontal" reverse duration={60} gap={24}>
                            {sliderImages.map((image, i) => (
                                <div key={i} className="aspect-video w-[250px] md:w-[350px] rounded-lg overflow-hidden opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                    <img src={image.image} alt="" className="object-cover h-full w-full" />
                                </div>
                            ))}
                        </InfiniteSlider>
                    </div>

                    {/* Main Interaction: Carousel (No Header) */}
                    <div className="w-full max-w-6xl mx-auto px-4 z-20">
                        <FramerThumbnailCarousel />
                    </div>

                    {/* Bottom Ambient Slider (Normal) */}
                    <div className="w-full opacity-60 hover:opacity-100 transition-opacity duration-700 will-change-transform">
                        <InfiniteSlider direction="horizontal" duration={60} gap={24}>
                            {sliderImages.map((image, i) => (
                                <div key={i} className="aspect-video w-[250px] md:w-[350px] rounded-lg overflow-hidden opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                    <img src={image.image} alt="" className="object-cover h-full w-full" />
                                </div>
                            ))}
                        </InfiniteSlider>
                    </div>
                </MotionSection>

                {/* Kinetic Scroll Section - Seamless Flow */}
                <MotionSection className="!py-0">
                    <div className="text-center mb-10">
                        <p className="font-general uppercase tracking-widest text-[#edeffd] text-sm opacity-50">More to Explore</p>
                    </div>
                    <div className="rounded-3xl overflow-hidden border-t border-white/5 bg-gradient-to-b from-transparent to-neutral-900/50 backdrop-blur-sm p-4 md:p-10">
                        <KineticScrollGallery />
                    </div>
                </MotionSection>

            </div>

            {/* Custom Styles for Linear Fade Mask if needed in CSS, or inline style here for simplicity */}
            <style jsx>{`
                .mask-linear-fade {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>
        </div>
    );
};

export default Gallery;
