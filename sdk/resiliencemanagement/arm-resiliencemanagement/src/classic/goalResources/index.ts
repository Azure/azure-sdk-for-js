// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext } from "../../api/azureResilienceManagementContext.js";
import { list, get } from "../../api/goalResources/operations.js";
import {
  GoalResourcesListOptionalParams,
  GoalResourcesGetOptionalParams,
} from "../../api/goalResources/options.js";
import { GoalResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GoalResources operations. */
export interface GoalResourcesOperations {
  /** List GoalResource resources by GoalAssignment */
  list: (
    serviceGroupName: string,
    goalAssignmentName: string,
    options?: GoalResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<GoalResource>;
  /** Get a GoalResource */
  get: (
    serviceGroupName: string,
    goalAssignmentName: string,
    goalResourceName: string,
    options?: GoalResourcesGetOptionalParams,
  ) => Promise<GoalResource>;
}

function _getGoalResources(context: AzureResilienceManagementContext) {
  return {
    list: (
      serviceGroupName: string,
      goalAssignmentName: string,
      options?: GoalResourcesListOptionalParams,
    ) => list(context, serviceGroupName, goalAssignmentName, options),
    get: (
      serviceGroupName: string,
      goalAssignmentName: string,
      goalResourceName: string,
      options?: GoalResourcesGetOptionalParams,
    ) => get(context, serviceGroupName, goalAssignmentName, goalResourceName, options),
  };
}

export function _getGoalResourcesOperations(
  context: AzureResilienceManagementContext,
): GoalResourcesOperations {
  return {
    ..._getGoalResources(context),
  };
}
