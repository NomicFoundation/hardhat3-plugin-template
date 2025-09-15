import "hardhat/types/config";
declare module "hardhat/types/config" {
  export interface EdrNetworkUserConfig {
    myAccountIndex?: number;
  }

  export interface EdrNetworkConfig {
    myAccountIndex: number;
  }

  export interface HttpNetworkUserConfig {
    myAccountIndex?: number;
  }

  export interface HttpNetworkConfig {
    myAccountIndex: number;
  }
}

import "hardhat/types/network";
declare module "hardhat/types/network" {
  export interface NetworkConnection {
    myAccount: string;
  }
}

import "hardhat/types/network";
declare module "hardhat/types/network" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Delete this line if you add fields to the NetworkConnection type
  interface NetworkConnection<
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- You can ignore or remove this type parameters if your plugin doesn't use them
    ChainTypeT extends ChainType | string = DefaultChainType,
  > {
    // Add your network connection properties here
  }
}
