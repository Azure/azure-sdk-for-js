// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementClient } from "./networkManagementClient.js";
import {
  _generatevirtualwanvpnserverconfigurationvpnprofileDeserialize,
  _deleteBastionShareableLinkByTokenDeserialize,
  _deleteBastionShareableLinkDeserialize,
} from "./api/operations.js";
import { _$deleteDeserialize, _createOrUpdateDeserialize } from "./api/routingIntent/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualHubIpConfiguration,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualHubIpConfiguration,
} from "./api/virtualHubIpConfiguration/operations.js";
import {
  _listAdvertisedRoutesDeserialize,
  _listLearnedRoutesDeserialize,
} from "./api/virtualHubBgpConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualHubBgpConnection,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualHubBgpConnection,
} from "./api/virtualHubBgpConnection/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeExpressRouteConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeExpressRouteConnections,
} from "./api/expressRouteConnections/operations.js";
import {
  _disconnectP2SVpnConnectionsDeserialize,
  _getP2SVpnConnectionHealthDetailedDeserialize,
  _getP2SVpnConnectionHealthDeserialize,
  _generateVpnProfileDeserialize,
  _resetDeserialize,
  _$deleteDeserialize as _$deleteDeserializeP2SVpnGateways,
  _updateTagsDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeP2SVpnGateways,
} from "./api/p2SVpnGateways/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNatRules,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNatRules,
} from "./api/natRules/operations.js";
import {
  _getIkeSasDeserialize,
  _resetConnectionDeserialize,
  _setOrInitDefaultSharedKeyDeserialize,
} from "./api/vpnLinkConnections/operations.js";
import {
  _stopPacketCaptureDeserialize,
  _startPacketCaptureDeserialize,
  _$deleteDeserialize as _$deleteDeserializeVpnConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVpnConnections,
} from "./api/vpnConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualHubRouteTableV2S,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualHubRouteTableV2S,
} from "./api/virtualHubRouteTableV2S/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeHubVirtualNetworkConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeHubVirtualNetworkConnections,
} from "./api/hubVirtualNetworkConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeConfigurationPolicyGroups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeConfigurationPolicyGroups,
} from "./api/configurationPolicyGroups/operations.js";
import { _listDeserialize } from "./api/vpnServerConfigurationsAssociatedWithVirtualWan/operations.js";
import { _downloadDeserialize } from "./api/vpnSitesConfiguration/operations.js";
import {
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRouteFilterRules,
  _$deleteDeserialize as _$deleteDeserializeRouteFilterRules,
} from "./api/routeFilterRules/operations.js";
import {
  _createOrUpdateDeserialize as _createOrUpdateDeserializePrivateDnsZoneGroups,
  _$deleteDeserialize as _$deleteDeserializePrivateDnsZoneGroups,
} from "./api/privateDnsZoneGroups/operations.js";
import {
  _stopDeserialize,
  _$deleteDeserialize as _$deleteDeserializeConnectionMonitors,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeConnectionMonitors,
} from "./api/connectionMonitors/operations.js";
import {
  _getStatusDeserialize,
  _stopDeserialize as _stopDeserializePacketCaptures,
  _$deleteDeserialize as _$deleteDeserializePacketCaptures,
  _createDeserialize,
} from "./api/packetCaptures/operations.js";
import { _createOrUpdateDeserialize as _createOrUpdateDeserializeInboundSecurityRule } from "./api/inboundSecurityRule/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeNetworkSecurityPerimeterLinkReferences } from "./api/networkSecurityPerimeterLinkReferences/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeNetworkSecurityPerimeterLinks } from "./api/networkSecurityPerimeterLinks/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNetworkSecurityPerimeterAssociations,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNetworkSecurityPerimeterAssociations,
} from "./api/networkSecurityPerimeterAssociations/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeAdminRules } from "./api/adminRules/operations.js";
import { _healthDeserialize } from "./api/loadBalancerLoadBalancingRules/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeLoadBalancerBackendAddressPools,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeLoadBalancerBackendAddressPools,
} from "./api/loadBalancerBackendAddressPools/operations.js";
import { _postDeserialize } from "./api/networkManagerCommits/operations.js";
import { _deployDeserialize } from "./api/firewallPolicyDeployments/operations.js";
import {
  _createOrUpdateDeserialize as _createOrUpdateDeserializeExpressRouteCrossConnectionPeerings,
  _$deleteDeserialize as _$deleteDeserializeExpressRouteCrossConnectionPeerings,
} from "./api/expressRouteCrossConnectionPeerings/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDscpConfiguration,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDscpConfiguration,
} from "./api/dscpConfiguration/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeCustomIPPrefixes,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCustomIPPrefixes,
} from "./api/customIPPrefixes/operations.js";
import { _createDeserialize as _createDeserializeVipSwap } from "./api/vipSwap/operations.js";
import {
  _updateServicesDeserialize,
  _updateAddressLocationsDeserialize,
  _$deleteDeserialize as _$deleteDeserializeServiceGateways,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServiceGateways,
} from "./api/serviceGateways/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualNetworkAppliances,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualNetworkAppliances,
} from "./api/virtualNetworkAppliances/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeWebApplicationFirewallPolicies } from "./api/webApplicationFirewallPolicies/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeHubRouteTables,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeHubRouteTables,
} from "./api/hubRouteTables/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeExpressRouteGateways,
  _updateTagsDeserialize as _updateTagsDeserializeExpressRouteGateways,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeExpressRouteGateways,
} from "./api/expressRouteGateways/operations.js";
import {
  _stopPacketCaptureDeserialize as _stopPacketCaptureDeserializeVpnGateways,
  _startPacketCaptureDeserialize as _startPacketCaptureDeserializeVpnGateways,
  _resetDeserialize as _resetDeserializeVpnGateways,
  _$deleteDeserialize as _$deleteDeserializeVpnGateways,
  _updateTagsDeserialize as _updateTagsDeserializeVpnGateways,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVpnGateways,
} from "./api/vpnGateways/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRouteMaps,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRouteMaps,
} from "./api/routeMaps/operations.js";
import {
  _getOutboundRoutesDeserialize,
  _getInboundRoutesDeserialize,
  _getEffectiveVirtualHubRoutesDeserialize,
  _$deleteDeserialize as _$deleteDeserializeVirtualHubs,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualHubs,
} from "./api/virtualHubs/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVpnServerConfigurations,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVpnServerConfigurations,
} from "./api/vpnServerConfigurations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVpnSites,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVpnSites,
} from "./api/vpnSites/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualWans,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualWans,
} from "./api/virtualWans/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualRouterPeerings,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualRouterPeerings,
} from "./api/virtualRouterPeerings/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualRouters,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualRouters,
} from "./api/virtualRouters/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualNetworkTaps,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualNetworkTaps,
} from "./api/virtualNetworkTaps/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualNetworkGatewayNatRules,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualNetworkGatewayNatRules,
} from "./api/virtualNetworkGatewayNatRules/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeLocalNetworkGateways,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeLocalNetworkGateways,
} from "./api/localNetworkGateways/operations.js";
import {
  _resetConnectionDeserialize as _resetConnectionDeserializeVirtualNetworkGatewayConnections,
  _getIkeSasDeserialize as _getIkeSasDeserializeVirtualNetworkGatewayConnections,
  _stopPacketCaptureDeserialize as _stopPacketCaptureDeserializeVirtualNetworkGatewayConnections,
  _startPacketCaptureDeserialize as _startPacketCaptureDeserializeVirtualNetworkGatewayConnections,
  _resetSharedKeyDeserialize,
  _setSharedKeyDeserialize,
  _$deleteDeserialize as _$deleteDeserializeVirtualNetworkGatewayConnections,
  _updateTagsDeserialize as _updateTagsDeserializeVirtualNetworkGatewayConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualNetworkGatewayConnections,
} from "./api/virtualNetworkGatewayConnections/operations.js";
import {
  _invokeAbortMigrationDeserialize,
  _invokeCommitMigrationDeserialize,
  _invokeExecuteMigrationDeserialize,
  _invokePrepareMigrationDeserialize,
  _disconnectVirtualNetworkGatewayVpnConnectionsDeserialize,
  _getVpnclientConnectionHealthDeserialize,
  _stopExpressRouteSiteFailoverSimulationDeserialize,
  _startExpressRouteSiteFailoverSimulationDeserialize,
  _getFailoverSingleTestDetailsDeserialize,
  _getFailoverAllTestDetailsDeserialize,
  _stopPacketCaptureDeserialize as _stopPacketCaptureDeserializeVirtualNetworkGateways,
  _startPacketCaptureDeserialize as _startPacketCaptureDeserializeVirtualNetworkGateways,
  _getVpnclientIpsecParametersDeserialize,
  _setVpnclientIpsecParametersDeserialize,
  _getRoutesInformationDeserialize,
  _getResiliencyInformationDeserialize,
  _getAdvertisedRoutesDeserialize,
  _getLearnedRoutesDeserialize,
  _getBgpPeerStatusDeserialize,
  _getVpnProfilePackageUrlDeserialize,
  _generateVpnProfileDeserialize as _generateVpnProfileDeserializeVirtualNetworkGateways,
  _generatevpnclientpackageDeserialize,
  _resetVpnClientSharedKeyDeserialize,
  _resetDeserialize as _resetDeserializeVirtualNetworkGateways,
  _$deleteDeserialize as _$deleteDeserializeVirtualNetworkGateways,
  _updateTagsDeserialize as _updateTagsDeserializeVirtualNetworkGateways,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualNetworkGateways,
} from "./api/virtualNetworkGateways/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualNetworkPeerings,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualNetworkPeerings,
} from "./api/virtualNetworkPeerings/operations.js";
import {
  _unprepareNetworkPoliciesDeserialize,
  _prepareNetworkPoliciesDeserialize,
  _$deleteDeserialize as _$deleteDeserializeSubnets,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSubnets,
} from "./api/subnets/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualNetworks,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualNetworks,
} from "./api/virtualNetworks/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeServiceEndpointPolicyDefinitions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServiceEndpointPolicyDefinitions,
} from "./api/serviceEndpointPolicyDefinitions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeServiceEndpointPolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeServiceEndpointPolicies,
} from "./api/serviceEndpointPolicies/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSecurityPartnerProviders,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSecurityPartnerProviders,
} from "./api/securityPartnerProviders/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRoutes,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRoutes,
} from "./api/routes/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRouteTables,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRouteTables,
} from "./api/routeTables/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeRouteFilters,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeRouteFilters,
} from "./api/routeFilters/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePublicIPPrefixes,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePublicIPPrefixes,
} from "./api/publicIPPrefixes/operations.js";
import {
  _checkPrivateLinkServiceVisibilityByResourceGroupDeserialize,
  _checkPrivateLinkServiceVisibilityDeserialize,
  _deletePrivateEndpointConnectionDeserialize,
  _$deleteDeserialize as _$deleteDeserializePrivateLinkServices,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePrivateLinkServices,
} from "./api/privateLinkServices/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePrivateEndpoints,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePrivateEndpoints,
} from "./api/privateEndpoints/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeFlowLogs,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeFlowLogs,
} from "./api/flowLogs/operations.js";
import {
  _getNetworkConfigurationDiagnosticDeserialize,
  _listAvailableProvidersDeserialize,
  _getAzureReachabilityReportDeserialize,
  _checkConnectivityDeserialize,
  _getFlowLogStatusDeserialize,
  _setFlowLogConfigurationDeserialize,
  _getTroubleshootingResultDeserialize,
  _getTroubleshootingDeserialize,
  _getVMSecurityRulesDeserialize,
  _getNextHopDeserialize,
  _verifyIPFlowDeserialize,
  _$deleteDeserialize as _$deleteDeserializeNetworkWatchers,
} from "./api/networkWatchers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeVirtualApplianceSites,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeVirtualApplianceSites,
} from "./api/virtualApplianceSites/operations.js";
import {
  _getBootDiagnosticLogsDeserialize,
  _reimageDeserialize,
  _restartDeserialize,
  _$deleteDeserialize as _$deleteDeserializeNetworkVirtualAppliances,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNetworkVirtualAppliances,
} from "./api/networkVirtualAppliances/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNetworkVirtualApplianceConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNetworkVirtualApplianceConnections,
} from "./api/networkVirtualApplianceConnections/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeReachabilityAnalysisRuns } from "./api/reachabilityAnalysisRuns/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeVerifierWorkspaces } from "./api/verifierWorkspaces/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeNetworkSecurityPerimeters } from "./api/networkSecurityPerimeters/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSecurityRules,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSecurityRules,
} from "./api/securityRules/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNetworkSecurityGroups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNetworkSecurityGroups,
} from "./api/networkSecurityGroups/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeNetworkProfiles } from "./api/networkProfiles/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeSecurityUserRules } from "./api/securityUserRules/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeSecurityUserRuleCollections } from "./api/securityUserRuleCollections/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeSecurityUserConfigurations } from "./api/securityUserConfigurations/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeAdminRuleCollections } from "./api/adminRuleCollections/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeSecurityAdminConfigurations } from "./api/securityAdminConfigurations/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeRoutingRules } from "./api/routingRules/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeRoutingRuleCollections } from "./api/routingRuleCollections/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeNetworkManagerRoutingConfigurations } from "./api/networkManagerRoutingConfigurations/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeNetworkGroups } from "./api/networkGroups/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeConnectivityConfigurations } from "./api/connectivityConfigurations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNetworkInterfaceTapConfigurations,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNetworkInterfaceTapConfigurations,
} from "./api/networkInterfaceTapConfigurations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeNatGateways,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNatGateways,
} from "./api/natGateways/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeInboundNatRules,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeInboundNatRules,
} from "./api/inboundNatRules/operations.js";
import {
  _swapPublicIpAddressesDeserialize,
  _listInboundNatRulePortMappingsDeserialize,
  _$deleteDeserialize as _$deleteDeserializeLoadBalancers,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeLoadBalancers,
} from "./api/loadBalancers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeIpGroups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeIpGroups,
} from "./api/ipGroups/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeIpAllocations,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeIpAllocations,
} from "./api/ipAllocations/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeStaticCidrs } from "./api/staticCidrs/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeNetworkManagers } from "./api/networkManagers/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeIpamPools,
  _createDeserialize as _createDeserializeIpamPools,
} from "./api/ipamPools/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeFirewallPolicyRuleCollectionGroups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeFirewallPolicyRuleCollectionGroups,
} from "./api/firewallPolicyRuleCollectionGroups/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeFirewallPolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeFirewallPolicies,
} from "./api/firewallPolicies/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeExpressRoutePortAuthorizations,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeExpressRoutePortAuthorizations,
} from "./api/expressRoutePortAuthorizations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeExpressRoutePorts,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeExpressRoutePorts,
} from "./api/expressRoutePorts/operations.js";
import {
  _listRoutesTableDeserialize,
  _listRoutesTableSummaryDeserialize,
  _listArpTableDeserialize,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeExpressRouteCrossConnections,
} from "./api/expressRouteCrossConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeExpressRouteCircuitConnections,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeExpressRouteCircuitConnections,
} from "./api/expressRouteCircuitConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeExpressRouteCircuitPeerings,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeExpressRouteCircuitPeerings,
} from "./api/expressRouteCircuitPeerings/operations.js";
import {
  _listRoutesTableSummaryDeserialize as _listRoutesTableSummaryDeserializeExpressRouteCircuits,
  _listRoutesTableDeserialize as _listRoutesTableDeserializeExpressRouteCircuits,
  _listArpTableDeserialize as _listArpTableDeserializeExpressRouteCircuits,
  _$deleteDeserialize as _$deleteDeserializeExpressRouteCircuits,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeExpressRouteCircuits,
} from "./api/expressRouteCircuits/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeExpressRouteCircuitAuthorizations,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeExpressRouteCircuitAuthorizations,
} from "./api/expressRouteCircuitAuthorizations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDdosProtectionPlans,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDdosProtectionPlans,
} from "./api/ddosProtectionPlans/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDdosCustomPolicies,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDdosCustomPolicies,
} from "./api/ddosCustomPolicies/operations.js";
import {
  _disassociateCloudServiceReservedPublicIpDeserialize,
  _reserveCloudServicePublicIpAddressDeserialize,
  _ddosProtectionStatusDeserialize,
  _$deleteDeserialize as _$deleteDeserializePublicIPAddresses,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePublicIPAddresses,
} from "./api/publicIPAddresses/operations.js";
import {
  _listEffectiveNetworkSecurityGroupsDeserialize,
  _getEffectiveRouteTableDeserialize,
  _$deleteDeserialize as _$deleteDeserializeNetworkInterfaces,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNetworkInterfaces,
} from "./api/networkInterfaces/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeBastionHosts,
  _updateTagsDeserialize as _updateTagsDeserializeBastionHosts,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeBastionHosts,
} from "./api/bastionHosts/operations.js";
import {
  _packetCaptureOperationDeserialize,
  _packetCaptureDeserialize,
  _listLearnedPrefixesDeserialize,
  _$deleteDeserialize as _$deleteDeserializeAzureFirewalls,
  _updateTagsDeserialize as _updateTagsDeserializeAzureFirewalls,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeAzureFirewalls,
} from "./api/azureFirewalls/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeApplicationSecurityGroups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeApplicationSecurityGroups,
} from "./api/applicationSecurityGroups/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeApplicationGatewayPrivateEndpointConnections,
  _updateDeserialize,
} from "./api/applicationGatewayPrivateEndpointConnections/operations.js";
import {
  _backendHealthOnDemandDeserialize,
  _backendHealthDeserialize,
  _stopDeserialize as _stopDeserializeApplicationGateways,
  _startDeserialize,
  _$deleteDeserialize as _$deleteDeserializeApplicationGateways,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeApplicationGateways,
} from "./api/applicationGateways/operations.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
import type { OperationOptions, PathUncheckedResponse } from "@azure-rest/core-client";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { PollerLike, OperationState, ResourceLocationConfig } from "@azure/core-lro";
import { deserializeState } from "@azure/core-lro";

