// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualNetworkLinksListOptionalParams extends OperationOptions {
  /** The maximum number of virtual network links to return. If not specified, returns up to 100 virtual network links. */
  top?: number;
}

/** Optional parameters. */
export interface VirtualNetworkLinksDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the virtual network link to the Private DNS zone. Omit this value to always delete the current zone. Specify the last-seen ETag value to prevent accidentally deleting any concurrent changes. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface VirtualNetworkLinksUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the virtual network link to the Private DNS zone. Omit this value to always overwrite the current virtual network link. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface VirtualNetworkLinksCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the virtual network link to the Private DNS zone. Omit this value to always overwrite the current virtual network link. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new virtual network link to the Private DNS zone to be created, but to prevent updating an existing link. Other values will be ignored. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface VirtualNetworkLinksGetOptionalParams extends OperationOptions {}
