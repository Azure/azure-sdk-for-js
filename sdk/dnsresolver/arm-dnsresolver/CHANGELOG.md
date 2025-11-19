# Release History

## 2.0.0-beta.1 (2025-11-13)
Compared with version 1.2.0

### Features Added
  - Added Interface DnsForwardingRulesetsCreateOrUpdateHeaders
  - Added Interface DnsForwardingRulesetsDeleteHeaders
  - Added Interface DnsForwardingRulesetsUpdateHeaders
  - Added Interface DnsResolverDomainListsCreateOrUpdateHeaders
  - Added Interface DnsResolverPoliciesCreateOrUpdateHeaders
  - Added Interface DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateHeaders
  - Added Interface DnsResolversCreateOrUpdateHeaders
  - Added Interface DnsResolversDeleteHeaders
  - Added Interface DnsResolversUpdateHeaders
  - Added Interface DnsSecurityRulesCreateOrUpdateHeaders
  - Added Interface InboundEndpointsCreateOrUpdateHeaders
  - Added Interface InboundEndpointsDeleteHeaders
  - Added Interface InboundEndpointsUpdateHeaders
  - Added Interface OutboundEndpointsCreateOrUpdateHeaders
  - Added Interface OutboundEndpointsDeleteHeaders
  - Added Interface OutboundEndpointsUpdateHeaders
  - Added Interface VirtualNetworkLinksCreateOrUpdateHeaders
  - Added Interface VirtualNetworkLinksDeleteHeaders
  - Added Interface VirtualNetworkLinksUpdateHeaders
  - Interface DnsResolverDomainListsBulkHeaders has a new optional parameter retryAfter
  - Interface DnsResolverDomainListsDeleteHeaders has a new optional parameter retryAfter
  - Interface DnsResolverDomainListsUpdateHeaders has a new optional parameter retryAfter
  - Interface DnsResolverPoliciesDeleteHeaders has a new optional parameter retryAfter
  - Interface DnsResolverPoliciesUpdateHeaders has a new optional parameter retryAfter
  - Interface DnsResolverPolicyVirtualNetworkLinksDeleteHeaders has a new optional parameter retryAfter
  - Interface DnsResolverPolicyVirtualNetworkLinksUpdateHeaders has a new optional parameter retryAfter
  - Interface DnsSecurityRule has a new optional parameter managedDomainLists
  - Interface DnsSecurityRulePatch has a new optional parameter managedDomainLists
  - Interface DnsSecurityRulesDeleteHeaders has a new optional parameter retryAfter
  - Interface DnsSecurityRulesUpdateHeaders has a new optional parameter retryAfter
  - Added Type Alias ManagedDomainList
  - Added Enum KnownManagedDomainList

### Breaking Changes
  - Operation DnsSecurityRules.beginCreateOrUpdate has a new signature
  - Operation DnsSecurityRules.beginCreateOrUpdateAndWait has a new signature
  - Operation DnsSecurityRules.beginUpdateAndWait has a new signature
  - Operation DnsSecurityRules.get has a new signature
  - Parameter dnsResolverDomainLists of interface DnsSecurityRule is now optional

    
## 1.2.0 (2025-06-11)
    
