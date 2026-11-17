import styles from "./CTA.module.css";

export function CTA() {
  return (
    <section className={styles.cta}>
      <div className={`container ${styles.CTAContainer}`}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Bom apetite!</span>

          <h2>Sua mesa está esperando por você.</h2>

          <p>
            Faça sua reserva e venha viver essa experiência de perto.
          </p>
        </div>

        <div className={styles.reservationOptions}>
          <label className={styles.field}>
            <span>Data</span>
            <input type="date" />
          </label>

          <label className={styles.field}>
            <span>Horário</span>
            <select defaultValue="">
              <option value="" disabled>
                Escolha
              </option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
            </select>
          </label>

          <label className={styles.field}>
            <span>Pessoas</span>
            <select defaultValue="">
              <option value="" disabled>
                Escolha
              </option>
              <option value="2">2 pessoas</option>
              <option value="3">3 pessoas</option>
              <option value="4">4 pessoas</option>
              <option value="5">5 pessoas</option>
              <option value="6">6 pessoas</option>
            </select>
          </label>
        </div>

        <a href="#reserva" className={styles.button}>
          Reserve sua mesa ↗
        </a>
      </div>
    </section>
  );
}