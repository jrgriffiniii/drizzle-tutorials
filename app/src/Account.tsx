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
const { AccountData, ContractData } = newContextComponents;

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
  useEffect(() => {
    if (initialized) {
      console.log(drizzle);
      console.log(drizzleState);
      /*
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
      */

      const ExchangeTokenState: any = drizzleState.contracts.ExchangeToken;
      const ExchangeToken: any = drizzle.contracts.ExchangeToken;

      /*
      if (tokenSupplyKey == null || tokenSupply == null) {
        const key = ExchangeToken.methods['getSupply'].cacheCall({
          from: account,
        });

        if (ExchangeTokenState.getSupply.hasOwnProperty(key)) {
          let cached: any = ExchangeTokenState.getSupply[key] || 0.0;
          cached = parseInt(cached.value);
          cached = cached.toFixed(14);

          if (tokenSupply != cached) {
            setTokenSupply(cached);
            setTokenSupplyKey(key);
          }
        }
      }

      if (ExchangeTokenKey == null || ExchangeTokenBalance == null) {
        const key = ExchangeToken.methods['getBalance'].cacheCall(account, {
          from: account,
        });

        if (ExchangeTokenState.getBalance.hasOwnProperty(key)) {
          let cached: any = ExchangeTokenState.getBalance[key] || 0.0;
          cached = parseInt(cached.value);
          cached = cached.toFixed(14);

          if (cached != ExchangeTokenBalance) {
            setExchangeTokenBalance(cached);
            setExchangeTokenKey(key);
          }
        }
      }
      */
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
              {initialized && (
                <AccountData
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  accountIndex={0}
                  render={(account: any) => {
                    let parsed: number;
                    if (account.balance != null) {
                      parsed = parseInt(account.balance) / 1.0e18;
                    } else {
                      parsed = 0;
                    }
                    const formattedBalance: string = parsed.toFixed(14);

                    return (
                      <>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <AccountCircleIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={account.address}
                            secondary="Address"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <AccountBalanceWalletIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={formattedBalance}
                            secondary="Balance (ETH)"
                          />
                        </ListItem>
                      </>
                    );
                  }}
                />
              )}
              <Divider />
              <Typography
                variant="h4"
                component="h3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Exchange Tokens
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
                  contract="ExchangeToken"
                  method="getBalance"
                  methodArgs={[
                    drizzleState.accounts[0],
                    { from: drizzleState.accounts[0] },
                  ]}
                  render={(displayData: any) => {
                    let parsed: number;
                    if (displayData != null) {
                      parsed = parseInt(displayData);
                    } else {
                      parsed = 0;
                    }
                    const formatted: string = parsed.toFixed(14);

                    return (
                      <ListItemText
                        primary={formatted}
                        secondary="Balance (Exchange Tokens)"
                      />
                    );
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
              {initialized && (
                <ContractData
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  contract="CornContract"
                  method="getMonths"
                  methodArgs={[{ from: drizzleState.accounts[0] }]}
                  render={(displayData: any) =>
                    displayData.map((month: any) => {
                      return (
                        <ContractData
                          drizzle={drizzle}
                          drizzleState={drizzleState}
                          contract="CornContract"
                          method="getBalance"
                          methodArgs={[
                            drizzleState.accounts[0],
                            month,
                            { from: drizzleState.accounts[0] },
                          ]}
                          render={(displayData: any) => {
                            let parsed: number;
                            if (displayData != null) {
                              parsed = parseInt(displayData);
                            } else {
                              parsed = 0;
                            }
                            const formatted: string = parsed.toFixed(14);

                            return (
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <AccountBalanceWalletIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={formatted}
                                  secondary={`Corn Futures (${month})`}
                                />
                              </ListItem>
                            );
                          }}
                        />
                      );
                    })
                  }
                />
              )}
            </List>
          </nav>
        </CardContent>
      </Card>
    </>
  );
};

export default Account;
