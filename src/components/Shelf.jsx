import { Link } from 'react-router-dom'
import Book from './Book.jsx'
import WingBook from './WingBook.jsx'
import ShelfObject from './ShelfObject.jsx'

const WOOD_GRAIN = `repeating-linear-gradient(
  90deg,
  transparent 0px,
  transparent 18px,
  rgba(0,0,0,0.07) 18px,
  rgba(0,0,0,0.07) 20px,
  transparent 20px,
  transparent 38px,
  rgba(255,255,255,0.02) 38px,
  rgba(255,255,255,0.02) 40px
)`

const SHELF_BG = `linear-gradient(to bottom, #2a1a08 0%, #3d2510 40%, #2a1808 100%)`

const rowStyle = {
  flex: 1,
  minHeight: 0,
  display: 'flex',
  alignItems: 'flex-end',
  overflow: 'hidden',
  gap: 1,
  paddingBottom: 0,
}

export default function Shelf({ label, slots, leftWing, rightWing, onOpenModal }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* clickable label */}
      <Link
        to={`/${label}`}
        style={{
          display: "block",
          textAlign: "center",
          fontFamily: '"Palatino Linotype", Palatino, serif',
          fontSize: 11,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(220,175,90,0.85)",
          paddingBottom: 4,
          paddingTop: 4,
          flexShrink: 0,
          userSelect: "none",
          textDecoration: "none",
          cursor: "none",
          transition: "color 0.3s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(220,175,90,0.85)")
        }
      >
        {label}
      </Link>

      {/* shelf back wall */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          position: "relative",
          background: "#100b05",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* three-zone items row */}
        <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
          {/* left wing — aesthetic only, books hug right edge toward divider */}
          <div
            style={{
              ...rowStyle,
              width: "15%",
              flexShrink: 0,
              justifyContent: "flex-end",
              paddingRight: 4,
            }}
          >
            {leftWing.map((b) => (
              <WingBook key={b.id} data={b} />
            ))}
          </div>

          {/* center — all important items, packed left */}
          <div
            style={{
              ...rowStyle,
              flex: 1,
              justifyContent: "flex-start",
              padding: "0 6px",
            }}
          >
            {slots.map((slot) =>
              slot.kind === "book" ? (
                <Book key={slot.data.id} data={slot.data} />
              ) : (
                <div key={slot.data.id} style={{
                  position: 'relative', zIndex: 2,
                  alignSelf: 'flex-end', flexShrink: 0,
                  display: 'flex', alignItems: 'flex-end',
                }}>
                  <ShelfObject data={slot.data} onOpenModal={onOpenModal} />
                </div>
              ),
            )}
          </div>

          {/* right wing — aesthetic only, books hug left edge toward divider */}
          <div
            style={{
              ...rowStyle,
              width: "15%",
              flexShrink: 0,
              justifyContent: "flex-start",
              paddingLeft: 4,
            }}
          >
            {rightWing.map((b) => (
              <WingBook key={b.id} data={b} />
            ))}
          </div>
        </div>

        {/* shelf board */}
        <div
          style={{
            height: 18,
            background: SHELF_BG,
            backgroundImage: `${WOOD_GRAIN}, ${SHELF_BG}`,
            boxShadow:
              "0 4px 18px rgba(0,0,0,0.85), inset 0 2px 4px rgba(255,255,255,0.05)",
            borderTop: "1px solid rgba(255,200,80,0.08)",
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
}
