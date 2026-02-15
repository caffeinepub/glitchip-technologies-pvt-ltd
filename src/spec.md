# Specification

## Summary
**Goal:** Deliver a modern, multi-page marketing website for Glitchip Technologies Pvt. Ltd. with VLSI-focused content, consistent branding using the provided logo, smooth transitions, and backend-backed Careers + Contact forms.

**Planned changes:**
- Create top-level pages and routes: Home (/), Services (/services), Why Us (/why-us), Products (/products), Careers (/careers), Contact (/contact), all responsive with consistent layout.
- Implement a global header + footer on all pages with primary navigation, active state, a prominent “Get in touch” CTA, social placeholders, company name, and a compact services list in the footer.
- Apply the provided logo (IMG-20250404-WA0002.png) in header/footer and generate a favicon/app icon based on it.
- Build the Home page with VLSI-focused hero messaging (headline/subheadline/CTA), services overview, Why Us teaser, stats/capabilities highlight, and final CTA, using high-quality visuals.
- Build the Services page listing exactly: Physical Design, Design Verification, DFT (Design for Testability), AI Automation for Semiconductors, RTL Engineering—each with summary, key capabilities, typical deliverables, and an engagement model teaser, plus an icon/illustration per service.
- Build the Products page showing the exact prominent message “Stay Tuned for the product” and an empty-state layout reserved for future product cards.
- Build the Why Us page with structured VLSI-relevant differentiators and at least one diagram-like/timeline/process visual section.
- Build the Careers page with a modern jobs list, job detail view (Job Description, Responsibilities, Pay, Job ID), and an application form tied to the selected Job ID; persist submissions server-side.
- Implement backend APIs/storage (single Motoko actor) to seed and serve job postings (>= 3) with stable Job IDs; accept applications (name, email, phone, resume link/attachment placeholder text, optional message, Job ID); reject unknown Job IDs; provide listing endpoints for jobs and applications (admin/dev use).
- Build the Contact page with a contact form (name, email, company, message) plus a static contact info section (placeholders); persist submissions to backend and provide a listing endpoint (admin/dev use).
- Add smooth page transitions and section reveal animations across the site with reduced-motion support.
- Add a coherent visual theme (colors/typography/spacing/components) aligned to a semiconductor/VLSI brand and consistent across pages.
- Add generated static visual assets under `frontend/public/assets/generated` and use them across Home, Services, Why Us, and Careers.
- Add `/.well-known/ic-domains` for `glitchip.in` and include project-local DNS instructions for Cloudflare-managed DNS (placeholders until canister IDs are known).

**User-visible outcome:** Visitors can navigate a branded Glitchip marketing site across all required pages with smooth transitions, view services and company differentiators, see a careers list with job details and submit applications, and send messages via a contact form—both applications and contact submissions are stored in the backend.
