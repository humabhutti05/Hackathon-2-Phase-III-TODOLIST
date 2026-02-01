# Feature Specification: Dark Sci-Fi / EVE Online Aesthetic Overhaul

**Feature Branch**: `theme-eve-dark`  
**Created**: 2026-01-26  
**Status**: Draft  
**Input**: User provided image reference (EVE Online Dashboard interface).

## Objective
Transform the current light SaaS theme into a **Dark, Immersive, Sci-Fi** aesthetic. This is a total visual overhaul inspired by space command interfaces (EVE Online).

## Visual Analysis (from image)
- **Background**: Deep space black/dark grey (`#0A0A0B`) with subtle starfield/noise texture.
- **Surface Colors**: Dark charcoal/gunmetal gradients (`#1A1A1D` to `#161618`).
- **Accents**: Neon Green (`#4ADE80` / `#22C55E`) for primary actions, Cool Blue (`#3B82F6`) for info.
- **Glassmorphism**: Heavy use of translucent panels with blurred backdrops.
- **Architecture**:
  - **Sidebar**: Mini-collapsed vertical strip with icon focus.
  - **Cards**: Rounded rectangles (`rounded-[2rem]`) with inner glow/borders.
  - **Typography**: Sans-serif, white text, high contrast. Use of "Label" graphics (small text, uppercase).

## Technical Requirements

### 1. Global CSS Variables (Tailwind Theme)
- `bg-space-black`: `#050505`
- `bg-panel-dark`: `#111111` (with 80% opacity for glass)
- `border-glass`: `rgba(255, 255, 255, 0.08)`
- `text-primary`: `#FFFFFF`
- `text-secondary`: `#9CA3AF` (Gray-400)
- `accent-neon`: `#4ADE80` (Green)

### 2. Component Redesigns
- **Sidebar**: Collapse to a thin 80px "Dock" rail with centered icons.
- **Task Cards**: Convert to "Module" look—dark background, inner border glow on hover.
- **Header**: Transparent, floating command bar.
- **Background**: Add a static starfield or noise SVG overlay.

## Implementation Roadmap
1.  **Refactor `globals.css`**: Define the new dark palette variables.
2.  **Layout Update**: Shrink Sidebar to "Icon Dock" mode.
3.  **Component Styling**: Update `TaskCard`, `CreateTask`, and `Badge` to match the "Ship Module" aesthetic.
4.  **Effects**: Add "Command Center" ambiance (glows, gradients).

## Success Criteria
- [ ] UI matches the "Dark/Space" vibe of the reference image.
- [ ] Text remains readable (WCAG AA contrast).
- [ ] Layout feels like a game interface / HUD.
