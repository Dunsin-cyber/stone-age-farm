//WORKS WELL
import StoneAge from 0x9870d6da0661d8cf

access(all) fun main(address: Address): &StoneAge.PlotCollection {
  let account = getAccount(address)

  let collection = account
    .capabilities
    .borrow<&StoneAge.PlotCollection>(StoneAge.CollectionPublicPath)
    ?? panic("Could not borrow a reference")

    return collection
}
