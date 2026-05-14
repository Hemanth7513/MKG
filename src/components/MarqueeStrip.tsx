"use client";

interface MarqueeStripProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  dark?: boolean;
}

export default function MarqueeStrip({ items, direction = "left", speed = 28, dark = false }: MarqueeStripProps) {
  const doubled = [...items, ...items]; // duplicate for seamless loop

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
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item" style={{ color: dark ? "rgba(255,255,255,0.6)" : undefined }}>
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
