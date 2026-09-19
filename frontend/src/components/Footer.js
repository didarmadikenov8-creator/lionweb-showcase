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
    <footer className="relative bg-ink px-5 md:px-10 pt-12 md:pt-16 pb-6 overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8">
        <div className="col-span-2 md:col-span-5">
          <div className="font-display font-semibold text-base md:text-lg uppercase">
            LIONWEB<span className="text-gold">®</span>
            <span className="text-paper/35">.KZ</span>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-paper/45 max-w-xs">
            Digital-агентство. Сайты, интернет-магазины, мобильные приложения и SEO.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="font-mono text-[10px] tracking-[0.3em] text-gold">УСЛУГИ</div>
          <ul className="mt-4 space-y-2 text-[13px] text-paper/60">
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
          <ul className="mt-4 space-y-2 text-[13px]">
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
          <div className="mt-4 text-[13px] text-paper/60 leading-relaxed">
            {CONTACT.address.split(",")[0]}
            <br />
            {CONTACT.address.split(",")[1]}
          </div>
          <a href={CONTACT.phoneHref} data-testid="footer-phone" className="mt-3 block text-[13px] text-paper/60 hover:text-gold transition-colors">
            {CONTACT.phone}
          </a>
        </div>
      </div>

      <div className="mt-10 md:mt-12 flex items-end justify-between gap-6">
        <div
          className="font-display font-extrabold uppercase leading-[0.8] text-[13.5vw] md:text-[10.5vw] whitespace-nowrap select-none lion-gold-outline -mb-[1.5vw] md:-mb-[1vw]"
          data-testid="footer-word"
        >
          LIONWEB®
        </div>
        <div className="shrink-0 text-right font-mono text-[9px] tracking-[0.2em] text-paper/30 pb-2 md:pb-4">
          © {year} LIONWEB®
          <br />
          DIGITAL TERRITORY
        </div>
      </div>
    </footer>
  );
}
