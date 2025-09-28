import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dahii's Portfolio",
  description: "A collection of projects by Daniel Mellera",
};

export const dynamic = "force-static";
export const locales = ["en", "es"] as const;

type Props = Readonly<{
  children: React.ReactNode;
  params: { locale: (typeof locales)[number] };
}>;

export function generateStaticParams() {
  return (locales as readonly string[]).map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = params;

  if (!locales.includes(locale)) {
    notFound();
  }

  // Load messages for the current locale
  let messages: any;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Global language switcher in the top-right */}
        <div className="fixed top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>
        <Providers locale={locale} messages={messages}>{children}</Providers>
      </body>
    </html>
  );
}
