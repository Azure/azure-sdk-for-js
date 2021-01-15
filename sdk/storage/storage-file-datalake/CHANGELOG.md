# Release History

## 12.4.0-beta.1 (Unreleased)

- Fixed a bug where `generateDataLakeSASQueryParameters()` won't correctly set the resource type if `DataLakeSASSignatureValues.permissions` is not specified. Fixed issue [13223](https://github.com/Azure/azure-sdk-for-js/issues/13223).

## 12.3.0 (2021-01-12)

- Bug fix - `DataLakePathClient.move()` now supports source and destination authenticated with SAS. Fixed bug [12758](https://github.com/Azure/azure-sdk-for-js/issues/12758).
- Now you can get the functionality of the root directory via the `DataLakeDirectoryClient` created via `FileSystemClient.getDirectoryClient("")`. Fixed bug [12813](https://github.com/Azure/azure-sdk-for-js/issues/12813).

## 12.3.0-beta.1 (2020-12-09)

- Updated Azure Storage Service API version to 2020-04-08.
- Added `generateSasUrl` to `DataLakeFileSystemClient`, `DataLakeDirectoryClient` and `DataLakeFileClient` to generate a service-level SAS URI for the client.
- Added `generateAccountSasUrl` to `DataLakeServiceClient` to generate an account-level SAS URI for the client.
- Won't remove the first space in the `userAgentOptions.userAgentPrefix` passed to the `newPipeline()` now. Fixed bug [7536](https://github.com/Azure/azure-sdk-for-js/issues/7536).

## 12.2.0 (2020-11-10)

- Bug fix - Fixes an issue where `DataLakePathClient.move()` will give an `InvalidSourceUri` error when the copy source name contains characters that need to be URL encoded. Fixed bug [11849](https://github.com/Azure/azure-sdk-for-js/issues/11849).

## 12.2.0-beta.1 (2020-10-13)

- Updated Azure Storage Service API version to 2020-02-10.
- Added support for Directory SAS.
- Added support for File Set Expiry.
- Added support to set access control list recursively.

## 12.1.1 (2020-09-17)

- Bug fix - Fixes an issue where`DataLakeFileClient.uploadStream()` will give an "Invalid Verb" error when keep-alive is enabled. Fixed bug [11187](https://github.com/Azure/azure-sdk-for-js/issues/11187).

## 12.1.0 (2020-09-08)

- Fixed `DataLakeFileClient.uploadStream()` to support `chunkSize` larger than `buffer.constants.MAX_LENGTH`.
- Bug fix - `credential` parameter of `newPipeline()` function is now optional. If not specified, `AnonymousCredential` is used. Fixes bug [9628](https://github.com/Azure/azure-sdk-for-js/issues/9628).
- Supported Quick Query. Added a new API `DataLakeFileClient.query()`.
- Bug fix - Content-Length header is no more ignored. Fixes bugs [8903](https://github.com/Azure/azure-sdk-for-js/issues/8903), [9300](https://github.com/Azure/azure-sdk-for-js/issues/9300) and [10614](https://github.com/Azure/azure-sdk-for-js/issues/10614).

## 12.1.0-preview.1 (2020.07)

- Increased the maximum block size for file from 100MiB to 4000MiB(~4GB). And thereby supporting ~200TB maximum size for file.
- Added more mappings for Blob and DFS endpoints. [issue #8744](https://github.com/Azure/azure-sdk-for-js/issues/8744).
- Added convenience methods `createIfNotExists`, `deleteIfExists` to `DataLakeFileSystemClient`, `DataLakePathClient`, `DataLakeDirectoryClient`, and `DataLakeFileClient`.

## 12.0.1 (2020.05)

- Fix data corruption failure error [issue #6411](https://github.com/Azure/azure-sdk-for-js/issues/6411) when downloading compressed files. [PR #7993](https://github.com/Azure/azure-sdk-for-js/pull/7993)
- Fix un-handled TypeError [issue #8499](https://github.com/Azure/azure-sdk-for-js/issues/8499) in Electron applications. [PR #8568](https://github.com/Azure/azure-sdk-for-js/pull/8568)
- Updated to use `@opentelemetry/api` 0.6.1 via `@azure/core-tracing`. [PR #7998](https://github.com/Azure/azure-sdk-for-js/pull/7998)
- Updated to use `typescript` 3.8.3. [PR #8659](https://github.com/Azure/azure-sdk-for-js/pull/8659)

## 12.0.0 (2020.03)

- Added exists() on `FileSystemClient` and `PathClient`.
- Added high level upload and download methods to `DataLakeFileClient`.

## 12.0.0-preview.8 (2020.02)

- Updated Azure Storage Service API version to 2019-07-07.
- Fixed a bug where the package didn't work as expected when bundling web applications. [PR #7298](https://github.com/Azure/azure-sdk-for-js/pull/7298)

## 12.0.0-preview.7 (2020.01)

- Bug fix - Name properties on clients now support more kinds of endpoints(IPv4/v6 hosts, single word domains). [PR #6753](https://github.com/Azure/azure-sdk-for-js/pull/6753)
- Service clients now share a single http client instance by default. [PR #6657](https://github.com/Azure/azure-sdk-for-js/pull/6657)

  Previously, a new http client was created for each service client if none was provided by the user. This could result in TCP port exhaustion under heavy usage with the keepAlive option enabled because each http client has its own persistent TCP connection. This change creates a single http client instance which is shared among all service clients by default.

## 12.0.0-preview.6 (2019-12-04)

- Initial Release. API version 2019-02-02 supported. Please see the README for information on the new design.
