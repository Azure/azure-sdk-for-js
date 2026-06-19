// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { QumuloStorageContext } from "../../api/qumuloStorageContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/fileSystems/operations.js";
import type {
  FileSystemsListBySubscriptionOptionalParams,
  FileSystemsListByResourceGroupOptionalParams,
  FileSystemsDeleteOptionalParams,
  FileSystemsUpdateOptionalParams,
  FileSystemsCreateOrUpdateOptionalParams,
  FileSystemsGetOptionalParams,
} from "../../api/fileSystems/options.js";
import type { FileSystemResource, FileSystemResourceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FileSystems operations. */
export interface FileSystemsOperations {
  /** List FileSystemResource resources by subscription ID */
  listBySubscription: (
    options?: FileSystemsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<FileSystemResource>;
  /** List FileSystemResource resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FileSystemsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<FileSystemResource>;
  /** Delete a FileSystemResource */
  delete: (
    resourceGroupName: string,
    fileSystemName: string,
    options?: FileSystemsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a FileSystemResource */
  update: (
    resourceGroupName: string,
    fileSystemName: string,
    properties: FileSystemResourceUpdate,
    options?: FileSystemsUpdateOptionalParams,
  ) => Promise<FileSystemResource>;
  /** Create a FileSystemResource */
  createOrUpdate: (
    resourceGroupName: string,
    fileSystemName: string,
    resource: FileSystemResource,
    options?: FileSystemsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FileSystemResource>, FileSystemResource>;
  /** Get a FileSystemResource */
  get: (
    resourceGroupName: string,
    fileSystemName: string,
    options?: FileSystemsGetOptionalParams,
  ) => Promise<FileSystemResource>;
}

function _getFileSystems(context: QumuloStorageContext) {
  return {
    listBySubscription: (options?: FileSystemsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FileSystemsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      fileSystemName: string,
      options?: FileSystemsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, fileSystemName, options),
    update: (
      resourceGroupName: string,
      fileSystemName: string,
      properties: FileSystemResourceUpdate,
      options?: FileSystemsUpdateOptionalParams,
    ) => update(context, resourceGroupName, fileSystemName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      fileSystemName: string,
      resource: FileSystemResource,
      options?: FileSystemsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, fileSystemName, resource, options),
    get: (
      resourceGroupName: string,
      fileSystemName: string,
      options?: FileSystemsGetOptionalParams,
    ) => get(context, resourceGroupName, fileSystemName, options),
  };
}

export function _getFileSystemsOperations(context: QumuloStorageContext): FileSystemsOperations {
  return {
    ..._getFileSystems(context),
  };
}
