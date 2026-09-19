import { CONTACT, scrollToHash } from "./motion-primitives";

const SERVICES = [
  { label: "Создание сайтов", hash: "#services" },
  { label: "Интернет-магазины", hash: "#services" },
  { label: "Мобильные приложения", hash: "#apps" },
  { label: "SEO", hash: "#apps" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.07] bg-ink px-5 md:px-10 pt-16 md:pt-20 pb-8 overflow-hidden">
      <div className="grid md:grid-cols-12 gap-10 md:gap-8">
        <div className="md:col-span-5">
          <div className="font-display font-semibold text-lg uppercase">
            LIONWEB<span className="text-gold">®</span>
            <span className="text-paper/35">.KZ</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-paper/45 max-w-xs">
            Digital-агентство. Сайты, интернет-магазины, мобильные приложения и SEO — цифровая территория вашего
            бизнеса.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[10px] tracking-[0.3em] text-gold">УСЛУГИ</div>
          <ul className="mt-5 space-y-2.5 text-sm text-paper/60">
            {SERVICES.map((s) => (
              <li key={s.label}>
                <a
                  href={s.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(s.hash);
                  }}
                  data-testid={`footer-service-${s.hash.slice(1)}`}
                  className="link-line hover:text-paper transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[10px] tracking-[0.3em] text-gold">СОЦСЕТИ</div>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noreferrer"
                data-testid="footer-instagram"
                className="link-line text-paper/60 hover:text-paper transition-colors"
              >
                Instagram ↗
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                data-testid="footer-whatsapp"
                className="link-line text-paper/60 hover:text-paper transition-colors"
              >
                WhatsApp ↗
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="font-mono text-[10px] tracking-[0.3em] text-gold">АДРЕС</div>
          <div className="mt-5 text-sm text-paper/60 leading-relaxed">
            {CONTACT.address.split(",")[0]}
            <br />
            {CONTACT.address.split(",")[1]}
          </div>
          <a href={CONTACT.phoneHref} data-testid="footer-phone" className="mt-4 block text-sm text-paper/60 hover:text-gold transition-colors">
            {CONTACT.phone}
          </a>
        </div>
      </div>

      <div className="mt-16 md:mt-24 overflow-hidden">
        <div
          className="font-display font-extrabold uppercase leading-[0.8] text-[19vw] whitespace-nowrap text-center select-none translate-y-[14%] lion-gold-outline"
          data-testid="footer-word"
        >
          LIONWEB®
        </div>
      </div>

      <div className="relative flex flex-col sm:flex-row justify-between gap-2 font-mono text-[9px] tracking-[0.25em] text-paper/30 pt-6">
        <span>© {year} LIONWEB® — DIGITAL TERRITORY</span>
        <span>АЛМАТЫ, КАЗАХСТАН</span>
      </div>
    </footer>
  );
}
