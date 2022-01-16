const GameToken = artifacts.require("GameToken");
const CommodityContract = artifacts.require("CommodityContract");
const CornContract = artifacts.require("CornContract");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(GameToken);
  await deployer.deploy(CommodityContract);
  await deployer.deploy(CornContract);
};
