"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Alinha o texto do hero com a posição real da logo no header
  useEffect(() => {
    function syncOffsetWithLogo() {
      const logo = document.querySelector<HTMLElement>("#header-logo");
      if (logo && sectionRef.current) {
        const left = logo.getBoundingClientRect().left;
        sectionRef.current.style.setProperty("--hero-left-offset", `${left}px`);
      }
    }

    syncOffsetWithLogo();
    window.addEventListener("resize", syncOffsetWithLogo);
    return () => window.removeEventListener("resize", syncOffsetWithLogo);
  }, []);

  // Força o autoplay do vídeo de fundo
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Autoplay bloqueado pelo navegador:", err);
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.bgVideo}
        autoPlay
        muted
        loop
        playsInline
        poster="/hero3.png"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Um abraço em <br />
            <span className={styles.italic}>forma</span> de sabor.
          </h1>
          <p className={styles.description}>
            No Aruna, a cozinha tropical brasileira <br />
            ganha vida em pratos que celebram <br />
            a nossa terra, o mar e as pessoas.
          </p>
          <div className={styles.actions}>
            <a href="#reserva" className={styles.btnPrimary}>
              Reserve sua mesa ↗
            </a>
            <a href="#restaurante" className={styles.btnSecondary}>
              Conheça o Aruna ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}