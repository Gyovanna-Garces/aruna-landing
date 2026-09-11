"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./CoverflowCarousel.module.css";

interface CarouselItem {
  src: string;
  alt: string;
}

export function CoverflowCarousel({ items }: { items: CarouselItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const displayItems =
    items.length < 6 ? [...items, ...items, ...items] : items;
  const N = displayItems.length;

  const state = useRef({
    offset: 0,
    isDragging: false,
    startX: 0,
    startOffset: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    itemWidth: 380,
    gap: 24,
    isMoved: false,
  });

  const animFrame = useRef<number | null>(null);

  const updateDimensions = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    state.current.itemWidth = isMobile ? 260 : 380;
    state.current.gap = isMobile ? 16 : 24;
  }, []);

  const render = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { itemWidth, gap, offset } = state.current;
    const stride = itemWidth + gap;
    const totalWidth = N * stride;
    const halfTotal = totalWidth / 2;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;

      const rawPos = i * stride + offset;
      let dist = ((rawPos % totalWidth) + totalWidth) % totalWidth;
      if (dist >= halfTotal) {
        dist -= totalWidth;
      }

      const norm = dist / (container.clientWidth / 2 || 1);
      const absNorm = Math.min(Math.abs(norm), 1.5);

      const scale = 1 - absNorm * 0.12;
      const rotateY = -norm * 22;
      const opacity = 1 - absNorm * 0.35;
      const zIndex = Math.round((1 - absNorm) * 100);

      el.style.transform = `translate3d(${dist}px, -50%, 0) rotateY(${rotateY}deg) scale(${scale})`;
      el.style.opacity = `${opacity}`;
      el.style.zIndex = `${zIndex}`;
    });
  }, [N]);

  const tick = useCallback(() => {
    const s = state.current;

    if (!s.isDragging) {
      if (Math.abs(s.velocity) > 0.1) {
        s.offset += s.velocity;
        s.velocity *= 0.92;
      } else {
        s.velocity = 0;
        const stride = s.itemWidth + s.gap;
        const nearestIndex = Math.round(-s.offset / stride);
        const snapTarget = -nearestIndex * stride;

        s.offset += (snapTarget - s.offset) * 0.14;
      }
    }

    render();
    animFrame.current = requestAnimationFrame(tick);
  }, [render]);

  useEffect(() => {
    updateDimensions();

    const stride = state.current.itemWidth + state.current.gap;
    const initialIndex = Math.floor(N / 2);
    state.current.offset = -initialIndex * stride;

    animFrame.current = requestAnimationFrame(tick);

    const handleResize = () => {
      updateDimensions();
      render();
    };

    // ⌨️ Evento para navegar pelas teclas de seta
    const handleKeyDown = (e: KeyboardEvent) => {
      const s = state.current;
      const itemStride = s.itemWidth + s.gap;

      if (e.key === "ArrowRight") {
        s.offset -= itemStride;
        s.velocity = 0;
      } else if (e.key === "ArrowLeft") {
        s.offset += itemStride;
        s.velocity = 0;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [N, tick, render, updateDimensions]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;

    const s = state.current;
    s.isDragging = true;
    s.startX = e.clientX;
    s.startOffset = s.offset;
    s.lastX = e.clientX;
    s.lastTime = performance.now();
    s.velocity = 0;
    s.isMoved = false;

    if (containerRef.current) {
      containerRef.current.classList.add(styles.isDragging);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.isDragging) return;

    const now = performance.now();
    const dt = now - s.lastTime;
    const dx = e.clientX - s.startX;

    if (Math.abs(dx) > 5) s.isMoved = true;

    s.offset = s.startOffset + dx;

    if (dt > 0) {
      const stepDx = e.clientX - s.lastX;
      s.velocity = (stepDx / dt) * 16;
      s.lastX = e.clientX;
      s.lastTime = now;
    }
  };

  const handlePointerUp = () => {
    const s = state.current;
    s.isDragging = false;
    if (containerRef.current) {
      containerRef.current.classList.remove(styles.isDragging);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    const s = state.current;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    s.offset -= delta * 0.7;
    s.velocity = -delta * 0.15;
  };

  const handleItemClick = (index: number) => {
    const s = state.current;
    if (s.isMoved) return;

    const stride = s.itemWidth + s.gap;
    const totalWidth = N * stride;
    const halfTotal = totalWidth / 2;

    const rawPos = index * stride + s.offset;
    let dist = ((rawPos % totalWidth) + totalWidth) % totalWidth;
    if (dist >= halfTotal) dist -= totalWidth;

    s.offset -= dist;
    s.velocity = 0;
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
    >
      {displayItems.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className={styles.item}
          onClick={() => handleItemClick(i)}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 260px, 380px"
            draggable={false}
            priority={i < 5}
          />
        </div>
      ))}
    </div>
  );
}