import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY!],
    },
    chiado: {
      url: process.env.CHIADO_RPC_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY!],
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY!],
    },
    hardhat: {
      forking: {
        url: process.env.GOERLI_RPC_URL!,
        blockNumber: 8833972,
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
