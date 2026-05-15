export interface Project {
    id: string;
    title: string;
    category: string;
    /**
     * Path or URL to the thumbnail image.
     * LOCAL:    "/projects/my-project-thumb.jpg"
     * EXTERNAL: "https://res.cloudinary.com/yourname/image/upload/thumb.jpg"
     */
    thumbnail: string;
    /**
     * Path or URL to a short video loop (3-10 seconds).
     * LOCAL:    "/projects/my-project-loop.mp4"
     * EXTERNAL: "https://res.cloudinary.com/yourname/video/upload/video.mp4"
     *
     * 📐 ANY resolution works! The card adapts to your video's aspect ratio.
     * Supported: 16:9, 9:16, 4:3, 1:1, or any custom size.
     */
    videoLoop: string;
    /**
     * Aspect ratio of your video/image.
     * Common values:
     *   "16/9"  → Landscape (YouTube style)
     *   "9/16"  → Portrait (Reels/TikTok)
     *   "4/3"   → Classic
     *   "1/1"   → Square (Instagram)
     *   "4/5"   → Tall portrait
     *   "3/2"   → Photo landscape
     *
     * If you don't know: just set to "16/9" or "9/16" and it'll look fine.
     */
    aspectRatio: string;
    /** Accent color for hover glow effect (hex) */
    accentColor: string;
    description: string;
    year: string;
    /** Optional: link to full project */
    link?: string;
}

/*
 ═══════════════════════════════════════════════════════
 📁 HOW TO ADD YOUR WORK:
 ═══════════════════════════════════════════════════════

 Each project is a block below. Just copy one, fill in your details.
 The aspectRatio field makes the card match YOUR video's size:
   - "9/16" for vertical Reels
   - "16/9" for landscape YouTube-style
   - "1/1" for square
   - "4/5" for tall portrait

 TO ADD:    Copy a block, change the values.
 TO REMOVE: Delete the entire { ... } block.
 TO REORDER: Move blocks up/down in the array.
 ═══════════════════════════════════════════════════════
*/

export const projects: Project[] = [
    {
        id: "01",
        title: "Motion Reel 01",
        category: "Motion Reel",
        thumbnail: "",
        videoLoop: "https://res.cloudinary.com/dcuu75yms/video/upload/v1771602836/project1-loop_dklhfw.mp4",
        aspectRatio: "9/16",
        accentColor: "#ff6b6b",
        description: "",
        year: "2025",
        link: "#",
    },
    {
        id: "02",
        title: "Motion Reel 02",
        category: "Motion Reel",
        thumbnail: "",
        videoLoop: "https://res.cloudinary.com/dcuu75yms/video/upload/v1771602855/project2-loop_wkeamr.mp4",
        aspectRatio: "9/16",
        accentColor: "#a55eea",
        description: "",
        year: "2025",
        link: "#",
    },
    {
        id: "03",
        title: "Motion Reel 03",
        category: "Motion Reel",
        thumbnail: "",
        videoLoop: "https://res.cloudinary.com/dcuu75yms/video/upload/v1771602897/project3-loop_cpj8t8.mp4",
        aspectRatio: "9/16",
        accentColor: "#48dbfb",
        description: "",
        year: "2024",
        link: "#",
    },
    {
        id: "04",
        title: "Logo Reveal",
        category: "Motion Graphics",
        thumbnail: "",
        videoLoop: "https://res.cloudinary.com/dcuu75yms/video/upload/v1771603341/logo_reveal_final_draft_1_g7bgrn.mp4",
        aspectRatio: "16/9",
        accentColor: "#f368e0",
        description: "",
        year: "2025",
        link: "#",
    },
    {
        id: "05",
        title: "Motion Graphics",
        category: "Motion Graphics",
        thumbnail: "",
        videoLoop: "https://res.cloudinary.com/dcuu75yms/video/upload/v1771603436/4_kzm3yf.mp4",
        aspectRatio: "16/9",
        accentColor: "#feca57",
        description: "",
        year: "2025",
        link: "#",
    },
    {
        id: "06",
        title: "Composition",
        category: "Motion Graphics",
        thumbnail: "",
        videoLoop: "https://res.cloudinary.com/dcuu75yms/video/upload/v1771603472/Comp_1_final_v14_pjuarl.mp4",
        aspectRatio: "16/9",
        accentColor: "#1dd1a1",
        description: "",
        year: "2025",
        link: "#",
    },
];
