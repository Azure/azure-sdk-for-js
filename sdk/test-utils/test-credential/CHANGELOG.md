# Release History

## 1.3.0 (2024-09-03)

### Breaking Changes

Updates the `createTestCredential` method to consume `AzurePipelineCredential` when it is running in Azure Pipeline environment or `ChainedTokenCredential`.

## 1.2.0 (2024-06-13)

### Breaking Changes

Updates the `createTestCredential` method to consume `ChainedTokenCredential` instead of `DefaultAzureCredential` in order to ensure live test pipeline can authenticate successfully. The `ChainedTokenCredential` will try `AzurePowershelLCredential`, `AzureCliCredential`, `AzureDeveloperCliCredential`, and `EnvironmentCredential` in the listed order.

## 1.1.0 (2024-05-08)

### Breaking Changes

Updates the `createTestCredential` method to consume `DefaultAzureCredential` instead of `ClientSecretCredential` in order to offer autonomy to the devs and to move away from client secrets in environment varaibles.

- `NoOpCredential` is offered for playback.
- In record and live modes:
  - `DefaultAzureCredential` is offered in Node.
  - In the browser, a custom credential is provided that fetches tokens from a locally running Node server. The server is provided in the dev-tool package, and must be running while the browser
    tests are running for the credential to work. The server uses `DefaultAzureCredential` on the host machine to generate tokens.
- [`User Auth` and `Auth via development tools`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#authenticate-users) are preferred in record mode to record the tests.

## 1.0.4 (2024-04-01)

### Bugs Fixed

- Fixes "types" for the package.

## 1.0.3 (2024-03-21)

### Features Added

- Add types for the package.

## 1.0.2 (2024-03-20)

### Features Added

- The `@azure-tools/test-recorder` dependency has been updated to version `^3.0.0`. This update discontinues the support for `@azure/core-http` in tests.
- The `@azure/identity` dependency has been upgraded to version `^4.x`.
- **Additional Updates**: Several other updates have been made to ensure compatibility with the libraries in the Azure SDK for JS repository. These include version updates for `prettier` and `typescript`, as well as an update to the minimum required Node.js version.

## 1.0.1 (2023-01-23)

Updates the dependency `@azure-tools/test-recorder` to version `^2.0.0`.
[#24567](https://github.com/Azure/azure-sdk-for-js/pull/24567)

## 1.0.0 (2022-04-11)

### Features Added

Provides the credential to be used in the tests. `NoOpCredential` in playback and `ClientSecretCredential` in record/live modes.
[#19423](https://github.com/Azure/azure-sdk-for-js/pull/19423)
