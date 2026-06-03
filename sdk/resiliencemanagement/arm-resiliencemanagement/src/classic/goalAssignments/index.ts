// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import {
  list,
  recommendCapacity,
  $delete,
  refreshGoalResources,
  updateGoalResources,
  update,
  createOrUpdate,
  get,
} from "../../api/goalAssignments/operations.js";
import {
  GoalAssignmentsListOptionalParams,
  GoalAssignmentsRecommendCapacityOptionalParams,
  GoalAssignmentsDeleteOptionalParams,
  GoalAssignmentsRefreshGoalResourcesOptionalParams,
  GoalAssignmentsUpdateGoalResourcesOptionalParams,
  GoalAssignmentsUpdateOptionalParams,
  GoalAssignmentsCreateOrUpdateOptionalParams,
  GoalAssignmentsGetOptionalParams,
} from "../../api/goalAssignments/options.js";
import {
  GoalAssignment,
  UpdateGoalResourceRequest,
  RecommendCapacityRequest,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GoalAssignments operations. */
export interface GoalAssignmentsOperations {
  /** List GoalAssignment resources by tenant */
  list: (
    serviceGroupName: string,
    options?: GoalAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<GoalAssignment>;
  /** Recommends capacity improvements for resources under the goal assignments scope. Returns AI-powered capacity assessments and recommendations. */
  recommendCapacity: (
    serviceGroupName: string,
    goalAssignmentName: string,
    body: RecommendCapacityRequest,
    options?: GoalAssignmentsRecommendCapacityOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use recommendCapacity instead */
  beginRecommendCapacity: (
    serviceGroupName: string,
    goalAssignmentName: string,
    body: RecommendCapacityRequest,
    options?: GoalAssignmentsRecommendCapacityOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use recommendCapacity instead */
  beginRecommendCapacityAndWait: (
    serviceGroupName: string,
    goalAssignmentName: string,
    body: RecommendCapacityRequest,
    options?: GoalAssignmentsRecommendCapacityOptionalParams,
  ) => Promise<void>;
  /** Delete a GoalAssignment */
  delete: (
    serviceGroupName: string,
    goalAssignmentName: string,
    options?: GoalAssignmentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    serviceGroupName: string,
    goalAssignmentName: string,
    options?: GoalAssignmentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    serviceGroupName: string,
    goalAssignmentName: string,
    options?: GoalAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Refreshes the goal resources under a goal assignment. This operation scans for new resources under the scope of the assignment. */
  refreshGoalResources: (
    serviceGroupName: string,
    goalAssignmentName: string,
    options?: GoalAssignmentsRefreshGoalResourcesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use refreshGoalResources instead */
  beginRefreshGoalResources: (
    serviceGroupName: string,
    goalAssignmentName: string,
    options?: GoalAssignmentsRefreshGoalResourcesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use refreshGoalResources instead */
  beginRefreshGoalResourcesAndWait: (
    serviceGroupName: string,
    goalAssignmentName: string,
    options?: GoalAssignmentsRefreshGoalResourcesOptionalParams,
  ) => Promise<void>;
  /** Action to exclude a resource from goal assignment. */
  updateGoalResources: (
    serviceGroupName: string,
    goalAssignmentName: string,
    body: UpdateGoalResourceRequest,
    options?: GoalAssignmentsUpdateGoalResourcesOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use updateGoalResources instead */
  beginUpdateGoalResources: (
    serviceGroupName: string,
    goalAssignmentName: string,
    body: UpdateGoalResourceRequest,
    options?: GoalAssignmentsUpdateGoalResourcesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use updateGoalResources instead */
  beginUpdateGoalResourcesAndWait: (
    serviceGroupName: string,
    goalAssignmentName: string,
    body: UpdateGoalResourceRequest,
    options?: GoalAssignmentsUpdateGoalResourcesOptionalParams,
  ) => Promise<void>;
  /** Update a GoalAssignment */
  update: (
    serviceGroupName: string,
    goalAssignmentName: string,
    properties: GoalAssignment,
    options?: GoalAssignmentsUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use update instead */
  beginUpdate: (
    serviceGroupName: string,
    goalAssignmentName: string,
    properties: GoalAssignment,
    options?: GoalAssignmentsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    serviceGroupName: string,
    goalAssignmentName: string,
    properties: GoalAssignment,
    options?: GoalAssignmentsUpdateOptionalParams,
  ) => Promise<void>;
  /** Create a GoalAssignment */
  createOrUpdate: (
    serviceGroupName: string,
    goalAssignmentName: string,
    resource: GoalAssignment,
    options?: GoalAssignmentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    serviceGroupName: string,
    goalAssignmentName: string,
    resource: GoalAssignment,
    options?: GoalAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    serviceGroupName: string,
    goalAssignmentName: string,
    resource: GoalAssignment,
    options?: GoalAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<void>;
  /** Get a GoalAssignment */
  get: (
    serviceGroupName: string,
    goalAssignmentName: string,
    options?: GoalAssignmentsGetOptionalParams,
  ) => Promise<GoalAssignment>;
}

function _getGoalAssignments(context: AzureResilienceManagementContext) {
  return {
    list: (serviceGroupName: string, options?: GoalAssignmentsListOptionalParams) =>
      list(context, serviceGroupName, options),
    recommendCapacity: (
      serviceGroupName: string,
      goalAssignmentName: string,
      body: RecommendCapacityRequest,
      options?: GoalAssignmentsRecommendCapacityOptionalParams,
    ) => recommendCapacity(context, serviceGroupName, goalAssignmentName, body, options),
    beginRecommendCapacity: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      body: RecommendCapacityRequest,
      options?: GoalAssignmentsRecommendCapacityOptionalParams,
    ) => {
      const poller = recommendCapacity(
        context,
        serviceGroupName,
        goalAssignmentName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRecommendCapacityAndWait: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      body: RecommendCapacityRequest,
      options?: GoalAssignmentsRecommendCapacityOptionalParams,
    ) => {
      return await recommendCapacity(context, serviceGroupName, goalAssignmentName, body, options);
    },
    delete: (
      serviceGroupName: string,
      goalAssignmentName: string,
      options?: GoalAssignmentsDeleteOptionalParams,
    ) => $delete(context, serviceGroupName, goalAssignmentName, options),
    beginDelete: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      options?: GoalAssignmentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, serviceGroupName, goalAssignmentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      options?: GoalAssignmentsDeleteOptionalParams,
    ) => {
      return await $delete(context, serviceGroupName, goalAssignmentName, options);
    },
    refreshGoalResources: (
      serviceGroupName: string,
      goalAssignmentName: string,
      options?: GoalAssignmentsRefreshGoalResourcesOptionalParams,
    ) => refreshGoalResources(context, serviceGroupName, goalAssignmentName, options),
    beginRefreshGoalResources: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      options?: GoalAssignmentsRefreshGoalResourcesOptionalParams,
    ) => {
      const poller = refreshGoalResources(context, serviceGroupName, goalAssignmentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRefreshGoalResourcesAndWait: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      options?: GoalAssignmentsRefreshGoalResourcesOptionalParams,
    ) => {
      return await refreshGoalResources(context, serviceGroupName, goalAssignmentName, options);
    },
    updateGoalResources: (
      serviceGroupName: string,
      goalAssignmentName: string,
      body: UpdateGoalResourceRequest,
      options?: GoalAssignmentsUpdateGoalResourcesOptionalParams,
    ) => updateGoalResources(context, serviceGroupName, goalAssignmentName, body, options),
    beginUpdateGoalResources: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      body: UpdateGoalResourceRequest,
      options?: GoalAssignmentsUpdateGoalResourcesOptionalParams,
    ) => {
      const poller = updateGoalResources(
        context,
        serviceGroupName,
        goalAssignmentName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateGoalResourcesAndWait: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      body: UpdateGoalResourceRequest,
      options?: GoalAssignmentsUpdateGoalResourcesOptionalParams,
    ) => {
      return await updateGoalResources(
        context,
        serviceGroupName,
        goalAssignmentName,
        body,
        options,
      );
    },
    update: (
      serviceGroupName: string,
      goalAssignmentName: string,
      properties: GoalAssignment,
      options?: GoalAssignmentsUpdateOptionalParams,
    ) => update(context, serviceGroupName, goalAssignmentName, properties, options),
    beginUpdate: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      properties: GoalAssignment,
      options?: GoalAssignmentsUpdateOptionalParams,
    ) => {
      const poller = update(context, serviceGroupName, goalAssignmentName, properties, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      properties: GoalAssignment,
      options?: GoalAssignmentsUpdateOptionalParams,
    ) => {
      return await update(context, serviceGroupName, goalAssignmentName, properties, options);
    },
    createOrUpdate: (
      serviceGroupName: string,
      goalAssignmentName: string,
      resource: GoalAssignment,
      options?: GoalAssignmentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, serviceGroupName, goalAssignmentName, resource, options),
    beginCreateOrUpdate: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      resource: GoalAssignment,
      options?: GoalAssignmentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        serviceGroupName,
        goalAssignmentName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      serviceGroupName: string,
      goalAssignmentName: string,
      resource: GoalAssignment,
      options?: GoalAssignmentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, serviceGroupName, goalAssignmentName, resource, options);
    },
    get: (
      serviceGroupName: string,
      goalAssignmentName: string,
      options?: GoalAssignmentsGetOptionalParams,
    ) => get(context, serviceGroupName, goalAssignmentName, options),
  };
}

export function _getGoalAssignmentsOperations(
  context: AzureResilienceManagementContext,
): GoalAssignmentsOperations {
  return {
    ..._getGoalAssignments(context),
  };
}
