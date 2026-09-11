import { Metadata } from 'next';
import { Hero } from '@/components/Hero/Hero';
import { Conceito } from '@/components/Conceito/Conceito';


export const metadata: Metadata = {
  title: 'Aruna - Cozinha Tropical Brasileira',
  description: 'O melhor restaurante tropical',
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Conceito />
      
    </div>
  )

}