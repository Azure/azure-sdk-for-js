// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  vpnDeviceConfigurationScript,
  invokeAbortMigration,
  invokeCommitMigration,
  invokeExecuteMigration,
  invokePrepareMigration,
  disconnectVirtualNetworkGatewayVpnConnections,
  getVpnclientConnectionHealth,
  stopExpressRouteSiteFailoverSimulation,
  startExpressRouteSiteFailoverSimulation,
  getFailoverSingleTestDetails,
  getFailoverAllTestDetails,
  stopPacketCapture,
  startPacketCapture,
  getVpnclientIpsecParameters,
  setVpnclientIpsecParameters,
  getRoutesInformation,
  getResiliencyInformation,
  getAdvertisedRoutes,
  getLearnedRoutes,
  listRadiusSecrets,
  supportedVpnDevices,
  getBgpPeerStatus,
  getVpnProfilePackageUrl,
  generateVpnProfile,
  generatevpnclientpackage,
  resetVpnClientSharedKey,
  reset,
  listConnections,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/virtualNetworkGateways/operations.js";
import type {
  VirtualNetworkGatewaysVpnDeviceConfigurationScriptOptionalParams,
  VirtualNetworkGatewaysInvokeAbortMigrationOptionalParams,
  VirtualNetworkGatewaysInvokeCommitMigrationOptionalParams,
  VirtualNetworkGatewaysInvokeExecuteMigrationOptionalParams,
  VirtualNetworkGatewaysInvokePrepareMigrationOptionalParams,
  VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsOptionalParams,
  VirtualNetworkGatewaysGetVpnclientConnectionHealthOptionalParams,
  VirtualNetworkGatewaysStopExpressRouteSiteFailoverSimulationOptionalParams,
  VirtualNetworkGatewaysStartExpressRouteSiteFailoverSimulationOptionalParams,
  VirtualNetworkGatewaysGetFailoverSingleTestDetailsOptionalParams,
  VirtualNetworkGatewaysGetFailoverAllTestDetailsOptionalParams,
  VirtualNetworkGatewaysStopPacketCaptureOptionalParams,
  VirtualNetworkGatewaysStartPacketCaptureOptionalParams,
  VirtualNetworkGatewaysGetVpnclientIpsecParametersOptionalParams,
  VirtualNetworkGatewaysSetVpnclientIpsecParametersOptionalParams,
  VirtualNetworkGatewaysGetRoutesInformationOptionalParams,
  VirtualNetworkGatewaysGetResiliencyInformationOptionalParams,
  VirtualNetworkGatewaysGetAdvertisedRoutesOptionalParams,
  VirtualNetworkGatewaysGetLearnedRoutesOptionalParams,
  VirtualNetworkGatewaysListRadiusSecretsOptionalParams,
  VirtualNetworkGatewaysSupportedVpnDevicesOptionalParams,
  VirtualNetworkGatewaysGetBgpPeerStatusOptionalParams,
  VirtualNetworkGatewaysGetVpnProfilePackageUrlOptionalParams,
  VirtualNetworkGatewaysGenerateVpnProfileOptionalParams,
  VirtualNetworkGatewaysGeneratevpnclientpackageOptionalParams,
  VirtualNetworkGatewaysResetVpnClientSharedKeyOptionalParams,
  VirtualNetworkGatewaysResetOptionalParams,
  VirtualNetworkGatewaysListConnectionsOptionalParams,
  VirtualNetworkGatewaysListOptionalParams,
  VirtualNetworkGatewaysDeleteOptionalParams,
  VirtualNetworkGatewaysUpdateTagsOptionalParams,
  VirtualNetworkGatewaysCreateOrUpdateOptionalParams,
  VirtualNetworkGatewaysGetOptionalParams,
} from "../../api/virtualNetworkGateways/options.js";
import type {
  TagsObject,
  VirtualNetworkGateway,
  VirtualNetworkGatewayConnectionListEntity,
  VpnClientParameters,
  BgpPeerStatusListResult,
  RadiusAuthServerListResult,
  GatewayRouteListResult,
  GatewayResiliencyInformation,
  GatewayRouteSetsInformation,
  VpnClientIPsecParameters,
  VpnPacketCaptureStopParameters,
  ExpressRouteFailoverTestDetails,
  ExpressRouteFailoverSingleTestDetails,
  ExpressRouteFailoverStopApiParameters,
  VpnClientConnectionHealthDetailListResult,
  P2SVpnConnectionRequest,
  VirtualNetworkGatewayMigrationParameters,
  VpnDeviceScriptParameters,
} from "../../models/microsoft/network/models.js";
import type {
  VirtualNetworkGatewaysVpnDeviceConfigurationScriptResponse,
  VirtualNetworkGatewaysSupportedVpnDevicesResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a VirtualNetworkGateways operations. */
export interface VirtualNetworkGatewaysOperations {
  /** Gets a xml format representation for vpn device configuration script. */
  vpnDeviceConfigurationScript: (
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: VpnDeviceScriptParameters,
    options?: VirtualNetworkGatewaysVpnDeviceConfigurationScriptOptionalParams,
  ) => Promise<VirtualNetworkGatewaysVpnDeviceConfigurationScriptResponse>;
  /** Trigger abort migration for the virtual network gateway. */
  invokeAbortMigration: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysInvokeAbortMigrationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use invokeAbortMigration instead */
  beginInvokeAbortMigration: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysInvokeAbortMigrationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use invokeAbortMigration instead */
  beginInvokeAbortMigrationAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysInvokeAbortMigrationOptionalParams,
  ) => Promise<void>;
  /** Trigger commit migration for the virtual network gateway. */
  invokeCommitMigration: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysInvokeCommitMigrationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use invokeCommitMigration instead */
  beginInvokeCommitMigration: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysInvokeCommitMigrationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use invokeCommitMigration instead */
  beginInvokeCommitMigrationAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysInvokeCommitMigrationOptionalParams,
  ) => Promise<void>;
  /** Trigger execute migration for the virtual network gateway. */
  invokeExecuteMigration: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysInvokeExecuteMigrationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use invokeExecuteMigration instead */
  beginInvokeExecuteMigration: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysInvokeExecuteMigrationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use invokeExecuteMigration instead */
  beginInvokeExecuteMigrationAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysInvokeExecuteMigrationOptionalParams,
  ) => Promise<void>;
  /** Trigger prepare migration for the virtual network gateway. */
  invokePrepareMigration: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    migrationParams: VirtualNetworkGatewayMigrationParameters,
    options?: VirtualNetworkGatewaysInvokePrepareMigrationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use invokePrepareMigration instead */
  beginInvokePrepareMigration: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    migrationParams: VirtualNetworkGatewayMigrationParameters,
    options?: VirtualNetworkGatewaysInvokePrepareMigrationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use invokePrepareMigration instead */
  beginInvokePrepareMigrationAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    migrationParams: VirtualNetworkGatewayMigrationParameters,
    options?: VirtualNetworkGatewaysInvokePrepareMigrationOptionalParams,
  ) => Promise<void>;
  /** Disconnect vpn connections of virtual network gateway in the specified resource group. */
  disconnectVirtualNetworkGatewayVpnConnections: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    request: P2SVpnConnectionRequest,
    options?: VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use disconnectVirtualNetworkGatewayVpnConnections instead */
  beginDisconnectVirtualNetworkGatewayVpnConnections: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    request: P2SVpnConnectionRequest,
    options?: VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use disconnectVirtualNetworkGatewayVpnConnections instead */
  beginDisconnectVirtualNetworkGatewayVpnConnectionsAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    request: P2SVpnConnectionRequest,
    options?: VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsOptionalParams,
  ) => Promise<void>;
  /** Get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group. */
  getVpnclientConnectionHealth: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetVpnclientConnectionHealthOptionalParams,
  ) => PollerLike<
    OperationState<VpnClientConnectionHealthDetailListResult>,
    VpnClientConnectionHealthDetailListResult
  >;
  /** @deprecated use getVpnclientConnectionHealth instead */
  beginGetVpnclientConnectionHealth: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetVpnclientConnectionHealthOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<VpnClientConnectionHealthDetailListResult>,
      VpnClientConnectionHealthDetailListResult
    >
  >;
  /** @deprecated use getVpnclientConnectionHealth instead */
  beginGetVpnclientConnectionHealthAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetVpnclientConnectionHealthOptionalParams,
  ) => Promise<VpnClientConnectionHealthDetailListResult>;
  /** This operation stops failover simulation on the gateway for the specified peering location */
  stopExpressRouteSiteFailoverSimulation: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    stopParameters: ExpressRouteFailoverStopApiParameters,
    options?: VirtualNetworkGatewaysStopExpressRouteSiteFailoverSimulationOptionalParams,
  ) => PollerLike<OperationState<string>, string>;
  /** @deprecated use stopExpressRouteSiteFailoverSimulation instead */
  beginStopExpressRouteSiteFailoverSimulation: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    stopParameters: ExpressRouteFailoverStopApiParameters,
    options?: VirtualNetworkGatewaysStopExpressRouteSiteFailoverSimulationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<string>, string>>;
  /** @deprecated use stopExpressRouteSiteFailoverSimulation instead */
  beginStopExpressRouteSiteFailoverSimulationAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    stopParameters: ExpressRouteFailoverStopApiParameters,
    options?: VirtualNetworkGatewaysStopExpressRouteSiteFailoverSimulationOptionalParams,
  ) => Promise<string>;
  /** This operation starts failover simulation on the gateway for the specified peering location */
  startExpressRouteSiteFailoverSimulation: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    peeringLocation: string,
    options?: VirtualNetworkGatewaysStartExpressRouteSiteFailoverSimulationOptionalParams,
  ) => PollerLike<OperationState<string>, string>;
  /** @deprecated use startExpressRouteSiteFailoverSimulation instead */
  beginStartExpressRouteSiteFailoverSimulation: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    peeringLocation: string,
    options?: VirtualNetworkGatewaysStartExpressRouteSiteFailoverSimulationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<string>, string>>;
  /** @deprecated use startExpressRouteSiteFailoverSimulation instead */
  beginStartExpressRouteSiteFailoverSimulationAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    peeringLocation: string,
    options?: VirtualNetworkGatewaysStartExpressRouteSiteFailoverSimulationOptionalParams,
  ) => Promise<string>;
  /** This operation retrieves the details of a particular failover test performed on the gateway based on the test Guid */
  getFailoverSingleTestDetails: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    peeringLocation: string,
    failoverTestId: string,
    options?: VirtualNetworkGatewaysGetFailoverSingleTestDetailsOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteFailoverSingleTestDetails[]>,
    ExpressRouteFailoverSingleTestDetails[]
  >;
  /** @deprecated use getFailoverSingleTestDetails instead */
  beginGetFailoverSingleTestDetails: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    peeringLocation: string,
    failoverTestId: string,
    options?: VirtualNetworkGatewaysGetFailoverSingleTestDetailsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteFailoverSingleTestDetails[]>,
      ExpressRouteFailoverSingleTestDetails[]
    >
  >;
  /** @deprecated use getFailoverSingleTestDetails instead */
  beginGetFailoverSingleTestDetailsAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    peeringLocation: string,
    failoverTestId: string,
    options?: VirtualNetworkGatewaysGetFailoverSingleTestDetailsOptionalParams,
  ) => Promise<ExpressRouteFailoverSingleTestDetails[]>;
  /** This operation retrieves the details of all the failover tests performed on the gateway for different peering locations */
  getFailoverAllTestDetails: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    typeParam: string,
    fetchLatest: boolean,
    options?: VirtualNetworkGatewaysGetFailoverAllTestDetailsOptionalParams,
  ) => PollerLike<
    OperationState<ExpressRouteFailoverTestDetails[]>,
    ExpressRouteFailoverTestDetails[]
  >;
  /** @deprecated use getFailoverAllTestDetails instead */
  beginGetFailoverAllTestDetails: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    typeParam: string,
    fetchLatest: boolean,
    options?: VirtualNetworkGatewaysGetFailoverAllTestDetailsOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExpressRouteFailoverTestDetails[]>,
      ExpressRouteFailoverTestDetails[]
    >
  >;
  /** @deprecated use getFailoverAllTestDetails instead */
  beginGetFailoverAllTestDetailsAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    typeParam: string,
    fetchLatest: boolean,
    options?: VirtualNetworkGatewaysGetFailoverAllTestDetailsOptionalParams,
  ) => Promise<ExpressRouteFailoverTestDetails[]>;
  /** Stops packet capture on virtual network gateway in the specified resource group. */
  stopPacketCapture: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VpnPacketCaptureStopParameters,
    options?: VirtualNetworkGatewaysStopPacketCaptureOptionalParams,
  ) => PollerLike<OperationState<string>, string>;
  /** @deprecated use stopPacketCapture instead */
  beginStopPacketCapture: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VpnPacketCaptureStopParameters,
    options?: VirtualNetworkGatewaysStopPacketCaptureOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<string>, string>>;
  /** @deprecated use stopPacketCapture instead */
  beginStopPacketCaptureAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VpnPacketCaptureStopParameters,
    options?: VirtualNetworkGatewaysStopPacketCaptureOptionalParams,
  ) => Promise<string>;
  /** Starts packet capture on virtual network gateway in the specified resource group. */
  startPacketCapture: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysStartPacketCaptureOptionalParams,
  ) => PollerLike<OperationState<string>, string>;
  /** @deprecated use startPacketCapture instead */
  beginStartPacketCapture: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysStartPacketCaptureOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<string>, string>>;
  /** @deprecated use startPacketCapture instead */
  beginStartPacketCaptureAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysStartPacketCaptureOptionalParams,
  ) => Promise<string>;
  /** The Get VpnclientIpsecParameters operation retrieves information about the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider. */
  getVpnclientIpsecParameters: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetVpnclientIpsecParametersOptionalParams,
  ) => PollerLike<OperationState<VpnClientIPsecParameters>, VpnClientIPsecParameters>;
  /** @deprecated use getVpnclientIpsecParameters instead */
  beginGetVpnclientIpsecParameters: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetVpnclientIpsecParametersOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<VpnClientIPsecParameters>, VpnClientIPsecParameters>
  >;
  /** @deprecated use getVpnclientIpsecParameters instead */
  beginGetVpnclientIpsecParametersAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetVpnclientIpsecParametersOptionalParams,
  ) => Promise<VpnClientIPsecParameters>;
  /** The Set VpnclientIpsecParameters operation sets the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider. */
  setVpnclientIpsecParameters: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    vpnclientIpsecParams: VpnClientIPsecParameters,
    options?: VirtualNetworkGatewaysSetVpnclientIpsecParametersOptionalParams,
  ) => PollerLike<OperationState<VpnClientIPsecParameters>, VpnClientIPsecParameters>;
  /** @deprecated use setVpnclientIpsecParameters instead */
  beginSetVpnclientIpsecParameters: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    vpnclientIpsecParams: VpnClientIPsecParameters,
    options?: VirtualNetworkGatewaysSetVpnclientIpsecParametersOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<VpnClientIPsecParameters>, VpnClientIPsecParameters>
  >;
  /** @deprecated use setVpnclientIpsecParameters instead */
  beginSetVpnclientIpsecParametersAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    vpnclientIpsecParams: VpnClientIPsecParameters,
    options?: VirtualNetworkGatewaysSetVpnclientIpsecParametersOptionalParams,
  ) => Promise<VpnClientIPsecParameters>;
  /** This operation retrieves the route set information for an Express Route Gateway based on their resiliency */
  getRoutesInformation: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetRoutesInformationOptionalParams,
  ) => PollerLike<OperationState<GatewayRouteSetsInformation>, GatewayRouteSetsInformation>;
  /** @deprecated use getRoutesInformation instead */
  beginGetRoutesInformation: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetRoutesInformationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<GatewayRouteSetsInformation>, GatewayRouteSetsInformation>
  >;
  /** @deprecated use getRoutesInformation instead */
  beginGetRoutesInformationAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetRoutesInformationOptionalParams,
  ) => Promise<GatewayRouteSetsInformation>;
  /** This operation retrieves the resiliency information for an Express Route Gateway, including the gateway's current resiliency score and recommendations to further improve the score */
  getResiliencyInformation: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetResiliencyInformationOptionalParams,
  ) => PollerLike<OperationState<GatewayResiliencyInformation>, GatewayResiliencyInformation>;
  /** @deprecated use getResiliencyInformation instead */
  beginGetResiliencyInformation: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetResiliencyInformationOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<GatewayResiliencyInformation>, GatewayResiliencyInformation>
  >;
  /** @deprecated use getResiliencyInformation instead */
  beginGetResiliencyInformationAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetResiliencyInformationOptionalParams,
  ) => Promise<GatewayResiliencyInformation>;
  /** This operation retrieves a list of routes the virtual network gateway is advertising to the specified peer. */
  getAdvertisedRoutes: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    peer: string,
    options?: VirtualNetworkGatewaysGetAdvertisedRoutesOptionalParams,
  ) => PollerLike<OperationState<GatewayRouteListResult>, GatewayRouteListResult>;
  /** @deprecated use getAdvertisedRoutes instead */
  beginGetAdvertisedRoutes: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    peer: string,
    options?: VirtualNetworkGatewaysGetAdvertisedRoutesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GatewayRouteListResult>, GatewayRouteListResult>>;
  /** @deprecated use getAdvertisedRoutes instead */
  beginGetAdvertisedRoutesAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    peer: string,
    options?: VirtualNetworkGatewaysGetAdvertisedRoutesOptionalParams,
  ) => Promise<GatewayRouteListResult>;
  /** This operation retrieves a list of routes the virtual network gateway has learned, including routes learned from BGP peers. */
  getLearnedRoutes: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetLearnedRoutesOptionalParams,
  ) => PollerLike<OperationState<GatewayRouteListResult>, GatewayRouteListResult>;
  /** @deprecated use getLearnedRoutes instead */
  beginGetLearnedRoutes: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetLearnedRoutesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<GatewayRouteListResult>, GatewayRouteListResult>>;
  /** @deprecated use getLearnedRoutes instead */
  beginGetLearnedRoutesAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetLearnedRoutesOptionalParams,
  ) => Promise<GatewayRouteListResult>;
  /** List all Radius servers with respective radius secrets from virtual network gateway VpnClientConfiguration. */
  listRadiusSecrets: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysListRadiusSecretsOptionalParams,
  ) => Promise<RadiusAuthServerListResult>;
  /** Gets a xml format representation for supported vpn devices. */
  supportedVpnDevices: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysSupportedVpnDevicesOptionalParams,
  ) => Promise<VirtualNetworkGatewaysSupportedVpnDevicesResponse>;
  /** The GetBgpPeerStatus operation retrieves the status of all BGP peers. */
  getBgpPeerStatus: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetBgpPeerStatusOptionalParams,
  ) => PollerLike<OperationState<BgpPeerStatusListResult>, BgpPeerStatusListResult>;
  /** @deprecated use getBgpPeerStatus instead */
  beginGetBgpPeerStatus: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetBgpPeerStatusOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BgpPeerStatusListResult>, BgpPeerStatusListResult>>;
  /** @deprecated use getBgpPeerStatus instead */
  beginGetBgpPeerStatusAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetBgpPeerStatusOptionalParams,
  ) => Promise<BgpPeerStatusListResult>;
  /** Gets pre-generated VPN profile for P2S client of the virtual network gateway in the specified resource group. The profile needs to be generated first using generateVpnProfile. */
  getVpnProfilePackageUrl: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetVpnProfilePackageUrlOptionalParams,
  ) => PollerLike<OperationState<string>, string>;
  /** @deprecated use getVpnProfilePackageUrl instead */
  beginGetVpnProfilePackageUrl: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetVpnProfilePackageUrlOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<string>, string>>;
  /** @deprecated use getVpnProfilePackageUrl instead */
  beginGetVpnProfilePackageUrlAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetVpnProfilePackageUrlOptionalParams,
  ) => Promise<string>;
  /** Generates VPN profile for P2S client of the virtual network gateway in the specified resource group. Used for IKEV2 and radius based authentication. */
  generateVpnProfile: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VpnClientParameters,
    options?: VirtualNetworkGatewaysGenerateVpnProfileOptionalParams,
  ) => PollerLike<OperationState<string>, string>;
  /** @deprecated use generateVpnProfile instead */
  beginGenerateVpnProfile: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VpnClientParameters,
    options?: VirtualNetworkGatewaysGenerateVpnProfileOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<string>, string>>;
  /** @deprecated use generateVpnProfile instead */
  beginGenerateVpnProfileAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VpnClientParameters,
    options?: VirtualNetworkGatewaysGenerateVpnProfileOptionalParams,
  ) => Promise<string>;
  /** Generates VPN client package for P2S client of the virtual network gateway in the specified resource group. */
  generatevpnclientpackage: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VpnClientParameters,
    options?: VirtualNetworkGatewaysGeneratevpnclientpackageOptionalParams,
  ) => PollerLike<OperationState<string>, string>;
  /** @deprecated use generatevpnclientpackage instead */
  beginGeneratevpnclientpackage: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VpnClientParameters,
    options?: VirtualNetworkGatewaysGeneratevpnclientpackageOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<string>, string>>;
  /** @deprecated use generatevpnclientpackage instead */
  beginGeneratevpnclientpackageAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VpnClientParameters,
    options?: VirtualNetworkGatewaysGeneratevpnclientpackageOptionalParams,
  ) => Promise<string>;
  /** Resets the VPN client shared key of the virtual network gateway in the specified resource group. */
  resetVpnClientSharedKey: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysResetVpnClientSharedKeyOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use resetVpnClientSharedKey instead */
  beginResetVpnClientSharedKey: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysResetVpnClientSharedKeyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use resetVpnClientSharedKey instead */
  beginResetVpnClientSharedKeyAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysResetVpnClientSharedKeyOptionalParams,
  ) => Promise<void>;
  /** Resets the primary of the virtual network gateway in the specified resource group. */
  reset: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysResetOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway>;
  /** @deprecated use reset instead */
  beginReset: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysResetOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway>>;
  /** @deprecated use reset instead */
  beginResetAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysResetOptionalParams,
  ) => Promise<VirtualNetworkGateway>;
  /** Gets all the connections in a virtual network gateway. */
  listConnections: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysListConnectionsOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkGatewayConnectionListEntity>;
  /** Gets all virtual network gateways by resource group. */
  list: (
    resourceGroupName: string,
    options?: VirtualNetworkGatewaysListOptionalParams,
  ) => PagedAsyncIterableIterator<VirtualNetworkGateway>;
  /** Deletes the specified virtual network gateway. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a virtual network gateway tags. */
  updateTags: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: TagsObject,
    options?: VirtualNetworkGatewaysUpdateTagsOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway>;
  /** @deprecated use updateTags instead */
  beginUpdateTags: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: TagsObject,
    options?: VirtualNetworkGatewaysUpdateTagsOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway>>;
  /** @deprecated use updateTags instead */
  beginUpdateTagsAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: TagsObject,
    options?: VirtualNetworkGatewaysUpdateTagsOptionalParams,
  ) => Promise<VirtualNetworkGateway>;
  /** Creates or updates a virtual network gateway in the specified resource group. */
  createOrUpdate: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VirtualNetworkGateway,
    options?: VirtualNetworkGatewaysCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VirtualNetworkGateway,
    options?: VirtualNetworkGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<VirtualNetworkGateway>, VirtualNetworkGateway>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    parameters: VirtualNetworkGateway,
    options?: VirtualNetworkGatewaysCreateOrUpdateOptionalParams,
  ) => Promise<VirtualNetworkGateway>;
  /** Gets the specified virtual network gateway by resource group. */
  get: (
    resourceGroupName: string,
    virtualNetworkGatewayName: string,
    options?: VirtualNetworkGatewaysGetOptionalParams,
  ) => Promise<VirtualNetworkGateway>;
}

