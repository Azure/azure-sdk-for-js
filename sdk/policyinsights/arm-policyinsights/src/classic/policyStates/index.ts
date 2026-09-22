// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext } from "../../api/policyInsightsContext.js";
import {
  summarizeForResourceGroupLevelPolicyAssignment,
  listQueryResultsForResourceGroupLevelPolicyAssignment,
  summarizeForSubscriptionLevelPolicyAssignment,
  listQueryResultsForSubscriptionLevelPolicyAssignment,
  summarizeForPolicyDefinition,
  listQueryResultsForPolicyDefinition,
  summarizeForPolicySetDefinition,
  listQueryResultsForPolicySetDefinition,
  triggerResourceGroupEvaluation,
  triggerSubscriptionEvaluation,
  summarizeForResource,
  listQueryResultsForResource,
  summarizeForResourceGroup,
  listQueryResultsForResourceGroup,
  summarizeForSubscription,
  listQueryResultsForSubscription,
  summarizeForManagementGroup,
  listQueryResultsForManagementGroup,
} from "../../api/policyStates/operations.js";
import type {
  PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentOptionalParams,
  PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentOptionalParams,
  PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  PolicyStatesSummarizeForPolicyDefinitionOptionalParams,
  PolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
  PolicyStatesSummarizeForPolicySetDefinitionOptionalParams,
  PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams,
  PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
  PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
  PolicyStatesSummarizeForResourceOptionalParams,
  PolicyStatesListQueryResultsForResourceOptionalParams,
  PolicyStatesSummarizeForResourceGroupOptionalParams,
  PolicyStatesListQueryResultsForResourceGroupOptionalParams,
  PolicyStatesSummarizeForSubscriptionOptionalParams,
  PolicyStatesListQueryResultsForSubscriptionOptionalParams,
  PolicyStatesSummarizeForManagementGroupOptionalParams,
  PolicyStatesListQueryResultsForManagementGroupOptionalParams,
} from "../../api/policyStates/options.js";
import type {
  PolicyState,
  SummarizeResults,
  PolicyStatesResource,
  PolicyStatesSummaryResourceType,
} from "../../models/policyInsightsApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PolicyStates operations. */
export interface PolicyStatesOperations {
  /** Summarizes policy states for the resource group level policy assignment. */
  summarizeForResourceGroupLevelPolicyAssignment: (
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    resourceGroupName: string,
    policyAssignmentName: string,
    options?: PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentOptionalParams,
  ) => Promise<SummarizeResults>;
  /** Queries policy states for the resource group level policy assignment. */
  listQueryResultsForResourceGroupLevelPolicyAssignment: (
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    resourceGroupName: string,
    policyAssignmentName: string,
    options?: PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyState>;
  /** Summarizes policy states for the subscription level policy assignment. */
  summarizeForSubscriptionLevelPolicyAssignment: (
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    policyAssignmentName: string,
    options?: PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentOptionalParams,
  ) => Promise<SummarizeResults>;
  /** Queries policy states for the subscription level policy assignment. */
  listQueryResultsForSubscriptionLevelPolicyAssignment: (
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    policyAssignmentName: string,
    options?: PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyState>;
  /** Summarizes policy states for the subscription level policy definition. */
  summarizeForPolicyDefinition: (
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    policyDefinitionName: string,
    options?: PolicyStatesSummarizeForPolicyDefinitionOptionalParams,
  ) => Promise<SummarizeResults>;
  /** Queries policy states for the subscription level policy definition. */
  listQueryResultsForPolicyDefinition: (
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    policyDefinitionName: string,
    options?: PolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyState>;
  /** Summarizes policy states for the subscription level policy set definition. */
  summarizeForPolicySetDefinition: (
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    policySetDefinitionName: string,
    options?: PolicyStatesSummarizeForPolicySetDefinitionOptionalParams,
  ) => Promise<SummarizeResults>;
  /** Queries policy states for the subscription level policy set definition. */
  listQueryResultsForPolicySetDefinition: (
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    policySetDefinitionName: string,
    options?: PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyState>;
  /** Triggers a policy evaluation scan for all the resources under the resource group. */
  triggerResourceGroupEvaluation: (
    subscriptionId: string,
    resourceGroupName: string,
    options?: PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use triggerResourceGroupEvaluation instead */
  beginTriggerResourceGroupEvaluation: (
    subscriptionId: string,
    resourceGroupName: string,
    options?: PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use triggerResourceGroupEvaluation instead */
  beginTriggerResourceGroupEvaluationAndWait: (
    subscriptionId: string,
    resourceGroupName: string,
    options?: PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
  ) => Promise<void>;
  /** Triggers a policy evaluation scan for all the resources under the subscription */
  triggerSubscriptionEvaluation: (
    subscriptionId: string,
    options?: PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use triggerSubscriptionEvaluation instead */
  beginTriggerSubscriptionEvaluation: (
    subscriptionId: string,
    options?: PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use triggerSubscriptionEvaluation instead */
  beginTriggerSubscriptionEvaluationAndWait: (
    subscriptionId: string,
    options?: PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
  ) => Promise<void>;
  /** Summarizes policy states for the resource. */
  summarizeForResource: (
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    resourceId: string,
    options?: PolicyStatesSummarizeForResourceOptionalParams,
  ) => Promise<SummarizeResults>;
  /** Queries policy states for the resource. */
  listQueryResultsForResource: (
    policyStatesResource: PolicyStatesResource,
    resourceId: string,
    options?: PolicyStatesListQueryResultsForResourceOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyState>;
  /** Summarizes policy states for the resources under the resource group. */
  summarizeForResourceGroup: (
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    resourceGroupName: string,
    options?: PolicyStatesSummarizeForResourceGroupOptionalParams,
  ) => Promise<SummarizeResults>;
  /** Queries policy states for the resources under the resource group. */
  listQueryResultsForResourceGroup: (
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    resourceGroupName: string,
    options?: PolicyStatesListQueryResultsForResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyState>;
  /** Summarizes policy states for the resources under the subscription. */
  summarizeForSubscription: (
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    subscriptionId: string,
    options?: PolicyStatesSummarizeForSubscriptionOptionalParams,
  ) => Promise<SummarizeResults>;
  /** Queries policy states for the resources under the subscription. */
  listQueryResultsForSubscription: (
    policyStatesResource: PolicyStatesResource,
    subscriptionId: string,
    options?: PolicyStatesListQueryResultsForSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyState>;
  /** Summarizes policy states for the resources under the management group. */
  summarizeForManagementGroup: (
    policyStatesSummaryResource: PolicyStatesSummaryResourceType,
    managementGroupName: string,
    options?: PolicyStatesSummarizeForManagementGroupOptionalParams,
  ) => Promise<SummarizeResults>;
  /** Queries policy states for the resources under the management group. */
  listQueryResultsForManagementGroup: (
    policyStatesResource: PolicyStatesResource,
    managementGroupName: string,
    options?: PolicyStatesListQueryResultsForManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyState>;
}

function _getPolicyStates(context: PolicyInsightsContext) {
  return {
    summarizeForResourceGroupLevelPolicyAssignment: (
      policyStatesSummaryResource: PolicyStatesSummaryResourceType,
      subscriptionId: string,
      resourceGroupName: string,
      policyAssignmentName: string,
      options?: PolicyStatesSummarizeForResourceGroupLevelPolicyAssignmentOptionalParams,
    ) =>
      summarizeForResourceGroupLevelPolicyAssignment(
        context,
        policyStatesSummaryResource,
        subscriptionId,
        resourceGroupName,
        policyAssignmentName,
        options,
      ),
    listQueryResultsForResourceGroupLevelPolicyAssignment: (
      policyStatesResource: PolicyStatesResource,
      subscriptionId: string,
      resourceGroupName: string,
      policyAssignmentName: string,
      options?: PolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
    ) =>
      listQueryResultsForResourceGroupLevelPolicyAssignment(
        context,
        policyStatesResource,
        subscriptionId,
        resourceGroupName,
        policyAssignmentName,
        options,
      ),
    summarizeForSubscriptionLevelPolicyAssignment: (
      policyStatesSummaryResource: PolicyStatesSummaryResourceType,
      subscriptionId: string,
      policyAssignmentName: string,
      options?: PolicyStatesSummarizeForSubscriptionLevelPolicyAssignmentOptionalParams,
    ) =>
      summarizeForSubscriptionLevelPolicyAssignment(
        context,
        policyStatesSummaryResource,
        subscriptionId,
        policyAssignmentName,
        options,
      ),
    listQueryResultsForSubscriptionLevelPolicyAssignment: (
      policyStatesResource: PolicyStatesResource,
      subscriptionId: string,
      policyAssignmentName: string,
      options?: PolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
    ) =>
      listQueryResultsForSubscriptionLevelPolicyAssignment(
        context,
        policyStatesResource,
        subscriptionId,
        policyAssignmentName,
        options,
      ),
    summarizeForPolicyDefinition: (
      policyStatesSummaryResource: PolicyStatesSummaryResourceType,
      subscriptionId: string,
      policyDefinitionName: string,
      options?: PolicyStatesSummarizeForPolicyDefinitionOptionalParams,
    ) =>
      summarizeForPolicyDefinition(
        context,
        policyStatesSummaryResource,
        subscriptionId,
        policyDefinitionName,
        options,
      ),
    listQueryResultsForPolicyDefinition: (
      policyStatesResource: PolicyStatesResource,
      subscriptionId: string,
      policyDefinitionName: string,
      options?: PolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
    ) =>
      listQueryResultsForPolicyDefinition(
        context,
        policyStatesResource,
        subscriptionId,
        policyDefinitionName,
        options,
      ),
    summarizeForPolicySetDefinition: (
      policyStatesSummaryResource: PolicyStatesSummaryResourceType,
      subscriptionId: string,
      policySetDefinitionName: string,
      options?: PolicyStatesSummarizeForPolicySetDefinitionOptionalParams,
    ) =>
      summarizeForPolicySetDefinition(
        context,
        policyStatesSummaryResource,
        subscriptionId,
        policySetDefinitionName,
        options,
      ),
    listQueryResultsForPolicySetDefinition: (
      policyStatesResource: PolicyStatesResource,
      subscriptionId: string,
      policySetDefinitionName: string,
      options?: PolicyStatesListQueryResultsForPolicySetDefinitionOptionalParams,
    ) =>
      listQueryResultsForPolicySetDefinition(
        context,
        policyStatesResource,
        subscriptionId,
        policySetDefinitionName,
        options,
      ),
    triggerResourceGroupEvaluation: (
      subscriptionId: string,
      resourceGroupName: string,
      options?: PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
    ) => triggerResourceGroupEvaluation(context, subscriptionId, resourceGroupName, options),
    beginTriggerResourceGroupEvaluation: async (
      subscriptionId: string,
      resourceGroupName: string,
      options?: PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
    ) => {
      const poller = triggerResourceGroupEvaluation(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTriggerResourceGroupEvaluationAndWait: async (
      subscriptionId: string,
      resourceGroupName: string,
      options?: PolicyStatesTriggerResourceGroupEvaluationOptionalParams,
    ) => {
      return await triggerResourceGroupEvaluation(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      );
    },
    triggerSubscriptionEvaluation: (
      subscriptionId: string,
      options?: PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
    ) => triggerSubscriptionEvaluation(context, subscriptionId, options),
    beginTriggerSubscriptionEvaluation: async (
      subscriptionId: string,
      options?: PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
    ) => {
      const poller = triggerSubscriptionEvaluation(context, subscriptionId, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTriggerSubscriptionEvaluationAndWait: async (
      subscriptionId: string,
      options?: PolicyStatesTriggerSubscriptionEvaluationOptionalParams,
    ) => {
      return await triggerSubscriptionEvaluation(context, subscriptionId, options);
    },
    summarizeForResource: (
      policyStatesSummaryResource: PolicyStatesSummaryResourceType,
      resourceId: string,
      options?: PolicyStatesSummarizeForResourceOptionalParams,
    ) => summarizeForResource(context, policyStatesSummaryResource, resourceId, options),
    listQueryResultsForResource: (
      policyStatesResource: PolicyStatesResource,
      resourceId: string,
      options?: PolicyStatesListQueryResultsForResourceOptionalParams,
    ) => listQueryResultsForResource(context, policyStatesResource, resourceId, options),
    summarizeForResourceGroup: (
      policyStatesSummaryResource: PolicyStatesSummaryResourceType,
      subscriptionId: string,
      resourceGroupName: string,
      options?: PolicyStatesSummarizeForResourceGroupOptionalParams,
    ) =>
      summarizeForResourceGroup(
        context,
        policyStatesSummaryResource,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listQueryResultsForResourceGroup: (
      policyStatesResource: PolicyStatesResource,
      subscriptionId: string,
      resourceGroupName: string,
      options?: PolicyStatesListQueryResultsForResourceGroupOptionalParams,
    ) =>
      listQueryResultsForResourceGroup(
        context,
        policyStatesResource,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    summarizeForSubscription: (
      policyStatesSummaryResource: PolicyStatesSummaryResourceType,
      subscriptionId: string,
      options?: PolicyStatesSummarizeForSubscriptionOptionalParams,
    ) => summarizeForSubscription(context, policyStatesSummaryResource, subscriptionId, options),
    listQueryResultsForSubscription: (
      policyStatesResource: PolicyStatesResource,
      subscriptionId: string,
      options?: PolicyStatesListQueryResultsForSubscriptionOptionalParams,
    ) => listQueryResultsForSubscription(context, policyStatesResource, subscriptionId, options),
    summarizeForManagementGroup: (
      policyStatesSummaryResource: PolicyStatesSummaryResourceType,
      managementGroupName: string,
      options?: PolicyStatesSummarizeForManagementGroupOptionalParams,
    ) =>
      summarizeForManagementGroup(
        context,
        policyStatesSummaryResource,
        managementGroupName,
        options,
      ),
    listQueryResultsForManagementGroup: (
      policyStatesResource: PolicyStatesResource,
      managementGroupName: string,
      options?: PolicyStatesListQueryResultsForManagementGroupOptionalParams,
    ) =>
      listQueryResultsForManagementGroup(
        context,
        policyStatesResource,
        managementGroupName,
        options,
      ),
  };
}

export function _getPolicyStatesOperations(context: PolicyInsightsContext): PolicyStatesOperations {
  return {
    ..._getPolicyStates(context),
  };
}
