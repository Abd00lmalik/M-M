import { useState, useEffect } from 'react'

export default function OpeningSequence({ onEnter }) {
  const [isHidden, setIsHidden] = useState(false)
  const [isReturning, setIsReturning] = useState(false)

  useEffect(() => {
    // Check for returning visitor (within 24h)
    try {
      const lastVisit = localStorage.getItem('wedding-visit')
      const now = Date.now()
      if (lastVisit && (now - parseInt(lastVisit)) < 24 * 60 * 60 * 1000) {
        setIsReturning(true)
      }
    } catch {
      // localStorage unavailable — treat as first visit
    }
  }, [])

  const handleEnter = () => {
    // Store visit timestamp
    try {
      localStorage.setItem('wedding-visit', Date.now().toString())
    } catch {
      // localStorage unavailable — continue anyway
    }
    setIsHidden(true)
    setTimeout(() => onEnter(), 600)
  }

  // For returning visitors, show abbreviated experience
  // Envelope appears quickly, Enter button shows sooner
  const animDelay = isReturning ? '0s' : undefined

  return (
    <div
      className={`opening-overlay ${isHidden ? 'hidden' : ''}`}
      aria-hidden={isHidden}
      style={isReturning ? { '--anim-delay': '0s' } : undefined}
    >
      {/* Envelope */}
      <div className="envelope" style={isReturning ? {
        animationDuration: '0.3s',
        animationDelay: '0.2s',
      } : undefined}>
        <div className="envelope-body">
          {/* Botanical SVG decoration */}
          <svg className="envelope-botanical" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 160 C60 120, 40 100, 20 80 C40 90, 55 100, 60 120" stroke="#b8965a" strokeWidth="0.8" opacity="0.5"/>
            <path d="M60 160 C60 130, 80 110, 100 90 C80 100, 65 110, 60 130" stroke="#b8965a" strokeWidth="0.8" opacity="0.5"/>
            <path d="M60 160 C60 110, 50 80, 30 50 C50 70, 58 90, 60 110" stroke="#b8965a" strokeWidth="0.8" opacity="0.4"/>
            <path d="M60 160 C60 120, 70 90, 90 60 C70 80, 62 100, 60 120" stroke="#b8965a" strokeWidth="0.8" opacity="0.4"/>
            <circle cx="20" cy="80" r="2" fill="#b8965a" opacity="0.3"/>
            <circle cx="100" cy="90" r="2" fill="#b8965a" opacity="0.3"/>
            <circle cx="30" cy="50" r="1.5" fill="#b8965a" opacity="0.25"/>
            <circle cx="90" cy="60" r="1.5" fill="#b8965a" opacity="0.25"/>
          </svg>

          {/* Wax seal */}
          <div className="wax-seal" style={isReturning ? {
            animationDuration: '0.2s',
            animationDelay: '0.1s',
          } : undefined}>A&M</div>
        </div>

        {/* Envelope flap */}
        <div className="envelope-flap" style={isReturning ? {
          animationDuration: '0.3s',
          animationDelay: '0.3s',
        } : undefined} />

        {/* Invitation card inside */}
        <div className="invitation-card" style={isReturning ? {
          animationDuration: '0.4s',
          animationDelay: '0.5s',
        } : undefined}>
          <div className="bismillah" style={isReturning ? {
            animationDuration: '0.2s',
            animationDelay: '0.6s',
          } : undefined}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
          <div className="names" style={isReturning ? {
            animationDuration: '0.3s',
            animationDelay: '0.7s',
          } : undefined}>
            Al-Mustapha
            <span className="ampersand">&</span>
            Maryam
          </div>
          <div className="date" style={isReturning ? {
            animationDuration: '0.2s',
            animationDelay: '0.8s',
          } : undefined}>31 October 2026</div>
        </div>
      </div>

      {/* Enter button */}
      <button
        className="enter-btn"
        onClick={handleEnter}
        aria-label="Enter website"
        style={isReturning ? {
          animationDuration: '0.2s',
          animationDelay: '1s',
        } : undefined}
      >
        Enter
      </button>
    </div>
  )
}
