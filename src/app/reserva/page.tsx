import { Metadata } from "next";
import { Reservation } from "@/components/Reservation/Reservation";

export const metadata: Metadata = {
  title: "Reserve sua mesa - Aruna",
  description: "Escolha data, horário e mesa no salão do Aruna.",
};

export default function ReservaPage() {
  return <Reservation />;
}