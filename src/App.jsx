import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TeamPage from "./pages/TeamPage";
import PastEventsPage from "./pages/PastEventsPage";
import Gallery from "./pages/Gallery";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";

export let lenisRef = null;

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    window.lenisRef = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.lenisRef = null;
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <main className="relative min-h-screen w-screen overflow-x-hidden bg-zinc-50 antialiased">
        <Navbar />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/past-events" element={<PastEventsPage />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </PageTransition>
        <Footer />
      </main>
    </Router>
  );
};

export default App;
