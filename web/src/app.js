const bridge = require('./bridge.js')

let app = async function() {

  // Get locks
  let locks = await bridge.getLocks()
  console.log("Locks: ", locks)

  // Get locks
  let lock = await bridge.getLock([0,0])
  console.log("Lock: ", lock)


  // Buy lock
  // bridge.buyLock([0, 1], "AA", "BB")

}

app()
