import { useScrollReveal } from '../hooks/useScrollReveal'

// Placeholder images — will be replaced with real photos
const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    alt: 'Couple moment — placeholder awaiting real photo',
  },
  {
    src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    alt: 'Wedding celebration — placeholder awaiting real photo',
  },
  {
    src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    alt: 'Together — placeholder awaiting real photo',
  },
]

export default function Gallery() {
  const headingRef = useScrollReveal()

  return (
    <section className="section" id="gallery">
      <div className="section-container">
        <div className="reveal" ref={headingRef}>
          <p className="section-label">Our Moments</p>
          <h2 className="section-title">Gallery</h2>
        </div>

        <div className="gallery" style={{ marginTop: '32px' }}>
          {PHOTOS.map((photo, index) => (
            <GalleryImage key={index} photo={photo} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryImage({ photo, index }) {
  const ref = useScrollReveal({ threshold: 0.1 })

  return (
    <div className="reveal" ref={ref} style={{ transitionDelay: `${index * 0.12}s` }}>
      <img
        className="gallery-image"
        src={photo.src}
        alt={photo.alt}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
