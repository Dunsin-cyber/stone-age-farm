import StoneAge from 0x9870d6da0661d8cf

transaction(seed: String, stage: String) {
    let signerRef: &StoneAge.PlotCollection
    let signerAccRef : &StoneAge.FarmDetail



    prepare(account: auth(BorrowValue) &Account) {
        // Borrow the user's PlotCollection
        self.signerRef = account.capabilities
            .borrow<&StoneAge.PlotCollection>(StoneAge.CollectionPublicPath)
            ?? panic(StoneAge.collectionNotConfiguredError(address: account.address))

        self.signerAccRef = account.capabilities
            .borrow<&StoneAge.FarmDetail>(StoneAge.AccPublicPath)
            ?? panic("Could not borrow reference to recipient's FarmDetail")

        
        if self.signerAccRef.balance < 500  {
        panic("Recipient does not have enough coins to purchase the plot.")
        }


    }

    execute {
        // Mint a new plot
        let newPlot <- StoneAge.mintPlot(seed: seed, stage: stage)

        // Deposit the new plot into the user's collection
        self.signerAccRef.deductLandPurchaseCharge()
        self.signerRef.deposit(plot: <-newPlot)


        log("Plot Minted and deposited to user's Collection")
    }
}
