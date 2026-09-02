import { useState, useRef, useEffect, useCallback } from 'react'

export function useMusic(src) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showControl, setShowControl] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.src = src
    audio.preload = 'metadata'
    audio.loop = false

    audio.addEventListener('loadeddata', () => setIsLoaded(true))
    audio.addEventListener('ended', () => setIsPlaying(false))
    audio.addEventListener('error', () => {
      // Silently fail — site works without music
      setIsLoaded(false)
    })

    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [src])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !isLoaded) return

    audio.play()
      .then(() => {
        setIsPlaying(true)
        setShowControl(true)
      })
      .catch(() => {
        // Autoplay blocked — site continues silently
      })
  }, [isLoaded])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }, [])

  return { play, toggleMute, isPlaying, isMuted, showControl }
}
