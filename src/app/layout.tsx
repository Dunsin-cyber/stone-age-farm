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
          <Script
            async
            src="https://unpkg.com/@tonconnect/ui@latest/dist/tonconnect-ui.min.js"
            strategy="beforeInteractive"
          />
          {/* Inline TonConnectUI Initialization Script */}
          <Script
            id="tonconnect-ui-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
                manifestUrl: "https://stone-age-farm.vercel.app/tonconnect-manifest.json",
                buttonRootId: "ton-connect"
              });

              async function connectToWallet() {
                const connectedWallet = await tonConnectUI.connectWallet();
                // Do something with connectedWallet if needed
                console.log(connectedWallet);
              }

              connectToWallet().catch(error => {
                console.error("Error connecting to wallet:", error);
              });
              `,
            }}
          />
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
