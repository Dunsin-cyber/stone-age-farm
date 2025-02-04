import StoneAge from 0x06

transaction(greeting: String) {

  prepare(acct: &Account) {
    log(acct.address)
  }

  execute {
    StoneAge.changeGreeting(newGreeting: greeting)
  }
}
