"use client";

import Image from "next/image";
import styles from "./VerticalCarousel.module.css";

const columnA = [
  "/uniforme.jpeg",
  "/fachada.jpeg",
  "/embalagem_2.jpeg",
];

const columnB = [
  "/uniforme.jpeg",
  "/fachada.jpeg",
  "/embalagem.jpeg",
];

export function VerticalCarousel() {
  return (
    <div className={styles.wrapper}>

      {/* COLUNA DA ESQUERDA */}
      <div className={styles.column}>
        <div className={`${styles.track} ${styles.playUp}`}>

          {/* Primeiro conjunto */}
          <div className={styles.group}>
            {columnA.map((src, i) => (
              <div key={i} className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="220px"
                />
              </div>
            ))}
          </div>

          {/* Cópia do conjunto para criar o loop */}
          <div className={styles.group} aria-hidden="true">
            {columnA.map((src, i) => (
              <div key={i} className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="220px"
                />
              </div>
            ))}
          </div>

        </div>
      </div>


      {/* COLUNA DA DIREITA */}
      <div className={`${styles.column} ${styles.columnReverse}`}>
        <div className={`${styles.track} ${styles.playDown}`}>

          {/* Primeiro conjunto */}
          <div className={styles.group}>
            {columnB.map((src, i) => (
              <div key={i} className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="220px"
                />
              </div>
            ))}
          </div>

          {/* Cópia do conjunto para criar o loop */}
          <div className={styles.group} aria-hidden="true">
            {columnB.map((src, i) => (
              <div key={i} className={styles.thumb}>
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="220px"
                />
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}