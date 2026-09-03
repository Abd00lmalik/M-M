/*
  FLOATING HEARTS — Suspended atmospheric hearts
  
  CSS-only animations. No GSAP. No jank.
  Different sizes and speeds create depth.
  Low opacity so they're atmospheric, not distracting.
*/

const hearts = [
  // { left%, size, delay, duration, opacity }
  { left: 8,  size: 12, delay: 0,  duration: 22, opacity: 0.06 },
  { left: 15, size: 8,  delay: 3,  duration: 28, opacity: 0.04 },
  { left: 25, size: 16, delay: 7,  duration: 20, opacity: 0.07 },
  { left: 35, size: 10, delay: 12, duration: 25, opacity: 0.05 },
  { left: 45, size: 14, delay: 5,  duration: 23, opacity: 0.06 },
  { left: 55, size: 8,  delay: 15, duration: 30, opacity: 0.04 },
  { left: 65, size: 18, delay: 2,  duration: 19, opacity: 0.08 },
  { left: 75, size: 10, delay: 9,  duration: 26, opacity: 0.05 },
  { left: 82, size: 12, delay: 14, duration: 24, opacity: 0.06 },
  { left: 92, size: 8,  delay: 6,  duration: 27, opacity: 0.04 },
  { left: 20, size: 6,  delay: 18, duration: 32, opacity: 0.03 },
  { left: 50, size: 10, delay: 20, duration: 29, opacity: 0.05 },
  { left: 70, size: 14, delay: 10, duration: 21, opacity: 0.06 },
  { left: 30, size: 8,  delay: 22, duration: 26, opacity: 0.04 },
  { left: 88, size: 12, delay: 8,  duration: 23, opacity: 0.05 },
]

function HeartSVG({ size, color = '#D4A5A5' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={color}
      />
    </svg>
  )
}

export default function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h, i) => (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            '--size': `${h.size}px`,
            '--delay': `${h.delay}s`,
            '--duration': `${h.duration}s`,
            '--opacity': h.opacity,
          }}
        >
          <HeartSVG size={h.size} />
        </div>
      ))}
    </div>
  )
}
