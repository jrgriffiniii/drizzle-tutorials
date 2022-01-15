import GameToken from './contracts/GameToken.json';
import Commodity from './contracts/Commodity.json';

const options: any = {
  contracts: [GameToken, Commodity],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545',
    },
  },
  events: {},
};

export default options;
