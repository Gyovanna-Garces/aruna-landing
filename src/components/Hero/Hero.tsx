"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Parallax: o vídeo desce mais devagar que a rolagem, só enquanto o Hero está visível
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;

      if (videoRef.current && scrolled <= window.innerHeight * 1.2) {
        videoRef.current.style.transform = `translateY(${scrolled * 0.35}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // theme-dark (global): texto em areia, botão outline herda a cor, hover do outline claro
    <section className={`theme-dark ${styles.hero}`}>
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

      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Um Abraço em <br />
            forma de <span className={styles.italic}>Sabor.</span>
          </h1>

          <p className={styles.description}>
            No Aruna, a cozinha tropical brasileira ganha vida em
            <br className={styles.brDesktop} />{" "}
            pratos que celebram a nossa terra, o mar e as pessoas.
          </p>

          <div className={styles.actions}>
            {/* Botões vêm do global: .btn + variante */}
            <a href="#reserva" className="btn btn-terracota">
              Reserve sua mesa →
            </a>
            <a href="#cardapio" className="btn btn-outline">
              Ver Cardápio →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}