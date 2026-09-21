"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header"
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={`container ${styles.headerContainer}`}>
        <a href="/" id="header-logo" className={styles.logoContainer}>
          <Image
            src="/logo/logo.svg"
            alt="Símbolo Aruna"
            width={75}
            height={75}
            priority
          />

          <Image
            src="/logo/logo-letter-icon.svg"
            alt="Restaurante Aruna"
            width={169}
            height={75}
            priority
          />
        </a>

        <nav
          className={`${styles.menu} ${
            menuOpen ? styles.menuOpen : ""
          }`}
        >
          <a
            href="#restaurante"
            className={styles.menuLink}
            onClick={() => setMenuOpen(false)}
          >
            O Aruna
          </a>

          <a
            href="#menu"
            className={styles.menuLink}
            onClick={() => setMenuOpen(false)}
          >
            Sabores
          </a>

          <a
            href="#galeria"
            className={styles.menuLink}
            onClick={() => setMenuOpen(false)}
          >
            Galeria
          </a>

          <a
            href="#contato"
            className={styles.menuLink}
            onClick={() => setMenuOpen(false)}
          >
            Contato
          </a>

          <a
            href="#reserva"
            className={styles.mobileReserve}
            onClick={() => setMenuOpen(false)}
          >
            Reserve sua mesa ↗
          </a>
        </nav>

        <a href="#reserva" className={styles.btnReserve}>
          Reserve sua mesa ↗
        </a>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}