// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  NetworkManagementContext,
  NetworkManagementClientOptionalParams,
} from "./api/index.js";
import { createNetworkManagement } from "./api/index.js";
import {
  checkDnsNameAvailability,
  generatevirtualwanvpnserverconfigurationvpnprofile,
  supportedSecurityProviders,
  listNetworkManagerEffectiveSecurityAdminRules,
  listNetworkManagerEffectiveConnectivityConfigurations,
  listActiveSecurityAdminRules,
  listActiveConnectivityConfigurations,
  expressRouteProviderPort,
  disconnectActiveSessions,
  getActiveSessions,
  getBastionShareableLink,
  deleteBastionShareableLinkByToken,
  deleteBastionShareableLink,
  putBastionShareableLink,
} from "./api/operations.js";
import type {
  CheckDnsNameAvailabilityOptionalParams,
  GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams,
  SupportedSecurityProvidersOptionalParams,
  ListNetworkManagerEffectiveSecurityAdminRulesOptionalParams,
  ListNetworkManagerEffectiveConnectivityConfigurationsOptionalParams,
  ListActiveSecurityAdminRulesOptionalParams,
  ListActiveConnectivityConfigurationsOptionalParams,
  ExpressRouteProviderPortOptionalParams,
  DisconnectActiveSessionsOptionalParams,
  GetActiveSessionsOptionalParams,
  GetBastionShareableLinkOptionalParams,
  DeleteBastionShareableLinkByTokenOptionalParams,
  DeleteBastionShareableLinkOptionalParams,
  PutBastionShareableLinkOptionalParams,
} from "./api/options.js";
import type { AdminRuleCollectionsOperations } from "./classic/adminRuleCollections/index.js";
import { _getAdminRuleCollectionsOperations } from "./classic/adminRuleCollections/index.js";
import type { AdminRulesOperations } from "./classic/adminRules/index.js";
import { _getAdminRulesOperations } from "./classic/adminRules/index.js";
import type { ApplicationGatewayPrivateEndpointConnectionsOperations } from "./classic/applicationGatewayPrivateEndpointConnections/index.js";
import { _getApplicationGatewayPrivateEndpointConnectionsOperations } from "./classic/applicationGatewayPrivateEndpointConnections/index.js";
import type { ApplicationGatewayPrivateLinkResourcesOperations } from "./classic/applicationGatewayPrivateLinkResources/index.js";
import { _getApplicationGatewayPrivateLinkResourcesOperations } from "./classic/applicationGatewayPrivateLinkResources/index.js";
import type { ApplicationGatewayWafDynamicManifestsOperations } from "./classic/applicationGatewayWafDynamicManifests/index.js";
import { _getApplicationGatewayWafDynamicManifestsOperations } from "./classic/applicationGatewayWafDynamicManifests/index.js";
import type { ApplicationGatewayWafDynamicManifestsDefaultOperations } from "./classic/applicationGatewayWafDynamicManifestsDefault/index.js";
import { _getApplicationGatewayWafDynamicManifestsDefaultOperations } from "./classic/applicationGatewayWafDynamicManifestsDefault/index.js";
import type { ApplicationGatewaysOperations } from "./classic/applicationGateways/index.js";
import { _getApplicationGatewaysOperations } from "./classic/applicationGateways/index.js";
import type { ApplicationSecurityGroupsOperations } from "./classic/applicationSecurityGroups/index.js";
import { _getApplicationSecurityGroupsOperations } from "./classic/applicationSecurityGroups/index.js";
import type { AvailableDelegationsOperations } from "./classic/availableDelegations/index.js";
import { _getAvailableDelegationsOperations } from "./classic/availableDelegations/index.js";
import type { AvailableEndpointServicesOperations } from "./classic/availableEndpointServices/index.js";
import { _getAvailableEndpointServicesOperations } from "./classic/availableEndpointServices/index.js";
import type { AvailablePrivateEndpointTypesOperations } from "./classic/availablePrivateEndpointTypes/index.js";
import { _getAvailablePrivateEndpointTypesOperations } from "./classic/availablePrivateEndpointTypes/index.js";
import type { AvailableResourceGroupDelegationsOperations } from "./classic/availableResourceGroupDelegations/index.js";
import { _getAvailableResourceGroupDelegationsOperations } from "./classic/availableResourceGroupDelegations/index.js";
import type { AvailableServiceAliasesOperations } from "./classic/availableServiceAliases/index.js";
import { _getAvailableServiceAliasesOperations } from "./classic/availableServiceAliases/index.js";
import type { AzureFirewallFqdnTagsOperations } from "./classic/azureFirewallFqdnTags/index.js";
import { _getAzureFirewallFqdnTagsOperations } from "./classic/azureFirewallFqdnTags/index.js";
import type { AzureFirewallsOperations } from "./classic/azureFirewalls/index.js";
import { _getAzureFirewallsOperations } from "./classic/azureFirewalls/index.js";
import type { BastionHostsOperations } from "./classic/bastionHosts/index.js";
import { _getBastionHostsOperations } from "./classic/bastionHosts/index.js";
import type { BgpServiceCommunitiesOperations } from "./classic/bgpServiceCommunities/index.js";
import { _getBgpServiceCommunitiesOperations } from "./classic/bgpServiceCommunities/index.js";
import type { ConfigurationPolicyGroupsOperations } from "./classic/configurationPolicyGroups/index.js";
import { _getConfigurationPolicyGroupsOperations } from "./classic/configurationPolicyGroups/index.js";
import type { ConnectionMonitorsOperations } from "./classic/connectionMonitors/index.js";
import { _getConnectionMonitorsOperations } from "./classic/connectionMonitors/index.js";
import type { ConnectivityConfigurationsOperations } from "./classic/connectivityConfigurations/index.js";
import { _getConnectivityConfigurationsOperations } from "./classic/connectivityConfigurations/index.js";
import type { CustomIPPrefixesOperations } from "./classic/customIPPrefixes/index.js";
import { _getCustomIPPrefixesOperations } from "./classic/customIPPrefixes/index.js";
import type { DdosCustomPoliciesOperations } from "./classic/ddosCustomPolicies/index.js";
import { _getDdosCustomPoliciesOperations } from "./classic/ddosCustomPolicies/index.js";
import type { DdosProtectionPlansOperations } from "./classic/ddosProtectionPlans/index.js";
import { _getDdosProtectionPlansOperations } from "./classic/ddosProtectionPlans/index.js";
import type { DefaultSecurityRulesOperations } from "./classic/defaultSecurityRules/index.js";
import { _getDefaultSecurityRulesOperations } from "./classic/defaultSecurityRules/index.js";
import type { DscpConfigurationOperations } from "./classic/dscpConfiguration/index.js";
import { _getDscpConfigurationOperations } from "./classic/dscpConfiguration/index.js";
import type { ExpressRouteCircuitAuthorizationsOperations } from "./classic/expressRouteCircuitAuthorizations/index.js";
import { _getExpressRouteCircuitAuthorizationsOperations } from "./classic/expressRouteCircuitAuthorizations/index.js";
import type { ExpressRouteCircuitConnectionsOperations } from "./classic/expressRouteCircuitConnections/index.js";
import { _getExpressRouteCircuitConnectionsOperations } from "./classic/expressRouteCircuitConnections/index.js";
import type { ExpressRouteCircuitPeeringsOperations } from "./classic/expressRouteCircuitPeerings/index.js";
import { _getExpressRouteCircuitPeeringsOperations } from "./classic/expressRouteCircuitPeerings/index.js";
import type { ExpressRouteCircuitsOperations } from "./classic/expressRouteCircuits/index.js";
import { _getExpressRouteCircuitsOperations } from "./classic/expressRouteCircuits/index.js";
import type { ExpressRouteConnectionsOperations } from "./classic/expressRouteConnections/index.js";
import { _getExpressRouteConnectionsOperations } from "./classic/expressRouteConnections/index.js";
import type { ExpressRouteCrossConnectionPeeringsOperations } from "./classic/expressRouteCrossConnectionPeerings/index.js";
import { _getExpressRouteCrossConnectionPeeringsOperations } from "./classic/expressRouteCrossConnectionPeerings/index.js";
import type { ExpressRouteCrossConnectionsOperations } from "./classic/expressRouteCrossConnections/index.js";
import { _getExpressRouteCrossConnectionsOperations } from "./classic/expressRouteCrossConnections/index.js";
import type { ExpressRouteGatewaysOperations } from "./classic/expressRouteGateways/index.js";
import { _getExpressRouteGatewaysOperations } from "./classic/expressRouteGateways/index.js";
import type { ExpressRouteLinksOperations } from "./classic/expressRouteLinks/index.js";
import { _getExpressRouteLinksOperations } from "./classic/expressRouteLinks/index.js";
import type { ExpressRoutePortAuthorizationsOperations } from "./classic/expressRoutePortAuthorizations/index.js";
import { _getExpressRoutePortAuthorizationsOperations } from "./classic/expressRoutePortAuthorizations/index.js";
import type { ExpressRoutePortsOperations } from "./classic/expressRoutePorts/index.js";
import { _getExpressRoutePortsOperations } from "./classic/expressRoutePorts/index.js";
import type { ExpressRoutePortsLocationsOperations } from "./classic/expressRoutePortsLocations/index.js";
import { _getExpressRoutePortsLocationsOperations } from "./classic/expressRoutePortsLocations/index.js";
import type { ExpressRouteProviderPortsLocationOperations } from "./classic/expressRouteProviderPortsLocation/index.js";
import { _getExpressRouteProviderPortsLocationOperations } from "./classic/expressRouteProviderPortsLocation/index.js";
import type { ExpressRouteServiceProvidersOperations } from "./classic/expressRouteServiceProviders/index.js";
import { _getExpressRouteServiceProvidersOperations } from "./classic/expressRouteServiceProviders/index.js";
import type { FirewallPoliciesOperations } from "./classic/firewallPolicies/index.js";
import { _getFirewallPoliciesOperations } from "./classic/firewallPolicies/index.js";
import type { FirewallPolicyDeploymentsOperations } from "./classic/firewallPolicyDeployments/index.js";
import { _getFirewallPolicyDeploymentsOperations } from "./classic/firewallPolicyDeployments/index.js";
import type { FirewallPolicyDraftsOperations } from "./classic/firewallPolicyDrafts/index.js";
import { _getFirewallPolicyDraftsOperations } from "./classic/firewallPolicyDrafts/index.js";
import type { FirewallPolicyIdpsSignaturesOperations } from "./classic/firewallPolicyIdpsSignatures/index.js";
import { _getFirewallPolicyIdpsSignaturesOperations } from "./classic/firewallPolicyIdpsSignatures/index.js";
import type { FirewallPolicyIdpsSignaturesFilterValuesOperations } from "./classic/firewallPolicyIdpsSignaturesFilterValues/index.js";
import { _getFirewallPolicyIdpsSignaturesFilterValuesOperations } from "./classic/firewallPolicyIdpsSignaturesFilterValues/index.js";
import type { FirewallPolicyIdpsSignaturesOverridesOperations } from "./classic/firewallPolicyIdpsSignaturesOverrides/index.js";
import { _getFirewallPolicyIdpsSignaturesOverridesOperations } from "./classic/firewallPolicyIdpsSignaturesOverrides/index.js";
import type { FirewallPolicyRuleCollectionGroupDraftsOperations } from "./classic/firewallPolicyRuleCollectionGroupDrafts/index.js";
import { _getFirewallPolicyRuleCollectionGroupDraftsOperations } from "./classic/firewallPolicyRuleCollectionGroupDrafts/index.js";
import type { FirewallPolicyRuleCollectionGroupsOperations } from "./classic/firewallPolicyRuleCollectionGroups/index.js";
import { _getFirewallPolicyRuleCollectionGroupsOperations } from "./classic/firewallPolicyRuleCollectionGroups/index.js";
import type { FlowLogsOperations } from "./classic/flowLogs/index.js";
import { _getFlowLogsOperations } from "./classic/flowLogs/index.js";
import type { HubRouteTablesOperations } from "./classic/hubRouteTables/index.js";
import { _getHubRouteTablesOperations } from "./classic/hubRouteTables/index.js";
import type { HubVirtualNetworkConnectionsOperations } from "./classic/hubVirtualNetworkConnections/index.js";
import { _getHubVirtualNetworkConnectionsOperations } from "./classic/hubVirtualNetworkConnections/index.js";
import type { InboundNatRulesOperations } from "./classic/inboundNatRules/index.js";
import { _getInboundNatRulesOperations } from "./classic/inboundNatRules/index.js";
import type { InboundSecurityRuleOperations } from "./classic/inboundSecurityRule/index.js";
import { _getInboundSecurityRuleOperations } from "./classic/inboundSecurityRule/index.js";
import type { IpAllocationsOperations } from "./classic/ipAllocations/index.js";
import { _getIpAllocationsOperations } from "./classic/ipAllocations/index.js";
import type { IpGroupsOperations } from "./classic/ipGroups/index.js";
import { _getIpGroupsOperations } from "./classic/ipGroups/index.js";
import type { IpamPoolsOperations } from "./classic/ipamPools/index.js";
import { _getIpamPoolsOperations } from "./classic/ipamPools/index.js";
import type { LoadBalancerBackendAddressPoolsOperations } from "./classic/loadBalancerBackendAddressPools/index.js";
import { _getLoadBalancerBackendAddressPoolsOperations } from "./classic/loadBalancerBackendAddressPools/index.js";
import type { LoadBalancerFrontendIPConfigurationsOperations } from "./classic/loadBalancerFrontendIPConfigurations/index.js";
import { _getLoadBalancerFrontendIPConfigurationsOperations } from "./classic/loadBalancerFrontendIPConfigurations/index.js";
import type { LoadBalancerLoadBalancingRulesOperations } from "./classic/loadBalancerLoadBalancingRules/index.js";
import { _getLoadBalancerLoadBalancingRulesOperations } from "./classic/loadBalancerLoadBalancingRules/index.js";
import type { LoadBalancerNetworkInterfacesOperations } from "./classic/loadBalancerNetworkInterfaces/index.js";
import { _getLoadBalancerNetworkInterfacesOperations } from "./classic/loadBalancerNetworkInterfaces/index.js";
import type { LoadBalancerOutboundRulesOperations } from "./classic/loadBalancerOutboundRules/index.js";
import { _getLoadBalancerOutboundRulesOperations } from "./classic/loadBalancerOutboundRules/index.js";
import type { LoadBalancerProbesOperations } from "./classic/loadBalancerProbes/index.js";
import { _getLoadBalancerProbesOperations } from "./classic/loadBalancerProbes/index.js";
import type { LoadBalancersOperations } from "./classic/loadBalancers/index.js";
import { _getLoadBalancersOperations } from "./classic/loadBalancers/index.js";
import type { LocalNetworkGatewaysOperations } from "./classic/localNetworkGateways/index.js";
import { _getLocalNetworkGatewaysOperations } from "./classic/localNetworkGateways/index.js";
import type { ManagementGroupNetworkManagerConnectionsOperations } from "./classic/managementGroupNetworkManagerConnections/index.js";
import { _getManagementGroupNetworkManagerConnectionsOperations } from "./classic/managementGroupNetworkManagerConnections/index.js";
import type { NatGatewaysOperations } from "./classic/natGateways/index.js";
import { _getNatGatewaysOperations } from "./classic/natGateways/index.js";
import type { NatRulesOperations } from "./classic/natRules/index.js";
import { _getNatRulesOperations } from "./classic/natRules/index.js";
import type { NetworkGroupsOperations } from "./classic/networkGroups/index.js";
import { _getNetworkGroupsOperations } from "./classic/networkGroups/index.js";
import type { NetworkInterfaceIPConfigurationsOperations } from "./classic/networkInterfaceIPConfigurations/index.js";
import { _getNetworkInterfaceIPConfigurationsOperations } from "./classic/networkInterfaceIPConfigurations/index.js";
import type { NetworkInterfaceLoadBalancersOperations } from "./classic/networkInterfaceLoadBalancers/index.js";
import { _getNetworkInterfaceLoadBalancersOperations } from "./classic/networkInterfaceLoadBalancers/index.js";
import type { NetworkInterfaceTapConfigurationsOperations } from "./classic/networkInterfaceTapConfigurations/index.js";
import { _getNetworkInterfaceTapConfigurationsOperations } from "./classic/networkInterfaceTapConfigurations/index.js";
import type { NetworkInterfacesOperations } from "./classic/networkInterfaces/index.js";
import { _getNetworkInterfacesOperations } from "./classic/networkInterfaces/index.js";
import type { NetworkManagerCommitsOperations } from "./classic/networkManagerCommits/index.js";
import { _getNetworkManagerCommitsOperations } from "./classic/networkManagerCommits/index.js";
import type { NetworkManagerDeploymentStatusOperations } from "./classic/networkManagerDeploymentStatus/index.js";
import { _getNetworkManagerDeploymentStatusOperations } from "./classic/networkManagerDeploymentStatus/index.js";
import type { NetworkManagerRoutingConfigurationsOperations } from "./classic/networkManagerRoutingConfigurations/index.js";
import { _getNetworkManagerRoutingConfigurationsOperations } from "./classic/networkManagerRoutingConfigurations/index.js";
import type { NetworkManagersOperations } from "./classic/networkManagers/index.js";
import { _getNetworkManagersOperations } from "./classic/networkManagers/index.js";
import type { NetworkProfilesOperations } from "./classic/networkProfiles/index.js";
import { _getNetworkProfilesOperations } from "./classic/networkProfiles/index.js";
import type { NetworkSecurityGroupsOperations } from "./classic/networkSecurityGroups/index.js";
import { _getNetworkSecurityGroupsOperations } from "./classic/networkSecurityGroups/index.js";
import type { NetworkSecurityPerimeterAccessRulesOperations } from "./classic/networkSecurityPerimeterAccessRules/index.js";
import { _getNetworkSecurityPerimeterAccessRulesOperations } from "./classic/networkSecurityPerimeterAccessRules/index.js";
import type { NetworkSecurityPerimeterAssociableResourceTypesOperations } from "./classic/networkSecurityPerimeterAssociableResourceTypes/index.js";
import { _getNetworkSecurityPerimeterAssociableResourceTypesOperations } from "./classic/networkSecurityPerimeterAssociableResourceTypes/index.js";
import type { NetworkSecurityPerimeterAssociationsOperations } from "./classic/networkSecurityPerimeterAssociations/index.js";
import { _getNetworkSecurityPerimeterAssociationsOperations } from "./classic/networkSecurityPerimeterAssociations/index.js";
import type { NetworkSecurityPerimeterLinkReferencesOperations } from "./classic/networkSecurityPerimeterLinkReferences/index.js";
import { _getNetworkSecurityPerimeterLinkReferencesOperations } from "./classic/networkSecurityPerimeterLinkReferences/index.js";
import type { NetworkSecurityPerimeterLinksOperations } from "./classic/networkSecurityPerimeterLinks/index.js";
import { _getNetworkSecurityPerimeterLinksOperations } from "./classic/networkSecurityPerimeterLinks/index.js";
import type { NetworkSecurityPerimeterLoggingConfigurationsOperations } from "./classic/networkSecurityPerimeterLoggingConfigurations/index.js";
import { _getNetworkSecurityPerimeterLoggingConfigurationsOperations } from "./classic/networkSecurityPerimeterLoggingConfigurations/index.js";
import type { NetworkSecurityPerimeterOperationStatusesOperations } from "./classic/networkSecurityPerimeterOperationStatuses/index.js";
import { _getNetworkSecurityPerimeterOperationStatusesOperations } from "./classic/networkSecurityPerimeterOperationStatuses/index.js";
import type { NetworkSecurityPerimeterProfilesOperations } from "./classic/networkSecurityPerimeterProfiles/index.js";
import { _getNetworkSecurityPerimeterProfilesOperations } from "./classic/networkSecurityPerimeterProfiles/index.js";
import type { NetworkSecurityPerimeterServiceTagsOperations } from "./classic/networkSecurityPerimeterServiceTags/index.js";
import { _getNetworkSecurityPerimeterServiceTagsOperations } from "./classic/networkSecurityPerimeterServiceTags/index.js";
import type { NetworkSecurityPerimetersOperations } from "./classic/networkSecurityPerimeters/index.js";
import { _getNetworkSecurityPerimetersOperations } from "./classic/networkSecurityPerimeters/index.js";
import type { NetworkVirtualApplianceConnectionsOperations } from "./classic/networkVirtualApplianceConnections/index.js";
import { _getNetworkVirtualApplianceConnectionsOperations } from "./classic/networkVirtualApplianceConnections/index.js";
import type { NetworkVirtualAppliancesOperations } from "./classic/networkVirtualAppliances/index.js";
import { _getNetworkVirtualAppliancesOperations } from "./classic/networkVirtualAppliances/index.js";
import type { NetworkWatchersOperations } from "./classic/networkWatchers/index.js";
import { _getNetworkWatchersOperations } from "./classic/networkWatchers/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { P2SVpnGatewaysOperations } from "./classic/p2SVpnGateways/index.js";
import { _getP2SVpnGatewaysOperations } from "./classic/p2SVpnGateways/index.js";
import type { PacketCapturesOperations } from "./classic/packetCaptures/index.js";
import { _getPacketCapturesOperations } from "./classic/packetCaptures/index.js";
import type { PeerExpressRouteCircuitConnectionsOperations } from "./classic/peerExpressRouteCircuitConnections/index.js";
import { _getPeerExpressRouteCircuitConnectionsOperations } from "./classic/peerExpressRouteCircuitConnections/index.js";
import type { PrivateDnsZoneGroupsOperations } from "./classic/privateDnsZoneGroups/index.js";
import { _getPrivateDnsZoneGroupsOperations } from "./classic/privateDnsZoneGroups/index.js";
import type { PrivateEndpointsOperations } from "./classic/privateEndpoints/index.js";
import { _getPrivateEndpointsOperations } from "./classic/privateEndpoints/index.js";
import type { PrivateLinkServicesOperations } from "./classic/privateLinkServices/index.js";
import { _getPrivateLinkServicesOperations } from "./classic/privateLinkServices/index.js";
import type { PublicIPAddressesOperations } from "./classic/publicIPAddresses/index.js";
import { _getPublicIPAddressesOperations } from "./classic/publicIPAddresses/index.js";
import type { PublicIPPrefixesOperations } from "./classic/publicIPPrefixes/index.js";
import { _getPublicIPPrefixesOperations } from "./classic/publicIPPrefixes/index.js";
import type { ReachabilityAnalysisIntentsOperations } from "./classic/reachabilityAnalysisIntents/index.js";
import { _getReachabilityAnalysisIntentsOperations } from "./classic/reachabilityAnalysisIntents/index.js";
import type { ReachabilityAnalysisRunsOperations } from "./classic/reachabilityAnalysisRuns/index.js";
import { _getReachabilityAnalysisRunsOperations } from "./classic/reachabilityAnalysisRuns/index.js";
import type { ResourceNavigationLinksOperations } from "./classic/resourceNavigationLinks/index.js";
import { _getResourceNavigationLinksOperations } from "./classic/resourceNavigationLinks/index.js";
import type { RouteFilterRulesOperations } from "./classic/routeFilterRules/index.js";
import { _getRouteFilterRulesOperations } from "./classic/routeFilterRules/index.js";
import type { RouteFiltersOperations } from "./classic/routeFilters/index.js";
import { _getRouteFiltersOperations } from "./classic/routeFilters/index.js";
import type { RouteMapsOperations } from "./classic/routeMaps/index.js";
import { _getRouteMapsOperations } from "./classic/routeMaps/index.js";
import type { RouteTablesOperations } from "./classic/routeTables/index.js";
import { _getRouteTablesOperations } from "./classic/routeTables/index.js";
import type { RoutesOperations } from "./classic/routes/index.js";
import { _getRoutesOperations } from "./classic/routes/index.js";
import type { RoutingIntentOperations } from "./classic/routingIntent/index.js";
import { _getRoutingIntentOperations } from "./classic/routingIntent/index.js";
import type { RoutingRuleCollectionsOperations } from "./classic/routingRuleCollections/index.js";
import { _getRoutingRuleCollectionsOperations } from "./classic/routingRuleCollections/index.js";
import type { RoutingRulesOperations } from "./classic/routingRules/index.js";
import { _getRoutingRulesOperations } from "./classic/routingRules/index.js";
import type { ScopeConnectionsOperations } from "./classic/scopeConnections/index.js";
import { _getScopeConnectionsOperations } from "./classic/scopeConnections/index.js";
import type { SecurityAdminConfigurationsOperations } from "./classic/securityAdminConfigurations/index.js";
import { _getSecurityAdminConfigurationsOperations } from "./classic/securityAdminConfigurations/index.js";
import type { SecurityPartnerProvidersOperations } from "./classic/securityPartnerProviders/index.js";
import { _getSecurityPartnerProvidersOperations } from "./classic/securityPartnerProviders/index.js";
import type { SecurityRulesOperations } from "./classic/securityRules/index.js";
import { _getSecurityRulesOperations } from "./classic/securityRules/index.js";
import type { SecurityUserConfigurationsOperations } from "./classic/securityUserConfigurations/index.js";
import { _getSecurityUserConfigurationsOperations } from "./classic/securityUserConfigurations/index.js";
import type { SecurityUserRuleCollectionsOperations } from "./classic/securityUserRuleCollections/index.js";
import { _getSecurityUserRuleCollectionsOperations } from "./classic/securityUserRuleCollections/index.js";
import type { SecurityUserRulesOperations } from "./classic/securityUserRules/index.js";
import { _getSecurityUserRulesOperations } from "./classic/securityUserRules/index.js";
import type { ServiceAssociationLinksOperations } from "./classic/serviceAssociationLinks/index.js";
import { _getServiceAssociationLinksOperations } from "./classic/serviceAssociationLinks/index.js";
import type { ServiceEndpointPoliciesOperations } from "./classic/serviceEndpointPolicies/index.js";
import { _getServiceEndpointPoliciesOperations } from "./classic/serviceEndpointPolicies/index.js";
import type { ServiceEndpointPolicyDefinitionsOperations } from "./classic/serviceEndpointPolicyDefinitions/index.js";
import { _getServiceEndpointPolicyDefinitionsOperations } from "./classic/serviceEndpointPolicyDefinitions/index.js";
import type { ServiceGatewaysOperations } from "./classic/serviceGateways/index.js";
import { _getServiceGatewaysOperations } from "./classic/serviceGateways/index.js";
import type { ServiceTagInformationOperations } from "./classic/serviceTagInformation/index.js";
import { _getServiceTagInformationOperations } from "./classic/serviceTagInformation/index.js";
import type { ServiceTagsOperations } from "./classic/serviceTags/index.js";
import { _getServiceTagsOperations } from "./classic/serviceTags/index.js";
import type { StaticCidrsOperations } from "./classic/staticCidrs/index.js";
import { _getStaticCidrsOperations } from "./classic/staticCidrs/index.js";
import type { StaticMembersOperations } from "./classic/staticMembers/index.js";
import { _getStaticMembersOperations } from "./classic/staticMembers/index.js";
import type { SubnetsOperations } from "./classic/subnets/index.js";
import { _getSubnetsOperations } from "./classic/subnets/index.js";
import type { SubscriptionNetworkManagerConnectionsOperations } from "./classic/subscriptionNetworkManagerConnections/index.js";
import { _getSubscriptionNetworkManagerConnectionsOperations } from "./classic/subscriptionNetworkManagerConnections/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { VerifierWorkspacesOperations } from "./classic/verifierWorkspaces/index.js";
import { _getVerifierWorkspacesOperations } from "./classic/verifierWorkspaces/index.js";
import type { VipSwapOperations } from "./classic/vipSwap/index.js";
import { _getVipSwapOperations } from "./classic/vipSwap/index.js";
import type { VirtualApplianceSitesOperations } from "./classic/virtualApplianceSites/index.js";
import { _getVirtualApplianceSitesOperations } from "./classic/virtualApplianceSites/index.js";
import type { VirtualApplianceSkusOperations } from "./classic/virtualApplianceSkus/index.js";
import { _getVirtualApplianceSkusOperations } from "./classic/virtualApplianceSkus/index.js";
import type { VirtualHubBgpConnectionOperations } from "./classic/virtualHubBgpConnection/index.js";
import { _getVirtualHubBgpConnectionOperations } from "./classic/virtualHubBgpConnection/index.js";
import type { VirtualHubBgpConnectionsOperations } from "./classic/virtualHubBgpConnections/index.js";
import { _getVirtualHubBgpConnectionsOperations } from "./classic/virtualHubBgpConnections/index.js";
import type { VirtualHubIpConfigurationOperations } from "./classic/virtualHubIpConfiguration/index.js";
import { _getVirtualHubIpConfigurationOperations } from "./classic/virtualHubIpConfiguration/index.js";
import type { VirtualHubRouteTableV2SOperations } from "./classic/virtualHubRouteTableV2S/index.js";
import { _getVirtualHubRouteTableV2SOperations } from "./classic/virtualHubRouteTableV2S/index.js";
import type { VirtualHubsOperations } from "./classic/virtualHubs/index.js";
import { _getVirtualHubsOperations } from "./classic/virtualHubs/index.js";
import type { VirtualNetworkAppliancesOperations } from "./classic/virtualNetworkAppliances/index.js";
import { _getVirtualNetworkAppliancesOperations } from "./classic/virtualNetworkAppliances/index.js";
import type { VirtualNetworkGatewayConnectionsOperations } from "./classic/virtualNetworkGatewayConnections/index.js";
import { _getVirtualNetworkGatewayConnectionsOperations } from "./classic/virtualNetworkGatewayConnections/index.js";
import type { VirtualNetworkGatewayNatRulesOperations } from "./classic/virtualNetworkGatewayNatRules/index.js";
import { _getVirtualNetworkGatewayNatRulesOperations } from "./classic/virtualNetworkGatewayNatRules/index.js";
import type { VirtualNetworkGatewaysOperations } from "./classic/virtualNetworkGateways/index.js";
import { _getVirtualNetworkGatewaysOperations } from "./classic/virtualNetworkGateways/index.js";
import type { VirtualNetworkPeeringsOperations } from "./classic/virtualNetworkPeerings/index.js";
import { _getVirtualNetworkPeeringsOperations } from "./classic/virtualNetworkPeerings/index.js";
import type { VirtualNetworkTapsOperations } from "./classic/virtualNetworkTaps/index.js";
import { _getVirtualNetworkTapsOperations } from "./classic/virtualNetworkTaps/index.js";
import type { VirtualNetworksOperations } from "./classic/virtualNetworks/index.js";
import { _getVirtualNetworksOperations } from "./classic/virtualNetworks/index.js";
import type { VirtualRouterPeeringsOperations } from "./classic/virtualRouterPeerings/index.js";
import { _getVirtualRouterPeeringsOperations } from "./classic/virtualRouterPeerings/index.js";
import type { VirtualRoutersOperations } from "./classic/virtualRouters/index.js";
import { _getVirtualRoutersOperations } from "./classic/virtualRouters/index.js";
import type { VirtualWansOperations } from "./classic/virtualWans/index.js";
import { _getVirtualWansOperations } from "./classic/virtualWans/index.js";
import type { VpnConnectionsOperations } from "./classic/vpnConnections/index.js";
import { _getVpnConnectionsOperations } from "./classic/vpnConnections/index.js";
import type { VpnGatewaysOperations } from "./classic/vpnGateways/index.js";
import { _getVpnGatewaysOperations } from "./classic/vpnGateways/index.js";
import type { VpnLinkConnectionsOperations } from "./classic/vpnLinkConnections/index.js";
import { _getVpnLinkConnectionsOperations } from "./classic/vpnLinkConnections/index.js";
import type { VpnServerConfigurationsOperations } from "./classic/vpnServerConfigurations/index.js";
import { _getVpnServerConfigurationsOperations } from "./classic/vpnServerConfigurations/index.js";
import type { VpnServerConfigurationsAssociatedWithVirtualWanOperations } from "./classic/vpnServerConfigurationsAssociatedWithVirtualWan/index.js";
import { _getVpnServerConfigurationsAssociatedWithVirtualWanOperations } from "./classic/vpnServerConfigurationsAssociatedWithVirtualWan/index.js";
import type { VpnSiteLinkConnectionsOperations } from "./classic/vpnSiteLinkConnections/index.js";
import { _getVpnSiteLinkConnectionsOperations } from "./classic/vpnSiteLinkConnections/index.js";
import type { VpnSiteLinksOperations } from "./classic/vpnSiteLinks/index.js";
import { _getVpnSiteLinksOperations } from "./classic/vpnSiteLinks/index.js";
import type { VpnSitesOperations } from "./classic/vpnSites/index.js";
import { _getVpnSitesOperations } from "./classic/vpnSites/index.js";
import type { VpnSitesConfigurationOperations } from "./classic/vpnSitesConfiguration/index.js";
import { _getVpnSitesConfigurationOperations } from "./classic/vpnSitesConfiguration/index.js";
import type { WebApplicationFirewallPoliciesOperations } from "./classic/webApplicationFirewallPolicies/index.js";
import { _getWebApplicationFirewallPoliciesOperations } from "./classic/webApplicationFirewallPolicies/index.js";
import type { WebCategoriesOperations } from "./classic/webCategories/index.js";
import { _getWebCategoriesOperations } from "./classic/webCategories/index.js";
import type {
  BastionShareableLinkListRequest,
  BastionShareableLink,
  BastionShareableLinkTokenListRequest,
  BastionActiveSession,
  SessionIds,
  BastionSessionState,
  ExpressRouteProviderPort,
  ActiveConfigurationParameter,
  ActiveConnectivityConfigurationsListResult,
  ActiveSecurityAdminRulesListResult,
  QueryRequestOptions,
  NetworkManagerEffectiveConnectivityConfigurationListResult,
  NetworkManagerEffectiveSecurityAdminRulesListResult,
  VirtualWanSecurityProviders,
  VirtualWanVpnProfileParameters,
  VpnProfileResponse,
  DnsNameAvailabilityResult,
} from "./models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "./static-helpers/simplePollerHelpers.js";
import type { TokenCredential } from "@azure/core-auth";
import type { PollerLike, OperationState } from "@azure/core-lro";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { NetworkManagementClientOptionalParams } from "./api/networkManagementContext.js";

