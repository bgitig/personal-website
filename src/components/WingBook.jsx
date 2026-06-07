export default function WingBook({ data }) {
  const { h, w, color, tilt } = data
  const n = parseInt(color.replace('#', ''), 16)
  const r = Math.max(0, (n >> 16) - 10)
  const g = Math.max(0, ((n >> 8) & 0xff) - 10)
  const b = Math.max(0, (n & 0xff) - 10)
  const darker = `rgb(${r},${g},${b})`

  return (
    <div style={{
      position: 'relative',
      width: w,
      height: h,
      flexShrink: 0,
      alignSelf: 'flex-end',
      transform: `rotate(${tilt}deg)`,
      opacity: 0.75,
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(160deg, ${color} 0%, ${darker} 60%, ${darker} 100%)`,
        boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.45)',
        borderRadius: '1px',
      }} />
    </div>
  )
}
