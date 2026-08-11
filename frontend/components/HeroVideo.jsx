import React from 'react'
import liveWallpaper from '../assets/myappai-live-wallpaper.mp4'

export default function HeroVideo({
  eyebrow = 'Live system wallpaper',
  title = 'AI publishing in motion',
  body = 'A visual map of content, search, review, and revenue loops running together.',
  compact = false,
}) {
  return (
    <section className={`hero-video ${compact ? 'hero-video--compact' : ''}`} aria-label={title}>
      <video className="hero-video__media" src={liveWallpaper} autoPlay muted loop playsInline />
      <div className="hero-video__shade" />
      <div className="hero-video__content">
        <p>{eyebrow}</p>
        <h2>{title}</h2>
        <span>{body}</span>
      </div>
      <div className="hero-video__nodes" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    </section>
  )
}
