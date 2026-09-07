import { useState, useCallback, useEffect, useRef } from 'react'
import OpeningSequence from './components/OpeningSequence'
import FloralOrnaments from './components/FloralOrnaments'
import FloatingHearts from './components/FloatingHearts'
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
  const [siteVisible, setSiteVisible] = useState(false)
  const mainRef = useRef(null)
  const { play, toggleMute, isPlaying, isMuted, showControl } = useMusic('/music.mp3')

  // Skip intro for reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        setIntroComplete(true)
        setTimeout(() => setSiteVisible(true), 100)
      }, 1600)
      return () => clearTimeout(t)
    }
  }, [])

  // Called after heart pop — smooth transition
  const handleIntroComplete = useCallback(() => {
    play()
    setIntroComplete(true)
    // Fade in the site smoothly after overlay fades
    requestAnimationFrame(() => {
      setTimeout(() => setSiteVisible(true), 400)
    })
  }, [play])

  return (
    <>
      {/* Cinematic intro */}
      {!introComplete && (
        <OpeningSequence onComplete={handleIntroComplete} />
      )}

      {/* Decorative layers — only after intro */}
      {siteVisible && <FloralOrnaments />}
      {siteVisible && <FloatingHearts />}

      {/* Main site — fades in smoothly */}
      <main
        ref={mainRef}
        className={`site-main ${siteVisible ? 'site-visible' : ''}`}
      >
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
