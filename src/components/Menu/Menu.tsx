"use client";

import Image from "next/image";
import { pratos } from "@/components/Sabores/pratos";
import styles from "./Menu.module.css";

// Agrupa os pratos existentes (pratos.ts) por categoria, preservando a ordem
// em que aparecem no arquivo de dados.
function agruparPorCategoria() {
  const ordem: string[] = [];
  const grupos: Record<string, typeof pratos> = {};

  pratos.forEach((prato) => {
    if (!grupos[prato.categoria]) {
      grupos[prato.categoria] = [];
      ordem.push(prato.categoria);
    }
    grupos[prato.categoria].push(prato);
  });

  return ordem.map((categoria) => ({ categoria, itens: grupos[categoria] }));
}

export function Menu() {
  const categorias = agruparPorCategoria();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-tag">Cardápio</span>
          <h1 className={styles.title}>Sabores do Aruna</h1>
          <p className={styles.subtitle}>
            Uma seleção viva, que acompanha as estações. Os pratos abaixo
            representam o espírito da nossa cozinha — a composição exata do
            cardápio pode variar conforme a disponibilidade de ingredientes.
          </p>
        </div>
      </section>

      {categorias.map(({ categoria, itens }, catIndex) => (
        <section
          key={categoria}
          className={`${styles.categoria} ${
            catIndex % 2 === 1 ? styles.invertido : ""
          }`}
        >
          <div className={`container ${styles.categoriaGrid}`}>
            <div className={styles.categoriaLabel}>
              <span className={styles.numero}>
                {String(catIndex + 1).padStart(2, "0")}
              </span>
              <h2 className={styles.categoriaTitulo}>{categoria}</h2>
            </div>

            <div className={styles.pratosLista}>
              {itens.map((prato, i) => (
                <article key={prato.nome} className={styles.pratoItem}>
                  <div className={styles.pratoImagemWrap}>
                    <Image
                      src={prato.imagem}
                      alt={prato.nome}
                      fill
                      sizes="(max-width: 768px) 90vw, 420px"
                      className={styles.pratoImagem}
                    />
                  </div>
                  <div className={styles.pratoTexto}>
                    <h3 className={styles.pratoNome}>{prato.nome}</h3>
                    <p className={styles.pratoDescricao}>{prato.descricao}</p>
                    <span className={styles.pratoSazonalidade}>
                      {prato.sazonalidade}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className={styles.avisoFinal}>
        <div className="container">
          <p>
            Os pratos e preços podem sofrer alteração conforme a estação e a
            disponibilidade de ingredientes frescos. Fale com a nossa equipe
            para o cardápio completo do dia.
          </p>
          <a href="/reserva" className="btn btn-coral">
            Reserve sua mesa
          </a>
        </div>
      </section>
    </main>
  );
}
