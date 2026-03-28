// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/schedules/operations.js";
import type {
  SchedulesListOptionalParams,
  SchedulesDeleteOptionalParams,
  SchedulesCreateOrUpdateOptionalParams,
  SchedulesGetOptionalParams,
} from "../../api/schedules/options.js";
import type { Schedule } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Schedules operations. */
export interface SchedulesOperations {
  /** List schedules in specified workspace. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: SchedulesListOptionalParams,
  ) => PagedAsyncIterableIterator<Schedule>;
  /** Delete schedule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: SchedulesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update schedule. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    body: Schedule,
    options?: SchedulesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Schedule>, Schedule>;
  /** Get schedule. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: SchedulesGetOptionalParams,
  ) => Promise<Schedule>;
}

function _getSchedules(context: AzureMachineLearningServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: SchedulesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: SchedulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      body: Schedule,
      options?: SchedulesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: SchedulesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, options),
  };
}

export function _getSchedulesOperations(
  context: AzureMachineLearningServicesManagementContext,
): SchedulesOperations {
  return {
    ..._getSchedules(context),
  };
}
