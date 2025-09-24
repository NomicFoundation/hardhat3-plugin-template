import { describe, it } from "node:test";

import assert from "node:assert/strict";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types/config";
import { resolvePluginConfig, validatePluginConfig } from "../src/config.js";

describe("MyPlugin config", () => {
  describe("Config validation", () => {
    describe("Valid cases", () => {
      it("Should consider an empty config as valid", async () => {
        const validationErrors = await validatePluginConfig({});

        assert.equal(validationErrors.length, 0);
      });

      it("Should consider a newtwork without a myAccountIndex as valid", async () => {
        const validationErrors = await validatePluginConfig({
          networks: {
            foo: {
              type: "http",
              url: "http://localhost:8545",
            },
          },
        });

        assert.equal(validationErrors.length, 0);
      });

      it("Should accept a non-negative myAccountIndex", async () => {
        const validationErrors = await validatePluginConfig({
          networks: {
            foo: {
              type: "edr-simulated",
              myAccountIndex: 1,
            },
          },
        });

        assert.equal(validationErrors.length, 0);
      });

      it("Should ignore errors in other parts of the config, including the network", async () => {
        const validationErrors = await validatePluginConfig({
          networks: {
            foo: {
              type: "http",
              url: "INVALID",
              myAccountIndex: 1,
            },
          },
        });

        assert.equal(validationErrors.length, 0);
      });
    });

    describe("Invalid cases", () => {
      it("Should reject a myAccountIndex field with an invalid type", async () => {
        const validationErrors = await validatePluginConfig({
          networks: {
            foo: {
              type: "edr-simulated",
              // @ts-expect-error We're intentionally passing a string here
              myAccountIndex: "INVALID",
            },
          },
        });

        assert.deepEqual(validationErrors, [
          {
            path: ["networks", "foo", "myAccountIndex"],
            message: "Expected a non-negative number.",
          },
        ]);
      });

      it("Should reject a myAccountIndex with a negative value", async () => {
        const validationErrors = await validatePluginConfig({
          networks: {
            foo: {
              type: "edr-simulated",
              myAccountIndex: -1,
            },
          },
        });

        assert.deepEqual(validationErrors, [
          {
            path: ["networks", "foo", "myAccountIndex"],
            message: "Expected a non-negative number.",
          },
        ]);
      });

      it("Should validate all the networks", async () => {
        const validationErrors = await validatePluginConfig({
          networks: {
            foo: {
              type: "edr-simulated",
              myAccountIndex: -1,
            },
            valid: {
              type: "edr-simulated",
              myAccountIndex: 1,
            },
            bar: {
              type: "edr-simulated",
              myAccountIndex: -2,
            },
          },
        });

        assert.deepEqual(validationErrors, [
          {
            path: ["networks", "foo", "myAccountIndex"],
            message: "Expected a non-negative number.",
          },
          {
            path: ["networks", "bar", "myAccountIndex"],
            message: "Expected a non-negative number.",
          },
        ]);
      });
    });
  });

  describe("Config resolution", () => {
    // By the time this plugin's resolution is called, Hardhat has already
    // run the base config resolution, including of the networks. This means
    // that the partially resolved config already has them, and all we need to
    // do is resolve the myAccountIndex field.

    // In these tests we only create the minimum partially resolved config,
    // that's not really valid, but that has the fields our resolution needs.

    it("Should resolve the default myAccountIndex of every network that's already partially resolved", async () => {
      const userConfig: HardhatUserConfig = {
        networks: {
          other: {
            type: "edr-simulated",
          },
        },
      };

      const partiallyResolvedConfig = {
        networks: {
          edr: {
            type: "edr-simulated",
          },
          http: {
            type: "http",
            url: "http://localhost:8545",
          },
          other: {
            type: "edr-simulated",
          },
        },
      } as unknown as HardhatConfig;

      const resolvedConfig = await resolvePluginConfig(
        userConfig,
        partiallyResolvedConfig,
      );

      assert.deepEqual(resolvedConfig.networks?.edr?.myAccountIndex, 0);
      assert.deepEqual(resolvedConfig.networks?.http?.myAccountIndex, 0);
      assert.deepEqual(resolvedConfig.networks?.other?.myAccountIndex, 0);
    });

    it("Should resolve the myAccountIndex as provided in the userConfig", async () => {
      const userConfig: HardhatUserConfig = {
        networks: {
          edr: {
            type: "edr-simulated",
            myAccountIndex: 1,
          },
          http: {
            type: "http",
            url: "http://localhost:8545",
            myAccountIndex: 2,
          },
          other: {
            type: "edr-simulated",
            myAccountIndex: 0,
          },
        },
      };

      const partiallyResolvedConfig = {
        networks: {
          edr: {
            type: "edr-simulated",
          },
          http: {
            type: "http",
            url: "http://localhost:8545",
          },
          other: {
            type: "edr-simulated",
          },
        },
      } as unknown as HardhatConfig;

      const resolvedConfig = await resolvePluginConfig(
        userConfig,
        partiallyResolvedConfig,
      );

      assert.deepEqual(resolvedConfig.networks?.edr?.myAccountIndex, 1);
      assert.deepEqual(resolvedConfig.networks?.http?.myAccountIndex, 2);
      assert.deepEqual(resolvedConfig.networks?.other?.myAccountIndex, 0);
    });
  });
});
