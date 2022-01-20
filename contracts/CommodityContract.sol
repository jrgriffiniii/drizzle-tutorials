// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

abstract contract CommodityContract {
    uint256 public constant MAX_BALANCE = 1000;

    address private deployed;

    // The Globex Codes
    string[] public months;

    // Map addresses to month codes
    mapping(address => mapping(string => uint256)) balances;

    // Map month codes to the last bid and last ask prices
    mapping(string => uint256) bidPrices;
    mapping(string => uint256) askPrices;

    event Received(address, uint256);
    event Fallback(address, uint256);
    event Buy(address, string, uint256);
    event Sell(address, string, uint256);

    constructor(string[] memory _months) {
        deployed = address(this);
        months = _months;

        for (uint256 i = 0; i < months.length; i++) {
            balances[deployed][months[i]] = 0;
        }
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable {
        emit Fallback(msg.sender, msg.value);
    }

    function getMonths() external view returns (string[] memory) {
        return months;
    }

    function getDeposited() external view returns (uint256) {
        return deployed.balance;
    }

    function getTotalSupply() external view returns (uint256) {
        uint256 _supply = 0;
        for (uint256 i = 0; i < months.length; i++) {
            _supply += balances[deployed][months[i]];
        }

        return _supply;
    }

    function getTotalBalance(address owner) external view returns (uint256) {
        uint256 _balance = 0;
        for (uint256 i = 0; i < months.length; i++) {
            _balance += balances[owner][months[i]];
        }

        return _balance;
    }

    function getBalance(address owner, string memory month)
        external
        view
        returns (uint256)
    {
        uint256 _balance = balances[owner][month];

        return _balance;
    }

    function sell(address buyer, string memory month) external payable {
        uint256 amount = msg.value;

        // This must be denominated in Wei
        //balances[deployed] -= amount;
        //balances[msg.sender] += amount;
        balances[buyer][month] += amount;
        balances[msg.sender][month] -= amount;

        bidPrices[month] = amount;

        emit Buy(buyer, month, amount);
        emit Sell(msg.sender, month, amount);
    }

    function buy(address seller, string memory month) external payable {
        /*
        uint256 amount = msg.value;
        (bool sent, bytes memory data) = seller.call{value: amount}("");

        balances[seller] -= amount;
        balances[deployed] += amount;
        */

        uint256 amount = msg.value;

        balances[seller][month] -= amount;
        balances[msg.sender][month] += amount;

        askPrices[month] = amount;

        emit Buy(msg.sender, month, amount);
        emit Sell(seller, month, amount);
    }
}
