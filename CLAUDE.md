# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal website showcasing academic work, personal projects, and creative works. The UI is a fullscreen, non-scrollable 3D-style bookshelf. There is no backend — this is a static frontend project.

## Design Spec

The full design intent lives in `docs.md`. Key constraints:

**Layout**
- Single fullscreen, non-scrollable page
- Bookshelf with three labeled sections: "personal", "creative", "professional"
- On every page load: book sizes, colors, order, and positions are randomized; decorative objects are placed in random shelf positions

**Objects on shelves**
- Decorative fillers: plants, globes, etc.
- Clickable objects: paintings (display a real uploaded image), chessboard/piece
- Books are also clickable (they link to projects/works)

**Visual tone — non-negotiable**
- Dark, gloomy, archaic, old-bookstore feel — NOT clean/modern/"vibe-coded"
- Dark wood bookshelf with visible texture (not flat color)
- Books in dark earth tones (browns, reds, greens) with mottling/depth/shadowing — not flat fills
- Most of the page is very dark
- A soft circle of light follows the mouse cursor (candle-light effect) — the background is only illuminated near the cursor

**Interactivity**
- Books slightly translate toward the viewer (CSS 3D transform or JS) on hover
- Clicking a book opens/navigates to the associated work

## Architecture Guidance

Since no framework has been chosen yet, prefer **vanilla HTML/CSS/JS** or a lightweight bundler (Vite + vanilla) unless the complexity demands a framework. The candle-light effect and randomized layout suggest JavaScript-driven DOM generation at load time rather than static HTML.

Key rendering concerns:
- Bookshelf and books should be generated programmatically in JS so randomization is straightforward
- The candle-light effect is best done with a radial-gradient overlay on a `mousemove` listener, or via CSS custom properties updated in JS
- Book textures/mottling can be achieved with CSS `box-shadow`, SVG noise filters, or canvas-drawn textures
- Keep the randomization seed-less (pure `Math.random()`) so every visit looks different
