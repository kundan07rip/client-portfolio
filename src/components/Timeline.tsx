"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/data/timeline";
import styles from "./Timeline.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !trackRef.current) return;

        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = trackWidth - viewportWidth;

        // Horizontal Scroll
        const mainTl = gsap.to(trackRef.current, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${scrollDistance}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });

        // Progress Bar
        gsap.to(progressRef.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                containerAnimation: mainTl,
                start: "left left",
                end: "right right",
                scrub: true,
            },
        });

        // Floating animations for cards
        const cards = trackRef.current.querySelectorAll(`.${styles.card}`);
        cards.forEach((card, i) => {
            gsap.to(card, {
                y: i % 2 === 0 ? -15 : 15,
                duration: 3 + i * 0.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section id="timeline" ref={sectionRef} className={styles.section}>
            <div className={styles.stickyContainer}>
                {/* Background Decor */}
                <div className={styles.bgGlow} />

                <div className={styles.header}>
                    <div className="container">
                        <div className="section-label">
                            <span className="label">My Journey</span>
                        </div>
                        <h2 className={`heading-xl ${styles.title}`}>
                            The <span className="gradient-text-cool">Experience</span>
                        </h2>
                    </div>
                </div>

                <div ref={scrollContainerRef} className={styles.scrollContainer}>
                    <div ref={trackRef} className={styles.track}>
                        {/* Connecting Line */}
                        <div className={styles.progressLine}>
                            <div ref={progressRef} className={styles.progressFill} />
                        </div>

                        {timeline.map((entry, i) => (
                            <div key={i} className={styles.entry}>
                                <div className={styles.card}>
                                    <div className={styles.cardGlow} />
                                    <span className={styles.cardIcon}>{entry.icon}</span>
                                    <span className={styles.cardYear}>{entry.year}</span>
                                    <h3 className={styles.cardTitle}>{entry.title}</h3>
                                    <p className={styles.cardDesc}>{entry.description}</p>
                                </div>
                                <div className={styles.dot}>
                                    <div className={styles.dotInner} />
                                    <div className={styles.dotPulse} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
