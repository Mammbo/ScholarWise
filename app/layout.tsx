import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotestk = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: "ScholarSearch",
  description: "Track scholarships effortlessly and manage your applications while applying to scholarships for your finnacial future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-10x1 mx-auto">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
