import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eilya | Frontend Developer & Next.js Specialist",
  description: "Eilya Mirzaei Portfolio - Expert in Next.js, React, TypeScript, GSAP Animation | سایت شخصی ایلیا | Eilya Personal Website",
  keywords: [
    "ایلیا میرزایی",
    "Eilya Mirzaei",
    "سایت ایلیا",
    "Eilya site",
    "Eilya portfolio",
    "پورتفولیو ایلیا",
    "فرانت اند دولوپر",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "توسعه دهنده نکست جی اس",
    "Eilya",
    "ایلیا",
  ],
  authors: [{ name: "Eilya Mirzaei" }],
  creator: "Eilya Mirzaei",
  publisher: "Eilya Mirzaei",
  alternates: {
    canonical: "https://Eilya.me",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: "en_US",
    url: "https://Eilya.me",
    title: "ایلیا میرزایی | Eilya Mirzaei - Frontend Developer",
    description: "پورتفولیوی ایلیا میرزایی - متخصص Next.js، React و TypeScript | Portfolio of Eilya Mirzaei - Next.js & React Expert",
    siteName: "Eilya Mirzaei Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "ایلیا میرزایی | Eilya Mirzaei",
    description: "Frontend Developer | Next.js Expert | React Developer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
    icons: {
    icon: '/favicon.png',
   },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
