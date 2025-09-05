// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageMoverContext } from "../../api/storageMoverContext.js";
import {
  listBySubscription,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/storageMovers/operations.js";
import {
  StorageMoversListBySubscriptionOptionalParams,
  StorageMoversListOptionalParams,
  StorageMoversDeleteOptionalParams,
  StorageMoversUpdateOptionalParams,
  StorageMoversCreateOrUpdateOptionalParams,
  StorageMoversGetOptionalParams,
} from "../../api/storageMovers/options.js";
import { StorageMover, StorageMoverUpdateParameters } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageMovers operations. */
export interface StorageMoversOperations {
  /** Lists all Storage Movers in a subscription. */
  listBySubscription: (
    options?: StorageMoversListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StorageMover>;
  /** Lists all Storage Movers in a resource group. */
  list: (
    resourceGroupName: string,
    options?: StorageMoversListOptionalParams,
  ) => PagedAsyncIterableIterator<StorageMover>;
  /** Deletes a Storage Mover resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storageMoverName: string,
    options?: StorageMoversDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates properties for a Storage Mover resource. Properties not specified in the request body will be unchanged. */
  update: (
    resourceGroupName: string,
    storageMoverName: string,
    storageMover: StorageMoverUpdateParameters,
    options?: StorageMoversUpdateOptionalParams,
  ) => Promise<StorageMover>;
  /** Creates or updates a top-level Storage Mover resource. */
  createOrUpdate: (
    resourceGroupName: string,
    storageMoverName: string,
    storageMover: StorageMover,
    options?: StorageMoversCreateOrUpdateOptionalParams,
  ) => Promise<StorageMover>;
  /** Gets a Storage Mover resource. */
  get: (
    resourceGroupName: string,
    storageMoverName: string,
    options?: StorageMoversGetOptionalParams,
  ) => Promise<StorageMover>;
}

function _getStorageMovers(context: StorageMoverContext) {
  return {
    listBySubscription: (options?: StorageMoversListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: StorageMoversListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      storageMoverName: string,
      options?: StorageMoversDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageMoverName, options),
    update: (
      resourceGroupName: string,
      storageMoverName: string,
      storageMover: StorageMoverUpdateParameters,
      options?: StorageMoversUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageMoverName, storageMover, options),
    createOrUpdate: (
      resourceGroupName: string,
      storageMoverName: string,
      storageMover: StorageMover,
      options?: StorageMoversCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, storageMoverName, storageMover, options),
    get: (
      resourceGroupName: string,
      storageMoverName: string,
      options?: StorageMoversGetOptionalParams,
    ) => get(context, resourceGroupName, storageMoverName, options),
  };
}

export function _getStorageMoversOperations(context: StorageMoverContext): StorageMoversOperations {
  return {
    ..._getStorageMovers(context),
  };
}
