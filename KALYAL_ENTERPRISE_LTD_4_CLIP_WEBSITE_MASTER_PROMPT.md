# KALYAL ENTERPRISE LTD — FOUR-CLIP CINEMATIC WEBSITE MASTER PROMPT

**Version:** 1.1 — Full-viewport first hero + three zigzag sections  
**Project:** KALYAL ENTERPRISE LTD  
**Business:** Freight transport by road (United Kingdom)  
**Email:** Kalyalenterprise@gmail.com  
**Telephone:** +44 7746 645195  
**Primary objective:** Premium corporate road-freight website that converts freight enquiries and supports recruitment.  
**Status:** Implementation specification; final media assets and company approvals pending.

## 1. YOUR ROLE AND DELIVERY CONTRACT

Act as a senior full-stack developer, creative director, performance engineer, and QA lead. Build a polished, mobile-first, cinematic, scroll-driven corporate website for KALYAL ENTERPRISE LTD. This is **not** an e-commerce store; its primary conversion actions are freight quotation enquiries, contacting the business, and applying for the advertised role.

**Mandatory workflow:**
1. Perform a read-only audit of the existing repository, if one exists. Identify framework, routes, components, styling, animation approach, media inventory, image sequences, content, forms, and build scripts.
2. Inspect the actual user-supplied media files once available. Do not assume the original 15-second generated videos are the final assets.
3. Present a concise audit, asset mapping, missing inputs, and phased implementation plan. **Do not modify code until the owner approves the plan.**
4. After approval, implement with minimal disruption to existing working functionality.
5. Verify the build, responsive behavior, performance, accessibility, and every CTA. Report evidence, remaining gaps, and any unverified assumptions.

Never fabricate company facts, fleet size, routes, accreditations, customer testimonials, delivery guarantees, office address, regulatory licences, or job terms.

## 2. THE FOUR FINAL EDITED CLIPS — SOURCE OF TRUTH

The owner has personally edited the footage to remove undesirable or defective moments. **Exactly four edited clips are the intended inputs**, and their durations may be shorter than the original 15-second generations. Preserve the edits. Do not reintroduce discarded footage or infer missing shots.

| ID | Asset role | Approved story | Suggested section | CTA |
|---|---|---|---|---|
| CLIP_01 | Container loading and dispatch | Crane places a KALYAL-branded container on the carrier; truck prepares and departs, to the extent shown in the supplied edit | **Full-viewport homepage hero** | Request a Freight Quote |
| CLIP_02 | UK road journey | Same branded truck carrying shipment along scenic green UK roads / motorway | Road Freight Transportation | Explore Our Services |
| CLIP_03 | Warehouse unloading | Shipment arrives at the delivery warehouse and is unloaded, to the extent shown in the supplied edit | Delivery & Unloading | Discuss Your Shipment |
| CLIP_04 | Careers / recruitment | Corporate business development / office / client relationship imagery | Careers | View Vacancy / Apply Now |

**Critical:** Clip 02 and Clip 03 were created by splitting and trimming the earlier road-transport/delivery video. They are now separate, independent scroll-controlled website sections. The original 3-video storyboard must **not** be used as a reason to merge them back together.

### Media intake and inspection

When the user supplies the files, create a media manifest containing:
- Actual filename and path for each of the four clips
- Duration, dimensions, codec, frame rate, and orientation
- Actual first and last frames
- Branding and visual continuity observations
- Any visible artifacts, unsafe cuts, text/logo corruption, or incomplete actions
- Recommended frame extraction sampling rate and estimated frame counts
- Whether a clip needs owner approval before publication

Never claim to have inspected media that has not been supplied. Do not silently trim further or regenerate approved footage. If the user has already removed defective portions, respect their editorial decisions. Flag remaining problems for approval rather than changing them automatically.

## 3. BRAND IDENTITY AND CONTINUITY

Use **the exact logo asset ultimately approved and supplied by the owner**, not a logo inferred from previous generated concepts. Previous discussions explored multiple colour palettes; **the final approved asset takes precedence**. Do not mix KALYAL identity with MARVIS MULTILINE LTD or another company.

Keep consistent branding across the header, truck, container, warehouse signage, careers imagery, buttons, and typography wherever those assets exist. Do not repaint or recreate logo artwork in code or AI unless explicitly approved. If an image already contains baked-in signage, preserve it. Do not make unsupported claims about the company's actual fleet or facilities based solely on AI-generated visuals.

