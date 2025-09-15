import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createFixtureProjectHRE } from "./helpers/fixture-projects.js";

describe("MyPlugin: custom accounts", () => {
  it("Should return the hardcoded account", async () => {
    const hre = await createFixtureProjectHRE("base-project");

    const { provider } = await hre.network.connect();
    assert.deepEqual(await provider.request({ method: "eth_accounts" }), [
      "0x1111111111111111111111111111111111111111",
    ]);
  });
});
