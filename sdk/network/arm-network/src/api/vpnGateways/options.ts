// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VpnGatewayPacketCaptureStartParameters,
  VpnGatewayPacketCaptureStopParameters,
} from "../../models/microsoft/network/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VpnGatewaysStopPacketCaptureOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Vpn gateway packet capture parameters supplied to stop packet capture on vpn gateway. */
  parameters?: VpnGatewayPacketCaptureStopParameters;
}

/** Optional parameters. */
export interface VpnGatewaysStartPacketCaptureOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Vpn gateway packet capture parameters supplied to start packet capture on vpn gateway. */
  parameters?: VpnGatewayPacketCaptureStartParameters;
}

/** Optional parameters. */
export interface VpnGatewaysResetOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** VpnGateway ipConfigurationId to specify the gateway instance. */
  ipConfigurationId?: string;
}

/** Optional parameters. */
export interface VpnGatewaysListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnGatewaysListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnGatewaysDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnGatewaysUpdateTagsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnGatewaysCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnGatewaysGetOptionalParams extends OperationOptions {}
