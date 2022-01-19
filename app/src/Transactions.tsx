import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

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

  let items: any = [];

  if (initialized) {

  items = drizzleState.transactionStack.map((txId: any) => {
    if (drizzleState.transactions[txId]) {
        return (
          <TableRow key={txId}>
            <TableCell>
              {txId}
            </TableCell>
            <TableCell>
              {drizzleState.transactions[txId].status}
            </TableCell>
          </TableRow>
        );
        
      }
  });
  }

  return (
      <Card>
        <CardContent>
          <Typography
            variant="h3"
            component="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Transactions
          </Typography>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <caption>Transactions</caption>
        <TableHead>
          <TableRow>
            <TableCell>Transaction Hash</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { initialized && items }
        </TableBody>
        </Table>
    </TableContainer>
    </CardContent>
    </Card>
  );
};

export default Transactions;
