import { HardhatUserConfig } from "hardhat/config";
import myPlugin from "hardhat-plugin-template";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";

export default {
  // NOTE: Because this is just a prototype myPlugin must go last.
  plugins: [hardhatEthers, myPlugin],
  solidity: "0.8.29",
} satisfies HardhatUserConfig;
