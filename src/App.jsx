import { useState, useCallback, useEffect } from 'react'
import OpeningSequence from './components/OpeningSequence'
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
  const [showSite, setShowSite] = useState(false)
  const { play, toggleMute, isPlaying, isMuted, showControl } = useMusic('/music.mp3')

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setShowSite(true)
    }
  }, [])

  const handleEnter = useCallback(() => {
    play()
    setShowSite(true)
  }, [play])

  return (
    <>
      {!showSite && (
        <OpeningSequence onEnter={handleEnter} />
      )}

      <main>
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
