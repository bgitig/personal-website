import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const onMove = (e) => {
      el.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={ref} style={{
      position: 'fixed',
      top: 0, left: 0,
      width: 12, height: 12,
      borderRadius: '50%',
      background: 'rgba(255,200,100,0.7)',
      boxShadow: '0 0 8px 3px rgba(255,180,60,0.4)',
      pointerEvents: 'none',
      zIndex: 200,
      willChange: 'transform',
    }} />
  )
}
