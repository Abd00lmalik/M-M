import { wedding } from '../data/weddingData'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function QuranicVerses() {
  const ref1 = useScrollReveal()
  const ref2 = useScrollReveal()

  return (
    <section className="section">
      <div className="section-narrow">
        <p className="section-label">The Divine Word</p>
        <h2 className="section-title">Quranic Blessings</h2>

        <div className="gold-divider">
          <div className="line" />
          <div className="diamond" />
          <div className="line" />
        </div>

        {/* Verse 1 */}
        <div className="verse reveal" ref={ref1}>
          <p className="verse-arabic" dir="rtl">
            {wedding.verses[0].arabic}
          </p>
          <p className="verse-english">
            &ldquo;{wedding.verses[0].english}&rdquo;
          </p>
          <p className="verse-reference">{wedding.verses[0].reference}</p>
        </div>

        <div className="gold-divider" style={{ margin: '32px 0' }}>
          <div className="line" style={{ width: '40px' }} />
          <div className="diamond" style={{ width: '4px', height: '4px' }} />
          <div className="line" style={{ width: '40px' }} />
        </div>

        {/* Verse 2 */}
        <div className="verse reveal" ref={ref2}>
          <p className="verse-arabic" dir="rtl" style={{ fontSize: 'clamp(18px, 4vw, 28px)' }}>
            {wedding.verses[1].arabic}
          </p>
          <p className="verse-english">
            &ldquo;{wedding.verses[1].english}&rdquo;
          </p>
          <p className="verse-reference">{wedding.verses[1].reference}</p>
        </div>
      </div>
    </section>
  )
}
