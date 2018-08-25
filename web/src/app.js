const bridge = require('./bridge.js')
const ui = require('./ui.js')

async function updateFence() {
  console.log("updating fence")
  let locks = await bridge.getLocks()
  ui.drawFence(locks)
}

let app = async function() {

  // Get locks
  let locks = await bridge.getLocks()
  console.log("Locks: ", locks)

  updateFence()
  setInterval(updateFence, 5000)

  // // Get locks
  // let locks = await bridge.getLocks()
  // console.log("Locks: ", locks)
  //
  // // Get locks
  // let lock = await bridge.getLock([0,0])
  // console.log("Lock: ", lock)
  //
  // // Buy lock
  // // bridge.buyLock([0, 1], "AA", "BB")

}

app()
