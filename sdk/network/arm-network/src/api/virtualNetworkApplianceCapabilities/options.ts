// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualNetworkApplianceCapabilitiesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkApplianceCapabilitiesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkApplianceCapabilitiesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkApplianceCapabilitiesGetOptionalParams extends OperationOptions {}