export interface RestorePollerOptions<
  TResult,
  TResponse extends PathUncheckedResponse = PathUncheckedResponse,
> extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /** Deserialization function for raw response body */
  processResponseBody?: (result: TResponse) => Promise<TResult>;
}

/**
 * Creates a poller from the serialized state of another poller. This can be
 * useful when you want to create pollers on a different host or a poller
 * needs to be constructed after the original one is not in scope.
 */
export function restorePoller<TResponse extends PathUncheckedResponse, TResult>(
  client: NetworkManagementClient,
  serializedState: string,
  sourceOperation: (...args: any[]) => PollerLike<OperationState<TResult>, TResult>,
  options?: RestorePollerOptions<TResult>,
): PollerLike<OperationState<TResult>, TResult> {
  const pollerConfig = deserializeState(serializedState).config;
  const { initialRequestUrl, requestMethod, metadata } = pollerConfig;
  if (!initialRequestUrl || !requestMethod) {
    throw new Error(
      `Invalid serialized state: ${serializedState} for sourceOperation ${sourceOperation?.name}`,
    );
  }
  const resourceLocationConfig = metadata?.["resourceLocationConfig"] as
    | ResourceLocationConfig
    | undefined;
  const { deserializer, expectedStatuses = [] } =
    getDeserializationHelper(initialRequestUrl, requestMethod) ?? {};
  const deserializeHelper = options?.processResponseBody ?? deserializer;
  if (!deserializeHelper) {
    throw new Error(
      `Please ensure the operation is in this client! We can't find its deserializeHelper for ${sourceOperation?.name}.`,
    );
  }
  const apiVersion = getApiVersionFromUrl(initialRequestUrl);
  return getLongRunningPoller(
    (client as any)["_client"] ?? client,
    deserializeHelper as (result: TResponse) => Promise<TResult>,
    expectedStatuses,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      resourceLocationConfig,
      restoreFrom: serializedState,
      initialRequestUrl,
      apiVersion,
    },
  );
}

