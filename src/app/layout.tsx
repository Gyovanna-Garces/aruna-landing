import "./globals.css";
import {Playfair_Display, Montserrat, Cormorant_Garamond, Manrope } from "next/font/google";

const cormorant_garamond = Cormorant_Garamond({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className={`${cormorant_garamond.className} ${manrope.className}`}>
        {children}
      </body>
    </html>
  );
}
