Migrating recordings to the `azure-sdk-assets` repository
=========================================================

## Some background

Recordings take up a large amount of space in our repository and generate a lot of churn. The asset sync project, owned by our Engineering System team, is a solution to this problem. Leveraging and extending the existing test proxy, the asset sync extension adds support for moving the recordings outside of the main azure-sdk-for-js repo.

## Performing the migration

Firstly, the package you are migrating needs to be using the new version of the recorder that uses the test proxy (`@azure-tools/test-recorder@^2.0.0`). Most packages are using the new recorder already; if yours is not you should migrate as soon as possible. More detail on migrating to the new recorder can be found in the [recorder 2.0 migration guide].

Migrating the recordings to the assets repository is simple. There are two things you need to do:

### Step 1. Add environment variable to `karma.conf.js` for browser tests

An additional environment variable needs to be exposed to the browser in your Karma configuration, to tell the test proxy where the `assets.json` file is located. Add the `RECORDING_ASSETS_PATH` environment variable in the same way you would have added the `RECORDINGS_RELATIVE_PATH` environment variable when migrating to the v2 recorder. After the change, the top of your Karma configuration should have something like:

```js
const { relativeRecordingsPath, relativeAssetsPath } = require("@azure-tools/test-recorder");

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();
process.env.RECORDING_ASSETS_PATH = relativeAssetsPath();
```

and the `envPreprocessor` property of the config should have entries for both `"RECORDINGS_RELATIVE_PATH"` and `"RECORDING_ASSETS_PATH"`:

```js
module.exports = function(config) {
  config.set({
    // ... other config options omitted
    
    envPreprocessor: [
      // ... other environment variables omitted
      "RECORDINGS_RELATIVE_PATH",
      "RECORDING_ASSETS_PATH",
    ],
  });
}
```

### Step 2. Migrate the assets using `dev-tool`

The second step will remove your recordings from the repo and move them to the assets repository. With `dev-tool` and Powershell installed, run the following in your package directory:

```bash
$ npx dev-tool test-proxy migrate --initial-push
```

Once this is done, validate that your recorded tests still pass, and create a PR with the changes. That's it!

## Workflow with asset sync enabled

There are a couple of extra steps that need to be taken when making changes to recordings (adding new tests or re-recording) to keep the assets repo in sync.

### Workflow when updating recordings

The only real change to the workflow of updating recordings is having to push the recordings to the assets repo before you push your branch. Re-record your recordings as normal, then once you're happy with what you have and your tests are passing, run

```bash
$ npx dev-tool test-proxy push
```

This command will push the new recordings to the assets repo and update the tag in `assets.json`. Include the change to `assets.json` in your PR.

### `test-proxy` commands

A couple of commands have been added to `dev-tool` to facilitate pushing and fetching the recordings to and from your local:

- `dev-tool test-proxy push`: use this command to push recordings to the assets repo when you have finished re-recording. This command will push your changes to the assets repo and update the tag in `assets.json` to reference the newly pushed recordings. The change to `assets.json` must be checked in for the test proxy to use the new recordings outside of your local environment.
- `dev-tool test-proxy restore`: this command will pull the recordings from the assets repo that are referenced in your `assets.json`. Typically this will be done automatically when you first run recorded tests if the recordings haven't been downloaded already, but you can run this command in advance if you'd like to download them earlier, for example for offline work.
- `dev-tool test-proxy reset`: if you've made any changes to the recordings locally, you can use this to revert those local changes and reset to what is currently checked in to the assets repo. This is a destructive operation and if you have local changes it will prompt you before removing your work.
- `dev-tool test-proxy migrate`: used for migrating existing recordings to the assets repo as described above.

### Working offline

Offline work is supported out-of-the-box. Of course, however, you won't be able to push or pull from the assets repo while offline. You can fetch recordings from the assets repo by running `npx dev-tool test-proxy restore`. This will download the recordings (and the test proxy executable, if you haven't got that already), making them ready for you to run tests with.

## Further reading

- [Asset Sync reference in azure-sdk-tools](asset-sync-reference)
- [Recorder 2.0 migration guide]

[recorder 2.0 migration guide]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/MIGRATION.md
[asset-sync-reference]: https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/documentation/asset-sync