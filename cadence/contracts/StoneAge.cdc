
access(all) contract StoneAge {
  //FEILDS
  access(all) var greeting: String

  //ENTITLEMENT
  access(all) entitlement Withdraw

    access(all) let CollectionStoragePath: StoragePath
    access(all) let CollectionPublicPath: PublicPath
    access(all) let MinterStoragePath: StoragePath

    access(all) let AccStoragePath : StoragePath
    access(all) let AccPublicPath :PublicPath

    access(contract) var counter: UInt64
    access(all) var plotId : UInt64

  init() {
    self.greeting = "Welcome to StoneAge!"
    self.CollectionStoragePath = /storage/landCollection
    self.CollectionPublicPath = /public/landCollection
    self.MinterStoragePath = /storage/landCollectionMinter

    self.AccStoragePath = /storage/AccountNFTPath
    self.AccPublicPath = /public/AccountNFTPath

    self.counter = 0
    self.plotId = 0
  }
  //FUNCTIONS
  access(all) fun changeGreeting(newGreeting: String) {
    self.greeting = newGreeting
  }


  access(all) view fun hello(): String {
      return self.greeting
  }

  access(all) fun CreateAccount (): @FarmDetail {
      self.counter = self.counter + 1
    return <- create FarmDetail(initID: self.counter)

  }

  access(all) fun createEmptyCollection (): @PlotCollection {
    return <- create PlotCollection()
  }

  access(all) fun mintPlot (seed: String, stage: String) : @Plot {
  self.plotId = self.plotId + 1
    return <- create Plot(initId: self.plotId, seed: seed, stage:stage)
  }



  // RESOURCES


  access(all) resource FarmDetail {
      access(all) let id: UInt64
      access(all) let cabbageSeed: UInt64
      access(all) let cornSeed: UInt64
      access(all) var balance: UInt64
      access(all) var plots: @PlotCollection

      init(initID: UInt64) {
            self.id = initID
            self.cabbageSeed = 3
            self.cornSeed = 8
            self.balance = 1000
            self.plots <- create PlotCollection()
        }

        // Add a plot to the FarmDetail's PlotCollection
        access(all) fun addPlot(plot: @Plot) {
            if self.balance < 1000 {panic ("your balance is low, get more coins")}
            else {
             self.plots.addToCollection(plot: <-plot)
            }
        }

        // Check if a plot with a specific ID exists in the collection
        access(all) view fun plotExists(id: UInt64): Bool {
            return self.plots.idExists(id: id)
        }

        // Get a list of all plot IDs in the collection
        access(all) view fun getPlotIDs(): [UInt64] {
            return self.plots.getIDs()
        }

        access(all) fun deductLandPurchaseCharge () {
          self.balance = self.balance - 500
        }

          access(all) fun addPurchaseCharges () {
          self.balance = self.balance + 500
        }
        
      
  }

  //A plot of land, the crops on it and their metadata 
  //TODO: check the unity code and add necessary stuff there
  access(all) resource Plot {
      access(all) let id: UInt64
      access(all) var seed: String
      access(all) var stage: String

      init (initId: UInt64, seed: String, stage: String) {
      self.id = initId
      self.seed = seed
      self.stage = stage
      }
  } 


   access(all) resource PlotCollection {
    access(all) var ownedPlots: @{UInt64:Plot}

    access(all) fun addToCollection(plot: @Plot) {
    self.ownedPlots[plot.id] <-! plot
    }

    access(all) view fun idExists(id: UInt64): Bool {
    return self.ownedPlots[id] != nil
    }

    access(all) view fun getIDs(): [UInt64] {
        return self.ownedPlots.keys
    }

    access(Withdraw) fun withdraw(withdrawID: UInt64): @Plot {
    let plot <- self.ownedPlots.remove(key: withdrawID)
        ?? panic("Could not withdraw a plot.NFT with id="
            .concat(withdrawID.toString())
            .concat("Verify that the collection owns the NFT ")
            .concat("with the specified ID first before withdrawing it."))

      return <- plot
    }

     // Deposit a plot into this collection
    access(all) fun deposit(plot: @Plot) {
        self.ownedPlots[plot.id] <-! plot
    }
    init () {
    self.ownedPlots <- {}

    }

  
  }


   //ERROR FORMATTER

    access(all) fun collectionNotConfiguredError(address: Address): String {
    return "Could not borrow a collection reference to recipient's StoneAge.Collection"
        .concat(" from the path ")
        .concat(StoneAge.CollectionPublicPath.toString())
        .concat(". Make sure account ")
        .concat(address.toString())
        .concat(" has set up its account ")
        .concat("with an StoneAge Collection.")
    }


}
