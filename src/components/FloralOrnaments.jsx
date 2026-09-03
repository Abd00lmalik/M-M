/*
  FLORAL ORNAMENTS — Realistic-looking botanical decorations
  
  Static positioned SVGs with filled petals, gradients, and detail.
  No CSS animations. No GSAP. No jank.
  Just beautiful, stable decorative elements.
*/

function RoseCluster({ className, style }) {
  return (
    <div className={`floral-ornament ${className || ''}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 240 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="roseCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8C4C4" />
            <stop offset="100%" stopColor="#D4A5A5" />
          </radialGradient>
          <radialGradient id="rosePetal" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#F3E9DC" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#E8C4C4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D4A5A5" stopOpacity="0.5" />
          </radialGradient>
          <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B7D5A" />
            <stop offset="100%" stopColor="#6B5D3A" />
          </linearGradient>
        </defs>
        
        {/* Left stem */}
        <path d="M120 95 C115 80, 100 65, 80 55 C65 48, 50 45, 40 50" 
          stroke="url(#stemGrad)" strokeWidth="1.2" fill="none" />
        {/* Right stem */}
        <path d="M120 95 C125 80, 140 65, 160 55 C175 48, 190 45, 200 50" 
          stroke="url(#stemGrad)" strokeWidth="1.2" fill="none" />
        
        {/* Left rose - petals */}
        <ellipse cx="38" cy="48" rx="12" ry="10" fill="url(#rosePetal)" transform="rotate(-15, 38, 48)" />
        <ellipse cx="35" cy="45" rx="10" ry="8" fill="url(#rosePetal)" transform="rotate(-25, 35, 45)" />
        <ellipse cx="42" cy="44" rx="9" ry="7" fill="url(#rosePetal)" transform="rotate(-5, 42, 44)" />
        <ellipse cx="38" cy="42" rx="7" ry="6" fill="url(#rosePetal)" transform="rotate(-10, 38, 42)" />
        <circle cx="38" cy="46" r="4" fill="url(#roseCenter)" opacity="0.8" />
        
        {/* Right rose - petals */}
        <ellipse cx="202" cy="48" rx="12" ry="10" fill="url(#rosePetal)" transform="rotate(15, 202, 48)" />
        <ellipse cx="205" cy="45" rx="10" ry="8" fill="url(#rosePetal)" transform="rotate(25, 205, 45)" />
        <ellipse cx="198" cy="44" rx="9" ry="7" fill="url(#rosePetal)" transform="rotate(5, 198, 44)" />
        <ellipse cx="202" cy="42" rx="7" ry="6" fill="url(#rosePetal)" transform="rotate(10, 202, 42)" />
        <circle cx="202" cy="46" r="4" fill="url(#roseCenter)" opacity="0.8" />
        
        {/* Center small rose */}
        <ellipse cx="120" cy="50" rx="8" ry="7" fill="url(#rosePetal)" />
        <ellipse cx="118" cy="48" rx="6" ry="5" fill="url(#rosePetal)" />
        <circle cx="120" cy="49" r="3" fill="url(#roseCenter)" opacity="0.7" />
        
        {/* Leaves - left */}
        <path d="M65 55 C58 48, 48 50, 45 56 C52 53, 58 52, 65 55Z" fill="#7A8B5A" opacity="0.5" />
        <path d="M70 60 C62 54, 52 56, 48 62 C55 59, 62 58, 70 60Z" fill="#7A8B5A" opacity="0.4" />
        <path d="M85 58 C80 52, 72 53, 70 58 C75 56, 80 56, 85 58Z" fill="#7A8B5A" opacity="0.45" />
        
        {/* Leaves - right */}
        <path d="M175 55 C182 48, 192 50, 195 56 C188 53, 182 52, 175 55Z" fill="#7A8B5A" opacity="0.5" />
        <path d="M170 60 C178 54, 188 56, 192 62 C185 59, 178 58, 170 60Z" fill="#7A8B5A" opacity="0.4" />
        <path d="M155 58 C160 52, 168 53, 170 58 C165 56, 160 56, 155 58Z" fill="#7A8B5A" opacity="0.45" />
        
        {/* Small buds */}
        <circle cx="95" cy="52" r="3" fill="#E8C4C4" opacity="0.4" />
        <circle cx="145" cy="52" r="3" fill="#E8C4C4" opacity="0.4" />
        
        {/* Center diamond ornament */}
        <rect x="118" y="75" width="4" height="4" rx="0.5"
          fill="#b8965a" opacity="0.35" transform="rotate(45, 120, 77)" />
      </svg>
    </div>
  )
}

function BotanicalBranch({ className, style, flip }) {
  return (
    <div className={`floral-ornament ${className || ''}`} style={{
      ...style,
      transform: `${style?.transform || ''} ${flip ? 'scaleX(-1)' : ''}`
    }} aria-hidden="true">
      <svg viewBox="0 0 80 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="branchStem" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B7D5A" />
            <stop offset="100%" stopColor="#6B5D3A" />
          </linearGradient>
          <radialGradient id="budGrad" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#F3E9DC" />
            <stop offset="100%" stopColor="#E8C4C4" />
          </radialGradient>
        </defs>
        
        {/* Main stem */}
        <path d="M40 135 C40 110, 38 85, 32 60 C28 45, 22 30, 18 15"
          stroke="url(#branchStem)" strokeWidth="1" fill="none" />
        
        {/* Leaves - left side */}
        <path d="M32 60 C24 52, 14 54, 10 60 C18 57, 24 58, 32 60Z" fill="#7A8B5A" opacity="0.5" />
        <path d="M35 75 C27 67, 17 69, 13 75 C21 72, 27 73, 35 75Z" fill="#7A8B5A" opacity="0.4" />
        <path d="M37 95 C30 88, 20 90, 16 96 C24 93, 30 94, 37 95Z" fill="#7A8B5A" opacity="0.35" />
        
        {/* Leaves - right side */}
        <path d="M36 65 C44 57, 54 59, 58 65 C50 62, 44 63, 36 65Z" fill="#7A8B5A" opacity="0.45" />
        <path d="M34 82 C42 74, 52 76, 56 82 C48 79, 42 80, 34 82Z" fill="#7A8B5A" opacity="0.4" />
        
        {/* Flower bud at top */}
        <ellipse cx="18" cy="14" rx="6" ry="5" fill="url(#budGrad)" opacity="0.6" />
        <ellipse cx="16" cy="12" rx="4" ry="3.5" fill="url(#budGrad)" opacity="0.5" />
        <circle cx="18" cy="13" r="2" fill="#D4A5A5" opacity="0.4" />
        
        {/* Small buds along stem */}
        <circle cx="28" cy="50" r="2" fill="#E8C4C4" opacity="0.3" />
        <circle cx="30" cy="70" r="1.5" fill="#E8C4C4" opacity="0.25" />
      </svg>
    </div>
  )
}

function FloralDivider({ className, style }) {
  return (
    <div className={`floral-ornament ${className || ''}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="divBud" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#F3E9DC" />
            <stop offset="100%" stopColor="#E8C4C4" />
          </radialGradient>
        </defs>
        
        {/* Center line */}
        <line x1="40" y1="20" x2="120" y2="20" stroke="#b8965a" strokeWidth="0.5" opacity="0.3" />
        
        {/* Left flower */}
        <ellipse cx="35" cy="20" rx="5" ry="4" fill="url(#divBud)" opacity="0.45" />
        <ellipse cx="33" cy="18" rx="3.5" ry="3" fill="url(#divBud)" opacity="0.4" />
        <circle cx="35" cy="19" r="1.5" fill="#D4A5A5" opacity="0.3" />
        
        {/* Right flower */}
        <ellipse cx="125" cy="20" rx="5" ry="4" fill="url(#divBud)" opacity="0.45" />
        <ellipse cx="127" cy="18" rx="3.5" ry="3" fill="url(#divBud)" opacity="0.4" />
        <circle cx="125" cy="19" r="1.5" fill="#D4A5A5" opacity="0.3" />
        
        {/* Small leaves */}
        <path d="M45 18 C42 15, 38 16, 37 19 C40 17, 42 17, 45 18Z" fill="#7A8B5A" opacity="0.35" />
        <path d="M115 18 C118 15, 122 16, 123 19 C120 17, 118 17, 115 18Z" fill="#7A8B5A" opacity="0.35" />
        
        {/* Center diamond */}
        <rect x="78" y="18" width="4" height="4" rx="0.5"
          fill="#b8965a" opacity="0.3" transform="rotate(45, 80, 20)" />
      </svg>
    </div>
  )
}

export default function FloralOrnaments() {
  return (
    <div className="floral-ornaments" aria-hidden="true">
      {/* Hero bottom — full rose cluster */}
      <RoseCluster className="floral-hero" />

      {/* Quran section — botanical branches on sides */}
      <BotanicalBranch
        className="floral-quran-left"
        style={{ position: 'absolute', left: '4%', top: '35%' }}
      />
      <BotanicalBranch
        className="floral-quran-right"
        style={{ position: 'absolute', right: '4%', top: '35%' }}
        flip
      />

      {/* Story → Nikah — floral divider */}
      <FloralDivider className="floral-story" />

      {/* Gallery → Venue — rose cluster */}
      <RoseCluster className="floral-gallery" />

      {/* Footer — botanical branches */}
      <BotanicalBranch
        className="floral-footer-left"
        style={{ position: 'absolute', left: '6%', top: '15%' }}
      />
      <BotanicalBranch
        className="floral-footer-right"
        style={{ position: 'absolute', right: '6%', top: '15%' }}
        flip
      />
    </div>
  )
}