### Features Added

  - Added operation group DnsResolverDomainLists
  - Added operation group DnsResolverPolicies
  - Added operation group DnsResolverPolicyVirtualNetworkLinks
  - Added operation group DnsSecurityRules
  - Added Interface DnsResolverDomainList
  - Added Interface DnsResolverDomainListBulk
  - Added Interface DnsResolverDomainListPatch
  - Added Interface DnsResolverDomainListResult
  - Added Interface DnsResolverDomainListsBulkHeaders
  - Added Interface DnsResolverDomainListsBulkOptionalParams
  - Added Interface DnsResolverDomainListsCreateOrUpdateOptionalParams
  - Added Interface DnsResolverDomainListsDeleteHeaders
  - Added Interface DnsResolverDomainListsDeleteOptionalParams
  - Added Interface DnsResolverDomainListsGetOptionalParams
  - Added Interface DnsResolverDomainListsListByResourceGroupNextOptionalParams
  - Added Interface DnsResolverDomainListsListByResourceGroupOptionalParams
  - Added Interface DnsResolverDomainListsListNextOptionalParams
  - Added Interface DnsResolverDomainListsListOptionalParams
  - Added Interface DnsResolverDomainListsUpdateHeaders
  - Added Interface DnsResolverDomainListsUpdateOptionalParams
  - Added Interface DnsResolverPoliciesCreateOrUpdateOptionalParams
  - Added Interface DnsResolverPoliciesDeleteHeaders
  - Added Interface DnsResolverPoliciesDeleteOptionalParams
  - Added Interface DnsResolverPoliciesGetOptionalParams
  - Added Interface DnsResolverPoliciesListByResourceGroupNextOptionalParams
  - Added Interface DnsResolverPoliciesListByResourceGroupOptionalParams
  - Added Interface DnsResolverPoliciesListByVirtualNetworkNextOptionalParams
  - Added Interface DnsResolverPoliciesListByVirtualNetworkOptionalParams
  - Added Interface DnsResolverPoliciesListNextOptionalParams
  - Added Interface DnsResolverPoliciesListOptionalParams
  - Added Interface DnsResolverPoliciesUpdateHeaders
  - Added Interface DnsResolverPoliciesUpdateOptionalParams
  - Added Interface DnsResolverPolicy
  - Added Interface DnsResolverPolicyListResult
  - Added Interface DnsResolverPolicyPatch
  - Added Interface DnsResolverPolicyVirtualNetworkLink
  - Added Interface DnsResolverPolicyVirtualNetworkLinkListResult
  - Added Interface DnsResolverPolicyVirtualNetworkLinkPatch
  - Added Interface DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams
  - Added Interface DnsResolverPolicyVirtualNetworkLinksDeleteHeaders
  - Added Interface DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams
  - Added Interface DnsResolverPolicyVirtualNetworkLinksGetOptionalParams
  - Added Interface DnsResolverPolicyVirtualNetworkLinksListNextOptionalParams
  - Added Interface DnsResolverPolicyVirtualNetworkLinksListOptionalParams
  - Added Interface DnsResolverPolicyVirtualNetworkLinksUpdateHeaders
  - Added Interface DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams
  - Added Interface DnsSecurityRule
  - Added Interface DnsSecurityRuleAction
  - Added Interface DnsSecurityRuleListResult
  - Added Interface DnsSecurityRulePatch
  - Added Interface DnsSecurityRulesCreateOrUpdateOptionalParams
  - Added Interface DnsSecurityRulesDeleteHeaders
  - Added Interface DnsSecurityRulesDeleteOptionalParams
  - Added Interface DnsSecurityRulesGetOptionalParams
  - Added Interface DnsSecurityRulesListNextOptionalParams
  - Added Interface DnsSecurityRulesListOptionalParams
  - Added Interface DnsSecurityRulesUpdateHeaders
  - Added Interface DnsSecurityRulesUpdateOptionalParams
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Type Alias Action
  - Added Type Alias ActionType
  - Added Type Alias DnsResolverDomainListsBulkResponse
  - Added Type Alias DnsResolverDomainListsCreateOrUpdateResponse
  - Added Type Alias DnsResolverDomainListsDeleteResponse
  - Added Type Alias DnsResolverDomainListsGetResponse
  - Added Type Alias DnsResolverDomainListsListByResourceGroupNextResponse
  - Added Type Alias DnsResolverDomainListsListByResourceGroupResponse
  - Added Type Alias DnsResolverDomainListsListNextResponse
  - Added Type Alias DnsResolverDomainListsListResponse
  - Added Type Alias DnsResolverDomainListsUpdateResponse
  - Added Type Alias DnsResolverPoliciesCreateOrUpdateResponse
  - Added Type Alias DnsResolverPoliciesDeleteResponse
  - Added Type Alias DnsResolverPoliciesGetResponse
  - Added Type Alias DnsResolverPoliciesListByResourceGroupNextResponse
  - Added Type Alias DnsResolverPoliciesListByResourceGroupResponse
  - Added Type Alias DnsResolverPoliciesListByVirtualNetworkNextResponse
  - Added Type Alias DnsResolverPoliciesListByVirtualNetworkResponse
  - Added Type Alias DnsResolverPoliciesListNextResponse
  - Added Type Alias DnsResolverPoliciesListResponse
  - Added Type Alias DnsResolverPoliciesUpdateResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksDeleteResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksGetResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksListNextResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksListResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksUpdateResponse
  - Added Type Alias DnsSecurityRulesCreateOrUpdateResponse
  - Added Type Alias DnsSecurityRulesDeleteResponse
  - Added Type Alias DnsSecurityRulesGetResponse
  - Added Type Alias DnsSecurityRulesListNextResponse
  - Added Type Alias DnsSecurityRulesListResponse
  - Added Type Alias DnsSecurityRuleState
  - Added Type Alias DnsSecurityRulesUpdateResponse
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownAction
  - Added Enum KnownActionType
  - Added Enum KnownDnsSecurityRuleState
  - Interface DnsForwardingRuleset no longer has parameter systemData
  - Interface DnsResolver no longer has parameter systemData
  - Interface ForwardingRule no longer has parameter systemData
  - Interface InboundEndpoint no longer has parameter systemData
  - Interface OutboundEndpoint no longer has parameter systemData
  - Interface VirtualNetworkLink no longer has parameter systemData
    
    
