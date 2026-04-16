// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "@azure-rest/core-client";
import type {
  CloudErrorOutput,
  ApplicationGatewayOutput,
  ApplicationGatewayListResultOutput,
  ApplicationGatewayBackendHealthOutput,
  ApplicationGatewayBackendHealthOnDemandOutput,
  ErrorModelOutput,
  ApplicationGatewayAvailableWafRuleSetsResultOutput,
  ApplicationGatewayAvailableSslOptionsOutput,
  ApplicationGatewayAvailableSslPredefinedPoliciesOutput,
  ApplicationGatewaySslPredefinedPolicyOutput,
  ApplicationGatewayPrivateLinkResourceListResultOutput,
  ApplicationGatewayPrivateEndpointConnectionOutput,
  ApplicationGatewayPrivateEndpointConnectionListResultOutput,
  ApplicationGatewayWafDynamicManifestResultOutput,
  ApplicationGatewayWafDynamicManifestResultListOutput,
  ApplicationSecurityGroupOutput,
  ApplicationSecurityGroupListResultOutput,
  AvailableDelegationsResultOutput,
  AvailableServiceAliasesResultOutput,
  AzureFirewallOutput,
  AzureFirewallListResultOutput,
  IPPrefixesListOutput,
  AzureFirewallFqdnTagListResultOutput,
  AzureWebCategoryOutput,
  AzureWebCategoryListResultOutput,
  BastionHostOutput,
  BastionHostListResultOutput,
  BastionShareableLinkListResultOutput,
  BastionActiveSessionListResultOutput,
  BastionSessionDeleteResultOutput,
  DnsNameAvailabilityResultOutput,
  ExpressRouteProviderPortOutput,
  ActiveConnectivityConfigurationsListResultOutput,
  ActiveSecurityAdminRulesListResultOutput,
  NetworkManagerEffectiveConnectivityConfigurationListResultOutput,
  NetworkManagerEffectiveSecurityAdminRulesListResultOutput,
  VirtualWanSecurityProvidersOutput,
  VpnProfileResponseOutput,
  NetworkInterfaceListResultOutput,
  NetworkInterfaceOutput,
  EffectiveRouteListResultOutput,
  EffectiveNetworkSecurityGroupListResultOutput,
  NetworkInterfaceIPConfigurationListResultOutput,
  NetworkInterfaceIPConfigurationOutput,
  PublicIPAddressListResultOutput,
  PublicIPAddressOutput,
  PublicIpDdosProtectionStatusResultOutput,
  CustomIpPrefixOutput,
  CustomIpPrefixListResultOutput,
  DdosCustomPolicyOutput,
  DdosProtectionPlanOutput,
  DdosProtectionPlanListResultOutput,
  DscpConfigurationOutput,
  DscpConfigurationListResultOutput,
  EndpointServicesListResultOutput,
  ExpressRouteCircuitAuthorizationOutput,
  AuthorizationListResultOutput,
  ExpressRouteCircuitPeeringOutput,
  ExpressRouteCircuitPeeringListResultOutput,
  ExpressRouteCircuitConnectionOutput,
  ExpressRouteCircuitConnectionListResultOutput,
  PeerExpressRouteCircuitConnectionOutput,
  PeerExpressRouteCircuitConnectionListResultOutput,
  ExpressRouteCircuitOutput,
  ExpressRouteCircuitsArpTableListResultOutput,
  ExpressRouteCircuitsRoutesTableListResultOutput,
  ExpressRouteCircuitsRoutesTableSummaryListResultOutput,
  ExpressRouteCircuitStatsOutput,
  ExpressRouteCircuitListResultOutput,
  ExpressRouteServiceProviderListResultOutput,
  ExpressRouteCrossConnectionListResultOutput,
  ExpressRouteCrossConnectionOutput,
  ExpressRouteCrossConnectionsRoutesTableSummaryListResultOutput,
  ExpressRouteCrossConnectionPeeringListOutput,
  ExpressRouteCrossConnectionPeeringOutput,
  ExpressRoutePortsLocationListResultOutput,
  ExpressRoutePortsLocationOutput,
  ExpressRoutePortOutput,
  ExpressRoutePortListResultOutput,
  GenerateExpressRoutePortsLOAResultOutput,
  ExpressRouteLinkOutput,
  ExpressRouteLinkListResultOutput,
  ExpressRoutePortAuthorizationOutput,
  ExpressRoutePortAuthorizationListResultOutput,
  ExpressRouteProviderPortListResultOutput,
  FirewallPolicyOutput,
  FirewallPolicyListResultOutput,
  FirewallPolicyRuleCollectionGroupOutput,
  FirewallPolicyRuleCollectionGroupListResultOutput,
  QueryResultsOutput,
  SignaturesOverridesOutput,
  SignaturesOverridesListOutput,
  SignatureOverridesFilterValuesResponseOutput,
  IpAllocationOutput,
  IpAllocationListResultOutput,
  IpGroupOutput,
  IpGroupListResultOutput,
  LoadBalancerOutput,
  LoadBalancerListResultOutput,
  BackendAddressInboundNatRulePortMappingsOutput,
  LoadBalancerBackendAddressPoolListResultOutput,
  BackendAddressPoolOutput,
  LoadBalancerFrontendIPConfigurationListResultOutput,
  FrontendIPConfigurationOutput,
  InboundNatRuleListResultOutput,
  InboundNatRuleOutput,
  LoadBalancerLoadBalancingRuleListResultOutput,
  LoadBalancingRuleOutput,
  LoadBalancerOutboundRuleListResultOutput,
  OutboundRuleOutput,
  LoadBalancerProbeListResultOutput,
  ProbeOutput,
  NatGatewayOutput,
  NatGatewayListResultOutput,
  NetworkInterfaceLoadBalancerListResultOutput,
  NetworkInterfaceTapConfigurationOutput,
  NetworkInterfaceTapConfigurationListResultOutput,
  NetworkManagerOutput,
  NetworkManagerListResultOutput,
  NetworkManagerCommitOutput,
  NetworkManagerDeploymentStatusListResultOutput,
  NetworkManagerConnectionOutput,
  NetworkManagerConnectionListResultOutput,
  ConnectivityConfigurationOutput,
  ConnectivityConfigurationListResultOutput,
  NetworkGroupOutput,
  NetworkGroupListResultOutput,
  StaticMemberOutput,
  StaticMemberListResultOutput,
  ScopeConnectionOutput,
  ScopeConnectionListResultOutput,
  SecurityAdminConfigurationListResultOutput,
  SecurityAdminConfigurationOutput,
  AdminRuleCollectionListResultOutput,
  AdminRuleCollectionOutput,
  AdminRuleListResultOutput,
  BaseAdminRuleOutput,
  NetworkProfileOutput,
  NetworkProfileListResultOutput,
  NetworkSecurityGroupOutput,
  NetworkSecurityGroupListResultOutput,
  SecurityRuleOutput,
  SecurityRuleListResultOutput,
  NetworkVirtualApplianceOutput,
  NetworkVirtualApplianceListResultOutput,
  VirtualApplianceSiteOutput,
  NetworkVirtualApplianceSiteListResultOutput,
  NetworkVirtualApplianceSkuListResultOutput,
  NetworkVirtualApplianceSkuOutput,
  InboundSecurityRuleOutput,
  NetworkWatcherOutput,
  ErrorResponseOutput,
  NetworkWatcherListResultOutput,
  TopologyOutput,
  VerificationIPFlowResultOutput,
  NextHopResultOutput,
  SecurityGroupViewResultOutput,
  TroubleshootingResultOutput,
  FlowLogInformationOutput,
  ConnectivityInformationOutput,
  AzureReachabilityReportOutput,
  AvailableProvidersListOutput,
  NetworkConfigurationDiagnosticResponseOutput,
  PacketCaptureResultOutput,
  PacketCaptureQueryStatusResultOutput,
  PacketCaptureListResultOutput,
  ConnectionMonitorResultOutput,
  ConnectionMonitorQueryResultOutput,
  ConnectionMonitorListResultOutput,
  FlowLogOutput,
  FlowLogListResultOutput,
  OperationListResultOutput,
  PrivateEndpointOutput,
  PrivateEndpointListResultOutput,
  AvailablePrivateEndpointTypesResultOutput,
  PrivateDnsZoneGroupOutput,
  PrivateDnsZoneGroupListResultOutput,
  PrivateLinkServiceOutput,
  PrivateLinkServiceListResultOutput,
  PrivateEndpointConnectionOutput,
  PrivateEndpointConnectionListResultOutput,
  PrivateLinkServiceVisibilityOutput,
  AutoApprovedPrivateLinkServicesResultOutput,
  PublicIPPrefixOutput,
  PublicIPPrefixListResultOutput,
  RouteFilterOutput,
  RouteFilterListResultOutput,
  RouteFilterRuleOutput,
  RouteFilterRuleListResultOutput,
  RouteTableOutput,
  RouteTableListResultOutput,
  RouteOutput,
  RouteListResultOutput,
  SecurityPartnerProviderOutput,
  SecurityPartnerProviderListResultOutput,
  BgpServiceCommunityListResultOutput,
  ServiceEndpointPolicyOutput,
  ServiceEndpointPolicyListResultOutput,
  ServiceEndpointPolicyDefinitionOutput,
  ServiceEndpointPolicyDefinitionListResultOutput,
  ServiceTagsListResultOutput,
  ServiceTagInformationListResultOutput,
  UsagesListResultOutput,
  VirtualNetworkOutput,
  VirtualNetworkListResultOutput,
  IPAddressAvailabilityResultOutput,
  VirtualNetworkListUsageResultOutput,
  VirtualNetworkDdosProtectionStatusResultOutput,
  SubnetOutput,
  SubnetListResultOutput,
  ResourceNavigationLinksListResultOutput,
  ServiceAssociationLinksListResultOutput,
  VirtualNetworkPeeringOutput,
  VirtualNetworkPeeringListResultOutput,
  VirtualNetworkGatewayOutput,
  VirtualNetworkGatewayListResultOutput,
  VirtualNetworkGatewayListConnectionsResultOutput,
  BgpPeerStatusListResultOutput,
  GatewayRouteListResultOutput,
  VpnClientIPsecParametersOutput,
  VpnClientConnectionHealthDetailListResultOutput,
  VirtualNetworkGatewayConnectionOutput,
  ConnectionSharedKeyOutput,
  VirtualNetworkGatewayConnectionListResultOutput,
  ConnectionResetSharedKeyOutput,
  LocalNetworkGatewayOutput,
  LocalNetworkGatewayListResultOutput,
  VirtualNetworkGatewayNatRuleOutput,
  ListVirtualNetworkGatewayNatRulesResultOutput,
  VirtualNetworkTapOutput,
  VirtualNetworkTapListResultOutput,
  VirtualRouterOutput,
  VirtualRouterListResultOutput,
  VirtualRouterPeeringOutput,
  VirtualRouterPeeringListResultOutput,
  VirtualWANOutput,
  ListVirtualWANsResultOutput,
  VpnSiteOutput,
  ListVpnSitesResultOutput,
  VpnSiteLinkOutput,
  ListVpnSiteLinksResultOutput,
  VpnServerConfigurationOutput,
  ListVpnServerConfigurationsResultOutput,
  VpnServerConfigurationPolicyGroupOutput,
  ListVpnServerConfigurationPolicyGroupsResultOutput,
  VirtualHubOutput,
  ListVirtualHubsResultOutput,
  RouteMapOutput,
  ListRouteMapsResultOutput,
  HubVirtualNetworkConnectionOutput,
  ListHubVirtualNetworkConnectionsResultOutput,
  VpnGatewayOutput,
  ListVpnGatewaysResultOutput,
  ListVpnSiteLinkConnectionsResultOutput,
  VpnConnectionOutput,
  ListVpnConnectionsResultOutput,
  VpnSiteLinkConnectionOutput,
  VpnGatewayNatRuleOutput,
  ListVpnGatewayNatRulesResultOutput,
  P2SVpnGatewayOutput,
  ListP2SVpnGatewaysResultOutput,
  P2SVpnConnectionHealthOutput,
  VpnServerConfigurationsResponseOutput,
  VirtualHubRouteTableV2Output,
  ListVirtualHubRouteTableV2SResultOutput,
  ExpressRouteGatewayListOutput,
  ExpressRouteGatewayOutput,
  ExpressRouteConnectionOutput,
  ExpressRouteConnectionListOutput,
  BgpConnectionOutput,
  ListVirtualHubBgpConnectionResultsOutput,
  PeerRouteListOutput,
  HubIpConfigurationOutput,
  ListVirtualHubIpConfigurationResultsOutput,
  HubRouteTableOutput,
  ListHubRouteTablesResultOutput,
  RoutingIntentOutput,
  ListRoutingIntentResultOutput,
  WebApplicationFirewallPolicyListResultOutput,
  WebApplicationFirewallPolicyOutput,
  SwapResourceOutput,
  SwapResourceListResultOutput,
} from "./outputModels.js";

/** Deletes the specified application gateway. */
export interface ApplicationGatewaysDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified application gateway. */
export interface ApplicationGatewaysDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified application gateway. */
export interface ApplicationGatewaysDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified application gateway. */
export interface ApplicationGatewaysDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified application gateway. */
export interface ApplicationGatewaysGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayOutput;
}

/** Gets the specified application gateway. */
export interface ApplicationGatewaysGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates the specified application gateway. */
export interface ApplicationGatewaysCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayOutput;
}

/** Creates or updates the specified application gateway. */
export interface ApplicationGatewaysCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ApplicationGatewayOutput;
}

/** Creates or updates the specified application gateway. */
export interface ApplicationGatewaysCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates the specified application gateway tags. */
export interface ApplicationGatewaysUpdateTags200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayOutput;
}

/** Updates the specified application gateway tags. */
export interface ApplicationGatewaysUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all application gateways in a resource group. */
export interface ApplicationGatewaysList200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayListResultOutput;
}

/** Lists all application gateways in a resource group. */
export interface ApplicationGatewaysListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the application gateways in a subscription. */
export interface ApplicationGatewaysListAll200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayListResultOutput;
}

/** Gets all the application gateways in a subscription. */
export interface ApplicationGatewaysListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Starts the specified application gateway. */
export interface ApplicationGatewaysStart200Response extends HttpResponse {
  status: "200";
}

/** Starts the specified application gateway. */
export interface ApplicationGatewaysStart202Response extends HttpResponse {
  status: "202";
}

/** Starts the specified application gateway. */
export interface ApplicationGatewaysStartDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Stops the specified application gateway in a resource group. */
export interface ApplicationGatewaysStop200Response extends HttpResponse {
  status: "200";
}

/** Stops the specified application gateway in a resource group. */
export interface ApplicationGatewaysStop202Response extends HttpResponse {
  status: "202";
}

/** Stops the specified application gateway in a resource group. */
export interface ApplicationGatewaysStopDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the backend health of the specified application gateway in a resource group. */
export interface ApplicationGatewaysBackendHealth200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayBackendHealthOutput;
}

/** Gets the backend health of the specified application gateway in a resource group. */
export interface ApplicationGatewaysBackendHealth202Response extends HttpResponse {
  status: "202";
}

/** Gets the backend health of the specified application gateway in a resource group. */
export interface ApplicationGatewaysBackendHealthDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the backend health for given combination of backend pool and http setting of the specified application gateway in a resource group. */
export interface ApplicationGatewaysBackendHealthOnDemand200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayBackendHealthOnDemandOutput;
}

/** Gets the backend health for given combination of backend pool and http setting of the specified application gateway in a resource group. */
export interface ApplicationGatewaysBackendHealthOnDemand202Response extends HttpResponse {
  status: "202";
}

/** Gets the backend health for given combination of backend pool and http setting of the specified application gateway in a resource group. */
export interface ApplicationGatewaysBackendHealthOnDemandDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all available server variables. */
export interface ApplicationGatewaysListAvailableServerVariables200Response extends HttpResponse {
  status: "200";
  body: Array<string>;
}

/** Lists all available server variables. */
export interface ApplicationGatewaysListAvailableServerVariablesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Lists all available request headers. */
export interface ApplicationGatewaysListAvailableRequestHeaders200Response extends HttpResponse {
  status: "200";
  body: Array<string>;
}

/** Lists all available request headers. */
export interface ApplicationGatewaysListAvailableRequestHeadersDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Lists all available response headers. */
export interface ApplicationGatewaysListAvailableResponseHeaders200Response extends HttpResponse {
  status: "200";
  body: Array<string>;
}

/** Lists all available response headers. */
export interface ApplicationGatewaysListAvailableResponseHeadersDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Lists all available web application firewall rule sets. */
export interface ApplicationGatewaysListAvailableWafRuleSets200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayAvailableWafRuleSetsResultOutput;
}

/** Lists all available web application firewall rule sets. */
export interface ApplicationGatewaysListAvailableWafRuleSetsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists available Ssl options for configuring Ssl policy. */
export interface ApplicationGatewaysListAvailableSslOptions200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayAvailableSslOptionsOutput;
}

/** Lists available Ssl options for configuring Ssl policy. */
export interface ApplicationGatewaysListAvailableSslOptionsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all SSL predefined policies for configuring Ssl policy. */
export interface ApplicationGatewaysListAvailableSslPredefinedPolicies200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayAvailableSslPredefinedPoliciesOutput;
}

/** Lists all SSL predefined policies for configuring Ssl policy. */
export interface ApplicationGatewaysListAvailableSslPredefinedPoliciesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets Ssl predefined policy with the specified policy name. */
export interface ApplicationGatewaysGetSslPredefinedPolicy200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewaySslPredefinedPolicyOutput;
}

/** Gets Ssl predefined policy with the specified policy name. */
export interface ApplicationGatewaysGetSslPredefinedPolicyDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all private link resources on an application gateway. */
export interface ApplicationGatewayPrivateLinkResourcesList200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayPrivateLinkResourceListResultOutput;
}

/** Lists all private link resources on an application gateway. */
export interface ApplicationGatewayPrivateLinkResourcesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified private endpoint connection on application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified private endpoint connection on application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified private endpoint connection on application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified private endpoint connection on application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates the specified private endpoint connection on application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionsUpdate200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayPrivateEndpointConnectionOutput;
}

/** Updates the specified private endpoint connection on application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionsUpdate202Response extends HttpResponse {
  status: "202";
}

/** Updates the specified private endpoint connection on application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified private endpoint connection on application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayPrivateEndpointConnectionOutput;
}

/** Gets the specified private endpoint connection on application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all private endpoint connections on an application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionsList200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayPrivateEndpointConnectionListResultOutput;
}

/** Lists all private endpoint connections on an application gateway. */
export interface ApplicationGatewayPrivateEndpointConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the regional application gateway waf manifest. */
export interface ApplicationGatewayWafDynamicManifestsDefaultGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayWafDynamicManifestResultOutput;
}

/** Gets the regional application gateway waf manifest. */
export interface ApplicationGatewayWafDynamicManifestsDefaultGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the regional application gateway waf manifest. */
export interface ApplicationGatewayWafDynamicManifestsGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationGatewayWafDynamicManifestResultListOutput;
}

/** Gets the regional application gateway waf manifest. */
export interface ApplicationGatewayWafDynamicManifestsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified application security group. */
export interface ApplicationSecurityGroupsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified application security group. */
export interface ApplicationSecurityGroupsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified application security group. */
export interface ApplicationSecurityGroupsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified application security group. */
export interface ApplicationSecurityGroupsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about the specified application security group. */
export interface ApplicationSecurityGroupsGet200Response extends HttpResponse {
  status: "200";
  body: ApplicationSecurityGroupOutput;
}

/** Gets information about the specified application security group. */
export interface ApplicationSecurityGroupsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates an application security group. */
export interface ApplicationSecurityGroupsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ApplicationSecurityGroupOutput;
}

/** Creates or updates an application security group. */
export interface ApplicationSecurityGroupsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ApplicationSecurityGroupOutput;
}

/** Creates or updates an application security group. */
export interface ApplicationSecurityGroupsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates an application security group's tags. */
export interface ApplicationSecurityGroupsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: ApplicationSecurityGroupOutput;
}

/** Updates an application security group's tags. */
export interface ApplicationSecurityGroupsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all application security groups in a subscription. */
export interface ApplicationSecurityGroupsListAll200Response extends HttpResponse {
  status: "200";
  body: ApplicationSecurityGroupListResultOutput;
}

/** Gets all application security groups in a subscription. */
export interface ApplicationSecurityGroupsListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the application security groups in a resource group. */
export interface ApplicationSecurityGroupsList200Response extends HttpResponse {
  status: "200";
  body: ApplicationSecurityGroupListResultOutput;
}

/** Gets all the application security groups in a resource group. */
export interface ApplicationSecurityGroupsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all of the available subnet delegations for this subscription in this region. */
export interface AvailableDelegationsList200Response extends HttpResponse {
  status: "200";
  body: AvailableDelegationsResultOutput;
}

/** Gets all of the available subnet delegations for this subscription in this region. */
export interface AvailableDelegationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all of the available subnet delegations for this resource group in this region. */
export interface AvailableResourceGroupDelegationsList200Response extends HttpResponse {
  status: "200";
  body: AvailableDelegationsResultOutput;
}

/** Gets all of the available subnet delegations for this resource group in this region. */
export interface AvailableResourceGroupDelegationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all available service aliases for this subscription in this region. */
export interface AvailableServiceAliasesList200Response extends HttpResponse {
  status: "200";
  body: AvailableServiceAliasesResultOutput;
}

/** Gets all available service aliases for this subscription in this region. */
export interface AvailableServiceAliasesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all available service aliases for this resource group in this region. */
export interface AvailableServiceAliasesListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: AvailableServiceAliasesResultOutput;
}

/** Gets all available service aliases for this resource group in this region. */
export interface AvailableServiceAliasesListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified Azure Firewall. */
export interface AzureFirewallsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified Azure Firewall. */
export interface AzureFirewallsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified Azure Firewall. */
export interface AzureFirewallsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified Azure Firewall. */
export interface AzureFirewallsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified Azure Firewall. */
export interface AzureFirewallsGet200Response extends HttpResponse {
  status: "200";
  body: AzureFirewallOutput;
}

/** Gets the specified Azure Firewall. */
export interface AzureFirewallsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates the specified Azure Firewall. */
export interface AzureFirewallsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: AzureFirewallOutput;
}

/** Creates or updates the specified Azure Firewall. */
export interface AzureFirewallsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: AzureFirewallOutput;
}

/** Creates or updates the specified Azure Firewall. */
export interface AzureFirewallsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates tags of an Azure Firewall resource. */
export interface AzureFirewallsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: AzureFirewallOutput;
}

/** Updates tags of an Azure Firewall resource. */
export interface AzureFirewallsUpdateTags202Response extends HttpResponse {
  status: "202";
}

/** Updates tags of an Azure Firewall resource. */
export interface AzureFirewallsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all Azure Firewalls in a resource group. */
export interface AzureFirewallsList200Response extends HttpResponse {
  status: "200";
  body: AzureFirewallListResultOutput;
}

/** Lists all Azure Firewalls in a resource group. */
export interface AzureFirewallsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the Azure Firewalls in a subscription. */
export interface AzureFirewallsListAll200Response extends HttpResponse {
  status: "200";
  body: AzureFirewallListResultOutput;
}

/** Gets all the Azure Firewalls in a subscription. */
export interface AzureFirewallsListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves a list of all IP prefixes that azure firewall has learned to not SNAT. */
export interface AzureFirewallsListLearnedPrefixes200Response extends HttpResponse {
  status: "200";
  body: IPPrefixesListOutput;
}

/** Retrieves a list of all IP prefixes that azure firewall has learned to not SNAT. */
export interface AzureFirewallsListLearnedPrefixes202Response extends HttpResponse {
  status: "202";
}

/** Retrieves a list of all IP prefixes that azure firewall has learned to not SNAT. */
export interface AzureFirewallsListLearnedPrefixesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the Azure Firewall FQDN Tags in a subscription. */
export interface AzureFirewallFqdnTagsListAll200Response extends HttpResponse {
  status: "200";
  body: AzureFirewallFqdnTagListResultOutput;
}

