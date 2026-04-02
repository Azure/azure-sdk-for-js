// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VpnPacketCaptureStartParameters } from "../../models/microsoft/network/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualNetworkGatewaysVpnDeviceConfigurationScriptOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkGatewaysInvokeAbortMigrationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysInvokeCommitMigrationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysInvokeExecuteMigrationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysInvokePrepareMigrationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysDisconnectVirtualNetworkGatewayVpnConnectionsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGetVpnclientConnectionHealthOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysStopExpressRouteSiteFailoverSimulationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysStartExpressRouteSiteFailoverSimulationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGetFailoverSingleTestDetailsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGetFailoverAllTestDetailsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysStopPacketCaptureOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysStartPacketCaptureOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Virtual network gateway packet capture parameters supplied to start packet capture on gateway. */
  parameters?: VpnPacketCaptureStartParameters;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGetVpnclientIpsecParametersOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysSetVpnclientIpsecParametersOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGetRoutesInformationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Attempt to recalculate the Route Sets Information for the gateway */
  attemptRefresh?: boolean;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGetResiliencyInformationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Attempt to recalculate the Resiliency Information for the gateway */
  attemptRefresh?: boolean;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGetAdvertisedRoutesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGetLearnedRoutesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysListRadiusSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkGatewaysSupportedVpnDevicesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGetBgpPeerStatusOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The IP address of the peer to retrieve the status of. */
  peer?: string;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGetVpnProfilePackageUrlOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGenerateVpnProfileOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGeneratevpnclientpackageOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysResetVpnClientSharedKeyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysResetOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Virtual network gateway vip address supplied to the begin reset of the active-active feature enabled gateway. */
  gatewayVip?: string;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysListConnectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkGatewaysListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkGatewaysDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysUpdateTagsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewaysGetOptionalParams extends OperationOptions {}
