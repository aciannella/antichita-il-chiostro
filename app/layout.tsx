import "./globals.css";

import { Playfair_Display, Inter } from "next/font/google";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: absoluteUrl("/hero-antiquariato-reale.jpg"),
        width: 3024,
        height: 4032,
        alt: "Interno antiquario con arredi, dipinti, illuminazione e oggetti d'epoca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/hero-antiquariato-reale.jpg")],
  },
  robots: {
    index: true,
    follow: true,
  },
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
