# Versioning Tools

Versioning tools make updating package versions easier. These tools target packages and tracked code and make it easier to set version values.

## Scripts

### increment.js

Increment the version number after a release according to [version policies](https://github.com/Azure/azure-sdk/blob/main/docs/policies/releases.md#incrementing-after-release). Uses the current version in package.json to determine the next version.

```bash
node increment.js --artifact-name azure-tempate
```

#### Paramters

`repo-root` - Sets the root of the repo where the tool will look for rush.json (defaults to `../../../`, the relative path to the repo root from the tool's location in the repo)

`artifact-name` - Targets a particular package based on either its pipeline name `azure-template` or its package name in package.json `@azure/template`

`dry-run` - Does not persist file changes

### set-dev.js

Sets a dev version for the whole SDK or a given service.

```bash
node set-dev.js --build-id 20191027.3 --service keyvault
```

#### Parameters

`repo-root` - Sets the root of the repo where the tool will look for rush.json (defaults to `../../../`, the relative path to the repo root from the tool's location in the repo)

`build-id` - Build number to set in the package prerelease suffix

`service` - The name of a folder in the `sdk/` folder (e.g. `keyvault`). The tool sets dev for all package.json files registered in rush.json.

### set-version.js

Sets the version of a given package registered in rush.json

```
node set-version.js --artifact-name azure-keyvault-secrets --new-version 1.2.3-preview.2
```

### Parameters

`repo-root` - Sets the root of the repo where the tool will look for rush.json (defaults to `../../../`, the relative path to the repo root from the tool's location in the repo)

`artifact-name` - Targets a particular package based on either its pipeline name `azure-template` or its package name in package.json `@azure/template`

`new-version` - Version string to set

`dry-run` - Does not persist file changes

## Tracking Format

To track version information that can appear in generated and hand-coded files, we append metadata to the `package.json` file. NPM ignores these metadata keys which are prefaced with a `//`.

Example metadata from a package.json file:

```JSON
  "//metadata": {
    "constantPaths": [
      {
        "path": "src/core/keyVaultClientContext.ts",
        "prefix": "packageVersion"
      },
      {
        "path": "src/core/utils/constants.ts",
        "prefix": "SDK_VERSION"
      }
    ]
  }
```

Under the `constantPaths` are a list of key/value pairs with properties:

`path` - relative path from the folder containing the package.json file to the file that has a version string we want to track and update.

`prefix` - a prefix for setting a variable name. The prefix must match for a replacement to happen.

Example use of prefix:

```JS
...
const packageVersion = "1.2.3-preview.4";

// Use 1.0.0 of Irrelevant Service and if this value is changed things break
const irrelevantVersion = "1.0.0"
...
```

In the above example we see a `packageVersion` that we want to replace and an `irrelevantVersion` that, if replaced, would cause problems with how the code operates. In this case, one would set the prefix to `packageVersion`. The tool matches the prefix on the line and handles any characters between the prefix and a version string (i.e. assignment operators like `=` or `:` in the case of a mapping).

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Feng%2Ftools%2Fversioning%2FREADME.png)
