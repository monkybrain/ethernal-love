const {StringDecoder} = require('string_decoder')
const decoder = new StringDecoder('utf8')

exports.weiToEther = function(wei) {
  return web3.fromWei(wei, 'ether').toString()
}

exports.etherToWei = function (ether) {
  return web3.toWei(ether, 'ether')
}

exports.bytesToString = function(string) {
  // Remove "0x" prefix
  string = string.replace("0x", "")
  let buf = Buffer.from(string, "hex")
  return decoder.write(buf)
}
