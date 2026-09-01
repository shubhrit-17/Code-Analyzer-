---
name: Developer Light
colors:
  surface: '#F1F5F9'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#3e484d'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#6e797e'
  outline-variant: '#bdc8ce'
  surface-tint: '#006780'
  primary: '#00647c'
  on-primary: '#ffffff'
  primary-container: '#007f9d'
  on-primary-container: '#fafdff'
  inverse-primary: '#6cd3f7'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#4b41e1'
  on-tertiary: '#ffffff'
  tertiary-container: '#645efb'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b7eaff'
  primary-fixed-dim: '#6cd3f7'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#004e61'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#e2dfff'
  tertiary-fixed-dim: '#c3c0ff'
  on-tertiary-fixed: '#0f0069'
  on-tertiary-fixed-variant: '#3323cc'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
  bg-main: '#FFFFFF'
  bg-subtle: '#F8FAFC'
  border-quiet: '#E2E8F0'
  code-bg: '#F6F8FA'
typography:
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.02em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '450'
    lineHeight: 20px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
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
  gutter: 8px
  margin: 16px
  stack: 12px
  section: 24px
---

## Brand & Style
The design system is a clean, high-precision evolution of a technical workspace, pivoting from a dark IDE aesthetic to a "Sophisticated Professional" light mode. It is designed for developers who require high legibility and a focused environment during daylight hours or in well-lit workspaces. 

The personality is **Efficient, Precise, and Transparent**. The design style utilizes **Minimalism** with a focus on high-contrast typography and structural clarity. It replaces the glowing, translucent effects of its predecessor with a crisp, physical layout language. Depth is achieved through subtle tonal shifts and soft, natural shadows rather than neon accents, creating a calm UI that recedes to prioritize the developer's code and data.

## Colors
The palette is centered on a pure, high-contrast foundation to ensure maximum readability and accessibility.

- **Primary (Vibrant Cyan):** Retained for core actions and highlights. The saturation is adjusted for the light background to ensure it meets WCAG AA standards for interactive components.
- **Neutral (Slate):** The primary engine for hierarchy. Pure slate (#1E293B) is used for headings, while scaled-back tints handle secondary and tertiary metadata.
- **Surface Strategy:** The UI uses a "White-on-Gray" or "Gray-on-White" layering. The main background is pure white, while structural containers (cards, sidebars) use a very light cool gray to provide soft definition without heavy lines.
- **Code Syntax:** Transitions to a "GitHub-inspired" light theme. Keywords use Tertiary (Indigo), strings use Secondary (Emerald), and constants use the Primary (Cyan).

## Typography
The system maintains a dual-typeface system to bridge the gap between UI instruction and technical data.

- **Inter:** The primary workhorse for interface elements. Its neutral, geometric construction provides a professional and unobtrusive reading experience. 
- **JetBrains Mono:** Used exclusively for "Source" data. This includes code snippets, logs, hashes, and version numbers. The 450 weight is preferred for code blocks to maintain visual density on light backgrounds.

Hierarchy is strictly enforced through color contrast: Headings use the primary Slate (#1E293B), Body text uses a slightly lighter Slate (#475569), and labels/captions use a muted Slate (#94A3B8).

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model, specifically optimized for high-density tools such as browser extensions or side-panels (380px-450px).

- **Grid System:** A 4-column fluid grid is used for internal component layouts, utilizing 8px gutters.
- **Rhythm:** All spatial decisions are mapped to a 4px baseline. Components generally use 8px (2 units) for internal padding, while the vertical rhythm between sections is maintained at 16px (4 units) or 24px (6 units) for larger breaks.
- **Information Density:** In data-heavy views, the spacing is compressed to 4px between related items (e.g., a file name and its line count) to maximize the amount of visible information without requiring excessive scrolling.

## Elevation & Depth
In this light-themed system, depth is communicated through **Subtle Tonal Stacking** and **Soft Shadows**.

- **Level 0 (Base):** The #FFFFFF canvas.
- **Level 1 (Surface):** Recessed areas (like code blocks or input tracks) use a #F1F5F9 fill with a thin #E2E8F0 border.
- **Level 2 (Elevated):** Cards and primary containers use a #FFFFFF fill with a very soft, diffused shadow: `0px 1px 3px rgba(0, 0, 0, 0.05), 0px 1px 2px rgba(0, 0, 0, 0.03)`.
- **Level 3 (Overlay):** Tooltips and dropdowns use a crisp #E2E8F0 border and a slightly more pronounced shadow to ensure they pop against Level 1 and 2 surfaces.

Borders are the primary tool for definition. Every interactive element should have a 1px border that is clearly visible but low-contrast compared to the text.

## Shapes
The shape language is "Professional & Approachable." The standard radius is **0.5rem (8px)** for cards and large containers to soften the technical nature of the content.

Buttons and input fields utilize the standard **0.375rem (6px)** radius, which feels precise and tool-like. Status badges, tags, and "pills" use a fully rounded layout to distinguish them as discrete, non-interactive (or secondary) information nodes.

## Components
- **Buttons:** Primary buttons use a solid #0891B2 (Cyan) with white text. Secondary buttons use a #F8FAFC background with a #E2E8F0 border and Slate text.
- **Code Blocks:** Surfaces use #F6F8FA with a 1px #E2E8F0 border. No shadows. Syntax highlighting should follow a light-mode "GitHub" aesthetic.
- **Input Fields:** Use a 1px #E2E8F0 border. On focus, the border transitions to #0891B2 with a soft 2px cyan outer glow at 10% opacity.
- **Chips:** Small status indicators. "Error" chips use a soft red tint (#FEE2E2) with dark red text. "Success" chips use the Secondary Emerald tint. 
- **Cards:** White backgrounds with the Level 2 shadow. On hover, the border color shifts from #E2E8F0 to #CBD5E1 to indicate interactivity.
- **Scrollbars:** Ultra-thin (4px) with a #CBD5E1 thumb that turns #94A3B8 on hover, ensuring they are functional but visually quiet.