import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Vrushali Saraswat | Happiness Holistic Clinic",
  description:
    "Doctor by Profession. Healer by Choice. Helping accomplished professionals master emotional well-being, purpose, and happiness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
