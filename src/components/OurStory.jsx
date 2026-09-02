import { useEffect, useRef } from 'react'
import { wedding } from '../data/weddingData'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function OurStory() {
  const headingRef = useScrollReveal()
  const timelineRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let ctx

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const items = timelineRef.current?.querySelectorAll('.story-item')
      if (!items?.length) return

      ctx = gsap.context(() => {
        // Animate the connecting line height as user scrolls through timeline
        if (lineRef.current) {
          gsap.fromTo(lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: timelineRef.current,
                start: 'top 70%',
                end: 'bottom 40%',
                scrub: 0.8,
              }
            }
          )
        }

        // Reveal each timeline item sequentially
        items.forEach((item, i) => {
          const node = item.querySelector('.story-node-dot')
          const content = item.querySelector('.story-content')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          })

          // Node dot: scale up from 0
          if (node) {
            tl.fromTo(node,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' },
              0
            )
          }

          // Content: fade + slide up
          if (content) {
            tl.fromTo(content,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
              0.15
            )
          }
        })
      }, timelineRef)
    }

    init()

    return () => ctx?.revert()
  }, [])

  return (
    <section className="section story" id="story">
      <div className="story-inner">
        <div className="reveal" ref={headingRef}>
          <p className="story-label">Our Journey</p>
          <h2 className="story-title">How It All Began</h2>
        </div>

        {/* Timeline */}
        <div className="story-timeline" ref={timelineRef} aria-label="Our love story timeline">
          {/* Connecting line */}
          <div
            className="story-line"
            ref={lineRef}
            aria-hidden="true"
            style={{ transformOrigin: 'top' }}
          />

          {wedding.story.map((milestone, index) => (
            <StoryItem key={index} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryItem({ milestone, index }) {
  const isLast = index === 3

  return (
    <div className={`story-item ${isLast ? 'story-item--final' : ''}`}>
      {/* Node on the line */}
      <div className="story-node" aria-hidden="true">
        <span className="story-node-dot" />
      </div>

      {/* Content */}
      <div className="story-content">
        <p className="story-date">{milestone.date}</p>
        <h3 className="story-item-title">{milestone.title}</h3>
        <p className="story-text">{milestone.text}</p>
      </div>
    </div>
  )
}
