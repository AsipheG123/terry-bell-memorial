export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        minHeight: "112svh",
      }}
    >
      {/* Background — positioned at very top so face and hair are fully visible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/terry-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "50% 18%",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(100%) brightness(0.46) contrast(0.78)",
        }}
      />

      {/* Gradient — very light at top to preserve face/hair, dense only below 55% */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(18,10,4,0.12) 0%, rgba(18,10,4,0.18) 30%, rgba(18,10,4,0.30) 58%, rgba(12,7,3,0.52) 80%, rgba(12,7,3,0.68) 100%)",
        }}
      />

      {/* Warm sepia tint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(65, 34, 12, 0.15)",
        }}
      />

      {/* Text content — absolutely positioned at bottom, fully centered via inline styles */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: "clamp(3.5rem, 8vh, 6rem)",
        }}
      >
        {/* Inner column — centered with explicit inline margin auto */}
        <div
          style={{
            maxWidth: "44rem",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "0 1.5rem",
            textAlign: "center",
          }}
        >
          {/* Eyebrow label */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.68rem",
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "#C4A46B",
              marginBottom: "1.1rem",
            }}
          >
            A Life Remembered
          </p>

          {/* Accent divider — centered via inline flex */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ display: "block", width: "2.5rem", height: "1px", background: "#6B4E37" }} />
            <span style={{ display: "block", width: "0.75rem", height: "1px", background: "#C4A46B" }} />
            <span style={{ display: "block", width: "2.5rem", height: "1px", background: "#6B4E37" }} />
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.4rem, 7.5vw, 5rem)",
              color: "#F5F0E8",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              textShadow: "0 2px 32px rgba(0,0,0,0.4)",
              marginBottom: "clamp(0.7rem, 1.5vw, 1.1rem)",
            }}
          >
            Remembering Terry Bell
          </h1>

          {/* Life dates — corrected to 1942 */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.82rem, 1.8vw, 1rem)",
              color: "#B8AA8C",
              letterSpacing: "0.08em",
              marginBottom: "clamp(1.25rem, 3vw, 2rem)",
            }}
          >
            12 September 1942 &mdash; 25 March 2026
          </p>

          {/* Role line — personal, family-first framing */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(0.78rem, 1.5vw, 0.9rem)",
              color: "#C8BCA0",
              letterSpacing: "0.12em",
              lineHeight: 1.9,
              maxWidth: "34rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Husband &middot; Father &middot; Grandfather &middot; Journalist &middot; Educator &middot; Author
          </p>
        </div>
      </div>
    </section>
  );
}
