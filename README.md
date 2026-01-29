# Before & After Review Request App

This project implements a simplified employee → customer review request flow where an employee uploads two images (“Before” and “After”), generates a combined image, and shares a link with the customer to download the result and leave a Google review.

The implementation intentionally focuses on **core flow, clean React structure, async handling, and realistic scoping**, as requested in the assignment.

---

## Tech Stack

- **Next.js 14 (App Router)**
- **React + TypeScript**
- **React Hook Form** for form handling
- **Sharp** for server-side image processing
- **Cloudinary** for image storage & delivery
- Native **Web Share API**
- No database, no auth (intentionally)

---

## Architecture Overview

This project uses Next.js as a **full-stack framework**:

| Layer | Responsibility |
|---|---|
| Client (React) | Image selection, preview, share flow, UI states |
| API Route (`/api/generate`) | Image processing + upload to Cloudinary |
| Cloudinary | CDN storage, download transformations |
| Review Page | Public page for customers |

This avoids unnecessary complexity while still demonstrating a realistic full-stack flow.

---

## Image Generation Approach (AI Simulation)

Instead of calling a real AI API, this project simulates the “AI image generation” step using server-side image processing:

1. Both images are resized to the same height using **Sharp**
2. Images are composited side-by-side:
   - Before → Left
   - After → Right
3. Result is uploaded to **Cloudinary**
4. API returns a public URL

### Where real AI would plug in

In a production system, this step could be replaced with:

- Background removal
- AI enhancement
- Image alignment
- Smart cropping
- Quality restoration

That logic would occur **before** the composite step, without changing the frontend or API contract.

---

## Employee Flow

1. Select **Before** image (JPG/PNG)
2. Select **After** image (JPG/PNG)
3. Tap **Generate Image**
4. Preview the result
5. Tap **Send Review Request**
6. Native iOS/Android share sheet opens (or clipboard fallback)

---

## Customer Flow

1. Open shared link `/review?url=...`
2. See generated image
3. Download image (Cloudinary `fl_attachment` transformation)
4. Tap button to leave Google review (via `place_id`)

---

## Key Implementation Details

### Clean React Structure

- `useGenerateImage` → handles async API call, loading, error, result
- `useShareReview` → handles Web Share API and clipboard fallback
- Components are UI-only and stateless where possible

### Proper Async Handling

- Typed error handling (no `any`)
- Loading and error UI states
- Server-side validation for file types

### Cloudinary Usage

- Upload via `upload_stream`
- Images stored in configured folder
- Download filenames handled via `fl_attachment:filename`
- CDN used correctly instead of proxying images

### Next.js Best Practices

- App Router
- API Routes instead of separate backend
- `<Image />` with remotePatterns
- Environment variables for secrets

---

## What was intentionally NOT built

As requested in the assignment:

- No authentication
- No database
- No SMS/email service
- No background jobs

These are unnecessary for demonstrating the core flow.

---

## Tradeoffs & Decisions

| Decision | Reason |
|---|---|
| Next.js instead of separate Node API | Simpler architecture, same capability |
| Sharp instead of AI API | Demonstrates image pipeline without external dependency |
| Cloudinary instead of S3 | Faster setup, built-in transformations |
| React Hook Form | Cleaner form state management |
| Web Share API | Native mobile UX without extra libraries |

---

## How to Run the project locally

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env.local`

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NEXT_PUBLIC_GOOGLE_PLACE_ID=
```

### 3. Start the app

```bash
npm run dev
```

Open: http://localhost:3000

---

## 🔮 What I would improve with more time

- Drag & drop uploads
- Client-side image previews before upload
- Image size validation
- Better styling & polish
- Expiring review links
- Basic analytics for review conversions
- Optional AI enhancement step before compositing
