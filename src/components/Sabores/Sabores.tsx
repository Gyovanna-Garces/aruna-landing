"use client";

/*Bloco 1: Importações*/

import Image from "next/image";
import { useEffect, useRef, useState } from "react"; 
import type { CSSProperties } from "react";
import { pratos } from "./pratos";
import styles from "./Sabores.module.css";

/*Bloco 2: Declaração do Componente, Referências e Estado*/

export default function Sabores() {
  const openingRef = useRef<HTMLElement>(null);
  const dishesSectionRef = useRef<HTMLElement>(null);
  const dishesTrackRef = useRef<HTMLDivElement>(null);
  const [activeDish, setActiveDish] = useState(0);

/*Bloco 3: Configuração do useEffect e Função Clamp*/

  useEffect(() => {
    const opening = openingRef.current;
    if (!opening) return;
    let frameId: number | null = null;
    const clamp = (value: number, min: number,max: number) => {
      return Math.min(Math.max(value, min), max);
    };

/*Bloco 4: O Coração da Animação (Cálculo de Progresso)*/

    const updateProgress = () => {
      frameId = null;
      const rect = opening.getBoundingClientRect();
      const scrollableDistance = opening.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {return;}

      const progress = clamp(-rect.top / scrollableDistance, 0,1);
      /*A imagem ocupa os primeiros 55% do movimento da abertura. */
      const imageProgress = clamp(progress / 0.55, 0, 1);
      /* O texto entra nos últimos 45%.*/
      const textProgress = clamp((progress - 0.55) / 0.45, 0, 1);
      /*O título aparece junto com a imagem.*/
      const titleProgress = clamp(progress / 0.45, 0, 1);

      opening.style.setProperty("--progress", progress.toString());
      opening.style.setProperty("--image-progress", imageProgress.toString());
      opening.style.setProperty("--text-progress", textProgress.toString());
      opening.style.setProperty("--title-progress", titleProgress.toString());
    };

/*Bloco 5: Otimização de Performance*/

    const requestUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

/*Bloco 6: Ouvintes de Eventos (Event Listeners) e Limpeza*/

    updateProgress();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  /*
   * =========================================================
   * SCROLL DA GALERIA HORIZONTAL
   * =========================================================
   */

/*Bloco 7: Preparação e Função de Segurança*/

  useEffect(() => {
    const section = dishesSectionRef.current;
    const track = dishesTrackRef.current;
    if (!section || !track) {
      return;
    }

    let frameId: number | null = null;

    const clamp = (value: number,min: number, max: number) => {
      return Math.min(Math.max(value, min), max);
    };

/*Bloco 8: Transformando Scroll Vertical em Horizontal*/

    const updateDishes = () => {
      frameId = null;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        return;
      }

      const progress = clamp(-rect.top / scrollableDistance, 0, 1);
      const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
      const translateX = progress * maxTranslate;
      track.style.setProperty("--dish-translate", `${translateX}px`);

      /*
       * =====================================================
       * DESTAQUE DO PRATO MAIS PRÓXIMO DO CENTRO
       * =====================================================
       */

/*Bloco 9: Encontrando o Prato Mais Próximo do Centro*/

      const cards = track.querySelectorAll<HTMLElement>(`.${styles.dish}`);
      const viewportCenter = window.innerWidth / 2;

      let currentActiveIndex = 0;

      let smallestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < smallestDistance) {
           smallestDistance = distance;
           currentActiveIndex = index;
        }

/*Bloco 10: Efeito Visuais (Escala e Opacidade)*/
        
        const normalizedDistance = clamp(distance / window.innerWidth, 0, 1);
        const scale = 1 - normalizedDistance * 0.035;
        const opacity = 1 - normalizedDistance * 0.18;

        card.style.setProperty("--dish-scale", scale.toString());
        card.style.setProperty( "--dish-opacity", opacity.toString());
      });

/*Bloco 11: Atualização Inteligente do Estado (React) - contador de pratos*/
  
      setActiveDish((previous) => {
        if (previous === currentActiveIndex) {
          return previous;
        }
        return currentActiveIndex;
      });
    };

/*Bloco 12: Otimização de Performance e Eventos*/

    const requestUpdate = () => {
      if (frameId !== null) {return;}
      frameId = window.requestAnimationFrame(updateDishes);
    };

    updateDishes();

    window.addEventListener("scroll", requestUpdate, {passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

/*Bloco 13: O Contêiner Principal e a Seção de Sabores*/

  return (
    <section id="menu" className={styles.sabores} aria-label="Sabores do Aruna">
      {/* PRIMEIRA PARTE */}
      <section ref={openingRef} className={styles.opening}>
        <div className = {styles.openingSticky}>

{/*Bloco 14: A Imagem de Fundo e os Textos de Abertura*/}
          <div className = {styles.imageWrapper}>
            <Image src="/praia.avif" alt="Sabores e gastronomia do Aruna"
             fill priority sizes="100vw" className={styles.image}
            />
          </div>

          <div className={styles.overlay}/>

          <h2 className={styles.title}>
            Sabores que nascem <br /> entre o mar e o Brasil.
          </h2>

          <div className={ styles.fluidText} >
            <div className={styles.description}>
              <span className={styles.descriptionLine}/>
              <div className={styles.descriptionContent} >
                <span className={styles.eyebrow}> SABORES </span>
                <p>
                  Ingredientes brasileiros,técnicas cuidadosas e a inspiração das águas que cercam o Aruna.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

{/*Bloco 15: O Início da Galeria e o Contador de Pratos*/}
      {/* SEGUNDA PARTE — GALERIA DE PRATOS */}

      <div className={styles.content}>
        <section ref={dishesSectionRef} className={styles.dishesSection} aria-label="Pratos do Aruna" >
          <div className={styles.dishesSticky}>

            {/* INTRODUÇÃO */}

            <div className={styles.dishesIntro}>
              <span className={styles.dishesIntroLabel}>
                SABORES
              </span>
            </div>

            {/* CONTADOR */}

            <div className={styles.dishesCounter}>
              <span className={styles.dishesCounterCurrent}>
                {String(activeDish + 1).padStart(2, "0")}
              </span>
              <span className={styles.dishesCounterSlash}>/</span>
              <span> 
                {String(pratos.length).padStart(2, "0")}
              </span>
            </div>

{/*Bloco 16: O "Trilho" e a Renderização dos Pratos*/}
            {/*TRACK HORIZONTAL*/}

            <div ref={dishesTrackRef} className={styles.dishesTrack}>
              {pratos.map((prato, index) => ( 
                <article 
                  key={prato.nome}
                  className={styles.dish}
                    style={{
                      "--dish-scale":"1",
                      "--dish-opacity":"1",
                    } as CSSProperties}
                  >

{/*Bloco 17: A Montagem de Cada Prato (Cartão individual)*/}
                    {/* CABEÇALHO */}

                    <div className={styles.dishHeader}>
                      <span className={styles.dishCategory}>{prato.categoria}</span>
                      <span className={styles.dishNumber}>{String(index + 1).padStart(2,"0")}</span>
                    </div>

                    {/* NOME DO PRATO */}
                    <div className={styles.dishInfoLeft}>
                      <span className={styles.dishLabel}>O PRATO</span>
                      <h3>{prato.nome}</h3>
                    </div>

                    {/* IMAGEM */}
                    <div className={styles.dishImageWrapper}>
                      <Image src={prato.imagem} alt={prato.nome} fill sizes="40vw" className={styles.dishImage}/>
                    </div>

                    {/* DESCRIÇÃO */}
                    <div className={styles.dishInfoRight}>
                      <span className={styles.dishLabel}>SABORES</span>
                      <p>{prato.descricao}</p>
                    </div>

                    {/* SAZONALIDADE */}
                    <div className={styles.dishSeason}>
                      <span className={styles.dishLabel}>SAZONALIDADE</span>
                      <span className={styles.dishSeasonValue}>{prato.sazonalidade}</span>
                    </div>
                  </article>
                ))}
            </div>

{/*Bloco 18: O Rodapé da Galeria*/}
            {/* LINHA INFERIOR */}

            <div className={styles.dishesBottomLine}>
              <span>ARUNA · SABORES DO BRASIL</span>
              <span>SCROLL PARA EXPLORAR</span>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}