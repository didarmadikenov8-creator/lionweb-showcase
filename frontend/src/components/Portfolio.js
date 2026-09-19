import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from "framer-motion";
import { FadeUp, EASE } from "./motion-primitives";

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

function Card({ p }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  return (
    <article ref={ref} className="w-[68vw] shrink-0 group" data-testid={`project-${p.id}`} data-cursor="view">
      <div className="flex items-end justify-between gap-6 mb-5">
        <div className="flex items-baseline gap-5">
          <span className="font-mono text-xs text-gold">{p.index} /</span>
          <h3 className="font-display font-semibold uppercase text-2xl xl:text-4xl tracking-tight">{p.name}</h3>
        </div>
        <div className="text-right font-mono text-[13px] md:text-[15px] leading-relaxed text-paper/55 shrink-0">
          <div>{p.category}</div>
          <div className="text-gold">{p.price ?? "В РАЗРАБОТКЕ"}</div>
          {p.time && <div className="text-paper/40">{p.time}</div>}
        </div>
      </div>
      <motion.div
        animate={{ scale: inView ? 1 : 0.955 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative overflow-hidden border border-white/[0.06] bg-[#0D0C0A]"
        style={{ height: "56vh" }}
      >
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.025]">
          <ProjectVisual p={p} />
        </div>
      </motion.div>
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
    </article>
  );
}

function DesktopGallery() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-412vw"]);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(BG.length - 1, Math.max(0, Math.floor(v * BG.length)));
    setActive(i);
  });

  return (
    <section
      id="works"
      ref={ref}
      className="relative hidden lg:block"
      style={{ height: "560vh", backgroundColor: BG[active], transition: "background-color 0.8s ease" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex items-center gap-[5vw] pl-[8vw] pr-[10vw] w-max">
          <div className="w-[30vw] shrink-0">
            <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold font-medium">[ ИЗБРАННЫЕ РАБОТЫ ]</div>
            <h2 className="mt-8 font-display font-semibold uppercase leading-[1.04] text-[3.4vw]">
              Не рассказываем.
              <br />
              <span className="text-gold">Показываем.</span>
            </h2>
            <p className="mt-8 max-w-[24vw] text-[15px] md:text-[17px] leading-[1.7] text-paper/50">
              Интернет-магазины и веб-проекты, созданные Lionweb под конкретный бизнес.
            </p>
            <div className="mt-12 font-mono text-[10px] tracking-[0.3em] text-paper/30">→ SCROLL</div>
          </div>

          {PROJECTS.map((p) => (
            <Card key={p.id} p={p} />
          ))}

          <div className="w-[26vw] shrink-0">
            <a
              href="https://lionweb.kz"
              target="_blank"
              rel="noreferrer"
              data-cursor="go"
              data-testid="all-projects"
              className="font-display font-semibold uppercase text-2xl xl:text-3xl leading-tight inline-block"
            >
              <span className="text-gold">[ </span>Все проекты
              <span className="text-gold"> ↗ ]</span>
            </a>
            <p className="mt-6 text-[15px] leading-[1.7] text-paper/40 max-w-[18vw]">
              Полное портфолио — на основном сайте студии.
            </p>
          </div>
        </motion.div>

        <div className="absolute bottom-14 left-[8vw] right-[10vw] h-px bg-white/10">
          <motion.div className="h-full bg-gold origin-left" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}

function MobileGallery() {
  return (
    <section className="lg:hidden px-5 pt-24 pb-4" data-testid="portfolio-mobile">
      <FadeUp>
        <div className="font-mono text-[13px] tracking-[0.2em] text-gold font-medium">[ ИЗБРАННЫЕ РАБОТЫ ]</div>
        <h2 className="mt-6 font-display font-semibold uppercase leading-[1.06] text-3xl">
          Не рассказываем.
          <br />
          <span className="text-gold">Показываем.</span>
        </h2>
      </FadeUp>

      <div className="mt-12 space-y-16">
        {PROJECTS.map((p, i) => (
          <FadeUp key={p.id} amount={0.15}>
            <article data-testid={`project-${p.id}`}>
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
          </FadeUp>
        ))}
      </div>

      <a
        href="https://lionweb.kz"
        target="_blank"
        rel="noreferrer"
        data-testid="all-projects-mobile"
        className="mt-16 mb-8 block border border-gold/40 py-4 text-center font-mono text-sm tracking-[0.18em] text-gold active:bg-gold active:text-ink transition-colors"
      >
        [ ВСЕ ПРОЕКТЫ ↗ ]
      </a>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="relative">
      <DesktopGallery />
      <MobileGallery />
    </div>
  );
}
