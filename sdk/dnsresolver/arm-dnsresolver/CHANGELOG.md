# Release History

## 2.0.0-beta.3 (2026-06-24)
Compared with version 1.2.0

### Features Added
  - Added operation DnsForwardingRulesetsOperations.createOrUpdate
  - Added operation DnsForwardingRulesetsOperations.delete
  - Added operation DnsForwardingRulesetsOperations.update
  - Added operation DnsResolverDomainListsOperations.bulk
  - Added operation DnsResolverDomainListsOperations.createOrUpdate
  - Added operation DnsResolverDomainListsOperations.delete
  - Added operation DnsResolverDomainListsOperations.update
  - Added operation DnsResolverPoliciesOperations.createOrUpdate
  - Added operation DnsResolverPoliciesOperations.delete
  - Added operation DnsResolverPoliciesOperations.update
  - Added operation DnsResolverPolicyVirtualNetworkLinksOperations.createOrUpdate
  - Added operation DnsResolverPolicyVirtualNetworkLinksOperations.delete
  - Added operation DnsResolverPolicyVirtualNetworkLinksOperations.update
  - Added operation DnsResolversOperations.createOrUpdate
  - Added operation DnsResolversOperations.delete
  - Added operation DnsResolversOperations.update
  - Added operation DnsSecurityRulesOperations.createOrUpdate
  - Added operation DnsSecurityRulesOperations.delete
  - Added operation DnsSecurityRulesOperations.update
  - Added operation InboundEndpointsOperations.createOrUpdate
  - Added operation InboundEndpointsOperations.delete
  - Added operation InboundEndpointsOperations.update
  - Added operation OutboundEndpointsOperations.createOrUpdate
  - Added operation OutboundEndpointsOperations.delete
  - Added operation OutboundEndpointsOperations.update
  - Added operation VirtualNetworkLinksOperations.createOrUpdate
  - Added operation VirtualNetworkLinksOperations.delete
  - Added operation VirtualNetworkLinksOperations.update
  - Added Interface DnsForwardingRulesetProperties
  - Added Interface DnsResolverDomainListBulkProperties
  - Added Interface DnsResolverDomainListPatchProperties
  - Added Interface DnsResolverDomainListProperties
  - Added Interface DnsResolverPolicyProperties
  - Added Interface DnsResolverPolicyVirtualNetworkLinkProperties
  - Added Interface DnsResolverProperties
  - Added Interface DnsSecurityRulePatchProperties
  - Added Interface DnsSecurityRuleProperties
  - Added Interface ForwardingRulePatchProperties
  - Added Interface ForwardingRuleProperties
  - Added Interface InboundEndpointProperties
  - Added Interface OutboundEndpointProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface VirtualNetworkLinkPatchProperties
  - Added Interface VirtualNetworkLinkProperties
  - Added Interface VirtualNetworkLinkSubResourceProperties
  - Interface DnsSecurityRule has a new optional parameter managedDomainLists
  - Interface DnsSecurityRulePatch has a new optional parameter managedDomainLists
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ManagedDomainList
  - Added Enum AzureClouds
  - Added Enum KnownManagedDomainList
  - Added Enum KnownVersions

### Breaking Changes
  - Operation DnsResolverDomainLists.beginDeleteAndWait has a new signature
  - Operation DnsResolverPolicies.beginDeleteAndWait has a new signature
  - Operation DnsResolverPolicyVirtualNetworkLinks.beginDeleteAndWait has a new signature
  - Operation DnsSecurityRules.beginCreateOrUpdate has a new signature
  - Operation DnsSecurityRules.beginCreateOrUpdateAndWait has a new signature
  - Operation DnsSecurityRules.beginDeleteAndWait has a new signature
  - Operation DnsSecurityRules.beginUpdateAndWait has a new signature
  - Operation DnsSecurityRules.get has a new signature
  - Class DnsResolverManagementClient no longer has parameter apiVersion
  - Class DnsResolverManagementClient no longer has parameter subscriptionId
  - Parameter dnsResolverDomainLists of interface DnsSecurityRule is now optional

