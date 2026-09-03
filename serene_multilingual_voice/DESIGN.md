---
name: Serene Multilingual Voice
colors:
  surface: '#fff8f5'
  surface-dim: '#e5d7cf'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e9'
  surface-container: '#f9ebe3'
  surface-container-high: '#f4e5dd'
  surface-container-highest: '#eee0d8'
  on-surface: '#211a15'
  on-surface-variant: '#41474c'
  inverse-surface: '#372f29'
  inverse-on-surface: '#fceee6'
  outline: '#72787d'
  outline-variant: '#c1c7cd'
  surface-tint: '#3a637c'
  primary: '#38607a'
  on-primary: '#ffffff'
  primary-container: '#517993'
  on-primary-container: '#fcfcff'
  inverse-primary: '#a3cce9'
  secondary: '#69577e'
  on-secondary: '#ffffff'
  secondary-container: '#e9d1ff'
  on-secondary-container: '#6a577e'
  tertiary: '#7e4f50'
  on-tertiary: '#ffffff'
  tertiary-container: '#996767'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c7e7ff'
  primary-fixed-dim: '#a3cce9'
  on-primary-fixed: '#001e2e'
  on-primary-fixed-variant: '#204b63'
  secondary-fixed: '#efdbff'
  secondary-fixed-dim: '#d4beeb'
  on-secondary-fixed: '#241436'
  on-secondary-fixed-variant: '#513f64'
  tertiary-fixed: '#ffdad9'
  tertiary-fixed-dim: '#f4b8b7'
  on-tertiary-fixed: '#321112'
  on-tertiary-fixed-variant: '#663b3b'
  background: '#fff8f5'
  on-background: '#211a15'
  surface-variant: '#eee0d8'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 58px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  gutter-desktop: 1.5rem
  gutter-mobile: 1rem
  margin-desktop: 3rem
  margin-mobile: 1.25rem
---

## Brand & Style

This design system is crafted for an ambient, multilingual voice assistance platform. It prioritizes psychological safety, conversational fluidity, and cognitive clarity for both international end-users and contact center operators navigating high-context multilingual calls.

The visual direction rejects sterile enterprise tropes, cybernetic accents, and mechanical chat bubbles. Instead, it balances tactile modernism with warm editorial clarity:
- **Atmosphere:** Grounded, peaceful, organic, and spacious. The interface acts like acoustic insulation—absorbing visual clutter so auditory and linguistic cues can take center stage.
- **Personality:** Attentive, culturally adaptive, gentle, and transparent.
- **Tone:** Soft matte surfaces, organic boundary layers, and human-paced state transitions that visually reassure users during live audio translation, transcribing, and escalation.

## Colors

The color system derives strictly from the source palette, mapped to distinct roles across voice streams, AI processing states, and human support thresholds:

- **Light Cream (`#FDF4D2` / Surface Base `#FAF6E8`):** Serves as the primary canvas, replacing clinical digital white with a warm, paper-like foundation. It reduces optic fatigue over sustained monitoring sessions.
- **Soft Light Blue (`#B0CDE6` / Tone Anchor `#668EA9`):** Represents caller interaction, streaming voice frequency patterns, active voice channel indicators, and constructive primary calls-to-action.
- **Muted Lavender (`#A290B7` / Semantic Tone `#8A769F`):** Represents artificial intelligence synthesis, concurrent multi-language machine translation, semantic confidence overlays, and auxiliary assistant notes.
- **Muted Dusty Rose (`#946D6D` / Escalation Anchor `#8A5A5A`):** Applied deliberately to friction boundaries—human operator escalation handoffs, translation ambiguities, sentiment alerts, and sensitive intent verifications.
- **Warm Neutral Body (`#544B45`):** A warm umber-tinted charcoal that avoids pure black, preserving typography warmth and softness against cream surfaces while meeting strict WCAG AAA contrast.

Color application must follow strict semantic pairing: voice waveforms use soft blue; transcription inference models use muted lavender; operator-required interventions utilize dusty rose.

## Typography

The type structure balances conversational warmth with surgical legibility across multiple global writing scripts.

- **Primary Typeface (Plus Jakarta Sans):** Selected for its open apertures, rounded counters, and friendly geometry. It introduces an approachable human cadence to speech transcriptions, summaries, and dialogue panels without looking whimsical.
- **Secondary / Label Typeface (Inter):** Deployed for dense operational metadata, audio metrics, timestamps, language tags, decibel levels, and state toggles. Its tall x-height maintains razor-sharp clarity at micro scales.
- **Multilingual Rules:** When handling non-Latin characters (e.g., CJK, Arabic, Devanagari), base font size increases by `1px` and line heights expand by `10%` to preserve readability and accent mark bounds.

## Layout & Spacing

