# Release History

## 28.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 28.0.0 (2022-05-18)
    
**Features**

  - Added operation group ConfigurationPolicyGroups
  - Added operation group ExpressRoutePortAuthorizations
  - Added operation FirewallPolicies.updateTags
  - Added Interface ConfigurationPolicyGroupsCreateOrUpdateOptionalParams
  - Added Interface ConfigurationPolicyGroupsDeleteOptionalParams
  - Added Interface ConfigurationPolicyGroupsGetOptionalParams
  - Added Interface ConfigurationPolicyGroupsListByVpnServerConfigurationNextOptionalParams
  - Added Interface ConfigurationPolicyGroupsListByVpnServerConfigurationOptionalParams
  - Added Interface ExpressRoutePortAuthorizationListResult
  - Added Interface ExpressRoutePortAuthorizationsCreateOrUpdateOptionalParams
  - Added Interface ExpressRoutePortAuthorizationsDeleteOptionalParams
  - Added Interface ExpressRoutePortAuthorizationsGetOptionalParams
  - Added Interface ExpressRoutePortAuthorizationsListNextOptionalParams
  - Added Interface ExpressRoutePortAuthorizationsListOptionalParams
  - Added Interface FirewallPoliciesUpdateTagsOptionalParams
  - Added Interface GatewayCustomBgpIpAddressIpConfiguration
  - Added Interface ListVpnServerConfigurationPolicyGroupsResult
  - Added Interface VpnServerConfigurationPolicyGroupMember
  - Added Type Alias ApplicationGatewayBackendSettings
  - Added Type Alias ApplicationGatewayListener
  - Added Type Alias ApplicationGatewayRoutingRule
  - Added Type Alias ConfigurationPolicyGroupsCreateOrUpdateResponse
  - Added Type Alias ConfigurationPolicyGroupsGetResponse
  - Added Type Alias ConfigurationPolicyGroupsListByVpnServerConfigurationNextResponse
  - Added Type Alias ConfigurationPolicyGroupsListByVpnServerConfigurationResponse
  - Added Type Alias ExpressRoutePortAuthorization
  - Added Type Alias ExpressRoutePortAuthorizationsCreateOrUpdateResponse
  - Added Type Alias ExpressRoutePortAuthorizationsGetResponse
  - Added Type Alias ExpressRoutePortAuthorizationsListNextResponse
  - Added Type Alias ExpressRoutePortAuthorizationsListResponse
  - Added Type Alias ExpressRoutePortAuthorizationUseStatus
  - Added Type Alias FirewallPoliciesUpdateTagsResponse
  - Added Type Alias FirewallPolicyIdpsQuerySortOrder
  - Added Type Alias FirewallPolicyIdpsSignatureDirection
  - Added Type Alias FirewallPolicyIdpsSignatureMode
  - Added Type Alias FirewallPolicyIdpsSignatureSeverity
  - Added Type Alias HubRoutingPreference
  - Added Type Alias LoadBalancerBackendAddressAdminState
  - Added Type Alias NetworkInterfaceAuxiliaryMode
  - Added Type Alias VpnPolicyMemberAttributeType
  - Added Type Alias VpnServerConfigurationPolicyGroup
  - Interface FirewallPolicyIntrusionDetectionConfiguration has a new optional parameter privateRanges
  - Interface LoadBalancerBackendAddress has a new optional parameter adminState
  - Interface NetworkManagementClientOptionalParams has a new optional parameter apiVersion
  - Class NetworkManagementClient has a new parameter apiVersion
  - Class NetworkManagementClient has a new parameter configurationPolicyGroups
  - Class NetworkManagementClient has a new parameter expressRoutePortAuthorizations
  - Type Alias ApplicationGateway has a new parameter backendSettingsCollection
  - Type Alias ApplicationGateway has a new parameter listeners
  - Type Alias ApplicationGateway has a new parameter routingRules
  - Type Alias ApplicationGatewayProbe has a new parameter pickHostNameFromBackendSettings
  - Type Alias BackendAddressPool has a new parameter drainPeriodInSeconds
  - Type Alias ExpressRouteCircuit has a new parameter authorizationKey
  - Type Alias NetworkInterface has a new parameter auxiliaryMode
  - Type Alias P2SConnectionConfiguration has a new parameter configurationPolicyGroupAssociations
  - Type Alias P2SConnectionConfiguration has a new parameter previousConfigurationPolicyGroupAssociations
  - Type Alias VirtualHub has a new parameter hubRoutingPreference
  - Type Alias VirtualNetworkGatewayConnection has a new parameter gatewayCustomBgpIpAddresses
  - Type Alias VirtualNetworkGatewayConnectionListEntity has a new parameter gatewayCustomBgpIpAddresses
  - Type Alias VpnServerConfiguration has a new parameter configurationPolicyGroups
  - Type Alias VpnSiteLinkConnection has a new parameter vpnGatewayCustomBgpAddresses
  - Added Enum KnownExpressRoutePortAuthorizationUseStatus
  - Added Enum KnownFirewallPolicyIdpsQuerySortOrder
  - Added Enum KnownHubRoutingPreference
  - Added Enum KnownLoadBalancerBackendAddressAdminState
  - Added Enum KnownNetworkInterfaceAuxiliaryMode
  - Added Enum KnownVpnPolicyMemberAttributeType
  - Enum KnownApplicationGatewayProtocol has a new value Tcp
  - Enum KnownApplicationGatewayProtocol has a new value Tls

**Breaking Changes**

  - Removed Enum KnownOrderByOrder
  - Removed Enum KnownSingleQueryResultDirection
  - Removed Enum KnownSingleQueryResultMode
  - Removed Enum KnownSingleQueryResultSeverity
    
    
## 27.0.0 (2022-04-27)
    
**Features**

  - Added Type Alias SingleQueryResultDirection
  - Added Type Alias SingleQueryResultMode
  - Added Type Alias SingleQueryResultSeverity
  - Added Enum KnownSingleQueryResultDirection
  - Added Enum KnownSingleQueryResultMode
  - Added Enum KnownSingleQueryResultSeverity

**Breaking Changes**

  - Removed Enum KnownEnum69
  - Removed Enum KnownEnum70
  - Removed Enum KnownEnum71
    
    
## 26.0.0 (2021-12-06)

The package of @azure/arm-network is using our next generation design principles since version 26.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
