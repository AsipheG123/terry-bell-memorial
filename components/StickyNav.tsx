"use client";

import { useState, useEffect } from "react";
import { navItems } from "@/data/nav";

export default function StickyNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sectionIds = navItems.map((item) => item.href.replace("#", ""));
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        paddingTop: scrolled ? "10px" : "14px",
        paddingBottom: scrolled ? "10px" : "14px",
        background: scrolled
          ? "rgba(18, 12, 8, 0.94)"
          : "rgba(18, 12, 8, 0.5)",
        backdropFilter: "blur(14px)",
        borderBottom: scrolled
          ? "1px solid rgba(196, 164, 107, 0.14)"
          : "none",
      }}
    >
      {/* Full-width centering wrapper — inline only, no Tailwind max-width constraint */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        {/* Pill container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            border: "1px solid rgba(196, 164, 107, 0.2)",
            borderRadius: "999px",
            padding: "3px 5px",
            background: "rgba(28, 18, 10, 0.45)",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            maxWidth: "calc(100vw - 2rem)",
          }}
        >
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="transition-all duration-300"
                style={{
                  display: "inline-block",
                  padding: "7px 18px",
                  borderRadius: "999px",
                  fontSize: "0.82rem",
                  letterSpacing: "0.02em",
                  fontFamily: "var(--font-sans)",
                  whiteSpace: "nowrap",
                  background: isActive ? "#C4A46B" : "transparent",
                  color: isActive ? "#1E1612" : "#C4A46B",
                  fontWeight: isActive ? 500 : 400,
                  textDecoration: "none",
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
