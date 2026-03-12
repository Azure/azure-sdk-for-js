// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageActionsManagementContext } from "../../api/storageActionsManagementContext.js";
import {
  StorageTask,
  StorageTaskUpdateParameters,
  StorageTaskPreviewAction,
} from "../../models/models.js";
import {
  StorageTasksPreviewActionsOptionalParams,
  StorageTasksListBySubscriptionOptionalParams,
  StorageTasksListByResourceGroupOptionalParams,
  StorageTasksDeleteOptionalParams,
  StorageTasksUpdateOptionalParams,
  StorageTasksCreateOptionalParams,
  StorageTasksGetOptionalParams,
} from "../../api/storageTasks/options.js";
import {
  previewActions,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/storageTasks/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageTasks operations. */
export interface StorageTasksOperations {
  /** Runs the input conditions against input object metadata properties and designates matched objects in response. */
  previewActions: (
    location: string,
    parameters: StorageTaskPreviewAction,
    options?: StorageTasksPreviewActionsOptionalParams,
  ) => Promise<StorageTaskPreviewAction>;
  /** Lists all the storage tasks available under the subscription. */
  listBySubscription: (
    options?: StorageTasksListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StorageTask>;
  /** Lists all the storage tasks available under the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StorageTasksListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StorageTask>;
  /** Delete the storage task resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storageTaskName: string,
    options?: StorageTasksDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update storage task properties */
  update: (
    resourceGroupName: string,
    storageTaskName: string,
    parameters: StorageTaskUpdateParameters,
    options?: StorageTasksUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageTask>, StorageTask>;
  /** Asynchronously creates a new storage task resource with the specified parameters. If a storage task is already created and a subsequent create request is issued with different properties, the storage task properties will be updated. If a storage task is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed. */
  create: (
    resourceGroupName: string,
    storageTaskName: string,
    parameters: StorageTask,
    options?: StorageTasksCreateOptionalParams,
  ) => PollerLike<OperationState<StorageTask>, StorageTask>;
  /** Get the storage task properties */
  get: (
    resourceGroupName: string,
    storageTaskName: string,
    options?: StorageTasksGetOptionalParams,
  ) => Promise<StorageTask>;
}

function _getStorageTasks(context: StorageActionsManagementContext) {
  return {
    previewActions: (
      location: string,
      parameters: StorageTaskPreviewAction,
      options?: StorageTasksPreviewActionsOptionalParams,
    ) => previewActions(context, location, parameters, options),
    listBySubscription: (options?: StorageTasksListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StorageTasksListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      storageTaskName: string,
      options?: StorageTasksDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageTaskName, options),
    update: (
      resourceGroupName: string,
      storageTaskName: string,
      parameters: StorageTaskUpdateParameters,
      options?: StorageTasksUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageTaskName, parameters, options),
    create: (
      resourceGroupName: string,
      storageTaskName: string,
      parameters: StorageTask,
      options?: StorageTasksCreateOptionalParams,
    ) => create(context, resourceGroupName, storageTaskName, parameters, options),
    get: (
      resourceGroupName: string,
      storageTaskName: string,
      options?: StorageTasksGetOptionalParams,
    ) => get(context, resourceGroupName, storageTaskName, options),
  };
}

export function _getStorageTasksOperations(
  context: StorageActionsManagementContext,
): StorageTasksOperations {
  return {
    ..._getStorageTasks(context),
  };
}
