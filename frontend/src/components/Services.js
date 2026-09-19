import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeUp, RevealLineInView, EASE } from "./motion-primitives";

const SERVICES = [
  { n: "01", title: "LANDING PAGE", price: "от 80 000 ₸", time: "2–4 дня", anim: "browser", desc: "Одностраничный сайт с фокусом на конверсию и быстрый запуск." },
  { n: "02", title: "КОРПОРАТИВНЫЕ САЙТЫ", price: "150 000–300 000 ₸", time: "7–14 дней", anim: "layers", desc: "Многостраничные сайты с индивидуальным дизайном под структуру компании." },
  { n: "03", title: "ИНТЕРНЕТ-МАГАЗИНЫ", price: "250 000–550 000 ₸", time: "30–40 дней", anim: "cart", desc: "E-commerce: каталог, корзина, оплата, интеграции и админ-панель." },
  { n: "04", title: "ОНЛАЙН-КАТАЛОГИ", price: "от 300 000 ₸", time: "7–14 дней", anim: "grid", desc: "Каталоги продукции с удобной навигацией и фильтрами." },
  { n: "05", title: "МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ", price: "iOS / Android", time: null, anim: "phones", desc: "Приложения для iOS и Android — от прототипа до публикации." },
  { n: "06", title: "SEO / GOOGLE / ЯНДЕКС", price: "GOOGLE / ЯНДЕКС", time: null, anim: "rank", desc: "Поисковое продвижение. 50+ сайтов Lionweb в ТОП." },
];

