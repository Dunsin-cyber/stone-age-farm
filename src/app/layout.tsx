import type { Metadata } from "next";
import "./globals.css";
import TelegramScript from "@/components/TelegramScript";
import { Provider } from "@/components/ui/provider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "StoneAge Farm",
  description: "A Web3 farming game set in the Stone Age",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <Provider>
        <head>
          {/* Ensure this is inside the <head> for external scripts */}
         
        </head>
        <body>
          {/* Load Telegram WebApp Script */}
          <TelegramScript />

          {children}
        </body>
      </Provider>
    </html>
  );
}
