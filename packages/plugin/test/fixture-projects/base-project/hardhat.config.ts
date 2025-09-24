import { HardhatUserConfig } from "hardhat/config";
import MyPlugin from "../../../src/index.js";

const config: HardhatUserConfig = {
  plugins: [MyPlugin],
  networks: {
    withMyAccountIndex: {
      type: "edr-simulated",
      myAccountIndex: 1,
    },
    withoutMyAccountIndex: {
      type: "edr-simulated",
    },
    withCustomAccounts: {
      type: "edr-simulated",
      accounts: [
        {
          privateKey:
            "0x1234567890123456789012345678901234567890123456789012345678901234",
          balance: "1000000000000000000",
        },
      ],
      myAccountIndex: 0,
    },
    withMyAccountIndexTooHigh: {
      type: "edr-simulated",
      myAccountIndex: 100000,
    },
    withoutAccounts: {
      type: "edr-simulated",
      accounts: [],
    },
  },
};

export default config;
