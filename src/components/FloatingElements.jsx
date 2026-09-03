import { useEffect, useState, useRef, useCallback } from 'react'

// Deterministic pseudo-random based on seed
function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

// Generate floating hearts with parallax
function generateHearts(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededRandom(i * 3 + 1) * 100,
    delay: seededRandom(i * 3 + 2) * 20,
    duration: 18 + seededRandom(i * 3 + 3) * 16,
    size: 14 + seededRandom(i * 7) * 14, // 14-28px — clearly visible
    baseOpacity: 0.08 + seededRandom(i * 5) * 0.12, // 0.08-0.20 — visible
    parallaxX: (seededRandom(i * 3 + 4) - 0.5) * 30,
  }))
}

// Generate gold particles with parallax
function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededRandom(i * 5 + 10) * 100,
    delay: seededRandom(i * 5 + 11) * 25,
    duration: 22 + seededRandom(i * 5 + 12) * 18,
    size: 1.5 + seededRandom(i * 5 + 13) * 2.5,
    baseOpacity: 0.08 + seededRandom(i * 5 + 14) * 0.12,
    parallaxX: (seededRandom(i * 5 + 15) - 0.5) * 16, // ±8px
  }))
}

// Generate botanical ornaments with parallax config
function generateBotanicals(count) {
  return Array.from({ length: count }, (_, i) => {
    const parallaxX = (seededRandom(i * 4 + 27) - 0.5) * 80
    const parallaxRotate = (seededRandom(i * 4 + 28) - 0.5) * 30
    return {
      id: i,
      x: seededRandom(i * 4 + 20) * 100,
      y: seededRandom(i * 4 + 21) * 100,
      delay: seededRandom(i * 4 + 22) * 30,
      duration: 25 + seededRandom(i * 4 + 23) * 20,
      rotation: seededRandom(i * 4 + 24) * 360,
      scale: 0.6 + seededRandom(i * 4 + 25) * 0.8,
      baseOpacity: 0.04 + seededRandom(i * 4 + 26) * 0.06, // 0.04-0.10 — visible
      type: i % 3,
      parallaxX,
      parallaxRotate,
    }
  })
}

const hearts = generateHearts(8)
const particles = generateParticles(14)
const botanicals = generateBotanicals(6)

// SVG heart path (elegant, not cartoonish)
function HeartSVG({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={color}
      />
    </svg>
  )
}

// SVG botanical leaf
function LeafSVG({ color }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 28 C16 20, 10 14, 4 8 C10 12, 14 16, 16 22" stroke={color} strokeWidth="0.6" />
      <path d="M16 28 C16 18, 22 12, 28 6 C22 10, 18 14, 16 20" stroke={color} strokeWidth="0.6" />
      <path d="M16 28 C16 16, 12 10, 6 4" stroke={color} strokeWidth="0.4" opacity="0.5" />
      <circle cx="4" cy="8" r="1" fill={color} opacity="0.3" />
      <circle cx="28" cy="6" r="1" fill={color} opacity="0.3" />
    </svg>
  )
}

// SVG branch with small buds
function BranchSVG({ color }) {
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" aria-hidden="true">
      <path d="M2 22 Q20 20 38 2" stroke={color} strokeWidth="0.5" />
      <path d="M10 18 Q12 14 10 10" stroke={color} strokeWidth="0.4" opacity="0.6" />
      <path d="M18 15 Q22 11 18 7" stroke={color} strokeWidth="0.4" opacity="0.6" />
      <path d="M26 11 Q30 7 26 3" stroke={color} strokeWidth="0.4" opacity="0.6" />
      <circle cx="10" cy="10" r="1.2" fill={color} opacity="0.25" />
      <circle cx="18" cy="7" r="1" fill={color} opacity="0.2" />
      <circle cx="26" cy="3" r="0.8" fill={color} opacity="0.15" />
    </svg>
  )
}

// SVG heart sprig (tiny heart on a stem)
function HeartSprigSVG({ color }) {
  return (
    <svg width="20" height="28" viewBox="0 0 20 28" fill="none" aria-hidden="true">
      <path d="M10 28 C10 22 8 18 10 14" stroke={color} strokeWidth="0.5" />
      <path d="M10 14 C8 12 5 12 5 15 C5 17 7 19 10 16" stroke={color} strokeWidth="0.5" fill="none" />
      <path d="M10 14 C12 12 15 12 15 15 C15 17 13 19 10 16" stroke={color} strokeWidth="0.5" fill="none" />
    </svg>
  )
}

