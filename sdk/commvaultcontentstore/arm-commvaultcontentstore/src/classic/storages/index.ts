// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext } from "../../api/contentStoreContext.js";
import {
  refresh,
  disableComplianceLock,
  enableComplianceLock,
  listByCloudAccount,
  $delete,
  createOrUpdate,
  get,
} from "../../api/storages/operations.js";
import type {
  StoragesRefreshOptionalParams,
  StoragesDisableComplianceLockOptionalParams,
  StoragesEnableComplianceLockOptionalParams,
  StoragesListByCloudAccountOptionalParams,
  StoragesDeleteOptionalParams,
  StoragesCreateOrUpdateOptionalParams,
  StoragesGetOptionalParams,
} from "../../api/storages/options.js";
import type { Storage, StorageCreateOrUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Storages operations. */
export interface StoragesOperations {
  /** Refresh storage state from partner. Fetches latest compliance lock status from Commvault and updates the ARM resource. */
  refresh: (
    resourceGroupName: string,
    cloudAccountName: string,
    storageName: string,
    options?: StoragesRefreshOptionalParams,
  ) => Promise<Storage>;
  /** Disable compliance lock on the storage. Initiates an out-of-band multi-person authorization (MPA) email approval workflow on the partner side. The storage compliance lock status transitions to 'DisablementPending' immediately; once the MPA approval completes, the status becomes 'Disabled' (observable via the refresh action). */
  disableComplianceLock: (
    resourceGroupName: string,
    cloudAccountName: string,
    storageName: string,
    options?: StoragesDisableComplianceLockOptionalParams,
  ) => Promise<Storage>;
  /** Enable compliance lock on the storage. Synchronous operation. */
  enableComplianceLock: (
    resourceGroupName: string,
    cloudAccountName: string,
    storageName: string,
    options?: StoragesEnableComplianceLockOptionalParams,
  ) => Promise<Storage>;
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
    resource: StorageCreateOrUpdate,
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
    refresh: (
      resourceGroupName: string,
      cloudAccountName: string,
      storageName: string,
      options?: StoragesRefreshOptionalParams,
    ) => refresh(context, resourceGroupName, cloudAccountName, storageName, options),
    disableComplianceLock: (
      resourceGroupName: string,
      cloudAccountName: string,
      storageName: string,
      options?: StoragesDisableComplianceLockOptionalParams,
    ) => disableComplianceLock(context, resourceGroupName, cloudAccountName, storageName, options),
    enableComplianceLock: (
      resourceGroupName: string,
      cloudAccountName: string,
      storageName: string,
      options?: StoragesEnableComplianceLockOptionalParams,
    ) => enableComplianceLock(context, resourceGroupName, cloudAccountName, storageName, options),
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
      resource: StorageCreateOrUpdate,
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
