"use client";

import SectionHeader from "./SectionHeader";
import { memorialService } from "@/data/memorial";

export default function MemorialServiceSection() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `${memorialService.venue}, ${memorialService.address}`
  )}&z=15&output=embed`;
  return (
    <section
      id="memorial-service"
      style={{
        position: "relative",
        padding: "7rem 1.5rem 7rem",
        borderTop: "1px solid rgba(196,164,107,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Background image — terry-3 (contemplative portrait at event) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/terry-3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          filter: "grayscale(50%) brightness(0.45) contrast(0.85)",
          zIndex: 0,
        }}
      />
      {/* Dark overlay to ensure readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(18,10,4,0.64) 0%, rgba(30,22,18,0.56) 100%)",
          zIndex: 1,
        }}
      />
      <div style={{ maxWidth: "64rem", margin: "0 auto", position: "relative", zIndex: 2 }}>
        </div>
        <SectionHeader
          label="Memorial Service"
          heading={memorialService.heading}
          theme="dark"
          bottomSpacing="4rem"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left — service details */}
          <div
            style={{
              borderRadius: "12px",
              padding: "2.25rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(196,164,107,0.14)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                color: "#F5F0E8",
                fontWeight: 400,
                marginBottom: "1.75rem",
              }}
            >
              Service Information
            </h3>

            <dl
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.375rem",
              }}
            >
              {[
                { label: "Date", value: memorialService.date },
                { label: "Time", value: memorialService.time },
                { label: "Venue", value: memorialService.venue },
                { label: "Address", value: memorialService.address },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#C4A46B",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {label}
                  </dt>
                  <dd
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.975rem",
                      color: "#E0D4BF",
                      lineHeight: 1.55,
                    }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              style={{
                marginTop: "1.75rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(196,164,107,0.12)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  color: "#8A7A6A",
                  lineHeight: 1.7,
                  marginBottom: "1.375rem",
                }}
              >
                {memorialService.note}
              </p>
              <a
                href={memorialService.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.7rem 1.625rem",
                  borderRadius: "6px",
                  background: "#C4A46B",
                  color: "#1E1612",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.82")
                }
                onMouseOut={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
                }
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Right — description + stylised map */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Description panel */}
            <div
              style={{
                borderRadius: "12px",
                padding: "2.25rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(196,164,107,0.14)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.3rem",
                  color: "#F5F0E8",
                  fontWeight: 400,
                  marginBottom: "1rem",
                }}
              >
                Remembering together
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.925rem",
                  color: "#C0B39A",
                  lineHeight: 1.85,
                }}
              >
                {memorialService.description}
              </p>
            </div>

            {/* Real map */}
<div
  style={{
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(196,164,107,0.14)",
    height: "180px",
    flexShrink: 0,
  }}
>
  <iframe
    src={mapEmbedUrl}
    title="Memorial service location map"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    style={{
      width: "100%",
      height: "100%",
      border: "0",
      display: "block",
    }}
  />
</div>
</div>
</div>
</section>
    )
  }
