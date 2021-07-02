# Release History

## 1.0.0-beta.1 (Unreleased)

### New features

- This release marks the initial beta availability of the `@azure/identity-cache-persistence` package. This package provides an extension to `@azure/identity` that enables persistent token caching in a secure storage defined by the Operating System (caching of token values across sessions), which allows skipping interactive authentication flows if a previously-cached token is still available. This is implemented using the following technologies:
  - On Windows, the cache will use a DPAPI-protected file.
  - On macOS, the cache will use the macOS Keychain.
  - On Linux, the cache will use `libsecret` to store the tokens (this will use a provider backend, e.g. GNOME Keyring).
  - On Linux and macOS, the cache may optionally use an unencrypted file as a last resort, but only if the `allowUnencryptedStorage` property is set to true in the `tokenCachePersistenceOptions` passed to the credential constructor.
