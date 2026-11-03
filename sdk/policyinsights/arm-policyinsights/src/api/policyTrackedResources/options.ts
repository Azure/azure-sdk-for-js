// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PolicyTrackedResourcesListQueryResultsForManagementGroupQueryOptions,
  PolicyTrackedResourcesListQueryResultsForSubscriptionQueryOptions,
  PolicyTrackedResourcesListQueryResultsForResourceGroupQueryOptions,
  PolicyTrackedResourcesListQueryResultsForResourceQueryOptions,
} from "../../models/policyInsightsManagementClient/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyTrackedResourcesListQueryResultsForResourceOptionalParams extends OperationOptions {
  queryOptions?: PolicyTrackedResourcesListQueryResultsForResourceQueryOptions;
}

/** Optional parameters. */
export interface PolicyTrackedResourcesListQueryResultsForResourceGroupOptionalParams extends OperationOptions {
  queryOptions?: PolicyTrackedResourcesListQueryResultsForResourceGroupQueryOptions;
}

/** Optional parameters. */
export interface PolicyTrackedResourcesListQueryResultsForSubscriptionOptionalParams extends OperationOptions {
  queryOptions?: PolicyTrackedResourcesListQueryResultsForSubscriptionQueryOptions;
}

/** Optional parameters. */
export interface PolicyTrackedResourcesListQueryResultsForManagementGroupOptionalParams extends OperationOptions {
  queryOptions?: PolicyTrackedResourcesListQueryResultsForManagementGroupQueryOptions;
}
