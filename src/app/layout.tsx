import type { Metadata } from "next";
import { Outfit, DM_Sans, Playfair_Display } from "next/font/google";
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

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "GROVICE 2.0 | Visakhapatnam's First Business Operating System",
  description:
    "Bridging AI Automation systems & elite Creative Muscle. Custom enterprise software, AI voice agents, premium branding, and cinema production in Visakhapatnam.",
  keywords:
    "GROVICE 2.0, business operating system, AI automation, voice agents, custom software, photography, videography, branding, Vizag, Siripuram, Gajuwaka",
  metadataBase: new URL("http://www.grovice.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} ${playfair.variable} scroll-smooth`}
    >
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        <SmoothScroll>
          <div className="flex flex-col min-h-screen relative overflow-hidden">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <Chatbot />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
