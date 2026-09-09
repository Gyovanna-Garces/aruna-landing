import { Metadata } from 'next';
import {Header} from "@/components/Header/Header";

export const metadata: Metadata = {
  title: 'Aruna - Cozinha Tropical Brasileira',
  description: 'O melhor restaurante tropical',
}

export default function Home() {
  return (
    <div>
      <p>Bem-vindo ao nosso restaurante!</p>
    </div>
  )

}