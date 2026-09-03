/*
  FLORAL ORNAMENTS — Real rose photographs
  
  Uses actual rose images from Unsplash.
  Static positioned, no animations, no jank.
*/

const ROSES = {
  // Dusty blush rose — single bloom, top-down view
  blushSingle: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&q=80',
  // Ivory/cream rose cluster
  ivoryCluster: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&q=80',
  // Pink rose with leaves
  pinkWithLeaves: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=300&q=80',
  // Dried blush rose — romantic, muted
  driedBlush: 'https://images.unsplash.com/photo-1518882462786-8b29e3f01ebb?w=300&q=80',
  // Rosebud on stem
  rosebud: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=200&q=80',
  // White rose with green leaves
  whiteRose: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=300&q=80',
}

function RoseImage({ src, alt, className, style }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`floral-ornament ${className || ''}`}
      style={style}
      loading="lazy"
      decoding="async"
      aria-hidden="true"
    />
  )
}

export default function FloralOrnaments() {
  return (
    <div className="floral-ornaments" aria-hidden="true">
      {/* Hero bottom — dusty blush rose */}
      <RoseImage
        src={ROSES.blushSingle}
        alt=""
        className="floral-hero"
      />

      {/* Quran left — ivory rose */}
      <RoseImage
        src={ROSES.ivoryCluster}
        alt=""
        className="floral-quran-left"
      />

      {/* Quran right — pink rose with leaves */}
      <RoseImage
        src={ROSES.pinkWithLeaves}
        alt=""
        className="floral-quran-right"
      />

      {/* Story divider — dried blush rose */}
      <RoseImage
        src={ROSES.driedBlush}
        alt=""
        className="floral-story"
      />

      {/* Gallery bottom — ivory cluster */}
      <RoseImage
        src={ROSES.ivoryCluster}
        alt=""
        className="floral-gallery"
      />

      {/* Footer left — white rose */}
      <RoseImage
        src={ROSES.whiteRose}
        alt=""
        className="floral-footer-left"
      />

      {/* Footer right — blush rose */}
      <RoseImage
        src={ROSES.blushSingle}
        alt=""
        className="floral-footer-right"
      />
    </div>
  )
}
