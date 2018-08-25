const Ethernal = artifacts.require("Ethernal")
const { weiToEther, etherToWei, bytesToString } = require('./helpers.js')

contract("Ethernal", function (accounts) {

  it("should return 0.04 ether when queried for price", async function() {
    let contract = await Ethernal.deployed()
    let priceInWei = await contract.price.call()
    let priceInEther = weiToEther(priceInWei)
    assert.equal(priceInEther, "0.04")
  })

  it("buy lock", async function() {

    // Get contract
    let contract = await Ethernal.deployed()

    // Setup transaction
    let owner = accounts[0]
    let position = "0x0000"
    let initialsLeft = "AB"
    let initialsRight = "CD"
    let value = etherToWei(0.04)
    let params = {
      from: owner,
      value: value
    }

    // Make transaction "buy lock"
    let tx = await contract.buyLock(position, initialsLeft, initialsRight, params)

    // Assert position is occupied
    let occupiedPositions = await contract.getOccupiedPositions.call()
    assert(occupiedPositions.includes(position), "position should in list of occupied positions")

    // Get lock
    let lock = await contract.locks.call("0x0000")

    // Assert owner is owner of lock
    assert.equal(lock[0], owner)

    // Assert left initials
    assert.equal(bytesToString(lock[1]), "AB")

    // Assert right initials
    assert.equal(bytesToString(lock[2]), "CD")
  })

  it("buying lock at occupied position should fail", async function() {

    // Get contract
    let contract = await Ethernal.deployed()

    // Setup transaction
    let owner = accounts[0]
    let position = "0x0000"
    let initialsLeft = "AB"
    let initialsRight = "CD"
    let params = {
      from: owner,
      value: etherToWei(0.04)
    }

    // Make transaction "buy lock"
    let ok = true
    try {
      let tx = await contract.buyLock(position, initialsLeft, initialsRight, params)
    } catch(err) {
      ok = false
    } finally {
      assert.isNotOk(ok, "buying lock at occupied place should fail")
    }

  })

})