interface DeserializationHelper {
  deserializer: (result: PathUncheckedResponse) => Promise<any>;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{virtualWANName}/generateVpnProfile":
    {
      deserializer: _generatevirtualwanvpnserverconfigurationvpnprofileDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/deleteShareableLinksByToken":
    {
      deserializer: _deleteBastionShareableLinkByTokenDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/deleteShareableLinks":
    {
      deserializer: _deleteBastionShareableLinkDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routingIntent/{routingIntentName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routingIntent/{routingIntentName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/ipConfigurations/{ipConfigName}":
    {
      deserializer: _$deleteDeserializeVirtualHubIpConfiguration,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/ipConfigurations/{ipConfigName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualHubIpConfiguration,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{hubName}/bgpConnections/{connectionName}/advertisedRoutes":
    { deserializer: _listAdvertisedRoutesDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{hubName}/bgpConnections/{connectionName}/learnedRoutes":
    { deserializer: _listLearnedRoutesDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/bgpConnections/{connectionName}":
    {
      deserializer: _$deleteDeserializeVirtualHubBgpConnection,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/bgpConnections/{connectionName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualHubBgpConnection,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}/expressRouteConnections/{connectionName}":
    {
      deserializer: _$deleteDeserializeExpressRouteConnections,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}/expressRouteConnections/{connectionName}":
    {
      deserializer: _createOrUpdateDeserializeExpressRouteConnections,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{p2sVpnGatewayName}/disconnectP2sVpnConnections":
    {
      deserializer: _disconnectP2SVpnConnectionsDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}/getP2sVpnConnectionHealthDetailed":
    {
      deserializer: _getP2SVpnConnectionHealthDetailedDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}/getP2sVpnConnectionHealth":
    {
      deserializer: _getP2SVpnConnectionHealthDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}/generatevpnprofile":
    { deserializer: _generateVpnProfileDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}/reset":
    { deserializer: _resetDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}":
    { deserializer: _$deleteDeserializeP2SVpnGateways, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}":
    { deserializer: _updateTagsDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}":
    {
      deserializer: _createOrUpdateDeserializeP2SVpnGateways,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/natRules/{natRuleName}":
    { deserializer: _$deleteDeserializeNatRules, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/natRules/{natRuleName}":
    { deserializer: _createOrUpdateDeserializeNatRules, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}/vpnLinkConnections/{linkConnectionName}/getikesas":
    { deserializer: _getIkeSasDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}/vpnLinkConnections/{linkConnectionName}/resetconnection":
    { deserializer: _resetConnectionDeserialize, expectedStatuses: ["202", "200", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}/vpnLinkConnections/{linkConnectionName}/sharedKeys/default":
    {
      deserializer: _setOrInitDefaultSharedKeyDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{vpnConnectionName}/stoppacketcapture":
    { deserializer: _stopPacketCaptureDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{vpnConnectionName}/startpacketcapture":
    { deserializer: _startPacketCaptureDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}":
    { deserializer: _$deleteDeserializeVpnConnections, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}":
    {
      deserializer: _createOrUpdateDeserializeVpnConnections,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeTables/{routeTableName}":
    {
      deserializer: _$deleteDeserializeVirtualHubRouteTableV2S,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeTables/{routeTableName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualHubRouteTableV2S,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/hubVirtualNetworkConnections/{connectionName}":
    {
      deserializer: _$deleteDeserializeHubVirtualNetworkConnections,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/hubVirtualNetworkConnections/{connectionName}":
    {
      deserializer: _createOrUpdateDeserializeHubVirtualNetworkConnections,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}/configurationPolicyGroups/{configurationPolicyGroupName}":
    {
      deserializer: _$deleteDeserializeConfigurationPolicyGroups,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}/configurationPolicyGroups/{configurationPolicyGroupName}":
    {
      deserializer: _createOrUpdateDeserializeConfigurationPolicyGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{virtualWANName}/vpnServerConfigurations":
    { deserializer: _listDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{virtualWANName}/vpnConfiguration":
    { deserializer: _downloadDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}/routeFilterRules/{ruleName}":
    {
      deserializer: _createOrUpdateDeserializeRouteFilterRules,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}/routeFilterRules/{ruleName}":
    { deserializer: _$deleteDeserializeRouteFilterRules, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}/privateDnsZoneGroups/{privateDnsZoneGroupName}":
    {
      deserializer: _createOrUpdateDeserializePrivateDnsZoneGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}/privateDnsZoneGroups/{privateDnsZoneGroupName}":
    {
      deserializer: _$deleteDeserializePrivateDnsZoneGroups,
      expectedStatuses: ["200", "202", "204"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/connectionMonitors/{connectionMonitorName}/stop":
    { deserializer: _stopDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/connectionMonitors/{connectionMonitorName}":
    {
      deserializer: _$deleteDeserializeConnectionMonitors,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/connectionMonitors/{connectionMonitorName}":
    {
      deserializer: _createOrUpdateDeserializeConnectionMonitors,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/packetCaptures/{packetCaptureName}/queryStatus":
    { deserializer: _getStatusDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/packetCaptures/{packetCaptureName}/stop":
    { deserializer: _stopDeserializePacketCaptures, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/packetCaptures/{packetCaptureName}":
    { deserializer: _$deleteDeserializePacketCaptures, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/packetCaptures/{packetCaptureName}":
    { deserializer: _createDeserialize, expectedStatuses: ["201", "200", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/inboundSecurityRules/{ruleCollectionName}":
    {
      deserializer: _createOrUpdateDeserializeInboundSecurityRule,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/linkReferences/{linkReferenceName}":
    {
      deserializer: _$deleteDeserializeNetworkSecurityPerimeterLinkReferences,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/links/{linkName}":
    {
      deserializer: _$deleteDeserializeNetworkSecurityPerimeterLinks,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/resourceAssociations/{associationName}":
    {
      deserializer: _$deleteDeserializeNetworkSecurityPerimeterAssociations,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}/resourceAssociations/{associationName}":
    {
      deserializer: _createOrUpdateDeserializeNetworkSecurityPerimeterAssociations,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityAdminConfigurations/{configurationName}/ruleCollections/{ruleCollectionName}/rules/{ruleName}":
    { deserializer: _$deleteDeserializeAdminRules, expectedStatuses: ["200", "202", "204"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/loadBalancingRules/{loadBalancingRuleName}/health":
    { deserializer: _healthDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendAddressPoolName}":
    {
      deserializer: _$deleteDeserializeLoadBalancerBackendAddressPools,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendAddressPoolName}":
    {
      deserializer: _createOrUpdateDeserializeLoadBalancerBackendAddressPools,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/commit":
    { deserializer: _postDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/deploy":
    { deserializer: _deployDeserialize, expectedStatuses: ["202", "200", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}":
    {
      deserializer: _createOrUpdateDeserializeExpressRouteCrossConnectionPeerings,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}":
    {
      deserializer: _$deleteDeserializeExpressRouteCrossConnectionPeerings,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dscpConfigurations/{dscpConfigurationName}":
    { deserializer: _$deleteDeserializeDscpConfiguration, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dscpConfigurations/{dscpConfigurationName}":
    {
      deserializer: _createOrUpdateDeserializeDscpConfiguration,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/customIpPrefixes/{customIpPrefixName}":
    { deserializer: _$deleteDeserializeCustomIPPrefixes, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/customIpPrefixes/{customIpPrefixName}":
    {
      deserializer: _createOrUpdateDeserializeCustomIPPrefixes,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/microsoft.Compute/cloudServices/{resourceName}/providers/Microsoft.Network/cloudServiceSlots/{singletonResource}":
    { deserializer: _createDeserializeVipSwap, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}/updateServices":
    { deserializer: _updateServicesDeserialize, expectedStatuses: ["202", "204", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}/updateAddressLocations":
    {
      deserializer: _updateAddressLocationsDeserialize,
      expectedStatuses: ["202", "204", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}":
    { deserializer: _$deleteDeserializeServiceGateways, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceGateways/{serviceGatewayName}":
    {
      deserializer: _createOrUpdateDeserializeServiceGateways,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkAppliances/{virtualNetworkApplianceName}":
    {
      deserializer: _$deleteDeserializeVirtualNetworkAppliances,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkAppliances/{virtualNetworkApplianceName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualNetworkAppliances,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ApplicationGatewayWebApplicationFirewallPolicies/{policyName}":
    {
      deserializer: _$deleteDeserializeWebApplicationFirewallPolicies,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/hubRouteTables/{routeTableName}":
    { deserializer: _$deleteDeserializeHubRouteTables, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/hubRouteTables/{routeTableName}":
    {
      deserializer: _createOrUpdateDeserializeHubRouteTables,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}":
    {
      deserializer: _$deleteDeserializeExpressRouteGateways,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}":
    {
      deserializer: _updateTagsDeserializeExpressRouteGateways,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/{expressRouteGatewayName}":
    {
      deserializer: _createOrUpdateDeserializeExpressRouteGateways,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/stoppacketcapture":
    {
      deserializer: _stopPacketCaptureDeserializeVpnGateways,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/startpacketcapture":
    {
      deserializer: _startPacketCaptureDeserializeVpnGateways,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/reset":
    { deserializer: _resetDeserializeVpnGateways, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}":
    { deserializer: _$deleteDeserializeVpnGateways, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}":
    { deserializer: _updateTagsDeserializeVpnGateways, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}":
    {
      deserializer: _createOrUpdateDeserializeVpnGateways,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeMaps/{routeMapName}":
    { deserializer: _$deleteDeserializeRouteMaps, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeMaps/{routeMapName}":
    { deserializer: _createOrUpdateDeserializeRouteMaps, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/outboundRoutes":
    { deserializer: _getOutboundRoutesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/inboundRoutes":
    { deserializer: _getInboundRoutesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/effectiveRoutes":
    {
      deserializer: _getEffectiveVirtualHubRoutesDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}":
    { deserializer: _$deleteDeserializeVirtualHubs, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualHubs,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}":
    {
      deserializer: _$deleteDeserializeVpnServerConfigurations,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}":
    {
      deserializer: _createOrUpdateDeserializeVpnServerConfigurations,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnSites/{vpnSiteName}":
    { deserializer: _$deleteDeserializeVpnSites, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnSites/{vpnSiteName}":
    { deserializer: _createOrUpdateDeserializeVpnSites, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{VirtualWANName}":
    { deserializer: _$deleteDeserializeVirtualWans, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{VirtualWANName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualWans,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualRouters/{virtualRouterName}/peerings/{peeringName}":
    {
      deserializer: _$deleteDeserializeVirtualRouterPeerings,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualRouters/{virtualRouterName}/peerings/{peeringName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualRouterPeerings,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualRouters/{virtualRouterName}":
    { deserializer: _$deleteDeserializeVirtualRouters, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualRouters/{virtualRouterName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualRouters,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkTaps/{tapName}":
    {
      deserializer: _$deleteDeserializeVirtualNetworkTaps,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkTaps/{tapName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualNetworkTaps,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/natRules/{natRuleName}":
    {
      deserializer: _$deleteDeserializeVirtualNetworkGatewayNatRules,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/natRules/{natRuleName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualNetworkGatewayNatRules,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/localNetworkGateways/{localNetworkGatewayName}":
    {
      deserializer: _$deleteDeserializeLocalNetworkGateways,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/localNetworkGateways/{localNetworkGatewayName}":
    {
      deserializer: _createOrUpdateDeserializeLocalNetworkGateways,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/resetconnection":
    {
      deserializer: _resetConnectionDeserializeVirtualNetworkGatewayConnections,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/getikesas":
    {
      deserializer: _getIkeSasDeserializeVirtualNetworkGatewayConnections,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/stopPacketCapture":
    {
      deserializer: _stopPacketCaptureDeserializeVirtualNetworkGatewayConnections,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/startPacketCapture":
    {
      deserializer: _startPacketCaptureDeserializeVirtualNetworkGatewayConnections,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/sharedkey/reset":
    { deserializer: _resetSharedKeyDeserialize, expectedStatuses: ["202", "200", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/sharedkey":
    { deserializer: _setSharedKeyDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}":
    {
      deserializer: _$deleteDeserializeVirtualNetworkGatewayConnections,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}":
    {
      deserializer: _updateTagsDeserializeVirtualNetworkGatewayConnections,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualNetworkGatewayConnections,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/abortMigration":
    { deserializer: _invokeAbortMigrationDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/commitMigration":
    { deserializer: _invokeCommitMigrationDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/executeMigration":
    { deserializer: _invokeExecuteMigrationDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/prepareMigration":
    { deserializer: _invokePrepareMigrationDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/disconnectVirtualNetworkGatewayVpnConnections":
    {
      deserializer: _disconnectVirtualNetworkGatewayVpnConnectionsDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getVpnClientConnectionHealth":
    {
      deserializer: _getVpnclientConnectionHealthDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/stopSiteFailoverTest":
    {
      deserializer: _stopExpressRouteSiteFailoverSimulationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/startSiteFailoverTest":
    {
      deserializer: _startExpressRouteSiteFailoverSimulationDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getFailoverSingleTestDetails":
    {
      deserializer: _getFailoverSingleTestDetailsDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getFailoverAllTestsDetails":
    {
      deserializer: _getFailoverAllTestDetailsDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/stopPacketCapture":
    {
      deserializer: _stopPacketCaptureDeserializeVirtualNetworkGateways,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/startPacketCapture":
    {
      deserializer: _startPacketCaptureDeserializeVirtualNetworkGateways,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getvpnclientipsecparameters":
    {
      deserializer: _getVpnclientIpsecParametersDeserialize,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/setvpnclientipsecparameters":
    {
      deserializer: _setVpnclientIpsecParametersDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getRoutesInformation":
    { deserializer: _getRoutesInformationDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getResiliencyInformation":
    { deserializer: _getResiliencyInformationDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getAdvertisedRoutes":
    { deserializer: _getAdvertisedRoutesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getLearnedRoutes":
    { deserializer: _getLearnedRoutesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getBgpPeerStatus":
    { deserializer: _getBgpPeerStatusDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/getvpnprofilepackageurl":
    { deserializer: _getVpnProfilePackageUrlDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/generatevpnprofile":
    {
      deserializer: _generateVpnProfileDeserializeVirtualNetworkGateways,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/generatevpnclientpackage":
    { deserializer: _generatevpnclientpackageDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/resetvpnclientsharedkey":
    { deserializer: _resetVpnClientSharedKeyDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}/reset":
    {
      deserializer: _resetDeserializeVirtualNetworkGateways,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}":
    {
      deserializer: _$deleteDeserializeVirtualNetworkGateways,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}":
    {
      deserializer: _updateTagsDeserializeVirtualNetworkGateways,
      expectedStatuses: ["200", "202", "201"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/{virtualNetworkGatewayName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualNetworkGateways,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings/{virtualNetworkPeeringName}":
    {
      deserializer: _$deleteDeserializeVirtualNetworkPeerings,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings/{virtualNetworkPeeringName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualNetworkPeerings,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/unprepareNetworkPolicies":
    { deserializer: _unprepareNetworkPoliciesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/prepareNetworkPolicies":
    { deserializer: _prepareNetworkPoliciesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}":
    { deserializer: _$deleteDeserializeSubnets, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}":
    { deserializer: _createOrUpdateDeserializeSubnets, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}":
    { deserializer: _$deleteDeserializeVirtualNetworks, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualNetworks,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}/serviceEndpointPolicyDefinitions/{serviceEndpointPolicyDefinitionName}":
    {
      deserializer: _$deleteDeserializeServiceEndpointPolicyDefinitions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}/serviceEndpointPolicyDefinitions/{serviceEndpointPolicyDefinitionName}":
    {
      deserializer: _createOrUpdateDeserializeServiceEndpointPolicyDefinitions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}":
    {
      deserializer: _$deleteDeserializeServiceEndpointPolicies,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}":
    {
      deserializer: _createOrUpdateDeserializeServiceEndpointPolicies,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/securityPartnerProviders/{securityPartnerProviderName}":
    {
      deserializer: _$deleteDeserializeSecurityPartnerProviders,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/securityPartnerProviders/{securityPartnerProviderName}":
    {
      deserializer: _createOrUpdateDeserializeSecurityPartnerProviders,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeTables/{routeTableName}/routes/{routeName}":
    { deserializer: _$deleteDeserializeRoutes, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeTables/{routeTableName}/routes/{routeName}":
    { deserializer: _createOrUpdateDeserializeRoutes, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeTables/{routeTableName}":
    { deserializer: _$deleteDeserializeRouteTables, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeTables/{routeTableName}":
    {
      deserializer: _createOrUpdateDeserializeRouteTables,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}":
    { deserializer: _$deleteDeserializeRouteFilters, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/routeFilters/{routeFilterName}":
    {
      deserializer: _createOrUpdateDeserializeRouteFilters,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIpPrefixName}":
    { deserializer: _$deleteDeserializePublicIPPrefixes, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIpPrefixName}":
    {
      deserializer: _createOrUpdateDeserializePublicIPPrefixes,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/locations/{location}/checkPrivateLinkServiceVisibility":
    {
      deserializer: _checkPrivateLinkServiceVisibilityByResourceGroupDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/checkPrivateLinkServiceVisibility":
    {
      deserializer: _checkPrivateLinkServiceVisibilityDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}/privateEndpointConnections/{peConnectionName}":
    {
      deserializer: _deletePrivateEndpointConnectionDeserialize,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}":
    {
      deserializer: _$deleteDeserializePrivateLinkServices,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateLinkServices/{serviceName}":
    {
      deserializer: _createOrUpdateDeserializePrivateLinkServices,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}":
    { deserializer: _$deleteDeserializePrivateEndpoints, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}":
    {
      deserializer: _createOrUpdateDeserializePrivateEndpoints,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/flowLogs/{flowLogName}":
    { deserializer: _$deleteDeserializeFlowLogs, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/flowLogs/{flowLogName}":
    { deserializer: _createOrUpdateDeserializeFlowLogs, expectedStatuses: ["200", "201", "202"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/networkConfigurationDiagnostic":
    {
      deserializer: _getNetworkConfigurationDiagnosticDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/availableProvidersList":
    { deserializer: _listAvailableProvidersDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/azureReachabilityReport":
    {
      deserializer: _getAzureReachabilityReportDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/connectivityCheck":
    { deserializer: _checkConnectivityDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/queryFlowLogStatus":
    { deserializer: _getFlowLogStatusDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/configureFlowLog":
    { deserializer: _setFlowLogConfigurationDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/queryTroubleshootResult":
    { deserializer: _getTroubleshootingResultDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/troubleshoot":
    { deserializer: _getTroubleshootingDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/securityGroupView":
    { deserializer: _getVMSecurityRulesDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/nextHop":
    { deserializer: _getNextHopDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}/ipFlowVerify":
    { deserializer: _verifyIPFlowDeserialize, expectedStatuses: ["200", "202", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkWatchers/{networkWatcherName}":
    { deserializer: _$deleteDeserializeNetworkWatchers, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/virtualApplianceSites/{siteName}":
    {
      deserializer: _$deleteDeserializeVirtualApplianceSites,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/virtualApplianceSites/{siteName}":
    {
      deserializer: _createOrUpdateDeserializeVirtualApplianceSites,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/getBootDiagnosticLogs":
    { deserializer: _getBootDiagnosticLogsDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/reimage":
    { deserializer: _reimageDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/restart":
    { deserializer: _restartDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}":
    {
      deserializer: _$deleteDeserializeNetworkVirtualAppliances,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}":
    {
      deserializer: _createOrUpdateDeserializeNetworkVirtualAppliances,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/networkVirtualApplianceConnections/{connectionName}":
    {
      deserializer: _$deleteDeserializeNetworkVirtualApplianceConnections,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}/networkVirtualApplianceConnections/{connectionName}":
    {
      deserializer: _createOrUpdateDeserializeNetworkVirtualApplianceConnections,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/verifierWorkspaces/{workspaceName}/reachabilityAnalysisRuns/{reachabilityAnalysisRunName}":
    {
      deserializer: _$deleteDeserializeReachabilityAnalysisRuns,
      expectedStatuses: ["202", "204", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/verifierWorkspaces/{workspaceName}":
    {
      deserializer: _$deleteDeserializeVerifierWorkspaces,
      expectedStatuses: ["202", "204", "200"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityPerimeters/{networkSecurityPerimeterName}":
    {
      deserializer: _$deleteDeserializeNetworkSecurityPerimeters,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}/securityRules/{securityRuleName}":
    { deserializer: _$deleteDeserializeSecurityRules, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}/securityRules/{securityRuleName}":
    {
      deserializer: _createOrUpdateDeserializeSecurityRules,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}":
    {
      deserializer: _$deleteDeserializeNetworkSecurityGroups,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}":
    {
      deserializer: _createOrUpdateDeserializeNetworkSecurityGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkProfiles/{networkProfileName}":
    { deserializer: _$deleteDeserializeNetworkProfiles, expectedStatuses: ["200", "202", "204"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityUserConfigurations/{configurationName}/ruleCollections/{ruleCollectionName}/rules/{ruleName}":
    { deserializer: _$deleteDeserializeSecurityUserRules, expectedStatuses: ["200", "202", "204"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityUserConfigurations/{configurationName}/ruleCollections/{ruleCollectionName}":
    {
      deserializer: _$deleteDeserializeSecurityUserRuleCollections,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityUserConfigurations/{configurationName}":
    {
      deserializer: _$deleteDeserializeSecurityUserConfigurations,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityAdminConfigurations/{configurationName}/ruleCollections/{ruleCollectionName}":
    {
      deserializer: _$deleteDeserializeAdminRuleCollections,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/securityAdminConfigurations/{configurationName}":
    {
      deserializer: _$deleteDeserializeSecurityAdminConfigurations,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/routingConfigurations/{configurationName}/ruleCollections/{ruleCollectionName}/rules/{ruleName}":
    { deserializer: _$deleteDeserializeRoutingRules, expectedStatuses: ["200", "202", "204"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/routingConfigurations/{configurationName}/ruleCollections/{ruleCollectionName}":
    {
      deserializer: _$deleteDeserializeRoutingRuleCollections,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/routingConfigurations/{configurationName}":
    {
      deserializer: _$deleteDeserializeNetworkManagerRoutingConfigurations,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/networkGroups/{networkGroupName}":
    { deserializer: _$deleteDeserializeNetworkGroups, expectedStatuses: ["200", "202", "204"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/connectivityConfigurations/{configurationName}":
    {
      deserializer: _$deleteDeserializeConnectivityConfigurations,
      expectedStatuses: ["200", "202", "204"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/tapConfigurations/{tapConfigurationName}":
    {
      deserializer: _$deleteDeserializeNetworkInterfaceTapConfigurations,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/tapConfigurations/{tapConfigurationName}":
    {
      deserializer: _createOrUpdateDeserializeNetworkInterfaceTapConfigurations,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/natGateways/{natGatewayName}":
    { deserializer: _$deleteDeserializeNatGateways, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/natGateways/{natGatewayName}":
    {
      deserializer: _createOrUpdateDeserializeNatGateways,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/inboundNatRules/{inboundNatRuleName}":
    { deserializer: _$deleteDeserializeInboundNatRules, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/inboundNatRules/{inboundNatRuleName}":
    {
      deserializer: _createOrUpdateDeserializeInboundNatRules,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/setLoadBalancerFrontendPublicIpAddresses":
    { deserializer: _swapPublicIpAddressesDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendPoolName}/queryInboundNatRulePortMapping":
    {
      deserializer: _listInboundNatRulePortMappingsDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}":
    { deserializer: _$deleteDeserializeLoadBalancers, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}":
    {
      deserializer: _createOrUpdateDeserializeLoadBalancers,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ipGroups/{ipGroupsName}":
    { deserializer: _$deleteDeserializeIpGroups, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ipGroups/{ipGroupsName}":
    { deserializer: _createOrUpdateDeserializeIpGroups, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/IpAllocations/{ipAllocationName}":
    { deserializer: _$deleteDeserializeIpAllocations, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/IpAllocations/{ipAllocationName}":
    {
      deserializer: _createOrUpdateDeserializeIpAllocations,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}/staticCidrs/{staticCidrName}":
    { deserializer: _$deleteDeserializeStaticCidrs, expectedStatuses: ["202", "204", "200"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}":
    { deserializer: _$deleteDeserializeNetworkManagers, expectedStatuses: ["200", "202", "204"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}":
    { deserializer: _$deleteDeserializeIpamPools, expectedStatuses: ["202", "204", "200"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/ipamPools/{poolName}":
    { deserializer: _createDeserializeIpamPools, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}":
    {
      deserializer: _$deleteDeserializeFirewallPolicyRuleCollectionGroups,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/ruleCollectionGroups/{ruleCollectionGroupName}":
    {
      deserializer: _createOrUpdateDeserializeFirewallPolicyRuleCollectionGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}":
    { deserializer: _$deleteDeserializeFirewallPolicies, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}":
    {
      deserializer: _createOrUpdateDeserializeFirewallPolicies,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRoutePorts/{expressRoutePortName}/authorizations/{authorizationName}":
    {
      deserializer: _$deleteDeserializeExpressRoutePortAuthorizations,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRoutePorts/{expressRoutePortName}/authorizations/{authorizationName}":
    {
      deserializer: _createOrUpdateDeserializeExpressRoutePortAuthorizations,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ExpressRoutePorts/{expressRoutePortName}":
    { deserializer: _$deleteDeserializeExpressRoutePorts, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ExpressRoutePorts/{expressRoutePortName}":
    {
      deserializer: _createOrUpdateDeserializeExpressRoutePorts,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}/routeTables/{devicePath}":
    { deserializer: _listRoutesTableDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}/routeTablesSummary/{devicePath}":
    { deserializer: _listRoutesTableSummaryDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}/peerings/{peeringName}/arpTables/{devicePath}":
    { deserializer: _listArpTableDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/{crossConnectionName}":
    {
      deserializer: _createOrUpdateDeserializeExpressRouteCrossConnections,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/connections/{connectionName}":
    {
      deserializer: _$deleteDeserializeExpressRouteCircuitConnections,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/connections/{connectionName}":
    {
      deserializer: _createOrUpdateDeserializeExpressRouteCircuitConnections,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}":
    {
      deserializer: _$deleteDeserializeExpressRouteCircuitPeerings,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}":
    {
      deserializer: _createOrUpdateDeserializeExpressRouteCircuitPeerings,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/routeTablesSummary/{devicePath}":
    {
      deserializer: _listRoutesTableSummaryDeserializeExpressRouteCircuits,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/routeTables/{devicePath}":
    {
      deserializer: _listRoutesTableDeserializeExpressRouteCircuits,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/peerings/{peeringName}/arpTables/{devicePath}":
    {
      deserializer: _listArpTableDeserializeExpressRouteCircuits,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}":
    {
      deserializer: _$deleteDeserializeExpressRouteCircuits,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}":
    {
      deserializer: _createOrUpdateDeserializeExpressRouteCircuits,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/authorizations/{authorizationName}":
    {
      deserializer: _$deleteDeserializeExpressRouteCircuitAuthorizations,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/authorizations/{authorizationName}":
    {
      deserializer: _createOrUpdateDeserializeExpressRouteCircuitAuthorizations,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ddosProtectionPlans/{ddosProtectionPlanName}":
    {
      deserializer: _$deleteDeserializeDdosProtectionPlans,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ddosProtectionPlans/{ddosProtectionPlanName}":
    {
      deserializer: _createOrUpdateDeserializeDdosProtectionPlans,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ddosCustomPolicies/{ddosCustomPolicyName}":
    {
      deserializer: _$deleteDeserializeDdosCustomPolicies,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ddosCustomPolicies/{ddosCustomPolicyName}":
    {
      deserializer: _createOrUpdateDeserializeDdosCustomPolicies,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}/disassociateCloudServiceReservedPublicIp":
    {
      deserializer: _disassociateCloudServiceReservedPublicIpDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}/reserveCloudServicePublicIpAddress":
    {
      deserializer: _reserveCloudServicePublicIpAddressDeserialize,
      expectedStatuses: ["200", "202", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}/ddosProtectionStatus":
    { deserializer: _ddosProtectionStatusDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}":
    { deserializer: _$deleteDeserializePublicIPAddresses, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}":
    {
      deserializer: _createOrUpdateDeserializePublicIPAddresses,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/effectiveNetworkSecurityGroups":
    {
      deserializer: _listEffectiveNetworkSecurityGroupsDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}/effectiveRouteTable":
    { deserializer: _getEffectiveRouteTableDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}":
    { deserializer: _$deleteDeserializeNetworkInterfaces, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkInterfaces/{networkInterfaceName}":
    {
      deserializer: _createOrUpdateDeserializeNetworkInterfaces,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}":
    { deserializer: _$deleteDeserializeBastionHosts, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}":
    { deserializer: _updateTagsDeserializeBastionHosts, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}":
    {
      deserializer: _createOrUpdateDeserializeBastionHosts,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}/packetCaptureOperation":
    { deserializer: _packetCaptureOperationDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}/packetCapture":
    { deserializer: _packetCaptureDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}/learnedIPPrefixes":
    { deserializer: _listLearnedPrefixesDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}":
    { deserializer: _$deleteDeserializeAzureFirewalls, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}":
    { deserializer: _updateTagsDeserializeAzureFirewalls, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}":
    {
      deserializer: _createOrUpdateDeserializeAzureFirewalls,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationSecurityGroups/{applicationSecurityGroupName}":
    {
      deserializer: _$deleteDeserializeApplicationSecurityGroups,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationSecurityGroups/{applicationSecurityGroupName}":
    {
      deserializer: _createOrUpdateDeserializeApplicationSecurityGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/privateEndpointConnections/{connectionName}":
    {
      deserializer: _$deleteDeserializeApplicationGatewayPrivateEndpointConnections,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/privateEndpointConnections/{connectionName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/getBackendHealthOnDemand":
    { deserializer: _backendHealthOnDemandDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/backendhealth":
    { deserializer: _backendHealthDeserialize, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/stop":
    { deserializer: _stopDeserializeApplicationGateways, expectedStatuses: ["202", "200", "201"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/start":
    { deserializer: _startDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}":
    {
      deserializer: _$deleteDeserializeApplicationGateways,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}":
    {
      deserializer: _createOrUpdateDeserializeApplicationGateways,
      expectedStatuses: ["200", "201", "202"],
    },
};

function getDeserializationHelper(
  urlStr: string,
  method: string,
): DeserializationHelper | undefined {
  const path = new URL(urlStr).pathname;
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: DeserializationHelper | undefined;

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(deserializeMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}

function getApiVersionFromUrl(urlStr: string): string | undefined {
  const url = new URL(urlStr);
  return url.searchParams.get("api-version") ?? undefined;
}
