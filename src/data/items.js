export const SECTION_ITEMS = {
  personal: [
    {
      id: "curve-fever",
      title: "Curve Fever",
      image: "/images/curvefever.png",
      date: "June, 2026",
      details:
        "No bugs Curve Fever implementation (heavily inspired by https://achtung.life/), with addons inspired by Speedrunners. This is a multiplayer Snake-like game where you attempt to outsurvive your opponents through cutting them off and using powerups.",
      tags: ["game", "multiplayer", "JavaScript", "Claude Code"],
      links: [
        { label: "Play", url: "https://bgitig.github.io/curve_fever/" },
        {
          label: "GitHub Repository",
          url: "https://github.com/bgitig/curve_fever",
        },
      ],
    },
    {
      id: "rook",
      title: "Chess",
      image: "/images/chess.png",
      date: new Date(),
      details:
        "Check out my chess.com profile! I just reached 2000 rapid (99.8 percentile) and 1900 blitz (99.5 percentile). I'm always looking for someone new to play, so feel free to send me a challenge or friend request.",
      tags: ["game", "strategy"],
      links: [
        {
          label: "Chess.com Profile",
          url: "https://www.chess.com/member/bgitig",
        },
      ],
    },
    {
      id: "vinyl",
      title: "Music",
      spotifyFetch: true,
      image: null,
      date: null,
      details:
        "I love discovering new music. The track above is pulled live from my Spotify listening history.",
      tags: ["music"],
      links: [],
    },
  ],
  creative: [
    {
      id: "frame",
      title: "Treehouse",
      image: "/images/treehouse.png",
      video: "/images/treehouse.mp4",
      date: "May, 2026",
      details:
        "An eco-brutalist inspired treehouse I drew for my VISA0100 final. I normalized progress photos' lighting, contrast, and position, and stitched them together into a short video.",
      tags: ["art", "drawing"],
    },
    {
      id: "chair",
      title: "Steltman Chair",
      image: "/images/chair_final.jpg",
      images: [
        "/images/chair_final.jpg",
        "/images/chair_progress.jpg",
        "/images/chair_stain.jpg",
        "/images/tenons.jpg",
        "/images/mortises.jpg",
      ],
      date: "May, 2026",
      details:
        "A replica of Gerrit Rietvald's Steltman Chair I built for my Contemporary Architecture final. This was my first woodworking project, and I wrote a seven page research paper to acoompany it. Click the images to enlarge them.",
      links: [
        {
          label: "Research Paper",
          url: "/images/chair_paper.pdf",
        },
      ],
      tags: ["woodworking", "architecture"],
    },
  ],
  professional: [
    {
      id: "resume",
      title: "Resume",
      image: "/images/resume.png",
      date: new Date(),
      details:
        "My professional resume highlighting my education, experience, and skills.",
      links: [
        {
          label: "View Resume PDF",
          url: "/images/resume.pdf",
        },
      ],
      tags: ["resume"],
    },
    {
      id: "UJ",
      title: "Urban Journal",
      image: "/images/urban_journal.png",
      date: "Sept 2025 - May 2026",
      details:
        "I served as Editor in Chief of, and contributed to, Volume 12 of Brown University's Urban Journal, a student-run publication hosting visual, literary, and academic works which include diverse disciplines like architecture, sustainability, design, policy, and history.",
      links: [
        {
          label: "View the Urban Journal",
          url: "https://urbanstudies.brown.edu/about/urban-journal-archive",
        },
      ],
      tags: ["publication"],
    },
    {
      id: "BFM",
      title: "Brown Film Magazine",
      image: "/images/bfm.png",
      date: "Nov 2023 - May 2026",
      details:
        "I served as Editor in Chief of the Brown Film Magazine, stewarding it from an online publication to a print magazine, introducing a Head of Design and revamped design/illustration department, and facilitating collaboration with other student organizations.",
      links: [
        {
          label: "View the Brown Film Magazine",
          url: "https://brownfilmmagazine.com",
        },
      ],
      tags: ["publication"],
    },
  ],
};
