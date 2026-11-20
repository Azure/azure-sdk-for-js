# Release History

## 1.0.0-beta.3 (Unreleased)

### Features Added

- APIs for querying and managing the usage of Pre-registered Alpha IDs

### Breaking Changes

### Bugs Fixed

- Fixed a pagination issue by adding a custom paging policy
- Fixed the authentication policy being applied before the retry policy, which caused retried requests to reuse the original credentials. With a key credential, retries carried a stale `x-ms-date` header and signature and could be rejected by the service. Retried requests are now re-authenticated on every attempt. [#40786](https://github.com/Azure/azure-sdk-for-js/issues/40786)

### Other Changes

- Updated to `@azure/communication-common` 2.2.0.

## 1.0.0-beta.1 (2022-09-22)

### Features Added

- APIs for querying and managing the usage of Alpha IDs
