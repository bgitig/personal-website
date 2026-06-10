import { Link } from 'react-router-dom'

export default function ShelfObject({ data, onOpenModal }) {
  const inner = renderInner(data.type, data)
  if (!inner) return null

  if (data.linkTo) {
    return (
      <Link
        to={data.linkTo}
        style={{ textDecoration: 'none', cursor: 'none', display: 'contents' }}
        title={data.type}
      >
        <Hoverable>{inner}</Hoverable>
      </Link>
    )
  }

  if (data.modalItemId && onOpenModal) {
    return (
      <div
        onClick={() => onOpenModal(data.modalItemId, data.modalSection)}
        style={{ display: 'contents', cursor: 'none' }}
      >
        <Hoverable>{inner}</Hoverable>
      </div>
    )
  }

  return inner
}

function renderInner(type, data) {
  switch (type) {
    case 'plant':          return <Plant />
    case 'globe':          return <Globe />
    case 'candle':         return <Candle />
    case 'hourglass':      return <Hourglass />
    case 'knight':         return <ChessKnight />
    case 'vinyl':          return <VinylRecord />
    case 'frame':          return <PictureFrame src={data.src} />
    case 'steltman-chair': return <SteltmanChair />
    default: return null
  }
}

function Hoverable({ children }) {
  return (
    <div
      style={{ display: 'contents' }}
      onMouseEnter={e => {
        const el = e.currentTarget.firstElementChild
        if (el) el.style.filter = 'brightness(1.5) drop-shadow(0 0 6px rgba(220,170,60,0.4))'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget.firstElementChild
        if (el) el.style.filter = ''
      }}
    >
      {children}
    </div>
  )
}

function Plant() {
  return (
    <div style={{ alignSelf: 'flex-end', width: 38, height: 80, position: 'relative', flexShrink: 0 }}>
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 26, height: 22,
        background: 'linear-gradient(to bottom, #2a1800, #1a1000)',
        borderRadius: '2px 2px 4px 4px',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
      }} />
      <Stem x={19} bottomY={22} topY={62} curve={-8} />
      <Leaf x={10} y={20} flip={false} />
      <Leaf x={22} y={36} flip={true} />
      <Leaf x={8} y={50} flip={false} />
    </div>
  )
}

function Stem({ x, bottomY, topY, curve }) {
  const w = 38
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 38 80">
      <path
        d={`M ${x} ${80 - bottomY} Q ${x + curve} ${80 - (bottomY + topY) / 2} ${x} ${80 - topY}`}
        stroke="#2d4a1a" strokeWidth="1.5" fill="none"
      />
    </svg>
  )
}

function Leaf({ x, y, flip }) {
  const sx = flip ? -1 : 1
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 38 80">
      <ellipse
        cx={x + (flip ? 8 : -8)} cy={80 - y}
        rx={10} ry={5}
        transform={`rotate(${flip ? 40 : -40}, ${x + (flip ? 8 : -8)}, ${80 - y})`}
        fill="#1e3a10" opacity="0.9"
      />
    </svg>
  )
}

function Globe() {
  return (
    <div style={{ alignSelf: 'flex-end', width: 48, height: 72, position: 'relative', flexShrink: 0 }}>
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 28, height: 8, background: '#1a1008',
        borderRadius: 4,
        boxShadow: '0 2px 8px rgba(0,0,0,0.8)',
      }} />
      <div style={{
        position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)',
        width: 3, height: 20, background: '#2a1f0a',
      }} />
      <div style={{
        position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)',
        width: 40, height: 40,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #2d4a5c, #0d1f2d 70%)',
        boxShadow: 'inset -4px -4px 12px rgba(0,0,0,0.7), inset 2px 2px 6px rgba(255,255,255,0.05), 0 0 6px rgba(0,0,0,0.5)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 6px, rgba(255,255,255,0.04) 6px, rgba(255,255,255,0.04) 7px)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)',
        }} />
      </div>
    </div>
  )
}

