# Release History

## 3.3.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 3.3.0-beta.2 (2025-04-07)
Compared with version 3.2.0
    
### Features Added

  - Added operation group NetworkSecurityPerimeterConfigurations
  - Added operation group Offerings
  - Added operation group Service
  - Added Interface FeatureOffering
  - Added Interface NetworkSecurityPerimeterConfiguration
  - Added Interface NetworkSecurityPerimeterConfigurationListResult
  - Added Interface NetworkSecurityPerimeterConfigurationsGetOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsListByServiceNextOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsListByServiceOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileHeaders
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileOptionalParams
  - Added Interface NSPConfigAccessRule
  - Added Interface NSPConfigAccessRuleProperties
  - Added Interface NSPConfigAssociation
  - Added Interface NSPConfigNetworkSecurityPerimeterRule
  - Added Interface NSPConfigPerimeter
  - Added Interface NSPConfigProfile
  - Added Interface NSPProvisioningIssue
  - Added Interface NSPProvisioningIssueProperties
  - Added Interface OfferingsByRegion
  - Added Interface OfferingsListOptionalParams
  - Added Interface OfferingsListResult
  - Added Interface OperationAvailability
  - Added Interface OperationLogsSpecification
  - Added Interface OperationMetricDimension
  - Added Interface OperationMetricsSpecification
  - Added Interface OperationProperties
  - Added Interface OperationServiceSpecification
  - Added Interface ProxyResource
  - Added Interface ServiceUpgradeHeaders
  - Added Interface ServiceUpgradeOptionalParams
  - Added Interface SkuOffering
  - Added Interface SkuOfferingLimits
  - Added Interface SystemData
  - Added Interface UserAssignedManagedIdentity
  - Added Type Alias ComputeType
  - Added Type Alias CreatedByType
  - Added Type Alias FeatureName
  - Added Type Alias NetworkSecurityPerimeterConfigurationsGetResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsListByServiceNextResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsListByServiceResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsReconcileResponse
  - Added Type Alias OfferingsListResponse
  - Added Type Alias SearchBypass
  - Added Type Alias SearchDisabledDataExfiltrationOption
  - Added Type Alias ServiceUpgradeResponse
  - Interface CloudError has a new optional parameter message
  - Interface Identity has a new optional parameter userAssignedIdentities
  - Interface NetworkRuleSet has a new optional parameter bypass
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface Operation has a new optional parameter properties
  - Interface SearchService has a new optional parameter computeType
  - Interface SearchService has a new optional parameter disabledDataExfiltrationOptions
  - Interface SearchService has a new optional parameter endpoint
  - Interface SearchService has a new optional parameter eTag
  - Interface SearchService has a new optional parameter serviceUpgradeDate
  - Interface SearchService has a new optional parameter systemData
  - Interface SearchService has a new optional parameter upgradeAvailable
  - Interface SearchServiceUpdate has a new optional parameter computeType
  - Interface SearchServiceUpdate has a new optional parameter disabledDataExfiltrationOptions
  - Interface SearchServiceUpdate has a new optional parameter endpoint
  - Interface SearchServiceUpdate has a new optional parameter eTag
  - Interface SearchServiceUpdate has a new optional parameter serviceUpgradeDate
  - Interface SearchServiceUpdate has a new optional parameter systemData
  - Interface SearchServiceUpdate has a new optional parameter upgradeAvailable
  - Added Enum KnownComputeType
  - Added Enum KnownCreatedByType
  - Added Enum KnownFeatureName
  - Added Enum KnownIdentityType
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownSearchBypass
  - Added Enum KnownSearchDisabledDataExfiltrationOption
  - Added Enum KnownSharedPrivateLinkResourceProvisioningState
  - Added Enum KnownSharedPrivateLinkResourceStatus
  - Added Enum KnownSkuName
  - Class SearchManagementClient has a new signature
    
    
## 4.0.0-beta.1 (2024-07-25)
Compared with version 3.2.0
    
### Features Added

  - Added operation group NetworkSecurityPerimeterConfigurations
  - Added Interface NetworkSecurityPerimeterConfiguration
  - Added Interface NetworkSecurityPerimeterConfigurationListResult
  - Added Interface NetworkSecurityPerimeterConfigurationsGetOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsListByServiceNextOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsListByServiceOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileHeaders
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileOptionalParams
  - Added Interface NSPConfigAccessRule
  - Added Interface NSPConfigAccessRuleProperties
  - Added Interface NSPConfigAssociation
  - Added Interface NSPConfigNetworkSecurityPerimeterRule
  - Added Interface NSPConfigPerimeter
  - Added Interface NSPConfigProfile
  - Added Interface NSPProvisioningIssue
  - Added Interface NSPProvisioningIssueProperties
  - Added Interface OperationAvailability
  - Added Interface OperationLogsSpecification
  - Added Interface OperationMetricDimension
  - Added Interface OperationMetricsSpecification
  - Added Interface OperationProperties
  - Added Interface OperationServiceSpecification
  - Added Interface ProxyResource
  - Added Interface UserAssignedManagedIdentity
  - Added Type Alias NetworkSecurityPerimeterConfigurationsGetResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsListByServiceNextResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsListByServiceResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsReconcileResponse
  - Added Type Alias SearchBypass
  - Added Type Alias SearchDisabledDataExfiltrationOption
  - Interface CloudError has a new optional parameter message
  - Interface Identity has a new optional parameter userAssignedIdentities
  - Interface NetworkRuleSet has a new optional parameter bypass
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface Operation has a new optional parameter properties
  - Interface SearchService has a new optional parameter disabledDataExfiltrationOptions
  - Interface SearchService has a new optional parameter eTag
  - Interface SearchServiceUpdate has a new optional parameter disabledDataExfiltrationOptions
  - Interface SearchServiceUpdate has a new optional parameter eTag
  - Added Enum KnownIdentityType
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownSearchBypass
  - Added Enum KnownSearchDisabledDataExfiltrationOption
  - Added Enum KnownSharedPrivateLinkResourceProvisioningState
  - Added Enum KnownSharedPrivateLinkResourceStatus
  - Added Enum KnownSkuName
    
