# Release History

## 2.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.0-beta.1 (2026-06-16)
Compared with version 1.2.0

### Features Added
  - Added operation group CustomCaptureConfigurationsFirewallResourcesOperations
  - Added operation CertificateObjectGlobalRulestackOperations.createOrUpdate
  - Added operation CertificateObjectGlobalRulestackOperations.delete
  - Added operation CertificateObjectLocalRulestackOperations.createOrUpdate
  - Added operation CertificateObjectLocalRulestackOperations.delete
  - Added operation FirewallsOperations.createOrUpdate
  - Added operation FirewallsOperations.delete
  - Added operation FqdnListGlobalRulestackOperations.createOrUpdate
  - Added operation FqdnListGlobalRulestackOperations.delete
  - Added operation FqdnListLocalRulestackOperations.createOrUpdate
  - Added operation FqdnListLocalRulestackOperations.delete
  - Added operation GlobalRulestackOperations.commit
  - Added operation GlobalRulestackOperations.createOrUpdate
  - Added operation GlobalRulestackOperations.delete
  - Added operation LocalRulesOperations.createOrUpdate
  - Added operation LocalRulesOperations.delete
  - Added operation LocalRulestacksOperations.commit
  - Added operation LocalRulestacksOperations.createOrUpdate
  - Added operation LocalRulestacksOperations.delete
  - Added operation MetricsObjectFirewallOperations.createOrUpdate
  - Added operation MetricsObjectFirewallOperations.delete
  - Added operation PostRulesOperations.createOrUpdate
  - Added operation PostRulesOperations.delete
  - Added operation PrefixListGlobalRulestackOperations.createOrUpdate
  - Added operation PrefixListGlobalRulestackOperations.delete
  - Added operation PrefixListLocalRulestackOperations.createOrUpdate
  - Added operation PrefixListLocalRulestackOperations.delete
  - Added operation PreRulesOperations.createOrUpdate
  - Added operation PreRulesOperations.delete
  - Added Interface CertificateObject
  - Added Interface CustomCaptureConfigurationsFilter
  - Added Interface CustomCaptureConfigurationsFirewallResource
  - Added Interface CustomCaptureConfigurationsFirewallResourcesCreateOrUpdateOptionalParams
  - Added Interface CustomCaptureConfigurationsFirewallResourcesDeleteOptionalParams
  - Added Interface CustomCaptureConfigurationsFirewallResourcesGetOptionalParams
  - Added Interface CustomCaptureConfigurationsFirewallResourcesListByFirewallOptionalParams
  - Added Interface CustomCaptureConfigurationsProperties
  - Added Interface FirewallDeploymentProperties
  - Added Interface FirewallStatusProperty
  - Added Interface FqdnObject
  - Added Interface MetricsObject
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrefixObject
  - Added Interface RestorePollerOptions
  - Added Interface RuleEntry
  - Added Interface RulestackProperties
  - Added Interface SimplePollerLike
  - Interface FirewallResource has a new optional parameter firewallSku
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CustomCaptureConfigurationsProtocol
  - Added Type Alias CustomCaptureConfigurationsStage
  - Added Type Alias CustomCaptureConfigurationsStatus
  - Added Enum AzureClouds
  - Added Enum KnownCustomCaptureConfigurationsProtocol
  - Added Enum KnownCustomCaptureConfigurationsStage
  - Added Enum KnownCustomCaptureConfigurationsStatus
  - Added Enum KnownVersions

### Breaking Changes
  - Operation MetricsObjectFirewall.beginDeleteAndWait has a new signature

## 1.2.0 (2025-11-11)

