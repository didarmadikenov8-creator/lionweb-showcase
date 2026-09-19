const ITEMS = ["СОЗДАНИЕ САЙТОВ", "ИНТЕРНЕТ-МАГАЗИНЫ", "МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ", "SEO — GOOGLE / ЯНДЕКС"];

export default function Marquee() {
  return (
    <section className="border-y border-white/[0.07] py-6 md:py-9 overflow-hidden" data-testid="marquee">
      <div className="marquee-track flex whitespace-nowrap w-max" style={{ animation: "marquee-x 46s linear infinite" }}>
        {[0, 1].map((dup) => (
          <div key={dup} aria-hidden={dup === 1} className="flex items-center shrink-0">
            {ITEMS.map((t, i) => (
              <span key={i} className="flex items-center font-display font-semibold uppercase text-3xl md:text-5xl lion-gold-outline">
                <span className="px-6 md:px-10">{t}</span>
                <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gold/60 rotate-45 shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
