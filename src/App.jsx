import { useState, useCallback, useEffect } from 'react'
import OpeningSequence from './components/OpeningSequence'
import FloatingElements from './components/FloatingElements'
import SectionOrnaments from './components/SectionOrnaments'
import Hero from './components/Hero'
import QuranicVerses from './components/QuranicVerses'
import Invitation from './components/Invitation'
import OurStory from './components/OurStory'
import TheNikah from './components/TheNikah'
import Gallery from './components/Gallery'
import Venue from './components/Venue'
import Footer from './components/Footer'
import MusicController from './components/MusicController'
import { useMusic } from './hooks/useMusic'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const { play, toggleMute, isPlaying, isMuted, showControl } = useMusic('/music.mp3')

  // Skip intro for reduced motion — still show intro overlay briefly
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Short delay so reduced-motion users still see the overlay flash
      const t = setTimeout(() => setIntroComplete(true), 1800)
      return () => clearTimeout(t)
    }
  }, [])

  // Called after heart tap — starts music and reveals site
  const handleIntroComplete = useCallback(() => {
    play()
    setIntroComplete(true)
  }, [play])

  return (
    <>
      {/* Cinematic intro — always shown first, covers everything */}
      {!introComplete && (
        <OpeningSequence onComplete={handleIntroComplete} />
      )}

      {/* Floating decorative elements — only after intro */}
      {introComplete && <FloatingElements />}
      {introComplete && <SectionOrnaments />}

      {/* Main wedding site — hidden until intro completes */}
      <main style={introComplete ? undefined : { visibility: 'hidden' }}>
        <Hero />
        <QuranicVerses />
        <Invitation />
        <OurStory />
        <TheNikah />
        <Gallery />
        <Venue />
        <Footer />
      </main>

      <MusicController
        isPlaying={isPlaying}
        isMuted={isMuted}
        showControl={showControl}
        onToggle={toggleMute}
      />
    </>
  )
}
