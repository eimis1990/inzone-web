# Vercel Analytics Setup

## Installation

Vercel Analytics has been installed and configured for the INZONE website.

## Components Updated

### 1. **Layout** (`src/app/layout.tsx`)
- Added `<Analytics />` component from `@vercel/analytics/next`
- This enables automatic page view tracking

### 2. **Analytics Utility** (`src/lib/analytics.ts`)
- Created centralized event tracking utility
- Available events:
  - `downloadAppleSilicon()` - Tracks Apple Silicon download clicks
  - `downloadIntelMac()` - Tracks Intel Mac download clicks
  - `kofiWidgetClick()` - Tracks Ko-fi widget interactions
  - `ctaClick(location)` - Generic CTA tracking with location parameter

### 3. **Download Button** (`src/components/DownloadButton.tsx`)
- Tracks clicks on both download buttons:
  - Apple Silicon downloads
  - Intel Mac downloads

### 4. **Ko-fi Widget** (`src/components/KofiWidget.tsx`)
- Tracks when users interact with the Ko-fi support button
- Uses event listener to detect widget clicks

## Usage

To add more custom events, import the utility and call the appropriate function:

```tsx
import { trackEvent } from "@/lib/analytics";

// In your component
<button onClick={() => trackEvent.downloadAppleSilicon()}>
  Download
</button>
```

## Adding New Events

Add new event functions to `src/lib/analytics.ts`:

```typescript
export const trackEvent = {
  // ... existing events

  newEvent: (data?: string) => {
    track("new_event", { data });
  },
};
```

## Vercel Dashboard

View analytics data in your Vercel dashboard:
1. Go to your project in Vercel
2. Navigate to the "Analytics" tab
3. View page views, custom events, and user metrics

## Events Currently Tracked

- ✅ Page views (automatic)
- ✅ Download button clicks (Apple Silicon)
- ✅ Download button clicks (Intel Mac)
- ✅ Ko-fi widget interactions
