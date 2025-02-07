import StoneAge from 0x9870d6da0661d8cf

transaction(greeting: String) {

  prepare(acct: &Account) {
    log(acct.address)
  }

  execute {
    StoneAge.changeGreeting(newGreeting: greeting)
  }
}
