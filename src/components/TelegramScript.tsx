// components/TelegramScript.tsx
"use client";

import { useEffect } from "react";

if (typeof window !== "undefined" && window.Telegram) {
  window.Telegram.WebApp.ready();
}

const TelegramScript = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      if (typeof window !== "undefined" && window.Telegram) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
      }
    };
    document.head.appendChild(script);

    // Cleanup script on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default TelegramScript;
