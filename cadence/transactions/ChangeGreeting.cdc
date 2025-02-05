import StoneAge from 0x179b6b1cb6755e31

transaction(greeting: String) {

  prepare(acct: &Account) {
    log(acct.address)
  }

  execute {
    StoneAge.changeGreeting(newGreeting: greeting)
  }
}
