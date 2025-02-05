"use client"; // Ensure this runs only in the browser

import { useEffect } from "react";

export default function UnityBridgeLoader() {
  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   import("../../public/unityBridge").then(() => {
    //     console.log("Unity bridge loaded.");
    //   });
    // }
  }, []);

  return null;
}
