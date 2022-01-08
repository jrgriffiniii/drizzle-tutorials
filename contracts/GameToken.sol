// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract GameToken {
    uint public constant MAX_BALANCE = 1000;
    mapping(address => uint256) balances;

    constructor() public {
      balances[tx.origin] = MAX_BALANCE;
    }

    event Received(address, uint);

    function receive() external payable {
      emit Received(msg.sender, msg.value);
    }

    event Fallback(address, uint);

    function fallback() external payable {
      emit Fallback(msg.sender, msg.value);
    }

    function getDeposited() external view returns (uint256) {
      return address(this).balance;
    }

    function getBalance(address owner) external view returns (uint) {
      return balances[owner];
    }

    function sell(address buyer, uint amount) public returns(bool sufficient) {
      if (balances[msg.sender] < amount) return false;
      balances[msg.sender] -= amount;

      balances[buyer] += amount;
      return true;
    }
}
