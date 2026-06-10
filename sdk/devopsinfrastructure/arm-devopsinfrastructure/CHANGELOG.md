# Release History

## 2.0.0-beta.1 (2026-06-10)
Compared with version 1.0.0

### Features Added
  - Added operation PoolsOperations.checkNameAvailability
  - Added operation PoolsOperations.deleteResources
  - Added Interface CheckNameAvailability
  - Added Interface CheckNameAvailabilityResult
  - Added Interface DeleteResourcesDetails
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface PoolsCheckNameAvailabilityOptionalParams
  - Added Interface PoolsDeleteResourcesOptionalParams
  - Added Interface RuntimeConfiguration
  - Interface AzureDevOpsOrganizationProfile has a new optional parameter alias
  - Interface DevOpsAzureSku has a new optional parameter linuxNvmePath
  - Interface DevOpsAzureSku has a new optional parameter windowsNvmeDrive
  - Interface DevOpsInfrastructureClientOptionalParams has a new optional parameter cloudSetting
  - Interface NetworkProfile has a new optional parameter ipAddresses
  - Interface NetworkProfile has a new optional parameter staticIpAddressCount
  - Interface Organization has a new optional parameter alias
  - Interface Organization has a new optional parameter openAccess
  - Interface PoolImage has a new optional parameter ephemeralType
  - Interface PoolImage has a new optional parameter isEphemeral
  - Interface PoolProperties has a new optional parameter runtimeConfiguration
  - Interface PoolUpdateProperties has a new optional parameter runtimeConfiguration
  - Interface SecretsManagementSettings has a new optional parameter certificateStoreName
  - Added Type Alias AvailabilityStatus
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CertificateStoreNameOption
  - Added Type Alias CheckNameAvailabilityReason
  - Added Type Alias DevOpsInfrastructureResourceType
  - Added Type Alias EphemeralType
  - Added Enum AzureClouds
  - Added Enum KnownAvailabilityStatus
  - Added Enum KnownCertificateStoreNameOption
  - Added Enum KnownCheckNameAvailabilityReason
  - Added Enum KnownDevOpsInfrastructureResourceType
  - Added Enum KnownEphemeralType
  - Enum KnownStorageAccountType has a new value StandardSsdlrs
  - Enum KnownStorageAccountType has a new value StandardSsdzrs
  - Enum KnownVersions has a new value V20250121
  - Enum KnownVersions has a new value V20250920
  - Enum KnownVersions has a new value V20260417Preview

### Breaking Changes
  - Parameter subnetId of interface NetworkProfile is now optional
  - Enum KnownStorageAccountType no longer has value StandardSSDLRS
  - Enum KnownStorageAccountType no longer has value StandardSSDZRS
  - Enum KnownVersions no longer has value "V2024-10-19"

    
## 1.0.0 (2024-11-25)

### Features Added

This is the first stable version with the package of @azure/arm-devopsinfrastructure
