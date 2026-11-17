"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Conceito.module.css";

import { VerticalCarousel } from "../VerticalCarousel/VerticalCarousel";

export function Conceito() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="restaurante" className={`${styles.conceito} ${
        isVisible ? styles.isVisible : ""
      }`}
    >
      <div className={`container ${styles.conceitoContainer}`}>
        <div className={styles.content}>

          <div className={styles.eyebrow}>
            <span>Conceito</span>
            <span className={styles.line} />
          </div>

          <h2 className={styles.title}>
            O encontro do
            <br />
            amanhecer, do mar
            <br />
            e dos sabores do Brasil.
          </h2>

          <p className={styles.text}>
            O Aruna nasce da união entre a luz do amanhecer,
            <br />
            as águas salgadas e os ingredientes brasileiros
            <br />
            mais frescos. É sobre encontros, sobre acolhimento
            <br />
            e sobre viver bons momentos à mesa.
          </p>

        </div>

        <VerticalCarousel />

      </div>
    </section>
  );
}