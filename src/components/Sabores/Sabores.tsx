'use client'
import styles from './Sabores.module.css'
import { useState, WheelEvent, KeyboardEvent } from 'react'

// Tipagem da estrutura dos pratos
interface Prato {
  id: number
  imagem: string
  alt: string
}

// Lista de pratos para alternar
const PRATOS: Prato[] = [
  {
    id: 1,
    imagem: '/ravioli2.jpg',
    alt: 'Prato 1 - Ravioli Especial'
  },
  {
    id: 2,
    imagem: '/ravioli.jpg', // Corrigida a extensão de .jpgg para .jpg
    alt: 'Prato 2 - Ravioli Tradicional'
  },
  {
    id: 3,
    imagem: '/sopa.png',
    alt: 'Prato 3 - Sopa Especial'
  }
]

export function Sabores() {
  const [index, setIndex] = useState<number>(0)
  const [animacao, setAnimacao] = useState<string>('')
  const [bloqueado, setBloqueado] = useState<boolean>(false)

  const pratoAtual = PRATOS[index]

  // Função centralizadora da troca com animação
  const trocarPrato = (proximoIndex: number, direcao: 'proximo' | 'anterior') => {
    if (bloqueado) return
    setBloqueado(true)

    // 1. Aplica a classe de saída no CSS
    setAnimacao(direcao === 'proximo' ? styles.saindo : styles.saindoReverso)

    setTimeout(() => {
      // 2. Atualiza a imagem ativa
      setIndex(proximoIndex)

      // 3. Posiciona a nova imagem para entrar
      setAnimacao(direcao === 'proximo' ? styles.entrando : styles.entrandoReverso)

      // 4. Limpa as classes para concluir a transição
      setTimeout(() => {
        setAnimacao('')
        setBloqueado(false)
      }, 50)
    }, 400) // 400ms sincronizado com a transição do CSS
  }

  const proximo = () => {
    const proximoIndex = (index + 1) % PRATOS.length
    trocarPrato(proximoIndex, 'proximo')
  }

  const anterior = () => {
    const proximoIndex = (index - 1 + PRATOS.length) % PRATOS.length
    trocarPrato(proximoIndex, 'anterior')
  }

  // Evento de Scroll do mouse sobre o container da imagem
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      proximo()
    } else {
      anterior()
    }
  }

  // Evento de Teclas (setas direcionais)
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') proximo()
    if (e.key === 'ArrowLeft') anterior()
  }

  return (
    <section id="menu" className={styles.sabores}>
      <div className={styles.container}>
        
        {/* Coluna 1: Textos (FIXA) */}
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span>Sabores</span>
            <span className={styles.line} />
          </div>
          <h2 className={styles.title}>
            Tropical, brasileiro,
            <br />
            inesquecível.
          </h2>
          <p className={styles.text}>
            Nossos pratos são uma celebração da
            <br />
            nossa terra, do mar e da criatividade da
            <br />
            nossa cozinha. Ingredientes frescos e
            <br />
            técnicas inovadoras se unem para criar
          </p>
        </div>

        {/* Coluna 2: Prato com Animação Dinâmica */}
        
        <div className={styles.pratoWrapper}>
          <div
            className={styles.pratoContainer}
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            tabIndex={0} // Permite interagir usando as setas do teclado ao clicar/focar no elemento
          >
            <img
              src={pratoAtual.imagem}
              alt={pratoAtual.alt}
              className={`${styles.pratoImagem} ${animacao}`}
            />
            
          </div>
          {/* Controles para clicar e testar a transição */}
            <div className={styles.controles}>
                <button onClick={anterior} disabled={bloqueado} aria-label="Voltar prato">
                ←
                </button>
                <button onClick={proximo} disabled={bloqueado} aria-label="Avançar prato">
                →
                </button>
            </div>
        </div>

      </div>
    </section>
  )
}