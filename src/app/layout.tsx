import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GROVICE 2.0 | Futuristic Business Operating System",
  description: "Bridging AI Automation systems & elite Creative Muscle. Custom enterprise software, AI voice agents, premium branding, and cinema production in Visakhapatnam.",
  keywords: "GROVICE 2.0, business operating system, AI automation, voice agents, custom software, photography, videography, branding, Vizag, Siripuram, Gajuwaka",
  metadataBase: new URL("http://www.grovice.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-100 bg-[#020914] selection:bg-cyan-500 selection:text-slate-950">
        <SmoothScroll>
          <div className="flex flex-col min-h-screen relative overflow-hidden">
            <Navbar />
            <main className="flex-1 w-full pt-[60px] md:pt-[76px]">
              {children}
            </main>
            <Footer />
            <Chatbot />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}