/** Gets all the Azure Firewall FQDN Tags in a subscription. */
export interface AzureFirewallFqdnTagsListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified Azure Web Category. */
export interface WebCategoriesGet200Response extends HttpResponse {
  status: "200";
  body: AzureWebCategoryOutput;
}

/** Gets the specified Azure Web Category. */
export interface WebCategoriesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the Azure Web Categories in a subscription. */
export interface WebCategoriesListBySubscription200Response extends HttpResponse {
  status: "200";
  body: AzureWebCategoryListResultOutput;
}

/** Gets all the Azure Web Categories in a subscription. */
export interface WebCategoriesListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified Bastion Host. */
export interface BastionHostsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified Bastion Host. */
export interface BastionHostsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified Bastion Host. */
export interface BastionHostsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified Bastion Host. */
export interface BastionHostsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified Bastion Host. */
export interface BastionHostsGet200Response extends HttpResponse {
  status: "200";
  body: BastionHostOutput;
}

/** Gets the specified Bastion Host. */
export interface BastionHostsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates the specified Bastion Host. */
export interface BastionHostsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: BastionHostOutput;
}

/** Creates or updates the specified Bastion Host. */
export interface BastionHostsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: BastionHostOutput;
}

/** Creates or updates the specified Bastion Host. */
export interface BastionHostsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates Tags for BastionHost resource */
export interface BastionHostsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: BastionHostOutput;
}

/** Updates Tags for BastionHost resource */
export interface BastionHostsUpdateTags202Response extends HttpResponse {
  status: "202";
}

/** Updates Tags for BastionHost resource */
export interface BastionHostsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all Bastion Hosts in a subscription. */
export interface BastionHostsList200Response extends HttpResponse {
  status: "200";
  body: BastionHostListResultOutput;
}

/** Lists all Bastion Hosts in a subscription. */
export interface BastionHostsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all Bastion Hosts in a resource group. */
export interface BastionHostsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: BastionHostListResultOutput;
}

/** Lists all Bastion Hosts in a resource group. */
export interface BastionHostsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a Bastion Shareable Links for all the VMs specified in the request. */
export interface PutBastionShareableLink200Response extends HttpResponse {
  status: "200";
  body: BastionShareableLinkListResultOutput;
}

/** Creates a Bastion Shareable Links for all the VMs specified in the request. */
export interface PutBastionShareableLink202Response extends HttpResponse {
  status: "202";
}

/** Creates a Bastion Shareable Links for all the VMs specified in the request. */
export interface PutBastionShareableLinkDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the Bastion Shareable Links for all the VMs specified in the request. */
export interface DeleteBastionShareableLink200Response extends HttpResponse {
  status: "200";
}

/** Deletes the Bastion Shareable Links for all the VMs specified in the request. */
export interface DeleteBastionShareableLink202Response extends HttpResponse {
  status: "202";
}

/** Deletes the Bastion Shareable Links for all the VMs specified in the request. */
export interface DeleteBastionShareableLinkDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Return the Bastion Shareable Links for all the VMs specified in the request. */
export interface GetBastionShareableLink200Response extends HttpResponse {
  status: "200";
  body: BastionShareableLinkListResultOutput;
}

/** Return the Bastion Shareable Links for all the VMs specified in the request. */
export interface GetBastionShareableLinkDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Returns the list of currently active sessions on the Bastion. */
export interface GetActiveSessions200Response extends HttpResponse {
  status: "200";
  body: BastionActiveSessionListResultOutput;
}

/** Returns the list of currently active sessions on the Bastion. */
export interface GetActiveSessions202Response extends HttpResponse {
  status: "202";
}

/** Returns the list of currently active sessions on the Bastion. */
export interface GetActiveSessionsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Returns the list of currently active sessions on the Bastion. */
export interface DisconnectActiveSessions200Response extends HttpResponse {
  status: "200";
  body: BastionSessionDeleteResultOutput;
}

/** Returns the list of currently active sessions on the Bastion. */
export interface DisconnectActiveSessionsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Checks whether a domain name in the cloudapp.azure.com zone is available for use. */
export interface CheckDnsNameAvailability200Response extends HttpResponse {
  status: "200";
  body: DnsNameAvailabilityResultOutput;
}

/** Checks whether a domain name in the cloudapp.azure.com zone is available for use. */
export interface CheckDnsNameAvailabilityDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves detail of a provider port. */
export interface ExpressRouteProviderPort200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteProviderPortOutput;
}

/** Retrieves detail of a provider port. */
export interface ExpressRouteProviderPortDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists active connectivity configurations in a network manager. */
export interface ListActiveConnectivityConfigurations200Response extends HttpResponse {
  status: "200";
  body: ActiveConnectivityConfigurationsListResultOutput;
}

/** Lists active connectivity configurations in a network manager. */
export interface ListActiveConnectivityConfigurationsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists active security admin rules in a network manager. */
export interface ListActiveSecurityAdminRules200Response extends HttpResponse {
  status: "200";
  body: ActiveSecurityAdminRulesListResultOutput;
}

/** Lists active security admin rules in a network manager. */
export interface ListActiveSecurityAdminRulesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List all effective connectivity configurations applied on a virtual network. */
export interface ListNetworkManagerEffectiveConnectivityConfigurations200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerEffectiveConnectivityConfigurationListResultOutput;
}

/** List all effective connectivity configurations applied on a virtual network. */
export interface ListNetworkManagerEffectiveConnectivityConfigurationsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List all effective security admin rules applied on a virtual network. */
export interface ListNetworkManagerEffectiveSecurityAdminRules200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerEffectiveSecurityAdminRulesListResultOutput;
}

/** List all effective security admin rules applied on a virtual network. */
export interface ListNetworkManagerEffectiveSecurityAdminRulesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gives the supported security providers for the virtual wan. */
export interface SupportedSecurityProviders200Response extends HttpResponse {
  status: "200";
  body: VirtualWanSecurityProvidersOutput;
}

/** Gives the supported security providers for the virtual wan. */
export interface SupportedSecurityProvidersDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration combination in the specified resource group. */
export interface Generatevirtualwanvpnserverconfigurationvpnprofile200Response extends HttpResponse {
  status: "200";
  body: VpnProfileResponseOutput;
}

/** Generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration combination in the specified resource group. */
export interface Generatevirtualwanvpnserverconfigurationvpnprofile202Response extends HttpResponse {
  status: "202";
}

/** Generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration combination in the specified resource group. */
export interface GeneratevirtualwanvpnserverconfigurationvpnprofileDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about all network interfaces in a role instance in a cloud service. */
export interface NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfaces200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceListResultOutput;
}

/** Gets information about all network interfaces in a role instance in a cloud service. */
export interface NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all network interfaces in a cloud service. */
export interface NetworkInterfacesListCloudServiceNetworkInterfaces200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceListResultOutput;
}

/** Gets all network interfaces in a cloud service. */
export interface NetworkInterfacesListCloudServiceNetworkInterfacesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get the specified network interface in a cloud service. */
export interface NetworkInterfacesGetCloudServiceNetworkInterface200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceOutput;
}

/** Get the specified network interface in a cloud service. */
export interface NetworkInterfacesGetCloudServiceNetworkInterfaceDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified network interface. */
export interface NetworkInterfacesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified network interface. */
export interface NetworkInterfacesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified network interface. */
export interface NetworkInterfacesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified network interface. */
export interface NetworkInterfacesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about the specified network interface. */
export interface NetworkInterfacesGet200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceOutput;
}

/** Gets information about the specified network interface. */
export interface NetworkInterfacesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a network interface. */
export interface NetworkInterfacesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceOutput;
}

/** Creates or updates a network interface. */
export interface NetworkInterfacesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NetworkInterfaceOutput;
}

/** Creates or updates a network interface. */
export interface NetworkInterfacesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a network interface tags. */
export interface NetworkInterfacesUpdateTags200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceOutput;
}

/** Updates a network interface tags. */
export interface NetworkInterfacesUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all network interfaces in a subscription. */
export interface NetworkInterfacesListAll200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceListResultOutput;
}

/** Gets all network interfaces in a subscription. */
export interface NetworkInterfacesListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all network interfaces in a resource group. */
export interface NetworkInterfacesList200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceListResultOutput;
}

/** Gets all network interfaces in a resource group. */
export interface NetworkInterfacesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all route tables applied to a network interface. */
export interface NetworkInterfacesGetEffectiveRouteTable200Response extends HttpResponse {
  status: "200";
  body: EffectiveRouteListResultOutput;
}

/** Gets all route tables applied to a network interface. */
export interface NetworkInterfacesGetEffectiveRouteTable202Response extends HttpResponse {
  status: "202";
}

/** Gets all route tables applied to a network interface. */
export interface NetworkInterfacesGetEffectiveRouteTableDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all network security groups applied to a network interface. */
export interface NetworkInterfacesListEffectiveNetworkSecurityGroups200Response extends HttpResponse {
  status: "200";
  body: EffectiveNetworkSecurityGroupListResultOutput;
}

/** Gets all network security groups applied to a network interface. */
export interface NetworkInterfacesListEffectiveNetworkSecurityGroups202Response extends HttpResponse {
  status: "202";
}

/** Gets all network security groups applied to a network interface. */
export interface NetworkInterfacesListEffectiveNetworkSecurityGroupsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about all network interfaces in a virtual machine in a virtual machine scale set. */
export interface NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfaces200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceListResultOutput;
}

/** Gets information about all network interfaces in a virtual machine in a virtual machine scale set. */
export interface NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all network interfaces in a virtual machine scale set. */
export interface NetworkInterfacesListVirtualMachineScaleSetNetworkInterfaces200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceListResultOutput;
}

/** Gets all network interfaces in a virtual machine scale set. */
export interface NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get the specified network interface in a virtual machine scale set. */
export interface NetworkInterfacesGetVirtualMachineScaleSetNetworkInterface200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceOutput;
}

/** Get the specified network interface in a virtual machine scale set. */
export interface NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get the specified network interface ip configuration in a virtual machine scale set. */
export interface NetworkInterfacesListVirtualMachineScaleSetIpConfigurations200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceIPConfigurationListResultOutput;
}

/** Get the specified network interface ip configuration in a virtual machine scale set. */
export interface NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get the specified network interface ip configuration in a virtual machine scale set. */
export interface NetworkInterfacesGetVirtualMachineScaleSetIpConfiguration200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceIPConfigurationOutput;
}

/** Get the specified network interface ip configuration in a virtual machine scale set. */
export interface NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about all public IP addresses on a cloud service level. */
export interface PublicIPAddressesListCloudServicePublicIPAddresses200Response extends HttpResponse {
  status: "200";
  body: PublicIPAddressListResultOutput;
}

/** Gets information about all public IP addresses on a cloud service level. */
export interface PublicIPAddressesListCloudServicePublicIPAddressesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about all public IP addresses in a role instance IP configuration in a cloud service. */
export interface PublicIPAddressesListCloudServiceRoleInstancePublicIPAddresses200Response extends HttpResponse {
  status: "200";
  body: PublicIPAddressListResultOutput;
}

/** Gets information about all public IP addresses in a role instance IP configuration in a cloud service. */
export interface PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get the specified public IP address in a cloud service. */
export interface PublicIPAddressesGetCloudServicePublicIPAddress200Response extends HttpResponse {
  status: "200";
  body: PublicIPAddressOutput;
}

/** Get the specified public IP address in a cloud service. */
export interface PublicIPAddressesGetCloudServicePublicIPAddressDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified public IP address. */
export interface PublicIPAddressesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified public IP address. */
export interface PublicIPAddressesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified public IP address. */
export interface PublicIPAddressesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified public IP address. */
export interface PublicIPAddressesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified public IP address in a specified resource group. */
export interface PublicIPAddressesGet200Response extends HttpResponse {
  status: "200";
  body: PublicIPAddressOutput;
}

/** Gets the specified public IP address in a specified resource group. */
export interface PublicIPAddressesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a static or dynamic public IP address. */
export interface PublicIPAddressesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PublicIPAddressOutput;
}

/** Creates or updates a static or dynamic public IP address. */
export interface PublicIPAddressesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PublicIPAddressOutput;
}

/** Creates or updates a static or dynamic public IP address. */
export interface PublicIPAddressesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates public IP address tags. */
export interface PublicIPAddressesUpdateTags200Response extends HttpResponse {
  status: "200";
  body: PublicIPAddressOutput;
}

/** Updates public IP address tags. */
export interface PublicIPAddressesUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the public IP addresses in a subscription. */
export interface PublicIPAddressesListAll200Response extends HttpResponse {
  status: "200";
  body: PublicIPAddressListResultOutput;
}

/** Gets all the public IP addresses in a subscription. */
export interface PublicIPAddressesListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all public IP addresses in a resource group. */
export interface PublicIPAddressesList200Response extends HttpResponse {
  status: "200";
  body: PublicIPAddressListResultOutput;
}

/** Gets all public IP addresses in a resource group. */
export interface PublicIPAddressesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the Ddos Protection Status of a Public IP Address */
export interface PublicIPAddressesDdosProtectionStatus200Response extends HttpResponse {
  status: "200";
  body: PublicIpDdosProtectionStatusResultOutput;
}

/** Gets the Ddos Protection Status of a Public IP Address */
export interface PublicIPAddressesDdosProtectionStatus202Response extends HttpResponse {
  status: "202";
}

/** Gets the Ddos Protection Status of a Public IP Address */
export interface PublicIPAddressesDdosProtectionStatusDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about all public IP addresses on a virtual machine scale set level. */
export interface PublicIPAddressesListVirtualMachineScaleSetPublicIPAddresses200Response extends HttpResponse {
  status: "200";
  body: PublicIPAddressListResultOutput;
}

/** Gets information about all public IP addresses on a virtual machine scale set level. */
export interface PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about all public IP addresses in a virtual machine IP configuration in a virtual machine scale set. */
export interface PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddresses200Response extends HttpResponse {
  status: "200";
  body: PublicIPAddressListResultOutput;
}

/** Gets information about all public IP addresses in a virtual machine IP configuration in a virtual machine scale set. */
export interface PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get the specified public IP address in a virtual machine scale set. */
export interface PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddress200Response extends HttpResponse {
  status: "200";
  body: PublicIPAddressOutput;
}

/** Get the specified public IP address in a virtual machine scale set. */
export interface PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified custom IP prefix. */
export interface CustomIPPrefixesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified custom IP prefix. */
export interface CustomIPPrefixesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified custom IP prefix. */
export interface CustomIPPrefixesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified custom IP prefix. */
export interface CustomIPPrefixesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified custom IP prefix in a specified resource group. */
export interface CustomIPPrefixesGet200Response extends HttpResponse {
  status: "200";
  body: CustomIpPrefixOutput;
}

/** Gets the specified custom IP prefix in a specified resource group. */
export interface CustomIPPrefixesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a custom IP prefix. */
export interface CustomIPPrefixesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: CustomIpPrefixOutput;
}

/** Creates or updates a custom IP prefix. */
export interface CustomIPPrefixesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: CustomIpPrefixOutput;
}

/** Creates or updates a custom IP prefix. */
export interface CustomIPPrefixesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates custom IP prefix tags. */
export interface CustomIPPrefixesUpdateTags200Response extends HttpResponse {
  status: "200";
  body: CustomIpPrefixOutput;
}

/** Updates custom IP prefix tags. */
export interface CustomIPPrefixesUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the custom IP prefixes in a subscription. */
export interface CustomIPPrefixesListAll200Response extends HttpResponse {
  status: "200";
  body: CustomIpPrefixListResultOutput;
}

/** Gets all the custom IP prefixes in a subscription. */
export interface CustomIPPrefixesListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all custom IP prefixes in a resource group. */
export interface CustomIPPrefixesList200Response extends HttpResponse {
  status: "200";
  body: CustomIpPrefixListResultOutput;
}

/** Gets all custom IP prefixes in a resource group. */
export interface CustomIPPrefixesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified DDoS custom policy. */
export interface DdosCustomPoliciesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified DDoS custom policy. */
export interface DdosCustomPoliciesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified DDoS custom policy. */
export interface DdosCustomPoliciesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified DDoS custom policy. */
export interface DdosCustomPoliciesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about the specified DDoS custom policy. */
export interface DdosCustomPoliciesGet200Response extends HttpResponse {
  status: "200";
  body: DdosCustomPolicyOutput;
}

/** Gets information about the specified DDoS custom policy. */
export interface DdosCustomPoliciesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a DDoS custom policy. */
export interface DdosCustomPoliciesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DdosCustomPolicyOutput;
}

/** Creates or updates a DDoS custom policy. */
export interface DdosCustomPoliciesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DdosCustomPolicyOutput;
}

/** Creates or updates a DDoS custom policy. */
export interface DdosCustomPoliciesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update a DDoS custom policy tags. */
export interface DdosCustomPoliciesUpdateTags200Response extends HttpResponse {
  status: "200";
  body: DdosCustomPolicyOutput;
}

/** Update a DDoS custom policy tags. */
export interface DdosCustomPoliciesUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified DDoS protection plan. */
export interface DdosProtectionPlansDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified DDoS protection plan. */
export interface DdosProtectionPlansDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified DDoS protection plan. */
export interface DdosProtectionPlansDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified DDoS protection plan. */
export interface DdosProtectionPlansDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about the specified DDoS protection plan. */
export interface DdosProtectionPlansGet200Response extends HttpResponse {
  status: "200";
  body: DdosProtectionPlanOutput;
}

/** Gets information about the specified DDoS protection plan. */
export interface DdosProtectionPlansGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a DDoS protection plan. */
export interface DdosProtectionPlansCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DdosProtectionPlanOutput;
}

/** Creates or updates a DDoS protection plan. */
export interface DdosProtectionPlansCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DdosProtectionPlanOutput;
}

/** Creates or updates a DDoS protection plan. */
export interface DdosProtectionPlansCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update a DDoS protection plan tags. */
export interface DdosProtectionPlansUpdateTags200Response extends HttpResponse {
  status: "200";
  body: DdosProtectionPlanOutput;
}

/** Update a DDoS protection plan tags. */
export interface DdosProtectionPlansUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all DDoS protection plans in a subscription. */
export interface DdosProtectionPlansList200Response extends HttpResponse {
  status: "200";
  body: DdosProtectionPlanListResultOutput;
}

/** Gets all DDoS protection plans in a subscription. */
export interface DdosProtectionPlansListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the DDoS protection plans in a resource group. */
export interface DdosProtectionPlansListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: DdosProtectionPlanListResultOutput;
}

/** Gets all the DDoS protection plans in a resource group. */
export interface DdosProtectionPlansListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a DSCP Configuration. */
export interface DscpConfigurationCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DscpConfigurationOutput;
}

/** Creates or updates a DSCP Configuration. */
export interface DscpConfigurationCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DscpConfigurationOutput;
}

/** Creates or updates a DSCP Configuration. */
export interface DscpConfigurationCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a DSCP Configuration. */
export interface DscpConfigurationDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a DSCP Configuration. */
export interface DscpConfigurationDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a DSCP Configuration. */
export interface DscpConfigurationDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a DSCP Configuration. */
export interface DscpConfigurationDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a DSCP Configuration. */
export interface DscpConfigurationGet200Response extends HttpResponse {
  status: "200";
  body: DscpConfigurationOutput;
}

/** Gets a DSCP Configuration. */
export interface DscpConfigurationGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a DSCP Configuration. */
export interface DscpConfigurationList200Response extends HttpResponse {
  status: "200";
  body: DscpConfigurationListResultOutput;
}

/** Gets a DSCP Configuration. */
export interface DscpConfigurationListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all dscp configurations in a subscription. */
export interface DscpConfigurationListAll200Response extends HttpResponse {
  status: "200";
  body: DscpConfigurationListResultOutput;
}

/** Gets all dscp configurations in a subscription. */
export interface DscpConfigurationListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List what values of endpoint services are available for use. */
export interface AvailableEndpointServicesList200Response extends HttpResponse {
  status: "200";
  body: EndpointServicesListResultOutput;
}

/** List what values of endpoint services are available for use. */
export interface AvailableEndpointServicesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified authorization from the specified express route circuit. */
export interface ExpressRouteCircuitAuthorizationsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified authorization from the specified express route circuit. */
export interface ExpressRouteCircuitAuthorizationsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified authorization from the specified express route circuit. */
export interface ExpressRouteCircuitAuthorizationsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified authorization from the specified express route circuit. */
export interface ExpressRouteCircuitAuthorizationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified authorization from the specified express route circuit. */
export interface ExpressRouteCircuitAuthorizationsGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitAuthorizationOutput;
}

/** Gets the specified authorization from the specified express route circuit. */
export interface ExpressRouteCircuitAuthorizationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates an authorization in the specified express route circuit. */
export interface ExpressRouteCircuitAuthorizationsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitAuthorizationOutput;
}

/** Creates or updates an authorization in the specified express route circuit. */
export interface ExpressRouteCircuitAuthorizationsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ExpressRouteCircuitAuthorizationOutput;
}

/** Creates or updates an authorization in the specified express route circuit. */
export interface ExpressRouteCircuitAuthorizationsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all authorizations in an express route circuit. */
export interface ExpressRouteCircuitAuthorizationsList200Response extends HttpResponse {
  status: "200";
  body: AuthorizationListResultOutput;
}

/** Gets all authorizations in an express route circuit. */
export interface ExpressRouteCircuitAuthorizationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified peering from the specified express route circuit. */
export interface ExpressRouteCircuitPeeringsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified peering from the specified express route circuit. */
export interface ExpressRouteCircuitPeeringsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified peering from the specified express route circuit. */
export interface ExpressRouteCircuitPeeringsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified peering from the specified express route circuit. */
export interface ExpressRouteCircuitPeeringsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified peering for the express route circuit. */
export interface ExpressRouteCircuitPeeringsGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitPeeringOutput;
}

/** Gets the specified peering for the express route circuit. */
export interface ExpressRouteCircuitPeeringsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a peering in the specified express route circuits. */
export interface ExpressRouteCircuitPeeringsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitPeeringOutput;
}

/** Creates or updates a peering in the specified express route circuits. */
export interface ExpressRouteCircuitPeeringsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ExpressRouteCircuitPeeringOutput;
}

/** Creates or updates a peering in the specified express route circuits. */
export interface ExpressRouteCircuitPeeringsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all peerings in a specified express route circuit. */
export interface ExpressRouteCircuitPeeringsList200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitPeeringListResultOutput;
}

/** Gets all peerings in a specified express route circuit. */
export interface ExpressRouteCircuitPeeringsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified Express Route Circuit Connection from the specified express route circuit. */
export interface ExpressRouteCircuitConnectionsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified Express Route Circuit Connection from the specified express route circuit. */
export interface ExpressRouteCircuitConnectionsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified Express Route Circuit Connection from the specified express route circuit. */
export interface ExpressRouteCircuitConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified Express Route Circuit Connection from the specified express route circuit. */
export interface ExpressRouteCircuitConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified Express Route Circuit Connection from the specified express route circuit. */
export interface ExpressRouteCircuitConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitConnectionOutput;
}

/** Gets the specified Express Route Circuit Connection from the specified express route circuit. */
export interface ExpressRouteCircuitConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a Express Route Circuit Connection in the specified express route circuits. */
export interface ExpressRouteCircuitConnectionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitConnectionOutput;
}

/** Creates or updates a Express Route Circuit Connection in the specified express route circuits. */
export interface ExpressRouteCircuitConnectionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ExpressRouteCircuitConnectionOutput;
}

/** Creates or updates a Express Route Circuit Connection in the specified express route circuits. */
export interface ExpressRouteCircuitConnectionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all global reach connections associated with a private peering in an express route circuit. */
export interface ExpressRouteCircuitConnectionsList200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitConnectionListResultOutput;
}

/** Gets all global reach connections associated with a private peering in an express route circuit. */
export interface ExpressRouteCircuitConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified Peer Express Route Circuit Connection from the specified express route circuit. */
export interface PeerExpressRouteCircuitConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: PeerExpressRouteCircuitConnectionOutput;
}

