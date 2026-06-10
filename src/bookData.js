import { randBetween, randInt, pick } from './rand.js'

const EARTH_TONES = [
  '#3b1f0e', '#5c2d0d', '#7a3b10', '#4a2c0a',
  '#1e3a1a', '#2a4a1e', '#3b5c28', '#1a3020',
  '#1a2e3b', '#1e3a4a', '#2a4a5c', '#0f2030',
  '#3b2a1a', '#5c3d1e', '#4a3020', '#6b3d1a',
  '#2a1a0a', '#3d1a0a', '#5c2a10', '#6b3b10',
]

const DECOR_TYPES = ['plant', 'globe', 'candle', 'hourglass']

const SECTIONS = ['personal', 'creative', 'professional']

// Pinned shelf objects — one per clickable item. Always appear on their shelf.
const PINNED = {
  personal: [
    {
      kind: "object",
      data: {
        id: "personal-knight",
        type: "knight",
        linkTo: "/personal?item=rook",
      },
    },
    {
      kind: "object",
      data: {
        id: "personal-vinyl",
        type: "vinyl",
        linkTo: "/personal?item=vinyl",
      },
    },
    {
      kind: "object",
      data: {
        id: "personal-frame",
        type: "frame",
        linkTo: "/personal?item=curve-fever",
        src: "/images/curvefever.png",
      },
    },
  ],
  creative: [
    {
      kind: "object",
      data: {
        id: "creative-frame",
        type: "frame",
        linkTo: "/creative?item=frame",
        src: "/images/treehouse.png",
      },
    },
    {
      kind: "object",
      data: {
        id: "creative-chair",
        type: "steltman-chair",
        linkTo: "/creative?item=chair",
      },
    },
  ],
  professional: [
    {
      kind: "object",
      data: {
        id: "professional-frame",
        type: "frame",
        linkTo: "/professional?item=frame",
        src: "/images/resume.png",
      },
    },
  ],
};

// Each pinned item is spliced at a random position no greater than this index.
// Worst case: 3 pinned items all inserted at position 12, ending up at slots 12-14.
// ~12 fillers × 25px avg + 3 objects × 70px avg = ~510px, visible on any screen ≥ 1024px.
const PINNED_SAFE_WINDOW = 12

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(0, i)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function buildShelves() {
  return SECTIONS.map((label) => {
    // Build filler: anonymous books + random decorative objects
    const bookCount  = randInt(18, 26)
    const decorCount = randInt(1, 3)

    const filler = shuffle([
      ...Array.from({ length: bookCount }, (_, i) => ({
        kind: 'book',
        data: {
          id:         `${label}-book-${i}`,
          h:          randInt(130, 210),
          w:          randInt(16, 34),
          color:      pick(EARTH_TONES),
          spineColor: pick(EARTH_TONES),
          tilt:       randBetween(-2.5, 2.5),
          label:      null,
        },
      })),
      ...Array.from({ length: decorCount }, (_, i) => ({
        kind: 'object',
        data: { id: `${label}-decor-${i}`, type: pick(DECOR_TYPES) },
      })),
    ])

    // Splice each pinned item at a random position within the safe window
    // so it always renders before the center section's overflow edge.
    for (const p of PINNED[label]) {
      filler.splice(randInt(0, Math.min(PINNED_SAFE_WINDOW, filler.length)), 0, p)
    }

    // Wing books are purely decorative (no hover, no click)
    const wingBook = (id) => ({
      id,
      h:     randInt(100, 190),
      w:     randInt(13, 24),
      color: pick(EARTH_TONES),
      tilt:  randBetween(-1.5, 1.5),
    })

    return {
      label,
      slots:     filler,
      leftWing:  Array.from({ length: randInt(10, 16) }, (_, i) => wingBook(`${label}-left-${i}`)),
      rightWing: Array.from({ length: randInt(10, 16) }, (_, i) => wingBook(`${label}-right-${i}`)),
    }
  })
}
