// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  ActiveConfigurationParameter,
  AdminRuleCollection,
  ApplicationGateway,
  ApplicationGatewayOnDemandProbe,
  ApplicationGatewayPrivateEndpointConnection,
  ApplicationSecurityGroup,
  AvailableProvidersListParameters,
  AzureFirewall,
  AzureReachabilityReportParameters,
  BackendAddressPool,
  BaseAdminRule,
  BastionHost,
  BastionShareableLinkListRequest,
  BgpConnection,
  CheckPrivateLinkServiceVisibilityRequest,
  ConnectionMonitor,
  ConnectionResetSharedKey,
  ConnectionSharedKey,
  ConnectivityConfiguration,
  ConnectivityParameters,
  CustomIpPrefix,
  DdosCustomPolicy,
  DdosProtectionPlan,
  DscpConfiguration,
  EffectiveRoutesParameters,
  ExpressRouteCircuit,
  ExpressRouteCircuitAuthorization,
  ExpressRouteCircuitConnection,
  ExpressRouteCircuitPeering,
  ExpressRouteConnection,
  ExpressRouteCrossConnection,
  ExpressRouteCrossConnectionPeering,
  ExpressRouteGateway,
  ExpressRoutePort,
  ExpressRoutePortAuthorization,
  FirewallPolicy,
  FirewallPolicyRuleCollectionGroup,
  FlowLog,
  FlowLogInformation,
  FlowLogStatusParameters,
  GenerateExpressRoutePortsLOARequest,
  GetInboundRoutesParameters,
  GetOutboundRoutesParameters,
  GetVpnSitesConfigurationRequest,
  HubIpConfiguration,
  HubRouteTable,
  HubVirtualNetworkConnection,
  IdpsQueryObject,
  InboundNatRule,
  InboundSecurityRule,
  IpAllocation,
  IpGroup,
  LoadBalancer,
  LoadBalancerVipSwapRequest,
  LocalNetworkGateway,
  NatGateway,
  NetworkConfigurationDiagnosticParameters,
  NetworkGroup,
  NetworkInterface,
  NetworkInterfaceTapConfiguration,
  NetworkManager,
  NetworkManagerCommit,
  NetworkManagerConnection,
  NetworkManagerDeploymentStatusParameter,
  NetworkProfile,
  NetworkSecurityGroup,
  NetworkVirtualAppliance,
  NetworkWatcher,
  NextHopParameters,
  P2SVpnConnectionHealthRequest,
  P2SVpnConnectionRequest,
  P2SVpnGateway,
  P2SVpnProfileParameters,
  PacketCapture,
  PatchObject,
  PrepareNetworkPoliciesRequest,
  PrivateDnsZoneGroup,
  PrivateEndpoint,
  PrivateEndpointConnection,
  PrivateLinkService,
  PublicIPAddress,
  PublicIPPrefix,
  QueryInboundNatRulePortMappingRequest,
  QueryRequestOptions,
  QueryTroubleshootingParameters,
  Route,
  RouteFilter,
  RouteFilterRule,
  RouteMap,
  RouteTable,
  RoutingIntent,
  ScopeConnection,
  SecurityAdminConfiguration,
  SecurityGroupViewParameters,
  SecurityPartnerProvider,
  SecurityRule,
  ServiceEndpointPolicy,
  ServiceEndpointPolicyDefinition,
  SessionIds,
  SignatureOverridesFilterValuesQuery,
  SignaturesOverrides,
  StaticMember,
  Subnet,
  SwapResource,
  TagsObject,
  TopologyParameters,
  TroubleshootingParameters,
  UnprepareNetworkPoliciesRequest,
  VerificationIPFlowParameters,
  VirtualApplianceSite,
  VirtualHub,
  VirtualHubRouteTableV2,
  VirtualNetwork,
  VirtualNetworkGateway,
  VirtualNetworkGatewayConnection,
  VirtualNetworkGatewayNatRule,
  VirtualNetworkPeering,
  VirtualNetworkTap,
  VirtualRouter,
  VirtualRouterPeering,
  VirtualWAN,
  VirtualWanVpnProfileParameters,
  VpnClientIPsecParameters,
  VpnClientParameters,
  VpnConnection,
  VpnConnectionPacketCaptureStartParameters,
  VpnConnectionPacketCaptureStopParameters,
  VpnDeviceScriptParameters,
  VpnGateway,
  VpnGatewayNatRule,
  VpnGatewayPacketCaptureStartParameters,
  VpnGatewayPacketCaptureStopParameters,
  VpnPacketCaptureStartParameters,
  VpnPacketCaptureStopParameters,
  VpnServerConfiguration,
  VpnServerConfigurationPolicyGroup,
  VpnSite,
  WebApplicationFirewallPolicy,
} from "./models";

export interface ApplicationGatewaysDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysDeleteQueryParam {
  queryParameters: ApplicationGatewaysDeleteQueryParamProperties;
}

export type ApplicationGatewaysDeleteParameters = ApplicationGatewaysDeleteQueryParam &
  RequestParameters;

export interface ApplicationGatewaysGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysGetQueryParam {
  queryParameters: ApplicationGatewaysGetQueryParamProperties;
}

export type ApplicationGatewaysGetParameters = ApplicationGatewaysGetQueryParam & RequestParameters;

export interface ApplicationGatewaysCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update application gateway operation. */
  body: ApplicationGateway;
}

export interface ApplicationGatewaysCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysCreateOrUpdateQueryParam {
  queryParameters: ApplicationGatewaysCreateOrUpdateQueryParamProperties;
}

export interface ApplicationGatewaysCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApplicationGatewaysCreateOrUpdateParameters =
  ApplicationGatewaysCreateOrUpdateQueryParam &
    ApplicationGatewaysCreateOrUpdateMediaTypesParam &
    ApplicationGatewaysCreateOrUpdateBodyParam &
    RequestParameters;

export interface ApplicationGatewaysUpdateTagsBodyParam {
  /** Parameters supplied to update application gateway tags. */
  body: TagsObject;
}

export interface ApplicationGatewaysUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysUpdateTagsQueryParam {
  queryParameters: ApplicationGatewaysUpdateTagsQueryParamProperties;
}

export interface ApplicationGatewaysUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApplicationGatewaysUpdateTagsParameters = ApplicationGatewaysUpdateTagsQueryParam &
  ApplicationGatewaysUpdateTagsMediaTypesParam &
  ApplicationGatewaysUpdateTagsBodyParam &
  RequestParameters;

export interface ApplicationGatewaysListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysListQueryParam {
  queryParameters: ApplicationGatewaysListQueryParamProperties;
}

export type ApplicationGatewaysListParameters = ApplicationGatewaysListQueryParam &
  RequestParameters;

export interface ApplicationGatewaysListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysListAllQueryParam {
  queryParameters: ApplicationGatewaysListAllQueryParamProperties;
}

export type ApplicationGatewaysListAllParameters = ApplicationGatewaysListAllQueryParam &
  RequestParameters;

export interface ApplicationGatewaysStartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysStartQueryParam {
  queryParameters: ApplicationGatewaysStartQueryParamProperties;
}

export type ApplicationGatewaysStartParameters = ApplicationGatewaysStartQueryParam &
  RequestParameters;

export interface ApplicationGatewaysStopQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysStopQueryParam {
  queryParameters: ApplicationGatewaysStopQueryParamProperties;
}

export type ApplicationGatewaysStopParameters = ApplicationGatewaysStopQueryParam &
  RequestParameters;

export interface ApplicationGatewaysBackendHealthQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands BackendAddressPool and BackendHttpSettings referenced in backend health. */
  $expand?: string;
}

export interface ApplicationGatewaysBackendHealthQueryParam {
  queryParameters: ApplicationGatewaysBackendHealthQueryParamProperties;
}

export type ApplicationGatewaysBackendHealthParameters =
  ApplicationGatewaysBackendHealthQueryParam & RequestParameters;

export interface ApplicationGatewaysBackendHealthOnDemandBodyParam {
  /** Request body for on-demand test probe operation. */
  body: ApplicationGatewayOnDemandProbe;
}

export interface ApplicationGatewaysBackendHealthOnDemandQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands BackendAddressPool and BackendHttpSettings referenced in backend health. */
  $expand?: string;
}

export interface ApplicationGatewaysBackendHealthOnDemandQueryParam {
  queryParameters: ApplicationGatewaysBackendHealthOnDemandQueryParamProperties;
}

export interface ApplicationGatewaysBackendHealthOnDemandMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApplicationGatewaysBackendHealthOnDemandParameters =
  ApplicationGatewaysBackendHealthOnDemandQueryParam &
    ApplicationGatewaysBackendHealthOnDemandMediaTypesParam &
    ApplicationGatewaysBackendHealthOnDemandBodyParam &
    RequestParameters;

export interface ApplicationGatewaysListAvailableServerVariablesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysListAvailableServerVariablesQueryParam {
  queryParameters: ApplicationGatewaysListAvailableServerVariablesQueryParamProperties;
}

export type ApplicationGatewaysListAvailableServerVariablesParameters =
  ApplicationGatewaysListAvailableServerVariablesQueryParam & RequestParameters;

export interface ApplicationGatewaysListAvailableRequestHeadersQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysListAvailableRequestHeadersQueryParam {
  queryParameters: ApplicationGatewaysListAvailableRequestHeadersQueryParamProperties;
}

export type ApplicationGatewaysListAvailableRequestHeadersParameters =
  ApplicationGatewaysListAvailableRequestHeadersQueryParam & RequestParameters;

export interface ApplicationGatewaysListAvailableResponseHeadersQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysListAvailableResponseHeadersQueryParam {
  queryParameters: ApplicationGatewaysListAvailableResponseHeadersQueryParamProperties;
}

export type ApplicationGatewaysListAvailableResponseHeadersParameters =
  ApplicationGatewaysListAvailableResponseHeadersQueryParam & RequestParameters;

export interface ApplicationGatewaysListAvailableWafRuleSetsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysListAvailableWafRuleSetsQueryParam {
  queryParameters: ApplicationGatewaysListAvailableWafRuleSetsQueryParamProperties;
}

export type ApplicationGatewaysListAvailableWafRuleSetsParameters =
  ApplicationGatewaysListAvailableWafRuleSetsQueryParam & RequestParameters;

export interface ApplicationGatewaysListAvailableSslOptionsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysListAvailableSslOptionsQueryParam {
  queryParameters: ApplicationGatewaysListAvailableSslOptionsQueryParamProperties;
}

export type ApplicationGatewaysListAvailableSslOptionsParameters =
  ApplicationGatewaysListAvailableSslOptionsQueryParam & RequestParameters;

export interface ApplicationGatewaysListAvailableSslPredefinedPoliciesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysListAvailableSslPredefinedPoliciesQueryParam {
  queryParameters: ApplicationGatewaysListAvailableSslPredefinedPoliciesQueryParamProperties;
}

export type ApplicationGatewaysListAvailableSslPredefinedPoliciesParameters =
  ApplicationGatewaysListAvailableSslPredefinedPoliciesQueryParam & RequestParameters;

export interface ApplicationGatewaysGetSslPredefinedPolicyQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewaysGetSslPredefinedPolicyQueryParam {
  queryParameters: ApplicationGatewaysGetSslPredefinedPolicyQueryParamProperties;
}

export type ApplicationGatewaysGetSslPredefinedPolicyParameters =
  ApplicationGatewaysGetSslPredefinedPolicyQueryParam & RequestParameters;

export interface ApplicationGatewayPrivateLinkResourcesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewayPrivateLinkResourcesListQueryParam {
  queryParameters: ApplicationGatewayPrivateLinkResourcesListQueryParamProperties;
}

export type ApplicationGatewayPrivateLinkResourcesListParameters =
  ApplicationGatewayPrivateLinkResourcesListQueryParam & RequestParameters;

export interface ApplicationGatewayPrivateEndpointConnectionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewayPrivateEndpointConnectionsDeleteQueryParam {
  queryParameters: ApplicationGatewayPrivateEndpointConnectionsDeleteQueryParamProperties;
}

export type ApplicationGatewayPrivateEndpointConnectionsDeleteParameters =
  ApplicationGatewayPrivateEndpointConnectionsDeleteQueryParam & RequestParameters;

export interface ApplicationGatewayPrivateEndpointConnectionsUpdateBodyParam {
  /** Parameters supplied to update application gateway private endpoint connection operation. */
  body: ApplicationGatewayPrivateEndpointConnection;
}

export interface ApplicationGatewayPrivateEndpointConnectionsUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewayPrivateEndpointConnectionsUpdateQueryParam {
  queryParameters: ApplicationGatewayPrivateEndpointConnectionsUpdateQueryParamProperties;
}

export interface ApplicationGatewayPrivateEndpointConnectionsUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApplicationGatewayPrivateEndpointConnectionsUpdateParameters =
  ApplicationGatewayPrivateEndpointConnectionsUpdateQueryParam &
    ApplicationGatewayPrivateEndpointConnectionsUpdateMediaTypesParam &
    ApplicationGatewayPrivateEndpointConnectionsUpdateBodyParam &
    RequestParameters;

export interface ApplicationGatewayPrivateEndpointConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewayPrivateEndpointConnectionsGetQueryParam {
  queryParameters: ApplicationGatewayPrivateEndpointConnectionsGetQueryParamProperties;
}

export type ApplicationGatewayPrivateEndpointConnectionsGetParameters =
  ApplicationGatewayPrivateEndpointConnectionsGetQueryParam & RequestParameters;

export interface ApplicationGatewayPrivateEndpointConnectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewayPrivateEndpointConnectionsListQueryParam {
  queryParameters: ApplicationGatewayPrivateEndpointConnectionsListQueryParamProperties;
}

export type ApplicationGatewayPrivateEndpointConnectionsListParameters =
  ApplicationGatewayPrivateEndpointConnectionsListQueryParam & RequestParameters;

export interface ApplicationGatewayWafDynamicManifestsDefaultGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewayWafDynamicManifestsDefaultGetQueryParam {
  queryParameters: ApplicationGatewayWafDynamicManifestsDefaultGetQueryParamProperties;
}

export type ApplicationGatewayWafDynamicManifestsDefaultGetParameters =
  ApplicationGatewayWafDynamicManifestsDefaultGetQueryParam & RequestParameters;

export interface ApplicationGatewayWafDynamicManifestsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationGatewayWafDynamicManifestsGetQueryParam {
  queryParameters: ApplicationGatewayWafDynamicManifestsGetQueryParamProperties;
}

export type ApplicationGatewayWafDynamicManifestsGetParameters =
  ApplicationGatewayWafDynamicManifestsGetQueryParam & RequestParameters;

export interface ApplicationSecurityGroupsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationSecurityGroupsDeleteQueryParam {
  queryParameters: ApplicationSecurityGroupsDeleteQueryParamProperties;
}

export type ApplicationSecurityGroupsDeleteParameters = ApplicationSecurityGroupsDeleteQueryParam &
  RequestParameters;

export interface ApplicationSecurityGroupsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationSecurityGroupsGetQueryParam {
  queryParameters: ApplicationSecurityGroupsGetQueryParamProperties;
}

export type ApplicationSecurityGroupsGetParameters = ApplicationSecurityGroupsGetQueryParam &
  RequestParameters;

export interface ApplicationSecurityGroupsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update ApplicationSecurityGroup operation. */
  body: ApplicationSecurityGroup;
}

export interface ApplicationSecurityGroupsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationSecurityGroupsCreateOrUpdateQueryParam {
  queryParameters: ApplicationSecurityGroupsCreateOrUpdateQueryParamProperties;
}

export interface ApplicationSecurityGroupsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApplicationSecurityGroupsCreateOrUpdateParameters =
  ApplicationSecurityGroupsCreateOrUpdateQueryParam &
    ApplicationSecurityGroupsCreateOrUpdateMediaTypesParam &
    ApplicationSecurityGroupsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ApplicationSecurityGroupsUpdateTagsBodyParam {
  /** Parameters supplied to update application security group tags. */
  body: TagsObject;
}

export interface ApplicationSecurityGroupsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationSecurityGroupsUpdateTagsQueryParam {
  queryParameters: ApplicationSecurityGroupsUpdateTagsQueryParamProperties;
}

export interface ApplicationSecurityGroupsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ApplicationSecurityGroupsUpdateTagsParameters =
  ApplicationSecurityGroupsUpdateTagsQueryParam &
    ApplicationSecurityGroupsUpdateTagsMediaTypesParam &
    ApplicationSecurityGroupsUpdateTagsBodyParam &
    RequestParameters;

export interface ApplicationSecurityGroupsListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationSecurityGroupsListAllQueryParam {
  queryParameters: ApplicationSecurityGroupsListAllQueryParamProperties;
}

export type ApplicationSecurityGroupsListAllParameters =
  ApplicationSecurityGroupsListAllQueryParam & RequestParameters;

export interface ApplicationSecurityGroupsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ApplicationSecurityGroupsListQueryParam {
  queryParameters: ApplicationSecurityGroupsListQueryParamProperties;
}

export type ApplicationSecurityGroupsListParameters = ApplicationSecurityGroupsListQueryParam &
  RequestParameters;

export interface AvailableDelegationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AvailableDelegationsListQueryParam {
  queryParameters: AvailableDelegationsListQueryParamProperties;
}

export type AvailableDelegationsListParameters = AvailableDelegationsListQueryParam &
  RequestParameters;

export interface AvailableResourceGroupDelegationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AvailableResourceGroupDelegationsListQueryParam {
  queryParameters: AvailableResourceGroupDelegationsListQueryParamProperties;
}

export type AvailableResourceGroupDelegationsListParameters =
  AvailableResourceGroupDelegationsListQueryParam & RequestParameters;

export interface AvailableServiceAliasesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AvailableServiceAliasesListQueryParam {
  queryParameters: AvailableServiceAliasesListQueryParamProperties;
}

export type AvailableServiceAliasesListParameters = AvailableServiceAliasesListQueryParam &
  RequestParameters;

export interface AvailableServiceAliasesListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AvailableServiceAliasesListByResourceGroupQueryParam {
  queryParameters: AvailableServiceAliasesListByResourceGroupQueryParamProperties;
}

export type AvailableServiceAliasesListByResourceGroupParameters =
  AvailableServiceAliasesListByResourceGroupQueryParam & RequestParameters;

export interface AzureFirewallsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AzureFirewallsDeleteQueryParam {
  queryParameters: AzureFirewallsDeleteQueryParamProperties;
}

export type AzureFirewallsDeleteParameters = AzureFirewallsDeleteQueryParam & RequestParameters;

export interface AzureFirewallsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AzureFirewallsGetQueryParam {
  queryParameters: AzureFirewallsGetQueryParamProperties;
}

export type AzureFirewallsGetParameters = AzureFirewallsGetQueryParam & RequestParameters;

export interface AzureFirewallsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update Azure Firewall operation. */
  body: AzureFirewall;
}

export interface AzureFirewallsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AzureFirewallsCreateOrUpdateQueryParam {
  queryParameters: AzureFirewallsCreateOrUpdateQueryParamProperties;
}

export interface AzureFirewallsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AzureFirewallsCreateOrUpdateParameters = AzureFirewallsCreateOrUpdateQueryParam &
  AzureFirewallsCreateOrUpdateMediaTypesParam &
  AzureFirewallsCreateOrUpdateBodyParam &
  RequestParameters;

export interface AzureFirewallsUpdateTagsBodyParam {
  /** Parameters supplied to update azure firewall tags. */
  body: TagsObject;
}

export interface AzureFirewallsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AzureFirewallsUpdateTagsQueryParam {
  queryParameters: AzureFirewallsUpdateTagsQueryParamProperties;
}

export interface AzureFirewallsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AzureFirewallsUpdateTagsParameters = AzureFirewallsUpdateTagsQueryParam &
  AzureFirewallsUpdateTagsMediaTypesParam &
  AzureFirewallsUpdateTagsBodyParam &
  RequestParameters;

export interface AzureFirewallsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AzureFirewallsListQueryParam {
  queryParameters: AzureFirewallsListQueryParamProperties;
}

export type AzureFirewallsListParameters = AzureFirewallsListQueryParam & RequestParameters;

export interface AzureFirewallsListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AzureFirewallsListAllQueryParam {
  queryParameters: AzureFirewallsListAllQueryParamProperties;
}

export type AzureFirewallsListAllParameters = AzureFirewallsListAllQueryParam & RequestParameters;

export interface AzureFirewallsListLearnedPrefixesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AzureFirewallsListLearnedPrefixesQueryParam {
  queryParameters: AzureFirewallsListLearnedPrefixesQueryParamProperties;
}

export type AzureFirewallsListLearnedPrefixesParameters =
  AzureFirewallsListLearnedPrefixesQueryParam & RequestParameters;

export interface AzureFirewallFqdnTagsListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AzureFirewallFqdnTagsListAllQueryParam {
  queryParameters: AzureFirewallFqdnTagsListAllQueryParamProperties;
}

export type AzureFirewallFqdnTagsListAllParameters = AzureFirewallFqdnTagsListAllQueryParam &
  RequestParameters;

export interface WebCategoriesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands resourceIds back referenced by the azureWebCategory resource. */
  $expand?: string;
}

export interface WebCategoriesGetQueryParam {
  queryParameters: WebCategoriesGetQueryParamProperties;
}

export type WebCategoriesGetParameters = WebCategoriesGetQueryParam & RequestParameters;

export interface WebCategoriesListBySubscriptionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface WebCategoriesListBySubscriptionQueryParam {
  queryParameters: WebCategoriesListBySubscriptionQueryParamProperties;
}

export type WebCategoriesListBySubscriptionParameters = WebCategoriesListBySubscriptionQueryParam &
  RequestParameters;

export interface BastionHostsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface BastionHostsDeleteQueryParam {
  queryParameters: BastionHostsDeleteQueryParamProperties;
}

export type BastionHostsDeleteParameters = BastionHostsDeleteQueryParam & RequestParameters;

export interface BastionHostsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface BastionHostsGetQueryParam {
  queryParameters: BastionHostsGetQueryParamProperties;
}

export type BastionHostsGetParameters = BastionHostsGetQueryParam & RequestParameters;

export interface BastionHostsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update Bastion Host operation. */
  body: BastionHost;
}

export interface BastionHostsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface BastionHostsCreateOrUpdateQueryParam {
  queryParameters: BastionHostsCreateOrUpdateQueryParamProperties;
}

export interface BastionHostsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type BastionHostsCreateOrUpdateParameters = BastionHostsCreateOrUpdateQueryParam &
  BastionHostsCreateOrUpdateMediaTypesParam &
  BastionHostsCreateOrUpdateBodyParam &
  RequestParameters;

export interface BastionHostsUpdateTagsBodyParam {
  /** Parameters supplied to update BastionHost tags. */
  body: TagsObject;
}

export interface BastionHostsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface BastionHostsUpdateTagsQueryParam {
  queryParameters: BastionHostsUpdateTagsQueryParamProperties;
}

export interface BastionHostsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type BastionHostsUpdateTagsParameters = BastionHostsUpdateTagsQueryParam &
  BastionHostsUpdateTagsMediaTypesParam &
  BastionHostsUpdateTagsBodyParam &
  RequestParameters;

export interface BastionHostsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface BastionHostsListQueryParam {
  queryParameters: BastionHostsListQueryParamProperties;
}

export type BastionHostsListParameters = BastionHostsListQueryParam & RequestParameters;

export interface BastionHostsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface BastionHostsListByResourceGroupQueryParam {
  queryParameters: BastionHostsListByResourceGroupQueryParamProperties;
}

export type BastionHostsListByResourceGroupParameters = BastionHostsListByResourceGroupQueryParam &
  RequestParameters;

export interface PutBastionShareableLinkBodyParam {
  /** Post request for all the Bastion Shareable Link endpoints. */
  body: BastionShareableLinkListRequest;
}

export interface PutBastionShareableLinkQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PutBastionShareableLinkQueryParam {
  queryParameters: PutBastionShareableLinkQueryParamProperties;
}

export interface PutBastionShareableLinkMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PutBastionShareableLinkParameters = PutBastionShareableLinkQueryParam &
  PutBastionShareableLinkMediaTypesParam &
  PutBastionShareableLinkBodyParam &
  RequestParameters;

export interface DeleteBastionShareableLinkBodyParam {
  /** Post request for all the Bastion Shareable Link endpoints. */
  body: BastionShareableLinkListRequest;
}

export interface DeleteBastionShareableLinkQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DeleteBastionShareableLinkQueryParam {
  queryParameters: DeleteBastionShareableLinkQueryParamProperties;
}

export interface DeleteBastionShareableLinkMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DeleteBastionShareableLinkParameters = DeleteBastionShareableLinkQueryParam &
  DeleteBastionShareableLinkMediaTypesParam &
  DeleteBastionShareableLinkBodyParam &
  RequestParameters;

export interface GetBastionShareableLinkBodyParam {
  /** Post request for all the Bastion Shareable Link endpoints. */
  body: BastionShareableLinkListRequest;
}

export interface GetBastionShareableLinkQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface GetBastionShareableLinkQueryParam {
  queryParameters: GetBastionShareableLinkQueryParamProperties;
}

export interface GetBastionShareableLinkMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GetBastionShareableLinkParameters = GetBastionShareableLinkQueryParam &
  GetBastionShareableLinkMediaTypesParam &
  GetBastionShareableLinkBodyParam &
  RequestParameters;

export interface GetActiveSessionsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface GetActiveSessionsQueryParam {
  queryParameters: GetActiveSessionsQueryParamProperties;
}

export type GetActiveSessionsParameters = GetActiveSessionsQueryParam & RequestParameters;

export interface DisconnectActiveSessionsBodyParam {
  /** The list of sessionids to disconnect. */
  body: SessionIds;
}

export interface DisconnectActiveSessionsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DisconnectActiveSessionsQueryParam {
  queryParameters: DisconnectActiveSessionsQueryParamProperties;
}

export interface DisconnectActiveSessionsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DisconnectActiveSessionsParameters = DisconnectActiveSessionsQueryParam &
  DisconnectActiveSessionsMediaTypesParam &
  DisconnectActiveSessionsBodyParam &
  RequestParameters;

export interface CheckDnsNameAvailabilityQueryParamProperties {
  /** The domain name to be verified. It must conform to the following regular expression: ^[a-z][a-z0-9-]{1,61}[a-z0-9]$. */
  domainNameLabel: string;
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface CheckDnsNameAvailabilityQueryParam {
  queryParameters: CheckDnsNameAvailabilityQueryParamProperties;
}

export type CheckDnsNameAvailabilityParameters = CheckDnsNameAvailabilityQueryParam &
  RequestParameters;

export interface ListActiveConnectivityConfigurationsBodyParam {
  /** Active Configuration Parameter. */
  body: ActiveConfigurationParameter;
}

export interface ListActiveConnectivityConfigurationsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
}

export interface ListActiveConnectivityConfigurationsQueryParam {
  queryParameters: ListActiveConnectivityConfigurationsQueryParamProperties;
}

export interface ListActiveConnectivityConfigurationsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ListActiveConnectivityConfigurationsParameters =
  ListActiveConnectivityConfigurationsQueryParam &
    ListActiveConnectivityConfigurationsMediaTypesParam &
    ListActiveConnectivityConfigurationsBodyParam &
    RequestParameters;

export interface ListActiveSecurityAdminRulesBodyParam {
  /** Active Configuration Parameter. */
  body: ActiveConfigurationParameter;
}

export interface ListActiveSecurityAdminRulesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
}

export interface ListActiveSecurityAdminRulesQueryParam {
  queryParameters: ListActiveSecurityAdminRulesQueryParamProperties;
}

export interface ListActiveSecurityAdminRulesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ListActiveSecurityAdminRulesParameters = ListActiveSecurityAdminRulesQueryParam &
  ListActiveSecurityAdminRulesMediaTypesParam &
  ListActiveSecurityAdminRulesBodyParam &
  RequestParameters;

export interface ListNetworkManagerEffectiveConnectivityConfigurationsBodyParam {
  /** Parameters supplied to list correct page. */
  body: QueryRequestOptions;
}

export interface ListNetworkManagerEffectiveConnectivityConfigurationsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
}

export interface ListNetworkManagerEffectiveConnectivityConfigurationsQueryParam {
  queryParameters: ListNetworkManagerEffectiveConnectivityConfigurationsQueryParamProperties;
}

export interface ListNetworkManagerEffectiveConnectivityConfigurationsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ListNetworkManagerEffectiveConnectivityConfigurationsParameters =
  ListNetworkManagerEffectiveConnectivityConfigurationsQueryParam &
    ListNetworkManagerEffectiveConnectivityConfigurationsMediaTypesParam &
    ListNetworkManagerEffectiveConnectivityConfigurationsBodyParam &
    RequestParameters;

export interface ListNetworkManagerEffectiveSecurityAdminRulesBodyParam {
  /** Parameters supplied to list correct page. */
  body: QueryRequestOptions;
}

export interface ListNetworkManagerEffectiveSecurityAdminRulesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
}

export interface ListNetworkManagerEffectiveSecurityAdminRulesQueryParam {
  queryParameters: ListNetworkManagerEffectiveSecurityAdminRulesQueryParamProperties;
}

export interface ListNetworkManagerEffectiveSecurityAdminRulesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ListNetworkManagerEffectiveSecurityAdminRulesParameters =
  ListNetworkManagerEffectiveSecurityAdminRulesQueryParam &
    ListNetworkManagerEffectiveSecurityAdminRulesMediaTypesParam &
    ListNetworkManagerEffectiveSecurityAdminRulesBodyParam &
    RequestParameters;

export interface SupportedSecurityProvidersQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SupportedSecurityProvidersQueryParam {
  queryParameters: SupportedSecurityProvidersQueryParamProperties;
}

export type SupportedSecurityProvidersParameters = SupportedSecurityProvidersQueryParam &
  RequestParameters;

export interface GeneratevirtualwanvpnserverconfigurationvpnprofileBodyParam {
  /** Parameters supplied to the generate VirtualWan VPN profile generation operation. */
  body: VirtualWanVpnProfileParameters;
}

export interface GeneratevirtualwanvpnserverconfigurationvpnprofileQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface GeneratevirtualwanvpnserverconfigurationvpnprofileQueryParam {
  queryParameters: GeneratevirtualwanvpnserverconfigurationvpnprofileQueryParamProperties;
}

export interface GeneratevirtualwanvpnserverconfigurationvpnprofileMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type GeneratevirtualwanvpnserverconfigurationvpnprofileParameters =
  GeneratevirtualwanvpnserverconfigurationvpnprofileQueryParam &
    GeneratevirtualwanvpnserverconfigurationvpnprofileMediaTypesParam &
    GeneratevirtualwanvpnserverconfigurationvpnprofileBodyParam &
    RequestParameters;

export interface NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesQueryParam {
  queryParameters: NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesQueryParamProperties;
}

export type NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesParameters =
  NetworkInterfacesListCloudServiceRoleInstanceNetworkInterfacesQueryParam & RequestParameters;

export interface NetworkInterfacesListCloudServiceNetworkInterfacesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfacesListCloudServiceNetworkInterfacesQueryParam {
  queryParameters: NetworkInterfacesListCloudServiceNetworkInterfacesQueryParamProperties;
}

export type NetworkInterfacesListCloudServiceNetworkInterfacesParameters =
  NetworkInterfacesListCloudServiceNetworkInterfacesQueryParam & RequestParameters;

