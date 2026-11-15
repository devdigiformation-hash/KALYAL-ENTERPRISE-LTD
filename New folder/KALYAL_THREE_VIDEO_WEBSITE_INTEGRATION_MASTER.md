# KALYAL ENTERPRISE LTD — FINAL THREE-VIDEO WEBSITE INTEGRATION MASTER

**Status:** Implementation specification for the existing website.  
**Language:** English instructions for the website developer / coding agent.  
**Scope:** Replace old branded video assets with the three newly approved generic freight videos; preserve the rest of the approved website.

## 1. Non-negotiable implementation workflow

**Phase A — READ-ONLY AUDIT FIRST.** Inspect the existing project, pages, video assets, component tree, responsive styles, scroll-scrubbing implementation, careers/apply workflows and management content. Report current asset paths, video durations, placement, issues and a proposed change list. **Do not delete, overwrite or modify anything until the owner approves.** If video files have not yet been provided, report them as missing and request them; never pretend they were inspected.

**Phase B — IMPLEMENT AFTER APPROVAL.** Back up existing configuration/assets, replace the old video references, implement the layout below, run QA and report changes with file paths. Remove old footage from the live site and build output; archive/delete originals only with owner approval. Do not leave broken links or empty media slots.

## 2. Approved video inventory (exactly three videos)

| Slot | Footage | Intended length | Placement |
|---|---|---:|---|
| VIDEO_01 | Single rust-red/orange shipping container loaded onto the initially empty trailer of the same deep-blue semi-truck at a UK logistics yard | 10 seconds | Full-viewport homepage hero |
| VIDEO_02 | The SAME deep-blue truck carrying the SAME single rust-red/orange container on a realistic UK road, travelling toward a delivery destination | 15 seconds source clip | First alternating zigzag section |
| VIDEO_03 | The SAME deep-blue truck parked with its orange container open; forklift removes palletised cardboard cartons and carries them INTO a modest warehouse | 10 seconds | Second alternating zigzag section |

**Important edit decision for VIDEO_02:** An earlier 15-second road-journey prompt included arrival and container unloading. The final website story must NOT repeat or contradict VIDEO_03's carton unloading. Inspect the *actual rendered* VIDEO_02. If it includes an incompatible container-removal sequence, propose a timestamp-accurate trim to retain the road journey / arrival portion, or ask for a revised 15-second road-only render. Do not silently reframe a container already removed as a container later opened for carton unloading. The owner must approve the selected edit. Do not fabricate frame counts or assume exact trim timestamps.

## 3. Mandatory visual consistency

- All three clips must depict one consistent **deep-blue semi-truck**: same cab silhouette, grille, lights, roof, mirrors, wheels and trailer arrangement.
- One consistent **rust-red/orange corrugated shipping container**; never a second container stacked on top.
- VIDEO_01: loading a container onto an initially empty trailer.
- VIDEO_02: road delivery with the container properly secured on the trailer.
- VIDEO_03: cartons are unloaded from the open container into the warehouse by forklift; no management office footage.
- These clips are **illustrative**. No invented KALYAL branding on trucks, containers, workers, uniforms, warehouses or office walls. Do not suggest company ownership of the pictured fleet, premises or people.
- Keep the approved KALYAL logo only in genuine website UI branding, e.g. header/footer; do not stamp it into the footage.

## 4. Homepage layout

### HERO — VIDEO_01
- Full-bleed, **full visible viewport height** on desktop and mobile, accounting for sticky header and mobile browser viewport behavior (`100dvh` where supported).
- Video or approved extracted frames cover the background without stretching. Preserve the truck/loading action in the visible crop; adjust `object-position` for mobile.
- Accessible HTML/CSS foreground content, not text baked into the video:
  - Suggested H1: **Road Freight Transport & Delivery Support**
  - Suggested description: **Explore practical road freight transport and delivery coordination services.**
  - CTA: **Our Services** (scrolls to services) and **Contact Us** (real contact page/section).
- Contrast: use a restrained dark gradient overlay behind text and check WCAG contrast. Never place critical white text over bright sky without a contrast treatment.
- Do not make unverified claims about owned fleets, staff size, nationwide coverage, years of experience, certifications, or delivery guarantees.

### ZIGZAG SECTION 01 — VIDEO_02
- Heading: **Road Freight Delivery**.
- Desktop: text LEFT, video RIGHT. Mobile: stack in logical reading order with sufficient spacing.
- Explain road transportation and delivery support using only verified services.
- Use approved footage and actual duration after the VIDEO_02 continuity check above.

### ZIGZAG SECTION 02 — VIDEO_03
- Heading: **Cargo Handling & Warehouse Delivery**.
- Desktop: video LEFT, text RIGHT. Mobile: responsive stacked layout.
- Show the forklift transferring cartons from the container into the warehouse. Do not insert office/management scenes into this clip.
- Describe operations cautiously: avoid asserting KALYAL owns the truck, forklift, warehouse or workforce shown.

