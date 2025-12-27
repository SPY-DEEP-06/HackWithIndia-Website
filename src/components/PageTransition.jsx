import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

const PageTransition = ({ children }) => {
    const location = useLocation();
    const containerRef = useRef(null);

    useEffect(() => {
        // Animation on location change
        const ctx = gsap.context(() => {
            // Simple entry animation
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [location.pathname]);

    return (
        <div ref={containerRef} className="width-full">
            {children}
        </div>
    );
};

export default PageTransition;
