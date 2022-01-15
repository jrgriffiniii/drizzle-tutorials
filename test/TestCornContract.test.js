const CornContract = artifacts.require("./CornContract.sol");

contract("CornContract", async (accounts) => {
  let newCornContract;
  let account;

  before(async () => {
    newCornContract = await CornContract.deployed();
    account = accounts[0];
  });

  describe("#getBalance", async () => {
    it("should access the balance of CornContract units held by an account", async () => {
      let balance = await web3.eth.getBalance(account);
      let deposited = await web3.eth.getBalance(newCornContract.address);

      await web3.eth.sendTransaction({
        from: account,
        to: newCornContract.address,
        value: 1,
      });

      let updatedBalance = await web3.eth.getBalance(account);
      assert(
        updatedBalance < balance,
        "Accounts cannot transfer ETH to the contract"
      );

      let updatedDeposited = await web3.eth.getBalance(newCornContract.address);
      assert(
        updatedDeposited > deposited,
        "The contract cannot store ETH transferred from an account"
      );

      let retrieved = await newCornContract.getDeposited.call({
        from: account,
      });

      assert.equal(
        retrieved,
        updatedDeposited,
        "The contract cannot retrieve the ETH stored internally"
      );
    });
  });

  describe("#sell", async () => {
    it("should transfer the CornContract to an account", async () => {
      const amount = 1;

      await newCornContract.purchase({ from: account, value: 4 });
      await newCornContract.sell({ from: account, value: amount });

      const cachedBalance = await newCornContract.getBalance.call(account);
      const balance = cachedBalance.toNumber();

      assert.equal(
        balance,
        3,
        "The purchaser account balance should be decreased"
      );

      const cachedSupply = await newCornContract.getSupply.call();
      const supply = cachedSupply.toNumber();

      assert.equal(
        supply,
        997,
        "The supplier account balance should be increased"
      );
    });

    // Reset the contract state
    after(async () => {
      await newCornContract.sell({ from: account, value: 3 });
    });
  });
});