const botanicalSvgs = [LeafSVG, BranchSVG, HeartSprigSVG]

export default function FloatingElements() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const heartRefs = useRef([])
  const particleRefs = useRef([])
  const botanicalRefs = useRef([])
  const ctxRef = useRef(null)

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  // GSAP ScrollTrigger: parallax for all + opacity fade for all
  useEffect(() => {
    if (prefersReducedMotion) return

    let cancelled = false

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled) return

      ctxRef.current = gsap.context(() => {
        const scrollConfig = {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        }

        // Hearts: subtle horizontal drift ±15px
        heartRefs.current.forEach((el, i) => {
          if (!el) return
          const h = hearts[i]
          gsap.fromTo(el,
            { x: -h.parallaxX * 0.5 },
            { x: h.parallaxX * 0.5, ease: 'none', scrollTrigger: scrollConfig }
          )
        })

        // Particles: very subtle horizontal drift ±8px
        particleRefs.current.forEach((el, i) => {
          if (!el) return
          const p = particles[i]
          gsap.fromTo(el,
            { x: -p.parallaxX * 0.5 },
            { x: p.parallaxX * 0.5, ease: 'none', scrollTrigger: scrollConfig }
          )
        })

        // Botanicals: horizontal drift ±40px + rotation
        botanicalRefs.current.forEach((el, i) => {
          if (!el) return
          const b = botanicals[i]
          gsap.fromTo(el,
            { x: -b.parallaxX * 0.5, rotation: -b.parallaxRotate * 0.5 },
            {
              x: b.parallaxX * 0.5,
              rotation: b.parallaxRotate * 0.5,
              ease: 'none',
              scrollTrigger: scrollConfig,
            }
          )
        })

        // Opacity fade: dim at top/bottom, full in middle — all floating elements
        ScrollTrigger.create({
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const progress = self.progress
            const mult = progress < 0.5
              ? progress * 2
              : (1 - progress) * 2

            heartRefs.current.forEach((el, i) => {
              if (!el) return
              el.style.opacity = hearts[i].baseOpacity * mult
            })

            particleRefs.current.forEach((el, i) => {
              if (!el) return
              el.style.opacity = particles[i].baseOpacity * mult
            })

            botanicalRefs.current.forEach((el, i) => {
              if (!el) return
              el.style.opacity = botanicals[i].baseOpacity * mult
            })
          }
        })
      })
    }

    init()

    return () => {
      cancelled = true
      ctxRef.current?.revert()
    }
  }, [prefersReducedMotion])

  const setHeartRef = useCallback((index) => (el) => {
    heartRefs.current[index] = el
  }, [])

  const setParticleRef = useCallback((index) => (el) => {
    particleRefs.current[index] = el
  }, [])

  const setBotanicalRef = useCallback((index) => (el) => {
    botanicalRefs.current[index] = el
  }, [])

  if (prefersReducedMotion) return null

  return (
    <div className="floating-elements" aria-hidden="true">
      {/* Floating hearts */}
      {hearts.map((heart) => (
        <div
          key={`heart-${heart.id}`}
          ref={setHeartRef(heart.id)}
          className="floating-heart"
          style={{
            left: `${heart.x}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.baseOpacity,
          }}
        >
          <HeartSVG size={heart.size} color="#D4A5A5" />
        </div>
      ))}

      {/* Gold particles */}
      {particles.map((p) => (
        <div
          key={`particle-${p.id}`}
          ref={setParticleRef(p.id)}
          className="floating-particle"
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.baseOpacity,
          }}
        />
      ))}

      {/* Botanical ornaments with scroll parallax + opacity fade */}
      {botanicals.map((b) => {
        const BotanicalSvg = botanicalSvgs[b.type]
        return (
          <div
            key={`botanical-${b.id}`}
            ref={setBotanicalRef(b.id)}
            className="floating-botanical"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              opacity: b.baseOpacity,
              transform: `rotate(${b.rotation}deg) scale(${b.scale})`,
            }}
          >
            <BotanicalSvg color="#b8965a" />
          </div>
        )
      })}
    </div>
  )
}
