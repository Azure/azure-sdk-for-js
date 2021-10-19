# Release History

## 1.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0 (2021-10-15)

Released.
 
## 1.0.0-beta.2 (2021-09-09)

### Other Changes

- Changed the name of the "extension" API to the "plugin" API to reduce confusion between this package and VS Code extensions. This package is now a "plugin package."
- Renamed `vsCodeExtension` to `vsCodePlugin`.

## 1.0.0-beta.1 (2021-07-07)

### New features

- This release marks the initial beta availability of the `@azure/identity-vscode` package. This package extends `@azure/identity` by providing the dependencies of `VisualStudioCodeCredential` and enabling it within the `@azure/identity` package. `VisualStudioCodeCredential` uses the authenticated session from the "Azure Account" extension in Visual Studio Code. If this extension package is not loaded using `useIdentityExtension`, then `VisualStudioCodeCredential` from `@azure/identity` will throw a `CredentialUnavailableError`. By enabling `VisualStudioCodeCredential`, the `DefaultAzureCredential` class in `@azure/identity` also gains functionality allowing it to use the "Azure Account" session if it is available.
