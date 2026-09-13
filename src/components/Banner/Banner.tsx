import styles from './Banner.module.css'

export function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        {/* Ícone superior */}
        <div className={styles.icon}>
          <img src="/logo\logo-aruna-icon-coral.svg" alt="Ícone de Sol" />
        </div>

        {/* Frase central */}
        <h2 className={styles.title}>
          Do primeiro raio de sol <br />
          ao último sabor.
        </h2>

        {/* Linha/Detalhe inferior */}
        <div className={styles.divider}>
          <span className={styles.line}></span>
          <span className={styles.knot}>◆</span>
          <span className={styles.line}></span>
        </div>
      </div>
    </section>
  )
}