import { useState, useEffect } from 'react'

export default function OpeningSequence({ onEnter }) {
  const [isHidden, setIsHidden] = useState(false)
  const [isReturning, setIsReturning] = useState(false)
  const [phase, setPhase] = useState('seal') // seal → dissolve → open → rise → reveal

  useEffect(() => {
    try {
      const lastVisit = localStorage.getItem('wedding-visit')
      const now = Date.now()
      if (lastVisit && (now - parseInt(lastVisit)) < 24 * 60 * 60 * 1000) {
        setIsReturning(true)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  useEffect(() => {
    if (isReturning) {
      // Abbreviated: skip to reveal quickly
      const t = setTimeout(() => setPhase('reveal'), 600)
      return () => clearTimeout(t)
    }

    // Full sequence timing
    const timers = [
      setTimeout(() => setPhase('dissolve'), 1200),   // seal dissolves
      setTimeout(() => setPhase('open'), 1700),       // flap opens
      setTimeout(() => setPhase('rise'), 2200),       // card rises
      setTimeout(() => setPhase('reveal'), 3200),     // content appears
    ]

    return () => timers.forEach(clearTimeout)
  }, [isReturning])

  const handleEnter = () => {
    try {
      localStorage.setItem('wedding-visit', Date.now().toString())
    } catch {
      // continue anyway
    }
    setIsHidden(true)
    setTimeout(() => onEnter(), 700)
  }

  const dur = isReturning ? '0.3s' : undefined

  return (
    <div
      className={`opening-overlay ${isHidden ? 'hidden' : ''}`}
      aria-hidden={isHidden}
    >
      {/* Atmospheric glow */}
      <div className="opening-glow" aria-hidden="true" />

      {/* Envelope wrapper with perspective */}
      <div className="opening-envelope-scene" style={{ perspective: '1000px' }}>
        {/* Envelope body */}
        <div className={`opening-envelope ${phase !== 'seal' ? 'envelope-visible' : ''}`}
          style={isReturning ? { animationDuration: dur } : undefined}
        >
          {/* Paper texture */}
          <div className="envelope-texture" aria-hidden="true" />

          {/* Botanical decoration */}
          <svg className="envelope-botanical" viewBox="0 0 120 160" fill="none" aria-hidden="true">
            <path d="M60 160 C60 120, 40 100, 20 80 C40 90, 55 100, 60 120" stroke="#b8965a" strokeWidth="0.8" opacity="0.4" />
            <path d="M60 160 C60 130, 80 110, 100 90 C80 100, 65 110, 60 130" stroke="#b8965a" strokeWidth="0.8" opacity="0.4" />
            <path d="M60 160 C60 110, 50 80, 30 50 C50 70, 58 90, 60 110" stroke="#b8965a" strokeWidth="0.8" opacity="0.3" />
            <path d="M60 160 C60 120, 70 90, 90 60 C70 80, 62 100, 60 120" stroke="#b8965a" strokeWidth="0.8" opacity="0.3" />
            <circle cx="20" cy="80" r="2" fill="#b8965a" opacity="0.2" />
            <circle cx="100" cy="90" r="2" fill="#b8965a" opacity="0.2" />
            <circle cx="30" cy="50" r="1.5" fill="#b8965a" opacity="0.15" />
            <circle cx="90" cy="60" r="1.5" fill="#b8965a" opacity="0.15" />
          </svg>

          {/* Wax seal */}
          <div
            className={`wax-seal ${phase === 'dissolve' || phase === 'open' || phase === 'rise' || phase === 'reveal' ? 'seal-dissolving' : ''}`}
            style={isReturning ? { animationDuration: '0.2s', animationDelay: '0.1s' } : undefined}
          >
            <span className="seal-letter">M</span>
            <span className="seal-ampersand">&</span>
            <span className="seal-letter">M</span>
          </div>

          {/* Envelope flap */}
          <div
            className={`envelope-flap ${phase === 'open' || phase === 'rise' || phase === 'reveal' ? 'flap-open' : ''}`}
            style={isReturning ? { animationDuration: '0.3s', animationDelay: '0.2s' } : undefined}
          />

          {/* Invitation card inside */}
          <div
            className={`invitation-card ${phase === 'rise' || phase === 'reveal' ? 'card-risen' : ''}`}
            style={isReturning ? { animationDuration: '0.4s', animationDelay: '0.4s' } : undefined}
          >
            <div className={`card-content ${phase === 'reveal' ? 'content-visible' : ''}`}>
              <p className="card-bismillah" dir="rtl">
                {isReturning ? 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ' : 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'}
              </p>

              <div className="card-names">
                <span className="card-name">Al-Mustapha</span>
                <span className="card-ampersand">&</span>
                <span className="card-name">Maryam</span>
              </div>

              <p className="card-date">31 October 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enter button */}
      <button
        className={`enter-btn ${phase === 'reveal' ? 'btn-visible' : ''}`}
        onClick={handleEnter}
        aria-label="Enter the invitation"
        style={isReturning ? { animationDuration: '0.2s', animationDelay: '0.6s' } : undefined}
      >
        Enter Invitation
      </button>
    </div>
  )
}
