import "./globals.css";
import {Playfair_Display, Montserrat} from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.className} ${montserrat.className}`}>
        {children}
      </body>
    </html>
  );
}
