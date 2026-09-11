import Image from "next/image";

import {
  FiMapPin,
  FiClock,
  FiMail,
} from "react-icons/fi";

import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Informações principais */}
        <div className={styles.infoGrid}>

          {/* Localização */}
          <div className={styles.infoBlock}>
            <div className={styles.infoIcon}>
              <FiMapPin />
            </div>

            <div className={styles.infoContent}>
              <span className={styles.label}>
                Onde estamos
              </span>

              <strong>
                Endereço do restaurante
              </strong>

              <span>
                Rua Santa Clara, 36
                <br />
                Condomínio do Edifício Brooklyn
                <br />
                Rio de Janeiro - RJ
              </span>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Rua+Santa+Clara%2C+36%2C+Condom%C3%ADnio+do+Edif%C3%ADcio+Brooklyn%2C+Rio+de+Janeiro+-+RJ"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.action}
              >
                Ver no mapa 
              </a>
            </div>
          </div>

          {/* Horário */}
          <div className={styles.infoBlock}>
            
            <div className={styles.infoIcon}>
              <FiClock />
            </div>

            <div className={styles.infoContent}>
              <span className={styles.label}>
                Horários de funcionamento
              </span>

              <strong>
                Segunda a domingo
              </strong>

              <span>
                Horário de funcionamento
              </span>

              <a href="#" className={styles.action}>
                Ver mais
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className={styles.infoBlock}>
            <div className={styles.infoIcon}>
              <FiMail />
            </div>

            <div className={styles.infoContent}>
              <span className={styles.label}>
                Fale com a gente
              </span>

              <a href="mailto:contato@aruna.com.br">
                contato@aruna.com.br
              </a>

              <span className={styles.socialLabel}>
                Siga nossas redes
              </span>

              <div className={styles.socials}>
                <a href="#" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="#" aria-label="TikTok">
                  <FaTiktok />
                </a>
                <a href="#" aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps?q=Rua%20Santa%20Clara%2C%2036%2C%20Condom%C3%ADnio%20do%20Edif%C3%ADcio%20Brooklyn%2C%20Rio%20de%20Janeiro%20-%20RJ&output=embed"
              loading="lazy"
              title="Localização do restaurante Aruna"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        {/* Parte inferior */}
        <div className={styles.footerBottom}>

          <div className={styles.logo}>
            <Image
              src="/logo/logo-full.png"
              alt="Restaurante Aruna"
              width={169}
              height={75}
            />
          </div>

          <nav className={styles.navigation}>
            <a href="#restaurante">O Aruna</a>
            <span>|</span>

            <a href="#experiencia">Experiência</a>
            <span>|</span>

            <a href="#menu">Sabores</a>
            <span>|</span>

            <a href="#galeria">Galeria</a>
            <span>|</span>

            <a href="#contato">Contato</a>
          </nav>

          <div className={styles.slogan}>
            <span>
              Um abraço em forma de sabor.
            </span>

            <Image
              src="/logo/logo-aruna-icon-coral.svg"
              alt=""
              width={32}
              height={32}
              className={styles.sloganIcon}
            />
          </div>
        </div>

        <div className={styles.copyright}>
          © 2026 Aruna | Todos os direitos reservados.
        </div>

      </div>
    </footer>
  );
}