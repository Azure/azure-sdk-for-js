# Release History

## 11.0.0 (2023-05-01)

### Breaking Changes

- Job/Pool lifetime statistics removal.
  - `client.pool.getAllLifetimeStatistics()` and `client.job.getAllLifetimeStatistics()` methods are removed.

### Features

- Added new boolean property `enableAcceleratedNetworking` to type `NetworkConfiguration`.
  - This property determines whether to create a pool with VMSS [accelerated networking enabled](https://learn.microsoft.com/azure/virtual-network/accelerated-networking-overview).
  - Default to be `false`.
- Added new boolean property `enableAutomaticUpgrade` to type `VMExtension`.
  - Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available.
- Added a new property `type` to type `ContainerConfiguration`.
  - The container technology to be used. Possible values include: `dockerCompatible` and `criCompatible`.

### Other Changes

- Deprecating `CertificateOperations` related methods.
  - This operation is deprecating and will be removed after February 2024. Please use the [Azure KeyVault Extension](https://learn.microsoft.com/azure/batch/batch-certificate-migration-guide) instead.

## 10.2.0 (2022-10-01)

### Features

- Added new custom enum type `NodeCommunicationMode`.
  - This property determines how a pool communicates with the Batch service.
  - Possible values: default, classic, simplified.
- Added properties `currentNodeCommunicationMode` and `targetNodeCommunicationMode` of type `NodeCommunicationMode` to `CloudPool`.
- Added property `targetNodeCommunicationMode` of type `NodeCommunicationMode` to `PoolSpecification`, `PoolAddParameter`, `PoolPatchParameter`, and `PoolUpdatePropertiesParameter`.

### Other Changes

- Modified descriptions of the `applicationPackageReferences`, `uploadHeaders`, and `name` (UserAccount) properties.

## 10.1.0 (2022-02-09)

### Features

- Added property `uploadHeaders` to `OutputFileBlobContainerDestination`.
  - Allows users to set custom HTTP headers on resource file uploads.
  - Array of type HttpHeader (also being added).
- Added boolean property `allowTaskPreemption` to `JobSpecification`, `CloudJob`, `JobAddParameter`, `JobPatchParameter`, `JobUpdateParameter`
  - Mark Tasks as preemptible for higher priority Tasks (requires Comms-Enabled or Single Tenant Pool).

### Bugs Fixed

- Fixed missing SharedKeyCredentials class export.
