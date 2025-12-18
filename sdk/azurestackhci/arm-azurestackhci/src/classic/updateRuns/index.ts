// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { list, $delete, put, get } from "../../api/updateRuns/operations.js";
import {
  UpdateRunsListOptionalParams,
  UpdateRunsDeleteOptionalParams,
  UpdateRunsPutOptionalParams,
  UpdateRunsGetOptionalParams,
} from "../../api/updateRuns/options.js";
import { UpdateRun } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a UpdateRuns operations. */
export interface UpdateRunsOperations {
  /** List all Update runs for a specified update */
  list: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    options?: UpdateRunsListOptionalParams,
  ) => PagedAsyncIterableIterator<UpdateRun>;
  /** Delete specified Update Run */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    updateRunName: string,
    options?: UpdateRunsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Put Update runs for a specified update */
  put: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    updateRunName: string,
    updateRunsProperties: UpdateRun,
    options?: UpdateRunsPutOptionalParams,
  ) => Promise<UpdateRun>;
  /** Get the Update run for a specified update */
  get: (
    resourceGroupName: string,
    clusterName: string,
    updateName: string,
    updateRunName: string,
    options?: UpdateRunsGetOptionalParams,
  ) => Promise<UpdateRun>;
}

function _getUpdateRuns(context: AzureStackHCIContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      options?: UpdateRunsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, updateName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      updateRunName: string,
      options?: UpdateRunsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, updateName, updateRunName, options),
    put: (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      updateRunName: string,
      updateRunsProperties: UpdateRun,
      options?: UpdateRunsPutOptionalParams,
    ) =>
      put(
        context,
        resourceGroupName,
        clusterName,
        updateName,
        updateRunName,
        updateRunsProperties,
        options,
      ),
    get: (
      resourceGroupName: string,
      clusterName: string,
      updateName: string,
      updateRunName: string,
      options?: UpdateRunsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, updateName, updateRunName, options),
  };
}

export function _getUpdateRunsOperations(context: AzureStackHCIContext): UpdateRunsOperations {
  return {
    ..._getUpdateRuns(context),
  };
}
