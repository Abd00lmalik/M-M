import { useState, useRef, useEffect, useCallback } from 'react'

export function useMusic(src) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showControl, setShowControl] = useState(false)
  const pendingPlayRef = useRef(false)

  useEffect(() => {
    const audio = new Audio()
    audio.src = src
    audio.preload = 'auto'
    audio.loop = false
    audio.volume = 0.3

    audio.addEventListener('loadeddata', () => {
      setIsLoaded(true)
      if (pendingPlayRef.current) {
        pendingPlayRef.current = false
        audio.volume = 0.3
        audio.play().then(() => {
          setIsPlaying(true)
          setShowControl(true)
        }).catch(() => {})
      }
    })
    audio.addEventListener('ended', () => setIsPlaying(false))
    audio.addEventListener('error', () => {
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
    if (!audio) return

    if (!isLoaded) {
      pendingPlayRef.current = true
      return
    }

    audio.volume = 0.3
    audio.play()
      .then(() => {
        setIsPlaying(true)
        setShowControl(true)
      })
      .catch(() => {})
  }, [isLoaded])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }, [])

  return { play, toggleMute, isPlaying, isMuted, showControl }
}
