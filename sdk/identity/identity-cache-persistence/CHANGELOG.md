# Release History

## 1.0.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.2 (2021-09-09)

### Bugs Fixed

- Updated `@azure/msal-node` and `@azure/msal-node-extensions`, which fixed an issue that caused silent authentication to fail on requests with previously cached (and valid) tokens.

### Other Changes

- Changed the name of the "extension" API to the "plugin" API to reduce confusion between this package and VS Code extensions. This package is now a "plugin package."
- Renamed `cachePersistenceExtension` to `cachePersistencePlugin`.
- Renamed the `allowUnencryptedStorage` property of `TokenCachePersistenceOptions` (in the main @azure/identity package) to `unsafeAllowUnencryptedStorage` to make it clear that enabling the unencrypted storage feature is not generally safe for production use.

## 1.0.0-beta.1 (2021-07-07)

### New features

- This release marks the initial beta availability of the `@azure/identity-cache-persistence` package. This package provides an extension to `@azure/identity` that enables persistent token caching in a secure storage defined by the Operating System (caching of token values across sessions), which allows skipping interactive authentication flows if a previously-cached token is still available. This is implemented using the following technologies:
  - On Windows, the cache will use a DPAPI-protected file.
  - On macOS, the cache will use the macOS Keychain.
  - On Linux, the cache will use `libsecret` to store the tokens (this will use a provider backend, e.g. GNOME Keyring).
  - On Linux and macOS, the cache may optionally use an unencrypted file as a last resort, but only if the `allowUnencryptedStorage` property is set to true in the `tokenCachePersistenceOptions` passed to the credential constructor.
