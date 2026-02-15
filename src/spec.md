# Specification

## Summary
**Goal:** Restore reliable job listing display on the Careers page and add five new VLSI engineering job postings with experience and salary ranges.

**Planned changes:**
- Fix the Careers (/careers) jobs list regression so jobs reliably render when they exist, including troubleshooting data-fetching (React Query/actor readiness), backend fetch failures, and rendering/empty-state logic.
- Add explicit error and empty states for the Careers jobs section (error shown on fetch failure; clear “no open positions” message when zero jobs exist).
- Ensure job listings are visible to anonymous users (no Internet Identity required to view jobs).
- Extend the JobPosting data model to include an explicit experience range field that can represent “0–5 years,” and display it on job cards and in the apply/dialog or job detail view.
- Seed/update the available jobs to include exactly these five roles with required fields:
  - Physical Design Engineer
  - Design Engineer
  - Design Verification Engineer
  - DFT Engineer
  - AI Automation Engineer
- Ensure each of the five roles has a unique 6–7 character alphanumeric Job ID and displays salary as “INR 5–20 LPA,” and that applications can be submitted successfully for each job ID.

**User-visible outcome:** Visiting /careers shows a working, non-empty jobs list when jobs exist (with clear error/empty states when applicable), and users can view and apply to the five new roles with displayed experience (0–5 years) and salary (INR 5–20 LPA) details without needing to log in.
