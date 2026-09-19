import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "./motion-primitives";

export default function Cursor() {
  const fine = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 });
  const [variant, setVariant] = useState("default");

  useEffect(() => {
    if (!fine) return undefined;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target.closest("[data-cursor]");
      const v = t && t.dataset.cursor;
      if (v) {
        setVariant(v);
        return;
      }
      if (e.target.closest('a, button, [role="button"], [data-cursor-hover]')) setVariant("hover");
      else setVariant("default");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  const label = { view: "VIEW ↗", go: "GO ↗" }[variant];
  const big = variant === "view" || variant === "go";

  return (
    <>
      <motion.div className="fixed top-0 left-0 z-[300] pointer-events-none" style={{ x: rx, y: ry }}>
        <motion.div
          className="flex items-center justify-center rounded-full"
          animate={{
            width: big ? 76 : variant === "hover" ? 52 : 28,
            height: big ? 76 : variant === "hover" ? 52 : 28,
            backgroundColor: big ? "rgba(197,160,89,0.95)" : "rgba(197,160,89,0)",
            borderColor: big ? "rgba(197,160,89,0)" : "rgba(197,160,89,0.7)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          style={{
            translateX: "-50%",
            translateY: "-50%",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          {big && (
            <span className="font-mono text-[10px] tracking-[0.15em] text-ink whitespace-nowrap">{label}</span>
          )}
        </motion.div>
      </motion.div>
      <motion.div className="fixed top-0 left-0 z-[301] pointer-events-none" style={{ x, y }}>
        <div
          className="w-1 h-1 rounded-full bg-gold"
          style={{ transform: "translate(-50%, -50%)", opacity: big ? 0 : 1 }}
        />
      </motion.div>
    </>
  );
}
