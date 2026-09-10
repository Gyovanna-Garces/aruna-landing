import { Header } from "@/components/Header/Header";
import "./globals.css";
import {Cormorant_Garamond, Manrope } from "next/font/google";

const cormorant_garamond = Cormorant_Garamond({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className={`${cormorant_garamond.className} ${manrope.className}`}>
        <Header />
        <main>{children}</main>
        
      </body>
    </html>
  );
}
