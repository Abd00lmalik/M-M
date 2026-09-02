import { useEffect, useRef } from 'react'
import { wedding } from '../data/weddingData'

export default function TheNikah() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    wedding.event.venue.name + ', ' + wedding.event.venue.address
  )}`

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let ctx

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!contentRef.current) return

      const ornament = contentRef.current.querySelector('.nikah-ornament')
      const label = contentRef.current.querySelector('.nikah-label')
      const day = contentRef.current.querySelector('.nikah-day')
      const dateDay = contentRef.current.querySelector('.nikah-date-day')
      const dateMonth = contentRef.current.querySelector('.nikah-date-month')
      const dateYear = contentRef.current.querySelector('.nikah-date-year')
      const time = contentRef.current.querySelector('.nikah-time')
      const divLines = contentRef.current.querySelectorAll('.nikah-divider-line')
      const divDot = contentRef.current.querySelector('.nikah-divider-dot')
      const venue = contentRef.current.querySelector('.nikah-venue')
      const cta = contentRef.current.querySelector('.nikah-cta')

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        })

        // Ornament — fade + subtle rotation
        if (ornament) {
          tl.fromTo(ornament,
            { opacity: 0, scale: 0.5, rotation: -90 },
            { opacity: 0.25, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.5)' },
            0
          )
        }

        // Label
        if (label) {
          tl.fromTo(label,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            0.2
          )
        }

        // Day
        if (day) {
          tl.fromTo(day,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            0.3
          )
        }

        // Large date number — scale up from below
        if (dateDay) {
          tl.fromTo(dateDay,
            { opacity: 0, scale: 0.6, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            0.35
          )
        }

        // Month — slide in from right
        if (dateMonth) {
          tl.fromTo(dateMonth,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
            0.6
          )
        }

        // Year
        if (dateYear) {
          tl.fromTo(dateYear,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
            0.7
          )
        }

        // Time
        if (time) {
          tl.fromTo(time,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            0.8
          )
        }

        // Divider — dot first, then lines expand
        if (divDot) {
          tl.fromTo(divDot,
            { scale: 0, rotation: 0 },
            { scale: 1, rotation: 45, duration: 0.3, ease: 'back.out(2)' },
            0.95
          )
        }
        divLines.forEach((line, i) => {
          tl.fromTo(line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.4, ease: 'power2.inOut' },
            1.0 + i * 0.08
          )
        })

        // Venue
        if (venue) {
          tl.fromTo(venue,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            1.15
          )
        }

        // CTA
        if (cta) {
          tl.fromTo(cta,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            1.3
          )
        }
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section className="section nikah" id="events" ref={sectionRef}>
      <div className="nikah-inner">
        <div ref={contentRef}>
          <div className="nikah-ornament" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 0L16 8" stroke="currentColor" strokeWidth="0.5" />
              <path d="M16 24L16 32" stroke="currentColor" strokeWidth="0.5" />
              <path d="M0 16L8 16" stroke="currentColor" strokeWidth="0.5" />
              <path d="M24 16L32 16" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.3" />
            </svg>
          </div>

          <p className="nikah-label">The Ceremony</p>
          <p className="nikah-day">Saturday</p>

          <div className="nikah-date">
            <span className="nikah-date-day">31</span>
            <span className="nikah-date-rest">
              <span className="nikah-date-month">October</span>
              <span className="nikah-date-year">2026</span>
            </span>
          </div>

          <p className="nikah-time">{wedding.event.time}</p>

          <div className="nikah-divider" aria-hidden="true">
            <span className="nikah-divider-line" />
            <span className="nikah-divider-dot" />
            <span className="nikah-divider-line" />
          </div>

          <p className="nikah-venue">{wedding.event.venue.name}</p>

          <a
            className="nikah-cta"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Open in Maps
          </a>
        </div>
      </div>
    </section>
  )
}
