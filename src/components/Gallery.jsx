import { useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    alt: 'Couple moment, placeholder awaiting real photo',
    caption: 'Our beginning',
  },
  {
    src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80',
    alt: 'Wedding celebration, placeholder awaiting real photo',
    caption: 'The celebration',
  },
  {
    src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80',
    alt: 'Together, placeholder awaiting real photo',
    caption: 'Together always',
  },
]

export default function Gallery() {
  const headingRef = useScrollReveal()
  const gridRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let ctx

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const items = gridRef.current?.querySelectorAll('.gallery-item')
      if (!items?.length) return

      ctx = gsap.context(() => {
        items.forEach((item, i) => {
          const img = item.querySelector('.gallery-img')
          const caption = item.querySelector('.gallery-caption')

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          })

          // Image: clip-path reveal from bottom + subtle scale
          if (img) {
            tl.fromTo(img,
              {
                clipPath: 'inset(100% 0% 0% 0%)',
                scale: 1.1,
                opacity: 0,
              },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
              },
              0
            )
          }

          // Caption: fade in after image
          if (caption) {
            tl.fromTo(caption,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              0.4
            )
          }
        })
      }, gridRef)
    }

    init()

    return () => ctx?.revert()
  }, [])

  return (
    <section className="section gallery" id="gallery">
      <div className="gallery-inner">
        <div className="reveal" ref={headingRef}>
          <p className="gallery-label">Our Moments</p>
          <h2 className="gallery-title">Gallery</h2>
        </div>

        <div className="gallery-grid" ref={gridRef}>
          {PHOTOS.map((photo, index) => (
            <GalleryImage key={index} photo={photo} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryImage({ photo, index }) {
  return (
    <figure className="gallery-item">
      <div className="gallery-image-wrap">
        <img
          className="gallery-img"
          src={photo.src}
          alt={photo.alt}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      <figcaption className="gallery-caption">{photo.caption}</figcaption>
    </figure>
  )
}