**Logo placement rule:** Show the approved logo in the top-left header. Do **not** add a second duplicate logo beside the hero heading. Logos naturally appearing on trucks, containers, or facility signage are acceptable.

Visual direction: premium UK logistics, confident and modern, readable layouts, high contrast, controlled motion, consistent spacing. Base the precise palette on the final supplied brand asset rather than assuming navy/gold or green/brown is approved.

## 4. SITE MAP AND CONTENT ARCHITECTURE

Required pages / sections:

- **Home:** cinematic four-section story, clear value proposition, enquiry CTAs, trust-oriented factual content, and careers invitation.
- **Road Freight Services:** explain freight collection, road transportation, delivery/unloading; distinguish demonstrated visual concepts from verified services.
- **About Us:** accurate company introduction, business nature, and approved factual details; no invented history or metrics.
- **Request a Quote:** structured freight enquiry form with validation and a real submission destination.
- **Careers:** Business Development Manager vacancy and application method.
- **Contact:** company email, phone, WhatsApp contact if confirmed, and functional contact form.
- **Privacy Policy / Cookie information:** implement appropriately for actual data collection and tracking; obtain legal/business approval before publication.

Do not add a product catalogue, cart, checkout, or unrelated business categories. Do not create fictional reviews, partner logos, or customer logos.

## 5. HOME PAGE — ONE FULL-VIEWPORT CINEMATIC HERO + THREE ZIGZAG SECTIONS

**FINAL APPROVED LAYOUT: Clip 01 occupies the full-screen opening hero; Clips 02, 03, and 04 form three alternating zigzag sections below it.** This replaces the earlier all-four-zigzag proposal. Do not make Clip 01 a side-by-side card.

### Section 01 — FULL-SCREEN HERO: Loading & Dispatch (CLIP_01)

- Make the **first edited clip** the dominant, full-viewport-width and approximately full-viewport-height opening hero on desktop (`min-height: 100svh` or a robust dynamic-viewport equivalent, adjusted for the actual header). The cinematic frame sequence should fill the hero stage visually, with the warehouse crane, branded container, and truck presented prominently.
- This is a **scroll-driven image sequence**, not a playable video, looping GIF, or autoplay background. No play button. The first frame is visible immediately; subsequent frames scrub as the user scrolls.
- Keep the approved KALYAL logo in the top-left header **only**; do not duplicate it in the hero heading. Logos embedded naturally in the actual approved truck/container footage are allowed.
- Overlay real accessible HTML text and CTAs, not text burned into frames. Suggested headline: **“Reliable Road Freight, From Collection to Delivery.”** Supporting line should remain factual. Primary CTA: **“Request a Freight Quote.”** Secondary CTA: **“Explore Our Services.”** Do not cover the critical crane/container/truck action with overlays; place text in available negative space or on a restrained contrast gradient.
- The full hero must be a **proper scroll-scrub stage**: the hero arrives as the opening screen, remains visually pinned within the **header-safe viewport** while its full edited frame sequence scrubs, then releases to Section 02. The first clip's animation should not require the user to scroll past the hero before it starts. Scrubbing backwards must reverse the frames.
- **Desktop:** edge-to-edge cinematic presentation with a carefully chosen `cover` crop only if the important crane, container, and truck remain fully intelligible throughout; use safe composition-aware framing rather than blindly centring the crop.
- **Mobile:** use a full-height hero *section*, but do **not** blindly apply `object-fit: cover` to the landscape footage if it cuts off the crane, container, or truck. Prefer a proportionally contained cinematic visual inside a full-height branded stage, subtle matching background/letterboxing, or a separately approved responsive framing. Preserve the important full scene. Keep hero copy and CTA legible and accessible above/below the visual as appropriate. The visual must never hide beneath the sticky header or browser chrome.
- Account for mobile dynamic viewport changes, safe-area insets, the real header height, accessible touch targets, and an elegant no-motion fallback.
- Use the actual **edited** Clip 01 duration/frame count, not an assumed 15-second length. Do not regenerate removed scenes.

### Section 02 — ROAD FREIGHT JOURNEY (CLIP_02)

- **Text left, cinematic visual right** on desktop.
- Headline concept: **“Freight Moving Across the Road Network.”**
- CTA: **“Explore Our Services.”**
- Highlight the approved UK green countryside road journey and the consistent KALYAL-branded truck.
- Use the safe-area **center-pinned scroll-scrubbing** behavior defined in Section 6.

### Section 03 — DELIVERY & UNLOADING (CLIP_03)

