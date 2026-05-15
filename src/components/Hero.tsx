"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const line3Ref = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const blobRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.3 });

        // Tag line
        if (tagRef.current) {
            tl.from(tagRef.current, { y: 30, opacity: 0, duration: 1, ease: "power3.out" });
        }

        // Title lines stagger with character animation
        [line1Ref, line2Ref, line3Ref].forEach((ref, idx) => {
            if (ref.current) {
                const chars = ref.current.querySelectorAll(`.${styles.char}`);
                tl.from(chars, {
                    y: 100,
                    rotateX: -80,
                    opacity: 0,
                    duration: 0.9,
                    stagger: 0.025,
                    ease: "back.out(1.4)",
                    transformOrigin: "bottom center",
                }, idx === 0 ? "-=0.3" : "-=0.7");
            }
        });

        // Blob entrance
        if (blobRef.current) {
            tl.from(blobRef.current, {
                scale: 0,
                opacity: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)",
            }, "-=1.2");
        }

        // CTA
        if (ctaRef.current) {
            tl.from(ctaRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
        }

        // Scroll indicator
        if (scrollRef.current) {
            tl.from(scrollRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
        }

        // Scroll parallax
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                y: -150,
                opacity: 0,
                scale: 0.95,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "60% top",
                    scrub: true,
                },
            });
        }

        // Blob parallax on scroll
        if (blobRef.current) {
            gsap.to(blobRef.current, {
                y: -100,
                scale: 1.2,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }

        // Mouse-follow effect for the blob
        const handleMouseMove = (e: MouseEvent) => {
            if (!blobRef.current) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            gsap.to(blobRef.current, {
                x,
                y,
                duration: 1.5,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const splitText = (text: string) =>
        text.split("").map((char, i) => (
            <span key={i} className={styles.char}>
                {char === " " ? "\u00A0" : char}
            </span>
        ));

    return (
        <section id="hero" ref={sectionRef} className={styles.hero}>
            {/* Animated Oil Blob */}
            <div className={styles.blobContainer}>
                <div ref={blobRef} className={styles.blob}>
                    <div className={styles.blobInner} />
                    <div className={styles.blobSheen} />
                    <div className={styles.blobRing} />
                    <div className={styles.blobRing2} />
                </div>
            </div>

            {/* Ambient glow orbs */}
            <div className={styles.orbContainer}>
                <div className={`${styles.orb} ${styles.orb1}`} />
                <div className={`${styles.orb} ${styles.orb2}`} />
                <div className={`${styles.orb} ${styles.orb3}`} />
            </div>

            <div ref={contentRef} className={styles.content}>
                {/* Top tag */}
                <div ref={tagRef} className={styles.tag}>
                    <span className={styles.tagDot} />
                    <span className={styles.tagText}>Freelance Video Editor — Kundan</span>
                </div>

                {/* Massive Typography */}
                <div className={styles.titleBlock}>
                    <div ref={line1Ref} className={styles.titleLine}>
                        {splitText("Kundan")}
                    </div>
                    <div ref={line2Ref} className={`${styles.titleLine} ${styles.titleLineItalic}`}>
                        {splitText("Saini")}
                    </div>
                    <div ref={line3Ref} className={`${styles.titleLine} ${styles.titleLineSub}`}>
                        {splitText("Video Editor")}
                    </div>
                </div>

                {/* CTA Row */}
                <div ref={ctaRef} className={styles.ctaRow}>
                    <a href="#portfolio" className={`btn btn-filled ${styles.ctaBtn}`}>
                        View My Work
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </a>
                    <a href="#contact" className={`btn ${styles.ctaBtn}`}>
                        Let&apos;s Collaborate
                    </a>
                </div>

                {/* Scroll indicator */}
                <div ref={scrollRef} className={styles.scrollIndicator}>
                    <div className={styles.scrollMouse}>
                        <div className={styles.scrollDot} />
                    </div>
                    <span className={styles.scrollText}>Scroll to explore</span>
                </div>
            </div>
        </section>
    );
}
