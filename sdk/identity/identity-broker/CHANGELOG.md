# Release History

## 1.1.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

- Native ESM support has been added, and this package will now emit both CommonJS and ESM. [#31647](https://github.com/Azure/azure-sdk-for-js/pull/31647)

## 1.1.0 (2024-10-15)

### Features Added

- Added Proof-of-Possession via Signed HTTP Request (SHR) support to `AccessToken` and `GetTokenOptions` for `InteractiveBrowserCredential` native broker scenarios. #30961

## 1.0.1 (2024-06-10)

### Other Changes

- Upgraded @azure/msal-node to the latest version

## 1.0.0 (2023-11-07)

### Features Added

- First GA release of the plugin package `@azure/identity-broker` to [support authentication through broker such as WAM](https://learn.microsoft.com/entra/identity-platform/scenario-desktop-acquire-token-wam). This plugin works with the [`brokerOptions` on `InteractiveBrowserCredential` added in the `@azure/identity` package](https://github.com/Azure/azure-sdk-for-js/pull/26091/).

## 1.0.0-beta.1 (2023-10-23)

### Features Added

- Created a plugin package to [support authentication through broker such as WAM](https://learn.microsoft.com/entra/identity-platform/scenario-desktop-acquire-token-wam). This plugin works with the [`brokerOptions` on `InteractiveBrowserCredential` added in the `@azure/identity` package](https://github.com/Azure/azure-sdk-for-js/pull/26091).
