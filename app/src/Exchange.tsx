import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

type TransactionsProps = {
  initialized: boolean;
  drizzleState: any;
};

const Transactions: Function = ({
  initialized,
  drizzleState,
}: TransactionsProps) => {
  /*
  const transactionStack: any = useSelector((state: any) => state.transactionStack);
  const transactions: any = useSelector((state: any) => state.transactions);
  */

  /*
  let transactionStack: any = [];
  let transactions: any = [];
  */
  const [transactions, setTransactions] = useState([]);

  const items = drizzleState.transactionStack.map((txId: any) => {
    if (drizzleState.transactions[txId]) {
      if (drizzleState.transactions[txId].receipt) {
        return (
          <ListItem key={txId}>
            <ListItemText
              primary={txId}
              secondary={drizzleState.transactions[txId].status}
            />
          </ListItem>
        );
      } else {
        return (
          <ListItem key={txId}>
            <ListItemText
              primary={txId}
              secondary={drizzleState.transactions[txId].status}
            />
          </ListItem>
        );
      }
    }
  });

  return <List>{items}</List>;
};

type ExchangeProps = {
  drizzle: any;
  drizzleState: any;
  initialized: boolean;
};

const Exchange: Function = ({
  drizzle,
  drizzleState,
  initialized,
}: ExchangeProps) => {
  const [account, setAccount] = useState<string | null>(null);

  const [cornContractKey, setCornContractKey] = useState<string | null>(null);
  const [cornContractBalance, setCornContractBalance] = useState<string | null>(
    null
  );

  const [tokenSupplyKey, setTokenSupplyKey] = useState<string | null>(null);
  const [tokenSupply, setTokenSupply] = useState<string | null>(null);

  const [accountTokenKey, setMarketTokenKey] = useState<string | null>(null);
  const [accountTokenBalance, setMarketTokenBalance] = useState<string | null>(
    null
  );

  const [exchangeReservesKey, setExchangeReservesKey] = useState<string | null>(
    null
  );
  const [exchangeReserves, setExchangeReserves] = useState<string | null>(null);

  const [transactionId, setTransactionId] = useState<any | null>(null);
  const [transaction, setTransaction] = useState<null | null>(null);
  const [transactionHash, setTransactionHash] = useState<null | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<null | null>(null);

  useEffect(() => {
    const walletConnected: boolean =
      initialized && !account && Object.keys(drizzleState.accounts).length > 0;

    if (walletConnected) {
      // If the wallet is connected for the first time, store the account
      const clientAccount: string = drizzleState.accounts[0];
      setAccount(clientAccount);
    } else if (initialized && account) {
      // This handles the state for the interactions between the Ethereum network, contracts, and React
      if (transactionId != null && transactionHash == null) {
        const { transactions, transactionStack } = drizzleState;
        const txHash = transactionStack[transactionId];
        const cached = transactions[txHash];

        // This retrieves any cached transactions
        if (cached != null) {
          setTransaction(cached);
          setTransactionStatus(cached.status);

          if (cached.receipt) {
            setTransactionHash(cached.receipt.transactionHash);
          }
        }
      }

      // Retrieve the MarketToken state and contracts
      const MarketTokenState: any = drizzleState.contracts.MarketToken;
      const MarketToken: any = drizzle.contracts.MarketToken;

      // Retrieve the CornContract state and contracts
      const CornContractState: any = drizzleState.contracts.CornContract;
      const CornContract: any = drizzle.contracts.CornContract;

      // This retrieves the number of ETH deposited into the exchange
      if (exchangeReservesKey == null || exchangeReserves == null) {
        const key = MarketToken.methods['getDeposited'].cacheCall({
          from: account,
        });

        if (MarketTokenState.getSupply.hasOwnProperty(key)) {
          let cached: any = MarketTokenState.getDeposited[key] || 0.0;
          cached = cached.toFixed(14);

          if (tokenSupply != cached) {
            setExchangeReserves(cached);
            setExchangeReservesKey(key);
          }
        }
      }

      // This retrieves the number of tokens owned by the exchange
      if (tokenSupplyKey == null || tokenSupply == null) {
        const key = MarketToken.methods['getSupply'].cacheCall({
          from: account,
        });

        if (MarketTokenState.getSupply.hasOwnProperty(key)) {
          let cached: any = MarketTokenState.getSupply[key] || 0.0;
          cached = parseInt(cached.value);
          cached = cached.toFixed(14);

          if (tokenSupply != cached) {
            setTokenSupply(cached);
            setTokenSupplyKey(key);
          }
        }
      }

      // This retrieves the amount of tokens owned by the user
      if (accountTokenKey == null || accountTokenBalance == null) {
        const key = MarketToken.methods['getBalance'].cacheCall(account, {
          from: account,
        });

        if (MarketTokenState.getBalance.hasOwnProperty(key)) {
          let cached: any = MarketTokenState.getBalance[key] || 0.0;
          cached = parseInt(cached.value);
          cached = cached.toFixed(14);

          if (cached != accountTokenBalance) {
            setMarketTokenBalance(cached);
            setMarketTokenKey(key);
          }
        }
      }

      // This retrieves the amount of corn contracts owned by the user
      if (cornContractKey == null || cornContractBalance == null) {
        const key = CornContract.methods['getBalance'].cacheCall(account, {
          from: account,
        });

        if (MarketTokenState.getBalance.hasOwnProperty(key)) {
          let cached: any = MarketTokenState.getBalance[key] || 0.0;
          cached = parseInt(cached.value);
          cached = cached.toFixed(14);

          if (cached != accountTokenBalance) {
            setMarketTokenBalance(cached);
            setMarketTokenKey(key);
          }
        }
      }
    }
  });

  const buyToken: any = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    if (account) {
      const MarketToken = drizzle.contracts.MarketToken;
      // @todo this should be a variable
      const creditAmount: number = 1;

      // This submits a transaction to purchase a token from the exchange
      const stackId: any = MarketToken.methods['purchase'].cacheSend({
        from: account,
        value: creditAmount,
      });

      setMarketTokenKey(null);
      setTokenSupplyKey(null);
      setTransactionId(stackId);
    }
  };

  const sellToken: any = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    if (account) {
      const MarketToken = drizzle.contracts.MarketToken;
      // @todo this should be a variable
      const creditAmount: number = 1;

      const stackId: any = MarketToken.methods['sell'].cacheSend(
        account,
        creditAmount,
        {
          from: account,
        }
      );

      setMarketTokenKey(null);
      setTokenSupplyKey(null);
      setTransactionId(stackId);
    }
  };

  return (
    <>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        The Exchange
      </Typography>
      <Card>
        <CardContent>
          {tokenSupply && (
            <Typography>
              <strong>ETH Reserves: {exchangeReserves}</strong>
            </Typography>
          )}
          {tokenSupply && (
            <Typography>
              <strong>Market Token Reserves: {tokenSupply}</strong>
            </Typography>
          )}
          {!cornContractBalance != null && (
            <Typography>
              <strong>🌽 Corn Supply (Bushels): {cornContractBalance}</strong>
            </Typography>
          )}
          {!initialized && (
            <Typography>
              <strong>Please connect with your web wallet.</strong>
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <form>
            <Container>
              <Button color="primary" variant="contained" onClick={buyToken}>
                Buy Market Tokens
              </Button>
            </Container>
            <Container>
              <Button color="primary" variant="contained" onClick={sellToken}>
                Sell Market Tokens
              </Button>
            </Container>
          </form>
        </CardActions>

        <Container>
          {initialized && transactionId != null && transaction == null && (
            <Typography>Transaction in progress...</Typography>
          )}
          {initialized &&
            account &&
            accountTokenBalance == null &&
            transactionId == null && (
              <Typography>Please buy credits</Typography>
            )}
          {!initialized ||
            (!account && (
              <Typography>Please connect your web wallet.</Typography>
            ))}
        </Container>
      </Card>

      <Typography
        variant="h4"
        component="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Transactions
      </Typography>
      <Container>
        {initialized && (
          <Transactions initialized={initialized} drizzleState={drizzleState} />
        )}
      </Container>
    </>
  );
};

export default Exchange;
