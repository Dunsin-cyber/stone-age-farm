//WORKS WELL
import StoneAge from 0x179b6b1cb6755e31

access(all) fun main(address: Address): &StoneAge.PlotCollection {
  let account = getAccount(address)

  let collection = account
    .capabilities
    .borrow<&StoneAge.PlotCollection>(StoneAge.CollectionPublicPath)
    ?? panic("Could not borrow a reference\n")

    return collection
}
