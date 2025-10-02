import { task } from "hardhat/config";
import { ArgumentType } from "hardhat/types/arguments";
import type { HardhatPlugin } from "hardhat/types/plugins";

import "./type-extensions.js";

const plugin: HardhatPlugin = {
  id: "hardhat-my-plugin",
  hookHandlers: {
    config: () => import("./hooks/config.js"),
    network: () => import("./hooks/network.js"),
  },
  tasks: [
    task("my-account", "Prints your account.")
      .addOption({
        name: "title",
        description: "The title to use before printing the account.",
        type: ArgumentType.STRING,
        defaultValue: "My account:",
      })
      .setAction(() => import("./tasks/my-account.js"))
      .build(),
  ],
};

export default plugin;
