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

      if (connection.viem) {
        connection.viem.myPlugin = {
          getAccounts: async () => {
            const walletClients = await connection.viem.getWalletClients();

            return walletClients.map((walletClient) => walletClient.account);
          },
        };
      }

      if (connection.ethers) {
        connection.ethers.myPlugin = {
          getAccounts: async () => {
            return connection.ethers.getSigners();
          },
        };
      }

      return connection;
    },
  };

  return handlers;
};
