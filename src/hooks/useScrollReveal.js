import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../utils/prefersReducedMotion'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.classList.add('visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: options.threshold || 0.15, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold])

  return ref
}
