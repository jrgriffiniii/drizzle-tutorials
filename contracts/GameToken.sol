// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract GameToken {
    uint public constant MAX_BALANCE = 1000;

    address private deployed;
    mapping(address => uint256) balances;

    constructor() public {
      deployed = address(this);
      balances[deployed] = MAX_BALANCE;
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

    function getSupply() external view returns (uint) {
      return balances[deployed];
    }

    function getBalance(address owner) external view returns (uint) {
      return balances[owner];
    }

    function purchase(address buyer, uint amount) public returns(bool sufficient) {
      if (balances[deployed] - amount <= 0) return false;

      balances[deployed] -= amount;
      balances[msg.sender] += amount; 

      return true;
    }

    function sell(address seller, uint amount) public returns(bool sufficient) {
      if (balances[msg.sender] - amount <= 0) return false;

      balances[deployed] += amount;
      balances[msg.sender] -= amount;

      return true;
    }
}
