/*
  FLORAL ORNAMENTS — Romantic variety
  
  Mix of flower types for visual richness:
  roses, peonies, cherry blossoms, small flowers, botanical sprigs
  All small, tasteful, positioned at edges.
*/

// Rose — layered petals
function Rose({ size = 32, hue = 340, sat = 25, opacity = 0.5 }) {
  const c = size / 2
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} fill="none">
      {[0, 72, 144, 216, 288].map((a, i) => {
        const r = (a * Math.PI) / 180
        const px = c + Math.cos(r) * size * 0.15
        const py = c + Math.sin(r) * size * 0.15
        return <ellipse key={i} cx={px} cy={py} rx={size * 0.18} ry={size * 0.14}
          transform={`rotate(${a + 15}, ${px}, ${py})`}
          fill={`hsl(${hue + (i % 2) * 5}, ${sat + i * 2}%, ${68 + i * 2}%)`} opacity={opacity} />
      })}
      {[36, 108, 180, 252, 324].map((a, i) => {
        const r = (a * Math.PI) / 180
        const px = c + Math.cos(r) * size * 0.08
        const py = c + Math.sin(r) * size * 0.08
        return <ellipse key={`i-${i}`} cx={px} cy={py} rx={size * 0.1} ry={size * 0.08}
          transform={`rotate(${a + 30}, ${px}, ${py})`}
          fill={`hsl(${hue + 5}, ${sat + 8}%, ${72 + i * 2}%)`} opacity={opacity * 0.9} />
      })}
      <circle cx={c} cy={c} r={size * 0.06}
        fill={`hsl(${hue + 8}, ${sat + 12}%, 76%)`} opacity={opacity * 0.8} />
    </svg>
  )
}

// Peony — fuller, rounder, more petals
function Peony({ size = 36, hue = 330, sat = 20, opacity = 0.45 }) {
  const c = size / 2
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} fill="none">
      {/* Outer ruffled petals */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * 360
        const r = (a * Math.PI) / 180
        const px = c + Math.cos(r) * size * 0.2
        const py = c + Math.sin(r) * size * 0.2
        return <ellipse key={i} cx={px} cy={py} rx={size * 0.16} ry={size * 0.12}
          transform={`rotate(${a + (i % 2 ? 12 : -12)}, ${px}, ${py})`}
          fill={`hsl(${hue + (i % 3) * 4}, ${sat + i}%, ${70 + (i % 3) * 3}%)`} opacity={opacity} />
      })}
      {/* Inner petals */}
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * 360 + 30
        const r = (a * Math.PI) / 180
        const px = c + Math.cos(r) * size * 0.1
        const py = c + Math.sin(r) * size * 0.1
        return <ellipse key={`in-${i}`} cx={px} cy={py} rx={size * 0.11} ry={size * 0.09}
          transform={`rotate(${a + 20}, ${px}, ${py})`}
          fill={`hsl(${hue + 6}, ${sat + 6}%, ${74 + (i % 2) * 3}%)`} opacity={opacity * 0.85} />
      })}
      <circle cx={c} cy={c} r={size * 0.05}
        fill={`hsl(${hue + 10}, ${sat + 10}%, 78%)`} opacity={opacity * 0.7} />
    </svg>
  )
}

// Cherry blossom — 5 delicate petals, open center
function CherryBlossom({ size = 24, hue = 345, sat = 15, opacity = 0.5 }) {
  const c = size / 2
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} fill="none">
      {[0, 72, 144, 216, 288].map((a, i) => {
        const r = (a * Math.PI) / 180
        const px = c + Math.cos(r) * size * 0.22
        const py = c + Math.sin(r) * size * 0.22
        return <ellipse key={i} cx={px} cy={py} rx={size * 0.15} ry={size * 0.12}
          transform={`rotate(${a}, ${px}, ${py})`}
          fill={`hsl(${hue}, ${sat + i * 3}%, ${75 + i * 2}%)`} opacity={opacity} />
      })}
      <circle cx={c} cy={c} r={size * 0.08}
        fill={`hsl(${hue + 20}, ${sat + 15}%, 80%)`} opacity={opacity * 0.6} />
      {/* Stamens */}
      {[0, 72, 144, 216, 288].map((a, i) => {
        const r = (a * Math.PI) / 180
        return <line key={`s-${i}`}
          x1={c} y1={c}
          x2={c + Math.cos(r) * size * 0.12}
          y2={c + Math.sin(r) * size * 0.12}
          stroke={`hsl(${hue + 15}, ${sat + 10}%, 70%)`} strokeWidth="0.4" opacity={opacity * 0.5} />
      })}
    </svg>
  )
}