function Candle() {
  return (
    <div style={{ alignSelf: 'flex-end', width: 22, height: 70, position: 'relative', flexShrink: 0 }}>
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 18, height: 55,
        background: 'linear-gradient(to bottom, #c8a87a, #a07840 40%, #8a6030)',
        borderRadius: '2px 2px 0 0',
        boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.4), inset 3px 0 3px rgba(255,255,255,0.08)',
      }} />
      <div style={{
        position: 'absolute', bottom: 54, left: '50%', transform: 'translateX(-50%)',
        width: 1.5, height: 6,
        background: '#2a1800',
      }} />
      <div style={{
        position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%) scaleX(0.6)',
        width: 8, height: 14,
        background: 'radial-gradient(ellipse at 50% 80%, #ffe066 0%, #ff9900 50%, transparent 100%)',
        borderRadius: '50% 50% 20% 20%',
        filter: 'blur(1px)',
        animation: 'flicker 2s infinite',
      }} />
    </div>
  )
}

function Skull() {
  return (
    <div style={{ alignSelf: 'flex-end', width: 36, height: 42, position: 'relative', flexShrink: 0 }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 32, height: 28,
        background: 'radial-gradient(ellipse at 40% 35%, #c8b89a, #8a7a60 70%)',
        borderRadius: '50% 50% 40% 40%',
        boxShadow: 'inset -4px -4px 10px rgba(0,0,0,0.5)',
      }} />
      <div style={{
        position: 'absolute', top: 26, left: '50%', transform: 'translateX(-50%)',
        width: 24, height: 14,
        background: '#8a7a60',
        borderRadius: '0 0 6px 6px',
      }} />
      <div style={{ position: 'absolute', top: 10, left: '50%', marginLeft: -10, width: 7, height: 6, background: '#1a0f00', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: 10, left: '50%', marginLeft: 3, width: 7, height: 6, background: '#1a0f00', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: 31, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width: 4, height: 6, background: '#1a0f00', borderRadius: '0 0 2px 2px' }} />
        ))}
      </div>
    </div>
  )
}

