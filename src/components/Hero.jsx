import { wedding } from '../data/weddingData'
import { useCountdown } from '../hooks/useCountdown'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Hero() {
  const countdown = useCountdown(wedding.event.date)
  const taglineRef = useScrollReveal()

  return (
    <section className="hero" id="home">
      {/* Bismillah */}
      <div className="hero-bismillah" dir="rtl">
        {wedding.bismillah.arabic}
      </div>

      {/* Couple names */}
      <h1 className="hero-names">
        {wedding.couple.groom.first}
        <span className="ampersand">&</span>
        {wedding.couple.bride.first}
      </h1>

      {/* Date */}
      <p className="hero-date">{wedding.event.dateDisplay}</p>

      {/* Tagline */}
      <p className="hero-tagline" ref={taglineRef}>
        {wedding.guestMessage}
      </p>

      {/* Countdown */}
      <CountdownDisplay countdown={countdown} />
    </section>
  )
}

function CountdownDisplay({ countdown }) {
  if (countdown.isPast) {
    return (
      <div className="countdown">
        <div className="countdown-unit" style={{ minWidth: 'auto', padding: '16px 28px' }}>
          <span className="countdown-number" style={{ fontSize: '18px' }}>
            Thank you for celebrating with us
          </span>
        </div>
      </div>
    )
  }

  if (countdown.isToday) {
    return (
      <div className="countdown">
        <div className="countdown-unit" style={{ minWidth: 'auto', padding: '16px 28px' }}>
          <span className="countdown-number" style={{ fontSize: '22px' }}>
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

  // If under 1 day, hide days
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
