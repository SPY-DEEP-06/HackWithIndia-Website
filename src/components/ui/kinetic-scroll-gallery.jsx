'use client';

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1260&q=80",
    "https://images.unsplash.com/photo-1559666126-84f389796b54?auto=format&fit=crop&w=1260&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1260&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1260&q=80",
    "https://images.unsplash.com/photo-1501854140884-074cf2b2c3af?auto=format&fit=crop&w=1260&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1260&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1260&q=80",
    "https://images.unsplash.com/photo-1469474932222-8d6878342464?auto=format&fit=crop&w=1260&q=80",
    "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=1260&q=80",
    "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=1260&q=80",
    "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1260&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1260&q=80",
];

const KineticGridItem = ({ image, scrollVelocity }) => {
    // Smooth the velocity value for a more gradual effect
    const smoothedVelocity = useSpring(scrollVelocity, {
        mass: 0.1,
        stiffness: 80,
        damping: 40,
    });

    // Transform the smoothed velocity into a skew value.
    // The faster the scroll, the more it skews.
    const skew = useTransform(smoothedVelocity, [-1500, 0, 1500], [-15, 0, 15]);

    return (
        <motion.div
            className="w-full h-80 relative overflow-hidden rounded-lg bg-neutral-800 border border-white/5"
            style={{ skewX: skew }}
        >
            <img
                src={image}
                alt="Gallery Item"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
                style={{
                    transform: "scale(1.15)" // Slight zoom to prevent edges showing on skew
                }}
                onError={(e) => {
                    e.target.style.opacity = 0; // Hide broken images to show background
                }}
            />
        </motion.div>
    );
};

export default function KineticScrollGallery() {
    const { scrollYProgress } = useScroll();

    // Framer Motion's useScroll provides scrollYVelocity, which is a MotionValue
    // representing the velocity of the scroll in pixels per second.
    const scrollYVelocity = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 1000],
        { clamp: false }
    );

    return (
        <div className="text-neutral-50 py-12">
            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl font-zentry">
                        Visual Symphony
                    </h1>
                    <p className="mt-4 text-lg text-neutral-300">
                        Experience the rhythm of our moments through motion.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((img, index) => (
                        <KineticGridItem
                            key={index}
                            image={img}
                            scrollVelocity={scrollYVelocity}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