export interface NetworkInterfacesGetCloudServiceNetworkInterfaceQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface NetworkInterfacesGetCloudServiceNetworkInterfaceQueryParam {
  queryParameters: NetworkInterfacesGetCloudServiceNetworkInterfaceQueryParamProperties;
}

export type NetworkInterfacesGetCloudServiceNetworkInterfaceParameters =
  NetworkInterfacesGetCloudServiceNetworkInterfaceQueryParam & RequestParameters;

export interface NetworkInterfacesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfacesDeleteQueryParam {
  queryParameters: NetworkInterfacesDeleteQueryParamProperties;
}

export type NetworkInterfacesDeleteParameters = NetworkInterfacesDeleteQueryParam &
  RequestParameters;

export interface NetworkInterfacesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface NetworkInterfacesGetQueryParam {
  queryParameters: NetworkInterfacesGetQueryParamProperties;
}

export type NetworkInterfacesGetParameters = NetworkInterfacesGetQueryParam & RequestParameters;

export interface NetworkInterfacesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update network interface operation. */
  body: NetworkInterface;
}

export interface NetworkInterfacesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfacesCreateOrUpdateQueryParam {
  queryParameters: NetworkInterfacesCreateOrUpdateQueryParamProperties;
}

export interface NetworkInterfacesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkInterfacesCreateOrUpdateParameters = NetworkInterfacesCreateOrUpdateQueryParam &
  NetworkInterfacesCreateOrUpdateMediaTypesParam &
  NetworkInterfacesCreateOrUpdateBodyParam &
  RequestParameters;

export interface NetworkInterfacesUpdateTagsBodyParam {
  /** Parameters supplied to update network interface tags. */
  body: TagsObject;
}

export interface NetworkInterfacesUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfacesUpdateTagsQueryParam {
  queryParameters: NetworkInterfacesUpdateTagsQueryParamProperties;
}

export interface NetworkInterfacesUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkInterfacesUpdateTagsParameters = NetworkInterfacesUpdateTagsQueryParam &
  NetworkInterfacesUpdateTagsMediaTypesParam &
  NetworkInterfacesUpdateTagsBodyParam &
  RequestParameters;

export interface NetworkInterfacesListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfacesListAllQueryParam {
  queryParameters: NetworkInterfacesListAllQueryParamProperties;
}

export type NetworkInterfacesListAllParameters = NetworkInterfacesListAllQueryParam &
  RequestParameters;

export interface NetworkInterfacesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfacesListQueryParam {
  queryParameters: NetworkInterfacesListQueryParamProperties;
}

export type NetworkInterfacesListParameters = NetworkInterfacesListQueryParam & RequestParameters;

export interface NetworkInterfacesGetEffectiveRouteTableQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfacesGetEffectiveRouteTableQueryParam {
  queryParameters: NetworkInterfacesGetEffectiveRouteTableQueryParamProperties;
}

export type NetworkInterfacesGetEffectiveRouteTableParameters =
  NetworkInterfacesGetEffectiveRouteTableQueryParam & RequestParameters;

export interface NetworkInterfacesListEffectiveNetworkSecurityGroupsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfacesListEffectiveNetworkSecurityGroupsQueryParam {
  queryParameters: NetworkInterfacesListEffectiveNetworkSecurityGroupsQueryParamProperties;
}

export type NetworkInterfacesListEffectiveNetworkSecurityGroupsParameters =
  NetworkInterfacesListEffectiveNetworkSecurityGroupsQueryParam & RequestParameters;

export interface NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesQueryParamProperties {
  /** Api Version */
  "api-version": "2018-10-01";
}

export interface NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesQueryParam {
  queryParameters: NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesQueryParamProperties;
}

export type NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesParameters =
  NetworkInterfacesListVirtualMachineScaleSetVMNetworkInterfacesQueryParam & RequestParameters;

export interface NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesQueryParamProperties {
  /** Api Version */
  "api-version": "2018-10-01";
}

export interface NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesQueryParam {
  queryParameters: NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesQueryParamProperties;
}

export type NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesParameters =
  NetworkInterfacesListVirtualMachineScaleSetNetworkInterfacesQueryParam & RequestParameters;

export interface NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceQueryParamProperties {
  /** Api Version */
  "api-version": "2018-10-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceQueryParam {
  queryParameters: NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceQueryParamProperties;
}

export type NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceParameters =
  NetworkInterfacesGetVirtualMachineScaleSetNetworkInterfaceQueryParam & RequestParameters;

export interface NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsQueryParamProperties {
  /** Api Version */
  "api-version": "2018-10-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsQueryParam {
  queryParameters: NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsQueryParamProperties;
}

export type NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsParameters =
  NetworkInterfacesListVirtualMachineScaleSetIpConfigurationsQueryParam & RequestParameters;

export interface NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationQueryParamProperties {
  /** Api Version */
  "api-version": "2018-10-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationQueryParam {
  queryParameters: NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationQueryParamProperties;
}

export type NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationParameters =
  NetworkInterfacesGetVirtualMachineScaleSetIpConfigurationQueryParam & RequestParameters;

export interface PublicIPAddressesListCloudServicePublicIPAddressesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPAddressesListCloudServicePublicIPAddressesQueryParam {
  queryParameters: PublicIPAddressesListCloudServicePublicIPAddressesQueryParamProperties;
}

export type PublicIPAddressesListCloudServicePublicIPAddressesParameters =
  PublicIPAddressesListCloudServicePublicIPAddressesQueryParam & RequestParameters;

export interface PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesQueryParam {
  queryParameters: PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesQueryParamProperties;
}

export type PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesParameters =
  PublicIPAddressesListCloudServiceRoleInstancePublicIPAddressesQueryParam & RequestParameters;

export interface PublicIPAddressesGetCloudServicePublicIPAddressQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface PublicIPAddressesGetCloudServicePublicIPAddressQueryParam {
  queryParameters: PublicIPAddressesGetCloudServicePublicIPAddressQueryParamProperties;
}

export type PublicIPAddressesGetCloudServicePublicIPAddressParameters =
  PublicIPAddressesGetCloudServicePublicIPAddressQueryParam & RequestParameters;

export interface PublicIPAddressesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPAddressesDeleteQueryParam {
  queryParameters: PublicIPAddressesDeleteQueryParamProperties;
}

export type PublicIPAddressesDeleteParameters = PublicIPAddressesDeleteQueryParam &
  RequestParameters;

export interface PublicIPAddressesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface PublicIPAddressesGetQueryParam {
  queryParameters: PublicIPAddressesGetQueryParamProperties;
}

export type PublicIPAddressesGetParameters = PublicIPAddressesGetQueryParam & RequestParameters;

export interface PublicIPAddressesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update public IP address operation. */
  body: PublicIPAddress;
}

export interface PublicIPAddressesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPAddressesCreateOrUpdateQueryParam {
  queryParameters: PublicIPAddressesCreateOrUpdateQueryParamProperties;
}

export interface PublicIPAddressesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PublicIPAddressesCreateOrUpdateParameters = PublicIPAddressesCreateOrUpdateQueryParam &
  PublicIPAddressesCreateOrUpdateMediaTypesParam &
  PublicIPAddressesCreateOrUpdateBodyParam &
  RequestParameters;

export interface PublicIPAddressesUpdateTagsBodyParam {
  /** Parameters supplied to update public IP address tags. */
  body: TagsObject;
}

export interface PublicIPAddressesUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPAddressesUpdateTagsQueryParam {
  queryParameters: PublicIPAddressesUpdateTagsQueryParamProperties;
}

export interface PublicIPAddressesUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PublicIPAddressesUpdateTagsParameters = PublicIPAddressesUpdateTagsQueryParam &
  PublicIPAddressesUpdateTagsMediaTypesParam &
  PublicIPAddressesUpdateTagsBodyParam &
  RequestParameters;

export interface PublicIPAddressesListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPAddressesListAllQueryParam {
  queryParameters: PublicIPAddressesListAllQueryParamProperties;
}

export type PublicIPAddressesListAllParameters = PublicIPAddressesListAllQueryParam &
  RequestParameters;

export interface PublicIPAddressesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPAddressesListQueryParam {
  queryParameters: PublicIPAddressesListQueryParamProperties;
}

export type PublicIPAddressesListParameters = PublicIPAddressesListQueryParam & RequestParameters;

export interface PublicIPAddressesDdosProtectionStatusQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPAddressesDdosProtectionStatusQueryParam {
  queryParameters: PublicIPAddressesDdosProtectionStatusQueryParamProperties;
}

export type PublicIPAddressesDdosProtectionStatusParameters =
  PublicIPAddressesDdosProtectionStatusQueryParam & RequestParameters;

export interface PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesQueryParamProperties {
  /** Api Version */
  "api-version": "2018-10-01";
}

export interface PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesQueryParam {
  queryParameters: PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesQueryParamProperties;
}

export type PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesParameters =
  PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesQueryParam & RequestParameters;

export interface PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesQueryParamProperties {
  /** Api Version */
  "api-version": "2018-10-01";
}

export interface PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesQueryParam {
  queryParameters: PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesQueryParamProperties;
}

export type PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesParameters =
  PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesQueryParam & RequestParameters;

export interface PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressQueryParamProperties {
  /** Api Version */
  "api-version": "2018-10-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressQueryParam {
  queryParameters: PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressQueryParamProperties;
}

export type PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressParameters =
  PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressQueryParam & RequestParameters;

export interface CustomIPPrefixesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface CustomIPPrefixesDeleteQueryParam {
  queryParameters: CustomIPPrefixesDeleteQueryParamProperties;
}

export type CustomIPPrefixesDeleteParameters = CustomIPPrefixesDeleteQueryParam & RequestParameters;

export interface CustomIPPrefixesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface CustomIPPrefixesGetQueryParam {
  queryParameters: CustomIPPrefixesGetQueryParamProperties;
}

export type CustomIPPrefixesGetParameters = CustomIPPrefixesGetQueryParam & RequestParameters;

export interface CustomIPPrefixesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update custom IP prefix operation. */
  body: CustomIpPrefix;
}

export interface CustomIPPrefixesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface CustomIPPrefixesCreateOrUpdateQueryParam {
  queryParameters: CustomIPPrefixesCreateOrUpdateQueryParamProperties;
}

export interface CustomIPPrefixesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CustomIPPrefixesCreateOrUpdateParameters = CustomIPPrefixesCreateOrUpdateQueryParam &
  CustomIPPrefixesCreateOrUpdateMediaTypesParam &
  CustomIPPrefixesCreateOrUpdateBodyParam &
  RequestParameters;

export interface CustomIPPrefixesUpdateTagsBodyParam {
  /** Parameters supplied to update custom IP prefix tags. */
  body: TagsObject;
}

export interface CustomIPPrefixesUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface CustomIPPrefixesUpdateTagsQueryParam {
  queryParameters: CustomIPPrefixesUpdateTagsQueryParamProperties;
}

export interface CustomIPPrefixesUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CustomIPPrefixesUpdateTagsParameters = CustomIPPrefixesUpdateTagsQueryParam &
  CustomIPPrefixesUpdateTagsMediaTypesParam &
  CustomIPPrefixesUpdateTagsBodyParam &
  RequestParameters;

export interface CustomIPPrefixesListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface CustomIPPrefixesListAllQueryParam {
  queryParameters: CustomIPPrefixesListAllQueryParamProperties;
}

export type CustomIPPrefixesListAllParameters = CustomIPPrefixesListAllQueryParam &
  RequestParameters;

export interface CustomIPPrefixesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface CustomIPPrefixesListQueryParam {
  queryParameters: CustomIPPrefixesListQueryParamProperties;
}

export type CustomIPPrefixesListParameters = CustomIPPrefixesListQueryParam & RequestParameters;

export interface DdosCustomPoliciesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DdosCustomPoliciesDeleteQueryParam {
  queryParameters: DdosCustomPoliciesDeleteQueryParamProperties;
}

export type DdosCustomPoliciesDeleteParameters = DdosCustomPoliciesDeleteQueryParam &
  RequestParameters;

export interface DdosCustomPoliciesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DdosCustomPoliciesGetQueryParam {
  queryParameters: DdosCustomPoliciesGetQueryParamProperties;
}

export type DdosCustomPoliciesGetParameters = DdosCustomPoliciesGetQueryParam & RequestParameters;

export interface DdosCustomPoliciesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update operation. */
  body: DdosCustomPolicy;
}

export interface DdosCustomPoliciesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DdosCustomPoliciesCreateOrUpdateQueryParam {
  queryParameters: DdosCustomPoliciesCreateOrUpdateQueryParamProperties;
}

export interface DdosCustomPoliciesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DdosCustomPoliciesCreateOrUpdateParameters =
  DdosCustomPoliciesCreateOrUpdateQueryParam &
    DdosCustomPoliciesCreateOrUpdateMediaTypesParam &
    DdosCustomPoliciesCreateOrUpdateBodyParam &
    RequestParameters;

export interface DdosCustomPoliciesUpdateTagsBodyParam {
  /** Parameters supplied to update DDoS custom policy resource tags. */
  body: TagsObject;
}

export interface DdosCustomPoliciesUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DdosCustomPoliciesUpdateTagsQueryParam {
  queryParameters: DdosCustomPoliciesUpdateTagsQueryParamProperties;
}

export interface DdosCustomPoliciesUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DdosCustomPoliciesUpdateTagsParameters = DdosCustomPoliciesUpdateTagsQueryParam &
  DdosCustomPoliciesUpdateTagsMediaTypesParam &
  DdosCustomPoliciesUpdateTagsBodyParam &
  RequestParameters;

export interface DdosProtectionPlansDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DdosProtectionPlansDeleteQueryParam {
  queryParameters: DdosProtectionPlansDeleteQueryParamProperties;
}

export type DdosProtectionPlansDeleteParameters = DdosProtectionPlansDeleteQueryParam &
  RequestParameters;

export interface DdosProtectionPlansGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DdosProtectionPlansGetQueryParam {
  queryParameters: DdosProtectionPlansGetQueryParamProperties;
}

export type DdosProtectionPlansGetParameters = DdosProtectionPlansGetQueryParam & RequestParameters;

export interface DdosProtectionPlansCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update operation. */
  body: DdosProtectionPlan;
}

export interface DdosProtectionPlansCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DdosProtectionPlansCreateOrUpdateQueryParam {
  queryParameters: DdosProtectionPlansCreateOrUpdateQueryParamProperties;
}

export interface DdosProtectionPlansCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DdosProtectionPlansCreateOrUpdateParameters =
  DdosProtectionPlansCreateOrUpdateQueryParam &
    DdosProtectionPlansCreateOrUpdateMediaTypesParam &
    DdosProtectionPlansCreateOrUpdateBodyParam &
    RequestParameters;

export interface DdosProtectionPlansUpdateTagsBodyParam {
  /** Parameters supplied to the update DDoS protection plan resource tags. */
  body: TagsObject;
}

export interface DdosProtectionPlansUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DdosProtectionPlansUpdateTagsQueryParam {
  queryParameters: DdosProtectionPlansUpdateTagsQueryParamProperties;
}

export interface DdosProtectionPlansUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DdosProtectionPlansUpdateTagsParameters = DdosProtectionPlansUpdateTagsQueryParam &
  DdosProtectionPlansUpdateTagsMediaTypesParam &
  DdosProtectionPlansUpdateTagsBodyParam &
  RequestParameters;

export interface DdosProtectionPlansListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DdosProtectionPlansListQueryParam {
  queryParameters: DdosProtectionPlansListQueryParamProperties;
}

export type DdosProtectionPlansListParameters = DdosProtectionPlansListQueryParam &
  RequestParameters;

export interface DdosProtectionPlansListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DdosProtectionPlansListByResourceGroupQueryParam {
  queryParameters: DdosProtectionPlansListByResourceGroupQueryParamProperties;
}

export type DdosProtectionPlansListByResourceGroupParameters =
  DdosProtectionPlansListByResourceGroupQueryParam & RequestParameters;

export interface DscpConfigurationCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update dscp configuration operation. */
  body: DscpConfiguration;
}

export interface DscpConfigurationCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DscpConfigurationCreateOrUpdateQueryParam {
  queryParameters: DscpConfigurationCreateOrUpdateQueryParamProperties;
}

export interface DscpConfigurationCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DscpConfigurationCreateOrUpdateParameters = DscpConfigurationCreateOrUpdateQueryParam &
  DscpConfigurationCreateOrUpdateMediaTypesParam &
  DscpConfigurationCreateOrUpdateBodyParam &
  RequestParameters;

export interface DscpConfigurationDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DscpConfigurationDeleteQueryParam {
  queryParameters: DscpConfigurationDeleteQueryParamProperties;
}

export type DscpConfigurationDeleteParameters = DscpConfigurationDeleteQueryParam &
  RequestParameters;

export interface DscpConfigurationGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DscpConfigurationGetQueryParam {
  queryParameters: DscpConfigurationGetQueryParamProperties;
}

export type DscpConfigurationGetParameters = DscpConfigurationGetQueryParam & RequestParameters;

export interface DscpConfigurationListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DscpConfigurationListQueryParam {
  queryParameters: DscpConfigurationListQueryParamProperties;
}

export type DscpConfigurationListParameters = DscpConfigurationListQueryParam & RequestParameters;

export interface DscpConfigurationListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DscpConfigurationListAllQueryParam {
  queryParameters: DscpConfigurationListAllQueryParamProperties;
}

export type DscpConfigurationListAllParameters = DscpConfigurationListAllQueryParam &
  RequestParameters;

export interface AvailableEndpointServicesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AvailableEndpointServicesListQueryParam {
  queryParameters: AvailableEndpointServicesListQueryParamProperties;
}

export type AvailableEndpointServicesListParameters = AvailableEndpointServicesListQueryParam &
  RequestParameters;

export interface ExpressRouteCircuitAuthorizationsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitAuthorizationsDeleteQueryParam {
  queryParameters: ExpressRouteCircuitAuthorizationsDeleteQueryParamProperties;
}

export type ExpressRouteCircuitAuthorizationsDeleteParameters =
  ExpressRouteCircuitAuthorizationsDeleteQueryParam & RequestParameters;

export interface ExpressRouteCircuitAuthorizationsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitAuthorizationsGetQueryParam {
  queryParameters: ExpressRouteCircuitAuthorizationsGetQueryParamProperties;
}

export type ExpressRouteCircuitAuthorizationsGetParameters =
  ExpressRouteCircuitAuthorizationsGetQueryParam & RequestParameters;

export interface ExpressRouteCircuitAuthorizationsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update express route circuit authorization operation. */
  body: ExpressRouteCircuitAuthorization;
}

export interface ExpressRouteCircuitAuthorizationsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitAuthorizationsCreateOrUpdateQueryParam {
  queryParameters: ExpressRouteCircuitAuthorizationsCreateOrUpdateQueryParamProperties;
}

export interface ExpressRouteCircuitAuthorizationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRouteCircuitAuthorizationsCreateOrUpdateParameters =
  ExpressRouteCircuitAuthorizationsCreateOrUpdateQueryParam &
    ExpressRouteCircuitAuthorizationsCreateOrUpdateMediaTypesParam &
    ExpressRouteCircuitAuthorizationsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ExpressRouteCircuitAuthorizationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitAuthorizationsListQueryParam {
  queryParameters: ExpressRouteCircuitAuthorizationsListQueryParamProperties;
}

export type ExpressRouteCircuitAuthorizationsListParameters =
  ExpressRouteCircuitAuthorizationsListQueryParam & RequestParameters;

export interface ExpressRouteCircuitPeeringsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitPeeringsDeleteQueryParam {
  queryParameters: ExpressRouteCircuitPeeringsDeleteQueryParamProperties;
}

export type ExpressRouteCircuitPeeringsDeleteParameters =
  ExpressRouteCircuitPeeringsDeleteQueryParam & RequestParameters;

export interface ExpressRouteCircuitPeeringsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitPeeringsGetQueryParam {
  queryParameters: ExpressRouteCircuitPeeringsGetQueryParamProperties;
}

export type ExpressRouteCircuitPeeringsGetParameters = ExpressRouteCircuitPeeringsGetQueryParam &
  RequestParameters;

export interface ExpressRouteCircuitPeeringsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update express route circuit peering operation. */
  body: ExpressRouteCircuitPeering;
}

export interface ExpressRouteCircuitPeeringsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitPeeringsCreateOrUpdateQueryParam {
  queryParameters: ExpressRouteCircuitPeeringsCreateOrUpdateQueryParamProperties;
}

export interface ExpressRouteCircuitPeeringsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRouteCircuitPeeringsCreateOrUpdateParameters =
  ExpressRouteCircuitPeeringsCreateOrUpdateQueryParam &
    ExpressRouteCircuitPeeringsCreateOrUpdateMediaTypesParam &
    ExpressRouteCircuitPeeringsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ExpressRouteCircuitPeeringsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitPeeringsListQueryParam {
  queryParameters: ExpressRouteCircuitPeeringsListQueryParamProperties;
}

export type ExpressRouteCircuitPeeringsListParameters = ExpressRouteCircuitPeeringsListQueryParam &
  RequestParameters;

export interface ExpressRouteCircuitConnectionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitConnectionsDeleteQueryParam {
  queryParameters: ExpressRouteCircuitConnectionsDeleteQueryParamProperties;
}

export type ExpressRouteCircuitConnectionsDeleteParameters =
  ExpressRouteCircuitConnectionsDeleteQueryParam & RequestParameters;

export interface ExpressRouteCircuitConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitConnectionsGetQueryParam {
  queryParameters: ExpressRouteCircuitConnectionsGetQueryParamProperties;
}

export type ExpressRouteCircuitConnectionsGetParameters =
  ExpressRouteCircuitConnectionsGetQueryParam & RequestParameters;

export interface ExpressRouteCircuitConnectionsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update express route circuit connection operation. */
  body: ExpressRouteCircuitConnection;
}

export interface ExpressRouteCircuitConnectionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitConnectionsCreateOrUpdateQueryParam {
  queryParameters: ExpressRouteCircuitConnectionsCreateOrUpdateQueryParamProperties;
}

export interface ExpressRouteCircuitConnectionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRouteCircuitConnectionsCreateOrUpdateParameters =
  ExpressRouteCircuitConnectionsCreateOrUpdateQueryParam &
    ExpressRouteCircuitConnectionsCreateOrUpdateMediaTypesParam &
    ExpressRouteCircuitConnectionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ExpressRouteCircuitConnectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitConnectionsListQueryParam {
  queryParameters: ExpressRouteCircuitConnectionsListQueryParamProperties;
}

export type ExpressRouteCircuitConnectionsListParameters =
  ExpressRouteCircuitConnectionsListQueryParam & RequestParameters;

export interface PeerExpressRouteCircuitConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PeerExpressRouteCircuitConnectionsGetQueryParam {
  queryParameters: PeerExpressRouteCircuitConnectionsGetQueryParamProperties;
}

export type PeerExpressRouteCircuitConnectionsGetParameters =
  PeerExpressRouteCircuitConnectionsGetQueryParam & RequestParameters;

export interface PeerExpressRouteCircuitConnectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PeerExpressRouteCircuitConnectionsListQueryParam {
  queryParameters: PeerExpressRouteCircuitConnectionsListQueryParamProperties;
}

export type PeerExpressRouteCircuitConnectionsListParameters =
  PeerExpressRouteCircuitConnectionsListQueryParam & RequestParameters;

export interface ExpressRouteCircuitsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitsDeleteQueryParam {
  queryParameters: ExpressRouteCircuitsDeleteQueryParamProperties;
}

export type ExpressRouteCircuitsDeleteParameters = ExpressRouteCircuitsDeleteQueryParam &
  RequestParameters;

export interface ExpressRouteCircuitsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitsGetQueryParam {
  queryParameters: ExpressRouteCircuitsGetQueryParamProperties;
}

export type ExpressRouteCircuitsGetParameters = ExpressRouteCircuitsGetQueryParam &
  RequestParameters;

export interface ExpressRouteCircuitsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update express route circuit operation. */
  body: ExpressRouteCircuit;
}

export interface ExpressRouteCircuitsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitsCreateOrUpdateQueryParam {
  queryParameters: ExpressRouteCircuitsCreateOrUpdateQueryParamProperties;
}

export interface ExpressRouteCircuitsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRouteCircuitsCreateOrUpdateParameters =
  ExpressRouteCircuitsCreateOrUpdateQueryParam &
    ExpressRouteCircuitsCreateOrUpdateMediaTypesParam &
    ExpressRouteCircuitsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ExpressRouteCircuitsUpdateTagsBodyParam {
  /** Parameters supplied to update express route circuit tags. */
  body: TagsObject;
}

export interface ExpressRouteCircuitsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitsUpdateTagsQueryParam {
  queryParameters: ExpressRouteCircuitsUpdateTagsQueryParamProperties;
}

export interface ExpressRouteCircuitsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRouteCircuitsUpdateTagsParameters = ExpressRouteCircuitsUpdateTagsQueryParam &
  ExpressRouteCircuitsUpdateTagsMediaTypesParam &
  ExpressRouteCircuitsUpdateTagsBodyParam &
  RequestParameters;

export interface ExpressRouteCircuitsListArpTableQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitsListArpTableQueryParam {
  queryParameters: ExpressRouteCircuitsListArpTableQueryParamProperties;
}

export type ExpressRouteCircuitsListArpTableParameters =
  ExpressRouteCircuitsListArpTableQueryParam & RequestParameters;

export interface ExpressRouteCircuitsListRoutesTableQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitsListRoutesTableQueryParam {
  queryParameters: ExpressRouteCircuitsListRoutesTableQueryParamProperties;
}

export type ExpressRouteCircuitsListRoutesTableParameters =
  ExpressRouteCircuitsListRoutesTableQueryParam & RequestParameters;

export interface ExpressRouteCircuitsListRoutesTableSummaryQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitsListRoutesTableSummaryQueryParam {
  queryParameters: ExpressRouteCircuitsListRoutesTableSummaryQueryParamProperties;
}

export type ExpressRouteCircuitsListRoutesTableSummaryParameters =
  ExpressRouteCircuitsListRoutesTableSummaryQueryParam & RequestParameters;

export interface ExpressRouteCircuitsGetStatsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitsGetStatsQueryParam {
  queryParameters: ExpressRouteCircuitsGetStatsQueryParamProperties;
}

export type ExpressRouteCircuitsGetStatsParameters = ExpressRouteCircuitsGetStatsQueryParam &
  RequestParameters;

export interface ExpressRouteCircuitsGetPeeringStatsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitsGetPeeringStatsQueryParam {
  queryParameters: ExpressRouteCircuitsGetPeeringStatsQueryParamProperties;
}

export type ExpressRouteCircuitsGetPeeringStatsParameters =
  ExpressRouteCircuitsGetPeeringStatsQueryParam & RequestParameters;

export interface ExpressRouteCircuitsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitsListQueryParam {
  queryParameters: ExpressRouteCircuitsListQueryParamProperties;
}

export type ExpressRouteCircuitsListParameters = ExpressRouteCircuitsListQueryParam &
  RequestParameters;

export interface ExpressRouteCircuitsListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCircuitsListAllQueryParam {
  queryParameters: ExpressRouteCircuitsListAllQueryParamProperties;
}

export type ExpressRouteCircuitsListAllParameters = ExpressRouteCircuitsListAllQueryParam &
  RequestParameters;

export interface ExpressRouteServiceProvidersListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteServiceProvidersListQueryParam {
  queryParameters: ExpressRouteServiceProvidersListQueryParamProperties;
}

export type ExpressRouteServiceProvidersListParameters =
  ExpressRouteServiceProvidersListQueryParam & RequestParameters;

export interface ExpressRouteCrossConnectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionsListQueryParam {
  queryParameters: ExpressRouteCrossConnectionsListQueryParamProperties;
}

export type ExpressRouteCrossConnectionsListParameters =
  ExpressRouteCrossConnectionsListQueryParam & RequestParameters;

export interface ExpressRouteCrossConnectionsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionsListByResourceGroupQueryParam {
  queryParameters: ExpressRouteCrossConnectionsListByResourceGroupQueryParamProperties;
}

export type ExpressRouteCrossConnectionsListByResourceGroupParameters =
  ExpressRouteCrossConnectionsListByResourceGroupQueryParam & RequestParameters;

export interface ExpressRouteCrossConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionsGetQueryParam {
  queryParameters: ExpressRouteCrossConnectionsGetQueryParamProperties;
}

export type ExpressRouteCrossConnectionsGetParameters = ExpressRouteCrossConnectionsGetQueryParam &
  RequestParameters;

export interface ExpressRouteCrossConnectionsCreateOrUpdateBodyParam {
  /** Parameters supplied to the update express route crossConnection operation. */
  body: ExpressRouteCrossConnection;
}

export interface ExpressRouteCrossConnectionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionsCreateOrUpdateQueryParam {
  queryParameters: ExpressRouteCrossConnectionsCreateOrUpdateQueryParamProperties;
}

export interface ExpressRouteCrossConnectionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRouteCrossConnectionsCreateOrUpdateParameters =
  ExpressRouteCrossConnectionsCreateOrUpdateQueryParam &
    ExpressRouteCrossConnectionsCreateOrUpdateMediaTypesParam &
    ExpressRouteCrossConnectionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ExpressRouteCrossConnectionsUpdateTagsBodyParam {
  /** Parameters supplied to update express route cross connection tags. */
  body: TagsObject;
}

export interface ExpressRouteCrossConnectionsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionsUpdateTagsQueryParam {
  queryParameters: ExpressRouteCrossConnectionsUpdateTagsQueryParamProperties;
}

export interface ExpressRouteCrossConnectionsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRouteCrossConnectionsUpdateTagsParameters =
  ExpressRouteCrossConnectionsUpdateTagsQueryParam &
    ExpressRouteCrossConnectionsUpdateTagsMediaTypesParam &
    ExpressRouteCrossConnectionsUpdateTagsBodyParam &
    RequestParameters;

export interface ExpressRouteCrossConnectionsListArpTableQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionsListArpTableQueryParam {
  queryParameters: ExpressRouteCrossConnectionsListArpTableQueryParamProperties;
}

export type ExpressRouteCrossConnectionsListArpTableParameters =
  ExpressRouteCrossConnectionsListArpTableQueryParam & RequestParameters;

export interface ExpressRouteCrossConnectionsListRoutesTableSummaryQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionsListRoutesTableSummaryQueryParam {
  queryParameters: ExpressRouteCrossConnectionsListRoutesTableSummaryQueryParamProperties;
}

export type ExpressRouteCrossConnectionsListRoutesTableSummaryParameters =
  ExpressRouteCrossConnectionsListRoutesTableSummaryQueryParam & RequestParameters;

export interface ExpressRouteCrossConnectionsListRoutesTableQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionsListRoutesTableQueryParam {
  queryParameters: ExpressRouteCrossConnectionsListRoutesTableQueryParamProperties;
}

export type ExpressRouteCrossConnectionsListRoutesTableParameters =
  ExpressRouteCrossConnectionsListRoutesTableQueryParam & RequestParameters;

export interface ExpressRouteCrossConnectionPeeringsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionPeeringsListQueryParam {
  queryParameters: ExpressRouteCrossConnectionPeeringsListQueryParamProperties;
}

export type ExpressRouteCrossConnectionPeeringsListParameters =
  ExpressRouteCrossConnectionPeeringsListQueryParam & RequestParameters;

export interface ExpressRouteCrossConnectionPeeringsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionPeeringsDeleteQueryParam {
  queryParameters: ExpressRouteCrossConnectionPeeringsDeleteQueryParamProperties;
}

export type ExpressRouteCrossConnectionPeeringsDeleteParameters =
  ExpressRouteCrossConnectionPeeringsDeleteQueryParam & RequestParameters;

export interface ExpressRouteCrossConnectionPeeringsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionPeeringsGetQueryParam {
  queryParameters: ExpressRouteCrossConnectionPeeringsGetQueryParamProperties;
}

export type ExpressRouteCrossConnectionPeeringsGetParameters =
  ExpressRouteCrossConnectionPeeringsGetQueryParam & RequestParameters;

export interface ExpressRouteCrossConnectionPeeringsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update ExpressRouteCrossConnection peering operation. */
  body: ExpressRouteCrossConnectionPeering;
}

export interface ExpressRouteCrossConnectionPeeringsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteCrossConnectionPeeringsCreateOrUpdateQueryParam {
  queryParameters: ExpressRouteCrossConnectionPeeringsCreateOrUpdateQueryParamProperties;
}

export interface ExpressRouteCrossConnectionPeeringsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRouteCrossConnectionPeeringsCreateOrUpdateParameters =
  ExpressRouteCrossConnectionPeeringsCreateOrUpdateQueryParam &
    ExpressRouteCrossConnectionPeeringsCreateOrUpdateMediaTypesParam &
    ExpressRouteCrossConnectionPeeringsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ExpressRoutePortsLocationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortsLocationsListQueryParam {
  queryParameters: ExpressRoutePortsLocationsListQueryParamProperties;
}

export type ExpressRoutePortsLocationsListParameters = ExpressRoutePortsLocationsListQueryParam &
  RequestParameters;

export interface ExpressRoutePortsLocationsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortsLocationsGetQueryParam {
  queryParameters: ExpressRoutePortsLocationsGetQueryParamProperties;
}

export type ExpressRoutePortsLocationsGetParameters = ExpressRoutePortsLocationsGetQueryParam &
  RequestParameters;

export interface ExpressRoutePortsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortsDeleteQueryParam {
  queryParameters: ExpressRoutePortsDeleteQueryParamProperties;
}

export type ExpressRoutePortsDeleteParameters = ExpressRoutePortsDeleteQueryParam &
  RequestParameters;

export interface ExpressRoutePortsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortsGetQueryParam {
  queryParameters: ExpressRoutePortsGetQueryParamProperties;
}

export type ExpressRoutePortsGetParameters = ExpressRoutePortsGetQueryParam & RequestParameters;

export interface ExpressRoutePortsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create ExpressRoutePort operation. */
  body: ExpressRoutePort;
}

export interface ExpressRoutePortsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortsCreateOrUpdateQueryParam {
  queryParameters: ExpressRoutePortsCreateOrUpdateQueryParamProperties;
}

export interface ExpressRoutePortsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRoutePortsCreateOrUpdateParameters = ExpressRoutePortsCreateOrUpdateQueryParam &
  ExpressRoutePortsCreateOrUpdateMediaTypesParam &
  ExpressRoutePortsCreateOrUpdateBodyParam &
  RequestParameters;

export interface ExpressRoutePortsUpdateTagsBodyParam {
  /** Parameters supplied to update ExpressRoutePort resource tags. */
  body: TagsObject;
}

export interface ExpressRoutePortsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortsUpdateTagsQueryParam {
  queryParameters: ExpressRoutePortsUpdateTagsQueryParamProperties;
}

export interface ExpressRoutePortsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRoutePortsUpdateTagsParameters = ExpressRoutePortsUpdateTagsQueryParam &
  ExpressRoutePortsUpdateTagsMediaTypesParam &
  ExpressRoutePortsUpdateTagsBodyParam &
  RequestParameters;

export interface ExpressRoutePortsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortsListByResourceGroupQueryParam {
  queryParameters: ExpressRoutePortsListByResourceGroupQueryParamProperties;
}

export type ExpressRoutePortsListByResourceGroupParameters =
  ExpressRoutePortsListByResourceGroupQueryParam & RequestParameters;

export interface ExpressRoutePortsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortsListQueryParam {
  queryParameters: ExpressRoutePortsListQueryParamProperties;
}

export type ExpressRoutePortsListParameters = ExpressRoutePortsListQueryParam & RequestParameters;

export interface ExpressRoutePortsGenerateLOABodyParam {
  /** Request parameters supplied to generate a letter of authorization. */
  body: GenerateExpressRoutePortsLOARequest;
}

export interface ExpressRoutePortsGenerateLOAQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortsGenerateLOAQueryParam {
  queryParameters: ExpressRoutePortsGenerateLOAQueryParamProperties;
}

export interface ExpressRoutePortsGenerateLOAMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRoutePortsGenerateLOAParameters = ExpressRoutePortsGenerateLOAQueryParam &
  ExpressRoutePortsGenerateLOAMediaTypesParam &
  ExpressRoutePortsGenerateLOABodyParam &
  RequestParameters;

export interface ExpressRouteLinksGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteLinksGetQueryParam {
  queryParameters: ExpressRouteLinksGetQueryParamProperties;
}

export type ExpressRouteLinksGetParameters = ExpressRouteLinksGetQueryParam & RequestParameters;

export interface ExpressRouteLinksListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteLinksListQueryParam {
  queryParameters: ExpressRouteLinksListQueryParamProperties;
}

export type ExpressRouteLinksListParameters = ExpressRouteLinksListQueryParam & RequestParameters;

export interface ExpressRoutePortAuthorizationsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortAuthorizationsDeleteQueryParam {
  queryParameters: ExpressRoutePortAuthorizationsDeleteQueryParamProperties;
}

export type ExpressRoutePortAuthorizationsDeleteParameters =
  ExpressRoutePortAuthorizationsDeleteQueryParam & RequestParameters;

export interface ExpressRoutePortAuthorizationsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortAuthorizationsGetQueryParam {
  queryParameters: ExpressRoutePortAuthorizationsGetQueryParamProperties;
}

export type ExpressRoutePortAuthorizationsGetParameters =
  ExpressRoutePortAuthorizationsGetQueryParam & RequestParameters;

export interface ExpressRoutePortAuthorizationsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update express route port authorization operation. */
  body: ExpressRoutePortAuthorization;
}

export interface ExpressRoutePortAuthorizationsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortAuthorizationsCreateOrUpdateQueryParam {
  queryParameters: ExpressRoutePortAuthorizationsCreateOrUpdateQueryParamProperties;
}

export interface ExpressRoutePortAuthorizationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRoutePortAuthorizationsCreateOrUpdateParameters =
  ExpressRoutePortAuthorizationsCreateOrUpdateQueryParam &
    ExpressRoutePortAuthorizationsCreateOrUpdateMediaTypesParam &
    ExpressRoutePortAuthorizationsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ExpressRoutePortAuthorizationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRoutePortAuthorizationsListQueryParam {
  queryParameters: ExpressRoutePortAuthorizationsListQueryParamProperties;
}

export type ExpressRoutePortAuthorizationsListParameters =
  ExpressRoutePortAuthorizationsListQueryParam & RequestParameters;

export interface ExpressRouteProviderPortsLocationListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** The filter to apply on the operation. For example, you can use $filter=location eq '{state}'. */
  $filter?: string;
}

export interface ExpressRouteProviderPortsLocationListQueryParam {
  queryParameters: ExpressRouteProviderPortsLocationListQueryParamProperties;
}

export type ExpressRouteProviderPortsLocationListParameters =
  ExpressRouteProviderPortsLocationListQueryParam & RequestParameters;

export interface ExpressRouteProviderPortsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteProviderPortsGetQueryParam {
  queryParameters: ExpressRouteProviderPortsGetQueryParamProperties;
}

export type ExpressRouteProviderPortsGetParameters = ExpressRouteProviderPortsGetQueryParam &
  RequestParameters;

export interface FirewallPoliciesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPoliciesDeleteQueryParam {
  queryParameters: FirewallPoliciesDeleteQueryParamProperties;
}

export type FirewallPoliciesDeleteParameters = FirewallPoliciesDeleteQueryParam & RequestParameters;

export interface FirewallPoliciesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface FirewallPoliciesGetQueryParam {
  queryParameters: FirewallPoliciesGetQueryParamProperties;
}

export type FirewallPoliciesGetParameters = FirewallPoliciesGetQueryParam & RequestParameters;

export interface FirewallPoliciesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update Firewall Policy operation. */
  body: FirewallPolicy;
}

export interface FirewallPoliciesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPoliciesCreateOrUpdateQueryParam {
  queryParameters: FirewallPoliciesCreateOrUpdateQueryParamProperties;
}

export interface FirewallPoliciesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FirewallPoliciesCreateOrUpdateParameters = FirewallPoliciesCreateOrUpdateQueryParam &
  FirewallPoliciesCreateOrUpdateMediaTypesParam &
  FirewallPoliciesCreateOrUpdateBodyParam &
  RequestParameters;

export interface FirewallPoliciesUpdateTagsBodyParam {
  /** Parameters supplied to update Azure Firewall Policy tags. */
  body: TagsObject;
}

export interface FirewallPoliciesUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPoliciesUpdateTagsQueryParam {
  queryParameters: FirewallPoliciesUpdateTagsQueryParamProperties;
}

export interface FirewallPoliciesUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FirewallPoliciesUpdateTagsParameters = FirewallPoliciesUpdateTagsQueryParam &
  FirewallPoliciesUpdateTagsMediaTypesParam &
  FirewallPoliciesUpdateTagsBodyParam &
  RequestParameters;

export interface FirewallPoliciesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPoliciesListQueryParam {
  queryParameters: FirewallPoliciesListQueryParamProperties;
}

export type FirewallPoliciesListParameters = FirewallPoliciesListQueryParam & RequestParameters;

export interface FirewallPoliciesListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPoliciesListAllQueryParam {
  queryParameters: FirewallPoliciesListAllQueryParamProperties;
}

export type FirewallPoliciesListAllParameters = FirewallPoliciesListAllQueryParam &
  RequestParameters;

export interface FirewallPolicyRuleCollectionGroupsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPolicyRuleCollectionGroupsDeleteQueryParam {
  queryParameters: FirewallPolicyRuleCollectionGroupsDeleteQueryParamProperties;
}

export type FirewallPolicyRuleCollectionGroupsDeleteParameters =
  FirewallPolicyRuleCollectionGroupsDeleteQueryParam & RequestParameters;

export interface FirewallPolicyRuleCollectionGroupsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPolicyRuleCollectionGroupsGetQueryParam {
  queryParameters: FirewallPolicyRuleCollectionGroupsGetQueryParamProperties;
}

export type FirewallPolicyRuleCollectionGroupsGetParameters =
  FirewallPolicyRuleCollectionGroupsGetQueryParam & RequestParameters;

export interface FirewallPolicyRuleCollectionGroupsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update FirewallPolicyRuleCollectionGroup operation. */
  body: FirewallPolicyRuleCollectionGroup;
}

export interface FirewallPolicyRuleCollectionGroupsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPolicyRuleCollectionGroupsCreateOrUpdateQueryParam {
  queryParameters: FirewallPolicyRuleCollectionGroupsCreateOrUpdateQueryParamProperties;
}

export interface FirewallPolicyRuleCollectionGroupsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FirewallPolicyRuleCollectionGroupsCreateOrUpdateParameters =
  FirewallPolicyRuleCollectionGroupsCreateOrUpdateQueryParam &
    FirewallPolicyRuleCollectionGroupsCreateOrUpdateMediaTypesParam &
    FirewallPolicyRuleCollectionGroupsCreateOrUpdateBodyParam &
    RequestParameters;

export interface FirewallPolicyRuleCollectionGroupsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPolicyRuleCollectionGroupsListQueryParam {
  queryParameters: FirewallPolicyRuleCollectionGroupsListQueryParamProperties;
}

export type FirewallPolicyRuleCollectionGroupsListParameters =
  FirewallPolicyRuleCollectionGroupsListQueryParam & RequestParameters;

export interface FirewallPolicyIdpsSignaturesListBodyParam {
  body: IdpsQueryObject;
}

export interface FirewallPolicyIdpsSignaturesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPolicyIdpsSignaturesListQueryParam {
  queryParameters: FirewallPolicyIdpsSignaturesListQueryParamProperties;
}

export interface FirewallPolicyIdpsSignaturesListMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FirewallPolicyIdpsSignaturesListParameters =
  FirewallPolicyIdpsSignaturesListQueryParam &
    FirewallPolicyIdpsSignaturesListMediaTypesParam &
    FirewallPolicyIdpsSignaturesListBodyParam &
    RequestParameters;

export interface FirewallPolicyIdpsSignaturesOverridesPatchBodyParam {
  /** Will contain all properties of the object to put */
  body: SignaturesOverrides;
}

export interface FirewallPolicyIdpsSignaturesOverridesPatchQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPolicyIdpsSignaturesOverridesPatchQueryParam {
  queryParameters: FirewallPolicyIdpsSignaturesOverridesPatchQueryParamProperties;
}

export interface FirewallPolicyIdpsSignaturesOverridesPatchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FirewallPolicyIdpsSignaturesOverridesPatchParameters =
  FirewallPolicyIdpsSignaturesOverridesPatchQueryParam &
    FirewallPolicyIdpsSignaturesOverridesPatchMediaTypesParam &
    FirewallPolicyIdpsSignaturesOverridesPatchBodyParam &
    RequestParameters;

export interface FirewallPolicyIdpsSignaturesOverridesPutBodyParam {
  /** Will contain all properties of the object to put */
  body: SignaturesOverrides;
}

export interface FirewallPolicyIdpsSignaturesOverridesPutQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPolicyIdpsSignaturesOverridesPutQueryParam {
  queryParameters: FirewallPolicyIdpsSignaturesOverridesPutQueryParamProperties;
}

export interface FirewallPolicyIdpsSignaturesOverridesPutMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FirewallPolicyIdpsSignaturesOverridesPutParameters =
  FirewallPolicyIdpsSignaturesOverridesPutQueryParam &
    FirewallPolicyIdpsSignaturesOverridesPutMediaTypesParam &
    FirewallPolicyIdpsSignaturesOverridesPutBodyParam &
    RequestParameters;

export interface FirewallPolicyIdpsSignaturesOverridesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPolicyIdpsSignaturesOverridesGetQueryParam {
  queryParameters: FirewallPolicyIdpsSignaturesOverridesGetQueryParamProperties;
}

export type FirewallPolicyIdpsSignaturesOverridesGetParameters =
  FirewallPolicyIdpsSignaturesOverridesGetQueryParam & RequestParameters;

export interface FirewallPolicyIdpsSignaturesOverridesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPolicyIdpsSignaturesOverridesListQueryParam {
  queryParameters: FirewallPolicyIdpsSignaturesOverridesListQueryParamProperties;
}

export type FirewallPolicyIdpsSignaturesOverridesListParameters =
  FirewallPolicyIdpsSignaturesOverridesListQueryParam & RequestParameters;

export interface FirewallPolicyIdpsSignaturesFilterValuesListBodyParam {
  body: SignatureOverridesFilterValuesQuery;
}

export interface FirewallPolicyIdpsSignaturesFilterValuesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FirewallPolicyIdpsSignaturesFilterValuesListQueryParam {
  queryParameters: FirewallPolicyIdpsSignaturesFilterValuesListQueryParamProperties;
}

export interface FirewallPolicyIdpsSignaturesFilterValuesListMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FirewallPolicyIdpsSignaturesFilterValuesListParameters =
  FirewallPolicyIdpsSignaturesFilterValuesListQueryParam &
    FirewallPolicyIdpsSignaturesFilterValuesListMediaTypesParam &
    FirewallPolicyIdpsSignaturesFilterValuesListBodyParam &
    RequestParameters;

export interface IpAllocationsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface IpAllocationsDeleteQueryParam {
  queryParameters: IpAllocationsDeleteQueryParamProperties;
}

export type IpAllocationsDeleteParameters = IpAllocationsDeleteQueryParam & RequestParameters;

export interface IpAllocationsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface IpAllocationsGetQueryParam {
  queryParameters: IpAllocationsGetQueryParamProperties;
}

export type IpAllocationsGetParameters = IpAllocationsGetQueryParam & RequestParameters;

export interface IpAllocationsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update virtual network operation. */
  body: IpAllocation;
}

export interface IpAllocationsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface IpAllocationsCreateOrUpdateQueryParam {
  queryParameters: IpAllocationsCreateOrUpdateQueryParamProperties;
}

export interface IpAllocationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type IpAllocationsCreateOrUpdateParameters = IpAllocationsCreateOrUpdateQueryParam &
  IpAllocationsCreateOrUpdateMediaTypesParam &
  IpAllocationsCreateOrUpdateBodyParam &
  RequestParameters;

export interface IpAllocationsUpdateTagsBodyParam {
  /** Parameters supplied to update IpAllocation tags. */
  body: TagsObject;
}

export interface IpAllocationsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface IpAllocationsUpdateTagsQueryParam {
  queryParameters: IpAllocationsUpdateTagsQueryParamProperties;
}

export interface IpAllocationsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type IpAllocationsUpdateTagsParameters = IpAllocationsUpdateTagsQueryParam &
  IpAllocationsUpdateTagsMediaTypesParam &
  IpAllocationsUpdateTagsBodyParam &
  RequestParameters;

export interface IpAllocationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface IpAllocationsListQueryParam {
  queryParameters: IpAllocationsListQueryParamProperties;
}

export type IpAllocationsListParameters = IpAllocationsListQueryParam & RequestParameters;

export interface IpAllocationsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface IpAllocationsListByResourceGroupQueryParam {
  queryParameters: IpAllocationsListByResourceGroupQueryParamProperties;
}

export type IpAllocationsListByResourceGroupParameters =
  IpAllocationsListByResourceGroupQueryParam & RequestParameters;

export interface IpGroupsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands resourceIds (of Firewalls/Network Security Groups etc.) back referenced by the IpGroups resource. */
  $expand?: string;
}

export interface IpGroupsGetQueryParam {
  queryParameters: IpGroupsGetQueryParamProperties;
}

export type IpGroupsGetParameters = IpGroupsGetQueryParam & RequestParameters;

export interface IpGroupsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update IpGroups operation. */
  body: IpGroup;
}

export interface IpGroupsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface IpGroupsCreateOrUpdateQueryParam {
  queryParameters: IpGroupsCreateOrUpdateQueryParamProperties;
}

export interface IpGroupsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type IpGroupsCreateOrUpdateParameters = IpGroupsCreateOrUpdateQueryParam &
  IpGroupsCreateOrUpdateMediaTypesParam &
  IpGroupsCreateOrUpdateBodyParam &
  RequestParameters;

export interface IpGroupsUpdateGroupsBodyParam {
  /** Parameters supplied to the update ipGroups operation. */
  body: TagsObject;
}

export interface IpGroupsUpdateGroupsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface IpGroupsUpdateGroupsQueryParam {
  queryParameters: IpGroupsUpdateGroupsQueryParamProperties;
}

export interface IpGroupsUpdateGroupsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type IpGroupsUpdateGroupsParameters = IpGroupsUpdateGroupsQueryParam &
  IpGroupsUpdateGroupsMediaTypesParam &
  IpGroupsUpdateGroupsBodyParam &
  RequestParameters;

export interface IpGroupsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface IpGroupsDeleteQueryParam {
  queryParameters: IpGroupsDeleteQueryParamProperties;
}

export type IpGroupsDeleteParameters = IpGroupsDeleteQueryParam & RequestParameters;

export interface IpGroupsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface IpGroupsListByResourceGroupQueryParam {
  queryParameters: IpGroupsListByResourceGroupQueryParamProperties;
}

export type IpGroupsListByResourceGroupParameters = IpGroupsListByResourceGroupQueryParam &
  RequestParameters;

export interface IpGroupsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface IpGroupsListQueryParam {
  queryParameters: IpGroupsListQueryParamProperties;
}

export type IpGroupsListParameters = IpGroupsListQueryParam & RequestParameters;

export interface LoadBalancersDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancersDeleteQueryParam {
  queryParameters: LoadBalancersDeleteQueryParamProperties;
}

export type LoadBalancersDeleteParameters = LoadBalancersDeleteQueryParam & RequestParameters;

export interface LoadBalancersGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface LoadBalancersGetQueryParam {
  queryParameters: LoadBalancersGetQueryParamProperties;
}

export type LoadBalancersGetParameters = LoadBalancersGetQueryParam & RequestParameters;

export interface LoadBalancersCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update load balancer operation. */
  body: LoadBalancer;
}

export interface LoadBalancersCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancersCreateOrUpdateQueryParam {
  queryParameters: LoadBalancersCreateOrUpdateQueryParamProperties;
}

export interface LoadBalancersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type LoadBalancersCreateOrUpdateParameters = LoadBalancersCreateOrUpdateQueryParam &
  LoadBalancersCreateOrUpdateMediaTypesParam &
  LoadBalancersCreateOrUpdateBodyParam &
  RequestParameters;

export interface LoadBalancersUpdateTagsBodyParam {
  /** Parameters supplied to update load balancer tags. */
  body: TagsObject;
}

export interface LoadBalancersUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancersUpdateTagsQueryParam {
  queryParameters: LoadBalancersUpdateTagsQueryParamProperties;
}

export interface LoadBalancersUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type LoadBalancersUpdateTagsParameters = LoadBalancersUpdateTagsQueryParam &
  LoadBalancersUpdateTagsMediaTypesParam &
  LoadBalancersUpdateTagsBodyParam &
  RequestParameters;

export interface LoadBalancersListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancersListAllQueryParam {
  queryParameters: LoadBalancersListAllQueryParamProperties;
}

export type LoadBalancersListAllParameters = LoadBalancersListAllQueryParam & RequestParameters;

export interface LoadBalancersListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancersListQueryParam {
  queryParameters: LoadBalancersListQueryParamProperties;
}

export type LoadBalancersListParameters = LoadBalancersListQueryParam & RequestParameters;

export interface LoadBalancersSwapPublicIpAddressesBodyParam {
  /** Parameters that define which VIPs should be swapped. */
  body: LoadBalancerVipSwapRequest;
}

export interface LoadBalancersSwapPublicIpAddressesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancersSwapPublicIpAddressesQueryParam {
  queryParameters: LoadBalancersSwapPublicIpAddressesQueryParamProperties;
}

export interface LoadBalancersSwapPublicIpAddressesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type LoadBalancersSwapPublicIpAddressesParameters =
  LoadBalancersSwapPublicIpAddressesQueryParam &
    LoadBalancersSwapPublicIpAddressesMediaTypesParam &
    LoadBalancersSwapPublicIpAddressesBodyParam &
    RequestParameters;

export interface LoadBalancersListInboundNatRulePortMappingsBodyParam {
  /** Query inbound NAT rule port mapping request. */
  body: QueryInboundNatRulePortMappingRequest;
}

export interface LoadBalancersListInboundNatRulePortMappingsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancersListInboundNatRulePortMappingsQueryParam {
  queryParameters: LoadBalancersListInboundNatRulePortMappingsQueryParamProperties;
}

export interface LoadBalancersListInboundNatRulePortMappingsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type LoadBalancersListInboundNatRulePortMappingsParameters =
  LoadBalancersListInboundNatRulePortMappingsQueryParam &
    LoadBalancersListInboundNatRulePortMappingsMediaTypesParam &
    LoadBalancersListInboundNatRulePortMappingsBodyParam &
    RequestParameters;

export interface LoadBalancerBackendAddressPoolsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerBackendAddressPoolsListQueryParam {
  queryParameters: LoadBalancerBackendAddressPoolsListQueryParamProperties;
}

export type LoadBalancerBackendAddressPoolsListParameters =
  LoadBalancerBackendAddressPoolsListQueryParam & RequestParameters;

export interface LoadBalancerBackendAddressPoolsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerBackendAddressPoolsGetQueryParam {
  queryParameters: LoadBalancerBackendAddressPoolsGetQueryParamProperties;
}

export type LoadBalancerBackendAddressPoolsGetParameters =
  LoadBalancerBackendAddressPoolsGetQueryParam & RequestParameters;

export interface LoadBalancerBackendAddressPoolsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update load balancer backend address pool operation. */
  body: BackendAddressPool;
}

export interface LoadBalancerBackendAddressPoolsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerBackendAddressPoolsCreateOrUpdateQueryParam {
  queryParameters: LoadBalancerBackendAddressPoolsCreateOrUpdateQueryParamProperties;
}

export interface LoadBalancerBackendAddressPoolsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type LoadBalancerBackendAddressPoolsCreateOrUpdateParameters =
  LoadBalancerBackendAddressPoolsCreateOrUpdateQueryParam &
    LoadBalancerBackendAddressPoolsCreateOrUpdateMediaTypesParam &
    LoadBalancerBackendAddressPoolsCreateOrUpdateBodyParam &
    RequestParameters;

export interface LoadBalancerBackendAddressPoolsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerBackendAddressPoolsDeleteQueryParam {
  queryParameters: LoadBalancerBackendAddressPoolsDeleteQueryParamProperties;
}

export type LoadBalancerBackendAddressPoolsDeleteParameters =
  LoadBalancerBackendAddressPoolsDeleteQueryParam & RequestParameters;

export interface LoadBalancerFrontendIPConfigurationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerFrontendIPConfigurationsListQueryParam {
  queryParameters: LoadBalancerFrontendIPConfigurationsListQueryParamProperties;
}

export type LoadBalancerFrontendIPConfigurationsListParameters =
  LoadBalancerFrontendIPConfigurationsListQueryParam & RequestParameters;

export interface LoadBalancerFrontendIPConfigurationsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerFrontendIPConfigurationsGetQueryParam {
  queryParameters: LoadBalancerFrontendIPConfigurationsGetQueryParamProperties;
}

export type LoadBalancerFrontendIPConfigurationsGetParameters =
  LoadBalancerFrontendIPConfigurationsGetQueryParam & RequestParameters;

export interface InboundNatRulesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface InboundNatRulesListQueryParam {
  queryParameters: InboundNatRulesListQueryParamProperties;
}

export type InboundNatRulesListParameters = InboundNatRulesListQueryParam & RequestParameters;

export interface InboundNatRulesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface InboundNatRulesDeleteQueryParam {
  queryParameters: InboundNatRulesDeleteQueryParamProperties;
}

export type InboundNatRulesDeleteParameters = InboundNatRulesDeleteQueryParam & RequestParameters;

export interface InboundNatRulesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface InboundNatRulesGetQueryParam {
  queryParameters: InboundNatRulesGetQueryParamProperties;
}

export type InboundNatRulesGetParameters = InboundNatRulesGetQueryParam & RequestParameters;

export interface InboundNatRulesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update inbound NAT rule operation. */
  body: InboundNatRule;
}

export interface InboundNatRulesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface InboundNatRulesCreateOrUpdateQueryParam {
  queryParameters: InboundNatRulesCreateOrUpdateQueryParamProperties;
}

export interface InboundNatRulesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type InboundNatRulesCreateOrUpdateParameters = InboundNatRulesCreateOrUpdateQueryParam &
  InboundNatRulesCreateOrUpdateMediaTypesParam &
  InboundNatRulesCreateOrUpdateBodyParam &
  RequestParameters;

export interface LoadBalancerLoadBalancingRulesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerLoadBalancingRulesListQueryParam {
  queryParameters: LoadBalancerLoadBalancingRulesListQueryParamProperties;
}

export type LoadBalancerLoadBalancingRulesListParameters =
  LoadBalancerLoadBalancingRulesListQueryParam & RequestParameters;

export interface LoadBalancerLoadBalancingRulesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerLoadBalancingRulesGetQueryParam {
  queryParameters: LoadBalancerLoadBalancingRulesGetQueryParamProperties;
}

export type LoadBalancerLoadBalancingRulesGetParameters =
  LoadBalancerLoadBalancingRulesGetQueryParam & RequestParameters;

export interface LoadBalancerOutboundRulesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerOutboundRulesListQueryParam {
  queryParameters: LoadBalancerOutboundRulesListQueryParamProperties;
}

export type LoadBalancerOutboundRulesListParameters = LoadBalancerOutboundRulesListQueryParam &
  RequestParameters;

export interface LoadBalancerOutboundRulesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerOutboundRulesGetQueryParam {
  queryParameters: LoadBalancerOutboundRulesGetQueryParamProperties;
}

export type LoadBalancerOutboundRulesGetParameters = LoadBalancerOutboundRulesGetQueryParam &
  RequestParameters;

export interface LoadBalancerNetworkInterfacesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerNetworkInterfacesListQueryParam {
  queryParameters: LoadBalancerNetworkInterfacesListQueryParamProperties;
}

export type LoadBalancerNetworkInterfacesListParameters =
  LoadBalancerNetworkInterfacesListQueryParam & RequestParameters;

export interface LoadBalancerProbesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerProbesListQueryParam {
  queryParameters: LoadBalancerProbesListQueryParamProperties;
}

export type LoadBalancerProbesListParameters = LoadBalancerProbesListQueryParam & RequestParameters;

export interface LoadBalancerProbesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LoadBalancerProbesGetQueryParam {
  queryParameters: LoadBalancerProbesGetQueryParamProperties;
}

export type LoadBalancerProbesGetParameters = LoadBalancerProbesGetQueryParam & RequestParameters;

export interface NatGatewaysDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NatGatewaysDeleteQueryParam {
  queryParameters: NatGatewaysDeleteQueryParamProperties;
}

export type NatGatewaysDeleteParameters = NatGatewaysDeleteQueryParam & RequestParameters;

export interface NatGatewaysGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface NatGatewaysGetQueryParam {
  queryParameters: NatGatewaysGetQueryParamProperties;
}

export type NatGatewaysGetParameters = NatGatewaysGetQueryParam & RequestParameters;

export interface NatGatewaysCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update nat gateway operation. */
  body: NatGateway;
}

export interface NatGatewaysCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NatGatewaysCreateOrUpdateQueryParam {
  queryParameters: NatGatewaysCreateOrUpdateQueryParamProperties;
}

export interface NatGatewaysCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NatGatewaysCreateOrUpdateParameters = NatGatewaysCreateOrUpdateQueryParam &
  NatGatewaysCreateOrUpdateMediaTypesParam &
  NatGatewaysCreateOrUpdateBodyParam &
  RequestParameters;

export interface NatGatewaysUpdateTagsBodyParam {
  /** Parameters supplied to update nat gateway tags. */
  body: TagsObject;
}

export interface NatGatewaysUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NatGatewaysUpdateTagsQueryParam {
  queryParameters: NatGatewaysUpdateTagsQueryParamProperties;
}

export interface NatGatewaysUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NatGatewaysUpdateTagsParameters = NatGatewaysUpdateTagsQueryParam &
  NatGatewaysUpdateTagsMediaTypesParam &
  NatGatewaysUpdateTagsBodyParam &
  RequestParameters;

export interface NatGatewaysListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NatGatewaysListAllQueryParam {
  queryParameters: NatGatewaysListAllQueryParamProperties;
}

export type NatGatewaysListAllParameters = NatGatewaysListAllQueryParam & RequestParameters;

export interface NatGatewaysListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NatGatewaysListQueryParam {
  queryParameters: NatGatewaysListQueryParamProperties;
}

export type NatGatewaysListParameters = NatGatewaysListQueryParam & RequestParameters;

export interface NetworkInterfaceIPConfigurationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfaceIPConfigurationsListQueryParam {
  queryParameters: NetworkInterfaceIPConfigurationsListQueryParamProperties;
}

export type NetworkInterfaceIPConfigurationsListParameters =
  NetworkInterfaceIPConfigurationsListQueryParam & RequestParameters;

export interface NetworkInterfaceIPConfigurationsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfaceIPConfigurationsGetQueryParam {
  queryParameters: NetworkInterfaceIPConfigurationsGetQueryParamProperties;
}

