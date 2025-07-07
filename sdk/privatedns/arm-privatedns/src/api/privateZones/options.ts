// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateZonesListOptionalParams extends OperationOptions {
  /** The maximum number of Private DNS zones to return. If not specified, returns up to 100 zones. */
  top?: number;
}

/** Optional parameters. */
export interface PrivateZonesListByResourceGroupOptionalParams extends OperationOptions {
  /** The maximum number of record sets to return. If not specified, returns up to 100 record sets. */
  top?: number;
}

/** Optional parameters. */
export interface PrivateZonesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the Private DNS zone. Omit this value to always delete the current zone. Specify the last-seen ETag value to prevent accidentally deleting any concurrent changes. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface PrivateZonesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the Private DNS zone. Omit this value to always overwrite the current zone. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface PrivateZonesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the Private DNS zone. Omit this value to always overwrite the current zone. Specify the last-seen ETag value to prevent accidentally overwriting any concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new Private DNS zone to be created, but to prevent updating an existing zone. Other values will be ignored. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface PrivateZonesGetOptionalParams extends OperationOptions {}
