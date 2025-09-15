import { HardhatUserConfig } from "hardhat/config";
import myPlugin from "hardhat-plugin-template";

export default {
  plugins: [myPlugin],
  myConfig: {
    greeting: "",
  },
} satisfies HardhatUserConfig;
