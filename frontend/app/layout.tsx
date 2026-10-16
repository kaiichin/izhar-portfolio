import type { Metadata } from "next";
import localFont from "next/font/local";
import PortfolioLayout from "../components/PortfolioLayout";
import { profile, ui } from "../data/portfolio";
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
  title: ui.metadata.title,
  description: ui.metadata.description,
  icons: {
    icon: profile.logoPath,
    shortcut: profile.logoPath,
    apple: profile.logoPath
  },
  openGraph: {
    title: ui.metadata.title,
    description: ui.metadata.socialDescription,
    url: "/",
    siteName: profile.name,
    images: [
      {
        url: profile.logoPath,
        width: 1024,
        height: 1086,
        alt: ui.metadata.logoAlt
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: ui.metadata.title,
    description: ui.metadata.description,
    images: [profile.logoPath]
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
