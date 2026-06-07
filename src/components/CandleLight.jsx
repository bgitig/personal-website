import { useEffect, useRef } from 'react'

export default function CandleLight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let fx = window.innerWidth / 2
    let fy = window.innerHeight / 2
    let cx = fx
    let cy = fy
    let rafId

    const onMove = (e) => {
      fx = e.clientX
      fy = e.clientY
    }

    const tick = () => {
      cx += (fx - cx) * 0.08
      cy += (fy - cy) * 0.08
      el.style.background = `radial-gradient(circle 300px at ${cx}px ${cy}px,
        rgba(220,160,60,0.75) 0%,
        rgba(220,160,60,0.2) 2%,
        rgba(220,160,60,0.2) 35%,
        rgba(220,160,60,0.1) 50%,
        rgba(180,120,30,0.07) 65%,
        rgba(120,70,10,0.025) 82%,
        transparent 100%
      )`;
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={ref} style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 100,
    }} />
  )
}
