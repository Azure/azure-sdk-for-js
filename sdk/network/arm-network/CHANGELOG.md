# Release History
    
## 33.1.0 (2024-02-02)
    
**Features**

  - Interface BastionHost has a new optional parameter zones
  - Enum KnownVirtualNetworkPrivateEndpointNetworkPolicies has a new value NetworkSecurityGroupEnabled
  - Enum KnownVirtualNetworkPrivateEndpointNetworkPolicies has a new value RouteTableEnabled
    
    
## 33.0.0 (2023-12-07)
    
**Features**

  - Added Interface BastionShareableLinkTokenListRequest
  - Added Interface DdosCustomPoliciesDeleteHeaders
  - Added Interface DeleteBastionShareableLinkByTokenOptionalParams
  - Added Interface InternetIngressPublicIpsProperties
  - Added Interface NetworkManagementClientDeleteBastionShareableLinkByTokenHeaders
  - Added Type Alias DeleteBastionShareableLinkByTokenResponse
  - Added Type Alias FirewallPolicyIntrusionDetectionProfileType
  - Interface ApplicationGatewayListener has a new optional parameter hostNames
  - Interface FirewallPolicyIntrusionDetection has a new optional parameter profile
  - Interface NetworkVirtualAppliance has a new optional parameter internetIngressPublicIps
  - Added Enum KnownFirewallPolicyIntrusionDetectionProfileType
  - Enum KnownActionType has a new value JSChallenge
  - Enum KnownBastionHostSkuName has a new value Developer
  - Enum KnownVirtualNetworkGatewaySkuName has a new value ErGwScale
  - Enum KnownVirtualNetworkGatewaySkuTier has a new value ErGwScale
  - Enum KnownWebApplicationFirewallAction has a new value JSChallenge

**Breaking Changes**

  - Type of parameter routingConfiguration of interface NetworkVirtualApplianceConnection is changed from RoutingConfigurationNfv to RoutingConfiguration
    
    
## 32.2.0 (2023-09-07)
    
**Features**

  - Added Interface BastionHostPropertiesFormatNetworkAcls
  - Added Interface IPRule
  - Added Interface VirtualNetworkGatewayAutoScaleBounds
  - Added Interface VirtualNetworkGatewayAutoScaleConfiguration
  - Interface BastionHost has a new optional parameter networkAcls
  - Interface BastionHost has a new optional parameter virtualNetwork
  - Interface FirewallPolicy has a new optional parameter size
  - Interface FirewallPolicyRuleCollectionGroup has a new optional parameter size
  - Interface Subnet has a new optional parameter defaultOutboundAccess
  - Interface VirtualNetworkGateway has a new optional parameter autoScaleConfiguration
    
    
## 32.1.0 (2023-08-08)
    
**Features**

  - Added operation LoadBalancers.migrateToIpBased
  - Added Interface LoadBalancersMigrateToIpBasedOptionalParams
  - Added Interface MigratedPools
  - Added Interface MigrateLoadBalancerToIpBasedRequest
  - Added Type Alias LoadBalancersMigrateToIpBasedResponse
  - Added Type Alias SyncMode
  - Interface BackendAddressPool has a new optional parameter syncMode
  - Added Enum KnownSyncMode
  - Enum KnownApplicationGatewaySkuName has a new value Basic
  - Enum KnownApplicationGatewayTier has a new value Basic
    
    
## 32.0.0 (2023-07-06)
    
**Features**

  - Added Type Alias AdminState
  - Interface ActiveDefaultSecurityAdminRule has a new optional parameter resourceGuid
  - Interface ActiveSecurityAdminRule has a new optional parameter resourceGuid
  - Interface AdminRule has a new optional parameter resourceGuid
  - Interface AdminRuleCollection has a new optional parameter resourceGuid
  - Interface ApplicationGateway has a new optional parameter defaultPredefinedSslPolicy
  - Interface ConfigurationGroup has a new optional parameter resourceGuid
  - Interface ConnectivityConfiguration has a new optional parameter resourceGuid
  - Interface DefaultAdminRule has a new optional parameter resourceGuid
  - Interface EffectiveConnectivityConfiguration has a new optional parameter resourceGuid
  - Interface EffectiveDefaultSecurityAdminRule has a new optional parameter resourceGuid
  - Interface EffectiveSecurityAdminRule has a new optional parameter resourceGuid
  - Interface NetworkGroup has a new optional parameter resourceGuid
  - Interface NetworkManager has a new optional parameter resourceGuid
  - Interface SecurityAdminConfiguration has a new optional parameter resourceGuid
  - Interface VirtualNetworkGateway has a new optional parameter adminState
  - Added Enum KnownAdminState
  - Class NetworkManagementClient has a new signature

**Breaking Changes**

  - Enum KnownApplicationGatewayCustomErrorStatusCode no longer has value HttpStatus499
    
    
## 31.0.0 (2023-05-19)
    
