import type { Metadata } from "next";
import localFont from "next/font/local";
import PortfolioLayout from "../components/PortfolioLayout";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const jetBrainsMono = localFont({
  src: "./fonts/JetBrainsMonoNLNerdFontMono-Regular.ttf",
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Izhar Octafirlian Susilo | CS Portfolio",
  description:
    "Computer Science student building practical software across AI, web applications, and interactive systems.",
  icons: {
    icon: "/profile/logo.jpg",
    shortcut: "/profile/logo.jpg",
    apple: "/profile/logo.jpg"
  },
  openGraph: {
    title: "Izhar Octafirlian Susilo | CS Portfolio",
    description:
      "Portfolio for internship opportunities across AI, web applications, and interactive systems.",
    url: "/",
    siteName: "Izhar Octafirlian Susilo",
    images: [
      {
        url: "/profile/logo.jpg",
        width: 1024,
        height: 1086,
        alt: "Izhar Octafirlian Susilo logo"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Izhar Octafirlian Susilo | CS Portfolio",
    description:
      "Computer Science student building practical software across AI, web applications, and interactive systems.",
    images: ["/profile/logo.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.variable}>
        <PortfolioLayout>{children}</PortfolioLayout>
      </body>
    </html>
  );
}
