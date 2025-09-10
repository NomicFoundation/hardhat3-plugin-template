import type { HardhatPlugin } from "hardhat/types/plugins";

export default {
  id: "hardhat-plugin-template",

  // The `npmPackage` field is only necessary if the `id` is not the npm package
  // name. This is useful when shipping multiple npm plugins in the same
  // package.
  // npmPackage: "hardhat-plugin-template",

  hookHandlers: {
    network: () => import("./hooks/network.js"),
  },
} satisfies HardhatPlugin;
