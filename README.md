# Hardhat 3 plugin template

This repository is a template for creating a Hardhat 3 plugin.

## Getting started

> This repository is structured as a pnpm monorepo, so make sure you have [`pnpm`](https://pnpm.io/) installed first

To get started, clone the repository and run:

```sh
pnpm install
pnpm build
```

This will install all the dependencies and build the plugin.

You can now run the tests of the plugin with:

```sh
pnpm test
```

And try the plugin out in `packages/example-project` with:

```sh
cd packages/example-project
pnpm hardhat my-task
```

which should print `Hola, Hardhat!`.

## Understanding the repository structure

### Monorepo structure

This repository is structured as a pnpm monorepo with the following packages:

- `packages/plugin`: The plugin itself.
- `packages/example-project`: An example Hardhat 3 project that uses the plugin.

All the development will happen in the `packages/plugin` directory, while `packages/example-project` is a playground to experiment with your plugin, and manually test it.

### Github Actions setup

This repository is setup with a Github Actions workflow. You don't need to do anything to set it up, it runs your on every push to `main`, on pull requests, and when manual triggered.

The workflow is equivalent to running this steps in the root of the repository:

```sh
pnpm install
pnpm build
pnpm test
pnpm lint
```

It runs using Node.js versions 22 and 24, on an `ubuntu-latest` runner.

## Development tips

- We recommend leaving a terminal with `pnpm watch` running in the root of the repository. That way, things will normally be rebuilt by the time you try them out in `packages/example-project`.