## 1.2.0-beta.1 (2024-10-21)
Compared with version 1.1.0
    
### Features Added

  - Added operation group DnsResolverDomainLists
  - Added operation group DnsResolverPolicies
  - Added operation group DnsResolverPolicyVirtualNetworkLinks
  - Added operation group DnsSecurityRules
  - Added Interface DnsResolverDomainList
  - Added Interface DnsResolverDomainListPatch
  - Added Interface DnsResolverDomainListResult
  - Added Interface DnsResolverDomainListsCreateOrUpdateOptionalParams
  - Added Interface DnsResolverDomainListsDeleteHeaders
  - Added Interface DnsResolverDomainListsDeleteOptionalParams
  - Added Interface DnsResolverDomainListsGetOptionalParams
  - Added Interface DnsResolverDomainListsListByResourceGroupNextOptionalParams
  - Added Interface DnsResolverDomainListsListByResourceGroupOptionalParams
  - Added Interface DnsResolverDomainListsListNextOptionalParams
  - Added Interface DnsResolverDomainListsListOptionalParams
  - Added Interface DnsResolverDomainListsUpdateHeaders
  - Added Interface DnsResolverDomainListsUpdateOptionalParams
  - Added Interface DnsResolverPoliciesCreateOrUpdateOptionalParams
  - Added Interface DnsResolverPoliciesDeleteHeaders
  - Added Interface DnsResolverPoliciesDeleteOptionalParams
  - Added Interface DnsResolverPoliciesGetOptionalParams
  - Added Interface DnsResolverPoliciesListByResourceGroupNextOptionalParams
  - Added Interface DnsResolverPoliciesListByResourceGroupOptionalParams
  - Added Interface DnsResolverPoliciesListByVirtualNetworkNextOptionalParams
  - Added Interface DnsResolverPoliciesListByVirtualNetworkOptionalParams
  - Added Interface DnsResolverPoliciesListNextOptionalParams
  - Added Interface DnsResolverPoliciesListOptionalParams
  - Added Interface DnsResolverPoliciesUpdateHeaders
  - Added Interface DnsResolverPoliciesUpdateOptionalParams
  - Added Interface DnsResolverPolicy
  - Added Interface DnsResolverPolicyListResult
  - Added Interface DnsResolverPolicyPatch
  - Added Interface DnsResolverPolicyVirtualNetworkLink
  - Added Interface DnsResolverPolicyVirtualNetworkLinkListResult
  - Added Interface DnsResolverPolicyVirtualNetworkLinkPatch
  - Added Interface DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams
  - Added Interface DnsResolverPolicyVirtualNetworkLinksDeleteHeaders
  - Added Interface DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams
  - Added Interface DnsResolverPolicyVirtualNetworkLinksGetOptionalParams
  - Added Interface DnsResolverPolicyVirtualNetworkLinksListNextOptionalParams
  - Added Interface DnsResolverPolicyVirtualNetworkLinksListOptionalParams
  - Added Interface DnsResolverPolicyVirtualNetworkLinksUpdateHeaders
  - Added Interface DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams
  - Added Interface DnsSecurityRule
  - Added Interface DnsSecurityRuleAction
  - Added Interface DnsSecurityRuleListResult
  - Added Interface DnsSecurityRulePatch
  - Added Interface DnsSecurityRulesCreateOrUpdateOptionalParams
  - Added Interface DnsSecurityRulesDeleteHeaders
  - Added Interface DnsSecurityRulesDeleteOptionalParams
  - Added Interface DnsSecurityRulesGetOptionalParams
  - Added Interface DnsSecurityRulesListNextOptionalParams
  - Added Interface DnsSecurityRulesListOptionalParams
  - Added Interface DnsSecurityRulesUpdateHeaders
  - Added Interface DnsSecurityRulesUpdateOptionalParams
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Type Alias ActionType
  - Added Type Alias BlockResponseCode
  - Added Type Alias DnsResolverDomainListsCreateOrUpdateResponse
  - Added Type Alias DnsResolverDomainListsDeleteResponse
  - Added Type Alias DnsResolverDomainListsGetResponse
  - Added Type Alias DnsResolverDomainListsListByResourceGroupNextResponse
  - Added Type Alias DnsResolverDomainListsListByResourceGroupResponse
  - Added Type Alias DnsResolverDomainListsListNextResponse
  - Added Type Alias DnsResolverDomainListsListResponse
  - Added Type Alias DnsResolverDomainListsUpdateResponse
  - Added Type Alias DnsResolverPoliciesCreateOrUpdateResponse
  - Added Type Alias DnsResolverPoliciesDeleteResponse
  - Added Type Alias DnsResolverPoliciesGetResponse
  - Added Type Alias DnsResolverPoliciesListByResourceGroupNextResponse
  - Added Type Alias DnsResolverPoliciesListByResourceGroupResponse
  - Added Type Alias DnsResolverPoliciesListByVirtualNetworkNextResponse
  - Added Type Alias DnsResolverPoliciesListByVirtualNetworkResponse
  - Added Type Alias DnsResolverPoliciesListNextResponse
  - Added Type Alias DnsResolverPoliciesListResponse
  - Added Type Alias DnsResolverPoliciesUpdateResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksDeleteResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksGetResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksListNextResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksListResponse
  - Added Type Alias DnsResolverPolicyVirtualNetworkLinksUpdateResponse
  - Added Type Alias DnsSecurityRulesCreateOrUpdateResponse
  - Added Type Alias DnsSecurityRulesDeleteResponse
  - Added Type Alias DnsSecurityRulesGetResponse
  - Added Type Alias DnsSecurityRulesListNextResponse
  - Added Type Alias DnsSecurityRulesListResponse
  - Added Type Alias DnsSecurityRuleState
  - Added Type Alias DnsSecurityRulesUpdateResponse
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownActionType
  - Added Enum KnownBlockResponseCode
  - Added Enum KnownDnsSecurityRuleState
  - Interface DnsForwardingRuleset no longer has parameter systemData
  - Interface DnsResolver no longer has parameter systemData
  - Interface ForwardingRule no longer has parameter systemData
  - Interface InboundEndpoint no longer has parameter systemData
  - Interface OutboundEndpoint no longer has parameter systemData
  - Interface VirtualNetworkLink no longer has parameter systemData
    
    
## 1.1.0 (2023-01-09)
    
### Features Added

  - Interface DnsForwardingRulesetsListByResourceGroupNextOptionalParams no longer has parameter top
  - Interface DnsForwardingRulesetsListByVirtualNetworkNextOptionalParams no longer has parameter top
  - Interface DnsForwardingRulesetsListNextOptionalParams no longer has parameter top
  - Interface DnsResolversListByResourceGroupNextOptionalParams no longer has parameter top
  - Interface DnsResolversListByVirtualNetworkNextOptionalParams no longer has parameter top
  - Interface DnsResolversListNextOptionalParams no longer has parameter top
  - Interface ForwardingRulesListNextOptionalParams no longer has parameter top
  - Interface InboundEndpointsListNextOptionalParams no longer has parameter top
  - Interface OutboundEndpointsListNextOptionalParams no longer has parameter top
  - Interface VirtualNetworkLinksListNextOptionalParams no longer has parameter top
    
    
## 1.0.0 (2022-07-06)

The package of @azure/arm-dnsresolver is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
