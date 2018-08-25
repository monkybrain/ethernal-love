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
let account = web3.currentProvider.publicConfigStore._state.selectedAddress
console.log("User account:", account)
web3.currentProvider.publicConfigStore.on('update', (x) => {
  account = web3.currentProvider.publicConfigStore._state.selectedAddress
  console.log("Account switched to: " + account)
})

// Init contract
const abi = require('../../build/contracts/Ethernal.json').abi
let address = "0xd64F03d9bdAF6ccD1166A23fd81e41b75A3E39f2"
const contract = new web3.eth.Contract(abi, address)

exports.getLocks = function() {
  return contract.methods.getOccupiedPositions().call();
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
stringToBytes = (string) => { return web3.utils.utf8ToHex(string)
bytesToString = (bytes) => { return web3.utils.hexToUtf8(bytes) }