export class NetworkManagementClient {
  private _client: NetworkManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: NetworkManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: NetworkManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | NetworkManagementClientOptionalParams,
    options?: NetworkManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createNetworkManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.usages = _getUsagesOperations(this._client);
    this.serviceTagInformation = _getServiceTagInformationOperations(this._client);
    this.serviceTags = _getServiceTagsOperations(this._client);
    this.bgpServiceCommunities = _getBgpServiceCommunitiesOperations(this._client);
    this.availablePrivateEndpointTypes = _getAvailablePrivateEndpointTypesOperations(this._client);
    this.networkSecurityPerimeterServiceTags = _getNetworkSecurityPerimeterServiceTagsOperations(
      this._client,
    );
    this.networkSecurityPerimeterOperationStatuses =
      _getNetworkSecurityPerimeterOperationStatusesOperations(this._client);
    this.networkSecurityPerimeterAssociableResourceTypes =
      _getNetworkSecurityPerimeterAssociableResourceTypesOperations(this._client);
    this.expressRouteServiceProviders = _getExpressRouteServiceProvidersOperations(this._client);
    this.availableEndpointServices = _getAvailableEndpointServicesOperations(this._client);
    this.azureFirewallFqdnTags = _getAzureFirewallFqdnTagsOperations(this._client);
    this.availableServiceAliases = _getAvailableServiceAliasesOperations(this._client);
    this.availableResourceGroupDelegations = _getAvailableResourceGroupDelegationsOperations(
      this._client,
    );
    this.availableDelegations = _getAvailableDelegationsOperations(this._client);
    this.routingIntent = _getRoutingIntentOperations(this._client);
    this.virtualHubIpConfiguration = _getVirtualHubIpConfigurationOperations(this._client);
    this.virtualHubBgpConnections = _getVirtualHubBgpConnectionsOperations(this._client);
    this.virtualHubBgpConnection = _getVirtualHubBgpConnectionOperations(this._client);
    this.expressRouteConnections = _getExpressRouteConnectionsOperations(this._client);
    this.p2SVpnGateways = _getP2SVpnGatewaysOperations(this._client);
    this.natRules = _getNatRulesOperations(this._client);
    this.vpnLinkConnections = _getVpnLinkConnectionsOperations(this._client);
    this.vpnConnections = _getVpnConnectionsOperations(this._client);
    this.virtualHubRouteTableV2S = _getVirtualHubRouteTableV2SOperations(this._client);
    this.hubVirtualNetworkConnections = _getHubVirtualNetworkConnectionsOperations(this._client);
    this.configurationPolicyGroups = _getConfigurationPolicyGroupsOperations(this._client);
    this.vpnServerConfigurationsAssociatedWithVirtualWan =
      _getVpnServerConfigurationsAssociatedWithVirtualWanOperations(this._client);
    this.vpnSitesConfiguration = _getVpnSitesConfigurationOperations(this._client);
    this.serviceAssociationLinks = _getServiceAssociationLinksOperations(this._client);
    this.resourceNavigationLinks = _getResourceNavigationLinksOperations(this._client);
    this.routeFilterRules = _getRouteFilterRulesOperations(this._client);
    this.privateDnsZoneGroups = _getPrivateDnsZoneGroupsOperations(this._client);
    this.connectionMonitors = _getConnectionMonitorsOperations(this._client);
    this.packetCaptures = _getPacketCapturesOperations(this._client);
    this.inboundSecurityRule = _getInboundSecurityRuleOperations(this._client);
    this.virtualApplianceSkus = _getVirtualApplianceSkusOperations(this._client);
    this.networkSecurityPerimeterLoggingConfigurations =
      _getNetworkSecurityPerimeterLoggingConfigurationsOperations(this._client);
    this.networkSecurityPerimeterLinkReferences =
      _getNetworkSecurityPerimeterLinkReferencesOperations(this._client);
    this.networkSecurityPerimeterLinks = _getNetworkSecurityPerimeterLinksOperations(this._client);
    this.networkSecurityPerimeterAssociations = _getNetworkSecurityPerimeterAssociationsOperations(
      this._client,
    );
    this.networkSecurityPerimeterAccessRules = _getNetworkSecurityPerimeterAccessRulesOperations(
      this._client,
    );
    this.networkSecurityPerimeterProfiles = _getNetworkSecurityPerimeterProfilesOperations(
      this._client,
    );
    this.adminRules = _getAdminRulesOperations(this._client);
    this.subscriptionNetworkManagerConnections =
      _getSubscriptionNetworkManagerConnectionsOperations(this._client);
    this.loadBalancerProbes = _getLoadBalancerProbesOperations(this._client);
    this.loadBalancerOutboundRules = _getLoadBalancerOutboundRulesOperations(this._client);
    this.loadBalancerLoadBalancingRules = _getLoadBalancerLoadBalancingRulesOperations(
      this._client,
    );
    this.loadBalancerFrontendIPConfigurations = _getLoadBalancerFrontendIPConfigurationsOperations(
      this._client,
    );
    this.loadBalancerBackendAddressPools = _getLoadBalancerBackendAddressPoolsOperations(
      this._client,
    );
    this.loadBalancerNetworkInterfaces = _getLoadBalancerNetworkInterfacesOperations(this._client);
    this.networkManagerDeploymentStatus = _getNetworkManagerDeploymentStatusOperations(
      this._client,
    );
    this.networkManagerCommits = _getNetworkManagerCommitsOperations(this._client);
    this.firewallPolicyDeployments = _getFirewallPolicyDeploymentsOperations(this._client);
    this.firewallPolicyIdpsSignaturesFilterValues =
      _getFirewallPolicyIdpsSignaturesFilterValuesOperations(this._client);
    this.firewallPolicyIdpsSignatures = _getFirewallPolicyIdpsSignaturesOperations(this._client);
    this.expressRouteLinks = _getExpressRouteLinksOperations(this._client);
    this.expressRouteCrossConnectionPeerings = _getExpressRouteCrossConnectionPeeringsOperations(
      this._client,
    );
    this.dscpConfiguration = _getDscpConfigurationOperations(this._client);
    this.customIPPrefixes = _getCustomIPPrefixesOperations(this._client);
    this.vipSwap = _getVipSwapOperations(this._client);
    this.networkInterfaceLoadBalancers = _getNetworkInterfaceLoadBalancersOperations(this._client);
    this.expressRouteProviderPortsLocation = _getExpressRouteProviderPortsLocationOperations(
      this._client,
    );
    this.webCategories = _getWebCategoriesOperations(this._client);
    this.applicationGatewayWafDynamicManifests =
      _getApplicationGatewayWafDynamicManifestsOperations(this._client);
    this.applicationGatewayWafDynamicManifestsDefault =
      _getApplicationGatewayWafDynamicManifestsDefaultOperations(this._client);
    this.applicationGatewayPrivateLinkResources =
      _getApplicationGatewayPrivateLinkResourcesOperations(this._client);
    this.serviceGateways = _getServiceGatewaysOperations(this._client);
    this.virtualNetworkAppliances = _getVirtualNetworkAppliancesOperations(this._client);
    this.webApplicationFirewallPolicies = _getWebApplicationFirewallPoliciesOperations(
      this._client,
    );
    this.hubRouteTables = _getHubRouteTablesOperations(this._client);
    this.expressRouteGateways = _getExpressRouteGatewaysOperations(this._client);
    this.vpnSiteLinkConnections = _getVpnSiteLinkConnectionsOperations(this._client);
    this.vpnGateways = _getVpnGatewaysOperations(this._client);
    this.routeMaps = _getRouteMapsOperations(this._client);
    this.virtualHubs = _getVirtualHubsOperations(this._client);
    this.vpnServerConfigurations = _getVpnServerConfigurationsOperations(this._client);
    this.vpnSiteLinks = _getVpnSiteLinksOperations(this._client);
    this.vpnSites = _getVpnSitesOperations(this._client);
    this.virtualWans = _getVirtualWansOperations(this._client);
    this.virtualRouterPeerings = _getVirtualRouterPeeringsOperations(this._client);
    this.virtualRouters = _getVirtualRoutersOperations(this._client);
    this.virtualNetworkTaps = _getVirtualNetworkTapsOperations(this._client);
    this.virtualNetworkGatewayNatRules = _getVirtualNetworkGatewayNatRulesOperations(this._client);
    this.localNetworkGateways = _getLocalNetworkGatewaysOperations(this._client);
    this.virtualNetworkGatewayConnections = _getVirtualNetworkGatewayConnectionsOperations(
      this._client,
    );
    this.virtualNetworkGateways = _getVirtualNetworkGatewaysOperations(this._client);
    this.virtualNetworkPeerings = _getVirtualNetworkPeeringsOperations(this._client);
    this.subnets = _getSubnetsOperations(this._client);
    this.virtualNetworks = _getVirtualNetworksOperations(this._client);
    this.serviceEndpointPolicyDefinitions = _getServiceEndpointPolicyDefinitionsOperations(
      this._client,
    );
    this.serviceEndpointPolicies = _getServiceEndpointPoliciesOperations(this._client);
    this.securityPartnerProviders = _getSecurityPartnerProvidersOperations(this._client);
    this.routes = _getRoutesOperations(this._client);
    this.routeTables = _getRouteTablesOperations(this._client);
    this.routeFilters = _getRouteFiltersOperations(this._client);
    this.publicIPPrefixes = _getPublicIPPrefixesOperations(this._client);
    this.privateLinkServices = _getPrivateLinkServicesOperations(this._client);
    this.privateEndpoints = _getPrivateEndpointsOperations(this._client);
    this.flowLogs = _getFlowLogsOperations(this._client);
    this.networkWatchers = _getNetworkWatchersOperations(this._client);
    this.virtualApplianceSites = _getVirtualApplianceSitesOperations(this._client);
    this.networkVirtualAppliances = _getNetworkVirtualAppliancesOperations(this._client);
    this.networkVirtualApplianceConnections = _getNetworkVirtualApplianceConnectionsOperations(
      this._client,
    );
    this.reachabilityAnalysisRuns = _getReachabilityAnalysisRunsOperations(this._client);
    this.verifierWorkspaces = _getVerifierWorkspacesOperations(this._client);
    this.reachabilityAnalysisIntents = _getReachabilityAnalysisIntentsOperations(this._client);
    this.networkSecurityPerimeters = _getNetworkSecurityPerimetersOperations(this._client);
    this.defaultSecurityRules = _getDefaultSecurityRulesOperations(this._client);
    this.securityRules = _getSecurityRulesOperations(this._client);
    this.networkSecurityGroups = _getNetworkSecurityGroupsOperations(this._client);
    this.networkProfiles = _getNetworkProfilesOperations(this._client);
    this.securityUserRules = _getSecurityUserRulesOperations(this._client);
    this.securityUserRuleCollections = _getSecurityUserRuleCollectionsOperations(this._client);
    this.securityUserConfigurations = _getSecurityUserConfigurationsOperations(this._client);
    this.adminRuleCollections = _getAdminRuleCollectionsOperations(this._client);
    this.securityAdminConfigurations = _getSecurityAdminConfigurationsOperations(this._client);
    this.scopeConnections = _getScopeConnectionsOperations(this._client);
    this.routingRules = _getRoutingRulesOperations(this._client);
    this.routingRuleCollections = _getRoutingRuleCollectionsOperations(this._client);
    this.networkManagerRoutingConfigurations = _getNetworkManagerRoutingConfigurationsOperations(
      this._client,
    );
    this.staticMembers = _getStaticMembersOperations(this._client);
    this.networkGroups = _getNetworkGroupsOperations(this._client);
    this.connectivityConfigurations = _getConnectivityConfigurationsOperations(this._client);
    this.managementGroupNetworkManagerConnections =
      _getManagementGroupNetworkManagerConnectionsOperations(this._client);
    this.networkInterfaceTapConfigurations = _getNetworkInterfaceTapConfigurationsOperations(
      this._client,
    );
    this.networkInterfaceIPConfigurations = _getNetworkInterfaceIPConfigurationsOperations(
      this._client,
    );
    this.natGateways = _getNatGatewaysOperations(this._client);
    this.inboundNatRules = _getInboundNatRulesOperations(this._client);
    this.loadBalancers = _getLoadBalancersOperations(this._client);
    this.ipGroups = _getIpGroupsOperations(this._client);
    this.ipAllocations = _getIpAllocationsOperations(this._client);
    this.staticCidrs = _getStaticCidrsOperations(this._client);
    this.networkManagers = _getNetworkManagersOperations(this._client);
    this.ipamPools = _getIpamPoolsOperations(this._client);
    this.firewallPolicyRuleCollectionGroupDrafts =
      _getFirewallPolicyRuleCollectionGroupDraftsOperations(this._client);
    this.firewallPolicyDrafts = _getFirewallPolicyDraftsOperations(this._client);
    this.firewallPolicyIdpsSignaturesOverrides =
      _getFirewallPolicyIdpsSignaturesOverridesOperations(this._client);
    this.firewallPolicyRuleCollectionGroups = _getFirewallPolicyRuleCollectionGroupsOperations(
      this._client,
    );
    this.firewallPolicies = _getFirewallPoliciesOperations(this._client);
    this.expressRoutePortAuthorizations = _getExpressRoutePortAuthorizationsOperations(
      this._client,
    );
    this.expressRoutePorts = _getExpressRoutePortsOperations(this._client);
    this.expressRoutePortsLocations = _getExpressRoutePortsLocationsOperations(this._client);
    this.expressRouteCrossConnections = _getExpressRouteCrossConnectionsOperations(this._client);
    this.peerExpressRouteCircuitConnections = _getPeerExpressRouteCircuitConnectionsOperations(
      this._client,
    );
    this.expressRouteCircuitConnections = _getExpressRouteCircuitConnectionsOperations(
      this._client,
    );
    this.expressRouteCircuitPeerings = _getExpressRouteCircuitPeeringsOperations(this._client);
    this.expressRouteCircuits = _getExpressRouteCircuitsOperations(this._client);
    this.expressRouteCircuitAuthorizations = _getExpressRouteCircuitAuthorizationsOperations(
      this._client,
    );
    this.ddosProtectionPlans = _getDdosProtectionPlansOperations(this._client);
    this.ddosCustomPolicies = _getDdosCustomPoliciesOperations(this._client);
    this.publicIPAddresses = _getPublicIPAddressesOperations(this._client);
    this.networkInterfaces = _getNetworkInterfacesOperations(this._client);
    this.bastionHosts = _getBastionHostsOperations(this._client);
    this.azureFirewalls = _getAzureFirewallsOperations(this._client);
    this.applicationSecurityGroups = _getApplicationSecurityGroupsOperations(this._client);
    this.applicationGatewayPrivateEndpointConnections =
      _getApplicationGatewayPrivateEndpointConnectionsOperations(this._client);
    this.applicationGateways = _getApplicationGatewaysOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Checks whether a domain name in the cloudapp.azure.com zone is available for use. */
  checkDnsNameAvailability(
    location: string,
    domainNameLabel: string,
    options: CheckDnsNameAvailabilityOptionalParams = { requestOptions: {} },
  ): Promise<DnsNameAvailabilityResult> {
    return checkDnsNameAvailability(this._client, location, domainNameLabel, options);
  }

