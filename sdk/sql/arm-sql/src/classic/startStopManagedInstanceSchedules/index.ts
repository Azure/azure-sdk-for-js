// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByInstance,
  $delete,
  createOrUpdate,
  get,
} from "../../api/startStopManagedInstanceSchedules/operations.js";
import type {
  StartStopManagedInstanceSchedulesListByInstanceOptionalParams,
  StartStopManagedInstanceSchedulesDeleteOptionalParams,
  StartStopManagedInstanceSchedulesCreateOrUpdateOptionalParams,
  StartStopManagedInstanceSchedulesGetOptionalParams,
} from "../../api/startStopManagedInstanceSchedules/options.js";
import type {
  StartStopManagedInstanceSchedule,
  StartStopScheduleName,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a StartStopManagedInstanceSchedules operations. */
export interface StartStopManagedInstanceSchedulesOperations {
  /** Lists the managed instance's Start/Stop schedules. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: StartStopManagedInstanceSchedulesListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<StartStopManagedInstanceSchedule>;
  /** Deletes the managed instance's Start/Stop schedule. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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

function _getStartStopManagedInstanceSchedules(context: SqlContext) {
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
  context: SqlContext,
): StartStopManagedInstanceSchedulesOperations {
  return {
    ..._getStartStopManagedInstanceSchedules(context),
  };
}
