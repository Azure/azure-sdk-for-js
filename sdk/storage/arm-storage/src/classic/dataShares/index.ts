// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  listByStorageAccount,
  $delete,
  update,
  create,
  get,
} from "../../api/dataShares/operations.js";
import {
  DataSharesListByStorageAccountOptionalParams,
  DataSharesDeleteOptionalParams,
  DataSharesUpdateOptionalParams,
  DataSharesCreateOptionalParams,
  DataSharesGetOptionalParams,
} from "../../api/dataShares/options.js";
import { DataShare } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataShares operations. */
export interface DataSharesOperations {
  /** List all Storage DataShares in a Storage Account. */
  listByStorageAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: DataSharesListByStorageAccountOptionalParams,
  ) => PagedAsyncIterableIterator<DataShare>;
  /** Delete a Storage DataShare. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    options?: DataSharesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a Storage DataShare. */
  update: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    properties: DataShare,
    options?: DataSharesUpdateOptionalParams,
  ) => PollerLike<OperationState<DataShare>, DataShare>;
  /** Create a Storage DataShare if it does not already exist; otherwise, error out. This API will not allow you to replace an already existing resource. */
  create: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    resource: DataShare,
    options?: DataSharesCreateOptionalParams,
  ) => PollerLike<OperationState<DataShare>, DataShare>;
  /** Get the specified Storage DataShare. */
  get: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    options?: DataSharesGetOptionalParams,
  ) => Promise<DataShare>;
}

function _getDataShares(context: StorageManagementContext) {
  return {
    listByStorageAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: DataSharesListByStorageAccountOptionalParams,
    ) => listByStorageAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      options?: DataSharesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, dataShareName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      properties: DataShare,
      options?: DataSharesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, dataShareName, properties, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      resource: DataShare,
      options?: DataSharesCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, dataShareName, resource, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      options?: DataSharesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, dataShareName, options),
  };
}

export function _getDataSharesOperations(context: StorageManagementContext): DataSharesOperations {
  return {
    ..._getDataShares(context),
  };
}
