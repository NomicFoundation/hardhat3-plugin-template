import { HardhatUserConfig } from "hardhat/config";
import myPlugin from "hardhat-my-plugin";

export default {
  plugins: [myPlugin],
  solidity: "0.8.29",
  networks: {
    default: {
      type: "edr-simulated",
      myAccountIndex: 1,
    },
  },
} satisfies HardhatUserConfig;
