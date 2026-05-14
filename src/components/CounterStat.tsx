"use client";

import { useEffect, useRef, useState } from "react";

interface CounterStatProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export default function CounterStat({ end, suffix = "", prefix = "", label, duration = 2000 }: CounterStatProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-number">
        {prefix}<span>{count}</span><span className="stat-unit">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
