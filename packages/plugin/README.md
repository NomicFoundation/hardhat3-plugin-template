# `hardhat-plugin-template`

This is an example plugin that adds a task that prints a greeting.

## Installation

To install this plugin, run the following command:

```bash
npm install --save-dev hardhat-plugin-template
```

In your `hardhat.config.ts` file, import the plugin and add it to the `plugins` array:

```ts
import hardhatPluginTemplate from "hardhat-plugin-template";

export default {
  plugins: [hardhatPluginTemplate],
};
```

## Usage

The plugin adds a new task called `my-task`. To run it, use the following command:

```bash
npx hardhat my-task
```

You should see the following output:

```
Hello, Hardhat!
```

### Configuration

You can configure the greeting that's printed by using the `myConfig` field in your Hardhat config. For example, you can have the following configuration:

```ts
import hardhatPluginTemplate from "hardhat-plugin-template";

export default {
  plugins: [hardhatPluginTemplate],
  myConfig: {
    greeting: "Hola",
  },
  //...
};
```

### Network logs

This plugin also adds some example code to log different network events. To see it in action, all you need to do is run your Hardhat tests, deployment, or a script.
