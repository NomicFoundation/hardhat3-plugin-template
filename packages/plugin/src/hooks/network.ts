import assert from "node:assert";
import type { HookContext, NetworkHooks } from "hardhat/types/hooks";
import { ChainType, NetworkConnection } from "hardhat/types/network";
import { JsonRpcResponse } from "hardhat/types/providers";

interface MyPluginNetworkConnectionState {
  foo: number;
}

export default async (): Promise<Partial<NetworkHooks>> => {
  console.log(
    "An instance of the HRE is using the network hooks for the first time",
  );

  // You can handle your per-connection state here. We recommend using a WeakMap
  // to store that state, so that it gets cleaned up automatically when the
  // connection is garbage collected.

  const connectionStates = new WeakMap<
    NetworkConnection<string>,
    MyPluginNetworkConnectionState
  >();

  const handlers: Partial<NetworkHooks> = {
    async newConnection<ChainTypeT extends ChainType | string>(
      context: HookContext,
      next: (
        nextContext: HookContext,
      ) => Promise<NetworkConnection<ChainTypeT>>,
    ): Promise<NetworkConnection<ChainTypeT>> {
      const connection = await next(context);

      console.log("Connection created with ID", connection.id);

      connectionStates.set(connection, { foo: 123 });

      // NOTE: You may want to disable the behavior of your plugin based on
      // the network config and type, which you can access with the connection.
      // Same for the other hooks.

      return connection;
    },
    async onRequest(context, networkConnection, jsonRpcRequest, next) {
      console.log(
        `Request from connection ${networkConnection.id} is being processed — Method: ${jsonRpcRequest.method}`,
      );

      // You can access the connection state here
      const connectionState = connectionStates.get(networkConnection);
      assert(connectionState !== undefined);

      // Here you can have custom handlers for any JSON-RPC method that you want

      // For example, you could return a single account for eth_accounts,
      // without calling `next`.

      if (jsonRpcRequest.method === "eth_accounts") {
        const customResponse: JsonRpcResponse = {
          jsonrpc: "2.0",
          id: jsonRpcRequest.id,
          result: ["0x1111111111111111111111111111111111111111"],
        };

        return customResponse;
      }

      // To create a plugin that overrides the account management, you
      // should override the behaviour of:
      //  - eth_accounts
      //  - eth_requestAccounts
      //  - eth_sign
      //  - personal_sign
      //  - eth_signTypedData_v4
      //  - eth_sendTransaction
      //
      // There's an example of a module that does that in
      //   https://github.com/NomicFoundation/hardhat/blob/main/v-next/hardhat/src/internal/builtin-plugins/network-manager/request-handlers/handlers/accounts/local-accounts.ts
      //
      //   This module implements the built-in logic that signs with the private
      //   keys provided by the user.

      // If the user is calling any other method, we just call `next`.
      return next(context, networkConnection, jsonRpcRequest);
    },
    closeConnection(context, networkConnection, next) {
      // You can clean up any per-connection state here, so that it gets
      // freed up if the connection is explicitly closed.

      connectionStates.delete(networkConnection);

      return next(context, networkConnection);
    },
  };

  return handlers;
};
