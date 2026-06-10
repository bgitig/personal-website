import { useEffect, useState } from 'react'

export default function Modal({ item, onClose }) {
  const [spotify, setSpotify] = useState(null)
  const [spotifyError, setSpotifyError] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (!item?.spotifyFetch) { setSpotify(null); setSpotifyError(false); return }
    setSpotify(null)
    setSpotifyError(false)
    fetch('/api/spotify')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setSpotify)
      .catch(() => setSpotifyError(true))
  }, [item])

  if (!item) return null

  return item.spotifyFetch
    ? <SpotifyModal item={item} spotify={spotify} error={spotifyError} onClose={onClose} />
    : <StandardModal item={item} onClose={onClose} />
}

/* ── Spotify modal ─────────────────────────────────────────── */

function SpotifyModal({ item, spotify, error, onClose }) {
  const loading = !spotify && !error

  return (
    <Backdrop onClose={onClose}>
      <CloseButton onClose={onClose} />

      {/* album art */}
      <div style={{
        width: '100%',
        aspectRatio: '1/1',
        maxHeight: 300,
        background: '#120c06',
        borderBottom: '1px solid rgba(180,130,50,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {spotify?.albumArt
          ? <img src={spotify.albumArt} alt={spotify.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }} />
          : <Placeholder text={loading ? '— loading —' : '— no artwork —'} />
        }
      </div>

      <div style={{ padding: '28px 36px 36px' }}>
        {/* section label */}
        <div style={{
          fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'rgba(140,105,50,0.5)', marginBottom: 10,
        }}>
          recently played
        </div>

        {/* track name — main headline */}
        <h2 style={{
          margin: '0 0 8px', fontWeight: 'normal', fontSize: 22,
          letterSpacing: '0.1em', color: 'rgba(230,190,110,0.92)',
        }}>
          {loading ? '—' : error ? 'Could not reach Spotify' : spotify.title}
        </h2>

        {/* artist */}
        {spotify && (
          <div style={{
            fontSize: 15, color: 'rgba(200,162,90,0.78)', marginBottom: 4,
          }}>
            {spotify.artist}
          </div>
        )}

        {/* album · time */}
        {spotify && (
          <div style={{
            fontSize: 12, fontStyle: 'italic',
            color: 'rgba(155,120,60,0.6)', marginBottom: 20,
          }}>
            {spotify.album}&nbsp;&nbsp;·&nbsp;&nbsp;{relativeTime(spotify.playedAt)}
          </div>
        )}

        {spotify && (
          <LinkList links={[{ label: 'Open in Spotify', url: spotify.trackUrl }]} />
        )}

        <Divider />

        {/* blurb */}
        <p style={{
          margin: '0 0 24px', fontSize: 13, lineHeight: 1.8,
          color: 'rgba(170,140,80,0.6)', fontStyle: 'italic',
        }}>
          {item.details}
        </p>

        <Tags tags={item.tags} />
      </div>
    </Backdrop>
  )
}

/* ── Standard modal ────────────────────────────────────────── */

