import { useEffect, useRef } from 'react'
import { wedding } from '../data/weddingData'

export default function Invitation() {
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

      const together = contentRef.current.querySelector('.invitation-together')
      const families = contentRef.current.querySelectorAll('.invitation-family')
      const and = contentRef.current.querySelector('.invitation-and')
      const invite = contentRef.current.querySelector('.invitation-invite')
      const names = contentRef.current.querySelectorAll('.invitation-name')
      const ampersand = contentRef.current.querySelector('.invitation-ampersand')
      const divLines = contentRef.current.querySelectorAll('.invitation-div-line')
      const divDiamond = contentRef.current.querySelector('.invitation-div-diamond')
      const details = contentRef.current.querySelector('.invitation-details')

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        })

        // "Together with their families"
        if (together) {
          tl.fromTo(together,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            0
          )
        }

        // Family names stagger
        families.forEach((fam, i) => {
          tl.fromTo(fam,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            0.15 + i * 0.12
          )
        })

        // "and" between families
        if (and) {
          tl.fromTo(and,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' },
            0.3
          )
        }

        // "cordially invite you"
        if (invite) {
          tl.fromTo(invite,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            0.5
          )
        }

        // Names — scale up dramatically
        names.forEach((name, i) => {
          tl.fromTo(name,
            { opacity: 0, scale: 0.9, y: 12 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power2.out' },
            0.7 + i * 0.15
          )
        })

        // Ampersand
        if (ampersand) {
          tl.fromTo(ampersand,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
            0.8
          )
        }

        // Divider lines expand from center
        if (divDiamond) {
          tl.fromTo(divDiamond,
            { scale: 0, rotation: 0 },
            { scale: 1, rotation: 45, duration: 0.3, ease: 'back.out(2)' },
            1.1
          )
        }
        divLines.forEach((line, i) => {
          tl.fromTo(line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.4, ease: 'power2.inOut' },
            1.1 + i * 0.08
          )
        })

        // Details
        if (details) {
          tl.fromTo(details,
            { opacity: 0, y: 8 },
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
    <section className="section invitation" id="invitation" ref={sectionRef}>
      <div className="invitation-inner">
        <div ref={contentRef}>
          <p className="invitation-together">
            Together with their families
          </p>

          <div className="invitation-families">
            <p className="invitation-family">
              The family of <strong>{wedding.families.groom}</strong>
            </p>
            <span className="invitation-and" aria-hidden="true">and</span>
            <p className="invitation-family">
              The family of <strong>{wedding.families.bride}</strong>
            </p>
          </div>

          <p className="invitation-invite">
            cordially invite you to the Nikah ceremony of
          </p>

          <div className="invitation-names">
            <span className="invitation-name">{wedding.couple.groom.first}</span>
            <span className="invitation-ampersand" aria-hidden="true">&</span>
            <span className="invitation-name">{wedding.couple.bride.first}</span>
          </div>

          <div className="invitation-divider" aria-hidden="true">
            <span className="invitation-div-line" />
            <span className="invitation-div-diamond" />
            <span className="invitation-div-line" />
          </div>

          <p className="invitation-details">
            {wedding.event.dateDisplay} &nbsp;·&nbsp; {wedding.event.time}
          </p>
        </div>
      </div>
    </section>
  )
}
