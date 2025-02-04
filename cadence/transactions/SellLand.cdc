import StoneAge from 0x06

transaction(plotID: UInt64, recipient: Address) {
    let senderFarmRef :  &StoneAge.FarmDetail
    let recipientFarmRef :  &StoneAge.FarmDetail
    //let senderPlotRef : &StoneAge.PlotCollection
    let recipientPlotRef : &StoneAge.PlotCollection


    prepare(signer: auth(BorrowValue,   SaveValue,
        IssueStorageCapabilityController,
        PublishCapability) &Account) {


       let senderPlotRef = signer.storage
        .borrow<auth(StoneAge.Withdraw) &StoneAge.PlotCollection>(from: StoneAge.CollectionStoragePath)
        ?? panic(StoneAge.collectionNotConfiguredError(address: signer.address))

        //check if plot exists
        let plotExist = senderPlotRef.idExists(id: plotID)

        if !plotExist {
            panic("Plot ID not found")
        }


        let recipientAcct = getAccount(recipient)

        self.recipientPlotRef = recipientAcct.capabilities.borrow<&StoneAge.PlotCollection>(StoneAge.CollectionPublicPath)
         ?? panic(StoneAge.collectionNotConfiguredError(address: signer.address))


       self.recipientFarmRef = recipientAcct
            .capabilities
            .borrow<&StoneAge.FarmDetail>(StoneAge.AccPublicPath)
            ?? panic("Could not borrow reference to recipient's FarmDetail")

        self.senderFarmRef = signer
            .capabilities
            .borrow<&StoneAge.FarmDetail>(StoneAge.AccPublicPath)
            ?? panic("Could not borrow reference to recipient's FarmDetail")


        // Check if the recipient has enough balance
        if self.recipientFarmRef.balance < 500 {
            panic("Recipient does not have enough coins to purchase the plot.")
        }

        // Deduct 500 coins from the recipient
        self.recipientFarmRef.deductLandPurchaseCharge()
                // Add 500 coins to the sender
         self.senderFarmRef.addPurchaseCharges()


                        // Withdraw the plot from the sender's collection
                let transferPlot <- senderPlotRef.withdraw(withdrawID: plotID)

                // Deposit the plot into the recipient's collection
                self.recipientPlotRef.deposit(plot: <- transferPlot)

    }

    execute {
        log("Plot transferred successfully, and 500 coins deducted from recipient.")
    }
}
