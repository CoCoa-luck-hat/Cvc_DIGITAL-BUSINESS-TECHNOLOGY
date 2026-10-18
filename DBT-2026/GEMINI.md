# GEMINI.md - IT Department CVC Project Documentation

This document serves as the primary technical context, architectural reference, and development guide for the **Information Technology Department (CVC)** web platform.

---

## 1. Project Overview & Tech Stack

* **Platform**: PHP / Responsive Web Application
* **Core Technologies**: PHP, HTML5, Vanilla JavaScript (ES6+)
* **Styling**: Vanilla CSS (`test.css`) + Pre-built Tailwind CSS fallback
* **Animation & Physics Engine**: GSAP (GreenSock) + `ScrollTrigger` plugin + Lenis Smooth Scroll (`window.lenis`)
* **Icons**: FontAwesome 5 / 6 + Bootstrap Icons
* **Primary Typography**: **Prompt** (`font-family: 'Prompt', sans-serif !important;`)
* **Color Palette**:
  * **Primary Accent**: Crimson Red (`#dc2626` / `#b71616`)
  * **Secondary Accent**: Tech Gold (`#d97706`) / Cyber Blue (`#2563eb`)
  * **Dark Theme Neutrals**: Dark Navy Charcoal (`#0a0c10` / `#111827`)
  * **Light Theme Neutrals**: Pure White (`#ffffff`), Light Gray (`#f8f9fa`)

---

## 2. Directory & Component Architecture

