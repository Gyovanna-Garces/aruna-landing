"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className={styles.hero}>
      <Image
        src="/hero2.png"
        alt="Prato gastronômico Aruna"
        fill
        priority
        sizes="100vw"
        className={styles.bgImage}
      />
      <div className={styles.overlay} />

      <Image
        src="/logo/logo.svg"
        alt=""
        width={56}
        height={56}
        className={styles.sunDecor}
        aria-hidden="true"
      />

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