- **Cinematic visual left, text right** on desktop.
- Headline concept: **“From Arrival to Handover.”**
- CTA: **“Discuss Your Shipment.”**
- Use the owner's independent trimmed unloading clip, without merging it back into Clip 02.
- Use the safe-area **center-pinned scroll-scrubbing** behavior defined in Section 6.

### Section 04 — CAREERS & RECRUITMENT (CLIP_04)

- **Text left, cinematic visual right** on desktop.
- Headline concept: **“Build Your Career With KALYAL.”**
- CTA: **“View Business Development Manager Vacancy.”**
- Show job title and approved salary as accessible HTML content, not generated text in video frames.
- Use the safe-area **center-pinned scroll-scrubbing** behavior defined in Section 6.

**Responsive rule:** On mobile, stack each zigzag section in a deliberate readable order; do not force tiny side-by-side visuals. The first hero remains a full-height premium experience while preserving the important landscape scene. Maintain generous whitespace, restrained transitions, real HTML headings and CTAs, and no duplicate hero logo. This is **one full-screen hero plus three zigzag cinematic sections**, not four zigzag sections and not four autoplay video players.

## 6. NON-NEGOTIABLE: CENTER-PINNED SCROLL-SCRUBBING

**This is a first-class requirement from the initial implementation, not a later patch.**

The user must experience:

**Normal page scroll → cinematic visual reaches viewport centre or slightly above → visual remains pinned and fully visible → scrolling advances every frame → pin releases only after the final frame → next section enters.**

### Critical behavior

- **Never** allow the sequence to travel all the way to the top and become hidden behind the sticky header before frame playback begins.
- Determine the **actual sticky-header height** dynamically.
- Define a safe viewport from below the header to above the bottom safe-area inset. Pin the image-sequence visual at the centre of this safe viewport, or a little above centre.
- Maintain the entire important cinematic composition within the visible area; avoid cropping the truck, container, unloading action, or faces.
- Use `object-fit: contain` where necessary for mobile to avoid clipping important visual information; style surrounding space elegantly.
- While pinned, scroll progress must control the frames, not wall-clock time. **No play button, autoplay video, GIF substitute, or automatic timed playback.**
- Advance and reverse frames correctly with mouse wheel, trackpad, Android/iOS finger swipe, and reverse scrolling.
- The scroll distance for each clip should scale to its **actual edited frame count / duration**, not assume 15 seconds.
- Do not trap scrolling or require a fixed number of gestures; ensure native scrolling remains accessible.
- Pin and unpin without jumps, header overlap, layout shifts, horizontal overflow, or nested-pin conflicts.

### Suggested engineering

Use the project's existing animation stack when possible. GSAP ScrollTrigger is an option, not a mandatory replacement. If using it, implement a measured sticky-header-aware pin stage with `pin`, `scrub`, `invalidateOnRefresh`, appropriate `start` / `end`, responsive refresh, and cleanup. Avoid pinning an oversized section at `top: 0`.

For N extracted frames and scroll progress p in [0,1]:

```ts
const frameIndex = Math.max(0, Math.min(N - 1, Math.round(p * (N - 1))));
```

Use a canvas or optimized image sequence renderer as appropriate. Keep frame ordering stable and handle failed frame loads. Support reduced-motion preference with an accessible static image and normal navigation. Make pinned scrolling robust when mobile browser chrome changes the viewport height.

### Required mobile QA

Test representative viewport widths of 320, 375, 390, 430, 768, and desktop sizes. Confirm that **Clip 01 pins within the header-safe full-height hero from the opening screen**, while **Clips 02–04 pin visibly near the safe viewport centre**; all four sequences must scrub completely in both directions and release cleanly. Verify sticky-header clearance, button accessibility, no sideways overflow, orientation changes, and safe-area spacing.

## 7. FRAME EXTRACTION — ONLY FROM APPROVED EDITS

Once the four edited videos are available:

1. Inspect their actual properties and confirm mapping with the owner.
2. Extract frames separately for each clip, preserving each edit's start/end boundaries.
3. Use a configurable, visually smooth sampling rate based on motion, duration, target devices, and performance budget. **Do not assume a fixed number of frames or a 15-second duration.**
4. Use sequential filenames, for example `clip-01/frame-00001.webp`, and create a machine-readable manifest with each sequence's actual frame count.
5. Preserve high-quality source frames for archival; create optimized WebP/AVIF or suitable fallback variants for web delivery.
6. Preload the first visible frame and a small nearby window; progressively fetch later frames. Avoid downloading every full-resolution frame upfront on mobile.
7. Validate frame ordering, aspect ratios, visible branding, continuity, and image quality.
8. Do not use interpolation that creates fake logo shapes, ghosted trucks, warped pallets, or altered text.
9. Provide a still-image fallback when assets fail to load.