/** Gets the specified Peer Express Route Circuit Connection from the specified express route circuit. */
export interface PeerExpressRouteCircuitConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all global reach peer connections associated with a private peering in an express route circuit. */
export interface PeerExpressRouteCircuitConnectionsList200Response extends HttpResponse {
  status: "200";
  body: PeerExpressRouteCircuitConnectionListResultOutput;
}

/** Gets all global reach peer connections associated with a private peering in an express route circuit. */
export interface PeerExpressRouteCircuitConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified express route circuit. */
export interface ExpressRouteCircuitsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified express route circuit. */
export interface ExpressRouteCircuitsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified express route circuit. */
export interface ExpressRouteCircuitsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified express route circuit. */
export interface ExpressRouteCircuitsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about the specified express route circuit. */
export interface ExpressRouteCircuitsGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitOutput;
}

/** Gets information about the specified express route circuit. */
export interface ExpressRouteCircuitsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates an express route circuit. */
export interface ExpressRouteCircuitsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitOutput;
}

/** Creates or updates an express route circuit. */
export interface ExpressRouteCircuitsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ExpressRouteCircuitOutput;
}

/** Creates or updates an express route circuit. */
export interface ExpressRouteCircuitsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates an express route circuit tags. */
export interface ExpressRouteCircuitsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitOutput;
}

/** Updates an express route circuit tags. */
export interface ExpressRouteCircuitsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the currently advertised ARP table associated with the express route circuit in a resource group. */
export interface ExpressRouteCircuitsListArpTable200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitsArpTableListResultOutput;
}

/** Gets the currently advertised ARP table associated with the express route circuit in a resource group. */
export interface ExpressRouteCircuitsListArpTable202Response extends HttpResponse {
  status: "202";
}

/** Gets the currently advertised ARP table associated with the express route circuit in a resource group. */
export interface ExpressRouteCircuitsListArpTableDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the currently advertised routes table associated with the express route circuit in a resource group. */
export interface ExpressRouteCircuitsListRoutesTable200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitsRoutesTableListResultOutput;
}

/** Gets the currently advertised routes table associated with the express route circuit in a resource group. */
export interface ExpressRouteCircuitsListRoutesTable202Response extends HttpResponse {
  status: "202";
}

/** Gets the currently advertised routes table associated with the express route circuit in a resource group. */
export interface ExpressRouteCircuitsListRoutesTableDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the currently advertised routes table summary associated with the express route circuit in a resource group. */
export interface ExpressRouteCircuitsListRoutesTableSummary200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitsRoutesTableSummaryListResultOutput;
}

/** Gets the currently advertised routes table summary associated with the express route circuit in a resource group. */
export interface ExpressRouteCircuitsListRoutesTableSummary202Response extends HttpResponse {
  status: "202";
}

/** Gets the currently advertised routes table summary associated with the express route circuit in a resource group. */
export interface ExpressRouteCircuitsListRoutesTableSummaryDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the stats from an express route circuit in a resource group. */
export interface ExpressRouteCircuitsGetStats200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitStatsOutput;
}

/** Gets all the stats from an express route circuit in a resource group. */
export interface ExpressRouteCircuitsGetStatsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all stats from an express route circuit in a resource group. */
export interface ExpressRouteCircuitsGetPeeringStats200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitStatsOutput;
}

/** Gets all stats from an express route circuit in a resource group. */
export interface ExpressRouteCircuitsGetPeeringStatsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the express route circuits in a resource group. */
export interface ExpressRouteCircuitsList200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitListResultOutput;
}

/** Gets all the express route circuits in a resource group. */
export interface ExpressRouteCircuitsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the express route circuits in a subscription. */
export interface ExpressRouteCircuitsListAll200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitListResultOutput;
}

/** Gets all the express route circuits in a subscription. */
export interface ExpressRouteCircuitsListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the available express route service providers. */
export interface ExpressRouteServiceProvidersList200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteServiceProviderListResultOutput;
}

/** Gets all the available express route service providers. */
export interface ExpressRouteServiceProvidersListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves all the ExpressRouteCrossConnections in a subscription. */
export interface ExpressRouteCrossConnectionsList200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCrossConnectionListResultOutput;
}

/** Retrieves all the ExpressRouteCrossConnections in a subscription. */
export interface ExpressRouteCrossConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves all the ExpressRouteCrossConnections in a resource group. */
export interface ExpressRouteCrossConnectionsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCrossConnectionListResultOutput;
}

/** Retrieves all the ExpressRouteCrossConnections in a resource group. */
export interface ExpressRouteCrossConnectionsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets details about the specified ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCrossConnectionOutput;
}

/** Gets details about the specified ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update the specified ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCrossConnectionOutput;
}

/** Update the specified ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates an express route cross connection tags. */
export interface ExpressRouteCrossConnectionsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCrossConnectionOutput;
}

/** Updates an express route cross connection tags. */
export interface ExpressRouteCrossConnectionsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the currently advertised ARP table associated with the express route cross connection in a resource group. */
export interface ExpressRouteCrossConnectionsListArpTable200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitsArpTableListResultOutput;
}

/** Gets the currently advertised ARP table associated with the express route cross connection in a resource group. */
export interface ExpressRouteCrossConnectionsListArpTable202Response extends HttpResponse {
  status: "202";
}

/** Gets the currently advertised ARP table associated with the express route cross connection in a resource group. */
export interface ExpressRouteCrossConnectionsListArpTableDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the route table summary associated with the express route cross connection in a resource group. */
export interface ExpressRouteCrossConnectionsListRoutesTableSummary200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCrossConnectionsRoutesTableSummaryListResultOutput;
}

/** Gets the route table summary associated with the express route cross connection in a resource group. */
export interface ExpressRouteCrossConnectionsListRoutesTableSummary202Response extends HttpResponse {
  status: "202";
}

/** Gets the route table summary associated with the express route cross connection in a resource group. */
export interface ExpressRouteCrossConnectionsListRoutesTableSummaryDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the currently advertised routes table associated with the express route cross connection in a resource group. */
export interface ExpressRouteCrossConnectionsListRoutesTable200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCircuitsRoutesTableListResultOutput;
}

/** Gets the currently advertised routes table associated with the express route cross connection in a resource group. */
export interface ExpressRouteCrossConnectionsListRoutesTable202Response extends HttpResponse {
  status: "202";
}

/** Gets the currently advertised routes table associated with the express route cross connection in a resource group. */
export interface ExpressRouteCrossConnectionsListRoutesTableDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all peerings in a specified ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringsList200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCrossConnectionPeeringListOutput;
}

/** Gets all peerings in a specified ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified peering from the ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified peering from the ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified peering from the ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified peering from the ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified peering for the ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringsGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCrossConnectionPeeringOutput;
}

/** Gets the specified peering for the ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a peering in the specified ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteCrossConnectionPeeringOutput;
}

/** Creates or updates a peering in the specified ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ExpressRouteCrossConnectionPeeringOutput;
}

/** Creates or updates a peering in the specified ExpressRouteCrossConnection. */
export interface ExpressRouteCrossConnectionPeeringsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves all ExpressRoutePort peering locations. Does not return available bandwidths for each location. Available bandwidths can only be obtained when retrieving a specific peering location. */
export interface ExpressRoutePortsLocationsList200Response extends HttpResponse {
  status: "200";
  body: ExpressRoutePortsLocationListResultOutput;
}

/** Retrieves all ExpressRoutePort peering locations. Does not return available bandwidths for each location. Available bandwidths can only be obtained when retrieving a specific peering location. */
export interface ExpressRoutePortsLocationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves a single ExpressRoutePort peering location, including the list of available bandwidths available at said peering location. */
export interface ExpressRoutePortsLocationsGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRoutePortsLocationOutput;
}

/** Retrieves a single ExpressRoutePort peering location, including the list of available bandwidths available at said peering location. */
export interface ExpressRoutePortsLocationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified ExpressRoutePort resource. */
export interface ExpressRoutePortsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified ExpressRoutePort resource. */
export interface ExpressRoutePortsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified ExpressRoutePort resource. */
export interface ExpressRoutePortsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified ExpressRoutePort resource. */
export interface ExpressRoutePortsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the requested ExpressRoutePort resource. */
export interface ExpressRoutePortsGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRoutePortOutput;
}

/** Retrieves the requested ExpressRoutePort resource. */
export interface ExpressRoutePortsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates the specified ExpressRoutePort resource. */
export interface ExpressRoutePortsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ExpressRoutePortOutput;
}

/** Creates or updates the specified ExpressRoutePort resource. */
export interface ExpressRoutePortsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ExpressRoutePortOutput;
}

/** Creates or updates the specified ExpressRoutePort resource. */
export interface ExpressRoutePortsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Update ExpressRoutePort tags. */
export interface ExpressRoutePortsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: ExpressRoutePortOutput;
}

/** Update ExpressRoutePort tags. */
export interface ExpressRoutePortsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List all the ExpressRoutePort resources in the specified resource group. */
export interface ExpressRoutePortsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ExpressRoutePortListResultOutput;
}

/** List all the ExpressRoutePort resources in the specified resource group. */
export interface ExpressRoutePortsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List all the ExpressRoutePort resources in the specified subscription. */
export interface ExpressRoutePortsList200Response extends HttpResponse {
  status: "200";
  body: ExpressRoutePortListResultOutput;
}

/** List all the ExpressRoutePort resources in the specified subscription. */
export interface ExpressRoutePortsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Generate a letter of authorization for the requested ExpressRoutePort resource. */
export interface ExpressRoutePortsGenerateLOA200Response extends HttpResponse {
  status: "200";
  body: GenerateExpressRoutePortsLOAResultOutput;
}

/** Generate a letter of authorization for the requested ExpressRoutePort resource. */
export interface ExpressRoutePortsGenerateLOADefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the specified ExpressRouteLink resource. */
export interface ExpressRouteLinksGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteLinkOutput;
}

/** Retrieves the specified ExpressRouteLink resource. */
export interface ExpressRouteLinksGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieve the ExpressRouteLink sub-resources of the specified ExpressRoutePort resource. */
export interface ExpressRouteLinksList200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteLinkListResultOutput;
}

/** Retrieve the ExpressRouteLink sub-resources of the specified ExpressRoutePort resource. */
export interface ExpressRouteLinksListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified authorization from the specified express route port. */
export interface ExpressRoutePortAuthorizationsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified authorization from the specified express route port. */
export interface ExpressRoutePortAuthorizationsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified authorization from the specified express route port. */
export interface ExpressRoutePortAuthorizationsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified authorization from the specified express route port. */
export interface ExpressRoutePortAuthorizationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified authorization from the specified express route port. */
export interface ExpressRoutePortAuthorizationsGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRoutePortAuthorizationOutput;
}

/** Gets the specified authorization from the specified express route port. */
export interface ExpressRoutePortAuthorizationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates an authorization in the specified express route port. */
export interface ExpressRoutePortAuthorizationsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ExpressRoutePortAuthorizationOutput;
}

/** Creates or updates an authorization in the specified express route port. */
export interface ExpressRoutePortAuthorizationsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ExpressRoutePortAuthorizationOutput;
}

/** Creates or updates an authorization in the specified express route port. */
export interface ExpressRoutePortAuthorizationsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all authorizations in an express route port. */
export interface ExpressRoutePortAuthorizationsList200Response extends HttpResponse {
  status: "200";
  body: ExpressRoutePortAuthorizationListResultOutput;
}

/** Gets all authorizations in an express route port. */
export interface ExpressRoutePortAuthorizationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves all the ExpressRouteProviderPorts in a subscription. */
export interface ExpressRouteProviderPortsLocationList200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteProviderPortListResultOutput;
}

/** Retrieves all the ExpressRouteProviderPorts in a subscription. */
export interface ExpressRouteProviderPortsLocationListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified Firewall Policy. */
export interface FirewallPoliciesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified Firewall Policy. */
export interface FirewallPoliciesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified Firewall Policy. */
export interface FirewallPoliciesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified Firewall Policy. */
export interface FirewallPoliciesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified Firewall Policy. */
export interface FirewallPoliciesGet200Response extends HttpResponse {
  status: "200";
  body: FirewallPolicyOutput;
}

/** Gets the specified Firewall Policy. */
export interface FirewallPoliciesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates the specified Firewall Policy. */
export interface FirewallPoliciesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FirewallPolicyOutput;
}

/** Creates or updates the specified Firewall Policy. */
export interface FirewallPoliciesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FirewallPolicyOutput;
}

/** Creates or updates the specified Firewall Policy. */
export interface FirewallPoliciesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates tags of a Azure Firewall Policy resource. */
export interface FirewallPoliciesUpdateTags200Response extends HttpResponse {
  status: "200";
  body: FirewallPolicyOutput;
}

/** Updates tags of a Azure Firewall Policy resource. */
export interface FirewallPoliciesUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all Firewall Policies in a resource group. */
export interface FirewallPoliciesList200Response extends HttpResponse {
  status: "200";
  body: FirewallPolicyListResultOutput;
}

/** Lists all Firewall Policies in a resource group. */
export interface FirewallPoliciesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the Firewall Policies in a subscription. */
export interface FirewallPoliciesListAll200Response extends HttpResponse {
  status: "200";
  body: FirewallPolicyListResultOutput;
}

/** Gets all the Firewall Policies in a subscription. */
export interface FirewallPoliciesListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified FirewallPolicyRuleCollectionGroup. */
export interface FirewallPolicyRuleCollectionGroupsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified FirewallPolicyRuleCollectionGroup. */
export interface FirewallPolicyRuleCollectionGroupsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified FirewallPolicyRuleCollectionGroup. */
export interface FirewallPolicyRuleCollectionGroupsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified FirewallPolicyRuleCollectionGroup. */
export interface FirewallPolicyRuleCollectionGroupsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified FirewallPolicyRuleCollectionGroup. */
export interface FirewallPolicyRuleCollectionGroupsGet200Response extends HttpResponse {
  status: "200";
  body: FirewallPolicyRuleCollectionGroupOutput;
}

/** Gets the specified FirewallPolicyRuleCollectionGroup. */
export interface FirewallPolicyRuleCollectionGroupsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates the specified FirewallPolicyRuleCollectionGroup. */
export interface FirewallPolicyRuleCollectionGroupsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FirewallPolicyRuleCollectionGroupOutput;
}

/** Creates or updates the specified FirewallPolicyRuleCollectionGroup. */
export interface FirewallPolicyRuleCollectionGroupsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FirewallPolicyRuleCollectionGroupOutput;
}

/** Creates or updates the specified FirewallPolicyRuleCollectionGroup. */
export interface FirewallPolicyRuleCollectionGroupsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource. */
export interface FirewallPolicyRuleCollectionGroupsList200Response extends HttpResponse {
  status: "200";
  body: FirewallPolicyRuleCollectionGroupListResultOutput;
}

/** Lists all FirewallPolicyRuleCollectionGroups in a FirewallPolicy resource. */
export interface FirewallPolicyRuleCollectionGroupsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the current status of IDPS signatures for the relevant policy */
export interface FirewallPolicyIdpsSignaturesList200Response extends HttpResponse {
  status: "200";
  body: QueryResultsOutput;
}

/** Retrieves the current status of IDPS signatures for the relevant policy */
export interface FirewallPolicyIdpsSignaturesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Will update the status of policy's signature overrides for IDPS */
export interface FirewallPolicyIdpsSignaturesOverridesPatch200Response extends HttpResponse {
  status: "200";
  body: SignaturesOverridesOutput;
}

/** Will update the status of policy's signature overrides for IDPS */
export interface FirewallPolicyIdpsSignaturesOverridesPatchDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Will override/create a new signature overrides for the policy's IDPS */
export interface FirewallPolicyIdpsSignaturesOverridesPut200Response extends HttpResponse {
  status: "200";
  body: SignaturesOverridesOutput;
}

/** Will override/create a new signature overrides for the policy's IDPS */
export interface FirewallPolicyIdpsSignaturesOverridesPutDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Returns all signatures overrides for a specific policy. */
export interface FirewallPolicyIdpsSignaturesOverridesGet200Response extends HttpResponse {
  status: "200";
  body: SignaturesOverridesOutput;
}

/** Returns all signatures overrides for a specific policy. */
export interface FirewallPolicyIdpsSignaturesOverridesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Returns all signatures overrides objects for a specific policy as a list containing a single value. */
export interface FirewallPolicyIdpsSignaturesOverridesList200Response extends HttpResponse {
  status: "200";
  body: SignaturesOverridesListOutput;
}

/** Returns all signatures overrides objects for a specific policy as a list containing a single value. */
export interface FirewallPolicyIdpsSignaturesOverridesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the current filter values for the signatures overrides */
export interface FirewallPolicyIdpsSignaturesFilterValuesList200Response extends HttpResponse {
  status: "200";
  body: SignatureOverridesFilterValuesResponseOutput;
}

/** Retrieves the current filter values for the signatures overrides */
export interface FirewallPolicyIdpsSignaturesFilterValuesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified IpAllocation. */
export interface IpAllocationsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified IpAllocation. */
export interface IpAllocationsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified IpAllocation. */
export interface IpAllocationsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified IpAllocation. */
export interface IpAllocationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified IpAllocation by resource group. */
export interface IpAllocationsGet200Response extends HttpResponse {
  status: "200";
  body: IpAllocationOutput;
}

/** Gets the specified IpAllocation by resource group. */
export interface IpAllocationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates an IpAllocation in the specified resource group. */
export interface IpAllocationsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: IpAllocationOutput;
}

/** Creates or updates an IpAllocation in the specified resource group. */
export interface IpAllocationsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: IpAllocationOutput;
}

/** Creates or updates an IpAllocation in the specified resource group. */
export interface IpAllocationsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a IpAllocation tags. */
export interface IpAllocationsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: IpAllocationOutput;
}

/** Updates a IpAllocation tags. */
export interface IpAllocationsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all IpAllocations in a subscription. */
export interface IpAllocationsList200Response extends HttpResponse {
  status: "200";
  body: IpAllocationListResultOutput;
}

/** Gets all IpAllocations in a subscription. */
export interface IpAllocationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all IpAllocations in a resource group. */
export interface IpAllocationsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: IpAllocationListResultOutput;
}

/** Gets all IpAllocations in a resource group. */
export interface IpAllocationsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified ipGroups. */
export interface IpGroupsGet200Response extends HttpResponse {
  status: "200";
  body: IpGroupOutput;
}

/** Gets the specified ipGroups. */
export interface IpGroupsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Creates or updates an ipGroups in a specified resource group. */
export interface IpGroupsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: IpGroupOutput;
}

/** Creates or updates an ipGroups in a specified resource group. */
export interface IpGroupsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: IpGroupOutput;
}

/** Creates or updates an ipGroups in a specified resource group. */
export interface IpGroupsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Updates tags of an IpGroups resource. */
export interface IpGroupsUpdateGroups200Response extends HttpResponse {
  status: "200";
  body: IpGroupOutput;
}

/** Updates tags of an IpGroups resource. */
export interface IpGroupsUpdateGroupsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Deletes the specified ipGroups. */
export interface IpGroupsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified ipGroups. */
export interface IpGroupsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified ipGroups. */
export interface IpGroupsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified ipGroups. */
export interface IpGroupsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all IpGroups in a resource group. */
export interface IpGroupsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: IpGroupListResultOutput;
}

/** Gets all IpGroups in a resource group. */
export interface IpGroupsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all IpGroups in a subscription. */
export interface IpGroupsList200Response extends HttpResponse {
  status: "200";
  body: IpGroupListResultOutput;
}

/** Gets all IpGroups in a subscription. */
export interface IpGroupsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Deletes the specified load balancer. */
export interface LoadBalancersDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified load balancer. */
export interface LoadBalancersDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified load balancer. */
export interface LoadBalancersDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified load balancer. */
export interface LoadBalancersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified load balancer. */
export interface LoadBalancersGet200Response extends HttpResponse {
  status: "200";
  body: LoadBalancerOutput;
}

/** Gets the specified load balancer. */
export interface LoadBalancersGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a load balancer. */
export interface LoadBalancersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: LoadBalancerOutput;
}

/** Creates or updates a load balancer. */
export interface LoadBalancersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: LoadBalancerOutput;
}

/** Creates or updates a load balancer. */
export interface LoadBalancersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a load balancer tags. */
export interface LoadBalancersUpdateTags200Response extends HttpResponse {
  status: "200";
  body: LoadBalancerOutput;
}

/** Updates a load balancer tags. */
export interface LoadBalancersUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the load balancers in a subscription. */
export interface LoadBalancersListAll200Response extends HttpResponse {
  status: "200";
  body: LoadBalancerListResultOutput;
}

/** Gets all the load balancers in a subscription. */
export interface LoadBalancersListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the load balancers in a resource group. */
export interface LoadBalancersList200Response extends HttpResponse {
  status: "200";
  body: LoadBalancerListResultOutput;
}

/** Gets all the load balancers in a resource group. */
export interface LoadBalancersListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Swaps VIPs between two load balancers. */
export interface LoadBalancersSwapPublicIpAddresses200Response extends HttpResponse {
  status: "200";
}

/** Swaps VIPs between two load balancers. */
export interface LoadBalancersSwapPublicIpAddresses202Response extends HttpResponse {
  status: "202";
}

/** Swaps VIPs between two load balancers. */
export interface LoadBalancersSwapPublicIpAddressesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List of inbound NAT rule port mappings. */
export interface LoadBalancersListInboundNatRulePortMappings200Response extends HttpResponse {
  status: "200";
  body: BackendAddressInboundNatRulePortMappingsOutput;
}

/** List of inbound NAT rule port mappings. */
export interface LoadBalancersListInboundNatRulePortMappings202Response extends HttpResponse {
  status: "202";
  body: BackendAddressInboundNatRulePortMappingsOutput;
}

/** List of inbound NAT rule port mappings. */
export interface LoadBalancersListInboundNatRulePortMappingsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the load balancer backed address pools. */
export interface LoadBalancerBackendAddressPoolsList200Response extends HttpResponse {
  status: "200";
  body: LoadBalancerBackendAddressPoolListResultOutput;
}

/** Gets all the load balancer backed address pools. */
export interface LoadBalancerBackendAddressPoolsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets load balancer backend address pool. */
export interface LoadBalancerBackendAddressPoolsGet200Response extends HttpResponse {
  status: "200";
  body: BackendAddressPoolOutput;
}

/** Gets load balancer backend address pool. */
export interface LoadBalancerBackendAddressPoolsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a load balancer backend address pool. */
export interface LoadBalancerBackendAddressPoolsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: BackendAddressPoolOutput;
}

/** Creates or updates a load balancer backend address pool. */
export interface LoadBalancerBackendAddressPoolsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: BackendAddressPoolOutput;
}

/** Creates or updates a load balancer backend address pool. */
export interface LoadBalancerBackendAddressPoolsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified load balancer backend address pool. */
export interface LoadBalancerBackendAddressPoolsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified load balancer backend address pool. */
export interface LoadBalancerBackendAddressPoolsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified load balancer backend address pool. */
export interface LoadBalancerBackendAddressPoolsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified load balancer backend address pool. */
export interface LoadBalancerBackendAddressPoolsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the load balancer frontend IP configurations. */
export interface LoadBalancerFrontendIPConfigurationsList200Response extends HttpResponse {
  status: "200";
  body: LoadBalancerFrontendIPConfigurationListResultOutput;
}

/** Gets all the load balancer frontend IP configurations. */
export interface LoadBalancerFrontendIPConfigurationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets load balancer frontend IP configuration. */
export interface LoadBalancerFrontendIPConfigurationsGet200Response extends HttpResponse {
  status: "200";
  body: FrontendIPConfigurationOutput;
}

/** Gets load balancer frontend IP configuration. */
export interface LoadBalancerFrontendIPConfigurationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the inbound NAT rules in a load balancer. */
export interface InboundNatRulesList200Response extends HttpResponse {
  status: "200";
  body: InboundNatRuleListResultOutput;
}

