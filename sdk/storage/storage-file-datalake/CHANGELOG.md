# Release History

## 12.22.0-beta.2 (Unreleased)

### Other Changes

- Allow HTTP connections

## 12.17.0-beta.1 (2024-04-18)

### Features Added

- Added support for service version 2024-05-04.
- Added ability to retrieve path ACL with DataLakePathClient.getProperties(), DataLakeFileClient.getProperties(), DataLakeDirectoryClient.getProperties(), DataLakeFileClient.read().

## 12.22.0-beta.1 (2023-11-01)

### Other Changes

- Migrated dependency on `@azure/core-http` to `@azure/core-rest-pipeline`.

## 12.16.0 (2023-11-09)

### Features Added

- Includes all features released in 12.16.0-beta.1.

## 12.16.0-beta.1 (2023-10-18)

### Features Added

- Added support for service version 2023-11-03.
- Added support for indicating audience in StoragePipelineOptions.

## 12.15.0 (2023-09-14)

## 12.15.0-beta.1 (2023-08-11)

### Features Added

- Added support for service version 2023-08-03.
- Added support for paginated directory delete when using AAD authentication. Note that this feature only applies to HNS storage accounts.

## 12.14.0 (2023-07-12)

### Features Added

- Includes all features released in 12.14.0-beta.1.

## 12.14.0-beta.1 (2023-05-31)

### Features Added

- Added support for service version 2023-01-03.
- Added owner, group and permissions properties for response of DataLakePathClient.getProperties(), DataLakeFileClient.getProperties(), DataLakeFileClient,read(), and DataLakeDirectoryClient.getProperties().

## 12.13.0 (2023-04-13)

### Features Added

- Includes all features released in 12.13.0-beta.1.

## 12.13.0-beta.1 (2023-03-29)

### Features Added

- Added support for service version 2022-11-02.
- Added support for Encryption Context.

## 12.12.0 (2023-02-23)

### Features Added

- Includes all features released in 12.12.0-beta.1.
- Added FileReadHeaders.CreatedOn property for interface DataLakeFileClient.read().

### Bugs Fixed

- Renamed option 'leaseDuration' to 'leaseDurationInSeconds' in methods DataLakeFileClient.append() and flush(), the option was added in 12.12.0-beta.1.
- Fixed an issue of getting 403 error for file or directory name with './' or '../'

## 12.12.0-beta.1 (2023-02-09)

### Features Added

- Added support for service version 2021-12-02.
- Add support for acquiring, renewing and releasing lease in methods DataLakeFileClient.append() and flush().

### Other Changes

- Update dependency `@azure/core-http` version to `^3.0.0`.

## 12.11.0 (2022-10-14)

### Features Added

- Includes all features released in 12.11.0-beta.1.

### Bugs Fixed

- Fixed an issue of escaping slashes in file or directory path unnecessarily.

## 12.11.0-beta.1 (2022-08-26)

### Features Added

- Added support for service version 2021-10-04.
- Added support for flush parameter to DataLakeFileClient.append().
- Added support for encryption scopes.
- Added support for encryption scope SAS.

### Bugs Fixed

- Correted permission string parsing in DataLakePathClient.setPermissions() and DataLakePathClient.getAccessControl().
- Refined URL parsing method to let it be able to correctly parse URLs with account name in path.

## 12.10.0 (2022-07-08)

### Features Added

- Includes all features released in 12.10.0-beta.1.

## 12.10.0-beta.1 (2022-06-17)

### Features Added

- Added support for service version 2021-08-06.
- Added ability to set permission, umask, owner, group, ACL, lease, and expiry time on DataLakeFileClient.create() and .createIfNotExists(), DataLakeDirectoryClient.create() and .createIfNotExists(), and DataLakePathClient.create() and .createIfNotExists().

## 12.9.0 (2022-05-12)

### Features Added

- Includes all features released in 12.9.0-beta.1.

### Bugs Fixed

- Refined user-agent value to avoid failure when os information is not available on some platforms.

## 12.9.0-beta.1 (2022-04-19)

### Features Added

- Added support for service version 2021-06-08.
- Added support for Customer Provided Key server-side encryption of files.
- Added ability to retrieve path createdOn and expiresOn times with DataLakeFileSystemClient.listPaths().

### Bugs Fixed

- Add missing browser mapping for `./dist-esm/storage-common/src/BufferScheduler.js`
- Add `react-native` mapping to ESM entry point

## 12.8.0 (2022-03-11)

### Features Added

- Includes all features released in 12.8.0-beta.1.

### Bugs Fixed

- Fixed a bug where customized `ProxyOptions` is overwrited by a default one when initializing `DataLakeServiceClient` with connection string.
- Set correct content length in requests for uploading operations to avoid unexpected failure if customized content length is incorrect.

## 12.8.0-beta.1 (2021-11-09)

### Features Added

- Added support for service version 2020-12-06.

