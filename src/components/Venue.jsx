import { wedding } from '../data/weddingData'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Venue() {
  const ref = useScrollReveal()

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    wedding.event.venue.name + ', ' + wedding.event.venue.address
  )}`

  return (
    <section className="section" id="venue">
      <div className="section-narrow">
        <div className="reveal" ref={ref}>
          <p className="section-label">The Nikah</p>
          <h2 className="section-title">Venue</h2>

          <div className="gold-divider">
            <div className="line" />
            <div className="diamond" />
            <div className="line" />
          </div>

          <div className="venue-card">
            {/* Mosque icon */}
            <div className="venue-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L12 6" />
                <path d="M8 6L16 6" />
                <path d="M6 6L6 20" />
                <path d="M18 6L18 20" />
                <path d="M4 20L20 20" />
                <path d="M12 2C12 2 9 4 9 6" />
                <path d="M12 2C12 2 15 4 15 6" />
                <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.3" />
              </svg>
            </div>

            <h3 className="venue-name">{wedding.event.venue.name}</h3>
            <p className="venue-address">{wedding.event.venue.address}</p>

            <a
              className="venue-maps-btn"
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Open in Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
