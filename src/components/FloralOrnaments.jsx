/*
  FLORAL ORNAMENTS — Painterly SVG roses
  
  Detailed rose illustrations drawn with SVG.
  Layered petals, radial gradients, depth, realistic botanical forms.
  Static positioned. No animations. No jank.
*/

// Detailed single rose with layered petals
function PaintedRose({ size = 100, hue = 340, saturation = 30, className, style, flip }) {
  const s = size
  const cx = s / 2
  const cy = s / 2

  // Generate petal paths with slight variations
  const petals = []
  const petalCount = 12
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * 360
    const rad = (angle * Math.PI) / 180
    const dist = s * 0.28 + (i % 3) * s * 0.04
    const px = cx + Math.cos(rad) * dist * 0.3
    const py = cy + Math.sin(rad) * dist * 0.3
    const pw = s * 0.22 + (i % 2) * s * 0.04
    const ph = s * 0.18 + (i % 3) * s * 0.02
    const rot = angle + (i % 2 === 0 ? 10 : -10)

    petals.push(
      <ellipse
        key={i}
        cx={px} cy={py}
        rx={pw} ry={ph}
        transform={`rotate(${rot}, ${px}, ${py})`}
        fill={`hsl(${hue + (i % 3) * 5}, ${saturation + (i % 4) * 3}%, ${65 + (i % 3) * 5}%)`}
        opacity={0.7 + (i % 3) * 0.08}
      />
    )
  }

  // Inner spiral petals
  const innerPetals = []
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * 360 + 30
    const rad = (angle * Math.PI) / 180
    const px = cx + Math.cos(rad) * s * 0.08
    const py = cy + Math.sin(rad) * s * 0.08
    innerPetals.push(
      <ellipse
        key={`inner-${i}`}
        cx={px} cy={py}
        rx={s * 0.1} ry={s * 0.08}
        transform={`rotate(${angle + 45}, ${px}, ${py})`}
        fill={`hsl(${hue + 8}, ${saturation + 10}%, ${72 + (i % 2) * 4}%)`}
        opacity={0.85}
      />
    )
  }

  return (
    <div
      className={`floral-ornament ${className || ''}`}
      style={{ ...style, transform: `${style?.transform || ''} ${flip ? 'scaleX(-1)' : ''}`.trim() }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`roseGlow-${hue}`} cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor={`hsl(${hue}, ${saturation}%, 80%)`} stopOpacity="0.3" />
            <stop offset="100%" stopColor={`hsl(${hue}, ${saturation}%, 60%)`} stopOpacity="0" />
          </radialGradient>
          <filter id={`roseSoft-${hue}`}>
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>

        {/* Soft glow behind */}
        <circle cx={cx} cy={cy} r={s * 0.4} fill={`url(#roseGlow-${hue})`} />

        {/* Outer petals — large, sweeping */}
        {petals}

        {/* Mid petals — tighter */}
        {petals.slice(0, 8).map((_, i) => {
          const angle = (i / 8) * 360 + 22
          const rad = (angle * Math.PI) / 180
          const px = cx + Math.cos(rad) * s * 0.14
          const py = cy + Math.sin(rad) * s * 0.14
          return (
            <ellipse
              key={`mid-${i}`}
              cx={px} cy={py}
              rx={s * 0.14} ry={s * 0.11}
              transform={`rotate(${angle + 20}, ${px}, ${py})`}
              fill={`hsl(${hue + 4}, ${saturation + 6}%, ${68 + (i % 3) * 3}%)`}
              opacity={0.75}
            />
          )
        })}

        {/* Inner spiral */}
        {innerPetals}

        {/* Center bud */}
        <ellipse cx={cx} cy={cy} rx={s * 0.06} ry={s * 0.05}
          fill={`hsl(${hue + 10}, ${saturation + 15}%, 75%)`} opacity="0.9" />
        <ellipse cx={cx - s * 0.01} cy={cy - s * 0.01} rx={s * 0.03} ry={s * 0.025}
          fill={`hsl(${hue + 12}, ${saturation + 20}%, 80%)`} opacity="0.8" />

        {/* Shadow under petals */}
        <ellipse cx={cx} cy={cy + s * 0.05} rx={s * 0.35} ry={s * 0.12}
          fill={`hsl(${hue}, ${saturation}%, 40%)`} opacity="0.08"
          filter={`url(#roseSoft-${hue})`} />
      </svg>
    </div>
  )
}

