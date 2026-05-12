---
name: Cinematic Dark
colors:
  surface: '#141218'
  surface-dim: '#141218'
  surface-bright: '#3b383e'
  surface-container-lowest: '#0f0d13'
  surface-container-low: '#1d1b20'
  surface-container: '#211f24'
  surface-container-high: '#2b292f'
  surface-container-highest: '#36343a'
  on-surface: '#e6e0e9'
  on-surface-variant: '#cbc4d2'
  inverse-surface: '#e6e0e9'
  inverse-on-surface: '#322f35'
  outline: '#948e9c'
  outline-variant: '#494551'
  surface-tint: '#cfbcff'
  primary: '#cfbcff'
  on-primary: '#381e72'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#6750a4'
  secondary: '#cdc0e9'
  on-secondary: '#342b4b'
  secondary-container: '#4d4465'
  on-secondary-container: '#bfb2da'
  tertiary: '#e7c365'
  on-tertiary: '#3e2e00'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#141218'
  on-background: '#e6e0e9'
  surface-variant: '#36343a'
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  title-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-base:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 2rem
  gutter: 1.5rem
  bento-gap: 1rem
---

## Brand & Style
This design system is engineered for **GhostwriterOS.ai**, targeting high-end AI content creators who require a focused, immersive, and elite digital environment. The personality is "Quiet Luxury for Power Users"—sophisticated, technically superior, and visually cinematic.

The aesthetic blends **Minimalism** with **Glassmorphism**. It utilizes a "Deep Space" background strategy to eliminate distractions, while using high-contrast accents and subtle glow effects to signal intelligence and interactivity. The interface should feel less like a website and more like a professional creative terminal.

## Colors
The palette is anchored by **#050505**, providing a true-black foundation that allows OLED screens to achieve infinite contrast. 

- **Primary & Secondary Backgrounds:** Used to create structural hierarchy. #0F0F0F is reserved for elevated surfaces and bento-grid containers.
- **Accents:** **Emerald (#10B981)** represents "Active AI" or "Success" states, while **Purple (#A855F7)** signifies "Creative Intelligence" or "Premium Features."
- **Interactive States:** Use glows rather than solid fills. When an element is active, it should emit a soft 15px-20px radial blur of the accent color behind it.

## Typography
This design system utilizes **Geist** for its technical precision and modern, monospaced-adjacent character. 

- **Headlines:** Use large, bold weights with tight letter-spacing to create a "Display" feel. 
- **Body Text:** Keep contrast high (Pure White on Dark Grey). 
- **Labels:** Use uppercase with increased tracking for a sophisticated, UI-terminal look.
- **Hierarchy:** Use font-weight rather than size to distinguish importance in dense creative dashboards.

## Layout & Spacing
The layout follows a **Bento Box** philosophy—content is housed in distinct, modular containers that fit together into a cohesive grid. 

- **Grid:** Use a 12-column grid for desktop.
- **Rhythm:** Spacing should be generous. Use a base-4 scale. Containers should have at least 24px of internal padding to maintain a premium feel.
- **Responsive:** On mobile, bento containers stack vertically. The 1.5rem margin is maintained to ensure the "Glass" edges are always visible against the primary background.

## Elevation & Depth
Depth is not created through shadows, but through **Tonal Layering** and **Glassmorphism**.

1.  **Level 0 (Floor):** #050505 (Background).
2.  **Level 1 (Bento Containers):** #0F0F0F with a 1px `white/0.08` border.
3.  **Level 2 (Floating Modals/Popovers):** Glassmorphic surfaces with `backdrop-filter: blur(20px)` and a slightly higher border opacity.
4.  **Accent Depth:** Use "Inner Glows" (box-shadow inset) on active buttons to make them feel carved into the interface.

## Shapes
This design system uses a **Rounded** language (Level 2). 

- **Standard Elements:** 0.5rem (8px) radius for buttons and inputs.
- **Bento Containers:** 1rem (16px) to 1.5rem (24px) radius to create a soft, friendly counter-balance to the high-contrast dark theme.
- **Icons:** Use linear, 2px stroke icons with slightly rounded caps to match the typography.

## Components
- **Buttons:** 
  - *Primary:* Solid Emerald or Purple with a white label. 
  - *Secondary:* Ghost style with a 1px border and a subtle hover glow that matches the border color.
- **Bento Cards:** Use a 1px solid border (`rgba(255,255,255,0.1)`). On hover, the border color should transition to the Emerald accent.
- **Inputs:** Darker than the container background (#050505). Focus state should trigger a soft outer glow of the Accent color.
- **Glow Borders:** Use linear gradients for borders (e.g., Transparent -> Accent -> Transparent) to create a "scanning" or "active" effect on AI-processing modules.
- **Chips:** Small, pill-shaped with low-opacity background fills of the accent color (e.g., `Emerald/0.1`).