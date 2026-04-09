'use client';

import { useEffect, useRef, RefObject } from 'react';
import styles from './FlowField.module.css';

const PARTICLE_COUNT = 60;
const SPEED = 2.2;
const NOISE_SCALE = 0.0032;
const TRAIL_OPACITY = 0.05;
const FADE_AMOUNT = 0.005;
// Soft gradient band outside the text zone (pixels)
const ZONE_GRADIENT = 80;
// Active drawing for ~15 seconds at 60fps, then stops
const DECAY_FRAMES = 900;
const OPACITY_FLOOR = 0;
// Fade in from 0 to full over ~1.5 seconds at 60fps
const BUILD_FRAMES = 90;
// terracotta: #b85a30 = rgb(184, 90, 48)
const COLOR = '184, 90, 48';

interface Particle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
}

interface Zone {
  x: number;
  y: number;
  w: number;
  h: number;
}

function flowAngle(x: number, y: number, t: number): number {
  const n =
    Math.sin(x * 1.3 + Math.sin(y * 0.8 + t * 0.6)) *
    Math.cos(y * 1.1 + Math.sin(x * 0.9 + t * 0.4)) +
    Math.sin(x * 0.5 + y * 0.7 + t * 0.25) * 0.4;
  return n * Math.PI * 2.4;
}

// Returns 0 if inside zone, 0-1 gradient in the ZONE_GRADIENT band, 1 outside
function zoneAlphaFactor(x: number, y: number, zone: Zone | null): number {
  if (!zone) return 1;
  const dx = Math.max(zone.x - x, 0, x - (zone.x + zone.w));
  const dy = Math.max(zone.y - y, 0, y - (zone.y + zone.h));
  if (dx === 0 && dy === 0) return 0;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return Math.min(dist / ZONE_GRADIENT, 1);
}

function inZone(x: number, y: number, zone: Zone | null): boolean {
  if (!zone) return false;
  return x >= zone.x && x <= zone.x + zone.w && y >= zone.y && y <= zone.y + zone.h;
}

function spawn(width: number, height: number, zone: Zone | null): Particle {
  let x: number;
  let y: number;
  let attempts = 0;
  do {
    x = Math.random() * width;
    y = Math.random() * height;
    attempts++;
  } while (inZone(x, y, zone) && attempts < 20);
  return {
    x,
    y,
    life: 0,
    maxLife: 120 + Math.random() * 220,
  };
}

interface FlowFieldProps {
  avoidRef?: RefObject<HTMLDivElement | null>;
}

export function FlowField({ avoidRef }: FlowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId: number;
    let t = 0;
    let frame = 0;
    let mouseInfluenceX = 0;
    let mouseInfluenceY = 0;
    let zone: Zone | null = null;
    let canvasRect = { left: 0, top: 0 };

    const updateZone = () => {
      if (!avoidRef?.current) {
        zone = null;
        return;
      }
      const innerRect = avoidRef.current.getBoundingClientRect();
      zone = {
        x: innerRect.left - canvasRect.left,
        y: innerRect.top - canvasRect.top,
        w: innerRect.width,
        h: innerRect.height,
      };
    };

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvasRect = canvas.getBoundingClientRect();
      updateZone();
    };

    const particles: Particle[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouseInfluenceX = ((e.clientX - canvasRect.left) / width - 0.5) * 0.0008;
      mouseInfluenceY = ((e.clientY - canvasRect.top) / height - 0.5) * 0.0008;
    };

    ctx.strokeStyle = `rgb(${COLOR})`;
    ctx.lineWidth = 1.3;
    ctx.lineCap = 'round';

    const draw = () => {
      t += 0.0018;
      frame++;

      const sessionOpacity = Math.max(OPACITY_FLOOR, 1 - frame / DECAY_FRAMES);
      const buildOpacity = Math.min(1, frame / BUILD_FRAMES);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = FADE_AMOUNT;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      for (const p of particles) {
        const nx = p.x * NOISE_SCALE + mouseInfluenceX * p.x;
        const ny = p.y * NOISE_SCALE + mouseInfluenceY * p.y;
        const angle = flowAngle(nx, ny, t);
        const px = p.x;
        const py = p.y;
        p.x += Math.cos(angle) * SPEED;
        p.y += Math.sin(angle) * SPEED;
        p.life++;

        const zoneFactor = zoneAlphaFactor(p.x, p.y, zone);

        if (
          p.life >= p.maxLife ||
          p.x < -2 || p.x > width + 2 ||
          p.y < -2 || p.y > height + 2 ||
          zoneFactor === 0
        ) {
          Object.assign(p, spawn(width, height, zone));
          continue;
        }

        const lifeFraction = p.life / p.maxLife;
        const alpha =
          Math.sin(lifeFraction * Math.PI) *
          TRAIL_OPACITY *
          sessionOpacity *
          buildOpacity *
          zoneFactor;

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      rafId = requestAnimationFrame(draw);
    };

    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = spawn(width, height, zone);
      p.life = Math.floor(Math.random() * p.maxLife * 0.6);
      particles.push(p);
    }
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [avoidRef]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
