# LIONWEB.KZ — Digital Territory · PRD

## Original Problem Statement
Build a complete premium website redesign concept for LIONWEB.KZ — a Kazakhstan digital agency (websites, e-commerce, mobile apps, SEO). NOT a generic AI agency template: every screen must feel intentionally art-directed for the LIONWEB brand. Core concept: "LIONWEB — DIGITAL TERRITORY" — the lion translated into confidence, territory, precision and premium presence, never as a literal 3D lion. Calm, powerful, expensive; editorial/architectural/cinematic; identity from TYPOGRAPHY, GRID, SPACE, PROJECTS, MOTION, BRAND GEOMETRY. Russian language. No invented facts.

## User Decisions (ask_human)
- Portfolio: elegant temporary editorial placeholders (real screenshots to be provided later) — built so images are easily replaceable.
- Team: elegant temporary portrait placeholders (real photos later) — easily replaceable.
- Contacts: real — +7 747 274 6859, wa.me/77472746859, instagram.com/lionweb_kz, Есенберлина 13, Алматы.

## Architecture
- React (CRA + craco) SPA, no router needed; Tailwind (extended: ink/coal/paper/gold tokens, Unbounded/Onest/JetBrains Mono with Cyrillic), framer-motion 11, lenis smooth scroll.
- Components: Preloader, Cursor, Nav, Hero, GoldGeometry (abstract crown/mane SVG with cursor parallax), Statement (scroll word-reveal + count-up metrics), Portfolio (desktop horizontal scroll-sequence 560vh sticky + mobile vertical editorial), Services (numbered index, hover-expand rows + CSS micro-animations), Marquee, Estimator (3-step selector → ОРИЕНТИР/ТРЕБУЕТ ОЦЕНКИ → WhatsApp deep link), MobileSeo (split with scroll overlap), Process (scroll-growing gold timeline, 7 steps), Team (masked portrait transitions, outlined LIONWEB behind), Philosophy, FinalCta (warm black + mirrored geometry), Footer (giant gold-outline LIONWEB®).
- Custom cursor (dot/ring → VIEW ↗ / GO ↗, desktop only), magnetic buttons, link underline reveals, grain overlay, prefers-reduced-motion respected.
- Backend untouched (landing only; all CTAs are real WhatsApp/phone/Instagram deep links).

## Verified Data Used (from lionweb.kz, no inventions)
Projects: KidsTools 750 000 ₸ / 10–12 дн; ERMART 300 000 ₸ / 10–12 дн; Baekkey 500 000 ₸ / 10–12 дн; Salsabil 450 000 ₸ / 7–14 дн; Mamibiomed 700 000 ₸ / 7–14 дн; AgroAlem — в разработке. All link to live project URLs. Team roles verified (Тогаев Даулет — Дизайнер). Metrics 250+/200+/50+ as presented by Lionweb.

## Implemented (2026-09-19)
Preloader, nav (blend→floating blur bar, mobile menu), hero (11.5vw Unbounded lines, gold DIGITAL, geometry parallax, staged reveal, scroll indicator), statement (word-by-word scroll reveal + metrics), horizontal portfolio (desktop) / vertical (mobile) with contextual VIEW cursor + subtle bg accent shifts, services index (6 rows, hover micro-animations), estimator (live ОРИЕНТИР, honest ТРЕБУЕТ ОЦЕНКИ for mobile apps), marquee, mobile+SEO split (scroll overlap, typographic ТОП rows), process timeline, team, philosophy, final CTA, footer, cursor system, lenis, reduced-motion, responsive 1440/1024/768/390 (no horizontal overflow).

## Verification
Backend /api/ 200; frontend 200. Screenshots desktop 1440 (hero, portfolio mid-scroll, estimator) + mobile 390 (hero, statement, team): all render, no console errors (fixed a recursive posthog stub in index.html that caused "Maximum call stack size exceeded"). Interactions tested: estimator selections → "ОТ 250 000 ₸"; team click → portrait switch.

## Backlog
- P0: replace portfolio placeholders with real screenshots (drop <img> into ProjectVisual); replace team placeholders with real photos (Portrait component).
- P1: case-study detail pages per project; OG/share image + favicon in brand style.
- P2: EN/KZ language toggle; contact form with backend lead capture.
