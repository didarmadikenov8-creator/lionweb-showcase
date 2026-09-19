import { useCallback, useEffect, useState, Component } from "react";
import Lenis from "lenis";
import { useReducedMotion, MotionConfig } from "framer-motion";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Marquee from "./components/Marquee";
import Estimator from "./components/Estimator";
import MobileSeo from "./components/MobileSeo";
import Process from "./components/Process";
import Team from "./components/Team";
import Philosophy from "./components/Philosophy";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: false };
  }
  static getDerivedStateFromError() {
    return { err: true };
  }
  componentDidCatch(error) {
    console.error(error);
  }
  render() {
    if (this.state.err) {
      return (
        <div className="min-h-screen bg-[#080808] text-[#F3F0E9] flex items-center justify-center font-mono text-xs tracking-[0.3em]">
          LIONWEB® — RELOAD PAGE
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [reduced]);

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
  }, [ready]);

  const onDone = useCallback(() => setReady(true), []);

  return (
    <ErrorBoundary>
      <MotionConfig transition={{ ease: [0.16, 1, 0.3, 1] }}>
        <div className="bg-ink text-paper">
          <Preloader onDone={onDone} />
          <Cursor />
          <div className="grain" aria-hidden="true" />
          <Nav ready={ready} />
          <main>
            <Hero ready={ready} />
            <Statement />
            <Portfolio />
            <Services />
            <Marquee />
            <Estimator />
            <MobileSeo />
            <Process />
            <Team />
            <Philosophy />
            <FinalCta />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </ErrorBoundary>
  );
}
