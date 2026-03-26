// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ExpressRouteProviderPort,
  ApplicationGateway,
  NetworkInterfaceIPConfiguration,
  VirtualNetworkTap,
  NetworkInterfaceTapConfiguration,
  Subnet,
  NetworkSecurityGroup,
  SecurityRule,
  ApplicationSecurityGroup,
  NetworkInterface,
  PrivateEndpoint,
  PrivateLinkService,
  PrivateEndpointConnection,
  FlowLog,
  RouteTable,
  Route,
  ServiceEndpointPolicy,
  ServiceEndpointPolicyDefinition,
  PublicIPAddress,
  NatGateway,
  InboundNatRule,
  ApplicationGatewayPrivateEndpointConnection,
  AzureFirewall,
  BastionHost,
  DdosProtectionPlan,
  ExpressRouteCircuit,
  ExpressRouteCircuitPeering,
  ExpressRouteCircuitConnection,
  PeerExpressRouteCircuitConnection,
  ExpressRouteCrossConnection,
  FirewallPolicy,
  FirewallPolicyRuleCollectionGroup,
  NetworkManager,
  IpAllocation,
  IpGroup,
  LoadBalancer,
  NetworkManagerConnection,
  ConnectivityConfiguration,
  NetworkGroup,
  StaticMember,
  NetworkManagerRoutingConfiguration,
  RoutingRuleCollection,
  RoutingRule,
  ScopeConnection,
  SecurityAdminConfiguration,
  AdminRuleCollection,
  SecurityUserConfiguration,
  SecurityUserRuleCollection,
  SecurityUserRule,
  NetworkProfile,
  NetworkSecurityPerimeter,
  ReachabilityAnalysisIntent,
  VerifierWorkspace,
  ReachabilityAnalysisRun,
  NetworkVirtualAppliance,
  PublicIPPrefix,
  RouteFilter,
  SecurityPartnerProvider,
  VirtualNetwork,
  VirtualNetworkPeering,
  VirtualNetworkGateway,
  VirtualNetworkGatewayConnection,
  LocalNetworkGateway,
  VirtualRouter,
  VirtualRouterPeering,
  VirtualNetworkAppliance,
  ServiceGateway,
  ApplicationGatewayPrivateLinkResource,
  CustomIpPrefix,
  DscpConfiguration,
  NspProfile,
  NspAccessRule,
  NspLink,
  NspLinkReference,
  NspLoggingConfiguration,
  NetworkVirtualApplianceSku,
  AzureFirewallFqdnTag,
  ExpressRouteServiceProvider,
  BgpServiceCommunity,
} from "./microsoft/network/models.js";
import {
  networkInterfaceIPConfigurationArrayDeserializer,
  virtualNetworkTapArrayDeserializer,
  networkInterfaceTapConfigurationArrayDeserializer,
  securityRuleArrayDeserializer,
  applicationSecurityGroupArrayDeserializer,
  networkInterfaceArrayDeserializer,
  privateEndpointConnectionArrayDeserializer,
  subnetArrayDeserializer,
  flowLogArrayDeserializer,
  routeArrayDeserializer,
  serviceEndpointPolicyArrayDeserializer,
  serviceEndpointPolicyDefinitionArrayDeserializer,
  privateEndpointArrayDeserializer,
  inboundNatRuleArrayDeserializer,
  applicationGatewayPrivateEndpointConnectionArrayDeserializer,
  applicationGatewayArrayDeserializer,
  azureFirewallArrayDeserializer,
  bastionHostArrayDeserializer,
  publicIPAddressArrayDeserializer,
  ddosProtectionPlanArrayDeserializer,
  expressRouteCircuitPeeringArrayDeserializer,
  expressRouteCircuitConnectionArrayDeserializer,
  peerExpressRouteCircuitConnectionArrayDeserializer,
  expressRouteCircuitArrayDeserializer,
  expressRouteCrossConnectionArrayDeserializer,
  firewallPolicyArrayDeserializer,
  firewallPolicyRuleCollectionGroupArrayDeserializer,
  networkManagerArrayDeserializer,
  ipAllocationArrayDeserializer,
  ipGroupArrayDeserializer,
  loadBalancerArrayDeserializer,
  natGatewayArrayDeserializer,
  networkManagerConnectionArrayDeserializer,
  connectivityConfigurationArrayDeserializer,
  networkGroupArrayDeserializer,
  staticMemberArrayDeserializer,
  networkManagerRoutingConfigurationArrayDeserializer,
  routingRuleCollectionArrayDeserializer,
  routingRuleArrayDeserializer,
  scopeConnectionArrayDeserializer,
  securityAdminConfigurationArrayDeserializer,
  adminRuleCollectionArrayDeserializer,
  securityUserConfigurationArrayDeserializer,
  securityUserRuleCollectionArrayDeserializer,
  securityUserRuleArrayDeserializer,
  networkProfileArrayDeserializer,
  networkSecurityGroupArrayDeserializer,
  networkSecurityPerimeterArrayDeserializer,
  reachabilityAnalysisIntentArrayDeserializer,
  verifierWorkspaceArrayDeserializer,
  reachabilityAnalysisRunArrayDeserializer,
  networkVirtualApplianceArrayDeserializer,
  privateLinkServiceArrayDeserializer,
  publicIPPrefixArrayDeserializer,
  routeFilterArrayDeserializer,
  routeTableArrayDeserializer,
  securityPartnerProviderArrayDeserializer,
  virtualNetworkPeeringArrayDeserializer,
  virtualNetworkArrayDeserializer,
  virtualNetworkGatewayArrayDeserializer,
  virtualNetworkGatewayConnectionArrayDeserializer,
  localNetworkGatewayArrayDeserializer,
  virtualRouterArrayDeserializer,
  virtualRouterPeeringArrayDeserializer,
  virtualNetworkApplianceArrayDeserializer,
  serviceGatewayArrayDeserializer,
  applicationGatewayPrivateLinkResourceArrayDeserializer,
  expressRouteProviderPortArrayDeserializer,
  customIpPrefixArrayDeserializer,
  dscpConfigurationArrayDeserializer,
  nspProfileArrayDeserializer,
  nspAccessRuleArrayDeserializer,
  nspLinkArrayDeserializer,
  nspLinkReferenceArrayDeserializer,
  nspLoggingConfigurationArrayDeserializer,
  networkVirtualApplianceSkuArrayDeserializer,
  azureFirewallFqdnTagArrayDeserializer,
  expressRouteServiceProviderArrayDeserializer,
  bgpServiceCommunityArrayDeserializer,
} from "./microsoft/network/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** The response of a ApplicationGateway list operation. */
export interface _ApplicationGatewayListResult {
  /** The ApplicationGateway items on this page */
  value: ApplicationGateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationGatewayListResultDeserializer(
  item: any,
): _ApplicationGatewayListResult {
  return {
    value: applicationGatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ApplicationGatewayPrivateEndpointConnection list operation. */
export interface _ApplicationGatewayPrivateEndpointConnectionListResult {
  /** The ApplicationGatewayPrivateEndpointConnection items on this page */
  value: ApplicationGatewayPrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationGatewayPrivateEndpointConnectionListResultDeserializer(
  item: any,
): _ApplicationGatewayPrivateEndpointConnectionListResult {
  return {
    value: applicationGatewayPrivateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ApplicationSecurityGroup list operation. */
export interface _ApplicationSecurityGroupListResult {
  /** The ApplicationSecurityGroup items on this page */
  value: ApplicationSecurityGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationSecurityGroupListResultDeserializer(
  item: any,
): _ApplicationSecurityGroupListResult {
  return {
    value: applicationSecurityGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a AzureFirewall list operation. */
export interface _AzureFirewallListResult {
  /** The AzureFirewall items on this page */
  value: AzureFirewall[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _azureFirewallListResultDeserializer(item: any): _AzureFirewallListResult {
  return {
    value: azureFirewallArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a BastionHost list operation. */
export interface _BastionHostListResult {
  /** The BastionHost items on this page */
  value: BastionHost[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _bastionHostListResultDeserializer(item: any): _BastionHostListResult {
  return {
    value: bastionHostArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NetworkInterface list operation. */
export interface _NetworkInterfaceListResult {
  /** The NetworkInterface items on this page */
  value: NetworkInterface[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkInterfaceListResultDeserializer(item: any): _NetworkInterfaceListResult {
  return {
    value: networkInterfaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NetworkInterfaceIPConfiguration list operation. */
export interface _NetworkInterfaceIPConfigurationListResult {
  /** The NetworkInterfaceIPConfiguration items on this page */
  value: NetworkInterfaceIPConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkInterfaceIPConfigurationListResultDeserializer(
  item: any,
): _NetworkInterfaceIPConfigurationListResult {
  return {
    value: networkInterfaceIPConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a PublicIPAddress list operation. */
export interface _PublicIPAddressListResult {
  /** The PublicIPAddress items on this page */
  value: PublicIPAddress[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _publicIPAddressListResultDeserializer(item: any): _PublicIPAddressListResult {
  return {
    value: publicIPAddressArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a DdosProtectionPlan list operation. */
export interface _DdosProtectionPlanListResult {
  /** The DdosProtectionPlan items on this page */
  value: DdosProtectionPlan[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ddosProtectionPlanListResultDeserializer(
  item: any,
): _DdosProtectionPlanListResult {
  return {
    value: ddosProtectionPlanArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ExpressRouteCircuit list operation. */
export interface _ExpressRouteCircuitListResult {
  /** The ExpressRouteCircuit items on this page */
  value: ExpressRouteCircuit[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _expressRouteCircuitListResultDeserializer(
  item: any,
): _ExpressRouteCircuitListResult {
  return {
    value: expressRouteCircuitArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ExpressRouteCircuitPeering list operation. */
export interface _ExpressRouteCircuitPeeringListResult {
  /** The ExpressRouteCircuitPeering items on this page */
  value: ExpressRouteCircuitPeering[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _expressRouteCircuitPeeringListResultDeserializer(
  item: any,
): _ExpressRouteCircuitPeeringListResult {
  return {
    value: expressRouteCircuitPeeringArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ExpressRouteCircuitConnection list operation. */
export interface _ExpressRouteCircuitConnectionListResult {
  /** The ExpressRouteCircuitConnection items on this page */
  value: ExpressRouteCircuitConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _expressRouteCircuitConnectionListResultDeserializer(
  item: any,
): _ExpressRouteCircuitConnectionListResult {
  return {
    value: expressRouteCircuitConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a PeerExpressRouteCircuitConnection list operation. */
export interface _PeerExpressRouteCircuitConnectionListResult {
  /** The PeerExpressRouteCircuitConnection items on this page */
  value: PeerExpressRouteCircuitConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _peerExpressRouteCircuitConnectionListResultDeserializer(
  item: any,
): _PeerExpressRouteCircuitConnectionListResult {
  return {
    value: peerExpressRouteCircuitConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ExpressRouteCrossConnection list operation. */
export interface _ExpressRouteCrossConnectionListResult {
  /** The ExpressRouteCrossConnection items on this page */
  value: ExpressRouteCrossConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _expressRouteCrossConnectionListResultDeserializer(
  item: any,
): _ExpressRouteCrossConnectionListResult {
  return {
    value: expressRouteCrossConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a FirewallPolicy list operation. */
export interface _FirewallPolicyListResult {
  /** The FirewallPolicy items on this page */
  value: FirewallPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _firewallPolicyListResultDeserializer(item: any): _FirewallPolicyListResult {
  return {
    value: firewallPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a FirewallPolicyRuleCollectionGroup list operation. */
export interface _FirewallPolicyRuleCollectionGroupListResult {
  /** The FirewallPolicyRuleCollectionGroup items on this page */
  value: FirewallPolicyRuleCollectionGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _firewallPolicyRuleCollectionGroupListResultDeserializer(
  item: any,
): _FirewallPolicyRuleCollectionGroupListResult {
  return {
    value: firewallPolicyRuleCollectionGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The response of a NetworkManager list operation. */
export interface _NetworkManagerListResult {
  /** The NetworkManager items on this page */
  value: NetworkManager[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkManagerListResultDeserializer(item: any): _NetworkManagerListResult {
  return {
    value: networkManagerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a IpAllocation list operation. */
export interface _IpAllocationListResult {
  /** The IpAllocation items on this page */
  value: IpAllocation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ipAllocationListResultDeserializer(item: any): _IpAllocationListResult {
  return {
    value: ipAllocationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a IpGroup list operation. */
export interface _IpGroupListResult {
  /** The IpGroup items on this page */
  value: IpGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ipGroupListResultDeserializer(item: any): _IpGroupListResult {
  return {
    value: ipGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a LoadBalancer list operation. */
export interface _LoadBalancerListResult {
  /** The LoadBalancer items on this page */
  value: LoadBalancer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _loadBalancerListResultDeserializer(item: any): _LoadBalancerListResult {
  return {
    value: loadBalancerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a InboundNatRule list operation. */
export interface _InboundNatRuleListResult {
  /** The InboundNatRule items on this page */
  value: InboundNatRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _inboundNatRuleListResultDeserializer(item: any): _InboundNatRuleListResult {
  return {
    value: inboundNatRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NatGateway list operation. */
export interface _NatGatewayListResult {
  /** The NatGateway items on this page */
  value: NatGateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _natGatewayListResultDeserializer(item: any): _NatGatewayListResult {
  return {
    value: natGatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NetworkInterfaceTapConfiguration list operation. */
export interface _NetworkInterfaceTapConfigurationListResult {
  /** The NetworkInterfaceTapConfiguration items on this page */
  value: NetworkInterfaceTapConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkInterfaceTapConfigurationListResultDeserializer(
  item: any,
): _NetworkInterfaceTapConfigurationListResult {
  return {
    value: networkInterfaceTapConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NetworkManagerConnection list operation. */
export interface _NetworkManagerConnectionListResult {
  /** The NetworkManagerConnection items on this page */
  value: NetworkManagerConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkManagerConnectionListResultDeserializer(
  item: any,
): _NetworkManagerConnectionListResult {
  return {
    value: networkManagerConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ConnectivityConfiguration list operation. */
export interface _ConnectivityConfigurationListResult {
  /** The ConnectivityConfiguration items on this page */
  value: ConnectivityConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectivityConfigurationListResultDeserializer(
  item: any,
): _ConnectivityConfigurationListResult {
  return {
    value: connectivityConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NetworkGroup list operation. */
export interface _NetworkGroupListResult {
  /** The NetworkGroup items on this page */
  value: NetworkGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkGroupListResultDeserializer(item: any): _NetworkGroupListResult {
  return {
    value: networkGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a StaticMember list operation. */
export interface _StaticMemberListResult {
  /** The StaticMember items on this page */
  value: StaticMember[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _staticMemberListResultDeserializer(item: any): _StaticMemberListResult {
  return {
    value: staticMemberArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NetworkManagerRoutingConfiguration list operation. */
export interface _NetworkManagerRoutingConfigurationListResult {
  /** The NetworkManagerRoutingConfiguration items on this page */
  value: NetworkManagerRoutingConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkManagerRoutingConfigurationListResultDeserializer(
  item: any,
): _NetworkManagerRoutingConfigurationListResult {
  return {
    value: networkManagerRoutingConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RoutingRuleCollection list operation. */
export interface _RoutingRuleCollectionListResult {
  /** The RoutingRuleCollection items on this page */
  value: RoutingRuleCollection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _routingRuleCollectionListResultDeserializer(
  item: any,
): _RoutingRuleCollectionListResult {
  return {
    value: routingRuleCollectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RoutingRule list operation. */
export interface _RoutingRuleListResult {
  /** The RoutingRule items on this page */
  value: RoutingRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _routingRuleListResultDeserializer(item: any): _RoutingRuleListResult {
  return {
    value: routingRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ScopeConnection list operation. */
export interface _ScopeConnectionListResult {
  /** The ScopeConnection items on this page */
  value: ScopeConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scopeConnectionListResultDeserializer(item: any): _ScopeConnectionListResult {
  return {
    value: scopeConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a SecurityAdminConfiguration list operation. */
export interface _SecurityAdminConfigurationListResult {
  /** The SecurityAdminConfiguration items on this page */
  value: SecurityAdminConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityAdminConfigurationListResultDeserializer(
  item: any,
): _SecurityAdminConfigurationListResult {
  return {
    value: securityAdminConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a AdminRuleCollection list operation. */
export interface _AdminRuleCollectionListResult {
  /** The AdminRuleCollection items on this page */
  value: AdminRuleCollection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _adminRuleCollectionListResultDeserializer(
  item: any,
): _AdminRuleCollectionListResult {
  return {
    value: adminRuleCollectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a SecurityUserConfiguration list operation. */
export interface _SecurityUserConfigurationListResult {
  /** The SecurityUserConfiguration items on this page */
  value: SecurityUserConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityUserConfigurationListResultDeserializer(
  item: any,
): _SecurityUserConfigurationListResult {
  return {
    value: securityUserConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a SecurityUserRuleCollection list operation. */
export interface _SecurityUserRuleCollectionListResult {
  /** The SecurityUserRuleCollection items on this page */
  value: SecurityUserRuleCollection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityUserRuleCollectionListResultDeserializer(
  item: any,
): _SecurityUserRuleCollectionListResult {
  return {
    value: securityUserRuleCollectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a SecurityUserRule list operation. */
export interface _SecurityUserRuleListResult {
  /** The SecurityUserRule items on this page */
  value: SecurityUserRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityUserRuleListResultDeserializer(item: any): _SecurityUserRuleListResult {
  return {
    value: securityUserRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NetworkProfile list operation. */
export interface _NetworkProfileListResult {
  /** The NetworkProfile items on this page */
  value: NetworkProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkProfileListResultDeserializer(item: any): _NetworkProfileListResult {
  return {
    value: networkProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NetworkSecurityGroup list operation. */
export interface _NetworkSecurityGroupListResult {
  /** The NetworkSecurityGroup items on this page */
  value: NetworkSecurityGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkSecurityGroupListResultDeserializer(
  item: any,
): _NetworkSecurityGroupListResult {
  return {
    value: networkSecurityGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a SecurityRule list operation. */
export interface _SecurityRuleListResult {
  /** The SecurityRule items on this page */
  value: SecurityRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityRuleListResultDeserializer(item: any): _SecurityRuleListResult {
  return {
    value: securityRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NetworkSecurityPerimeter list operation. */
export interface _NetworkSecurityPerimeterListResult {
  /** The NetworkSecurityPerimeter items on this page */
  value: NetworkSecurityPerimeter[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkSecurityPerimeterListResultDeserializer(
  item: any,
): _NetworkSecurityPerimeterListResult {
  return {
    value: networkSecurityPerimeterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ReachabilityAnalysisIntent list operation. */
export interface _ReachabilityAnalysisIntentListResult {
  /** The ReachabilityAnalysisIntent items on this page */
  value: ReachabilityAnalysisIntent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _reachabilityAnalysisIntentListResultDeserializer(
  item: any,
): _ReachabilityAnalysisIntentListResult {
  return {
    value: reachabilityAnalysisIntentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a VerifierWorkspace list operation. */
export interface _VerifierWorkspaceListResult {
  /** The VerifierWorkspace items on this page */
  value: VerifierWorkspace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _verifierWorkspaceListResultDeserializer(item: any): _VerifierWorkspaceListResult {
  return {
    value: verifierWorkspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ReachabilityAnalysisRun list operation. */
export interface _ReachabilityAnalysisRunListResult {
  /** The ReachabilityAnalysisRun items on this page */
  value: ReachabilityAnalysisRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _reachabilityAnalysisRunListResultDeserializer(
  item: any,
): _ReachabilityAnalysisRunListResult {
  return {
    value: reachabilityAnalysisRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NetworkVirtualAppliance list operation. */
export interface _NetworkVirtualApplianceListResult {
  /** The NetworkVirtualAppliance items on this page */
  value: NetworkVirtualAppliance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkVirtualApplianceListResultDeserializer(
  item: any,
): _NetworkVirtualApplianceListResult {
  return {
    value: networkVirtualApplianceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a FlowLog list operation. */
export interface _FlowLogListResult {
  /** The FlowLog items on this page */
  value: FlowLog[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _flowLogListResultDeserializer(item: any): _FlowLogListResult {
  return {
    value: flowLogArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a PrivateEndpoint list operation. */
export interface _PrivateEndpointListResult {
  /** The PrivateEndpoint items on this page */
  value: PrivateEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointListResultDeserializer(item: any): _PrivateEndpointListResult {
  return {
    value: privateEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a PrivateLinkService list operation. */
export interface _PrivateLinkServiceListResult {
  /** The PrivateLinkService items on this page */
  value: PrivateLinkService[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkServiceListResultDeserializer(
  item: any,
): _PrivateLinkServiceListResult {
  return {
    value: privateLinkServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a PublicIPPrefix list operation. */
export interface _PublicIPPrefixListResult {
  /** The PublicIPPrefix items on this page */
  value: PublicIPPrefix[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _publicIPPrefixListResultDeserializer(item: any): _PublicIPPrefixListResult {
  return {
    value: publicIPPrefixArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RouteFilter list operation. */
export interface _RouteFilterListResult {
  /** The RouteFilter items on this page */
  value: RouteFilter[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _routeFilterListResultDeserializer(item: any): _RouteFilterListResult {
  return {
    value: routeFilterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a RouteTable list operation. */
export interface _RouteTableListResult {
  /** The RouteTable items on this page */
  value: RouteTable[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _routeTableListResultDeserializer(item: any): _RouteTableListResult {
  return {
    value: routeTableArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a Route list operation. */
export interface _RouteListResult {
  /** The Route items on this page */
  value: Route[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _routeListResultDeserializer(item: any): _RouteListResult {
  return {
    value: routeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a SecurityPartnerProvider list operation. */
export interface _SecurityPartnerProviderListResult {
  /** The SecurityPartnerProvider items on this page */
  value: SecurityPartnerProvider[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityPartnerProviderListResultDeserializer(
  item: any,
): _SecurityPartnerProviderListResult {
  return {
    value: securityPartnerProviderArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ServiceEndpointPolicy list operation. */
export interface _ServiceEndpointPolicyListResult {
  /** The ServiceEndpointPolicy items on this page */
  value: ServiceEndpointPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serviceEndpointPolicyListResultDeserializer(
  item: any,
): _ServiceEndpointPolicyListResult {
  return {
    value: serviceEndpointPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ServiceEndpointPolicyDefinition list operation. */
export interface _ServiceEndpointPolicyDefinitionListResult {
  /** The ServiceEndpointPolicyDefinition items on this page */
  value: ServiceEndpointPolicyDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serviceEndpointPolicyDefinitionListResultDeserializer(
  item: any,
): _ServiceEndpointPolicyDefinitionListResult {
  return {
    value: serviceEndpointPolicyDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a VirtualNetwork list operation. */
export interface _VirtualNetworkListResult {
  /** The VirtualNetwork items on this page */
  value: VirtualNetwork[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkListResultDeserializer(item: any): _VirtualNetworkListResult {
  return {
    value: virtualNetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a Subnet list operation. */
export interface _SubnetListResult {
  /** The Subnet items on this page */
  value: Subnet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _subnetListResultDeserializer(item: any): _SubnetListResult {
  return {
    value: subnetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a VirtualNetworkPeering list operation. */
export interface _VirtualNetworkPeeringListResult {
  /** The VirtualNetworkPeering items on this page */
  value: VirtualNetworkPeering[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkPeeringListResultDeserializer(
  item: any,
): _VirtualNetworkPeeringListResult {
  return {
    value: virtualNetworkPeeringArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a VirtualNetworkGateway list operation. */
export interface _VirtualNetworkGatewayListResult {
  /** The VirtualNetworkGateway items on this page */
  value: VirtualNetworkGateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkGatewayListResultDeserializer(
  item: any,
): _VirtualNetworkGatewayListResult {
  return {
    value: virtualNetworkGatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Resource operation accepted. */
export interface ArmAcceptedLroResponse {}

export function armAcceptedLroResponseDeserializer(item: any): ArmAcceptedLroResponse {
  return item;
}

/** The response of a VirtualNetworkGatewayConnection list operation. */
export interface _VirtualNetworkGatewayConnectionListResult {
  /** The VirtualNetworkGatewayConnection items on this page */
  value: VirtualNetworkGatewayConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkGatewayConnectionListResultDeserializer(
  item: any,
): _VirtualNetworkGatewayConnectionListResult {
  return {
    value: virtualNetworkGatewayConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a LocalNetworkGateway list operation. */
export interface _LocalNetworkGatewayListResult {
  /** The LocalNetworkGateway items on this page */
  value: LocalNetworkGateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _localNetworkGatewayListResultDeserializer(
  item: any,
): _LocalNetworkGatewayListResult {
  return {
    value: localNetworkGatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a VirtualNetworkTap list operation. */
export interface _VirtualNetworkTapListResult {
  /** The VirtualNetworkTap items on this page */
  value: VirtualNetworkTap[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkTapListResultDeserializer(item: any): _VirtualNetworkTapListResult {
  return {
    value: virtualNetworkTapArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a VirtualRouter list operation. */
export interface _VirtualRouterListResult {
  /** The VirtualRouter items on this page */
  value: VirtualRouter[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualRouterListResultDeserializer(item: any): _VirtualRouterListResult {
  return {
    value: virtualRouterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a VirtualRouterPeering list operation. */
export interface _VirtualRouterPeeringListResult {
  /** The VirtualRouterPeering items on this page */
  value: VirtualRouterPeering[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualRouterPeeringListResultDeserializer(
  item: any,
): _VirtualRouterPeeringListResult {
  return {
    value: virtualRouterPeeringArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a VirtualNetworkAppliance list operation. */
export interface _VirtualNetworkApplianceListResult {
  /** The VirtualNetworkAppliance items on this page */
  value: VirtualNetworkAppliance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkApplianceListResultDeserializer(
  item: any,
): _VirtualNetworkApplianceListResult {
  return {
    value: virtualNetworkApplianceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ServiceGateway list operation. */
export interface _ServiceGatewayListResult {
  /** The ServiceGateway items on this page */
  value: ServiceGateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serviceGatewayListResultDeserializer(item: any): _ServiceGatewayListResult {
  return {
    value: serviceGatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ApplicationGatewayPrivateLinkResource list operation. */
export interface _ApplicationGatewayPrivateLinkResourceListResult {
  /** The ApplicationGatewayPrivateLinkResource items on this page */
  value: ApplicationGatewayPrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationGatewayPrivateLinkResourceListResultDeserializer(
  item: any,
): _ApplicationGatewayPrivateLinkResourceListResult {
  return {
    value: applicationGatewayPrivateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ExpressRouteProviderPort list operation. */
export interface ExpressRouteProviderPortListResult {
  /** The ExpressRouteProviderPort items on this page */
  value: ExpressRouteProviderPort[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function expressRouteProviderPortListResultDeserializer(
  item: any,
): ExpressRouteProviderPortListResult {
  return {
    value: expressRouteProviderPortArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a CustomIpPrefix list operation. */
export interface _CustomIpPrefixListResult {
  /** The CustomIpPrefix items on this page */
  value: CustomIpPrefix[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _customIpPrefixListResultDeserializer(item: any): _CustomIpPrefixListResult {
  return {
    value: customIpPrefixArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a DscpConfiguration list operation. */
export interface _DscpConfigurationListResult {
  /** The DscpConfiguration items on this page */
  value: DscpConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dscpConfigurationListResultDeserializer(item: any): _DscpConfigurationListResult {
  return {
    value: dscpConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NspProfile list operation. */
export interface _NspProfileListResult {
  /** The NspProfile items on this page */
  value: NspProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nspProfileListResultDeserializer(item: any): _NspProfileListResult {
  return {
    value: nspProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NspAccessRule list operation. */
export interface _NspAccessRuleListResult {
  /** The NspAccessRule items on this page */
  value: NspAccessRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nspAccessRuleListResultDeserializer(item: any): _NspAccessRuleListResult {
  return {
    value: nspAccessRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NspLink list operation. */
export interface _NspLinkListResult {
  /** The NspLink items on this page */
  value: NspLink[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nspLinkListResultDeserializer(item: any): _NspLinkListResult {
  return {
    value: nspLinkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NspLinkReference list operation. */
export interface _NspLinkReferenceListResult {
  /** The NspLinkReference items on this page */
  value: NspLinkReference[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nspLinkReferenceListResultDeserializer(item: any): _NspLinkReferenceListResult {
  return {
    value: nspLinkReferenceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NspLoggingConfiguration list operation. */
export interface _NspLoggingConfigurationListResult {
  /** The NspLoggingConfiguration items on this page */
  value: NspLoggingConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nspLoggingConfigurationListResultDeserializer(
  item: any,
): _NspLoggingConfigurationListResult {
  return {
    value: nspLoggingConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NetworkVirtualApplianceSku list operation. */
export interface _NetworkVirtualApplianceSkuListResult {
  /** The NetworkVirtualApplianceSku items on this page */
  value: NetworkVirtualApplianceSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkVirtualApplianceSkuListResultDeserializer(
  item: any,
): _NetworkVirtualApplianceSkuListResult {
  return {
    value: networkVirtualApplianceSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a AzureFirewallFqdnTag list operation. */
export interface _AzureFirewallFqdnTagListResult {
  /** The AzureFirewallFqdnTag items on this page */
  value: AzureFirewallFqdnTag[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _azureFirewallFqdnTagListResultDeserializer(
  item: any,
): _AzureFirewallFqdnTagListResult {
  return {
    value: azureFirewallFqdnTagArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ExpressRouteServiceProvider list operation. */
export interface _ExpressRouteServiceProviderListResult {
  /** The ExpressRouteServiceProvider items on this page */
  value: ExpressRouteServiceProvider[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _expressRouteServiceProviderListResultDeserializer(
  item: any,
): _ExpressRouteServiceProviderListResult {
  return {
    value: expressRouteServiceProviderArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The operations list. */
  operations?: OperationStatusResult[];
  /** If present, details of the operation error. */
  error?: ErrorDetail;
  /** Fully qualified ID of the resource against which the original async operation was started. */
  readonly resourceId?: string;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
}

/** The response of a BgpServiceCommunity list operation. */
export interface _BgpServiceCommunityListResult {
  /** The BgpServiceCommunity items on this page */
  value: BgpServiceCommunity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _bgpServiceCommunityListResultDeserializer(
  item: any,
): _BgpServiceCommunityListResult {
  return {
    value: bgpServiceCommunityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export type NetworkSecurityPerimeterAssociationsReconcileResponse = { body: any };

export type NetworkSecurityPerimeterAccessRulesReconcileResponse = { body: any };

export type VirtualNetworkGatewaysVpnDeviceConfigurationScriptResponse = { body: string };

export type VirtualNetworkGatewaysSupportedVpnDevicesResponse = { body: string };

export type ApplicationGatewaysListAvailableResponseHeadersResponse = { body: string[] };

export type ApplicationGatewaysListAvailableRequestHeadersResponse = { body: string[] };

export type ApplicationGatewaysListAvailableServerVariablesResponse = { body: string[] };
