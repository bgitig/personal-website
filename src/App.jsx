import { useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { buildShelves } from './bookData.js'
import Shelf from './components/Shelf.jsx'
import CandleLight from './components/CandleLight.jsx'
import SectionPage from './pages/SectionPage.jsx'

const SIDE_PANEL_W = 28

export default function App() {
  const shelves = useMemo(() => buildShelves(), [])

  return (
    <Routes>
      <Route path="/personal" element={<SectionPage section="personal" />} />
      <Route path="/creative" element={<SectionPage section="creative" />} />
      <Route path="/professional" element={<SectionPage section="professional" />} />
      <Route path="/" element={<Bookshelf shelves={shelves} />} />
    </Routes>
  )
}

function Bookshelf({ shelves }) {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#0a0705',
      display: 'flex',
      fontFamily: 'serif',
    }}>
      {/* left side panel */}
      <SidePanel />

      {/* bookcase */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#0e0905',
        borderLeft: '4px solid #1a0e04',
        borderRight: '4px solid #1a0e04',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* top trim */}
        <div style={{
          height: 20,
          background: 'linear-gradient(to bottom, #3d2510, #2a1808)',
          borderBottom: '2px solid rgba(255,180,60,0.06)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.9)',
          flexShrink: 0,
        }} />

        {/* shelves */}
        {shelves.map((shelf) => (
          <Shelf
            key={shelf.label}
            label={shelf.label}
            slots={shelf.slots}
            leftWing={shelf.leftWing}
            rightWing={shelf.rightWing}
          />
        ))}

        {/* bottom trim */}
        <div style={{
          height: 24,
          background: 'linear-gradient(to bottom, #2a1808, #3d2510)',
          borderTop: '2px solid rgba(255,180,60,0.06)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.9)',
          flexShrink: 0,
        }} />

        {/* vertical dividers between shelves — decorative */}
        <VerticalDividers />
      </div>

      {/* right side panel */}
      <SidePanel />

      {/* ambient darkness — dims everything uniformly to ~30% */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.1)',
        pointerEvents: 'none',
        zIndex: 49,
      }} />

      {/* darkness vignette — extra crush at edges */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: `
          radial-gradient(ellipse 60% 55% at 50% 50%, transparent 10%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.97) 100%)
        `,
        pointerEvents: 'none',
        zIndex: 50,
      }} />

      <CandleLight />
    </div>
  )
}


function SidePanel() {
  return (
    <div style={{
      width: SIDE_PANEL_W,
      background: 'linear-gradient(to right, #050302, #0e0905)',
      flexShrink: 0,
    }} />
  )
}

function VerticalDividers() {
  return (
    <>
      <div style={divStyle('15%')} />
      <div style={divStyle('85%')} />
    </>
  )
}

function divStyle(left) {
  return {
    position: 'absolute',
    top: 20,
    bottom: 24,
    left,
    width: 10,
    background: 'linear-gradient(to right, #1a0e04, #2a1808, #1a0e04)',
    boxShadow: '2px 0 8px rgba(0,0,0,0.7), -2px 0 8px rgba(0,0,0,0.7)',
    pointerEvents: 'none',
  }
}
