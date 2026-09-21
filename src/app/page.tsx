import { Metadata } from 'next';
import { Hero } from '@/components/Hero/Hero';
import { Conceito } from '@/components/Conceito/Conceito';
import { Experience } from '@/components/Experience/Experience';
import  Sabores  from '@/components/Sabores/Sabores';
import { Banner } from '@/components/Banner/Banner';



export const metadata: Metadata = {
  title: 'Aruna - Cozinha Tropical Brasileira',
  description: 'O melhor restaurante tropical',
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Conceito />
      <Experience />
      <Sabores />
      <Banner />
    </div>
  )

}