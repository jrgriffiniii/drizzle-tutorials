import React, { useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

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
      <Card>
        <CardContent>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            My Account
          </Typography>
          <nav>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                {account && (
                  <ListItemText primary={account} secondary="Account" />
                )}
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceWalletIcon />
                  </Avatar>
                </ListItemAvatar>
                {balance && (
                  <ListItemText primary={balance} secondary="Balance (ETH)" />
                )}
              </ListItem>
              <Divider />
              <Typography
                variant="h4"
                component="h3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Exchange Liquidity
              </Typography>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceWalletIcon />
                  </Avatar>
                </ListItemAvatar>
                <ContractData
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  contract="MarketToken"
                  method="getBalance"
                  methodArgs={[account, { from: account }]}
                  render={(displayData: any) => {
                    const parsed: number = parseInt(displayData);
                    const formatted: string = parsed.toFixed(14);

                    return (
                      <ListItemText primary={formatted} secondary="Balance (Exchange Tokens)" />
                    )
                  }}
                />
              </ListItem>
            </List>
          </nav>
        <Divider />
        <Typography
          variant="h4"
          component="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Corn Futures
        </Typography>
        <nav>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountBalanceWalletIcon />
                </Avatar>
              </ListItemAvatar>
              {balance && (
                <ListItemText primary={balance} secondary="Corn Contracts (🌽)" />
              )}
            </ListItem>
          </List>
        </nav>
        </CardContent>
      </Card>
    </>
  );
};

export default Account;