The layout philosophy emphasizes breathable negative space that minimizes pressure during real-time speech interaction.

- **Grid Architecture:** 
  - **Desktop (≥ 1200px):** 12-column adaptive layout, max content width of `1440px`. Transcription and voice interaction viewports maintain balanced columns with generous margins (`3rem`) to avoid edge collision.
  - **Tablet (768px – 1199px):** 8-column layout with fluid transcript streaming and collapsable translation sidecars.
  - **Mobile (< 768px):** 4-column single-stream stack, prioritizing the live speaker pane and contextual control shelf.
- **Spacing Rhythm:** Based on an 8pt system with 4pt half-steps for fine alignment around audio waveforms and language badge pills.
- **Voice Focus Area:** Live conversational transcripts require an uninterrupted vertical clearance of at least `2rem` between speech turns, reinforcing turn-taking cadence.

## Elevation & Depth

This system avoids dark cast shadows or artificial glossy depth. Depth is achieved entirely through warm tonal surfaces and soft ambient halos:

- **Surface Tiers:**
  - **Base Canvas:** Pale Ivory Warmth (`#FAF6E8`) creates ambient space.
  - **Surface Container Low:** Soft Pure Cream (`#FDF4D2`) for background grouping cards.
  - **Surface Container High:** Crisp White Tint (`#FFFFFF`) with 80% opacity for floating transcription cards and actionable overlays.
- **Ambient Shadowing:** Shadows use an umber-tinted low-opacity profile rather than generic black:
  - *Resting Card:* `0 2px 8px -2px rgba(84, 75, 69, 0.05), 0 4px 16px -4px rgba(84, 75, 69, 0.04)`
  - *Floating Dialog / Popover:* `0 8px 24px -6px rgba(84, 75, 69, 0.08), 0 16px 36px -8px rgba(84, 75, 69, 0.06)`
- **Soft Borders:** Cards and panels carry a soft 1px border (`rgba(84, 75, 69, 0.08)`) to establish visual separation without heavy boundaries.

## Shapes

The geometry favors rounded, protective silhouettes that communicate accessibility and ease:

- **Cards & Primary Modules:** Standard corner radius of `16px` (`1rem`) to keep large surfaces relaxed and cohesive.
- **Action Buttons & Modals:** Standard corner radius of `24px` (`1.5rem`) for pill-adjacent, tactile elements.
- **Pills, Badges & Voice Meters:** Full circular/capsule radius (`9999px`) for language selectors, state tags, and speech activity indicators.
- **Inputs & Fields:** `12px` (`0.75rem`) for structured input boundaries, maintaining clean alignment with tabular multilingual translation pairs.

## Components

### 1. Buttons
- **Primary Action (Call/Start/Confirm):** Background `Soft Light Blue` (`#B0CDE6`), foreground deep slate-umber (`#284257`), bold weight. Rounded radius `24px`. Hover deepens tone smoothly without harsh elevation jumps.
- **Secondary Action (Transcript Tools/Settings):** Background transparent, 1px border `rgba(84, 75, 69, 0.15)`, text `#544B45`.
- **Escalation Button (Transfer to Human):** Background `Muted Dusty Rose` (`#946D6D`), foreground `#FFFFFF`. Used strictly for handoff and critical intervention steps.

### 2. Speech & Transcript Turn Cards
- **Caller Stream Card:** Surface `#FFFFFF` with a subtle left accent bar (`3px`, `#B0CDE6`). Typography is clear and prominent, paired with language detection tags (`Inter 11px`).
- **AI Synthesis Card:** Surface tinted with ultra-low opacity `Muted Lavender` (`rgba(162, 144, 183, 0.12)`), soft border `rgba(162, 144, 183, 0.35)`. Contains dual-language view (source audio translation underneath original phrase).
- **Handoff / Caution Card:** Surface tinted with `Muted Dusty Rose` (`rgba(148, 109, 109, 0.08)`), border `rgba(148, 109, 109, 0.25)`. Includes confidence score indicator and transfer button.

### 3. Audio & Voice Indicators
- **Waveform Monitor:** Uses fluid rounded bars colored in `#B0CDE6` when user speaks, shifting to `#A290B7` when the assistant processes. 
- **Language Chips:** Capsule-shaped (`rounded-full`), padding `4px 12px`, background `#FAF6E8`, soft border `rgba(84, 75, 69, 0.12)`, font `Inter 12px Medium`.

### 4. Input Fields & Text Areas
- Background `#FFFFFF`, border `1px solid rgba(84, 75, 69, 0.15)`, focus ring `2px solid #B0CDE6` with zero offset. Labels set in `Inter 12px SemiBold`.

### 5. Checkboxes & Radio Controls
- Circular and smooth, using `#B0CDE6` active fills with an off-white checkmark. Unchecked states rely on subtle `1.5px` border outlines.