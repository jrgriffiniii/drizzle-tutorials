import React from 'react';
import Home from './Home';

import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";

import GameToken from "./contracts/GameToken.json";

const drizzleOptions: any = {
  contracts: [GameToken],
  events: {}
};
const drizzle: any = new Drizzle(drizzleOptions);

type DrizzleContextProps = {
  drizzle: any;
  drizzleState: any;
  initialized: any;
};

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
      {
        ({drizzle, drizzleState, initialized}: DrizzleContextProps) => (
          <Home drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}></Home>
        )
      }
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
