# Migrating recordings to the `azure-sdk-assets` repository

## Some background

Recordings take up a large amount of space in our repository and generate a lot of churn. The asset sync project, owned by our Engineering System team, is a solution to this problem. Leveraging and extending the existing test proxy, the asset sync extension adds support for moving the recordings outside of the main azure-sdk-for-js repo.

## Performing the migration

The package you are migrating needs to be using the new version of the recorder that uses the test proxy (`@azure-tools/test-recorder@^2.0.0`). Most packages are using the new recorder already; if yours is not you should migrate as soon as possible. More detail on migrating to the new recorder can be found in the [recorder 2.0 migration guide]. To run the migration script, you will need both [Powershell] and [`dev-tool`] installed. If you haven't installed `dev-tool` yet, you can install it as follows:

```bash
$ cd common/tools/dev-tool # (from your azure-sdk-for-js repo root)
$ npm install -g
```

```bash
$ npx dev-tool test-proxy migrate --initial-push
```

Once this is done, validate that your recorded tests still pass, and create a PR with the changes. That's it!

## Workflow with asset sync enabled

With asset sync enabled, there is one extra step that must be taken before you create a PR with changes to recorded tests: you must push the new recordings to the assets repo. This is done with the following command:

```bash
$ npx dev-tool test-proxy push
```

This command will:

1. Push your local recordings to a tag in the `Azure/azure-sdk-assets` repo, and
1. Update the `assets.json` in your package root to reference the newly created tag.

You should stage and commit the `assets.json` update as part of your PR. If you don't run the `push` command before creating a PR, the CI (and anyone else who tries to run your recorded tests) will use the old recordings, which will cause failures.

This diagram describes the new workflow (new steps highlighted):

```mermaid
graph TD
record[Record tests<pre>TEST_MODE=record rushx test</pre>] -->
playback[Inspect recordings and test in playback<pre>TEST_MODE=playback rushx test</pre>]

playback -- Tests don't work, re-record --> record
playback -- Tests pass in playback\nand are properly sanitized --> push

subgraph New steps
push[Push recordings to asset sync repo<pre>npx dev-tool test-proxy push</pre>] -->
assets[Commit <code>assets.json</code> change]
end

assets --> pr[Push branch and\ncreate PR]
```

### Inspecting recordings with asset sync enabled

Often, when re-recording tests, you will want to inspect the recordings that have been made, either to debug something or to make sure secrets have been sanitized properly. With asset sync enabled, the recordings are no longer stored in the same place as your SDK. You'll need to follow the following process to find them:

1. Navigate to the root of the `azure-sdk-for-js` repo.
1. Go into the `.assets` directory. This will contain a file called `.breadcrumb`; open it and find the entry that matches your SDK. This will give you the name of the directory within `.assets` that your recordings are located in.
1. Once in that directory, you can do a `git status` to see what uncommitted changes you have made to the recordings, and you can inspect the recordings in whatever way you'd like.

There is an [open issue](https://github.com/Azure/azure-sdk-tools/issues/4652) to streamline this process by providing tooling to get you to the right directory without you having to look inside the `.breadcrumb` file. Watch this space.

For more information on this topic, see the [asset sync reference documentation][asset-sync-reference].

### Other `test-proxy` commands

A few commands have been added to `dev-tool` to facilitate pushing and fetching the recordings to and from your local:

- `dev-tool test-proxy push`: use this command to push recordings to the assets repo when you have finished re-recording. This command will push your changes to the assets repo and update the tag in `assets.json` to reference the newly pushed recordings. The change to `assets.json` must be checked in for the test proxy to use the new recordings outside of your local environment.
- `dev-tool test-proxy restore`: this command will pull the recordings from the assets repo that are referenced in your `assets.json`. Typically this will be done automatically when you first run recorded tests if the recordings haven't been downloaded already, but you can run this command in advance if you'd like to download them earlier, for example for offline work.
- `dev-tool test-proxy reset`: if you've made any changes to the recordings locally, you can use this to revert those local changes and reset to what is currently checked in to the assets repo. This is a destructive operation and if you have local changes it will prompt you before removing your work.
- `dev-tool test-proxy migrate`: used for migrating existing recordings to the assets repo as described above.

### Working offline

Offline work is supported out-of-the-box. Of course, however, you won't be able to push or pull from the assets repo while offline. You can fetch recordings from the assets repo by running `npx dev-tool test-proxy restore`. This will download the recordings (and the test proxy executable, if you haven't got that already), making them ready for you to run tests with.

## Further reading

- [Asset Sync reference in azure-sdk-tools][asset-sync-reference]
- [Recorder 2.0 migration guide]

[recorder 2.0 migration guide]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/MIGRATION.md
[asset-sync-reference]: https://github.com/Azure/azure-sdk-tools/tree/main/tools/test-proxy/documentation/asset-sync
[powershell]: https://github.com/PowerShell/PowerShell
[`dev-tool`]: https://github.com/Azure/azure-sdk-for-js/tree/main/common/tools/dev-tool#installation
