# NutriGo — Design.md

## Project Overview

NutriGo is a modern health-focused web application that combines personalized nutrition planning, healthy meal discovery, and meal delivery management into a single digital platform.

The platform should communicate:
- Health
- Simplicity
- Trust
- Personalization
- Energy
- Modern lifestyle convenience

The design language must feel:
- Clean and modern
- Minimal but warm
- Technology-driven but human-centered
- Calm and wellness-oriented
- Premium without looking corporate

Avoid:
- Overly clinical medical aesthetics
- Heavy gradients everywhere
- Excessive animations
- Dark oppressive layouts
- Generic food delivery app appearance

---

# Brand Identity

## Brand Personality

NutriGo should visually represent:
- Healthy living
- Smart nutrition
- Everyday convenience
- Sustainability
- Personal growth
- Balance

The interface should feel motivating and lightweight.

---

# Color Palette

Use ONLY the following primary palette as the foundation.

## Primary Colors

| Purpose | Color | Hex |
|---|---|---|
| Primary Green | Soft Natural Green | #93C48B |
| Secondary Green | Lime Wellness | #B6D369 |
| Accent Lime | Bright Nutrition Accent | #D0E562 |
| Deep Teal | Structural UI Color | #466365 |
| Dark Wine | Premium Contrast Color | #53131E |

---

## Color Usage Rules

### #93C48B
Use for:
- Primary buttons
- Active states
- Key highlights
- Navigation indicators
- CTA sections

### #B6D369
Use for:
- Secondary buttons
- Card highlights
- Hover accents
- Wellness badges

### #D0E562
Use sparingly for:
- Notifications
- Success indicators
- Small UI emphasis
- Micro interactions

### #466365
Use for:
- Headers
- Footer
- Text emphasis
- Structural layouts
- Icons

### #53131E
Use carefully for:
- Premium accents
- Important warnings
- Pricing emphasis
- Dark contrast elements

---

# Typography

## Primary Font

### Poppins
Use as the main UI font.

Reasons:
- Modern
- Highly readable
- Friendly geometric appearance
- Excellent for dashboards and mobile responsiveness

Use for:
- Body text
- Buttons
- Navigation
- Forms
- Dashboard interfaces

---

## Secondary Font

### Coolvetica
Use ONLY for:
- Hero headings
- Large marketing headlines
- Landing page statements
- Brand moments

Avoid using Coolvetica for:
- Paragraphs
- Forms
- Long content

---

## Fallback Fonts

font-family:
- Poppins
- Lato
- Sans-serif

---

# Visual Direction

## Design Style

The design should follow:
- Modern SaaS aesthetics
- Minimal wellness UI
- Clean spacing
- Rounded corners
- Soft shadows
- Layered card interfaces
- Airy layouts

Use:
- Large whitespace
- Strong hierarchy
- Simple iconography
- Clean illustrations
- Minimal borders

Avoid:
- Cluttered dashboards
- Dense text blocks
- Harsh contrast
- Heavy neumorphism
- Outdated gradients

---

# Layout Guidelines

## Grid System

Use:
- 12-column responsive grid
- Max width: 1440px
- Content width: 1200px
- Consistent spacing scale

Spacing system:
- 4px base scale
- 8px
- 12px
- 16px
- 24px
- 32px
- 48px
- 64px

---

# Border Radius

| Element | Radius |
|---|---|
| Buttons | 12px |
| Cards | 20px |
| Inputs | 14px |
| Modals | 24px |
| Floating panels | 28px |

---

# Shadows

Use soft layered shadows.

Example:
- rgba(0,0,0,0.06)
- rgba(0,0,0,0.08)

Avoid harsh black shadows.

---

# Application Structure

## Main Pages

### 1. Landing Page
Purpose:
- Introduce NutriGo
- Communicate healthy lifestyle value proposition
- Drive user onboarding

Sections:
- Hero section
- Personalized nutrition explanation
- Meal showcase
- Features grid
- Testimonials
- Subscription plans
- CTA footer

Hero should contain:
- Strong headline
- Personalized nutrition messaging
- Healthy food visuals
- Clear CTA buttons

---

### 2. Authentication Pages
Pages:
- Login
- Register
- Forgot Password

Design Requirements:
- Minimal
- Clean split layout
- Soft illustrations
- Easy mobile experience

---

