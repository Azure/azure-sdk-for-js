// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  stopAssignment,
  list,
  $delete,
  update,
  create,
  get,
} from "../../api/storageTaskAssignments/operations.js";
import {
  StorageTaskAssignmentsStopAssignmentOptionalParams,
  StorageTaskAssignmentsListOptionalParams,
  StorageTaskAssignmentsDeleteOptionalParams,
  StorageTaskAssignmentsUpdateOptionalParams,
  StorageTaskAssignmentsCreateOptionalParams,
  StorageTaskAssignmentsGetOptionalParams,
} from "../../api/storageTaskAssignments/options.js";
import {
  StorageTaskAssignment,
  StorageTaskAssignmentUpdateParameters,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageTaskAssignments operations. */
export interface StorageTaskAssignmentsOperations {
  /** Stops any active running storage action for the storage task assignment */
  stopAssignment: (
    resourceGroupName: string,
    accountName: string,
    storageTaskAssignmentName: string,
    options?: StorageTaskAssignmentsStopAssignmentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List all the storage task assignments in an account */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageTaskAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<StorageTaskAssignment>;
  /** Delete the storage task assignment sub-resource */
  delete: (
    resourceGroupName: string,
    accountName: string,
    storageTaskAssignmentName: string,
    options?: StorageTaskAssignmentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update storage task assignment properties */
  update: (
    resourceGroupName: string,
    accountName: string,
    storageTaskAssignmentName: string,
    parameters: StorageTaskAssignmentUpdateParameters,
    options?: StorageTaskAssignmentsUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageTaskAssignment>, StorageTaskAssignment>;
  /** Asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed. */
  create: (
    resourceGroupName: string,
    accountName: string,
    storageTaskAssignmentName: string,
    parameters: StorageTaskAssignment,
    options?: StorageTaskAssignmentsCreateOptionalParams,
  ) => PollerLike<OperationState<StorageTaskAssignment>, StorageTaskAssignment>;
  /** Get the storage task assignment properties */
  get: (
    resourceGroupName: string,
    accountName: string,
    storageTaskAssignmentName: string,
    options?: StorageTaskAssignmentsGetOptionalParams,
  ) => Promise<StorageTaskAssignment>;
}

function _getStorageTaskAssignments(context: StorageManagementContext) {
  return {
    stopAssignment: (
      resourceGroupName: string,
      accountName: string,
      storageTaskAssignmentName: string,
      options?: StorageTaskAssignmentsStopAssignmentOptionalParams,
    ) =>
      stopAssignment(context, resourceGroupName, accountName, storageTaskAssignmentName, options),
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: StorageTaskAssignmentsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      storageTaskAssignmentName: string,
      options?: StorageTaskAssignmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, storageTaskAssignmentName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      storageTaskAssignmentName: string,
      parameters: StorageTaskAssignmentUpdateParameters,
      options?: StorageTaskAssignmentsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        storageTaskAssignmentName,
        parameters,
        options,
      ),
    create: (
      resourceGroupName: string,
      accountName: string,
      storageTaskAssignmentName: string,
      parameters: StorageTaskAssignment,
      options?: StorageTaskAssignmentsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        accountName,
        storageTaskAssignmentName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      storageTaskAssignmentName: string,
      options?: StorageTaskAssignmentsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, storageTaskAssignmentName, options),
  };
}

export function _getStorageTaskAssignmentsOperations(
  context: StorageManagementContext,
): StorageTaskAssignmentsOperations {
  return {
    ..._getStorageTaskAssignments(context),
  };
}
