"use client";
import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import * as fcl from "@onflow/fcl";
import {
  ProgressBar,
  ProgressRoot,
  ProgressValueText,
} from "@/components/ui/progress";
// import flowJSON from "../../flow.json"
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

// FCL Configuration
fcl
  .config({
    "flow.network": "testnet",
    "app.detail.title": "Stone Age Farm",
    "accessNode.api": "https://rest-testnet.onflow.org",
    "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
    "app.detail.icon":
      "https://stone-age-farm.vercel.app/rsz_stone-age-logo.png",
    // "accessNode.api": "http://localhost:8888",
    // "discovery.wallet": "http://localhost:8701/fcl/authn", // Local Dev Wallet
  })

function BoxMove() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: injected(),
  });
  const { disconnect } = useDisconnect();

  const login = () => {
    if (!isConnected) {
      connect();
    }
  };

  const logout = () => {
    disconnect();
  };


  const { unityProvider, isLoaded, loadingProgression, sendMessage } =
    useUnityContext({
      loaderUrl: "build/build.loader.js",
      dataUrl: "build/build.data",
      frameworkUrl: "build/build.framework.js",
      codeUrl: "build/build.wasm",
    });

  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    setLoadingPercentage(Math.round(loadingProgression * 100));
  }, [loadingProgression]);

  // ✅ Register `createAccount` after Unity loads
  useEffect(() => {
    if (isLoaded) {
      console.log("Unity Loaded - Registering createAccount");

      window.createAccount = async () => {
        try {
    
          document.getElementById("wallet-connect-button")?.click();
      //  login();

          if (window.unityInstance) {
            window.unityInstance.SendMessage("Flow", "OnCreateAccountSuccessful", currentUser.addr);
          }
          else {
            console.error("Unity instance not found!");
          }
        } catch (error) {
          if (window.unityInstance) {
            console.error("Transaction Error:", error);
            window.unityInstance.SendMessage(
              "Flow",
              "OnTransactionFailure",
              error.message
            );
          }
          else {
            console.error("Unity instance not found!");
          }
          // sendMessage("Flow", "OnTransactionFailure", error.message);
        }
      };

      window.mintPlot = async () => {
        try {
          document.getElementById("wallet-connect-button")?.click();

      // sendMessage("Flow", "OnMintPlotSuccess", "Plot minted successfully");
        } catch (error) {
          console.error("Transaction Error:", error);
          sendMessage("Flow", "OnTransactionFailure", error.message);
        }
      };

      window.transferPlot = async (plotID, recipient) => {
        try {

          sendMessage(
            "Flow",
            "OnTransactionSuccess",
            "Plot transferred successfully"
          );
        } catch (error) {
          console.error("Transaction Error:", error);
          sendMessage("Flow", "OnTransactionFailure", error.message);
        }
      };

      window.getUserAccount = async () => {
        try {

          sendMessage("Flow", "OnAccountData", param);
          console.log(result);
        } catch (error) {
          console.error("Transaction Error:", error);

          sendMessage("Flow", "OnTransactionFailure", error.message);
        }
      };

      window.getMyCollection = async () => {
        const currentUser = await fcl.currentUser.snapshot();
        console.log("Transaction ID:", transactionId);

        try {
         
        
          sendMessage("Flow", "OnAccountData", param);
        } catch (error) {
          console.error("Transaction Error:", error);

          sendMessage("Flow", "OnTransactionFailure", error.message);
        }
      };
    }
  }, [isLoaded, sendMessage]);

  return (
    <div className="w-full h-screen">
      {!isLoaded && (
        <div className="flex flex-col justify-center space-y-6 items-center pt-[40vh]">
          <div>Initial load might take a while...</div>
          <ProgressRoot value={loadingPercentage} w={"200px"}>
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
      <button id="wallet-connect-button" onClick={login} style={{ display: "none" }}>Connect</button>
    </div>
  );
}

export default BoxMove;
