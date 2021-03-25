# Release History

## 4.0.0-beta.3 (Unreleased)

- Refactored tracing logic to ensure consistency in how we name tracing spans, reporting errors correctly, and ensure spans are closed consistently
- Updated the Latest service version to 7.2.
- Long Running Operations will now use the `status` field to determine whether the operation failed.

## 4.0.0-beta.2 (2021-02-09)

- [Breaking] Removed `dist-browser` from the published package. To bundle the Azure SDK libraries for the browsers, please read our bundling guide: [link](https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/Bundling.md).
- Updated the Key Vault Admin Long Running Operation Pollers to follow a more compact and meaningful approach moving forward.
- Bug fix: The logging of HTTP requests wasn't properly working - now it has been fixed and tests have been written that verify the fix.
- [Breaking] Return `BackupResult` and `RestoreResult` from backup/restore long running operations which will contain additional information about the operation as well any relevant data.
- Backup / Restore polling will now correctly propagate any errors to the awaited call.
- Add support for custom role definitions - creating, updating, and deleting role definitions are now supported.

## 4.0.0-beta.1 (2020-09-11)

The @azure/keyvault-admin package provides two clients, `KeyVaultAccessControlClient` and `KeyVaultBackupClient`.

- The `KeyVaultAccessControlClient` allows working with role-based access control (RBAC) operations, meaning assigning, deleting and retrieving role assignments, and retrieving role definitions.
- The `KeyVaultBackupClient` allows generating full backups and restores of Key Vault instances, and selective restores of keys.
