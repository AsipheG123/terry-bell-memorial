"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { mediaItems, memoryCards } from "@/data/media";

const VISIBLE_COUNT = 9;

export default function MediaMemoriesSection() {
  const [showMore, setShowMore] = useState(false);
  // Tracks which memory card IDs have been expanded to show fullBody
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  function toggleCard(id: string) {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const visibleItems = mediaItems.slice(0, VISIBLE_COUNT);
  const moreItems = mediaItems.slice(VISIBLE_COUNT);

  return (
    <section
      id="media-memories"
      style={{
        background: "#F5F0E8",
        padding: "6.5rem 1.5rem 6rem",
      }}
    >
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        <SectionHeader
          label="Media + Memories"
          heading="Photographs and Recollections"
          theme="light"
          bottomSpacing="5.5rem"
        />

        {/* Two-column layout — Photographs + Memories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Photo gallery */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.3rem",
                color: "#1E1612",
                fontWeight: 400,
                marginBottom: "1.5rem",
              }}
            >
              Photographs
            </h3>

            {/* Primary grid — first 9 images */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0.625rem",
              }}
            >
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "7px",
                    aspectRatio: "1 / 1",
                    border: "1px solid rgba(107,78,55,0.13)",
                    background: "#E8E0D0",
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "center top",
                      filter: "sepia(10%) contrast(0.93) brightness(0.97)",
                      transition: "transform 0.4s ease",
                    }}
                    sizes="(max-width: 768px) 33vw, 15vw"
                    className="hover:scale-105"
                  />
                  {/* Caption overlay on hover */}
                  {item.caption && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "0.4rem 0.5rem",
                        background: "rgba(18,10,4,0.6)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        fontSize: "0.65rem",
                        fontFamily: "var(--font-sans)",
                        color: "#F5F0E8",
                        lineHeight: 1.3,
                        backdropFilter: "blur(4px)",
                      }}
                      className="caption-overlay"
                    >
                      {item.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* See More section */}
            {moreItems.length > 0 && (
              <>
                {showMore && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "0.625rem",
                      marginTop: "0.625rem",
                    }}
                  >
                    {moreItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "7px",
                          aspectRatio: "1 / 1",
                          border: "1px solid rgba(107,78,55,0.13)",
                          background: "#E8E0D0",
                        }}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          style={{
                            objectFit: "cover",
                            objectPosition: "center top",
                            filter: "sepia(10%) contrast(0.93) brightness(0.97)",
                            transition: "transform 0.4s ease",
                          }}
                          sizes="(max-width: 768px) 33vw, 15vw"
                          className="hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setShowMore((v) => !v)}
                  style={{
                    marginTop: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: "transparent",
                    border: "1px solid rgba(107,78,55,0.3)",
                    borderRadius: "6px",
                    color: "#6B4E37",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(107,78,55,0.08)";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  {showMore ? "Show less" : "See more"}
                  <span style={{ fontSize: "0.7rem" }}>{showMore ? "▲" : "▼"}</span>
                </button>
              </>
            )}

          </div>

          {/* Memories column */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.3rem",
                color: "#1E1612",
                fontWeight: 400,
                marginBottom: "1.5rem",
              }}
            >
              Memories
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
            {memoryCards.map((card) => {
  const isExpanded = expandedCards.has(card.id);
  const hasMore = Boolean(card.fullBody);
  const isImageCard = Boolean(card.imageSrc);

  return (
    <div
      key={card.id}
      style={{
        borderRadius: "10px",
        padding: "1.5rem",
        background: "#FFFFFF",
        border: "1px solid rgba(107,78,55,0.11)",
        boxShadow: "0 2px 14px rgba(28,18,10,0.05)",
      }}
    >
      <span
        style={{
          display: "block",
          width: "1.5rem",
          height: "1px",
          background: "#C4A46B",
          marginBottom: "0.875rem",
        }}
      />

      {isImageCard ? (
        <>
          <img
            src={card.imageSrc}
            alt={card.imageAlt ?? card.title ?? "Memory image"}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />

          {card.attribution && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                color: "#9B7A56",
                marginTop: "0.875rem",
                marginBottom: 0,
                fontStyle: "italic",
              }}
            >
              — {card.attribution}
            </p>
          )}
        </>
      ) : (
        <>
          {card.title && (
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "0.975rem",
                color: "#3D2B1F",
                fontWeight: 600,
                marginBottom: "0.625rem",
                lineHeight: 1.35,
              }}
            >
              {card.title}
            </h3>
          )}

          {card.body && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.855rem",
                color: "#5A4535",
                lineHeight: 1.82,
                marginBottom: hasMore ? "0.625rem" : card.attribution ? "0.875rem" : "0",
                whiteSpace: "pre-line",
              }}
            >
              {isExpanded && card.fullBody ? card.fullBody : card.body}
            </p>
          )}

          {hasMore && (
            <button
              onClick={() => toggleCard(card.id)}
              style={{
                display: "inline-block",
                background: "transparent",
                border: "none",
                padding: 0,
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                color: "#9B7A56",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                cursor: "pointer",
                marginBottom: card.attribution ? "0.875rem" : "0",
              }}
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}

          {card.attribution && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                color: "#9B7A56",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              — {card.attribution}
            </p>
          )}
        </>
      )}
    </div>
  );
})}
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div
          style={{
            marginTop: "4.5rem",
            paddingTop: "3rem",
            paddingBottom: "0",
            borderTop: "1px solid rgba(107,78,55,0.15)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              color: "#3D2B1F",
              marginBottom: "0.75rem",
              fontWeight: 400,
            }}
          >
            Do you have a memory, photograph, or tribute to share?
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "#7A6A5A",
              lineHeight: 1.7,
              maxWidth: "34rem",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "1.75rem",
            }}
          >
            Contributions from friends, colleagues, and community members help
            build a lasting archive of Terry Bell&apos;s life and legacy.
          </p>
          <a
            href="#public-tributes"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("public-tributes")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              borderRadius: "7px",
              border: "1px solid rgba(107,78,55,0.35)",
              background: "transparent",
              color: "#6B4E37",
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.07em",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseOver={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(107,78,55,0.1)";
            }}
            onMouseOut={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
            }}
          >
            Leave a Tribute &rarr;
          </a>

          {/* Website enquiry */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              color: "#9B8B7B",
              marginTop: "2.25rem",
              lineHeight: 1.6,
            }}
          >
            For website enquiries, please contact{" "}
            <a
              href="mailto:palesa@clarityglobal.net"
              style={{ color: "#6B5040", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              palesa@clarityglobal.net
            </a>
            {" "}and{" "}
            <a
              href="mailto:kgomotso@oneman.co.za"
              style={{ color: "#6B5040", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              kgomotso@oneman.co.za
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
