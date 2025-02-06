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
          console.log("createAcc was called")
          const transactionId = await fcl.mutate({
            cadence: `
            import StoneAge from 0x9870d6da0661d8cf
            transaction {
              prepare(acct: auth(BorrowValue, SaveValue, IssueStorageCapabilityController, PublishCapability) &Account) {
                if acct.storage.borrow<&StoneAge.FarmDetail>(from: StoneAge.AccStoragePath) != nil {
                  panic("This user has an account already!")
                } else {
                  let farmDetail <- StoneAge.CreateAccount()
                  let collection <- StoneAge.createEmptyCollection()
                  acct.storage.save(<-collection, to: StoneAge.CollectionStoragePath)
                  let cap = acct.capabilities.storage.issue<&StoneAge.PlotCollection>(StoneAge.CollectionStoragePath)
                  acct.capabilities.publish(cap, at: StoneAge.CollectionPublicPath)
                  acct.storage.save(<-farmDetail, to: StoneAge.AccStoragePath)
                  let capability = acct.capabilities.storage.issue<&StoneAge.FarmDetail>(StoneAge.AccStoragePath)
                  acct.capabilities.publish(capability, at: /public/AccountNFTPath)
                }
              }
            }
            `,
            proposer: fcl.authz,
            payer: fcl.authz,
            authorizations: [fcl.authz],
            limit: 100,
          });
          const currentUser = await fcl.currentUser.snapshot();
          console.log("Transaction ID:", transactionId);

          // ✅ Use Unity's `sendMessage` to notify game
          // sendMessage("Flow", "OnCreateAccountSuccessful", currentUser.addr);
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
          const transactionId = await fcl.mutate({
            cadence: `
                  import StoneAge from 0x9870d6da0661d8cf
                  transaction(seed: String, stage: String) {
                      let signerRef: &StoneAge.PlotCollection
                      let signerAccRef: &StoneAge.FarmDetail
                      prepare(account: auth(BorrowValue) &Account) {
                          self.signerRef = account.capabilities.borrow<&StoneAge.PlotCollection>(StoneAge.CollectionPublicPath)
                          ?? panic(StoneAge.collectionNotConfiguredError(address: account.address))
      
                          self.signerAccRef = account.capabilities.borrow<&StoneAge.FarmDetail>(StoneAge.AccPublicPath)
                          ?? panic("Could not borrow reference to recipient's FarmDetail")
      
                          if self.signerAccRef.balance < 500 {
                              panic("Recipient does not have enough coins to purchase the plot.")
                          }
                      }
                      execute {
                          let newPlot <- StoneAge.mintPlot(seed: seed, stage: stage)
                          self.signerAccRef.deductLandPurchaseCharge()
                          self.signerRef.deposit(plot: <-newPlot)
                      }
                  }
                  `,
            args: (arg, t) => [arg("1", t.String), arg("1", t.String)],
            proposer: fcl.authz,
            payer: fcl.authz,
            authorizations: [fcl.authz],
            limit: 100,
          });

          console.log("Transaction ID:", transactionId);
          sendMessage("Flow", "OnMintPlotSuccess", "Plot minted successfully");
        } catch (error) {
          console.error("Transaction Error:", error);
          sendMessage("Flow", "OnTransactionFailure", error.message);
        }
      };

      window.transferPlot = async (plotID, recipient) => {
        try {
          const transactionId = await fcl.mutate({
            cadence: `
                  import StoneAge from 0x9870d6da0661d8cf
                  transaction(plotID: UInt64, recipient: Address) {
                      let senderFarmRef :  &StoneAge.FarmDetail
                      let recipientFarmRef :  &StoneAge.FarmDetail
                      let recipientPlotRef : &StoneAge.PlotCollection
      
                      prepare(signer: auth(BorrowValue, SaveValue, IssueStorageCapabilityController, PublishCapability) &Account) {
                          let senderPlotRef = signer.storage.borrow<auth(StoneAge.Withdraw) &StoneAge.PlotCollection>(from: StoneAge.CollectionStoragePath)
                          ?? panic(StoneAge.collectionNotConfiguredError(address: signer.address))
      
                          let plotExist = senderPlotRef.idExists(id: plotID)
                          if !plotExist {
                              panic("Plot ID not found")
                          }
      
                          let recipientAcct = getAccount(recipient)
                          self.recipientPlotRef = recipientAcct.capabilities.borrow<&StoneAge.PlotCollection>(StoneAge.CollectionPublicPath)
                          ?? panic(StoneAge.collectionNotConfiguredError(address: signer.address))
      
                          self.recipientFarmRef = recipientAcct.capabilities.borrow<&StoneAge.FarmDetail>(StoneAge.AccPublicPath)
                          ?? panic("Could not borrow reference to recipient's FarmDetail")
      
                          self.senderFarmRef = signer.capabilities.borrow<&StoneAge.FarmDetail>(StoneAge.AccPublicPath)
                          ?? panic("Could not borrow reference to recipient's FarmDetail")
      
                          if self.recipientFarmRef.balance < 500 {
                              panic("Recipient does not have enough coins to purchase the plot.")
                          }
      
                          self.recipientFarmRef.deductLandPurchaseCharge()
                          self.senderFarmRef.addPurchaseCharges()
      
                          let transferPlot <- senderPlotRef.withdraw(withdrawID: plotID)
                          self.recipientPlotRef.deposit(plot: <- transferPlot)
                      }
      
                      execute {
                          log("Plot transferred successfully, and 500 coins deducted from recipient.")
                      }
                  }
                  `,
            args: (arg, t) => [
              arg(plotID, t.UInt64),
              arg(recipient, t.Address),
            ],
            proposer: fcl.authz,
            payer: fcl.authz,
            authorizations: [fcl.authz],
            limit: 100,
          });

          console.log("Transaction ID:", transactionId);
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
              const address = await fcl.currentUser.snapshot();


          const result = await fcl.query({
            cadence: `
         import StoneAge from 0x9870d6da0661d8cf

          access(all) fun main(address: Address): &StoneAge.FarmDetail {
            let account = getAccount(address)

            let nftReference = account
              .capabilities
              .borrow<&StoneAge.FarmDetail>(/public/AccountNFTPath)
              ?? panic("Could not borrow a reference")  // Corrected string literal

            return nftReference
          }

          `,
            args: (arg, t) => [arg(address.addr, t.Address)],
          });

          // ✅ Use Unity's `sendMessage` to notify game
          const param = {
            balance: result.balance,
            id: result.id,
            uuid: result.uuid,
          };
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
          const result = await fcl.query({
            cadence: `

              import StoneAge from 0x9870d6da0661d8cf

              access(all) fun main(address: Address): &StoneAge.PlotCollection {
                let account = getAccount(address)

                let collection = account
                  .capabilities
                  .borrow<&StoneAge.PlotCollection>(StoneAge.CollectionPublicPath)
                  ?? panic("Could not borrow a reference")

                  return collection
              }

          `,
            args: (arg, t) => [arg(currentUser.addr, t.Address)],
          });

          // ✅ Use Unity's `sendMessage` to notify game
          console.log(result.ownedPlots);
          const param = {
            // balance: result.balance,
            // id: result.id,
            // count: result.ownedPlots.length
            uuid: result.uuid,
          };
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
    </div>
  );
}

export default BoxMove;
