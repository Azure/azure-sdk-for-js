// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualNetworksListDdosProtectionStatusOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The max number of ip addresses to return. */
  top?: number;
  /** The skipToken that is given with nextLink. */
  skipToken?: string;
}

/** Optional parameters. */
export interface VirtualNetworksListUsageOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworksCheckIPAddressAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworksListAllOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworksListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworksDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworksUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworksCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworksGetOptionalParams extends OperationOptions {
  /** Expands referenced resources. */
  expand?: string;
}