// Small 4-petal flower — filler
function SmallFlower({ size = 16, hue = 45, sat = 15, opacity = 0.4 }) {
  const c = size / 2
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} fill="none">
      {[0, 90, 180, 270].map((a, i) => {
        const r = (a * Math.PI) / 180
        const px = c + Math.cos(r) * size * 0.18
        const py = c + Math.sin(r) * size * 0.18
        return <ellipse key={i} cx={px} cy={py} rx={size * 0.14} ry={size * 0.1}
          transform={`rotate(${a}, ${px}, ${py})`}
          fill={`hsl(${hue + i * 5}, ${sat}%, ${72 + i * 3}%)`} opacity={opacity} />
      })}
      <circle cx={c} cy={c} r={size * 0.06}
        fill={`hsl(${hue + 10}, ${sat + 10}%, 76%)`} opacity={opacity * 0.7} />
    </svg>
  )
}

// Leaf
function Leaf({ size = 18, opacity = 0.35 }) {
  return (
    <svg viewBox="0 0 16 24" width={size * 0.67} height={size} fill="none">
      <path d="M8 2 C11 6, 13 12, 12 18 C11 22, 5 22, 4 18 C3 12, 5 6, 8 2Z"
        fill="#6B7D4A" opacity={opacity} />
      <path d="M8 4 L8 20" stroke="#5A6B3D" strokeWidth="0.4" opacity={opacity * 0.5} />
    </svg>
  )
}

// Sprig — stem with tiny buds
function Sprig({ size = 28, hue = 340, opacity = 0.35 }) {
  return (
    <svg viewBox="0 0 20 30" width={size * 0.67} height={size} fill="none">
      <path d="M10 28 C10 22, 9 16, 7 10 C6 6, 5 3, 5 1"
        stroke="#6B5D3A" strokeWidth="0.6" opacity={opacity * 0.6} />
      <circle cx="5" cy="2" r="2" fill={`hsl(${hue}, 25%, 74%)`} opacity={opacity} />
      <circle cx="8" cy="10" r="1.2" fill={`hsl(${hue}, 22%, 72%)`} opacity={opacity * 0.8} />
      <circle cx="9" cy="18" r="1" fill={`hsl(${hue}, 20%, 70%)`} opacity={opacity * 0.6} />
    </svg>
  )
}

export default function FloralOrnaments() {
  return (
    <div className="floral-ornaments" aria-hidden="true">

      {/* ===== HERO ===== */}
      <div className="floral-pos floral-hero-tl">
        <Rose size={28} hue={340} sat={22} opacity={0.4} />
        <Leaf size={14} opacity={0.3} />
        <CherryBlossom size={16} hue={345} sat={12} opacity={0.35} />
      </div>
      <div className="floral-pos floral-hero-tr">
        <Peony size={30} hue={332} sat={18} opacity={0.38} />
        <Leaf size={12} opacity={0.28} />
      </div>
      <div className="floral-pos floral-hero-bl">
        <SmallFlower size={14} hue={40} sat={12} opacity={0.3} />
        <Leaf size={16} opacity={0.28} />
        <Sprig size={20} hue={340} opacity={0.3} />
      </div>
      <div className="floral-pos floral-hero-br">
        <CherryBlossom size={18} hue={340} sat={14} opacity={0.32} />
        <Leaf size={14} opacity={0.26} />
        <SmallFlower size={12} hue={35} sat={10} opacity={0.28} />
      </div>

      {/* ===== QURAN ===== */}
      <div className="floral-pos floral-quran-l">
        <Peony size={24} hue={40} sat={15} opacity={0.3} />
        <Leaf size={10} opacity={0.25} />
      </div>
      <div className="floral-pos floral-quran-r">
        <Rose size={22} hue={340} sat={20} opacity={0.28} />
        <CherryBlossom size={14} hue={345} sat={10} opacity={0.25} />
      </div>

      {/* ===== STORY ===== */}
      <div className="floral-pos floral-story-center">
        <SmallFlower size={14} hue={335} sat={18} opacity={0.35} />
        <Leaf size={10} opacity={0.25} />
        <SmallFlower size={12} hue={340} sat={15} opacity={0.3} />
      </div>

      {/* ===== GALLERY ===== */}
      <div className="floral-pos floral-gallery-tl">
        <Sprig size={18} hue={340} opacity={0.25} />
      </div>
      <div className="floral-pos floral-gallery-br">
        <Sprig size={16} hue={338} opacity={0.22} />
      </div>

      {/* ===== FOOTER ===== */}
      <div className="floral-pos floral-footer-l">
        <Rose size={20} hue={338} sat={20} opacity={0.3} />
        <Leaf size={10} opacity={0.22} />
        <CherryBlossom size={14} hue={342} sat={12} opacity={0.28} />
      </div>
      <div className="floral-pos floral-footer-r">
        <Peony size={22} hue={335} sat={18} opacity={0.28} />
        <Leaf size={8} opacity={0.2} />
      </div>
    </div>
  )
}
