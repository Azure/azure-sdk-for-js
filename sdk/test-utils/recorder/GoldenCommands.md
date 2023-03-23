## Useful Commands while Testing your packages

If you're not familiar with the recorder refer to [recorder-readme](./README.md).
If you're looking to migrate your existing package from recorder v1 to v3, refer to [migrate-v1-to-v3](./MIGRATION.md).
If you're looking to be onboarded to the asset-sync workflow to push out the test recordings to `Azure/azure-sdk-assets` repository, refer to [asset-sync-migration](./ASSET_SYNC_MIGRATION.md).

### `rush` Commands

| script name       | What does it do?                                                                                                |
| :---------------- | :-------------------------------------------------------------------------------------------------------------- |
| `rush update`     | Updates dependencies                                                                                            |
| `rush build -t .` | Expected to be run from inside your package(`sdk/service-name/package-name`). Builds the whole dependency tree. |
|                   |                                                                                                                 |

### `rushx` Commands - to run the tests

| script name                      | command(usually)                                                                                                 |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `rushx unit-test:browser`        | `dev-tool run test:browser`                                                                                      |
| `rushx unit-test:node`           | `dev-tool run test:node-ts-input -- --timeout 1200000 --exclude 'test/**/browser/*.spec.ts' 'test/**/*.spec.ts'` |
| `rushx integration-test:browser` | `dev-tool run test:browser`                                                                                      |
| `rushx integration-test:node`    | `dev-tool run test:node-js-input -- --timeout 5000000 'dist-esm/test/**/*.spec.js'`                              |
|                                  |                                                                                                                  |

### After migrating to asset-sync

Expects that you have `dev-tool` among your devDependencies.
Expects that you have [powershell] installed.

| script name                                      | What does it do?                                                                                                                                                                                                                                                                                                                     |
| :----------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npx dev-tool test-proxy init`                   | [Only once per package] Generates the `assets.json` with an empty tag.                                                                                                                                                                                                                                                               |
| `npx dev-tool test-proxy migrate --initial-push` | [Only once per package] To migrate the test recordings to the assets repo for the first time. Also generates `assets.json`                                                                                                                                                                                                           |
| `npx dev-tool test-proxy push`                   | To migrate the test recordings to the assets repo for the first time.                                                                                                                                                                                                                                                                |
| `npx dev-tool test-proxy reset`                  | Reverts the local changes to recordings and resets to what is currently checked in to the assets repo. This is a destructive operation.                                                                                                                                                                                              |
| `npx dev-tool test-proxy restore`                | Pulls the recordings from the assets repo that are referenced in your `assets.json`. Typically this will be done automatically when you first run tests in playback if the recordings haven't been downloaded already. But you can run this command in advance if you'd like to download them earlier, for example for offline work. |
|                                                  |                                                                                                                                                                                                                                                                                                                                      |

[powershell]: https://github.com/PowerShell/PowerShell
