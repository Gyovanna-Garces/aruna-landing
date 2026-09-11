"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./VerticalCarousel.module.css";

const columnA = ["/uniforme.jpeg", "/fachada.jpeg", "/embalagem_2.jpeg"];
const columnB = ["/uniforme.jpeg", "/fachada.jpeg", "/embalagem.jpeg"];

export function VerticalCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          observer.disconnect(); // já disparou, não precisa mais observar
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={`${styles.column} ${playing ? styles.playUp : ""}`}>
        {[...columnA, ...columnA].map((src, i) => (
          <div key={i} className={styles.thumb}>
            <Image src={src} alt="" fill sizes="220px" />
          </div>
        ))}
      </div>

      <div className={`${styles.column} ${styles.columnReverse} ${playing ? styles.playDown : ""}`}>
        {[...columnB, ...columnB].map((src, i) => (
          <div key={i} className={styles.thumb}>
            <Image src={src} alt="" fill sizes="220px" />
          </div>
        ))}
      </div>
    </div>
  );
}