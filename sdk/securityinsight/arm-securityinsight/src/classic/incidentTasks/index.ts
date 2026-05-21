// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/incidentTasks/operations.js";
import {
  IncidentTasksListOptionalParams,
  IncidentTasksDeleteOptionalParams,
  IncidentTasksCreateOrUpdateOptionalParams,
  IncidentTasksGetOptionalParams,
} from "../../api/incidentTasks/options.js";
import { IncidentTask } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a IncidentTasks operations. */
export interface IncidentTasksOperations {
  /** Gets all incident tasks. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    options?: IncidentTasksListOptionalParams,
  ) => PagedAsyncIterableIterator<IncidentTask>;
  /** Delete the incident task. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    incidentTaskId: string,
    options?: IncidentTasksDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the incident task. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    incidentTaskId: string,
    incidentTask: IncidentTask,
    options?: IncidentTasksCreateOrUpdateOptionalParams,
  ) => Promise<IncidentTask>;
  /** Gets an incident task. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    incidentId: string,
    incidentTaskId: string,
    options?: IncidentTasksGetOptionalParams,
  ) => Promise<IncidentTask>;
}

function _getIncidentTasks(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      options?: IncidentTasksListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, incidentId, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      incidentTaskId: string,
      options?: IncidentTasksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, incidentId, incidentTaskId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      incidentTaskId: string,
      incidentTask: IncidentTask,
      options?: IncidentTasksCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        incidentId,
        incidentTaskId,
        incidentTask,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      incidentId: string,
      incidentTaskId: string,
      options?: IncidentTasksGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, incidentId, incidentTaskId, options),
  };
}

export function _getIncidentTasksOperations(
  context: SecurityInsightsContext,
): IncidentTasksOperations {
  return {
    ..._getIncidentTasks(context),
  };
}
