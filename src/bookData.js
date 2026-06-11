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
        linkTo: "/professional?item=resume",
        src: "/images/resume.png",
      },
    },
    {
      kind: 'book',
      data: {
        id:         'professional-bfm',
        h:          180,
        w:          32,
        color:      pick(EARTH_TONES),
        spineColor: pick(EARTH_TONES),
        tilt:       randBetween(-1.5, 1.5),
        label:      'Brown Film Magazine',
        linkTo:     '/professional?item=BFM',
      },
    },
    {
      kind: 'book',
      data: {
        id:         'professional-urban-journal',
        h:          170,
        w:          32,
        color:      pick(EARTH_TONES),
        spineColor: pick(EARTH_TONES),
        tilt:       randBetween(-1.5, 1.5),
        label:      'Urban Journal',
        linkTo:     '/professional?item=UJ',
      },
    },
  ],
};

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(0, i)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function buildShelves() {
  return SECTIONS.map((label) => {
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

    // Each pinned item gets 0–3 random filler items before it, then the pinned
    // item itself. This bounds the total pixel offset before the last pinned item
    // to ~9 books × 35px avg = ~315px — always visible in the center section.
    // Pinned items are shuffled so their order varies each load.
    const pinnedShuffled = shuffle([...PINNED[label]])
    let fi = 0
    const slots = []
    for (const p of pinnedShuffled) {
      const gap = randInt(0, 3)
      for (let g = 0; g < gap && fi < filler.length; g++) slots.push(filler[fi++])
      slots.push(p)
    }
    while (fi < filler.length) slots.push(filler[fi++])

    const wingBook = (id) => ({
      id,
      h:     randInt(100, 190),
      w:     randInt(13, 24),
      color: pick(EARTH_TONES),
      tilt:  randBetween(-1.5, 1.5),
    })

    return {
      label,
      slots,
      leftWing:  Array.from({ length: randInt(10, 16) }, (_, i) => wingBook(`${label}-left-${i}`)),
      rightWing: Array.from({ length: randInt(10, 16) }, (_, i) => wingBook(`${label}-right-${i}`)),
    }
  })
}
