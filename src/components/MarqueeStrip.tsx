"use client";

interface MarqueeStripProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  dark?: boolean;
}

export default function MarqueeStrip({ items, direction = "left", speed = 28, dark = false }: MarqueeStripProps) {
  // Repeat items 4 times to ensure it fills the screen and loops seamlessly
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className="marquee-outer"
      style={{
        background: dark ? "#001a15" : "transparent",
        borderColor: dark ? "rgba(255,255,255,0.06)" : undefined,
      }}
    >
      <div
        className="marquee-track"
        style={{
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationDuration: `${speed}s`,
        }}
      >
        {repeatedItems.map((item, i) => (
          <span key={i} className="marquee-item" style={{ color: dark ? "rgba(255,255,255,0.6)" : undefined }}>
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
