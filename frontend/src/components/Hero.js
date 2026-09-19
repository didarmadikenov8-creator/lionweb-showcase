import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import GoldGeometry from "./GoldGeometry";
import { RevealLine, Magnetic, useFinePointer, scrollToHash, CONTACT, EASE } from "./motion-primitives";

export default function Hero({ ready }) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(mx, { stiffness: 40, damping: 18 });
  const gy = useSpring(my, { stiffness: 40, damping: 18 });

  const onMove = (e) => {
    if (!fine || reduced) return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 26);
    my.set((e.clientY / window.innerHeight - 0.5) * 20);
  };

  const show = (v) => (ready ? { opacity: 1, y: 0 } : { opacity: 0, y: v });

  return (
    <section onMouseMove={onMove} className="relative min-h-[100svh] flex flex-col overflow-hidden bg-ink">
      {/* brand geometry — abstract lion / crown lines */}
      <motion.div
        className="absolute -right-[26vw] md:right-[-6vw] top-[14%] md:top-1/2 md:-translate-y-1/2 w-[95vw] md:w-[46vw] max-w-[680px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.6, delay: 0.7 }}
      >
        <motion.div style={{ x: gx, y: gy }}>
          <GoldGeometry />
        </motion.div>
      </motion.div>

      {/* labels */}
      <div className="relative z-10 pt-24 md:pt-32 px-5 md:px-10 flex items-start justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={show(10)}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="font-mono text-[13px] md:text-[15px] tracking-[0.22em] text-paper/60 leading-loose font-medium"
        >
          DIGITAL AGENCY <span className="text-gold">·</span> ALMATY
          <br />
          <span className="text-paper/35">EST. / LIONWEB</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={show(10)}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="hidden md:block font-mono text-[15px] tracking-[0.22em] text-paper/30 text-right leading-loose"
        >
          САЙТЫ — E-COMMERCE
          <br />
          ПРИЛОЖЕНИЯ — SEO
        </motion.div>
      </div>

      {/* headline */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 md:px-10 pt-4 pb-2">
        <h1 data-testid="hero-title">
          <RevealLine ready={ready} delay={0.25}>
            <span className="hero-line">СОЗДАЁМ</span>
          </RevealLine>
          <RevealLine ready={ready} delay={0.37}>
            <span className="hero-line text-gold md:pl-[9vw]">DIGITAL</span>
          </RevealLine>
          <RevealLine ready={ready} delay={0.49}>
            <span className="hero-line">ТЕРРИТОРИИ</span>
          </RevealLine>
        </h1>
      </div>

      {/* bottom row */}
      <div className="relative z-10 px-5 md:px-10 pb-8 md:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={show(16)}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          className="max-w-md text-[15px] md:text-[17px] leading-[1.7] text-paper/55"
        >
          Разрабатываем сайты, интернет-магазины и мобильные продукты, которые помогают бизнесу расти.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={show(16)}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="flex flex-wrap items-center gap-5 md:gap-8"
        >
          <Magnetic>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-cursor="go"
              data-testid="hero-cta"
              className="inline-flex btn-gold"
            >
              [ ОБСУДИТЬ ПРОЕКТ <span className="arr">↗</span> ]
            </a>
          </Magnetic>
          <button
            onClick={() => scrollToHash("#works")}
            data-testid="hero-secondary"
            className="font-mono text-[13px] md:text-[15px] tracking-[0.18em] text-paper/50 hover:text-paper transition-colors duration-300"
          >
            СМОТРЕТЬ ПРОЕКТЫ ↓
          </button>
        </motion.div>
      </div>

      {/* vertical scroll indicator */}
      <div className="absolute right-6 md:right-10 bottom-0 z-10 hidden md:flex flex-col items-center gap-4">
        <span
          className="font-mono text-[9px] tracking-[0.35em] text-paper/35"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL — TO ENTER THE TERRITORY
        </span>
        <div className="w-px h-20 bg-white/10 overflow-hidden relative">
          <div
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            style={{ animation: "drop-line 2.2s cubic-bezier(0.65,0,0.35,1) infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
