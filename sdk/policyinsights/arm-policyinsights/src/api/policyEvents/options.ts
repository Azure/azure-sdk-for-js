// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PolicyEventsListQueryResultsForManagementGroupQueryOptions,
  PolicyEventsListQueryResultsForSubscriptionQueryOptions,
  PolicyEventsListQueryResultsForResourceGroupQueryOptions,
  PolicyEventsListQueryResultsForResourceQueryOptions,
  PolicyEventsListQueryResultsForPolicySetDefinitionQueryOptions,
  PolicyEventsListQueryResultsForPolicyDefinitionQueryOptions,
  PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions,
  PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions,
} from "../../models/policyInsightsManagementClient/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams extends OperationOptions {
  queryOptions?: PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions;
}

/** Optional parameters. */
export interface PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams extends OperationOptions {
  queryOptions?: PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions;
}

/** Optional parameters. */
export interface PolicyEventsListQueryResultsForPolicyDefinitionOptionalParams extends OperationOptions {
  queryOptions?: PolicyEventsListQueryResultsForPolicyDefinitionQueryOptions;
}

/** Optional parameters. */
export interface PolicyEventsListQueryResultsForPolicySetDefinitionOptionalParams extends OperationOptions {
  queryOptions?: PolicyEventsListQueryResultsForPolicySetDefinitionQueryOptions;
}

/** Optional parameters. */
export interface PolicyEventsListQueryResultsForResourceOptionalParams extends OperationOptions {
  queryOptions?: PolicyEventsListQueryResultsForResourceQueryOptions;
}

/** Optional parameters. */
export interface PolicyEventsListQueryResultsForResourceGroupOptionalParams extends OperationOptions {
  queryOptions?: PolicyEventsListQueryResultsForResourceGroupQueryOptions;
}

/** Optional parameters. */
export interface PolicyEventsListQueryResultsForSubscriptionOptionalParams extends OperationOptions {
  queryOptions?: PolicyEventsListQueryResultsForSubscriptionQueryOptions;
}

/** Optional parameters. */
export interface PolicyEventsListQueryResultsForManagementGroupOptionalParams extends OperationOptions {
  queryOptions?: PolicyEventsListQueryResultsForManagementGroupQueryOptions;
}