### Breaking Changes

  - Enum ProvisioningState is changed from "succeeded" | "provisioning" | "failed" to "Succeeded" | "Provisioning" | "Failed"


## 3.3.0-beta.1 (2024-03-12)
    
### Features Added

  - Added operation group NetworkSecurityPerimeterConfigurations
  - Added Interface NetworkSecurityPerimeterConfiguration
  - Added Interface NetworkSecurityPerimeterConfigurationListResult
  - Added Interface NetworkSecurityPerimeterConfigurationsGetOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsListByServiceNextOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsListByServiceOptionalParams
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileHeaders
  - Added Interface NetworkSecurityPerimeterConfigurationsReconcileOptionalParams
  - Added Interface NSPConfigAccessRule
  - Added Interface NSPConfigAccessRuleProperties
  - Added Interface NSPConfigAssociation
  - Added Interface NSPConfigNetworkSecurityPerimeterRule
  - Added Interface NSPConfigPerimeter
  - Added Interface NSPConfigProfile
  - Added Interface NSPProvisioningIssue
  - Added Interface NSPProvisioningIssueProperties
  - Added Interface OperationAvailability
  - Added Interface OperationLogsSpecification
  - Added Interface OperationMetricDimension
  - Added Interface OperationMetricsSpecification
  - Added Interface OperationProperties
  - Added Interface OperationServiceSpecification
  - Added Interface ProxyResource
  - Added Interface UserAssignedManagedIdentity
  - Added Type Alias NetworkSecurityPerimeterConfigurationsGetResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsListByServiceNextResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsListByServiceResponse
  - Added Type Alias NetworkSecurityPerimeterConfigurationsReconcileResponse
  - Added Type Alias SearchBypass
  - Added Type Alias SearchDisabledDataExfiltrationOption
  - Interface CloudError has a new optional parameter message
  - Interface Identity has a new optional parameter userAssignedIdentities
  - Interface NetworkRuleSet has a new optional parameter bypass
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface Operation has a new optional parameter properties
  - Interface SearchService has a new optional parameter disabledDataExfiltrationOptions
  - Interface SearchService has a new optional parameter eTag
  - Interface SearchServiceUpdate has a new optional parameter disabledDataExfiltrationOptions
  - Interface SearchServiceUpdate has a new optional parameter eTag
  - Added Enum KnownIdentityType
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownSearchBypass
  - Added Enum KnownSearchDisabledDataExfiltrationOption
  - Added Enum KnownSharedPrivateLinkResourceProvisioningState
  - Added Enum KnownSharedPrivateLinkResourceStatus
  - Added Enum KnownSkuName
    
    
## 3.2.0 (2023-10-09)
    
### Features Added

  - Added operation group Usages
  - Added Interface DataPlaneAadOrApiKeyAuthOption
  - Added Interface DataPlaneAuthOptions
  - Added Interface EncryptionWithCmk
  - Added Interface QuotaUsageResult
  - Added Interface QuotaUsageResultName
  - Added Interface QuotaUsagesListResult
  - Added Interface UsageBySubscriptionSkuOptionalParams
  - Added Interface UsagesListBySubscriptionNextOptionalParams
  - Added Interface UsagesListBySubscriptionOptionalParams
  - Added Type Alias AadAuthFailureMode
  - Added Type Alias PrivateLinkServiceConnectionProvisioningState
  - Added Type Alias SearchEncryptionComplianceStatus
  - Added Type Alias SearchEncryptionWithCmk
  - Added Type Alias SearchSemanticSearch
  - Added Type Alias UsageBySubscriptionSkuResponse
  - Added Type Alias UsagesListBySubscriptionNextResponse
  - Added Type Alias UsagesListBySubscriptionResponse
  - Interface PrivateEndpointConnectionProperties has a new optional parameter groupId
  - Interface PrivateEndpointConnectionProperties has a new optional parameter provisioningState
  - Interface SearchService has a new optional parameter authOptions
  - Interface SearchService has a new optional parameter disableLocalAuth
  - Interface SearchService has a new optional parameter encryptionWithCmk
  - Interface SearchService has a new optional parameter semanticSearch
  - Interface SearchServiceUpdate has a new optional parameter authOptions
  - Interface SearchServiceUpdate has a new optional parameter disableLocalAuth
  - Interface SearchServiceUpdate has a new optional parameter encryptionWithCmk
  - Interface SearchServiceUpdate has a new optional parameter semanticSearch
  - Added Enum KnownPrivateLinkServiceConnectionProvisioningState
  - Added Enum KnownSearchSemanticSearch
    
    
## 3.1.0 (2022-12-07)
    
### Features Added

  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface SearchService
  - Added Interface SearchServiceUpdate
  - Added Interface SharedPrivateLinkResource
  - Added Interface TrackedResource
    
## 3.0.1 (2022-04-29)

### Features Added

  - Bug fix
  
## 3.0.0 (2021-12-21)

The package of @azure/arm-search is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
