// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract GameToken {
    mapping(address => uint256) balances;

    constructor() public {
        balances[tx.origin] = 100;
    }

    function getBalance(address addr) public view returns (uint256) {
        return balances[addr];
    }
}
