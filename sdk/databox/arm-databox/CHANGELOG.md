# Release History

## 6.0.0 (2026-06-24)

### Features Added
  - Added operation JobsOperations.create
  - Added operation JobsOperations.delete
  - Added operation JobsOperations.update
  - Class DataBoxManagementClient has a new constructor "constructor(credential: TokenCredential, options?: DataBoxManagementClientOptionalParams);"
  - Added Interface JobProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface SkuProperties
  - Added Interface TrackedResource
  - Added Interface UpdateJobProperties
  - Added Interface ValidationResponseProperties
  - Interface DeviceErasureDetails has a new optional parameter secureErasureCertificateSasKey
  - Interface Resource has a new optional parameter id
  - Interface Resource has a new optional parameter name
  - Interface Resource has a new optional parameter systemData
  - Interface Resource has a new optional parameter type
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions

### Breaking Changes
  - Operation Service.regionConfiguration has a new signature
  - Operation Service.regionConfigurationByResourceGroup has a new signature
  - Class DataBoxManagementClient no longer has parameter apiVersion
  - Class DataBoxManagementClient no longer has parameter subscriptionId
  - Removed Interface ArmBaseObject
  - Removed Interface JobResourceList
  - Removed Interface OperationList
  - Removed Interface UnencryptedCredentialsList
  - Type of parameter copyLogDetailsType of interface GranularCopyLogDetails is changed from "DataBoxCustomerDisk" to ClassDiscriminator
  - Type of parameter skuName of interface ScheduleAvailabilityRequest is changed from "DataBox" | "DataBoxDisk" | "DataBoxHeavy" to SkuName
  - Interface Resource no longer has parameter identity
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter sku
  - Interface Resource no longer has parameter tags
  - Type alias "GranularCopyLogDetailsUnion" has been changed
  - Type alias "JobDetailsUnion" has been changed
  - Type alias "ScheduleAvailabilityRequestUnion" has been changed