  /** Generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration combination in the specified resource group. */
  generatevirtualwanvpnserverconfigurationvpnprofile(
    resourceGroupName: string,
    virtualWANName: string,
    vpnClientParams: VirtualWanVpnProfileParameters,
    options: GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams = {
      requestOptions: {},
    },
  ): PollerLike<OperationState<VpnProfileResponse>, VpnProfileResponse> {
    return generatevirtualwanvpnserverconfigurationvpnprofile(
      this._client,
      resourceGroupName,
      virtualWANName,
      vpnClientParams,
      options,
    );
  }

  /** @deprecated use generatevirtualwanvpnserverconfigurationvpnprofile instead */
  async beginGeneratevirtualwanvpnserverconfigurationvpnprofile(
    resourceGroupName: string,
    virtualWANName: string,
    vpnClientParams: VirtualWanVpnProfileParameters,
    options: GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams = {
      requestOptions: {},
    },
  ): Promise<SimplePollerLike<OperationState<VpnProfileResponse>, VpnProfileResponse>> {
    const poller = generatevirtualwanvpnserverconfigurationvpnprofile(
      this._client,
      resourceGroupName,
      virtualWANName,
      vpnClientParams,
      options,
    );
    await poller.submitted();
    return getSimplePoller(poller);
  }

