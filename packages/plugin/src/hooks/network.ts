import { HardhatPluginError } from "hardhat/plugins";
import type { HookContext, NetworkHooks } from "hardhat/types/hooks";
import { ChainType, NetworkConnection } from "hardhat/types/network";

export default async (): Promise<Partial<NetworkHooks>> => {
  const handlers: Partial<NetworkHooks> = {
    async newConnection<ChainTypeT extends ChainType | string>(
      context: HookContext,
      next: (
        nextContext: HookContext,
      ) => Promise<NetworkConnection<ChainTypeT>>,
    ): Promise<NetworkConnection<ChainTypeT>> {
      const connection = await next(context);

      // Get the accounts from the connection
      const accounts: string[] = await connection.provider.request({
        method: "eth_accounts",
      });

      const myAccountIndex = connection.networkConfig.myAccountIndex;

      if (accounts.length <= myAccountIndex) {
        throw new HardhatPluginError(
          `hardhat-plugin-template`,
          `Invalid index ${myAccountIndex} for myAccount when connecting to network ${connection.networkName}`,
        );
      }

      connection.myAccount = accounts[myAccountIndex];

      return connection;
    },
  };

  return handlers;
};
