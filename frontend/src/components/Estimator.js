import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, Magnetic, RevealLineInView, CONTACT, EASE } from "./motion-primitives";

const TYPES = [
  { id: "landing", label: "Landing", base: 80000, time: "2–4 ДНЯ" },
  { id: "corp", label: "Корпоративный сайт", base: 150000, time: "7–14 ДНЕЙ" },
  { id: "shop", label: "Интернет-магазин", base: 250000, time: "30–40 ДНЕЙ" },
  { id: "catalog", label: "Каталог", base: 300000, time: "7–14 ДНЕЙ" },
  { id: "app", label: "Мобильное приложение", base: null, time: "iOS / ANDROID" },
];
const FEATURES = ["UI/UX", "Анимации", "CMS", "Интеграции", "SEO"];
const SPEED = [
  { id: "std", label: "Стандартно" },
  { id: "priority", label: "Приоритетно" },
];

function Chip({ selected, onClick, children, testid }) {
  return (
    <motion.button
      onClick={onClick}
      data-testid={testid}
      whileTap={{ scale: 0.95 }}
      className={`relative px-5 py-3 border font-mono text-[13px] md:text-[15px] tracking-[0.08em] uppercase transition-all duration-300 ${
        selected
          ? "bg-gold text-ink border-gold shadow-[0_0_0_3px_rgba(197,160,89,0.18)]"
          : "border-white/15 text-paper/70 hover:border-gold/60 hover:text-paper"
      }`}
    >
      {children}
      {selected && (
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute left-0 bottom-0 h-[2px] w-full bg-ink origin-left"
        />
      )}
    </motion.button>
  );
}

const fmt = (v) => v.toLocaleString("ru-RU");

