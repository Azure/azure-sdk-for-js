// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/incidentTasks/operations.js";
import type {
  IncidentTasksListOptionalParams,
  IncidentTasksDeleteOptionalParams,
  IncidentTasksCreateOrUpdateOptionalParams,
  IncidentTasksGetOptionalParams,
} from "../../api/incidentTasks/options.js";
import type { IncidentTask } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