export type NetworkInterfaceIPConfigurationsGetParameters =
  NetworkInterfaceIPConfigurationsGetQueryParam & RequestParameters;

export interface NetworkInterfaceLoadBalancersListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfaceLoadBalancersListQueryParam {
  queryParameters: NetworkInterfaceLoadBalancersListQueryParamProperties;
}

export type NetworkInterfaceLoadBalancersListParameters =
  NetworkInterfaceLoadBalancersListQueryParam & RequestParameters;

export interface NetworkInterfaceTapConfigurationsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfaceTapConfigurationsDeleteQueryParam {
  queryParameters: NetworkInterfaceTapConfigurationsDeleteQueryParamProperties;
}

export type NetworkInterfaceTapConfigurationsDeleteParameters =
  NetworkInterfaceTapConfigurationsDeleteQueryParam & RequestParameters;

export interface NetworkInterfaceTapConfigurationsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfaceTapConfigurationsGetQueryParam {
  queryParameters: NetworkInterfaceTapConfigurationsGetQueryParamProperties;
}

export type NetworkInterfaceTapConfigurationsGetParameters =
  NetworkInterfaceTapConfigurationsGetQueryParam & RequestParameters;

export interface NetworkInterfaceTapConfigurationsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update tap configuration operation. */
  body: NetworkInterfaceTapConfiguration;
}

export interface NetworkInterfaceTapConfigurationsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfaceTapConfigurationsCreateOrUpdateQueryParam {
  queryParameters: NetworkInterfaceTapConfigurationsCreateOrUpdateQueryParamProperties;
}

export interface NetworkInterfaceTapConfigurationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkInterfaceTapConfigurationsCreateOrUpdateParameters =
  NetworkInterfaceTapConfigurationsCreateOrUpdateQueryParam &
    NetworkInterfaceTapConfigurationsCreateOrUpdateMediaTypesParam &
    NetworkInterfaceTapConfigurationsCreateOrUpdateBodyParam &
    RequestParameters;

export interface NetworkInterfaceTapConfigurationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkInterfaceTapConfigurationsListQueryParam {
  queryParameters: NetworkInterfaceTapConfigurationsListQueryParamProperties;
}

export type NetworkInterfaceTapConfigurationsListParameters =
  NetworkInterfaceTapConfigurationsListQueryParam & RequestParameters;

export interface NetworkManagersGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkManagersGetQueryParam {
  queryParameters: NetworkManagersGetQueryParamProperties;
}

export type NetworkManagersGetParameters = NetworkManagersGetQueryParam & RequestParameters;

export interface NetworkManagersCreateOrUpdateBodyParam {
  /** Parameters supplied to specify which network manager is. */
  body: NetworkManager;
}

export interface NetworkManagersCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkManagersCreateOrUpdateQueryParam {
  queryParameters: NetworkManagersCreateOrUpdateQueryParamProperties;
}

export interface NetworkManagersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkManagersCreateOrUpdateParameters = NetworkManagersCreateOrUpdateQueryParam &
  NetworkManagersCreateOrUpdateMediaTypesParam &
  NetworkManagersCreateOrUpdateBodyParam &
  RequestParameters;

export interface NetworkManagersDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Deletes the resource even if it is part of a deployed configuration. If the configuration has been deployed, the service will do a cleanup deployment in the background, prior to the delete. */
  force?: boolean;
}

export interface NetworkManagersDeleteQueryParam {
  queryParameters: NetworkManagersDeleteQueryParamProperties;
}

export type NetworkManagersDeleteParameters = NetworkManagersDeleteQueryParam & RequestParameters;

export interface NetworkManagersPatchBodyParam {
  /** Parameters supplied to specify which network manager is. */
  body: PatchObject;
}

export interface NetworkManagersPatchQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkManagersPatchQueryParam {
  queryParameters: NetworkManagersPatchQueryParamProperties;
}

export interface NetworkManagersPatchMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkManagersPatchParameters = NetworkManagersPatchQueryParam &
  NetworkManagersPatchMediaTypesParam &
  NetworkManagersPatchBodyParam &
  RequestParameters;

export interface NetworkManagersListBySubscriptionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  $skipToken?: string;
}

export interface NetworkManagersListBySubscriptionQueryParam {
  queryParameters: NetworkManagersListBySubscriptionQueryParamProperties;
}

export type NetworkManagersListBySubscriptionParameters =
  NetworkManagersListBySubscriptionQueryParam & RequestParameters;

export interface NetworkManagersListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  $skipToken?: string;
}

export interface NetworkManagersListQueryParam {
  queryParameters: NetworkManagersListQueryParamProperties;
}

export type NetworkManagersListParameters = NetworkManagersListQueryParam & RequestParameters;

export interface NetworkManagerCommitsPostBodyParam {
  /** Parameters supplied to specify which Managed Network commit is. */
  body: NetworkManagerCommit;
}

export interface NetworkManagerCommitsPostQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkManagerCommitsPostQueryParam {
  queryParameters: NetworkManagerCommitsPostQueryParamProperties;
}

export interface NetworkManagerCommitsPostMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkManagerCommitsPostParameters = NetworkManagerCommitsPostQueryParam &
  NetworkManagerCommitsPostMediaTypesParam &
  NetworkManagerCommitsPostBodyParam &
  RequestParameters;

export interface NetworkManagerDeploymentStatusListBodyParam {
  /** Parameters supplied to specify which Managed Network deployment status is. */
  body: NetworkManagerDeploymentStatusParameter;
}

export interface NetworkManagerDeploymentStatusListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
}

export interface NetworkManagerDeploymentStatusListQueryParam {
  queryParameters: NetworkManagerDeploymentStatusListQueryParamProperties;
}

export interface NetworkManagerDeploymentStatusListMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkManagerDeploymentStatusListParameters =
  NetworkManagerDeploymentStatusListQueryParam &
    NetworkManagerDeploymentStatusListMediaTypesParam &
    NetworkManagerDeploymentStatusListBodyParam &
    RequestParameters;

export interface SubscriptionNetworkManagerConnectionsCreateOrUpdateBodyParam {
  /** Network manager connection to be created/updated. */
  body: NetworkManagerConnection;
}

export interface SubscriptionNetworkManagerConnectionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SubscriptionNetworkManagerConnectionsCreateOrUpdateQueryParam {
  queryParameters: SubscriptionNetworkManagerConnectionsCreateOrUpdateQueryParamProperties;
}

export interface SubscriptionNetworkManagerConnectionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SubscriptionNetworkManagerConnectionsCreateOrUpdateParameters =
  SubscriptionNetworkManagerConnectionsCreateOrUpdateQueryParam &
    SubscriptionNetworkManagerConnectionsCreateOrUpdateMediaTypesParam &
    SubscriptionNetworkManagerConnectionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface SubscriptionNetworkManagerConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SubscriptionNetworkManagerConnectionsGetQueryParam {
  queryParameters: SubscriptionNetworkManagerConnectionsGetQueryParamProperties;
}

export type SubscriptionNetworkManagerConnectionsGetParameters =
  SubscriptionNetworkManagerConnectionsGetQueryParam & RequestParameters;

export interface SubscriptionNetworkManagerConnectionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SubscriptionNetworkManagerConnectionsDeleteQueryParam {
  queryParameters: SubscriptionNetworkManagerConnectionsDeleteQueryParamProperties;
}

export type SubscriptionNetworkManagerConnectionsDeleteParameters =
  SubscriptionNetworkManagerConnectionsDeleteQueryParam & RequestParameters;

export interface SubscriptionNetworkManagerConnectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  $skipToken?: string;
}

export interface SubscriptionNetworkManagerConnectionsListQueryParam {
  queryParameters: SubscriptionNetworkManagerConnectionsListQueryParamProperties;
}

export type SubscriptionNetworkManagerConnectionsListParameters =
  SubscriptionNetworkManagerConnectionsListQueryParam & RequestParameters;

export interface ManagementGroupNetworkManagerConnectionsCreateOrUpdateBodyParam {
  /** Network manager connection to be created/updated. */
  body: NetworkManagerConnection;
}

export interface ManagementGroupNetworkManagerConnectionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ManagementGroupNetworkManagerConnectionsCreateOrUpdateQueryParam {
  queryParameters: ManagementGroupNetworkManagerConnectionsCreateOrUpdateQueryParamProperties;
}

export interface ManagementGroupNetworkManagerConnectionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagementGroupNetworkManagerConnectionsCreateOrUpdateParameters =
  ManagementGroupNetworkManagerConnectionsCreateOrUpdateQueryParam &
    ManagementGroupNetworkManagerConnectionsCreateOrUpdateMediaTypesParam &
    ManagementGroupNetworkManagerConnectionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ManagementGroupNetworkManagerConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ManagementGroupNetworkManagerConnectionsGetQueryParam {
  queryParameters: ManagementGroupNetworkManagerConnectionsGetQueryParamProperties;
}

export type ManagementGroupNetworkManagerConnectionsGetParameters =
  ManagementGroupNetworkManagerConnectionsGetQueryParam & RequestParameters;

export interface ManagementGroupNetworkManagerConnectionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ManagementGroupNetworkManagerConnectionsDeleteQueryParam {
  queryParameters: ManagementGroupNetworkManagerConnectionsDeleteQueryParamProperties;
}

export type ManagementGroupNetworkManagerConnectionsDeleteParameters =
  ManagementGroupNetworkManagerConnectionsDeleteQueryParam & RequestParameters;

export interface ManagementGroupNetworkManagerConnectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  $skipToken?: string;
}

export interface ManagementGroupNetworkManagerConnectionsListQueryParam {
  queryParameters: ManagementGroupNetworkManagerConnectionsListQueryParamProperties;
}

export type ManagementGroupNetworkManagerConnectionsListParameters =
  ManagementGroupNetworkManagerConnectionsListQueryParam & RequestParameters;

export interface ConnectivityConfigurationsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConnectivityConfigurationsGetQueryParam {
  queryParameters: ConnectivityConfigurationsGetQueryParamProperties;
}

export type ConnectivityConfigurationsGetParameters = ConnectivityConfigurationsGetQueryParam &
  RequestParameters;

export interface ConnectivityConfigurationsCreateOrUpdateBodyParam {
  /** Parameters supplied to create/update a network manager connectivity configuration */
  body: ConnectivityConfiguration;
}

export interface ConnectivityConfigurationsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConnectivityConfigurationsCreateOrUpdateQueryParam {
  queryParameters: ConnectivityConfigurationsCreateOrUpdateQueryParamProperties;
}

export interface ConnectivityConfigurationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ConnectivityConfigurationsCreateOrUpdateParameters =
  ConnectivityConfigurationsCreateOrUpdateQueryParam &
    ConnectivityConfigurationsCreateOrUpdateMediaTypesParam &
    ConnectivityConfigurationsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ConnectivityConfigurationsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Deletes the resource even if it is part of a deployed configuration. If the configuration has been deployed, the service will do a cleanup deployment in the background, prior to the delete. */
  force?: boolean;
}

export interface ConnectivityConfigurationsDeleteQueryParam {
  queryParameters: ConnectivityConfigurationsDeleteQueryParamProperties;
}

export type ConnectivityConfigurationsDeleteParameters =
  ConnectivityConfigurationsDeleteQueryParam & RequestParameters;

export interface ConnectivityConfigurationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  $skipToken?: string;
}

export interface ConnectivityConfigurationsListQueryParam {
  queryParameters: ConnectivityConfigurationsListQueryParamProperties;
}

export type ConnectivityConfigurationsListParameters = ConnectivityConfigurationsListQueryParam &
  RequestParameters;

export interface NetworkGroupsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkGroupsGetQueryParam {
  queryParameters: NetworkGroupsGetQueryParamProperties;
}

export type NetworkGroupsGetParameters = NetworkGroupsGetQueryParam & RequestParameters;

export interface NetworkGroupsCreateOrUpdateHeaders {
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  "If-Match"?: string;
}

export interface NetworkGroupsCreateOrUpdateBodyParam {
  /** Parameters supplied to the specify which network group need to create */
  body: NetworkGroup;
}

export interface NetworkGroupsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkGroupsCreateOrUpdateQueryParam {
  queryParameters: NetworkGroupsCreateOrUpdateQueryParamProperties;
}

export interface NetworkGroupsCreateOrUpdateHeaderParam {
  headers: RawHttpHeadersInput & NetworkGroupsCreateOrUpdateHeaders;
}

export interface NetworkGroupsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkGroupsCreateOrUpdateParameters = NetworkGroupsCreateOrUpdateQueryParam &
  NetworkGroupsCreateOrUpdateHeaderParam &
  NetworkGroupsCreateOrUpdateMediaTypesParam &
  NetworkGroupsCreateOrUpdateBodyParam &
  RequestParameters;

export interface NetworkGroupsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Deletes the resource even if it is part of a deployed configuration. If the configuration has been deployed, the service will do a cleanup deployment in the background, prior to the delete. */
  force?: boolean;
}

export interface NetworkGroupsDeleteQueryParam {
  queryParameters: NetworkGroupsDeleteQueryParamProperties;
}

export type NetworkGroupsDeleteParameters = NetworkGroupsDeleteQueryParam & RequestParameters;

export interface NetworkGroupsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  $skipToken?: string;
}

export interface NetworkGroupsListQueryParam {
  queryParameters: NetworkGroupsListQueryParamProperties;
}

export type NetworkGroupsListParameters = NetworkGroupsListQueryParam & RequestParameters;

export interface StaticMembersGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface StaticMembersGetQueryParam {
  queryParameters: StaticMembersGetQueryParamProperties;
}

export type StaticMembersGetParameters = StaticMembersGetQueryParam & RequestParameters;

export interface StaticMembersCreateOrUpdateBodyParam {
  /** Parameters supplied to the specify the static member to create */
  body: StaticMember;
}

export interface StaticMembersCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface StaticMembersCreateOrUpdateQueryParam {
  queryParameters: StaticMembersCreateOrUpdateQueryParamProperties;
}

export interface StaticMembersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type StaticMembersCreateOrUpdateParameters = StaticMembersCreateOrUpdateQueryParam &
  StaticMembersCreateOrUpdateMediaTypesParam &
  StaticMembersCreateOrUpdateBodyParam &
  RequestParameters;

export interface StaticMembersDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface StaticMembersDeleteQueryParam {
  queryParameters: StaticMembersDeleteQueryParamProperties;
}

export type StaticMembersDeleteParameters = StaticMembersDeleteQueryParam & RequestParameters;

export interface StaticMembersListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  $skipToken?: string;
}

export interface StaticMembersListQueryParam {
  queryParameters: StaticMembersListQueryParamProperties;
}

export type StaticMembersListParameters = StaticMembersListQueryParam & RequestParameters;

export interface ScopeConnectionsCreateOrUpdateBodyParam {
  /** Scope connection to be created/updated. */
  body: ScopeConnection;
}

export interface ScopeConnectionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ScopeConnectionsCreateOrUpdateQueryParam {
  queryParameters: ScopeConnectionsCreateOrUpdateQueryParamProperties;
}

export interface ScopeConnectionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ScopeConnectionsCreateOrUpdateParameters = ScopeConnectionsCreateOrUpdateQueryParam &
  ScopeConnectionsCreateOrUpdateMediaTypesParam &
  ScopeConnectionsCreateOrUpdateBodyParam &
  RequestParameters;

export interface ScopeConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ScopeConnectionsGetQueryParam {
  queryParameters: ScopeConnectionsGetQueryParamProperties;
}

export type ScopeConnectionsGetParameters = ScopeConnectionsGetQueryParam & RequestParameters;

export interface ScopeConnectionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ScopeConnectionsDeleteQueryParam {
  queryParameters: ScopeConnectionsDeleteQueryParamProperties;
}

export type ScopeConnectionsDeleteParameters = ScopeConnectionsDeleteQueryParam & RequestParameters;

export interface ScopeConnectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  $skipToken?: string;
}

export interface ScopeConnectionsListQueryParam {
  queryParameters: ScopeConnectionsListQueryParamProperties;
}

export type ScopeConnectionsListParameters = ScopeConnectionsListQueryParam & RequestParameters;

export interface SecurityAdminConfigurationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  $skipToken?: string;
}

export interface SecurityAdminConfigurationsListQueryParam {
  queryParameters: SecurityAdminConfigurationsListQueryParamProperties;
}

export type SecurityAdminConfigurationsListParameters = SecurityAdminConfigurationsListQueryParam &
  RequestParameters;

export interface SecurityAdminConfigurationsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityAdminConfigurationsGetQueryParam {
  queryParameters: SecurityAdminConfigurationsGetQueryParamProperties;
}

export type SecurityAdminConfigurationsGetParameters = SecurityAdminConfigurationsGetQueryParam &
  RequestParameters;

export interface SecurityAdminConfigurationsCreateOrUpdateBodyParam {
  /** The security admin configuration to create or update */
  body: SecurityAdminConfiguration;
}

export interface SecurityAdminConfigurationsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityAdminConfigurationsCreateOrUpdateQueryParam {
  queryParameters: SecurityAdminConfigurationsCreateOrUpdateQueryParamProperties;
}

export interface SecurityAdminConfigurationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SecurityAdminConfigurationsCreateOrUpdateParameters =
  SecurityAdminConfigurationsCreateOrUpdateQueryParam &
    SecurityAdminConfigurationsCreateOrUpdateMediaTypesParam &
    SecurityAdminConfigurationsCreateOrUpdateBodyParam &
    RequestParameters;

export interface SecurityAdminConfigurationsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Deletes the resource even if it is part of a deployed configuration. If the configuration has been deployed, the service will do a cleanup deployment in the background, prior to the delete. */
  force?: boolean;
}

export interface SecurityAdminConfigurationsDeleteQueryParam {
  queryParameters: SecurityAdminConfigurationsDeleteQueryParamProperties;
}

export type SecurityAdminConfigurationsDeleteParameters =
  SecurityAdminConfigurationsDeleteQueryParam & RequestParameters;

export interface AdminRuleCollectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  $skipToken?: string;
}

export interface AdminRuleCollectionsListQueryParam {
  queryParameters: AdminRuleCollectionsListQueryParamProperties;
}

export type AdminRuleCollectionsListParameters = AdminRuleCollectionsListQueryParam &
  RequestParameters;

export interface AdminRuleCollectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AdminRuleCollectionsGetQueryParam {
  queryParameters: AdminRuleCollectionsGetQueryParamProperties;
}

export type AdminRuleCollectionsGetParameters = AdminRuleCollectionsGetQueryParam &
  RequestParameters;

export interface AdminRuleCollectionsCreateOrUpdateBodyParam {
  /** The Rule Collection to create or update */
  body: AdminRuleCollection;
}

export interface AdminRuleCollectionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AdminRuleCollectionsCreateOrUpdateQueryParam {
  queryParameters: AdminRuleCollectionsCreateOrUpdateQueryParamProperties;
}

export interface AdminRuleCollectionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AdminRuleCollectionsCreateOrUpdateParameters =
  AdminRuleCollectionsCreateOrUpdateQueryParam &
    AdminRuleCollectionsCreateOrUpdateMediaTypesParam &
    AdminRuleCollectionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface AdminRuleCollectionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Deletes the resource even if it is part of a deployed configuration. If the configuration has been deployed, the service will do a cleanup deployment in the background, prior to the delete. */
  force?: boolean;
}

export interface AdminRuleCollectionsDeleteQueryParam {
  queryParameters: AdminRuleCollectionsDeleteQueryParamProperties;
}

export type AdminRuleCollectionsDeleteParameters = AdminRuleCollectionsDeleteQueryParam &
  RequestParameters;

export interface AdminRulesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  $top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  $skipToken?: string;
}

export interface AdminRulesListQueryParam {
  queryParameters: AdminRulesListQueryParamProperties;
}

export type AdminRulesListParameters = AdminRulesListQueryParam & RequestParameters;

export interface AdminRulesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AdminRulesGetQueryParam {
  queryParameters: AdminRulesGetQueryParamProperties;
}

export type AdminRulesGetParameters = AdminRulesGetQueryParam & RequestParameters;

export interface AdminRulesCreateOrUpdateBodyParam {
  /** The admin rule to create or update */
  body: BaseAdminRule;
}

export interface AdminRulesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AdminRulesCreateOrUpdateQueryParam {
  queryParameters: AdminRulesCreateOrUpdateQueryParamProperties;
}

export interface AdminRulesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type AdminRulesCreateOrUpdateParameters = AdminRulesCreateOrUpdateQueryParam &
  AdminRulesCreateOrUpdateMediaTypesParam &
  AdminRulesCreateOrUpdateBodyParam &
  RequestParameters;

export interface AdminRulesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Deletes the resource even if it is part of a deployed configuration. If the configuration has been deployed, the service will do a cleanup deployment in the background, prior to the delete. */
  force?: boolean;
}

export interface AdminRulesDeleteQueryParam {
  queryParameters: AdminRulesDeleteQueryParamProperties;
}

export type AdminRulesDeleteParameters = AdminRulesDeleteQueryParam & RequestParameters;

export interface NetworkProfilesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkProfilesDeleteQueryParam {
  queryParameters: NetworkProfilesDeleteQueryParamProperties;
}

export type NetworkProfilesDeleteParameters = NetworkProfilesDeleteQueryParam & RequestParameters;

export interface NetworkProfilesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface NetworkProfilesGetQueryParam {
  queryParameters: NetworkProfilesGetQueryParamProperties;
}

export type NetworkProfilesGetParameters = NetworkProfilesGetQueryParam & RequestParameters;

export interface NetworkProfilesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update network profile operation. */
  body: NetworkProfile;
}

export interface NetworkProfilesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkProfilesCreateOrUpdateQueryParam {
  queryParameters: NetworkProfilesCreateOrUpdateQueryParamProperties;
}

export interface NetworkProfilesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkProfilesCreateOrUpdateParameters = NetworkProfilesCreateOrUpdateQueryParam &
  NetworkProfilesCreateOrUpdateMediaTypesParam &
  NetworkProfilesCreateOrUpdateBodyParam &
  RequestParameters;

export interface NetworkProfilesUpdateTagsBodyParam {
  /** Parameters supplied to update network profile tags. */
  body: TagsObject;
}

export interface NetworkProfilesUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkProfilesUpdateTagsQueryParam {
  queryParameters: NetworkProfilesUpdateTagsQueryParamProperties;
}

export interface NetworkProfilesUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkProfilesUpdateTagsParameters = NetworkProfilesUpdateTagsQueryParam &
  NetworkProfilesUpdateTagsMediaTypesParam &
  NetworkProfilesUpdateTagsBodyParam &
  RequestParameters;

export interface NetworkProfilesListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkProfilesListAllQueryParam {
  queryParameters: NetworkProfilesListAllQueryParamProperties;
}

export type NetworkProfilesListAllParameters = NetworkProfilesListAllQueryParam & RequestParameters;

export interface NetworkProfilesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkProfilesListQueryParam {
  queryParameters: NetworkProfilesListQueryParamProperties;
}

export type NetworkProfilesListParameters = NetworkProfilesListQueryParam & RequestParameters;

export interface NetworkSecurityGroupsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkSecurityGroupsDeleteQueryParam {
  queryParameters: NetworkSecurityGroupsDeleteQueryParamProperties;
}

export type NetworkSecurityGroupsDeleteParameters = NetworkSecurityGroupsDeleteQueryParam &
  RequestParameters;

export interface NetworkSecurityGroupsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface NetworkSecurityGroupsGetQueryParam {
  queryParameters: NetworkSecurityGroupsGetQueryParamProperties;
}

export type NetworkSecurityGroupsGetParameters = NetworkSecurityGroupsGetQueryParam &
  RequestParameters;

export interface NetworkSecurityGroupsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update network security group operation. */
  body: NetworkSecurityGroup;
}

export interface NetworkSecurityGroupsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkSecurityGroupsCreateOrUpdateQueryParam {
  queryParameters: NetworkSecurityGroupsCreateOrUpdateQueryParamProperties;
}

export interface NetworkSecurityGroupsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkSecurityGroupsCreateOrUpdateParameters =
  NetworkSecurityGroupsCreateOrUpdateQueryParam &
    NetworkSecurityGroupsCreateOrUpdateMediaTypesParam &
    NetworkSecurityGroupsCreateOrUpdateBodyParam &
    RequestParameters;

export interface NetworkSecurityGroupsUpdateTagsBodyParam {
  /** Parameters supplied to update network security group tags. */
  body: TagsObject;
}

export interface NetworkSecurityGroupsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkSecurityGroupsUpdateTagsQueryParam {
  queryParameters: NetworkSecurityGroupsUpdateTagsQueryParamProperties;
}

export interface NetworkSecurityGroupsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkSecurityGroupsUpdateTagsParameters = NetworkSecurityGroupsUpdateTagsQueryParam &
  NetworkSecurityGroupsUpdateTagsMediaTypesParam &
  NetworkSecurityGroupsUpdateTagsBodyParam &
  RequestParameters;

export interface NetworkSecurityGroupsListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkSecurityGroupsListAllQueryParam {
  queryParameters: NetworkSecurityGroupsListAllQueryParamProperties;
}

export type NetworkSecurityGroupsListAllParameters = NetworkSecurityGroupsListAllQueryParam &
  RequestParameters;

export interface NetworkSecurityGroupsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkSecurityGroupsListQueryParam {
  queryParameters: NetworkSecurityGroupsListQueryParamProperties;
}

export type NetworkSecurityGroupsListParameters = NetworkSecurityGroupsListQueryParam &
  RequestParameters;

export interface SecurityRulesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityRulesDeleteQueryParam {
  queryParameters: SecurityRulesDeleteQueryParamProperties;
}

export type SecurityRulesDeleteParameters = SecurityRulesDeleteQueryParam & RequestParameters;

export interface SecurityRulesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityRulesGetQueryParam {
  queryParameters: SecurityRulesGetQueryParamProperties;
}

export type SecurityRulesGetParameters = SecurityRulesGetQueryParam & RequestParameters;

export interface SecurityRulesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update network security rule operation. */
  body: SecurityRule;
}

export interface SecurityRulesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityRulesCreateOrUpdateQueryParam {
  queryParameters: SecurityRulesCreateOrUpdateQueryParamProperties;
}

export interface SecurityRulesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SecurityRulesCreateOrUpdateParameters = SecurityRulesCreateOrUpdateQueryParam &
  SecurityRulesCreateOrUpdateMediaTypesParam &
  SecurityRulesCreateOrUpdateBodyParam &
  RequestParameters;

export interface SecurityRulesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityRulesListQueryParam {
  queryParameters: SecurityRulesListQueryParamProperties;
}

export type SecurityRulesListParameters = SecurityRulesListQueryParam & RequestParameters;

export interface DefaultSecurityRulesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DefaultSecurityRulesListQueryParam {
  queryParameters: DefaultSecurityRulesListQueryParamProperties;
}

export type DefaultSecurityRulesListParameters = DefaultSecurityRulesListQueryParam &
  RequestParameters;

export interface DefaultSecurityRulesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface DefaultSecurityRulesGetQueryParam {
  queryParameters: DefaultSecurityRulesGetQueryParamProperties;
}

export type DefaultSecurityRulesGetParameters = DefaultSecurityRulesGetQueryParam &
  RequestParameters;

export interface NetworkVirtualAppliancesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkVirtualAppliancesDeleteQueryParam {
  queryParameters: NetworkVirtualAppliancesDeleteQueryParamProperties;
}

export type NetworkVirtualAppliancesDeleteParameters = NetworkVirtualAppliancesDeleteQueryParam &
  RequestParameters;

export interface NetworkVirtualAppliancesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface NetworkVirtualAppliancesGetQueryParam {
  queryParameters: NetworkVirtualAppliancesGetQueryParamProperties;
}

export type NetworkVirtualAppliancesGetParameters = NetworkVirtualAppliancesGetQueryParam &
  RequestParameters;

export interface NetworkVirtualAppliancesUpdateTagsBodyParam {
  /** Parameters supplied to Update Network Virtual Appliance Tags. */
  body: TagsObject;
}

export interface NetworkVirtualAppliancesUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkVirtualAppliancesUpdateTagsQueryParam {
  queryParameters: NetworkVirtualAppliancesUpdateTagsQueryParamProperties;
}

export interface NetworkVirtualAppliancesUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkVirtualAppliancesUpdateTagsParameters =
  NetworkVirtualAppliancesUpdateTagsQueryParam &
    NetworkVirtualAppliancesUpdateTagsMediaTypesParam &
    NetworkVirtualAppliancesUpdateTagsBodyParam &
    RequestParameters;

export interface NetworkVirtualAppliancesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update Network Virtual Appliance. */
  body: NetworkVirtualAppliance;
}

export interface NetworkVirtualAppliancesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkVirtualAppliancesCreateOrUpdateQueryParam {
  queryParameters: NetworkVirtualAppliancesCreateOrUpdateQueryParamProperties;
}

export interface NetworkVirtualAppliancesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkVirtualAppliancesCreateOrUpdateParameters =
  NetworkVirtualAppliancesCreateOrUpdateQueryParam &
    NetworkVirtualAppliancesCreateOrUpdateMediaTypesParam &
    NetworkVirtualAppliancesCreateOrUpdateBodyParam &
    RequestParameters;

export interface NetworkVirtualAppliancesListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkVirtualAppliancesListByResourceGroupQueryParam {
  queryParameters: NetworkVirtualAppliancesListByResourceGroupQueryParamProperties;
}

export type NetworkVirtualAppliancesListByResourceGroupParameters =
  NetworkVirtualAppliancesListByResourceGroupQueryParam & RequestParameters;

export interface NetworkVirtualAppliancesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkVirtualAppliancesListQueryParam {
  queryParameters: NetworkVirtualAppliancesListQueryParamProperties;
}

export type NetworkVirtualAppliancesListParameters = NetworkVirtualAppliancesListQueryParam &
  RequestParameters;

export interface VirtualApplianceSitesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualApplianceSitesDeleteQueryParam {
  queryParameters: VirtualApplianceSitesDeleteQueryParamProperties;
}

export type VirtualApplianceSitesDeleteParameters = VirtualApplianceSitesDeleteQueryParam &
  RequestParameters;

export interface VirtualApplianceSitesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualApplianceSitesGetQueryParam {
  queryParameters: VirtualApplianceSitesGetQueryParamProperties;
}

export type VirtualApplianceSitesGetParameters = VirtualApplianceSitesGetQueryParam &
  RequestParameters;

export interface VirtualApplianceSitesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update Network Virtual Appliance Site operation. */
  body: VirtualApplianceSite;
}

export interface VirtualApplianceSitesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualApplianceSitesCreateOrUpdateQueryParam {
  queryParameters: VirtualApplianceSitesCreateOrUpdateQueryParamProperties;
}

export interface VirtualApplianceSitesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualApplianceSitesCreateOrUpdateParameters =
  VirtualApplianceSitesCreateOrUpdateQueryParam &
    VirtualApplianceSitesCreateOrUpdateMediaTypesParam &
    VirtualApplianceSitesCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualApplianceSitesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualApplianceSitesListQueryParam {
  queryParameters: VirtualApplianceSitesListQueryParamProperties;
}

export type VirtualApplianceSitesListParameters = VirtualApplianceSitesListQueryParam &
  RequestParameters;

export interface VirtualApplianceSkusListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualApplianceSkusListQueryParam {
  queryParameters: VirtualApplianceSkusListQueryParamProperties;
}

export type VirtualApplianceSkusListParameters = VirtualApplianceSkusListQueryParam &
  RequestParameters;

export interface VirtualApplianceSkusGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualApplianceSkusGetQueryParam {
  queryParameters: VirtualApplianceSkusGetQueryParamProperties;
}

export type VirtualApplianceSkusGetParameters = VirtualApplianceSkusGetQueryParam &
  RequestParameters;

