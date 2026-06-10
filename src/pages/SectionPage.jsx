import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Modal from '../components/Modal.jsx'
import { SECTION_ITEMS } from '../data/items.js'

const SECTION_META = {
  personal:     { title: 'Personal',     description: 'Academic work, personal projects, and things I find interesting.' },
  creative:     { title: 'Creative',     description: 'Art, music, writing, and other creative endeavors.' },
  professional: { title: 'Professional', description: 'Work experience, research, and professional projects.' },
}

export default function SectionPage({ section }) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const items = SECTION_ITEMS[section] ?? []
  const openId = searchParams.get('item')
  const openItem = items.find(i => i.id === openId) ?? null

  const openModal  = (id) => setSearchParams({ item: id })
  const closeModal = ()   => setSearchParams({})

  const meta = SECTION_META[section] ?? { title: section, description: '' }

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: '#1e1409',
      color: 'rgba(200,170,110,0.9)',
      fontFamily: '"Palatino Linotype", Palatino, serif',
      position: 'relative',
      cursor: 'default',
    }}>
      {/* back */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: 28, left: 36,
          background: 'none', border: 'none',
          color: 'rgba(180,140,70,0.55)',
          fontFamily: 'inherit', fontSize: 11,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          cursor: 'pointer', padding: '6px 0', zIndex: 200,
          transition: 'color 0.25s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(220,175,90,0.9)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(180,140,70,0.55)'}
      >
        ← Back
      </button>

      {/* header */}
      <div style={{
        textAlign: 'center',
        paddingTop: 80,
        paddingBottom: 36,
        borderBottom: '1px solid rgba(180,120,40,0.15)',
        marginBottom: 52,
      }}>
        <h1 style={{
          fontSize: 26,
          fontWeight: 'normal',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'rgba(210,170,90,0.75)',
          margin: '0 0 14px',
        }}>
          {meta.title}
        </h1>
        <p style={{
          fontSize: 13,
          color: 'rgba(160,130,70,0.55)',
          letterSpacing: '0.08em',
          margin: 0,
        }}>
          {meta.description}
        </p>
      </div>

      {/* card grid */}
      <div style={{
        maxWidth: 860,
        margin: '0 auto',
        padding: '0 40px 100px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
        gap: 24,
      }}>
        {items.length === 0
          ? <Empty />
          : items.map(item => item.spotifyFetch
              ? <SpotifyCard key={item.id} item={item} onClick={() => openModal(item.id)} />
              : <ItemCard    key={item.id} item={item} onClick={() => openModal(item.id)} />
            )
        }
      </div>

      {openItem && <Modal item={openItem} onClose={closeModal} />}
    </div>
  )
}

const CARD_BASE = {
  background: 'linear-gradient(160deg, #2a1c0c 0%, #221608 100%)',
  border: '1px solid rgba(160,120,50,0.2)',
  padding: '22px 24px 20px',
  cursor: 'pointer',
  transition: 'border-color 0.25s, background 0.25s',
  position: 'relative',
}
const CARD_HOVER_BG  = 'linear-gradient(160deg, #341e0c 0%, #2a180a 100%)'
const CARD_BASE_BG   = 'linear-gradient(160deg, #2a1c0c 0%, #221608 100%)'

function cardHover(e) {
  e.currentTarget.style.borderColor = 'rgba(200,155,60,0.4)'
  e.currentTarget.style.background  = CARD_HOVER_BG
}
function cardUnhover(e) {
  e.currentTarget.style.borderColor = 'rgba(160,120,50,0.2)'
  e.currentTarget.style.background  = CARD_BASE_BG
}

function TagRow({ tags }) {
  if (!tags?.length) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
      {tags.map(tag => (
        <span key={tag} style={{
          fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(150,115,45,0.6)',
          border: '1px solid rgba(150,115,45,0.2)',
          padding: '2px 8px', borderRadius: 1,
        }}>
          {tag}
        </span>
      ))}
    </div>
  )
}

/* ── Standard card ──────────────────────────────────────────── */

function ItemCard({ item, onClick }) {
  const thumb = item.image ?? item.images?.[0] ?? null
  return (
    <div onClick={onClick} style={CARD_BASE} onMouseEnter={cardHover} onMouseLeave={cardUnhover}>
      <div style={{
        width: '100%', aspectRatio: '4/3',
        background: '#160e06',
        border: '1px solid rgba(120,90,35,0.15)',
        marginBottom: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {thumb
          ? <img src={thumb} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
          : <div style={{ color: 'rgba(120,90,40,0.35)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              no image
            </div>
        }
      </div>

      <h3 style={{
        margin: '0 0 8px', fontWeight: 'normal', fontSize: 14,
        letterSpacing: '0.25em', textTransform: 'uppercase',
        color: 'rgba(210,168,85,0.8)',
      }}>
        {item.title}
      </h3>

      {item.date && (
        <div style={{ fontSize: 11, color: 'rgba(150,115,55,0.6)', marginBottom: 10, fontStyle: 'italic' }}>
          {item.date instanceof Date
            ? item.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
            : item.date}
        </div>
      )}

      <TagRow tags={item.tags} />
    </div>
  )
}

/* ── Spotify card ───────────────────────────────────────────── */

function SpotifyCard({ item, onClick }) {
  const [spotify, setSpotify] = useState(null)
  const [error,   setError]   = useState(false)

  useEffect(() => {
    fetch('/api/spotify')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setSpotify)
      .catch(() => setError(true))
  }, [])

  const loading = !spotify && !error

  return (
    <div onClick={onClick} style={CARD_BASE} onMouseEnter={cardHover} onMouseLeave={cardUnhover}>
      {/* square album art */}
      <div style={{
        width: '100%', aspectRatio: '1/1',
        background: '#160e06',
        border: '1px solid rgba(120,90,35,0.15)',
        marginBottom: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {spotify?.albumArt
          ? <img src={spotify.albumArt} alt={spotify.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }} />
          : <div style={{ color: 'rgba(120,90,40,0.35)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              {loading ? '— loading —' : '— no artwork —'}
            </div>
        }
      </div>

      <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(130,95,40,0.55)', marginBottom: 5 }}>
        recently played
      </div>

      <h3 style={{
        margin: '0 0 3px', fontWeight: 'normal', fontSize: 14,
        letterSpacing: '0.08em',
        color: 'rgba(215,172,88,0.88)',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {loading ? '—' : error ? 'Music' : spotify.title}
      </h3>

      {spotify && (
        <div style={{
          fontSize: 12, color: 'rgba(170,135,70,0.72)', marginBottom: 6,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {spotify.artist}
        </div>
      )}

      <TagRow tags={item.tags} />
    </div>
  )
}

function Empty() {
  return (
    <div style={{
      gridColumn: '1 / -1',
      textAlign: 'center',
      color: 'rgba(140,105,45,0.38)',
      fontSize: 11,
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      paddingTop: 40,
    }}>
      — content coming soon —
    </div>
  )
}
