interface SectionHeaderProps {
  label: string;
  heading?: string;
  /** "light" for cream sections, "dark" for dark sections */
  theme?: "light" | "dark";
  /** Override bottom margin, e.g. "5rem". Defaults to "4.5rem" */
  bottomSpacing?: string;
}

export default function SectionHeader({
  label,
  heading,
  theme = "dark",
  bottomSpacing = "4.5rem",
}: SectionHeaderProps) {
  const headingColor = theme === "light" ? "#1E1612" : "#F5F0E8";

  /*
   * Eyebrow is smaller when paired with a heading below it.
   * Eyebrow is slightly larger and more prominent when used standalone.
   */
  const labelSize = heading ? "0.68rem" : "0.84rem";
  const labelTracking = heading ? "0.3em" : "0.22em";

  return (
    /*
     * All alignment via explicit inline styles only.
     * Tailwind `text-center` / `mx-auto` are deliberately NOT used here
     * to avoid Tailwind v4 class-application ambiguity.
     */
    <div
      style={{
        textAlign: "center",
        marginBottom: bottomSpacing,
      }}
    >
      {/* Eyebrow / primary label */}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: labelSize,
          letterSpacing: labelTracking,
          textTransform: "uppercase",
          color: "#C4A46B",
          marginBottom: heading ? "1.25rem" : "1.5rem",
        }}
      >
        {label}
      </p>

      {/* Optional large section heading */}
      {heading && (
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.9rem, 3.8vw, 2.75rem)",
            color: headingColor,
            fontWeight: 400,
            lineHeight: 1.2,
            maxWidth: "52rem",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          {heading}
        </h2>
      )}

      {/* Decorative divider — centered via inline flex */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
        }}
      >
        <span style={{ display: "block", width: "2.5rem", height: "1px", background: "#6B4E37" }} />
        <span style={{ display: "block", width: "0.75rem", height: "1px", background: "#C4A46B" }} />
        <span style={{ display: "block", width: "2.5rem", height: "1px", background: "#6B4E37" }} />
      </div>
    </div>
  );
}
