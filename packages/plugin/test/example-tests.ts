import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createFixtureProjectHRE } from "./helpers/fixture-projects.js";

describe("MyPlugin tests", () => {
  describe("Test using a fixture project", async () => {
    it("Should define my-task", async () => {
      const hre = await createFixtureProjectHRE("base-project");

      const conn = await hre.network.connect();
      assert.equal(
        await conn.provider.request({ method: "eth_blockNumber" }),
        "0x0",
        "The simulated chain is new, so it should be empty",
      );
    });
  });
});
