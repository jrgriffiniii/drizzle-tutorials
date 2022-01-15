// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract GameToken {
    uint256 public constant MAX_BALANCE = 1000;

    address private deployed;
    mapping(address => uint256) balances;

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
        //bool sent = seller.send(msg.value);
        //require(sent, "Failed to transfer Ether to the exchange account");

        //require(balances[deployed] - msg.value <= msg.value, "Not enough tokens available for purchase");
        balances[deployed] -= amount;
        balances[msg.sender] += amount;
    }

    function sell() external payable returns (uint256) {
        address payable seller = payable(msg.sender);
        uint256 amount = msg.value;

        // This must be denominated in Wei
        //(bool sent, bytes memory data) = seller.call{value: msg.value}("");
        //bool sent = seller.send(msg.value);
        //require(sent, "Failed to transfer Ether to the seller account");

        //require( balances[deployed] - msg.value <= msg.value, "Not enough tokens available for the seller account." );
        balances[deployed] += amount;
        balances[msg.sender] -= amount;

        return seller.balance;
    }
}
