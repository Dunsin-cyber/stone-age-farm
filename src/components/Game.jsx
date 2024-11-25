"use client";
import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import PaymentHandler from "./PaymentHandler";
import {
  ProgressBar,
  ProgressRoot,
  ProgressValueText,
} from "@/components/ui/progress";

function BoxMove() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "build/build.loader.js",
    dataUrl: "build/build.data",
    frameworkUrl: "build/build.framework.js",
    codeUrl: "build/build.wasm",
  });

  const [showPaymentHandler, setShowPaymentHandler] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(""); // Store the URL to load in the iframe

  const loadingPercentage = Math.round(loadingProgression * 100);

  useEffect(() => {
    // Define the global `openPaymentPageInApp` function
    window.openPaymentPageInApp = function (url) {
      console.log("Received payment URL from Unity:", url);
      setPaymentUrl(url); // Set the payment URL
      setShowPaymentHandler(true); // Show the PaymentHandler overlay
    };

    return () => {
      // Clean up the global function when the component unmounts
      delete window.openPaymentPageInApp;
    };
  }, []);

  const closePaymentPage = () => {
    setShowPaymentHandler(false); // Hide the PaymentHandler overlay
    setPaymentUrl(""); // Reset the URL
  };

  return (
    <div className=" w-full h-screen">
      {isLoaded === false && (
        <div className="flex flex-col justify-center space-y-6 items-center top-[40vh]">
          <div>initial load might take a while...</div>
          <ProgressRoot defaultValue={loadingPercentage} w={"200px"}>
            <ProgressBar />
            <ProgressValueText>{loadingPercentage}%</ProgressValueText>
          </ProgressRoot>
        </div>
      )}

      {/* Unity Game */}
      <Unity
        style={{ width: "100%", height: "90%" }}
        unityProvider={unityProvider}
      />

      {/* PaymentHandler Overlay */}
      {showPaymentHandler && (
        <div className="absolute top-0 left-0 w-full h-[90%] bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <PaymentHandler paymentUrl={paymentUrl} onClose={closePaymentPage} />
        </div>
      )}
    </div>
  );
}

export default BoxMove;
