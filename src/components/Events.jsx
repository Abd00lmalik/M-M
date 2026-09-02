import { wedding } from '../data/weddingData'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Events() {
  const ref = useScrollReveal()

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    wedding.event.venue.name + ', ' + wedding.event.venue.address
  )}`

  return (
    <section className="section" id="events">
      <div className="section-narrow">
        <div className="reveal" ref={ref}>
          <p className="section-label">Save the Date</p>
          <h2 className="section-title">{wedding.event.name} Ceremony</h2>

          <div className="gold-divider">
            <div className="line" />
            <div className="diamond" />
            <div className="line" />
          </div>

          <div className="event-card">
            <p className="event-label">{wedding.event.type}</p>
            <p className="event-date">{wedding.event.dateDisplay}</p>
            <p className="event-time">{wedding.event.time}</p>
            <p className="event-venue">{wedding.event.venue.name}</p>
            <p className="event-address">{wedding.event.venue.address}</p>
            <a
              className="event-directions"
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