## 12.7.0 (2021-09-10)

### Features Added

- Includes all features released in 12.7.0-beta.1.

## 12.6.0 (2021-08-02)

- Support for Node.js 8 and IE 11 has been dropped. Please see our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.

## 12.7.0-beta.1 (2021-07-28)

### Features Added

- Added support for service version 2020-10-02.
- Added support for Parquet as an input format in `DataLakeFileClient.query()`.
- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

## 12.5.0 (2021-06-09)

- Includes all features released in 12.5.0-beta.1.
- Refined variable names for the Path Soft Delete features introduced from the last beta version: 12.5.0-beta.1.

## 12.5.0-beta.1 (2021-05-14)

- Updated Azure Storage Service API version to 2020-08-04.
- Added support for Path Soft Delete. You can list the deleted paths via `DataLakeFileSystemClient.listDeletedPaths()`, and restore a deleted path via `DataLakeFileSystemClient.undeletePath()`.
- Restoring deleted FileSystem doesn't support renaming anymore, deprecated `destinationFileSystemName` in `ServiceUndeleteFileSystemOptions` for `DataLakeServiceClient.undeleteFileSystem()`.

## 12.4.0 (2021-03-10)

- Includes all features released in 12.4.0-beta.1.

## 12.4.0-beta.1 (2021-02-09)

- Added support for Container Soft Delete. You can restore a deleted filesystem via `DataLakeServiceClient.undeleteFileSystem()`. And the `DataLakeServiceClient.listFileSystems()` now support an `includeDeleted` option to include soft deleted filesystems in the response.
- Added `fromConnectionString` to `DataLakeServiceClient` to support construction from a connection string. Fixed bug [13396](https://github.com/Azure/azure-sdk-for-js/issues/13396).

## 12.3.1 (2021-02-03)

- Fixed a bug where `generateDataLakeSASQueryParameters()` won't correctly set the resource type if `DataLakeSASSignatureValues.permissions` is not specified. Fixed issue [13223](https://github.com/Azure/azure-sdk-for-js/issues/13223).
- Fixed a compile failure due to "Can't resolve 'crypto'" in Angular. [Issue #13267](https://github.com/Azure/azure-sdk-for-js/issues/13267).
- The `"Unclosed root tag"` XML parser error is now retriable. [PR #13076](https://github.com/Azure/azure-sdk-for-js/pull/13076).

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

## 12.1.0-preview.1 (2020-07-03)

- Increased the maximum block size for file from 100MiB to 4000MiB(~4GB). And thereby supporting ~200TB maximum size for file.
- Added more mappings for Blob and DFS endpoints. [issue #8744](https://github.com/Azure/azure-sdk-for-js/issues/8744).
- Added convenience methods `createIfNotExists`, `deleteIfExists` to `DataLakeFileSystemClient`, `DataLakePathClient`, `DataLakeDirectoryClient`, and `DataLakeFileClient`.

## 12.0.1 (2020-05-20)

- Fix data corruption failure error [issue #6411](https://github.com/Azure/azure-sdk-for-js/issues/6411) when downloading compressed files. [PR #7993](https://github.com/Azure/azure-sdk-for-js/pull/7993)
- Fix un-handled TypeError [issue #8499](https://github.com/Azure/azure-sdk-for-js/issues/8499) in Electron applications. [PR #8568](https://github.com/Azure/azure-sdk-for-js/pull/8568)
- Updated to use `@opentelemetry/api` 0.6.1 via `@azure/core-tracing`. [PR #7998](https://github.com/Azure/azure-sdk-for-js/pull/7998)
- Updated to use `typescript` 3.8.3. [PR #8659](https://github.com/Azure/azure-sdk-for-js/pull/8659)

## 12.0.0 (2020-03-12)

- Added exists() on `FileSystemClient` and `PathClient`.
- Added high level upload and download methods to `DataLakeFileClient`.

## 12.0.0-preview.8 (2020-02-12)

- Updated Azure Storage Service API version to 2019-07-07.
- Fixed a bug where the package didn't work as expected when bundling web applications. [PR #7298](https://github.com/Azure/azure-sdk-for-js/pull/7298)

## 12.0.0-preview.7 (2020-01-09)

- Bug fix - Name properties on clients now support more kinds of endpoints(IPv4/v6 hosts, single word domains). [PR #6753](https://github.com/Azure/azure-sdk-for-js/pull/6753)
- Service clients now share a single http client instance by default. [PR #6657](https://github.com/Azure/azure-sdk-for-js/pull/6657)

  Previously, a new http client was created for each service client if none was provided by the user. This could result in TCP port exhaustion under heavy usage with the keepAlive option enabled because each http client has its own persistent TCP connection. This change creates a single http client instance which is shared among all service clients by default.

## 12.0.0-preview.6 (2019-12-04)

- Initial Release. API version 2019-02-02 supported. Please see the README for information on the new design.
