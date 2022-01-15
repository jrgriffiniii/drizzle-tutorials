const GameToken = artifacts.require("GameToken");
const Commodity = artifacts.require("Commodity");
const CornContract = artifacts.require("CornContract");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(GameToken);
  await deployer.deploy(CornContract);
};