  /** @deprecated use generatevirtualwanvpnserverconfigurationvpnprofile instead */
  async beginGeneratevirtualwanvpnserverconfigurationvpnprofileAndWait(
    resourceGroupName: string,
    virtualWANName: string,
    vpnClientParams: VirtualWanVpnProfileParameters,
    options: GeneratevirtualwanvpnserverconfigurationvpnprofileOptionalParams = {
      requestOptions: {},
    },
  ): Promise<VpnProfileResponse> {
    return await generatevirtualwanvpnserverconfigurationvpnprofile(
      this._client,
      resourceGroupName,
      virtualWANName,
      vpnClientParams,
      options,
    );
  }

  /** Gives the supported security providers for the virtual wan. */
  supportedSecurityProviders(
    resourceGroupName: string,
    virtualWANName: string,
    options: SupportedSecurityProvidersOptionalParams = { requestOptions: {} },
  ): Promise<VirtualWanSecurityProviders> {
    return supportedSecurityProviders(this._client, resourceGroupName, virtualWANName, options);
  }

  /** List all effective security admin rules applied on a virtual network. */
  listNetworkManagerEffectiveSecurityAdminRules(
    resourceGroupName: string,
    virtualNetworkName: string,
    parameters: QueryRequestOptions,
    options: ListNetworkManagerEffectiveSecurityAdminRulesOptionalParams = { requestOptions: {} },
  ): Promise<NetworkManagerEffectiveSecurityAdminRulesListResult> {
    return listNetworkManagerEffectiveSecurityAdminRules(
      this._client,
      resourceGroupName,
      virtualNetworkName,
      parameters,
      options,
    );
  }

