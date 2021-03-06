const Web3 = require('web3')

// Init web3
let provider = null
if (typeof web3 !== 'undefined') {
  provider = web3.currentProvider
} else {
  provider = "https://ropsten.infura.io/0pzfHdAhsqakqtBk8Hs6"
}
web3 = new Web3(provider)

// Setup account
let account = null
let network = null
function handleConfig(state) {
  if (state.networkVersion != "3") {
    alert("This demo only works with the Ropsten Ethereum test network.")
    network = state.networkVersion
  } else {
    account = state.selectedAddress
    network = state.networkVersion
  }
}
handleConfig(web3.currentProvider.publicConfigStore._state)
web3.currentProvider.publicConfigStore.on('update', (x) => {
  handleConfig(web3.currentProvider.publicConfigStore._state)
})

// Init contract
const abi = require('../../build/contracts/Ethernal.json').abi
let address = "0xd64F03d9bdAF6ccD1166A23fd81e41b75A3E39f2"
const contract = new web3.eth.Contract(abi, address)

exports.getLocks = async function() {
  let locks = await contract.methods.getOccupiedPositions().call()
  return locks.map((lock) => {return bytesToPosition(lock)})
}

exports.getLock = async function(position) {
  positionBytes = positionToBytes(position)
  lock = await contract.methods.locks(positionBytes).call()
  return {
    owner: lock.owner,
    initialsLeft: bytesToString(lock.initialsLeft),
    initialsRight: bytesToString(lock.initialsRight)
  }
}

exports.buyLock = async function(position, initialsLeft, initialsRight) {
  positionBytes = positionToBytes(position)
  left = stringToBytes(initialsLeft)
  right = stringToBytes(initialsRight)
  let params = {from: account, value: web3.utils.toWei('0.04', 'ether')}
  let tx = await contract.methods.buyLock(positionBytes, left, right).send(params)
  console.log(tx)
}

// Helper functions
positionToBytes = (position) => { return web3.utils.bytesToHex(position) }
bytesToPosition = (bytes) => { return web3.utils.hexToBytes(bytes) }
stringToBytes = (string) => { return web3.utils.utf8ToHex(string) }
bytesToString = (bytes) => { return web3.utils.hexToUtf8(bytes) }
