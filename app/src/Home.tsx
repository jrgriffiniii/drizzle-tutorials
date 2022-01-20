import React, { useState, useEffect } from 'react';
import logo from './logo.svg';

import Account from './Account';
import Exchange from './Exchange';
import Market from './Market';
import Transactions from './Transactions';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import ShopIcon from '@material-ui/icons/Shop';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

type HomeProps = {
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

const Home: Function = ({ drizzle, drizzleState, initialized }: HomeProps) => {
  const classes = useStyles();

  return (
    <div className="App">
      <CssBaseline />
      <Navbar />

      <main>
        <Container maxWidth="sm">
          {initialized && (
            <Account
              drizzle={drizzle}
              drizzleState={drizzleState}
              initialized={initialized}
            />
          )}
          <Transactions drizzleState={drizzleState} initialized={initialized} />

          <Exchange
            drizzle={drizzle}
            drizzleState={drizzleState}
            initialized={initialized}
          />

          <Market
            drizzle={drizzle}
            drizzleState={drizzleState}
            initialized={initialized}
          />
        </Container>
      </main>

      <footer className={classes.footer}>
        <Copyright />
      </footer>
    </div>
  );
};

export default Home;
