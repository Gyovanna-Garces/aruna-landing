import styles from "./Conceito.module.css";
import  {VerticalCarousel}  from "../VerticalCarousel/VerticalCarousel";

export function Conceito() {
  return (
    <section id="conceito" className={styles.conceito}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span>Conceito</span>
            <span className={styles.line} />
          </div>

          <h2 className={styles.title}>
            O encontro do 
            <br />
            amanhecer, do mar
            <br />
            e dos sabores do Brasil.
          </h2>

          <p className={styles.text}>
            O Aruna nasce da união entre a luz do amanhecer,
            <br />
            as águas salgadas e os ingredientes brasileiros
            <br />
            mais frescos. É sobre encontros, sobre acolhimento
            <br />
            e sobre viver bons momentos à mesa.
          </p>
        </div>
        <VerticalCarousel />
      </div>
    </section>
  );
}