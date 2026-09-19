import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useInView, animate, useReducedMotion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const CONTACT = {
  phone: "+7 747 274 6859",
  phoneHref: "tel:+77472746859",
  whatsapp: "https://wa.me/77472746859",
  instagram: "https://instagram.com/lionweb_kz",
  address: "Есенберлина 13, Алматы",
};

export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const upd = () => setFine(mq.matches);
    upd();
    mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);
  return fine;
}

export function useIsDesktop() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const upd = () => setOk(mq.matches);
    upd();
    mq.addEventListener("change", upd);
    return () => mq.removeEventListener("change", upd);
  }, []);
  return ok;
}

export function scrollToHash(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/* overflow-hidden vertical typography reveal — controlled by `ready` */
export function RevealLine({ children, delay = 0, ready = true, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "112%" }}
        animate={ready ? { y: "0%" } : { y: "112%" }}
        transition={{ duration: reduced ? 0 : 1.05, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* overflow-hidden vertical typography reveal — on scroll into view.
   whileInView sits on the outer (untransformed) span so IntersectionObserver
   measures the real box; the inner span performs the clipped motion. */
export function RevealLineInView({ children, delay = 0, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "112%" }, visible: { y: "0%" } }}
        transition={{ duration: reduced ? 0 : 0.95, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function FadeUp({ children, delay = 0, className = "", y = 28, amount = 0.35 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduced ? 0 : 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({ children, strength = 0.3, className = "" }) {
  const fine = useFinePointer();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 160, damping: 14, mass: 0.12 });
  const y = useSpring(my, { stiffness: 160, damping: 14, mass: 0.12 });

  if (!fine) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) * strength);
        my.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setN(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref}>
      {n}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}
