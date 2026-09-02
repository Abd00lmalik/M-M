import { useState, useCallback } from 'react'
import { wedding } from '../data/weddingData'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function WeddingGifts() {
  const headingRef = useScrollReveal()

  return (
    <section className="section" id="gifts">
      <div className="section-narrow">
        <div className="reveal" ref={headingRef}>
          <p className="section-label">With Love</p>
          <h2 className="section-title">Wedding Gifts</h2>

          <p style={{
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            color: 'rgba(237, 229, 216, 0.55)',
            maxWidth: '460px',
            margin: '0 auto 32px',
            lineHeight: '1.7',
          }}>
            Your presence at our wedding is the greatest gift. For friends and family who wish to bless us further, kindly find our account details below.
          </p>
        </div>

        <div className="gifts-grid">
          <GiftCard gift={wedding.gifts.groom} />
          <GiftCard gift={wedding.gifts.bride} />
        </div>
      </div>
    </section>
  )
}

function GiftCard({ gift }) {
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const ref = useScrollReveal({ threshold: 0.2 })

  const handleCopy = useCallback(async () => {
    if (gift.account === 'TBD') return

    try {
      await navigator.clipboard.writeText(gift.account)
      setCopied(true)
      setShowToast(true)
      setTimeout(() => setCopied(false), 2000)
      setTimeout(() => setShowToast(false), 2500)
    } catch {
      // Clipboard API unavailable — show account number as fallback
      // The number is already visible in the card
    }
  }, [gift.account])

  return (
    <>
      <div className="gift-card reveal" ref={ref}>
        <p className="gift-label">{gift.label}</p>
        <p className="gift-name">{gift.name}</p>
        <p className="gift-bank">{gift.bank}</p>
        <p className="gift-account">{gift.account}</p>
        <button
          className={`gift-copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label={`Copy ${gift.label.toLowerCase()} account number`}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {showToast && (
        <div className="toast show" role="status" aria-live="polite">
          Account number copied!
        </div>
      )}
    </>
  )
}
