// On iOS, prefers-reduced-motion is often true (Low Power Mode).
// We want the full experience on iOS regardless.
const isIOS = /iP(hone|od|ad)/.test(navigator?.userAgent) ||
  (navigator?.platform === 'MacIntel' && navigator?.maxTouchPoints > 1)

export function prefersReducedMotion() {
  if (isIOS) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
