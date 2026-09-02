import { wedding } from '../data/weddingData'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Invitation() {
  const ref = useScrollReveal()

  return (
    <section className="section" style={{ background: 'linear-gradient(180deg, #13100d, #161210, #13100d)' }}>
      <div className="section-narrow">
        <div className="reveal" ref={ref}>
          <div className="invitation-text">
            <p style={{ marginBottom: '20px', color: 'rgba(237, 229, 216, 0.5)', fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
              Together with their families
            </p>

            <p style={{ marginBottom: '24px' }}>
              The family of <strong style={{ color: '#ede5d8' }}>{wedding.families.groom}</strong> and
              the family of <strong style={{ color: '#ede5d8' }}>{wedding.families.bride}</strong> cordially
              invite you to the Nikah ceremony of
            </p>

            <div className="invitation-names">
              {wedding.couple.groom.first}
              <span style={{ display: 'block', fontSize: '0.5em', color: '#b8965a', margin: '4px 0', fontFamily: 'Cormorant Garamond, serif' }}>&</span>
              {wedding.couple.bride.first}
            </div>

            <div className="gold-divider" style={{ margin: '24px 0' }}>
              <div className="line" />
              <div className="diamond" />
              <div className="line" />
            </div>

            <p style={{ fontSize: '14px', color: 'rgba(237, 229, 216, 0.5)' }}>
              {wedding.event.dateDisplay} &nbsp;·&nbsp; {wedding.event.time}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
