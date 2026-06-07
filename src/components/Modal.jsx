import { useEffect } from 'react'

export default function Modal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!item) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        cursor: 'default',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 620,
          maxHeight: '85vh',
          overflowY: 'auto',
          background: 'linear-gradient(160deg, #2e1e0e 0%, #241608 100%)',
          border: '1px solid rgba(180,130,50,0.22)',
          boxShadow: '0 0 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,200,80,0.06)',
          fontFamily: '"Palatino Linotype", Palatino, serif',
          color: 'rgba(210,178,118,0.9)',
          position: 'relative',
        }}
      >
        {/* image area */}
        <div style={{
          width: '100%',
          aspectRatio: '16/7',
          background: '#1a1008',
          borderBottom: '1px solid rgba(180,130,50,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {item.image
            ? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
            : <div style={{ color: 'rgba(140,105,50,0.35)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                — no image —
              </div>
          }
        </div>

        {/* body */}
        <div style={{ padding: '28px 36px 36px' }}>
          {/* close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 14, right: 18,
              background: 'none', border: 'none',
              color: 'rgba(180,130,50,0.45)',
              fontFamily: 'inherit', fontSize: 18,
              cursor: 'pointer', lineHeight: 1,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(220,175,90,0.85)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(180,130,50,0.45)'}
          >
            ✕
          </button>

          {/* title */}
          <h2 style={{
            margin: '0 0 10px',
            fontWeight: 'normal',
            fontSize: 22,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(220,178,95,0.85)',
          }}>
            {item.title}
          </h2>

          {/* date */}
          {item.date && (
            <div style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              color: 'rgba(160,122,60,0.65)',
              marginBottom: 18,
              fontStyle: 'italic',
            }}>
              {item.date instanceof Date
                ? item.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                : item.date}
            </div>
          )}

          {/* divider */}
          <div style={{ height: 1, background: 'rgba(180,130,50,0.15)', margin: '14px 0 20px' }} />

          {/* details */}
          {item.details
            ? <p style={{ margin: '0 0 24px', fontSize: 14, lineHeight: 1.8, color: 'rgba(195,162,100,0.82)' }}>
                {item.details}
              </p>
            : <p style={{ margin: '0 0 24px', fontSize: 12, letterSpacing: '0.15em', color: 'rgba(140,105,50,0.4)', textTransform: 'uppercase' }}>
                — details coming soon —
              </p>
          }

          {/* links */}
          {item.links?.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {item.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    width: 'fit-content',
                    color: 'rgba(210,162,65,0.75)',
                    fontSize: 12,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(180,130,50,0.28)',
                    paddingBottom: 3,
                    cursor: 'pointer',
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
          )}

          {/* tags */}
          {item.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {item.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 10,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(170,128,58,0.65)',
                  border: '1px solid rgba(170,128,58,0.25)',
                  padding: '3px 10px',
                  borderRadius: 1,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
