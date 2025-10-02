import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { NetworkConnection } from "hardhat/types/network";
import { HardhatPluginError } from "hardhat/plugins";
import { createFixtureProjectHRE } from "./helpers/fixture-projects.js";

async function assertMyAccount(
  networkConnection: NetworkConnection,
  accountIndex: number,
) {
  const accounts: string[] = await networkConnection.provider.request({
    method: "eth_accounts",
  });

  assert.equal(networkConnection.myAccount, accounts[accountIndex]);
}

describe("myAccount initialization on network connection", () => {
  it("should initialize the myAccount field on the network connection", async () => {
    const hre = await createFixtureProjectHRE("base-project");

    await assertMyAccount(await hre.network.connect("withMyAccountIndex"), 1);
    await assertMyAccount(
      await hre.network.connect("withoutMyAccountIndex"),
      0,
    );
  });

  it("should take into account the `accounts` field", async () => {
    const hre = await createFixtureProjectHRE("base-project");

    await assertMyAccount(await hre.network.connect("withCustomAccounts"), 0);
  });

  it("should throw a plugin error if the myAccountIndex is too high with respect to the accounts", async () => {
    const hre = await createFixtureProjectHRE("base-project");

    await assert.rejects(
      async () => {
        await hre.network.connect("withMyAccountIndexTooHigh");
      },
      HardhatPluginError,
      "hardhat-plugin-template: Invalid index 100000 for myAccount when connecting to network withMyAccountIndexTooHigh",
    );

    await assert.rejects(
      async () => {
        await hre.network.connect("withoutAccounts");
      },
      HardhatPluginError,
      "hardhat-plugin-template: Invalid index 0 for myAccount when connecting to network withoutAccounts",
    );
  });
});
