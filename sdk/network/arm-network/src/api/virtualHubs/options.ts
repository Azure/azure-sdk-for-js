// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EffectiveRoutesParameters } from "../../models/microsoft/network/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualHubsGetOutboundRoutesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualHubsGetInboundRoutesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualHubsGetEffectiveVirtualHubRoutesOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Parameters supplied to get the effective routes for a specific resource. */
  effectiveRoutesParameters?: EffectiveRoutesParameters;
}

/** Optional parameters. */
export interface VirtualHubsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualHubsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualHubsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualHubsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualHubsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualHubsGetOptionalParams extends OperationOptions {}
