const GameToken = artifacts.require("./GameToken.sol");

contract("GameToken", async (accounts) => {
  let newGameToken;
  let account;

  before(async () => {
    newGameToken = await GameToken.deployed();
    account = accounts[0];
  });

  describe("#getDeposited", async () => {
    it("should access the balance of GameToken units held by an account", async () => {
      let balance = await web3.eth.getBalance(account);
      let deposited = await web3.eth.getBalance(newGameToken.address);

      await web3.eth.sendTransaction({
        from: account,
        to: newGameToken.address,
        value: 1,
      });

      let updatedBalance = await web3.eth.getBalance(account);
      assert(
        updatedBalance < balance,
        "Accounts cannot transfer ETH to the contract"
      );

      let updatedDeposited = await web3.eth.getBalance(newGameToken.address);
      assert(
        updatedDeposited > deposited,
        "The contract cannot store ETH transferred from an account"
      );

      let retrieved = await newGameToken.getDeposited.call({ from: account });

      assert.equal(
        retrieved,
        updatedDeposited,
        "The contract cannot retrieve the ETH stored internally"
      );
    });
  });

  describe("#getSupply", async () => {
    it("should access the balance of GameToken units held by an account", async () => {
      const balance = await newGameToken.getSupply.call();
      const amount = balance.toNumber();

      assert.equal(
        amount,
        1000,
        "The units of the GameToken owned could not be retrieved"
      );
    });
  });

  describe("#getBalance", async () => {
    it("should access the balance of GameToken units held by an account", async () => {
      const balance = await newGameToken.getBalance.call(account, {
        from: account,
      });
      const amount = balance.toNumber();

      assert.equal(
        amount,
        0,
        "The units of the GameToken owned could not be retrieved"
      );
    });
  });

  describe("#purchase", async () => {
    let amount;

    before(async () => {
      amount = 2;
    });

    it("should transfer the GameToken to an account", async () => {
      await newGameToken.purchase({ from: account, value: amount });

      const cachedBalance = await newGameToken.getBalance.call(account);
      const balance = cachedBalance.toNumber();

      assert.equal(
        balance,
        amount,
        "The purchaser account balance should be increased"
      );

      const cachedSupply = await newGameToken.getSupply.call();
      const supply = cachedSupply.toNumber();

      assert.equal(
        supply,
        998,
        "The supplier account balance should be decreased"
      );
    });

    after(async () => {
      // The contract state needs to be restored
      await newGameToken.sell({ from: account, value: amount });
    });
  });

  describe("#sell", async () => {
    it("should transfer the GameToken to an account", async () => {
      const amount = 1;

      await newGameToken.purchase({ from: account, value: 4 });
      await newGameToken.sell({ from: account, value: amount });

      const cachedBalance = await newGameToken.getBalance.call(account);
      const balance = cachedBalance.toNumber();

      assert.equal(
        balance,
        3,
        "The purchaser account balance should be decreased"
      );

      const cachedSupply = await newGameToken.getSupply.call();
      const supply = cachedSupply.toNumber();

      assert.equal(
        supply,
        997,
        "The supplier account balance should be increased"
      );
    });

    after(async () => {
      // The contract state needs to be restored
      await newGameToken.sell({ from: account, value: 3 });
    });
  });
});
