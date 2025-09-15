import { MyPluginConfig, MyPluginUserConfig } from "./types.js";

import "hardhat/types/config";
declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    myConfig?: MyPluginUserConfig;
  }

  interface HardhatConfig {
    myConfig: MyPluginConfig;
  }
}
