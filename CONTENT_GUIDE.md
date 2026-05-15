# 📁 Content & Deployment Guide

---

## 🎬 Hero Showreel Video (16:9)

Your main showreel auto-plays continuously, loops, and is muted.

| Setting | Value |
|---------|-------|
| **Resolution** | 1920×1080 (16:9) |
| **Location** | `public/videos/showreel.mp4` |
| **Format** | MP4 (H.264) |
| **Max Size** | Under 25 MB |
| **Behavior** | Auto-plays on page load, loops forever |

> Optional poster image: `public/videos/showreel-poster.jpg`

---

## 🎥 Portfolio Videos (9:16 PORTRAIT)

These are your project video previews — they auto-play **only when you hover your mouse** over them.

| Setting | Value |
|---------|-------|
| **Resolution** | 1080×1920 (9:16 portrait, like reels) |
| **Format** | MP4 (H.264) |
| **Duration** | 3-10 seconds (short loops) |
| **Max Size** | Under 8 MB each |
| **Behavior** | Plays on mouse hover, pauses when mouse leaves |

---

## 📁 Where to Put Your Files

```
public/
├── videos/
│   ├── showreel.mp4              ← Your hero showreel (16:9)
│   └── showreel-poster.jpg       ← Optional poster
│
└── projects/
    ├── project1.jpg              ← Project 1 thumbnail
    ├── project1-loop.mp4         ← Project 1 hover video (9:16)
    ├── project2.jpg              ← ...
    ├── project2-loop.mp4
    └── ...
```

---

## ➕ Adding / Removing Projects

Edit **one file**: `src/data/projects.ts`

### To ADD a project:
```typescript
{
  id: "07",
  title: "My New Project",
  category: "Reels • Brand",
  thumbnail: "/projects/my-project.jpg",          // or external URL
  videoLoop: "/projects/my-project-loop.mp4",      // or external URL
  accentColor: "#ff6b6b",
  description: "Short description of the project.",
  year: "2025",
  link: "https://instagram.com/reel/...",          // optional
},
```

### To REMOVE: Delete the entire `{ ... },` block.
### To REORDER: Move blocks up/down in the array.

---

## 🚀 DEPLOYING YOUR WEBSITE LIVE

### The Problem with Local Videos
Videos in `public/` are fine for development, but when you deploy:
- **Vercel** has a ~100MB total deployment limit on free tier
- Large video files will make your site slow to load
- Users on mobile will wait too long

### ✅ RECOMMENDED: Use Cloudinary (Free)

Cloudinary gives you **25GB free storage** with automatic video optimization.

**Step 1:** Sign up at [cloudinary.com](https://cloudinary.com) (free)

**Step 2:** Upload your videos via their dashboard

**Step 3:** Get the URL for each video, it looks like:
```
https://res.cloudinary.com/your-cloud-name/video/upload/v1234567/showreel.mp4
```

**Step 4:** Use the URL in your code:

For the **showreel**, edit `src/components/Hero.tsx` line ~156:
```html
<source src="https://res.cloudinary.com/your-name/video/upload/showreel.mp4" type="video/mp4" />
```

For **project videos**, edit `src/data/projects.ts`:
```typescript
videoLoop: "https://res.cloudinary.com/your-name/video/upload/project1.mp4",
```

### Alternative Free Video Hosts

| Platform | Free Storage | Best For |
|----------|-------------|----------|
| **Cloudinary** | 25GB | Best option — auto-optimizes |
| **Firebase Storage** | 5GB | Google ecosystem |
| **Bunny.net** | Pay-as-you-go (cheap) | Best CDN performance |
| **GitHub LFS** | 1GB | If already using GitHub |

### Deploy to Vercel (Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Click Deploy → your site goes live at `yourname.vercel.app`
4. Set a custom domain if needed

> **IMPORTANT:** If using Cloudinary URLs for videos, your Vercel deploy will be tiny and fast because videos are served from Cloudinary's CDN, not your Vercel deployment.

---

## How Viewers See Your Videos

| Video | Behavior |
|-------|----------|
| **Showreel (Hero)** | Auto-plays immediately when page loads, loops forever, muted |
| **Portfolio Videos** | Auto-play when visitor hovers mouse on a project card, pause when mouse leaves |
| **After Deploy** | Works exactly the same — muted autoplay is allowed by all browsers |

> Videos are muted which means browsers allow auto-play without any user interaction. This works on desktop and mobile, locally and after deployment.
