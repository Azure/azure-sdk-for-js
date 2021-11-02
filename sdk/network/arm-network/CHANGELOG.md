## 26.0.0-beta.2 (2021-11-01)
    
**Features**

  - Added operation group FirewallPolicyIdpsSignatures
  - Added operation group FirewallPolicyIdpsSignaturesFilterValues
  - Added operation group FirewallPolicyIdpsSignaturesOverrides
  - Added operation group RoutingIntentOperations
  - Added operation LoadBalancers.beginListInboundNatRulePortMappings
  - Added operation LoadBalancers.beginListInboundNatRulePortMappingsAndWait
  - Added Interface BackendAddressInboundNatRulePortMappings
  - Added Interface DscpConfigurationCreateOrUpdateOptionalParams
  - Added Interface DscpConfigurationDeleteOptionalParams
  - Added Interface DscpConfigurationGetOptionalParams
  - Added Interface DscpConfigurationListAllNextOptionalParams
  - Added Interface DscpConfigurationListAllOptionalParams
  - Added Interface DscpConfigurationListNextOptionalParams
  - Added Interface DscpConfigurationListOptionalParams
  - Added Interface ExclusionManagedRule
  - Added Interface ExclusionManagedRuleGroup
  - Added Interface ExclusionManagedRuleSet
  - Added Interface FilterItems
  - Added Interface FirewallPolicyIdpsSignaturesFilterValuesListOptionalParams
  - Added Interface FirewallPolicyIdpsSignaturesListOptionalParams
  - Added Interface FirewallPolicyIdpsSignaturesOverridesGetOptionalParams
  - Added Interface FirewallPolicyIdpsSignaturesOverridesListOptionalParams
  - Added Interface FirewallPolicyIdpsSignaturesOverridesPatchOptionalParams
  - Added Interface FirewallPolicyIdpsSignaturesOverridesPutOptionalParams
  - Added Interface IdpsQueryObject
  - Added Interface InboundNatRulePortMapping
  - Added Interface InboundSecurityRuleCreateOrUpdateOptionalParams
  - Added Interface ListRoutingIntentResult
  - Added Interface LoadBalancersListInboundNatRulePortMappingsOptionalParams
  - Added Interface NatRulePortMapping
  - Added Interface OrderBy
  - Added Interface QueryInboundNatRulePortMappingRequest
  - Added Interface QueryResults
  - Added Interface RoutingIntentCreateOrUpdateOptionalParams
  - Added Interface RoutingIntentDeleteOptionalParams
  - Added Interface RoutingIntentGetOptionalParams
  - Added Interface RoutingIntentListNextOptionalParams
  - Added Interface RoutingIntentListOptionalParams
  - Added Interface RoutingPolicy
  - Added Interface ServiceTagInformationListNextOptionalParams
  - Added Interface ServiceTagInformationListOptionalParams
  - Added Interface SignatureOverridesFilterValuesQuery
  - Added Interface SignatureOverridesFilterValuesResponse
  - Added Interface SignaturesOverrides
  - Added Interface SignaturesOverridesList
  - Added Interface SignaturesOverridesProperties
  - Added Interface SingleQueryResult
  - Added Interface VirtualNetworkEncryption
  - Added Type Alias DscpConfigurationCreateOrUpdateResponse
  - Added Type Alias DscpConfigurationGetResponse
  - Added Type Alias DscpConfigurationListAllNextResponse
  - Added Type Alias DscpConfigurationListAllResponse
  - Added Type Alias DscpConfigurationListNextResponse
  - Added Type Alias DscpConfigurationListResponse
  - Added Type Alias Enum69
  - Added Type Alias Enum70
  - Added Type Alias Enum71
  - Added Type Alias FirewallPolicyIdpsSignaturesFilterValuesListResponse
  - Added Type Alias FirewallPolicyIdpsSignaturesListResponse
  - Added Type Alias FirewallPolicyIdpsSignaturesOverridesGetResponse
  - Added Type Alias FirewallPolicyIdpsSignaturesOverridesListResponse
  - Added Type Alias FirewallPolicyIdpsSignaturesOverridesPatchResponse
  - Added Type Alias FirewallPolicyIdpsSignaturesOverridesPutResponse
  - Added Type Alias InboundSecurityRuleCreateOrUpdateResponse
  - Added Type Alias LoadBalancersListInboundNatRulePortMappingsResponse
  - Added Type Alias OrderByOrder
  - Added Type Alias RoutingIntent
  - Added Type Alias RoutingIntentCreateOrUpdateResponse
  - Added Type Alias RoutingIntentGetResponse
  - Added Type Alias RoutingIntentListNextResponse
  - Added Type Alias RoutingIntentListResponse
  - Added Type Alias ServiceTagInformationListNextResponse
  - Added Type Alias ServiceTagInformationListResponse
  - Added Type Alias VirtualNetworkEncryptionEnforcement
  - Interface LoadBalancerBackendAddress has a new optional parameter inboundNatRulesPortMapping
  - Interface OwaspCrsExclusionEntry has a new optional parameter exclusionManagedRuleSets
  - Interface VpnNatRuleMapping has a new optional parameter portRange
  - Class NetworkManagementClient has a new parameter firewallPolicyIdpsSignatures
  - Class NetworkManagementClient has a new parameter firewallPolicyIdpsSignaturesFilterValues
  - Class NetworkManagementClient has a new parameter firewallPolicyIdpsSignaturesOverrides
  - Class NetworkManagementClient has a new parameter routingIntentOperations
  - Type Alias BackendAddressPool has a new parameter inboundNatRules
  - Type Alias NetworkInterface has a new parameter vnetEncryptionSupported
  - Type Alias VirtualNetwork has a new parameter encryption
  - Type Alias VirtualNetworkGateway has a new parameter disableIPSecReplayProtection
  - Type Alias VirtualNetworkPeering has a new parameter remoteVirtualNetworkEncryption
  - Added Enum KnownEnum69
  - Added Enum KnownEnum70
  - Added Enum KnownEnum71
  - Added Enum KnownOrderByOrder
  - Added Enum KnownVirtualNetworkEncryptionEnforcement
  - Enum KnownAzureFirewallSkuTier has a new value Basic
  - Enum KnownFirewallPolicySkuTier has a new value Basic
  - Enum KnownOwaspCrsExclusionEntryMatchVariable has a new value RequestArgKeys
  - Enum KnownOwaspCrsExclusionEntryMatchVariable has a new value RequestArgValues
  - Enum KnownOwaspCrsExclusionEntryMatchVariable has a new value RequestCookieKeys
  - Enum KnownOwaspCrsExclusionEntryMatchVariable has a new value RequestCookieValues
  - Enum KnownOwaspCrsExclusionEntryMatchVariable has a new value RequestHeaderKeys
  - Enum KnownOwaspCrsExclusionEntryMatchVariable has a new value RequestHeaderValues

**Breaking Changes**

  - Operation DscpConfigurationOperations.beginCreateOrUpdate has a new signature
  - Operation DscpConfigurationOperations.beginCreateOrUpdateAndWait has a new signature
  - Operation DscpConfigurationOperations.beginDelete has a new signature
  - Operation DscpConfigurationOperations.beginDeleteAndWait has a new signature
  - Operation DscpConfigurationOperations.get has a new signature
  - Operation DscpConfigurationOperations.list has a new signature
  - Operation DscpConfigurationOperations.listAll has a new signature
  - Operation InboundSecurityRuleOperations.beginCreateOrUpdate has a new signature
  - Operation InboundSecurityRuleOperations.beginCreateOrUpdateAndWait has a new signature
  - Operation ServiceTagInformationOperations.list has a new signature
    
# Release History

## 26.0.0-beta.1 (2021-10-09)

This is the first preview for the new version of the `@azure/arm-network` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the Lro related object returned by methods whose names started with `begin`, now uses `pollUntilDone` to check whether the request is finished, instead of `pollUntilFinished`. To get the final result, use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
