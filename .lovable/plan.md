## Scroll-Driven Typewriter Effect — Opening Hours Section

Apply a scroll-driven typewriter reveal to the selected heading "Kdy jsme otevřeni" and the time text "9:30 až 18:00" in the `OpeningHours` section.

### Implementation

1. **Reusable `ScrollTypewriter` component**
   - Accept `text: string`, `className?: string`, and `as?: "h2" | "p" | "span"`
   - Split text into individual `<span>` elements per character (preserving spaces)
   - Wrap in a `ref`’d container and use `gsap.ScrollTrigger` (already registered in the file) to animate `opacity` from 0 → 1 per character based on scroll progress through the section
   - Add a blinking cursor (`|`) at the end of the text that disappears once all characters are revealed
   - Cursor color: `rose` design token to match the site palette

2. **Integration in `OpeningHours`**
   - Replace the static `<h2>` with `<ScrollTypewriter as="h2" text="Kdy jsme otevřeni" className="..." />`
   - Replace the static `<p>` containing "9:30 až 18:00" with `<ScrollTypewriter as="p" text="9:30 až 18:00" className="..." />`
   - Preserve existing layout, spacing, and surrounding elements (the card, the rose script days, the border, the footer text)

3. **Scroll behavior**
   - Trigger: section enters viewport
   - Scrub: tied to vertical scroll position while the section is in view
   - Duration: characters reveal progressively so the full text is readable by the time the user scrolls past the section
   - No page scroll blocking — purely decorative, progressive reveal

4. **Styling**
   - Each character span starts at `opacity: 0` and transitions to `opacity: 1`
   - Cursor: `animate-pulse` or CSS blink, color `text-rose`, positioned inline after the last character
   - Ensure `font-display`, sizing, and color classes from the original elements are preserved

### Files changed
- `src/routes/index.tsx` — add `ScrollTypewriter` inline or import from `src/components/ScrollTypewriter.tsx`
- Optionally create `src/components/ScrollTypewriter.tsx` if the component is kept reusable