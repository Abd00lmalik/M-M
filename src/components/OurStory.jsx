import { wedding } from '../data/weddingData'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function OurStory() {
  const headingRef = useScrollReveal()

  return (
    <section className="section" id="story">
      <div className="section-narrow">
        <div className="reveal" ref={headingRef}>
          <p className="section-label">Our Journey</p>
          <h2 className="section-title">How It All Began</h2>
        </div>

        <div className="gold-divider">
          <div className="line" />
          <div className="diamond" />
          <div className="line" />
        </div>

        <div className="timeline">
          {wedding.story.map((milestone, index) => (
            <TimelineItem key={index} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ milestone, index }) {
  const ref = useScrollReveal({ threshold: 0.2 })

  return (
    <div className="timeline-item reveal" ref={ref} style={{ transitionDelay: `${index * 0.1}s` }}>
      <div className="timeline-node" />
      <p className="timeline-date">{milestone.date}</p>
      <h3 className="timeline-title">{milestone.title}</h3>
      <p className="timeline-text">{milestone.text}</p>
    </div>
  )
}
