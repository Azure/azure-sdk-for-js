// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ZonesListOptionalParams extends OperationOptions {
  /** The maximum number of DNS zones to return. If not specified, returns up to 100 zones. */
  top?: number;
}

/** Optional parameters. */
export interface ZonesListByResourceGroupOptionalParams extends OperationOptions {
  /** The maximum number of record sets to return. If not specified, returns up to 100 record sets. */
  top?: number;
}

/** Optional parameters. */
export interface ZonesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The etag of the DNS zone. Omit this value to always delete the current zone. Specify the last-seen etag value to prevent accidentally deleting any concurrent changes. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ZonesUpdateOptionalParams extends OperationOptions {
  /** The etag of the DNS zone. Omit this value to always overwrite the current zone. Specify the last-seen etag value to prevent accidentally overwriting any concurrent changes. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ZonesCreateOrUpdateOptionalParams extends OperationOptions {
  /** The etag of the DNS zone. Omit this value to always overwrite the current zone. Specify the last-seen etag value to prevent accidentally overwriting any concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new DNS zone to be created, but to prevent updating an existing zone. Other values will be ignored. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ZonesGetOptionalParams extends OperationOptions {}