function StandardModal({ item, onClose }) {
  const images = item.images ?? (item.image ? [item.image] : [])
  const [imgIdx,   setImgIdx]   = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prevImg = (e) => { e.stopPropagation(); setImgIdx(i => (i - 1 + images.length) % images.length) }
  const nextImg = (e) => { e.stopPropagation(); setImgIdx(i => (i + 1) % images.length) }

  return (
    <Backdrop onClose={onClose}>
      <CloseButton onClose={onClose} />

      {/* image / video */}
      <div style={{
        width: '100%', aspectRatio: item.video ? '16/9' : '16/7',
        background: '#1a1008',
        borderBottom: '1px solid rgba(180,130,50,0.12)',
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {item.video
          ? <video
              src={item.video}
              poster={item.image || undefined}
              controls
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0d0a06' }}
            />
          : images.length > 0
            ? <>
                <img
                  src={images[imgIdx]}
                  alt={item.title}
                  onClick={() => setLightbox(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, cursor: 'zoom-in' }}
                />
                {images.length > 1 && (
                  <>
                    <NavArrow dir="left"  onClick={prevImg} />
                    <NavArrow dir="right" onClick={nextImg} />
                    <DotRow count={images.length} active={imgIdx} />
                  </>
                )}
              </>
            : <Placeholder text="— no image —" />
        }
      </div>

      <div style={{ padding: '28px 36px 36px' }}>
        <h2 style={{
          margin: '0 0 10px', fontWeight: 'normal', fontSize: 22,
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'rgba(220,178,95,0.85)',
        }}>
          {item.title}
        </h2>

        {item.date && (
          <div style={{
            fontSize: 11, letterSpacing: '0.2em', fontStyle: 'italic',
            color: 'rgba(160,122,60,0.65)', marginBottom: 18,
          }}>
            {item.date instanceof Date
              ? item.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
              : item.date}
          </div>
        )}

        <Divider />

        {item.details
          ? <p style={{ margin: '0 0 24px', fontSize: 14, lineHeight: 1.8, color: 'rgba(195,162,100,0.82)' }}>
              {item.details}
            </p>
          : <p style={{ margin: '0 0 24px', fontSize: 12, letterSpacing: '0.15em', color: 'rgba(140,105,50,0.4)', textTransform: 'uppercase' }}>
              — details coming soon —
            </p>
        }

        {item.links?.length > 0 && <LinkList links={item.links} />}

        <Tags tags={item.tags} />
      </div>

      {lightbox && <Lightbox images={images} startIndex={imgIdx} onClose={() => setLightbox(false)} />}
    </Backdrop>
  )
}

/* ── Shared primitives ─────────────────────────────────────── */

function Backdrop({ onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 32, cursor: 'default',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 560,
          maxHeight: '90vh', overflowY: 'auto',
          background: 'linear-gradient(160deg, #2e1e0e 0%, #241608 100%)',
          border: '1px solid rgba(180,130,50,0.22)',
          boxShadow: '0 0 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,200,80,0.06)',
          fontFamily: '"Palatino Linotype", Palatino, serif',
          color: 'rgba(210,178,118,0.9)',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function CloseButton({ onClose }) {
  return (
    <button
      onClick={onClose}
      style={{
        position: 'absolute', top: 14, right: 18, zIndex: 1,
        background: 'none', border: 'none',
        color: 'rgba(180,130,50,0.45)',
        fontFamily: 'inherit', fontSize: 18,
        cursor: 'pointer', lineHeight: 1, transition: 'color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.color = 'rgba(220,175,90,0.85)'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(180,130,50,0.45)'}
    >
      ✕
    </button>
  )
}

function Placeholder({ text }) {
  return (
    <div style={{ color: 'rgba(140,105,50,0.35)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
      {text}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'rgba(180,130,50,0.15)', margin: '14px 0 20px' }} />
}

function Tags({ tags }) {
  if (!tags?.length) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {tags.map(tag => (
        <span key={tag} style={{
          fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'rgba(170,128,58,0.65)',
          border: '1px solid rgba(170,128,58,0.25)',
          padding: '3px 10px', borderRadius: 1,
        }}>
          {tag}
        </span>
      ))}
    </div>
  )
}

function LinkList({ links }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            width: 'fit-content',
            color: 'rgba(210,162,65,0.75)',
            fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(180,130,50,0.28)',
            paddingBottom: 3, cursor: 'pointer',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'rgba(245,195,75,0.95)'
            e.currentTarget.style.borderColor = 'rgba(220,170,60,0.55)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(210,162,65,0.75)'
            e.currentTarget.style.borderColor = 'rgba(180,130,50,0.28)'
          }}
        >
          → {link.label}
        </a>
      ))}
    </div>
  )
}

function relativeTime(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

/* ── Image nav / lightbox ──────────────────────────────────── */

function NavArrow({ dir, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'absolute',
        top: '50%', transform: 'translateY(-50%)',
        [dir === 'left' ? 'left' : 'right']: 10,
        background: hov ? 'rgba(0,0,0,0.72)' : 'rgba(0,0,0,0.38)',
        border: '1px solid rgba(180,130,50,0.22)',
        color: hov ? 'rgba(220,175,90,0.95)' : 'rgba(180,140,70,0.6)',
        fontFamily: 'serif', fontSize: 22,
        width: 34, height: 34,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all 0.18s',
        padding: 0, lineHeight: 1,
      }}
    >
      {dir === 'left' ? '‹' : '›'}
    </button>
  )
}

function DotRow({ count, active }) {
  return (
    <div style={{
      position: 'absolute', bottom: 8, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', gap: 6,
      pointerEvents: 'none',
    }}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{
          width: 5, height: 5, borderRadius: '50%',
          background: i === active ? 'rgba(220,175,90,0.85)' : 'rgba(180,130,50,0.3)',
          transition: 'background 0.2s',
        }} />
      ))}
    </div>
  )
}

function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, onClose])

  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length) }
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length) }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 400,
        background: 'rgba(0,0,0,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'default',
      }}
    >
      <img
        src={images[idx]}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain',
          boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
        alt=""
      />
      {images.length > 1 && (
        <>
          <button onClick={prev} style={lbBtn('left')}>‹</button>
          <button onClick={next} style={lbBtn('right')}>›</button>
          <div style={{ position: 'fixed', bottom: 22, left: 0, right: 0,
            display: 'flex', justifyContent: 'center', gap: 8, pointerEvents: 'none' }}>
            {images.map((_, i) => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: '50%',
                background: i === idx ? 'rgba(220,175,90,0.85)' : 'rgba(180,130,50,0.3)',
              }} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function lbBtn(side) {
  return {
    position: 'fixed', top: '50%', transform: 'translateY(-50%)',
    [side]: 24,
    background: 'rgba(0,0,0,0.55)',
    border: '1px solid rgba(180,130,50,0.28)',
    color: 'rgba(210,168,85,0.85)',
    fontFamily: 'serif', fontSize: 30,
    width: 50, height: 50,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  }
}
