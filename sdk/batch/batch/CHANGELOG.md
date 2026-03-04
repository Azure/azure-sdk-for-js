# Release History

## 13.0.0-beta.2 (2026-02-20)

### Breaking Changes

- Removed `storageAccountType` property from the `DataDisk` interface. Use `managedDisk` instead to configure disk storage settings.

### Other Changes

- The `apiVersion` property on `BatchContext` is now optional.

## 13.0.0-beta.1 (2026-02-05)

This is the first beta release of the new `@azure/batch` package, a major rewrite built on the Azure SDK for JavaScript modular client architecture.

### Features Added

- **New Modular Client Architecture:**
  - Completely redesigned client built on top of the [REST client](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) architecture, providing a more lightweight and modular SDK.
  - Reduced bundle size by approximately 52% (from ~66KB down to ~32KB gzipped with dependencies).

- **Improved Authentication:**
  - Full support for `@azure/identity` credentials for Microsoft Entra ID authentication.
  - Support for `AzureNamedKeyCredential` from `@azure/core-auth` for Shared Key authentication.
  - Browser support with Microsoft Entra ID credentials (previously only Node.js was supported).

- **Long-Running Operations (LRO) Support:**
  - Built-in support for long-running operations through polling methods using the `begin...AndWait` pattern.
  - Operations include: `beginDeletePoolAndWait`, `beginDeleteJobAndWait`, `beginTerminateJobAndWait`, `beginResizePoolAndWait`, and more.

- **Modern Paging:**
  - Listing operations now return `PagedAsyncIterableIterator` for efficient iteration over large result sets.

- **API Version:**
  - Uses Azure Batch service API version `2025-06-01`.

### Breaking Changes

- **Package Restructure:**
  - This is a complete rewrite of the package with a new API surface.
  - The main client class is now `BatchClient` instead of `BatchServiceClient`.
  - All operations are now methods directly on the `BatchClient` instance instead of nested under operation groups.

- **Authentication Changes:**
  - `BatchSharedKeyCredentials` has been removed. Use `AzureNamedKeyCredential` from `@azure/core-auth` instead.
  - Microsoft Entra ID authentication now uses `@azure/identity` instead of `@azure/ms-rest-nodeauth`.

- **Operation Naming Changes:**
  - Operations have been renamed to follow a more consistent pattern. For example:
    - `client.pool.add()` → `client.createPool()`
    - `client.pool.list()` → `client.listPools()`
    - `client.pool.get()` → `client.getPool()`
    - `client.pool.deleteMethod()` → `client.beginDeletePoolAndWait()`
    - `client.job.add()` → `client.createJob()`
    - `client.task.add()` → `client.createTask()`
  - See the [Migration Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/batch/batch/MigrationGuide.md) for a complete operation mapping.

- **Type Naming Changes:**
  - Parameter types have been renamed from `*AddParameter` to `*CreateOptions` (e.g., `PoolAddParameter` → `BatchPoolCreateOptions`).
  - Model types have been prefixed with `Batch` for consistency (e.g., `Pool` → `BatchPool`).

- **Error Handling:**
  - Error handling now uses `RestError` from `@azure/core-rest-pipeline` instead of `@azure/ms-rest-js`.

### Other Changes

- **Migration Guide:** A comprehensive [Migration Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/batch/batch/MigrationGuide.md) is available to help migrate from version 12.x to 13.x.
- Works with the latest Azure SDK ecosystem including common paging, logging, and error handling utilities.
