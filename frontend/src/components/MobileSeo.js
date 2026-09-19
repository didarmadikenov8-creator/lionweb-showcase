import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FadeUp, CountUp, useIsDesktop, EASE } from "./motion-primitives";

const QUERIES = ["интернет-магазин", "корпоративный сайт", "SEO продвижение"];

function Phone({ delay }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      animate={reduced ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
      className="w-28 md:w-36 h-56 md:h-72 border border-white/15 rounded-[1.6rem] p-2 bg-coal"
    >
      <div className="w-full h-full rounded-[1.15rem] border border-white/[0.07] p-3 flex flex-col gap-2 overflow-hidden">
        <div className="w-8 h-1 bg-gold/60 rounded-full mx-auto" />
        <div className="h-2 w-3/4 bg-white/15" />
        <div className="h-2 w-1/2 bg-white/10" />
        <div className="mt-auto space-y-2">
          <div className="h-9 border border-gold/30" />
          <div className="h-2 w-2/3 bg-white/10" />
          <div className="h-2 w-1/3 bg-white/[0.07]" />
        </div>
      </div>
    </motion.div>
  );
}

export default function MobileSeo() {
  const ref = useRef(null);
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xL = useTransform(scrollYProgress, [0, 0.5, 1], ["-2vw", "7vw", "0vw"]);
  const xR = useTransform(scrollYProgress, [0, 0.5, 1], ["2vw", "-7vw", "0vw"]);

  return (
    <section id="apps" ref={ref} className="relative px-5 md:px-10 py-24 md:py-40 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-16 md:gap-8 relative">
        {/* MOBILE */}
        <motion.div style={{ x: isDesktop && !reduced ? xL : 0 }} className="relative z-10">
          <FadeUp>
            <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold font-medium">01 — MOBILE</div>
            <h2 className="mt-5 font-display font-semibold uppercase leading-[1.04] text-4xl md:text-[3.6vw]">
              Мобильные
              <br />
              приложения
            </h2>
            <div className="mt-5 font-mono text-[13px] md:text-[15px] tracking-[0.22em] text-gold">iOS / ANDROID</div>
            <p className="mt-8 text-[15px] md:text-[17px] leading-[1.7] text-paper/55 max-w-md">
              Проектируем и разрабатываем приложения — от интерфейса до публикации в App Store и Google Play.
            </p>
          </FadeUp>
          <div className="mt-12 flex gap-6">
            <Phone delay={0} />
            <Phone delay={0.8} />
          </div>
        </motion.div>

        {/* SEO */}
        <motion.div style={{ x: isDesktop && !reduced ? xR : 0 }} className="md:text-right md:mt-32">
          <FadeUp>
            <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold font-medium">02 — SEO</div>
            <h2 className="mt-5 font-display font-semibold uppercase leading-[1.04] text-4xl md:text-[3.6vw]">
              Ваш бизнес
              <br />
              должны находить.
            </h2>
            <div className="mt-6 font-display font-semibold text-3xl md:text-5xl">
              GOOGLE <span className="text-gold">/</span> ЯНДЕКС
            </div>
          </FadeUp>

          <div className="mt-12 text-left md:text-right" data-testid="seo-queries">
            {QUERIES.map((q, i) => (
              <div key={q} className="flex items-center gap-4 py-4 border-b border-white/[0.07]">
                <span className="font-mono text-[13px] md:text-[15px] text-paper/55 w-40 md:w-48 shrink-0 truncate text-left">{q}</span>
                <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gold"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.25, ease: EASE }}
                  />
                </div>
                <span className="font-mono text-[12px] md:text-[14px] tracking-[0.15em] text-gold shrink-0 font-medium">ТОП</span>
              </div>
            ))}
          </div>

          <FadeUp delay={0.15} className="mt-14">
            <div className="font-display font-semibold text-7xl md:text-8xl leading-none">
              <CountUp value={50} suffix="+" />
            </div>
            <div className="mt-4 font-mono text-[13px] md:text-[15px] tracking-[0.18em] text-paper/50 font-medium">
              САЙТОВ В ТОП GOOGLE И ЯНДЕКС
            </div>
          </FadeUp>
        </motion.div>
      </div>
    </section>
  );
}
