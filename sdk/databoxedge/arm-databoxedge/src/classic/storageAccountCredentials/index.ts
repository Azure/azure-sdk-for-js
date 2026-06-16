// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import {
  listByDataBoxEdgeDevice,
  $delete,
  createOrUpdate,
  get,
} from "../../api/storageAccountCredentials/operations.js";
import type {
  StorageAccountCredentialsListByDataBoxEdgeDeviceOptionalParams,
  StorageAccountCredentialsDeleteOptionalParams,
  StorageAccountCredentialsCreateOrUpdateOptionalParams,
  StorageAccountCredentialsGetOptionalParams,
} from "../../api/storageAccountCredentials/options.js";
import type { StorageAccountCredential } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageAccountCredentials operations. */
export interface StorageAccountCredentialsOperations {
  /** Gets all the storage account credentials in a Data Box Edge/Data Box Gateway device. */
  listByDataBoxEdgeDevice: (
    deviceName: string,
    resourceGroupName: string,
    options?: StorageAccountCredentialsListByDataBoxEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<StorageAccountCredential>;
  /** Deletes the storage account credential. */
  delete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: StorageAccountCredentialsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: StorageAccountCredentialsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: StorageAccountCredentialsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the storage account credential. */
  createOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    storageAccountCredential: StorageAccountCredential,
    options?: StorageAccountCredentialsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageAccountCredential>, StorageAccountCredential>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    storageAccountCredential: StorageAccountCredential,
    options?: StorageAccountCredentialsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<StorageAccountCredential>, StorageAccountCredential>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    storageAccountCredential: StorageAccountCredential,
    options?: StorageAccountCredentialsCreateOrUpdateOptionalParams,
  ) => Promise<StorageAccountCredential>;
  /** Gets the properties of the specified storage account credential. */
  get: (
    deviceName: string,
    name: string,
    resourceGroupName: string,
    options?: StorageAccountCredentialsGetOptionalParams,
  ) => Promise<StorageAccountCredential>;
}

function _getStorageAccountCredentials(context: DataBoxEdgeManagementContext) {
  return {
    listByDataBoxEdgeDevice: (
      deviceName: string,
      resourceGroupName: string,
      options?: StorageAccountCredentialsListByDataBoxEdgeDeviceOptionalParams,
    ) => listByDataBoxEdgeDevice(context, deviceName, resourceGroupName, options),
    delete: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: StorageAccountCredentialsDeleteOptionalParams,
    ) => $delete(context, deviceName, name, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: StorageAccountCredentialsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, deviceName, name, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: StorageAccountCredentialsDeleteOptionalParams,
    ) => {
      return await $delete(context, deviceName, name, resourceGroupName, options);
    },
    createOrUpdate: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      storageAccountCredential: StorageAccountCredential,
      options?: StorageAccountCredentialsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        deviceName,
        name,
        resourceGroupName,
        storageAccountCredential,
        options,
      ),
    beginCreateOrUpdate: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      storageAccountCredential: StorageAccountCredential,
      options?: StorageAccountCredentialsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        deviceName,
        name,
        resourceGroupName,
        storageAccountCredential,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      storageAccountCredential: StorageAccountCredential,
      options?: StorageAccountCredentialsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        deviceName,
        name,
        resourceGroupName,
        storageAccountCredential,
        options,
      );
    },
    get: (
      deviceName: string,
      name: string,
      resourceGroupName: string,
      options?: StorageAccountCredentialsGetOptionalParams,
    ) => get(context, deviceName, name, resourceGroupName, options),
  };
}

export function _getStorageAccountCredentialsOperations(
  context: DataBoxEdgeManagementContext,
): StorageAccountCredentialsOperations {
  return {
    ..._getStorageAccountCredentials(context),
  };
}
