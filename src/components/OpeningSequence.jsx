import { useState, useEffect, useCallback, useRef } from 'react'

/*
  CINEMATIC OPENING SEQUENCE
  Timeline:
  0.0-0.6s  — Dark, atmospheric glow
  0.6-2.4s  — Two calligraphic M's enter from opposite sides
  2.4-3.2s  — M's merge, Bismillah appears
  3.2-3.7s  — Hold, then dissolve
  3.7-4.5s  — "Al-Mustapha Weds Maryam" title
  4.5-5.5s  — Slow cinematic zoom into darkness
  After zoom — Heart descends (interactive)
  After tap  — Heart pops, music starts, transition to site
*/

export default function OpeningSequence({ onEnter }) {
  const [phase, setPhase] = useState('dark')
  const [isReturning, setIsReturning] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [heartVisible, setHeartVisible] = useState(false)
  const [heartPopped, setHeartPopped] = useState(false)
  const timersRef = useRef([])

  // Check returning visitor
  useEffect(() => {
    try {
      const lastVisit = localStorage.getItem('wedding-visit')
      if (lastVisit && (Date.now() - parseInt(lastVisit)) < 24 * 60 * 60 * 1000) {
        setIsReturning(true)
      }
    } catch { /* localStorage unavailable */ }
  }, [])

  // Main timeline
  useEffect(() => {
    // Clear any existing timers
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    if (isReturning) {
      // Abbreviated: skip to heart quickly
      const t1 = setTimeout(() => setPhase('title'), 300)
      const t2 = setTimeout(() => setPhase('zooming'), 800)
      const t3 = setTimeout(() => { setPhase('dark2'); setHeartVisible(true) }, 1400)
      timersRef.current.push(t1, t2, t3)
      return () => timersRef.current.forEach(clearTimeout)
    }

    // Full cinematic timeline
    const schedule = [
      [600, () => setPhase('ms-entering')],
      [2400, () => setPhase('ms-merging')],
      [3200, () => setPhase('dissolving')],
      [3700, () => setPhase('title')],
      [4500, () => setPhase('zooming')],
      [5500, () => { setPhase('dark2'); setHeartVisible(true) }],
    ]

    schedule.forEach(([delay, fn]) => {
      timersRef.current.push(setTimeout(fn, delay))
    })

    return () => timersRef.current.forEach(clearTimeout)
  }, [isReturning])

  // Heart pop handler
  const handleHeartTap = useCallback(() => {
    if (heartPopped) return
    setHeartPopped(true)
    setTimeout(() => {
      try {
        localStorage.setItem('wedding-visit', Date.now().toString())
      } catch { /* continue */ }
      setIsHidden(true)
      setTimeout(() => onEnter(), 800)
    }, 900)
  }, [heartPopped, onEnter])

  const dur = isReturning ? '0.3s' : undefined

  return (
    <div
      className={`opening-overlay ${isHidden ? 'hidden' : ''}`}
      aria-hidden={isHidden}
      role="dialog"
      aria-label="Wedding invitation opening"
    >
      {/* Film grain overlay */}
      <div className="opening-grain" aria-hidden="true" />

      {/* Atmospheric gold glow */}
      <div className="opening-glow" aria-hidden="true" />

      {/* ===== CINEMATIC M SEQUENCE ===== */}
      <div className={`opening-cinematic ${phase !== 'dark' && phase !== 'dark2' ? 'active' : ''}`}>

        {/* Left M — Al-Mustapha */}
        <div
          className={`opening-m opening-m--left ${
            phase === 'ms-entering' ? 'entering' :
            phase === 'ms-merging' ? 'merging' :
            phase === 'dissolving' ? 'dissolving' : ''
          }`}
          style={dur ? { animationDuration: dur } : undefined}
          aria-hidden="true"
        >
          <svg viewBox="0 0 120 140" className="opening-m-svg">
            <text
              x="60" y="110"
              textAnchor="middle"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize="120"
              fontWeight="300"
              fontStyle="italic"
              fill="url(#goldGradient)"
              opacity="0.9"
            >
              M
            </text>
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#C9A84C" />
                <stop offset="100%" stopColor="#b8965a" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Right M — Maryam */}
        <div
          className={`opening-m opening-m--right ${
            phase === 'ms-entering' ? 'entering' :
            phase === 'ms-merging' ? 'merging' :
            phase === 'dissolving' ? 'dissolving' : ''
          }`}
          style={dur ? { animationDuration: dur } : undefined}
          aria-hidden="true"
        >
          <svg viewBox="0 0 120 140" className="opening-m-svg">
            <text
              x="60" y="110"
              textAnchor="middle"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize="120"
              fontWeight="300"
              fontStyle="italic"
              fill="url(#goldGradient2)"
              opacity="0.9"
            >
              M
            </text>
            <defs>
              <linearGradient id="goldGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#C9A84C" />
                <stop offset="100%" stopColor="#b8965a" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Merged M glow — visible when M's meet */}
        <div
          className={`opening-merged-glow ${
            phase === 'ms-merging' ? 'visible' :
            phase === 'dissolving' ? 'fading' : ''
          }`}
          aria-hidden="true"
        />

        {/* Bismillah — appears at merge */}
        <p
          className={`opening-bismillah ${
            phase === 'ms-merging' ? 'visible' :
            phase === 'dissolving' ? 'fading' : ''
          }`}
          dir="rtl"
          lang="ar"
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
      </div>

      {/* ===== TITLE SEQUENCE ===== */}
      <div className={`opening-title ${phase === 'title' || phase === 'zooming' ? 'visible' : ''} ${phase === 'zooming' ? 'zooming' : ''}`}>
        <span className="opening-title-name">Al-Mustapha</span>
        <span className="opening-title-weds">Weds</span>
        <span className="opening-title-name">Maryam</span>
      </div>

      {/* ===== HEART INTERACTION ===== */}
      {heartVisible && (
        <div
          className={`opening-heart-scene ${heartPopped ? 'popped' : ''}`}
          onClick={handleHeartTap}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleHeartTap() }}
          role="button"
          tabIndex={0}
          aria-label="Tap the heart to enter the invitation and start music"
        >
          {/* Heart */}
          <div className={`opening-heart ${heartPopped ? 'heart-popped' : ''}`}>
            <svg viewBox="0 0 100 100" className="opening-heart-svg">
              <defs>
                <radialGradient id="heartGlow" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#F3E9DC" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#E8C4C4" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#D4A5A5" stopOpacity="0.4" />
                </radialGradient>
                <linearGradient id="heartGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {/* Outer glow */}
              <path
                d="M50 88 C25 65, 5 50, 5 32 C5 18, 16 8, 30 8 C38 8, 45 12, 50 20 C55 12, 62 8, 70 8 C84 8, 95 18, 95 32 C95 50, 75 65, 50 88Z"
                fill="url(#heartGlow)"
                filter="url(#heartBlur)"
              />
              {/* Heart shape */}
              <path
                d="M50 82 C28 62, 12 48, 12 33 C12 21, 21 12, 32 12 C39 12, 45 16, 50 22 C55 16, 61 12, 68 12 C79 12, 88 21, 88 33 C88 48, 72 62, 50 82Z"
                fill="url(#heartGlow)"
              />
              {/* Gold accent line */}
              <path
                d="M50 78 C30 60, 16 47, 16 34 C16 24, 23 16, 33 16 C39 16, 44 19, 50 24 C56 19, 61 16, 67 16 C77 16, 84 24, 84 34 C84 47, 70 60, 50 78Z"
                fill="none"
                stroke="url(#heartGold)"
                strokeWidth="0.8"
              />
              <defs>
                <filter id="heartBlur">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>
            </svg>
          </div>

          {/* Tap instruction */}
          <p className={`opening-heart-instruction ${heartPopped ? 'fading' : ''}`}>
            Tap the heart
          </p>

          {/* Pop particles */}
          {heartPopped && (
            <div className="opening-heart-particles" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <span
                  key={i}
                  className="heart-particle"
                  style={{
                    '--angle': `${i * 45}deg`,
                    '--delay': `${i * 0.03}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
