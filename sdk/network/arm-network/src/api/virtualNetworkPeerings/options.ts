// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SyncRemoteAddressSpace } from "../../models/microsoft/network/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualNetworkPeeringsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualNetworkPeeringsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface VirtualNetworkPeeringsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Parameter indicates the intention to sync the peering with the current address space on the remote vNet after it's updated. */
  syncRemoteAddressSpace?: SyncRemoteAddressSpace;
}

/** Optional parameters. */
export interface VirtualNetworkPeeringsGetOptionalParams extends OperationOptions {}
