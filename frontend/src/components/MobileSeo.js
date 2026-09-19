import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FadeUp, CountUp, useIsDesktop, EASE } from "./motion-primitives";

const QUERIES = ["интернет-магазин", "корпоративный сайт", "SEO продвижение"];

function MiniShot({ variant }) {
  return (
    <div className="w-12 md:w-[3.6rem] h-24 md:h-28 rounded-md border border-white/10 bg-[#101010] overflow-hidden shrink-0">
      {variant === "ios" ? (
        <div className="h-full flex flex-col gap-1 p-1.5">
          <div className="h-1.5 w-2/3 bg-gold/70 rounded-sm" />
          <div className="h-7 rounded-sm border border-white/10 bg-white/[0.04]" />
          <div className="grid grid-cols-2 gap-1 flex-1">
            <div className="rounded-sm bg-white/[0.06]" />
            <div className="rounded-sm bg-white/[0.06]" />
            <div className="rounded-sm bg-gold/30" />
            <div className="rounded-sm bg-white/[0.06]" />
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col gap-1 p-1.5">
          <div className="h-7 rounded-sm bg-gold/25 border border-gold/30" />
          <div className="h-1.5 w-3/4 bg-white/20 rounded-sm" />
          <div className="h-1.5 w-1/2 bg-white/10 rounded-sm" />
          <div className="grid grid-cols-2 gap-1 flex-1">
            <div className="rounded-sm bg-white/[0.06]" />
            <div className="rounded-sm bg-white/[0.06]" />
          </div>
          <div className="h-3 rounded-sm border border-white/15 flex items-center justify-around px-1">
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span className="w-1 h-1 rounded-full bg-white/25" />
            <span className="w-1 h-1 rounded-full bg-white/25" />
          </div>
        </div>
      )}
    </div>
  );
}

