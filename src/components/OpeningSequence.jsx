import { useState, useEffect, useCallback, useRef } from 'react'

/*
  CINEMATIC OPENING — GSAP Timeline
  
  One master timeline controls every element.
  No CSS keyframes. No setTimeout. No lag.
  
  Sequence:
  0.0s  — Dark, glow pulses
  0.6s  — M's enter from opposite sides (GSAP tween)
  2.4s  — M's fuse to center, gold glow, Bismillah
  3.2s  — Dissolve M + Bismillah
  3.7s  — Title appears
  4.5s  — Cinematic zoom
  5.5s  — Heart descends (interactive)
  User taps → pop → music → site
*/

// Detect iOS Safari
function isIOS() {
  return /iP(hone|od|ad)/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export default function OpeningSequence({ onComplete, onPlayMusic }) {
  const overlayRef = useRef(null)
  const leftMRef = useRef(null)
  const rightMRef = useRef(null)
  const glowRef = useRef(null)
  const bismillahRef = useRef(null)
  const titleRef = useRef(null)
  const heartSceneRef = useRef(null)
  const heartRef = useRef(null)
  const instructionRef = useRef(null)
  const ctxRef = useRef(null)
  const [showHeart, setShowHeart] = useState(false)
  const [heartPopped, setHeartPopped] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function init() {
      const { gsap } = await import('gsap')
      if (cancelled) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const ios = isIOS()

      // Master timeline
      const tl = gsap.timeline({
        onComplete: () => {
          if (!cancelled) setShowHeart(true)
        }
      })

      ctxRef.current = tl

      // iOS: always run full sequence (reduced motion breaks it)
      // Non-iOS reduced motion: compressed but still shows heart
      if (reduced && !ios) {
        // Compressed sequence — still shows heart for interaction
        tl.set([leftMRef.current, rightMRef.current], { opacity: 0, x: 0 })
        tl.set(glowRef.current, { opacity: 0, scale: 0.5 })
        tl.set(bismillahRef.current, { opacity: 0, y: 10 })
        tl.set(titleRef.current, { opacity: 0, scale: 0.95 })

        tl.to([leftMRef.current, rightMRef.current], {
          opacity: 0.9, duration: 0.4, stagger: 0.05
        }, 0)
        tl.to(glowRef.current, { opacity: 1, scale: 1, duration: 0.4 }, 0.15)
        tl.to(bismillahRef.current, { opacity: 0.7, y: 0, duration: 0.4 }, 0.25)
        tl.to([leftMRef.current, rightMRef.current, glowRef.current, bismillahRef.current], {
          opacity: 0, duration: 0.4
        }, 0.7)
        tl.to(titleRef.current, { opacity: 1, scale: 1, duration: 0.5 }, 0.9)
        tl.to(titleRef.current, { opacity: 0, scale: 1.15, duration: 0.4 }, 1.6)
      } else {
        // Full cinematic sequence (used on iOS too — no blur filters)
        const startLeft = { x: -160, y: 15, rotation: -6, scale: 0.85, opacity: 0 }
        const startRight = { x: 160, y: -15, rotation: 6, scale: 0.85, opacity: 0 }

        // Initial states
        gsap.set(leftMRef.current, startLeft)
        gsap.set(rightMRef.current, startRight)
        gsap.set(glowRef.current, { opacity: 0, scale: 0.5 })
        gsap.set(bismillahRef.current, { opacity: 0, y: 12 })
        gsap.set(titleRef.current, { opacity: 0, scale: 0.92, y: 20 })

        // Phase 1: M's enter (0.6s – 2.4s)
        tl.to(leftMRef.current, {
          x: -8, y: 0, rotation: -1.5, scale: 1, opacity: 0.9,
          duration: 1.8, ease: 'power2.out'
        }, 0.6)
        tl.to(rightMRef.current, {
          x: 8, y: 0, rotation: 1.5, scale: 1, opacity: 0.9,
          duration: 1.8, ease: 'power2.out'
        }, 0.6)

        // Phase 2: M's fuse (2.4s – 3.2s)
        tl.to(leftMRef.current, {
          x: 0, rotation: 0, opacity: 0.85,
          duration: 0.8, ease: 'power3.inOut'
        }, 2.4)
        tl.to(rightMRef.current, {
          x: 0, rotation: 0, opacity: 0.85,
          duration: 0.8, ease: 'power3.inOut'
        }, 2.4)

        // Gold glow pulse at fusion
        tl.to(glowRef.current, {
          opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out'
        }, 2.6)
        tl.to(glowRef.current, {
          opacity: 0.7, scale: 1.08, duration: 0.4, ease: 'sine.inOut',
          yoyo: true, repeat: 1
        }, 3.0)

        // Bismillah fades in
        tl.to(bismillahRef.current, {
          opacity: 0.7, y: 0, duration: 0.6, ease: 'power2.out'
        }, 2.8)

        // Phase 3: Dissolve (3.2s – 3.7s) — opacity only, no blur (iOS safe)
        tl.to([leftMRef.current, rightMRef.current], {
          opacity: 0, scale: 1.06,
          duration: 0.5, ease: 'power2.in'
        }, 3.2)
        tl.to(glowRef.current, {
          opacity: 0, scale: 1.3, duration: 0.4, ease: 'power2.in'
        }, 3.3)
        tl.to(bismillahRef.current, {
          opacity: 0, y: -10, duration: 0.4, ease: 'power2.in'
        }, 3.3)

        // Phase 4: Title reveal (3.7s – 4.5s)
        tl.to(titleRef.current, {
          opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power2.out'
        }, 3.8)

        // Phase 5: Cinematic zoom (4.5s – 5.5s) — no blur (iOS safe)
        tl.to(titleRef.current, {
          scale: 1.5, opacity: 0,
          duration: 1.0, ease: 'power2.in'
        }, 4.5)
      }
    }

    init()

    return () => {
      cancelled = true
      ctxRef.current?.kill()
    }
  }, [])

  // Heart pop handler
  const handleHeartTap = useCallback(() => {
    if (heartPopped || !heartRef.current) return
    setHeartPopped(true)

    // Play music directly in click handler (required for iOS)
    onPlayMusic?.()

    // Import GSAP for pop animation
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({
        onComplete: () => onComplete()
      })

      tl.to(heartRef.current, {
        scale: 0.85, duration: 0.15, ease: 'power2.in'
      })
      tl.to(heartRef.current, {
        scale: 1.2, opacity: 0,
        duration: 0.5, ease: 'power2.out'
      })
      tl.to(instructionRef.current, {
        opacity: 0, duration: 0.2
      }, 0)
    })
  }, [heartPopped, onComplete, onPlayMusic])

  return (
    <div
      className="opening-overlay"
      ref={overlayRef}
      role="dialog"
      aria-label="Wedding invitation opening"
    >
      {/* Film grain */}
      <div className="opening-grain" aria-hidden="true" />

      {/* Atmospheric glow */}
      <div className="opening-glow" aria-hidden="true" />

      {/* ===== M SEQUENCE ===== */}
      <div className="opening-cinematic">
        {/* Left M */}
        <div className="opening-m opening-m--left" ref={leftMRef} aria-hidden="true">
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
        <div className="opening-m opening-m--right" ref={rightMRef} aria-hidden="true">
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
        <div className="opening-merged-glow" ref={glowRef} aria-hidden="true" />

        {/* Bismillah */}
        <p className="opening-bismillah" ref={bismillahRef} dir="rtl" lang="ar">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>
      </div>

      {/* ===== TITLE ===== */}
      <div className="opening-title" ref={titleRef}>
        <span className="opening-title-name">Al-Mustapha</span>
        <span className="opening-title-weds">Weds</span>
        <span className="opening-title-name">Maryam</span>
      </div>

      {/* ===== HEART ===== */}
      {showHeart && (
        <div
          className={`opening-heart-scene ${heartPopped ? 'popped' : ''}`}
          onClick={handleHeartTap}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleHeartTap() }}
          role="button"
          tabIndex={0}
          aria-label="Tap the heart to enter the invitation"
          ref={heartSceneRef}
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
          <p className="opening-heart-instruction" ref={instructionRef}>Tap the heart</p>
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
