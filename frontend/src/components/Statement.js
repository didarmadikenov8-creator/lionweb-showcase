import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeUp, CountUp, EASE } from "./motion-primitives";

const SENTENCE = [
  { w: "МЫ" },
  { w: "НЕ" },
  { w: "ПРОСТО" },
  { w: "ДЕЛАЕМ" },
  { w: "САЙТЫ." },
  { br: true },
  { w: "МЫ" },
  { w: "СОЗДАЁМ" },
  { w: "ЦИФРОВУЮ", gold: true },
  { w: "СРЕДУ", gold: true },
  { w: "ДЛЯ" },
  { w: "БИЗНЕСА." },
];

const METRICS = [
  { value: 250, suffix: "+", label: "РЕАЛИЗОВАННЫХ ПРОЕКТОВ" },
  { value: 200, suffix: "+", label: "КЛИЕНТОВ" },
  { value: 50, suffix: "+", label: "САЙТОВ В ТОП GOOGLE И ЯНДЕКС" },
];

function Word({ progress, range, gold, children }) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  const color = useTransform(progress, range, gold ? ["#57503F", "#C5A059"] : ["#57503F", "#F3F0E9"]);
  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.26em]">
      {children}
    </motion.span>
  );
}

export default function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.5"] });
  const words = SENTENCE.filter((s) => !s.br);
  const n = words.length;
  let wi = -1;

  return (
    <section id="about" className="px-5 md:px-10 py-[16vh] md:py-[22vh]">
      <div ref={ref}>
        <p className="font-display font-semibold uppercase leading-[1.12] text-[7.6vw] md:text-[5vw] max-w-[94vw] md:max-w-[72vw]">
          {SENTENCE.map((s, i) => {
            if (s.br) return <br key={i} />;
            wi += 1;
            return (
              <Word key={i} progress={scrollYProgress} range={[wi / n, Math.min(1, (wi + 1.2) / n)]} gold={s.gold}>
                {s.w}
              </Word>
            );
          })}
        </p>
      </div>

      <div className="mt-[12vh] md:mt-[16vh] border-t border-white/10" data-testid="metrics">
        {METRICS.map((m) => (
          <FadeUp
            key={m.label}
            className="relative grid grid-cols-12 items-baseline gap-4 border-b border-white/10 py-8 md:py-12"
          >
            <div className="col-span-7 md:col-span-5 font-display font-semibold text-6xl md:text-8xl leading-none">
              <CountUp value={m.value} suffix={m.suffix} />
            </div>
            <div className="col-span-5 md:col-span-7 text-right font-mono text-[12px] md:text-[15px] tracking-[0.18em] text-paper/50 font-medium">
              {m.label}
            </div>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-gold origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.8, ease: EASE }}
            />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
