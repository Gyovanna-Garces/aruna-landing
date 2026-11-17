"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Experience.module.css";

import { CoverflowCarousel } from "../CoverflowCarousel/CoverflowCarousel";

const experiencePhotos = [
  { src: "/Estrutura/Interno_2.jpg", alt: "Ambiente do Aruna" },
  { src: "/bebidas/Bebidas.jpg", alt: "Bebida" },
  { src: "/Estrutura/Interno_1.jpg", alt: "Detalhe da mesa" },
  { src: "/Estrutura/Deck.jpg", alt: "Equipe Aruna" },
  { src: "/Estrutura/Fachada.jpeg", alt: "Fachada Aruna" },
  { src: "/pratos/Prato principal/Lombo_1.png", alt: "Prato Pincipal" },
  { src: "/bebidas/Bebida_1.jpg", alt: "Bebida" },
  { src: "/pratos/Massa/Ravioli_2.jpg", alt: "Massa" },
];

export function Experience() {
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
    <section
      ref={sectionRef}
      id="experience"
      className={`${styles.experience} ${
        isVisible ? styles.isVisible : ""
      }`}
    >
      <div className={`container ${styles.header}`}>
        <div className={styles.eyebrow}>
          <span>Experiência</span>
          <span className={styles.line} />
        </div>

        <h2 className={styles.title}>
          Mais que uma refeição,
          <br />
          uma vivência.
        </h2>

        <p className={styles.text}>
          Do ambiente acolhedor à apresentação
          <br />
          de cada prato, tudo no Aruna é pensado
          <br />
          para despertar os sentidos e criar memórias
          <br />
          especiais.
        </p>
      </div>
      <CoverflowCarousel items={experiencePhotos} />
      <div className={styles.actions}>
          <a className={styles.btnSecondary}> Ver Galeria ↗</a>
        </div>
    </section>
  );
}