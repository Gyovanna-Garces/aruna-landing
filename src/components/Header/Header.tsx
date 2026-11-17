"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";


const LOGO = {
  top: {
    symbol: "/logo/logo-terracota.svg",
    letters: "/logo/logo-letter-icon-terracota.svg",
  },
  scrolled: {
    symbol: "/logo/logo.svg",
    letters: "/logo/logo-letter-icon.svg",
  },
};

// Ordem e textos do Figma. Conferir os hrefs (ver observações).
const NAV_LINKS = [
  { label: "Cardápio", href: "/menu" },
  { label: "O Aruna", href: "/#restaurante" },
  { label: "Nossa Cozinha", href: "/#sabor" },
  { label: "Galeria", href: "/#galeria" },
  { label: "Contato", href: "/#contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logo = scrolled ? LOGO.scrolled : LOGO.top;

  // Botão do header: terracota no topo, petróleo no fosco (global: .btn + variante)
  const reserveVariant = scrolled ? "btn-petroleum" : "btn-terracota";

  return (
    <header
      id="header"
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={`container ${styles.headerContainer}`}>
        <a href="/" id="header-logo" className={styles.logoContainer}>
          <Image
            src={logo.symbol}
            alt="Símbolo Aruna"
            width={44}
            height={44}
            priority
          />

          <Image
            src={logo.letters}
            alt="Restaurante Aruna"
            width={163}
            height={44}
            priority
          />
        </a>

        <nav className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.menuLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {/* Aparece só dentro do menu mobile (sempre sobre o painel areia) */}
          <a
            href="/reserva"
            className={`btn btn-petroleum ${styles.mobileReserve}`}
            onClick={() => setMenuOpen(false)}
          >
            Reserve sua mesa →
          </a>
        </nav>

        {/* Botão do desktop (escondido no mobile) */}
        <a
          href="/reserva"
          className={`btn ${reserveVariant} ${styles.btnReserve}`}
        >
          Reserve sua mesa →
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