### Root Page Structure (`index.php`)
* [`index.php`](file:///c:/xampp/htdocs/it_2025_3/index.php): Master homepage assembling all section components:
  * [`n_topbar.php`](file:///c:/xampp/htdocs/it_2025_3/n_topbar.php): Announcement topbar with contact links.
  * [`n_navbar.php`](file:///c:/xampp/htdocs/it_2025_3/n_navbar.php): Floating capsule navbar with animated dropdowns, logo magnetic depth, and animated underline draw.
  * [`carousel.php`](file:///c:/xampp/htdocs/it_2025_3/carousel.php): Main banner hero section.
  * [`content_ribbons.php`](file:///c:/xampp/htdocs/it_2025_3/content_ribbons.php): Modern angled promotional ribbons in Prompt ExtraBold font.
  * [`content_1.php`](file:///c:/xampp/htdocs/it_2025_3/content_1.php): Curriculum majors section (`#majorsSection`) featuring 3D GSAP ScrollTrigger card deck stacking.
  * [`content_steps.php`](file:///c:/xampp/htdocs/it_2025_3/content_steps.php): Department highlights and enrollment process cards.
  * [`content_jop.php`](file:///c:/xampp/htdocs/it_2025_3/content_jop.php): Career path comparison section (`#careers-reveal-section`) with scroll-driven wipe reveal.
  * [`content_2.php`](file:///c:/xampp/htdocs/it_2025_3/content_2.php): Horizontal pinned scroll panorama gallery.
  * [`footer.php`](file:///c:/xampp/htdocs/it_2025_3/footer.php): Global footer with a 4s rotating red aura brand logo and back-to-top button.

### Key Asset Directories
* `include/css/test.css`: Primary custom design system stylesheet containing token rules, utility classes, typography overrides, and responsive layout definitions.
* `include/js/awwwards.js`: Core GSAP ScrollTrigger physics engine managing card deck stacking, pinned scroll containers, entrance animations, and wipe reveals.
* `include/js/main.js`: Helper script managing owl carousels, counters, and scroll event listeners.

---

## 3. Interactive Features & Custom Utilities

### A. 3D Card Deck Pinned Stacking (`#majorsSection`)
* **Behavior**: Cards pin cleanly at the top of the viewport with a ~160vh–200vh pause phase (`mb-[160vh] md:mb-[200vh]`).
* **Physics**: Entrance animation scales and fades next cards in (`opacity: 0 -> 1`, `y: 60 -> 0`) as they reach top pin offset, keeping subsequent cards 100% offscreen until the current card is finished reading.

### B. Floating Capsule Navbar Dropdown
* **Transitions**: Smooth enter/exit slide-down fade animation (`.nav-dropdown-menu`).
* **Overflow Clipping**: `.nav-dropdown-menu` enforces `overflow: hidden !important; border-radius: 16px;` to clip child item hover background highlights (`#fef2f2`) neatly within rounded corners.
* **Chevron Rotation**: `.fa-chevron-down` rotates 180° on dropdown hover.

### C. Liquid Fill Buttons & Arrow Bounce (`.btn-liquid`)
* **Liquid Slide**: Background fill slides smoothly from left to right on hover using `::before` pseudo-element.
* **Arrow Spring Bounce**: Icon (`.fa-arrow-right`) moves `+6px` to the right with spring cubic-bezier timing.

### D. Animated Text Underline Draw (`.link-draw-underline`)
* **Effect**: Text links draw a sleek red underline (`#dc2626`) expanding from `scaleX(0)` to `scaleX(1)` on hover.

### E. Footer Rotating Red Aura Logo (`.footer-rotating-aura`)
* **Aura Ring**: Conic gradient ring rotating around the footer brand logo at a 4-second pace (`animation: rotateFooterAura 4s linear infinite`).
* **Hover Pulse**: Expands (`scale(1.15)`) and brightens (`blur(14px)`, `opacity: 0.85`) when hovering over the brand logo.

---

## 4. Development Rules & Guidelines

1. **Typography Standard**: All titles, headings, and card body text MUST use **Prompt** (`font-family: 'Prompt', sans-serif !important;`). Avoid mixing handwriting or monospace fonts across information cards.
2. **GSAP Pinning & Parent Transforms**:
   * Never apply GSAP `xPercent: -50, yPercent: -50` on elements centered via CSS `transform: translate(-50%, -50%)`.
   * Never apply `scale`, `transform`, or dynamic `clipPath` to parent containers containing nested GSAP `ScrollTrigger` pinned elements (`pin: true`).
3. **Dropdown Container Clipping**: Dropdown menu containers with rounded corners (`border-radius: 16px`) MUST specify `overflow: hidden !important;` to prevent hover highlights from overflowing boundaries.
4. **Third-Party Callbacks**: Always guard Lenis smooth scrolling or third-party listeners with `typeof window.lenis?.scrollTo === 'function'`.
5. **Mobile Dynamic Vertical Centering**: Dynamically compute card pin offsets on mobile viewports using `topOffset = Math.max(85, Math.round((vh - cardH) / 2))` to ensure cards sit in the exact vertical center of mobile screens.
6. **GSAP Opacity Warp Prevention**: Set explicit initial states (`gsap.set(card, { opacity: index === 0 ? 1 : 0 })`) upfront for all stacked card elements, and use frame-accurate `scrub: true` to prevent 1-frame opacity flickers or dark translucent overlay bugs during scroll transitions.
7. **Mobile Section Collision Protection (< 1024px)**: Always override desktop negative section margins (e.g., `margin-top: -160px`) and SVG wave offsets on mobile screens (`@media (max-width: 1023px) { margin-top: 0 !important; top: -35px !important; }`) to prevent crimson top section borders from overlapping or cutting off text in preceding content sections.
8. **Global Function Scope Isolation (F5 Refresh Protection)**: Never declare top-level global functions using generic names (e.g. `function initMwgHeroSection()`) inside shared footer scripts (`awwwards.js`). On F5/direct page loads, subpage templates run before footer JS, so generic function declarations in footer JS will overwrite `window.initMwgHeroSection` defined by subpages. Always scope function names uniquely (e.g. `initPvcMwgHeroSection()`).
9. **GSAP Safe Horizontal Centering (`margin: 0 auto`)**: For absolute-positioned elements centered horizontally that are animated vertically via GSAP `y` transforms (`gsap.to(el, { y: ... })`), ALWAYS center them using `left: 0; right: 0; margin: 0 auto;` in CSS. Never use `left: 50%; transform: translateX(-50%);` because GSAP's inline `translateY` transform will overwrite CSS `translateX(-50%)`, pulling the element off-center.
10. **Tailwind CSS Utility Class Isolation**: Avoid generic class names like `.container` or `.content` inside custom subpage component wrappers. Pre-compiled Tailwind CSS applies global `@media` rules to `.container` (e.g. `max-width: 1024px`), breaking custom subpage layout bounds. Use scoped names like `.hero-deck-container` and `.hero-deck-content`.
11. **GSAP ScrollTrigger Multi-Stage Directional State & Reverse Transition**:
    * In multi-stage ScrollTrigger setups (e.g. Stage 1 radial fan -> Stage 2 4-column un-fan), time-based drop-in entrance tweens (`elastic.out`, duration-based) MUST be restricted to forward scroll only (`self.direction > 0`). When scrolling backwards (`self.direction < 0`), smoothly transition cards to target coordinates without replaying entrance drop bounces.
    * Crossing stage boundaries in reverse (e.g. from Stage 2 back to Stage 1 at `prog < 0.74`) requires a state transition flag (`wasInStage2`) to force immediate re-computation of fan coordinates, preventing elements from locking in previous stage offset positions.
    * Exiting elements on reverse scroll should use fast sync fades (`duration: 0.15s`) with immediate display class cleanup (`c.classList.remove('on')`).
12. **Desktop Multi-Column Card Scale & Viewport Clamping**:
    * For horizontal multi-column spread rows (e.g. 4 cards across viewport), desktop card width should standardize to `340px - 350px` with dynamic spread spacing clamped to `Math.min(cardWidth + gap, (window.innerWidth - 60) / 4)` to fit all standard laptop/desktop resolutions (1366px to 1920px+) without horizontal clipping or wrapping.
13. **Visual-First Luxury Gallery & Zero Text Clutter Rule**:
    * For photo galleries, facility showcases, and architectural spaces, avoid heavy blog cards with long text paragraphs and cluttered info boxes.
    * Adopt **Visual-First Masonry Architecture / Editorial Journal** layouts where high-resolution imagery takes center stage. Display metadata (room code, building, caption) cleanly via **Hover Reveal / Translucent Glass Scrims** or in a **Cinematic Ultra-Minimal Lightbox**.
14. **Mobile Modal/Detail Floating Controls Initial State Guard**:
    * Any floating control or back button intended strictly for detail/modal view modes (e.g. `.fp-btn-back-floating`) MUST default to `display: none;` in general CSS.
    * Only apply `display: inline-flex !important;` within active state parent selectors (e.g. `#faculty-fullscreen-stage.bio-mode-mobile .fp-btn-back-floating`). Never put unconditional `display: inline-flex !important;` inside base `@media (max-width: 1023px)` styles.
15. **Mobile Reverse Transition Choreography (Fade-Out -> Smooth Scroll -> Fade-In)**:
    * When exiting an expanded/detail mode on mobile, avoid instantaneous state switches (`classList.remove`) while the viewport is scrolled down.
    * Follow the 4-step sequence: (1) Fade out detail panels (`opacity: 1 -> 0, y: 18px`), (2) Smoothly scroll back to top of container using `window.lenis?.scrollTo()` or `window.scrollTo({ behavior: 'smooth' })`, (3) Remove mobile detail class and set showcase elements to `opacity: 0, y: 18px`, (4) Smoothly fade in showcase elements (`opacity: 0 -> 1, y: 0`) with `power2.out` timing.
16. **Desktop Cleanup for Mobile Indicator Elements**:
    * Elements designed specifically for mobile touch feedback (e.g. edge fade gradient masks, swipe chevrons, touch scroll indicators) must define explicit `display: none !important;` outside of `@media` blocks, and only enable (`display: flex !important;`) inside `@media (max-width: 1023px)`.

