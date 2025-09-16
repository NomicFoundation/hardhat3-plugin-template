import { MyPluginEthersExtensions, MyPluginViemExtensions } from "./types.js";

import "@nomicfoundation/hardhat-ethers/types";
declare module "@nomicfoundation/hardhat-ethers/types" {
  interface HardhatEthersHelpers {
    myPlugin: MyPluginEthersExtensions;
  }
}

import "@nomicfoundation/hardhat-viem/types";
declare module "@nomicfoundation/hardhat-viem/types" {
  interface HardhatViemHelpers {
    myPlugin: MyPluginViemExtensions;
  }
}
