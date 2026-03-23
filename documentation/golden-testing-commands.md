# Useful Commands while Testing your packages

If you're not familiar with the recorder refer to [recorder-readme](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md).

If you're looking to be onboarded to the asset-sync workflow to push out the test recordings to `Azure/azure-sdk-assets` repository, refer to [asset-sync-workflow](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md).

## `pnpm` Commands

| script name             | What does it do?                                                                                                |
|:------------------------|:----------------------------------------------------------------------------------------------------------------|
| `pnpm install`          | Updates dependencies                                                                                            |
| `pnpm -F {./}... build` | Expected to be run from inside your package(`sdk/service-name/package-name`). Builds the whole dependency tree. |
|                         |                                                                                                                 |

## Commands - to run the tests inside the package directory

| script name            | command(usually)                     |
|:-----------------------|:-------------------------------------|
| `npm run test:browser` | `dev-tool run test:vitest --browser` |
| `npm run test:node`    | `dev-tool run test:vitest`           |
|                        |                                      |

## After migrating to asset-sync

Expects that you have `dev-tool` among your devDependencies.
Expects that you have [powershell] installed.

| script command | What does it do?                                                                                                                                                                                                                                                                                                                     |
| :----------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npx dev-tool test-proxy init`                   | **[Only once per package]** Generates the `assets.json` with an empty tag. After `init`, run test commands such as `npm run test:node` to generate test recordings and `push` them.                                                                                                                                                                                                                                                               |
| `npx dev-tool test-proxy migrate --initial-push` | **[Only once per package]** To migrate the test recordings to the assets repo for the first time. Also generates `assets.json`                                                                                                                                                                                                           |
| `npx dev-tool test-proxy push`                   | To push the test recordings to the assets repo.                                                                                                                                                                                                                                                                |
| `npx dev-tool test-proxy reset`                  | Reverts the local changes to recordings and resets to what is currently checked in to the assets repo. This is a destructive operation.                                                                                                                                                                                              |
| `npx dev-tool test-proxy restore`                | Pulls the recordings from the assets repo that are referenced in your `assets.json`. Typically this will be done automatically when you first run tests in playback if the recordings haven't been downloaded already. But you can run this command in advance if you'd like to download them earlier, for example for offline work. |
|                                                  |                                                                                                                                                                                                                                                                                                                                      |

## Debug logs from test-proxy tool
|script command | What does it do? |
| :----------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dev-tool run test:vitest --test-proxy-debug`                   |  Provides helpful test-proxy debug logs that include sanitization modifications for both the central sanitizers and the user-specified ones.                                                                                                                                                                                                                                                             |

## Run a single test instead of the whole test suite
### [Method 1] The .only way
1. Update the vitest.config.ts as follows to include the test file you're interested in.
```ts
export default mergeConfig(
  {
    ...viteConfig,
    test: {
      include: ["test/public/node/analysis.spec.ts"],
    },
  },
  defineConfig({
    test: {
      testTimeout: 1200000,
      hookTimeout: 1200000,
    },
  }),
);
```
2. Set `.only` on the test you're interested in
```ts
   it.only("test title...")
```
Run the test command such as `npm run unit-test:node` to run the test

[powershell]: https://github.com/PowerShell/PowerShell

## [Method 2] --testNamePattern
```bash
npm run integration-test:node -- --testNamePattern "simple"
```
Reference - [Filtering Tests — Introduction to Testing JavaScript with Vitest](https://stevekinney.net/courses/testing/filtering-tests)

## [Method 3] -- test file
```bash
npm run test:node -- test/public/metricsClient.spec.ts
```