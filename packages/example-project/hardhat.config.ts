import { HardhatUserConfig } from "hardhat/config";
import myPlugin from "hardhat-plugin-template";

export default {
  plugins: [myPlugin],
  solidity: "0.8.29",
  myConfig: {
    greeting: "Hola",
  },
} satisfies HardhatUserConfig;