export interface InboundSecurityRuleCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update Network Virtual Appliance Inbound Security Rules operation. */
  body: InboundSecurityRule;
}

export interface InboundSecurityRuleCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface InboundSecurityRuleCreateOrUpdateQueryParam {
  queryParameters: InboundSecurityRuleCreateOrUpdateQueryParamProperties;
}

export interface InboundSecurityRuleCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type InboundSecurityRuleCreateOrUpdateParameters =
  InboundSecurityRuleCreateOrUpdateQueryParam &
    InboundSecurityRuleCreateOrUpdateMediaTypesParam &
    InboundSecurityRuleCreateOrUpdateBodyParam &
    RequestParameters;

export interface NetworkWatchersCreateOrUpdateBodyParam {
  /** Parameters that define the network watcher resource. */
  body: NetworkWatcher;
}

export interface NetworkWatchersCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersCreateOrUpdateQueryParam {
  queryParameters: NetworkWatchersCreateOrUpdateQueryParamProperties;
}

export interface NetworkWatchersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersCreateOrUpdateParameters = NetworkWatchersCreateOrUpdateQueryParam &
  NetworkWatchersCreateOrUpdateMediaTypesParam &
  NetworkWatchersCreateOrUpdateBodyParam &
  RequestParameters;

export interface NetworkWatchersGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersGetQueryParam {
  queryParameters: NetworkWatchersGetQueryParamProperties;
}

export type NetworkWatchersGetParameters = NetworkWatchersGetQueryParam & RequestParameters;

export interface NetworkWatchersDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersDeleteQueryParam {
  queryParameters: NetworkWatchersDeleteQueryParamProperties;
}

export type NetworkWatchersDeleteParameters = NetworkWatchersDeleteQueryParam & RequestParameters;

export interface NetworkWatchersUpdateTagsBodyParam {
  /** Parameters supplied to update network watcher tags. */
  body: TagsObject;
}

export interface NetworkWatchersUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersUpdateTagsQueryParam {
  queryParameters: NetworkWatchersUpdateTagsQueryParamProperties;
}

export interface NetworkWatchersUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersUpdateTagsParameters = NetworkWatchersUpdateTagsQueryParam &
  NetworkWatchersUpdateTagsMediaTypesParam &
  NetworkWatchersUpdateTagsBodyParam &
  RequestParameters;

export interface NetworkWatchersListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersListQueryParam {
  queryParameters: NetworkWatchersListQueryParamProperties;
}

export type NetworkWatchersListParameters = NetworkWatchersListQueryParam & RequestParameters;

export interface NetworkWatchersListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersListAllQueryParam {
  queryParameters: NetworkWatchersListAllQueryParamProperties;
}

export type NetworkWatchersListAllParameters = NetworkWatchersListAllQueryParam & RequestParameters;

export interface NetworkWatchersGetTopologyBodyParam {
  /** Parameters that define the representation of topology. */
  body: TopologyParameters;
}

export interface NetworkWatchersGetTopologyQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersGetTopologyQueryParam {
  queryParameters: NetworkWatchersGetTopologyQueryParamProperties;
}

export interface NetworkWatchersGetTopologyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersGetTopologyParameters = NetworkWatchersGetTopologyQueryParam &
  NetworkWatchersGetTopologyMediaTypesParam &
  NetworkWatchersGetTopologyBodyParam &
  RequestParameters;

export interface NetworkWatchersVerifyIPFlowBodyParam {
  /** Parameters that define the IP flow to be verified. */
  body: VerificationIPFlowParameters;
}

export interface NetworkWatchersVerifyIPFlowQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersVerifyIPFlowQueryParam {
  queryParameters: NetworkWatchersVerifyIPFlowQueryParamProperties;
}

export interface NetworkWatchersVerifyIPFlowMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersVerifyIPFlowParameters = NetworkWatchersVerifyIPFlowQueryParam &
  NetworkWatchersVerifyIPFlowMediaTypesParam &
  NetworkWatchersVerifyIPFlowBodyParam &
  RequestParameters;

export interface NetworkWatchersGetNextHopBodyParam {
  /** Parameters that define the source and destination endpoint. */
  body: NextHopParameters;
}

export interface NetworkWatchersGetNextHopQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersGetNextHopQueryParam {
  queryParameters: NetworkWatchersGetNextHopQueryParamProperties;
}

export interface NetworkWatchersGetNextHopMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersGetNextHopParameters = NetworkWatchersGetNextHopQueryParam &
  NetworkWatchersGetNextHopMediaTypesParam &
  NetworkWatchersGetNextHopBodyParam &
  RequestParameters;

export interface NetworkWatchersGetVMSecurityRulesBodyParam {
  /** Parameters that define the VM to check security groups for. */
  body: SecurityGroupViewParameters;
}

export interface NetworkWatchersGetVMSecurityRulesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersGetVMSecurityRulesQueryParam {
  queryParameters: NetworkWatchersGetVMSecurityRulesQueryParamProperties;
}

export interface NetworkWatchersGetVMSecurityRulesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersGetVMSecurityRulesParameters =
  NetworkWatchersGetVMSecurityRulesQueryParam &
    NetworkWatchersGetVMSecurityRulesMediaTypesParam &
    NetworkWatchersGetVMSecurityRulesBodyParam &
    RequestParameters;

export interface NetworkWatchersGetTroubleshootingBodyParam {
  /** Parameters that define the resource to troubleshoot. */
  body: TroubleshootingParameters;
}

export interface NetworkWatchersGetTroubleshootingQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersGetTroubleshootingQueryParam {
  queryParameters: NetworkWatchersGetTroubleshootingQueryParamProperties;
}

export interface NetworkWatchersGetTroubleshootingMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersGetTroubleshootingParameters =
  NetworkWatchersGetTroubleshootingQueryParam &
    NetworkWatchersGetTroubleshootingMediaTypesParam &
    NetworkWatchersGetTroubleshootingBodyParam &
    RequestParameters;

export interface NetworkWatchersGetTroubleshootingResultBodyParam {
  /** Parameters that define the resource to query the troubleshooting result. */
  body: QueryTroubleshootingParameters;
}

export interface NetworkWatchersGetTroubleshootingResultQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersGetTroubleshootingResultQueryParam {
  queryParameters: NetworkWatchersGetTroubleshootingResultQueryParamProperties;
}

export interface NetworkWatchersGetTroubleshootingResultMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersGetTroubleshootingResultParameters =
  NetworkWatchersGetTroubleshootingResultQueryParam &
    NetworkWatchersGetTroubleshootingResultMediaTypesParam &
    NetworkWatchersGetTroubleshootingResultBodyParam &
    RequestParameters;

export interface NetworkWatchersSetFlowLogConfigurationBodyParam {
  /** Parameters that define the configuration of flow log. */
  body: FlowLogInformation;
}

export interface NetworkWatchersSetFlowLogConfigurationQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersSetFlowLogConfigurationQueryParam {
  queryParameters: NetworkWatchersSetFlowLogConfigurationQueryParamProperties;
}

export interface NetworkWatchersSetFlowLogConfigurationMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersSetFlowLogConfigurationParameters =
  NetworkWatchersSetFlowLogConfigurationQueryParam &
    NetworkWatchersSetFlowLogConfigurationMediaTypesParam &
    NetworkWatchersSetFlowLogConfigurationBodyParam &
    RequestParameters;

export interface NetworkWatchersGetFlowLogStatusBodyParam {
  /** Parameters that define a resource to query flow log and traffic analytics (optional) status. */
  body: FlowLogStatusParameters;
}

export interface NetworkWatchersGetFlowLogStatusQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersGetFlowLogStatusQueryParam {
  queryParameters: NetworkWatchersGetFlowLogStatusQueryParamProperties;
}

export interface NetworkWatchersGetFlowLogStatusMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersGetFlowLogStatusParameters = NetworkWatchersGetFlowLogStatusQueryParam &
  NetworkWatchersGetFlowLogStatusMediaTypesParam &
  NetworkWatchersGetFlowLogStatusBodyParam &
  RequestParameters;

export interface NetworkWatchersCheckConnectivityBodyParam {
  /** Parameters that determine how the connectivity check will be performed. */
  body: ConnectivityParameters;
}

export interface NetworkWatchersCheckConnectivityQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersCheckConnectivityQueryParam {
  queryParameters: NetworkWatchersCheckConnectivityQueryParamProperties;
}

export interface NetworkWatchersCheckConnectivityMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersCheckConnectivityParameters =
  NetworkWatchersCheckConnectivityQueryParam &
    NetworkWatchersCheckConnectivityMediaTypesParam &
    NetworkWatchersCheckConnectivityBodyParam &
    RequestParameters;

export interface NetworkWatchersGetAzureReachabilityReportBodyParam {
  /** Parameters that determine Azure reachability report configuration. */
  body: AzureReachabilityReportParameters;
}

export interface NetworkWatchersGetAzureReachabilityReportQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersGetAzureReachabilityReportQueryParam {
  queryParameters: NetworkWatchersGetAzureReachabilityReportQueryParamProperties;
}

export interface NetworkWatchersGetAzureReachabilityReportMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersGetAzureReachabilityReportParameters =
  NetworkWatchersGetAzureReachabilityReportQueryParam &
    NetworkWatchersGetAzureReachabilityReportMediaTypesParam &
    NetworkWatchersGetAzureReachabilityReportBodyParam &
    RequestParameters;

export interface NetworkWatchersListAvailableProvidersBodyParam {
  /** Parameters that scope the list of available providers. */
  body: AvailableProvidersListParameters;
}

export interface NetworkWatchersListAvailableProvidersQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersListAvailableProvidersQueryParam {
  queryParameters: NetworkWatchersListAvailableProvidersQueryParamProperties;
}

export interface NetworkWatchersListAvailableProvidersMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersListAvailableProvidersParameters =
  NetworkWatchersListAvailableProvidersQueryParam &
    NetworkWatchersListAvailableProvidersMediaTypesParam &
    NetworkWatchersListAvailableProvidersBodyParam &
    RequestParameters;

export interface NetworkWatchersGetNetworkConfigurationDiagnosticBodyParam {
  /** Parameters to get network configuration diagnostic. */
  body: NetworkConfigurationDiagnosticParameters;
}

export interface NetworkWatchersGetNetworkConfigurationDiagnosticQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NetworkWatchersGetNetworkConfigurationDiagnosticQueryParam {
  queryParameters: NetworkWatchersGetNetworkConfigurationDiagnosticQueryParamProperties;
}

export interface NetworkWatchersGetNetworkConfigurationDiagnosticMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NetworkWatchersGetNetworkConfigurationDiagnosticParameters =
  NetworkWatchersGetNetworkConfigurationDiagnosticQueryParam &
    NetworkWatchersGetNetworkConfigurationDiagnosticMediaTypesParam &
    NetworkWatchersGetNetworkConfigurationDiagnosticBodyParam &
    RequestParameters;

export interface PacketCapturesCreateBodyParam {
  /** Parameters that define the create packet capture operation. */
  body: PacketCapture;
}

export interface PacketCapturesCreateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PacketCapturesCreateQueryParam {
  queryParameters: PacketCapturesCreateQueryParamProperties;
}

export interface PacketCapturesCreateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PacketCapturesCreateParameters = PacketCapturesCreateQueryParam &
  PacketCapturesCreateMediaTypesParam &
  PacketCapturesCreateBodyParam &
  RequestParameters;

export interface PacketCapturesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PacketCapturesGetQueryParam {
  queryParameters: PacketCapturesGetQueryParamProperties;
}

export type PacketCapturesGetParameters = PacketCapturesGetQueryParam & RequestParameters;

export interface PacketCapturesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PacketCapturesDeleteQueryParam {
  queryParameters: PacketCapturesDeleteQueryParamProperties;
}

export type PacketCapturesDeleteParameters = PacketCapturesDeleteQueryParam & RequestParameters;

export interface PacketCapturesStopQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PacketCapturesStopQueryParam {
  queryParameters: PacketCapturesStopQueryParamProperties;
}

export type PacketCapturesStopParameters = PacketCapturesStopQueryParam & RequestParameters;

export interface PacketCapturesGetStatusQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PacketCapturesGetStatusQueryParam {
  queryParameters: PacketCapturesGetStatusQueryParamProperties;
}

export type PacketCapturesGetStatusParameters = PacketCapturesGetStatusQueryParam &
  RequestParameters;

export interface PacketCapturesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PacketCapturesListQueryParam {
  queryParameters: PacketCapturesListQueryParamProperties;
}

export type PacketCapturesListParameters = PacketCapturesListQueryParam & RequestParameters;

export interface ConnectionMonitorsCreateOrUpdateBodyParam {
  /** Parameters that define the operation to create a connection monitor. */
  body: ConnectionMonitor;
}

export interface ConnectionMonitorsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Value indicating whether connection monitor V1 should be migrated to V2 format. */
  migrate?: string;
}

export interface ConnectionMonitorsCreateOrUpdateQueryParam {
  queryParameters: ConnectionMonitorsCreateOrUpdateQueryParamProperties;
}

export interface ConnectionMonitorsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ConnectionMonitorsCreateOrUpdateParameters =
  ConnectionMonitorsCreateOrUpdateQueryParam &
    ConnectionMonitorsCreateOrUpdateMediaTypesParam &
    ConnectionMonitorsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ConnectionMonitorsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConnectionMonitorsGetQueryParam {
  queryParameters: ConnectionMonitorsGetQueryParamProperties;
}

export type ConnectionMonitorsGetParameters = ConnectionMonitorsGetQueryParam & RequestParameters;

export interface ConnectionMonitorsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConnectionMonitorsDeleteQueryParam {
  queryParameters: ConnectionMonitorsDeleteQueryParamProperties;
}

export type ConnectionMonitorsDeleteParameters = ConnectionMonitorsDeleteQueryParam &
  RequestParameters;

export interface ConnectionMonitorsUpdateTagsBodyParam {
  /** Parameters supplied to update connection monitor tags. */
  body: TagsObject;
}

export interface ConnectionMonitorsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConnectionMonitorsUpdateTagsQueryParam {
  queryParameters: ConnectionMonitorsUpdateTagsQueryParamProperties;
}

export interface ConnectionMonitorsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ConnectionMonitorsUpdateTagsParameters = ConnectionMonitorsUpdateTagsQueryParam &
  ConnectionMonitorsUpdateTagsMediaTypesParam &
  ConnectionMonitorsUpdateTagsBodyParam &
  RequestParameters;

export interface ConnectionMonitorsStopQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConnectionMonitorsStopQueryParam {
  queryParameters: ConnectionMonitorsStopQueryParamProperties;
}

export type ConnectionMonitorsStopParameters = ConnectionMonitorsStopQueryParam & RequestParameters;

export interface ConnectionMonitorsStartQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConnectionMonitorsStartQueryParam {
  queryParameters: ConnectionMonitorsStartQueryParamProperties;
}

export type ConnectionMonitorsStartParameters = ConnectionMonitorsStartQueryParam &
  RequestParameters;

export interface ConnectionMonitorsQueryQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConnectionMonitorsQueryQueryParam {
  queryParameters: ConnectionMonitorsQueryQueryParamProperties;
}

export type ConnectionMonitorsQueryParameters = ConnectionMonitorsQueryQueryParam &
  RequestParameters;

export interface ConnectionMonitorsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConnectionMonitorsListQueryParam {
  queryParameters: ConnectionMonitorsListQueryParamProperties;
}

export type ConnectionMonitorsListParameters = ConnectionMonitorsListQueryParam & RequestParameters;

export interface FlowLogsCreateOrUpdateBodyParam {
  /** Parameters that define the create or update flow log resource. */
  body: FlowLog;
}

export interface FlowLogsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FlowLogsCreateOrUpdateQueryParam {
  queryParameters: FlowLogsCreateOrUpdateQueryParamProperties;
}

export interface FlowLogsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FlowLogsCreateOrUpdateParameters = FlowLogsCreateOrUpdateQueryParam &
  FlowLogsCreateOrUpdateMediaTypesParam &
  FlowLogsCreateOrUpdateBodyParam &
  RequestParameters;

export interface FlowLogsUpdateTagsBodyParam {
  /** Parameters supplied to update flow log tags. */
  body: TagsObject;
}

export interface FlowLogsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FlowLogsUpdateTagsQueryParam {
  queryParameters: FlowLogsUpdateTagsQueryParamProperties;
}

export interface FlowLogsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FlowLogsUpdateTagsParameters = FlowLogsUpdateTagsQueryParam &
  FlowLogsUpdateTagsMediaTypesParam &
  FlowLogsUpdateTagsBodyParam &
  RequestParameters;

export interface FlowLogsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FlowLogsGetQueryParam {
  queryParameters: FlowLogsGetQueryParamProperties;
}

export type FlowLogsGetParameters = FlowLogsGetQueryParam & RequestParameters;

export interface FlowLogsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FlowLogsDeleteQueryParam {
  queryParameters: FlowLogsDeleteQueryParamProperties;
}

export type FlowLogsDeleteParameters = FlowLogsDeleteQueryParam & RequestParameters;

export interface FlowLogsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface FlowLogsListQueryParam {
  queryParameters: FlowLogsListQueryParamProperties;
}

export type FlowLogsListParameters = FlowLogsListQueryParam & RequestParameters;

export interface OperationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface OperationsListQueryParam {
  queryParameters: OperationsListQueryParamProperties;
}

export type OperationsListParameters = OperationsListQueryParam & RequestParameters;

export interface PrivateEndpointsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateEndpointsDeleteQueryParam {
  queryParameters: PrivateEndpointsDeleteQueryParamProperties;
}

export type PrivateEndpointsDeleteParameters = PrivateEndpointsDeleteQueryParam & RequestParameters;

export interface PrivateEndpointsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface PrivateEndpointsGetQueryParam {
  queryParameters: PrivateEndpointsGetQueryParamProperties;
}

export type PrivateEndpointsGetParameters = PrivateEndpointsGetQueryParam & RequestParameters;

export interface PrivateEndpointsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update private endpoint operation. */
  body: PrivateEndpoint;
}

export interface PrivateEndpointsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateEndpointsCreateOrUpdateQueryParam {
  queryParameters: PrivateEndpointsCreateOrUpdateQueryParamProperties;
}

export interface PrivateEndpointsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PrivateEndpointsCreateOrUpdateParameters = PrivateEndpointsCreateOrUpdateQueryParam &
  PrivateEndpointsCreateOrUpdateMediaTypesParam &
  PrivateEndpointsCreateOrUpdateBodyParam &
  RequestParameters;

export interface PrivateEndpointsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateEndpointsListQueryParam {
  queryParameters: PrivateEndpointsListQueryParamProperties;
}

export type PrivateEndpointsListParameters = PrivateEndpointsListQueryParam & RequestParameters;

export interface PrivateEndpointsListBySubscriptionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateEndpointsListBySubscriptionQueryParam {
  queryParameters: PrivateEndpointsListBySubscriptionQueryParamProperties;
}

export type PrivateEndpointsListBySubscriptionParameters =
  PrivateEndpointsListBySubscriptionQueryParam & RequestParameters;

export interface AvailablePrivateEndpointTypesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AvailablePrivateEndpointTypesListQueryParam {
  queryParameters: AvailablePrivateEndpointTypesListQueryParamProperties;
}

export type AvailablePrivateEndpointTypesListParameters =
  AvailablePrivateEndpointTypesListQueryParam & RequestParameters;

export interface AvailablePrivateEndpointTypesListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface AvailablePrivateEndpointTypesListByResourceGroupQueryParam {
  queryParameters: AvailablePrivateEndpointTypesListByResourceGroupQueryParamProperties;
}

export type AvailablePrivateEndpointTypesListByResourceGroupParameters =
  AvailablePrivateEndpointTypesListByResourceGroupQueryParam & RequestParameters;

export interface PrivateDnsZoneGroupsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateDnsZoneGroupsDeleteQueryParam {
  queryParameters: PrivateDnsZoneGroupsDeleteQueryParamProperties;
}

export type PrivateDnsZoneGroupsDeleteParameters = PrivateDnsZoneGroupsDeleteQueryParam &
  RequestParameters;

export interface PrivateDnsZoneGroupsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateDnsZoneGroupsGetQueryParam {
  queryParameters: PrivateDnsZoneGroupsGetQueryParamProperties;
}

export type PrivateDnsZoneGroupsGetParameters = PrivateDnsZoneGroupsGetQueryParam &
  RequestParameters;

export interface PrivateDnsZoneGroupsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update private dns zone group operation. */
  body: PrivateDnsZoneGroup;
}

export interface PrivateDnsZoneGroupsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateDnsZoneGroupsCreateOrUpdateQueryParam {
  queryParameters: PrivateDnsZoneGroupsCreateOrUpdateQueryParamProperties;
}

export interface PrivateDnsZoneGroupsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PrivateDnsZoneGroupsCreateOrUpdateParameters =
  PrivateDnsZoneGroupsCreateOrUpdateQueryParam &
    PrivateDnsZoneGroupsCreateOrUpdateMediaTypesParam &
    PrivateDnsZoneGroupsCreateOrUpdateBodyParam &
    RequestParameters;

export interface PrivateDnsZoneGroupsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateDnsZoneGroupsListQueryParam {
  queryParameters: PrivateDnsZoneGroupsListQueryParamProperties;
}

export type PrivateDnsZoneGroupsListParameters = PrivateDnsZoneGroupsListQueryParam &
  RequestParameters;

export interface PrivateLinkServicesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateLinkServicesDeleteQueryParam {
  queryParameters: PrivateLinkServicesDeleteQueryParamProperties;
}

export type PrivateLinkServicesDeleteParameters = PrivateLinkServicesDeleteQueryParam &
  RequestParameters;

export interface PrivateLinkServicesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface PrivateLinkServicesGetQueryParam {
  queryParameters: PrivateLinkServicesGetQueryParamProperties;
}

export type PrivateLinkServicesGetParameters = PrivateLinkServicesGetQueryParam & RequestParameters;

export interface PrivateLinkServicesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update private link service operation. */
  body: PrivateLinkService;
}

export interface PrivateLinkServicesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateLinkServicesCreateOrUpdateQueryParam {
  queryParameters: PrivateLinkServicesCreateOrUpdateQueryParamProperties;
}

export interface PrivateLinkServicesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PrivateLinkServicesCreateOrUpdateParameters =
  PrivateLinkServicesCreateOrUpdateQueryParam &
    PrivateLinkServicesCreateOrUpdateMediaTypesParam &
    PrivateLinkServicesCreateOrUpdateBodyParam &
    RequestParameters;

export interface PrivateLinkServicesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateLinkServicesListQueryParam {
  queryParameters: PrivateLinkServicesListQueryParamProperties;
}

export type PrivateLinkServicesListParameters = PrivateLinkServicesListQueryParam &
  RequestParameters;

export interface PrivateLinkServicesListBySubscriptionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateLinkServicesListBySubscriptionQueryParam {
  queryParameters: PrivateLinkServicesListBySubscriptionQueryParamProperties;
}

export type PrivateLinkServicesListBySubscriptionParameters =
  PrivateLinkServicesListBySubscriptionQueryParam & RequestParameters;

export interface PrivateLinkServicesGetPrivateEndpointConnectionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface PrivateLinkServicesGetPrivateEndpointConnectionQueryParam {
  queryParameters: PrivateLinkServicesGetPrivateEndpointConnectionQueryParamProperties;
}

export type PrivateLinkServicesGetPrivateEndpointConnectionParameters =
  PrivateLinkServicesGetPrivateEndpointConnectionQueryParam & RequestParameters;

export interface PrivateLinkServicesUpdatePrivateEndpointConnectionBodyParam {
  /** Parameters supplied to approve or reject the private end point connection. */
  body: PrivateEndpointConnection;
}

export interface PrivateLinkServicesUpdatePrivateEndpointConnectionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateLinkServicesUpdatePrivateEndpointConnectionQueryParam {
  queryParameters: PrivateLinkServicesUpdatePrivateEndpointConnectionQueryParamProperties;
}

export interface PrivateLinkServicesUpdatePrivateEndpointConnectionMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PrivateLinkServicesUpdatePrivateEndpointConnectionParameters =
  PrivateLinkServicesUpdatePrivateEndpointConnectionQueryParam &
    PrivateLinkServicesUpdatePrivateEndpointConnectionMediaTypesParam &
    PrivateLinkServicesUpdatePrivateEndpointConnectionBodyParam &
    RequestParameters;

export interface PrivateLinkServicesDeletePrivateEndpointConnectionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateLinkServicesDeletePrivateEndpointConnectionQueryParam {
  queryParameters: PrivateLinkServicesDeletePrivateEndpointConnectionQueryParamProperties;
}

export type PrivateLinkServicesDeletePrivateEndpointConnectionParameters =
  PrivateLinkServicesDeletePrivateEndpointConnectionQueryParam & RequestParameters;

export interface PrivateLinkServicesListPrivateEndpointConnectionsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateLinkServicesListPrivateEndpointConnectionsQueryParam {
  queryParameters: PrivateLinkServicesListPrivateEndpointConnectionsQueryParamProperties;
}

export type PrivateLinkServicesListPrivateEndpointConnectionsParameters =
  PrivateLinkServicesListPrivateEndpointConnectionsQueryParam & RequestParameters;

export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityBodyParam {
  /** The request body of CheckPrivateLinkService API call. */
  body: CheckPrivateLinkServiceVisibilityRequest;
}

export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityQueryParam {
  queryParameters: PrivateLinkServicesCheckPrivateLinkServiceVisibilityQueryParamProperties;
}

export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PrivateLinkServicesCheckPrivateLinkServiceVisibilityParameters =
  PrivateLinkServicesCheckPrivateLinkServiceVisibilityQueryParam &
    PrivateLinkServicesCheckPrivateLinkServiceVisibilityMediaTypesParam &
    PrivateLinkServicesCheckPrivateLinkServiceVisibilityBodyParam &
    RequestParameters;

export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupBodyParam {
  /** The request body of CheckPrivateLinkService API call. */
  body: CheckPrivateLinkServiceVisibilityRequest;
}

export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupQueryParam {
  queryParameters: PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupQueryParamProperties;
}

export interface PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupParameters =
  PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupQueryParam &
    PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupMediaTypesParam &
    PrivateLinkServicesCheckPrivateLinkServiceVisibilityByResourceGroupBodyParam &
    RequestParameters;

export interface PrivateLinkServicesListAutoApprovedPrivateLinkServicesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateLinkServicesListAutoApprovedPrivateLinkServicesQueryParam {
  queryParameters: PrivateLinkServicesListAutoApprovedPrivateLinkServicesQueryParamProperties;
}

export type PrivateLinkServicesListAutoApprovedPrivateLinkServicesParameters =
  PrivateLinkServicesListAutoApprovedPrivateLinkServicesQueryParam & RequestParameters;

export interface PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupQueryParam {
  queryParameters: PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupQueryParamProperties;
}

export type PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupParameters =
  PrivateLinkServicesListAutoApprovedPrivateLinkServicesByResourceGroupQueryParam &
    RequestParameters;

export interface PublicIPPrefixesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPPrefixesDeleteQueryParam {
  queryParameters: PublicIPPrefixesDeleteQueryParamProperties;
}

export type PublicIPPrefixesDeleteParameters = PublicIPPrefixesDeleteQueryParam & RequestParameters;

export interface PublicIPPrefixesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface PublicIPPrefixesGetQueryParam {
  queryParameters: PublicIPPrefixesGetQueryParamProperties;
}

export type PublicIPPrefixesGetParameters = PublicIPPrefixesGetQueryParam & RequestParameters;

export interface PublicIPPrefixesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update public IP prefix operation. */
  body: PublicIPPrefix;
}

export interface PublicIPPrefixesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPPrefixesCreateOrUpdateQueryParam {
  queryParameters: PublicIPPrefixesCreateOrUpdateQueryParamProperties;
}

export interface PublicIPPrefixesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PublicIPPrefixesCreateOrUpdateParameters = PublicIPPrefixesCreateOrUpdateQueryParam &
  PublicIPPrefixesCreateOrUpdateMediaTypesParam &
  PublicIPPrefixesCreateOrUpdateBodyParam &
  RequestParameters;

export interface PublicIPPrefixesUpdateTagsBodyParam {
  /** Parameters supplied to update public IP prefix tags. */
  body: TagsObject;
}

export interface PublicIPPrefixesUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPPrefixesUpdateTagsQueryParam {
  queryParameters: PublicIPPrefixesUpdateTagsQueryParamProperties;
}

export interface PublicIPPrefixesUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type PublicIPPrefixesUpdateTagsParameters = PublicIPPrefixesUpdateTagsQueryParam &
  PublicIPPrefixesUpdateTagsMediaTypesParam &
  PublicIPPrefixesUpdateTagsBodyParam &
  RequestParameters;

export interface PublicIPPrefixesListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPPrefixesListAllQueryParam {
  queryParameters: PublicIPPrefixesListAllQueryParamProperties;
}

export type PublicIPPrefixesListAllParameters = PublicIPPrefixesListAllQueryParam &
  RequestParameters;

export interface PublicIPPrefixesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface PublicIPPrefixesListQueryParam {
  queryParameters: PublicIPPrefixesListQueryParamProperties;
}

export type PublicIPPrefixesListParameters = PublicIPPrefixesListQueryParam & RequestParameters;

export interface RouteFiltersDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteFiltersDeleteQueryParam {
  queryParameters: RouteFiltersDeleteQueryParamProperties;
}

export type RouteFiltersDeleteParameters = RouteFiltersDeleteQueryParam & RequestParameters;

export interface RouteFiltersGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced express route bgp peering resources. */
  $expand?: string;
}

export interface RouteFiltersGetQueryParam {
  queryParameters: RouteFiltersGetQueryParamProperties;
}

export type RouteFiltersGetParameters = RouteFiltersGetQueryParam & RequestParameters;

export interface RouteFiltersCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update route filter operation. */
  body: RouteFilter;
}

export interface RouteFiltersCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteFiltersCreateOrUpdateQueryParam {
  queryParameters: RouteFiltersCreateOrUpdateQueryParamProperties;
}

export interface RouteFiltersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RouteFiltersCreateOrUpdateParameters = RouteFiltersCreateOrUpdateQueryParam &
  RouteFiltersCreateOrUpdateMediaTypesParam &
  RouteFiltersCreateOrUpdateBodyParam &
  RequestParameters;

export interface RouteFiltersUpdateTagsBodyParam {
  /** Parameters supplied to update route filter tags. */
  body: TagsObject;
}

export interface RouteFiltersUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteFiltersUpdateTagsQueryParam {
  queryParameters: RouteFiltersUpdateTagsQueryParamProperties;
}

export interface RouteFiltersUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RouteFiltersUpdateTagsParameters = RouteFiltersUpdateTagsQueryParam &
  RouteFiltersUpdateTagsMediaTypesParam &
  RouteFiltersUpdateTagsBodyParam &
  RequestParameters;

export interface RouteFiltersListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteFiltersListByResourceGroupQueryParam {
  queryParameters: RouteFiltersListByResourceGroupQueryParamProperties;
}

export type RouteFiltersListByResourceGroupParameters = RouteFiltersListByResourceGroupQueryParam &
  RequestParameters;

export interface RouteFiltersListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteFiltersListQueryParam {
  queryParameters: RouteFiltersListQueryParamProperties;
}

export type RouteFiltersListParameters = RouteFiltersListQueryParam & RequestParameters;

