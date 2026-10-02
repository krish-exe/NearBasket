---
name: Neighborhood Hyperlocal
colors:
  surface: '#f7fbf0'
  surface-dim: '#d7dbd2'
  surface-bright: '#f7fbf0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f5eb'
  surface-container: '#ebefe5'
  surface-container-high: '#e5eadf'
  surface-container-highest: '#e0e4da'
  on-surface: '#181d17'
  on-surface-variant: '#40493d'
  inverse-surface: '#2d322b'
  inverse-on-surface: '#eef2e8'
  outline: '#707a6c'
  outline-variant: '#bfcaba'
  surface-tint: '#1b6d24'
  primary: '#0d631b'
  on-primary: '#ffffff'
  primary-container: '#2e7d32'
  on-primary-container: '#cbffc2'
  inverse-primary: '#88d982'
  secondary: '#8f4e00'
  on-secondary: '#ffffff'
  secondary-container: '#ff8f00'
  on-secondary-container: '#623400'
  tertiary: '#006156'
  on-tertiary: '#ffffff'
  tertiary-container: '#097c6e'
  on-tertiary-container: '#bdfff1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a3f69c'
  primary-fixed-dim: '#88d982'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005312'
  secondary-fixed: '#ffdcc2'
  secondary-fixed-dim: '#ffb77a'
  on-secondary-fixed: '#2e1500'
  on-secondary-fixed-variant: '#6d3a00'
  tertiary-fixed: '#97f3e2'
  tertiary-fixed-dim: '#7ad7c6'
  on-tertiary-fixed: '#00201b'
  on-tertiary-fixed-variant: '#005047'
  background: '#f7fbf0'
  on-background: '#181d17'
  surface-variant: '#e0e4da'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is built to foster neighborhood trust and effortless local commerce. The brand personality is "The Helpful Neighbor"—warm, reliable, and approachable, avoiding the cold efficiency of global logistics for the tactile warmth of a local market.

The visual style utilizes a **Modern Minimalist** foundation with **Tactile** influences. It prioritizes clarity through generous whitespace and soft edges, creating an interface that feels lightweight yet sturdy. The emotional goal is to make users feel connected to their community, emphasizing freshness and local accessibility over corporate scale.

## Colors

The palette is rooted in the natural tones of a fresh market.
- **Primary Green (#2E7D32):** Represents freshness, growth, and the trust associated with local grocers. Used for primary actions and brand presence.
- **Accent Amber (#FF8F00):** A warm, energetic color for calls-to-action and active status tracking, providing high visibility without appearing aggressive.
- **Background (#F7F9F7):** An off-white with a slight green/warm undertone to reduce eye strain and provide a "paper-like" organic feel.
- **Status Tones:** We employ specific hues for order lifecycles—Blue (#1976D2) for accepted, Teal (#00796B) for ready-for-pickup, and Red (#D32F2F) for cancellations.

## Typography

The design system uses **Plus Jakarta Sans** as the primary typeface to inject a soft, contemporary, and welcoming personality. Its rounded terminals mirror the friendly brand character. For small-scale utility text and technical labels, **Inter** is used to maintain high legibility and a systematic feel.

Headlines should use tighter letter-spacing to appear cohesive, while body text maintains standard spacing for maximum readability during longer browsing sessions. Mobile headings are scaled down to ensure product names and store titles remain visible above the fold.

## Layout & Spacing

This design system uses a **Fluid Grid** approach with a focus on "Generous Breathability." 
- **Mobile:** A 4-column grid with 16px margins. Content should be stacked vertically in single-column cards or 2-column product grids.
- **Desktop:** A 12-column grid with a maximum content width of 1280px.
- **Rhythm:** Use a 4px/8px incremental scale. Generous vertical padding (32px+) between sections is encouraged to prevent the "cluttered marketplace" feel common in competitors. Elements should feel "placed" rather than "crammed."

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Ambient Shadows**. 
- **The Base:** The off-white background serves as the lowest layer.
- **The Surface:** White cards (#FFFFFF) sit atop the background with a very soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.04)).
- **The Lift:** Interactive elements like "Add to Cart" or "Active Order" cards use a secondary elevation level with a slightly more pronounced shadow to indicate tapability.
- **Borders:** Avoid heavy borders. Use 1px soft-gray (#E0E0E0) strokes only when cards are adjacent to one another and require clear separation on low-brightness screens.

## Shapes

The shape language is defined by **pronounced roundedness** to evoke friendliness and safety. 
- Standard UI components (Inputs, Small Cards) use a **12px (rounded-md)** radius.
- Larger containers like Store Profile headers or Featured Product cards use a **24px (rounded-xl)** radius.
- Buttons should maintain a high roundedness (12px or fully pill-shaped) to ensure they feel soft and inviting to touch.

## Components

### Product & Store Cards
Cards are the primary vehicle for content. They should feature white backgrounds, the standard 12px corner radius, and subtle ambient shadows. 
- **Product Cards:** Image-first, with the price in Primary Green and the "Add" button as a prominent circular or pill-shaped icon in the bottom right.
- **Store Cards:** Feature a small avatar/logo of the shop and a "Distance" badge using `label-sm`.

### Status Badges
Badges use a "soft-fill" style: a 10% opacity background of the status color with high-contrast text of the same hue.
- **Pending:** Amber background, Dark Amber text.
- **Accepted:** Blue background, Dark Blue text.
- **Ready:** Teal background, Dark Teal text.
- **Completed:** Green background, Dark Green text.
- **Cancelled:** Red background, Dark Red text.

### Buttons & Inputs
- **Primary Button:** Solid fill (#2E7D32) with white text. High roundedness.
- **Secondary Action:** Ghost style with Primary Green border and text.
- **Inputs:** Background-colored (#F7F9F7) or white with a 1px border. Focus state should be a 2px Primary Green glow.

### Icons
Use 24px line icons with a "Medium" stroke weight. Icons should have rounded caps and joins to match the typography and corner radius of the design system.