// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByInstance,
  $delete,
  createOrUpdate,
  get,
} from "../../api/startStopManagedInstanceSchedules/operations.js";
import {
  StartStopManagedInstanceSchedulesListByInstanceOptionalParams,
  StartStopManagedInstanceSchedulesDeleteOptionalParams,
  StartStopManagedInstanceSchedulesCreateOrUpdateOptionalParams,
  StartStopManagedInstanceSchedulesGetOptionalParams,
} from "../../api/startStopManagedInstanceSchedules/options.js";
import { StartStopManagedInstanceSchedule, StartStopScheduleName } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StartStopManagedInstanceSchedules operations. */
export interface StartStopManagedInstanceSchedulesOperations {
  /** Lists the managed instance's Start/Stop schedules. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: StartStopManagedInstanceSchedulesListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<StartStopManagedInstanceSchedule>;
  /** Deletes the managed instance's Start/Stop schedule. */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    startStopScheduleName: StartStopScheduleName,
    options?: StartStopManagedInstanceSchedulesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the managed instance's Start/Stop schedule. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    startStopScheduleName: StartStopScheduleName,
    parameters: StartStopManagedInstanceSchedule,
    options?: StartStopManagedInstanceSchedulesCreateOrUpdateOptionalParams,
  ) => Promise<StartStopManagedInstanceSchedule>;
  /** Gets the managed instance's Start/Stop schedule. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    startStopScheduleName: StartStopScheduleName,
    options?: StartStopManagedInstanceSchedulesGetOptionalParams,
  ) => Promise<StartStopManagedInstanceSchedule>;
}

function _getStartStopManagedInstanceSchedules(context: SqlManagementContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: StartStopManagedInstanceSchedulesListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      startStopScheduleName: StartStopScheduleName,
      options?: StartStopManagedInstanceSchedulesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, managedInstanceName, startStopScheduleName, options),
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      startStopScheduleName: StartStopScheduleName,
      parameters: StartStopManagedInstanceSchedule,
      options?: StartStopManagedInstanceSchedulesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        startStopScheduleName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      startStopScheduleName: StartStopScheduleName,
      options?: StartStopManagedInstanceSchedulesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, startStopScheduleName, options),
  };
}

export function _getStartStopManagedInstanceSchedulesOperations(
  context: SqlManagementContext,
): StartStopManagedInstanceSchedulesOperations {
  return {
    ..._getStartStopManagedInstanceSchedules(context),
  };
}
