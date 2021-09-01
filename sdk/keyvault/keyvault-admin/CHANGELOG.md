# Release History

## 4.2.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

- Updated the latest service version to 7.3.

## 4.2.0-beta.1 (2021-08-10)

- Move generated client to use @azure/core-rest-pipeline. For more information about Core V2, please refer to [the documentation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core#core-v1-and-core-v2).

  - With this change, the response types no longer contain the raw response `_response`. To access the raw response, an `onResponse` callback has to be passed in the request options bag.

    ```typescript
    let rawResponse: FullOperationResponse | undefined;
    await client.getRoleDefinition(globalScope, "roleDefinitionName", {
      onResponse: (response) => (rawResponse = response)
    });
    ```

## 4.1.0 (2021-07-29)

### New Features

- Support for Node.js 8 and IE 11 has been dropped. Please see our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Changed TS compilation target to ES2017 to produce smaller bundles and use more native platform features.
- Updated our internal core package dependencies to their latest versions to add support for Opentelemetry 1.0.0, which is compatible with the latest versions of our other client libraries.

## 4.1.0-beta.1 (2021-07-07)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

## 4.0.1 (2021-06-15)

### Bug Fixes

- Fixed an issue where bundling could fail when importing this library due to an incorrectly set import.

## 4.0.0 (2021-06-15)

This release marks the general availability of the `@azure/keyvault-admin` package.

### New Features

- The `KeyVaultAccessControlClient` provides support for managing role-based access control (RBAC) operations.
  - Both role assignments and custom role definitions are supported with the ability to create, read, update, and delete custom role definitions and assignments.
- The `KeyVaultBackupClient` provides support for back up and restore operations for the entire Key Vault Managed HSM instance.
  - Full Managed HSM backup and restore operations are supported.
  - Selective Key Restore from a previous backup is also supported.

### Changes since 4.0.0-beta.3:

- Added the "KeyVault" prefix to all of the Key Vault Admin client operations.
- Made the AesGcmDecryptParameters authenticationTag required.
- Collapsed `KeyVaultRoleAssignmentPropertiesWithScope` to `KeyVaultRoleAssignmentProperties`.
- Renamed `KeyVaultKeyId` to `KeyVaultKeyIdentifier`.
- Renamed `beginRestore`'s `blobStorageUri` to `folderUri`.
- Removed `folderName` from `beginRestore`. Now the folder name will be inferred from the `folderUri`.
- Renamed `beginSelectiveRestore`'s `blobStorageUri` to `folderUri`.
- Removed `folderName` from `beginSelectiveRestore`. Now the folder name will be inferred from the `folderUri`.
- Reordered the parameters of `beginSelectiveRestore` to `keyName`, `folderUrl`, `sasToken`, `[options]`.
- Renamed `KeyVaultBackupResult`'s `backupFolderUri` to `folderUri`.
- Renamed `beginSelectiveRestore` to `beginSelectiveKeyRestore`.
- Renamed `KeyVaultBeginSelectiveRestoreOptions` to `KeyVaultBeginSelectiveKeyRestoreOptions`.
- Renamed `KeyVaultSelectiveRestoreOperationState` to `KeyVaultSelectiveKeyRestoreOperationState`.
- Renamed `KeyVaultSelectiveRestoreResult` to `KeyVaultSelectiveKeyRestoreResult`.
- `deleteRoleAssignment` and `deleteRoleDefinition` will no longer throw an exception when the resource no longer exist and return no result.

## 4.0.0-beta.3 (2021-04-06)

- Updated the Latest service version to 7.2.
- Long Running Operations will now use the `status` field to determine whether the operation failed.
- Improved tracing across the various KeyVault libraries. By switching to a consistent naming convention, ensuring spans are always closed appropriately, and setting the correct status when an operation errors developers can expect an improved experience when enabling distributed tracing.
  - We now ensure tracing spans are properly closed with an appropriate status when an operation throws an exception.
  - If a traced operation throws an exception we will now properly record the exception message in the tracing span.
  - Finally, naming conventions have been standardized across the KeyVault libraries taking the format of `Azure.KeyVault.<PACKAGE NAME>.<CLIENT NAME>`.
- Fixed an issue where retrying a failed initial Key Vault request may result in an empty body.

## 4.0.0-beta.2 (2021-02-09)

- [Breaking] Removed `dist-browser` from the published package. To bundle the Azure SDK libraries for the browsers, please read our bundling guide: [link](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md).
- Updated the Key Vault Admin Long Running Operation Pollers to follow a more compact and meaningful approach moving forward.
- Bug fix: The logging of HTTP requests wasn't properly working - now it has been fixed and tests have been written that verify the fix.
- [Breaking] Return `BackupResult` and `RestoreResult` from backup/restore long running operations which will contain additional information about the operation as well any relevant data.
- Backup / Restore polling will now correctly propagate any errors to the awaited call.
- Add support for custom role definitions - creating, updating, and deleting role definitions are now supported.

## 4.0.0-beta.1 (2020-09-11)

The @azure/keyvault-admin package provides two clients, `KeyVaultAccessControlClient` and `KeyVaultBackupClient`.

- The `KeyVaultAccessControlClient` allows working with role-based access control (RBAC) operations, meaning assigning, deleting and retrieving role assignments, and retrieving role definitions.
- The `KeyVaultBackupClient` allows generating full backups and restores of Key Vault instances, and selective restores of keys.
