// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext } from "../../api/policyInsightsContext.js";
import {
  listQueryResultsForResourceGroupLevelPolicyAssignment,
  listQueryResultsForSubscriptionLevelPolicyAssignment,
  listQueryResultsForPolicyDefinition,
  listQueryResultsForPolicySetDefinition,
  listQueryResultsForResource,
  listQueryResultsForResourceGroup,
  listQueryResultsForSubscription,
  listQueryResultsForManagementGroup,
} from "../../api/policyEvents/operations.js";
import type {
  PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  PolicyEventsListQueryResultsForPolicyDefinitionOptionalParams,
  PolicyEventsListQueryResultsForPolicySetDefinitionOptionalParams,
  PolicyEventsListQueryResultsForResourceOptionalParams,
  PolicyEventsListQueryResultsForResourceGroupOptionalParams,
  PolicyEventsListQueryResultsForSubscriptionOptionalParams,
  PolicyEventsListQueryResultsForManagementGroupOptionalParams,
} from "../../api/policyEvents/options.js";
import type {
  PolicyEvent,
  PolicyEventsResourceType,
} from "../../models/policyInsightsApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicyEvents operations. */
export interface PolicyEventsOperations {
  /** Queries policy events for the resource group level policy assignment. */
  listQueryResultsForResourceGroupLevelPolicyAssignment: (
    policyEventsResource: PolicyEventsResourceType,
    subscriptionId: string,
    resourceGroupName: string,
    policyAssignmentName: string,
    options?: PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEvent>;
  /** Queries policy events for the subscription level policy assignment. */
  listQueryResultsForSubscriptionLevelPolicyAssignment: (
    policyEventsResource: PolicyEventsResourceType,
    subscriptionId: string,
    policyAssignmentName: string,
    options?: PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEvent>;
  /** Queries policy events for the subscription level policy definition. */
  listQueryResultsForPolicyDefinition: (
    policyEventsResource: PolicyEventsResourceType,
    subscriptionId: string,
    policyDefinitionName: string,
    options?: PolicyEventsListQueryResultsForPolicyDefinitionOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEvent>;
  /** Queries policy events for the subscription level policy set definition. */
  listQueryResultsForPolicySetDefinition: (
    policyEventsResource: PolicyEventsResourceType,
    subscriptionId: string,
    policySetDefinitionName: string,
    options?: PolicyEventsListQueryResultsForPolicySetDefinitionOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEvent>;
  /** Queries policy events for the resource. */
  listQueryResultsForResource: (
    policyEventsResource: PolicyEventsResourceType,
    resourceId: string,
    options?: PolicyEventsListQueryResultsForResourceOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEvent>;
  /** Queries policy events for the resources under the resource group. */
  listQueryResultsForResourceGroup: (
    policyEventsResource: PolicyEventsResourceType,
    subscriptionId: string,
    resourceGroupName: string,
    options?: PolicyEventsListQueryResultsForResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEvent>;
  /** Queries policy events for the resources under the subscription. */
  listQueryResultsForSubscription: (
    policyEventsResource: PolicyEventsResourceType,
    subscriptionId: string,
    options?: PolicyEventsListQueryResultsForSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEvent>;
  /** Queries policy events for the resources under the management group. */
  listQueryResultsForManagementGroup: (
    policyEventsResource: PolicyEventsResourceType,
    managementGroupName: string,
    options?: PolicyEventsListQueryResultsForManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyEvent>;
}

function _getPolicyEvents(context: PolicyInsightsContext) {
  return {
    listQueryResultsForResourceGroupLevelPolicyAssignment: (
      policyEventsResource: PolicyEventsResourceType,
      subscriptionId: string,
      resourceGroupName: string,
      policyAssignmentName: string,
      options?: PolicyEventsListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
    ) =>
      listQueryResultsForResourceGroupLevelPolicyAssignment(
        context,
        policyEventsResource,
        subscriptionId,
        resourceGroupName,
        policyAssignmentName,
        options,
      ),
    listQueryResultsForSubscriptionLevelPolicyAssignment: (
      policyEventsResource: PolicyEventsResourceType,
      subscriptionId: string,
      policyAssignmentName: string,
      options?: PolicyEventsListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
    ) =>
      listQueryResultsForSubscriptionLevelPolicyAssignment(
        context,
        policyEventsResource,
        subscriptionId,
        policyAssignmentName,
        options,
      ),
    listQueryResultsForPolicyDefinition: (
      policyEventsResource: PolicyEventsResourceType,
      subscriptionId: string,
      policyDefinitionName: string,
      options?: PolicyEventsListQueryResultsForPolicyDefinitionOptionalParams,
    ) =>
      listQueryResultsForPolicyDefinition(
        context,
        policyEventsResource,
        subscriptionId,
        policyDefinitionName,
        options,
      ),
    listQueryResultsForPolicySetDefinition: (
      policyEventsResource: PolicyEventsResourceType,
      subscriptionId: string,
      policySetDefinitionName: string,
      options?: PolicyEventsListQueryResultsForPolicySetDefinitionOptionalParams,
    ) =>
      listQueryResultsForPolicySetDefinition(
        context,
        policyEventsResource,
        subscriptionId,
        policySetDefinitionName,
        options,
      ),
    listQueryResultsForResource: (
      policyEventsResource: PolicyEventsResourceType,
      resourceId: string,
      options?: PolicyEventsListQueryResultsForResourceOptionalParams,
    ) => listQueryResultsForResource(context, policyEventsResource, resourceId, options),
    listQueryResultsForResourceGroup: (
      policyEventsResource: PolicyEventsResourceType,
      subscriptionId: string,
      resourceGroupName: string,
      options?: PolicyEventsListQueryResultsForResourceGroupOptionalParams,
    ) =>
      listQueryResultsForResourceGroup(
        context,
        policyEventsResource,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listQueryResultsForSubscription: (
      policyEventsResource: PolicyEventsResourceType,
      subscriptionId: string,
      options?: PolicyEventsListQueryResultsForSubscriptionOptionalParams,
    ) => listQueryResultsForSubscription(context, policyEventsResource, subscriptionId, options),
    listQueryResultsForManagementGroup: (
      policyEventsResource: PolicyEventsResourceType,
      managementGroupName: string,
      options?: PolicyEventsListQueryResultsForManagementGroupOptionalParams,
    ) =>
      listQueryResultsForManagementGroup(
        context,
        policyEventsResource,
        managementGroupName,
        options,
      ),
  };
}

export function _getPolicyEventsOperations(context: PolicyInsightsContext): PolicyEventsOperations {
  return {
    ..._getPolicyEvents(context),
  };
}
