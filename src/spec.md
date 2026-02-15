# Specification

## Summary
**Goal:** Remove the “Frontend Developer”, “Backend Developer”, and “Mobile App Developer” job postings so they no longer appear on the Careers page and cannot return after refresh/redeploy.

**Planned changes:**
- Update the /careers Open Positions list rendering to exclude job cards with titles “Frontend Developer”, “Backend Developer”, and “Mobile App Developer”.
- Update the backend getAllJobs() results to ensure it does not return job postings with titles “Frontend Developer”, “Backend Developer”, or “Mobile App Developer”.

**User-visible outcome:** On /careers, the Open Positions grid shows only the remaining roles (e.g., VLSI roles), with no empty gaps where the removed job cards previously appeared.