/** Gets all the inbound NAT rules in a load balancer. */
export interface InboundNatRulesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified load balancer inbound NAT rule. */
export interface InboundNatRulesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified load balancer inbound NAT rule. */
export interface InboundNatRulesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified load balancer inbound NAT rule. */
export interface InboundNatRulesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified load balancer inbound NAT rule. */
export interface InboundNatRulesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified load balancer inbound NAT rule. */
export interface InboundNatRulesGet200Response extends HttpResponse {
  status: "200";
  body: InboundNatRuleOutput;
}

/** Gets the specified load balancer inbound NAT rule. */
export interface InboundNatRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a load balancer inbound NAT rule. */
export interface InboundNatRulesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: InboundNatRuleOutput;
}

/** Creates or updates a load balancer inbound NAT rule. */
export interface InboundNatRulesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: InboundNatRuleOutput;
}

/** Creates or updates a load balancer inbound NAT rule. */
export interface InboundNatRulesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the load balancing rules in a load balancer. */
export interface LoadBalancerLoadBalancingRulesList200Response extends HttpResponse {
  status: "200";
  body: LoadBalancerLoadBalancingRuleListResultOutput;
}

/** Gets all the load balancing rules in a load balancer. */
export interface LoadBalancerLoadBalancingRulesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified load balancer load balancing rule. */
export interface LoadBalancerLoadBalancingRulesGet200Response extends HttpResponse {
  status: "200";
  body: LoadBalancingRuleOutput;
}

/** Gets the specified load balancer load balancing rule. */
export interface LoadBalancerLoadBalancingRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the outbound rules in a load balancer. */
export interface LoadBalancerOutboundRulesList200Response extends HttpResponse {
  status: "200";
  body: LoadBalancerOutboundRuleListResultOutput;
}

/** Gets all the outbound rules in a load balancer. */
export interface LoadBalancerOutboundRulesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified load balancer outbound rule. */
export interface LoadBalancerOutboundRulesGet200Response extends HttpResponse {
  status: "200";
  body: OutboundRuleOutput;
}

/** Gets the specified load balancer outbound rule. */
export interface LoadBalancerOutboundRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets associated load balancer network interfaces. */
export interface LoadBalancerNetworkInterfacesList200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceListResultOutput;
}

/** Gets associated load balancer network interfaces. */
export interface LoadBalancerNetworkInterfacesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the load balancer probes. */
export interface LoadBalancerProbesList200Response extends HttpResponse {
  status: "200";
  body: LoadBalancerProbeListResultOutput;
}

/** Gets all the load balancer probes. */
export interface LoadBalancerProbesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets load balancer probe. */
export interface LoadBalancerProbesGet200Response extends HttpResponse {
  status: "200";
  body: ProbeOutput;
}

/** Gets load balancer probe. */
export interface LoadBalancerProbesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified nat gateway. */
export interface NatGatewaysDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified nat gateway. */
export interface NatGatewaysDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified nat gateway. */
export interface NatGatewaysDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified nat gateway. */
export interface NatGatewaysDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified nat gateway in a specified resource group. */
export interface NatGatewaysGet200Response extends HttpResponse {
  status: "200";
  body: NatGatewayOutput;
}

/** Gets the specified nat gateway in a specified resource group. */
export interface NatGatewaysGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a nat gateway. */
export interface NatGatewaysCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NatGatewayOutput;
}

/** Creates or updates a nat gateway. */
export interface NatGatewaysCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NatGatewayOutput;
}

/** Creates or updates a nat gateway. */
export interface NatGatewaysCreateOrUpdate202Response extends HttpResponse {
  status: "202";
}

/** Creates or updates a nat gateway. */
export interface NatGatewaysCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates nat gateway tags. */
export interface NatGatewaysUpdateTags200Response extends HttpResponse {
  status: "200";
  body: NatGatewayOutput;
}

/** Updates nat gateway tags. */
export interface NatGatewaysUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the Nat Gateways in a subscription. */
export interface NatGatewaysListAll200Response extends HttpResponse {
  status: "200";
  body: NatGatewayListResultOutput;
}

/** Gets all the Nat Gateways in a subscription. */
export interface NatGatewaysListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all nat gateways in a resource group. */
export interface NatGatewaysList200Response extends HttpResponse {
  status: "200";
  body: NatGatewayListResultOutput;
}

/** Gets all nat gateways in a resource group. */
export interface NatGatewaysListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get all ip configurations in a network interface. */
export interface NetworkInterfaceIPConfigurationsList200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceIPConfigurationListResultOutput;
}

/** Get all ip configurations in a network interface. */
export interface NetworkInterfaceIPConfigurationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified network interface ip configuration. */
export interface NetworkInterfaceIPConfigurationsGet200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceIPConfigurationOutput;
}

/** Gets the specified network interface ip configuration. */
export interface NetworkInterfaceIPConfigurationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List all load balancers in a network interface. */
export interface NetworkInterfaceLoadBalancersList200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceLoadBalancerListResultOutput;
}

/** List all load balancers in a network interface. */
export interface NetworkInterfaceLoadBalancersListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified tap configuration from the NetworkInterface. */
export interface NetworkInterfaceTapConfigurationsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified tap configuration from the NetworkInterface. */
export interface NetworkInterfaceTapConfigurationsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified tap configuration from the NetworkInterface. */
export interface NetworkInterfaceTapConfigurationsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified tap configuration from the NetworkInterface. */
export interface NetworkInterfaceTapConfigurationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get the specified tap configuration on a network interface. */
export interface NetworkInterfaceTapConfigurationsGet200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceTapConfigurationOutput;
}

/** Get the specified tap configuration on a network interface. */
export interface NetworkInterfaceTapConfigurationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a Tap configuration in the specified NetworkInterface. */
export interface NetworkInterfaceTapConfigurationsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceTapConfigurationOutput;
}

/** Creates or updates a Tap configuration in the specified NetworkInterface. */
export interface NetworkInterfaceTapConfigurationsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NetworkInterfaceTapConfigurationOutput;
}

/** Creates or updates a Tap configuration in the specified NetworkInterface. */
export interface NetworkInterfaceTapConfigurationsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get all Tap configurations in a network interface. */
export interface NetworkInterfaceTapConfigurationsList200Response extends HttpResponse {
  status: "200";
  body: NetworkInterfaceTapConfigurationListResultOutput;
}

/** Get all Tap configurations in a network interface. */
export interface NetworkInterfaceTapConfigurationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified Network Manager. */
export interface NetworkManagersGet200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerOutput;
}

/** Gets the specified Network Manager. */
export interface NetworkManagersGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a Network Manager. */
export interface NetworkManagersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerOutput;
}

/** Creates or updates a Network Manager. */
export interface NetworkManagersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NetworkManagerOutput;
}

/** Creates or updates a Network Manager. */
export interface NetworkManagersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a network manager. */
export interface NetworkManagersDelete200Response extends HttpResponse {
  status: "200";
}

export interface NetworkManagersDelete202Headers {
  /** The URL of the resource used to check the status of the asynchronous operation. */
  location?: string;
}

/** Deletes a network manager. */
export interface NetworkManagersDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & NetworkManagersDelete202Headers;
}

/** Deletes a network manager. */
export interface NetworkManagersDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a network manager. */
export interface NetworkManagersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Patch NetworkManager. */
export interface NetworkManagersPatch200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerOutput;
}

/** Patch NetworkManager. */
export interface NetworkManagersPatchDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List all network managers in a subscription. */
export interface NetworkManagersListBySubscription200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerListResultOutput;
}

/** List all network managers in a subscription. */
export interface NetworkManagersListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List network managers in a resource group. */
export interface NetworkManagersList200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerListResultOutput;
}

/** List network managers in a resource group. */
export interface NetworkManagersListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Post a Network Manager Commit. */
export interface NetworkManagerCommitsPost200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerCommitOutput;
}

export interface NetworkManagerCommitsPost202Headers {
  /** The URL of the resource used to check the status of the asynchronous operation. */
  location?: string;
}

/** Post a Network Manager Commit. */
export interface NetworkManagerCommitsPost202Response extends HttpResponse {
  status: "202";
  body: NetworkManagerCommitOutput;
  headers: RawHttpHeaders & NetworkManagerCommitsPost202Headers;
}

/** Post a Network Manager Commit. */
export interface NetworkManagerCommitsPostDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Post to List of Network Manager Deployment Status. */
export interface NetworkManagerDeploymentStatusList200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerDeploymentStatusListResultOutput;
}

/** Post to List of Network Manager Deployment Status. */
export interface NetworkManagerDeploymentStatusListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create a network manager connection on this subscription. */
export interface SubscriptionNetworkManagerConnectionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerConnectionOutput;
}

/** Create a network manager connection on this subscription. */
export interface SubscriptionNetworkManagerConnectionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NetworkManagerConnectionOutput;
}

/** Create a network manager connection on this subscription. */
export interface SubscriptionNetworkManagerConnectionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get a specified connection created by this subscription. */
export interface SubscriptionNetworkManagerConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerConnectionOutput;
}

/** Get a specified connection created by this subscription. */
export interface SubscriptionNetworkManagerConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete specified connection created by this subscription. */
export interface SubscriptionNetworkManagerConnectionsDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete specified connection created by this subscription. */
export interface SubscriptionNetworkManagerConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete specified connection created by this subscription. */
export interface SubscriptionNetworkManagerConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List all network manager connections created by this subscription. */
export interface SubscriptionNetworkManagerConnectionsList200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerConnectionListResultOutput;
}

/** List all network manager connections created by this subscription. */
export interface SubscriptionNetworkManagerConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create a network manager connection on this management group. */
export interface ManagementGroupNetworkManagerConnectionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerConnectionOutput;
}

/** Create a network manager connection on this management group. */
export interface ManagementGroupNetworkManagerConnectionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NetworkManagerConnectionOutput;
}

/** Create a network manager connection on this management group. */
export interface ManagementGroupNetworkManagerConnectionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get a specified connection created by this management group. */
export interface ManagementGroupNetworkManagerConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerConnectionOutput;
}

/** Get a specified connection created by this management group. */
export interface ManagementGroupNetworkManagerConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete specified pending connection created by this management group. */
export interface ManagementGroupNetworkManagerConnectionsDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete specified pending connection created by this management group. */
export interface ManagementGroupNetworkManagerConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete specified pending connection created by this management group. */
export interface ManagementGroupNetworkManagerConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List all network manager connections created by this management group. */
export interface ManagementGroupNetworkManagerConnectionsList200Response extends HttpResponse {
  status: "200";
  body: NetworkManagerConnectionListResultOutput;
}

/** List all network manager connections created by this management group. */
export interface ManagementGroupNetworkManagerConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a Network Connectivity Configuration, specified by the resource group, network manager name, and connectivity Configuration name */
export interface ConnectivityConfigurationsGet200Response extends HttpResponse {
  status: "200";
  body: ConnectivityConfigurationOutput;
}

/** Gets a Network Connectivity Configuration, specified by the resource group, network manager name, and connectivity Configuration name */
export interface ConnectivityConfigurationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates/Updates a new network manager connectivity configuration */
export interface ConnectivityConfigurationsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ConnectivityConfigurationOutput;
}

/** Creates/Updates a new network manager connectivity configuration */
export interface ConnectivityConfigurationsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ConnectivityConfigurationOutput;
}

/** Creates/Updates a new network manager connectivity configuration */
export interface ConnectivityConfigurationsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a network manager connectivity configuration, specified by the resource group, network manager name, and connectivity configuration name */
export interface ConnectivityConfigurationsDelete200Response extends HttpResponse {
  status: "200";
}

export interface ConnectivityConfigurationsDelete202Headers {
  /** The URL of the resource used to check the status of the asynchronous operation. */
  location?: string;
}

/** Deletes a network manager connectivity configuration, specified by the resource group, network manager name, and connectivity configuration name */
export interface ConnectivityConfigurationsDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ConnectivityConfigurationsDelete202Headers;
}

/** Deletes a network manager connectivity configuration, specified by the resource group, network manager name, and connectivity configuration name */
export interface ConnectivityConfigurationsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a network manager connectivity configuration, specified by the resource group, network manager name, and connectivity configuration name */
export interface ConnectivityConfigurationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the network manager connectivity configuration in a specified network manager. */
export interface ConnectivityConfigurationsList200Response extends HttpResponse {
  status: "200";
  body: ConnectivityConfigurationListResultOutput;
}

/** Lists all the network manager connectivity configuration in a specified network manager. */
export interface ConnectivityConfigurationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified network group. */
export interface NetworkGroupsGet200Response extends HttpResponse {
  status: "200";
  body: NetworkGroupOutput;
}

/** Gets the specified network group. */
export interface NetworkGroupsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

export interface NetworkGroupsCreateOrUpdate200Headers {
  /** The current entity tag. */
  etag?: string;
}

/** Creates or updates a network group. */
export interface NetworkGroupsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NetworkGroupOutput;
  headers: RawHttpHeaders & NetworkGroupsCreateOrUpdate200Headers;
}

export interface NetworkGroupsCreateOrUpdate201Headers {
  /** The current entity tag. */
  etag?: string;
}

/** Creates or updates a network group. */
export interface NetworkGroupsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NetworkGroupOutput;
  headers: RawHttpHeaders & NetworkGroupsCreateOrUpdate201Headers;
}

/** Creates or updates a network group. */
export interface NetworkGroupsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a network group. */
export interface NetworkGroupsDelete200Response extends HttpResponse {
  status: "200";
}

export interface NetworkGroupsDelete202Headers {
  /** The URL of the resource used to check the status of the asynchronous operation. */
  location?: string;
}

/** Deletes a network group. */
export interface NetworkGroupsDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & NetworkGroupsDelete202Headers;
}

/** Deletes a network group. */
export interface NetworkGroupsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a network group. */
export interface NetworkGroupsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists the specified network group. */
export interface NetworkGroupsList200Response extends HttpResponse {
  status: "200";
  body: NetworkGroupListResultOutput;
}

/** Lists the specified network group. */
export interface NetworkGroupsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified static member. */
export interface StaticMembersGet200Response extends HttpResponse {
  status: "200";
  body: StaticMemberOutput;
}

/** Gets the specified static member. */
export interface StaticMembersGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a static member. */
export interface StaticMembersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: StaticMemberOutput;
}

/** Creates or updates a static member. */
export interface StaticMembersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: StaticMemberOutput;
}

/** Creates or updates a static member. */
export interface StaticMembersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a static member. */
export interface StaticMembersDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a static member. */
export interface StaticMembersDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a static member. */
export interface StaticMembersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists the specified static member. */
export interface StaticMembersList200Response extends HttpResponse {
  status: "200";
  body: StaticMemberListResultOutput;
}

/** Lists the specified static member. */
export interface StaticMembersListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates scope connection from Network Manager */
export interface ScopeConnectionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ScopeConnectionOutput;
}

/** Creates or updates scope connection from Network Manager */
export interface ScopeConnectionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ScopeConnectionOutput;
}

/** Creates or updates scope connection from Network Manager */
export interface ScopeConnectionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get specified scope connection created by this Network Manager. */
export interface ScopeConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: ScopeConnectionOutput;
}

/** Get specified scope connection created by this Network Manager. */
export interface ScopeConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Delete the pending scope connection created by this network manager. */
export interface ScopeConnectionsDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete the pending scope connection created by this network manager. */
export interface ScopeConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Delete the pending scope connection created by this network manager. */
export interface ScopeConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List all scope connections created by this network manager. */
export interface ScopeConnectionsList200Response extends HttpResponse {
  status: "200";
  body: ScopeConnectionListResultOutput;
}

/** List all scope connections created by this network manager. */
export interface ScopeConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the network manager security admin configurations in a network manager, in a paginated format. */
export interface SecurityAdminConfigurationsList200Response extends HttpResponse {
  status: "200";
  body: SecurityAdminConfigurationListResultOutput;
}

/** Lists all the network manager security admin configurations in a network manager, in a paginated format. */
export interface SecurityAdminConfigurationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves a network manager security admin configuration. */
export interface SecurityAdminConfigurationsGet200Response extends HttpResponse {
  status: "200";
  body: SecurityAdminConfigurationOutput;
}

/** Retrieves a network manager security admin configuration. */
export interface SecurityAdminConfigurationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a network manager security admin configuration. */
export interface SecurityAdminConfigurationsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SecurityAdminConfigurationOutput;
}

/** Creates or updates a network manager security admin configuration. */
export interface SecurityAdminConfigurationsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SecurityAdminConfigurationOutput;
}

/** Creates or updates a network manager security admin configuration. */
export interface SecurityAdminConfigurationsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a network manager security admin configuration. */
export interface SecurityAdminConfigurationsDelete200Response extends HttpResponse {
  status: "200";
}

export interface SecurityAdminConfigurationsDelete202Headers {
  /** The URL of the resource used to check the status of the asynchronous operation. */
  location?: string;
}

/** Deletes a network manager security admin configuration. */
export interface SecurityAdminConfigurationsDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & SecurityAdminConfigurationsDelete202Headers;
}

/** Deletes a network manager security admin configuration. */
export interface SecurityAdminConfigurationsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a network manager security admin configuration. */
export interface SecurityAdminConfigurationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the rule collections in a security admin configuration, in a paginated format. */
export interface AdminRuleCollectionsList200Response extends HttpResponse {
  status: "200";
  body: AdminRuleCollectionListResultOutput;
}

/** Lists all the rule collections in a security admin configuration, in a paginated format. */
export interface AdminRuleCollectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a network manager security admin configuration rule collection. */
export interface AdminRuleCollectionsGet200Response extends HttpResponse {
  status: "200";
  body: AdminRuleCollectionOutput;
}

/** Gets a network manager security admin configuration rule collection. */
export interface AdminRuleCollectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates an admin rule collection. */
export interface AdminRuleCollectionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: AdminRuleCollectionOutput;
}

/** Creates or updates an admin rule collection. */
export interface AdminRuleCollectionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: AdminRuleCollectionOutput;
}

/** Creates or updates an admin rule collection. */
export interface AdminRuleCollectionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes an admin rule collection. */
export interface AdminRuleCollectionsDelete200Response extends HttpResponse {
  status: "200";
}

export interface AdminRuleCollectionsDelete202Headers {
  /** The URL of the resource used to check the status of the asynchronous operation. */
  location?: string;
}

/** Deletes an admin rule collection. */
export interface AdminRuleCollectionsDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AdminRuleCollectionsDelete202Headers;
}

/** Deletes an admin rule collection. */
export interface AdminRuleCollectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes an admin rule collection. */
export interface AdminRuleCollectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List all network manager security configuration admin rules. */
export interface AdminRulesList200Response extends HttpResponse {
  status: "200";
  body: AdminRuleListResultOutput;
}

/** List all network manager security configuration admin rules. */
export interface AdminRulesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a network manager security configuration admin rule. */
export interface AdminRulesGet200Response extends HttpResponse {
  status: "200";
  body: BaseAdminRuleOutput;
}

/** Gets a network manager security configuration admin rule. */
export interface AdminRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates an admin rule. */
export interface AdminRulesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: BaseAdminRuleOutput;
}

/** Creates or updates an admin rule. */
export interface AdminRulesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: BaseAdminRuleOutput;
}

/** Creates or updates an admin rule. */
export interface AdminRulesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes an admin rule. */
export interface AdminRulesDelete200Response extends HttpResponse {
  status: "200";
}

export interface AdminRulesDelete202Headers {
  /** The URL of the resource used to check the status of the asynchronous operation. */
  location?: string;
}

/** Deletes an admin rule. */
export interface AdminRulesDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & AdminRulesDelete202Headers;
}

/** Deletes an admin rule. */
export interface AdminRulesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes an admin rule. */
export interface AdminRulesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified network profile. */
export interface NetworkProfilesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified network profile. */
export interface NetworkProfilesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified network profile. */
export interface NetworkProfilesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified network profile. */
export interface NetworkProfilesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified network profile in a specified resource group. */
export interface NetworkProfilesGet200Response extends HttpResponse {
  status: "200";
  body: NetworkProfileOutput;
}

/** Gets the specified network profile in a specified resource group. */
export interface NetworkProfilesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a network profile. */
export interface NetworkProfilesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NetworkProfileOutput;
}

/** Creates or updates a network profile. */
export interface NetworkProfilesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NetworkProfileOutput;
}

/** Creates or updates a network profile. */
export interface NetworkProfilesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates network profile tags. */
export interface NetworkProfilesUpdateTags200Response extends HttpResponse {
  status: "200";
  body: NetworkProfileOutput;
}

/** Updates network profile tags. */
export interface NetworkProfilesUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the network profiles in a subscription. */
export interface NetworkProfilesListAll200Response extends HttpResponse {
  status: "200";
  body: NetworkProfileListResultOutput;
}

/** Gets all the network profiles in a subscription. */
export interface NetworkProfilesListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all network profiles in a resource group. */
export interface NetworkProfilesList200Response extends HttpResponse {
  status: "200";
  body: NetworkProfileListResultOutput;
}

/** Gets all network profiles in a resource group. */
export interface NetworkProfilesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified network security group. */
export interface NetworkSecurityGroupsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified network security group. */
export interface NetworkSecurityGroupsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified network security group. */
export interface NetworkSecurityGroupsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified network security group. */
export interface NetworkSecurityGroupsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified network security group. */
export interface NetworkSecurityGroupsGet200Response extends HttpResponse {
  status: "200";
  body: NetworkSecurityGroupOutput;
}

/** Gets the specified network security group. */
export interface NetworkSecurityGroupsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a network security group in the specified resource group. */
export interface NetworkSecurityGroupsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NetworkSecurityGroupOutput;
}

/** Creates or updates a network security group in the specified resource group. */
export interface NetworkSecurityGroupsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NetworkSecurityGroupOutput;
}

/** Creates or updates a network security group in the specified resource group. */
export interface NetworkSecurityGroupsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a network security group tags. */
export interface NetworkSecurityGroupsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: NetworkSecurityGroupOutput;
}

/** Updates a network security group tags. */
export interface NetworkSecurityGroupsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all network security groups in a subscription. */
export interface NetworkSecurityGroupsListAll200Response extends HttpResponse {
  status: "200";
  body: NetworkSecurityGroupListResultOutput;
}

/** Gets all network security groups in a subscription. */
export interface NetworkSecurityGroupsListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all network security groups in a resource group. */
export interface NetworkSecurityGroupsList200Response extends HttpResponse {
  status: "200";
  body: NetworkSecurityGroupListResultOutput;
}

/** Gets all network security groups in a resource group. */
export interface NetworkSecurityGroupsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified network security rule. */
export interface SecurityRulesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified network security rule. */
export interface SecurityRulesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified network security rule. */
export interface SecurityRulesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified network security rule. */
export interface SecurityRulesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get the specified network security rule. */
export interface SecurityRulesGet200Response extends HttpResponse {
  status: "200";
  body: SecurityRuleOutput;
}

/** Get the specified network security rule. */
export interface SecurityRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a security rule in the specified network security group. */
export interface SecurityRulesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SecurityRuleOutput;
}

/** Creates or updates a security rule in the specified network security group. */
export interface SecurityRulesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SecurityRuleOutput;
}

/** Creates or updates a security rule in the specified network security group. */
export interface SecurityRulesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all security rules in a network security group. */
export interface SecurityRulesList200Response extends HttpResponse {
  status: "200";
  body: SecurityRuleListResultOutput;
}

/** Gets all security rules in a network security group. */
export interface SecurityRulesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all default security rules in a network security group. */
export interface DefaultSecurityRulesList200Response extends HttpResponse {
  status: "200";
  body: SecurityRuleListResultOutput;
}

/** Gets all default security rules in a network security group. */
export interface DefaultSecurityRulesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get the specified default network security rule. */
export interface DefaultSecurityRulesGet200Response extends HttpResponse {
  status: "200";
  body: SecurityRuleOutput;
}

/** Get the specified default network security rule. */
export interface DefaultSecurityRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified Network Virtual Appliance. */
export interface NetworkVirtualAppliancesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified Network Virtual Appliance. */
export interface NetworkVirtualAppliancesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified Network Virtual Appliance. */
export interface NetworkVirtualAppliancesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified Network Virtual Appliance. */
export interface NetworkVirtualAppliancesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified Network Virtual Appliance. */
export interface NetworkVirtualAppliancesGet200Response extends HttpResponse {
  status: "200";
  body: NetworkVirtualApplianceOutput;
}

