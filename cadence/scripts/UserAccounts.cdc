//WORKS WELL
import StoneAge from 0x179b6b1cb6755e31

access(all) fun main(address: Address): &StoneAge.FarmDetail {
  let account = getAccount(address)

  let nftReference = account
    .capabilities
    .borrow<&StoneAge.FarmDetail>(/public/AccountNFTPath)
    ?? panic("Could not borrow a reference\n")

    return nftReference
}
