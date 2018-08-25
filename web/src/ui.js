const R = require('ramda')
const bridge = require('./bridge.js')

exports.drawFence = function(locks) {
  let fence = document.getElementById('fence')
  while (fence.firstChild) {
    fence.removeChild(fence.firstChild);
  }
  let count = 0
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let div
      if (R.contains([x, y], locks)) {
        div = createDivWithLock([x, y])
      } else {
        div = createDivWithoutLock([x, y])
      }
      fence.appendChild(div)
    }
  }
}

async function showLock(position) {
  let lock = await bridge.getLock(position)
  let string = `${lock.initialsLeft} ♡ ${lock.initialsRight}\n\nOwner: ${lock.owner}`
  alert(string)
  console.log(lock)
}

async function buyLock(position) {
  console.log(position)
  let initialsLeft = prompt("Enter first set of initials")
  let initialsRight = prompt("Enter second set of initials")
  bridge.buyLock(position, initialsLeft, initialsRight)
}

function createDivWithoutLock(position) {
  let div = document.createElement('div')
  div.classList.add('position')
  div.onclick = () => {buyLock(position)}
  return div
}

function createDivWithLock(position) {
  let div = document.createElement('div')
  div.classList.add('position')
  div.onclick = () => {showLock(position)}
  let img = document.createElement('img')
  img.src = "img/lock.svg"
  img.classList.add("lock")
  div.appendChild(img)
  return div
}
