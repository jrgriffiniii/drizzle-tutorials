import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';


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
            <strong>Price (Tokens):</strong> {price}
          </Typography>
          <Typography>
            <strong>Price (ETH):</strong> {price}
          </Typography>
          <Typography>
            <strong>Supply (Bushels):</strong> {price}
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

type MarketProps = {
  drizzle: any;
  drizzleState: any;
  initialized: boolean;
};

const Market: Function = ({
  drizzle,
  drizzleState,
  initialized,
}: MarketProps) => {
  const classes = useStyles();
  const products: any[] = [
    {
      name: '🌽',
      description: 'Corn',
      price: 1,
      quantity: 1,
      measurement: 'bushel',
      gtin: '7-25272-73070-6',
    }
  ]
  const productsFull: any[] = [
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

  const rows = [
    { id: 1, symbol: 'Corn', month: { symbol: 'MAR 2022', url: "https://www.cmegroup.com/markets/agriculture/grains/corn.quotes.html" }, bid: 1.0, ask: 2.0 },
    { id: 2, symbol: 'Corn', month: { symbol: 'MAY 2022', url: "https://www.cmegroup.com/markets/agriculture/grains/corn.quotes.html" }, bid: 1.0, ask: 2.0 },
    { id: 3, symbol: 'Corn', month: { symbol: 'MAR 2023', url: "https://www.cmegroup.com/markets/agriculture/grains/corn.quotes.html" }, bid: 1.0, ask: 2.0 },
  ];

  const items = rows.map((row: any, key: number) => {
    return (
      <TableRow key={key}>
        <TableCell align="right">
          <a href={row.month.url}>
            {row.month.symbol}
          </a>
        </TableCell>
        <TableCell align="right">
          {row.bid}
        </TableCell>
        <TableCell align="right">
          {row.ask}
        </TableCell>
        <TableCell align="right">
          <Button color="primary" variant="contained">
            Buy
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button color="secondary" variant="contained">
            Sell
          </Button>
        </TableCell>
      </TableRow>
    );
  });

  return (
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Corn Futures
          </Typography>
    <TableContainer component={Paper}>
      <Table aria-label="orders table">
        <caption>Commodity Futures Contracts</caption>
        <TableHead>
          <TableRow>
            <TableCell align="right">Month</TableCell>
            <TableCell align="right">Bid Price (ETH)</TableCell>
            <TableCell align="right">Ask Price (ETH)</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items}
        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
    </Card>
  );
};

export default Market;
