// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  listByStorageAccount,
  $delete,
  update,
  create,
  get,
} from "../../api/dataShares/operations.js";
import type {
  DataSharesListByStorageAccountOptionalParams,
  DataSharesDeleteOptionalParams,
  DataSharesUpdateOptionalParams,
  DataSharesCreateOptionalParams,
  DataSharesGetOptionalParams,
} from "../../api/dataShares/options.js";
import type { DataShare, DataShareUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    options?: DataSharesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    options?: DataSharesDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Storage DataShare. */
  update: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    properties: DataShareUpdate,
    options?: DataSharesUpdateOptionalParams,
  ) => PollerLike<OperationState<DataShare>, DataShare>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    properties: DataShareUpdate,
    options?: DataSharesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DataShare>, DataShare>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    properties: DataShareUpdate,
    options?: DataSharesUpdateOptionalParams,
  ) => Promise<DataShare>;
  /** Create a Storage DataShare if it does not already exist; otherwise, error out. This API will not allow you to replace an already existing resource. */
  create: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    resource: DataShare,
    options?: DataSharesCreateOptionalParams,
  ) => PollerLike<OperationState<DataShare>, DataShare>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    resource: DataShare,
    options?: DataSharesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DataShare>, DataShare>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    accountName: string,
    dataShareName: string,
    resource: DataShare,
    options?: DataSharesCreateOptionalParams,
  ) => Promise<DataShare>;
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
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      options?: DataSharesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, dataShareName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      options?: DataSharesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, dataShareName, options);
    },
    update: (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      properties: DataShareUpdate,
      options?: DataSharesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, dataShareName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      properties: DataShareUpdate,
      options?: DataSharesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        accountName,
        dataShareName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      properties: DataShareUpdate,
      options?: DataSharesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        accountName,
        dataShareName,
        properties,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      resource: DataShare,
      options?: DataSharesCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, dataShareName, resource, options),
    beginCreate: async (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      resource: DataShare,
      options?: DataSharesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        accountName,
        dataShareName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      dataShareName: string,
      resource: DataShare,
      options?: DataSharesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        accountName,
        dataShareName,
        resource,
        options,
      );
    },
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