/** Gets the specified Network Virtual Appliance. */
export interface NetworkVirtualAppliancesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a Network Virtual Appliance. */
export interface NetworkVirtualAppliancesUpdateTags200Response extends HttpResponse {
  status: "200";
  body: NetworkVirtualApplianceOutput;
}

/** Updates a Network Virtual Appliance. */
export interface NetworkVirtualAppliancesUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates the specified Network Virtual Appliance. */
export interface NetworkVirtualAppliancesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NetworkVirtualApplianceOutput;
}

/** Creates or updates the specified Network Virtual Appliance. */
export interface NetworkVirtualAppliancesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NetworkVirtualApplianceOutput;
}

/** Creates or updates the specified Network Virtual Appliance. */
export interface NetworkVirtualAppliancesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all Network Virtual Appliances in a resource group. */
export interface NetworkVirtualAppliancesListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: NetworkVirtualApplianceListResultOutput;
}

/** Lists all Network Virtual Appliances in a resource group. */
export interface NetworkVirtualAppliancesListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all Network Virtual Appliances in a subscription. */
export interface NetworkVirtualAppliancesList200Response extends HttpResponse {
  status: "200";
  body: NetworkVirtualApplianceListResultOutput;
}

/** Gets all Network Virtual Appliances in a subscription. */
export interface NetworkVirtualAppliancesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified site from a Virtual Appliance. */
export interface VirtualApplianceSitesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified site from a Virtual Appliance. */
export interface VirtualApplianceSitesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified site from a Virtual Appliance. */
export interface VirtualApplianceSitesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified site from a Virtual Appliance. */
export interface VirtualApplianceSitesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified Virtual Appliance Site. */
export interface VirtualApplianceSitesGet200Response extends HttpResponse {
  status: "200";
  body: VirtualApplianceSiteOutput;
}

/** Gets the specified Virtual Appliance Site. */
export interface VirtualApplianceSitesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates the specified Network Virtual Appliance Site. */
export interface VirtualApplianceSitesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualApplianceSiteOutput;
}

/** Creates or updates the specified Network Virtual Appliance Site. */
export interface VirtualApplianceSitesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualApplianceSiteOutput;
}

/** Creates or updates the specified Network Virtual Appliance Site. */
export interface VirtualApplianceSitesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource. */
export interface VirtualApplianceSitesList200Response extends HttpResponse {
  status: "200";
  body: NetworkVirtualApplianceSiteListResultOutput;
}

/** Lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource. */
export interface VirtualApplianceSitesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List all SKUs available for a virtual appliance. */
export interface VirtualApplianceSkusList200Response extends HttpResponse {
  status: "200";
  body: NetworkVirtualApplianceSkuListResultOutput;
}

/** List all SKUs available for a virtual appliance. */
export interface VirtualApplianceSkusListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves a single available sku for network virtual appliance. */
export interface VirtualApplianceSkusGet200Response extends HttpResponse {
  status: "200";
  body: NetworkVirtualApplianceSkuOutput;
}

/** Retrieves a single available sku for network virtual appliance. */
export interface VirtualApplianceSkusGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates the specified Network Virtual Appliance Inbound Security Rules. */
export interface InboundSecurityRuleCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: InboundSecurityRuleOutput;
}

/** Creates or updates the specified Network Virtual Appliance Inbound Security Rules. */
export interface InboundSecurityRuleCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: InboundSecurityRuleOutput;
}

/** Creates or updates the specified Network Virtual Appliance Inbound Security Rules. */
export interface InboundSecurityRuleCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a network watcher in the specified resource group. */
export interface NetworkWatchersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: NetworkWatcherOutput;
}

/** Creates or updates a network watcher in the specified resource group. */
export interface NetworkWatchersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: NetworkWatcherOutput;
}

/** Creates or updates a network watcher in the specified resource group. */
export interface NetworkWatchersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the specified network watcher by resource group. */
export interface NetworkWatchersGet200Response extends HttpResponse {
  status: "200";
  body: NetworkWatcherOutput;
}

/** Gets the specified network watcher by resource group. */
export interface NetworkWatchersGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Deletes the specified network watcher resource. */
export interface NetworkWatchersDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified network watcher resource. */
export interface NetworkWatchersDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified network watcher resource. */
export interface NetworkWatchersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Updates a network watcher tags. */
export interface NetworkWatchersUpdateTags200Response extends HttpResponse {
  status: "200";
  body: NetworkWatcherOutput;
}

/** Updates a network watcher tags. */
export interface NetworkWatchersUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets all network watchers by resource group. */
export interface NetworkWatchersList200Response extends HttpResponse {
  status: "200";
  body: NetworkWatcherListResultOutput;
}

/** Gets all network watchers by resource group. */
export interface NetworkWatchersListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets all network watchers by subscription. */
export interface NetworkWatchersListAll200Response extends HttpResponse {
  status: "200";
  body: NetworkWatcherListResultOutput;
}

/** Gets all network watchers by subscription. */
export interface NetworkWatchersListAllDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the current network topology by resource group. */
export interface NetworkWatchersGetTopology200Response extends HttpResponse {
  status: "200";
  body: TopologyOutput;
}

/** Gets the current network topology by resource group. */
export interface NetworkWatchersGetTopologyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Verify IP flow from the specified VM to a location given the currently configured NSG rules. */
export interface NetworkWatchersVerifyIPFlow200Response extends HttpResponse {
  status: "200";
  body: VerificationIPFlowResultOutput;
}

/** Verify IP flow from the specified VM to a location given the currently configured NSG rules. */
export interface NetworkWatchersVerifyIPFlow202Response extends HttpResponse {
  status: "202";
  body: VerificationIPFlowResultOutput;
}

/** Verify IP flow from the specified VM to a location given the currently configured NSG rules. */
export interface NetworkWatchersVerifyIPFlowDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the next hop from the specified VM. */
export interface NetworkWatchersGetNextHop200Response extends HttpResponse {
  status: "200";
  body: NextHopResultOutput;
}

/** Gets the next hop from the specified VM. */
export interface NetworkWatchersGetNextHop202Response extends HttpResponse {
  status: "202";
  body: NextHopResultOutput;
}

/** Gets the next hop from the specified VM. */
export interface NetworkWatchersGetNextHopDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the configured and effective security group rules on the specified VM. */
export interface NetworkWatchersGetVMSecurityRules200Response extends HttpResponse {
  status: "200";
  body: SecurityGroupViewResultOutput;
}

/** Gets the configured and effective security group rules on the specified VM. */
export interface NetworkWatchersGetVMSecurityRules202Response extends HttpResponse {
  status: "202";
  body: SecurityGroupViewResultOutput;
}

/** Gets the configured and effective security group rules on the specified VM. */
export interface NetworkWatchersGetVMSecurityRulesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Initiate troubleshooting on a specified resource. */
export interface NetworkWatchersGetTroubleshooting200Response extends HttpResponse {
  status: "200";
  body: TroubleshootingResultOutput;
}

/** Initiate troubleshooting on a specified resource. */
export interface NetworkWatchersGetTroubleshooting202Response extends HttpResponse {
  status: "202";
  body: TroubleshootingResultOutput;
}

/** Initiate troubleshooting on a specified resource. */
export interface NetworkWatchersGetTroubleshootingDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Get the last completed troubleshooting result on a specified resource. */
export interface NetworkWatchersGetTroubleshootingResult200Response extends HttpResponse {
  status: "200";
  body: TroubleshootingResultOutput;
}

/** Get the last completed troubleshooting result on a specified resource. */
export interface NetworkWatchersGetTroubleshootingResult202Response extends HttpResponse {
  status: "202";
  body: TroubleshootingResultOutput;
}

/** Get the last completed troubleshooting result on a specified resource. */
export interface NetworkWatchersGetTroubleshootingResultDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Configures flow log and traffic analytics (optional) on a specified resource. */
export interface NetworkWatchersSetFlowLogConfiguration200Response extends HttpResponse {
  status: "200";
  body: FlowLogInformationOutput;
}

/** Configures flow log and traffic analytics (optional) on a specified resource. */
export interface NetworkWatchersSetFlowLogConfiguration202Response extends HttpResponse {
  status: "202";
  body: FlowLogInformationOutput;
}

/** Configures flow log and traffic analytics (optional) on a specified resource. */
export interface NetworkWatchersSetFlowLogConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Queries status of flow log and traffic analytics (optional) on a specified resource. */
export interface NetworkWatchersGetFlowLogStatus200Response extends HttpResponse {
  status: "200";
  body: FlowLogInformationOutput;
}

/** Queries status of flow log and traffic analytics (optional) on a specified resource. */
export interface NetworkWatchersGetFlowLogStatus202Response extends HttpResponse {
  status: "202";
  body: FlowLogInformationOutput;
}

/** Queries status of flow log and traffic analytics (optional) on a specified resource. */
export interface NetworkWatchersGetFlowLogStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Verifies the possibility of establishing a direct TCP connection from a virtual machine to a given endpoint including another VM or an arbitrary remote server. */
export interface NetworkWatchersCheckConnectivity200Response extends HttpResponse {
  status: "200";
  body: ConnectivityInformationOutput;
}

/** Verifies the possibility of establishing a direct TCP connection from a virtual machine to a given endpoint including another VM or an arbitrary remote server. */
export interface NetworkWatchersCheckConnectivity202Response extends HttpResponse {
  status: "202";
  body: ConnectivityInformationOutput;
}

/** Verifies the possibility of establishing a direct TCP connection from a virtual machine to a given endpoint including another VM or an arbitrary remote server. */
export interface NetworkWatchersCheckConnectivityDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** NOTE: This feature is currently in preview and still being tested for stability. Gets the relative latency score for internet service providers from a specified location to Azure regions. */
export interface NetworkWatchersGetAzureReachabilityReport200Response extends HttpResponse {
  status: "200";
  body: AzureReachabilityReportOutput;
}

/** NOTE: This feature is currently in preview and still being tested for stability. Gets the relative latency score for internet service providers from a specified location to Azure regions. */
export interface NetworkWatchersGetAzureReachabilityReport202Response extends HttpResponse {
  status: "202";
  body: AzureReachabilityReportOutput;
}

/** NOTE: This feature is currently in preview and still being tested for stability. Gets the relative latency score for internet service providers from a specified location to Azure regions. */
export interface NetworkWatchersGetAzureReachabilityReportDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** NOTE: This feature is currently in preview and still being tested for stability. Lists all available internet service providers for a specified Azure region. */
export interface NetworkWatchersListAvailableProviders200Response extends HttpResponse {
  status: "200";
  body: AvailableProvidersListOutput;
}

/** NOTE: This feature is currently in preview and still being tested for stability. Lists all available internet service providers for a specified Azure region. */
export interface NetworkWatchersListAvailableProviders202Response extends HttpResponse {
  status: "202";
  body: AvailableProvidersListOutput;
}

/** NOTE: This feature is currently in preview and still being tested for stability. Lists all available internet service providers for a specified Azure region. */
export interface NetworkWatchersListAvailableProvidersDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results. */
export interface NetworkWatchersGetNetworkConfigurationDiagnostic200Response extends HttpResponse {
  status: "200";
  body: NetworkConfigurationDiagnosticResponseOutput;
}

/** Gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results. */
export interface NetworkWatchersGetNetworkConfigurationDiagnostic202Response extends HttpResponse {
  status: "202";
  body: NetworkConfigurationDiagnosticResponseOutput;
}

/** Gets Network Configuration Diagnostic data to help customers understand and debug network behavior. It provides detailed information on what security rules were applied to a specified traffic flow and the result of evaluating these rules. Customers must provide details of a flow like source, destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules evaluated for the specified flow and the evaluation results. */
export interface NetworkWatchersGetNetworkConfigurationDiagnosticDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Create and start a packet capture on the specified VM. */
export interface PacketCapturesCreate201Response extends HttpResponse {
  status: "201";
  body: PacketCaptureResultOutput;
}

/** Create and start a packet capture on the specified VM. */
export interface PacketCapturesCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets a packet capture session by name. */
export interface PacketCapturesGet200Response extends HttpResponse {
  status: "200";
  body: PacketCaptureResultOutput;
}

/** Gets a packet capture session by name. */
export interface PacketCapturesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Deletes the specified packet capture session. */
export interface PacketCapturesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified packet capture session. */
export interface PacketCapturesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified packet capture session. */
export interface PacketCapturesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Stops a specified packet capture session. */
export interface PacketCapturesStop200Response extends HttpResponse {
  status: "200";
}

/** Stops a specified packet capture session. */
export interface PacketCapturesStop202Response extends HttpResponse {
  status: "202";
}

/** Stops a specified packet capture session. */
export interface PacketCapturesStopDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Query the status of a running packet capture session. */
export interface PacketCapturesGetStatus200Response extends HttpResponse {
  status: "200";
  body: PacketCaptureQueryStatusResultOutput;
}

/** Query the status of a running packet capture session. */
export interface PacketCapturesGetStatus202Response extends HttpResponse {
  status: "202";
  body: PacketCaptureQueryStatusResultOutput;
}

/** Query the status of a running packet capture session. */
export interface PacketCapturesGetStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists all packet capture sessions within the specified resource group. */
export interface PacketCapturesList200Response extends HttpResponse {
  status: "200";
  body: PacketCaptureListResultOutput;
}

/** Lists all packet capture sessions within the specified resource group. */
export interface PacketCapturesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Create or update a connection monitor. */
export interface ConnectionMonitorsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ConnectionMonitorResultOutput;
}

/** Create or update a connection monitor. */
export interface ConnectionMonitorsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ConnectionMonitorResultOutput;
}

/** Create or update a connection monitor. */
export interface ConnectionMonitorsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets a connection monitor by name. */
export interface ConnectionMonitorsGet200Response extends HttpResponse {
  status: "200";
  body: ConnectionMonitorResultOutput;
}

/** Gets a connection monitor by name. */
export interface ConnectionMonitorsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Deletes the specified connection monitor. */
export interface ConnectionMonitorsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified connection monitor. */
export interface ConnectionMonitorsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified connection monitor. */
export interface ConnectionMonitorsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Update tags of the specified connection monitor. */
export interface ConnectionMonitorsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: ConnectionMonitorResultOutput;
}

/** Update tags of the specified connection monitor. */
export interface ConnectionMonitorsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Stops the specified connection monitor. */
export interface ConnectionMonitorsStop200Response extends HttpResponse {
  status: "200";
}

/** Stops the specified connection monitor. */
export interface ConnectionMonitorsStop202Response extends HttpResponse {
  status: "202";
}

/** Stops the specified connection monitor. */
export interface ConnectionMonitorsStopDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Starts the specified connection monitor. */
export interface ConnectionMonitorsStart200Response extends HttpResponse {
  status: "200";
}

/** Starts the specified connection monitor. */
export interface ConnectionMonitorsStart202Response extends HttpResponse {
  status: "202";
}

/** Starts the specified connection monitor. */
export interface ConnectionMonitorsStartDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Query a snapshot of the most recent connection states. */
export interface ConnectionMonitorsQuery200Response extends HttpResponse {
  status: "200";
  body: ConnectionMonitorQueryResultOutput;
}

/** Query a snapshot of the most recent connection states. */
export interface ConnectionMonitorsQuery202Response extends HttpResponse {
  status: "202";
  body: ConnectionMonitorQueryResultOutput;
}

/** Query a snapshot of the most recent connection states. */
export interface ConnectionMonitorsQueryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists all connection monitors for the specified Network Watcher. */
export interface ConnectionMonitorsList200Response extends HttpResponse {
  status: "200";
  body: ConnectionMonitorListResultOutput;
}

/** Lists all connection monitors for the specified Network Watcher. */
export interface ConnectionMonitorsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Create or update a flow log for the specified network security group. */
export interface FlowLogsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FlowLogOutput;
}

/** Create or update a flow log for the specified network security group. */
export interface FlowLogsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FlowLogOutput;
}

/** Create or update a flow log for the specified network security group. */
export interface FlowLogsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Update tags of the specified flow log. */
export interface FlowLogsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: FlowLogOutput;
}

/** Update tags of the specified flow log. */
export interface FlowLogsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets a flow log resource by name. */
export interface FlowLogsGet200Response extends HttpResponse {
  status: "200";
  body: FlowLogOutput;
}

/** Gets a flow log resource by name. */
export interface FlowLogsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Deletes the specified flow log resource. */
export interface FlowLogsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified flow log resource. */
export interface FlowLogsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified flow log resource. */
export interface FlowLogsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists all flow log resources for the specified Network Watcher. */
export interface FlowLogsList200Response extends HttpResponse {
  status: "200";
  body: FlowLogListResultOutput;
}

/** Lists all flow log resources for the specified Network Watcher. */
export interface FlowLogsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists all of the available Network Rest API operations. */
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: OperationListResultOutput;
}

/** Lists all of the available Network Rest API operations. */
export interface OperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified private endpoint. */
export interface PrivateEndpointsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified private endpoint. */
export interface PrivateEndpointsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified private endpoint. */
export interface PrivateEndpointsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified private endpoint. */
export interface PrivateEndpointsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets the specified private endpoint by resource group. */
export interface PrivateEndpointsGet200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointOutput;
}

/** Gets the specified private endpoint by resource group. */
export interface PrivateEndpointsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Creates or updates an private endpoint in the specified resource group. */
export interface PrivateEndpointsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointOutput;
}

/** Creates or updates an private endpoint in the specified resource group. */
export interface PrivateEndpointsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PrivateEndpointOutput;
}

/** Creates or updates an private endpoint in the specified resource group. */
export interface PrivateEndpointsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all private endpoints in a resource group. */
export interface PrivateEndpointsList200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointListResultOutput;
}

/** Gets all private endpoints in a resource group. */
export interface PrivateEndpointsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all private endpoints in a subscription. */
export interface PrivateEndpointsListBySubscription200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointListResultOutput;
}

/** Gets all private endpoints in a subscription. */
export interface PrivateEndpointsListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Returns all of the resource types that can be linked to a Private Endpoint in this subscription in this region. */
export interface AvailablePrivateEndpointTypesList200Response extends HttpResponse {
  status: "200";
  body: AvailablePrivateEndpointTypesResultOutput;
}

/** Returns all of the resource types that can be linked to a Private Endpoint in this subscription in this region. */
export interface AvailablePrivateEndpointTypesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Returns all of the resource types that can be linked to a Private Endpoint in this subscription in this region. */
export interface AvailablePrivateEndpointTypesListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: AvailablePrivateEndpointTypesResultOutput;
}

/** Returns all of the resource types that can be linked to a Private Endpoint in this subscription in this region. */
export interface AvailablePrivateEndpointTypesListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified private dns zone group. */
export interface PrivateDnsZoneGroupsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified private dns zone group. */
export interface PrivateDnsZoneGroupsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified private dns zone group. */
export interface PrivateDnsZoneGroupsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified private dns zone group. */
export interface PrivateDnsZoneGroupsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the private dns zone group resource by specified private dns zone group name. */
export interface PrivateDnsZoneGroupsGet200Response extends HttpResponse {
  status: "200";
  body: PrivateDnsZoneGroupOutput;
}

/** Gets the private dns zone group resource by specified private dns zone group name. */
export interface PrivateDnsZoneGroupsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a private dns zone group in the specified private endpoint. */
export interface PrivateDnsZoneGroupsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PrivateDnsZoneGroupOutput;
}

/** Creates or updates a private dns zone group in the specified private endpoint. */
export interface PrivateDnsZoneGroupsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PrivateDnsZoneGroupOutput;
}

/** Creates or updates a private dns zone group in the specified private endpoint. */
export interface PrivateDnsZoneGroupsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all private dns zone groups in a private endpoint. */
export interface PrivateDnsZoneGroupsList200Response extends HttpResponse {
  status: "200";
  body: PrivateDnsZoneGroupListResultOutput;
}

/** Gets all private dns zone groups in a private endpoint. */
export interface PrivateDnsZoneGroupsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Deletes the specified private link service. */
export interface PrivateLinkServicesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified private link service. */
export interface PrivateLinkServicesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified private link service. */
export interface PrivateLinkServicesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified private link service. */
export interface PrivateLinkServicesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets the specified private link service by resource group. */
export interface PrivateLinkServicesGet200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkServiceOutput;
}

/** Gets the specified private link service by resource group. */
export interface PrivateLinkServicesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Creates or updates an private link service in the specified resource group. */
export interface PrivateLinkServicesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkServiceOutput;
}

/** Creates or updates an private link service in the specified resource group. */
export interface PrivateLinkServicesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PrivateLinkServiceOutput;
}

/** Creates or updates an private link service in the specified resource group. */
export interface PrivateLinkServicesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all private link services in a resource group. */
export interface PrivateLinkServicesList200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkServiceListResultOutput;
}

/** Gets all private link services in a resource group. */
export interface PrivateLinkServicesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all private link service in a subscription. */
export interface PrivateLinkServicesListBySubscription200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkServiceListResultOutput;
}

/** Gets all private link service in a subscription. */
export interface PrivateLinkServicesListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get the specific private end point connection by specific private link service in the resource group. */
export interface PrivateLinkServicesGetPrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionOutput;
}

/** Get the specific private end point connection by specific private link service in the resource group. */
export interface PrivateLinkServicesGetPrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Approve or reject private end point connection for a private link service in a subscription. */
export interface PrivateLinkServicesUpdatePrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionOutput;
}

/** Approve or reject private end point connection for a private link service in a subscription. */
export interface PrivateLinkServicesUpdatePrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Delete private end point connection for a private link service in a subscription. */
export interface PrivateLinkServicesDeletePrivateEndpointConnection200Response extends HttpResponse {
  status: "200";
}

/** Delete private end point connection for a private link service in a subscription. */
export interface PrivateLinkServicesDeletePrivateEndpointConnection202Response extends HttpResponse {
  status: "202";
}

/** Delete private end point connection for a private link service in a subscription. */
export interface PrivateLinkServicesDeletePrivateEndpointConnection204Response extends HttpResponse {
  status: "204";
}

/** Delete private end point connection for a private link service in a subscription. */
export interface PrivateLinkServicesDeletePrivateEndpointConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all private end point connections for a specific private link service. */
export interface PrivateLinkServicesListPrivateEndpointConnections200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionListResultOutput;
}

/** Gets all private end point connections for a specific private link service. */
export interface PrivateLinkServicesListPrivateEndpointConnectionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Checks whether the subscription is visible to private link service. */
export interface PrivateLinkServicesCheckPrivateLinkServiceVisibility200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkServiceVisibilityOutput;
}

/** Checks whether the subscription is visible to private link service. */
export interface PrivateLinkServicesCheckPrivateLinkServiceVisibility202Response extends HttpResponse {
  status: "202";
}

/** Checks whether the subscription is visible to private link service. */
export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Checks whether the subscription is visible to private link service in the specified resource group. */
export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkServiceVisibilityOutput;
}

/** Checks whether the subscription is visible to private link service in the specified resource group. */
export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroup202Response extends HttpResponse {
  status: "202";
}

/** Checks whether the subscription is visible to private link service in the specified resource group. */
export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region. */
export interface PrivateLinkServicesListAutoApprovedPrivateLinkServices200Response extends HttpResponse {
  status: "200";
  body: AutoApprovedPrivateLinkServicesResultOutput;
}

/** Returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region. */
export interface PrivateLinkServicesListAutoApprovedPrivateLinkServicesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region. */
export interface PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: AutoApprovedPrivateLinkServicesResultOutput;
}

/** Returns all of the private link service ids that can be linked to a Private Endpoint with auto approved in this subscription in this region. */
export interface PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified public IP prefix. */
export interface PublicIPPrefixesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified public IP prefix. */
export interface PublicIPPrefixesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified public IP prefix. */
export interface PublicIPPrefixesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified public IP prefix. */
export interface PublicIPPrefixesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified public IP prefix in a specified resource group. */
export interface PublicIPPrefixesGet200Response extends HttpResponse {
  status: "200";
  body: PublicIPPrefixOutput;
}

/** Gets the specified public IP prefix in a specified resource group. */
export interface PublicIPPrefixesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a static or dynamic public IP prefix. */
export interface PublicIPPrefixesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: PublicIPPrefixOutput;
}

