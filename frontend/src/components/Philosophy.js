import { FadeUp, RevealLineInView } from "./motion-primitives";

export default function Philosophy() {
  return (
    <section id="approach" className="px-5 md:px-10 py-[20vh] md:py-[28vh]">
      <FadeUp>
        <div className="font-mono text-[10px] tracking-[0.35em] text-gold">НАШ ПОДХОД</div>
      </FadeUp>

      <h2 className="mt-14 font-display font-semibold uppercase leading-[1.06] text-[9vw] md:text-[5.8vw]">
        <RevealLineInView>Сайт — это не</RevealLineInView>
        <RevealLineInView delay={0.07}>красивая картинка.</RevealLineInView>
        <span className="block h-[9vh] md:h-[13vh]" />
        <RevealLineInView delay={0.14}>Это инструмент,</RevealLineInView>
        <RevealLineInView delay={0.21}>который должен</RevealLineInView>
        <RevealLineInView delay={0.28}>
          <span className="text-gold">работать.</span>
        </RevealLineInView>
      </h2>

      <FadeUp delay={0.2} className="mt-[10vh] md:mt-[14vh] font-mono text-[10px] md:text-xs tracking-[0.3em] text-paper/50">
        ПРОЕКТИРУЕМ <span className="text-gold">·</span> РАЗРАБАТЫВАЕМ <span className="text-gold">·</span> ЗАПУСКАЕМ{" "}
        <span className="text-gold">·</span> ПРОДВИГАЕМ
      </FadeUp>
    </section>
  );
}