function BrowserMock({ variant, anim, uiux, cms, api, seo }) {
  const p = (d = 0) => ({ animationPlayState: anim ? "running" : "paused", animationDelay: `${d}s` });
  const urls = { landing: "landing", corp: "company", shop: "shop", catalog: "catalog" };
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="h-9 border-b border-white/[0.07] flex items-center px-4 gap-1.5 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full border border-white/25" />
        <span className="w-1.5 h-1.5 rounded-full border border-white/25" />
        <span className="w-1.5 h-1.5 rounded-full border border-white/25" />
        <span className="ml-3 font-mono text-[9px] tracking-[0.15em] text-paper/35">{urls[variant] ?? "project"}.kz</span>
        {cms && (
          <span
            className="ml-auto font-mono text-[8px] tracking-[0.2em] text-gold border border-gold/40 px-2 py-[2px]"
            style={{ animation: "pv-blink 2.4s ease-in-out infinite" }}
          >
            CMS
          </span>
        )}
      </div>
      <div className="relative flex-1 p-3 md:p-4 overflow-hidden">
        {variant === "landing" && (
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-2 pt-2">
              <div className="h-3 w-2/3 bg-white/80 origin-left" style={{ animation: "svc-slide-x 3s ease-in-out infinite", ...p() }} />
              <div className="h-3 w-1/2 bg-gold/80 origin-left" style={{ animation: "svc-slide-x 3s ease-in-out infinite", ...p(0.4) }} />
              <div className="h-1.5 w-1/3 bg-white/25 mt-2" />
              <div className="h-1.5 w-1/4 bg-white/15" />
            </div>
            <div className="flex items-end justify-between gap-3 pb-1">
              <div className="grid grid-cols-3 gap-2 flex-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`h-14 border ${uiux ? "border-gold/40 bg-gold/[0.06]" : "border-white/10 bg-white/[0.04]"}`} style={{ animation: "svc-rise 2.8s ease-in-out infinite", ...p(i * 0.25) }} />
                ))}
              </div>
              <span className={`shrink-0 px-4 py-2 font-mono text-[9px] tracking-[0.15em] ${uiux ? "bg-gold text-ink" : "border border-gold/60 text-gold"}`}>
                ОСТАВИТЬ ЗАЯВКУ
              </span>
            </div>
          </div>
        )}
        {variant === "corp" && (
          <div className="h-full flex flex-col gap-2.5">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-2">
              <span className="w-8 h-1.5 bg-gold/70" />
              <div className="flex gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="h-1 w-6 bg-white/30" style={{ animation: "svc-rise 2.6s ease-in-out infinite", ...p(i * 0.2) }} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-0">
              <div className={`border ${uiux ? "border-gold/30" : "border-white/10"} bg-white/[0.03] p-2 space-y-1.5`}>
                <div className="h-10 bg-white/[0.05]" />
                <div className="h-1 w-3/4 bg-white/25" />
                <div className="h-1 w-1/2 bg-white/15" />
              </div>
              <div className="grid grid-rows-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="border border-white/10 bg-white/[0.04] flex items-center px-2 gap-2" style={{ animation: "svc-rise 2.6s ease-in-out infinite", ...p(i * 0.2) }}>
                    <span className="w-6 h-6 border border-gold/40 shrink-0" />
                    <span className="h-1 w-2/3 bg-white/20" />
                  </div>
                ))}
              </div>
            </div>
            <div className="font-mono text-[9px] tracking-[0.25em] text-paper/35 text-right">СТРАНИЦА 01 — 04</div>
          </div>
        )}
        {variant === "shop" && (
          <div className="h-full flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-2">
              <span className="h-1.5 w-16 bg-white/30" />
              <span className="h-1.5 w-10 bg-gold/60" />
            </div>
            <div className="grid grid-cols-3 gap-2 content-start flex-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`border p-2 ${i % 3 === 0 ? "border-gold/50 bg-gold/[0.06]" : "border-white/10 bg-white/[0.04]"} ${uiux ? "p-2.5" : ""}`}
                  style={{ animation: "svc-rise 2.6s ease-in-out infinite", ...p(i * 0.18) }}
                >
                  <div className={`h-8 md:h-10 ${i % 3 === 0 ? "bg-gold/25" : "bg-white/[0.06]"}`} />
                  <div className={`h-1 w-2/3 mt-1.5 ${uiux ? "bg-white/35" : "bg-white/20"}`} />
                  <div className="h-1 w-1/3 mt-1 bg-gold/60" />
                </div>
              ))}
            </div>
          </div>
        )}
        {variant === "catalog" && (
          <div className="h-full grid grid-cols-2 gap-2 content-start pt-1">
            {["КАТАЛОГ 01", "КАТАЛОГ 02", "КАТАЛОГ 03", "КАТАЛОГ 04"].map((c, i) => (
              <div key={c} className="border-b border-white/[0.08] pb-2 flex items-center justify-between gap-2" style={{ animation: "svc-slide-x 3s ease-in-out infinite", ...p(i * 0.3) }}>
                <span className="font-mono text-[8px] tracking-[0.2em] text-paper/55">{c}</span>
                <span className="h-1 w-8 bg-gold/50" />
              </div>
            ))}
            <div className="col-span-2 mt-1 h-16 border border-white/10 bg-white/[0.03] p-2 space-y-1.5">
              <div className="h-1.5 w-2/3 bg-white/25" />
              <div className="h-1.5 w-1/2 bg-white/15" />
            </div>
          </div>
        )}
        {api && (
          <div className="absolute left-4 right-4 bottom-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
            <span className="flex-1 h-px bg-white/15 relative overflow-hidden">
              <span className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold" style={{ animation: "svc-slide-x 2.6s ease-in-out infinite" }} />
            </span>
            <span className="w-1.5 h-1.5 rounded-full border border-gold/60 shrink-0" />
            <span className="flex-1 h-px bg-white/15" />
            <span className="font-mono text-[8px] tracking-[0.2em] text-gold">API</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
          </div>
        )}
        {seo && (
          <div className="absolute right-4 bottom-10 w-32 overflow-hidden pointer-events-none">
            <div className="flex items-center justify-between font-mono text-[8px] tracking-[0.15em] text-paper/45" style={{ animation: "pv-rise 3.2s ease-in-out infinite" }}>
              <span>запрос → результат</span>
              <span className="text-gold font-medium">ТОП</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PhoneMorph({ anim, uiux }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-24 md:w-28 aspect-[9/19] rounded-[1.6rem] p-[3px]"
        style={{ background: "linear-gradient(160deg,#3d3d3d,#101010 40%,#33301f 75%,#0b0b0b)" }}
      >
        <div className="w-full h-full rounded-[1.3rem] bg-[#0B0B0B] relative overflow-hidden flex flex-col gap-1.5 p-2.5">
          <div className="w-8 h-1 bg-white/40 rounded-full mx-auto" />
          <div className="h-2 w-3/4 bg-white/30" />
          <div className="h-2 w-1/2 bg-white/15" />
          <div className="flex-1 border border-gold/40 bg-gold/[0.06] p-2" style={anim ? { animation: "svc-rise 3s ease-in-out infinite" } : undefined}>
            <div className={`h-1.5 w-2/3 ${uiux ? "bg-white/40" : "bg-white/25"}`} />
            <div className="h-1 w-1/2 bg-white/15 mt-1" />
          </div>
          <div className="flex justify-around border-t border-white/10 pt-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`w-1 h-1 rounded-full ${i === 0 ? "bg-gold" : "bg-white/25"}`} style={{ animation: "pv-blink 2.4s ease-in-out infinite", animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>
          <div className="w-8 h-[3px] bg-white/30 rounded-full mx-auto" />
        </div>
      </div>
      <span className="absolute right-5 top-6 font-mono text-[8px] tracking-[0.25em] text-gold border border-gold/40 px-2 py-[2px]" style={{ animation: "pv-blink 2.4s ease-in-out infinite" }}>
        APP
      </span>
    </div>
  );
}

export default function Estimator() {
  const [type, setType] = useState(null);
  const [features, setFeatures] = useState([]);
  const [speed, setSpeed] = useState(null);

  const toggleFeature = (f) =>
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const done = [!!type, features.length > 0, !!speed];
  const doneCount = done.filter(Boolean).length;

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

  const anim = features.includes("Анимации");
  const uiux = features.includes("UI/UX");
  const cms = features.includes("CMS");
  const api = features.includes("Интеграции");
  const seo = features.includes("SEO");

  const cueLabel = [cms ? "CMS" : null, api ? "API" : null, anim ? "MOTION" : "STATIC"].filter(Boolean).join(" · ");

  return (
    <section id="estimate" className="relative z-10 -mt-6 md:-mt-10 rounded-t-[2.5rem] md:rounded-t-[4rem] bg-ink px-5 md:px-10 pt-28 md:pt-44 pb-24 md:pb-36">
      <FadeUp>
        <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold font-medium">[ РАСЧЁТ СТОИМОСТИ ]</div>
        <h2 className="mt-6 font-display font-semibold uppercase leading-[1.02] text-[11vw] md:text-[6.5vw]">
          <RevealLineInView>Сколько стоит</RevealLineInView>
          <RevealLineInView delay={0.07}>
            <span className="md:pl-[8vw] inline-block">
              ваш проект<span className="text-gold">?</span>
            </span>
          </RevealLineInView>
        </h2>
      </FadeUp>

      {/* step connector */}
      <div className="mt-12 flex items-center gap-3 max-w-md" data-testid="estimator-progress">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 flex items-center gap-3">
            <span className={`font-mono text-[13px] md:text-[15px] font-medium ${done[i] ? "text-gold" : "text-paper/30"}`}>0{i + 1}</span>
            {i < 2 && (
              <span className="flex-1 h-px bg-white/10 relative overflow-hidden">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: i < doneCount ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* configuration */}
        <FadeUp delay={0.08} className="lg:col-span-7 space-y-12">
          <div>
            <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold mb-6 font-medium">01 / ЧТО СОЗДАЁМ?</div>
            <div className="flex flex-wrap gap-2.5">
              {TYPES.map((t) => (
                <Chip key={t.id} testid={`est-type-${t.id}`} selected={type && type.id === t.id} onClick={() => setType(t)}>
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

        {/* live preview */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 relative border border-white/10 bg-coal/70" data-testid="estimator-panel">
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/60" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/60" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/60" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/60" />

            <div className="p-6 md:p-8 pb-4">
              <div className="flex items-center justify-between font-mono text-[10px] md:text-[11px] tracking-[0.25em]">
                <span className="text-gold font-medium">LIVE PROJECT</span>
                <span className="text-paper/35">{type ? cueLabel : "ОЖИДАНИЕ"}</span>
              </div>

              <div className="mt-5 relative h-[17.5rem] md:h-[19rem] border border-white/[0.07] bg-[#0D0C0A] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={type ? type.id : "none"}
                    initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.35 }}
                    animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
                    exit={{ clipPath: "inset(100% 0 0 0)", opacity: 0.35 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="absolute inset-0"
                  >
                    {type ? (
                      type.id === "app" ? (
                        <PhoneMorph anim={anim} uiux={uiux} />
                      ) : (
                        <BrowserMock variant={type.id} anim={anim} uiux={uiux} cms={cms} api={api} seo={seo} />
                      )
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-[0.3em] text-paper/30">
                        ВЫБЕРИТЕ ТИП ПРОЕКТА
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6">
                <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-paper/45 font-medium">{eyebrow}</div>
                <div className="mt-2 min-h-[3rem] flex items-center" data-testid="estimator-price">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={priceText}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                      className={`font-display font-semibold uppercase leading-none text-2xl md:text-3xl ${
                        type && type.base ? "text-paper" : "text-paper/60"
                      }`}
                    >
                      {priceText}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-4 space-y-1.5 font-mono text-[13px] md:text-[15px] tracking-[0.1em] text-paper/55 uppercase">
                  <div>{type ? type.label : "ТИП НЕ ВЫБРАН"}</div>
                  {features.length > 0 && <div>{features.join(" + ")}</div>}
                  <div>
                    {type && type.time}
                    {speed ? ` · ${speed.label.toUpperCase()}` : ""}
                  </div>
                </div>

                <p className="mt-5 text-[14px] md:text-[15px] leading-[1.7] text-paper/45">
                  Финальная стоимость зависит от объёма — точный расчёт после брифа.
                </p>

                <Magnetic className="mt-6 block" strength={0.15}>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="go"
                    data-testid="estimator-whatsapp-cta"
                    className="btn-gold w-full flex justify-between px-8 py-5"
                  >
                    ОБСУДИТЬ ПРОЕКТ <span className="arr">→</span>
                  </a>
                </Magnetic>
                <a
                  href={CONTACT.phoneHref}
                  data-testid="estimator-phone"
                  className="mt-4 block text-center font-mono text-sm md:text-[15px] tracking-[0.15em] text-paper/55 hover:text-gold transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}