import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Always start at the top first
        if (window.lenisRef) {
            window.lenisRef.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }

        const scrollToHash = () => {
            const element = document.getElementById(hash.substring(1));
            if (element && window.lenisRef) {
                // Smooth scroll to element with a specified duration for better visibility
                window.lenisRef.scrollTo(element, { offset: 0, duration: 2.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                return true;
            }
            return false;
        };

        if (hash) {
            // Delay the scroll to allow user to see the "top" of the page first
            // and ensure DOM is fully ready
            const timer = setTimeout(() => {
                if (!scrollToHash()) {
                    // Retry if not found initially
                    setTimeout(scrollToHash, 500);
                }
            }, 800); // 800ms delay before scrolling down

            return () => clearTimeout(timer);
        }
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;
