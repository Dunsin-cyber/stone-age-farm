//WORKS WELL
import StoneAge from 0x179b6b1cb6755e31


transaction {

    prepare (acct: auth(BorrowValue,
        SaveValue,
        IssueStorageCapabilityController,
        PublishCapability)  &Account) {

        if acct.storage.borrow<&StoneAge.FarmDetail>(from: StoneAge.AccStoragePath) != nil {
            panic("This user has an account already!")
        } 
        //RUN (create account) if account does not exist
        else {

          let farmDetail <- StoneAge.CreateAccount()

           // Create an empty PlotCollection and store it in the account
        let collection <- StoneAge.createEmptyCollection()
        acct.storage.save(<-collection, to: StoneAge.CollectionStoragePath)

        log("Plot Collection created")

        // Publish the capability to allow access to the collection
        let cap = acct.capabilities.storage.issue<&StoneAge.PlotCollection>(StoneAge.CollectionStoragePath)
        acct.capabilities.publish(cap, at: StoneAge.CollectionPublicPath)

        log("Plot Collection Capability created")



        // Store FarmDetail in the user's account
        acct.storage.save(<-farmDetail, to: StoneAge.AccStoragePath)

        //Issue capability so it can be visible by others
        let capability = acct
            .capabilities
            .storage
            .issue<&StoneAge.FarmDetail>(StoneAge.AccStoragePath)

            acct
            .capabilities
            .publish(capability, at: /public/AccountNFTPath)
        }
          log("FarmDetail stored in the account")
    
    }

    execute  {
    //TODO
    }

}