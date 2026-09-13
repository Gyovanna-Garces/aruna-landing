'use client'
import styles from './Sabores.module.css'
import { useState, WheelEvent, KeyboardEvent, useEffect, useRef } from 'react'

interface Prato {
  id: number
  categoria: string
  nome: string
  descricao: string
  imagem: string
}

const PRATOS: Prato[] = [
  { id: 1, categoria: 'Entrada', nome: 'Ceviche de Manga', descricao: 'O frescor do mar encontra a doçura tropical da manga.', imagem: '/ravioli.jpg' },
  { id: 2, categoria: 'Prato principal', nome: 'Moqueca de Banana', descricao: 'Tradição baiana com um toque de frescor amazônico.', imagem: '/ravioli2.jpg' },
  { id: 3, categoria: 'Prato principal', nome: 'Polvo do Atlântico', descricao: 'Texturas e sabores que contam o nosso litoral.', imagem: '/lomdo de namorado grelhado.png' },
  { id: 4, categoria: 'Sobremesa', nome: 'Torta de Coco', descricao: 'Doçura e leveza em cada camada.', imagem: '/sopa.png' },
]

// quanto de scroll (em vh) cada prato "consome" dentro da seção pinada
const VH_POR_PRATO = 90

export function Sabores() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [maxTranslate, setMaxTranslate] = useState(0)

   useEffect(() => {
    const medir = () => {
      if (!trackRef.current) return
      const excedente = trackRef.current.scrollWidth - window.innerWidth
      setMaxTranslate(Math.max(excedente, 0))
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])

  // calcula o progresso do scroll dentro da seção
  useEffect(() => {
    let ticking = false

    const atualizar = () => {
      const section = sectionRef.current
      if (!section) return

      const totalScroll = section.offsetHeight - window.innerHeight
      const scrolled = -section.getBoundingClientRect().top
      const p = totalScroll > 0 ? Math.min(Math.max(scrolled / totalScroll, 0), 1) : 0

      setProgress(p)
      setActiveIndex(Math.round(p * (PRATOS.length - 1)))
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(atualizar)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    atualizar()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={styles.sabores}
      style={{ height: `${100 + PRATOS.length * VH_POR_PRATO}vh` }}
    >
      <div className={styles.sticky}>
        <div className={styles.bg} aria-hidden="true" />

        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span>Sabores</span>
            <span className={styles.line} />
          </div>
          <h2 className={styles.title}>
            Tropical, brasileiro,
            <br />
            inesquecível.
          </h2>
        </div>

        <div
          ref={trackRef}
          className={styles.track}
          style={{ transform: `translateX(-${progress * maxTranslate}px)` }}
        >
          {PRATOS.map((prato, i) => (
            <article
              key={prato.id}
              className={`${styles.card} ${i === activeIndex ? styles.cardActive : ''}`}
            >
              <div className={styles.cardImageWrap}>
                <img src={prato.imagem} alt={prato.nome} className={styles.cardImage} />
              </div>
              <span className={styles.cardCategoria}>{prato.categoria}</span>
              <h3 className={styles.cardTitulo}>{prato.nome}</h3>
              <p className={styles.cardDescricao}>{prato.descricao}</p>
            </article>
          ))}
        </div>

        <div className={styles.dots}>
          {PRATOS.map((_, i) => (
            <span key={i} className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`} />
          ))}
        </div>
      </div>
    </section>
  )
}