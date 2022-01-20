const ExchangeToken = artifacts.require("ExchangeToken");
const CommodityContract = artifacts.require("CommodityContract");
const CornContract = artifacts.require("CornContract");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(ExchangeToken);
  await deployer.deploy(CornContract, ["MAR 2022", "MAY 2022", "MAR 2023"]);
};
