import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { aboutIntro, aboutCards } from "@/data/about";

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ background: "#F5F0E8", padding: "6.5rem 1.5rem 7rem" }}
    >
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <SectionHeader
          label="About Terry Bell"
          heading="A life in service of truth, labour, and justice."
          theme="light"
          bottomSpacing="3.5rem"
        />

        {/* Portrait + intro */}
        <div
          className="flex flex-col gap-10 md:flex-row md:gap-14"
          style={{ alignItems: "flex-start", marginBottom: "5rem" }}
        >
          {/* Portrait — natural aspect ratio, full image visible, no forced crop */}
          <div
            style={{
              width: "300px",
              flexShrink: 0,
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid rgba(107,78,55,0.2)",
              boxShadow: "0 8px 32px rgba(28,18,10,0.14)",
            }}
          >
            <Image
              src="/images/terry-face.png"
              alt="Terry Bell — veteran journalist, activist, and author"
              width={300}
              height={370}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                filter: "sepia(18%) contrast(0.95) brightness(0.98)",
              }}
              priority
            />
          </div>

          {/* Intro text + award callout */}
          <div style={{ flex: 1 }}>
            {aboutIntro.map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                  color: "#4A3728",
                  lineHeight: 1.9,
                  maxWidth: "42rem",
                  marginBottom: i < aboutIntro.length - 1 ? "1rem" : "1.25rem",
                }}
              >
                {para}
              </p>
            ))}

            {/* Award / publications callout — tight beneath paragraph */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.875rem",
                padding: "1.25rem 1.375rem",
                borderRadius: "8px",
                background: "rgba(107,78,55,0.07)",
                border: "1px solid rgba(107,78,55,0.16)",
                marginTop: "0.5rem",
              }}
            >
              <span
                style={{
                  width: "3px",
                  minHeight: "38px",
                  background: "#C4A46B",
                  borderRadius: "2px",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  color: "#6B4E37",
                  lineHeight: 1.7,
                }}
              >
                Winner of the <strong>Nat Nakasa Award</strong> for courageous journalism.
                <br />
                Author of{" "}
                <em>Unfinished Business: South Africa, Apartheid and Truth</em>,{" "}
                <em>A Hat, a Kayak and Dreams of Dar</em>, and several other works.
              </p>
            </div>
          </div>
        </div>

        {/*
          Identity cards — 6-column grid so the bottom 2 cards
          sit centred under the top 3 (between their columns).

          Layout at lg:
            Row 1 → col 1-2 | col 3-4 | col 5-6
            Row 2 → empty-1 | col 2-3 | col 4-5 | empty-6
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {aboutCards.map((card, index) => {
            const isBottomLeft = index === 3;   // "Activist"
            const isBottomRight = index === 4;  // "Author & Public Intellectual"

            return (
              <div
                key={card.title}
                className={
                  index < 3
                    ? "lg:col-span-2"
                    : isBottomLeft
                    ? "lg:col-span-2 lg:col-start-2"
                    : "lg:col-span-2"
                }
                style={{
                  borderRadius: "10px",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  background:
                    index % 2 === 0 ? "#FFFFFF" : "rgba(107,78,55,0.06)",
                  border: "1px solid rgba(107,78,55,0.13)",
                  boxShadow: "0 2px 14px rgba(28,18,10,0.05)",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "2rem",
                    height: "1px",
                    background: "#C4A46B",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.05rem",
                    color: "#1E1612",
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.855rem",
                    color: "#5A4535",
                    lineHeight: 1.8,
                  }}
                >
                  {card.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
