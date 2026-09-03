import { wedding } from '../data/weddingData'
import { useCountdown } from '../hooks/useCountdown'

export default function Hero() {
  const countdown = useCountdown(wedding.event.date)

  return (
    <section className="hero" id="home">
      {/* Atmospheric glow layers */}
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-atmosphere-blush" aria-hidden="true" />

      <div className="hero-card">
        {/* Refined botanical corner accents */}
        <svg className="hero-corner hero-corner--tl" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M4 4 L4 28" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <path d="M4 4 L28 4" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <path d="M4 16 Q10 12 12 6" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <path d="M16 4 Q12 10 6 12" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="6" cy="12" r="1" fill="currentColor" opacity="0.15" />
        </svg>
        <svg className="hero-corner hero-corner--tr" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M60 4 L60 28" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <path d="M60 4 L36 4" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <path d="M60 16 Q54 12 52 6" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <path d="M48 4 Q52 10 58 12" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <circle cx="52" cy="6" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="58" cy="12" r="1" fill="currentColor" opacity="0.15" />
        </svg>
        <svg className="hero-corner hero-corner--bl" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M4 60 L4 36" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <path d="M4 60 L28 60" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <path d="M4 48 Q10 52 12 58" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <path d="M16 60 Q12 54 6 52" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <circle cx="12" cy="58" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="6" cy="52" r="1" fill="currentColor" opacity="0.15" />
        </svg>
        <svg className="hero-corner hero-corner--br" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M60 60 L60 36" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <path d="M60 60 L36 60" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <path d="M60 48 Q54 52 52 58" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <path d="M48 60 Q52 54 58 52" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
          <circle cx="52" cy="58" r="1" fill="currentColor" opacity="0.15" />
          <circle cx="58" cy="52" r="1" fill="currentColor" opacity="0.15" />
        </svg>

        {/* Content */}
        <p className="hero-bismillah" dir="rtl" lang="ar">
          {wedding.bismillah.arabic}
        </p>

        {/* Elegant divider */}
        <div className="hero-divider" aria-hidden="true">
          <span className="hero-divider-line" />
          <span className="hero-divider-diamond" />
          <span className="hero-divider-line" />
        </div>

        <h1 className="hero-names">
          <span className="hero-name">{wedding.couple.groom.first}</span>
          <span className="hero-ampersand" aria-hidden="true">&</span>
          <span className="hero-name">{wedding.couple.bride.first}</span>
        </h1>

        <p className="hero-date">{wedding.event.dateDisplay}</p>

        <p className="hero-tagline">
          {wedding.guestMessage}
        </p>

        {/* CTA */}
        <a href="#story" className="hero-cta">
          View Our Story
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </a>

        {/* Countdown */}
        <div className="hero-countdown">
          <CountdownDisplay countdown={countdown} />
        </div>
      </div>
    </section>
  )
}

function CountdownDisplay({ countdown }) {
  if (countdown.isPast) {
    return (
      <p className="countdown-past">
        Thank you for celebrating with us
      </p>
    )
  }

  if (countdown.isToday) {
    return (
      <p className="countdown-today">
        Today is the day
      </p>
    )
  }

  const units = [
    { value: countdown.days, label: 'Days' },
    { value: countdown.hours, label: 'Hours' },
    { value: countdown.minutes, label: 'Minutes' },
    { value: countdown.seconds, label: 'Seconds' },
  ]

  const displayUnits = countdown.days === 0
    ? units.filter(u => u.label !== 'Days')
    : units

  return (
    <div className="countdown">
      {displayUnits.map(({ value, label }) => (
        <div key={label} className="countdown-unit">
          <span className="countdown-number">
            {String(value).padStart(2, '0')}
          </span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}
