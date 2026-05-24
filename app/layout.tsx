import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Divyam Jain — Software Developer",
  description: "Full Stack Developer with 5+ years experience in PHP, Laravel, Django, Python & React. Open to opportunities in Ontario & Remote.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
