# POLY — Visual Design System & UX Architecture Specification

## Overview

**POLY** is a real-time multilingual AI voice assistance platform designed for natural Hindi-English (Hinglish) conversations, structured information collection, critical-detail confirmation, uncertainty detection, and seamless human agent handoffs.

This document defines the official **POLY Design System**, color palette tokens, typography rules, component standards, animation guidelines, and responsive layout principles.

---

## 🎨 1. Brand Identity & Color System

The design aesthetic of POLY is **calm, trustworthy, human, intelligent, modern, and operationally reliable**. It avoids generic AI SaaS cliches (e.g., neon gradients, dark cyberpunk themes, or glassmorphism everywhere) in favor of a warm, light, editorial visual identity.

### Palette Architecture

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| **Light Cream** | `#FFF8F5` | Main page background, hero containers, and large surfaces |
| **Soft Light Blue** | `#38607A` | Primary actions, active voice states, trust-oriented accents, primary CTAs |
| **Muted Lavender** | `#69577E` | AI intelligence accents, language badges, context summary tags |
| **Muted Dusty Rose** | `#7E4F50` | Human escalation alerts, conflict flags, needs-review states |
| **Neutral Grey** | `#BFC9D0` | Card borders, dividers, secondary surface containers |
| **Dark Navy** | `#263845` | Headings, primary body text, high-contrast footer surfaces |

### Explicit Design Exclusions
- ❌ **No neon or electric blue colors**
- ❌ **No pure black (`#000000`) backgrounds**
- ❌ **No cyberpunk styling or heavy glow effects**
- ❌ **No excessive gradients or glassmorphism**

---

## ✒️ 2. Typography & Hierarchy

POLY uses two complementary Google Fonts to separate brand narrative from technical voice data:

1. **Plus Jakarta Sans** (`font-jakarta`): Primary typography used for section headlines, brand wordmarks, navigation items, and call-to-action buttons.
2. **Inter** (`font-inter`): UI/data font used for transcript turns, extracted entity lists, confidence metrics, and audit timestamps.

### Type Scale

| Scale Role | Font Family | Size / Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display Title** | Plus Jakarta Sans | 56px / 1.15 | 800 (Extrabold) | Hero main headline |
| **Section Heading**| Plus Jakarta Sans | 36px / 1.25 | 800 (Extrabold) | Major section titles |
| **Card Title** | Plus Jakarta Sans | 20px / 1.35 | 700 (Bold) | Card & step titles |
| **Body Large** | Plus Jakarta Sans | 18px / 1.6 | 500 (Medium) | Section supporting text |
| **Body Base** | Plus Jakarta Sans | 14px / 1.5 | 400 (Regular) | Paragraphs & descriptors |
| **Data / Code** | Inter | 12px / 1.4 | 600 (Semibold) | Timestamps, confidence scores, chips |

---

## 🧱 3. Component Architecture & UI Specifications

### 3.1 Header Navigation ([Header.tsx](file:///c:/Users/admin/Desktop/poly%20agora/poly/frontend/components/Header.tsx))
- **Sticky positioning**: `sticky top-0 z-50 backdrop-blur-md`
- **Brand Wordmark**: `POLY` in 24px Extrabold Dark Navy (`#263845`) with a 36px Soft Light Blue (`#38607A`) icon container.
- **Navigation Links**: How it works, For callers, For support teams, Safety (`hover:text-[#38607A]`).
- **CTAs**: `Agent Login` (Secondary outline button) and `Start a Call` (Primary Soft Light Blue filled CTA).

### 3.2 Voice Sphere Visualizer ([VoiceSphere.tsx](file:///c:/Users/admin/Desktop/poly%20agora/poly/frontend/components/VoiceSphere.tsx))
- **Central Sphere**: 160px circular gradient sphere (`#38607A` → `#69577E`) with an inner cream core.
- **Concentric Audio Waves**: Dual expanding ring keyframes (`animate-wave-expand` and `animate-wave-expand-delayed`) in `#38607A` and `#69577E`.
- **Soundwave Motion**: 5 animated height bars reacting dynamically to audio levels.
- **Floating Badges**: Context badges positioned around sphere (`Hindi`, `English`, `Hinglish`, `Listening`, `Confirmed`, `Human ready`).

### 3.3 Live Conversation Preview
- **Speaker Bubbles**:
  - *Caller Turn*: Left-aligned light grey surface (`#BFC9D0`/20) with Muted Lavender label.
  - *POLY Turn*: Right-aligned Soft Light Blue surface (`#38607A`/15) with Dark Navy text.
- **Status Chip**: Green verification badge (`✓ Reference number confirmed`) transitioning to Dusty Rose handoff indicator.

### 3.4 Intelligence & Confidence Panel
- **Decision States**:
  - `CONTINUE`: High confidence, normal conversation progression.
  - `CLARIFY`: Missing required fields; ask ONE focused question.
  - `CONFIRM`: Critical detail extracted; verify with caller.
  - `ESCALATE`: Confidence score low or conflict detected; trigger human handoff.
- **Extraction Matrix**: 3-column data grid showing key, value, and verification state (`✓ Confirmed` vs `? Needs confirm`).

### 3.5 Human Handoff Bridge
- **Visual Flow**: 3-column layout (Caller → Context Bridge → Support Specialist).
- **Context Package**: Conflicting inputs, escalation reasons, confirmed details, and active language mode highlighted in Muted Dusty Rose (`#7E4F50`).

### 3.6 Support Specialist Operations Dashboard
- **Header Bar**: Dark Navy (`#263845`) bar with live escalation status and priority tag.
- **Case Summary**: Auto-generated text summary explaining caller issue and conflict reason.
- **Action Button**: `[ Accept Handoff ]` CTA leading directly to real-time WebRTC channel join.

### 3.7 Audit Timeline
- **Sequential Events**: Vertical timeline line in `#38607A`/30 with status dots for `CALL_STARTED`, `LANGUAGE_CHANGED`, `INFORMATION_CONFIRMED`, `ESCALATION_TRIGGERED`, `CASE_CREATED`, `HUMAN_CONNECTED`, and `CASE_RESOLVED`.

---

## 🎬 4. Animation & Motion Guidelines

Animations must be **restrained, calm, and purposeful**.

```css
@keyframes calmPulse {
  0%, 100% { transform: scale(1); opacity: 0.85; }
  50% { transform: scale(1.06); opacity: 1; }
}

@keyframes waveExpand {
  0% { transform: scale(0.95); opacity: 0.7; }
  50% { transform: scale(1.12); opacity: 0.35; }
  100% { transform: scale(1.3); opacity: 0; }
}

@keyframes floatGentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
```

---

## 📱 5. Responsive Design & Accessibility

- **Desktop (1440px)**: 12-column grid layout with generous 96px+ section whitespace padding.
- **Tablet (768px)**: 2-column card layouts with persistent readability.
- **Mobile (375px)**: Collapsible mobile navigation drawer, single-column vertical card stacking, centered voice visualizer.
- **Accessibility (WCAG AA)**: Minimum contrast ratio of 4.5:1 for body text (`#263845` on `#FFF8F5`), focus outlines, screen-reader semantic landmarks (`header`, `nav`, `main`, `section`, `footer`).
