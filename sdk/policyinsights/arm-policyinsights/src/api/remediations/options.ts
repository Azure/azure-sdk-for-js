// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  RemediationsListForManagementGroupQueryOptions,
  RemediationsListForSubscriptionQueryOptions,
  RemediationsListDeploymentsAtSubscriptionQueryOptions,
  RemediationsListForResourceGroupQueryOptions,
  RemediationsListDeploymentsAtResourceGroupQueryOptions,
  RemediationsListForResourceQueryOptions,
  RemediationsListDeploymentsAtResourceQueryOptions,
  RemediationsListDeploymentsAtManagementGroupQueryOptions,
} from "../../models/policyInsightsManagementClient/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RemediationsCancelAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsListDeploymentsAtManagementGroupOptionalParams extends OperationOptions {
  queryOptions?: RemediationsListDeploymentsAtManagementGroupQueryOptions;
}

/** Optional parameters. */
export interface RemediationsCancelAtResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsListDeploymentsAtResourceOptionalParams extends OperationOptions {
  queryOptions?: RemediationsListDeploymentsAtResourceQueryOptions;
}

/** Optional parameters. */
export interface RemediationsListForResourceOptionalParams extends OperationOptions {
  queryOptions?: RemediationsListForResourceQueryOptions;
}

/** Optional parameters. */
export interface RemediationsDeleteAtResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsCreateOrUpdateAtResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsGetAtResourceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsCancelAtResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsListDeploymentsAtResourceGroupOptionalParams extends OperationOptions {
  queryOptions?: RemediationsListDeploymentsAtResourceGroupQueryOptions;
}

/** Optional parameters. */
export interface RemediationsListForResourceGroupOptionalParams extends OperationOptions {
  queryOptions?: RemediationsListForResourceGroupQueryOptions;
}

/** Optional parameters. */
export interface RemediationsDeleteAtResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsCreateOrUpdateAtResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsGetAtResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsCancelAtSubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsListDeploymentsAtSubscriptionOptionalParams extends OperationOptions {
  queryOptions?: RemediationsListDeploymentsAtSubscriptionQueryOptions;
}

/** Optional parameters. */
export interface RemediationsListForSubscriptionOptionalParams extends OperationOptions {
  queryOptions?: RemediationsListForSubscriptionQueryOptions;
}

/** Optional parameters. */
export interface RemediationsDeleteAtSubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsCreateOrUpdateAtSubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsGetAtSubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsListForManagementGroupOptionalParams extends OperationOptions {
  queryOptions?: RemediationsListForManagementGroupQueryOptions;
}

/** Optional parameters. */
export interface RemediationsDeleteAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsCreateOrUpdateAtManagementGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RemediationsGetAtManagementGroupOptionalParams extends OperationOptions {}
