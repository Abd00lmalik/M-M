import { wedding } from '../data/weddingData'
import { useCountdown } from '../hooks/useCountdown'

export default function Hero() {
  const countdown = useCountdown(wedding.event.date)

  return (
    <section className="hero" id="home">
      <div className="hero-invitation">
        {/* Botanical corner details — gold stems with subtle rose buds */}
        <svg className="hero-corner hero-corner--tl" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Gold stems */}
          <path d="M4 4 L4 28" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
          <path d="M4 4 L28 4" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
          <path d="M4 14 Q8 14 10 10" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <path d="M4 20 Q10 18 12 12" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
          <path d="M4 26 Q12 22 14 14" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <path d="M14 4 Q14 10 10 12" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <path d="M20 4 Q18 12 12 14" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
          <path d="M26 4 Q22 14 14 16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          {/* Gold bud dots */}
          <circle cx="10" cy="10" r="1.2" fill="currentColor" opacity="0.15" />
          <circle cx="16" cy="8" r="0.8" fill="currentColor" opacity="0.12" />
          {/* Subtle rose bud — very faint blush tint */}
          <circle cx="8" cy="16" r="1" fill="#d4a5a5" opacity="0.1" />
          <circle cx="12" cy="22" r="0.7" fill="#d4a5a5" opacity="0.08" />
        </svg>
        <svg className="hero-corner hero-corner--tr" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4 L4 28" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
          <path d="M4 4 L28 4" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
          <path d="M4 14 Q8 14 10 10" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <path d="M4 20 Q10 18 12 12" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
          <path d="M4 26 Q12 22 14 14" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <path d="M14 4 Q14 10 10 12" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <path d="M20 4 Q18 12 12 14" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
          <path d="M26 4 Q22 14 14 16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <circle cx="10" cy="10" r="1.2" fill="currentColor" opacity="0.15" />
          <circle cx="16" cy="8" r="0.8" fill="currentColor" opacity="0.12" />
          <circle cx="8" cy="16" r="1" fill="#d4a5a5" opacity="0.1" />
          <circle cx="12" cy="22" r="0.7" fill="#d4a5a5" opacity="0.08" />
        </svg>
        <svg className="hero-corner hero-corner--bl" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4 L4 28" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
          <path d="M4 4 L28 4" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
          <path d="M4 14 Q8 14 10 10" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <path d="M4 20 Q10 18 12 12" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
          <path d="M4 26 Q12 22 14 14" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <path d="M14 4 Q14 10 10 12" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <path d="M20 4 Q18 12 12 14" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
          <path d="M26 4 Q22 14 14 16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <circle cx="10" cy="10" r="1.2" fill="currentColor" opacity="0.15" />
          <circle cx="16" cy="8" r="0.8" fill="currentColor" opacity="0.12" />
          <circle cx="8" cy="16" r="1" fill="#d4a5a5" opacity="0.1" />
          <circle cx="12" cy="22" r="0.7" fill="#d4a5a5" opacity="0.08" />
        </svg>
        <svg className="hero-corner hero-corner--br" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4 L4 28" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
          <path d="M4 4 L28 4" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
          <path d="M4 14 Q8 14 10 10" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <path d="M4 20 Q10 18 12 12" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
          <path d="M4 26 Q12 22 14 14" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <path d="M14 4 Q14 10 10 12" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
          <path d="M20 4 Q18 12 12 14" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
          <path d="M26 4 Q22 14 14 16" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <circle cx="10" cy="10" r="1.2" fill="currentColor" opacity="0.15" />
          <circle cx="16" cy="8" r="0.8" fill="currentColor" opacity="0.12" />
          <circle cx="8" cy="16" r="1" fill="#d4a5a5" opacity="0.1" />
          <circle cx="12" cy="22" r="0.7" fill="#d4a5a5" opacity="0.08" />
        </svg>

        {/* Content hierarchy */}
        <div className="hero-bismillah" dir="rtl">
          {wedding.bismillah.arabic}
        </div>

        <h1 className="hero-names">
          {wedding.couple.groom.first}
          <span className="ampersand">&</span>
          {wedding.couple.bride.first}
        </h1>

        <p className="hero-date">{wedding.event.dateDisplay}</p>

        <p className="hero-tagline">
          {wedding.guestMessage}
        </p>

        <a href="#story" className="hero-cta">
          Enter Invitation
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>

        {/* Countdown below CTA */}
        <div className="hero-countdown-wrapper">
          <CountdownDisplay countdown={countdown} />
        </div>
      </div>
    </section>
  )
}

function CountdownDisplay({ countdown }) {
  if (countdown.isPast) {
    return (
      <div className="countdown">
        <div className="countdown-unit" style={{ minWidth: 'auto', padding: '14px 24px' }}>
          <span className="countdown-number" style={{ fontSize: '16px' }}>
            Thank you for celebrating with us
          </span>
        </div>
      </div>
    )
  }

  if (countdown.isToday) {
    return (
      <div className="countdown">
        <div className="countdown-unit" style={{ minWidth: 'auto', padding: '14px 24px' }}>
          <span className="countdown-number" style={{ fontSize: '20px' }}>
            Today is the day
          </span>
        </div>
      </div>
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
