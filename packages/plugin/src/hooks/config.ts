import type { ConfigHooks } from "hardhat/types/hooks";

export default async (): Promise<Partial<ConfigHooks>> => {
  const handlers: Partial<ConfigHooks> = {
    async validateUserConfig(userConfig) {
      if (userConfig.myConfig === undefined) {
        return [];
      }

      if (typeof userConfig.myConfig !== "object") {
        return [
          {
            path: ["myConfig"],
            message: "Expected an object with an optional greeting.",
          },
        ];
      }

      const greeting = userConfig.myConfig?.greeting;
      if (greeting === undefined) {
        return [];
      }

      if (typeof greeting !== "string" || greeting.length === 0) {
        return [
          {
            path: ["myConfig", "greeting"],
            message: "Expected a non-empty string.",
          },
        ];
      }

      return [];
    },
    async resolveUserConfig(userConfig, resolveConfigurationVariable, next) {
      const resolved = await next(userConfig, resolveConfigurationVariable);

      const greeting = userConfig.myConfig?.greeting ?? "Hello";
      const myConfig = { greeting };

      return {
        ...resolved,
        myConfig,
      };
    },
  };

  return handlers;
};
