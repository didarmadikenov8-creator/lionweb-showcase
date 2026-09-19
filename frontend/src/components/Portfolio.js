import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { FadeUp, RevealLineInView, EASE } from "./motion-primitives";

const PROJECTS = [
  { id: "kidstools", index: "01", name: "KIDSTOOLS", category: "Интернет-магазин", price: "750 000 ₸", time: "10–12 дней", url: "https://kidstools.kz/", tone: "#C5A059" },
  { id: "ermart", index: "02", name: "ERMART", category: "Интернет-магазин", price: "300 000 ₸", time: "10–12 дней", url: "https://ermart.kz/", tone: "#B0713F" },
  { id: "baekkey", index: "03", name: "BAEKKEY", category: "Интернет-магазин", price: "500 000 ₸", time: "10–12 дней", url: "https://www.baekkey.kz/", tone: "#8C6D3F" },
  { id: "salsabil", index: "04", name: "SALSABIL", category: "Интернет-магазин", price: "450 000 ₸", time: "7–14 дней", url: "https://salsabil.kz/", tone: "#D8C9A3" },
  { id: "mamibiomed", index: "05", name: "MAMIBIOMED", category: "Интернет-магазин", price: "700 000 ₸", time: "7–14 дней", url: "https://arystan.mamibiomed.com/", tone: "#9A8F7A" },
  { id: "agroalem", index: "06", name: "AGROALEM", category: "Интернет-магазин", price: null, time: null, url: null, tone: "#6B6B4F" },
];

const BG = ["#080808", "#0B0A07", "#0C0A06", "#0A0806", "#0B0A08", "#090806"];

/* Editorial placeholder visual — replace with a real project screenshot:
   render an <img src="..." /> inside the frame below. */
function ProjectVisual({ p }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: `radial-gradient(120% 100% at 18% 0%, ${p.tone}16 0%, #0B0B0B 60%)` }}
    >
      <div className="absolute inset-x-0 top-0 h-10 border-b border-white/[0.07] flex items-center px-5 gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full border border-white/25" />
        <span className="w-1.5 h-1.5 rounded-full border border-white/25" />
        <span className="w-1.5 h-1.5 rounded-full border border-white/25" />
        <span className="ml-4 font-mono text-[9px] tracking-[0.15em] text-paper/35">
          {p.url ? p.url.replace("https://", "").replace("www.", "") : "agroalem.kz · скоро"}
        </span>
        <span className="ml-auto font-mono text-[9px] text-gold/70">{p.index}</span>
      </div>

      <span className="absolute -bottom-[3vw] right-3 font-display font-extrabold text-[10vw] leading-none text-white/[0.04] select-none">
        {p.index}
      </span>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <span
          className="font-display font-bold uppercase text-center leading-[0.92]"
          style={{ fontSize: p.name.length > 7 ? "4.6vw" : "6.4vw", color: p.tone, opacity: 0.9 }}
        >
          {p.name}
        </span>
      </div>

      <div className="absolute left-6 bottom-14 space-y-2 hidden md:block">
        <div className="w-36 h-1.5 bg-white/10" />
        <div className="w-24 h-1.5 bg-white/[0.07]" />
        <div className="w-32 h-1.5 bg-white/[0.05]" />
      </div>
      <div className="absolute right-6 top-16 w-44 h-28 border border-white/[0.08] hidden md:grid grid-cols-3 gap-px p-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-white/[0.04]" />
        ))}
      </div>

      <span className="absolute left-6 bottom-5 font-mono text-[8px] tracking-[0.3em] text-paper/25">
        ВИЗУАЛ ПРОЕКТА — ЗАМЕНИТЕ СКРИНШОТОМ
      </span>
    </div>
  );
}

const stageV = {
  enter: (d) => ({
    clipPath: d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
    scale: 1.03,
  }),
  center: { clipPath: "inset(0 0% 0 0%)", scale: 1 },
  exit: (d) => ({
    clipPath: d > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
    scale: 0.985,
  }),
};

