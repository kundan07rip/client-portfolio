import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Kundan — Freelance Video Editor",
  description:
    "Freelance video editor crafting cinematic stories and compelling visual content. Video editing, motion graphics, and creative storytelling.",
  keywords: "Kundan, video editor, freelance editor, motion graphics, visual storytelling, Jaipur",
  openGraph: {
    title: "Kundan — Freelance Video Editor",
    description: "Freelance video editor crafting cinematic stories and compelling visual content.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
