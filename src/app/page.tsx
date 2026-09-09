import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aruna - Cozinha Tropical Brasileira',
  description: 'O melhor restaurante tropical',
}

export default function Home() {
  return (
    <div>
      <h1>Aruna</h1>
      <p>Bem-vindo ao nosso restaurante!</p>
    </div>
  )

}