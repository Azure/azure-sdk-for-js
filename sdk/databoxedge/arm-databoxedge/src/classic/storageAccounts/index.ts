// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import {
  listByDataBoxEdgeDevice,
  $delete,
  createOrUpdate,
  get,
} from "../../api/storageAccounts/operations.js";
import {
  StorageAccountsListByDataBoxEdgeDeviceOptionalParams,
  StorageAccountsDeleteOptionalParams,
  StorageAccountsCreateOrUpdateOptionalParams,
  StorageAccountsGetOptionalParams,
} from "../../api/storageAccounts/options.js";
import { StorageAccount } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageAccounts operations. */
export interface StorageAccountsOperations {
  /** Lists all the StorageAccounts in a Data Box Edge/Data Box Gateway device. */
  listByDataBoxEdgeDevice: (
    deviceName: string,
    resourceGroupName: string,
    options?: StorageAccountsListByDataBoxEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<StorageAccount>;
  /** Deletes the StorageAccount on the Data Box Edge/Data Box Gateway device. */
  delete: (
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: StorageAccountsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: StorageAccountsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: StorageAccountsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a new StorageAccount or updates an existing StorageAccount on the device. */
  createOrUpdate: (
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    storageAccount: StorageAccount,
    options?: StorageAccountsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageAccount>, StorageAccount>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    storageAccount: StorageAccount,
    options?: StorageAccountsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<StorageAccount>, StorageAccount>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    storageAccount: StorageAccount,
    options?: StorageAccountsCreateOrUpdateOptionalParams,
  ) => Promise<StorageAccount>;
  /** Gets a StorageAccount by name. */
  get: (
    deviceName: string,
    storageAccountName: string,
    resourceGroupName: string,
    options?: StorageAccountsGetOptionalParams,
  ) => Promise<StorageAccount>;
}

function _getStorageAccounts(context: DataBoxEdgeManagementContext) {
  return {
    listByDataBoxEdgeDevice: (
      deviceName: string,
      resourceGroupName: string,
      options?: StorageAccountsListByDataBoxEdgeDeviceOptionalParams,
    ) => listByDataBoxEdgeDevice(context, deviceName, resourceGroupName, options),
    delete: (
      deviceName: string,
      storageAccountName: string,
      resourceGroupName: string,
      options?: StorageAccountsDeleteOptionalParams,
    ) => $delete(context, deviceName, storageAccountName, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      storageAccountName: string,
      resourceGroupName: string,
      options?: StorageAccountsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, deviceName, storageAccountName, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      storageAccountName: string,
      resourceGroupName: string,
      options?: StorageAccountsDeleteOptionalParams,
    ) => {
      return await $delete(context, deviceName, storageAccountName, resourceGroupName, options);
    },
    createOrUpdate: (
      deviceName: string,
      storageAccountName: string,
      resourceGroupName: string,
      storageAccount: StorageAccount,
      options?: StorageAccountsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        deviceName,
        storageAccountName,
        resourceGroupName,
        storageAccount,
        options,
      ),
    beginCreateOrUpdate: async (
      deviceName: string,
      storageAccountName: string,
      resourceGroupName: string,
      storageAccount: StorageAccount,
      options?: StorageAccountsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        deviceName,
        storageAccountName,
        resourceGroupName,
        storageAccount,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deviceName: string,
      storageAccountName: string,
      resourceGroupName: string,
      storageAccount: StorageAccount,
      options?: StorageAccountsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        deviceName,
        storageAccountName,
        resourceGroupName,
        storageAccount,
        options,
      );
    },
    get: (
      deviceName: string,
      storageAccountName: string,
      resourceGroupName: string,
      options?: StorageAccountsGetOptionalParams,
    ) => get(context, deviceName, storageAccountName, resourceGroupName, options),
  };
}

export function _getStorageAccountsOperations(
  context: DataBoxEdgeManagementContext,
): StorageAccountsOperations {
  return {
    ..._getStorageAccounts(context),
  };
}
