import { useRef } from "react";
import { useInView } from "framer-motion";
import GoldGeometry from "./GoldGeometry";
import { Magnetic, RevealLineInView, CONTACT } from "./motion-primitives";

export default function FinalCta() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 -mt-6 md:-mt-10 rounded-t-[2.5rem] md:rounded-t-[4rem] overflow-hidden flex flex-col justify-center min-h-[100svh] px-5 md:px-10 pt-28 md:pt-32 pb-16 md:pb-20 transition-colors duration-1000"
      style={{ backgroundColor: inView ? "#130E07" : "#080808" }}
    >
      <div className="absolute right-[-16vw] top-1/2 -translate-y-1/2 w-[48vw] pointer-events-none opacity-60">
        <GoldGeometry mirrored />
      </div>

      <div className="relative z-10">
        <div className="font-mono text-[13px] md:text-[15px] tracking-[0.22em] text-gold font-medium">[ СВЯЗАТЬСЯ ]</div>
        <h2 className="mt-8 md:mt-10 font-display font-semibold uppercase leading-[0.98] text-[12.5vw] md:text-[9.5vw]">
          <RevealLineInView>Есть проект?</RevealLineInView>
          <RevealLineInView delay={0.07}>Давайте</RevealLineInView>
          <RevealLineInView delay={0.14}>сделаем его</RevealLineInView>
          <RevealLineInView delay={0.21}>
            <span className="text-gold">сильным.</span>
          </RevealLineInView>
        </h2>

        <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <Magnetic>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-cursor="go"
              data-testid="final-cta"
              className="inline-flex items-center gap-4 bg-gold text-ink px-10 md:px-12 py-5 md:py-6 font-mono text-[13px] md:text-[15px] tracking-[0.12em] hover:bg-gold-light transition-colors duration-300"
            >
              ОБСУДИТЬ ПРОЕКТ <span>↗</span>
            </a>
          </Magnetic>
          <div className="flex items-center gap-6 md:gap-8 font-mono text-[14px] md:text-[16px] tracking-[0.08em]">
            <a href={CONTACT.phoneHref} data-testid="final-phone" className="text-paper/70 hover:text-gold transition-colors">
              +7 747 274 6859
            </a>
            <span className="w-6 h-px bg-gold/50 hidden md:block" />
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-testid="final-whatsapp"
              className="text-paper/70 hover:text-gold transition-colors"
            >
              WHATSAPP ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
