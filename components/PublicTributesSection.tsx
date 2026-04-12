"use client";

import { useState, useRef, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import { ApprovedTribute } from "@/data/approvedTributes";
import { publicTributes } from "@/data/publicTributes";

const INPUT_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(196,164,107,0.2)",
  borderRadius: "7px",
  color: "#E0D4BF",
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  padding: "11px 14px",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.67rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#C4A46B",
  display: "block",
  marginBottom: "0.45rem",
};

// Number of tribute cards shown before the "See more" toggle
const INITIAL_VISIBLE = 3;

export default function PublicTributesSection() {
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [tributeSubmitting, setTributeSubmitting] = useState(false);
  const [tributeSubmitOk, setTributeSubmitOk] = useState(false);
  const [tributeSubmitErr, setTributeSubmitErr] = useState(false);

  async function handleTributeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    setTributeSubmitErr(false);
    setTributeSubmitOk(false);
    setTributeSubmitting(true);
  
    const form = e.currentTarget;
    const formData = new FormData(form);
  
    try {
      const res = await fetch("/api/tribute-submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setTributeSubmitOk(true);
        form.reset();
        setFileName("");
        fetch("/api/tributes", { cache: "no-store" })
          .then((r) => r.json())
          .then((data: ApprovedTribute[]) => setTributes(data))
          .catch(() => {});
      } else {
        setTributeSubmitErr(true);
      }
    } catch {
      setTributeSubmitErr(true);
    } finally {
      setTributeSubmitting(false);
    }
  }

  // Tributes from /api/tributes (Netlify Forms verified submissions)
  const [tributes, setTributes] = useState<ApprovedTribute[]>([]);
  const [tributesLoading, setTributesLoading] = useState(true);
  const [showAllTributes, setShowAllTributes] = useState(false);

  useEffect(() => {
    fetch("/api/tributes", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: ApprovedTribute[]) => setTributes(data))
      .catch(() => setTributes([]))
      .finally(() => setTributesLoading(false));
  }, []);

  const visibleTributes = showAllTributes
    ? tributes
    : tributes.slice(0, INITIAL_VISIBLE);
  const hiddenCount = tributes.length - INITIAL_VISIBLE;

  return (
    <>
    <section
      id="public-tributes"
      style={{
        position: "relative",
        padding: "7rem 1.5rem 7rem",
        borderTop: "1px solid rgba(196,164,107,0.07)",
        overflow: "hidden",
      }}
    >
      {/* Background image — terry-5 (warm garden gathering) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/terry-5.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "grayscale(85%) brightness(0.22) contrast(0.78)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(20,12,6,0.80) 0%, rgba(35,23,16,0.74) 100%)",
          zIndex: 1,
        }}
      />
      <div style={{ maxWidth: "64rem", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SectionHeader
          label="Public Tributes"
          heading="Share a memory or tribute"
          theme="dark"
          bottomSpacing="5rem"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Submission form */}
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
                fontSize: "1.45rem",
                color: "#F5F0E8",
                fontWeight: 400,
                marginBottom: "0.5rem",
              }}
            >
              Leave a Tribute
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                color: "#8A7A6A",
                marginBottom: "1.875rem",
                lineHeight: 1.6,
              }}
            >
              Share a tribute or memory
            </p>

            <form
              name="tribute"
              method="POST"
              data-netlify="true"
              encType="multipart/form-data"
              onSubmit={handleTributeSubmit}
            >
              <input type="hidden" name="form-name" value="tribute" />

                {/* Name + Relationship row */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  style={{ marginBottom: "1.25rem" }}
                >
                  <div>
                    <label htmlFor="tribute-name" style={LABEL_STYLE}>
                      Your Name *
                    </label>
                    <input
                      id="tribute-name"
                      type="text"
                      name="name"
                      required
                      style={INPUT_STYLE}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="tribute-relationship" style={LABEL_STYLE}>
                      Relationship
                    </label>
                    <input
                      id="tribute-relationship"
                      type="text"
                      name="relationship"
                      style={INPUT_STYLE}
                      placeholder="e.g. Friend, Colleague"
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label htmlFor="tribute-email" style={LABEL_STYLE}>
                    Your Email *
                  </label>
                  <input
                    id="tribute-email"
                    type="email"
                    name="email"
                    required
                    style={INPUT_STYLE}
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <label htmlFor="tribute-message" style={LABEL_STYLE}>
                    Your Message *
                  </label>
                  <textarea
                    id="tribute-message"
                    name="message"
                    rows={5}
                    required
                    style={{ ...INPUT_STYLE, resize: "vertical" }}
                    placeholder="Share a memory, reflection, or tribute…"
                  />
                </div>

                {/* Photo upload */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    style={{
                      background: "rgba(196,164,107,0.1)",
                      border: "1px solid rgba(196,164,107,0.22)",
                      borderRadius: "7px",
                      color: "#C4A46B",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.82rem",
                      padding: "9px 16px",
                      cursor: "pointer",
                      transition: "opacity 0.2s",
                    }}
                  >
                    {fileName
                      ? `Attached: ${fileName}`
                      : "Attach a Photo (optional)"}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    name="photo"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setFileName(e.target.files?.[0]?.name ?? "")
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={tributeSubmitting}
                  style={{
                    width: "100%",
                    padding: "0.825rem",
                    borderRadius: "7px",
                    background: "#C4A46B",
                    color: "#1E1612",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.07em",
                    border: "none",
                    cursor: tributeSubmitting ? "wait" : "pointer",
                    transition: "opacity 0.2s",
                    opacity: tributeSubmitting ? 0.75 : 1,
                  }}
                >
                  {tributeSubmitting ? "Sending…" : "Submit Tribute"}
                </button>

                {tributeSubmitOk && (
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.82rem",
                      color: "#B8AA90",
                      lineHeight: 1.65,
                      marginTop: "1rem",
                      marginBottom: 0,
                    }}
                  >
                    Thank you. Your tribute has been received and will be reviewed
                    before it may appear on this page.
                  </p>
                )}
                {tributeSubmitErr && (
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.82rem",
                      color: "#C4A46B",
                      lineHeight: 1.65,
                      marginTop: "1rem",
                      marginBottom: 0,
                    }}
                  >
                    Something went wrong. Please try again in a moment.
                  </p>
                )}
            </form>
          </div>

          {/* Approved tributes column — source: /api/tributes (Netlify Forms) */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.3rem",
                  color: "#F5F0E8",
                  fontWeight: 400,
                }}
              >
                Approved Tributes
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.7rem",
                  color: "#8A7A6A",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(196,164,107,0.1)",
                  letterSpacing: "0.04em",
                }}
              >
                Family reviewed
              </span>
            </div>

            {tributesLoading ? (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "#6A5A4A",
                  lineHeight: 1.75,
                  padding: "1.5rem",
                }}
              >
                Loading tributes…
              </p>
            ) : tributes.length > 0 ? (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {visibleTributes.map((tribute: ApprovedTribute) => (
                    <TributeCard key={tribute.id} tribute={tribute} />
                  ))}
                </div>

                {/* See more / See less toggle */}
                {hiddenCount > 0 && (
                  <button
                    onClick={() => setShowAllTributes((v) => !v)}
                    style={{
                      marginTop: "1.25rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      background: "transparent",
                      border: "1px solid rgba(196,164,107,0.3)",
                      borderRadius: "6px",
                      color: "#C4A46B",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                      padding: "0.5rem 1.1rem",
                      cursor: "pointer",
                      transition: "background 0.2s, color 0.2s",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(196,164,107,0.1)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                    }}
                  >
                    {showAllTributes
                      ? "See less"
                      : "See more"}
                    <span style={{ fontSize: "0.65rem" }}>
                      {showAllTributes ? "▲" : "▼"}
                    </span>
                  </button>
                )}
              </>
            ) : (
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "#8A7A6A",
                  lineHeight: 1.75,
                  padding: "1.5rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(196,164,107,0.1)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                Submitted tributes will appear here once they have been reviewed
                and approved.
              </p>
            )}
          </div>
        </div>

      </div>
    </section>

    {/* ── Tributes & Remembrances — own section, own background ────────── */}
    <section
      id="tributes-remembrances"
      style={{
        position: "relative",
        padding: "6rem 1.5rem 6.5rem",
        overflow: "hidden",
        borderTop: "1px solid rgba(196,164,107,0.08)",
      }}
    >
      {/* Background — terry-11 (large warm gathering) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/terry-11.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          filter: "grayscale(40%) brightness(0.40) contrast(0.85)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(18,10,4,0.66) 0%, rgba(28,18,12,0.58) 100%)",
          zIndex: 1,
        }}
      />
      <div style={{ maxWidth: "64rem", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.68rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C4A46B",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Tributes &amp; Remembrances
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "#F5F0E8",
              fontWeight: 400,
              textAlign: "center",
              marginBottom: "0.75rem",
              lineHeight: 1.2,
            }}
          >
            Words from colleagues, friends, and the public
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "#B8AA90",
              textAlign: "center",
              lineHeight: 1.7,
              maxWidth: "40rem",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "3rem",
            }}
          >
            Tributes have poured in from across the media, labour, and civil society communities.
            A selection is shared here.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 28rem), 1fr))",
              gap: "1.25rem",
            }}
          >
            {publicTributes.map((tribute) => (
              <div
                key={tribute.id}
                style={{
                  borderRadius: "10px",
                  padding: "1.625rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(196,164,107,0.15)",
                  boxShadow: "0 2px 14px rgba(0,0,0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "0.5rem", flexWrap: "wrap" }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#E0D4BF" }}>
                      {tribute.source}
                    </span>
                    {tribute.sourceDetail && (
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.74rem", color: "#9B8B7B", marginLeft: "0.4rem" }}>
                        — {tribute.sourceDetail}
                      </span>
                    )}
                  </div>
                  {tribute.date && (
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "#8A7A6A", whiteSpace: "nowrap" }}>
                      {tribute.date}
                    </span>
                  )}
                </div>
                <span style={{ display: "block", width: "1.5rem", height: "1px", background: "#C4A46B" }} />
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#C0B39A", lineHeight: 1.8, flex: 1 }}>
                  {tribute.excerpt}
                </p>
                {tribute.url && (
                  <a
                    href={tribute.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "#C4A46B", textDecoration: "underline", textUnderlineOffset: "3px", alignSelf: "flex-start" }}
                  >
                    Read full tribute &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
    </section>
    </>
  );
}

function TributeCard({ tribute }: { tribute: ApprovedTribute }) {
  return (
    <div
      style={{
        borderRadius: "10px",
        padding: "1.25rem 1.375rem",
        display: "flex",
        gap: "1rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(196,164,107,0.11)",
      }}
    >
      {/* Avatar initial */}
      <div
        style={{
          flexShrink: 0,
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: "rgba(196,164,107,0.16)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-serif)",
          fontSize: "0.95rem",
          color: "#C4A46B",
        }}
      >
        {tribute.initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: "0.4rem 0.5rem",
            marginBottom: "0.6rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "#E0D4BF",
              fontWeight: 500,
            }}
          >
            {tribute.name}
          </span>
          {tribute.relationship && (
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                color: "#8A7A6A",
              }}
            >
              &bull; {tribute.relationship}
            </span>
          )}
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.855rem",
            color: "#B8AA90",
            lineHeight: 1.75,
          }}
        >
          {tribute.message}
        </p>
      </div>
    </div>
  );
}
