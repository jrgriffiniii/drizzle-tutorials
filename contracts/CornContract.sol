// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "../contracts/Commodity.sol";

contract CornContract is CommodityContract {

}

/*
contract CornContract is VRFConsumerBase, CommodityContract {

  bytes32 private s_keyHash;
  uint256 private s_fee;
  mapping(bytes32 => address) private s_rollers;
  mapping(address => uint256) private s_results;

  // constructor
  constructor(address vrfCoordinator, address link, bytes32 keyHash, uint256 fee)
    public
    VRFConsumerBase(vrfCoordinator, link)
  {
    s_keyHash = keyHash;
    s_fee = fee;
  }

  // Get Price
  function rollDice(address roller) public onlyOwner returns (bytes32 requestId) {
    // checking LINK balance
    require(LINK.balanceOf(address(this)) >= s_fee, "Not enough LINK to pay fee");

    // checking if roller has already rolled die
    require(s_results[roller] == 0, "Already rolled");

    // requesting randomness
    requestId = requestRandomness(s_keyHash, s_fee);

    // storing requestId and roller address
    s_rollers[requestId] = roller;

    // emitting event to signal rolling of die
    s_results[roller] = ROLL_IN_PROGRESS;
    emit DiceRolled(requestId, roller);
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    uint256 d20Value = randomness.mod(20).add(1);
    s_results[s_rollers[requestId]] = d20Value;
    emit DiceLanded(requestId, d20Value);
  }

  function house(address player) public view returns (string memory) {
    require(s_results[player] != 0, "Dice not rolled");
    require(s_results[player] != ROLL_IN_PROGRESS, "Roll in progress");
    return getHouseName(s_results[player]);
  }
}
*/
