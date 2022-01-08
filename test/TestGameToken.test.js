const GameToken = artifacts.require("./GameToken.sol");

contract("GameToken", async (accounts) => {
  describe("#getDeposited", async () => {
    it("should access the balance of GameToken units held by an account", async () => {
      const newGameToken = await GameToken.deployed();
      const account = accounts[0];

      web3.eth.handleRevert = true;
      let balance = await web3.eth.getBalance(account);
      let deposited = await web3.eth.getBalance(newGameToken.address);

      console.log(balance);
      console.log(newGameToken.address);
      console.log(deposited);
      await web3.eth.sendTransaction({from: account, to: accounts[1], value: 1, gas: "4712388"});
      console.log("success");

      try {
        let gas = await web3.eth.estimateGas({
          from: account,
          to: accounts[1],
          amount: "1000000000000000000"
        })
        console.log("success2");
        console.log(gas);
        gas = await web3.eth.estimateGas({
          from: account,
          to: newGameToken.address,
          amount: "1"
        })
        console.log("success3");
        console.log(gas);
        await web3.eth.sendTransaction({from: account, to: newGameToken.address, value: 1, gas: gas});

        let updated = await web3.eth.getBalance(account);
        //assert.equal(balance, 1, "Accounts can transfer ETH");
        console.log("updated");
        console.log(updated);
        console.log("balance");
        console.log(balance);

        assert(updated < balance, "Accounts can transfer ETH to the contract");
      } catch(error) {
        console.error(error);

      }

      /*
      let one_eth = web3.toWei(1, "ether");
      await web3.eth.sendTransaction({from: account, to: lastGameToken.address, value: one_eth});
      let balance_wei = await web3.eth.getBalance(lastGameToken.address);
      let balance_ether = web3.fromWei(balance_wei.toNumber(), "ether");
      assert.equal(deposit, 1, "Accounts can transfer ETH");
      */

      //const amount = 1 * 10**18;
      /*
      const amount = 1;

      await lastGameToken.purchase({ from: account, value: amount });

      let cached = await lastGameToken.getDeposited.call();
      let deposited = cached.toString();
      deposited = parseInt(deposited) / 10**18;
      */

      /*
      const cachedBalance = await lastGameToken.getDeposited.call(account, { from: account });
      let accountBalance = cachedBalance.toString();
      accountBalance = parseInt(accountBalance) / 10**18;
      */

      /*
      await lastGameToken.sell({ from: account, value: amount });
      */

      /*
      let cachedUpdate = await lastGameToken.getDeposited.call(account, { from: account });
      let updatedBalance = cachedUpdate.toString();
      updatedBalance = parseInt(updatedBalance) / 10**18;
      */

      /*
      cached = await lastGameToken.getDeposited.call({ from: account });
      updatedDeposited = cachedUpdate.toString();
      updatedDeposited = parseInt(updatedBalance) / 10**18;
      */

      //assert(accountBalance < updatedBalance, "The account balance should be increased after a sale");
      //assert.equal(updatedDeposited, 1.80143887 / 10**10, "The deposited balance should be decreased after a sale");
    });
  });

  describe("#getSupply", async () => {
    it("should access the balance of GameToken units held by an account", async () => {
      const lastGameToken = await GameToken.deployed();
      //const account = accounts[0];

      const balance = await lastGameToken.getSupply.call();
      const amount = balance.toNumber();

      assert.equal(amount, 1000, "The units of the GameToken owned could not be retrieved");
    });
  });

  describe("#getBalance", async () => {
    it("should access the balance of GameToken units held by an account", async () => {
      const lastGameToken = await GameToken.deployed();
      const account = accounts[0];

      const balance = await lastGameToken.getBalance.call(account, { from: account });
      const amount = balance.toNumber();

      assert.equal(amount, 0, "The units of the GameToken owned could not be retrieved");
    });
  });

  describe("#purchase", async () => {
    it("should transfer the GameToken to an account", async () => {
      const lastGameToken = await GameToken.deployed();
      const account = accounts[0];
      const amount = 2;

      await lastGameToken.purchase({ from: account, value: amount });

      const cachedBalance = await lastGameToken.getBalance.call(account);
      const balance = cachedBalance.toNumber();

      assert.equal(balance, amount, "The purchaser account balance should be increased");

      const cachedSupply = await lastGameToken.getSupply.call();
      const supply = cachedSupply.toNumber();

      assert.equal(supply, 998, "The supplier account balance should be decreased");

      // The contract state needs to be restored
      await lastGameToken.sell({ from: account, value: amount });
    });
  });

  describe("#sell", async () => {
    it("should transfer the GameToken to an account", async () => {
      const lastGameToken = await GameToken.deployed();
      const account = accounts[0];
      const amount = 1;

      await lastGameToken.purchase({ from: account, value: 4 });
      await lastGameToken.sell({ from: account, value: amount });

      const cachedBalance = await lastGameToken.getBalance.call(account);
      const balance = cachedBalance.toNumber();

      assert.equal(balance, 3, "The purchaser account balance should be decreased");

      const cachedSupply = await lastGameToken.getSupply.call();
      const supply = cachedSupply.toNumber();

      assert.equal(supply, 997, "The supplier account balance should be increased");

      // Reset the contract state
      await lastGameToken.sell({ from: account, value: 3 });
    });
  });
});
