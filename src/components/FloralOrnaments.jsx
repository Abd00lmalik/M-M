/*
  FLORAL ORNAMENTS — Delicate corner accents
  
  Small, elegant roses placed at section edges.
  Never overlap content. Think Canva wedding template quality.
*/

// Single delicate rose — small, refined
function MiniRose({ size = 40, hue = 340, sat = 25, opacity = 0.5 }) {
  const s = size
  const c = s / 2
  return (
    <svg viewBox={`0 0 ${s} ${s}`} fill="none" width={s} height={s}>
      <defs>
        <radialGradient id={`mr-${hue}-${sat}`} cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={`hsl(${hue}, ${sat}%, 78%)`} />
          <stop offset="100%" stopColor={`hsl(${hue}, ${sat}%, 62%)`} />
        </radialGradient>
      </defs>
      {/* Outer petals */}
      {[0, 72, 144, 216, 288].map((a, i) => {
        const r = (a * Math.PI) / 180
        const px = c + Math.cos(r) * s * 0.15
        const py = c + Math.sin(r) * s * 0.15
        return (
          <ellipse key={i} cx={px} cy={py}
            rx={s * 0.18} ry={s * 0.14}
            transform={`rotate(${a + 15}, ${px}, ${py})`}
            fill={`hsl(${hue + (i % 2) * 5}, ${sat + i * 2}%, ${68 + i * 2}%)`}
            opacity={opacity}
          />
        )
      })}
      {/* Inner petals */}
      {[36, 108, 180, 252, 324].map((a, i) => {
        const r = (a * Math.PI) / 180
        const px = c + Math.cos(r) * s * 0.08
        const py = c + Math.sin(r) * s * 0.08
        return (
          <ellipse key={`i-${i}`} cx={px} cy={py}
            rx={s * 0.1} ry={s * 0.08}
            transform={`rotate(${a + 30}, ${px}, ${py})`}
            fill={`hsl(${hue + 5}, ${sat + 8}%, ${72 + i * 2}%)`}
            opacity={opacity * 0.9}
          />
        )
      })}
      {/* Center */}
      <circle cx={c} cy={c} r={s * 0.06}
        fill={`hsl(${hue + 8}, ${sat + 12}%, 76%)`} opacity={opacity * 0.8} />
    </svg>
  )
}

// Small leaf
function MiniLeaf({ size = 20, opacity = 0.4 }) {
  return (
    <svg viewBox="0 0 20 30" fill="none" width={size * 0.67} height={size}>
      <path d="M10 2 C14 8, 16 16, 14 24 C12 28, 8 28, 6 24 C4 16, 6 8, 10 2Z"
        fill="#6B7D4A" opacity={opacity} />
      <path d="M10 4 L10 26" stroke="#5A6B3D" strokeWidth="0.5" opacity={opacity * 0.6} />
    </svg>
  )
}

// Small bud
function MiniBud({ size = 14, hue = 340, opacity = 0.4 }) {
  return (
    <svg viewBox="0 0 12 20" fill="none" width={size * 0.6} height={size}>
      <path d="M6 18 L6 8" stroke="#6B5D3A" strokeWidth="0.6" opacity={opacity * 0.7} />
      <ellipse cx="6" cy="6" rx="3" ry="4"
        fill={`hsl(${hue}, 28%, 72%)`} opacity={opacity} />
    </svg>
  )
}

export default function FloralOrnaments() {
  return (
    <div className="floral-ornaments" aria-hidden="true">

      {/* ===== HERO — small roses in bottom corners ===== */}
      <div className="floral-pos floral-hero-tl">
        <MiniRose size={32} hue={340} sat={22} opacity={0.4} />
        <MiniLeaf size={16} opacity={0.3} />
      </div>
      <div className="floral-pos floral-hero-tr">
        <MiniRose size={30} hue={335} sat={25} opacity={0.38} />
        <MiniLeaf size={14} opacity={0.28} />
      </div>
      <div className="floral-pos floral-hero-bl">
        <MiniLeaf size={18} opacity={0.3} />
        <MiniBud size={12} hue={340} opacity={0.35} />
      </div>
      <div className="floral-pos floral-hero-br">
        <MiniLeaf size={16} opacity={0.28} />
        <MiniBud size={11} hue={338} opacity={0.32} />
      </div>

      {/* ===== QURAN — tiny roses on sides ===== */}
      <div className="floral-pos floral-quran-l">
        <MiniRose size={24} hue={40} sat={18} opacity={0.3} />
      </div>
      <div className="floral-pos floral-quran-r">
        <MiniRose size={22} hue={340} sat={20} opacity={0.28} />
      </div>

      {/* ===== STORY — small divider rose ===== */}
      <div className="floral-pos floral-story-center">
        <MiniRose size={20} hue={335} sat={22} opacity={0.35} />
      </div>

      {/* ===== GALLERY — corner accents ===== */}
      <div className="floral-pos floral-gallery-tl">
        <MiniLeaf size={14} opacity={0.25} />
      </div>
      <div className="floral-pos floral-gallery-br">
        <MiniLeaf size={12} opacity={0.22} />
      </div>

      {/* ===== FOOTER — delicate finish ===== */}
      <div className="floral-pos floral-footer-l">
        <MiniRose size={22} hue={338} sat={20} opacity={0.3} />
        <MiniLeaf size={12} opacity={0.25} />
      </div>
      <div className="floral-pos floral-footer-r">
        <MiniRose size={20} hue={340} sat={22} opacity={0.28} />
        <MiniLeaf size={10} opacity={0.22} />
      </div>
    </div>
  )
}
