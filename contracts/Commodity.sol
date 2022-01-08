// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Commodity {
    uint public constant MAX_BALANCE = 10000;

    mapping (address => uint) balances;
    string public name;

    constructor(string memory _name) public {
      name = _name;

      balances[tx.origin] = MAX_BALANCE;
    }

    function getBalance(address owner) public view returns(uint) {
      return balances[owner];
    }

    function purchase(address buyer, uint amount) public returns(bool sufficient) {
      if (balances[msg.sender] < amount) return false;
      balances[msg.sender] -= amount;

      balances[buyer] += amount;
      return true;
    }

    function sell(address seller, uint amount) public returns(bool sufficient) {
      if (balances[seller] - amount < balances[seller]) return false;
      balances[seller] -= amount;

      balances[seller] -= amount;
      balances[msg.sender] += amount;

      return true;
    }
}
