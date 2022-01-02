// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/GameToken.sol";

contract TestGameToken {
    function testInitialBalanceUsingDeployedContract() public {
        address deployed = DeployedAddresses.GameToken();
        GameToken newToken = GameToken(deployed);

        uint256 expected = 100;
        uint256 balance = newToken.getBalance(tx.origin);

        Assert.equal(
            balance,
            expected,
            "There should be a maximum supply of 100 game tokens"
        );
    }
}
