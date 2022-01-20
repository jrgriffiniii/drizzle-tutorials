// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract ExchangeToken {
    uint256 public constant MAX_BALANCE = 1000;

    address private deployed;
    mapping(address => uint256) balances;

    event Received(address, uint256);
    event Fallback(address, uint256);

    constructor() {
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

    function buy() external payable {
        uint256 amount = msg.value;

        // This must be denominated in Wei
        //bool sent = seller.send(msg.value);
        //require(sent, "Failed to transfer Ether to the exchange account");

        //require(balances[deployed] - msg.value <= msg.value, "Not enough tokens available for purchase");
        balances[deployed] -= amount;
        balances[msg.sender] += amount;
    }

    function sell(address seller) external payable returns (bool) {
        uint256 amount = msg.value;

        // This must be denominated in Wei
        //(bool sent, bytes memory data) = seller.call{value: msg.value}("");
        //bool sent = seller.send(msg.value);
        //require(sent, "Failed to transfer Ether to the seller account");
        //bool sent = seller.send(msg.value);
        //seller.call.value(amount).gas(20317)();
        (bool sent, bytes memory data) = seller.call{value: amount}("");

        //require( balances[deployed] - msg.value <= msg.value, "Not enough tokens available for the seller account." );
        balances[seller] -= amount;
        balances[deployed] += amount;

        return sent;
    }
}