// Detailed leaf with veins
function PaintedLeaf({ size = 60, className, style, flip }) {
  const s = size
  return (
    <div
      className={`floral-ornament ${className || ''}`}
      style={{ ...style, transform: `${style?.transform || ''} ${flip ? 'scaleX(-1)' : ''}`.trim() }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${s} ${s * 1.6}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="leafFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6B7D4A" />
            <stop offset="50%" stopColor="#5A6B3D" />
            <stop offset="100%" stopColor="#4A5A30" />
          </linearGradient>
        </defs>

        {/* Leaf body */}
        <path
          d={`M${s * 0.5} ${s * 0.05}
              C${s * 0.7} ${s * 0.2}, ${s * 0.9} ${s * 0.5}, ${s * 0.85} ${s * 0.8}
              C${s * 0.8} ${s * 1.1}, ${s * 0.6} ${s * 1.4}, ${s * 0.5} ${s * 1.55}
              C${s * 0.4} ${s * 1.4}, ${s * 0.2} ${s * 1.1}, ${s * 0.15} ${s * 0.8}
              C${s * 0.1} ${s * 0.5}, ${s * 0.3} ${s * 0.2}, ${s * 0.5} ${s * 0.05}Z`}
          fill="url(#leafFill)"
          opacity="0.6"
        />

        {/* Central vein */}
        <path
          d={`M${s * 0.5} ${s * 0.1} L${s * 0.5} ${s * 1.5}`}
          stroke="#4A5A30" strokeWidth="0.8" opacity="0.4"
        />

        {/* Side veins */}
        {[0.3, 0.5, 0.7, 0.9].map((t, i) => (
          <g key={i}>
            <path
              d={`M${s * 0.5} ${s * t} Q${s * 0.7} ${s * (t - 0.05)}, ${s * 0.78} ${s * (t + 0.05)}`}
              stroke="#4A5A30" strokeWidth="0.5" opacity="0.3" fill="none"
            />
            <path
              d={`M${s * 0.5} ${s * t} Q${s * 0.3} ${s * (t - 0.05)}, ${s * 0.22} ${s * (t + 0.05)}`}
              stroke="#4A5A30" strokeWidth="0.5" opacity="0.3" fill="none"
            />
          </g>
        ))}

        {/* Highlight */}
        <path
          d={`M${s * 0.5} ${s * 0.15}
              C${s * 0.6} ${s * 0.3}, ${s * 0.7} ${s * 0.5}, ${s * 0.65} ${s * 0.7}`}
          stroke="#8BA06A" strokeWidth="0.6" opacity="0.25" fill="none"
        />
      </svg>
    </div>
  )
}

// Rosebud — small, unopened
function PaintedRosebud({ size = 40, hue = 340, className, style }) {
  const s = size
  return (
    <div className={`floral-ornament ${className || ''}`} style={style} aria-hidden="true">
      <svg viewBox={`0 0 ${s} ${s * 1.8}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stem */}
        <path
          d={`M${s * 0.5} ${s * 1.7} C${s * 0.5} ${s * 1.3}, ${s * 0.48} ${s * 1.0}, ${s * 0.5} ${s * 0.6}`}
          stroke="#6B5D3A" strokeWidth="1" opacity="0.5"
        />

        {/* Sepals */}
        <path
          d={`M${s * 0.5} ${s * 0.6} C${s * 0.3} ${s * 0.5}, ${s * 0.25} ${s * 0.35}, ${s * 0.35} ${s * 0.25}`}
          stroke="#5A6B3D" strokeWidth="0.8" fill="none" opacity="0.5"
        />
        <path
          d={`M${s * 0.5} ${s * 0.6} C${s * 0.7} ${s * 0.5}, ${s * 0.75} ${s * 0.35}, ${s * 0.65} ${s * 0.25}`}
          stroke="#5A6B3D" strokeWidth="0.8" fill="none" opacity="0.5"
        />

        {/* Bud body */}
        <ellipse cx={s * 0.5} cy={s * 0.35} rx={s * 0.15} ry={s * 0.2}
          fill={`hsl(${hue}, 35%, 70%)`} opacity="0.7" />
        <ellipse cx={s * 0.48} cy={s * 0.32} rx={s * 0.1} ry={s * 0.15}
          fill={`hsl(${hue + 5}, 40%, 75%)`} opacity="0.6" />

        {/* Small leaf on stem */}
        <path
          d={`M${s * 0.48} ${s * 1.1} C${s * 0.3} ${s * 1.0}, ${s * 0.2} ${s * 1.1}, ${s * 0.25} ${s * 1.2}
              C${s * 0.3} ${s * 1.15}, ${s * 0.4} ${s * 1.12}, ${s * 0.48} ${s * 1.1}Z`}
          fill="#5A6B3D" opacity="0.4"
        />
      </svg>
    </div>
  )
}

// Full arrangement — rose + leaves + buds
function RoseArrangement({ className, style, variant = 'blush' }) {
  const hues = {
    blush: { rose: 340, sat: 30 },
    ivory: { rose: 40, sat: 20 },
    pink: { rose: 330, sat: 35 },
  }
  const h = hues[variant] || hues.blush

  return (
    <div className={`floral-ornament ${className || ''}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`arrGlow-${variant}`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={`hsl(${h.rose}, ${h.sat}%, 75%)`} stopOpacity="0.15" />
            <stop offset="100%" stopColor={`hsl(${h.rose}, ${h.sat}%, 60%)`} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <ellipse cx="100" cy="55" rx="80" ry="45" fill={`url(#arrGlow-${variant})`} />

        {/* Left stem */}
        <path d="M100 115 C95 100, 80 85, 60 75 C45 68, 30 65, 22 70"
          stroke="#6B5D3A" strokeWidth="1.2" opacity="0.5" fill="none" />

        {/* Right stem */}
        <path d="M100 115 C105 100, 120 85, 140 75 C155 68, 170 65, 178 70"
          stroke="#6B5D3A" strokeWidth="1.2" opacity="0.5" fill="none" />

        {/* Left rose — outer petals */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const a = (i / 8) * 360
          const r = (a * Math.PI) / 180
          const px = 22 + Math.cos(r) * 8
          const py = 68 + Math.sin(r) * 7
          return (
            <ellipse key={`lr-${i}`} cx={px} cy={py}
              rx={10 + (i % 2) * 2} ry={8 + (i % 3)}
              transform={`rotate(${a + (i % 2 ? 15 : -15)}, ${px}, ${py})`}
              fill={`hsl(${h.rose + (i % 3) * 4}, ${h.sat + (i % 4) * 2}%, ${64 + (i % 3) * 4}%)`}
              opacity={0.7 + (i % 3) * 0.06}
            />
          )
        })}
        {/* Left rose — inner */}
        {[0, 1, 2, 3].map(i => {
          const a = (i / 4) * 360 + 45
          const r = (a * Math.PI) / 180
          const px = 22 + Math.cos(r) * 4
          const py = 68 + Math.sin(r) * 3.5
          return (
            <ellipse key={`li-${i}`} cx={px} cy={py}
              rx={5} ry={4}
              transform={`rotate(${a + 30}, ${px}, ${py})`}
              fill={`hsl(${h.rose + 6}, ${h.sat + 8}%, ${70 + (i % 2) * 3}%)`}
              opacity={0.8}
            />
          )
        })}
        <circle cx="22" cy="68" r="3" fill={`hsl(${h.rose + 10}, ${h.sat + 12}%, 76%)`} opacity="0.85" />

        {/* Right rose — outer petals */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const a = (i / 8) * 360
          const r = (a * Math.PI) / 180
          const px = 178 + Math.cos(r) * 8
          const py = 68 + Math.sin(r) * 7
          return (
            <ellipse key={`rr-${i}`} cx={px} cy={py}
              rx={10 + (i % 2) * 2} ry={8 + (i % 3)}
              transform={`rotate(${a + (i % 2 ? 15 : -15)}, ${px}, ${py})`}
              fill={`hsl(${h.rose + (i % 3) * 4}, ${h.sat + (i % 4) * 2}%, ${64 + (i % 3) * 4}%)`}
              opacity={0.7 + (i % 3) * 0.06}
            />
          )
        })}
        {/* Right rose — inner */}
        {[0, 1, 2, 3].map(i => {
          const a = (i / 4) * 360 + 45
          const r = (a * Math.PI) / 180
          const px = 178 + Math.cos(r) * 4
          const py = 68 + Math.sin(r) * 3.5
          return (
            <ellipse key={`ri-${i}`} cx={px} cy={py}
              rx={5} ry={4}
              transform={`rotate(${a + 30}, ${px}, ${py})`}
              fill={`hsl(${h.rose + 6}, ${h.sat + 8}%, ${70 + (i % 2) * 3}%)`}
              opacity={0.8}
            />
          )
        })}
        <circle cx="178" cy="68" r="3" fill={`hsl(${h.rose + 10}, ${h.sat + 12}%, 76%)`} opacity="0.85" />

        {/* Center small rose */}
        {[0, 1, 2, 3, 4].map(i => {
          const a = (i / 5) * 360
          const r = (a * Math.PI) / 180
          const px = 100 + Math.cos(r) * 5
          const py = 70 + Math.sin(r) * 4.5
          return (
            <ellipse key={`cr-${i}`} cx={px} cy={py}
              rx={6} ry={5}
              transform={`rotate(${a + 20}, ${px}, ${py})`}
              fill={`hsl(${h.rose + 3}, ${h.sat + 5}%, ${66 + (i % 2) * 3}%)`}
              opacity={0.75}
            />
          )
        })}
        <circle cx="100" cy="70" r="2.5" fill={`hsl(${h.rose + 8}, ${h.sat + 10}%, 74%)`} opacity="0.8" />

        {/* Leaves — left side */}
        <path d="M45 73 C38 66, 28 68, 25 74 C32 71, 38 70, 45 73Z" fill="#5A6B3D" opacity="0.45" />
        <path d="M52 78 C44 72, 34 74, 30 80 C38 77, 44 76, 52 78Z" fill="#5A6B3D" opacity="0.38" />
        <path d="M65 76 C60 70, 52 71, 50 76 C55 74, 60 74, 65 76Z" fill="#6B7D4A" opacity="0.4" />

        {/* Leaves — right side */}
        <path d="M155 73 C162 66, 172 68, 175 74 C168 71, 162 70, 155 73Z" fill="#5A6B3D" opacity="0.45" />
        <path d="M148 78 C156 72, 166 74, 170 80 C162 77, 156 76, 148 78Z" fill="#5A6B3D" opacity="0.38" />
        <path d="M135 76 C140 70, 148 71, 150 76 C145 74, 140 74, 135 76Z" fill="#6B7D4A" opacity="0.4" />

        {/* Small buds */}
        <ellipse cx="75" cy="74" rx="3" ry="4" fill={`hsl(${h.rose + 2}, ${h.sat + 3}%, 72%)`} opacity="0.4" />
        <ellipse cx="125" cy="74" rx="3" ry="4" fill={`hsl(${h.rose + 2}, ${h.sat + 3}%, 72%)`} opacity="0.4" />

        {/* Center diamond */}
        <rect x="98" y="95" width="4" height="4" rx="0.5"
          fill="#b8965a" opacity="0.3" transform="rotate(45, 100, 97)" />
      </svg>
    </div>
  )
}

