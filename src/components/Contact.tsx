"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const items = sectionRef.current.querySelectorAll(`.${styles.revealItem}`);
        gsap.from(items, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none none",
            },
        });
    }, []);

    return (
        <section id="contact" ref={sectionRef} className={`section ${styles.section}`}>
            {/* Background gradient accent */}
            <div className={styles.bgGlow} />

            <div className="container">
                <div className={styles.wrapper}>
                    {/* Left */}
                    <div className={styles.left}>
                        <div className={`section-label ${styles.revealItem}`}>
                            <span className="label">Get In Touch</span>
                        </div>
                        <h2 className={`display-lg ${styles.headline} ${styles.revealItem}`}>
                            Let&apos;s create{" "}
                            <span className={styles.italic}>something epic.</span>
                        </h2>
                        <p className={`body-lg ${styles.revealItem}`}>
                            Have a project in mind? Whether it&apos;s a full production or a quick edit,
                            let&apos;s talk about bringing your visual story to life.
                        </p>

                        <div className={`${styles.contactInfo} ${styles.revealItem}`}>
                            <a href="mailto:kundan.r2005@gmail.com" className={styles.contactLink} data-cursor="link">
                                <span className={styles.contactIcon}>✉</span>
                                kundan.r2005@gmail.com
                            </a>
                        </div>
                    </div>

                    {/* Right — Form */}
                    <div className={`${styles.right} ${styles.revealItem}`}>
                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.formGroup}>
                                <input type="text" id="name" className={styles.input} placeholder="Your Name" required />
                            </div>
                            <div className={styles.formGroup}>
                                <input type="email" id="email" className={styles.input} placeholder="Email Address" required />
                            </div>
                            <div className={styles.formGroup}>
                                <select id="service" className={styles.input} defaultValue="">
                                    <option value="" disabled>Select a service</option>
                                    <option value="video-editing">Video Editing</option>
                                    <option value="color-grading">Color Grading</option>
                                    <option value="photo-editing">Photo Editing</option>
                                    <option value="motion-graphics">Motion Graphics</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <textarea id="message" className={`${styles.input} ${styles.textarea}`} placeholder="Tell me about your project" rows={4} required />
                            </div>
                            <button type="submit" className={`btn btn-filled ${styles.submitBtn}`} data-cursor="link">
                                <span>Send Message</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
