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

type AccountProps = {
  drizzle: any;
  drizzleState: any;
  initialized: boolean;
};

const Account: Function = ({ drizzle, drizzleState, initialized }: AccountProps) => {
    const [account, setAccount] = useState<string | null>(null);
    const [balance, setBalance] = useState<number | null>(null);
  
    const [cornKey, setCornKey] = useState<string | null>(null);
    const [cornBalance, setCornBalance] = useState<string | null>(null);
  
    const [tokenSupplyKey, setTokenSupplyKey] = useState<string | null>(null);
    const [tokenSupply, setTokenSupply] = useState<string | null>(null);
  
    const [gameTokenKey, setGameTokenKey] = useState<string | null>(null);
    const [gameTokenBalance, setGameTokenBalance] = useState<string | null>(null);
  
    const [transactionId, setTransactionId] = useState<any | null>(null);
    const [transaction, setTransaction] = useState<null | null>(null);
    const [transactionHash, setTransactionHash] = useState<null | null>(null);
    const [transactionStatus, setTransactionStatus] = useState<null | null>(null);
  
    useEffect(() => {
  
      if (initialized && !account && Object.keys(drizzleState.accounts).length > 0) {
        const primaryAccount: string = drizzleState.accounts[0];
        setAccount(primaryAccount);
  
        if (primaryAccount) {
          // @todo Replace this
          /*
          const Corn: any = drizzle.contracts.Commodity;
  
          const cornCacheKey: string = Corn.methods["getBalance"].cacheCall(primaryAccount, {
            from: primaryAccount 
          });
          setCornKey(cornCacheKey);
          */
  
          let accountBalance: number = drizzleState.accountBalances[primaryAccount];
          accountBalance = accountBalance*(0.1**18);
          setBalance(accountBalance);
        }
      } else if(initialized && account) {
  
        if (transactionId != null && transactionHash == null) {
          const { transactions, transactionStack } = drizzleState;
          const txHash = transactionStack[transactionId]; 
          const cached = transactions[txHash];
  
          if (cached != null) {
            console.log(cached);
            setTransaction(cached);
            setTransactionStatus(cached.status);
  
            if (cached.receipt) {
              setTransactionHash(cached.receipt.transactionHash);
            }
          }
        }
  
        const GameTokenState: any = drizzleState.contracts.GameToken;
        const GameToken: any = drizzle.contracts.GameToken;
        
        if(tokenSupplyKey == null || tokenSupply == null) {
          const key = GameToken.methods["getSupply"].cacheCall({
            from: account
          });
  
          if (GameTokenState.getSupply.hasOwnProperty(key)) {
            let cached: any = GameTokenState.getSupply[key] || 0.0;
            cached = parseInt(cached.value);
            cached = cached.toFixed(14);
  
            if (tokenSupply != cached) {
              setTokenSupply(cached);
              setTokenSupplyKey(key);
            }
          }
        }
  
        if(gameTokenKey == null || gameTokenBalance == null) {
          const key = GameToken.methods["getBalance"].cacheCall(account, {
            from: account
          });
  
          if (GameTokenState.getBalance.hasOwnProperty(key)) {
            let cached: any = GameTokenState.getBalance[key] || 0.0;
            cached = parseInt(cached.value);
            cached = cached.toFixed(14);
  
            if (cached != gameTokenBalance) {
              setGameTokenBalance(cached);
              setGameTokenKey(key);
            }
          }
        }
      }
    });
  
    const buyToken: any = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
      if (account) {
        const GameToken = drizzle.contracts.GameToken;
  
        const stackId: any = GameToken.methods["purchase"].cacheSend(account, 1, {
          from: account
        })
  
        setGameTokenKey(null);
        setTokenSupplyKey(null);
        setTransactionId(stackId);
      }
    }
  
    const sellToken: any = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
  
      if (account) {
        const GameToken = drizzle.contracts.GameToken;
        setGameTokenKey(null);
  
        const stackId: any = GameToken.methods["sell"].cacheSend(account, 1, {
          from: account
        })
  
        setGameTokenKey(null);
        setTokenSupplyKey(null);
        setTransactionId(stackId);
      }
    }
  
    return (
    <Card>
      <CardContent >
        <Typography
          variant="h4"
          component="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >My Account
        </Typography>
        {
          account && (
              <Typography>
                <strong>Account: {account}</strong>
              </Typography>
          )
        }
        {
          balance && (
              <Typography>
                <strong>Ξ Balance: {balance}</strong>
              </Typography>
          )
        }
        {
          gameTokenBalance && (
              <Typography>
                <strong>Credit Balance: {gameTokenBalance}</strong>
              </Typography>
          )
        }
        {
          !initialized && (
            <Typography>
              <strong>Please connect with your web wallet.</strong>
            </Typography>
          )
        }
      </CardContent>
    </Card>
  )
};

export default Account;