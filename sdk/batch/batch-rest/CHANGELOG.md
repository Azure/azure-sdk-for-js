# Release History

## 1.0.0 (2026-01-20)

### Other Changes

- First stable release. No changes from 1.0.0-beta.4.

## 1.0.0-beta.4 (2025-11-12)

### Breaking Changes

- **Removed Certificate Management APIs and Types:**
  - Removed all certificate management operations and types, including:
    - `CreateCertificate`, `CreateCertificateParameters`, `CreateCertificate201Response`, `DeleteCertificate`, `DeleteCertificateParameters`, `DeleteCertificate202Response`, `CancelCertificateDeletion`, `CancelCertificateDeletionParameters`, `ListCertificates`, `ListCertificatesParameters`, `ListCertificates200Response`, `GetCertificate`, `GetCertificateParameters`, `GetCertificate200Response`, and all related types such as `BatchCertificate`, `BatchCertificateOutput`, `BatchCertificateReference`, `BatchCertificateReferenceOutput`, etc.
  - Removed all related response types, query/parameter types, and helper functions for certificate operations.
  - Removed certificate-related fields from model types, such as `certificateReferences` and `targetNodeCommunicationMode` from `BatchPoolCreateOptions`, `BatchPoolSpecification`, `BatchPoolSpecificationOutput`, `BatchPoolUpdateOptions`, and `BatchPoolReplaceOptions`.

- **Removed/Changed Node Communication Mode:**
  - Removed `BatchNodeCommunicationMode` and related types and fields from all models.

### Features Added

- **Job level FIFO**
  - Added `BatchJobDefaultOrder` and `BatchJobDefaultOrderOutput` types.
  - Extended `BatchTaskSchedulingPolicy` and `BatchTaskSchedulingPolicyOutput` with a new `jobDefaultOrder` property to support job-level FIFO scheduling.

- **CMK support on Pools**
  - Added `DiskCustomerManagedKey`, `DiskCustomerManagedKeyOutput`, `DiskEncryptionSetParameters`, and `DiskEncryptionSetParametersOutput` for customer-managed key (CMK) support on pools.
  - Extended `DiskEncryptionConfiguration` and `DiskEncryptionConfigurationOutput` with a new `customerManagedKey` property.
  - Extended `ManagedDisk` and `ManagedDiskOutput` with a new `diskEncryptionSet` property.
  - Added `BatchPoolIdentityReference` and `BatchPoolIdentityReferenceOutput` for referencing managed identities in disk encryption scenarios.

- **IPv6 support on Pools**
  - Added `ipv6Address` to `BatchNodeOutput`.
  - Added `ipv6RemoteLoginIPAddress` and `ipv6RemoteLoginPort` to `BatchNodeRemoteLoginSettingsOutput`.

- **Metadata Security Protocol Support on Pools**
  - Added `HostEndpointSettings`, `HostEndpointSettingsOutput`, `HostEndpointSettingsModeTypes`, and `HostEndpointSettingsModeTypesOutput`.
  - Added `ProxyAgentSettings` and `ProxyAgentSettingsOutput`.
  - Extended `SecurityProfile` and `SecurityProfileOutput` with a new `proxyAgentSettings` property for metadata security protocol support.

- **IP Tag Support**
  - Added `IPFamily`, `IPFamilyOutput`, `IPTag`, and `IPTagOutput` types.
  - Extended `BatchPublicIpAddressConfiguration` and `BatchPublicIpAddressConfigurationOutput` with new `ipFamilies` and `ipTags` properties for IP tag support.

### Other Changes

- Many model output types now have required (non-optional) and/or `readonly` properties for improved type safety and clarity. For example, fields like `creationTime`, `id`, `eTag`, `state`, `stateTransitionTime`, and `url` in `BatchJobOutput`, `BatchJobScheduleOutput`, `BatchNodeOutput`, `BatchPoolOutput`, and `BatchTaskOutput` are now required and/or readonly.
- Removed all certificate-related routes from the client path definitions.
- Removed all `isUnexpected` helper functions for certificate-related responses.

## 1.0.0-beta.3 (2025-07-18)