export interface RouteFilterRulesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteFilterRulesDeleteQueryParam {
  queryParameters: RouteFilterRulesDeleteQueryParamProperties;
}

export type RouteFilterRulesDeleteParameters = RouteFilterRulesDeleteQueryParam & RequestParameters;

export interface RouteFilterRulesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteFilterRulesGetQueryParam {
  queryParameters: RouteFilterRulesGetQueryParamProperties;
}

export type RouteFilterRulesGetParameters = RouteFilterRulesGetQueryParam & RequestParameters;

export interface RouteFilterRulesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update route filter rule operation. */
  body: RouteFilterRule;
}

export interface RouteFilterRulesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteFilterRulesCreateOrUpdateQueryParam {
  queryParameters: RouteFilterRulesCreateOrUpdateQueryParamProperties;
}

export interface RouteFilterRulesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RouteFilterRulesCreateOrUpdateParameters = RouteFilterRulesCreateOrUpdateQueryParam &
  RouteFilterRulesCreateOrUpdateMediaTypesParam &
  RouteFilterRulesCreateOrUpdateBodyParam &
  RequestParameters;

export interface RouteFilterRulesListByRouteFilterQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteFilterRulesListByRouteFilterQueryParam {
  queryParameters: RouteFilterRulesListByRouteFilterQueryParamProperties;
}

export type RouteFilterRulesListByRouteFilterParameters =
  RouteFilterRulesListByRouteFilterQueryParam & RequestParameters;

export interface RouteTablesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteTablesDeleteQueryParam {
  queryParameters: RouteTablesDeleteQueryParamProperties;
}

export type RouteTablesDeleteParameters = RouteTablesDeleteQueryParam & RequestParameters;

export interface RouteTablesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface RouteTablesGetQueryParam {
  queryParameters: RouteTablesGetQueryParamProperties;
}

export type RouteTablesGetParameters = RouteTablesGetQueryParam & RequestParameters;

export interface RouteTablesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update route table operation. */
  body: RouteTable;
}

export interface RouteTablesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteTablesCreateOrUpdateQueryParam {
  queryParameters: RouteTablesCreateOrUpdateQueryParamProperties;
}

export interface RouteTablesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RouteTablesCreateOrUpdateParameters = RouteTablesCreateOrUpdateQueryParam &
  RouteTablesCreateOrUpdateMediaTypesParam &
  RouteTablesCreateOrUpdateBodyParam &
  RequestParameters;

export interface RouteTablesUpdateTagsBodyParam {
  /** Parameters supplied to update route table tags. */
  body: TagsObject;
}

export interface RouteTablesUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteTablesUpdateTagsQueryParam {
  queryParameters: RouteTablesUpdateTagsQueryParamProperties;
}

export interface RouteTablesUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RouteTablesUpdateTagsParameters = RouteTablesUpdateTagsQueryParam &
  RouteTablesUpdateTagsMediaTypesParam &
  RouteTablesUpdateTagsBodyParam &
  RequestParameters;

export interface RouteTablesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteTablesListQueryParam {
  queryParameters: RouteTablesListQueryParamProperties;
}

export type RouteTablesListParameters = RouteTablesListQueryParam & RequestParameters;

export interface RouteTablesListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteTablesListAllQueryParam {
  queryParameters: RouteTablesListAllQueryParamProperties;
}

export type RouteTablesListAllParameters = RouteTablesListAllQueryParam & RequestParameters;

export interface RoutesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RoutesDeleteQueryParam {
  queryParameters: RoutesDeleteQueryParamProperties;
}

export type RoutesDeleteParameters = RoutesDeleteQueryParam & RequestParameters;

export interface RoutesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RoutesGetQueryParam {
  queryParameters: RoutesGetQueryParamProperties;
}

export type RoutesGetParameters = RoutesGetQueryParam & RequestParameters;

export interface RoutesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update route operation. */
  body: Route;
}

export interface RoutesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RoutesCreateOrUpdateQueryParam {
  queryParameters: RoutesCreateOrUpdateQueryParamProperties;
}

export interface RoutesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RoutesCreateOrUpdateParameters = RoutesCreateOrUpdateQueryParam &
  RoutesCreateOrUpdateMediaTypesParam &
  RoutesCreateOrUpdateBodyParam &
  RequestParameters;

export interface RoutesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RoutesListQueryParam {
  queryParameters: RoutesListQueryParamProperties;
}

export type RoutesListParameters = RoutesListQueryParam & RequestParameters;

export interface SecurityPartnerProvidersDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityPartnerProvidersDeleteQueryParam {
  queryParameters: SecurityPartnerProvidersDeleteQueryParamProperties;
}

export type SecurityPartnerProvidersDeleteParameters = SecurityPartnerProvidersDeleteQueryParam &
  RequestParameters;

export interface SecurityPartnerProvidersGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityPartnerProvidersGetQueryParam {
  queryParameters: SecurityPartnerProvidersGetQueryParamProperties;
}

export type SecurityPartnerProvidersGetParameters = SecurityPartnerProvidersGetQueryParam &
  RequestParameters;

export interface SecurityPartnerProvidersCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update Security Partner Provider operation. */
  body: SecurityPartnerProvider;
}

export interface SecurityPartnerProvidersCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityPartnerProvidersCreateOrUpdateQueryParam {
  queryParameters: SecurityPartnerProvidersCreateOrUpdateQueryParamProperties;
}

export interface SecurityPartnerProvidersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SecurityPartnerProvidersCreateOrUpdateParameters =
  SecurityPartnerProvidersCreateOrUpdateQueryParam &
    SecurityPartnerProvidersCreateOrUpdateMediaTypesParam &
    SecurityPartnerProvidersCreateOrUpdateBodyParam &
    RequestParameters;

export interface SecurityPartnerProvidersUpdateTagsBodyParam {
  /** Parameters supplied to update Security Partner Provider tags. */
  body: TagsObject;
}

export interface SecurityPartnerProvidersUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityPartnerProvidersUpdateTagsQueryParam {
  queryParameters: SecurityPartnerProvidersUpdateTagsQueryParamProperties;
}

export interface SecurityPartnerProvidersUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SecurityPartnerProvidersUpdateTagsParameters =
  SecurityPartnerProvidersUpdateTagsQueryParam &
    SecurityPartnerProvidersUpdateTagsMediaTypesParam &
    SecurityPartnerProvidersUpdateTagsBodyParam &
    RequestParameters;

export interface SecurityPartnerProvidersListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityPartnerProvidersListByResourceGroupQueryParam {
  queryParameters: SecurityPartnerProvidersListByResourceGroupQueryParamProperties;
}

export type SecurityPartnerProvidersListByResourceGroupParameters =
  SecurityPartnerProvidersListByResourceGroupQueryParam & RequestParameters;

export interface SecurityPartnerProvidersListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SecurityPartnerProvidersListQueryParam {
  queryParameters: SecurityPartnerProvidersListQueryParamProperties;
}

export type SecurityPartnerProvidersListParameters = SecurityPartnerProvidersListQueryParam &
  RequestParameters;

export interface BgpServiceCommunitiesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface BgpServiceCommunitiesListQueryParam {
  queryParameters: BgpServiceCommunitiesListQueryParamProperties;
}

export type BgpServiceCommunitiesListParameters = BgpServiceCommunitiesListQueryParam &
  RequestParameters;

export interface ServiceEndpointPoliciesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ServiceEndpointPoliciesDeleteQueryParam {
  queryParameters: ServiceEndpointPoliciesDeleteQueryParamProperties;
}

export type ServiceEndpointPoliciesDeleteParameters = ServiceEndpointPoliciesDeleteQueryParam &
  RequestParameters;

export interface ServiceEndpointPoliciesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface ServiceEndpointPoliciesGetQueryParam {
  queryParameters: ServiceEndpointPoliciesGetQueryParamProperties;
}

export type ServiceEndpointPoliciesGetParameters = ServiceEndpointPoliciesGetQueryParam &
  RequestParameters;

export interface ServiceEndpointPoliciesCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update service endpoint policy operation. */
  body: ServiceEndpointPolicy;
}

export interface ServiceEndpointPoliciesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ServiceEndpointPoliciesCreateOrUpdateQueryParam {
  queryParameters: ServiceEndpointPoliciesCreateOrUpdateQueryParamProperties;
}

export interface ServiceEndpointPoliciesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ServiceEndpointPoliciesCreateOrUpdateParameters =
  ServiceEndpointPoliciesCreateOrUpdateQueryParam &
    ServiceEndpointPoliciesCreateOrUpdateMediaTypesParam &
    ServiceEndpointPoliciesCreateOrUpdateBodyParam &
    RequestParameters;

export interface ServiceEndpointPoliciesUpdateTagsBodyParam {
  /** Parameters supplied to update service endpoint policy tags. */
  body: TagsObject;
}

export interface ServiceEndpointPoliciesUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ServiceEndpointPoliciesUpdateTagsQueryParam {
  queryParameters: ServiceEndpointPoliciesUpdateTagsQueryParamProperties;
}

export interface ServiceEndpointPoliciesUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ServiceEndpointPoliciesUpdateTagsParameters =
  ServiceEndpointPoliciesUpdateTagsQueryParam &
    ServiceEndpointPoliciesUpdateTagsMediaTypesParam &
    ServiceEndpointPoliciesUpdateTagsBodyParam &
    RequestParameters;

export interface ServiceEndpointPoliciesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ServiceEndpointPoliciesListQueryParam {
  queryParameters: ServiceEndpointPoliciesListQueryParamProperties;
}

export type ServiceEndpointPoliciesListParameters = ServiceEndpointPoliciesListQueryParam &
  RequestParameters;

export interface ServiceEndpointPoliciesListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ServiceEndpointPoliciesListByResourceGroupQueryParam {
  queryParameters: ServiceEndpointPoliciesListByResourceGroupQueryParamProperties;
}

export type ServiceEndpointPoliciesListByResourceGroupParameters =
  ServiceEndpointPoliciesListByResourceGroupQueryParam & RequestParameters;

export interface ServiceEndpointPolicyDefinitionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ServiceEndpointPolicyDefinitionsDeleteQueryParam {
  queryParameters: ServiceEndpointPolicyDefinitionsDeleteQueryParamProperties;
}

export type ServiceEndpointPolicyDefinitionsDeleteParameters =
  ServiceEndpointPolicyDefinitionsDeleteQueryParam & RequestParameters;

export interface ServiceEndpointPolicyDefinitionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ServiceEndpointPolicyDefinitionsGetQueryParam {
  queryParameters: ServiceEndpointPolicyDefinitionsGetQueryParamProperties;
}

export type ServiceEndpointPolicyDefinitionsGetParameters =
  ServiceEndpointPolicyDefinitionsGetQueryParam & RequestParameters;

export interface ServiceEndpointPolicyDefinitionsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update service endpoint policy operation. */
  body: ServiceEndpointPolicyDefinition;
}

export interface ServiceEndpointPolicyDefinitionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ServiceEndpointPolicyDefinitionsCreateOrUpdateQueryParam {
  queryParameters: ServiceEndpointPolicyDefinitionsCreateOrUpdateQueryParamProperties;
}

export interface ServiceEndpointPolicyDefinitionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ServiceEndpointPolicyDefinitionsCreateOrUpdateParameters =
  ServiceEndpointPolicyDefinitionsCreateOrUpdateQueryParam &
    ServiceEndpointPolicyDefinitionsCreateOrUpdateMediaTypesParam &
    ServiceEndpointPolicyDefinitionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ServiceEndpointPolicyDefinitionsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ServiceEndpointPolicyDefinitionsListByResourceGroupQueryParam {
  queryParameters: ServiceEndpointPolicyDefinitionsListByResourceGroupQueryParamProperties;
}

export type ServiceEndpointPolicyDefinitionsListByResourceGroupParameters =
  ServiceEndpointPolicyDefinitionsListByResourceGroupQueryParam & RequestParameters;

export interface ServiceTagsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ServiceTagsListQueryParam {
  queryParameters: ServiceTagsListQueryParamProperties;
}

export type ServiceTagsListParameters = ServiceTagsListQueryParam & RequestParameters;

export interface ServiceTagInformationListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Do not return address prefixes for the tag(s). */
  noAddressPrefixes?: boolean;
  /** Return tag information for a particular tag. */
  tagName?: string;
}

export interface ServiceTagInformationListQueryParam {
  queryParameters: ServiceTagInformationListQueryParamProperties;
}

export type ServiceTagInformationListParameters = ServiceTagInformationListQueryParam &
  RequestParameters;

export interface UsagesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface UsagesListQueryParam {
  queryParameters: UsagesListQueryParamProperties;
}

export type UsagesListParameters = UsagesListQueryParam & RequestParameters;

export interface VirtualNetworksDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworksDeleteQueryParam {
  queryParameters: VirtualNetworksDeleteQueryParamProperties;
}

export type VirtualNetworksDeleteParameters = VirtualNetworksDeleteQueryParam & RequestParameters;

export interface VirtualNetworksGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface VirtualNetworksGetQueryParam {
  queryParameters: VirtualNetworksGetQueryParamProperties;
}

export type VirtualNetworksGetParameters = VirtualNetworksGetQueryParam & RequestParameters;

export interface VirtualNetworksCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update virtual network operation. */
  body: VirtualNetwork;
}

export interface VirtualNetworksCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworksCreateOrUpdateQueryParam {
  queryParameters: VirtualNetworksCreateOrUpdateQueryParamProperties;
}

export interface VirtualNetworksCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworksCreateOrUpdateParameters = VirtualNetworksCreateOrUpdateQueryParam &
  VirtualNetworksCreateOrUpdateMediaTypesParam &
  VirtualNetworksCreateOrUpdateBodyParam &
  RequestParameters;

export interface VirtualNetworksUpdateTagsBodyParam {
  /** Parameters supplied to update virtual network tags. */
  body: TagsObject;
}

export interface VirtualNetworksUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworksUpdateTagsQueryParam {
  queryParameters: VirtualNetworksUpdateTagsQueryParamProperties;
}

export interface VirtualNetworksUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworksUpdateTagsParameters = VirtualNetworksUpdateTagsQueryParam &
  VirtualNetworksUpdateTagsMediaTypesParam &
  VirtualNetworksUpdateTagsBodyParam &
  RequestParameters;

export interface VirtualNetworksListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworksListAllQueryParam {
  queryParameters: VirtualNetworksListAllQueryParamProperties;
}

export type VirtualNetworksListAllParameters = VirtualNetworksListAllQueryParam & RequestParameters;

export interface VirtualNetworksListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworksListQueryParam {
  queryParameters: VirtualNetworksListQueryParamProperties;
}

export type VirtualNetworksListParameters = VirtualNetworksListQueryParam & RequestParameters;

export interface VirtualNetworksCheckIPAddressAvailabilityQueryParamProperties {
  /** The private IP address to be verified. */
  ipAddress: string;
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworksCheckIPAddressAvailabilityQueryParam {
  queryParameters: VirtualNetworksCheckIPAddressAvailabilityQueryParamProperties;
}

export type VirtualNetworksCheckIPAddressAvailabilityParameters =
  VirtualNetworksCheckIPAddressAvailabilityQueryParam & RequestParameters;

export interface VirtualNetworksListUsageQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworksListUsageQueryParam {
  queryParameters: VirtualNetworksListUsageQueryParamProperties;
}

export type VirtualNetworksListUsageParameters = VirtualNetworksListUsageQueryParam &
  RequestParameters;

export interface VirtualNetworksListDdosProtectionStatusQueryParamProperties {
  /** The max number of ip addresses to return. */
  top?: number;
  /** The skipToken that is given with nextLink. */
  skipToken?: string;
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworksListDdosProtectionStatusQueryParam {
  queryParameters: VirtualNetworksListDdosProtectionStatusQueryParamProperties;
}

export type VirtualNetworksListDdosProtectionStatusParameters =
  VirtualNetworksListDdosProtectionStatusQueryParam & RequestParameters;

export interface SubnetsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SubnetsDeleteQueryParam {
  queryParameters: SubnetsDeleteQueryParamProperties;
}

export type SubnetsDeleteParameters = SubnetsDeleteQueryParam & RequestParameters;

export interface SubnetsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface SubnetsGetQueryParam {
  queryParameters: SubnetsGetQueryParamProperties;
}

export type SubnetsGetParameters = SubnetsGetQueryParam & RequestParameters;

export interface SubnetsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update subnet operation. */
  body: Subnet;
}

export interface SubnetsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SubnetsCreateOrUpdateQueryParam {
  queryParameters: SubnetsCreateOrUpdateQueryParamProperties;
}

export interface SubnetsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SubnetsCreateOrUpdateParameters = SubnetsCreateOrUpdateQueryParam &
  SubnetsCreateOrUpdateMediaTypesParam &
  SubnetsCreateOrUpdateBodyParam &
  RequestParameters;

export interface SubnetsPrepareNetworkPoliciesBodyParam {
  /** Parameters supplied to prepare subnet by applying network intent policies. */
  body: PrepareNetworkPoliciesRequest;
}

export interface SubnetsPrepareNetworkPoliciesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SubnetsPrepareNetworkPoliciesQueryParam {
  queryParameters: SubnetsPrepareNetworkPoliciesQueryParamProperties;
}

export interface SubnetsPrepareNetworkPoliciesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SubnetsPrepareNetworkPoliciesParameters = SubnetsPrepareNetworkPoliciesQueryParam &
  SubnetsPrepareNetworkPoliciesMediaTypesParam &
  SubnetsPrepareNetworkPoliciesBodyParam &
  RequestParameters;

export interface SubnetsUnprepareNetworkPoliciesBodyParam {
  /** Parameters supplied to unprepare subnet to remove network intent policies. */
  body: UnprepareNetworkPoliciesRequest;
}

export interface SubnetsUnprepareNetworkPoliciesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SubnetsUnprepareNetworkPoliciesQueryParam {
  queryParameters: SubnetsUnprepareNetworkPoliciesQueryParamProperties;
}

export interface SubnetsUnprepareNetworkPoliciesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type SubnetsUnprepareNetworkPoliciesParameters = SubnetsUnprepareNetworkPoliciesQueryParam &
  SubnetsUnprepareNetworkPoliciesMediaTypesParam &
  SubnetsUnprepareNetworkPoliciesBodyParam &
  RequestParameters;

export interface SubnetsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface SubnetsListQueryParam {
  queryParameters: SubnetsListQueryParamProperties;
}

export type SubnetsListParameters = SubnetsListQueryParam & RequestParameters;

export interface ResourceNavigationLinksListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ResourceNavigationLinksListQueryParam {
  queryParameters: ResourceNavigationLinksListQueryParamProperties;
}

export type ResourceNavigationLinksListParameters = ResourceNavigationLinksListQueryParam &
  RequestParameters;

export interface ServiceAssociationLinksListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ServiceAssociationLinksListQueryParam {
  queryParameters: ServiceAssociationLinksListQueryParamProperties;
}

export type ServiceAssociationLinksListParameters = ServiceAssociationLinksListQueryParam &
  RequestParameters;

export interface VirtualNetworkPeeringsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkPeeringsDeleteQueryParam {
  queryParameters: VirtualNetworkPeeringsDeleteQueryParamProperties;
}

export type VirtualNetworkPeeringsDeleteParameters = VirtualNetworkPeeringsDeleteQueryParam &
  RequestParameters;

export interface VirtualNetworkPeeringsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkPeeringsGetQueryParam {
  queryParameters: VirtualNetworkPeeringsGetQueryParamProperties;
}

export type VirtualNetworkPeeringsGetParameters = VirtualNetworkPeeringsGetQueryParam &
  RequestParameters;

export interface VirtualNetworkPeeringsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update virtual network peering operation. */
  body: VirtualNetworkPeering;
}

export interface VirtualNetworkPeeringsCreateOrUpdateQueryParamProperties {
  /** Parameter indicates the intention to sync the peering with the current address space on the remote vNet after it's updated. */
  syncRemoteAddressSpace?: "true";
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkPeeringsCreateOrUpdateQueryParam {
  queryParameters: VirtualNetworkPeeringsCreateOrUpdateQueryParamProperties;
}

export interface VirtualNetworkPeeringsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkPeeringsCreateOrUpdateParameters =
  VirtualNetworkPeeringsCreateOrUpdateQueryParam &
    VirtualNetworkPeeringsCreateOrUpdateMediaTypesParam &
    VirtualNetworkPeeringsCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualNetworkPeeringsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkPeeringsListQueryParam {
  queryParameters: VirtualNetworkPeeringsListQueryParamProperties;
}

export type VirtualNetworkPeeringsListParameters = VirtualNetworkPeeringsListQueryParam &
  RequestParameters;

export interface VirtualNetworkGatewaysCreateOrUpdateBodyParam {
  /** Parameters supplied to create or update virtual network gateway operation. */
  body: VirtualNetworkGateway;
}

export interface VirtualNetworkGatewaysCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysCreateOrUpdateQueryParam {
  queryParameters: VirtualNetworkGatewaysCreateOrUpdateQueryParamProperties;
}

export interface VirtualNetworkGatewaysCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewaysCreateOrUpdateParameters =
  VirtualNetworkGatewaysCreateOrUpdateQueryParam &
    VirtualNetworkGatewaysCreateOrUpdateMediaTypesParam &
    VirtualNetworkGatewaysCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewaysGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysGetQueryParam {
  queryParameters: VirtualNetworkGatewaysGetQueryParamProperties;
}

export type VirtualNetworkGatewaysGetParameters = VirtualNetworkGatewaysGetQueryParam &
  RequestParameters;

export interface VirtualNetworkGatewaysDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysDeleteQueryParam {
  queryParameters: VirtualNetworkGatewaysDeleteQueryParamProperties;
}

export type VirtualNetworkGatewaysDeleteParameters = VirtualNetworkGatewaysDeleteQueryParam &
  RequestParameters;

export interface VirtualNetworkGatewaysUpdateTagsBodyParam {
  /** Parameters supplied to update virtual network gateway tags. */
  body: TagsObject;
}

export interface VirtualNetworkGatewaysUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysUpdateTagsQueryParam {
  queryParameters: VirtualNetworkGatewaysUpdateTagsQueryParamProperties;
}

export interface VirtualNetworkGatewaysUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewaysUpdateTagsParameters =
  VirtualNetworkGatewaysUpdateTagsQueryParam &
    VirtualNetworkGatewaysUpdateTagsMediaTypesParam &
    VirtualNetworkGatewaysUpdateTagsBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewaysListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysListQueryParam {
  queryParameters: VirtualNetworkGatewaysListQueryParamProperties;
}

export type VirtualNetworkGatewaysListParameters = VirtualNetworkGatewaysListQueryParam &
  RequestParameters;

export interface VirtualNetworkGatewaysListConnectionsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysListConnectionsQueryParam {
  queryParameters: VirtualNetworkGatewaysListConnectionsQueryParamProperties;
}

export type VirtualNetworkGatewaysListConnectionsParameters =
  VirtualNetworkGatewaysListConnectionsQueryParam & RequestParameters;

export interface VirtualNetworkGatewaysResetQueryParamProperties {
  /** Virtual network gateway vip address supplied to the begin reset of the active-active feature enabled gateway. */
  gatewayVip?: string;
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysResetQueryParam {
  queryParameters: VirtualNetworkGatewaysResetQueryParamProperties;
}

export type VirtualNetworkGatewaysResetParameters = VirtualNetworkGatewaysResetQueryParam &
  RequestParameters;

export interface VirtualNetworkGatewaysResetVpnClientSharedKeyQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysResetVpnClientSharedKeyQueryParam {
  queryParameters: VirtualNetworkGatewaysResetVpnClientSharedKeyQueryParamProperties;
}

export type VirtualNetworkGatewaysResetVpnClientSharedKeyParameters =
  VirtualNetworkGatewaysResetVpnClientSharedKeyQueryParam & RequestParameters;

export interface VirtualNetworkGatewaysGeneratevpnclientpackageBodyParam {
  /** Parameters supplied to the generate virtual network gateway VPN client package operation. */
  body: VpnClientParameters;
}

export interface VirtualNetworkGatewaysGeneratevpnclientpackageQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysGeneratevpnclientpackageQueryParam {
  queryParameters: VirtualNetworkGatewaysGeneratevpnclientpackageQueryParamProperties;
}

export interface VirtualNetworkGatewaysGeneratevpnclientpackageMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewaysGeneratevpnclientpackageParameters =
  VirtualNetworkGatewaysGeneratevpnclientpackageQueryParam &
    VirtualNetworkGatewaysGeneratevpnclientpackageMediaTypesParam &
    VirtualNetworkGatewaysGeneratevpnclientpackageBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewaysGenerateVpnProfileBodyParam {
  /** Parameters supplied to the generate virtual network gateway VPN client package operation. */
  body: VpnClientParameters;
}

export interface VirtualNetworkGatewaysGenerateVpnProfileQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysGenerateVpnProfileQueryParam {
  queryParameters: VirtualNetworkGatewaysGenerateVpnProfileQueryParamProperties;
}

export interface VirtualNetworkGatewaysGenerateVpnProfileMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewaysGenerateVpnProfileParameters =
  VirtualNetworkGatewaysGenerateVpnProfileQueryParam &
    VirtualNetworkGatewaysGenerateVpnProfileMediaTypesParam &
    VirtualNetworkGatewaysGenerateVpnProfileBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewaysGetVpnProfilePackageUrlQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysGetVpnProfilePackageUrlQueryParam {
  queryParameters: VirtualNetworkGatewaysGetVpnProfilePackageUrlQueryParamProperties;
}

export type VirtualNetworkGatewaysGetVpnProfilePackageUrlParameters =
  VirtualNetworkGatewaysGetVpnProfilePackageUrlQueryParam & RequestParameters;

export interface VirtualNetworkGatewaysGetBgpPeerStatusQueryParamProperties {
  /** The IP address of the peer to retrieve the status of. */
  peer?: string;
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysGetBgpPeerStatusQueryParam {
  queryParameters: VirtualNetworkGatewaysGetBgpPeerStatusQueryParamProperties;
}

export type VirtualNetworkGatewaysGetBgpPeerStatusParameters =
  VirtualNetworkGatewaysGetBgpPeerStatusQueryParam & RequestParameters;

export interface VirtualNetworkGatewaysSupportedVpnDevicesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysSupportedVpnDevicesQueryParam {
  queryParameters: VirtualNetworkGatewaysSupportedVpnDevicesQueryParamProperties;
}

export type VirtualNetworkGatewaysSupportedVpnDevicesParameters =
  VirtualNetworkGatewaysSupportedVpnDevicesQueryParam & RequestParameters;

export interface VirtualNetworkGatewaysGetLearnedRoutesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysGetLearnedRoutesQueryParam {
  queryParameters: VirtualNetworkGatewaysGetLearnedRoutesQueryParamProperties;
}

export type VirtualNetworkGatewaysGetLearnedRoutesParameters =
  VirtualNetworkGatewaysGetLearnedRoutesQueryParam & RequestParameters;

export interface VirtualNetworkGatewaysGetAdvertisedRoutesQueryParamProperties {
  /** The IP address of the peer. */
  peer: string;
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysGetAdvertisedRoutesQueryParam {
  queryParameters: VirtualNetworkGatewaysGetAdvertisedRoutesQueryParamProperties;
}

export type VirtualNetworkGatewaysGetAdvertisedRoutesParameters =
  VirtualNetworkGatewaysGetAdvertisedRoutesQueryParam & RequestParameters;

export interface VirtualNetworkGatewaysSetVpnclientIpsecParametersBodyParam {
  /** Parameters supplied to the Begin Set vpnclient ipsec parameters of Virtual Network Gateway P2S client operation through Network resource provider. */
  body: VpnClientIPsecParameters;
}

export interface VirtualNetworkGatewaysSetVpnclientIpsecParametersQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysSetVpnclientIpsecParametersQueryParam {
  queryParameters: VirtualNetworkGatewaysSetVpnclientIpsecParametersQueryParamProperties;
}

export interface VirtualNetworkGatewaysSetVpnclientIpsecParametersMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewaysSetVpnclientIpsecParametersParameters =
  VirtualNetworkGatewaysSetVpnclientIpsecParametersQueryParam &
    VirtualNetworkGatewaysSetVpnclientIpsecParametersMediaTypesParam &
    VirtualNetworkGatewaysSetVpnclientIpsecParametersBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewaysGetVpnclientIpsecParametersQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysGetVpnclientIpsecParametersQueryParam {
  queryParameters: VirtualNetworkGatewaysGetVpnclientIpsecParametersQueryParamProperties;
}

export type VirtualNetworkGatewaysGetVpnclientIpsecParametersParameters =
  VirtualNetworkGatewaysGetVpnclientIpsecParametersQueryParam & RequestParameters;

export interface VirtualNetworkGatewaysVpnDeviceConfigurationScriptBodyParam {
  /** Parameters supplied to the generate vpn device script operation. */
  body: VpnDeviceScriptParameters;
}

export interface VirtualNetworkGatewaysVpnDeviceConfigurationScriptQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysVpnDeviceConfigurationScriptQueryParam {
  queryParameters: VirtualNetworkGatewaysVpnDeviceConfigurationScriptQueryParamProperties;
}

export interface VirtualNetworkGatewaysVpnDeviceConfigurationScriptMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewaysVpnDeviceConfigurationScriptParameters =
  VirtualNetworkGatewaysVpnDeviceConfigurationScriptQueryParam &
    VirtualNetworkGatewaysVpnDeviceConfigurationScriptMediaTypesParam &
    VirtualNetworkGatewaysVpnDeviceConfigurationScriptBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewaysStartPacketCaptureBodyParam {
  /** Virtual network gateway packet capture parameters supplied to start packet capture on gateway. */
  body?: VpnPacketCaptureStartParameters;
}

export interface VirtualNetworkGatewaysStartPacketCaptureQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysStartPacketCaptureQueryParam {
  queryParameters: VirtualNetworkGatewaysStartPacketCaptureQueryParamProperties;
}

export interface VirtualNetworkGatewaysStartPacketCaptureMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewaysStartPacketCaptureParameters =
  VirtualNetworkGatewaysStartPacketCaptureQueryParam &
    VirtualNetworkGatewaysStartPacketCaptureMediaTypesParam &
    VirtualNetworkGatewaysStartPacketCaptureBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewaysStopPacketCaptureBodyParam {
  /** Virtual network gateway packet capture parameters supplied to stop packet capture on gateway. */
  body: VpnPacketCaptureStopParameters;
}

export interface VirtualNetworkGatewaysStopPacketCaptureQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysStopPacketCaptureQueryParam {
  queryParameters: VirtualNetworkGatewaysStopPacketCaptureQueryParamProperties;
}

export interface VirtualNetworkGatewaysStopPacketCaptureMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewaysStopPacketCaptureParameters =
  VirtualNetworkGatewaysStopPacketCaptureQueryParam &
    VirtualNetworkGatewaysStopPacketCaptureMediaTypesParam &
    VirtualNetworkGatewaysStopPacketCaptureBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewaysGetVpnclientConnectionHealthQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysGetVpnclientConnectionHealthQueryParam {
  queryParameters: VirtualNetworkGatewaysGetVpnclientConnectionHealthQueryParamProperties;
}

export type VirtualNetworkGatewaysGetVpnclientConnectionHealthParameters =
  VirtualNetworkGatewaysGetVpnclientConnectionHealthQueryParam & RequestParameters;

export interface VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsBodyParam {
  /** The parameters are supplied to disconnect vpn connections. */
  body: P2SVpnConnectionRequest;
}

export interface VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsQueryParam {
  queryParameters: VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsQueryParamProperties;
}

export interface VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsParameters =
  VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsQueryParam &
    VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsMediaTypesParam &
    VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewayConnectionsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update virtual network gateway connection operation. */
  body: VirtualNetworkGatewayConnection;
}

export interface VirtualNetworkGatewayConnectionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsCreateOrUpdateQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsCreateOrUpdateQueryParamProperties;
}

export interface VirtualNetworkGatewayConnectionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewayConnectionsCreateOrUpdateParameters =
  VirtualNetworkGatewayConnectionsCreateOrUpdateQueryParam &
    VirtualNetworkGatewayConnectionsCreateOrUpdateMediaTypesParam &
    VirtualNetworkGatewayConnectionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewayConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsGetQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsGetQueryParamProperties;
}

export type VirtualNetworkGatewayConnectionsGetParameters =
  VirtualNetworkGatewayConnectionsGetQueryParam & RequestParameters;

export interface VirtualNetworkGatewayConnectionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsDeleteQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsDeleteQueryParamProperties;
}