function Hourglass() {
  return (
    <div style={{ alignSelf: 'flex-end', width: 26, height: 62, position: 'relative', flexShrink: 0 }}>
      <svg viewBox="0 0 26 62" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M3 2 L23 2 L14.5 30 L23 58 L3 58 L11.5 30 Z" fill="#1a1208" stroke="#3a2a10" strokeWidth="1" />
        <path d="M3 2 L23 2 L14.5 30 Z" fill="rgba(180,120,30,0.25)" />
        <path d="M14.5 30 L23 58 L3 58 Z" fill="rgba(180,120,30,0.12)" />
        <line x1="2" y1="2" x2="24" y2="2" stroke="#3a2a10" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="2" y1="58" x2="24" y2="58" stroke="#3a2a10" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function ChessKnight() {
  return (
    <div style={{ alignSelf: 'flex-end', width: 58, height: 100, position: 'relative', flexShrink: 0 }}>
      <svg viewBox="0 0 58 100" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="knightBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#120e07" />
            <stop offset="25%"  stopColor="#2a1e0e" />
            <stop offset="55%"  stopColor="#362414" />
            <stop offset="100%" stopColor="#1a1208" />
          </linearGradient>
          <linearGradient id="knightBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#1a1208" />
            <stop offset="40%"  stopColor="#3a2814" />
            <stop offset="100%" stopColor="#1a1208" />
          </linearGradient>
        </defs>

        {/* base plinth */}
        <rect x="4"  y="90" width="50" height="9"  rx="2" fill="url(#knightBase)" />
        <rect x="4"  y="88" width="50" height="4"  rx="1" fill="#3a2814" />
        {/* collar */}
        <rect x="10" y="78" width="36" height="12" rx="1" fill="url(#knightBase)" />
        <rect x="10" y="76" width="36" height="4"  rx="1" fill="#3a2814" />

        {/* horse head silhouette — facing right */}
        <path
          d="
            M 14 78
            C 11 68, 10 58, 12 48
            C 12 40, 15 32, 19 24
            C 21 18, 23 12, 24 8
            L 21 4
            C 24 0, 28 0, 29 5
            C 31 0, 35 0, 37 4
            C 40 9,  42 18, 42 26
            C 46 32, 52 41, 55 50
            C 57 56, 55 63, 50 67
            C 46 71, 40 72, 36 75
            C 33 77, 30 78, 28 78
            Z
          "
          fill="url(#knightBody)"
        />

        {/* left-edge highlight — rim light on neck back */}
        <path
          d="M 13 72 C 11 62, 11 52, 13 44 C 14 38, 17 30, 21 22"
          fill="none" stroke="rgba(255,200,80,0.07)" strokeWidth="2" strokeLinecap="round"
        />

        {/* mane lines */}
        <path d="M 16 64 C 13 56, 12 48, 14 40" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 18 60 C 15 52, 15 44, 17 36" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1"   strokeLinecap="round"/>

        {/* eye socket */}
        <ellipse cx="35" cy="30" rx="4" ry="3" fill="#0a0706" opacity="0.75" />
        <ellipse cx="35" cy="30" rx="2" ry="1.5" fill="#080504" opacity="0.9" />

        {/* nostril mark */}
        <ellipse cx="51" cy="58" rx="2" ry="1.5" fill="#0a0706" opacity="0.6" transform="rotate(-20,51,58)" />

        {/* shadow under jaw */}
        <path
          d="M 36 75 C 40 72, 46 70, 50 66"
          fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

function VinylRecord() {
  return (
    <div style={{ alignSelf: 'flex-end', width: 72, height: 72, position: 'relative', flexShrink: 0 }}>
      <svg viewBox="0 0 72 72" style={{ width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="vinylGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#1a1010" />
            <stop offset="28%" stopColor="#0d0808" />
            <stop offset="29%" stopColor="#c0501a" />
            <stop offset="38%" stopColor="#a03c10" />
            <stop offset="39%" stopColor="#0d0808" />
            <stop offset="100%" stopColor="#141010" />
          </radialGradient>
          {/* groove rings via repeated radial stops */}
          <radialGradient id="grooves" cx="50%" cy="50%" r="50%">
            <stop offset="40%"  stopColor="transparent" />
            <stop offset="42%"  stopColor="rgba(255,255,255,0.025)" />
            <stop offset="50%"  stopColor="transparent" />
            <stop offset="52%"  stopColor="rgba(255,255,255,0.02)" />
            <stop offset="60%"  stopColor="transparent" />
            <stop offset="62%"  stopColor="rgba(255,255,255,0.015)" />
            <stop offset="70%"  stopColor="transparent" />
            <stop offset="72%"  stopColor="rgba(255,255,255,0.015)" />
            <stop offset="80%"  stopColor="transparent" />
            <stop offset="82%"  stopColor="rgba(255,255,255,0.01)" />
            <stop offset="90%"  stopColor="transparent" />
            <stop offset="92%"  stopColor="rgba(255,255,255,0.01)" />
          </radialGradient>
        </defs>
        {/* outer rim shadow */}
        <circle cx="36" cy="36" r="35" fill="#0a0606" />
        {/* main disc */}
        <circle cx="36" cy="36" r="34" fill="url(#vinylGrad)" />
        {/* groove sheen */}
        <circle cx="36" cy="36" r="34" fill="url(#grooves)" />
        {/* specular highlight */}
        <ellipse cx="26" cy="22" rx="8" ry="4" fill="rgba(255,255,255,0.04)" transform="rotate(-30,26,22)" />
        {/* spindle hole */}
        <circle cx="36" cy="36" r="2.5" fill="#060404" />
      </svg>
    </div>
  )
}

function PictureFrame({ src }) {
  return (
    <div style={{ alignSelf: 'flex-end', width: 80, height: 96, position: 'relative', flexShrink: 0 }}>
      <svg viewBox="0 0 80 96" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="frameLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stopColor="#1a0e04" />
            <stop offset="40%" stopColor="#3d2510" />
            <stop offset="100%" stopColor="#2a1808" />
          </linearGradient>
          <linearGradient id="frameRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stopColor="#2a1808" />
            <stop offset="60%" stopColor="#1e1006" />
            <stop offset="100%" stopColor="#120a02" />
          </linearGradient>
          <linearGradient id="frameTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor="#4a2e10" />
            <stop offset="100%" stopColor="#2a1808" />
          </linearGradient>
          <linearGradient id="frameBot" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"  stopColor="#2a1808" />
            <stop offset="100%" stopColor="#150c03" />
          </linearGradient>
          <linearGradient id="canvas" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"  stopColor="#1a1510" />
            <stop offset="35%" stopColor="#221a12" />
            <stop offset="70%" stopColor="#1a1208" />
            <stop offset="100%" stopColor="#130e06" />
          </linearGradient>
        </defs>
        {/* outer shadow */}
        <rect x="1" y="1" width="78" height="94" rx="2" fill="#0a0602" opacity="0.8" />
        {/* frame sides */}
        <polygon points="0,0 12,10 12,86 0,96" fill="url(#frameLeft)" />
        <polygon points="80,0 68,10 68,86 80,96" fill="url(#frameRight)" />
        <polygon points="0,0 80,0 68,10 12,10" fill="url(#frameTop)" />
        <polygon points="12,86 68,86 80,96 0,96" fill="url(#frameBot)" />
        {/* inner bevel highlight */}
        <polygon points="12,10 68,10 68,86 12,86" fill="none" stroke="rgba(255,190,80,0.08)" strokeWidth="1" />
        {/* canvas / photo */}
        <rect x="12" y="10" width="56" height="76" fill="url(#canvas)" />
        {src && (
          <image href={src} x="12" y="10" width="56" height="76"
            preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.82 }} />
        )}
        {/* canvas texture strokes */}
        <line x1="12" y1="20" x2="68" y2="18" stroke="rgba(255,255,255,0.015)" strokeWidth="1.5" />
        <line x1="12" y1="35" x2="68" y2="38" stroke="rgba(255,255,255,0.01)" strokeWidth="1" />
        <line x1="12" y1="52" x2="68" y2="48" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
        <line x1="12" y1="68" x2="68" y2="70" stroke="rgba(255,255,255,0.01)" strokeWidth="1.5" />
        {/* frame ornament corners */}
        <circle cx="6"  cy="6"  r="3" fill="#2a1808" stroke="rgba(255,160,40,0.15)" strokeWidth="0.5" />
        <circle cx="74" cy="6"  r="3" fill="#2a1808" stroke="rgba(255,160,40,0.15)" strokeWidth="0.5" />
        <circle cx="6"  cy="90" r="3" fill="#2a1808" stroke="rgba(255,160,40,0.15)" strokeWidth="0.5" />
        <circle cx="74" cy="90" r="3" fill="#2a1808" stroke="rgba(255,160,40,0.15)" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

function SteltmanChair() {
  return (
    <div style={{ alignSelf: 'flex-end', width: 52, height: 86, position: 'relative', flexShrink: 0 }}>
      <svg viewBox="0 0 52 86" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="scWood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#160d06" />
            <stop offset="35%"  stopColor="#2e1c0a" />
            <stop offset="65%"  stopColor="#3a2410" />
            <stop offset="100%" stopColor="#1e1208" />
          </linearGradient>
          <linearGradient id="scSeat" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#3a2410" />
            <stop offset="100%" stopColor="#1e1208" />
          </linearGradient>
        </defs>

        {/* back-left post — floor to top of backrest */}
        <rect x="5"  y="2"  width="10" height="82" rx="1.5" fill="url(#scWood)" />
        {/* back-right post */}
        <rect x="37" y="2"  width="10" height="82" rx="1.5" fill="url(#scWood)" />

        {/* seat board */}
        <rect x="5"  y="50" width="42" height="10" rx="1" fill="url(#scSeat)" />
        {/* seat underside shadow */}
        <rect x="5"  y="59" width="42" height="4"  rx="0" fill="rgba(0,0,0,0.45)" />

        {/* rim-light highlights on post left edges */}
        <line x1="6"  y1="3"  x2="6"  y2="83" stroke="rgba(255,190,80,0.07)" strokeWidth="1.5" />
        <line x1="38" y1="3"  x2="38" y2="83" stroke="rgba(255,190,80,0.07)" strokeWidth="1.5" />
      </svg>
    </div>
  )
}
