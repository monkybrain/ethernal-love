const R = require('ramda')
const bridge = require('./bridge.js')

const FENCE_COLUMNS = 10
const FENCE_ROWS = 5

exports.drawFence = function(locks) {
  let fence = document.getElementById('fence')
  while (fence.firstChild) {
    fence.removeChild(fence.firstChild);
  }
  let count = 0
  for (let x = 0; x < FENCE_COLUMNS; x++) {
    for (let y = 0; y < FENCE_ROWS; y++) {
      let div
      if (R.contains([x, y], locks)) {
        div = createDivWithLock([x, y])
      } else {
        div = createDivWithoutLock([x, y])
      }
      fence.appendChild(div)
    }
  }
  let info = document.getElementById('info')
  info.innerHTML = `${FENCE_COLUMNS}x${FENCE_ROWS} prototype fence`
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
