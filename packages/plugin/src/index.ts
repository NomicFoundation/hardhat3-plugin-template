import type { HardhatPlugin } from "hardhat/types/plugins";

import "./type-extensions.js";

const plugin: HardhatPlugin = {
  id: "hardhat-plugin-template",
  hookHandlers: {
    network: () => import("./hooks/network.js"),
  },
  dependencies: () => {
    // These plugins shouldn't be dependencies, I'm only referring them here
    // with an import so that their type-extensions get loaded. This
    // would instead happen in the `condition` of the conditional plugins.
    import("@nomicfoundation/hardhat-ethers");
    import("@nomicfoundation/hardhat-viem");
    return [];
  },
  /*
  conditionalPlugins: [
    {
      // The condition should read as:
      //  - If we can resolve all the imports successfully, and they are
      //    plugins that the user already uses (directly or indirectly) in their
      //    config, then we load the plugin, and add it to the list of plugins.
      condition: () => [import("@nomicfoundation/hardhat-ethers")],
      plugin: () => import("./conditional-plugins/ethers.js"),
    },
    {
      condition: () => [import("@nomicfoundation/hardhat-viem")],
      plugin: () => import("./conditional-plugins/viem.js"),
    },
  ]
  */
};

export default plugin;
