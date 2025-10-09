import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { HardhatPluginError } from "hardhat/plugins";

import { createFixtureProjectHRE } from "./helpers/fixture-projects.js";

describe("myAccount initialization on network connection", () => {
  it("should initialize the myAccount field on the network connection", async () => {
    const hre = await createFixtureProjectHRE("base-project");

    const connection = await hre.network.connect();
    const accounts: string[] = await connection.provider.request({
      method: "eth_accounts",
    });

    assert.equal(connection.myAccount, accounts[0]);
  });

  it("should throw a plugin error if the myAccountIndex is too high with respect to the accounts", async () => {
    const hre = await createFixtureProjectHRE("base-project");

    await assert.rejects(
      async () => {
        await hre.network.connect("withMyAccountIndexTooHigh");
      },
      HardhatPluginError,
      "hardhat-plugin-template: Invalid index 100000 for myAccount when connecting to network withMyAccountIndexTooHigh"
    );
  });
});
