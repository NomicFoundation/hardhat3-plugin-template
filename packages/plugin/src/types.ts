import type { Account } from "viem";

import type { Signer } from "ethers";

export interface MyPluginEthersExtensions {
  getAccounts: () => Promise<Signer[]>;
}

export interface MyPluginViemExtensions {
  getAccounts: () => Promise<Account[]>;
}
