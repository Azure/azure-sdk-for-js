// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VpnConnectionPacketCaptureStartParameters,
  VpnConnectionPacketCaptureStopParameters,
} from "../../models/microsoft/network/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VpnConnectionsListByVpnGatewayOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnConnectionsStopPacketCaptureOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Vpn Connection packet capture parameters supplied to stop packet capture on gateway connection. */
  parameters?: VpnConnectionPacketCaptureStopParameters;
}

/** Optional parameters. */
export interface VpnConnectionsStartPacketCaptureOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Vpn Connection packet capture parameters supplied to start packet capture on gateway connection. */
  parameters?: VpnConnectionPacketCaptureStartParameters;
}

/** Optional parameters. */
export interface VpnConnectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnConnectionsGetOptionalParams extends OperationOptions {}
