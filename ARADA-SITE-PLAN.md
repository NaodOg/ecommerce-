# ARADA — Ecommerce Site Build Plan

## Brand Overview

**ARADA** — Premium streetwear apparel. Dark industrial brutalism meets cyberpunk utility. Every piece is numbered, made-to-order, and built to last.

---

## Design System

### Aesthetic Direction
**Industrial Brutalism + Cyberpunk Utility**

- Deep dark backgrounds (#050505, #111415)
- Electric cyan accents (#00BFFF, #00DFD)
- Material Symbols Outlined for iconography
- HUD-style decorative elements (corner accents, grid overlays, status indicators)
- Glowing hover states with cyan box-shadows
- Brutalist borders (sharp, no radius or minimal)
- Marquee tickers for announcements
- Glassmorphism panels with backdrop blur

### Typography
| Token | Font | Use |
|---|---|---|
| `display-xl` | Archivo Narrow | Hero headlines, section titles |
| `headline-lg` | Archivo Narrow | Page headings |
| `subheader` | Archargo Narrow | Card titles, labels |
| `body-lg` / `body-md` | Inter | Body text, descriptions |
| `label-mono` | JetBrains Mono | Nav links, tags, badges, prices |

### Color Palette
```
background:       #111415
surface:          #111415
surface-dim:      #111415
surface-container:#1d2021
surface-container-high: #282a2b
surface-container-highest: #323536
primary:          #bec2ff
primary-container:#0000ff
secondary:        #8bd5ff
secondary-container: #00bdfd
on-surface:       #e1e3e4
on-surface-variant: #c5c4db
outline:          #8f8fa4
outline-variant:  #454558
error:            #ffb4ab
```

### Spacing & Layout
- Mobile margin: 16px
- Desktop margin: 48px
- Mobile gutter: 12px
- Desktop gutter: 24px
- Container max-width: 1440px
- Border radius: minimal (0.125rem default, 0.75rem full)

### Key Components
- `glow-hover` — cyan box-shadow on hover
- `glow-text-cyan` — cyan text-shadow
- `glass-panel` — backdrop-blur + semi-transparent bg
- `brutal-border` — sharp 1px solid border
- `hud-panel` — decorative corner accents + grid overlay

---

## Site Architecture

```
/
├── index.html            → Landing / Hero
├── /drops/
│   └── index.html        → Shop / Product Grid
├── /studio/
│   └── index.html        → 3D Customizer
├── /about/
│   └── index.html        → Brand Story / Concept
├── /product/
│   └── [slug].html       → Individual Product Page
├── /cart/
│   └── index.html        → Cart / Checkout
└── /account/
    └── index.html        → User Profile / Orders
```

---

## Page Breakdown

### 1. Landing Page (`/index.html`)
**Purpose:** Hero-first brand statement. Immediate visual impact. Drive users to shop or open the studio.

**Source Reference:** First HTML file (NOVA Hero)

**Structure:**
```
┌─────────────────────────────────────────────┐
│  TOP APPBAR (sticky, backdrop-blur)         │
│  Logo: ARADA    Nav: SHOP DROPS STUDIO ABOUT│
│  [DESIGN YOURS →]  🛒  👤                  │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │                                     │    │
│  │     HERO IMAGE / VIDEO              │    │
│  │     (full-width, aspect 4/5 mobile  │    │
│  │      21/9 desktop)                  │    │
│  │                                     │    │
│  │              [LIVE] badge (top-right)│    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ● ARADA · AFTER DARK                       │
│                                             │
│  BUILT TO                                   │
│  LAST.                                      │
│                                             │
│  Custom heavyweight apparel, numbered       │
│  runs only. Made to order. No minimums.     │
│                                             │
│  [DESIGN YOURS]  [SEE THE DROP]             │
│                                             │
├─────────────────────────────────────────────┤
│  MOBILE BOTTOM NAV                          │
│  Feed | Studio | Cart | Profile             │
└─────────────────────────────────────────────┘
```

**Key Elements:**
- Full-bleed hero image with `mix-blend-luminosity` + hover reveal
- LIVE pulse indicator badge
- Two CTAs: primary (filled) + secondary (outlined)
- Brand name in Archivo Narrow, tight tracking
- Subtitle in JetBrains Mono with wide letter-spacing

---

### 2. Drops / Shop Page (`/drops/index.html`)
**Purpose:** Product catalog. Show current drop with stats and grid.

**Source Reference:** Second HTML file (NOVA Drops)

**Structure:**
```
┌─────────────────────────────────────────────┐
│  TOP APPBAR (same as landing)               │
├──────────┬──────────────────────────────────┤
│  SIDE    │  MARQUEE TICKER                  │
│  NAV     │  "NEW DROP 04 // 48h TURNAROUND" │
│  (desk)  ├──────────────────────────────────┤
│          │  STATS ROW                       │
│  ARADA   │  240+ PIECES │ 48h │ 1/1        │
│  PHASE 04├──────────────────────────────────┤
│          │  THE DROP              VIEW ALL → │
│  ● Home  │                                  │
│  ○ Drops │  ┌────────┐ ┌────────┐ ┌──────┐ │
│  ○ Custom│  │ Product│ │ Product│ │Product│ │
│  ○ Orders│  │  Card  │ │  Card  │ │ Card │ │
│  ○ Suppt │  └────────┘ └────────┘ └──────┘ │
│          │                                  │
│  ┌─────┐ │  ┌──────────────────────────┐   │
│  │UPG. │ │  │  Preview Row (opacity 50)│   │
│  │STAT │ │  └──────────────────────────┘   │
│  └─────┘ │                                  │
├──────────┴──────────────────────────────────┤
│  MOBILE BOTTOM NAV                          │
└─────────────────────────────────────────────┘
```

**Key Elements:**
- Desktop sidebar nav with active state (cyan left border + bg)
- Marquee ticker with infinite scroll animation
- 3-column stats row with large numbers
- Product grid: 1 col mobile, 2 col tablet, 3 col desktop
- Product cards: aspect 3/4 image, hover scale, "ADD TO CART" button
- Tags: "NEW", "SOLD OUT" badges on images

**Product Card Structure:**
```html
<article class="bg-surface-container border border-outline-variant hover:border-secondary/50">
  <div class="aspect-[3/4] overflow-hidden">
    <img class="group-hover:scale-105 transition-transform duration-500" />
    <!-- Optional badge: NEW, SOLD OUT -->
  </div>
  <div class="p-4">
    <div class="flex justify-between mb-6">
      <h3 class="font-subheader text-white">Product Name</h3>
      <span class="font-label-mono text-secondary">$XX</span>
    </div>
    <button class="w-full border border-secondary/30 hover:bg-primary-container transition-all">
      ADD TO CART
    </button>
  </div>
</article>
```

---

### 3. Studio / Customizer (`/studio/index.html`)
**Purpose:** 3D garment customization tool. Core differentiator.

**Source Reference:** Third HTML file (NOVA Studio)

**Structure:**
```
┌─────────────────────────────────────────────┐
│  TOP APPBAR                                 │
├──────────┬──────────────────────────────────┤
│  SIDE    │                                  │
│  NAV     │     3D STAGE AREA                │
│          │     (garment preview)            │
│  ARADA   │                                  │
│  PHASE 04│     "DRAG TO ROTATE" hint        │
│          │                                  │
│  ● Home  ├──────────────────────────────────┤
│  ○ Drops │  UI OVERLAY                      │
│  ○ Custom│                                  │
│  ○ Orders│  Left: Branding    Right: Panel  │
│  ○ Suppt │  "DROP 001"        ┌──────────┐  │
│          │  "DESIGN IT LIVE"  │ GARMENT  │  │
│  ┌─────┐ │  "Make it glow."  │ Tee|Hood │  │
│  │UPG. │ │                    │──────────│  │
│  │STAT │ │                    │ COLOR    │  │
│  └─────┘ │                    │ ●●●●●    │  │
│          │                    │──────────│  │
│          │                    │ SIDE     │  │
│          │                    │ Front|Bck│  │
│          │                    │──────────│  │
│          │                    │ YOUR ART │  │
│          │                    │ [Upload] │  │
│          │                    └──────────┘  │
├──────────┴──────────────────────────────────┤
│  MOBILE BOTTOM NAV                          │
│  [💬 Support] floating button               │
└─────────────────────────────────────────────┘
```

**Key Elements:**
- Full-screen 3D stage with centered garment image
- Glassmorphism control panel (right side on desktop)
- Controls: garment type, color swatches, front/back toggle, art upload
- Support FAB button (floating, bottom-left)
- Active states: cyan glow ring, filled icon

**Control Panel Components:**
1. **Garment Selector** — Pill buttons (Tee, Hoodie, Pants, Hat)
2. **Color Swatches** — Circular buttons, active has ring + glow
3. **Side Toggle** — Front/Back segmented control
4. **Art Upload** — Dashed border dropzone, drag & drop

---

### 4. About / Concept Page (`/about/index.html`)
**Purpose:** Brand story. Asymmetric split layout.

**Source Reference:** Fourth HTML file (NOVA About)

**Structure:**
```
┌─────────────────────────────────────────────┐
│  TOP APPBAR                                 │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────┬──────────────────┐    │
│  │                  │                  │    │
│  │  IMAGE SIDE      │  CONTENT SIDE    │    │
│  │  (grayscale      │  (glassmorphism  │    │
│  │   industrial     │   panel with     │    │
│  │   photography)   │   grid overlay)  │    │
│  │                  │                  │    │
│  │  [HUD labels]    │  02 THE IDEA     │    │
│  │  [REC indicator] │                  │    │
│  │                  │  YOUR DESIGN.    │    │
│  │                  │  OUR PRESS.      │    │
│  │                  │                  │    │
│  │                  │  [description]   │    │
│  │                  │                  │    │
│  │                  │  [OPEN STUDIO]   │    │
│  │                  │                  │    │
│  │                  │  ┌─┐        ┌─┐  │    │
│  │                  │  └─┘corner └─┘  │    │
│  └──────────────────┴──────────────────┘    │
│                                             │
├─────────────────────────────────────────────┤
│  MOBILE BOTTOM NAV                          │
└─────────────────────────────────────────────┘
```

**Key Elements:**
- 50/50 split layout (stacked on mobile)
- Left: grayscale image with blue overlay, HUD text decorations
- Right: glassmorphism panel with grid background pattern
- Decorative corner accents (border-t-2 border-r-2)
- Section number badge ("02") in primary-container color
- Floating ambient image animation (subtle translateY)

---

## Shared Components

### TopAppBar
```
┌─────────────────────────────────────────────────────────┐
│  ARADA (Archivo Narrow, tight tracking)                 │
│                    SHOP  DROPS  STUDIO  ABOUT           │
│                                        [DESIGN YOURS →] │
│                                        🛒  👤           │
└─────────────────────────────────────────────────────────┘
```
- Sticky, backdrop-blur-md
- Border-bottom: outline-variant or secondary/30
- Logo: font-display-xl, uppercase, tracking-tighter
- Nav links: font-label-mono, hover → secondary color
- Active link: secondary-container color + border-b-2

### Side Navigation (Desktop)
```
┌───────────────────┐
│  ARADA            │
│  PHASE 04 ACCESS  │
│───────────────────│
│  ● Home           │
│  ○ Collections    │
│  ○ Customizer     │
│  ○ Orders         │
│  ○ Support        │
│                   │
│  ┌───────────────┐│
│  │ UPGRADE STATUS││
│  └───────────────┘│
└───────────────────┘
```
- Width: w-64 (256px)
- Active: bg-secondary-container/10, border-l-4, text-secondary
- Inactive: hover → bg-surface-variant + text-secondary
- Bottom: outlined upgrade button

### Mobile Bottom Nav
```
┌─────────────────────────────────────────┐
│  🏠 Feed  │  🎨 Studio  │  🛒 Cart  │ 👤 Profile │
└─────────────────────────────────────────┘
```
- Fixed bottom, backdrop-blur-xl
- Active: secondary-container color, bg-tertiary-container/20, scale-110
- Inactive: on-surface-variant
- Glow shadow: `box-shadow: 0px 0px 20px rgba(0, 191, 255, 0.2)`

### Marquee Ticker
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```
- bg-primary-container, text-white
- font-label-mono, uppercase
- Infinite scroll animation

### Product Card
- bg-surface-container, border border-outline-variant
- Hover: border → secondary/50
- Image: aspect-[3/4], group-hover:scale-105
- Button: border border-secondary/30 → hover:bg-primary-container

### Glowing Button
```css
.glow-hover:hover {
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
}
```

---

## Page-to-Code Mapping

| Page | Source File | Key Modifications for ARADA |
|---|---|---|
| **Landing** | First HTML (NOVA Hero) | Replace "NOVA" → "ARADA", swap hero image, update tagline |
| **Drops** | Second HTML (NOVA Drops) | Replace product data, update stats, swap images |
| **Studio** | Third HTML (NOVA Studio) | Update garment options, keep control panel structure |
| **About** | Fourth HTML (NOVA About) | Update brand story, swap industrial imagery |
| **Product Detail** | *New* — build from card pattern | Full product view with gallery, size selector, add to cart |
| **Cart** | *New* — build from existing style | Summary table, checkout flow |

---

## Implementation Checklist

### Phase 1: Core Pages
- [ ] Create shared CSS variables / Tailwind config
- [ ] Build TopAppBar component (reusable)
- [ ] Build SideNav component (reusable)
- [ ] Build MobileBottomNav component (reusable)
- [ ] Build Landing page from first HTML
- [ ] Build Drops/Shop page from second HTML
- [ ] Build About page from fourth HTML

### Phase 2: Studio
- [ ] Build Studio page from third HTML
- [ ] Implement garment selector logic
- [ ] Implement color swatch selection
- [ ] Implement front/back toggle
- [ ] Implement art upload dropzone

### Phase 3: Ecommerce
- [ ] Build Product Detail page
- [ ] Build Cart page
- [ ] Build Account/Profile page
- [ ] Add to cart functionality
- [ ] Size selector component
- [ ] Checkout flow

### Phase 4: Polish
- [ ] Add marquee ticker animation
- [ ] Add glow hover effects
- [ ] Add glassmorphism panels
- [ ] Add HUD decorative elements
- [ ] Add floating ambient animations
- [ ] Test responsive breakpoints
- [ ] Optimize images

---

## Notes

- All pages use `class="dark"` on `<html>` for dark mode
- Tailwind loaded via CDN with custom config
- Material Symbols for all icons
- No framework dependency — pure HTML/Tailwind/vanilla JS
- Mobile-first responsive design
- Fonts: Archivo Narrow (display), Inter (body), JetBrains Mono (labels)
