import { HardhatUserConfig } from "hardhat/config";
import myPlugin from "./src/index.js";

export default {
  plugins: [myPlugin],
} satisfies HardhatUserConfig;