function ServiceAnim({ type, on }) {
  const p = (delay = 0) => ({
    animationPlayState: on ? "running" : "paused",
    animationDelay: `${delay}s`,
  });
  if (type === "browser")
    return (
      <div className="relative w-28 h-[4.5rem] border border-gold-deep/50 shrink-0">
        <div className="absolute inset-x-0 top-0 h-3.5 border-b border-gold-deep/50 flex items-center gap-1 px-1.5">
          <span className="w-1 h-1 rounded-full bg-gold-deep/80" />
          <span className="w-1 h-1 rounded-full bg-gold-deep/50" />
          <span className="w-1 h-1 rounded-full bg-gold-deep/30" />
        </div>
        <div className="absolute left-2.5 top-6 w-10 h-1 bg-gold-deep/70 origin-left" style={{ animation: "svc-grow-x 2.6s ease-in-out infinite", ...p() }} />
        <div className="absolute left-2.5 top-9 w-16 h-1 bg-ink/20" />
        <div className="absolute right-2.5 top-6 w-6 h-8 border border-gold-deep/50" style={{ animation: "svc-rise 3s ease-in-out infinite", ...p(0.3) }} />
      </div>
    );
  if (type === "layers")
    return (
      <div className="relative w-28 h-[4.5rem]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-x-4 h-6 border border-gold-deep/60"
            style={{ top: 6 + i * 15, opacity: 1 - i * 0.28, animation: "svc-rise 2.8s ease-in-out infinite", ...p(i * 0.25) }}
          />
        ))}
      </div>
    );
  if (type === "cart")
    return (
      <div className="grid grid-cols-2 gap-1.5 w-24 shrink-0">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-9 border border-gold-deep/50 p-1.5" style={{ animation: "svc-rise 2.6s ease-in-out infinite", ...p(i * 0.2) }}>
            <div className={`h-1 w-3/4 ${i === 0 ? "bg-gold-deep/70" : "bg-ink/20"}`} />
            <div className="h-1 w-1/2 bg-ink/15 mt-1" />
          </div>
        ))}
      </div>
    );
  if (type === "grid")
    return (
      <div className="flex items-end gap-1.5 h-16 shrink-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-5 origin-bottom bg-gold-deep/15 border-b border-gold-deep/70"
            style={{ height: 26 + i * 14, animation: "svc-rise 2.4s ease-in-out infinite", ...p(i * 0.3) }}
          />
        ))}
      </div>
    );
  if (type === "phones")
    return (
      <div className="flex gap-2 items-end shrink-0">
        {[0, 1].map((i) => (
          <div key={i} className="w-10 h-[4.5rem] border border-gold-deep/60 rounded-md p-1" style={{ animation: "svc-rise 3s ease-in-out infinite", ...p(i * 0.4) }}>
            <div className="h-1 w-4 bg-gold-deep/60 mx-auto rounded-full mb-1.5" />
            <div className="h-1.5 bg-ink/20 mb-1" />
            <div className="h-1.5 w-2/3 bg-ink/15" />
          </div>
        ))}
      </div>
    );
  return (
    <div className="flex flex-col justify-center gap-1.5 w-28 shrink-0">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div
            className={`h-1.5 origin-left ${i === 1 ? "bg-gold-deep" : "bg-ink/20"}`}
            style={{ width: 70 - i * 14, animation: "svc-grow-x 2.6s ease-in-out infinite", ...p(i * 0.2) }}
          />
          {i === 1 && <span className="text-gold-deep text-[9px] font-mono">↑</span>}
        </div>
      ))}
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(null);
  const reduced = useReducedMotion();

  return (
    <motion.section
      id="services"
      initial={reduced ? false : { y: 56 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 1.1, ease: EASE }}
      className="relative z-10 -mt-6 md:-mt-10 rounded-t-[2.5rem] md:rounded-t-[4rem] bg-ivory text-ink px-5 md:px-10 pt-28 md:pt-44 pb-24 md:pb-36"
    >
      <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold-deep font-medium">[ УСЛУГИ ]</div>
      <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h2 className="font-display font-semibold uppercase leading-[1.02] text-[11vw] md:text-[6.5vw]">
          <RevealLineInView>Что мы</RevealLineInView>
          <RevealLineInView delay={0.07}>
            <span className="md:pl-[8vw] inline-block">создаём</span>
          </RevealLineInView>
        </h2>
        <FadeUp delay={0.15}>
          <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-[#444444] shrink-0">06 НАПРАВЛЕНИЙ</div>
        </FadeUp>
      </div>

      <FadeUp delay={0.1} className="mt-14 md:mt-20 border-t border-b border-ink/15 divide-y divide-ink/15">
        {SERVICES.map((s, i) => {
          const open = active === i;
          return (
            <div
              key={s.n}
              role="button"
              tabIndex={0}
              data-cursor-hover
              data-testid={`service-row-${s.n}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(open ? null : i)}
              className={`transition-colors duration-500 ${open ? "bg-ink/[0.04]" : ""}`}
            >
              <div className="px-1 md:px-2 py-7 md:py-9 grid grid-cols-12 items-center gap-3 md:gap-4">
                <span className={`col-span-2 md:col-span-1 font-mono text-[13px] md:text-[15px] transition-colors duration-300 ${open ? "text-gold-deep" : "text-gold-deep"}`}>
                  {s.n}
                </span>
                <h3
                  className={`col-span-10 md:col-span-6 font-display font-semibold uppercase leading-none text-lg md:text-3xl xl:text-[2.4vw] transition-all duration-500 ${
                    open ? "text-ink md:translate-x-3" : "text-[#444444]"
                  }`}
                >
                  {s.title}
                </h3>
                <div className="hidden md:block md:col-span-2 font-mono text-[13px] md:text-[15px] text-[#444444]">{s.price}</div>
                <div className="hidden md:block md:col-span-1 font-mono text-[13px] md:text-[15px] text-[#444444]">{s.time}</div>
                <div className="hidden md:flex md:col-span-2 justify-end pr-2 opacity-80">
                  <ServiceAnim type={s.anim} on={open} />
                </div>
              </div>
              <div
                className="grid transition-[grid-template-rows] duration-500 ease-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-1 md:px-2 pb-8 md:pb-9 md:pl-[calc(8.333%+1rem)] text-[15px] md:text-[17px] leading-[1.7] text-[#444444] max-w-xl">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </FadeUp>
    </motion.section>
  );
}