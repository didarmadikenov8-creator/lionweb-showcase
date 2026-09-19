import { useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Magnetic, scrollToHash, CONTACT, EASE } from "./motion-primitives";

const LINKS = [
  { label: "Проекты", hash: "#works" },
  { label: "Услуги", hash: "#services" },
  { label: "Команда", hash: "#team" },
  { label: "О нас", hash: "#about" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  const go = (hash) => (e) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToHash(hash), open ? 250 : 0);
  };

  const toTop = (e) => {
    e.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[160] transition-all duration-500 ${
          scrolled
            ? "mx-3 md:mx-5 mt-3 md:mt-4 bg-coal/80 backdrop-blur-md border border-white/[0.06]"
            : "mx-0 mt-0 bg-transparent border border-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-5 md:px-8 ${
            scrolled ? "py-3" : "py-5 md:py-6"
          }`}
        >
          <a
            href="/"
            onClick={toTop}
            data-testid="nav-logo"
            className="font-display font-semibold text-base md:text-lg tracking-[0.08em] uppercase"
          >
            LIONWEB<span className="text-gold">®</span>
            <span className="text-paper/35 hidden sm:inline">.KZ</span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {LINKS.map((l) => (
              <Magnetic key={l.hash} strength={0.25}>
                <a
                  href={l.hash}
                  onClick={go(l.hash)}
                  data-testid={`nav-link-${l.hash.slice(1)}`}
                  className="link-line font-body text-[15px] uppercase tracking-[0.1em] text-paper/65 hover:text-paper transition-colors duration-300"
                >
                  {l.label}
                </a>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Magnetic strength={0.25}>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                data-cursor="go"
                data-testid="nav-cta"
                className="hidden sm:inline-flex font-mono text-[12px] md:text-[15px] tracking-[0.12em] text-gold border border-gold/40 px-4 py-2.5 hover:bg-gold hover:text-ink transition-colors duration-300"
              >
                [ ОБСУДИТЬ ПРОЕКТ ↗ ]
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen(!open)}
              data-testid="nav-burger"
              aria-label="Меню"
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-white/15"
            >
              <span
                className={`w-5 h-px bg-paper transition-transform duration-300 ${open ? "rotate-45 translate-y-[3.5px]" : ""}`}
              />
              <span
                className={`w-5 h-px bg-paper transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[3px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[150] bg-ink/[0.985] flex flex-col justify-center px-8"
          >
            <div className="space-y-2">
              {LINKS.map((l, i) => (
                <a
                  key={l.hash}
                  href={l.hash}
                  onClick={go(l.hash)}
                  data-testid={`mobile-nav-${l.hash.slice(1)}`}
                  className="flex items-baseline gap-4 py-3 font-display font-semibold uppercase text-4xl text-paper/85 active:text-gold"
                >
                  <span className="font-mono text-[13px] text-gold">0{i + 1}</span>
                  {l.label}
                </a>
              ))}
            </div>
            <div className="mt-14 pt-8 border-t border-white/10 space-y-3.5 font-mono text-sm tracking-[0.15em]">
              <a href={CONTACT.phoneHref} className="block text-paper/70">
                {CONTACT.phone}
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="block text-gold">
                WHATSAPP ↗
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="block text-paper/70">
                INSTAGRAM ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
