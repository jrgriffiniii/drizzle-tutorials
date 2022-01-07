// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract GameToken {
    mapping(address => uint256) balances;

    constructor() public {
      balances[tx.origin] = 1000;
    }

    event Received(address, uint);

    function receive() external payable {
      emit Received(msg.sender, msg.value);
    }

    event Fallback(address, uint);

    function fallback() external payable {
      emit Fallback(msg.sender, msg.value);
    }

    function getBalance() external view returns (uint256) {
      return address(this).balance;
    }
}
