"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import styles from "./PortfolioGrid.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioGrid() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [activeColor, setActiveColor] = useState("#a55eea");
    const [isMobile, setIsMobile] = useState(false);
    const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // MOBILE: IntersectionObserver — auto-play when scrolled into view
    useEffect(() => {
        if (!isMobile) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target as HTMLVideoElement;
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        video.play().catch(() => { });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: [0, 0.5, 1] }
        );

        videoRefs.current.forEach((video) => {
            observer.observe(video);
        });

        return () => observer.disconnect();
    }, [isMobile]);

    // DESKTOP: hover to play
    const handleMouseEnter = useCallback(
        (id: string, color: string) => {
            if (isMobile) return;
            setHoveredId(id);
            setActiveColor(color);
            const video = videoRefs.current.get(id);
            if (video) {
                video.play().catch(() => { });
            }
        },
        [isMobile]
    );

    const handleMouseLeave = useCallback(() => {
        if (isMobile) return;
        if (hoveredId) {
            const video = videoRefs.current.get(hoveredId);
            if (video) {
                video.pause();
            }
        }
        setHoveredId(null);
    }, [hoveredId, isMobile]);

    // GSAP entrance animation
    useEffect(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll(`.${styles.card}`);

        gsap.from(cards, {
            y: 80,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }, []);

    return (
        <section id="portfolio" ref={sectionRef} className={`section ${styles.section}`}>
            {/* Ambient glow */}
            <div
                className={styles.glowEffect}
                style={{
                    background: `radial-gradient(600px circle at 50% 50%, ${activeColor}15, transparent 70%)`,
                    opacity: hoveredId ? 1 : 0,
                }}
            />

            <div className="container">
                <div className={styles.header}>
                    <div className="section-label">
                        <span className="label">Selected Works</span>
                    </div>
                    <h2 className={`heading-xl ${styles.title}`}>
                        My <span className="gradient-text">Portfolio</span>
                    </h2>
                    <p className="body-text" style={{ maxWidth: 500 }}>
                        A curated collection of my best video editing, color grading,
                        and visual storytelling projects.
                    </p>
                </div>

                {/* Masonry Grid */}
                <div ref={gridRef} className={styles.grid}>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={styles.card}
                            data-cursor="view"
                            onMouseEnter={() => handleMouseEnter(project.id, project.accentColor)}
                            onMouseLeave={handleMouseLeave}
                            style={{ "--accent": project.accentColor } as React.CSSProperties}
                        >
                            <a href={project.link || "#"} className={styles.cardLink}>
                                {/* Video Container — uses each project's aspect ratio */}
                                <div
                                    className={styles.media}
                                    style={{ aspectRatio: project.aspectRatio }}
                                >
                                    {/*
                                      Video is ALWAYS visible (paused).
                                      First frame acts as the "thumbnail".
                                      Desktop: plays on hover.
                                      Mobile: plays when scrolled into view.
                                    */}
                                    <video
                                        ref={(el) => {
                                            if (el) videoRefs.current.set(project.id, el);
                                        }}
                                        className={styles.video}
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                    >
                                        <source src={project.videoLoop} type="video/mp4" />
                                    </video>

                                    {/* Bottom gradient overlay */}
                                    <div className={styles.mediaOverlay} />

                                    {/* Category badge */}
                                    <span className={styles.badge}>{project.category}</span>

                                    {/* Play icon — desktop only */}
                                    {!isMobile && (
                                        <div
                                            className={`${styles.playIcon} ${hoveredId === project.id ? styles.playVisible : ""
                                                }`}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* Info bar */}
                                <div className={styles.cardInfo}>
                                    <div className={styles.cardTop}>
                                        <h3 className={styles.cardTitle}>{project.title}</h3>
                                        <span className={styles.cardArrow}>
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </span>
                                    </div>
                                    {project.description && (
                                        <p className={styles.cardDesc}>{project.description}</p>
                                    )}
                                    <span className={styles.cardYear}>{project.year}</span>
                                </div>

                                {/* Accent glow */}
                                <div className={styles.cardGlow} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