/** Creates or updates a static or dynamic public IP prefix. */
export interface PublicIPPrefixesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: PublicIPPrefixOutput;
}

/** Creates or updates a static or dynamic public IP prefix. */
export interface PublicIPPrefixesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates public IP prefix tags. */
export interface PublicIPPrefixesUpdateTags200Response extends HttpResponse {
  status: "200";
  body: PublicIPPrefixOutput;
}

/** Updates public IP prefix tags. */
export interface PublicIPPrefixesUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the public IP prefixes in a subscription. */
export interface PublicIPPrefixesListAll200Response extends HttpResponse {
  status: "200";
  body: PublicIPPrefixListResultOutput;
}

/** Gets all the public IP prefixes in a subscription. */
export interface PublicIPPrefixesListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all public IP prefixes in a resource group. */
export interface PublicIPPrefixesList200Response extends HttpResponse {
  status: "200";
  body: PublicIPPrefixListResultOutput;
}

/** Gets all public IP prefixes in a resource group. */
export interface PublicIPPrefixesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified route filter. */
export interface RouteFiltersDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified route filter. */
export interface RouteFiltersDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified route filter. */
export interface RouteFiltersDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified route filter. */
export interface RouteFiltersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified route filter. */
export interface RouteFiltersGet200Response extends HttpResponse {
  status: "200";
  body: RouteFilterOutput;
}

/** Gets the specified route filter. */
export interface RouteFiltersGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a route filter in a specified resource group. */
export interface RouteFiltersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: RouteFilterOutput;
}

/** Creates or updates a route filter in a specified resource group. */
export interface RouteFiltersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: RouteFilterOutput;
}

/** Creates or updates a route filter in a specified resource group. */
export interface RouteFiltersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates tags of a route filter. */
export interface RouteFiltersUpdateTags200Response extends HttpResponse {
  status: "200";
  body: RouteFilterOutput;
}

/** Updates tags of a route filter. */
export interface RouteFiltersUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all route filters in a resource group. */
export interface RouteFiltersListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: RouteFilterListResultOutput;
}

/** Gets all route filters in a resource group. */
export interface RouteFiltersListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all route filters in a subscription. */
export interface RouteFiltersList200Response extends HttpResponse {
  status: "200";
  body: RouteFilterListResultOutput;
}

/** Gets all route filters in a subscription. */
export interface RouteFiltersListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified rule from a route filter. */
export interface RouteFilterRulesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified rule from a route filter. */
export interface RouteFilterRulesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified rule from a route filter. */
export interface RouteFilterRulesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified rule from a route filter. */
export interface RouteFilterRulesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified rule from a route filter. */
export interface RouteFilterRulesGet200Response extends HttpResponse {
  status: "200";
  body: RouteFilterRuleOutput;
}

/** Gets the specified rule from a route filter. */
export interface RouteFilterRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a route in the specified route filter. */
export interface RouteFilterRulesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: RouteFilterRuleOutput;
}

/** Creates or updates a route in the specified route filter. */
export interface RouteFilterRulesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: RouteFilterRuleOutput;
}

/** Creates or updates a route in the specified route filter. */
export interface RouteFilterRulesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all RouteFilterRules in a route filter. */
export interface RouteFilterRulesListByRouteFilter200Response extends HttpResponse {
  status: "200";
  body: RouteFilterRuleListResultOutput;
}

/** Gets all RouteFilterRules in a route filter. */
export interface RouteFilterRulesListByRouteFilterDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified route table. */
export interface RouteTablesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified route table. */
export interface RouteTablesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified route table. */
export interface RouteTablesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified route table. */
export interface RouteTablesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified route table. */
export interface RouteTablesGet200Response extends HttpResponse {
  status: "200";
  body: RouteTableOutput;
}

/** Gets the specified route table. */
export interface RouteTablesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Create or updates a route table in a specified resource group. */
export interface RouteTablesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: RouteTableOutput;
}

/** Create or updates a route table in a specified resource group. */
export interface RouteTablesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: RouteTableOutput;
}

/** Create or updates a route table in a specified resource group. */
export interface RouteTablesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a route table tags. */
export interface RouteTablesUpdateTags200Response extends HttpResponse {
  status: "200";
  body: RouteTableOutput;
}

/** Updates a route table tags. */
export interface RouteTablesUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all route tables in a resource group. */
export interface RouteTablesList200Response extends HttpResponse {
  status: "200";
  body: RouteTableListResultOutput;
}

/** Gets all route tables in a resource group. */
export interface RouteTablesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all route tables in a subscription. */
export interface RouteTablesListAll200Response extends HttpResponse {
  status: "200";
  body: RouteTableListResultOutput;
}

/** Gets all route tables in a subscription. */
export interface RouteTablesListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified route from a route table. */
export interface RoutesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified route from a route table. */
export interface RoutesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified route from a route table. */
export interface RoutesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified route from a route table. */
export interface RoutesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified route from a route table. */
export interface RoutesGet200Response extends HttpResponse {
  status: "200";
  body: RouteOutput;
}

/** Gets the specified route from a route table. */
export interface RoutesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a route in the specified route table. */
export interface RoutesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: RouteOutput;
}

/** Creates or updates a route in the specified route table. */
export interface RoutesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: RouteOutput;
}

/** Creates or updates a route in the specified route table. */
export interface RoutesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all routes in a route table. */
export interface RoutesList200Response extends HttpResponse {
  status: "200";
  body: RouteListResultOutput;
}

/** Gets all routes in a route table. */
export interface RoutesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified Security Partner Provider. */
export interface SecurityPartnerProvidersDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified Security Partner Provider. */
export interface SecurityPartnerProvidersDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified Security Partner Provider. */
export interface SecurityPartnerProvidersDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified Security Partner Provider. */
export interface SecurityPartnerProvidersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified Security Partner Provider. */
export interface SecurityPartnerProvidersGet200Response extends HttpResponse {
  status: "200";
  body: SecurityPartnerProviderOutput;
}

/** Gets the specified Security Partner Provider. */
export interface SecurityPartnerProvidersGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates the specified Security Partner Provider. */
export interface SecurityPartnerProvidersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SecurityPartnerProviderOutput;
}

/** Creates or updates the specified Security Partner Provider. */
export interface SecurityPartnerProvidersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SecurityPartnerProviderOutput;
}

/** Creates or updates the specified Security Partner Provider. */
export interface SecurityPartnerProvidersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates tags of a Security Partner Provider resource. */
export interface SecurityPartnerProvidersUpdateTags200Response extends HttpResponse {
  status: "200";
  body: SecurityPartnerProviderOutput;
}

/** Updates tags of a Security Partner Provider resource. */
export interface SecurityPartnerProvidersUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all Security Partner Providers in a resource group. */
export interface SecurityPartnerProvidersListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: SecurityPartnerProviderListResultOutput;
}

/** Lists all Security Partner Providers in a resource group. */
export interface SecurityPartnerProvidersListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the Security Partner Providers in a subscription. */
export interface SecurityPartnerProvidersList200Response extends HttpResponse {
  status: "200";
  body: SecurityPartnerProviderListResultOutput;
}

/** Gets all the Security Partner Providers in a subscription. */
export interface SecurityPartnerProvidersListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the available bgp service communities. */
export interface BgpServiceCommunitiesList200Response extends HttpResponse {
  status: "200";
  body: BgpServiceCommunityListResultOutput;
}

/** Gets all the available bgp service communities. */
export interface BgpServiceCommunitiesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified service endpoint policy. */
export interface ServiceEndpointPoliciesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified service endpoint policy. */
export interface ServiceEndpointPoliciesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified service endpoint policy. */
export interface ServiceEndpointPoliciesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified service endpoint policy. */
export interface ServiceEndpointPoliciesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified service Endpoint Policies in a specified resource group. */
export interface ServiceEndpointPoliciesGet200Response extends HttpResponse {
  status: "200";
  body: ServiceEndpointPolicyOutput;
}

/** Gets the specified service Endpoint Policies in a specified resource group. */
export interface ServiceEndpointPoliciesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a service Endpoint Policies. */
export interface ServiceEndpointPoliciesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ServiceEndpointPolicyOutput;
}

/** Creates or updates a service Endpoint Policies. */
export interface ServiceEndpointPoliciesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ServiceEndpointPolicyOutput;
}

/** Creates or updates a service Endpoint Policies. */
export interface ServiceEndpointPoliciesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates tags of a service endpoint policy. */
export interface ServiceEndpointPoliciesUpdateTags200Response extends HttpResponse {
  status: "200";
  body: ServiceEndpointPolicyOutput;
}

/** Updates tags of a service endpoint policy. */
export interface ServiceEndpointPoliciesUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the service endpoint policies in a subscription. */
export interface ServiceEndpointPoliciesList200Response extends HttpResponse {
  status: "200";
  body: ServiceEndpointPolicyListResultOutput;
}

/** Gets all the service endpoint policies in a subscription. */
export interface ServiceEndpointPoliciesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all service endpoint Policies in a resource group. */
export interface ServiceEndpointPoliciesListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ServiceEndpointPolicyListResultOutput;
}

/** Gets all service endpoint Policies in a resource group. */
export interface ServiceEndpointPoliciesListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified ServiceEndpoint policy definitions. */
export interface ServiceEndpointPolicyDefinitionsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified ServiceEndpoint policy definitions. */
export interface ServiceEndpointPolicyDefinitionsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified ServiceEndpoint policy definitions. */
export interface ServiceEndpointPolicyDefinitionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified ServiceEndpoint policy definitions. */
export interface ServiceEndpointPolicyDefinitionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Get the specified service endpoint policy definitions from service endpoint policy. */
export interface ServiceEndpointPolicyDefinitionsGet200Response extends HttpResponse {
  status: "200";
  body: ServiceEndpointPolicyDefinitionOutput;
}

/** Get the specified service endpoint policy definitions from service endpoint policy. */
export interface ServiceEndpointPolicyDefinitionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a service endpoint policy definition in the specified service endpoint policy. */
export interface ServiceEndpointPolicyDefinitionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ServiceEndpointPolicyDefinitionOutput;
}

/** Creates or updates a service endpoint policy definition in the specified service endpoint policy. */
export interface ServiceEndpointPolicyDefinitionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ServiceEndpointPolicyDefinitionOutput;
}

/** Creates or updates a service endpoint policy definition in the specified service endpoint policy. */
export interface ServiceEndpointPolicyDefinitionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all service endpoint policy definitions in a service end point policy. */
export interface ServiceEndpointPolicyDefinitionsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ServiceEndpointPolicyDefinitionListResultOutput;
}

/** Gets all service endpoint policy definitions in a service end point policy. */
export interface ServiceEndpointPolicyDefinitionsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of service tag information resources. */
export interface ServiceTagsList200Response extends HttpResponse {
  status: "200";
  body: ServiceTagsListResultOutput;
}

/** Gets a list of service tag information resources. */
export interface ServiceTagsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of service tag information resources with pagination. */
export interface ServiceTagInformationList200Response extends HttpResponse {
  status: "200";
  body: ServiceTagInformationListResultOutput;
}

/** Gets a list of service tag information resources with pagination. */
export interface ServiceTagInformationListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** List network usages for a subscription. */
export interface UsagesList200Response extends HttpResponse {
  status: "200";
  body: UsagesListResultOutput;
}

/** List network usages for a subscription. */
export interface UsagesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified virtual network. */
export interface VirtualNetworksDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified virtual network. */
export interface VirtualNetworksDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified virtual network. */
export interface VirtualNetworksDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified virtual network. */
export interface VirtualNetworksDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified virtual network by resource group. */
export interface VirtualNetworksGet200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkOutput;
}

/** Gets the specified virtual network by resource group. */
export interface VirtualNetworksGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a virtual network in the specified resource group. */
export interface VirtualNetworksCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkOutput;
}

/** Creates or updates a virtual network in the specified resource group. */
export interface VirtualNetworksCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualNetworkOutput;
}

/** Creates or updates a virtual network in the specified resource group. */
export interface VirtualNetworksCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a virtual network tags. */
export interface VirtualNetworksUpdateTags200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkOutput;
}

/** Updates a virtual network tags. */
export interface VirtualNetworksUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all virtual networks in a subscription. */
export interface VirtualNetworksListAll200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkListResultOutput;
}

/** Gets all virtual networks in a subscription. */
export interface VirtualNetworksListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all virtual networks in a resource group. */
export interface VirtualNetworksList200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkListResultOutput;
}

/** Gets all virtual networks in a resource group. */
export interface VirtualNetworksListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Checks whether a private IP address is available for use. */
export interface VirtualNetworksCheckIPAddressAvailability200Response extends HttpResponse {
  status: "200";
  body: IPAddressAvailabilityResultOutput;
}

/** Checks whether a private IP address is available for use. */
export interface VirtualNetworksCheckIPAddressAvailabilityDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists usage stats. */
export interface VirtualNetworksListUsage200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkListUsageResultOutput;
}

/** Lists usage stats. */
export interface VirtualNetworksListUsageDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the Ddos Protection Status of all IP Addresses under the Virtual Network */
export interface VirtualNetworksListDdosProtectionStatus200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkDdosProtectionStatusResultOutput;
}

/** Gets the Ddos Protection Status of all IP Addresses under the Virtual Network */
export interface VirtualNetworksListDdosProtectionStatus202Response extends HttpResponse {
  status: "202";
}

/** Gets the Ddos Protection Status of all IP Addresses under the Virtual Network */
export interface VirtualNetworksListDdosProtectionStatusDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified subnet. */
export interface SubnetsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified subnet. */
export interface SubnetsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified subnet. */
export interface SubnetsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified subnet. */
export interface SubnetsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified subnet by virtual network and resource group. */
export interface SubnetsGet200Response extends HttpResponse {
  status: "200";
  body: SubnetOutput;
}

/** Gets the specified subnet by virtual network and resource group. */
export interface SubnetsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a subnet in the specified virtual network. */
export interface SubnetsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SubnetOutput;
}

/** Creates or updates a subnet in the specified virtual network. */
export interface SubnetsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SubnetOutput;
}

/** Creates or updates a subnet in the specified virtual network. */
export interface SubnetsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Prepares a subnet by applying network intent policies. */
export interface SubnetsPrepareNetworkPolicies200Response extends HttpResponse {
  status: "200";
}

/** Prepares a subnet by applying network intent policies. */
export interface SubnetsPrepareNetworkPolicies202Response extends HttpResponse {
  status: "202";
}

/** Prepares a subnet by applying network intent policies. */
export interface SubnetsPrepareNetworkPoliciesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Unprepares a subnet by removing network intent policies. */
export interface SubnetsUnprepareNetworkPolicies200Response extends HttpResponse {
  status: "200";
}

/** Unprepares a subnet by removing network intent policies. */
export interface SubnetsUnprepareNetworkPolicies202Response extends HttpResponse {
  status: "202";
}

/** Unprepares a subnet by removing network intent policies. */
export interface SubnetsUnprepareNetworkPoliciesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all subnets in a virtual network. */
export interface SubnetsList200Response extends HttpResponse {
  status: "200";
  body: SubnetListResultOutput;
}

/** Gets all subnets in a virtual network. */
export interface SubnetsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of resource navigation links for a subnet. */
export interface ResourceNavigationLinksList200Response extends HttpResponse {
  status: "200";
  body: ResourceNavigationLinksListResultOutput;
}

/** Gets a list of resource navigation links for a subnet. */
export interface ResourceNavigationLinksListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a list of service association links for a subnet. */
export interface ServiceAssociationLinksList200Response extends HttpResponse {
  status: "200";
  body: ServiceAssociationLinksListResultOutput;
}

/** Gets a list of service association links for a subnet. */
export interface ServiceAssociationLinksListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified virtual network peering. */
export interface VirtualNetworkPeeringsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified virtual network peering. */
export interface VirtualNetworkPeeringsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified virtual network peering. */
export interface VirtualNetworkPeeringsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified virtual network peering. */
export interface VirtualNetworkPeeringsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified virtual network peering. */
export interface VirtualNetworkPeeringsGet200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkPeeringOutput;
}

/** Gets the specified virtual network peering. */
export interface VirtualNetworkPeeringsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a peering in the specified virtual network. */
export interface VirtualNetworkPeeringsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkPeeringOutput;
}

/** Creates or updates a peering in the specified virtual network. */
export interface VirtualNetworkPeeringsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualNetworkPeeringOutput;
}

/** Creates or updates a peering in the specified virtual network. */
export interface VirtualNetworkPeeringsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all virtual network peerings in a virtual network. */
export interface VirtualNetworkPeeringsList200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkPeeringListResultOutput;
}

/** Gets all virtual network peerings in a virtual network. */
export interface VirtualNetworkPeeringsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayOutput;
}

/** Creates or updates a virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualNetworkGatewayOutput;
}

/** Creates or updates a virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified virtual network gateway by resource group. */
export interface VirtualNetworkGatewaysGet200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayOutput;
}

/** Gets the specified virtual network gateway by resource group. */
export interface VirtualNetworkGatewaysGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified virtual network gateway. */
export interface VirtualNetworkGatewaysDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified virtual network gateway. */
export interface VirtualNetworkGatewaysDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified virtual network gateway. */
export interface VirtualNetworkGatewaysDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified virtual network gateway. */
export interface VirtualNetworkGatewaysDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a virtual network gateway tags. */
export interface VirtualNetworkGatewaysUpdateTags200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayOutput;
}

/** Updates a virtual network gateway tags. */
export interface VirtualNetworkGatewaysUpdateTags202Response extends HttpResponse {
  status: "202";
}

/** Updates a virtual network gateway tags. */
export interface VirtualNetworkGatewaysUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all virtual network gateways by resource group. */
export interface VirtualNetworkGatewaysList200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayListResultOutput;
}

/** Gets all virtual network gateways by resource group. */
export interface VirtualNetworkGatewaysListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the connections in a virtual network gateway. */
export interface VirtualNetworkGatewaysListConnections200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayListConnectionsResultOutput;
}

/** Gets all the connections in a virtual network gateway. */
export interface VirtualNetworkGatewaysListConnectionsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Resets the primary of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysReset200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayOutput;
}

/** Resets the primary of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysReset202Response extends HttpResponse {
  status: "202";
}

/** Resets the primary of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysResetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Resets the VPN client shared key of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysResetVpnClientSharedKey200Response extends HttpResponse {
  status: "200";
}

/** Resets the VPN client shared key of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysResetVpnClientSharedKey202Response extends HttpResponse {
  status: "202";
}

/** Resets the VPN client shared key of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysResetVpnClientSharedKeyDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Generates VPN client package for P2S client of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysGeneratevpnclientpackage200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Generates VPN client package for P2S client of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysGeneratevpnclientpackage202Response extends HttpResponse {
  status: "202";
}

/** Generates VPN client package for P2S client of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysGeneratevpnclientpackageDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Generates VPN profile for P2S client of the virtual network gateway in the specified resource group. Used for IKEV2 and radius based authentication. */
export interface VirtualNetworkGatewaysGenerateVpnProfile200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Generates VPN profile for P2S client of the virtual network gateway in the specified resource group. Used for IKEV2 and radius based authentication. */
export interface VirtualNetworkGatewaysGenerateVpnProfile202Response extends HttpResponse {
  status: "202";
}

/** Generates VPN profile for P2S client of the virtual network gateway in the specified resource group. Used for IKEV2 and radius based authentication. */
export interface VirtualNetworkGatewaysGenerateVpnProfileDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets pre-generated VPN profile for P2S client of the virtual network gateway in the specified resource group. The profile needs to be generated first using generateVpnProfile. */
export interface VirtualNetworkGatewaysGetVpnProfilePackageUrl200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Gets pre-generated VPN profile for P2S client of the virtual network gateway in the specified resource group. The profile needs to be generated first using generateVpnProfile. */
export interface VirtualNetworkGatewaysGetVpnProfilePackageUrl202Response extends HttpResponse {
  status: "202";
}

/** Gets pre-generated VPN profile for P2S client of the virtual network gateway in the specified resource group. The profile needs to be generated first using generateVpnProfile. */
export interface VirtualNetworkGatewaysGetVpnProfilePackageUrlDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The GetBgpPeerStatus operation retrieves the status of all BGP peers. */
export interface VirtualNetworkGatewaysGetBgpPeerStatus200Response extends HttpResponse {
  status: "200";
  body: BgpPeerStatusListResultOutput;
}

/** The GetBgpPeerStatus operation retrieves the status of all BGP peers. */
export interface VirtualNetworkGatewaysGetBgpPeerStatus202Response extends HttpResponse {
  status: "202";
}

/** The GetBgpPeerStatus operation retrieves the status of all BGP peers. */
export interface VirtualNetworkGatewaysGetBgpPeerStatusDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a xml format representation for supported vpn devices. */
export interface VirtualNetworkGatewaysSupportedVpnDevices200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Gets a xml format representation for supported vpn devices. */
export interface VirtualNetworkGatewaysSupportedVpnDevicesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** This operation retrieves a list of routes the virtual network gateway has learned, including routes learned from BGP peers. */
export interface VirtualNetworkGatewaysGetLearnedRoutes200Response extends HttpResponse {
  status: "200";
  body: GatewayRouteListResultOutput;
}

/** This operation retrieves a list of routes the virtual network gateway has learned, including routes learned from BGP peers. */
export interface VirtualNetworkGatewaysGetLearnedRoutes202Response extends HttpResponse {
  status: "202";
}

/** This operation retrieves a list of routes the virtual network gateway has learned, including routes learned from BGP peers. */
export interface VirtualNetworkGatewaysGetLearnedRoutesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** This operation retrieves a list of routes the virtual network gateway is advertising to the specified peer. */
export interface VirtualNetworkGatewaysGetAdvertisedRoutes200Response extends HttpResponse {
  status: "200";
  body: GatewayRouteListResultOutput;
}

/** This operation retrieves a list of routes the virtual network gateway is advertising to the specified peer. */
export interface VirtualNetworkGatewaysGetAdvertisedRoutes202Response extends HttpResponse {
  status: "202";
}

/** This operation retrieves a list of routes the virtual network gateway is advertising to the specified peer. */
export interface VirtualNetworkGatewaysGetAdvertisedRoutesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The Set VpnclientIpsecParameters operation sets the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider. */
export interface VirtualNetworkGatewaysSetVpnclientIpsecParameters200Response extends HttpResponse {
  status: "200";
  body: VpnClientIPsecParametersOutput;
}

/** The Set VpnclientIpsecParameters operation sets the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider. */
export interface VirtualNetworkGatewaysSetVpnclientIpsecParameters202Response extends HttpResponse {
  status: "202";
}

/** The Set VpnclientIpsecParameters operation sets the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider. */
export interface VirtualNetworkGatewaysSetVpnclientIpsecParametersDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The Get VpnclientIpsecParameters operation retrieves information about the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider. */
export interface VirtualNetworkGatewaysGetVpnclientIpsecParameters200Response extends HttpResponse {
  status: "200";
  body: VpnClientIPsecParametersOutput;
}

/** The Get VpnclientIpsecParameters operation retrieves information about the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider. */
export interface VirtualNetworkGatewaysGetVpnclientIpsecParametersDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets a xml format representation for vpn device configuration script. */
export interface VirtualNetworkGatewaysVpnDeviceConfigurationScript200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Gets a xml format representation for vpn device configuration script. */
export interface VirtualNetworkGatewaysVpnDeviceConfigurationScriptDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Starts packet capture on virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysStartPacketCapture200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Starts packet capture on virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysStartPacketCapture202Response extends HttpResponse {
  status: "202";
}

/** Starts packet capture on virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysStartPacketCaptureDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Stops packet capture on virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysStopPacketCapture200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Stops packet capture on virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysStopPacketCapture202Response extends HttpResponse {
  status: "202";
}

/** Stops packet capture on virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysStopPacketCaptureDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysGetVpnclientConnectionHealth200Response extends HttpResponse {
  status: "200";
  body: VpnClientConnectionHealthDetailListResultOutput;
}

/** Get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysGetVpnclientConnectionHealth202Response extends HttpResponse {
  status: "202";
}

/** Get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysGetVpnclientConnectionHealthDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Disconnect vpn connections of virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnections200Response extends HttpResponse {
  status: "200";
}

/** Disconnect vpn connections of virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnections202Response extends HttpResponse {
  status: "202";
}

/** Disconnect vpn connections of virtual network gateway in the specified resource group. */
export interface VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayConnectionOutput;
}

