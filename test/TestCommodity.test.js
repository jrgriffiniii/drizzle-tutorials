const Commodity = artifacts.require("./Commodity.sol");

contract("Commodity", async accounts => {
  describe("#getBalance", async () => {
    it("should access the balance of commodity units held by an account", async () => {
      const lastCommodity = await Commodity.deployed();
      const account = accounts[0];

      const balance = await lastCommodity.getBalance.call(account);
      const amount = balance.toNumber();

      assert.equal(amount, 1000, "The units of the commodity owned could not be retrieved");
    });
  });

  describe("#sell", async () => {
    it("should transfer the Commodity to an account", async () => {
      const lastCommodity = await Commodity.deployed();
      const account = accounts[1];
      const amount = 1;

      await lastCommodity.sell(account, amount);

      const balance = await lastCommodity.getBalance.call(account);
      const receivedAmount = balance.toNumber();

      assert.equal(receivedAmount, amount, "The Commodity was not transferred the buyer account");
    });
  });
});
