"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: "Premiere Pro", color: "#9999ff" },
    { name: "After Effects", color: "#9999ff" },
    { name: "DaVinci Resolve", color: "#ff6b6b" },
    { name: "Photoshop", color: "#31a8ff" },
    { name: "Lightroom", color: "#31a8ff" },
    { name: "Final Cut Pro", color: "#a55eea" },
    { name: "Cinema 4D", color: "#1dd1a1" },
    { name: "Color Grading", color: "#feca57" },
    { name: "Motion Graphics", color: "#f368e0" },
    { name: "Sound Design", color: "#48dbfb" },
    { name: "Compositing", color: "#ff9ff3" },
    { name: "Retouching", color: "#ff6b6b" },
];

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        if (contentRef.current) {
            gsap.from(contentRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }

        if (skillsRef.current) {
            gsap.from(skillsRef.current.querySelectorAll(`.${styles.skill}`), {
                scale: 0.7,
                opacity: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: skillsRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        }

        if (statsRef.current) {
            gsap.from(statsRef.current.querySelectorAll(`.${styles.stat}`), {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });
        }
    }, []);

    return (
        <section id="about" ref={sectionRef} className={`section ${styles.section}`}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Left */}
                    <div ref={contentRef} className={styles.left}>
                        <div className="section-label">
                            <span className="label">About Me</span>
                        </div>
                        <h2 className={`display-lg ${styles.headline}`}>
                            I turn raw footage into{" "}
                            <span className={styles.italic}>cinematic art.</span>
                        </h2>
                        <p className="body-lg">
                            I&apos;m Kundan — a freelance video editor pursuing B.Sc. Animation
                            &amp; VFX at Poornima University, Jaipur. From Vice Captain of the
                            Graphic Designing Club to working with agencies like Whygo Digital
                            and Byyte Digital, I&apos;ve honed my craft across dozens of projects.
                        </p>
                        <p className="body-text">
                            Now full-time freelancing, I bring sharp editing, compelling storytelling,
                            and creative energy to every project. Whether it&apos;s reels, commercials,
                            or brand content — every cut I make serves the story.
                        </p>

                        {/* Stats */}
                        <div ref={statsRef} className={styles.stats}>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>50+</span>
                                <span className={styles.statLabel}>Projects</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>30+</span>
                                <span className={styles.statLabel}>Clients</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNum}>3+</span>
                                <span className={styles.statLabel}>Years</span>
                            </div>
                        </div>
                    </div>

                    {/* Right — Skills */}
                    <div className={styles.right}>
                        <div ref={skillsRef} className={styles.skillsGrid}>
                            {skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className={styles.skill}
                                    style={{
                                        "--skill-color": skill.color,
                                        "--skill-glow": `${skill.color}66`,
                                    } as React.CSSProperties}
                                    data-cursor="link"
                                >
                                    <span className={styles.skillDot} />
                                    {skill.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
