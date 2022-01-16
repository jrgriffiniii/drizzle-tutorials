import GameToken from './contracts/GameToken.json';
import CommodityContract from './contracts/CommodityContract.json';
import CornContract from './contracts/CornContract.json';

const options: any = {
  contracts: [GameToken, CornContract],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://0.0.0.0:8545',
    },
  },
  events: {},
};

export default options;