export type VirtualNetworkGatewayConnectionsDeleteParameters =
  VirtualNetworkGatewayConnectionsDeleteQueryParam & RequestParameters;

export interface VirtualNetworkGatewayConnectionsUpdateTagsBodyParam {
  /** Parameters supplied to update virtual network gateway connection tags. */
  body: TagsObject;
}

export interface VirtualNetworkGatewayConnectionsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsUpdateTagsQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsUpdateTagsQueryParamProperties;
}

export interface VirtualNetworkGatewayConnectionsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewayConnectionsUpdateTagsParameters =
  VirtualNetworkGatewayConnectionsUpdateTagsQueryParam &
    VirtualNetworkGatewayConnectionsUpdateTagsMediaTypesParam &
    VirtualNetworkGatewayConnectionsUpdateTagsBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewayConnectionsSetSharedKeyBodyParam {
  /** Parameters supplied to the Begin Set Virtual Network Gateway connection Shared key operation throughNetwork resource provider. */
  body: ConnectionSharedKey;
}

export interface VirtualNetworkGatewayConnectionsSetSharedKeyQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsSetSharedKeyQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsSetSharedKeyQueryParamProperties;
}

export interface VirtualNetworkGatewayConnectionsSetSharedKeyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewayConnectionsSetSharedKeyParameters =
  VirtualNetworkGatewayConnectionsSetSharedKeyQueryParam &
    VirtualNetworkGatewayConnectionsSetSharedKeyMediaTypesParam &
    VirtualNetworkGatewayConnectionsSetSharedKeyBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewayConnectionsGetSharedKeyQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsGetSharedKeyQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsGetSharedKeyQueryParamProperties;
}

export type VirtualNetworkGatewayConnectionsGetSharedKeyParameters =
  VirtualNetworkGatewayConnectionsGetSharedKeyQueryParam & RequestParameters;

export interface VirtualNetworkGatewayConnectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsListQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsListQueryParamProperties;
}

export type VirtualNetworkGatewayConnectionsListParameters =
  VirtualNetworkGatewayConnectionsListQueryParam & RequestParameters;

export interface VirtualNetworkGatewayConnectionsResetSharedKeyBodyParam {
  /** Parameters supplied to the begin reset virtual network gateway connection shared key operation through network resource provider. */
  body: ConnectionResetSharedKey;
}

export interface VirtualNetworkGatewayConnectionsResetSharedKeyQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsResetSharedKeyQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsResetSharedKeyQueryParamProperties;
}

export interface VirtualNetworkGatewayConnectionsResetSharedKeyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewayConnectionsResetSharedKeyParameters =
  VirtualNetworkGatewayConnectionsResetSharedKeyQueryParam &
    VirtualNetworkGatewayConnectionsResetSharedKeyMediaTypesParam &
    VirtualNetworkGatewayConnectionsResetSharedKeyBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewayConnectionsStartPacketCaptureBodyParam {
  /** Virtual network gateway packet capture parameters supplied to start packet capture on gateway connection. */
  body?: VpnPacketCaptureStartParameters;
}

export interface VirtualNetworkGatewayConnectionsStartPacketCaptureQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsStartPacketCaptureQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsStartPacketCaptureQueryParamProperties;
}

export interface VirtualNetworkGatewayConnectionsStartPacketCaptureMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewayConnectionsStartPacketCaptureParameters =
  VirtualNetworkGatewayConnectionsStartPacketCaptureQueryParam &
    VirtualNetworkGatewayConnectionsStartPacketCaptureMediaTypesParam &
    VirtualNetworkGatewayConnectionsStartPacketCaptureBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewayConnectionsStopPacketCaptureBodyParam {
  /** Virtual network gateway packet capture parameters supplied to stop packet capture on gateway connection. */
  body: VpnPacketCaptureStopParameters;
}

export interface VirtualNetworkGatewayConnectionsStopPacketCaptureQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsStopPacketCaptureQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsStopPacketCaptureQueryParamProperties;
}

export interface VirtualNetworkGatewayConnectionsStopPacketCaptureMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewayConnectionsStopPacketCaptureParameters =
  VirtualNetworkGatewayConnectionsStopPacketCaptureQueryParam &
    VirtualNetworkGatewayConnectionsStopPacketCaptureMediaTypesParam &
    VirtualNetworkGatewayConnectionsStopPacketCaptureBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewayConnectionsGetIkeSasQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsGetIkeSasQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsGetIkeSasQueryParamProperties;
}

export type VirtualNetworkGatewayConnectionsGetIkeSasParameters =
  VirtualNetworkGatewayConnectionsGetIkeSasQueryParam & RequestParameters;

export interface VirtualNetworkGatewayConnectionsResetConnectionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayConnectionsResetConnectionQueryParam {
  queryParameters: VirtualNetworkGatewayConnectionsResetConnectionQueryParamProperties;
}

export type VirtualNetworkGatewayConnectionsResetConnectionParameters =
  VirtualNetworkGatewayConnectionsResetConnectionQueryParam & RequestParameters;

export interface LocalNetworkGatewaysCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update local network gateway operation. */
  body: LocalNetworkGateway;
}

export interface LocalNetworkGatewaysCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LocalNetworkGatewaysCreateOrUpdateQueryParam {
  queryParameters: LocalNetworkGatewaysCreateOrUpdateQueryParamProperties;
}

export interface LocalNetworkGatewaysCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type LocalNetworkGatewaysCreateOrUpdateParameters =
  LocalNetworkGatewaysCreateOrUpdateQueryParam &
    LocalNetworkGatewaysCreateOrUpdateMediaTypesParam &
    LocalNetworkGatewaysCreateOrUpdateBodyParam &
    RequestParameters;

export interface LocalNetworkGatewaysGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LocalNetworkGatewaysGetQueryParam {
  queryParameters: LocalNetworkGatewaysGetQueryParamProperties;
}

export type LocalNetworkGatewaysGetParameters = LocalNetworkGatewaysGetQueryParam &
  RequestParameters;

export interface LocalNetworkGatewaysDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LocalNetworkGatewaysDeleteQueryParam {
  queryParameters: LocalNetworkGatewaysDeleteQueryParamProperties;
}

export type LocalNetworkGatewaysDeleteParameters = LocalNetworkGatewaysDeleteQueryParam &
  RequestParameters;

export interface LocalNetworkGatewaysUpdateTagsBodyParam {
  /** Parameters supplied to update local network gateway tags. */
  body: TagsObject;
}

export interface LocalNetworkGatewaysUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LocalNetworkGatewaysUpdateTagsQueryParam {
  queryParameters: LocalNetworkGatewaysUpdateTagsQueryParamProperties;
}

export interface LocalNetworkGatewaysUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type LocalNetworkGatewaysUpdateTagsParameters = LocalNetworkGatewaysUpdateTagsQueryParam &
  LocalNetworkGatewaysUpdateTagsMediaTypesParam &
  LocalNetworkGatewaysUpdateTagsBodyParam &
  RequestParameters;

export interface LocalNetworkGatewaysListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface LocalNetworkGatewaysListQueryParam {
  queryParameters: LocalNetworkGatewaysListQueryParamProperties;
}

export type LocalNetworkGatewaysListParameters = LocalNetworkGatewaysListQueryParam &
  RequestParameters;

export interface VirtualNetworkGatewayNatRulesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayNatRulesGetQueryParam {
  queryParameters: VirtualNetworkGatewayNatRulesGetQueryParamProperties;
}

export type VirtualNetworkGatewayNatRulesGetParameters =
  VirtualNetworkGatewayNatRulesGetQueryParam & RequestParameters;

export interface VirtualNetworkGatewayNatRulesCreateOrUpdateBodyParam {
  /** Parameters supplied to create or Update a Nat Rule. */
  body: VirtualNetworkGatewayNatRule;
}

export interface VirtualNetworkGatewayNatRulesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayNatRulesCreateOrUpdateQueryParam {
  queryParameters: VirtualNetworkGatewayNatRulesCreateOrUpdateQueryParamProperties;
}

export interface VirtualNetworkGatewayNatRulesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkGatewayNatRulesCreateOrUpdateParameters =
  VirtualNetworkGatewayNatRulesCreateOrUpdateQueryParam &
    VirtualNetworkGatewayNatRulesCreateOrUpdateMediaTypesParam &
    VirtualNetworkGatewayNatRulesCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualNetworkGatewayNatRulesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayNatRulesDeleteQueryParam {
  queryParameters: VirtualNetworkGatewayNatRulesDeleteQueryParamProperties;
}

export type VirtualNetworkGatewayNatRulesDeleteParameters =
  VirtualNetworkGatewayNatRulesDeleteQueryParam & RequestParameters;

export interface VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayQueryParam {
  queryParameters: VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayQueryParamProperties;
}

export type VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayParameters =
  VirtualNetworkGatewayNatRulesListByVirtualNetworkGatewayQueryParam & RequestParameters;

export interface VirtualNetworkTapsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkTapsDeleteQueryParam {
  queryParameters: VirtualNetworkTapsDeleteQueryParamProperties;
}

export type VirtualNetworkTapsDeleteParameters = VirtualNetworkTapsDeleteQueryParam &
  RequestParameters;

export interface VirtualNetworkTapsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkTapsGetQueryParam {
  queryParameters: VirtualNetworkTapsGetQueryParamProperties;
}

export type VirtualNetworkTapsGetParameters = VirtualNetworkTapsGetQueryParam & RequestParameters;

export interface VirtualNetworkTapsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update virtual network tap operation. */
  body: VirtualNetworkTap;
}

export interface VirtualNetworkTapsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkTapsCreateOrUpdateQueryParam {
  queryParameters: VirtualNetworkTapsCreateOrUpdateQueryParamProperties;
}

export interface VirtualNetworkTapsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkTapsCreateOrUpdateParameters =
  VirtualNetworkTapsCreateOrUpdateQueryParam &
    VirtualNetworkTapsCreateOrUpdateMediaTypesParam &
    VirtualNetworkTapsCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualNetworkTapsUpdateTagsBodyParam {
  /** Parameters supplied to update VirtualNetworkTap tags. */
  body: TagsObject;
}

export interface VirtualNetworkTapsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkTapsUpdateTagsQueryParam {
  queryParameters: VirtualNetworkTapsUpdateTagsQueryParamProperties;
}

export interface VirtualNetworkTapsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualNetworkTapsUpdateTagsParameters = VirtualNetworkTapsUpdateTagsQueryParam &
  VirtualNetworkTapsUpdateTagsMediaTypesParam &
  VirtualNetworkTapsUpdateTagsBodyParam &
  RequestParameters;

export interface VirtualNetworkTapsListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkTapsListAllQueryParam {
  queryParameters: VirtualNetworkTapsListAllQueryParamProperties;
}

export type VirtualNetworkTapsListAllParameters = VirtualNetworkTapsListAllQueryParam &
  RequestParameters;

export interface VirtualNetworkTapsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualNetworkTapsListByResourceGroupQueryParam {
  queryParameters: VirtualNetworkTapsListByResourceGroupQueryParamProperties;
}

export type VirtualNetworkTapsListByResourceGroupParameters =
  VirtualNetworkTapsListByResourceGroupQueryParam & RequestParameters;

export interface VirtualRoutersDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualRoutersDeleteQueryParam {
  queryParameters: VirtualRoutersDeleteQueryParamProperties;
}

export type VirtualRoutersDeleteParameters = VirtualRoutersDeleteQueryParam & RequestParameters;

export interface VirtualRoutersGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
  /** Expands referenced resources. */
  $expand?: string;
}

export interface VirtualRoutersGetQueryParam {
  queryParameters: VirtualRoutersGetQueryParamProperties;
}

export type VirtualRoutersGetParameters = VirtualRoutersGetQueryParam & RequestParameters;

export interface VirtualRoutersCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update Virtual Router. */
  body: VirtualRouter;
}

export interface VirtualRoutersCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualRoutersCreateOrUpdateQueryParam {
  queryParameters: VirtualRoutersCreateOrUpdateQueryParamProperties;
}

export interface VirtualRoutersCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualRoutersCreateOrUpdateParameters = VirtualRoutersCreateOrUpdateQueryParam &
  VirtualRoutersCreateOrUpdateMediaTypesParam &
  VirtualRoutersCreateOrUpdateBodyParam &
  RequestParameters;

export interface VirtualRoutersListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualRoutersListByResourceGroupQueryParam {
  queryParameters: VirtualRoutersListByResourceGroupQueryParamProperties;
}

export type VirtualRoutersListByResourceGroupParameters =
  VirtualRoutersListByResourceGroupQueryParam & RequestParameters;

export interface VirtualRoutersListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualRoutersListQueryParam {
  queryParameters: VirtualRoutersListQueryParamProperties;
}

export type VirtualRoutersListParameters = VirtualRoutersListQueryParam & RequestParameters;

export interface VirtualRouterPeeringsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualRouterPeeringsDeleteQueryParam {
  queryParameters: VirtualRouterPeeringsDeleteQueryParamProperties;
}

export type VirtualRouterPeeringsDeleteParameters = VirtualRouterPeeringsDeleteQueryParam &
  RequestParameters;

export interface VirtualRouterPeeringsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualRouterPeeringsGetQueryParam {
  queryParameters: VirtualRouterPeeringsGetQueryParamProperties;
}

export type VirtualRouterPeeringsGetParameters = VirtualRouterPeeringsGetQueryParam &
  RequestParameters;

export interface VirtualRouterPeeringsCreateOrUpdateBodyParam {
  /** Parameters supplied to the create or update Virtual Router Peering operation. */
  body: VirtualRouterPeering;
}

export interface VirtualRouterPeeringsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualRouterPeeringsCreateOrUpdateQueryParam {
  queryParameters: VirtualRouterPeeringsCreateOrUpdateQueryParamProperties;
}

export interface VirtualRouterPeeringsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualRouterPeeringsCreateOrUpdateParameters =
  VirtualRouterPeeringsCreateOrUpdateQueryParam &
    VirtualRouterPeeringsCreateOrUpdateMediaTypesParam &
    VirtualRouterPeeringsCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualRouterPeeringsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualRouterPeeringsListQueryParam {
  queryParameters: VirtualRouterPeeringsListQueryParamProperties;
}

export type VirtualRouterPeeringsListParameters = VirtualRouterPeeringsListQueryParam &
  RequestParameters;

export interface VirtualWansGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualWansGetQueryParam {
  queryParameters: VirtualWansGetQueryParamProperties;
}

export type VirtualWansGetParameters = VirtualWansGetQueryParam & RequestParameters;

export interface VirtualWansCreateOrUpdateBodyParam {
  /** Parameters supplied to create or update VirtualWAN. */
  body: VirtualWAN;
}

export interface VirtualWansCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualWansCreateOrUpdateQueryParam {
  queryParameters: VirtualWansCreateOrUpdateQueryParamProperties;
}

export interface VirtualWansCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualWansCreateOrUpdateParameters = VirtualWansCreateOrUpdateQueryParam &
  VirtualWansCreateOrUpdateMediaTypesParam &
  VirtualWansCreateOrUpdateBodyParam &
  RequestParameters;

export interface VirtualWansUpdateTagsBodyParam {
  /** Parameters supplied to Update VirtualWAN tags. */
  body: TagsObject;
}

export interface VirtualWansUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualWansUpdateTagsQueryParam {
  queryParameters: VirtualWansUpdateTagsQueryParamProperties;
}

export interface VirtualWansUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualWansUpdateTagsParameters = VirtualWansUpdateTagsQueryParam &
  VirtualWansUpdateTagsMediaTypesParam &
  VirtualWansUpdateTagsBodyParam &
  RequestParameters;

export interface VirtualWansDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualWansDeleteQueryParam {
  queryParameters: VirtualWansDeleteQueryParamProperties;
}

export type VirtualWansDeleteParameters = VirtualWansDeleteQueryParam & RequestParameters;

export interface VirtualWansListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualWansListByResourceGroupQueryParam {
  queryParameters: VirtualWansListByResourceGroupQueryParamProperties;
}

export type VirtualWansListByResourceGroupParameters = VirtualWansListByResourceGroupQueryParam &
  RequestParameters;

export interface VirtualWansListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualWansListQueryParam {
  queryParameters: VirtualWansListQueryParamProperties;
}

export type VirtualWansListParameters = VirtualWansListQueryParam & RequestParameters;

export interface VpnSitesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnSitesGetQueryParam {
  queryParameters: VpnSitesGetQueryParamProperties;
}

export type VpnSitesGetParameters = VpnSitesGetQueryParam & RequestParameters;

export interface VpnSitesCreateOrUpdateBodyParam {
  /** Parameters supplied to create or update VpnSite. */
  body: VpnSite;
}

export interface VpnSitesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnSitesCreateOrUpdateQueryParam {
  queryParameters: VpnSitesCreateOrUpdateQueryParamProperties;
}

export interface VpnSitesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnSitesCreateOrUpdateParameters = VpnSitesCreateOrUpdateQueryParam &
  VpnSitesCreateOrUpdateMediaTypesParam &
  VpnSitesCreateOrUpdateBodyParam &
  RequestParameters;

export interface VpnSitesUpdateTagsBodyParam {
  /** Parameters supplied to update VpnSite tags. */
  body: TagsObject;
}

export interface VpnSitesUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnSitesUpdateTagsQueryParam {
  queryParameters: VpnSitesUpdateTagsQueryParamProperties;
}

export interface VpnSitesUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnSitesUpdateTagsParameters = VpnSitesUpdateTagsQueryParam &
  VpnSitesUpdateTagsMediaTypesParam &
  VpnSitesUpdateTagsBodyParam &
  RequestParameters;

export interface VpnSitesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnSitesDeleteQueryParam {
  queryParameters: VpnSitesDeleteQueryParamProperties;
}

export type VpnSitesDeleteParameters = VpnSitesDeleteQueryParam & RequestParameters;

export interface VpnSitesListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnSitesListByResourceGroupQueryParam {
  queryParameters: VpnSitesListByResourceGroupQueryParamProperties;
}

export type VpnSitesListByResourceGroupParameters = VpnSitesListByResourceGroupQueryParam &
  RequestParameters;

export interface VpnSitesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnSitesListQueryParam {
  queryParameters: VpnSitesListQueryParamProperties;
}

export type VpnSitesListParameters = VpnSitesListQueryParam & RequestParameters;

export interface VpnSiteLinksGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnSiteLinksGetQueryParam {
  queryParameters: VpnSiteLinksGetQueryParamProperties;
}

export type VpnSiteLinksGetParameters = VpnSiteLinksGetQueryParam & RequestParameters;

export interface VpnSiteLinksListByVpnSiteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnSiteLinksListByVpnSiteQueryParam {
  queryParameters: VpnSiteLinksListByVpnSiteQueryParamProperties;
}

export type VpnSiteLinksListByVpnSiteParameters = VpnSiteLinksListByVpnSiteQueryParam &
  RequestParameters;

export interface VpnSitesConfigurationDownloadBodyParam {
  /** Parameters supplied to download vpn-sites configuration. */
  body: GetVpnSitesConfigurationRequest;
}

export interface VpnSitesConfigurationDownloadQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnSitesConfigurationDownloadQueryParam {
  queryParameters: VpnSitesConfigurationDownloadQueryParamProperties;
}

export interface VpnSitesConfigurationDownloadMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnSitesConfigurationDownloadParameters = VpnSitesConfigurationDownloadQueryParam &
  VpnSitesConfigurationDownloadMediaTypesParam &
  VpnSitesConfigurationDownloadBodyParam &
  RequestParameters;

export interface VpnServerConfigurationsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnServerConfigurationsGetQueryParam {
  queryParameters: VpnServerConfigurationsGetQueryParamProperties;
}

export type VpnServerConfigurationsGetParameters = VpnServerConfigurationsGetQueryParam &
  RequestParameters;

export interface VpnServerConfigurationsCreateOrUpdateBodyParam {
  /** Parameters supplied to create or update VpnServerConfiguration. */
  body: VpnServerConfiguration;
}

export interface VpnServerConfigurationsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnServerConfigurationsCreateOrUpdateQueryParam {
  queryParameters: VpnServerConfigurationsCreateOrUpdateQueryParamProperties;
}

export interface VpnServerConfigurationsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnServerConfigurationsCreateOrUpdateParameters =
  VpnServerConfigurationsCreateOrUpdateQueryParam &
    VpnServerConfigurationsCreateOrUpdateMediaTypesParam &
    VpnServerConfigurationsCreateOrUpdateBodyParam &
    RequestParameters;

export interface VpnServerConfigurationsUpdateTagsBodyParam {
  /** Parameters supplied to update VpnServerConfiguration tags. */
  body: TagsObject;
}

export interface VpnServerConfigurationsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnServerConfigurationsUpdateTagsQueryParam {
  queryParameters: VpnServerConfigurationsUpdateTagsQueryParamProperties;
}

export interface VpnServerConfigurationsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnServerConfigurationsUpdateTagsParameters =
  VpnServerConfigurationsUpdateTagsQueryParam &
    VpnServerConfigurationsUpdateTagsMediaTypesParam &
    VpnServerConfigurationsUpdateTagsBodyParam &
    RequestParameters;

export interface VpnServerConfigurationsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnServerConfigurationsDeleteQueryParam {
  queryParameters: VpnServerConfigurationsDeleteQueryParamProperties;
}

export type VpnServerConfigurationsDeleteParameters = VpnServerConfigurationsDeleteQueryParam &
  RequestParameters;

export interface VpnServerConfigurationsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnServerConfigurationsListByResourceGroupQueryParam {
  queryParameters: VpnServerConfigurationsListByResourceGroupQueryParamProperties;
}

export type VpnServerConfigurationsListByResourceGroupParameters =
  VpnServerConfigurationsListByResourceGroupQueryParam & RequestParameters;

export interface VpnServerConfigurationsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnServerConfigurationsListQueryParam {
  queryParameters: VpnServerConfigurationsListQueryParamProperties;
}

export type VpnServerConfigurationsListParameters = VpnServerConfigurationsListQueryParam &
  RequestParameters;

export interface ConfigurationPolicyGroupsCreateOrUpdateBodyParam {
  /** Parameters supplied to create or update a VpnServerConfiguration PolicyGroup. */
  body: VpnServerConfigurationPolicyGroup;
}

export interface ConfigurationPolicyGroupsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConfigurationPolicyGroupsCreateOrUpdateQueryParam {
  queryParameters: ConfigurationPolicyGroupsCreateOrUpdateQueryParamProperties;
}

export interface ConfigurationPolicyGroupsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ConfigurationPolicyGroupsCreateOrUpdateParameters =
  ConfigurationPolicyGroupsCreateOrUpdateQueryParam &
    ConfigurationPolicyGroupsCreateOrUpdateMediaTypesParam &
    ConfigurationPolicyGroupsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ConfigurationPolicyGroupsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConfigurationPolicyGroupsDeleteQueryParam {
  queryParameters: ConfigurationPolicyGroupsDeleteQueryParamProperties;
}

export type ConfigurationPolicyGroupsDeleteParameters = ConfigurationPolicyGroupsDeleteQueryParam &
  RequestParameters;

export interface ConfigurationPolicyGroupsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConfigurationPolicyGroupsGetQueryParam {
  queryParameters: ConfigurationPolicyGroupsGetQueryParamProperties;
}

export type ConfigurationPolicyGroupsGetParameters = ConfigurationPolicyGroupsGetQueryParam &
  RequestParameters;

export interface ConfigurationPolicyGroupsListByVpnServerConfigurationQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ConfigurationPolicyGroupsListByVpnServerConfigurationQueryParam {
  queryParameters: ConfigurationPolicyGroupsListByVpnServerConfigurationQueryParamProperties;
}

export type ConfigurationPolicyGroupsListByVpnServerConfigurationParameters =
  ConfigurationPolicyGroupsListByVpnServerConfigurationQueryParam & RequestParameters;

export interface VirtualHubsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubsGetQueryParam {
  queryParameters: VirtualHubsGetQueryParamProperties;
}

export type VirtualHubsGetParameters = VirtualHubsGetQueryParam & RequestParameters;

export interface VirtualHubsCreateOrUpdateBodyParam {
  /** Parameters supplied to create or update VirtualHub. */
  body: VirtualHub;
}

export interface VirtualHubsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubsCreateOrUpdateQueryParam {
  queryParameters: VirtualHubsCreateOrUpdateQueryParamProperties;
}

export interface VirtualHubsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualHubsCreateOrUpdateParameters = VirtualHubsCreateOrUpdateQueryParam &
  VirtualHubsCreateOrUpdateMediaTypesParam &
  VirtualHubsCreateOrUpdateBodyParam &
  RequestParameters;

export interface VirtualHubsUpdateTagsBodyParam {
  /** Parameters supplied to update VirtualHub tags. */
  body: TagsObject;
}

export interface VirtualHubsUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubsUpdateTagsQueryParam {
  queryParameters: VirtualHubsUpdateTagsQueryParamProperties;
}

export interface VirtualHubsUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualHubsUpdateTagsParameters = VirtualHubsUpdateTagsQueryParam &
  VirtualHubsUpdateTagsMediaTypesParam &
  VirtualHubsUpdateTagsBodyParam &
  RequestParameters;

export interface VirtualHubsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubsDeleteQueryParam {
  queryParameters: VirtualHubsDeleteQueryParamProperties;
}

export type VirtualHubsDeleteParameters = VirtualHubsDeleteQueryParam & RequestParameters;

export interface VirtualHubsListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubsListByResourceGroupQueryParam {
  queryParameters: VirtualHubsListByResourceGroupQueryParamProperties;
}

export type VirtualHubsListByResourceGroupParameters = VirtualHubsListByResourceGroupQueryParam &
  RequestParameters;

export interface VirtualHubsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubsListQueryParam {
  queryParameters: VirtualHubsListQueryParamProperties;
}

export type VirtualHubsListParameters = VirtualHubsListQueryParam & RequestParameters;

export interface VirtualHubsGetEffectiveVirtualHubRoutesBodyParam {
  /** Parameters supplied to get the effective routes for a specific resource. */
  body?: EffectiveRoutesParameters;
}

export interface VirtualHubsGetEffectiveVirtualHubRoutesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubsGetEffectiveVirtualHubRoutesQueryParam {
  queryParameters: VirtualHubsGetEffectiveVirtualHubRoutesQueryParamProperties;
}

export interface VirtualHubsGetEffectiveVirtualHubRoutesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualHubsGetEffectiveVirtualHubRoutesParameters =
  VirtualHubsGetEffectiveVirtualHubRoutesQueryParam &
    VirtualHubsGetEffectiveVirtualHubRoutesMediaTypesParam &
    VirtualHubsGetEffectiveVirtualHubRoutesBodyParam &
    RequestParameters;

export interface VirtualHubsGetInboundRoutesBodyParam {
  /** Parameters supplied to get the inbound routes for a connection resource. */
  body: GetInboundRoutesParameters;
}

export interface VirtualHubsGetInboundRoutesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubsGetInboundRoutesQueryParam {
  queryParameters: VirtualHubsGetInboundRoutesQueryParamProperties;
}

export interface VirtualHubsGetInboundRoutesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualHubsGetInboundRoutesParameters = VirtualHubsGetInboundRoutesQueryParam &
  VirtualHubsGetInboundRoutesMediaTypesParam &
  VirtualHubsGetInboundRoutesBodyParam &
  RequestParameters;

export interface VirtualHubsGetOutboundRoutesBodyParam {
  /** Parameters supplied to get the outbound routes for a connection resource. */
  body: GetOutboundRoutesParameters;
}

export interface VirtualHubsGetOutboundRoutesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubsGetOutboundRoutesQueryParam {
  queryParameters: VirtualHubsGetOutboundRoutesQueryParamProperties;
}

export interface VirtualHubsGetOutboundRoutesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualHubsGetOutboundRoutesParameters = VirtualHubsGetOutboundRoutesQueryParam &
  VirtualHubsGetOutboundRoutesMediaTypesParam &
  VirtualHubsGetOutboundRoutesBodyParam &
  RequestParameters;

export interface RouteMapsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteMapsGetQueryParam {
  queryParameters: RouteMapsGetQueryParamProperties;
}

export type RouteMapsGetParameters = RouteMapsGetQueryParam & RequestParameters;

export interface RouteMapsCreateOrUpdateBodyParam {
  /** Parameters supplied to create or update a RouteMap. */
  body: RouteMap;
}

export interface RouteMapsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteMapsCreateOrUpdateQueryParam {
  queryParameters: RouteMapsCreateOrUpdateQueryParamProperties;
}

export interface RouteMapsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RouteMapsCreateOrUpdateParameters = RouteMapsCreateOrUpdateQueryParam &
  RouteMapsCreateOrUpdateMediaTypesParam &
  RouteMapsCreateOrUpdateBodyParam &
  RequestParameters;

export interface RouteMapsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteMapsDeleteQueryParam {
  queryParameters: RouteMapsDeleteQueryParamProperties;
}

export type RouteMapsDeleteParameters = RouteMapsDeleteQueryParam & RequestParameters;

export interface RouteMapsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RouteMapsListQueryParam {
  queryParameters: RouteMapsListQueryParamProperties;
}

export type RouteMapsListParameters = RouteMapsListQueryParam & RequestParameters;

export interface HubVirtualNetworkConnectionsCreateOrUpdateBodyParam {
  /** Parameters supplied to create or update a hub virtual network connection. */
  body: HubVirtualNetworkConnection;
}

export interface HubVirtualNetworkConnectionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface HubVirtualNetworkConnectionsCreateOrUpdateQueryParam {
  queryParameters: HubVirtualNetworkConnectionsCreateOrUpdateQueryParamProperties;
}

export interface HubVirtualNetworkConnectionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type HubVirtualNetworkConnectionsCreateOrUpdateParameters =
  HubVirtualNetworkConnectionsCreateOrUpdateQueryParam &
    HubVirtualNetworkConnectionsCreateOrUpdateMediaTypesParam &
    HubVirtualNetworkConnectionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface HubVirtualNetworkConnectionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface HubVirtualNetworkConnectionsDeleteQueryParam {
  queryParameters: HubVirtualNetworkConnectionsDeleteQueryParamProperties;
}

export type HubVirtualNetworkConnectionsDeleteParameters =
  HubVirtualNetworkConnectionsDeleteQueryParam & RequestParameters;

export interface HubVirtualNetworkConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface HubVirtualNetworkConnectionsGetQueryParam {
  queryParameters: HubVirtualNetworkConnectionsGetQueryParamProperties;
}

