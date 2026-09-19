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
      className="relative overflow-hidden px-5 md:px-10 py-28 md:py-44 transition-colors duration-1000"
      style={{ backgroundColor: inView ? "#130E07" : "#080808" }}
    >
      <div className="absolute right-[-14vw] top-1/2 -translate-y-1/2 w-[52vw] pointer-events-none opacity-70">
        <GoldGeometry mirrored />
      </div>

      <div className="relative z-10">
        <div className="font-mono text-[10px] tracking-[0.35em] text-gold">[ СВЯЗАТЬСЯ ]</div>
        <h2 className="mt-10 font-display font-semibold uppercase leading-[1.0] text-[12.5vw] md:text-[8.5vw]">
          <RevealLineInView>Есть проект?</RevealLineInView>
          <RevealLineInView delay={0.08}>Давайте сделаем</RevealLineInView>
          <RevealLineInView delay={0.16}>
            его <span className="text-gold">сильным.</span>
          </RevealLineInView>
        </h2>

        <div className="mt-14 flex flex-col md:flex-row md:items-center gap-7 md:gap-12">
          <Magnetic>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-cursor="go"
              data-testid="final-cta"
              className="inline-flex items-center gap-4 bg-gold text-ink px-9 py-5 font-mono text-[11px] tracking-[0.2em] hover:bg-gold-light transition-colors duration-300"
            >
              [ ОБСУДИТЬ ПРОЕКТ ↗ ]
            </a>
          </Magnetic>
          <div className="flex items-center gap-8 font-mono text-xs tracking-[0.15em]">
            <a href={CONTACT.phoneHref} data-testid="final-phone" className="text-paper/70 hover:text-gold transition-colors">
              {CONTACT.phone}
            </a>
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
