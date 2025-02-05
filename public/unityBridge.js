import * as fcl from "@onflow/fcl";

// Ensure Unity can call these functions
function registerUnityFunctions() {
if (typeof window !== "undefined") {
window.createAccount = async () => {
  try {
    const transactionId = await fcl.mutate({
      cadence: `
            import StoneAge from 0x179b6b1cb6755e31

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

    console.log("Transaction ID:", transactionId);
    SendMessage(
      "BlockchainConnector",
      "OnTransactionSuccess",
      "Account created successfully"
    );
  } catch (error) {
    console.error("Transaction Error:", error);
    SendMessage("BlockchainConnector", "OnTransactionFailure", error.message);
  }
};

window.mintPlot = async (seed, stage) => {
  try {
    const transactionId = await fcl.mutate({
      cadence: `
            import StoneAge from 0x179b6b1cb6755e31
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
      args: (arg, t) => [arg(seed, t.String), arg(stage, t.String)],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 100,
    });

    console.log("Transaction ID:", transactionId);
    SendMessage(
      "BlockchainConnector",
      "OnTransactionSuccess",
      "Plot minted successfully"
    );
  } catch (error) {
    console.error("Transaction Error:", error);
    SendMessage("BlockchainConnector", "OnTransactionFailure", error.message);
  }
};

window.transferPlot = async (plotID, recipient) => {
  try {
    const transactionId = await fcl.mutate({
      cadence: `
            import StoneAge from 0x179b6b1cb6755e31
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
      args: (arg, t) => [arg(plotID, t.UInt64), arg(recipient, t.Address)],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 100,
    });

    console.log("Transaction ID:", transactionId);
    SendMessage(
      "BlockchainConnector",
      "OnTransactionSuccess",
      "Plot transferred successfully"
    );
  } catch (error) {
    console.error("Transaction Error:", error);
    SendMessage("BlockchainConnector", "OnTransactionFailure", error.message);
  }
}
} }
// registerUnityFunctions();
