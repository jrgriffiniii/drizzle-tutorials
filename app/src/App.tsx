import React from 'react';

import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store';
import Home from './Home';

import GameToken from './contracts/MarketToken.json';
import CornContract from './contracts/CornContract.json';

import store from './middleware';

const drizzleOptions: any = {
  contracts: [GameToken, CornContract],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545',
    },
  },
  events: {},
};
const drizzle: any = new Drizzle(drizzleOptions, store);

type DrizzleContextProps = {
  initialized: any;
  drizzle: any;
  drizzleState: any;
};

const App = () => (
  <DrizzleContext.Provider drizzle={drizzle}>
    <DrizzleContext.Consumer>
      {({ drizzle, drizzleState, initialized }: DrizzleContextProps) => (
        <Home
          initialized={initialized}
          drizzle={drizzle}
          drizzleState={drizzleState}
        />
      )}
    </DrizzleContext.Consumer>
  </DrizzleContext.Provider>
);

export default App;
