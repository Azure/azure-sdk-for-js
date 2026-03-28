// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SubscriptionsCheckZonePeersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SubscriptionsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SubscriptionsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SubscriptionsListLocationsOptionalParams extends OperationOptions {
  /** Whether to include extended locations. */
  includeExtendedLocations?: boolean;
}
