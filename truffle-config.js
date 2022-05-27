// import "core-js/stable";
// import "regenerator-runtime/runtime";

require('@babel/register');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
// const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = process.env.PRIVATE_KEYS 
// console.log(privateKeys)

module.exports = {
  networks: {
    development:{
      host: "127.0.0.1",
      port: "7545",
      network_id: "*"
    },
    kovan:{
      provider: function(){
        return new HDWalletProvider(
          privateKeys.split(","), // array of account of private keys
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}` //url to an ethereum node
        )
      },
      gas:5000000,
      gasPrice:25000000000,
      network_id:42,
    }
  },

  contracts_directory: './src/contracts',
  contracts_build_directory: './src/abis',

  // Configure your compilers
  compilers: {
    solc: {
      optimizer:{
        enabled:true,
        runs:200
      }
      // version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};
