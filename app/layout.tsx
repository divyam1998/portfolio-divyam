import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Divyam Jain — Software Developer",
  description: "Software Developer with 5+ years experience in PHP, Laravel, Django, Python & React. Open to full-time roles in Ontario & Remote.",
  keywords: ["Software Developer", "PHP", "Laravel", "Django", "Python", "React", "Full Stack", "Ontario", "Canada", "Remote"],
  authors: [{ name: "Divyam Jain" }],
  openGraph: {
    title: "Divyam Jain — Software Developer",
    description: "5+ years building scalable backend systems. Open to Ontario & remote roles.",
    url: "https://portfolio-divyam.vercel.app",
    siteName: "Divyam Jain Portfolio",
    type: "website",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Divyam Jain — Software Developer",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyam Jain — Software Developer",
    description: "5+ years building scalable backend systems. Open to Ontario & remote roles.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet"/>
        {/* Google Analytics — replace G-XXXXXXXXXX with your actual ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"/>
        <script dangerouslySetInnerHTML={{__html:`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}}/>
      </head>
      <body>{children}</body>
    </html>
  );
}