**Features**

  - Added operation group NetworkVirtualApplianceConnections
  - Added operation AzureFirewalls.beginPacketCapture
  - Added operation AzureFirewalls.beginPacketCaptureAndWait
  - Added Interface AzureFirewallPacketCaptureFlags
  - Added Interface AzureFirewallPacketCaptureRule
  - Added Interface AzureFirewallsPacketCaptureHeaders
  - Added Interface AzureFirewallsPacketCaptureOptionalParams
  - Added Interface EffectiveRouteMapRouteList
  - Added Interface FirewallPacketCaptureParameters
  - Added Interface FirewallPolicyHttpHeaderToInsert
  - Added Interface GroupByUserSession
  - Added Interface GroupByVariable
  - Added Interface NetworkVirtualApplianceConnection
  - Added Interface NetworkVirtualApplianceConnectionList
  - Added Interface NetworkVirtualApplianceConnectionsCreateOrUpdateOptionalParams
  - Added Interface NetworkVirtualApplianceConnectionsDeleteHeaders
  - Added Interface NetworkVirtualApplianceConnectionsDeleteOptionalParams
  - Added Interface NetworkVirtualApplianceConnectionsGetOptionalParams
  - Added Interface NetworkVirtualApplianceConnectionsListNextOptionalParams
  - Added Interface NetworkVirtualApplianceConnectionsListOptionalParams
  - Added Interface NetworkVirtualAppliancesCreateOrUpdateHeaders
  - Added Interface NetworkVirtualAppliancesDeleteHeaders
  - Added Interface PolicySettingsLogScrubbing
  - Added Interface PropagatedRouteTableNfv
  - Added Interface RoutingConfigurationNfv
  - Added Interface RoutingConfigurationNfvSubResource
  - Added Interface VirtualApplianceAdditionalNicProperties
  - Added Interface WebApplicationFirewallScrubbingRules
  - Added Type Alias ApplicationGatewayFirewallRateLimitDuration
  - Added Type Alias ApplicationGatewayFirewallUserSessionVariable
  - Added Type Alias AzureFirewallPacketCaptureFlagsType
  - Added Type Alias AzureFirewallsPacketCaptureResponse
  - Added Type Alias NetworkInterfaceAuxiliarySku
  - Added Type Alias NetworkVirtualApplianceConnectionsCreateOrUpdateResponse
  - Added Type Alias NetworkVirtualApplianceConnectionsGetResponse
  - Added Type Alias NetworkVirtualApplianceConnectionsListNextResponse
  - Added Type Alias NetworkVirtualApplianceConnectionsListResponse
  - Added Type Alias PublicIpAddressDnsSettingsDomainNameLabelScope
  - Added Type Alias ScrubbingRuleEntryMatchOperator
  - Added Type Alias ScrubbingRuleEntryMatchVariable
  - Added Type Alias ScrubbingRuleEntryState
  - Added Type Alias VirtualHubsGetEffectiveVirtualHubRoutesResponse
  - Added Type Alias VirtualHubsGetInboundRoutesResponse
  - Added Type Alias VirtualHubsGetOutboundRoutesResponse
  - Added Type Alias WebApplicationFirewallScrubbingState
  - Interface ApplicationRule has a new optional parameter httpHeadersToInsert
  - Interface BastionHost has a new optional parameter enableKerberos
  - Interface DdosProtectionPlan has a new optional parameter publicIPAddresses
  - Interface NetworkInterface has a new optional parameter auxiliarySku
  - Interface NetworkVirtualAppliance has a new optional parameter additionalNics
  - Interface NetworkVirtualAppliance has a new optional parameter virtualApplianceConnections
  - Interface PolicySettings has a new optional parameter fileUploadEnforcement
  - Interface PolicySettings has a new optional parameter logScrubbing
  - Interface PolicySettings has a new optional parameter requestBodyEnforcement
  - Interface PolicySettings has a new optional parameter requestBodyInspectLimitInKB
  - Interface PrivateEndpointConnection has a new optional parameter privateEndpointLocation
  - Interface PublicIPAddressDnsSettings has a new optional parameter domainNameLabelScope
  - Interface Subnet has a new optional parameter applicationGatewayIPConfigurations
  - Interface VirtualApplianceNicProperties has a new optional parameter instanceName
  - Interface WebApplicationFirewallCustomRule has a new optional parameter groupByUserSession
  - Interface WebApplicationFirewallCustomRule has a new optional parameter rateLimitDuration
  - Interface WebApplicationFirewallCustomRule has a new optional parameter rateLimitThreshold
  - Added Enum KnownApplicationGatewayFirewallRateLimitDuration
  - Added Enum KnownApplicationGatewayFirewallUserSessionVariable
  - Added Enum KnownAzureFirewallPacketCaptureFlagsType
  - Added Enum KnownNetworkInterfaceAuxiliarySku
  - Added Enum KnownScrubbingRuleEntryMatchOperator
  - Added Enum KnownScrubbingRuleEntryMatchVariable
  - Added Enum KnownScrubbingRuleEntryState
  - Added Enum KnownWebApplicationFirewallScrubbingState
  - Enum KnownNetworkInterfaceAuxiliaryMode has a new value AcceleratedConnections
  - Enum KnownWebApplicationFirewallRuleType has a new value RateLimitRule

**Breaking Changes**

  - Interface DdosProtectionPlan no longer has parameter publicIpAddresses
  - Interface Subnet no longer has parameter applicationGatewayIpConfigurations
  - Type of parameter prefix of interface EffectiveRouteMapRoute is changed from string[] to string
  - Enum KnownLoadBalancerBackendAddressAdminState no longer has value Drain
    
    
## 30.2.0 (2023-03-07)
    