## 5. Center-pinned scroll-scrubbing (if this is the existing approved site behavior)

- Preserve/repair the existing cinematic frame-by-frame scroll-controlled video effect. Do not replace it with autoplay without explicit approval.
- Extract approved image sequences from the **actual** rendered source videos using measured metadata (ffprobe or equivalent); never assume FPS or frame totals.
- When each media section reaches the visual center **below the sticky header**, pin it there, scrub smoothly forward with downward scroll and backward with upward scroll, then release after the last frame.
- Ensure the hero remains visually full-screen, and pinned zigzag visuals never overlap the sticky header, adjacent copy, footer, buttons or other sections.
- Use responsive sizing, lazy loading, preloading of near-future frames, reduced-motion fallback, accessible headings and stable placeholders to prevent blank flashes or layout shifts.
- If the existing project uses standard video playback rather than scrubbing, report the difference in Phase A and request approval before altering behavior.

## 6. ABSOLUTE BAN ON PUBLIC DEBUG OVERLAYS

**Only the cinematic scene may be visible inside the video/frame area.** Remove or disable any public-facing overlays including:

- `FRAME 1/47`, `FRAME 0/75`, `1 / 47` and similar frame counters;
- `0% SCRUBBED`, scrub percentages, progress meters, chapter numbers;
- FPS, timing, diagnostics, developer captions, ScrollTrigger markers, technical HUDs;
- stock watermarks, generator captions or placeholder labels.

Keep instrumentation in developer tools or private logs only. This applies to ALL three media sections and all breakpoints. Text headings and CTA buttons belong in the **website's independent HTML layer**, not burned into the footage.

## 7. Preserve existing approved functionality

- Retain approved website theme, typography, brand palette, navigation, logo, footer, and verified company contact information.
- Preserve **all existing jobs, salaries, Careers pages, Apply Now buttons, CV upload forms, application routes, management text and related functionality** exactly unless the owner separately authorizes changes.
- Replace any branded workforce/management visuals with ordinary, unbranded, realistic illustrative imagery; no matching KALYAL uniforms or branded office backgrounds. Keep management information/functionality, but do not invent management identities or credentials.
- No unrelated changes to databases, backend, authentication, forms, SEO routes or business logic.
- If a WhatsApp widget exists, preserve it only if its number is confirmed as a WhatsApp-enabled KALYAL number; never insert a guessed number.

## 8. Remove old branded footage safely

- Inventory ALL old video references (hero, services, careers, background, mobile variants, posters, generated frame folders, CSS background images, content manifests and cached/preloaded assets).
- Identify old KALYAL-branded footage and imagery and replace all active references with the three approved clips and neutral imagery where needed.
- Remove obsolete fourth management-office video from the active site. Preserve the management **content** and controls.
- Clear outdated poster frames, video sequences, stale public assets and build references after approval; avoid accidental reuse of old branded frames.
- Ensure the final site has **exactly three active cinematic video sections** (hero + two zigzags), not four.

## 9. UI, responsive, accessibility and performance QA

Check at 320, 375, 390, 768, 1024, 1440 and 1920 px widths, plus landscape mobile. Audit:

- header logo scale, sticky-header offset, mobile menu, CTA sizing, touch targets, typography and alignment;
- hero text contrast and legibility on every video frame; no cropped text or obstructed mechanics/truck;
- video crop, container visibility, pin start/end, reverse scroll, zigzag spacing and overlap;
- no horizontal overflow, clipped buttons, z-index conflicts, broken anchors or missing posters;
- all careers/management functions and contact actions still work;
- compressed media, lazy loading, no excessive RAM use, responsive poster images, graceful fallback on slow devices;
- reduced-motion behavior, keyboard navigation, semantic headings, alt text for informative images, captions/transcripts when needed;
- no public debug labels on ANY device.

## 10. Required delivery report

Before implementation, deliver: (1) asset inventory, (2) current site map and placements, (3) VIDEO_02 continuity assessment, (4) exact proposed replacements, (5) risks, and (6) explicit approval request.

After approved implementation, deliver: (1) changed file paths, (2) media manifest and measured durations, (3) screenshot/video evidence across desktop/mobile, (4) QA results, (5) confirmation of old branded asset removal from live pages, (6) confirmation that careers and management features remain intact, and (7) any unresolved issues. Never claim success without checking the running website.

---
**FINAL ACCEPTANCE:** Three cinematic sections only; Video 01 container loading full-screen hero, Video 02 same-truck road delivery in right-side zigzag, Video 03 carton unloading in left-side zigzag; no management video; no fake branding on physical assets; existing careers/management functions preserved; no frame counters or scrub percentages visible anywhere.