function _getVirtualNetworkGateways(context: NetworkManagementContext) {
  return {
    vpnDeviceConfigurationScript: (
      resourceGroupName: string,
      virtualNetworkGatewayConnectionName: string,
      parameters: VpnDeviceScriptParameters,
      options?: VirtualNetworkGatewaysVpnDeviceConfigurationScriptOptionalParams,
    ) =>
      vpnDeviceConfigurationScript(
        context,
        resourceGroupName,
        virtualNetworkGatewayConnectionName,
        parameters,
        options,
      ),
    invokeAbortMigration: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysInvokeAbortMigrationOptionalParams,
    ) => invokeAbortMigration(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginInvokeAbortMigration: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysInvokeAbortMigrationOptionalParams,
    ) => {
      const poller = invokeAbortMigration(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInvokeAbortMigrationAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysInvokeAbortMigrationOptionalParams,
    ) => {
      return await invokeAbortMigration(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
    },
    invokeCommitMigration: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysInvokeCommitMigrationOptionalParams,
    ) => invokeCommitMigration(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginInvokeCommitMigration: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysInvokeCommitMigrationOptionalParams,
    ) => {
      const poller = invokeCommitMigration(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInvokeCommitMigrationAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysInvokeCommitMigrationOptionalParams,
    ) => {
      return await invokeCommitMigration(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
    },
    invokeExecuteMigration: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysInvokeExecuteMigrationOptionalParams,
    ) => invokeExecuteMigration(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginInvokeExecuteMigration: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysInvokeExecuteMigrationOptionalParams,
    ) => {
      const poller = invokeExecuteMigration(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInvokeExecuteMigrationAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysInvokeExecuteMigrationOptionalParams,
    ) => {
      return await invokeExecuteMigration(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
    },
    invokePrepareMigration: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      migrationParams: VirtualNetworkGatewayMigrationParameters,
      options?: VirtualNetworkGatewaysInvokePrepareMigrationOptionalParams,
    ) =>
      invokePrepareMigration(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        migrationParams,
        options,
      ),
    beginInvokePrepareMigration: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      migrationParams: VirtualNetworkGatewayMigrationParameters,
      options?: VirtualNetworkGatewaysInvokePrepareMigrationOptionalParams,
    ) => {
      const poller = invokePrepareMigration(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        migrationParams,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginInvokePrepareMigrationAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      migrationParams: VirtualNetworkGatewayMigrationParameters,
      options?: VirtualNetworkGatewaysInvokePrepareMigrationOptionalParams,
    ) => {
      return await invokePrepareMigration(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        migrationParams,
        options,
      );
    },
    disconnectVirtualNetworkGatewayVpnConnections: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      request: P2SVpnConnectionRequest,
      options?: VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsOptionalParams,
    ) =>
      disconnectVirtualNetworkGatewayVpnConnections(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        request,
        options,
      ),
    beginDisconnectVirtualNetworkGatewayVpnConnections: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      request: P2SVpnConnectionRequest,
      options?: VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsOptionalParams,
    ) => {
      const poller = disconnectVirtualNetworkGatewayVpnConnections(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        request,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDisconnectVirtualNetworkGatewayVpnConnectionsAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      request: P2SVpnConnectionRequest,
      options?: VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsOptionalParams,
    ) => {
      return await disconnectVirtualNetworkGatewayVpnConnections(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        request,
        options,
      );
    },
    getVpnclientConnectionHealth: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetVpnclientConnectionHealthOptionalParams,
    ) =>
      getVpnclientConnectionHealth(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginGetVpnclientConnectionHealth: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetVpnclientConnectionHealthOptionalParams,
    ) => {
      const poller = getVpnclientConnectionHealth(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetVpnclientConnectionHealthAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetVpnclientConnectionHealthOptionalParams,
    ) => {
      return await getVpnclientConnectionHealth(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
    },
    stopExpressRouteSiteFailoverSimulation: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      stopParameters: ExpressRouteFailoverStopApiParameters,
      options?: VirtualNetworkGatewaysStopExpressRouteSiteFailoverSimulationOptionalParams,
    ) =>
      stopExpressRouteSiteFailoverSimulation(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        stopParameters,
        options,
      ),
    beginStopExpressRouteSiteFailoverSimulation: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      stopParameters: ExpressRouteFailoverStopApiParameters,
      options?: VirtualNetworkGatewaysStopExpressRouteSiteFailoverSimulationOptionalParams,
    ) => {
      const poller = stopExpressRouteSiteFailoverSimulation(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        stopParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopExpressRouteSiteFailoverSimulationAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      stopParameters: ExpressRouteFailoverStopApiParameters,
      options?: VirtualNetworkGatewaysStopExpressRouteSiteFailoverSimulationOptionalParams,
    ) => {
      return await stopExpressRouteSiteFailoverSimulation(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        stopParameters,
        options,
      );
    },
    startExpressRouteSiteFailoverSimulation: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      peeringLocation: string,
      options?: VirtualNetworkGatewaysStartExpressRouteSiteFailoverSimulationOptionalParams,
    ) =>
      startExpressRouteSiteFailoverSimulation(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        peeringLocation,
        options,
      ),
    beginStartExpressRouteSiteFailoverSimulation: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      peeringLocation: string,
      options?: VirtualNetworkGatewaysStartExpressRouteSiteFailoverSimulationOptionalParams,
    ) => {
      const poller = startExpressRouteSiteFailoverSimulation(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        peeringLocation,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartExpressRouteSiteFailoverSimulationAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      peeringLocation: string,
      options?: VirtualNetworkGatewaysStartExpressRouteSiteFailoverSimulationOptionalParams,
    ) => {
      return await startExpressRouteSiteFailoverSimulation(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        peeringLocation,
        options,
      );
    },
    getFailoverSingleTestDetails: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      peeringLocation: string,
      failoverTestId: string,
      options?: VirtualNetworkGatewaysGetFailoverSingleTestDetailsOptionalParams,
    ) =>
      getFailoverSingleTestDetails(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        peeringLocation,
        failoverTestId,
        options,
      ),
    beginGetFailoverSingleTestDetails: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      peeringLocation: string,
      failoverTestId: string,
      options?: VirtualNetworkGatewaysGetFailoverSingleTestDetailsOptionalParams,
    ) => {
      const poller = getFailoverSingleTestDetails(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        peeringLocation,
        failoverTestId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetFailoverSingleTestDetailsAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      peeringLocation: string,
      failoverTestId: string,
      options?: VirtualNetworkGatewaysGetFailoverSingleTestDetailsOptionalParams,
    ) => {
      return await getFailoverSingleTestDetails(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        peeringLocation,
        failoverTestId,
        options,
      );
    },
    getFailoverAllTestDetails: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      typeParam: string,
      fetchLatest: boolean,
      options?: VirtualNetworkGatewaysGetFailoverAllTestDetailsOptionalParams,
    ) =>
      getFailoverAllTestDetails(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        typeParam,
        fetchLatest,
        options,
      ),
    beginGetFailoverAllTestDetails: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      typeParam: string,
      fetchLatest: boolean,
      options?: VirtualNetworkGatewaysGetFailoverAllTestDetailsOptionalParams,
    ) => {
      const poller = getFailoverAllTestDetails(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        typeParam,
        fetchLatest,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetFailoverAllTestDetailsAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      typeParam: string,
      fetchLatest: boolean,
      options?: VirtualNetworkGatewaysGetFailoverAllTestDetailsOptionalParams,
    ) => {
      return await getFailoverAllTestDetails(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        typeParam,
        fetchLatest,
        options,
      );
    },
    stopPacketCapture: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VpnPacketCaptureStopParameters,
      options?: VirtualNetworkGatewaysStopPacketCaptureOptionalParams,
    ) =>
      stopPacketCapture(context, resourceGroupName, virtualNetworkGatewayName, parameters, options),
    beginStopPacketCapture: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VpnPacketCaptureStopParameters,
      options?: VirtualNetworkGatewaysStopPacketCaptureOptionalParams,
    ) => {
      const poller = stopPacketCapture(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopPacketCaptureAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VpnPacketCaptureStopParameters,
      options?: VirtualNetworkGatewaysStopPacketCaptureOptionalParams,
    ) => {
      return await stopPacketCapture(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      );
    },
    startPacketCapture: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysStartPacketCaptureOptionalParams,
    ) => startPacketCapture(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginStartPacketCapture: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysStartPacketCaptureOptionalParams,
    ) => {
      const poller = startPacketCapture(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartPacketCaptureAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysStartPacketCaptureOptionalParams,
    ) => {
      return await startPacketCapture(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
    },
    getVpnclientIpsecParameters: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetVpnclientIpsecParametersOptionalParams,
    ) =>
      getVpnclientIpsecParameters(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginGetVpnclientIpsecParameters: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetVpnclientIpsecParametersOptionalParams,
    ) => {
      const poller = getVpnclientIpsecParameters(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetVpnclientIpsecParametersAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetVpnclientIpsecParametersOptionalParams,
    ) => {
      return await getVpnclientIpsecParameters(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
    },
    setVpnclientIpsecParameters: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      vpnclientIpsecParams: VpnClientIPsecParameters,
      options?: VirtualNetworkGatewaysSetVpnclientIpsecParametersOptionalParams,
    ) =>
      setVpnclientIpsecParameters(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        vpnclientIpsecParams,
        options,
      ),
    beginSetVpnclientIpsecParameters: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      vpnclientIpsecParams: VpnClientIPsecParameters,
      options?: VirtualNetworkGatewaysSetVpnclientIpsecParametersOptionalParams,
    ) => {
      const poller = setVpnclientIpsecParameters(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        vpnclientIpsecParams,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSetVpnclientIpsecParametersAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      vpnclientIpsecParams: VpnClientIPsecParameters,
      options?: VirtualNetworkGatewaysSetVpnclientIpsecParametersOptionalParams,
    ) => {
      return await setVpnclientIpsecParameters(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        vpnclientIpsecParams,
        options,
      );
    },
    getRoutesInformation: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetRoutesInformationOptionalParams,
    ) => getRoutesInformation(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginGetRoutesInformation: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetRoutesInformationOptionalParams,
    ) => {
      const poller = getRoutesInformation(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetRoutesInformationAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetRoutesInformationOptionalParams,
    ) => {
      return await getRoutesInformation(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
    },
    getResiliencyInformation: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetResiliencyInformationOptionalParams,
    ) => getResiliencyInformation(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginGetResiliencyInformation: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetResiliencyInformationOptionalParams,
    ) => {
      const poller = getResiliencyInformation(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetResiliencyInformationAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetResiliencyInformationOptionalParams,
    ) => {
      return await getResiliencyInformation(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
    },
    getAdvertisedRoutes: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      peer: string,
      options?: VirtualNetworkGatewaysGetAdvertisedRoutesOptionalParams,
    ) => getAdvertisedRoutes(context, resourceGroupName, virtualNetworkGatewayName, peer, options),
    beginGetAdvertisedRoutes: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      peer: string,
      options?: VirtualNetworkGatewaysGetAdvertisedRoutesOptionalParams,
    ) => {
      const poller = getAdvertisedRoutes(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        peer,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetAdvertisedRoutesAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      peer: string,
      options?: VirtualNetworkGatewaysGetAdvertisedRoutesOptionalParams,
    ) => {
      return await getAdvertisedRoutes(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        peer,
        options,
      );
    },
    getLearnedRoutes: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetLearnedRoutesOptionalParams,
    ) => getLearnedRoutes(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginGetLearnedRoutes: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetLearnedRoutesOptionalParams,
    ) => {
      const poller = getLearnedRoutes(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetLearnedRoutesAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetLearnedRoutesOptionalParams,
    ) => {
      return await getLearnedRoutes(context, resourceGroupName, virtualNetworkGatewayName, options);
    },
    listRadiusSecrets: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysListRadiusSecretsOptionalParams,
    ) => listRadiusSecrets(context, resourceGroupName, virtualNetworkGatewayName, options),
    supportedVpnDevices: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysSupportedVpnDevicesOptionalParams,
    ) => supportedVpnDevices(context, resourceGroupName, virtualNetworkGatewayName, options),
    getBgpPeerStatus: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetBgpPeerStatusOptionalParams,
    ) => getBgpPeerStatus(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginGetBgpPeerStatus: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetBgpPeerStatusOptionalParams,
    ) => {
      const poller = getBgpPeerStatus(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetBgpPeerStatusAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetBgpPeerStatusOptionalParams,
    ) => {
      return await getBgpPeerStatus(context, resourceGroupName, virtualNetworkGatewayName, options);
    },
    getVpnProfilePackageUrl: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetVpnProfilePackageUrlOptionalParams,
    ) => getVpnProfilePackageUrl(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginGetVpnProfilePackageUrl: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetVpnProfilePackageUrlOptionalParams,
    ) => {
      const poller = getVpnProfilePackageUrl(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGetVpnProfilePackageUrlAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetVpnProfilePackageUrlOptionalParams,
    ) => {
      return await getVpnProfilePackageUrl(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
    },
    generateVpnProfile: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VpnClientParameters,
      options?: VirtualNetworkGatewaysGenerateVpnProfileOptionalParams,
    ) =>
      generateVpnProfile(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      ),
    beginGenerateVpnProfile: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VpnClientParameters,
      options?: VirtualNetworkGatewaysGenerateVpnProfileOptionalParams,
    ) => {
      const poller = generateVpnProfile(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGenerateVpnProfileAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VpnClientParameters,
      options?: VirtualNetworkGatewaysGenerateVpnProfileOptionalParams,
    ) => {
      return await generateVpnProfile(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      );
    },
    generatevpnclientpackage: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VpnClientParameters,
      options?: VirtualNetworkGatewaysGeneratevpnclientpackageOptionalParams,
    ) =>
      generatevpnclientpackage(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      ),
    beginGeneratevpnclientpackage: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VpnClientParameters,
      options?: VirtualNetworkGatewaysGeneratevpnclientpackageOptionalParams,
    ) => {
      const poller = generatevpnclientpackage(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGeneratevpnclientpackageAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VpnClientParameters,
      options?: VirtualNetworkGatewaysGeneratevpnclientpackageOptionalParams,
    ) => {
      return await generatevpnclientpackage(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      );
    },
    resetVpnClientSharedKey: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysResetVpnClientSharedKeyOptionalParams,
    ) => resetVpnClientSharedKey(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginResetVpnClientSharedKey: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysResetVpnClientSharedKeyOptionalParams,
    ) => {
      const poller = resetVpnClientSharedKey(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResetVpnClientSharedKeyAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysResetVpnClientSharedKeyOptionalParams,
    ) => {
      return await resetVpnClientSharedKey(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        options,
      );
    },
    reset: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysResetOptionalParams,
    ) => reset(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginReset: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysResetOptionalParams,
    ) => {
      const poller = reset(context, resourceGroupName, virtualNetworkGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResetAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysResetOptionalParams,
    ) => {
      return await reset(context, resourceGroupName, virtualNetworkGatewayName, options);
    },
    listConnections: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysListConnectionsOptionalParams,
    ) => listConnections(context, resourceGroupName, virtualNetworkGatewayName, options),
    list: (resourceGroupName: string, options?: VirtualNetworkGatewaysListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, virtualNetworkGatewayName, options),
    beginDelete: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, virtualNetworkGatewayName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, virtualNetworkGatewayName, options);
    },
    updateTags: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: TagsObject,
      options?: VirtualNetworkGatewaysUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, virtualNetworkGatewayName, parameters, options),
    beginUpdateTags: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: TagsObject,
      options?: VirtualNetworkGatewaysUpdateTagsOptionalParams,
    ) => {
      const poller = updateTags(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateTagsAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: TagsObject,
      options?: VirtualNetworkGatewaysUpdateTagsOptionalParams,
    ) => {
      return await updateTags(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VirtualNetworkGateway,
      options?: VirtualNetworkGatewaysCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, virtualNetworkGatewayName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VirtualNetworkGateway,
      options?: VirtualNetworkGatewaysCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      parameters: VirtualNetworkGateway,
      options?: VirtualNetworkGatewaysCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        virtualNetworkGatewayName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      virtualNetworkGatewayName: string,
      options?: VirtualNetworkGatewaysGetOptionalParams,
    ) => get(context, resourceGroupName, virtualNetworkGatewayName, options),
  };
}

export function _getVirtualNetworkGatewaysOperations(
  context: NetworkManagementContext,
): VirtualNetworkGatewaysOperations {
  return {
    ..._getVirtualNetworkGateways(context),
  };
}