**Features**

  - Added Type Alias WebApplicationFirewallState
  - Interface ExpressRouteCircuit has a new optional parameter authorizationStatus
  - Interface VirtualNetwork has a new optional parameter flowLogs
  - Interface VpnGatewaysResetOptionalParams has a new optional parameter ipConfigurationId
  - Interface WebApplicationFirewallCustomRule has a new optional parameter state
  - Added Enum KnownWebApplicationFirewallState
  - Enum KnownApplicationGatewayCustomErrorStatusCode has a new value HttpStatus400
  - Enum KnownApplicationGatewayCustomErrorStatusCode has a new value HttpStatus404
  - Enum KnownApplicationGatewayCustomErrorStatusCode has a new value HttpStatus405
  - Enum KnownApplicationGatewayCustomErrorStatusCode has a new value HttpStatus408
  - Enum KnownApplicationGatewayCustomErrorStatusCode has a new value HttpStatus499
  - Enum KnownApplicationGatewayCustomErrorStatusCode has a new value HttpStatus500
  - Enum KnownApplicationGatewayCustomErrorStatusCode has a new value HttpStatus503
  - Enum KnownApplicationGatewayCustomErrorStatusCode has a new value HttpStatus504
  - Interface AdminRuleCollectionsListNextOptionalParams no longer has parameter skipToken
  - Interface AdminRuleCollectionsListNextOptionalParams no longer has parameter top
  - Interface AdminRulesListNextOptionalParams no longer has parameter skipToken
  - Interface AdminRulesListNextOptionalParams no longer has parameter top
  - Interface ConnectivityConfigurationsListNextOptionalParams no longer has parameter skipToken
  - Interface ConnectivityConfigurationsListNextOptionalParams no longer has parameter top
  - Interface ManagementGroupNetworkManagerConnectionsListNextOptionalParams no longer has parameter skipToken
  - Interface ManagementGroupNetworkManagerConnectionsListNextOptionalParams no longer has parameter top
  - Interface NetworkGroupsListNextOptionalParams no longer has parameter skipToken
  - Interface NetworkGroupsListNextOptionalParams no longer has parameter top
  - Interface NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsNextOptionalParams no longer has parameter expand
  - Interface NetworkManagersListBySubscriptionNextOptionalParams no longer has parameter skipToken
  - Interface NetworkManagersListBySubscriptionNextOptionalParams no longer has parameter top
  - Interface NetworkManagersListNextOptionalParams no longer has parameter skipToken
  - Interface NetworkManagersListNextOptionalParams no longer has parameter top
  - Interface ScopeConnectionsListNextOptionalParams no longer has parameter skipToken
  - Interface ScopeConnectionsListNextOptionalParams no longer has parameter top
  - Interface SecurityAdminConfigurationsListNextOptionalParams no longer has parameter skipToken
  - Interface SecurityAdminConfigurationsListNextOptionalParams no longer has parameter top
  - Interface ServiceTagInformationListNextOptionalParams no longer has parameter noAddressPrefixes
  - Interface ServiceTagInformationListNextOptionalParams no longer has parameter tagName
  - Interface StaticMembersListNextOptionalParams no longer has parameter skipToken
  - Interface StaticMembersListNextOptionalParams no longer has parameter top
  - Interface SubscriptionNetworkManagerConnectionsListNextOptionalParams no longer has parameter skipToken
  - Interface SubscriptionNetworkManagerConnectionsListNextOptionalParams no longer has parameter top
  - Interface VirtualNetworksListDdosProtectionStatusNextOptionalParams no longer has parameter skipToken
  - Interface VirtualNetworksListDdosProtectionStatusNextOptionalParams no longer has parameter top
    
    
## 30.1.0 (2022-12-13)
    
**Features**

  - Added Interface DdosProtectionPlansDeleteHeaders
  - Added Interface DelegationProperties
  - Added Interface PartnerManagedResourceProperties
  - Added Interface PublicIPAddressesDdosProtectionStatusHeaders
  - Added Interface PublicIPAddressesDeleteHeaders
  - Interface BackendAddressPool has a new optional parameter virtualNetwork
  - Interface NetworkVirtualAppliance has a new optional parameter delegation
  - Interface NetworkVirtualAppliance has a new optional parameter deploymentType
  - Interface NetworkVirtualAppliance has a new optional parameter partnerManagedResource
  - Interface PolicySettings has a new optional parameter customBlockResponseBody
  - Interface PolicySettings has a new optional parameter customBlockResponseStatusCode
  - Added function getContinuationToken
    
    
## 30.0.0 (2022-09-29)
    