  /** List all effective connectivity configurations applied on a virtual network. */
  listNetworkManagerEffectiveConnectivityConfigurations(
    resourceGroupName: string,
    virtualNetworkName: string,
    parameters: QueryRequestOptions,
    options: ListNetworkManagerEffectiveConnectivityConfigurationsOptionalParams = {
      requestOptions: {},
    },
  ): Promise<NetworkManagerEffectiveConnectivityConfigurationListResult> {
    return listNetworkManagerEffectiveConnectivityConfigurations(
      this._client,
      resourceGroupName,
      virtualNetworkName,
      parameters,
      options,
    );
  }

  /** Lists active security admin rules in a network manager. */
  listActiveSecurityAdminRules(
    resourceGroupName: string,
    networkManagerName: string,
    parameters: ActiveConfigurationParameter,
    options: ListActiveSecurityAdminRulesOptionalParams = { requestOptions: {} },
  ): Promise<ActiveSecurityAdminRulesListResult> {
    return listActiveSecurityAdminRules(
      this._client,
      resourceGroupName,
      networkManagerName,
      parameters,
      options,
    );
  }

  /** Lists active connectivity configurations in a network manager. */
  listActiveConnectivityConfigurations(
    resourceGroupName: string,
    networkManagerName: string,
    parameters: ActiveConfigurationParameter,
    options: ListActiveConnectivityConfigurationsOptionalParams = { requestOptions: {} },
  ): Promise<ActiveConnectivityConfigurationsListResult> {
    return listActiveConnectivityConfigurations(
      this._client,
      resourceGroupName,
      networkManagerName,
      parameters,
      options,
    );
  }

