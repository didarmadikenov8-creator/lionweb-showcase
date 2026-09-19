import { CONTACT } from "./motion-primitives";

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.51 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 1.67a8.24 8.24 0 1 1-4.2 15.33l-.3-.18-3.12.82.83-3.04-.19-.31a8.24 8.24 0 0 1 6.98-12.62Zm-3.1 4.06c-.17 0-.44.06-.67.31-.23.25-.9.25-.9 1.51 0 1.25.92 2.46 1.05 2.63.13.17 1.8 2.86 4.44 3.9 2.2.86 2.64.69 3.12.65.48-.05 1.54-.63 1.76-1.24.22-.6.22-1.13.15-1.24-.06-.11-.23-.17-.48-.3-.25-.12-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.25-.68.84-.83 1.02-.15.17-.3.19-.55.06-.25-.12-1.06-.39-2.02-1.25-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.1-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.17.04-.31-.02-.44-.06-.12-.55-1.35-.76-1.84-.2-.48-.4-.42-.55-.43h-.47Z" />
    </svg>
  );
}

export default function FloatingCta() {
  return (
    <a
      href={`${CONTACT.whatsapp}?text=${encodeURIComponent("Здравствуйте! Хочу обсудить проект.")}`}
      target="_blank"
      rel="noreferrer"
      data-cursor="go"
      data-testid="floating-whatsapp"
      aria-label="Обсудить проект в WhatsApp"
      className="group fixed z-[145] flex items-center h-11 border border-gold/40 bg-coal/85 backdrop-blur-md hover:border-gold transition-colors duration-300 bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 md:right-6 md:bottom-6"
    >
      <span className="relative flex items-center justify-center w-11 h-11 shrink-0">
        <span className="absolute inset-1 rounded-full border border-gold/50 fab-pulse" aria-hidden="true" />
        <span className="relative flex items-center justify-center w-7 h-7 bg-gold text-ink">
          <WaIcon />
        </span>
      </span>
      <span className="hidden md:block max-w-0 overflow-hidden whitespace-nowrap font-mono text-[11px] tracking-[0.14em] text-paper/85 transition-all duration-500 ease-out group-hover:max-w-[11rem] group-hover:pr-5">
        ОБСУДИТЬ ПРОЕКТ
      </span>
    </a>
  );
}