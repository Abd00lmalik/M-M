import { useEffect, useRef } from 'react'
import { wedding } from '../data/weddingData'

export default function Footer() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let ctx

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!contentRef.current) return

      const rule = contentRef.current.querySelector('.footer-rule')
      const names = contentRef.current.querySelectorAll('.footer-name')
      const ampersand = contentRef.current.querySelector('.footer-ampersand')
      const date = contentRef.current.querySelector('.footer-date')
      const btns = contentRef.current.querySelectorAll('.footer-btn')
      const credit = contentRef.current.querySelector('.footer-credit')

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        })

        // Rule expands from center
        if (rule) {
          tl.fromTo(rule,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: 'power2.inOut' },
            0
          )
        }

        // Names stagger in
        names.forEach((name, i) => {
          tl.fromTo(name,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            0.3 + i * 0.12
          )
        })

        // Ampersand
        if (ampersand) {
          tl.fromTo(ampersand,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
            0.4
          )
        }

        // Date
        if (date) {
          tl.fromTo(date,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            0.55
          )
        }

        // Action buttons stagger in
        btns.forEach((btn, i) => {
          tl.fromTo(btn,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
            0.7 + i * 0.08
          )
        })

        // Credit — subtle final fade
        if (credit) {
          tl.fromTo(credit,
            { opacity: 0 },
            { opacity: 0.5, duration: 0.5, ease: 'power2.out' },
            1.1
          )
        }
      }, sectionRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  const handleShare = async () => {
    const shareData = {
      title: wedding.sharing.title,
      text: wedding.sharing.text,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        fallbackShare()
      }
    } else {
      fallbackShare()
    }
  }

  const fallbackShare = () => {
    const text = encodeURIComponent(`${wedding.sharing.text}\n${window.location.href}`)
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      // Clipboard unavailable
    }
  }

  const handleCalendar = () => {
    const ics = generateIcs(wedding.calendar)
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'nikah-al-mustapha-maryam.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleGoogleCalendar = () => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: wedding.calendar.title,
      dates: `${wedding.calendar.start}/${wedding.calendar.end}`,
      location: wedding.calendar.location,
      details: wedding.calendar.details,
    })
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank')
  }

  return (
    <footer className="footer" id="footer" ref={sectionRef}>
      <div className="footer-inner" ref={contentRef}>
        {/* Delicate top rule */}
        <div className="footer-rule" aria-hidden="true" />

        <p className="footer-names">
          <span className="footer-name">{wedding.couple.groom.first}</span>
          <span className="footer-ampersand" aria-hidden="true">&</span>
          <span className="footer-name">{wedding.couple.bride.first}</span>
        </p>

        <p className="footer-date">{wedding.event.dateDisplay}</p>

        {/* Action buttons */}
        <div className="footer-actions">
          <button className="footer-btn" onClick={handleShare} aria-label="Share invitation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>

          <button className="footer-btn" onClick={handleCopyLink} aria-label="Copy link to clipboard">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Link
          </button>

          <button className="footer-btn" onClick={handleGoogleCalendar} aria-label="Add to Google Calendar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Google Calendar
          </button>

          <button className="footer-btn" onClick={handleCalendar} aria-label="Download calendar file">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download .ics
          </button>
        </div>

        <p className="footer-credit">
          Made with love for our wedding celebration
        </p>
      </div>
    </footer>
  )
}

function generateIcs(cal) {
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Al-Mustapha & Maryam Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${cal.start}
DTEND:${cal.end}
SUMMARY:${cal.title}
LOCATION:${cal.location}
DESCRIPTION:${cal.details}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`
}
