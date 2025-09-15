import type { HookContext, NetworkHooks } from "hardhat/types/hooks";
import { ChainType, NetworkConnection } from "hardhat/types/network";

export default async (): Promise<Partial<NetworkHooks>> => {
  console.log(
    "An instance of Hardhat is using the network hooks for the first time",
  );

  const handlers: Partial<NetworkHooks> = {
    async newConnection<ChainTypeT extends ChainType | string>(
      context: HookContext,
      next: (
        nextContext: HookContext,
      ) => Promise<NetworkConnection<ChainTypeT>>,
    ): Promise<NetworkConnection<ChainTypeT>> {
      const connection = await next(context);

      console.log("Connection created with ID", connection.id);

      return connection;
    },
    async onRequest(context, networkConnection, jsonRpcRequest, next) {
      console.log(
        `Request from connection ${networkConnection.id} is being processed — Method: ${jsonRpcRequest.method}`,
      );

      return next(context, networkConnection, jsonRpcRequest);
    },
  };

  return handlers;
};
