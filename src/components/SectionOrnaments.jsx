/*
  SECTION ORNAMENTS — Visible floral and botanical decorative elements
  
  Placed between sections and at key positions.
  Uses SVG for fine botanical line art.
  Each ornament is lightweight, positioned with CSS.
*/

// Rose SVG — elegant line art with petals
function RoseOrnament({ className, style }) {
  return (
    <div className={`section-ornament ${className || ''}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stem */}
        <path d="M100 75 C100 60, 95 50, 85 40 C75 30, 60 25, 50 28"
          stroke="#b8965a" strokeWidth="0.8" opacity="0.5" />
        <path d="M100 75 C100 55, 105 45, 115 38 C125 30, 140 26, 150 30"
          stroke="#b8965a" strokeWidth="0.8" opacity="0.5" />
        
        {/* Left rose */}
        <circle cx="50" cy="26" r="8" stroke="#D4A5A5" strokeWidth="0.6" opacity="0.4" />
        <circle cx="50" cy="26" r="5" stroke="#E8C4C4" strokeWidth="0.5" opacity="0.35" />
        <circle cx="50" cy="26" r="2.5" fill="#D4A5A5" opacity="0.2" />
        
        {/* Right rose */}
        <circle cx="150" cy="28" r="8" stroke="#D4A5A5" strokeWidth="0.6" opacity="0.4" />
        <circle cx="150" cy="28" r="5" stroke="#E8C4C4" strokeWidth="0.5" opacity="0.35" />
        <circle cx="150" cy="28" r="2.5" fill="#D4A5A5" opacity="0.2" />
        
        {/* Leaves left */}
        <path d="M60 32 C55 28, 48 30, 45 35 C50 33, 55 30, 60 32Z"
          stroke="#b8965a" strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d="M65 38 C58 35, 52 38, 50 42 C55 40, 60 37, 65 38Z"
          stroke="#b8965a" strokeWidth="0.5" fill="none" opacity="0.25" />
        
        {/* Leaves right */}
        <path d="M140 34 C145 30, 152 32, 155 37 C150 35, 145 32, 140 34Z"
          stroke="#b8965a" strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d="M135 40 C142 37, 148 40, 150 44 C145 42, 140 39, 135 40Z"
          stroke="#b8965a" strokeWidth="0.5" fill="none" opacity="0.25" />
        
        {/* Small buds */}
        <circle cx="70" cy="35" r="1.5" fill="#D4A5A5" opacity="0.15" />
        <circle cx="130" cy="37" r="1.5" fill="#D4A5A5" opacity="0.15" />
        
        {/* Center diamond */}
        <rect x="98" y="58" width="4" height="4" rx="0.5"
          fill="#b8965a" opacity="0.3" transform="rotate(45, 100, 60)" />
      </svg>
    </div>
  )
}

// Single botanical sprig
function BotanicalSprig({ className, style, flip }) {
  return (
    <div className={`section-ornament ${className || ''}`} style={{
      ...style,
      transform: `${style?.transform || ''} ${flip ? 'scaleX(-1)' : ''}`
    }} aria-hidden="true">
      <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main stem */}
        <path d="M60 155 C60 120, 55 90, 45 60 C38 40, 30 25, 25 10"
          stroke="#b8965a" strokeWidth="0.7" opacity="0.4" />
        
        {/* Leaves */}
        <path d="M45 60 C38 52, 28 50, 22 55 C30 53, 38 55, 45 60Z"
          stroke="#b8965a" strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d="M50 75 C42 68, 32 67, 26 72 C34 70, 42 72, 50 75Z"
          stroke="#b8965a" strokeWidth="0.5" fill="none" opacity="0.25" />
        <path d="M55 95 C48 88, 38 87, 32 92 C40 90, 48 92, 55 95Z"
          stroke="#b8965a" strokeWidth="0.5" fill="none" opacity="0.2" />
        
        {/* Right side leaves */}
        <path d="M55 65 C62 58, 72 56, 78 61 C70 59, 62 61, 55 65Z"
          stroke="#b8965a" strokeWidth="0.5" fill="none" opacity="0.3" />
        <path d="M52 80 C60 73, 70 72, 76 77 C68 75, 60 77, 52 80Z"
          stroke="#b8965a" strokeWidth="0.5" fill="none" opacity="0.25" />
        
        {/* Flower bud at top */}
        <circle cx="25" cy="10" r="4" stroke="#E8C4C4" strokeWidth="0.6" opacity="0.35" />
        <circle cx="25" cy="10" r="2" fill="#D4A5A5" opacity="0.2" />
        
        {/* Small buds along stem */}
        <circle cx="38" cy="50" r="1.5" fill="#D4A5A5" opacity="0.15" />
        <circle cx="42" cy="70" r="1.2" fill="#D4A5A5" opacity="0.12" />
      </svg>
    </div>
  )
}

// Heart sprig — small heart on a stem
function HeartSprigOrnament({ className, style }) {
  return (
    <div className={`section-ornament ${className || ''}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 55 C20 45, 18 38, 20 30" stroke="#b8965a" strokeWidth="0.6" opacity="0.4" />
        <path d="M20 30 C16 26, 10 26, 10 32 C10 36, 14 39, 20 34"
          stroke="#D4A5A5" strokeWidth="0.6" fill="none" opacity="0.35" />
        <path d="M20 30 C24 26, 30 26, 30 32 C30 36, 26 39, 20 34"
          stroke="#D4A5A5" strokeWidth="0.6" fill="none" opacity="0.35" />
        <circle cx="20" cy="30" r="1" fill="#D4A5A5" opacity="0.2" />
      </svg>
    </div>
  )
}

export default function SectionOrnaments() {
  return (
    <div className="section-ornaments" aria-hidden="true">
      {/* Hero bottom — rose arrangement */}
      <RoseOrnament
        className="ornament-hero-bottom"
      />

      {/* Quran → Invitation transition — botanical sprigs */}
      <BotanicalSprig
        className="ornament-quran-left"
        style={{ position: 'absolute', left: '5%', bottom: '40%' }}
      />
      <BotanicalSprig
        className="ornament-quran-right"
        style={{ position: 'absolute', right: '5%', bottom: '40%' }}
        flip
      />

      {/* Story → Nikah transition — heart sprig */}
      <HeartSprigOrnament
        className="ornament-story-heart"
      />

      {/* Gallery → Venue transition — rose */}
      <RoseOrnament
        className="ornament-gallery-bottom"
      />

      {/* Footer — subtle botanical */}
      <BotanicalSprig
        className="ornament-footer-left"
        style={{ position: 'absolute', left: '8%', top: '10%' }}
      />
      <BotanicalSprig
        className="ornament-footer-right"
        style={{ position: 'absolute', right: '8%', top: '10%' }}
        flip
      />
    </div>
  )
}