### Breaking Changes

- **Renamed/Refactored Model Types:**
  - Replaced all `*Content` and related types with new `*Options` types for request bodies (e.g., `BatchPoolReplaceContent` → `BatchPoolReplaceOptions`, `BatchNodeReimageContent` → `BatchNodeReimageOptions`, etc.).
  - Updated all corresponding request parameter interfaces to use the new `*Options` types.
  - Updated output types to use new `Batch*Output` types where appropriate.
  - Replaced `MetadataItem`/`MetadataItemOutput` with `BatchMetadataItem`/`BatchMetadataItemOutput`.
  - Replaced `ImageReference`/`ImageReferenceOutput` with `BatchVmImageReference`/`BatchVmImageReferenceOutput`.
  - Replaced `PublicIpAddressConfiguration`/`PublicIpAddressConfigurationOutput` with `BatchPublicIpAddressConfiguration`/`BatchPublicIpAddressConfigurationOutput`.
  - Replaced `UefiSettings`/`UefiSettingsOutput` with `BatchUefiSettings`/`BatchUefiSettingsOutput`.
  - Replaced `VMDiskSecurityProfile`/`VMDiskSecurityProfileOutput` with `BatchVmDiskSecurityProfile`/`BatchVmDiskSecurityProfileOutput`.
  - Replaced `ContainerConfiguration`/`ContainerConfigurationOutput` with `BatchContainerConfiguration`/`BatchContainerConfigurationOutput`.
  - Replaced `OSDisk`/`OSDiskOutput` with `BatchOsDisk`/`BatchOsDiskOutput`.
  - Replaced `UserAssignedIdentityOutput` with `BatchUserAssignedIdentityOutput`.
  - Replaced `HttpHeader`/`HttpHeaderOutput` with `OutputFileUploadHeader`/`OutputFileUploadHeaderOutput`.
  - Replaced `InboundNatPool`/`InboundNatPoolOutput` with `BatchInboundNatPool`/`BatchInboundNatPoolOutput`.

- **Removed Types:**
  - Removed legacy types such as `DiffDiskSettings`, `DiffDiskSettingsOutput`, `OnAllBatchTasksComplete`, `OnBatchTaskFailure`, and others that are now replaced by new types.

- **Changed Field Types:**
  - Changed several numeric fields to string types for improved precision (e.g., `diskReadIOps`, `diskWriteIOps`, `readIOps`, `writeIOps`).
  - Updated model properties to use new types (e.g., `affinityInfo` now uses `BatchAffinityInfo`).

- **API Surface Changes:**
  - Updated all API operation parameter interfaces to use the new `*Options` types.
  - Updated all output and response types to use the new output model types.

### Updates and Enhancements

- **Certificate Management APIs:**
  - Added new interfaces and types for certificate management:
    - `CreateCertificate`, `CreateCertificateParameters`, `CreateCertificate201Response`, etc.
    - `DeleteCertificate`, `DeleteCertificateParameters`, `DeleteCertificate202Response`, etc.
    - `CancelCertificateDeletion`, `CancelCertificateDeletionParameters`, `CancelCertificateDeletion204Response`, etc.
    - `ListCertificates`, `ListCertificatesParameters`, `ListCertificates200Response`, etc.
    - `GetCertificate`, `GetCertificateParameters`, `GetCertificate200Response`, etc.

- **New Model Types:**
  - Added `BatchPublicIpAddressConfiguration`, `BatchUefiSettings`, `BatchVmDiskSecurityProfile`, `BatchVmImageReference`, `BatchUserAssignedIdentityOutput`, `OutputFileUploadHeader`, and related output types.
  - Added new paged iterator and page settings types for improved pagination support.

- **Query Parameter Enhancements:**
  - Added new query parameter types for `$expand` and `$select` supporting both array and structured forms for many list and get operations.

## 1.0.0-beta.2 (2024-11-07)

### Features Added

- Update API version to `2024-07-01.20.0` for Azure Batch service.

## 1.0.0-beta.1 (2024-08-07)

### Features Added

- This is the initial beta release for the Azure Batch SDK, which is a common API supporting Azure Batch services.