### 3. User Dashboard
Purpose:
- Personalized nutrition management

Dashboard Components:
- Daily nutrition summary
- Calories tracker
- Recommended meals
- Subscription status
- Meal delivery tracking
- Water intake widget
- Goal progress cards

Design Style:
- Modular cards
- Clean analytics
- Minimal charts
- Wellness-focused UI

---

### 4. Meal Discovery Page
Features:
- Meal cards
- Filters
- Search
- Nutrition labels
- Category tags
- Add to cart

Meal cards should include:
- High quality food images
- Calories
- Protein/carbs/fat summary
- Delivery estimate
- Dietary tags

---

### 5. Meal Plan Page
Purpose:
- Personalized weekly plans

Features:
- Weekly calendar layout
- Nutrition breakdown
- Goal tracking
- Meal swapping
- Progress indicators

---

### 6. Checkout & Subscription
Requirements:
- Smooth UX
- Minimal friction
- Clear pricing hierarchy
- Mobile-first flow

Include:
- Subscription tiers
- Secure payment UI
- Delivery details
- Summary card

---

# Component Design Rules

## Buttons

### Primary Button
- Background: #93C48B
- Text: white
- Rounded
- Medium weight
- Soft hover animation

### Secondary Button
- Background: transparent
- Border: #466365
- Text: #466365

### CTA Buttons
Should feel:
- Energetic
- Modern
- Clickable
- Spacious

---

## Cards

Cards should:
- Have generous padding
- Use soft shadows
- Maintain clean separation
- Support subtle hover lift

Card styles:
- Glass-light feel
- Soft borders
- Minimal visual noise

---

## Inputs

Input fields should:
- Be large and accessible
- Have rounded edges
- Include subtle focus states
- Use clear labels

Focus state:
- Border color: #93C48B
- Soft glow

---

# Imagery Direction

Use imagery that communicates:
- Healthy meals
- Fresh ingredients
- Active lifestyles
- Young professionals
- Fitness and balance
- Natural wellness

Photography style:
- Bright natural lighting
- Clean compositions
- Realistic food presentation
- Soft neutral backgrounds

Avoid:
- Artificial stock imagery
- Overprocessed food photography
- Dark restaurant-style imagery

---

# Iconography

Use:
- Rounded modern icons
- Minimal line icons
- Consistent stroke widths

Preferred icon style:
- Lucide
- Heroicons
- Phosphor icons

---

# Motion & Interaction

Animations should be:
- Smooth
- Fast
- Subtle
- Functional

Recommended:
- 150ms–300ms transitions
- Soft hover lifts
- Fade-in sections
- Smooth card expansion

Avoid:
- Excessive motion
- Distracting animations
- Long loading effects

---

# Accessibility

Requirements:
- WCAG-friendly contrast
- Responsive typography
- Keyboard navigation support
- Mobile responsiveness
- Clear interactive states

Minimum standards:
- Text contrast ratio compliance
- 44px minimum touch targets
- Responsive layouts across devices

---

# Mobile Responsiveness

The design MUST prioritize:
- Mobile-first experience
- Responsive cards
- Touch-friendly navigation
- Collapsible menus
- Optimized dashboard stacking

Breakpoints:
- Mobile
- Tablet
- Desktop
- Large desktop

---

# Recommended Tech-Compatible Design Stack

Suggested frontend ecosystem:
- React
- Next.js
- TailwindCSS
- Framer Motion
- Shadcn UI

Charts:
- Recharts

Icons:
- Lucide React

---

# UI Tone

The final interface should make users feel:
- Motivated
- Healthy
- In control
- Calm
- Organized
- Supported

The product should visually communicate:
“Healthy eating made simple through smart technology.”

---

# Final Design Principles

1. Simplicity over complexity
2. Clarity over decoration
3. Wellness over corporate aesthetics
4. Functionality over visual excess
5. Consistency across all screens
6. Mobile-first responsiveness
7. Trust-building visual hierarchy
8. Personalization should feel intelligent but lightweight

---

# Deliverables Expected From Stitch

Generate:
- Complete responsive web application UI
- Landing page
- Authentication flow
- Dashboard
- Meal discovery pages
- Subscription flow
- User profile settings
- Nutrition analytics screens
- Mobile responsive variants
- Component library consistency

The generated design should be production-quality, scalable, and modern.

