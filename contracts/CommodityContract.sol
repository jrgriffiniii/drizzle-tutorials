// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract CommodityContract {
    uint256 public constant MAX_BALANCE = 1000;

    address private deployed;
    mapping(address => uint256) balances;
    /*
    uint256 public months;
    uint256 public bid_price;
    uint256 public ask_price;
    */

    event Received(address, uint256);
    event Fallback(address, uint256);

    constructor() public {
        deployed = address(this);
        balances[deployed] = MAX_BALANCE;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable {
        emit Fallback(msg.sender, msg.value);
    }

    function getDeposited() external view returns (uint256) {
        return deployed.balance;
    }

    function getSupply() external view returns (uint256) {
        return balances[deployed];
    }

    function getBalance(address owner) external view returns (uint256) {
        return balances[owner];
    }

    function purchase() external payable {
        address payable seller = payable(deployed);
        uint256 amount = msg.value;

        // This must be denominated in Wei
        balances[deployed] -= amount;
        balances[msg.sender] += amount;
    }

    function sell() external payable {
        address payable seller = payable(msg.sender);
        uint256 amount = msg.value;

        balances[msg.sender] -= amount;
        balances[deployed] += amount;
    }
}
