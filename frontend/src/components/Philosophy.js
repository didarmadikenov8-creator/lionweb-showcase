import { FadeUp, RevealLineInView } from "./motion-primitives";

export default function Philosophy() {
  return (
    <section
      id="approach"
      className="relative z-10 -mt-6 md:-mt-10 rounded-t-[2.5rem] md:rounded-t-[4rem] bg-ivory text-ink px-5 md:px-10 pt-28 md:pt-44 pb-[18vh] md:pb-[24vh]"
    >
      <FadeUp>
        <div className="font-mono text-[13px] md:text-[15px] tracking-[0.22em] text-gold-deep font-medium">НАШ ПОДХОД</div>
      </FadeUp>

      <h2 className="mt-14 font-display font-semibold uppercase leading-[1.06] text-[9vw] md:text-[5.8vw]">
        <RevealLineInView>Сайт — это не</RevealLineInView>
        <RevealLineInView delay={0.07}>красивая картинка.</RevealLineInView>
        <span className="block h-[9vh] md:h-[13vh]" />
        <RevealLineInView delay={0.14}>Это инструмент,</RevealLineInView>
        <RevealLineInView delay={0.21}>который должен</RevealLineInView>
        <RevealLineInView delay={0.28}>
          <span className="text-gold-deep">работать.</span>
        </RevealLineInView>
      </h2>

      <FadeUp delay={0.2} className="mt-[10vh] md:mt-[14vh] font-mono text-[13px] md:text-[15px] tracking-[0.18em] text-[#444444] font-medium">
        ПРОЕКТИРУЕМ <span className="text-gold-deep">·</span> РАЗРАБАТЫВАЕМ <span className="text-gold-deep">·</span> ЗАПУСКАЕМ{" "}
        <span className="text-gold-deep">·</span> ПРОДВИГАЕМ
      </FadeUp>
    </section>
  );
}
