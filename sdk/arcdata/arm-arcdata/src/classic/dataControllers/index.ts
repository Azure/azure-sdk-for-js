// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureArcDataContext } from "../../api/azureArcDataContext.js";
import {
  listInSubscription,
  listInGroup,
  deleteDataController,
  patchDataController,
  putDataController,
  getDataController,
} from "../../api/dataControllers/operations.js";
import type {
  DataControllersListInSubscriptionOptionalParams,
  DataControllersListInGroupOptionalParams,
  DataControllersDeleteDataControllerOptionalParams,
  DataControllersPatchDataControllerOptionalParams,
  DataControllersPutDataControllerOptionalParams,
  DataControllersGetDataControllerOptionalParams,
} from "../../api/dataControllers/options.js";
import type { DataControllerResource, DataControllerUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataControllers operations. */
export interface DataControllersOperations {
  /** List dataController resources in the subscription */
  listInSubscription: (
    options?: DataControllersListInSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<DataControllerResource>;
  /** List dataController resources in the resource group */
  listInGroup: (
    resourceGroupName: string,
    options?: DataControllersListInGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DataControllerResource>;
  /** Deletes a dataController resource */
  deleteDataController: (
    resourceGroupName: string,
    dataControllerName: string,
    options?: DataControllersDeleteDataControllerOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a dataController resource */
  patchDataController: (
    resourceGroupName: string,
    dataControllerName: string,
    dataControllerResource: DataControllerUpdate,
    options?: DataControllersPatchDataControllerOptionalParams,
  ) => PollerLike<OperationState<DataControllerResource>, DataControllerResource>;
  /** Creates or replaces a dataController resource */
  putDataController: (
    resourceGroupName: string,
    dataControllerName: string,
    dataControllerResource: DataControllerResource,
    options?: DataControllersPutDataControllerOptionalParams,
  ) => PollerLike<OperationState<DataControllerResource>, DataControllerResource>;
  /** Retrieves a dataController resource */
  getDataController: (
    resourceGroupName: string,
    dataControllerName: string,
    options?: DataControllersGetDataControllerOptionalParams,
  ) => Promise<DataControllerResource>;
}

function _getDataControllers(context: AzureArcDataContext) {
  return {
    listInSubscription: (options?: DataControllersListInSubscriptionOptionalParams) =>
      listInSubscription(context, options),
    listInGroup: (resourceGroupName: string, options?: DataControllersListInGroupOptionalParams) =>
      listInGroup(context, resourceGroupName, options),
    deleteDataController: (
      resourceGroupName: string,
      dataControllerName: string,
      options?: DataControllersDeleteDataControllerOptionalParams,
    ) => deleteDataController(context, resourceGroupName, dataControllerName, options),
    patchDataController: (
      resourceGroupName: string,
      dataControllerName: string,
      dataControllerResource: DataControllerUpdate,
      options?: DataControllersPatchDataControllerOptionalParams,
    ) =>
      patchDataController(
        context,
        resourceGroupName,
        dataControllerName,
        dataControllerResource,
        options,
      ),
    putDataController: (
      resourceGroupName: string,
      dataControllerName: string,
      dataControllerResource: DataControllerResource,
      options?: DataControllersPutDataControllerOptionalParams,
    ) =>
      putDataController(
        context,
        resourceGroupName,
        dataControllerName,
        dataControllerResource,
        options,
      ),
    getDataController: (
      resourceGroupName: string,
      dataControllerName: string,
      options?: DataControllersGetDataControllerOptionalParams,
    ) => getDataController(context, resourceGroupName, dataControllerName, options),
  };
}

export function _getDataControllersOperations(
  context: AzureArcDataContext,
): DataControllersOperations {
  return {
    ..._getDataControllers(context),
  };
}
