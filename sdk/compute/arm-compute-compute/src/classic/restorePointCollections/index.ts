// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  listAll,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/restorePointCollections/operations.js";
import type {
  RestorePointCollectionsListAllOptionalParams,
  RestorePointCollectionsListOptionalParams,
  RestorePointCollectionsDeleteOptionalParams,
  RestorePointCollectionsUpdateOptionalParams,
  RestorePointCollectionsCreateOrUpdateOptionalParams,
  RestorePointCollectionsGetOptionalParams,
} from "../../api/restorePointCollections/options.js";
import type { RestorePointCollection, RestorePointCollectionUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RestorePointCollections operations. */
export interface RestorePointCollectionsOperations {
  /** Gets the list of restore point collections in the subscription. Use nextLink property in the response to get the next page of restore point collections. Do this till nextLink is not null to fetch all the restore point collections. */
  listAll: (
    options?: RestorePointCollectionsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<RestorePointCollection>;
  /** Gets the list of restore point collections in a resource group. */
  list: (
    resourceGroupName: string,
    options?: RestorePointCollectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorePointCollection>;
  /** The operation to delete the restore point collection. This operation will also delete all the contained restore points. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    options?: RestorePointCollectionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update the restore point collection. */
  update: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    parameters: RestorePointCollectionUpdate,
    options?: RestorePointCollectionsUpdateOptionalParams,
  ) => Promise<RestorePointCollection>;
  /** The operation to create or update the restore point collection. Please refer to https://aka.ms/RestorePoints for more details. When updating a restore point collection, only tags may be modified. */
  createOrUpdate: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    parameters: RestorePointCollection,
    options?: RestorePointCollectionsCreateOrUpdateOptionalParams,
  ) => Promise<RestorePointCollection>;
  /** The operation to get the restore point collection. */
  get: (
    resourceGroupName: string,
    restorePointCollectionName: string,
    options?: RestorePointCollectionsGetOptionalParams,
  ) => Promise<RestorePointCollection>;
}

function _getRestorePointCollections(context: ComputeContext) {
  return {
    listAll: (options?: RestorePointCollectionsListAllOptionalParams) => listAll(context, options),
    list: (resourceGroupName: string, options?: RestorePointCollectionsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      options?: RestorePointCollectionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, restorePointCollectionName, options),
    update: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      parameters: RestorePointCollectionUpdate,
      options?: RestorePointCollectionsUpdateOptionalParams,
    ) => update(context, resourceGroupName, restorePointCollectionName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      parameters: RestorePointCollection,
      options?: RestorePointCollectionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, restorePointCollectionName, parameters, options),
    get: (
      resourceGroupName: string,
      restorePointCollectionName: string,
      options?: RestorePointCollectionsGetOptionalParams,
    ) => get(context, resourceGroupName, restorePointCollectionName, options),
  };
}

export function _getRestorePointCollectionsOperations(
  context: ComputeContext,
): RestorePointCollectionsOperations {
  return {
    ..._getRestorePointCollections(context),
  };
}