function Showreel() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dirRef = useRef(1);
  const drag = useRef({ on: false, startX: 0, dx: 0 });
  const elapsed = useRef(0);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.3 });

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 16 });
  const sy = useSpring(py, { stiffness: 60, damping: 16 });
  const lx = useTransform(sx, [-1, 1], [-12, 12]);
  const ly = useTransform(sy, [-1, 1], [-8, 8]);
  const tx = useTransform(sx, [-1, 1], [6, -6]);
  const ty = useTransform(sy, [-1, 1], [4, -4]);

  const progress = useMotionValue(0);

  const goTo = (n, d) => {
    dirRef.current = d;
    setActive(((n % PROJECTS.length) + PROJECTS.length) % PROJECTS.length);
    elapsed.current = 0;
    progress.set(0);
  };

  useEffect(() => {
    if (reduced || !inView) return undefined;
    let raf;
    let last = performance.now();
    const loop = (t) => {
      const dt = t - last;
      last = t;
      if (!paused) {
        elapsed.current += dt;
        if (elapsed.current >= 5000) {
          elapsed.current = 0;
          progress.set(0);
          dirRef.current = 1;
          setActive((i) => (i + 1) % PROJECTS.length);
        }
      }
      progress.set(Math.min(1, elapsed.current / 5000));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paused, inView, reduced, progress]);

  const p = PROJECTS[active];

  return (
    <section
      id="works"
      ref={ref}
      data-cursor="drag"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        drag.current.on = false;
      }}
      onPointerDown={(e) => {
        drag.current = { on: true, startX: e.clientX, dx: 0 };
      }}
      onPointerMove={(e) => {
        if (drag.current.on) drag.current.dx = e.clientX - drag.current.startX;
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onPointerUp={() => {
        if (drag.current.on) {
          if (drag.current.dx < -60) goTo(active + 1, 1);
          else if (drag.current.dx > 60) goTo(active - 1, -1);
          drag.current.on = false;
        }
      }}
      className="relative hidden lg:block h-[100svh] overflow-hidden select-none"
      style={{ backgroundColor: BG[active], transition: "background-color 0.8s ease" }}
    >
      <div className="h-full flex items-center gap-[4vw] pl-[8vw] pr-[8vw]">
        <div className="w-[30vw] shrink-0">
          <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold font-medium">
            [ ИЗБРАННЫЕ РАБОТЫ ]
          </div>
          <h2 className="mt-8 font-display font-semibold uppercase leading-[1.04] text-[3.4vw]">
            <RevealLineInView>Не рассказываем.</RevealLineInView>
            <RevealLineInView delay={0.07}>
              <span className="text-gold">Показываем.</span>
            </RevealLineInView>
          </h2>
          <p className="mt-8 max-w-[24vw] text-[15px] md:text-[17px] leading-[1.7] text-paper/50">
            Интернет-магазины и веб-проекты, созданные Lionweb под конкретный бизнес.
          </p>

          <div className="mt-12 flex items-baseline gap-3 font-display font-semibold leading-none">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={active}
                initial={{ y: 26, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -26, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="text-6xl xl:text-7xl text-gold inline-block"
              >
                {p.index}
              </motion.span>
            </AnimatePresence>
            <span className="text-2xl xl:text-3xl text-paper/30">/ 06</span>
          </div>
          <div className="mt-5 font-mono text-[12px] md:text-[13px] tracking-[0.25em] text-paper/35">
            ← DRAG →
          </div>

          <a
            href="https://lionweb.kz"
            target="_blank"
            rel="noreferrer"
            data-cursor="go"
            data-testid="all-projects"
            className="mt-12 inline-block font-mono text-[13px] md:text-[14px] tracking-[0.18em] text-paper/50 link-line hover:text-gold transition-colors"
          >
            [ ВСЕ ПРОЕКТЫ ↗ ]
          </a>
        </div>

        <div className="flex-1 min-w-0">
          <motion.div style={{ x: tx, y: ty }} className="flex items-end justify-between gap-6 mb-5">
            <div className="flex items-baseline gap-5">
              <span className="font-mono text-[13px] text-gold">{p.index} /</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.h3
                  key={p.id}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="font-display font-semibold uppercase text-3xl xl:text-4xl tracking-tight inline-block"
                >
                  {p.name}
                </motion.h3>
              </AnimatePresence>
            </div>
            <div className="text-right font-mono text-[13px] md:text-[15px] leading-relaxed text-paper/55 shrink-0">
              <div>{p.category}</div>
              <div className="text-gold">{p.price ?? "В РАЗРАБОТКЕ"}</div>
              {p.time && <div className="text-paper/40">{p.time}</div>}
            </div>
          </motion.div>

          <div className="relative overflow-hidden border border-white/[0.06] bg-[#0D0C0A]" style={{ height: "56vh" }}>
            <AnimatePresence custom={dirRef.current} mode="popLayout" initial={false}>
              <motion.div
                key={active}
                custom={dirRef.current}
                variants={stageV}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0"
              >
                <motion.div style={{ x: lx, y: ly }} className="absolute inset-[-14px]">
                  <ProjectVisual p={p} />
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/10 z-10">
              <motion.div className="h-full bg-gold origin-left" style={{ scaleX: progress }} />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between font-mono text-[12px] md:text-[15px] tracking-[0.18em]">
            <span className="text-paper/40">
              {p.index} — {p.category.toUpperCase()}
            </span>
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                data-testid={`project-link-${p.id}`}
                className="text-gold link-line font-medium"
              >
                VIEW PROJECT ↗
              </a>
            ) : (
              <span className="text-paper/40">СКОРО</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileGallery() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const idxRef = useRef(0);
  const pausedRef = useRef(false);
  const touchTimer = useRef(null);
  const elapsed = useRef(0);
  const reduced = useReducedMotion();
  const inView = useInView(trackRef, { amount: 0.35 });
  const progress = useMotionValue(0);

  const stepOf = () => {
    const el = trackRef.current;
    return el && el.children.length > 1 ? el.children[1].offsetLeft - el.children[0].offsetLeft : 1;
  };

  const goToSlide = (n) => {
    const el = trackRef.current;
    if (!el) return;
    const i = ((n % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    el.scrollTo({ left: stepOf() * i, behavior: "smooth" });
  };

  useEffect(() => {
    if (reduced || !inView) return undefined;
    let raf;
    let last = performance.now();
    const loop = (t) => {
      const dt = t - last;
      last = t;
      if (!pausedRef.current) {
        elapsed.current += dt;
        if (elapsed.current >= 5000) {
          elapsed.current = 0;
          progress.set(0);
          goToSlide(idxRef.current + 1);
        }
      }
      progress.set(Math.min(1, elapsed.current / 5000));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, inView, progress]);

  const onTrackScroll = () => {
    const el = trackRef.current;
    if (!el || el.children.length < 2) return;
    const step = el.children[1].offsetLeft - el.children[0].offsetLeft;
    const i = Math.min(PROJECTS.length - 1, Math.max(0, Math.round(el.scrollLeft / step)));
    idxRef.current = i;
    setActive(i);
  };

  return (
    <section className="lg:hidden pt-24 pb-4" data-testid="portfolio-mobile">
      <div className="px-5">
        <FadeUp>
          <div className="font-mono text-[13px] tracking-[0.2em] text-gold font-medium">[ ИЗБРАННЫЕ РАБОТЫ ]</div>
          <h2 className="mt-6 font-display font-semibold uppercase leading-[1.06] text-3xl">
            <RevealLineInView>Не рассказываем.</RevealLineInView>
            <RevealLineInView delay={0.07}>
              <span className="text-gold">Показываем.</span>
            </RevealLineInView>
          </h2>
        </FadeUp>
        <div className="mt-6 font-mono text-[13px] tracking-[0.2em]" data-testid="portfolio-progress">
          <span className="text-gold font-medium">0{active + 1}</span>
          <span className="text-paper/35"> / 06</span>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onTrackScroll}
        onTouchStart={() => {
          pausedRef.current = true;
          clearTimeout(touchTimer.current);
        }}
        onTouchEnd={() => {
          clearTimeout(touchTimer.current);
          touchTimer.current = setTimeout(() => {
            pausedRef.current = false;
            elapsed.current = 0;
            progress.set(0);
          }, 3500);
        }}
        data-testid="portfolio-track"
        className="mt-8 flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-5 pb-2"
        style={{ overscrollBehaviorX: "contain", scrollPaddingLeft: "20px", WebkitOverflowScrolling: "touch" }}
      >
        {PROJECTS.map((p) => (
          <article key={p.id} data-slide data-testid={`project-${p.id}`} className="w-[82vw] shrink-0 snap-start">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-mono text-[13px] text-gold">{p.index} /</span>
              <span className="font-mono text-[13px] text-paper/40">{p.category}</span>
            </div>
            <div className="relative overflow-hidden border border-white/[0.06] bg-[#0D0C0A] h-[64vw] min-h-[250px]">
              <ProjectVisual p={p} />
            </div>
            <h3 className="mt-4 font-display font-semibold uppercase text-2xl">{p.name}</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-[13px] text-paper/55">
              <div>
                <div className="text-paper/30 tracking-[0.15em]">БЮДЖЕТ</div>
                <div className="text-gold mt-1.5">{p.price ?? "В РАЗРАБОТКЕ"}</div>
              </div>
              <div>
                <div className="text-paper/30 tracking-[0.15em]">СРОК</div>
                <div className="mt-1.5">{p.time ?? "—"}</div>
              </div>
            </div>
            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                data-testid={`project-link-${p.id}`}
                className="mt-5 inline-block font-mono text-[14px] tracking-[0.18em] text-gold link-line font-medium"
              >
                VIEW PROJECT ↗
              </a>
            ) : (
              <span className="mt-5 inline-block font-mono text-[14px] tracking-[0.18em] text-paper/40">СКОРО</span>
            )}
          </article>
        ))}
        <div className="w-[10vw] shrink-0" aria-hidden="true" />
      </div>

      <div className="px-5">
        <div className="h-[2px] bg-white/10 overflow-hidden">
          <motion.div className="h-full bg-gold origin-left" style={{ scaleX: progress }} />
        </div>
        <a
          href="https://lionweb.kz"
          target="_blank"
          rel="noreferrer"
          data-testid="all-projects-mobile"
          className="mt-12 mb-8 block border border-gold/40 py-4 text-center font-mono text-sm tracking-[0.18em] text-gold active:bg-gold active:text-ink transition-colors"
        >
          [ ВСЕ ПРОЕКТЫ ↗ ]
        </a>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="relative">
      <Showreel />
      <MobileGallery />
    </div>
  );
}