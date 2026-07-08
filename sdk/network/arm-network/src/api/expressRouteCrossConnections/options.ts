// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExpressRouteCrossConnectionsListRoutesTableOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCrossConnectionsListRoutesTableSummaryOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCrossConnectionsListArpTableOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCrossConnectionsListOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For example, you can use $filter=name eq '{circuitServiceKey}'. */
  filter?: string;
}

/** Optional parameters. */
export interface ExpressRouteCrossConnectionsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteCrossConnectionsUpdateTagsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExpressRouteCrossConnectionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ExpressRouteCrossConnectionsGetOptionalParams extends OperationOptions {}
