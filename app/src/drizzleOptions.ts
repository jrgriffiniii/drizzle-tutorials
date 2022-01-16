import GameToken from './contracts/GameToken.json';
import Commodity from './contracts/Commodity.json';
import CornContract from './contracts/CornContract.json';

const options: any = {
  contracts: [GameToken, Commodity, CornContract],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545',
    },
  },
  events: {},
};

export default options;