function PhoneFrame({ android, children, floatDelay }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      animate={reduced ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
      className="relative w-[8.5rem] md:w-40 shrink-0"
      style={{ filter: "drop-shadow(0 34px 34px rgba(0,0,0,0.55))" }}
    >
      <div
        className={`relative p-[3px] ${android ? "rounded-[1.9rem] md:rounded-[2.2rem]" : "rounded-[2.4rem] md:rounded-[2.8rem]"}`}
        style={{
          background: android
            ? "linear-gradient(150deg, #3a3f45, #0d0f11 45%, #23262b 78%, #08090a)"
            : "linear-gradient(160deg, #3d3d3d, #101010 38%, #33301f 72%, #0b0b0b)",
        }}
      >
        {android ? (
          <>
            <span className="absolute -left-[2px] top-12 w-[2px] h-6 bg-[#2b2f33] rounded-full" />
            <span className="absolute -right-[2px] top-16 w-[2px] h-9 bg-[#2b2f33] rounded-full" />
          </>
        ) : (
          <>
            <span className="absolute -left-[2px] top-14 w-[2px] h-7 bg-[#2b2b2b] rounded-full" />
            <span className="absolute -left-[2px] top-[5.5rem] w-[2px] h-9 bg-[#2b2b2b] rounded-full" />
            <span className="absolute -right-[2px] top-20 w-[2px] h-12 bg-[#2b2b2b] rounded-full" />
          </>
        )}
        <div
          className={`relative w-full aspect-[9/19] bg-[#0B0B0B] overflow-hidden ${
            android ? "rounded-[1.7rem] md:rounded-[2rem]" : "rounded-[2.25rem] md:rounded-[2.6rem]"
          }`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function StatusBar({ time, android }) {
  return (
    <div className={`relative z-10 flex items-center justify-between px-4 pt-2 ${android ? "pt-2.5" : ""}`}>
      <span className="text-[7px] md:text-[8px] text-white/80 font-medium">{time}</span>
      <span className="flex items-end gap-[2px]">
        <span className="w-[3px] h-[4px] bg-white/60 rounded-[1px]" />
        <span className="w-[3px] h-[6px] bg-white/60 rounded-[1px]" />
        <span className="w-[3px] h-[8px] bg-white/70 rounded-[1px]" />
      </span>
    </div>
  );
}

function AppStoreScreen() {
  return (
    <div className="relative h-full flex flex-col font-body" data-testid="phone-ios">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 md:w-16 h-3.5 md:h-4 bg-black rounded-full z-20" />
      <StatusBar time="9:41" />
      <div className="px-3 pt-2.5 pb-1 flex items-center justify-between">
        <span className="text-[7px] md:text-[8px] font-semibold text-[#0A84FF]">‹ Магазин</span>
        <span className="w-3.5 h-3.5 rounded-full bg-[#0A84FF]/80" />
      </div>
      <div className="px-3 mt-1 flex items-start gap-2">
        <div
          className="w-9 md:w-10 h-9 md:h-10 rounded-[9px] shrink-0 flex items-center justify-center"
          style={{ background: "linear-gradient(145deg,#D8BC7E,#8F6B2E)" }}
        >
          <span className="font-display font-bold text-[12px] md:text-sm text-[#0A0A0A]">L</span>
        </div>
        <div className="min-w-0">
          <div className="text-[9px] md:text-[10px] font-semibold text-white leading-tight">LION MARKET</div>
          <div className="text-[7px] md:text-[8px] text-white/50">Интернет-магазин</div>
          <div className="text-[7px] md:text-[8px] text-white/50">Lionweb Studio</div>
        </div>
      </div>
      <div className="px-3 mt-2 flex items-center gap-3 text-[7px] md:text-[8px] text-white/50">
        <span>
          <span className="text-white font-semibold">4,9</span> ★
        </span>
        <span>4+</span>
        <span>#1 Покупки</span>
      </div>
      <div className="px-3 mt-2">
        <span className="inline-block bg-[#0A84FF] text-white text-[8px] md:text-[9px] font-semibold rounded-full px-4 py-[3px] tracking-[0.08em]">
          GET
        </span>
      </div>
      <div className="px-3 mt-3 flex gap-1.5 overflow-hidden">
        <MiniShot variant="ios" />
        <MiniShot variant="ios" />
      </div>
      <div className="px-3 mt-3 space-y-1">
        <div className="h-[3px] w-3/4 bg-white/20 rounded" />
        <div className="h-[3px] w-full bg-white/10 rounded" />
        <div className="h-[3px] w-2/3 bg-white/10 rounded" />
      </div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-14 h-[3px] bg-white/35 rounded-full" />
    </div>
  );
}

function PlayScreen() {
  return (
    <div className="relative h-full flex flex-col font-body" data-testid="phone-android">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-black rounded-full border border-white/10 z-20" />
      <StatusBar time="14:20" android />
      <div className="px-3 pt-2.5 pb-1 flex items-center justify-between">
        <span className="text-[8px] text-white/70">‹</span>
        <span className="w-3 h-3 rounded-full border border-white/25" />
      </div>
      <div className="px-3 mt-1 flex items-start gap-2">
        <div
          className="w-9 md:w-10 h-9 md:h-10 rounded-[7px] shrink-0 flex items-center justify-center"
          style={{ background: "linear-gradient(145deg,#D8BC7E,#8F6B2E)" }}
        >
          <span className="font-display font-bold text-[12px] md:text-sm text-[#0A0A0A]">L</span>
        </div>
        <div className="min-w-0">
          <div className="text-[9px] md:text-[10px] font-semibold text-white leading-tight">LION MARKET</div>
          <div className="text-[7px] md:text-[8px] text-[#8AB4A8]">Lionweb Studio</div>
          <div className="text-[7px] md:text-[8px] text-white/40">Contains ads · In-app purchases</div>
        </div>
      </div>
      <div className="px-3 mt-2 flex items-center gap-3 text-[7px] md:text-[8px] text-white/50">
        <span>
          <span className="text-white font-semibold">4,8</span> ★
        </span>
        <span>12 МБ</span>
        <span className="text-[#188038] font-semibold">Установлено 100 тыс.+</span>
      </div>
      <div className="px-3 mt-2 flex items-center gap-2">
        <span className="inline-block bg-[#188038] text-white text-[8px] md:text-[9px] font-semibold rounded-md px-4 py-[4px] tracking-[0.04em]">
          Установить
        </span>
        <span className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-white/50 text-[9px]">▾</span>
      </div>
      <div className="px-3 mt-3 flex gap-1.5 overflow-hidden">
        <MiniShot variant="android" />
        <MiniShot variant="android" />
      </div>
      <div className="px-3 mt-3 space-y-1">
        <div className="h-[3px] w-full bg-white/10 rounded" />
        <div className="h-[3px] w-5/6 bg-white/10 rounded" />
        <div className="h-[3px] w-2/3 bg-white/[0.07] rounded" />
      </div>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-white/25 rounded-full" />
    </div>
  );
}

function IphoneMock() {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-5">
      <PhoneFrame floatDelay={0}>
        <AppStoreScreen />
      </PhoneFrame>
      <div className="font-body text-[13px] md:text-[15px] text-paper/70" data-testid="label-appstore">
        Доступно в App Store
      </div>
    </div>
  );
}

function AndroidMock() {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-5">
      <PhoneFrame android floatDelay={1}>
        <PlayScreen />
      </PhoneFrame>
      <div className="font-body text-[13px] md:text-[15px] text-paper/70" data-testid="label-googleplay">
        Доступно в Google Play
      </div>
    </div>
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
          <div className="mt-12 flex items-end gap-6 md:gap-12">
            <IphoneMock />
            <AndroidMock />
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
