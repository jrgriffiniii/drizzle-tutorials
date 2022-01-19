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
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import BusinessIcon from '@material-ui/icons/Business';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import BarChartIcon from '@material-ui/icons/BarChart';

import { newContextComponents } from '@drizzle/react-components';
const { ContractData, ContractForm } = newContextComponents;

import './Exchange.scss';

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

  const [accountTokenKey, setExchangeTokenKey] = useState<string | null>(null);
  const [accountTokenBalance, setExchangeTokenBalance] = useState<string | null>(
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

        /*
        // This retrieves any cached transactions
        if (cached != null) {
          setTransaction(cached);
          setTransactionStatus(cached.status);

          if (cached.receipt) {
            setTransactionHash(cached.receipt.transactionHash);
          }
        }
        */
      }

      // Retrieve the ExchangeToken state and contracts
      const ExchangeTokenState: any = drizzleState.contracts.ExchangeToken;
      const ExchangeToken: any = drizzle.contracts.ExchangeToken;

      // Retrieve the CornContract state and contracts
      const CornContractState: any = drizzleState.contracts.CornContract;
      const CornContract: any = drizzle.contracts.CornContract;

      // This retrieves the number of ETH deposited into the exchange
      /*
      if (exchangeReservesKey == null || exchangeReserves == null) {
        const key = ExchangeToken.methods['getDeposited'].cacheCall({
          from: account,
        });

        if (ExchangeTokenState.getSupply.hasOwnProperty(key)) {
          let cached: any = ExchangeTokenState.getDeposited[key] || 0.0;
          cached = cached.toFixed(14);

          if (tokenSupply != cached) {
            setExchangeReserves(cached);
            setExchangeReservesKey(key);
          }
        }
      }
      */

      /*
      // This retrieves the number of tokens owned by the exchange
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
      */

      // This retrieves the amount of tokens owned by the user
      /*
      if (accountTokenKey == null || accountTokenBalance == null) {
        const key = ExchangeToken.methods['getBalance'].cacheCall(account, {
          from: account,
        });

        if (ExchangeTokenState.getBalance.hasOwnProperty(key)) {
          let cached: any = ExchangeTokenState.getBalance[key] || 0.0;
          cached = parseInt(cached.value);
          cached = cached.toFixed(14);

          if (cached != accountTokenBalance) {
            setExchangeTokenBalance(cached);
            setExchangeTokenKey(key);
          }
        }
      }
      */

      /*
      // This retrieves the amount of corn contracts owned by the user
      if (cornContractKey == null || cornContractBalance == null) {
        const key = CornContract.methods['getBalance'].cacheCall(account, {
          from: account,
        });

        if (ExchangeTokenState.getBalance.hasOwnProperty(key)) {
          let cached: any = ExchangeTokenState.getBalance[key] || 0.0;
          cached = parseInt(cached.value);
          cached = cached.toFixed(14);

          if (cached != accountTokenBalance) {
            setExchangeTokenBalance(cached);
            setExchangeTokenKey(key);
          }
        }
      }
      */
    }
  });

  const buyToken: any = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    if (account) {
      const ExchangeToken = drizzle.contracts.ExchangeToken;
      // @todo this should be a variable
      const creditAmount: number = 1;

      // This submits a transaction to purchase a token from the exchange
      const stackId: any = ExchangeToken.methods['purchase'].cacheSend({
        from: account,
        value: creditAmount,
      });

      setExchangeTokenKey(null);
      setTokenSupplyKey(null);
      setTransactionId(stackId);
    }
  };

  const sellToken: any = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    if (account) {
      const ExchangeToken = drizzle.contracts.ExchangeToken;
      // @todo this should be a variable
      const creditAmount: number = 1;

      const stackId: any = ExchangeToken.methods['sell'].cacheSend(
        account,
        creditAmount,
        {
          from: account,
        }
      );

      setExchangeTokenKey(null);
      setTokenSupplyKey(null);
      setTransactionId(stackId);
    }
  };

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
            Exchange
          </Typography>
          <nav>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                {initialized && (
                  <ListItemText primary={drizzle.contracts.ExchangeToken.address} secondary="Address" />
                )}
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceIcon />
                  </Avatar>
                </ListItemAvatar>
                {initialized && (
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="ExchangeToken"
                    method="getDeposited"
                    methodArgs={[{from: account}]}
                    render={(displayData: any) => {
                      const parsed: number = parseInt(displayData);
                      const formatted: string = parsed.toFixed(14);

                      return (
                        <ListItemText primary={formatted} secondary="Reserves (ETH)" />
                      )
                    }}
                  />
                )}
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceIcon />
                  </Avatar>
                </ListItemAvatar>
                {initialized && (
                  <ContractData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
                    contract="ExchangeToken"
                    method="getSupply"
                    methodArgs={[{from: account}]}
                    render={(displayData: any) => {
                      const parsed: number = parseInt(displayData);
                      const formatted: string = parsed.toFixed(14);

                      return (
                        <ListItemText primary={formatted} secondary="Reserves (Exchange Tokens)" />
                      )
                    }}
                  />
                )}
              </ListItem>

              <ListItem>

                <ListItemAvatar>
                  <Avatar>
                    <BarChartIcon />
                  </Avatar>
                </ListItemAvatar>
                {initialized && (
                  <ListItemText primary="1.0" secondary="Exchange Token Price (Exchange Token/ETH)" />
                )}
              </ListItem>
            </List>
          </nav>
          {!initialized && (
            <Typography>
              <strong>Please connect with your web wallet.</strong>
            </Typography>
          )}
        </CardContent>
        <CardActions>

          <form className="market-token-form">
          {initialized && (
            <ContractForm
              drizzle={drizzle}
              contract="ExchangeToken"
              method="buy"
              sendArgs={ { from: account, value: 1 } }
              render={ (options: any) => {

                return (
                    <Button className="market-token__buy-button" color="primary" variant="contained" onClick={buyToken}>
                      Stake
                    </Button>
                )
              }}
            />
          )}
          {initialized && (
            <ContractForm
              drizzle={drizzle}
              contract="ExchangeToken"
              method="sell"
              sendArgs={ { from: account, value: 1 } }
              render={ (options: any) => {

                return (
                    <Button className="market-token__sell-button" color="secondary" variant="contained" onClick={buyToken}>
                      Withdraw
                    </Button>
                )
              }}
            />
          )}
          </form>
        </CardActions>

        <Container>
          {!initialized ||
            (!account && (
              <Typography>Please connect your web wallet.</Typography>
            ))}
        </Container>
      </Card>
    </>
  );
};

export default Exchange;
