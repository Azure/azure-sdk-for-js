// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  list,
  lease,
  restore,
  $delete,
  update,
  create,
  get,
} from "../../api/fileShares/operations.js";
import {
  FileSharesListOptionalParams,
  FileSharesLeaseOptionalParams,
  FileSharesRestoreOptionalParams,
  FileSharesDeleteOptionalParams,
  FileSharesUpdateOptionalParams,
  FileSharesCreateOptionalParams,
  FileSharesGetOptionalParams,
} from "../../api/fileShares/options.js";
import { FileShare, DeletedShare, LeaseShareResponse, FileShareItem } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FileShares operations. */
export interface FileSharesOperations {
  /** Lists all shares. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: FileSharesListOptionalParams,
  ) => PagedAsyncIterableIterator<FileShareItem>;
  /** The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite. */
  lease: (
    resourceGroupName: string,
    accountName: string,
    shareName: string,
    options?: FileSharesLeaseOptionalParams,
  ) => Promise<LeaseShareResponse>;
  /** Restore a file share within a valid retention days if share soft delete is enabled */
  restore: (
    resourceGroupName: string,
    accountName: string,
    shareName: string,
    deletedShare: DeletedShare,
    options?: FileSharesRestoreOptionalParams,
  ) => Promise<void>;
  /** Deletes specified share under its account. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    shareName: string,
    options?: FileSharesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist. */
  update: (
    resourceGroupName: string,
    accountName: string,
    shareName: string,
    fileShare: FileShare,
    options?: FileSharesUpdateOptionalParams,
  ) => Promise<FileShare>;
  /** Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share. */
  create: (
    resourceGroupName: string,
    accountName: string,
    shareName: string,
    fileShare: FileShare,
    options?: FileSharesCreateOptionalParams,
  ) => Promise<FileShare>;
  /** Gets properties of a specified share. */
  get: (
    resourceGroupName: string,
    accountName: string,
    shareName: string,
    options?: FileSharesGetOptionalParams,
  ) => Promise<FileShare>;
}

function _getFileShares(context: StorageManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: FileSharesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    lease: (
      resourceGroupName: string,
      accountName: string,
      shareName: string,
      options?: FileSharesLeaseOptionalParams,
    ) => lease(context, resourceGroupName, accountName, shareName, options),
    restore: (
      resourceGroupName: string,
      accountName: string,
      shareName: string,
      deletedShare: DeletedShare,
      options?: FileSharesRestoreOptionalParams,
    ) => restore(context, resourceGroupName, accountName, shareName, deletedShare, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      shareName: string,
      options?: FileSharesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, shareName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      shareName: string,
      fileShare: FileShare,
      options?: FileSharesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, shareName, fileShare, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      shareName: string,
      fileShare: FileShare,
      options?: FileSharesCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, shareName, fileShare, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      shareName: string,
      options?: FileSharesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, shareName, options),
  };
}

export function _getFileSharesOperations(context: StorageManagementContext): FileSharesOperations {
  return {
    ..._getFileShares(context),
  };
}
