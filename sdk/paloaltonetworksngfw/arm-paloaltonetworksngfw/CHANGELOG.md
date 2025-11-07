# Release History

## 2.0.0 (2025-11-07)

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
  - Added Interface GlobalRulestackCommitHeaders
  - Added Interface GlobalRulestackCreateOrUpdateHeaders
  - Added Interface GlobalRulestackDeleteHeaders
  - Added Interface LocalRulesCreateOrUpdateHeaders
  - Added Interface LocalRulesDeleteHeaders
  - Added Interface LocalRulestacksCommitHeaders
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
  - Added Type Alias GlobalRulestackCommitResponse
  - Added Type Alias LocalRulestacksCommitResponse
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

### Breaking Changes
  - Operation GlobalRulestack.beginCommitAndWait has a new signature
  - Operation LocalRulestacks.beginCommitAndWait has a new signature

    
## 1.1.0 (2023-11-15)
    
### Features Added

  - Interface NetworkProfile has a new optional parameter trustedRanges
    
    
## 1.0.0 (2023-07-14)

The package of @azure/arm-paloaltonetworksngfw is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
