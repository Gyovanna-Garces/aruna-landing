import { Metadata } from 'next';
import { Hero } from '@/components/Hero/Hero';

export const metadata: Metadata = {
  title: 'Aruna - Cozinha Tropical Brasileira',
  description: 'O melhor restaurante tropical',
}

export default function Home() {
  return (
    <div>
      <Hero />
    </div>
  )

}