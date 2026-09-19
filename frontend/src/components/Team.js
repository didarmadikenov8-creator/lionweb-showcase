import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, EASE } from "./motion-primitives";

const TEAM = [
  { name: "Садуақас Арыстан", role: "Директор", initials: "СА", tone: "#C5A059" },
  { name: "Қалауова Алуа", role: "Дизайнер", initials: "ҚА", tone: "#B0713F" },
  { name: "Барлық Манура", role: "Маркетолог", initials: "БМ", tone: "#8C6D3F" },
  { name: "Тогаев Даулет", role: "Дизайнер", initials: "ТД", tone: "#6B6B4F" },
];

/* Portrait placeholder — replace the inner content with a real photo:
   <img src="..." className="w-full h-full object-cover" alt={name} /> */
function Portrait({ m, i }) {
  return (
    <div
      className="w-full h-full relative"
      style={{ background: `radial-gradient(90% 90% at 30% 20%, ${m.tone}1F 0%, #0B0B0B 62%)` }}
    >
      <span className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.3em] text-paper/30">
        ПОРТРЕТ 0{i + 1} — ЗАМЕНИТЕ ФОТО
      </span>
      <span className="absolute top-6 right-6 w-10 h-10 border-t border-r border-gold/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display font-bold text-[24vw] lg:text-[10vw] leading-none" style={{ color: m.tone, opacity: 0.85 }}>
          {m.initials}
        </span>
      </div>
      <span className="absolute bottom-6 left-6 font-mono text-[13px] md:text-[15px] tracking-[0.15em] text-gold font-medium">
        {m.role.toUpperCase()}
      </span>
    </div>
  );
}

export default function Team() {
  const [active, setActive] = useState(0);
  const m = TEAM[active];

  return (
    <section
      id="team"
      className="relative z-10 -mt-6 md:-mt-10 rounded-t-[2.5rem] md:rounded-t-[4rem] bg-ink px-5 md:px-10 pt-28 md:pt-44 pb-24 md:pb-36"
    >
      <FadeUp>
        <div className="font-mono text-[13px] md:text-[15px] tracking-[0.2em] text-gold font-medium">[ КОМАНДА ]</div>
        <h2 className="mt-6 font-display font-semibold uppercase leading-[1.02] text-[11vw] md:text-[6.5vw]">
          Люди
          <br />
          <span className="md:pl-[8vw] inline-block">за проектами.</span>
        </h2>
      </FadeUp>

      <div className="mt-14 md:mt-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
        <div className="relative h-[70vw] sm:h-[55vh] lg:h-[68vh] border border-white/[0.06] bg-[#0C0B09] overflow-hidden" data-testid="team-portrait">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-display font-extrabold uppercase text-[17vw] lg:text-[8.5vw] leading-none text-outline-paper tracking-[0.04em]">
              LIONWEB
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Portrait m={m} i={active} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="border-t border-white/10 self-start">
          {TEAM.map((t, i) => (
            <button
              key={t.name}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              data-testid={`team-name-${i}`}
              className="w-full text-left border-b border-white/10 py-6 lg:py-9 flex items-baseline gap-5"
            >
              <span className={`font-mono text-[13px] transition-colors duration-300 ${active === i ? "text-gold" : "text-paper/30"}`}>
                0{i + 1}
              </span>
              <span
                className={`font-display font-semibold uppercase text-xl sm:text-2xl lg:text-4xl transition-all duration-300 ${
                  active === i ? "text-paper md:translate-x-2" : "text-paper/45"
                }`}
              >
                {t.name}
              </span>
              <span className="ml-auto font-mono text-[12px] md:text-[14px] tracking-[0.12em] text-paper/45 text-right">
                {t.role.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
