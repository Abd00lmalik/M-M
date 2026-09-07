import { useState, useEffect, useCallback, useRef } from 'react'

/*
  CINEMATIC OPENING — Pure CSS Animations
  
  iOS Safari breaks GSAP dynamic imports + filter tweens.
  Using CSS @keyframes for rock-solid cross-platform intro.
  
  Sequence (CSS-driven):
  0.0s  — Dark, glow pulses
  0.6s  — M's enter from opposite sides
  2.4s  — M's fuse, gold glow, Bismillah
  3.2s  — Dissolve M + Bismillah
  3.8s  — Title appears
  4.8s  — Cinematic zoom + fade
  5.8s  — Heart descends (interactive tap)
*/

export default function OpeningSequence({ onComplete, onPlayMusic }) {
  const [phase, setPhase] = useState('m-enter') // m-enter → fuse → dissolve → title → zoom → heart
  const [heartPopped, setHeartPopped] = useState(false)
  const heartRef = useRef(null)

  // Drive phases with CSS animation events
  useEffect(() => {
    const timers = []

    // Phase timeline — matches CSS animation durations
    timers.push(setTimeout(() => setPhase('fuse'), 1800))      // 0.6s + 1.8s = 2.4s
    timers.push(setTimeout(() => setPhase('dissolve'), 3200))  // 2.4s + 0.8s = 3.2s
    timers.push(setTimeout(() => setPhase('title'), 3800))     // 3.2s + 0.6s = 3.8s
    timers.push(setTimeout(() => setPhase('zoom'), 4800))      // 3.8s + 1.0s = 4.8s
    timers.push(setTimeout(() => setPhase('heart'), 6000))     // 4.8s + 1.2s = 6.0s

    return () => timers.forEach(clearTimeout)
  }, [])

  // Heart pop handler
  const handleHeartTap = useCallback(() => {
    if (heartPopped) return
    setHeartPopped(true)

    // Play music directly in click handler (required for iOS)
    onPlayMusic?.()

    // After pop animation completes, open site
    setTimeout(() => onComplete(), 600)
  }, [heartPopped, onComplete, onPlayMusic])

  return (
    <div className="opening-overlay" role="dialog" aria-label="Wedding invitation opening">
      {/* Film grain */}
      <div className="opening-grain" aria-hidden="true" />

      {/* Atmospheric glow */}
      <div className="opening-glow" aria-hidden="true" />

      {/* ===== M SEQUENCE ===== */}
      <div className={`opening-cinematic opening-phase--${phase}`}>
        {/* Left M */}
        <div className="opening-m opening-m--left" aria-hidden="true">
          <svg viewBox="0 0 120 140" className="opening-m-svg">
            <defs>
              <linearGradient id="gLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#C9A84C" />
                <stop offset="100%" stopColor="#b8965a" />
              </linearGradient>
            </defs>
            <text x="60" y="110" textAnchor="middle"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize="120" fontWeight="300" fontStyle="italic"
              fill="url(#gLeft)" opacity="0.9">M</text>
          </svg>
        </div>

        {/* Right M */}
        <div className="opening-m opening-m--right" aria-hidden="true">
          <svg viewBox="0 0 120 140" className="opening-m-svg">
            <defs>
              <linearGradient id="gRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#C9A84C" />
                <stop offset="100%" stopColor="#b8965a" />
              </linearGradient>
            </defs>
            <text x="60" y="110" textAnchor="middle"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize="120" fontWeight="300" fontStyle="italic"
              fill="url(#gRight)" opacity="0.9">M</text>
          </svg>
        </div>

        {/* Merged glow */}
        <div className="opening-merged-glow" aria-hidden="true" />

        {/* Bismillah */}
        <p className="opening-bismillah" dir="rtl" lang="ar">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
      </div>

      {/* ===== TITLE ===== */}
      <div className={`opening-title opening-phase--${phase}`}>
        <span className="opening-title-name">Al-Mustapha</span>
        <span className="opening-title-weds">Weds</span>
        <span className="opening-title-name">Maryam</span>
      </div>

      {/* ===== HEART ===== */}
      {phase === 'heart' && (
        <div
          className={`opening-heart-scene ${heartPopped ? 'popped' : ''}`}
          onClick={handleHeartTap}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleHeartTap() }}
          role="button"
          tabIndex={0}
          aria-label="Tap the heart to enter the invitation"
        >
          <div className="opening-heart" ref={heartRef}>
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
              <path d="M50 88 C25 65, 5 50, 5 32 C5 18, 16 8, 30 8 C38 8, 45 12, 50 20 C55 12, 62 8, 70 8 C84 8, 95 18, 95 32 C95 50, 75 65, 50 88Z"
                fill="url(#heartGlow)" />
              <path d="M50 82 C28 62, 12 48, 12 33 C12 21, 21 12, 32 12 C39 12, 45 16, 50 22 C55 16, 61 12, 68 12 C79 12, 88 21, 88 33 C88 48, 72 62, 50 82Z"
                fill="url(#heartGlow)" />
              <path d="M50 78 C30 60, 16 47, 16 34 C16 24, 23 16, 33 16 C39 16, 44 19, 50 24 C56 19, 61 16, 67 16 C77 16, 84 24, 84 34 C84 47, 70 60, 50 78Z"
                fill="none" stroke="url(#heartGold)" strokeWidth="0.8" />
            </svg>
          </div>
          <p className="opening-heart-instruction">Tap the heart</p>
          {heartPopped && (
            <div className="opening-heart-particles" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i} className="heart-particle"
                  style={{ '--angle': `${i * 45}deg`, '--delay': `${i * 0.03}s` }} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
