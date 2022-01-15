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
    <Container maxWidth="sm">
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
  );
};

export default Market;
