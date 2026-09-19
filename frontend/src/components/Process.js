import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FadeUp } from "./motion-primitives";

const STEPS = [
  { n: "01", title: "Аналитика", desc: "Погружаемся в бизнес, рынок и задачи." },
  { n: "02", title: "Структура", desc: "Проектируем логику и карту сайта." },
  { n: "03", title: "Индивидуальный дизайн", desc: "Дизайн под конкретный бизнес — не шаблон." },
  { n: "04", title: "Разработка", desc: "Чистый код и адаптивность на всех устройствах." },
  { n: "05", title: "Тестирование", desc: "Проверяем сценарии, скорость и интерфейс." },
  { n: "06", title: "Запуск", desc: "Публикуем проект и подключаем аналитику." },
  { n: "07", title: "Продвижение", desc: "SEO и рост в Google и Яндекс." },
];

function Step({ s, i }) {
  const ref = useRef(null);
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const left = i % 2 === 0;
  return (
    <div ref={ref} className="relative md:grid md:grid-cols-2 py-8 md:py-12" data-testid={`process-step-${i + 1}`}>
      <span
        className="absolute left-0 md:left-1/2 top-[2.6rem] md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full border transition-colors duration-500"
        style={{
          borderColor: active ? "#C5A059" : "rgba(10,10,10,0.3)",
          backgroundColor: active ? "#C5A059" : "transparent",
        }}
      />
      <div className={`pl-8 md:pl-0 ${left ? "md:col-start-1 md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}>
        <div className={`font-mono text-[13px] md:text-[15px] tracking-[0.2em] font-medium transition-colors duration-500 ${active ? "text-gold-deep" : "text-[#444444]"}`}>
          {s.n} /
        </div>
        <h3 className={`mt-2.5 font-display font-semibold uppercase text-xl md:text-3xl transition-colors duration-500 ${active ? "text-ink" : "text-[#444444]"}`}>
          {s.title}
        </h3>
        <p className={`mt-3 text-[15px] md:text-[17px] leading-[1.7] max-w-md transition-colors duration-500 ${left ? "md:ml-auto" : ""} ${active ? "text-[#3A3833]" : "text-[#444444]"}`}>
          {s.desc}
        </p>
      </div>
    </div>
  );
}

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="relative z-10 -mt-6 md:-mt-10 rounded-t-[2.5rem] md:rounded-t-[4rem] bg-ivory text-ink px-5 md:px-10 pt-28 md:pt-44 pb-24 md:pb-36"
    >
      <FadeUp>
        <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold-deep font-medium">[ ПРОЦЕСС ]</div>
        <h2 className="mt-6 font-display font-semibold uppercase leading-[1.02] text-[11vw] md:text-[6.5vw]">
          От идеи
          <br />
          <span className="md:pl-[8vw] inline-block">
            до запуска<span className="text-gold-deep">.</span>
          </span>
        </h2>
      </FadeUp>

      <div ref={ref} className="relative mt-16 md:mt-24">
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-ink/10" />
        <motion.div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gold origin-top" style={{ scaleY }} />
        <div className="divide-y divide-ink/[0.08]">
          {STEPS.map((s, i) => (
            <Step key={s.n} s={s} i={i} />
          ))}
        </div>
      </div>

      <FadeUp className="mt-[8vh] md:mt-[10vh] md:text-right">
        <p className="font-display font-semibold uppercase leading-snug text-lg md:text-3xl">
          <span className="text-gold-deep">Не шаблон.</span> <span className="text-[#444444]">Не конструкторское мышление.</span>
          <br />
          <span className="text-ink">Дизайн под конкретный бизнес.</span>
        </p>
      </FadeUp>
    </section>
  );
}
