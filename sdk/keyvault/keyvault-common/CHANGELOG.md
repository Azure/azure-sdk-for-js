# Release History

## 2.0.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.0 (2024-10-16)

### Features Added

- Add support for Continuous Access Evaluation (CAE).
  - To take advantage of this support, the newly added `keyVaultAuthenticationPolicy` should be used in place of `bearerTokenAuthenticationPolicy`.

### Breaking Changes

- Removed `createKeyVaultChallengeCallbacks`, which was used to add Key Vault specific handling to Core's `bearerTokenAuthenticationPolicy`. The new `keyVaultAuthenticationPolicy` should be used instead.

### Other Changes

- Native ESM support has been added, and this package will now emit both CommonJS and ESM. [#30772](https://github.com/Azure/azure-sdk-for-js/pull/30772)

## 1.0.0 (2023-03-09)

### Features Added

- Initial release of the keyvault-common package. The package is intended for internal consumption only and only exposes
  helpers and other common code used by the Key Vault SDKs.

## 1.0.0-beta.1 (2022-11-08)

### Features Added

- Initial release of the keyvault-common package. The package is intended for internal consumption only and only exposes
  helpers and other common code used by the Key Vault SDKs.
