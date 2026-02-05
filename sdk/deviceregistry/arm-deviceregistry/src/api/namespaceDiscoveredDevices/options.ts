// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NamespaceDiscoveredDevicesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespaceDiscoveredDevicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NamespaceDiscoveredDevicesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NamespaceDiscoveredDevicesCreateOrReplaceOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NamespaceDiscoveredDevicesGetOptionalParams extends OperationOptions {}
