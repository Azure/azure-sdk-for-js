# Release History

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
