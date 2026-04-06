import { useEffect, useRef } from "react";

interface HeroLinesProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export default function HeroLines({ containerRef }: HeroLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mouse state with smoothed position for fluid feel
    const mouse = { x: -2000, y: -2000, vx: 0, vy: 0 };
    const smoothMouse = { x: -2000, y: -2000 };
    let animationId: number;
    let time = 0;

    // ── Config ────────────────────────────────────────────────────────────────
    const LINE_COUNT = 48;
    const INFLUENCE_RADIUS = 280; // px
    const WAVE_STRENGTH = 32;     // max vertical displacement
    const WAVE_FREQ = 0.018;      // spatial frequency of the wave
    const WAVE_SPEED = 4.5;       // how fast the wave travels outward
    const AMBIENT_AMP = 1.2;      // very gentle resting undulation
    const STEP = 3;               // canvas x step in px (lower = smoother)

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.offsetWidth * dpr;
      canvas.height = container.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.vx = x - mouse.x;
      mouse.vy = y - mouse.y;
      mouse.x = x;
      mouse.y = y;
    };

    const onMouseLeave = () => {
      // Park the influence off-screen; lines return to rest naturally
      mouse.x = -2000;
      mouse.y = -2000;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    // ── Draw loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Smooth mouse position (exponential ease toward real position)
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;

      const lineSpacing = h / (LINE_COUNT + 1);

      for (let i = 0; i < LINE_COUNT; i++) {
        const t = i / (LINE_COUNT - 1); // 0 → 1 top to bottom
        const baseY = lineSpacing * (i + 1);

        // ── Color: dark navy palette, subtle gradient top→bottom ──
        // Background is hsl(240,29%,5%). Lines range from card (~12%) to border (~22%)
        const lightness = 10 + t * 14;          // 10 % → 24 %
        const saturation = 38 + t * 10;          // 38 % → 48 %
        const hue = 237 - t * 4;                 // 237 → 233
        const opacity = 0.25 + t * 0.55;         // fades in from top

        const lineWidth = t < 0.25
          ? 0.5
          : t < 0.55
          ? 0.85
          : t < 0.8
          ? 1.2
          : 1.6;

        ctx.beginPath();

        for (let x = 0; x <= w; x += STEP) {
          const dx = x - smoothMouse.x;
          const dy = baseY - smoothMouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Ambient slow undulation (unique phase per line)
          const ambient =
            Math.sin(x * 0.006 + time * 0.4 + i * 0.38) * AMBIENT_AMP +
            Math.sin(x * 0.003 + time * 0.25 + i * 0.19) * AMBIENT_AMP * 0.5;

          // Mouse wave
          let hover = 0;
          if (dist < INFLUENCE_RADIUS) {
            const norm = 1 - dist / INFLUENCE_RADIUS;
            // Smooth-step for a more organic falloff
            const falloff = norm * norm * (3 - 2 * norm);
            // Outward-propagating ring wave
            hover =
              Math.sin(dist * WAVE_FREQ - time * WAVE_SPEED) *
              WAVE_STRENGTH *
              falloff;
          }

          const y = baseY + ambient + hover;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      time += 0.016;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
