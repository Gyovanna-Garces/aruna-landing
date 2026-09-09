import Image from "next/image";
import styles from "./Header.module.css"

export function Header() {
    return (
        <header id="header" className={styles.header}>
            <a href="/" className={styles.logoContainer}>
                <Image 
                src="logo/logo.svg" 
                        alt="Símbolo do Restaurante Aruna" 
                        width={75}  
                        height={75} 
                        priority  
                />
                <Image 
                        src="logo/logo-letter-icon.svg"
                        alt="Restaurante Aruna" 
                        width={169}
                        height={75} 
                        priority
                    />
            </a>
            <nav className={styles.menu}>
                <a href="#restaurante" className={styles.menuLink}>O Aruna</a>
                <a href="#experiencia" className={styles.menuLink}>Experiência</a>
                <a href="#menu" className={styles.menuLink}>Sabores</a>
                <a href="#contato" className={styles.menuLink}>Galeria</a>
                <a href="#contato" className={styles.menuLink}>Contato</a>
            </nav>
            <a href="#reserva" className={styles.btnReserve}>
                    Reserve sua mesa  ↗
                </a>
        </header>
    );
}