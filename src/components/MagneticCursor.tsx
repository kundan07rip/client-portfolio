"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MagneticCursor.module.css";

export default function MagneticCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [hoverType, setHoverType] = useState<string>("");
    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });
    const dotPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Hide on touch devices
        if ("ontouchstart" in window) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("[data-cursor]");
            if (target) {
                const type = target.getAttribute("data-cursor") || "";
                setHoverType(type);
            } else {
                setHoverType("");
            }
        };

        document.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseover", handleMouseOver, { passive: true });

        // Animation loop
        let raf: number;
        const animate = () => {
            // Outer ring — slow follow
            pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.12;

            // Inner dot — fast follow
            dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.35;
            dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.35;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`;
            }

            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(raf);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    if (typeof window !== "undefined" && "ontouchstart" in window) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className={`${styles.cursor} ${hoverType === "view" ? styles.viewHover : ""} ${hoverType === "link" ? styles.linkHover : ""}`}
            >
                {hoverType === "view" && <span className={styles.cursorText}>View</span>}
            </div>
            <div ref={dotRef} className={styles.dot} />
        </>
    );
}
