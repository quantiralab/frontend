# QA Changes Plan - quantiralab.com

## Task 1: Remove Unnecessary Em Dashes (—)

Replace em dashes with appropriate punctuation (commas, periods, or remove entirely).

| # | File | Line | Current Text | Replacement |
|---|------|------|-------------|-------------|
| 1 | `index.html` | 9 | `KnoViz AI — Interactive Knowledge Maps` | `KnoViz AI - Interactive Knowledge Maps` |
| 2 | `src/components/About.tsx` | 20 | `Collaboration is not a tier — it is the foundation...` | `Collaboration is not a tier, it is the foundation...` |
| 3 | `src/components/About.tsx` | 354 | `...any idea — and in seconds see a living map...` | `...any idea, and in seconds see a living map...` |
| 4 | `src/components/About.tsx` | 378 | `seeing connections — not reading pages.` | `seeing connections, not reading pages.` |
| 5 | `src/components/Contact.tsx` | 182 | `...want to say hi — we're here...` | `...want to say hi, we're here...` |
| 6 | `src/components/Contact.tsx` | 236 | `every message — personally.` | `every message. Personally.` |
| 7 | `src/components/Testimonials.tsx` | 14 | `Google Maps—but for ideas` | `Google Maps, but for ideas` |
| 8 | `src/components/Testimonials.tsx` | 566 | `of {testimonials.length} — {t.title}` | `of {testimonials.length}: {t.title}` |
| 9 | `src/pages/QuantiraViz.tsx` | 181 | `more than a summary — you need to understand` | `more than a summary, you need to understand` |
| 10 | `src/pages/QuantiraViz.tsx` | 364 | `engineer the process — you just bring` | `engineer the process, you just bring` |

**NOT changed** (intentional fallback values):
- `src/components/Checkout.tsx` lines 279, 541: `Pay ${price ?? "—"}` — em dash used as "price not available" placeholder

---

## Task 2: Social Media Icons & Links

**File: `src/components/Footer.tsx`**

### 2a. Twitter → X Icon
- Remove `Twitter` from lucide-react import
- Add custom `XIcon` SVG component (the modern X logo, replacing the bird icon)
- Update the socials array entry: `{ Icon: XIcon, href: "https://x.com/QuantiraLab", label: "X" }`
- Also fix: remove leading space from Twitter URL `" https://x.com/QuantiraLab"` → `"https://x.com/QuantiraLab"`

### 2b. LinkedIn Link Fix
- Current: `href: "https://linkedin.com"` (broken - goes to generic LinkedIn)
- Update to: `href: "https://www.linkedin.com/company/quantira-ai-lab/"`
- Also fix: remove leading space from YouTube URL `" https://www.youtube.com/@QuantiraLab"` → `"https://www.youtube.com/@QuantiraLab"`

---

## Task 3: Dedicated About Us Page

### 3a. Create About page route and component

**New file: `src/pages/About.tsx`**
- Import Navbar, Footer, and the existing About component
- Wrap with Navbar at top, Footer at bottom
- Add a hero/header section above the About content ("About Us" title with gradient styling)
- The About component already renders `id="about"` section

**Update: `src/App.tsx`**
- Import the new About page
- Add route: `<Route path="/about" element={<AboutPage />} />`
- Place it before the catch-all `*` route

### 3b. Remove sections from landing page

**File: `src/components/About.tsx`**
- Remove the "Our Story" section (lines 317-337: the two-column grid with narrative text and ParallaxImageCard)
- Remove the "Vision & Mission" cards section (lines 339-381: the 5-column grid with Vision, Mission, Belief cards)
- Remove the "Our Journey" zigzag timeline section (lines 383-435: the milestone timeline with DiamondNode, ZigzagRow, etc.)
- Keep the "Integrations" marquee section (lines 440-490): "Works with your entire stack"
- Also remove unused sub-components that only served the removed sections: `ParallaxImageCard`, `DiamondNode`, `ZigzagRow`, `ZigCard`, `Spine`, `NeuralDeco`, and related data (`milestones`, `team`)
- Add a brief intro blurb in the About component replacing the removed sections, with a CTA link to the new `/about` page

### 3c. Update Navbar

**File: `src/components/Navbar.tsx`**
- Update Company nav item href from `"/#about"` to `"/about"`

---

## Task 4: Footer Navigation Fix

**File: `src/components/Footer.tsx`**

### Problem
When on any sub-route (e.g., `/QuantiraViz`), clicking footer links like `/#features` or `/#pricing` uses React Router `<Link to="/#features">` which navigates to `/QuantiraViz/#features` instead of going to home page sections.

### Solution
Replace the `<Link>` + `<a>` rendering logic with a single `<a>` tag that uses `onClick` with `window.location.href` to force a full navigation to `/#section`. This ensures links always navigate to the correct home page sections regardless of the current route.

### Changes to `linkHrefs`
```typescript
const linkHrefs: Record<string, Record<string, string>> = {
  Product: {
    "Features": "/#features",
    "Pricing": "/#pricing",
    "About": "/about",        // ← Changed from "/#about" to new About page
    "Contact": "/#contact",
  },
  Legal: {
    "Privacy": "/privacy",
    "Terms": "/terms",
  },
};
```

### Changes to rendering logic
- Remove `Link` import from `react-router-dom`
- Remove the `isRoute` conditional logic
- Render all footer links as `<a>` tags with `onClick` handler:
  - Fragment links (`/#section`): use `window.location.href = href` to force cross-route navigation
  - Route links (`/about`, `/privacy`, `/terms`): use React Router `navigate(href)` via `useNavigate`

---

## File Change Summary

| File | Action |
|------|--------|
| `index.html` | Edit: replace em dash in OG title |
| `src/components/Footer.tsx` | Edit: replace Twitter→X icon, fix LinkedIn URL, fix spaces in URLs, update About link, fix cross-route navigation |
| `src/components/About.tsx` | Edit: remove 3 sections + unused components, replace with brief intro + CTA |
| `src/components/Contact.tsx` | Edit: replace 2 em dashes |
| `src/components/Testimonials.tsx` | Edit: replace 2 em dashes |
| `src/components/Navbar.tsx` | Edit: update Company href to `/about` |
| `src/pages/QuantiraViz.tsx` | Edit: replace 2 em dashes |
| `src/pages/About.tsx` | **New**: About page wrapping Navbar + About component + Footer |
| `src/App.tsx` | Edit: add `/about` route |
