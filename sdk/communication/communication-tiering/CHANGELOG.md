# Release History

## 1.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

- Fixed the authentication policy being applied before the retry policy, which caused retried requests to reuse the original credentials. With a key credential, retries carried a stale `x-ms-date` header and signature and could be rejected by the service. Retried requests are now re-authenticated on every attempt. [#40786](https://github.com/Azure/azure-sdk-for-js/issues/40786)

### Other Changes

The first preview of the Azure Communication Tiering client library has the following features:

- Retrieving tiering info
- Retrieving telephone number summary
