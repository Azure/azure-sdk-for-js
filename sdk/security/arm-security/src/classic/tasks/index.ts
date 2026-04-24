// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  list,
  updateSubscriptionLevelTaskState,
  listByHomeRegion,
  getSubscriptionLevelTask,
  updateResourceGroupLevelTaskState,
  listByResourceGroup,
  getResourceGroupLevelTask,
} from "../../api/tasks/operations.js";
import type {
  TasksListOptionalParams,
  TasksUpdateSubscriptionLevelTaskStateOptionalParams,
  TasksListByHomeRegionOptionalParams,
  TasksGetSubscriptionLevelTaskOptionalParams,
  TasksUpdateResourceGroupLevelTaskStateOptionalParams,
  TasksListByResourceGroupOptionalParams,
  TasksGetResourceGroupLevelTaskOptionalParams,
} from "../../api/tasks/options.js";
import type {
  TasksAPISecurityTask,
  TasksAPITaskUpdateActionType,
} from "../../models/tasksAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Tasks operations. */
export interface TasksOperations {
  /** Recommended tasks that will help improve the security of the subscription proactively */
  list: (options?: TasksListOptionalParams) => PagedAsyncIterableIterator<TasksAPISecurityTask>;
  /** Recommended tasks that will help improve the security of the subscription proactively */
  updateSubscriptionLevelTaskState: (
    ascLocation: string,
    taskName: string,
    taskUpdateActionType: TasksAPITaskUpdateActionType,
    options?: TasksUpdateSubscriptionLevelTaskStateOptionalParams,
  ) => Promise<void>;
  /** Recommended tasks that will help improve the security of the subscription proactively */
  listByHomeRegion: (
    ascLocation: string,
    options?: TasksListByHomeRegionOptionalParams,
  ) => PagedAsyncIterableIterator<TasksAPISecurityTask>;
  /** Recommended tasks that will help improve the security of the subscription proactively */
  getSubscriptionLevelTask: (
    ascLocation: string,
    taskName: string,
    options?: TasksGetSubscriptionLevelTaskOptionalParams,
  ) => Promise<TasksAPISecurityTask>;
  /** Recommended tasks that will help improve the security of the subscription proactively */
  updateResourceGroupLevelTaskState: (
    resourceGroupName: string,
    ascLocation: string,
    taskName: string,
    taskUpdateActionType: TasksAPITaskUpdateActionType,
    options?: TasksUpdateResourceGroupLevelTaskStateOptionalParams,
  ) => Promise<void>;
  /** Recommended tasks that will help improve the security of the subscription proactively */
  listByResourceGroup: (
    resourceGroupName: string,
    ascLocation: string,
    options?: TasksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<TasksAPISecurityTask>;
  /** Recommended tasks that will help improve the security of the subscription proactively */
  getResourceGroupLevelTask: (
    resourceGroupName: string,
    ascLocation: string,
    taskName: string,
    options?: TasksGetResourceGroupLevelTaskOptionalParams,
  ) => Promise<TasksAPISecurityTask>;
}

function _getTasks(context: SecurityCenterContext) {
  return {
    list: (options?: TasksListOptionalParams) => list(context, options),
    updateSubscriptionLevelTaskState: (
      ascLocation: string,
      taskName: string,
      taskUpdateActionType: TasksAPITaskUpdateActionType,
      options?: TasksUpdateSubscriptionLevelTaskStateOptionalParams,
    ) =>
      updateSubscriptionLevelTaskState(
        context,
        ascLocation,
        taskName,
        taskUpdateActionType,
        options,
      ),
    listByHomeRegion: (ascLocation: string, options?: TasksListByHomeRegionOptionalParams) =>
      listByHomeRegion(context, ascLocation, options),
    getSubscriptionLevelTask: (
      ascLocation: string,
      taskName: string,
      options?: TasksGetSubscriptionLevelTaskOptionalParams,
    ) => getSubscriptionLevelTask(context, ascLocation, taskName, options),
    updateResourceGroupLevelTaskState: (
      resourceGroupName: string,
      ascLocation: string,
      taskName: string,
      taskUpdateActionType: TasksAPITaskUpdateActionType,
      options?: TasksUpdateResourceGroupLevelTaskStateOptionalParams,
    ) =>
      updateResourceGroupLevelTaskState(
        context,
        resourceGroupName,
        ascLocation,
        taskName,
        taskUpdateActionType,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      ascLocation: string,
      options?: TasksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, ascLocation, options),
    getResourceGroupLevelTask: (
      resourceGroupName: string,
      ascLocation: string,
      taskName: string,
      options?: TasksGetResourceGroupLevelTaskOptionalParams,
    ) => getResourceGroupLevelTask(context, resourceGroupName, ascLocation, taskName, options),
  };
}

export function _getTasksOperations(context: SecurityCenterContext): TasksOperations {
  return {
    ..._getTasks(context),
  };
}