/** Creates or updates a virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualNetworkGatewayConnectionOutput;
}

/** Creates or updates a virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified virtual network gateway connection by resource group. */
export interface VirtualNetworkGatewayConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayConnectionOutput;
}

/** Gets the specified virtual network gateway connection by resource group. */
export interface VirtualNetworkGatewayConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified virtual network Gateway connection. */
export interface VirtualNetworkGatewayConnectionsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified virtual network Gateway connection. */
export interface VirtualNetworkGatewayConnectionsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified virtual network Gateway connection. */
export interface VirtualNetworkGatewayConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified virtual network Gateway connection. */
export interface VirtualNetworkGatewayConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a virtual network gateway connection tags. */
export interface VirtualNetworkGatewayConnectionsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayConnectionOutput;
}

/** Updates a virtual network gateway connection tags. */
export interface VirtualNetworkGatewayConnectionsUpdateTags202Response extends HttpResponse {
  status: "202";
}

/** Updates a virtual network gateway connection tags. */
export interface VirtualNetworkGatewayConnectionsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The Put VirtualNetworkGatewayConnectionSharedKey operation sets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider. */
export interface VirtualNetworkGatewayConnectionsSetSharedKey200Response extends HttpResponse {
  status: "200";
  body: ConnectionSharedKeyOutput;
}

/** The Put VirtualNetworkGatewayConnectionSharedKey operation sets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider. */
export interface VirtualNetworkGatewayConnectionsSetSharedKey201Response extends HttpResponse {
  status: "201";
  body: ConnectionSharedKeyOutput;
}

/** The Put VirtualNetworkGatewayConnectionSharedKey operation sets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider. */
export interface VirtualNetworkGatewayConnectionsSetSharedKeyDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The Get VirtualNetworkGatewayConnectionSharedKey operation retrieves information about the specified virtual network gateway connection shared key through Network resource provider. */
export interface VirtualNetworkGatewayConnectionsGetSharedKey200Response extends HttpResponse {
  status: "200";
  body: ConnectionSharedKeyOutput;
}

/** The Get VirtualNetworkGatewayConnectionSharedKey operation retrieves information about the specified virtual network gateway connection shared key through Network resource provider. */
export interface VirtualNetworkGatewayConnectionsGetSharedKeyDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The List VirtualNetworkGatewayConnections operation retrieves all the virtual network gateways connections created. */
export interface VirtualNetworkGatewayConnectionsList200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayConnectionListResultOutput;
}

/** The List VirtualNetworkGatewayConnections operation retrieves all the virtual network gateways connections created. */
export interface VirtualNetworkGatewayConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** The VirtualNetworkGatewayConnectionResetSharedKey operation resets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider. */
export interface VirtualNetworkGatewayConnectionsResetSharedKey200Response extends HttpResponse {
  status: "200";
  body: ConnectionResetSharedKeyOutput;
}

/** The VirtualNetworkGatewayConnectionResetSharedKey operation resets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider. */
export interface VirtualNetworkGatewayConnectionsResetSharedKey202Response extends HttpResponse {
  status: "202";
}

/** The VirtualNetworkGatewayConnectionResetSharedKey operation resets the virtual network gateway connection shared key for passed virtual network gateway connection in the specified resource group through Network resource provider. */
export interface VirtualNetworkGatewayConnectionsResetSharedKeyDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Starts packet capture on virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsStartPacketCapture200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Starts packet capture on virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsStartPacketCapture202Response extends HttpResponse {
  status: "202";
}

/** Starts packet capture on virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsStartPacketCaptureDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Stops packet capture on virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsStopPacketCapture200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Stops packet capture on virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsStopPacketCapture202Response extends HttpResponse {
  status: "202";
}

/** Stops packet capture on virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsStopPacketCaptureDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Lists IKE Security Associations for the virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsGetIkeSas200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Lists IKE Security Associations for the virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsGetIkeSas202Response extends HttpResponse {
  status: "202";
}

/** Lists IKE Security Associations for the virtual network gateway connection in the specified resource group. */
export interface VirtualNetworkGatewayConnectionsGetIkeSasDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resets the virtual network gateway connection specified. */
export interface VirtualNetworkGatewayConnectionsResetConnection202Response extends HttpResponse {
  status: "202";
}

/** Resets the virtual network gateway connection specified. */
export interface VirtualNetworkGatewayConnectionsResetConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Creates or updates a local network gateway in the specified resource group. */
export interface LocalNetworkGatewaysCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: LocalNetworkGatewayOutput;
}

/** Creates or updates a local network gateway in the specified resource group. */
export interface LocalNetworkGatewaysCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: LocalNetworkGatewayOutput;
}

/** Creates or updates a local network gateway in the specified resource group. */
export interface LocalNetworkGatewaysCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified local network gateway in a resource group. */
export interface LocalNetworkGatewaysGet200Response extends HttpResponse {
  status: "200";
  body: LocalNetworkGatewayOutput;
}

/** Gets the specified local network gateway in a resource group. */
export interface LocalNetworkGatewaysGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified local network gateway. */
export interface LocalNetworkGatewaysDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified local network gateway. */
export interface LocalNetworkGatewaysDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified local network gateway. */
export interface LocalNetworkGatewaysDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified local network gateway. */
export interface LocalNetworkGatewaysDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a local network gateway tags. */
export interface LocalNetworkGatewaysUpdateTags200Response extends HttpResponse {
  status: "200";
  body: LocalNetworkGatewayOutput;
}

/** Updates a local network gateway tags. */
export interface LocalNetworkGatewaysUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the local network gateways in a resource group. */
export interface LocalNetworkGatewaysList200Response extends HttpResponse {
  status: "200";
  body: LocalNetworkGatewayListResultOutput;
}

/** Gets all the local network gateways in a resource group. */
export interface LocalNetworkGatewaysListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a nat rule. */
export interface VirtualNetworkGatewayNatRulesGet200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayNatRuleOutput;
}

/** Retrieves the details of a nat rule. */
export interface VirtualNetworkGatewayNatRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a nat rule to a scalable virtual network gateway if it doesn't exist else updates the existing nat rules. */
export interface VirtualNetworkGatewayNatRulesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkGatewayNatRuleOutput;
}

/** Creates a nat rule to a scalable virtual network gateway if it doesn't exist else updates the existing nat rules. */
export interface VirtualNetworkGatewayNatRulesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualNetworkGatewayNatRuleOutput;
}

/** Creates a nat rule to a scalable virtual network gateway if it doesn't exist else updates the existing nat rules. */
export interface VirtualNetworkGatewayNatRulesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a nat rule. */
export interface VirtualNetworkGatewayNatRulesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a nat rule. */
export interface VirtualNetworkGatewayNatRulesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a nat rule. */
export interface VirtualNetworkGatewayNatRulesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a nat rule. */
export interface VirtualNetworkGatewayNatRulesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves all nat rules for a particular virtual network gateway. */
export interface VirtualNetworkGatewayNatRulesListByVirtualNetworkGateway200Response extends HttpResponse {
  status: "200";
  body: ListVirtualNetworkGatewayNatRulesResultOutput;
}

/** Retrieves all nat rules for a particular virtual network gateway. */
export interface VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified virtual network tap. */
export interface VirtualNetworkTapsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified virtual network tap. */
export interface VirtualNetworkTapsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified virtual network tap. */
export interface VirtualNetworkTapsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified virtual network tap. */
export interface VirtualNetworkTapsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets information about the specified virtual network tap. */
export interface VirtualNetworkTapsGet200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkTapOutput;
}

/** Gets information about the specified virtual network tap. */
export interface VirtualNetworkTapsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a Virtual Network Tap. */
export interface VirtualNetworkTapsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkTapOutput;
}

/** Creates or updates a Virtual Network Tap. */
export interface VirtualNetworkTapsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualNetworkTapOutput;
}

/** Creates or updates a Virtual Network Tap. */
export interface VirtualNetworkTapsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates an VirtualNetworkTap tags. */
export interface VirtualNetworkTapsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkTapOutput;
}

/** Updates an VirtualNetworkTap tags. */
export interface VirtualNetworkTapsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the VirtualNetworkTaps in a subscription. */
export interface VirtualNetworkTapsListAll200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkTapListResultOutput;
}

/** Gets all the VirtualNetworkTaps in a subscription. */
export interface VirtualNetworkTapsListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the VirtualNetworkTaps in a subscription. */
export interface VirtualNetworkTapsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: VirtualNetworkTapListResultOutput;
}

/** Gets all the VirtualNetworkTaps in a subscription. */
export interface VirtualNetworkTapsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified Virtual Router. */
export interface VirtualRoutersDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified Virtual Router. */
export interface VirtualRoutersDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified Virtual Router. */
export interface VirtualRoutersDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified Virtual Router. */
export interface VirtualRoutersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets the specified Virtual Router. */
export interface VirtualRoutersGet200Response extends HttpResponse {
  status: "200";
  body: VirtualRouterOutput;
}

/** Gets the specified Virtual Router. */
export interface VirtualRoutersGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Creates or updates the specified Virtual Router. */
export interface VirtualRoutersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualRouterOutput;
}

/** Creates or updates the specified Virtual Router. */
export interface VirtualRoutersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualRouterOutput;
}

/** Creates or updates the specified Virtual Router. */
export interface VirtualRoutersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Lists all Virtual Routers in a resource group. */
export interface VirtualRoutersListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: VirtualRouterListResultOutput;
}

/** Lists all Virtual Routers in a resource group. */
export interface VirtualRoutersListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets all the Virtual Routers in a subscription. */
export interface VirtualRoutersList200Response extends HttpResponse {
  status: "200";
  body: VirtualRouterListResultOutput;
}

/** Gets all the Virtual Routers in a subscription. */
export interface VirtualRoutersListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Deletes the specified peering from a Virtual Router. */
export interface VirtualRouterPeeringsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified peering from a Virtual Router. */
export interface VirtualRouterPeeringsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified peering from a Virtual Router. */
export interface VirtualRouterPeeringsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified peering from a Virtual Router. */
export interface VirtualRouterPeeringsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Gets the specified Virtual Router Peering. */
export interface VirtualRouterPeeringsGet200Response extends HttpResponse {
  status: "200";
  body: VirtualRouterPeeringOutput;
}

/** Gets the specified Virtual Router Peering. */
export interface VirtualRouterPeeringsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Creates or updates the specified Virtual Router Peering. */
export interface VirtualRouterPeeringsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualRouterPeeringOutput;
}

/** Creates or updates the specified Virtual Router Peering. */
export interface VirtualRouterPeeringsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualRouterPeeringOutput;
}

/** Creates or updates the specified Virtual Router Peering. */
export interface VirtualRouterPeeringsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Lists all Virtual Router Peerings in a Virtual Router resource. */
export interface VirtualRouterPeeringsList200Response extends HttpResponse {
  status: "200";
  body: VirtualRouterPeeringListResultOutput;
}

/** Lists all Virtual Router Peerings in a Virtual Router resource. */
export interface VirtualRouterPeeringsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Retrieves the details of a VirtualWAN. */
export interface VirtualWansGet200Response extends HttpResponse {
  status: "200";
  body: VirtualWANOutput;
}

/** Retrieves the details of a VirtualWAN. */
export interface VirtualWansGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a VirtualWAN resource if it doesn't exist else updates the existing VirtualWAN. */
export interface VirtualWansCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualWANOutput;
}

/** Creates a VirtualWAN resource if it doesn't exist else updates the existing VirtualWAN. */
export interface VirtualWansCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualWANOutput;
}

/** Creates a VirtualWAN resource if it doesn't exist else updates the existing VirtualWAN. */
export interface VirtualWansCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates a VirtualWAN tags. */
export interface VirtualWansUpdateTags200Response extends HttpResponse {
  status: "200";
  body: VirtualWANOutput;
}

/** Updates a VirtualWAN tags. */
export interface VirtualWansUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a VirtualWAN. */
export interface VirtualWansDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a VirtualWAN. */
export interface VirtualWansDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a VirtualWAN. */
export interface VirtualWansDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a VirtualWAN. */
export interface VirtualWansDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the VirtualWANs in a resource group. */
export interface VirtualWansListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ListVirtualWANsResultOutput;
}

/** Lists all the VirtualWANs in a resource group. */
export interface VirtualWansListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the VirtualWANs in a subscription. */
export interface VirtualWansList200Response extends HttpResponse {
  status: "200";
  body: ListVirtualWANsResultOutput;
}

/** Lists all the VirtualWANs in a subscription. */
export interface VirtualWansListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a VPN site. */
export interface VpnSitesGet200Response extends HttpResponse {
  status: "200";
  body: VpnSiteOutput;
}

/** Retrieves the details of a VPN site. */
export interface VpnSitesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a VpnSite resource if it doesn't exist else updates the existing VpnSite. */
export interface VpnSitesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VpnSiteOutput;
}

/** Creates a VpnSite resource if it doesn't exist else updates the existing VpnSite. */
export interface VpnSitesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VpnSiteOutput;
}

/** Creates a VpnSite resource if it doesn't exist else updates the existing VpnSite. */
export interface VpnSitesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates VpnSite tags. */
export interface VpnSitesUpdateTags200Response extends HttpResponse {
  status: "200";
  body: VpnSiteOutput;
}

/** Updates VpnSite tags. */
export interface VpnSitesUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a VpnSite. */
export interface VpnSitesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a VpnSite. */
export interface VpnSitesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a VpnSite. */
export interface VpnSitesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a VpnSite. */
export interface VpnSitesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the vpnSites in a resource group. */
export interface VpnSitesListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ListVpnSitesResultOutput;
}

/** Lists all the vpnSites in a resource group. */
export interface VpnSitesListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the VpnSites in a subscription. */
export interface VpnSitesList200Response extends HttpResponse {
  status: "200";
  body: ListVpnSitesResultOutput;
}

/** Lists all the VpnSites in a subscription. */
export interface VpnSitesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a VPN site link. */
export interface VpnSiteLinksGet200Response extends HttpResponse {
  status: "200";
  body: VpnSiteLinkOutput;
}

/** Retrieves the details of a VPN site link. */
export interface VpnSiteLinksGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the vpnSiteLinks in a resource group for a vpn site. */
export interface VpnSiteLinksListByVpnSite200Response extends HttpResponse {
  status: "200";
  body: ListVpnSiteLinksResultOutput;
}

/** Lists all the vpnSiteLinks in a resource group for a vpn site. */
export interface VpnSiteLinksListByVpnSiteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gives the sas-url to download the configurations for vpn-sites in a resource group. */
export interface VpnSitesConfigurationDownload200Response extends HttpResponse {
  status: "200";
}

/** Gives the sas-url to download the configurations for vpn-sites in a resource group. */
export interface VpnSitesConfigurationDownload202Response extends HttpResponse {
  status: "202";
}

/** Gives the sas-url to download the configurations for vpn-sites in a resource group. */
export interface VpnSitesConfigurationDownloadDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a VpnServerConfiguration. */
export interface VpnServerConfigurationsGet200Response extends HttpResponse {
  status: "200";
  body: VpnServerConfigurationOutput;
}

/** Retrieves the details of a VpnServerConfiguration. */
export interface VpnServerConfigurationsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a VpnServerConfiguration resource if it doesn't exist else updates the existing VpnServerConfiguration. */
export interface VpnServerConfigurationsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VpnServerConfigurationOutput;
}

/** Creates a VpnServerConfiguration resource if it doesn't exist else updates the existing VpnServerConfiguration. */
export interface VpnServerConfigurationsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VpnServerConfigurationOutput;
}

/** Creates a VpnServerConfiguration resource if it doesn't exist else updates the existing VpnServerConfiguration. */
export interface VpnServerConfigurationsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates VpnServerConfiguration tags. */
export interface VpnServerConfigurationsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: VpnServerConfigurationOutput;
}

/** Updates VpnServerConfiguration tags. */
export interface VpnServerConfigurationsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a VpnServerConfiguration. */
export interface VpnServerConfigurationsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a VpnServerConfiguration. */
export interface VpnServerConfigurationsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a VpnServerConfiguration. */
export interface VpnServerConfigurationsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a VpnServerConfiguration. */
export interface VpnServerConfigurationsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the vpnServerConfigurations in a resource group. */
export interface VpnServerConfigurationsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ListVpnServerConfigurationsResultOutput;
}

/** Lists all the vpnServerConfigurations in a resource group. */
export interface VpnServerConfigurationsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the VpnServerConfigurations in a subscription. */
export interface VpnServerConfigurationsList200Response extends HttpResponse {
  status: "200";
  body: ListVpnServerConfigurationsResultOutput;
}

/** Lists all the VpnServerConfigurations in a subscription. */
export interface VpnServerConfigurationsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one. */
export interface ConfigurationPolicyGroupsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VpnServerConfigurationPolicyGroupOutput;
}

/** Creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one. */
export interface ConfigurationPolicyGroupsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VpnServerConfigurationPolicyGroupOutput;
}

/** Creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one. */
export interface ConfigurationPolicyGroupsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a ConfigurationPolicyGroup. */
export interface ConfigurationPolicyGroupsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a ConfigurationPolicyGroup. */
export interface ConfigurationPolicyGroupsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a ConfigurationPolicyGroup. */
export interface ConfigurationPolicyGroupsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a ConfigurationPolicyGroup. */
export interface ConfigurationPolicyGroupsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a ConfigurationPolicyGroup. */
export interface ConfigurationPolicyGroupsGet200Response extends HttpResponse {
  status: "200";
  body: VpnServerConfigurationPolicyGroupOutput;
}

/** Retrieves the details of a ConfigurationPolicyGroup. */
export interface ConfigurationPolicyGroupsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration. */
export interface ConfigurationPolicyGroupsListByVpnServerConfiguration200Response extends HttpResponse {
  status: "200";
  body: ListVpnServerConfigurationPolicyGroupsResultOutput;
}

/** Lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration. */
export interface ConfigurationPolicyGroupsListByVpnServerConfigurationDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a VirtualHub. */
export interface VirtualHubsGet200Response extends HttpResponse {
  status: "200";
  body: VirtualHubOutput;
}

/** Retrieves the details of a VirtualHub. */
export interface VirtualHubsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub. */
export interface VirtualHubsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualHubOutput;
}

/** Creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub. */
export interface VirtualHubsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualHubOutput;
}

/** Creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub. */
export interface VirtualHubsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates VirtualHub tags. */
export interface VirtualHubsUpdateTags200Response extends HttpResponse {
  status: "200";
  body: VirtualHubOutput;
}

/** Updates VirtualHub tags. */
export interface VirtualHubsUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a VirtualHub. */
export interface VirtualHubsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a VirtualHub. */
export interface VirtualHubsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a VirtualHub. */
export interface VirtualHubsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a VirtualHub. */
export interface VirtualHubsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the VirtualHubs in a resource group. */
export interface VirtualHubsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ListVirtualHubsResultOutput;
}

/** Lists all the VirtualHubs in a resource group. */
export interface VirtualHubsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the VirtualHubs in a subscription. */
export interface VirtualHubsList200Response extends HttpResponse {
  status: "200";
  body: ListVirtualHubsResultOutput;
}

/** Lists all the VirtualHubs in a subscription. */
export interface VirtualHubsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the effective routes configured for the Virtual Hub resource or the specified resource . */
export interface VirtualHubsGetEffectiveVirtualHubRoutes200Response extends HttpResponse {
  status: "200";
}

/** Gets the effective routes configured for the Virtual Hub resource or the specified resource . */
export interface VirtualHubsGetEffectiveVirtualHubRoutes202Response extends HttpResponse {
  status: "202";
}

/** Gets the effective routes configured for the Virtual Hub resource or the specified resource . */
export interface VirtualHubsGetEffectiveVirtualHubRoutesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the inbound routes configured for the Virtual Hub on a particular connection. */
export interface VirtualHubsGetInboundRoutes200Response extends HttpResponse {
  status: "200";
}

/** Gets the inbound routes configured for the Virtual Hub on a particular connection. */
export interface VirtualHubsGetInboundRoutes202Response extends HttpResponse {
  status: "202";
}

/** Gets the inbound routes configured for the Virtual Hub on a particular connection. */
export interface VirtualHubsGetInboundRoutesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the outbound routes configured for the Virtual Hub on a particular connection. */
export interface VirtualHubsGetOutboundRoutes200Response extends HttpResponse {
  status: "200";
}

/** Gets the outbound routes configured for the Virtual Hub on a particular connection. */
export interface VirtualHubsGetOutboundRoutes202Response extends HttpResponse {
  status: "202";
}

/** Gets the outbound routes configured for the Virtual Hub on a particular connection. */
export interface VirtualHubsGetOutboundRoutesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a RouteMap. */
export interface RouteMapsGet200Response extends HttpResponse {
  status: "200";
  body: RouteMapOutput;
}

/** Retrieves the details of a RouteMap. */
export interface RouteMapsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a RouteMap if it doesn't exist else updates the existing one. */
export interface RouteMapsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: RouteMapOutput;
}

/** Creates a RouteMap if it doesn't exist else updates the existing one. */
export interface RouteMapsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: RouteMapOutput;
}

/** Creates a RouteMap if it doesn't exist else updates the existing one. */
export interface RouteMapsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a RouteMap. */
export interface RouteMapsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a RouteMap. */
export interface RouteMapsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a RouteMap. */
export interface RouteMapsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a RouteMap. */
export interface RouteMapsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of all RouteMaps. */
export interface RouteMapsList200Response extends HttpResponse {
  status: "200";
  body: ListRouteMapsResultOutput;
}

/** Retrieves the details of all RouteMaps. */
export interface RouteMapsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a hub virtual network connection if it doesn't exist else updates the existing one. */
export interface HubVirtualNetworkConnectionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: HubVirtualNetworkConnectionOutput;
}

/** Creates a hub virtual network connection if it doesn't exist else updates the existing one. */
export interface HubVirtualNetworkConnectionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: HubVirtualNetworkConnectionOutput;
}

/** Creates a hub virtual network connection if it doesn't exist else updates the existing one. */
export interface HubVirtualNetworkConnectionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a HubVirtualNetworkConnection. */
export interface HubVirtualNetworkConnectionsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a HubVirtualNetworkConnection. */
export interface HubVirtualNetworkConnectionsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a HubVirtualNetworkConnection. */
export interface HubVirtualNetworkConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a HubVirtualNetworkConnection. */
export interface HubVirtualNetworkConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a HubVirtualNetworkConnection. */
export interface HubVirtualNetworkConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: HubVirtualNetworkConnectionOutput;
}

/** Retrieves the details of a HubVirtualNetworkConnection. */
export interface HubVirtualNetworkConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of all HubVirtualNetworkConnections. */
export interface HubVirtualNetworkConnectionsList200Response extends HttpResponse {
  status: "200";
  body: ListHubVirtualNetworkConnectionsResultOutput;
}

/** Retrieves the details of all HubVirtualNetworkConnections. */
export interface HubVirtualNetworkConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a virtual wan vpn gateway. */
export interface VpnGatewaysGet200Response extends HttpResponse {
  status: "200";
  body: VpnGatewayOutput;
}

/** Retrieves the details of a virtual wan vpn gateway. */
export interface VpnGatewaysGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a virtual wan vpn gateway if it doesn't exist else updates the existing gateway. */
export interface VpnGatewaysCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VpnGatewayOutput;
}

/** Creates a virtual wan vpn gateway if it doesn't exist else updates the existing gateway. */
export interface VpnGatewaysCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VpnGatewayOutput;
}

/** Creates a virtual wan vpn gateway if it doesn't exist else updates the existing gateway. */
export interface VpnGatewaysCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates virtual wan vpn gateway tags. */
export interface VpnGatewaysUpdateTags200Response extends HttpResponse {
  status: "200";
  body: VpnGatewayOutput;
}

