import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, Magnetic, CONTACT, EASE } from "./motion-primitives";

const TYPES = [
  { id: "landing", label: "Landing", base: 80000 },
  { id: "corp", label: "Корпоративный сайт", base: 150000 },
  { id: "shop", label: "Интернет-магазин", base: 250000 },
  { id: "catalog", label: "Каталог", base: 300000 },
  { id: "app", label: "Мобильное приложение", base: null },
];
const FEATURES = ["UI/UX", "Анимации", "CMS", "Интеграции", "SEO"];
const SPEED = [
  { id: "std", label: "Стандартно" },
  { id: "priority", label: "Приоритетно" },
];

function Chip({ selected, onClick, children, testid }) {
  return (
    <button
      onClick={onClick}
      data-testid={testid}
      className={`px-5 py-3 border font-mono text-[13px] md:text-[15px] tracking-[0.08em] uppercase transition-all duration-300 ${
        selected
          ? "bg-gold text-ink border-gold"
          : "border-white/15 text-paper/70 hover:border-gold/60 hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

const fmt = (v) => v.toLocaleString("ru-RU");

export default function Estimator() {
  const [type, setType] = useState(null);
  const [features, setFeatures] = useState([]);
  const [speed, setSpeed] = useState(null);

  const toggleFeature = (f) =>
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const priceText = !type ? "ВЫБЕРИТЕ ТИП ПРОЕКТА" : type.base ? `ОТ ${fmt(type.base)} ₸` : "ТРЕБУЕТ ОЦЕНКИ";
  const eyebrow = !type ? "ОРИЕНТИР" : type.base ? "ОРИЕНТИР" : "СТОИМОСТЬ";

  const msg = [
    "Здравствуйте! Хочу обсудить проект.",
    type ? `Тип: ${type.label}` : null,
    features.length ? `Задачи: ${features.join(", ")}` : null,
    speed ? `Запуск: ${speed.label}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  const waHref = `${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

  return (
    <section
      id="estimate"
      className="relative z-10 -mt-6 md:-mt-10 rounded-t-[2.5rem] md:rounded-t-[4rem] bg-ink px-5 md:px-10 pt-28 md:pt-44 pb-24 md:pb-36"
    >
      <FadeUp>
        <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold font-medium">[ РАСЧЁТ СТОИМОСТИ ]</div>
        <h2 className="mt-6 font-display font-semibold uppercase leading-[1.02] text-[11vw] md:text-[6.5vw]">
          Сколько стоит
          <br />
          <span className="md:pl-[8vw] inline-block">
            ваш проект<span className="text-gold">?</span>
          </span>
        </h2>
      </FadeUp>

      <div className="mt-14 md:mt-20 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* steps */}
        <FadeUp delay={0.08} className="lg:col-span-7 space-y-12">
          <div>
            <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold mb-6 font-medium">01 / ЧТО СОЗДАЁМ?</div>
            <div className="flex flex-wrap gap-2.5">
              {TYPES.map((t) => (
                <Chip
                  key={t.id}
                  testid={`est-type-${t.id}`}
                  selected={type && type.id === t.id}
                  onClick={() => setType(t)}
                >
                  {t.label}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold mb-6 font-medium">02 / ЧТО НЕОБХОДИМО?</div>
            <div className="flex flex-wrap gap-2.5">
              {FEATURES.map((f) => (
                <Chip
                  key={f}
                  testid={`est-feat-${f.toLowerCase().replace("/", "").trim()}`}
                  selected={features.includes(f)}
                  onClick={() => toggleFeature(f)}
                >
                  {f}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold mb-6 font-medium">03 / КОГДА ЗАПУСК?</div>
            <div className="flex flex-wrap gap-2.5">
              {SPEED.map((s) => (
                <Chip key={s.id} testid={`est-speed-${s.id}`} selected={speed && speed.id === s.id} onClick={() => setSpeed(s)}>
                  {s.label}
                </Chip>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* readout */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 relative border border-white/10 bg-coal/70 p-8 md:p-10" data-testid="estimator-panel">
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/60" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/60" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/60" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/60" />

            <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-paper/45 font-medium">{eyebrow}</div>
            <div className="mt-5 min-h-[4.5rem] md:min-h-[5rem] flex items-center" data-testid="estimator-price">
              <AnimatePresence mode="wait">
                <motion.div
                  key={priceText}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className={`font-display font-semibold uppercase leading-none text-3xl md:text-4xl ${
                    type && type.base ? "text-paper" : "text-paper/60"
                  }`}
                >
                  {priceText}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 space-y-2 font-mono text-[13px] md:text-[15px] tracking-[0.08em] text-paper/50 uppercase">
              {type && <div>{type.label}</div>}
              {features.length > 0 && <div>{features.join(" · ")}</div>}
              {speed && <div>Запуск: {speed.label}</div>}
            </div>

            <p className="mt-6 text-[14px] md:text-[15px] leading-[1.7] text-paper/45">
              Финальная стоимость зависит от объёма — точный расчёт после брифа.
            </p>

            <Magnetic className="mt-8 block" strength={0.15}>
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                data-cursor="go"
                data-testid="estimator-whatsapp-cta"
                className="btn-gold w-full flex justify-between px-8 py-5"
              >
                ПОЛУЧИТЬ ТОЧНЫЙ РАСЧЁТ В WHATSAPP <span className="arr">↗</span>
              </a>
            </Magnetic>
            <a
              href={CONTACT.phoneHref}
              data-testid="estimator-phone"
              className="mt-5 block text-center font-mono text-sm md:text-[15px] tracking-[0.15em] text-paper/55 hover:text-gold transition-colors"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
