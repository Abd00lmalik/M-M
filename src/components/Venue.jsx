import { useEffect, useRef } from 'react'
import { wedding } from '../data/weddingData'

export default function Venue() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let ctx

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!contentRef.current) return

      const label = contentRef.current.querySelector('.venue-label')
      const name = contentRef.current.querySelector('.venue-name')
      const address = contentRef.current.querySelector('.venue-address')
      const divLines = contentRef.current.querySelectorAll('.venue-div-line')
      const divDiamond = contentRef.current.querySelector('.venue-div-diamond')

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        })

        // Label
        if (label) {
          tl.fromTo(label,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            0
          )
        }

        // Name — scale from slightly below
        if (name) {
          tl.fromTo(name,
            { opacity: 0, scale: 0.95, y: 16 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            0.15
          )
        }

        // Address
        if (address) {
          tl.fromTo(address,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            0.4
          )
        }

        // Divider — diamond first, then lines expand
        if (divDiamond) {
          tl.fromTo(divDiamond,
            { scale: 0, rotation: 0 },
            { scale: 1, rotation: 45, duration: 0.3, ease: 'back.out(2)' },
            0.6
          )
        }
        divLines.forEach((line, i) => {
          tl.fromTo(line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.4, ease: 'power2.inOut' },
            0.65 + i * 0.08
          )
        })


      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section className="section venue" id="venue" ref={sectionRef}>
      <div className="venue-inner">
        <div ref={contentRef}>
          <p className="venue-label">The Venue</p>

          <h2 className="venue-name">{wedding.event.venue.name}</h2>

          <p className="venue-address">{wedding.event.venue.address}</p>
        </div>
      </div>
    </section>
  )
}
