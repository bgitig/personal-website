import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Book({ data }) {
  const [hovered, setHovered] = useState(false)

  const { h, w, color, spineColor, tilt, label, linkTo } = data

  const shadowInset = `inset -4px 0 8px rgba(0,0,0,0.5), inset 4px 0 4px rgba(255,255,255,0.03)`
  const mottleGrad = `linear-gradient(160deg, ${lighten(color, 18)} 0%, ${color} 40%, ${darken(color, 20)} 70%, ${darken(color, 8)} 100%)`

  const inner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: w,
        height: h,
        flexShrink: 0,
        transform: `rotate(${tilt}deg) translateY(${hovered ? -18 : 0}px)`,
        transition: 'transform 0.25s cubic-bezier(0.22,0.61,0.36,1)',
        cursor: 'none',
        alignSelf: 'flex-end',
        filter: hovered ? 'brightness(1.3)' : 'brightness(1)',
      }}
    >
      {/* Spine face */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: mottleGrad,
        boxShadow: shadowInset,
        borderRadius: '2px 1px 1px 2px',
      }} />
      {/* Top edge */}
      <div style={{
        position: 'absolute',
        top: -4,
        left: 2,
        right: 2,
        height: 4,
        background: darken(color, 30),
        borderRadius: '2px 2px 0 0',
        transform: 'skewX(-45deg)',
      }} />
      {/* Side depth */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: -6,
        width: 6,
        height: h,
        background: darken(color, 40),
        borderRadius: '0 2px 2px 0',
      }} />
      {/* Horizontal line details */}
      <div style={{
        position: 'absolute',
        top: Math.floor(h * 0.15),
        left: 4,
        right: 4,
        height: 1,
        background: `rgba(0,0,0,0.35)`,
      }} />
      <div style={{
        position: 'absolute',
        bottom: Math.floor(h * 0.12),
        left: 4,
        right: 4,
        height: 1,
        background: `rgba(0,0,0,0.35)`,
      }} />
      {/* Spine title */}
      {label && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          <span style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: 7,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(230,200,140,0.68)',
            fontFamily: '"Palatino Linotype", Palatino, serif',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}>
            {label}
          </span>
        </div>
      )}
    </div>
  )

  if (linkTo) {
    return (
      <Link to={linkTo} style={{ display: 'contents', textDecoration: 'none', cursor: 'none' }}>
        {inner}
      </Link>
    )
  }
  return inner
}

function lighten(hex, amount) {
  return shiftColor(hex, amount)
}
function darken(hex, amount) {
  return shiftColor(hex, -amount)
}
function shiftColor(hex, amount) {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (n >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (n & 0xff) + amount))
  return `rgb(${r},${g},${b})`
}
