import { randBetween, randInt, pick } from './rand.js'

const EARTH_TONES = [
  '#3b1f0e', '#5c2d0d', '#7a3b10', '#4a2c0a',
  '#1e3a1a', '#2a4a1e', '#3b5c28', '#1a3020',
  '#1a2e3b', '#1e3a4a', '#2a4a5c', '#0f2030',
  '#3b2a1a', '#5c3d1e', '#4a3020', '#6b3d1a',
  '#2a1a0a', '#3d1a0a', '#5c2a10', '#6b3b10',
]

const SECTIONS = ['personal', 'creative', 'professional']

export function generateBooks(sectionLabel) {
  const count = randInt(18, 28)
  return Array.from({ length: count }, (_, i) => {
    const h = randInt(130, 210)
    const w = randInt(16, 34)
    const color = pick(EARTH_TONES)
    const spineColor = pick(EARTH_TONES)
    const tilt = randBetween(-2.5, 2.5)
    return {
      id: `${sectionLabel}-book-${i}`,
      h,
      w,
      color,
      spineColor,
      tilt,
      label: null,
    }
  })
}

export function generateWingBooks(sectionLabel, side) {
  const count = randInt(10, 16)
  return Array.from({ length: count }, (_, i) => ({
    id: `${sectionLabel}-${side}-wing-${i}`,
    h: randInt(100, 190),
    w: randInt(13, 24),
    color: pick(EARTH_TONES),
    tilt: randBetween(-1.5, 1.5),
  }))
}

const OBJECT_TYPES = ['plant', 'globe', 'candle', 'hourglass']

export function generateObjects(sectionLabel) {
  const count = randInt(1, 3)
  return Array.from({ length: count }, (_, i) => ({
    id: `${sectionLabel}-obj-${i}`,
    type: pick(OBJECT_TYPES),
  }))
}

const PINNED = {
  personal: [
    { kind: 'object', data: { id: 'personal-rook',  type: 'knight', linkTo: '/personal?item=rook'  } },
    { kind: 'object', data: { id: 'personal-vinyl', type: 'vinyl', linkTo: '/personal?item=vinyl' } },
  ],
  creative: [
    { kind: 'object', data: { id: 'creative-frame', type: 'frame', linkTo: '/creative?item=frame' } },
  ],
  professional: [],
}

export function buildShelves() {
  return SECTIONS.map((label) => {
    const books = generateBooks(label)
    const objects = generateObjects(label)
    const slots = [
      ...PINNED[label],
      ...books.map(b => ({ kind: 'book', data: b })),
      ...objects.map(o => ({ kind: 'object', data: o })),
    ]
    for (let i = slots.length - 1; i > 0; i--) {
      const j = randInt(0, i)
      ;[slots[i], slots[j]] = [slots[j], slots[i]]
    }
    return {
      label,
      slots,
      leftWing:  generateWingBooks(label, 'left'),
      rightWing: generateWingBooks(label, 'right'),
    }
  })
}
