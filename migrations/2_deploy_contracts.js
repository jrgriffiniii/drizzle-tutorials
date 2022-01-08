const GameToken = artifacts.require("GameToken");
const Commodity = artifacts.require("Commodity");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(GameToken);
  await deployer.deploy(Commodity);
};