**Features**

  - Added operation group ApplicationGatewayWafDynamicManifests
  - Added operation group ApplicationGatewayWafDynamicManifestsDefault
  - Added operation group RouteMaps
  - Added operation group VipSwap
  - Added operation PublicIPAddresses.beginDdosProtectionStatus
  - Added operation PublicIPAddresses.beginDdosProtectionStatusAndWait
  - Added operation VirtualHubs.beginGetInboundRoutes
  - Added operation VirtualHubs.beginGetInboundRoutesAndWait
  - Added operation VirtualHubs.beginGetOutboundRoutes
  - Added operation VirtualHubs.beginGetOutboundRoutesAndWait
  - Added operation VirtualNetworks.beginListDdosProtectionStatusAndWait
  - Added Interface Action
  - Added Interface ApplicationGatewayFirewallManifestRuleSet
  - Added Interface ApplicationGatewayWafDynamicManifestResult
  - Added Interface ApplicationGatewayWafDynamicManifestResultList
  - Added Interface ApplicationGatewayWafDynamicManifestsDefaultGetOptionalParams
  - Added Interface ApplicationGatewayWafDynamicManifestsGetNextOptionalParams
  - Added Interface ApplicationGatewayWafDynamicManifestsGetOptionalParams
  - Added Interface Criterion
  - Added Interface EffectiveRouteMapRoute
  - Added Interface GetInboundRoutesParameters
  - Added Interface GetOutboundRoutesParameters
  - Added Interface ListRouteMapsResult
  - Added Interface Parameter
  - Added Interface PublicIPAddressesDdosProtectionStatusOptionalParams
  - Added Interface PublicIpDdosProtectionStatusResult
  - Added Interface RouteMap
  - Added Interface RouteMapRule
  - Added Interface RouteMapsCreateOrUpdateOptionalParams
  - Added Interface RouteMapsDeleteOptionalParams
  - Added Interface RouteMapsGetOptionalParams
  - Added Interface RouteMapsListNextOptionalParams
  - Added Interface RouteMapsListOptionalParams
  - Added Interface StaticRoutesConfig
  - Added Interface SwapResource
  - Added Interface SwapResourceListResult
  - Added Interface SwapResourceProperties
  - Added Interface VipSwapCreateOptionalParams
  - Added Interface VipSwapGetOptionalParams
  - Added Interface VipSwapListOptionalParams
  - Added Interface VirtualHubsGetInboundRoutesOptionalParams
  - Added Interface VirtualHubsGetOutboundRoutesOptionalParams
  - Added Interface VirtualNetworkDdosProtectionStatusResult
  - Added Interface VirtualNetworkGatewayPolicyGroup
  - Added Interface VirtualNetworkGatewayPolicyGroupMember
  - Added Interface VirtualNetworksListDdosProtectionStatusNextOptionalParams
  - Added Interface VirtualNetworksListDdosProtectionStatusOptionalParams
  - Added Interface VngClientConnectionConfiguration
  - Added Type Alias ActionType
  - Added Type Alias ApplicationGatewayClientRevocationOptions
  - Added Type Alias ApplicationGatewayRuleSetStatusOptions
  - Added Type Alias ApplicationGatewayTierTypes
  - Added Type Alias ApplicationGatewayWafDynamicManifestsDefaultGetResponse
  - Added Type Alias ApplicationGatewayWafDynamicManifestsGetNextResponse
  - Added Type Alias ApplicationGatewayWafDynamicManifestsGetResponse
  - Added Type Alias ApplicationGatewayWafRuleActionTypes
  - Added Type Alias ApplicationGatewayWafRuleStateTypes
  - Added Type Alias CustomIpPrefixType
  - Added Type Alias DdosSettingsProtectionMode
  - Added Type Alias ExpressRoutePortsBillingType
  - Added Type Alias Geo
  - Added Type Alias IsWorkloadProtected
  - Added Type Alias NextStep
  - Added Type Alias PublicIPAddressesDdosProtectionStatusResponse
  - Added Type Alias RouteMapActionType
  - Added Type Alias RouteMapMatchCondition
  - Added Type Alias RouteMapsCreateOrUpdateResponse
  - Added Type Alias RouteMapsGetResponse
  - Added Type Alias RouteMapsListNextResponse
  - Added Type Alias RouteMapsListResponse
  - Added Type Alias SlotType
  - Added Type Alias VipSwapGetResponse
  - Added Type Alias VipSwapListResponse
  - Added Type Alias VirtualNetworksListDdosProtectionStatusNextResponse
  - Added Type Alias VirtualNetworksListDdosProtectionStatusResponse
  - Added Type Alias VnetLocalRouteOverrideCriteria
  - Interface ApplicationGatewayClientAuthConfiguration has a new optional parameter verifyClientRevocation
  - Interface ApplicationGatewayFirewallRule has a new optional parameter action
  - Interface ApplicationGatewayFirewallRule has a new optional parameter ruleIdString
  - Interface ApplicationGatewayFirewallRule has a new optional parameter state
  - Interface ApplicationGatewayFirewallRuleSet has a new optional parameter tiers
  - Interface CustomIpPrefix has a new optional parameter asn
  - Interface CustomIpPrefix has a new optional parameter expressRouteAdvertise
  - Interface CustomIpPrefix has a new optional parameter geo
  - Interface CustomIpPrefix has a new optional parameter prefixType
  - Interface DdosProtectionPlan has a new optional parameter publicIpAddresses
  - Interface DdosSettings has a new optional parameter ddosProtectionPlan
  - Interface DdosSettings has a new optional parameter protectionMode
  - Interface ExpressRouteConnection has a new optional parameter enablePrivateLinkFastPath
  - Interface ExpressRouteGateway has a new optional parameter allowNonVirtualWanTraffic
  - Interface ExpressRouteLink has a new optional parameter coloLocation
  - Interface ExpressRoutePort has a new optional parameter billingType
  - Interface ListActiveConnectivityConfigurationsOptionalParams has a new optional parameter top
  - Interface ListActiveSecurityAdminRulesOptionalParams has a new optional parameter top
  - Interface ListNetworkManagerEffectiveConnectivityConfigurationsOptionalParams has a new optional parameter top
  - Interface ListNetworkManagerEffectiveSecurityAdminRulesOptionalParams has a new optional parameter top
  - Interface ManagedRuleOverride has a new optional parameter action
  - Interface NetworkInterface has a new optional parameter disableTcpStateTracking
  - Interface NetworkManagerDeploymentStatusListOptionalParams has a new optional parameter top
  - Interface Probe has a new optional parameter probeThreshold
  - Interface RoutingConfiguration has a new optional parameter inboundRouteMap
  - Interface RoutingConfiguration has a new optional parameter outboundRouteMap
  - Interface VirtualHub has a new optional parameter routeMaps
  - Interface VirtualNetworkGateway has a new optional parameter allowRemoteVnetTraffic
  - Interface VirtualNetworkGateway has a new optional parameter allowVirtualWanTraffic
  - Interface VirtualNetworkGateway has a new optional parameter virtualNetworkGatewayPolicyGroups
  - Interface VirtualNetworkGatewayConnection has a new optional parameter enablePrivateLinkFastPath
  - Interface VirtualNetworkGatewayConnectionListEntity has a new optional parameter enablePrivateLinkFastPath
  - Interface VnetRoute has a new optional parameter staticRoutesConfig
  - Interface VpnClientConfiguration has a new optional parameter vngClientConnectionConfigurations
  - Class NetworkManagementClient has a new parameter applicationGatewayWafDynamicManifests
  - Class NetworkManagementClient has a new parameter applicationGatewayWafDynamicManifestsDefault
  - Class NetworkManagementClient has a new parameter routeMaps
  - Class NetworkManagementClient has a new parameter vipSwap
  - Added Enum KnownActionType
  - Added Enum KnownApplicationGatewayClientRevocationOptions
  - Added Enum KnownApplicationGatewayRuleSetStatusOptions
  - Added Enum KnownApplicationGatewayTierTypes
  - Added Enum KnownApplicationGatewayWafRuleActionTypes
  - Added Enum KnownApplicationGatewayWafRuleStateTypes
  - Added Enum KnownCustomIpPrefixType
  - Added Enum KnownDdosSettingsProtectionMode
  - Added Enum KnownExpressRoutePortsBillingType
  - Added Enum KnownGeo
  - Added Enum KnownIsWorkloadProtected
  - Added Enum KnownNextStep
  - Added Enum KnownRouteMapActionType
  - Added Enum KnownRouteMapMatchCondition
  - Added Enum KnownVnetLocalRouteOverrideCriteria
  - Enum KnownCommissionedState has a new value Deprovisioned
  - Enum KnownManagedRuleEnabledState has a new value Enabled
  - Enum KnownNetworkIntentPolicyBasedService has a new value AllowRulesOnly
  - Enum KnownWebApplicationFirewallTransform has a new value Uppercase

