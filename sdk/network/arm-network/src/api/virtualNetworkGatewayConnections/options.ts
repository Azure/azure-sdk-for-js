// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VpnPacketCaptureStartParameters } from "../../models/microsoft/network/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsResetConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsGetIkeSasOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsStopPacketCaptureOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Virtual network gateway packet capture parameters supplied to start packet capture on gateway connection. */
  parameters?: VpnPacketCaptureStartParameters;
}

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsResetSharedKeyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsGetSharedKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsSetSharedKeyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsUpdateTagsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkGatewayConnectionsGetOptionalParams extends OperationOptions {}
