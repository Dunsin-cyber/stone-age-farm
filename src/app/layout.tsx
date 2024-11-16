import type { Metadata } from "next";
import "./globals.css";
import TelegramScript from "@/components/TelegramScript";

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
      <body>
        {/* Load Telegram WebApp Script */}
        <TelegramScript />
        {children}
      </body>
    </html>
  );
}
