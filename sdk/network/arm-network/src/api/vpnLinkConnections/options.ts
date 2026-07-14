// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VpnLinkConnectionsGetIkeSasOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnLinkConnectionsResetConnectionOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnLinkConnectionsListByVpnConnectionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnLinkConnectionsListDefaultSharedKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnLinkConnectionsListAllSharedKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VpnLinkConnectionsSetOrInitDefaultSharedKeyOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VpnLinkConnectionsGetDefaultSharedKeyOptionalParams extends OperationOptions {}