If a clip contains a hard editorial cut, preserve it; do not invent a missing transition. If the cut makes scroll scrubbing confusing, flag it and propose options for approval.

## 8. AUTHENTIC WHATSAPP FLOATING BUTTON — REQUIRED

Include a real **WhatsApp-branded floating button** fixed at the bottom-right on every page, with mobile safe-area offsets, adequate tap target, accessible label, visible focus state, and no obstruction of key CTAs.

**Company phone supplied:** `+44 7746 645195`.

**Important:** This is the company's supplied contact telephone number, but its WhatsApp registration has **not been confirmed**. Do not assume that any phone number automatically has WhatsApp. Use a dedicated configuration variable such as:

```env
PUBLIC_KALYAL_WHATSAPP_NUMBER=
```

When the owner confirms the WhatsApp-enabled number, normalize it to digits-only international format and link to:

```text
https://wa.me/<CONFIRMED_INTERNATIONAL_NUMBER>
```

Optionally prefill: “Hello KALYAL ENTERPRISE LTD, I would like to enquire about road freight services.” Use proper URL encoding. Until confirmed, show a clearly marked setup placeholder in development; do not publish a broken or guessed WhatsApp destination. Do not use MARVIS contact details.

Use an authentic WhatsApp SVG/icon from a reputable icon package or official brand asset, not a generic speech bubble. Open external chat securely with `rel="noopener noreferrer"` where applicable.

## 9. FREIGHT QUOTATION AND CONTACT CONVERSION

Provide prominent and functional `Request a Freight Quote` and `Contact Us` CTAs. A quote form may collect:

- Contact name and company
- Email and phone
- Collection location / postcode
- Delivery location / postcode
- Shipment type and approximate load details
- Preferred collection date
- Additional requirements / notes
- Privacy consent where appropriate

Do not invent pricing, booking availability, or delivery promises. Validate form inputs, protect against spam, and connect submissions to a **verified destination or backend**. Do not claim an email was sent when no sending integration exists. If no backend is available, offer a clearly labelled `mailto:` fallback and mark the form as not production-ready.

Show contact details exactly:

- Email: **Kalyalenterprise@gmail.com**
- Phone: **+44 7746 645195**

## 10. CAREERS — BUSINESS DEVELOPMENT MANAGER

Create a dedicated careers page and job detail section connected to the fourth cinematic clip.

**Role:** Business Development Manager  
**Company:** KALYAL ENTERPRISE LTD  
**Sector:** Road freight transport  
**Salary range supplied:** **£52,500–£57,500**

**Confirm before publishing:** whether salary is **per annum**, job location, onsite/hybrid/remote status, employment type, hours, benefits, eligibility requirements, application deadline, and vacancy status. Do not invent these details. The UI may label salary as “£52,500–£57,500 (period to be confirmed)” until the owner approves the annual basis.

Suggested responsibilities, subject to owner approval:

- Identify and develop B2B road-freight business opportunities.
- Build and maintain commercial client relationships.
- Prepare proposals and support freight contract discussions.
- Coordinate with operations to understand customer requirements.
- Track pipeline, sales activity, and account growth.

Provide a clearly visible `Apply Now` CTA. Until a verified recruitment system or HR inbox is configured, use the supplied company email with a prefilled subject such as `Application — Business Development Manager`, and avoid pretending there is a functional upload backend. If an application form is implemented, securely handle CV files, privacy notices, storage, retention, and submission confirmation.

Use real HTML text for the job title, salary, and Apply button, not generated lettering inside video frames. Preserve the approved fourth clip without adding fake text to the media.

## 11. NAVIGATION AND RESPONSIVE UI

Header: approved logo at top-left; clear navigation to Home, Services, About, Careers, Contact, and Quote. The header may be sticky, but its height must be measured and respected by pinned sequences. No second logo beside hero headings.

Mobile: responsive menu, large touch targets, accessible text sizes, clean stacked zigzag sections, readable CTAs, no clipped cinematic visuals, and floating WhatsApp positioned above system safe areas. Maintain a consistent brand palette derived from the final approved KALYAL logo.

Footer: verified company identity and contact details, navigation, careers link, privacy links, and copyright. Do not invent registered office address or company registration number.

