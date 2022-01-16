import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import ShopIcon from '@material-ui/icons/Shop';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { newContextComponents } from '@drizzle/react-components';
const { AccountData, ContractData, ContractForm } = newContextComponents;

type AccountProps = {
  drizzle: any;
  drizzleState: any;
  initialized: boolean;
};

const Account: Function = ({
  drizzle,
  drizzleState,
  initialized,
}: AccountProps) => {
  //console.log(drizzleState);

  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const [cornKey, setCornKey] = useState<string | null>(null);
  const [cornBalance, setCornBalance] = useState<string | null>(null);

  const [tokenSupplyKey, setTokenSupplyKey] = useState<string | null>(null);
  const [tokenSupply, setTokenSupply] = useState<string | null>(null);

  const [MarketTokenKey, setMarketTokenKey] = useState<string | null>(null);
  const [MarketTokenBalance, setMarketTokenBalance] = useState<string | null>(
    null
  );

  const [transactionId, setTransactionId] = useState<any | null>(null);
  const [transaction, setTransaction] = useState<null | null>(null);
  const [transactionHash, setTransactionHash] = useState<null | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<null | null>(null);

  useEffect(() => {
    if (
      initialized &&
      !account &&
      Object.keys(drizzleState.accounts).length > 0
    ) {
      console.log('trace1');
      console.log(drizzleState);

      const primaryAccount: string = drizzleState.accounts[0];
      setAccount(primaryAccount);
    } else if (initialized && account) {
      if (balance == null) {
        let accountBalance: number = drizzleState.accountBalances[account];

        // Account balances are normally denominated in Wei
        accountBalance = accountBalance * 0.1 ** 18;

        setBalance(accountBalance);
      }

      if (transactionId != null && transactionHash == null) {
        const { transactions, transactionStack } = drizzleState;
        const txHash = transactionStack[transactionId];
        const cached = transactions[txHash];

        if (cached != null) {
          setTransaction(cached);
          setTransactionStatus(cached.status);

          if (cached.receipt) {
            setTransactionHash(cached.receipt.transactionHash);
          }
        }
      }

      const MarketTokenState: any = drizzleState.contracts.MarketToken;
      const MarketToken: any = drizzle.contracts.MarketToken;

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

      if (MarketTokenKey == null || MarketTokenBalance == null) {
        const key = MarketToken.methods['getBalance'].cacheCall(account, {
          from: account,
        });

        if (MarketTokenState.getBalance.hasOwnProperty(key)) {
          let cached: any = MarketTokenState.getBalance[key] || 0.0;
          cached = parseInt(cached.value);
          cached = cached.toFixed(14);

          if (cached != MarketTokenBalance) {
            setMarketTokenBalance(cached);
            setMarketTokenKey(key);
          }
        }
      }
    }
  });

  return (
    <>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        My Account
      </Typography>
      <Card>
        <CardContent>
          {account && (
            <Typography>
              <strong>Account: {account}</strong>
            </Typography>
          )}
          {balance != null && (
            <Typography>
              <strong>ETH: {balance}</strong>
            </Typography>
          )}
          {MarketTokenBalance && (
            <Typography>
              <strong>Market Tokens: {MarketTokenBalance}</strong>
            </Typography>
          )}
          {true && (
            <Typography>
              <strong>🌽Corn Contracts: </strong>
            </Typography>
          )}
          {!account && (
            <Typography>
              <strong>Please select an account with your web wallet.</strong>
            </Typography>
          )}
          {!initialized && (
            <Typography>
              <strong>Please connect with your web wallet.</strong>
            </Typography>
          )}
        </CardContent>
      </Card>
      <div>
        <strong>Stored Value: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="MarketToken"
          method="getSupply"
        />
      </div>
    </>
  );
};

export default Account;
