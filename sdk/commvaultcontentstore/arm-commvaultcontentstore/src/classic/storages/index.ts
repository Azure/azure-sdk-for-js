// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext } from "../../api/contentStoreContext.js";
import { listByCloudAccount, $delete, createOrUpdate, get } from "../../api/storages/operations.js";
import type {
  StoragesListByCloudAccountOptionalParams,
  StoragesDeleteOptionalParams,
  StoragesCreateOrUpdateOptionalParams,
  StoragesGetOptionalParams,
} from "../../api/storages/options.js";
import type { Storage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Storages operations. */
export interface StoragesOperations {
  /** List Storage resources by CloudAccount */
  listByCloudAccount: (
    resourceGroupName: string,
    cloudAccountName: string,
    options?: StoragesListByCloudAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Storage>;
  /** Delete a Storage */
  delete: (
    resourceGroupName: string,
    cloudAccountName: string,
    storageName: string,
    options?: StoragesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Storage */
  createOrUpdate: (
    resourceGroupName: string,
    cloudAccountName: string,
    storageName: string,
    resource: Storage,
    options?: StoragesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Storage>, Storage>;
  /** Get a Storage */
  get: (
    resourceGroupName: string,
    cloudAccountName: string,
    storageName: string,
    options?: StoragesGetOptionalParams,
  ) => Promise<Storage>;
}

function _getStorages(context: ContentStoreContext) {
  return {
    listByCloudAccount: (
      resourceGroupName: string,
      cloudAccountName: string,
      options?: StoragesListByCloudAccountOptionalParams,
    ) => listByCloudAccount(context, resourceGroupName, cloudAccountName, options),
    delete: (
      resourceGroupName: string,
      cloudAccountName: string,
      storageName: string,
      options?: StoragesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudAccountName, storageName, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudAccountName: string,
      storageName: string,
      resource: Storage,
      options?: StoragesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, cloudAccountName, storageName, resource, options),
    get: (
      resourceGroupName: string,
      cloudAccountName: string,
      storageName: string,
      options?: StoragesGetOptionalParams,
    ) => get(context, resourceGroupName, cloudAccountName, storageName, options),
  };
}

export function _getStoragesOperations(context: ContentStoreContext): StoragesOperations {
  return {
    ..._getStorages(context),
  };
}
