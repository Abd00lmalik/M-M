import { useEffect, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
const photoOne = '/assets/Image 1.webp'
import photoTwo from '../assets/IMG_4502.webp'
import photoThree from '../assets/IMG_4504.webp'

const PHOTOS = [
  {
    src: photoOne,
    alt: 'Henna-adorned hands resting together, a symbol of union',
    caption: 'Our beginning',
  },
  {
    src: photoTwo,
    alt: 'Al-Mustapha and Maryam, a portrait from their journey together',
    caption: 'The celebration',
  },
  {
    src: photoThree,
    alt: 'Al-Mustapha and Maryam, a portrait from their journey together',
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
