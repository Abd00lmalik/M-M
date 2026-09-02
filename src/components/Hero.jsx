import { wedding } from '../data/weddingData'
import { useCountdown } from '../hooks/useCountdown'

export default function Hero() {
  const countdown = useCountdown(wedding.event.date)

  return (
    <section className="hero" id="home">
      {/* Atmospheric background glow */}
      <div className="hero-atmosphere" aria-hidden="true" />

      <div className="hero-card">
        {/* Botanical corner accents */}
        <svg className="hero-corner hero-corner--tl" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <path d="M4 4 L4 24" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
          <path d="M4 4 L24 4" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
          <path d="M4 12 Q8 10 10 6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <path d="M12 4 Q10 8 6 10" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        </svg>
        <svg className="hero-corner hero-corner--tr" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <path d="M52 4 L52 24" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
          <path d="M52 4 L32 4" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
          <path d="M52 12 Q48 10 46 6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <path d="M44 4 Q46 8 50 10" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        </svg>
        <svg className="hero-corner hero-corner--bl" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <path d="M4 52 L4 32" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
          <path d="M4 52 L24 52" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
          <path d="M4 44 Q8 46 10 50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <path d="M12 52 Q10 48 6 46" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        </svg>
        <svg className="hero-corner hero-corner--br" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <path d="M52 52 L52 32" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
          <path d="M52 52 L32 52" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
          <path d="M52 44 Q48 46 46 50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <path d="M44 52 Q46 48 50 46" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        </svg>

        {/* Content */}
        <p className="hero-bismillah" dir="rtl">
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

        {/* CTA — visible, not buried */}
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