### Features Added
  - Added operation group MetricsObjectFirewall
  - Added operation group PaloAltoNetworksCloudngfwOperations
  - Added Interface CertificateObjectGlobalRulestackCreateOrUpdateHeaders
  - Added Interface CertificateObjectGlobalRulestackDeleteHeaders
  - Added Interface CertificateObjectLocalRulestackCreateOrUpdateHeaders
  - Added Interface CertificateObjectLocalRulestackDeleteHeaders
  - Added Interface CloudManagerTenantList
  - Added Interface FirewallsCreateOrUpdateHeaders
  - Added Interface FirewallsDeleteHeaders
  - Added Interface FqdnListGlobalRulestackCreateOrUpdateHeaders
  - Added Interface FqdnListGlobalRulestackDeleteHeaders
  - Added Interface FqdnListLocalRulestackCreateOrUpdateHeaders
  - Added Interface FqdnListLocalRulestackDeleteHeaders
  - Added Interface GlobalRulestackCreateOrUpdateHeaders
  - Added Interface GlobalRulestackDeleteHeaders
  - Added Interface LocalRulesCreateOrUpdateHeaders
  - Added Interface LocalRulesDeleteHeaders
  - Added Interface LocalRulestacksCreateOrUpdateHeaders
  - Added Interface LocalRulestacksDeleteHeaders
  - Added Interface MetricsObjectFirewallCreateOrUpdateHeaders
  - Added Interface MetricsObjectFirewallCreateOrUpdateOptionalParams
  - Added Interface MetricsObjectFirewallDeleteHeaders
  - Added Interface MetricsObjectFirewallDeleteOptionalParams
  - Added Interface MetricsObjectFirewallGetOptionalParams
  - Added Interface MetricsObjectFirewallListByFirewallsOptionalParams
  - Added Interface MetricsObjectFirewallResource
  - Added Interface MetricsObjectFirewallResourceListResult
  - Added Interface PaloAltoNetworksCloudngfwOperationsCreateProductSerialNumberOptionalParams
  - Added Interface PaloAltoNetworksCloudngfwOperationsListCloudManagerTenantsOptionalParams
  - Added Interface PaloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusOptionalParams
  - Added Interface PaloAltoNetworksCloudngfwOperationsListSupportInfoOptionalParams
  - Added Interface PostRulesCreateOrUpdateHeaders
  - Added Interface PostRulesDeleteHeaders
  - Added Interface PrefixListGlobalRulestackCreateOrUpdateHeaders
  - Added Interface PrefixListGlobalRulestackDeleteHeaders
  - Added Interface PrefixListLocalRulestackCreateOrUpdateHeaders
  - Added Interface PrefixListLocalRulestackDeleteHeaders
  - Added Interface PreRulesCreateOrUpdateHeaders
  - Added Interface PreRulesDeleteHeaders
  - Added Interface ProductSerialNumberRequestStatus
  - Added Interface ProductSerialNumberStatus
  - Added Interface StrataCloudManagerConfig
  - Added Interface StrataCloudManagerInfo
  - Added Interface SupportInfoModel
  - Interface FirewallResource has a new optional parameter isStrataCloudManaged
  - Interface FirewallResource has a new optional parameter strataCloudManagerConfig
  - Interface FirewallResourceUpdateProperties has a new optional parameter isStrataCloudManaged
  - Interface FirewallResourceUpdateProperties has a new optional parameter strataCloudManagerConfig
  - Interface FirewallStatusResource has a new optional parameter isStrataCloudManaged
  - Interface FirewallStatusResource has a new optional parameter strataCloudManagerInfo
  - Interface NetworkProfile has a new optional parameter privateSourceNatRulesDestination
  - Added Type Alias EnableStatus
  - Added Type Alias LocalRulestacksListAppIdsNextResponse
  - Added Type Alias LocalRulestacksListCountriesNextResponse
  - Added Type Alias LocalRulestacksListPredefinedUrlCategoriesNextResponse
  - Added Type Alias MetricsObjectFirewallCreateOrUpdateResponse
  - Added Type Alias MetricsObjectFirewallDeleteResponse
  - Added Type Alias MetricsObjectFirewallGetResponse
  - Added Type Alias MetricsObjectFirewallListByFirewallsNextResponse
  - Added Type Alias MetricsObjectFirewallListByFirewallsResponse
  - Added Type Alias PaloAltoNetworksCloudngfwOperationsCreateProductSerialNumberResponse
  - Added Type Alias PaloAltoNetworksCloudngfwOperationsListCloudManagerTenantsResponse
  - Added Type Alias PaloAltoNetworksCloudngfwOperationsListProductSerialNumberStatusResponse
  - Added Type Alias PaloAltoNetworksCloudngfwOperationsListSupportInfoResponse
  - Added Type Alias ProductSerialStatusValues
  - Added Type Alias RegistrationStatus
  - Added Enum KnownEnableStatus
  - Added Enum KnownRegistrationStatus

    
## 1.1.0 (2023-11-15)
    
### Features Added

  - Interface NetworkProfile has a new optional parameter trustedRanges
    
    
## 1.0.0 (2023-07-14)

The package of @azure/arm-paloaltonetworksngfw is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