**Breaking Changes**

  - Interface DdosCustomPolicy no longer has parameter protocolCustomSettings
  - Interface DdosCustomPolicy no longer has parameter publicIPAddresses
  - Interface DdosSettings no longer has parameter ddosCustomPolicy
  - Interface DdosSettings no longer has parameter protectedIP
  - Interface DdosSettings no longer has parameter protectionCoverage
  - Interface AdminRule has a new required parameter kind
  - Interface DefaultAdminRule has a new required parameter kind
  - Removed Enum KnownDdosCustomPolicyProtocol
  - Removed Enum KnownDdosCustomPolicyTriggerSensitivityOverride
  - Removed Enum KnownDdosSettingsProtectionCoverage
    
    
## 29.0.0 (2022-08-02)
    
**Features**

  - Added operation group AdminRuleCollections
  - Added operation group AdminRules
  - Added operation group ConnectivityConfigurations
  - Added operation group ExpressRouteProviderPortsLocation
  - Added operation group ManagementGroupNetworkManagerConnections
  - Added operation group NetworkGroups
  - Added operation group NetworkManagerCommits
  - Added operation group NetworkManagerDeploymentStatusOperations
  - Added operation group NetworkManagers
  - Added operation group ScopeConnections
  - Added operation group SecurityAdminConfigurations
  - Added operation group StaticMembers
  - Added operation group SubscriptionNetworkManagerConnections
  - Added operation AzureFirewalls.beginListLearnedPrefixes
  - Added operation AzureFirewalls.beginListLearnedPrefixesAndWait
  - Added Interface ActiveBaseSecurityAdminRule
  - Added Interface ActiveConfigurationParameter
  - Added Interface ActiveConnectivityConfiguration
  - Added Interface ActiveConnectivityConfigurationsListResult
  - Added Interface ActiveDefaultSecurityAdminRule
  - Added Interface ActiveSecurityAdminRule
  - Added Interface ActiveSecurityAdminRulesListResult
  - Added Interface AddressPrefixItem
  - Added Interface AdminRule
  - Added Interface AdminRuleCollection
  - Added Interface AdminRuleCollectionListResult
  - Added Interface AdminRuleCollectionsCreateOrUpdateOptionalParams
  - Added Interface AdminRuleCollectionsDeleteHeaders
  - Added Interface AdminRuleCollectionsDeleteOptionalParams
  - Added Interface AdminRuleCollectionsGetOptionalParams
  - Added Interface AdminRuleCollectionsListNextOptionalParams
  - Added Interface AdminRuleCollectionsListOptionalParams
  - Added Interface AdminRuleListResult
  - Added Interface AdminRulesCreateOrUpdateOptionalParams
  - Added Interface AdminRulesDeleteHeaders
  - Added Interface AdminRulesDeleteOptionalParams
  - Added Interface AdminRulesGetOptionalParams
  - Added Interface AdminRulesListNextOptionalParams
  - Added Interface AdminRulesListOptionalParams
  - Added Interface ApplicationGateway
  - Added Interface ApplicationGatewayAuthenticationCertificate
  - Added Interface ApplicationGatewayAvailableSslOptions
  - Added Interface ApplicationGatewayBackendAddressPool
  - Added Interface ApplicationGatewayBackendHttpSettings
  - Added Interface ApplicationGatewayBackendSettings
  - Added Interface ApplicationGatewayFirewallRuleSet
  - Added Interface ApplicationGatewayFrontendIPConfiguration
  - Added Interface ApplicationGatewayFrontendPort
  - Added Interface ApplicationGatewayHttpListener
  - Added Interface ApplicationGatewayIPConfiguration
  - Added Interface ApplicationGatewayListener
  - Added Interface ApplicationGatewayLoadDistributionPolicy
  - Added Interface ApplicationGatewayLoadDistributionTarget
  - Added Interface ApplicationGatewayPathRule
  - Added Interface ApplicationGatewayPrivateEndpointConnection
  - Added Interface ApplicationGatewayPrivateLinkConfiguration
  - Added Interface ApplicationGatewayPrivateLinkIpConfiguration
  - Added Interface ApplicationGatewayPrivateLinkResource
  - Added Interface ApplicationGatewayProbe
  - Added Interface ApplicationGatewayRedirectConfiguration
  - Added Interface ApplicationGatewayRequestRoutingRule
  - Added Interface ApplicationGatewayRewriteRuleSet
  - Added Interface ApplicationGatewayRoutingRule
  - Added Interface ApplicationGatewaySslCertificate
  - Added Interface ApplicationGatewaySslPredefinedPolicy
  - Added Interface ApplicationGatewaySslProfile
  - Added Interface ApplicationGatewayTrustedClientCertificate
  - Added Interface ApplicationGatewayTrustedRootCertificate
  - Added Interface ApplicationGatewayUrlPathMap
  - Added Interface ApplicationRule
  - Added Interface ApplicationSecurityGroup
  - Added Interface AzureFirewall
  - Added Interface AzureFirewallApplicationRuleCollection
  - Added Interface AzureFirewallFqdnTag
  - Added Interface AzureFirewallIPConfiguration
  - Added Interface AzureFirewallNatRuleCollection
  - Added Interface AzureFirewallNetworkRuleCollection
  - Added Interface AzureFirewallsListLearnedPrefixesOptionalParams
  - Added Interface BackendAddressPool
  - Added Interface BaseAdminRule
  - Added Interface BastionHost
  - Added Interface BastionHostIPConfiguration
  - Added Interface BgpConnection
  - Added Interface BgpServiceCommunity
  - Added Interface ChildResource
  - Added Interface ConfigurationGroup
  - Added Interface ConnectionMonitorResultProperties
  - Added Interface ConnectionSharedKey
  - Added Interface ConnectivityConfiguration
  - Added Interface ConnectivityConfigurationListResult
  - Added Interface ConnectivityConfigurationsCreateOrUpdateOptionalParams
  - Added Interface ConnectivityConfigurationsDeleteHeaders
  - Added Interface ConnectivityConfigurationsDeleteOptionalParams
  - Added Interface ConnectivityConfigurationsGetOptionalParams
  - Added Interface ConnectivityConfigurationsListNextOptionalParams
  - Added Interface ConnectivityConfigurationsListOptionalParams
  - Added Interface ConnectivityGroupItem
  - Added Interface Container
  - Added Interface ContainerNetworkInterface
  - Added Interface ContainerNetworkInterfaceConfiguration
  - Added Interface CrossTenantScopes
  - Added Interface CustomIpPrefix
  - Added Interface DdosCustomPolicy
  - Added Interface DefaultAdminRule
  - Added Interface Delegation
  - Added Interface DscpConfiguration
  - Added Interface EffectiveBaseSecurityAdminRule
  - Added Interface EffectiveConnectivityConfiguration
  - Added Interface EffectiveDefaultSecurityAdminRule
  - Added Interface EffectiveSecurityAdminRule
  - Added Interface EndpointServiceResult
  - Added Interface ExplicitProxy
  - Added Interface ExpressRouteCircuit
  - Added Interface ExpressRouteCircuitAuthorization
  - Added Interface ExpressRouteCircuitConnection
  - Added Interface ExpressRouteCircuitPeering
  - Added Interface ExpressRouteConnection
  - Added Interface ExpressRouteCrossConnection
  - Added Interface ExpressRouteCrossConnectionPeering
  - Added Interface ExpressRouteGateway
  - Added Interface ExpressRouteLink
  - Added Interface ExpressRoutePort
  - Added Interface ExpressRoutePortAuthorization
  - Added Interface ExpressRoutePortsLocation
  - Added Interface ExpressRouteProviderPort
  - Added Interface ExpressRouteProviderPortListResult
  - Added Interface ExpressRouteProviderPortOptionalParams
  - Added Interface ExpressRouteProviderPortsLocationListOptionalParams
  - Added Interface ExpressRouteServiceProvider
  - Added Interface FirewallPolicy
  - Added Interface FirewallPolicyFilterRuleCollection
  - Added Interface FirewallPolicyNatRuleCollection
  - Added Interface FirewallPolicyRuleCollectionGroup
  - Added Interface FlowLog
  - Added Interface FrontendIPConfiguration
  - Added Interface Hub
  - Added Interface HubIpConfiguration
  - Added Interface HubRouteTable
  - Added Interface HubVirtualNetworkConnection
  - Added Interface InboundNatPool
  - Added Interface InboundNatRule
  - Added Interface InboundSecurityRule
  - Added Interface IpAllocation
  - Added Interface IPConfiguration
  - Added Interface IPConfigurationProfile
  - Added Interface IpGroup
  - Added Interface IPPrefixesList
  - Added Interface ListActiveConnectivityConfigurationsOptionalParams
  - Added Interface ListActiveSecurityAdminRulesOptionalParams
  - Added Interface ListNetworkManagerEffectiveConnectivityConfigurationsOptionalParams
  - Added Interface ListNetworkManagerEffectiveSecurityAdminRulesOptionalParams
  - Added Interface LoadBalancer
  - Added Interface LoadBalancingRule
  - Added Interface LocalNetworkGateway
  - Added Interface ManagementGroupNetworkManagerConnectionsCreateOrUpdateOptionalParams
  - Added Interface ManagementGroupNetworkManagerConnectionsDeleteOptionalParams
  - Added Interface ManagementGroupNetworkManagerConnectionsGetOptionalParams
  - Added Interface ManagementGroupNetworkManagerConnectionsListNextOptionalParams
  - Added Interface ManagementGroupNetworkManagerConnectionsListOptionalParams
  - Added Interface NatGateway
  - Added Interface NatRule
  - Added Interface NetworkGroup
  - Added Interface NetworkGroupListResult
  - Added Interface NetworkGroupsCreateOrUpdateHeaders
  - Added Interface NetworkGroupsCreateOrUpdateOptionalParams
  - Added Interface NetworkGroupsDeleteHeaders
  - Added Interface NetworkGroupsDeleteOptionalParams
  - Added Interface NetworkGroupsGetOptionalParams
  - Added Interface NetworkGroupsListNextOptionalParams
  - Added Interface NetworkGroupsListOptionalParams
  - Added Interface NetworkIntentPolicy
  - Added Interface NetworkInterface
  - Added Interface NetworkInterfaceIPConfiguration
  - Added Interface NetworkInterfaceTapConfiguration
  - Added Interface NetworkManager
  - Added Interface NetworkManagerCommit
  - Added Interface NetworkManagerCommitsPostHeaders
  - Added Interface NetworkManagerCommitsPostOptionalParams
  - Added Interface NetworkManagerConnection
  - Added Interface NetworkManagerConnectionListResult
  - Added Interface NetworkManagerDeploymentStatus
  - Added Interface NetworkManagerDeploymentStatusListOptionalParams
  - Added Interface NetworkManagerDeploymentStatusListResult
  - Added Interface NetworkManagerDeploymentStatusParameter
  - Added Interface NetworkManagerEffectiveConnectivityConfigurationListResult
  - Added Interface NetworkManagerEffectiveSecurityAdminRulesListResult
  - Added Interface NetworkManagerListResult
  - Added Interface NetworkManagerPropertiesNetworkManagerScopes
  - Added Interface NetworkManagersCreateOrUpdateOptionalParams
  - Added Interface NetworkManagersDeleteHeaders
  - Added Interface NetworkManagersDeleteOptionalParams
  - Added Interface NetworkManagerSecurityGroupItem
  - Added Interface NetworkManagersGetOptionalParams
  - Added Interface NetworkManagersListBySubscriptionNextOptionalParams
  - Added Interface NetworkManagersListBySubscriptionOptionalParams
  - Added Interface NetworkManagersListNextOptionalParams
  - Added Interface NetworkManagersListOptionalParams
  - Added Interface NetworkManagersPatchOptionalParams
  - Added Interface NetworkProfile
  - Added Interface NetworkRule
  - Added Interface NetworkSecurityGroup
  - Added Interface NetworkVirtualAppliance
  - Added Interface NetworkVirtualApplianceSku
  - Added Interface NetworkWatcher
  - Added Interface OutboundRule
  - Added Interface P2SConnectionConfiguration
  - Added Interface P2SVpnGateway
  - Added Interface PacketCaptureMachineScope
  - Added Interface PacketCaptureResultProperties
  - Added Interface PatchObject
  - Added Interface PatchRouteFilter
  - Added Interface PatchRouteFilterRule
  - Added Interface PeerExpressRouteCircuitConnection
  - Added Interface PrivateDnsZoneGroup
  - Added Interface PrivateEndpoint
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkService
  - Added Interface PrivateLinkServiceConnection
  - Added Interface PrivateLinkServiceIpConfiguration
  - Added Interface PrivateLinkServicePropertiesAutoApproval
  - Added Interface PrivateLinkServicePropertiesVisibility
  - Added Interface Probe
  - Added Interface PublicIPAddress
  - Added Interface PublicIPPrefix
  - Added Interface QueryRequestOptions
  - Added Interface ResourceNavigationLink
  - Added Interface Route
  - Added Interface RouteFilter
  - Added Interface RouteFilterRule
  - Added Interface RouteTable
  - Added Interface RoutingIntent
  - Added Interface ScopeConnection
  - Added Interface ScopeConnectionListResult
  - Added Interface ScopeConnectionsCreateOrUpdateOptionalParams
  - Added Interface ScopeConnectionsDeleteOptionalParams
  - Added Interface ScopeConnectionsGetOptionalParams
  - Added Interface ScopeConnectionsListNextOptionalParams
  - Added Interface ScopeConnectionsListOptionalParams
  - Added Interface SecurityAdminConfiguration
  - Added Interface SecurityAdminConfigurationListResult
  - Added Interface SecurityAdminConfigurationsCreateOrUpdateOptionalParams
  - Added Interface SecurityAdminConfigurationsDeleteHeaders
  - Added Interface SecurityAdminConfigurationsDeleteOptionalParams
  - Added Interface SecurityAdminConfigurationsGetOptionalParams
  - Added Interface SecurityAdminConfigurationsListNextOptionalParams
  - Added Interface SecurityAdminConfigurationsListOptionalParams
  - Added Interface SecurityPartnerProvider
  - Added Interface SecurityRule
  - Added Interface ServiceAssociationLink
  - Added Interface ServiceEndpointPolicy
  - Added Interface ServiceEndpointPolicyDefinition
  - Added Interface StaticMember
  - Added Interface StaticMemberListResult
  - Added Interface StaticMembersCreateOrUpdateOptionalParams
  - Added Interface StaticMembersDeleteOptionalParams
  - Added Interface StaticMembersGetOptionalParams
  - Added Interface StaticMembersListNextOptionalParams
  - Added Interface StaticMembersListOptionalParams
  - Added Interface Subnet
  - Added Interface SubscriptionNetworkManagerConnectionsCreateOrUpdateOptionalParams
  - Added Interface SubscriptionNetworkManagerConnectionsDeleteOptionalParams
  - Added Interface SubscriptionNetworkManagerConnectionsGetOptionalParams
  - Added Interface SubscriptionNetworkManagerConnectionsListNextOptionalParams
  - Added Interface SubscriptionNetworkManagerConnectionsListOptionalParams
  - Added Interface SystemData
  - Added Interface VirtualApplianceSite
  - Added Interface VirtualHub
  - Added Interface VirtualHubRouteTableV2
  - Added Interface VirtualNetwork
  - Added Interface VirtualNetworkGateway
  - Added Interface VirtualNetworkGatewayConnection
  - Added Interface VirtualNetworkGatewayConnectionListEntity
  - Added Interface VirtualNetworkGatewayIPConfiguration
  - Added Interface VirtualNetworkGatewayNatRule
  - Added Interface VirtualNetworkPeering
  - Added Interface VirtualNetworkTap
  - Added Interface VirtualRouter
  - Added Interface VirtualRouterAutoScaleConfiguration
  - Added Interface VirtualRouterPeering
  - Added Interface VirtualWAN
  - Added Interface Vm
  - Added Interface VpnClientRevokedCertificate
  - Added Interface VpnClientRootCertificate
  - Added Interface VpnConnection
  - Added Interface VpnGateway
  - Added Interface VpnGatewayNatRule
  - Added Interface VpnServerConfiguration
  - Added Interface VpnServerConfigurationPolicyGroup
  - Added Interface VpnSite
  - Added Interface VpnSiteLink
  - Added Interface VpnSiteLinkConnection
  - Added Interface WebApplicationFirewallPolicy
  - Added Type Alias ActiveBaseSecurityAdminRuleUnion
  - Added Type Alias AddressPrefixType
  - Added Type Alias AdminRuleCollectionsCreateOrUpdateResponse
  - Added Type Alias AdminRuleCollectionsGetResponse
  - Added Type Alias AdminRuleCollectionsListNextResponse
  - Added Type Alias AdminRuleCollectionsListResponse
  - Added Type Alias AdminRuleKind
  - Added Type Alias AdminRulesCreateOrUpdateResponse
  - Added Type Alias AdminRulesGetResponse
  - Added Type Alias AdminRulesListNextResponse
  - Added Type Alias AdminRulesListResponse
  - Added Type Alias AutoLearnPrivateRangesMode
  - Added Type Alias AzureFirewallsListLearnedPrefixesResponse
  - Added Type Alias BaseAdminRuleUnion
  - Added Type Alias ConfigurationType
  - Added Type Alias ConnectivityConfigurationsCreateOrUpdateResponse
  - Added Type Alias ConnectivityConfigurationsGetResponse
  - Added Type Alias ConnectivityConfigurationsListNextResponse
  - Added Type Alias ConnectivityConfigurationsListResponse
  - Added Type Alias ConnectivityTopology
  - Added Type Alias CreatedByType
  - Added Type Alias DeleteExistingPeering
  - Added Type Alias DeploymentStatus
  - Added Type Alias EffectiveAdminRuleKind
  - Added Type Alias EffectiveBaseSecurityAdminRuleUnion
  - Added Type Alias ExpressRouteProviderPortResponse
  - Added Type Alias ExpressRouteProviderPortsLocationListResponse
  - Added Type Alias GroupConnectivity
  - Added Type Alias IsGlobal
  - Added Type Alias ListActiveConnectivityConfigurationsResponse
  - Added Type Alias ListActiveSecurityAdminRulesResponse
  - Added Type Alias ListNetworkManagerEffectiveConnectivityConfigurationsResponse
  - Added Type Alias ListNetworkManagerEffectiveSecurityAdminRulesResponse
  - Added Type Alias ManagementGroupNetworkManagerConnectionsCreateOrUpdateResponse
  - Added Type Alias ManagementGroupNetworkManagerConnectionsGetResponse
  - Added Type Alias ManagementGroupNetworkManagerConnectionsListNextResponse
  - Added Type Alias ManagementGroupNetworkManagerConnectionsListResponse
  - Added Type Alias NetworkGroupsCreateOrUpdateResponse
  - Added Type Alias NetworkGroupsGetResponse
  - Added Type Alias NetworkGroupsListNextResponse
  - Added Type Alias NetworkGroupsListResponse
  - Added Type Alias NetworkIntentPolicyBasedService
  - Added Type Alias NetworkManagerCommitsPostResponse
  - Added Type Alias NetworkManagerDeploymentStatusListResponse
  - Added Type Alias NetworkManagersCreateOrUpdateResponse
  - Added Type Alias NetworkManagersGetResponse
  - Added Type Alias NetworkManagersListBySubscriptionNextResponse
  - Added Type Alias NetworkManagersListBySubscriptionResponse
  - Added Type Alias NetworkManagersListNextResponse
  - Added Type Alias NetworkManagersListResponse
  - Added Type Alias NetworkManagersPatchResponse
  - Added Type Alias PacketCaptureTargetType
  - Added Type Alias ScopeConnectionsCreateOrUpdateResponse
  - Added Type Alias ScopeConnectionsGetResponse
  - Added Type Alias ScopeConnectionsListNextResponse
  - Added Type Alias ScopeConnectionsListResponse
  - Added Type Alias ScopeConnectionState
  - Added Type Alias SecurityAdminConfigurationsCreateOrUpdateResponse
  - Added Type Alias SecurityAdminConfigurationsGetResponse
  - Added Type Alias SecurityAdminConfigurationsListNextResponse
  - Added Type Alias SecurityAdminConfigurationsListResponse
  - Added Type Alias SecurityConfigurationRuleAccess
  - Added Type Alias SecurityConfigurationRuleDirection
  - Added Type Alias SecurityConfigurationRuleProtocol
  - Added Type Alias StaticMembersCreateOrUpdateResponse
  - Added Type Alias StaticMembersGetResponse
  - Added Type Alias StaticMembersListNextResponse
  - Added Type Alias StaticMembersListResponse
  - Added Type Alias SubscriptionNetworkManagerConnectionsCreateOrUpdateResponse
  - Added Type Alias SubscriptionNetworkManagerConnectionsGetResponse
  - Added Type Alias SubscriptionNetworkManagerConnectionsListNextResponse
  - Added Type Alias SubscriptionNetworkManagerConnectionsListResponse
  - Added Type Alias UseHubGateway
  - Interface FirewallPolicySnat has a new optional parameter autoLearnPrivateRanges
  - Interface PacketCapture has a new optional parameter scope
  - Interface PacketCapture has a new optional parameter targetType
  - Interface PacketCaptureParameters has a new optional parameter scope
  - Interface PacketCaptureParameters has a new optional parameter targetType
  - Interface PacketCaptureResult has a new optional parameter scope
  - Interface PacketCaptureResult has a new optional parameter targetType
  - Class NetworkManagementClient has a new parameter adminRuleCollections
  - Class NetworkManagementClient has a new parameter adminRules
  - Class NetworkManagementClient has a new parameter connectivityConfigurations
  - Class NetworkManagementClient has a new parameter expressRouteProviderPortsLocation
  - Class NetworkManagementClient has a new parameter managementGroupNetworkManagerConnections
  - Class NetworkManagementClient has a new parameter networkGroups
  - Class NetworkManagementClient has a new parameter networkManagerCommits
  - Class NetworkManagementClient has a new parameter networkManagerDeploymentStatusOperations
  - Class NetworkManagementClient has a new parameter networkManagers
  - Class NetworkManagementClient has a new parameter scopeConnections
  - Class NetworkManagementClient has a new parameter securityAdminConfigurations
  - Class NetworkManagementClient has a new parameter staticMembers
  - Class NetworkManagementClient has a new parameter subscriptionNetworkManagerConnections
  - Added Enum KnownAddressPrefixType
  - Added Enum KnownAdminRuleKind
  - Added Enum KnownAutoLearnPrivateRangesMode
  - Added Enum KnownConfigurationType
  - Added Enum KnownConnectivityTopology
  - Added Enum KnownCreatedByType
  - Added Enum KnownDeleteExistingPeering
  - Added Enum KnownDeploymentStatus
  - Added Enum KnownEffectiveAdminRuleKind
  - Added Enum KnownGroupConnectivity
  - Added Enum KnownIsGlobal
  - Added Enum KnownNetworkIntentPolicyBasedService
  - Added Enum KnownScopeConnectionState
  - Added Enum KnownSecurityConfigurationRuleAccess
  - Added Enum KnownSecurityConfigurationRuleDirection
  - Added Enum KnownSecurityConfigurationRuleProtocol
  - Added Enum KnownUseHubGateway
  - Enum KnownApplicationGatewaySslPolicyName has a new value AppGwSslPolicy20220101
  - Enum KnownApplicationGatewaySslPolicyName has a new value AppGwSslPolicy20220101S
  - Enum KnownApplicationGatewaySslPolicyType has a new value CustomV2
  - Enum KnownApplicationGatewaySslProtocol has a new value TLSv13
  - Enum KnownCommissionedState has a new value CommissionedNoInternetAdvertise
  - Enum KnownEndpointType has a new value AzureArcVM
  - Enum KnownEndpointType has a new value AzureVmss
  - Enum KnownWebApplicationFirewallOperator has a new value Any

**Breaking Changes**

  - Interface NetworkManagementClientOptionalParams no longer has parameter apiVersion
  - Class NetworkManagementClient no longer has parameter apiVersion
    
    
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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
