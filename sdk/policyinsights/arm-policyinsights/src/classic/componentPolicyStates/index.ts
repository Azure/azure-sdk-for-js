// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext } from "../../api/policyInsightsContext.js";
import {
  listQueryResultsForResourceGroupLevelPolicyAssignment,
  listQueryResultsForSubscriptionLevelPolicyAssignment,
  listQueryResultsForPolicyDefinition,
  listQueryResultsForResource,
  listQueryResultsForResourceGroup,
  listQueryResultsForSubscription,
} from "../../api/componentPolicyStates/operations.js";
import type {
  ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  ComponentPolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
  ComponentPolicyStatesListQueryResultsForResourceOptionalParams,
  ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams,
  ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams,
} from "../../api/componentPolicyStates/options.js";
import type {
  ComponentPolicyStatesQueryResults,
  ComponentPolicyStatesResource,
} from "../../models/policyInsightsApi/models.js";

/** Interface representing a ComponentPolicyStates operations. */
export interface ComponentPolicyStatesOperations {
  /** Queries component policy states for the resource group level policy assignment. */
  listQueryResultsForResourceGroupLevelPolicyAssignment: (
    subscriptionId: string,
    resourceGroupName: string,
    policyAssignmentName: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
  ) => Promise<ComponentPolicyStatesQueryResults>;
  /** Queries component policy states for the subscription level policy assignment. */
  listQueryResultsForSubscriptionLevelPolicyAssignment: (
    subscriptionId: string,
    policyAssignmentName: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
  ) => Promise<ComponentPolicyStatesQueryResults>;
  /** Queries component policy states for the subscription level policy definition. */
  listQueryResultsForPolicyDefinition: (
    subscriptionId: string,
    policyDefinitionName: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
  ) => Promise<ComponentPolicyStatesQueryResults>;
  /** Queries component policy states for the resource. */
  listQueryResultsForResource: (
    resourceId: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForResourceOptionalParams,
  ) => Promise<ComponentPolicyStatesQueryResults>;
  /** Queries component policy states under resource group scope. */
  listQueryResultsForResourceGroup: (
    subscriptionId: string,
    resourceGroupName: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams,
  ) => Promise<ComponentPolicyStatesQueryResults>;
  /** Queries component policy states under subscription scope. */
  listQueryResultsForSubscription: (
    subscriptionId: string,
    componentPolicyStatesResource: ComponentPolicyStatesResource,
    options?: ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams,
  ) => Promise<ComponentPolicyStatesQueryResults>;
}

function _getComponentPolicyStates(context: PolicyInsightsContext) {
  return {
    listQueryResultsForResourceGroupLevelPolicyAssignment: (
      subscriptionId: string,
      resourceGroupName: string,
      policyAssignmentName: string,
      componentPolicyStatesResource: ComponentPolicyStatesResource,
      options?: ComponentPolicyStatesListQueryResultsForResourceGroupLevelPolicyAssignmentOptionalParams,
    ) =>
      listQueryResultsForResourceGroupLevelPolicyAssignment(
        context,
        subscriptionId,
        resourceGroupName,
        policyAssignmentName,
        componentPolicyStatesResource,
        options,
      ),
    listQueryResultsForSubscriptionLevelPolicyAssignment: (
      subscriptionId: string,
      policyAssignmentName: string,
      componentPolicyStatesResource: ComponentPolicyStatesResource,
      options?: ComponentPolicyStatesListQueryResultsForSubscriptionLevelPolicyAssignmentOptionalParams,
    ) =>
      listQueryResultsForSubscriptionLevelPolicyAssignment(
        context,
        subscriptionId,
        policyAssignmentName,
        componentPolicyStatesResource,
        options,
      ),
    listQueryResultsForPolicyDefinition: (
      subscriptionId: string,
      policyDefinitionName: string,
      componentPolicyStatesResource: ComponentPolicyStatesResource,
      options?: ComponentPolicyStatesListQueryResultsForPolicyDefinitionOptionalParams,
    ) =>
      listQueryResultsForPolicyDefinition(
        context,
        subscriptionId,
        policyDefinitionName,
        componentPolicyStatesResource,
        options,
      ),
    listQueryResultsForResource: (
      resourceId: string,
      componentPolicyStatesResource: ComponentPolicyStatesResource,
      options?: ComponentPolicyStatesListQueryResultsForResourceOptionalParams,
    ) => listQueryResultsForResource(context, resourceId, componentPolicyStatesResource, options),
    listQueryResultsForResourceGroup: (
      subscriptionId: string,
      resourceGroupName: string,
      componentPolicyStatesResource: ComponentPolicyStatesResource,
      options?: ComponentPolicyStatesListQueryResultsForResourceGroupOptionalParams,
    ) =>
      listQueryResultsForResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        componentPolicyStatesResource,
        options,
      ),
    listQueryResultsForSubscription: (
      subscriptionId: string,
      componentPolicyStatesResource: ComponentPolicyStatesResource,
      options?: ComponentPolicyStatesListQueryResultsForSubscriptionOptionalParams,
    ) =>
      listQueryResultsForSubscription(
        context,
        subscriptionId,
        componentPolicyStatesResource,
        options,
      ),
  };
}

export function _getComponentPolicyStatesOperations(
  context: PolicyInsightsContext,
): ComponentPolicyStatesOperations {
  return {
    ..._getComponentPolicyStates(context),
  };
}
