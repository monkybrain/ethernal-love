pragma solidity ^0.4.24;

contract Ethernal {

    mapping (bytes2 => Lock) public locks;
    bytes2[] public occupiedPositions;
    uint256 public price = 0.04 ether; // approx. 100 SEK at ETH/USD 275

    struct Lock {
        address owner;
        bytes2 initialsLeft;
        bytes2 initialsRight;
    }

    constructor() public {
    }

    function buyLock(bytes2 _position, bytes2 _initialsLeft, bytes2 _initialsRight) public payable {

        // Position cannot be occupied
        require((locks[_position].owner == 0x0), "Position already occupied");

        // Funds sent must match or exceed price
        require((msg.value >= price), "Insufficient funds");

        // Close lock and throw away the key :-)
        locks[_position] = Lock(msg.sender, _initialsLeft, _initialsRight);
        occupiedPositions.push(_position);

        // Return any excess funds
        msg.sender.transfer(msg.value - price);
    }

    function getOccupiedPositions() public view returns (bytes2[]) {
      return occupiedPositions;
    }

}
