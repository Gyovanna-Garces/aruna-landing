import { Metadata } from "next";
import { Menu } from "@/components/Menu/Menu";

export const metadata: Metadata = {
  title: "Cardápio - Aruna",
  description: "Conheça os sabores do Aruna, cozinha tropical brasileira.",
};

export default function MenuPage() {
  return <Menu />;
}