/** Updates virtual wan vpn gateway tags. */
export interface VpnGatewaysUpdateTags202Response extends HttpResponse {
  status: "202";
}

/** Updates virtual wan vpn gateway tags. */
export interface VpnGatewaysUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a virtual wan vpn gateway. */
export interface VpnGatewaysDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a virtual wan vpn gateway. */
export interface VpnGatewaysDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a virtual wan vpn gateway. */
export interface VpnGatewaysDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a virtual wan vpn gateway. */
export interface VpnGatewaysDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Resets the primary of the vpn gateway in the specified resource group. */
export interface VpnGatewaysReset200Response extends HttpResponse {
  status: "200";
  body: VpnGatewayOutput;
}

/** Resets the primary of the vpn gateway in the specified resource group. */
export interface VpnGatewaysReset202Response extends HttpResponse {
  status: "202";
}

/** Resets the primary of the vpn gateway in the specified resource group. */
export interface VpnGatewaysResetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Starts packet capture on vpn gateway in the specified resource group. */
export interface VpnGatewaysStartPacketCapture200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Starts packet capture on vpn gateway in the specified resource group. */
export interface VpnGatewaysStartPacketCapture202Response extends HttpResponse {
  status: "202";
}

/** Starts packet capture on vpn gateway in the specified resource group. */
export interface VpnGatewaysStartPacketCaptureDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Stops packet capture on vpn gateway in the specified resource group. */
export interface VpnGatewaysStopPacketCapture200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Stops packet capture on vpn gateway in the specified resource group. */
export interface VpnGatewaysStopPacketCapture202Response extends HttpResponse {
  status: "202";
}

/** Stops packet capture on vpn gateway in the specified resource group. */
export interface VpnGatewaysStopPacketCaptureDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the VpnGateways in a resource group. */
export interface VpnGatewaysListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ListVpnGatewaysResultOutput;
}

/** Lists all the VpnGateways in a resource group. */
export interface VpnGatewaysListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the VpnGateways in a subscription. */
export interface VpnGatewaysList200Response extends HttpResponse {
  status: "200";
  body: ListVpnGatewaysResultOutput;
}

/** Lists all the VpnGateways in a subscription. */
export interface VpnGatewaysListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Resets the VpnLink connection specified. */
export interface VpnLinkConnectionsResetConnection202Response extends HttpResponse {
  status: "202";
}

/** Resets the VpnLink connection specified. */
export interface VpnLinkConnectionsResetConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists IKE Security Associations for Vpn Site Link Connection in the specified resource group. */
export interface VpnLinkConnectionsGetIkeSas200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Lists IKE Security Associations for Vpn Site Link Connection in the specified resource group. */
export interface VpnLinkConnectionsGetIkeSas202Response extends HttpResponse {
  status: "202";
}

/** Lists IKE Security Associations for Vpn Site Link Connection in the specified resource group. */
export interface VpnLinkConnectionsGetIkeSasDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Retrieves all vpn site link connections for a particular virtual wan vpn gateway vpn connection. */
export interface VpnLinkConnectionsListByVpnConnection200Response extends HttpResponse {
  status: "200";
  body: ListVpnSiteLinkConnectionsResultOutput;
}

/** Retrieves all vpn site link connections for a particular virtual wan vpn gateway vpn connection. */
export interface VpnLinkConnectionsListByVpnConnectionDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a vpn connection. */
export interface VpnConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: VpnConnectionOutput;
}

/** Retrieves the details of a vpn connection. */
export interface VpnConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing connection. */
export interface VpnConnectionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VpnConnectionOutput;
}

/** Creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing connection. */
export interface VpnConnectionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VpnConnectionOutput;
}

/** Creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing connection. */
export interface VpnConnectionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a vpn connection. */
export interface VpnConnectionsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a vpn connection. */
export interface VpnConnectionsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a vpn connection. */
export interface VpnConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a vpn connection. */
export interface VpnConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Starts packet capture on Vpn connection in the specified resource group. */
export interface VpnConnectionsStartPacketCapture200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Starts packet capture on Vpn connection in the specified resource group. */
export interface VpnConnectionsStartPacketCapture202Response extends HttpResponse {
  status: "202";
}

/** Starts packet capture on Vpn connection in the specified resource group. */
export interface VpnConnectionsStartPacketCaptureDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Stops packet capture on Vpn connection in the specified resource group. */
export interface VpnConnectionsStopPacketCapture200Response extends HttpResponse {
  status: "200";
  body: string;
}

/** Stops packet capture on Vpn connection in the specified resource group. */
export interface VpnConnectionsStopPacketCapture202Response extends HttpResponse {
  status: "202";
}

/** Stops packet capture on Vpn connection in the specified resource group. */
export interface VpnConnectionsStopPacketCaptureDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves all vpn connections for a particular virtual wan vpn gateway. */
export interface VpnConnectionsListByVpnGateway200Response extends HttpResponse {
  status: "200";
  body: ListVpnConnectionsResultOutput;
}

/** Retrieves all vpn connections for a particular virtual wan vpn gateway. */
export interface VpnConnectionsListByVpnGatewayDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a vpn site link connection. */
export interface VpnSiteLinkConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: VpnSiteLinkConnectionOutput;
}

/** Retrieves the details of a vpn site link connection. */
export interface VpnSiteLinkConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a nat ruleGet. */
export interface NatRulesGet200Response extends HttpResponse {
  status: "200";
  body: VpnGatewayNatRuleOutput;
}

/** Retrieves the details of a nat ruleGet. */
export interface NatRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a nat rule to a scalable vpn gateway if it doesn't exist else updates the existing nat rules. */
export interface NatRulesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VpnGatewayNatRuleOutput;
}

/** Creates a nat rule to a scalable vpn gateway if it doesn't exist else updates the existing nat rules. */
export interface NatRulesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VpnGatewayNatRuleOutput;
}

/** Creates a nat rule to a scalable vpn gateway if it doesn't exist else updates the existing nat rules. */
export interface NatRulesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a nat rule. */
export interface NatRulesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a nat rule. */
export interface NatRulesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a nat rule. */
export interface NatRulesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a nat rule. */
export interface NatRulesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves all nat rules for a particular virtual wan vpn gateway. */
export interface NatRulesListByVpnGateway200Response extends HttpResponse {
  status: "200";
  body: ListVpnGatewayNatRulesResultOutput;
}

/** Retrieves all nat rules for a particular virtual wan vpn gateway. */
export interface NatRulesListByVpnGatewayDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a virtual wan p2s vpn gateway. */
export interface P2SVpnGatewaysGet200Response extends HttpResponse {
  status: "200";
  body: P2SVpnGatewayOutput;
}

/** Retrieves the details of a virtual wan p2s vpn gateway. */
export interface P2SVpnGatewaysGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a virtual wan p2s vpn gateway if it doesn't exist else updates the existing gateway. */
export interface P2SVpnGatewaysCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: P2SVpnGatewayOutput;
}

/** Creates a virtual wan p2s vpn gateway if it doesn't exist else updates the existing gateway. */
export interface P2SVpnGatewaysCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: P2SVpnGatewayOutput;
}

/** Creates a virtual wan p2s vpn gateway if it doesn't exist else updates the existing gateway. */
export interface P2SVpnGatewaysCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates virtual wan p2s vpn gateway tags. */
export interface P2SVpnGatewaysUpdateTags200Response extends HttpResponse {
  status: "200";
  body: P2SVpnGatewayOutput;
}

/** Updates virtual wan p2s vpn gateway tags. */
export interface P2SVpnGatewaysUpdateTags202Response extends HttpResponse {
  status: "202";
}

/** Updates virtual wan p2s vpn gateway tags. */
export interface P2SVpnGatewaysUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a virtual wan p2s vpn gateway. */
export interface P2SVpnGatewaysDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a virtual wan p2s vpn gateway. */
export interface P2SVpnGatewaysDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a virtual wan p2s vpn gateway. */
export interface P2SVpnGatewaysDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a virtual wan p2s vpn gateway. */
export interface P2SVpnGatewaysDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the P2SVpnGateways in a resource group. */
export interface P2SVpnGatewaysListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ListP2SVpnGatewaysResultOutput;
}

/** Lists all the P2SVpnGateways in a resource group. */
export interface P2SVpnGatewaysListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all the P2SVpnGateways in a subscription. */
export interface P2SVpnGatewaysList200Response extends HttpResponse {
  status: "200";
  body: ListP2SVpnGatewaysResultOutput;
}

/** Lists all the P2SVpnGateways in a subscription. */
export interface P2SVpnGatewaysListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Resets the primary of the p2s vpn gateway in the specified resource group. */
export interface P2SVpnGatewaysReset200Response extends HttpResponse {
  status: "200";
  body: P2SVpnGatewayOutput;
}

/** Resets the primary of the p2s vpn gateway in the specified resource group. */
export interface P2SVpnGatewaysReset202Response extends HttpResponse {
  status: "202";
}

/** Resets the primary of the p2s vpn gateway in the specified resource group. */
export interface P2SVpnGatewaysResetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysGenerateVpnProfile200Response extends HttpResponse {
  status: "200";
  body: VpnProfileResponseOutput;
}

/** Generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysGenerateVpnProfile202Response extends HttpResponse {
  status: "202";
}

/** Generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysGenerateVpnProfileDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the connection health of P2S clients of the virtual wan P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysGetP2SVpnConnectionHealth200Response extends HttpResponse {
  status: "200";
  body: P2SVpnGatewayOutput;
}

/** Gets the connection health of P2S clients of the virtual wan P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysGetP2SVpnConnectionHealth202Response extends HttpResponse {
  status: "202";
}

/** Gets the connection health of P2S clients of the virtual wan P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysGetP2SVpnConnectionHealthDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the sas url to get the connection health detail of P2S clients of the virtual wan P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysGetP2SVpnConnectionHealthDetailed200Response extends HttpResponse {
  status: "200";
  body: P2SVpnConnectionHealthOutput;
}

/** Gets the sas url to get the connection health detail of P2S clients of the virtual wan P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysGetP2SVpnConnectionHealthDetailed202Response extends HttpResponse {
  status: "202";
}

/** Gets the sas url to get the connection health detail of P2S clients of the virtual wan P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysDisconnectP2SVpnConnections200Response extends HttpResponse {
  status: "200";
}

/** Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysDisconnectP2SVpnConnections202Response extends HttpResponse {
  status: "202";
}

/** Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group. */
export interface P2SVpnGatewaysDisconnectP2SVpnConnectionsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gives the list of VpnServerConfigurations associated with Virtual Wan in a resource group. */
export interface VpnServerConfigurationsAssociatedWithVirtualWanList200Response extends HttpResponse {
  status: "200";
  body: VpnServerConfigurationsResponseOutput;
}

/** Gives the list of VpnServerConfigurations associated with Virtual Wan in a resource group. */
export interface VpnServerConfigurationsAssociatedWithVirtualWanList202Response extends HttpResponse {
  status: "202";
}

/** Gives the list of VpnServerConfigurations associated with Virtual Wan in a resource group. */
export interface VpnServerConfigurationsAssociatedWithVirtualWanListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a VirtualHubRouteTableV2. */
export interface VirtualHubRouteTableV2SGet200Response extends HttpResponse {
  status: "200";
  body: VirtualHubRouteTableV2Output;
}

/** Retrieves the details of a VirtualHubRouteTableV2. */
export interface VirtualHubRouteTableV2SGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing VirtualHubRouteTableV2. */
export interface VirtualHubRouteTableV2SCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: VirtualHubRouteTableV2Output;
}

/** Creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing VirtualHubRouteTableV2. */
export interface VirtualHubRouteTableV2SCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: VirtualHubRouteTableV2Output;
}

/** Creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing VirtualHubRouteTableV2. */
export interface VirtualHubRouteTableV2SCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Deletes a VirtualHubRouteTableV2. */
export interface VirtualHubRouteTableV2SDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a VirtualHubRouteTableV2. */
export interface VirtualHubRouteTableV2SDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a VirtualHubRouteTableV2. */
export interface VirtualHubRouteTableV2SDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a VirtualHubRouteTableV2. */
export interface VirtualHubRouteTableV2SDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** Retrieves the details of all VirtualHubRouteTableV2s. */
export interface VirtualHubRouteTableV2SList200Response extends HttpResponse {
  status: "200";
  body: ListVirtualHubRouteTableV2SResultOutput;
}

/** Retrieves the details of all VirtualHubRouteTableV2s. */
export interface VirtualHubRouteTableV2SListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists ExpressRoute gateways under a given subscription. */
export interface ExpressRouteGatewaysListBySubscription200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteGatewayListOutput;
}

/** Lists ExpressRoute gateways under a given subscription. */
export interface ExpressRouteGatewaysListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists ExpressRoute gateways in a given resource group. */
export interface ExpressRouteGatewaysListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteGatewayListOutput;
}

/** Lists ExpressRoute gateways in a given resource group. */
export interface ExpressRouteGatewaysListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or updates a ExpressRoute gateway in a specified resource group. */
export interface ExpressRouteGatewaysCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteGatewayOutput;
}

/** Creates or updates a ExpressRoute gateway in a specified resource group. */
export interface ExpressRouteGatewaysCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ExpressRouteGatewayOutput;
}

/** Creates or updates a ExpressRoute gateway in a specified resource group. */
export interface ExpressRouteGatewaysCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Updates express route gateway tags. */
export interface ExpressRouteGatewaysUpdateTags200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteGatewayOutput;
}

/** Updates express route gateway tags. */
export interface ExpressRouteGatewaysUpdateTags202Response extends HttpResponse {
  status: "202";
}

/** Updates express route gateway tags. */
export interface ExpressRouteGatewaysUpdateTagsDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Fetches the details of a ExpressRoute gateway in a resource group. */
export interface ExpressRouteGatewaysGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteGatewayOutput;
}

/** Fetches the details of a ExpressRoute gateway in a resource group. */
export interface ExpressRouteGatewaysGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes the specified ExpressRoute gateway in a resource group. An ExpressRoute gateway resource can only be deleted when there are no connection subresources. */
export interface ExpressRouteGatewaysDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the specified ExpressRoute gateway in a resource group. An ExpressRoute gateway resource can only be deleted when there are no connection subresources. */
export interface ExpressRouteGatewaysDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the specified ExpressRoute gateway in a resource group. An ExpressRoute gateway resource can only be deleted when there are no connection subresources. */
export interface ExpressRouteGatewaysDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the specified ExpressRoute gateway in a resource group. An ExpressRoute gateway resource can only be deleted when there are no connection subresources. */
export interface ExpressRouteGatewaysDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a connection between an ExpressRoute gateway and an ExpressRoute circuit. */
export interface ExpressRouteConnectionsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteConnectionOutput;
}

/** Creates a connection between an ExpressRoute gateway and an ExpressRoute circuit. */
export interface ExpressRouteConnectionsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ExpressRouteConnectionOutput;
}

/** Creates a connection between an ExpressRoute gateway and an ExpressRoute circuit. */
export interface ExpressRouteConnectionsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the specified ExpressRouteConnection. */
export interface ExpressRouteConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteConnectionOutput;
}

/** Gets the specified ExpressRouteConnection. */
export interface ExpressRouteConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a connection to a ExpressRoute circuit. */
export interface ExpressRouteConnectionsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a connection to a ExpressRoute circuit. */
export interface ExpressRouteConnectionsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a connection to a ExpressRoute circuit. */
export interface ExpressRouteConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a connection to a ExpressRoute circuit. */
export interface ExpressRouteConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists ExpressRouteConnections. */
export interface ExpressRouteConnectionsList200Response extends HttpResponse {
  status: "200";
  body: ExpressRouteConnectionListOutput;
}

/** Lists ExpressRouteConnections. */
export interface ExpressRouteConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a Virtual Hub Bgp Connection. */
export interface VirtualHubBgpConnectionGet200Response extends HttpResponse {
  status: "200";
  body: BgpConnectionOutput;
}

/** Retrieves the details of a Virtual Hub Bgp Connection. */
export interface VirtualHubBgpConnectionGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a VirtualHubBgpConnection resource if it doesn't exist else updates the existing VirtualHubBgpConnection. */
export interface VirtualHubBgpConnectionCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: BgpConnectionOutput;
}

/** Creates a VirtualHubBgpConnection resource if it doesn't exist else updates the existing VirtualHubBgpConnection. */
export interface VirtualHubBgpConnectionCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: BgpConnectionOutput;
}

/** Creates a VirtualHubBgpConnection resource if it doesn't exist else updates the existing VirtualHubBgpConnection. */
export interface VirtualHubBgpConnectionCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a VirtualHubBgpConnection. */
export interface VirtualHubBgpConnectionDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a VirtualHubBgpConnection. */
export interface VirtualHubBgpConnectionDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a VirtualHubBgpConnection. */
export interface VirtualHubBgpConnectionDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a VirtualHubBgpConnection. */
export interface VirtualHubBgpConnectionDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of all VirtualHubBgpConnections. */
export interface VirtualHubBgpConnectionsList200Response extends HttpResponse {
  status: "200";
  body: ListVirtualHubBgpConnectionResultsOutput;
}

/** Retrieves the details of all VirtualHubBgpConnections. */
export interface VirtualHubBgpConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves a list of routes the virtual hub bgp connection has learned. */
export interface VirtualHubBgpConnectionsListLearnedRoutes200Response extends HttpResponse {
  status: "200";
  body: PeerRouteListOutput;
}

/** Retrieves a list of routes the virtual hub bgp connection has learned. */
export interface VirtualHubBgpConnectionsListLearnedRoutes202Response extends HttpResponse {
  status: "202";
}

/** Retrieves a list of routes the virtual hub bgp connection has learned. */
export interface VirtualHubBgpConnectionsListLearnedRoutesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer. */
export interface VirtualHubBgpConnectionsListAdvertisedRoutes200Response extends HttpResponse {
  status: "200";
  body: PeerRouteListOutput;
}

/** Retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer. */
export interface VirtualHubBgpConnectionsListAdvertisedRoutes202Response extends HttpResponse {
  status: "202";
}

/** Retrieves a list of routes the virtual hub bgp connection is advertising to the specified peer. */
export interface VirtualHubBgpConnectionsListAdvertisedRoutesDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a Virtual Hub Ip configuration. */
export interface VirtualHubIpConfigurationGet200Response extends HttpResponse {
  status: "200";
  body: HubIpConfigurationOutput;
}

/** Retrieves the details of a Virtual Hub Ip configuration. */
export interface VirtualHubIpConfigurationGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a VirtualHubIpConfiguration resource if it doesn't exist else updates the existing VirtualHubIpConfiguration. */
export interface VirtualHubIpConfigurationCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: HubIpConfigurationOutput;
}

/** Creates a VirtualHubIpConfiguration resource if it doesn't exist else updates the existing VirtualHubIpConfiguration. */
export interface VirtualHubIpConfigurationCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: HubIpConfigurationOutput;
}

/** Creates a VirtualHubIpConfiguration resource if it doesn't exist else updates the existing VirtualHubIpConfiguration. */
export interface VirtualHubIpConfigurationCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a VirtualHubIpConfiguration. */
export interface VirtualHubIpConfigurationDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a VirtualHubIpConfiguration. */
export interface VirtualHubIpConfigurationDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a VirtualHubIpConfiguration. */
export interface VirtualHubIpConfigurationDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a VirtualHubIpConfiguration. */
export interface VirtualHubIpConfigurationDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of all VirtualHubIpConfigurations. */
export interface VirtualHubIpConfigurationList200Response extends HttpResponse {
  status: "200";
  body: ListVirtualHubIpConfigurationResultsOutput;
}

/** Retrieves the details of all VirtualHubIpConfigurations. */
export interface VirtualHubIpConfigurationListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a RouteTable resource if it doesn't exist else updates the existing RouteTable. */
export interface HubRouteTablesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: HubRouteTableOutput;
}

/** Creates a RouteTable resource if it doesn't exist else updates the existing RouteTable. */
export interface HubRouteTablesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: HubRouteTableOutput;
}

/** Creates a RouteTable resource if it doesn't exist else updates the existing RouteTable. */
export interface HubRouteTablesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a RouteTable. */
export interface HubRouteTablesGet200Response extends HttpResponse {
  status: "200";
  body: HubRouteTableOutput;
}

/** Retrieves the details of a RouteTable. */
export interface HubRouteTablesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a RouteTable. */
export interface HubRouteTablesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a RouteTable. */
export interface HubRouteTablesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a RouteTable. */
export interface HubRouteTablesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a RouteTable. */
export interface HubRouteTablesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of all RouteTables. */
export interface HubRouteTablesList200Response extends HttpResponse {
  status: "200";
  body: ListHubRouteTablesResultOutput;
}

/** Retrieves the details of all RouteTables. */
export interface HubRouteTablesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent. */
export interface RoutingIntentCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: RoutingIntentOutput;
}

/** Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent. */
export interface RoutingIntentCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: RoutingIntentOutput;
}

/** Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent. */
export interface RoutingIntentCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of a RoutingIntent. */
export interface RoutingIntentGet200Response extends HttpResponse {
  status: "200";
  body: RoutingIntentOutput;
}

/** Retrieves the details of a RoutingIntent. */
export interface RoutingIntentGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes a RoutingIntent. */
export interface RoutingIntentDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a RoutingIntent. */
export interface RoutingIntentDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a RoutingIntent. */
export interface RoutingIntentDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a RoutingIntent. */
export interface RoutingIntentDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieves the details of all RoutingIntent child resources of the VirtualHub. */
export interface RoutingIntentList200Response extends HttpResponse {
  status: "200";
  body: ListRoutingIntentResultOutput;
}

/** Retrieves the details of all RoutingIntent child resources of the VirtualHub. */
export interface RoutingIntentListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Lists all of the protection policies within a resource group. */
export interface WebApplicationFirewallPoliciesList200Response extends HttpResponse {
  status: "200";
  body: WebApplicationFirewallPolicyListResultOutput;
}

/** Lists all of the protection policies within a resource group. */
export interface WebApplicationFirewallPoliciesListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets all the WAF policies in a subscription. */
export interface WebApplicationFirewallPoliciesListAll200Response extends HttpResponse {
  status: "200";
  body: WebApplicationFirewallPolicyListResultOutput;
}

/** Gets all the WAF policies in a subscription. */
export interface WebApplicationFirewallPoliciesListAllDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Retrieve protection policy with specified name within a resource group. */
export interface WebApplicationFirewallPoliciesGet200Response extends HttpResponse {
  status: "200";
  body: WebApplicationFirewallPolicyOutput;
}

/** Retrieve protection policy with specified name within a resource group. */
export interface WebApplicationFirewallPoliciesGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Creates or update policy with specified rule set name within a resource group. */
export interface WebApplicationFirewallPoliciesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: WebApplicationFirewallPolicyOutput;
}

/** Creates or update policy with specified rule set name within a resource group. */
export interface WebApplicationFirewallPoliciesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: WebApplicationFirewallPolicyOutput;
}

/** Creates or update policy with specified rule set name within a resource group. */
export interface WebApplicationFirewallPoliciesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Deletes Policy. */
export interface WebApplicationFirewallPoliciesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes Policy. */
export interface WebApplicationFirewallPoliciesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes Policy. */
export interface WebApplicationFirewallPoliciesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes Policy. */
export interface WebApplicationFirewallPoliciesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production */
export interface VipSwapGet200Response extends HttpResponse {
  status: "200";
  body: SwapResourceOutput;
}

/** Gets the SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production */
export interface VipSwapGetDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Performs vip swap operation on swappable cloud services. */
export interface VipSwapCreate200Response extends HttpResponse {
  status: "200";
}

/** Performs vip swap operation on swappable cloud services. */
export interface VipSwapCreate202Response extends HttpResponse {
  status: "202";
}

/** Performs vip swap operation on swappable cloud services. */
export interface VipSwapCreateDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}

/** Gets the list of SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production */
export interface VipSwapList200Response extends HttpResponse {
  status: "200";
  body: SwapResourceListResultOutput;
}

/** Gets the list of SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production */
export interface VipSwapListDefaultResponse extends HttpResponse {
  status: string;
  body: CloudErrorOutput;
}