  /** Retrieves detail of a provider port. */
  expressRouteProviderPort(
    providerport: string,
    options: ExpressRouteProviderPortOptionalParams = { requestOptions: {} },
  ): Promise<ExpressRouteProviderPort> {
    return expressRouteProviderPort(this._client, providerport, options);
  }

  /** Returns the list of currently active sessions on the Bastion. */
  disconnectActiveSessions(
    resourceGroupName: string,
    bastionHostName: string,
    sessionIds: SessionIds,
    options: DisconnectActiveSessionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<BastionSessionState> {
    return disconnectActiveSessions(
      this._client,
      resourceGroupName,
      bastionHostName,
      sessionIds,
      options,
    );
  }

  /** Returns the list of currently active sessions on the Bastion. */
  getActiveSessions(
    resourceGroupName: string,
    bastionHostName: string,
    options: GetActiveSessionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<BastionActiveSession> {
    return getActiveSessions(this._client, resourceGroupName, bastionHostName, options);
  }

  /** @deprecated use getActiveSessions instead */
  beginListActiveSessionsAndWait(
    resourceGroupName: string,
    bastionHostName: string,
    options: GetActiveSessionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<BastionActiveSession> {
    return getActiveSessions(this._client, resourceGroupName, bastionHostName, options);
  }

  /** Return the Bastion Shareable Links for all the VMs specified in the request. */
  getBastionShareableLink(
    resourceGroupName: string,
    bastionHostName: string,
    bslRequest: BastionShareableLinkListRequest,
    options: GetBastionShareableLinkOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<BastionShareableLink> {
    return getBastionShareableLink(
      this._client,
      resourceGroupName,
      bastionHostName,
      bslRequest,
      options,
    );
  }

  /** Deletes the Bastion Shareable Links for all the tokens specified in the request. */
  deleteBastionShareableLinkByToken(
    resourceGroupName: string,
    bastionHostName: string,
    bslTokenRequest: BastionShareableLinkTokenListRequest,
    options: DeleteBastionShareableLinkByTokenOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<void>, void> {
    return deleteBastionShareableLinkByToken(
      this._client,
      resourceGroupName,
      bastionHostName,
      bslTokenRequest,
      options,
    );
  }

  /** @deprecated use deleteBastionShareableLinkByToken instead */
  async beginDeleteBastionShareableLinkByToken(
    resourceGroupName: string,
    bastionHostName: string,
    bslTokenRequest: BastionShareableLinkTokenListRequest,
    options: DeleteBastionShareableLinkByTokenOptionalParams = { requestOptions: {} },
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const poller = deleteBastionShareableLinkByToken(
      this._client,
      resourceGroupName,
      bastionHostName,
      bslTokenRequest,
      options,
    );
    await poller.submitted();
    return getSimplePoller(poller);
  }

  /** @deprecated use deleteBastionShareableLinkByToken instead */
  async beginDeleteBastionShareableLinkByTokenAndWait(
    resourceGroupName: string,
    bastionHostName: string,
    bslTokenRequest: BastionShareableLinkTokenListRequest,
    options: DeleteBastionShareableLinkByTokenOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return await deleteBastionShareableLinkByToken(
      this._client,
      resourceGroupName,
      bastionHostName,
      bslTokenRequest,
      options,
    );
  }

  /** Deletes the Bastion Shareable Links for all the VMs specified in the request. */
  deleteBastionShareableLink(
    resourceGroupName: string,
    bastionHostName: string,
    bslRequest: BastionShareableLinkListRequest,
    options: DeleteBastionShareableLinkOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<void>, void> {
    return deleteBastionShareableLink(
      this._client,
      resourceGroupName,
      bastionHostName,
      bslRequest,
      options,
    );
  }

  /** @deprecated use deleteBastionShareableLink instead */
  async beginDeleteBastionShareableLink(
    resourceGroupName: string,
    bastionHostName: string,
    bslRequest: BastionShareableLinkListRequest,
    options: DeleteBastionShareableLinkOptionalParams = { requestOptions: {} },
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const poller = deleteBastionShareableLink(
      this._client,
      resourceGroupName,
      bastionHostName,
      bslRequest,
      options,
    );
    await poller.submitted();
    return getSimplePoller(poller);
  }

  /** @deprecated use deleteBastionShareableLink instead */
  async beginDeleteBastionShareableLinkAndWait(
    resourceGroupName: string,
    bastionHostName: string,
    bslRequest: BastionShareableLinkListRequest,
    options: DeleteBastionShareableLinkOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return await deleteBastionShareableLink(
      this._client,
      resourceGroupName,
      bastionHostName,
      bslRequest,
      options,
    );
  }

  /** Creates a Bastion Shareable Links for all the VMs specified in the request. */
  putBastionShareableLink(
    resourceGroupName: string,
    bastionHostName: string,
    bslRequest: BastionShareableLinkListRequest,
    options: PutBastionShareableLinkOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<BastionShareableLink> {
    return putBastionShareableLink(
      this._client,
      resourceGroupName,
      bastionHostName,
      bslRequest,
      options,
    );
  }

  /** @deprecated use putBastionShareableLink instead */
  beginListPutBastionShareableLinkAndWait(
    resourceGroupName: string,
    bastionHostName: string,
    bslRequest: BastionShareableLinkListRequest,
    options: PutBastionShareableLinkOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<BastionShareableLink> {
    return putBastionShareableLink(
      this._client,
      resourceGroupName,
      bastionHostName,
      bslRequest,
      options,
    );
  }

  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for serviceTagInformation */
  public readonly serviceTagInformation: ServiceTagInformationOperations;
  /** The operation groups for serviceTags */
  public readonly serviceTags: ServiceTagsOperations;
  /** The operation groups for bgpServiceCommunities */
  public readonly bgpServiceCommunities: BgpServiceCommunitiesOperations;
  /** The operation groups for availablePrivateEndpointTypes */
  public readonly availablePrivateEndpointTypes: AvailablePrivateEndpointTypesOperations;
  /** The operation groups for networkSecurityPerimeterServiceTags */
  public readonly networkSecurityPerimeterServiceTags: NetworkSecurityPerimeterServiceTagsOperations;
  /** The operation groups for networkSecurityPerimeterOperationStatuses */
  public readonly networkSecurityPerimeterOperationStatuses: NetworkSecurityPerimeterOperationStatusesOperations;
  /** The operation groups for networkSecurityPerimeterAssociableResourceTypes */
  public readonly networkSecurityPerimeterAssociableResourceTypes: NetworkSecurityPerimeterAssociableResourceTypesOperations;
  /** The operation groups for expressRouteServiceProviders */
  public readonly expressRouteServiceProviders: ExpressRouteServiceProvidersOperations;
  /** The operation groups for availableEndpointServices */
  public readonly availableEndpointServices: AvailableEndpointServicesOperations;
  /** The operation groups for azureFirewallFqdnTags */
  public readonly azureFirewallFqdnTags: AzureFirewallFqdnTagsOperations;
  /** The operation groups for availableServiceAliases */
  public readonly availableServiceAliases: AvailableServiceAliasesOperations;
  /** The operation groups for availableResourceGroupDelegations */
  public readonly availableResourceGroupDelegations: AvailableResourceGroupDelegationsOperations;
  /** The operation groups for availableDelegations */
  public readonly availableDelegations: AvailableDelegationsOperations;
  /** The operation groups for routingIntent */
  public readonly routingIntent: RoutingIntentOperations;
  /** The operation groups for virtualHubIpConfiguration */
  public readonly virtualHubIpConfiguration: VirtualHubIpConfigurationOperations;
  /** The operation groups for virtualHubBgpConnections */
  public readonly virtualHubBgpConnections: VirtualHubBgpConnectionsOperations;
  /** The operation groups for virtualHubBgpConnection */
  public readonly virtualHubBgpConnection: VirtualHubBgpConnectionOperations;
  /** The operation groups for expressRouteConnections */
  public readonly expressRouteConnections: ExpressRouteConnectionsOperations;
  /** The operation groups for p2SVpnGateways */
  public readonly p2SVpnGateways: P2SVpnGatewaysOperations;
  /** The operation groups for natRules */
  public readonly natRules: NatRulesOperations;
  /** The operation groups for vpnLinkConnections */
  public readonly vpnLinkConnections: VpnLinkConnectionsOperations;
  /** The operation groups for vpnConnections */
  public readonly vpnConnections: VpnConnectionsOperations;
  /** The operation groups for virtualHubRouteTableV2S */
  public readonly virtualHubRouteTableV2S: VirtualHubRouteTableV2SOperations;
  /** The operation groups for hubVirtualNetworkConnections */
  public readonly hubVirtualNetworkConnections: HubVirtualNetworkConnectionsOperations;
  /** The operation groups for configurationPolicyGroups */
  public readonly configurationPolicyGroups: ConfigurationPolicyGroupsOperations;
  /** The operation groups for vpnServerConfigurationsAssociatedWithVirtualWan */
  public readonly vpnServerConfigurationsAssociatedWithVirtualWan: VpnServerConfigurationsAssociatedWithVirtualWanOperations;
  /** The operation groups for vpnSitesConfiguration */
  public readonly vpnSitesConfiguration: VpnSitesConfigurationOperations;
  /** The operation groups for serviceAssociationLinks */
  public readonly serviceAssociationLinks: ServiceAssociationLinksOperations;
  /** The operation groups for resourceNavigationLinks */
  public readonly resourceNavigationLinks: ResourceNavigationLinksOperations;
  /** The operation groups for routeFilterRules */
  public readonly routeFilterRules: RouteFilterRulesOperations;
  /** The operation groups for privateDnsZoneGroups */
  public readonly privateDnsZoneGroups: PrivateDnsZoneGroupsOperations;
  /** The operation groups for connectionMonitors */
  public readonly connectionMonitors: ConnectionMonitorsOperations;
  /** The operation groups for packetCaptures */
  public readonly packetCaptures: PacketCapturesOperations;
  /** The operation groups for inboundSecurityRule */
  public readonly inboundSecurityRule: InboundSecurityRuleOperations;
  /** The operation groups for virtualApplianceSkus */
  public readonly virtualApplianceSkus: VirtualApplianceSkusOperations;
  /** The operation groups for networkSecurityPerimeterLoggingConfigurations */
  public readonly networkSecurityPerimeterLoggingConfigurations: NetworkSecurityPerimeterLoggingConfigurationsOperations;
  /** The operation groups for networkSecurityPerimeterLinkReferences */
  public readonly networkSecurityPerimeterLinkReferences: NetworkSecurityPerimeterLinkReferencesOperations;
  /** The operation groups for networkSecurityPerimeterLinks */
  public readonly networkSecurityPerimeterLinks: NetworkSecurityPerimeterLinksOperations;
  /** The operation groups for networkSecurityPerimeterAssociations */
  public readonly networkSecurityPerimeterAssociations: NetworkSecurityPerimeterAssociationsOperations;
  /** The operation groups for networkSecurityPerimeterAccessRules */
  public readonly networkSecurityPerimeterAccessRules: NetworkSecurityPerimeterAccessRulesOperations;
  /** The operation groups for networkSecurityPerimeterProfiles */
  public readonly networkSecurityPerimeterProfiles: NetworkSecurityPerimeterProfilesOperations;
  /** The operation groups for adminRules */
  public readonly adminRules: AdminRulesOperations;
  /** The operation groups for subscriptionNetworkManagerConnections */
  public readonly subscriptionNetworkManagerConnections: SubscriptionNetworkManagerConnectionsOperations;
  /** The operation groups for loadBalancerProbes */
  public readonly loadBalancerProbes: LoadBalancerProbesOperations;
  /** The operation groups for loadBalancerOutboundRules */
  public readonly loadBalancerOutboundRules: LoadBalancerOutboundRulesOperations;
  /** The operation groups for loadBalancerLoadBalancingRules */
  public readonly loadBalancerLoadBalancingRules: LoadBalancerLoadBalancingRulesOperations;
  /** The operation groups for loadBalancerFrontendIPConfigurations */
  public readonly loadBalancerFrontendIPConfigurations: LoadBalancerFrontendIPConfigurationsOperations;
  /** The operation groups for loadBalancerBackendAddressPools */
  public readonly loadBalancerBackendAddressPools: LoadBalancerBackendAddressPoolsOperations;
  /** The operation groups for loadBalancerNetworkInterfaces */
  public readonly loadBalancerNetworkInterfaces: LoadBalancerNetworkInterfacesOperations;
  /** The operation groups for networkManagerDeploymentStatus */
  public readonly networkManagerDeploymentStatus: NetworkManagerDeploymentStatusOperations;
  /** The operation groups for networkManagerCommits */
  public readonly networkManagerCommits: NetworkManagerCommitsOperations;
  /** The operation groups for firewallPolicyDeployments */
  public readonly firewallPolicyDeployments: FirewallPolicyDeploymentsOperations;
  /** The operation groups for firewallPolicyIdpsSignaturesFilterValues */
  public readonly firewallPolicyIdpsSignaturesFilterValues: FirewallPolicyIdpsSignaturesFilterValuesOperations;
  /** The operation groups for firewallPolicyIdpsSignatures */
  public readonly firewallPolicyIdpsSignatures: FirewallPolicyIdpsSignaturesOperations;
  /** The operation groups for expressRouteLinks */
  public readonly expressRouteLinks: ExpressRouteLinksOperations;
  /** The operation groups for expressRouteCrossConnectionPeerings */
  public readonly expressRouteCrossConnectionPeerings: ExpressRouteCrossConnectionPeeringsOperations;
  /** The operation groups for dscpConfiguration */
  public readonly dscpConfiguration: DscpConfigurationOperations;
  /** The operation groups for customIPPrefixes */
  public readonly customIPPrefixes: CustomIPPrefixesOperations;
  /** The operation groups for vipSwap */
  public readonly vipSwap: VipSwapOperations;
  /** The operation groups for networkInterfaceLoadBalancers */
  public readonly networkInterfaceLoadBalancers: NetworkInterfaceLoadBalancersOperations;
  /** The operation groups for expressRouteProviderPortsLocation */
  public readonly expressRouteProviderPortsLocation: ExpressRouteProviderPortsLocationOperations;
  /** The operation groups for webCategories */
  public readonly webCategories: WebCategoriesOperations;
  /** The operation groups for applicationGatewayWafDynamicManifests */
  public readonly applicationGatewayWafDynamicManifests: ApplicationGatewayWafDynamicManifestsOperations;
  /** The operation groups for applicationGatewayWafDynamicManifestsDefault */
  public readonly applicationGatewayWafDynamicManifestsDefault: ApplicationGatewayWafDynamicManifestsDefaultOperations;
  /** The operation groups for applicationGatewayPrivateLinkResources */
  public readonly applicationGatewayPrivateLinkResources: ApplicationGatewayPrivateLinkResourcesOperations;
  /** The operation groups for serviceGateways */
  public readonly serviceGateways: ServiceGatewaysOperations;
  /** The operation groups for virtualNetworkAppliances */
  public readonly virtualNetworkAppliances: VirtualNetworkAppliancesOperations;
  /** The operation groups for webApplicationFirewallPolicies */
  public readonly webApplicationFirewallPolicies: WebApplicationFirewallPoliciesOperations;
  /** The operation groups for hubRouteTables */
  public readonly hubRouteTables: HubRouteTablesOperations;
  /** The operation groups for expressRouteGateways */
  public readonly expressRouteGateways: ExpressRouteGatewaysOperations;
  /** The operation groups for vpnSiteLinkConnections */
  public readonly vpnSiteLinkConnections: VpnSiteLinkConnectionsOperations;
  /** The operation groups for vpnGateways */
  public readonly vpnGateways: VpnGatewaysOperations;
  /** The operation groups for routeMaps */
  public readonly routeMaps: RouteMapsOperations;
  /** The operation groups for virtualHubs */
  public readonly virtualHubs: VirtualHubsOperations;
  /** The operation groups for vpnServerConfigurations */
  public readonly vpnServerConfigurations: VpnServerConfigurationsOperations;
  /** The operation groups for vpnSiteLinks */
  public readonly vpnSiteLinks: VpnSiteLinksOperations;
  /** The operation groups for vpnSites */
  public readonly vpnSites: VpnSitesOperations;
  /** The operation groups for virtualWans */
  public readonly virtualWans: VirtualWansOperations;
  /** The operation groups for virtualRouterPeerings */
  public readonly virtualRouterPeerings: VirtualRouterPeeringsOperations;
  /** The operation groups for virtualRouters */
  public readonly virtualRouters: VirtualRoutersOperations;
  /** The operation groups for virtualNetworkTaps */
  public readonly virtualNetworkTaps: VirtualNetworkTapsOperations;
  /** The operation groups for virtualNetworkGatewayNatRules */
  public readonly virtualNetworkGatewayNatRules: VirtualNetworkGatewayNatRulesOperations;
  /** The operation groups for localNetworkGateways */
  public readonly localNetworkGateways: LocalNetworkGatewaysOperations;
  /** The operation groups for virtualNetworkGatewayConnections */
  public readonly virtualNetworkGatewayConnections: VirtualNetworkGatewayConnectionsOperations;
  /** The operation groups for virtualNetworkGateways */
  public readonly virtualNetworkGateways: VirtualNetworkGatewaysOperations;
  /** The operation groups for virtualNetworkPeerings */
  public readonly virtualNetworkPeerings: VirtualNetworkPeeringsOperations;
  /** The operation groups for subnets */
  public readonly subnets: SubnetsOperations;
  /** The operation groups for virtualNetworks */
  public readonly virtualNetworks: VirtualNetworksOperations;
  /** The operation groups for serviceEndpointPolicyDefinitions */
  public readonly serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinitionsOperations;
  /** The operation groups for serviceEndpointPolicies */
  public readonly serviceEndpointPolicies: ServiceEndpointPoliciesOperations;
  /** The operation groups for securityPartnerProviders */
  public readonly securityPartnerProviders: SecurityPartnerProvidersOperations;
  /** The operation groups for routes */
  public readonly routes: RoutesOperations;
  /** The operation groups for routeTables */
  public readonly routeTables: RouteTablesOperations;
  /** The operation groups for routeFilters */
  public readonly routeFilters: RouteFiltersOperations;
  /** The operation groups for publicIPPrefixes */
  public readonly publicIPPrefixes: PublicIPPrefixesOperations;
  /** The operation groups for privateLinkServices */
  public readonly privateLinkServices: PrivateLinkServicesOperations;
  /** The operation groups for privateEndpoints */
  public readonly privateEndpoints: PrivateEndpointsOperations;
  /** The operation groups for flowLogs */
  public readonly flowLogs: FlowLogsOperations;
  /** The operation groups for networkWatchers */
  public readonly networkWatchers: NetworkWatchersOperations;
  /** The operation groups for virtualApplianceSites */
  public readonly virtualApplianceSites: VirtualApplianceSitesOperations;
  /** The operation groups for networkVirtualAppliances */
  public readonly networkVirtualAppliances: NetworkVirtualAppliancesOperations;
  /** The operation groups for networkVirtualApplianceConnections */
  public readonly networkVirtualApplianceConnections: NetworkVirtualApplianceConnectionsOperations;
  /** The operation groups for reachabilityAnalysisRuns */
  public readonly reachabilityAnalysisRuns: ReachabilityAnalysisRunsOperations;
  /** The operation groups for verifierWorkspaces */
  public readonly verifierWorkspaces: VerifierWorkspacesOperations;
  /** The operation groups for reachabilityAnalysisIntents */
  public readonly reachabilityAnalysisIntents: ReachabilityAnalysisIntentsOperations;
  /** The operation groups for networkSecurityPerimeters */
  public readonly networkSecurityPerimeters: NetworkSecurityPerimetersOperations;
  /** The operation groups for defaultSecurityRules */
  public readonly defaultSecurityRules: DefaultSecurityRulesOperations;
  /** The operation groups for securityRules */
  public readonly securityRules: SecurityRulesOperations;
  /** The operation groups for networkSecurityGroups */
  public readonly networkSecurityGroups: NetworkSecurityGroupsOperations;
  /** The operation groups for networkProfiles */
  public readonly networkProfiles: NetworkProfilesOperations;
  /** The operation groups for securityUserRules */
  public readonly securityUserRules: SecurityUserRulesOperations;
  /** The operation groups for securityUserRuleCollections */
  public readonly securityUserRuleCollections: SecurityUserRuleCollectionsOperations;
  /** The operation groups for securityUserConfigurations */
  public readonly securityUserConfigurations: SecurityUserConfigurationsOperations;
  /** The operation groups for adminRuleCollections */
  public readonly adminRuleCollections: AdminRuleCollectionsOperations;
  /** The operation groups for securityAdminConfigurations */
  public readonly securityAdminConfigurations: SecurityAdminConfigurationsOperations;
  /** The operation groups for scopeConnections */
  public readonly scopeConnections: ScopeConnectionsOperations;
  /** The operation groups for routingRules */
  public readonly routingRules: RoutingRulesOperations;
  /** The operation groups for routingRuleCollections */
  public readonly routingRuleCollections: RoutingRuleCollectionsOperations;
  /** The operation groups for networkManagerRoutingConfigurations */
  public readonly networkManagerRoutingConfigurations: NetworkManagerRoutingConfigurationsOperations;
  /** The operation groups for staticMembers */
  public readonly staticMembers: StaticMembersOperations;
  /** The operation groups for networkGroups */
  public readonly networkGroups: NetworkGroupsOperations;
  /** The operation groups for connectivityConfigurations */
  public readonly connectivityConfigurations: ConnectivityConfigurationsOperations;
  /** The operation groups for managementGroupNetworkManagerConnections */
  public readonly managementGroupNetworkManagerConnections: ManagementGroupNetworkManagerConnectionsOperations;
  /** The operation groups for networkInterfaceTapConfigurations */
  public readonly networkInterfaceTapConfigurations: NetworkInterfaceTapConfigurationsOperations;
  /** The operation groups for networkInterfaceIPConfigurations */
  public readonly networkInterfaceIPConfigurations: NetworkInterfaceIPConfigurationsOperations;
  /** The operation groups for natGateways */
  public readonly natGateways: NatGatewaysOperations;
  /** The operation groups for inboundNatRules */
  public readonly inboundNatRules: InboundNatRulesOperations;
  /** The operation groups for loadBalancers */
  public readonly loadBalancers: LoadBalancersOperations;
  /** The operation groups for ipGroups */
  public readonly ipGroups: IpGroupsOperations;
  /** The operation groups for ipAllocations */
  public readonly ipAllocations: IpAllocationsOperations;
  /** The operation groups for staticCidrs */
  public readonly staticCidrs: StaticCidrsOperations;
  /** The operation groups for networkManagers */
  public readonly networkManagers: NetworkManagersOperations;
  /** The operation groups for ipamPools */
  public readonly ipamPools: IpamPoolsOperations;
  /** The operation groups for firewallPolicyRuleCollectionGroupDrafts */
  public readonly firewallPolicyRuleCollectionGroupDrafts: FirewallPolicyRuleCollectionGroupDraftsOperations;
  /** The operation groups for firewallPolicyDrafts */
  public readonly firewallPolicyDrafts: FirewallPolicyDraftsOperations;
  /** The operation groups for firewallPolicyIdpsSignaturesOverrides */
  public readonly firewallPolicyIdpsSignaturesOverrides: FirewallPolicyIdpsSignaturesOverridesOperations;
  /** The operation groups for firewallPolicyRuleCollectionGroups */
  public readonly firewallPolicyRuleCollectionGroups: FirewallPolicyRuleCollectionGroupsOperations;
  /** The operation groups for firewallPolicies */
  public readonly firewallPolicies: FirewallPoliciesOperations;
  /** The operation groups for expressRoutePortAuthorizations */
  public readonly expressRoutePortAuthorizations: ExpressRoutePortAuthorizationsOperations;
  /** The operation groups for expressRoutePorts */
  public readonly expressRoutePorts: ExpressRoutePortsOperations;
  /** The operation groups for expressRoutePortsLocations */
  public readonly expressRoutePortsLocations: ExpressRoutePortsLocationsOperations;
  /** The operation groups for expressRouteCrossConnections */
  public readonly expressRouteCrossConnections: ExpressRouteCrossConnectionsOperations;
  /** The operation groups for peerExpressRouteCircuitConnections */
  public readonly peerExpressRouteCircuitConnections: PeerExpressRouteCircuitConnectionsOperations;
  /** The operation groups for expressRouteCircuitConnections */
  public readonly expressRouteCircuitConnections: ExpressRouteCircuitConnectionsOperations;
  /** The operation groups for expressRouteCircuitPeerings */
  public readonly expressRouteCircuitPeerings: ExpressRouteCircuitPeeringsOperations;
  /** The operation groups for expressRouteCircuits */
  public readonly expressRouteCircuits: ExpressRouteCircuitsOperations;
  /** The operation groups for expressRouteCircuitAuthorizations */
  public readonly expressRouteCircuitAuthorizations: ExpressRouteCircuitAuthorizationsOperations;
  /** The operation groups for ddosProtectionPlans */
  public readonly ddosProtectionPlans: DdosProtectionPlansOperations;
  /** The operation groups for ddosCustomPolicies */
  public readonly ddosCustomPolicies: DdosCustomPoliciesOperations;
  /** The operation groups for publicIPAddresses */
  public readonly publicIPAddresses: PublicIPAddressesOperations;
  /** The operation groups for networkInterfaces */
  public readonly networkInterfaces: NetworkInterfacesOperations;
  /** The operation groups for bastionHosts */
  public readonly bastionHosts: BastionHostsOperations;
  /** The operation groups for azureFirewalls */
  public readonly azureFirewalls: AzureFirewallsOperations;
  /** The operation groups for applicationSecurityGroups */
  public readonly applicationSecurityGroups: ApplicationSecurityGroupsOperations;
  /** The operation groups for applicationGatewayPrivateEndpointConnections */
  public readonly applicationGatewayPrivateEndpointConnections: ApplicationGatewayPrivateEndpointConnectionsOperations;
  /** The operation groups for applicationGateways */
  public readonly applicationGateways: ApplicationGatewaysOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