## 12. SEO, ACCESSIBILITY, AND PERFORMANCE

- Semantic HTML, descriptive page titles, metadata, canonical URLs once domain is known, and logical heading hierarchy.
- Relevant, accurate Road Freight and Business Development Manager copy without keyword stuffing.
- Structured data only for verified company details; JobPosting structured data only when the vacancy details and publication status are confirmed.
- Image alt text, keyboard accessibility, focus states, adequate contrast, and reduced-motion support.
- Avoid unnecessary animation libraries and heavyweight media on initial load.
- Progressive frame loading, optimized formats, caching, and sensible mobile quality tiers.
- Avoid layout shifts, scrolling jank, broken frame sequences, and unresponsive controls.
- Respect actual consent and privacy obligations for analytics, cookies, enquiry forms, and recruitment data.

## 13. ASSET FOLDER STRUCTURE — SUGGESTED

```text
public/
  brand/
    kalyal-approved-logo.*
  media/
    source-edits/
      clip-01-loading.*
      clip-02-road-journey.*
      clip-03-unloading.*
      clip-04-careers.*
    sequences/
      clip-01/
      clip-02/
      clip-03/
      clip-04/
    posters/
      clip-01.webp
      clip-02.webp
      clip-03.webp
      clip-04.webp
  manifests/
    cinematic-sequences.json
```

The names are examples only. **Do not assume the owner has already supplied these exact filenames.** Adapt to the actual files and preserve originals.

## 14. QUALITY ASSURANCE — PASS/FAIL CHECKLIST

- [ ] Four edited clips mapped correctly; none accidentally replaced with an original unedited video.
- [ ] Clip 02 is the scenic greenery road journey; Clip 03 is the separate unloading edit.
- [ ] Approved KALYAL branding and truck continuity respected across available footage.
- [ ] Top-left header logo retained; no duplicate hero-heading logo.
- [ ] Four distinct cinematic homepage sections in the correct order: **one full-viewport Clip 01 hero plus three zigzag sections**.
- [ ] Clip 01 is edge-to-edge/full-viewport on desktop, scroll-scrubbed from the opening screen; mobile full-height hero retains the important crane/container/truck composition without destructive cropping.
- [ ] Clips 02–04 zigzag as **visual right / visual left / visual right** on desktop; clean mobile stack.
- [ ] All four image sequences scrub via scrolling, not autoplay or play buttons.
- [ ] Hero sequence pins within the header-safe hero stage; the three lower sequences pin around the safe viewport centre **before** reaching the top/header.
- [ ] Entire important scene remains visible while frames advance.
- [ ] Every edited frame can be reached; reverse scroll works.
- [ ] Pin releases cleanly after the last frame; no trapped scrolling.
- [ ] Android/iPhone touch scrolling works; no horizontal overflow.
- [ ] Floating authentic WhatsApp icon at bottom-right; number confirmed before live link.
- [ ] Freight quote and contact CTAs lead to working or transparently labelled destinations.
- [ ] Careers page shows Business Development Manager and £52,500–£57,500 accurately, with unconfirmed terms flagged.
- [ ] All contact details are KALYAL's, not MARVIS's.
- [ ] Responsive design, reduced motion, keyboard access, and performance tested.
- [ ] Production build succeeds; no console errors or broken media paths.

## 15. DELIVERY FORMAT AND APPROVAL GATES

**Phase A — Read-only audit:** Repository findings, four-asset manifest, detected issues, missing business inputs, and proposed implementation. Stop for approval.

**Phase B — Asset processing:** Extract and optimize sequences from the owner's edited clips only. Show representative first/middle/last frames and actual frame counts for approval.

**Phase C — Website build:** Implement the full-viewport scroll-scrubbed Clip 01 hero, three center-pinned zigzag cinematic sections (Clips 02–04), company pages, quote/contact flows, careers page, and configurable WhatsApp button.

**Phase D — QA:** Test on desktop and mobile, including real touch-scroll behavior, pinning, performance, accessibility, and form destinations.

**Phase E — Handover:** Provide changed-file list, run/build instructions, content configuration locations, confirmed versus pending inputs, and test results.

**Final non-negotiables:** Do not modify unrelated projects. Do not invent missing assets or contact details. Do not assume all clips are 15 seconds. Do not reintroduce scenes the owner removed. Do not begin implementation before audit approval. Prioritize cinematic clarity, stable branding, truthful company information, mobile usability, and reliable conversion paths.
