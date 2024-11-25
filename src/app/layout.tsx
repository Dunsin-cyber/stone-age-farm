import type { Metadata } from "next";
import "./globals.css";
import TelegramScript from "@/components/TelegramScript";
import { Provider } from "@/components/ui/provider";


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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.openPaymentPageInApp = function(paymentUrl) {
                // Handle opening the payment page in the iframe or popup
                const iframe = document.createElement("iframe");
                iframe.src = paymentUrl;
                iframe.style.width = "100%";
                iframe.style.height = "500px";
                iframe.frameBorder = "0";
                document.body.appendChild(iframe);

                // Optionally handle events like success or failure
                // window.addEventListener("message", function (event) {
                //   if (event.origin !== window.location.origin) {
                //     return;
                //   }

                //   });
                };
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

// // Handle payment status message (e.g., success or failure)
// const paymentStatus = event.data;
// if (paymentStatus === "success") {
//   alert("Payment was successful!");
// } else {
//   alert("Payment failed.");
// }
