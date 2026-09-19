export default function GoldGeometry({ mirrored = false, className = "", style }) {
  const rays = Array.from({ length: 28 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g
        stroke="#C5A059"
        strokeWidth="1"
        fill="none"
        transform={mirrored ? "translate(600,0) scale(-1,1)" : undefined}
      >
        {/* crown contour */}
        <path d="M230 152 L258 96 L286 140 L300 78 L314 140 L342 96 L370 152" opacity="0.5" />
        <path d="M230 152 H370" opacity="0.28" />
        <line x1="300" y1="0" x2="300" y2="62" opacity="0.35" />
        {/* mane rays */}
        <g className="geo-spin" opacity="0.85">
          {rays.map((i) => {
            const a = (i / rays.length) * Math.PI * 2;
            const r1 = 122 + (i % 4) * 18;
            const r2 = r1 + 68 + (i % 3) * 34;
            return (
              <line
                key={i}
                x1={300 + Math.cos(a) * r1}
                y1={320 + Math.sin(a) * r1}
                x2={300 + Math.cos(a) * r2}
                y2={320 + Math.sin(a) * r2}
                opacity={0.18 + (i % 3) * 0.1}
              />
            );
          })}
        </g>
        {/* orbit arcs */}
        <circle cx="300" cy="320" r="104" opacity="0.26" strokeDasharray="3 8" />
        <circle cx="300" cy="320" r="182" opacity="0.14" />
        <path d="M300 92 A228 228 0 0 1 528 320" opacity="0.2" />
        <path d="M300 92 A228 228 0 0 0 72 320" opacity="0.13" />
        <line x1="300" y1="560" x2="300" y2="600" opacity="0.25" />
      </g>
    </svg>
  );
}
