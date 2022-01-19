const ExchangeToken = artifacts.require("ExchangeToken");
const CommodityContract = artifacts.require("CommodityContract");
const CornContract = artifacts.require("CornContract");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(ExchangeToken);
  await deployer.deploy(CommodityContract);
  await deployer.deploy(CornContract);
};
