const GameToken = artifacts.require("GameToken");

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(GameToken);
};
