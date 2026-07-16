// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PolicyStatesListQueryResultsForManagementGroupQueryOptions,
  PolicyStatesSummarizeForManagementGroupQueryOptions,
  PolicyStatesListQueryResultsForSubscriptionQueryOptions,
  PolicyStatesSummarizeForSubscriptionQueryOptions,
  PolicyStatesListQueryResultsForResourceGroupQueryOptions,
  PolicyStatesSummarizeForResourceGroupQueryOptions,
  PolicyStatesListQueryResultsForResourceQueryOptions,
  PolicyStatesSummarizeForResourceQueryOptions,
  PolicyStatesListQueryResultsForPolicySetDefinitionQueryOptions,
  PolicyStatesSummarizeForPolicySetDefinitionQueryOptions,
  PolicyStatesListQueryResultsForPolicyDefinitionQueryOptions,
  PolicyStatesSummarizeForPolicyDefinitionQueryOptions,
  PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions,
  PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentQueryOptions,
  PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions,
  PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentQueryOptions,
} from "../../models/policyInsightsManagementClient/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesSummarizeForPolicyDefinitionOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesSummarizeForPolicyDefinitionQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesListQueryResultsForPolicyDefinitionOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesListQueryResultsForPolicyDefinitionQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesSummarizeForPolicySetDefinitionOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesSummarizeForPolicySetDefinitionQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesListQueryResultsForPolicySetDefinitionQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesTriggerResourceGroupEvaluationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PolicyStatesTriggerSubscriptionEvaluationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PolicyStatesSummarizeForResourceOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesSummarizeForResourceQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesListQueryResultsForResourceOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesListQueryResultsForResourceQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesSummarizeForResourceGroupOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesSummarizeForResourceGroupQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesListQueryResultsForResourceGroupOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesListQueryResultsForResourceGroupQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesSummarizeForSubscriptionOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesSummarizeForSubscriptionQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesListQueryResultsForSubscriptionOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesListQueryResultsForSubscriptionQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesSummarizeForManagementGroupOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesSummarizeForManagementGroupQueryOptions;
}

/** Optional parameters. */
export interface PolicyStatesListQueryResultsForManagementGroupOptionalParams extends OperationOptions {
  queryOptions?: PolicyStatesListQueryResultsForManagementGroupQueryOptions;
}
