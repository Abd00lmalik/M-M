import { useEffect, useRef } from 'react'
import { wedding } from '../data/weddingData'

export default function QuranicVerses() {
  const sectionRef = useRef(null)
  const verse1Ref = useRef(null)
  const verse2Ref = useRef(null)
  const separatorRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let ctx

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Verse 1 — hero treatment: Arabic large scale, rule expands, English fades
        if (verse1Ref.current) {
          const v1 = verse1Ref.current
          const arabic = v1.querySelector('.quran-arabic--large')
          const rule = v1.querySelector('.quran-rule')
          const english = v1.querySelector('.quran-english--large')
          const ref = v1.querySelector('.quran-ref')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: v1,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          })

          if (arabic) {
            tl.fromTo(arabic,
              { opacity: 0, scale: 0.92, y: 16 },
              { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power2.out' },
              0
            )
          }
          if (rule) {
            tl.fromTo(rule,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
              0.3
            )
          }
          if (english) {
            tl.fromTo(english,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
              0.5
            )
          }
          if (ref) {
            tl.fromTo(ref,
              { opacity: 0 },
              { opacity: 1, duration: 0.4, ease: 'power2.out' },
              0.7
            )
          }
        }

        // Separator — lines expand outward from center
        if (separatorRef.current) {
          const lines = separatorRef.current.querySelectorAll('.quran-sep-line')
          const diamond = separatorRef.current.querySelector('.quran-sep-diamond')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: separatorRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          })

          if (diamond) {
            tl.fromTo(diamond,
              { scale: 0, rotation: 0 },
              { scale: 1, rotation: 45, duration: 0.4, ease: 'back.out(2)' },
              0
            )
          }
          lines.forEach((line, i) => {
            tl.fromTo(line,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.5, ease: 'power2.inOut' },
              0.1 + i * 0.1
            )
          })
        }

        // Verse 2 — contemplative: slower, more breathing room
        if (verse2Ref.current) {
          const v2 = verse2Ref.current
          const arabic = v2.querySelector('.quran-arabic')
          const rule = v2.querySelector('.quran-rule')
          const english = v2.querySelector('.quran-english')
          const ref = v2.querySelector('.quran-ref')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: v2,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          })

          if (arabic) {
            tl.fromTo(arabic,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
              0
            )
          }
          if (rule) {
            tl.fromTo(rule,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
              0.4
            )
          }
          if (english) {
            tl.fromTo(english,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
              0.6
            )
          }
          if (ref) {
            tl.fromTo(ref,
              { opacity: 0 },
              { opacity: 1, duration: 0.4, ease: 'power2.out' },
              0.9
            )
          }
        }
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section className="section quran" id="quran" ref={sectionRef}>
      <div className="quran-inner">
        {/* Verse 1 — short, large, dominant */}
        <div className="quran-verse quran-verse--hero" ref={verse1Ref}>
          <p className="quran-arabic quran-arabic--large" dir="rtl">
            {wedding.verses[0].arabic}
          </p>
          <div className="quran-rule" aria-hidden="true" />
          <p className="quran-english quran-english--large">
            &ldquo;{wedding.verses[0].english}&rdquo;
          </p>
          <p className="quran-ref">{wedding.verses[0].reference}</p>
        </div>

        {/* Delicate separator */}
        <div className="quran-separator" ref={separatorRef} aria-hidden="true">
          <span className="quran-sep-line" />
          <span className="quran-sep-diamond" />
          <span className="quran-sep-line" />
        </div>

        {/* Verse 2 — longer, more contemplative */}
        <div className="quran-verse quran-verse--contemplative" ref={verse2Ref}>
          <p className="quran-arabic" dir="rtl">
            {wedding.verses[1].arabic}
          </p>
          <div className="quran-rule" aria-hidden="true" />
          <p className="quran-english">
            &ldquo;{wedding.verses[1].english}&rdquo;
          </p>
          <p className="quran-ref">{wedding.verses[1].reference}</p>
        </div>
      </div>
    </section>
  )
}
