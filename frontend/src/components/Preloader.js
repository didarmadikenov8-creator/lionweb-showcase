import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { EASE } from "./motion-primitives";

export default function Preloader({ onDone }) {
  const [show, setShow] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShow(false);
      onDone();
      return undefined;
    }
    const t = setTimeout(() => {
      setShow(false);
      onDone();
    }, 1500);
    return () => clearTimeout(t);
  }, [reduced, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-testid="preloader"
          className="fixed inset-0 z-[400] bg-ink flex flex-col items-center justify-center"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="text-center"
          >
            <div className="font-mono text-xs md:text-sm tracking-[0.4em] text-gold">LIONWEB®</div>
            <div className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-paper/40 mt-2.5">
              DIGITAL TERRITORY
            </div>
          </motion.div>
          <div className="w-44 md:w-56 h-px bg-white/10 mt-8 overflow-hidden">
            <motion.div
              className="h-full bg-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1], delay: 0.35 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
