require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Mnemonic } = require('ethers');

module.exports = {

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000
    },

    goerli: {
      provider: new HDWalletProvider({
        mnemonic: {
          phrase: process.env.SECRET, 
        },
        providerOrUrl: "https://goerli.infura.io/v3/a34ef793d1db401ebae443c3d92886d7"
      }),
      network_id: 5,
    }

  },

  compilers: {

    solc: {

      version: "0.8.17",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }

    }
  }
  
};

