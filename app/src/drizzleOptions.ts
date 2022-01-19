import ExchangeToken from './contracts/ExchangeToken.json';
import CommodityContract from './contracts/CommodityContract.json';
import CornContract from './contracts/CornContract.json';

const options: any = {
  contracts: [ExchangeToken, CornContract],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://0.0.0.0:8545',
    },
  },
  events: {},
};

export default options;