export type HubVirtualNetworkConnectionsGetParameters = HubVirtualNetworkConnectionsGetQueryParam &
  RequestParameters;

export interface HubVirtualNetworkConnectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface HubVirtualNetworkConnectionsListQueryParam {
  queryParameters: HubVirtualNetworkConnectionsListQueryParamProperties;
}

export type HubVirtualNetworkConnectionsListParameters =
  HubVirtualNetworkConnectionsListQueryParam & RequestParameters;

export interface VpnGatewaysGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnGatewaysGetQueryParam {
  queryParameters: VpnGatewaysGetQueryParamProperties;
}

export type VpnGatewaysGetParameters = VpnGatewaysGetQueryParam & RequestParameters;

export interface VpnGatewaysCreateOrUpdateBodyParam {
  /** Parameters supplied to create or Update a virtual wan vpn gateway. */
  body: VpnGateway;
}

export interface VpnGatewaysCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnGatewaysCreateOrUpdateQueryParam {
  queryParameters: VpnGatewaysCreateOrUpdateQueryParamProperties;
}

export interface VpnGatewaysCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnGatewaysCreateOrUpdateParameters = VpnGatewaysCreateOrUpdateQueryParam &
  VpnGatewaysCreateOrUpdateMediaTypesParam &
  VpnGatewaysCreateOrUpdateBodyParam &
  RequestParameters;

export interface VpnGatewaysUpdateTagsBodyParam {
  /** Parameters supplied to update a virtual wan vpn gateway tags. */
  body: TagsObject;
}

export interface VpnGatewaysUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnGatewaysUpdateTagsQueryParam {
  queryParameters: VpnGatewaysUpdateTagsQueryParamProperties;
}

export interface VpnGatewaysUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnGatewaysUpdateTagsParameters = VpnGatewaysUpdateTagsQueryParam &
  VpnGatewaysUpdateTagsMediaTypesParam &
  VpnGatewaysUpdateTagsBodyParam &
  RequestParameters;

export interface VpnGatewaysDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnGatewaysDeleteQueryParam {
  queryParameters: VpnGatewaysDeleteQueryParamProperties;
}

export type VpnGatewaysDeleteParameters = VpnGatewaysDeleteQueryParam & RequestParameters;

export interface VpnGatewaysResetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnGatewaysResetQueryParam {
  queryParameters: VpnGatewaysResetQueryParamProperties;
}

export type VpnGatewaysResetParameters = VpnGatewaysResetQueryParam & RequestParameters;

export interface VpnGatewaysStartPacketCaptureBodyParam {
  /** Vpn gateway packet capture parameters supplied to start packet capture on vpn gateway. */
  body?: VpnGatewayPacketCaptureStartParameters;
}

export interface VpnGatewaysStartPacketCaptureQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnGatewaysStartPacketCaptureQueryParam {
  queryParameters: VpnGatewaysStartPacketCaptureQueryParamProperties;
}

export interface VpnGatewaysStartPacketCaptureMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnGatewaysStartPacketCaptureParameters = VpnGatewaysStartPacketCaptureQueryParam &
  VpnGatewaysStartPacketCaptureMediaTypesParam &
  VpnGatewaysStartPacketCaptureBodyParam &
  RequestParameters;

export interface VpnGatewaysStopPacketCaptureBodyParam {
  /** Vpn gateway packet capture parameters supplied to stop packet capture on vpn gateway. */
  body?: VpnGatewayPacketCaptureStopParameters;
}

export interface VpnGatewaysStopPacketCaptureQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnGatewaysStopPacketCaptureQueryParam {
  queryParameters: VpnGatewaysStopPacketCaptureQueryParamProperties;
}

export interface VpnGatewaysStopPacketCaptureMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnGatewaysStopPacketCaptureParameters = VpnGatewaysStopPacketCaptureQueryParam &
  VpnGatewaysStopPacketCaptureMediaTypesParam &
  VpnGatewaysStopPacketCaptureBodyParam &
  RequestParameters;

export interface VpnGatewaysListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnGatewaysListByResourceGroupQueryParam {
  queryParameters: VpnGatewaysListByResourceGroupQueryParamProperties;
}

export type VpnGatewaysListByResourceGroupParameters = VpnGatewaysListByResourceGroupQueryParam &
  RequestParameters;

export interface VpnGatewaysListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnGatewaysListQueryParam {
  queryParameters: VpnGatewaysListQueryParamProperties;
}

export type VpnGatewaysListParameters = VpnGatewaysListQueryParam & RequestParameters;

export interface VpnLinkConnectionsResetConnectionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnLinkConnectionsResetConnectionQueryParam {
  queryParameters: VpnLinkConnectionsResetConnectionQueryParamProperties;
}

export type VpnLinkConnectionsResetConnectionParameters =
  VpnLinkConnectionsResetConnectionQueryParam & RequestParameters;

export interface VpnLinkConnectionsGetIkeSasQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnLinkConnectionsGetIkeSasQueryParam {
  queryParameters: VpnLinkConnectionsGetIkeSasQueryParamProperties;
}

export type VpnLinkConnectionsGetIkeSasParameters = VpnLinkConnectionsGetIkeSasQueryParam &
  RequestParameters;

export interface VpnLinkConnectionsListByVpnConnectionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnLinkConnectionsListByVpnConnectionQueryParam {
  queryParameters: VpnLinkConnectionsListByVpnConnectionQueryParamProperties;
}

export type VpnLinkConnectionsListByVpnConnectionParameters =
  VpnLinkConnectionsListByVpnConnectionQueryParam & RequestParameters;

export interface VpnConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnConnectionsGetQueryParam {
  queryParameters: VpnConnectionsGetQueryParamProperties;
}

export type VpnConnectionsGetParameters = VpnConnectionsGetQueryParam & RequestParameters;

export interface VpnConnectionsCreateOrUpdateBodyParam {
  /** Parameters supplied to create or Update a VPN Connection. */
  body: VpnConnection;
}

export interface VpnConnectionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnConnectionsCreateOrUpdateQueryParam {
  queryParameters: VpnConnectionsCreateOrUpdateQueryParamProperties;
}

export interface VpnConnectionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnConnectionsCreateOrUpdateParameters = VpnConnectionsCreateOrUpdateQueryParam &
  VpnConnectionsCreateOrUpdateMediaTypesParam &
  VpnConnectionsCreateOrUpdateBodyParam &
  RequestParameters;

export interface VpnConnectionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnConnectionsDeleteQueryParam {
  queryParameters: VpnConnectionsDeleteQueryParamProperties;
}

export type VpnConnectionsDeleteParameters = VpnConnectionsDeleteQueryParam & RequestParameters;

export interface VpnConnectionsStartPacketCaptureBodyParam {
  /** Vpn Connection packet capture parameters supplied to start packet capture on gateway connection. */
  body?: VpnConnectionPacketCaptureStartParameters;
}

export interface VpnConnectionsStartPacketCaptureQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnConnectionsStartPacketCaptureQueryParam {
  queryParameters: VpnConnectionsStartPacketCaptureQueryParamProperties;
}

export interface VpnConnectionsStartPacketCaptureMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnConnectionsStartPacketCaptureParameters =
  VpnConnectionsStartPacketCaptureQueryParam &
    VpnConnectionsStartPacketCaptureMediaTypesParam &
    VpnConnectionsStartPacketCaptureBodyParam &
    RequestParameters;

export interface VpnConnectionsStopPacketCaptureBodyParam {
  /** Vpn Connection packet capture parameters supplied to stop packet capture on gateway connection. */
  body?: VpnConnectionPacketCaptureStopParameters;
}

export interface VpnConnectionsStopPacketCaptureQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnConnectionsStopPacketCaptureQueryParam {
  queryParameters: VpnConnectionsStopPacketCaptureQueryParamProperties;
}

export interface VpnConnectionsStopPacketCaptureMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VpnConnectionsStopPacketCaptureParameters = VpnConnectionsStopPacketCaptureQueryParam &
  VpnConnectionsStopPacketCaptureMediaTypesParam &
  VpnConnectionsStopPacketCaptureBodyParam &
  RequestParameters;

export interface VpnConnectionsListByVpnGatewayQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnConnectionsListByVpnGatewayQueryParam {
  queryParameters: VpnConnectionsListByVpnGatewayQueryParamProperties;
}

export type VpnConnectionsListByVpnGatewayParameters = VpnConnectionsListByVpnGatewayQueryParam &
  RequestParameters;

export interface VpnSiteLinkConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnSiteLinkConnectionsGetQueryParam {
  queryParameters: VpnSiteLinkConnectionsGetQueryParamProperties;
}

export type VpnSiteLinkConnectionsGetParameters = VpnSiteLinkConnectionsGetQueryParam &
  RequestParameters;

export interface NatRulesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NatRulesGetQueryParam {
  queryParameters: NatRulesGetQueryParamProperties;
}

export type NatRulesGetParameters = NatRulesGetQueryParam & RequestParameters;

export interface NatRulesCreateOrUpdateBodyParam {
  /** Parameters supplied to create or Update a Nat Rule. */
  body: VpnGatewayNatRule;
}

export interface NatRulesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NatRulesCreateOrUpdateQueryParam {
  queryParameters: NatRulesCreateOrUpdateQueryParamProperties;
}

export interface NatRulesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type NatRulesCreateOrUpdateParameters = NatRulesCreateOrUpdateQueryParam &
  NatRulesCreateOrUpdateMediaTypesParam &
  NatRulesCreateOrUpdateBodyParam &
  RequestParameters;

export interface NatRulesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NatRulesDeleteQueryParam {
  queryParameters: NatRulesDeleteQueryParamProperties;
}

export type NatRulesDeleteParameters = NatRulesDeleteQueryParam & RequestParameters;

export interface NatRulesListByVpnGatewayQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface NatRulesListByVpnGatewayQueryParam {
  queryParameters: NatRulesListByVpnGatewayQueryParamProperties;
}

export type NatRulesListByVpnGatewayParameters = NatRulesListByVpnGatewayQueryParam &
  RequestParameters;

export interface P2SVpnGatewaysGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface P2SVpnGatewaysGetQueryParam {
  queryParameters: P2SVpnGatewaysGetQueryParamProperties;
}

export type P2SVpnGatewaysGetParameters = P2SVpnGatewaysGetQueryParam & RequestParameters;

export interface P2SVpnGatewaysCreateOrUpdateBodyParam {
  /** Parameters supplied to create or Update a virtual wan p2s vpn gateway. */
  body: P2SVpnGateway;
}

export interface P2SVpnGatewaysCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface P2SVpnGatewaysCreateOrUpdateQueryParam {
  queryParameters: P2SVpnGatewaysCreateOrUpdateQueryParamProperties;
}

export interface P2SVpnGatewaysCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type P2SVpnGatewaysCreateOrUpdateParameters = P2SVpnGatewaysCreateOrUpdateQueryParam &
  P2SVpnGatewaysCreateOrUpdateMediaTypesParam &
  P2SVpnGatewaysCreateOrUpdateBodyParam &
  RequestParameters;

export interface P2SVpnGatewaysUpdateTagsBodyParam {
  /** Parameters supplied to update a virtual wan p2s vpn gateway tags. */
  body: TagsObject;
}

export interface P2SVpnGatewaysUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface P2SVpnGatewaysUpdateTagsQueryParam {
  queryParameters: P2SVpnGatewaysUpdateTagsQueryParamProperties;
}

export interface P2SVpnGatewaysUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type P2SVpnGatewaysUpdateTagsParameters = P2SVpnGatewaysUpdateTagsQueryParam &
  P2SVpnGatewaysUpdateTagsMediaTypesParam &
  P2SVpnGatewaysUpdateTagsBodyParam &
  RequestParameters;

export interface P2SVpnGatewaysDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface P2SVpnGatewaysDeleteQueryParam {
  queryParameters: P2SVpnGatewaysDeleteQueryParamProperties;
}

export type P2SVpnGatewaysDeleteParameters = P2SVpnGatewaysDeleteQueryParam & RequestParameters;

export interface P2SVpnGatewaysListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface P2SVpnGatewaysListByResourceGroupQueryParam {
  queryParameters: P2SVpnGatewaysListByResourceGroupQueryParamProperties;
}

export type P2SVpnGatewaysListByResourceGroupParameters =
  P2SVpnGatewaysListByResourceGroupQueryParam & RequestParameters;

export interface P2SVpnGatewaysListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface P2SVpnGatewaysListQueryParam {
  queryParameters: P2SVpnGatewaysListQueryParamProperties;
}

export type P2SVpnGatewaysListParameters = P2SVpnGatewaysListQueryParam & RequestParameters;

export interface P2SVpnGatewaysResetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface P2SVpnGatewaysResetQueryParam {
  queryParameters: P2SVpnGatewaysResetQueryParamProperties;
}

export type P2SVpnGatewaysResetParameters = P2SVpnGatewaysResetQueryParam & RequestParameters;

export interface P2SVpnGatewaysGenerateVpnProfileBodyParam {
  /** Parameters supplied to the generate P2SVpnGateway VPN client package operation. */
  body: P2SVpnProfileParameters;
}

export interface P2SVpnGatewaysGenerateVpnProfileQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface P2SVpnGatewaysGenerateVpnProfileQueryParam {
  queryParameters: P2SVpnGatewaysGenerateVpnProfileQueryParamProperties;
}

export interface P2SVpnGatewaysGenerateVpnProfileMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type P2SVpnGatewaysGenerateVpnProfileParameters =
  P2SVpnGatewaysGenerateVpnProfileQueryParam &
    P2SVpnGatewaysGenerateVpnProfileMediaTypesParam &
    P2SVpnGatewaysGenerateVpnProfileBodyParam &
    RequestParameters;

export interface P2SVpnGatewaysGetP2SVpnConnectionHealthQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface P2SVpnGatewaysGetP2SVpnConnectionHealthQueryParam {
  queryParameters: P2SVpnGatewaysGetP2SVpnConnectionHealthQueryParamProperties;
}

export type P2SVpnGatewaysGetP2SVpnConnectionHealthParameters =
  P2SVpnGatewaysGetP2SVpnConnectionHealthQueryParam & RequestParameters;

export interface P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedBodyParam {
  /** Request parameters supplied to get p2s vpn connections detailed health. */
  body: P2SVpnConnectionHealthRequest;
}

export interface P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedQueryParam {
  queryParameters: P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedQueryParamProperties;
}

export interface P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedParameters =
  P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedQueryParam &
    P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedMediaTypesParam &
    P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedBodyParam &
    RequestParameters;

export interface P2SVpnGatewaysDisconnectP2SVpnConnectionsBodyParam {
  /** The parameters are supplied to disconnect p2s vpn connections. */
  body: P2SVpnConnectionRequest;
}

export interface P2SVpnGatewaysDisconnectP2SVpnConnectionsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface P2SVpnGatewaysDisconnectP2SVpnConnectionsQueryParam {
  queryParameters: P2SVpnGatewaysDisconnectP2SVpnConnectionsQueryParamProperties;
}

export interface P2SVpnGatewaysDisconnectP2SVpnConnectionsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type P2SVpnGatewaysDisconnectP2SVpnConnectionsParameters =
  P2SVpnGatewaysDisconnectP2SVpnConnectionsQueryParam &
    P2SVpnGatewaysDisconnectP2SVpnConnectionsMediaTypesParam &
    P2SVpnGatewaysDisconnectP2SVpnConnectionsBodyParam &
    RequestParameters;

export interface VpnServerConfigurationsAssociatedWithVirtualWanListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VpnServerConfigurationsAssociatedWithVirtualWanListQueryParam {
  queryParameters: VpnServerConfigurationsAssociatedWithVirtualWanListQueryParamProperties;
}

export type VpnServerConfigurationsAssociatedWithVirtualWanListParameters =
  VpnServerConfigurationsAssociatedWithVirtualWanListQueryParam & RequestParameters;

export interface VirtualHubRouteTableV2SGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubRouteTableV2SGetQueryParam {
  queryParameters: VirtualHubRouteTableV2SGetQueryParamProperties;
}

export type VirtualHubRouteTableV2SGetParameters = VirtualHubRouteTableV2SGetQueryParam &
  RequestParameters;

export interface VirtualHubRouteTableV2SCreateOrUpdateBodyParam {
  /** Parameters supplied to create or update VirtualHubRouteTableV2. */
  body: VirtualHubRouteTableV2;
}

export interface VirtualHubRouteTableV2SCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubRouteTableV2SCreateOrUpdateQueryParam {
  queryParameters: VirtualHubRouteTableV2SCreateOrUpdateQueryParamProperties;
}

export interface VirtualHubRouteTableV2SCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualHubRouteTableV2SCreateOrUpdateParameters =
  VirtualHubRouteTableV2SCreateOrUpdateQueryParam &
    VirtualHubRouteTableV2SCreateOrUpdateMediaTypesParam &
    VirtualHubRouteTableV2SCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualHubRouteTableV2SDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubRouteTableV2SDeleteQueryParam {
  queryParameters: VirtualHubRouteTableV2SDeleteQueryParamProperties;
}

export type VirtualHubRouteTableV2SDeleteParameters = VirtualHubRouteTableV2SDeleteQueryParam &
  RequestParameters;

export interface VirtualHubRouteTableV2SListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubRouteTableV2SListQueryParam {
  queryParameters: VirtualHubRouteTableV2SListQueryParamProperties;
}

export type VirtualHubRouteTableV2SListParameters = VirtualHubRouteTableV2SListQueryParam &
  RequestParameters;

export interface ExpressRouteGatewaysListBySubscriptionQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteGatewaysListBySubscriptionQueryParam {
  queryParameters: ExpressRouteGatewaysListBySubscriptionQueryParamProperties;
}

export type ExpressRouteGatewaysListBySubscriptionParameters =
  ExpressRouteGatewaysListBySubscriptionQueryParam & RequestParameters;

export interface ExpressRouteGatewaysListByResourceGroupQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteGatewaysListByResourceGroupQueryParam {
  queryParameters: ExpressRouteGatewaysListByResourceGroupQueryParamProperties;
}

export type ExpressRouteGatewaysListByResourceGroupParameters =
  ExpressRouteGatewaysListByResourceGroupQueryParam & RequestParameters;

export interface ExpressRouteGatewaysCreateOrUpdateBodyParam {
  /** Parameters required in an ExpressRoute gateway PUT operation. */
  body: ExpressRouteGateway;
}

export interface ExpressRouteGatewaysCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteGatewaysCreateOrUpdateQueryParam {
  queryParameters: ExpressRouteGatewaysCreateOrUpdateQueryParamProperties;
}

export interface ExpressRouteGatewaysCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRouteGatewaysCreateOrUpdateParameters =
  ExpressRouteGatewaysCreateOrUpdateQueryParam &
    ExpressRouteGatewaysCreateOrUpdateMediaTypesParam &
    ExpressRouteGatewaysCreateOrUpdateBodyParam &
    RequestParameters;

export interface ExpressRouteGatewaysUpdateTagsBodyParam {
  /** Parameters supplied to update a virtual wan express route gateway tags. */
  body: TagsObject;
}

export interface ExpressRouteGatewaysUpdateTagsQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteGatewaysUpdateTagsQueryParam {
  queryParameters: ExpressRouteGatewaysUpdateTagsQueryParamProperties;
}

export interface ExpressRouteGatewaysUpdateTagsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRouteGatewaysUpdateTagsParameters = ExpressRouteGatewaysUpdateTagsQueryParam &
  ExpressRouteGatewaysUpdateTagsMediaTypesParam &
  ExpressRouteGatewaysUpdateTagsBodyParam &
  RequestParameters;

export interface ExpressRouteGatewaysGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteGatewaysGetQueryParam {
  queryParameters: ExpressRouteGatewaysGetQueryParamProperties;
}

export type ExpressRouteGatewaysGetParameters = ExpressRouteGatewaysGetQueryParam &
  RequestParameters;

export interface ExpressRouteGatewaysDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteGatewaysDeleteQueryParam {
  queryParameters: ExpressRouteGatewaysDeleteQueryParamProperties;
}

export type ExpressRouteGatewaysDeleteParameters = ExpressRouteGatewaysDeleteQueryParam &
  RequestParameters;

export interface ExpressRouteConnectionsCreateOrUpdateBodyParam {
  /** Parameters required in an ExpressRouteConnection PUT operation. */
  body: ExpressRouteConnection;
}

export interface ExpressRouteConnectionsCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteConnectionsCreateOrUpdateQueryParam {
  queryParameters: ExpressRouteConnectionsCreateOrUpdateQueryParamProperties;
}

export interface ExpressRouteConnectionsCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ExpressRouteConnectionsCreateOrUpdateParameters =
  ExpressRouteConnectionsCreateOrUpdateQueryParam &
    ExpressRouteConnectionsCreateOrUpdateMediaTypesParam &
    ExpressRouteConnectionsCreateOrUpdateBodyParam &
    RequestParameters;

export interface ExpressRouteConnectionsGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteConnectionsGetQueryParam {
  queryParameters: ExpressRouteConnectionsGetQueryParamProperties;
}

export type ExpressRouteConnectionsGetParameters = ExpressRouteConnectionsGetQueryParam &
  RequestParameters;

export interface ExpressRouteConnectionsDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteConnectionsDeleteQueryParam {
  queryParameters: ExpressRouteConnectionsDeleteQueryParamProperties;
}

export type ExpressRouteConnectionsDeleteParameters = ExpressRouteConnectionsDeleteQueryParam &
  RequestParameters;

export interface ExpressRouteConnectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface ExpressRouteConnectionsListQueryParam {
  queryParameters: ExpressRouteConnectionsListQueryParamProperties;
}

export type ExpressRouteConnectionsListParameters = ExpressRouteConnectionsListQueryParam &
  RequestParameters;

export interface VirtualHubBgpConnectionGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubBgpConnectionGetQueryParam {
  queryParameters: VirtualHubBgpConnectionGetQueryParamProperties;
}

export type VirtualHubBgpConnectionGetParameters = VirtualHubBgpConnectionGetQueryParam &
  RequestParameters;

export interface VirtualHubBgpConnectionCreateOrUpdateBodyParam {
  /** Parameters of Bgp connection. */
  body: BgpConnection;
}

export interface VirtualHubBgpConnectionCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubBgpConnectionCreateOrUpdateQueryParam {
  queryParameters: VirtualHubBgpConnectionCreateOrUpdateQueryParamProperties;
}

export interface VirtualHubBgpConnectionCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualHubBgpConnectionCreateOrUpdateParameters =
  VirtualHubBgpConnectionCreateOrUpdateQueryParam &
    VirtualHubBgpConnectionCreateOrUpdateMediaTypesParam &
    VirtualHubBgpConnectionCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualHubBgpConnectionDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubBgpConnectionDeleteQueryParam {
  queryParameters: VirtualHubBgpConnectionDeleteQueryParamProperties;
}

export type VirtualHubBgpConnectionDeleteParameters = VirtualHubBgpConnectionDeleteQueryParam &
  RequestParameters;

export interface VirtualHubBgpConnectionsListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubBgpConnectionsListQueryParam {
  queryParameters: VirtualHubBgpConnectionsListQueryParamProperties;
}

export type VirtualHubBgpConnectionsListParameters = VirtualHubBgpConnectionsListQueryParam &
  RequestParameters;

export interface VirtualHubBgpConnectionsListLearnedRoutesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubBgpConnectionsListLearnedRoutesQueryParam {
  queryParameters: VirtualHubBgpConnectionsListLearnedRoutesQueryParamProperties;
}

export type VirtualHubBgpConnectionsListLearnedRoutesParameters =
  VirtualHubBgpConnectionsListLearnedRoutesQueryParam & RequestParameters;

export interface VirtualHubBgpConnectionsListAdvertisedRoutesQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubBgpConnectionsListAdvertisedRoutesQueryParam {
  queryParameters: VirtualHubBgpConnectionsListAdvertisedRoutesQueryParamProperties;
}

export type VirtualHubBgpConnectionsListAdvertisedRoutesParameters =
  VirtualHubBgpConnectionsListAdvertisedRoutesQueryParam & RequestParameters;

export interface VirtualHubIpConfigurationGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubIpConfigurationGetQueryParam {
  queryParameters: VirtualHubIpConfigurationGetQueryParamProperties;
}

export type VirtualHubIpConfigurationGetParameters = VirtualHubIpConfigurationGetQueryParam &
  RequestParameters;

export interface VirtualHubIpConfigurationCreateOrUpdateBodyParam {
  /** Hub Ip Configuration parameters. */
  body: HubIpConfiguration;
}

export interface VirtualHubIpConfigurationCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubIpConfigurationCreateOrUpdateQueryParam {
  queryParameters: VirtualHubIpConfigurationCreateOrUpdateQueryParamProperties;
}

export interface VirtualHubIpConfigurationCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VirtualHubIpConfigurationCreateOrUpdateParameters =
  VirtualHubIpConfigurationCreateOrUpdateQueryParam &
    VirtualHubIpConfigurationCreateOrUpdateMediaTypesParam &
    VirtualHubIpConfigurationCreateOrUpdateBodyParam &
    RequestParameters;

export interface VirtualHubIpConfigurationDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubIpConfigurationDeleteQueryParam {
  queryParameters: VirtualHubIpConfigurationDeleteQueryParamProperties;
}

export type VirtualHubIpConfigurationDeleteParameters = VirtualHubIpConfigurationDeleteQueryParam &
  RequestParameters;

export interface VirtualHubIpConfigurationListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VirtualHubIpConfigurationListQueryParam {
  queryParameters: VirtualHubIpConfigurationListQueryParamProperties;
}

export type VirtualHubIpConfigurationListParameters = VirtualHubIpConfigurationListQueryParam &
  RequestParameters;

export interface HubRouteTablesCreateOrUpdateBodyParam {
  /** Parameters supplied to create or update RouteTable. */
  body: HubRouteTable;
}

export interface HubRouteTablesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface HubRouteTablesCreateOrUpdateQueryParam {
  queryParameters: HubRouteTablesCreateOrUpdateQueryParamProperties;
}

export interface HubRouteTablesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type HubRouteTablesCreateOrUpdateParameters = HubRouteTablesCreateOrUpdateQueryParam &
  HubRouteTablesCreateOrUpdateMediaTypesParam &
  HubRouteTablesCreateOrUpdateBodyParam &
  RequestParameters;

export interface HubRouteTablesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface HubRouteTablesGetQueryParam {
  queryParameters: HubRouteTablesGetQueryParamProperties;
}

export type HubRouteTablesGetParameters = HubRouteTablesGetQueryParam & RequestParameters;

export interface HubRouteTablesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface HubRouteTablesDeleteQueryParam {
  queryParameters: HubRouteTablesDeleteQueryParamProperties;
}

export type HubRouteTablesDeleteParameters = HubRouteTablesDeleteQueryParam & RequestParameters;

export interface HubRouteTablesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface HubRouteTablesListQueryParam {
  queryParameters: HubRouteTablesListQueryParamProperties;
}

export type HubRouteTablesListParameters = HubRouteTablesListQueryParam & RequestParameters;

export interface RoutingIntentCreateOrUpdateBodyParam {
  /** Parameters supplied to create or update RoutingIntent. */
  body: RoutingIntent;
}

export interface RoutingIntentCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RoutingIntentCreateOrUpdateQueryParam {
  queryParameters: RoutingIntentCreateOrUpdateQueryParamProperties;
}

export interface RoutingIntentCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type RoutingIntentCreateOrUpdateParameters = RoutingIntentCreateOrUpdateQueryParam &
  RoutingIntentCreateOrUpdateMediaTypesParam &
  RoutingIntentCreateOrUpdateBodyParam &
  RequestParameters;

export interface RoutingIntentGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RoutingIntentGetQueryParam {
  queryParameters: RoutingIntentGetQueryParamProperties;
}

export type RoutingIntentGetParameters = RoutingIntentGetQueryParam & RequestParameters;

export interface RoutingIntentDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RoutingIntentDeleteQueryParam {
  queryParameters: RoutingIntentDeleteQueryParamProperties;
}

export type RoutingIntentDeleteParameters = RoutingIntentDeleteQueryParam & RequestParameters;

export interface RoutingIntentListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface RoutingIntentListQueryParam {
  queryParameters: RoutingIntentListQueryParamProperties;
}

export type RoutingIntentListParameters = RoutingIntentListQueryParam & RequestParameters;

export interface WebApplicationFirewallPoliciesListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface WebApplicationFirewallPoliciesListQueryParam {
  queryParameters: WebApplicationFirewallPoliciesListQueryParamProperties;
}

export type WebApplicationFirewallPoliciesListParameters =
  WebApplicationFirewallPoliciesListQueryParam & RequestParameters;

export interface WebApplicationFirewallPoliciesListAllQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface WebApplicationFirewallPoliciesListAllQueryParam {
  queryParameters: WebApplicationFirewallPoliciesListAllQueryParamProperties;
}

export type WebApplicationFirewallPoliciesListAllParameters =
  WebApplicationFirewallPoliciesListAllQueryParam & RequestParameters;

export interface WebApplicationFirewallPoliciesGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface WebApplicationFirewallPoliciesGetQueryParam {
  queryParameters: WebApplicationFirewallPoliciesGetQueryParamProperties;
}

export type WebApplicationFirewallPoliciesGetParameters =
  WebApplicationFirewallPoliciesGetQueryParam & RequestParameters;

export interface WebApplicationFirewallPoliciesCreateOrUpdateBodyParam {
  /** Policy to be created. */
  body: WebApplicationFirewallPolicy;
}

export interface WebApplicationFirewallPoliciesCreateOrUpdateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface WebApplicationFirewallPoliciesCreateOrUpdateQueryParam {
  queryParameters: WebApplicationFirewallPoliciesCreateOrUpdateQueryParamProperties;
}

export interface WebApplicationFirewallPoliciesCreateOrUpdateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type WebApplicationFirewallPoliciesCreateOrUpdateParameters =
  WebApplicationFirewallPoliciesCreateOrUpdateQueryParam &
    WebApplicationFirewallPoliciesCreateOrUpdateMediaTypesParam &
    WebApplicationFirewallPoliciesCreateOrUpdateBodyParam &
    RequestParameters;

export interface WebApplicationFirewallPoliciesDeleteQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface WebApplicationFirewallPoliciesDeleteQueryParam {
  queryParameters: WebApplicationFirewallPoliciesDeleteQueryParamProperties;
}

export type WebApplicationFirewallPoliciesDeleteParameters =
  WebApplicationFirewallPoliciesDeleteQueryParam & RequestParameters;

export interface VipSwapGetQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VipSwapGetQueryParam {
  queryParameters: VipSwapGetQueryParamProperties;
}

export type VipSwapGetParameters = VipSwapGetQueryParam & RequestParameters;

export interface VipSwapCreateBodyParam {
  /** SwapResource object where slot type should be the target slot after vip swap for the specified cloud service. */
  body: SwapResource;
}

export interface VipSwapCreateQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VipSwapCreateQueryParam {
  queryParameters: VipSwapCreateQueryParamProperties;
}

export interface VipSwapCreateMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type VipSwapCreateParameters = VipSwapCreateQueryParam &
  VipSwapCreateMediaTypesParam &
  VipSwapCreateBodyParam &
  RequestParameters;

export interface VipSwapListQueryParamProperties {
  /** Api Version */
  "api-version": "2022-05-01";
}

export interface VipSwapListQueryParam {
  queryParameters: VipSwapListQueryParamProperties;
}

export type VipSwapListParameters = VipSwapListQueryParam & RequestParameters;
