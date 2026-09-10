"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Intro.module.css";

export function Intro() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [morphing, setMorphing] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("aruna-intro-seen");
    if (alreadySeen) {
      setVisible(false);
      return;
    }

    const MIN_DURATION = 3000; // tempo mínimo exibindo a intro, em ms
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(95, (elapsed / MIN_DURATION) * 95);
      setProgress(pct);
      if (elapsed < MIN_DURATION) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    function finish() {
      setProgress(100);
      setTimeout(startMorph, 250);
    }

    if (document.readyState === "complete") {
      setTimeout(finish, MIN_DURATION);
    } else {
      window.addEventListener("load", () => setTimeout(finish, MIN_DURATION));
    }

    function startMorph() {
      const headerLogo = document.querySelector<HTMLElement>("#header-logo");
      const logoEl = logoRef.current;

      if (headerLogo && logoEl) {
        const targetRect = headerLogo.getBoundingClientRect();
        const originRect = logoEl.getBoundingClientRect();

        const scale = targetRect.height / originRect.height;
        const originCenterX = originRect.left + originRect.width / 2;
        const originCenterY = originRect.top + originRect.height / 2;
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        logoEl.style.setProperty("--morph-x", `${targetCenterX - originCenterX}px`);
        logoEl.style.setProperty("--morph-y", `${targetCenterY - originCenterY}px`);
        logoEl.style.setProperty("--morph-scale", `${scale}`);
      }

      setMorphing(true);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("aruna-intro-seen", "true");
      }, 700);
    }

    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.intro} ${morphing ? styles.morphOut : ""}`}>
      <div ref={logoRef} className={styles.logoWrapper}>
        <Image
          src="/logo/logo-full.png"
          alt="Aruna — Cozinha Tropical Brasileira"
          width={280}
          height={300}
          priority
          className={styles.logoImg}
        />
      </div>

      <div className={styles.loadingBar}>
        <div className={styles.loadingFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}