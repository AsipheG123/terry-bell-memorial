import StickyNav from "@/components/StickyNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MemorialServiceSection from "@/components/MemorialServiceSection";
import PublicTributesSection from "@/components/PublicTributesSection";
import MediaMemoriesSection from "@/components/MediaMemoriesSection";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main>
        <HeroSection />
        <AboutSection />
        <MemorialServiceSection />
        <PublicTributesSection />
        <MediaMemoriesSection />

        <footer
          style={{
            background: "#120C08",
            borderTop: "1px solid rgba(196,164,107,0.1)",
            padding: "3.5rem 1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: "0.5rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "1.5rem",
                  height: "1px",
                  background: "rgba(196,164,107,0.35)",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "0.5rem",
                  height: "1px",
                  background: "#C4A46B",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "1.5rem",
                  height: "1px",
                  background: "rgba(196,164,107,0.35)",
                }}
              />
            </div>
          </div>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1rem",
              color: "#9B7A56",
              fontStyle: "italic",
              marginBottom: "0.6rem",
              lineHeight: 1.6,
            }}
          >
            Terry Bell &mdash; 12 September 1942 &ndash; 25 March 2026
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              color: "#6B5040",
              lineHeight: 1.6,
              marginBottom: "1.5rem",
            }}
          >
            In loving memory. Crafted with care by those who carry his legacy forward.
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              color: "#7A6050",
              letterSpacing: "0.06em",
              opacity: 0.7,
            }}
          >
            &copy; 2026 AutoGrowthAgency. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}