export default function FloralOrnaments() {
  return (
    <div className="floral-ornaments" aria-hidden="true">
      {/* Hero bottom — blush rose arrangement */}
      <RoseArrangement className="floral-hero" variant="blush" />

      {/* Quran left — single blush rose + leaves */}
      <PaintedRose size={90} hue={340} saturation={28}
        className="floral-quran-left"
        style={{ position: 'absolute', left: '3%', top: '28%' }}
      />
      <PaintedLeaf size={35}
        style={{ position: 'absolute', left: '1%', top: '40%', transform: 'rotate(-20deg)' }}
      />

      {/* Quran right — ivory rose + leaves */}
      <PaintedRose size={85} hue={40} saturation={18}
        className="floral-quran-right"
        style={{ position: 'absolute', right: '3%', top: '28%' }}
        flip
      />
      <PaintedLeaf size={32}
        style={{ position: 'absolute', right: '1%', top: '40%', transform: 'rotate(20deg) scaleX(-1)' }}
      />

      {/* Story divider — pink rosebud */}
      <PaintedRosebud size={35} hue={335}
        className="floral-story"
      />

      {/* Gallery bottom — ivory arrangement */}
      <RoseArrangement className="floral-gallery" variant="ivory" />

      {/* Footer left — blush rose + bud */}
      <PaintedRose size={70} hue={338} saturation={25}
        className="floral-footer-left"
        style={{ position: 'absolute', left: '5%', top: '10%' }}
      />
      <PaintedRosebud size={25} hue={340}
        style={{ position: 'absolute', left: '12%', top: '22%', transform: 'rotate(15deg)' }}
      />

      {/* Footer right — pink rose + leaf */}
      <PaintedRose size={65} hue={332} saturation={30}
        className="floral-footer-right"
        style={{ position: 'absolute', right: '5%', top: '10%' }}
        flip
      />
      <PaintedLeaf size={28}
        style={{ position: 'absolute', right: '2%', top: '20%', transform: 'rotate(25deg) scaleX(-1)' }}
      />
    </div>
  )
}
