// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageContext } from "../../api/storageContext.js";
import {
  FileSystemResource,
  FileSystemResourceUpdate,
} from "../../models/models.js";
import {
  FileSystemsListBySubscriptionOptionalParams,
  FileSystemsListByResourceGroupOptionalParams,
  FileSystemsDeleteOptionalParams,
  FileSystemsUpdateOptionalParams,
  FileSystemsCreateOrUpdateOptionalParams,
  FileSystemsGetOptionalParams,
} from "../../api/fileSystems/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/fileSystems/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    filesystemName: string,
    options?: FileSystemsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a FileSystemResource */
  update: (
    resourceGroupName: string,
    filesystemName: string,
    properties: FileSystemResourceUpdate,
    options?: FileSystemsUpdateOptionalParams,
  ) => Promise<FileSystemResource>;
  /** Create a FileSystemResource */
  createOrUpdate: (
    resourceGroupName: string,
    filesystemName: string,
    resource: FileSystemResource,
    options?: FileSystemsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FileSystemResource>, FileSystemResource>;
  /** Get a FileSystemResource */
  get: (
    resourceGroupName: string,
    filesystemName: string,
    options?: FileSystemsGetOptionalParams,
  ) => Promise<FileSystemResource>;
}

function _getFileSystems(context: StorageContext) {
  return {
    listBySubscription: (
      options?: FileSystemsListBySubscriptionOptionalParams,
    ) => listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FileSystemsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      filesystemName: string,
      options?: FileSystemsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, filesystemName, options),
    update: (
      resourceGroupName: string,
      filesystemName: string,
      properties: FileSystemResourceUpdate,
      options?: FileSystemsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, filesystemName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      filesystemName: string,
      resource: FileSystemResource,
      options?: FileSystemsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        filesystemName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      filesystemName: string,
      options?: FileSystemsGetOptionalParams,
    ) => get(context, resourceGroupName, filesystemName, options),
  };
}

export function _getFileSystemsOperations(
  context: StorageContext,
): FileSystemsOperations {
  return {
    ..._getFileSystems(context),
  };
}
