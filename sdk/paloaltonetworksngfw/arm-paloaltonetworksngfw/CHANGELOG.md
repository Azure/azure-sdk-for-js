# Release History

## 2.0.0-beta.1 (2026-06-15)
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
  - Removed operation CertificateObjectGlobalRulestack.beginCreateOrUpdate
  - Removed operation CertificateObjectGlobalRulestack.beginCreateOrUpdateAndWait
  - Removed operation CertificateObjectGlobalRulestack.beginDelete
  - Removed operation CertificateObjectGlobalRulestack.beginDeleteAndWait
  - Removed operation CertificateObjectLocalRulestack.beginCreateOrUpdate
  - Removed operation CertificateObjectLocalRulestack.beginCreateOrUpdateAndWait
  - Removed operation CertificateObjectLocalRulestack.beginDelete
  - Removed operation CertificateObjectLocalRulestack.beginDeleteAndWait
  - Removed operation Firewalls.beginCreateOrUpdate
  - Removed operation Firewalls.beginCreateOrUpdateAndWait
  - Removed operation Firewalls.beginDelete
  - Removed operation Firewalls.beginDeleteAndWait
  - Removed operation FqdnListGlobalRulestack.beginCreateOrUpdate
  - Removed operation FqdnListGlobalRulestack.beginCreateOrUpdateAndWait
  - Removed operation FqdnListGlobalRulestack.beginDelete
  - Removed operation FqdnListGlobalRulestack.beginDeleteAndWait
  - Removed operation FqdnListLocalRulestack.beginCreateOrUpdate
  - Removed operation FqdnListLocalRulestack.beginCreateOrUpdateAndWait
  - Removed operation FqdnListLocalRulestack.beginDelete
  - Removed operation FqdnListLocalRulestack.beginDeleteAndWait
  - Removed operation GlobalRulestack.beginCommit
  - Removed operation GlobalRulestack.beginCommitAndWait
  - Removed operation GlobalRulestack.beginCreateOrUpdate
  - Removed operation GlobalRulestack.beginCreateOrUpdateAndWait
  - Removed operation GlobalRulestack.beginDelete
  - Removed operation GlobalRulestack.beginDeleteAndWait
  - Removed operation LocalRules.beginCreateOrUpdate
  - Removed operation LocalRules.beginCreateOrUpdateAndWait
  - Removed operation LocalRules.beginDelete
  - Removed operation LocalRules.beginDeleteAndWait
  - Removed operation LocalRulestacks.beginCommit
  - Removed operation LocalRulestacks.beginCommitAndWait
  - Removed operation LocalRulestacks.beginCreateOrUpdate
  - Removed operation LocalRulestacks.beginCreateOrUpdateAndWait
  - Removed operation LocalRulestacks.beginDelete
  - Removed operation LocalRulestacks.beginDeleteAndWait
  - Removed operation MetricsObjectFirewall.beginCreateOrUpdate
  - Removed operation MetricsObjectFirewall.beginCreateOrUpdateAndWait
  - Removed operation MetricsObjectFirewall.beginDelete
  - Removed operation MetricsObjectFirewall.beginDeleteAndWait
  - Removed operation PostRules.beginCreateOrUpdate
  - Removed operation PostRules.beginCreateOrUpdateAndWait
  - Removed operation PostRules.beginDelete
  - Removed operation PostRules.beginDeleteAndWait
  - Removed operation PrefixListGlobalRulestack.beginCreateOrUpdate
  - Removed operation PrefixListGlobalRulestack.beginCreateOrUpdateAndWait
  - Removed operation PrefixListGlobalRulestack.beginDelete
  - Removed operation PrefixListGlobalRulestack.beginDeleteAndWait
  - Removed operation PrefixListLocalRulestack.beginCreateOrUpdate
  - Removed operation PrefixListLocalRulestack.beginCreateOrUpdateAndWait
  - Removed operation PrefixListLocalRulestack.beginDelete
  - Removed operation PrefixListLocalRulestack.beginDeleteAndWait
  - Removed operation PreRules.beginCreateOrUpdate
  - Removed operation PreRules.beginCreateOrUpdateAndWait
  - Removed operation PreRules.beginDelete
  - Removed operation PreRules.beginDeleteAndWait
  - Class PaloAltoNetworksCloudngfw no longer has parameter apiVersion
  - Class PaloAltoNetworksCloudngfw no longer has parameter subscriptionId

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
