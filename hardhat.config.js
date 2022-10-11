require("@nomicfoundation/hardhat-toolbox");
//require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

//const { API_URL, PRIVATE_KEY } = process.env;
//const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/NTLEm2yPbb6DHLbJ7qC_SKrm21eoSfnP",
      accounts: [`0xb1f744981e9542547f68b2246d9c65da189df0033db442cddbb57b3b07fee922`]
    }
  },
  etherscan: {
    apiKey: `F8AFXJMJM6XNNGAYYZ3BDY3ZWM5RHXG5GD`
  }
};
