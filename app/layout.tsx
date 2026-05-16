import "./globals.css";

import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Antichità il Chiostro",
  description:
    "Antiquariato, modernariato, arte, illuminazione e oggetti selezionati.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-stone-50 text-stone-950 antialiased">
        {children}
      </body>
    </html>
  );
}
}