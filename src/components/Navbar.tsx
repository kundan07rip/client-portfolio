"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Navbar.module.css";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Work", href: "#portfolio" },
    { label: "Journey", href: "#timeline" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });

        const sections = ["hero", "portfolio", "timeline", "about", "contact"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            ScrollTrigger.create({
                trigger: el,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveSection(id),
                onEnterBack: () => setActiveSection(id),
            });
        });

        // Entrance animation
        if (navRef.current) {
            gsap.from(navRef.current, {
                y: -30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.2,
            });
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
    };

    return (
        <nav ref={navRef} className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.navInner}>
                <a href="#" className={styles.logo} data-cursor="link">
                    <span className={styles.logoText}>KUNDAN</span>
                    <span className={styles.logoDot} />
                </a>

                <div className={`${styles.navLinks} ${mobileOpen ? styles.open : ""}`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.active : ""}`}
                            data-cursor="link"
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            <span className={styles.navLinkText}>{link.label}</span>
                        </a>
                    ))}
                </div>

                <a href="#contact" className={styles.navCta} data-cursor="link" onClick={(e) => handleNavClick(e, "#contact")}>
                    <span>Hire Me</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>

                <button className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ""}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                    <span /><span /><span />
                </button>
            </div>

            {mobileOpen && <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} />}
        </nav>
    );
}
