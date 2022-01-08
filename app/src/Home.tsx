import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux'

import logo from './logo.svg';

import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import ShopIcon from '@material-ui/icons/Shop';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

type HomeProps = {
  drizzle: any;
  drizzleState: any;
  initialized: boolean;
};

type ProductProps = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  measurement: string;
  gtin: string;
};

type ProductsProps = {
  products: ProductProps[];
};

type AccountProps = {
  drizzle: any;
  drizzleState: any;
  initialized: boolean;
};

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    alignSelf: 'center',
  },
}));

const Copyright: Function = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        My Organization
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Navbar: Function = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <ShopIcon className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          My Market Game
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const Product: Function = ({
  name,
  description,
  price,
  gtin,
}: ProductProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="h5" component="h3">
            {description}
          </Typography>
          <Typography>
            <strong>Price:</strong> {price} Tokens
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <form>
            <FormControl fullWidth>
              <TextField label="Bushels" value="0" variant="outlined" />
            </FormControl>
            <Button color="primary" variant="contained" fullWidth>
              Buy
            </Button>
            <Button color="secondary" variant="contained" disabled fullWidth>
              Sell
            </Button>
          </form>
        </CardActions>
      </Card>
    </Grid>
  );
};

const Products: Function = ({ products }: ProductsProps) => {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {products.map((productProps, key) => (
          <Product key={key} {...productProps} />
        ))}
      </Grid>
    </Container>
  );
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
  const [tokenBalanceSync, setTokenBalanceSync] = useState<boolean>(false);

  const [transactionId, setTransactionId] = useState<any | null>(null);
  const [txPending, setTxPending] = useState<boolean>(false);

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

  let transaction: any = null;
  if (transactionId != null) {
    const { transactions, transactionStack } = drizzleState;
    const txHash = transactionStack[transactionId]; 
    transaction = transactions[txHash];
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
          tokenSupply && (
              <Typography>
                <strong>Token Supply: {tokenSupply}</strong>
              </Typography>
          )
        }
        {
          gameTokenBalance && (
              <Typography>
                <strong>🏦 Balance: {gameTokenBalance}</strong>
              </Typography>
          )
        }
        {
          cornBalance && (
              <Typography>
                <strong>🌽 Balance: {cornBalance}</strong>
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
      <CardActions>
          <Container>
          <form>
            <Button color="primary" variant="contained" fullWidth onClick={buyToken}>
              Buy Credits
            </Button>
            <Button color="primary" variant="contained" fullWidth onClick={sellToken}>
              Sell Credits
            </Button>
          </form>
          </Container>
              <Container>
          {
            initialized && transactionId != null && transaction != null && transaction.status == "success" && (
                <Typography>
                  Transaction: {transaction.receipt.transactionHash}
                </Typography>
            )
          }
          {
            initialized && transactionId != null && transaction == null && (
                <Typography>
                  Transaction in progress...
                </Typography>
            )
          }
          {
            initialized && account && !transactionId && (
                <Typography>
                  Please buy credits
                </Typography>
            )
          }
          {
            !initialized || !account && (
                <Typography>
                  Please connect your web wallet.
                </Typography>
            )
          }
              </Container>
      </CardActions>
    </Card>
  )
}

const Home: Function = ({ drizzle, drizzleState, initialized }: HomeProps) => {
  const classes = useStyles();
  const products: any[] = [
    {
      name: '☕',
      description: 'Coffee',
      price: 1,
      quantity: 1,
      measurement: 'bushel',
      gtin: '7-25272-73070-6',
    },
    {
      name: '🌽',
      description: 'Corn',
      price: 1,
      quantity: 1,
      measurement: 'bushel',
      gtin: '7-25272-73070-6',
    },
    {
      name: '🍞',
      description: 'Wheat',
      price: 1,
      quantity: 1,
      measurement: 'bushel',
      gtin: '7-25272-73070-6',
    },
    {
      name: '🌾',
      description: 'Rice',
      price: 1,
      quantity: 1,
      measurement: 'bushel',
      gtin: '7-25272-73070-6',
    },
  ];

  return (
    <div className="App">
      <CssBaseline />
      <Navbar />

      <main>
        <Container maxWidth="sm">
          { initialized && (
              <Account drizzle={drizzle} drizzleState={drizzleState} initialized={initialized} />
            )
          }

          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Commodities
          </Typography>

          <Products products={products} />
        </Container>
      </main>

      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  );
};

export default Home;