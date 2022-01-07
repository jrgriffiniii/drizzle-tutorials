const GameToken = artifacts.require("GameToken");
const Commodity = artifacts.require("Commodity");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(GameToken);
  await deployer.deploy(Commodity, "Coffee");
  await deployer.deploy(Commodity, "Corn");
  await deployer.deploy(Commodity, "Wheat");
  await deployer.deploy(Commodity, "Rice");
};
