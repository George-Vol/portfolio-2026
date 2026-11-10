import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteractiveGrid } from "@/components/InteractiveGrid";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seoTitle, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: site.seoTitle,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.seoTitle }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0d",
};

// Runs before paint: enables reveal animations only when JS is on.
// Dark only for now; light theme returns with: try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}
const boot = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body className="grain flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-[70] rounded-md bg-fg px-3 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <InteractiveGrid />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
