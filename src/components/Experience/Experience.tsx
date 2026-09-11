import styles from "./Experience.module.css";
import { CoverflowCarousel } from "../CoverflowCarousel/CoverflowCarousel";

const experiencePhotos = [
  { src: "/restaurante.jpg", alt: "Ambiente do Aruna" },
  { src: "/bebidas.jpg", alt: "Prato Aruna" },
  { src: "/interno.jpg", alt: "Detalhe da mesa" },
  { src: "/deck.jpg", alt: "Equipe Aruna" },
  { src: "/lomdo de namorado grelhado.png", alt: "Fachada Aruna" },
];

export function Experience() {
  return (
    <section id="experiencia" className={styles.experience}>
      <div className={styles.header}>
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
          para despertar os sentidos e criar memórias  <br /> especiais.
        </p>
      </div>

      <CoverflowCarousel items={experiencePhotos} />
    </section>
  );
}