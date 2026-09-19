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
- Refinement pass (2026-09-19): warm ivory light theme (#F0EDE5, ink text, gold-deep accents) for Services+Marquee, Process, Philosophy with rounded cinematic sheet seams; dark retained for Hero/Statement/Portfolio/Estimator/Team/FinalCTA; FinalCTA recomposed as full-screen closing moment (ЕСТЬ ПРОЕКТ? / ДАВАЙТЕ / СДЕЛАЕМ ЕГО / СИЛЬНЫМ. + single gold CTA + WhatsApp phone) flowing into compact footer with left-aligned LIONWEB® signature; fixed RevealLineInView IO-clip bug (whileInView moved to untransformed outer span).
- Readability pass (2026-09-19): all meaningful small text raised to ≥15px on desktop (mono labels/eyebrows 13→15px, nav links 15px, buttons 15px, footer links 15px); secondary descriptions 15/17px with leading 1.7 and medium-weight mono; decorative micro-labels (scroll hints, placeholder captions, browser chrome, cursor label) kept tiny by design; headlines and metric numbers untouched; verified 1440px and 390px, no overflow.
- Contrast + mobile carousel pass (2026-09-19): light-section secondary text darkened to #444444 (services rows/prices/desc, process steps, philosophy line, 06 НАПРАВЛЕНИЙ), service names near-black when active; mobile portfolio converted to native snap-x swipe carousel (82vw slides, next-project peek, 01/06 progress indicator, overscroll contained, body never shifts horizontally; verified 01→06 swipes with snap at 390px). Desktop gallery unchanged.
- CTA + phones pass (2026-09-19): unified premium .btn-gold system (gold fill, near-black text, sharp geometry, hover inverts to near-black/gold with ↗ arrow shift) on nav/hero/estimator/final CTAs — chips, filters and secondary controls untouched; wireframe phones replaced with realistic iPhone (App Store page: gold L icon, GET, rating, screenshots) and Android (Google Play page: Установить, rating, screenshots) mockups with «Доступно в App Store» / «Доступно в Google Play» labels; verified hover inversion programmatically and nav CTA hidden at 390px.
- Motion pass (2026-09-19): desktop portfolio rebuilt as a pinned automatic showreel (5s autoplay, masked horizontal transitions, thin gold countdown line, 01→06 counter, pause on hover, drag navigation, cursor-based depth parallax; mobile keeps snap-swipe + autoplay that pauses on touch and resumes after 3.5s); estimator upgraded to a two-column BUILD-YOUR-PROJECT experience with live animated preview (browser mockups morph per type, browser→smartphone for mobile app, CMS/API/SEO/Анимации cues), 01→02→03 step connector and ПОЛУЧИТЬ РАСЧЁТ gold CTA; hero staggered entrance kept; stats count once with gold hairline draw; light sections (Services, Process) rise as panels; masked headline reveals on major h2; phones enter from opposing sides. All autoplay loops run on a single rAF per component; prefers-reduced-motion respected; verified autoplay, pause, swipe, calculator, no overflow, no errors at 1440/390.
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
