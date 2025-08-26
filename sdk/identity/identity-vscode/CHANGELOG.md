# Release History

## 2.1.0 (Unreleased)

### Features Added

- Added support for Mac OS broker authentication via VSCode. [#35683](https://github.com/Azure/azure-sdk-for-js/pull/35683)

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.0 (2025-08-05)

### Other Changes

All the features shipped as part of 2.0.0-beta.1 will be GA with this version. The most important feature is providing `vsCodePlugin` compatible with `@azure/identity` v4.11.0.

## 2.0.0-beta.1 (2025-07-17)

This package is revived and is compatible with `@azure/identity` v4.11.0. See [Readme](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity-vscode/README.md) for more details and examples on how to use this package.

### Features Added

This package extends `@azure/identity` by providing the dependencies of `VisualStudioCodeCredential` and enabling it within the `@azure/identity` package. If this extension package is not loaded using `useIdentityPlugin`, then `VisualStudioCodeCredential` from `@azure/identity` will throw a `CredentialUnavailableError`. By enabling `VisualStudioCodeCredential`, the `DefaultAzureCredential` class in `@azure/identity` will be able to authenticated with signed in account from "Azure Resource" if it is available.

## 1.0.1 (2025-04-14)

This package is deprecated. See [Readme](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity-vscode/README.md) for more details

### Other Changes

- Update Readme with the deprecation notice.

## 1.0.0 (2021-10-15)

Released.

## 1.0.0-beta.2 (2021-09-09)

### Other Changes

- Changed the name of the "extension" API to the "plugin" API to reduce confusion between this package and VS Code extensions. This package is now a "plugin package."
- Renamed `vsCodeExtension` to `vsCodePlugin`.

## 1.0.0-beta.1 (2021-07-07)

### New features

- This release marks the initial beta availability of the `@azure/identity-vscode` package. This package extends `@azure/identity` by providing the dependencies of `VisualStudioCodeCredential` and enabling it within the `@azure/identity` package. `VisualStudioCodeCredential` uses the authenticated session from the "Azure Account" extension in Visual Studio Code. If this extension package is not loaded using `useIdentityExtension`, then `VisualStudioCodeCredential` from `@azure/identity` will throw a `CredentialUnavailableError`. By enabling `VisualStudioCodeCredential`, the `DefaultAzureCredential` class in `@azure/identity` also gains functionality allowing it to use the "Azure Account" session if it is available.
