import { wedding } from '../data/weddingData'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Venue() {
  const ref = useScrollReveal()

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    wedding.event.venue.name + ', ' + wedding.event.venue.address
  )}`

  return (
    <section className="section venue" id="venue">
      <div className="venue-inner">
        <div className="reveal" ref={ref}>
          <p className="venue-label">The Venue</p>

          <h2 className="venue-name">{wedding.event.venue.name}</h2>

          <p className="venue-address">{wedding.event.venue.address}</p>

          <div className="venue-divider" aria-hidden="true">
            <span className="venue-div-line" />
            <span className="venue-div-diamond" />
            <span className="venue-div-line" />
          </div>

          <a
            className="venue-cta"
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
