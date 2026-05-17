"use client";

import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
  origX: number;
  origY: number;
  vx: number;
  vy: number;
}

interface ElasticDotGridProps {
  theme: "light" | "dark";
}

export function ElasticDotGrid({ theme }: ElasticDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const spacing = 24;
    const padding = 100;
    const cols = Math.ceil((dimensions.width + padding * 2) / spacing);
    const rows = Math.ceil((dimensions.height + padding * 2) / spacing);

    const points: Point[] = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = -padding + i * spacing;
        const y = -padding + j * spacing;
        points.push({ x, y, origX: x, origY: y, vx: 0, vy: 0 });
      }
    }
    pointsRef.current = points;
  }, [dimensions]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastScrollY = window.scrollY;

    const MOUSE_RADIUS = 120;
    const MOUSE_REPEL = 0.6;
    const SPRING = 0.08;
    const FRICTION = 0.8;
    const SPACING = 24;

    const render = () => {
      if (dimensions.width === 0 || dimensions.height === 0) return;

      const currentScrollY = window.scrollY;
      const deltaScroll = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      pointsRef.current.forEach((p) => {
        p.origY -= deltaScroll;
        p.y -= deltaScroll;

        const maxOut = 100;
        if (p.origY < -maxOut) {
          p.origY += (Math.ceil(dimensions.height / SPACING) + 4) * SPACING;
          p.y = p.origY;
          p.vy = 0;
        } else if (p.origY > dimensions.height + maxOut) {
          p.origY -= (Math.ceil(dimensions.height / SPACING) + 4) * SPACING;
          p.y = p.origY;
          p.vy = 0;
        }
      });

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      ctx.fillStyle =
        theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.12)";

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      pointsRef.current.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx -= (dx / dist) * force * MOUSE_REPEL;
          p.vy -= (dy / dist) * force * MOUSE_REPEL;
        }

        p.vx += (p.origX - p.x) * SPRING;
        p.vy += (p.origY - p.y) * SPRING;

        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, theme]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full block"
      />
    </div>
  );
}
