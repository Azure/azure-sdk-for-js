// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext } from "../../api/containerServiceFleetContext.js";
import { UpdateRun, SkipProperties } from "../../models/models.js";
import {
  UpdateRunsSkipOptionalParams,
  UpdateRunsStopOptionalParams,
  UpdateRunsStartOptionalParams,
  UpdateRunsListByFleetOptionalParams,
  UpdateRunsDeleteOptionalParams,
  UpdateRunsCreateOrUpdateOptionalParams,
  UpdateRunsGetOptionalParams,
} from "../../api/updateRuns/options.js";
import {
  skip,
  stop,
  start,
  listByFleet,
  $delete,
  createOrUpdate,
  get,
} from "../../api/updateRuns/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a UpdateRuns operations. */
export interface UpdateRunsOperations {
  /** Skips one or a combination of member/group/stage/afterStageWait(s) of an update run. */
  skip: (
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    body: SkipProperties,
    options?: UpdateRunsSkipOptionalParams,
  ) => PollerLike<OperationState<UpdateRun>, UpdateRun>;
  /** Stops an UpdateRun. */
  stop: (
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    options?: UpdateRunsStopOptionalParams,
  ) => PollerLike<OperationState<UpdateRun>, UpdateRun>;
  /** Starts an UpdateRun. */
  start: (
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    options?: UpdateRunsStartOptionalParams,
  ) => PollerLike<OperationState<UpdateRun>, UpdateRun>;
  /** List UpdateRun resources by Fleet */
  listByFleet: (
    resourceGroupName: string,
    fleetName: string,
    options?: UpdateRunsListByFleetOptionalParams,
  ) => PagedAsyncIterableIterator<UpdateRun>;
  /** Delete a UpdateRun */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    options?: UpdateRunsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a UpdateRun */
  createOrUpdate: (
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    resource: UpdateRun,
    options?: UpdateRunsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<UpdateRun>, UpdateRun>;
  /** Get a UpdateRun */
  get: (
    resourceGroupName: string,
    fleetName: string,
    updateRunName: string,
    options?: UpdateRunsGetOptionalParams,
  ) => Promise<UpdateRun>;
}

function _getUpdateRuns(context: ContainerServiceFleetContext) {
  return {
    skip: (
      resourceGroupName: string,
      fleetName: string,
      updateRunName: string,
      body: SkipProperties,
      options?: UpdateRunsSkipOptionalParams,
    ) =>
      skip(context, resourceGroupName, fleetName, updateRunName, body, options),
    stop: (
      resourceGroupName: string,
      fleetName: string,
      updateRunName: string,
      options?: UpdateRunsStopOptionalParams,
    ) => stop(context, resourceGroupName, fleetName, updateRunName, options),
    start: (
      resourceGroupName: string,
      fleetName: string,
      updateRunName: string,
      options?: UpdateRunsStartOptionalParams,
    ) => start(context, resourceGroupName, fleetName, updateRunName, options),
    listByFleet: (
      resourceGroupName: string,
      fleetName: string,
      options?: UpdateRunsListByFleetOptionalParams,
    ) => listByFleet(context, resourceGroupName, fleetName, options),
    delete: (
      resourceGroupName: string,
      fleetName: string,
      updateRunName: string,
      options?: UpdateRunsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, fleetName, updateRunName, options),
    createOrUpdate: (
      resourceGroupName: string,
      fleetName: string,
      updateRunName: string,
      resource: UpdateRun,
      options?: UpdateRunsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        fleetName,
        updateRunName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      fleetName: string,
      updateRunName: string,
      options?: UpdateRunsGetOptionalParams,
    ) => get(context, resourceGroupName, fleetName, updateRunName, options),
  };
}

export function _getUpdateRunsOperations(
  context: ContainerServiceFleetContext,
): UpdateRunsOperations {
  return {
    ..._getUpdateRuns(context),
  };
}
