// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesContext } from "../../api/fileSharesContext.js";
import {
  checkNameAvailability,
  listByParent,
  listBySubscription,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/fileShares/operations.js";
import {
  FileSharesCheckNameAvailabilityOptionalParams,
  FileSharesListByParentOptionalParams,
  FileSharesListBySubscriptionOptionalParams,
  FileSharesDeleteOptionalParams,
  FileSharesUpdateOptionalParams,
  FileSharesCreateOrUpdateOptionalParams,
  FileSharesGetOptionalParams,
} from "../../api/fileShares/options.js";
import {
  FileShare,
  FileShareUpdate,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a FileShares operations. */
export interface FileSharesOperations {
  /** Implements local CheckNameAvailability operations */
  checkNameAvailability: (
    location: string,
    body: CheckNameAvailabilityRequest,
    options?: FileSharesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** List FileShare resources by resource group */
  listByParent: (
    resourceGroupName: string,
    options?: FileSharesListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<FileShare>;
  /** List FileShare resources by subscription ID */
  listBySubscription: (
    options?: FileSharesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<FileShare>;
  /** Delete a FileShare */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: FileSharesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a FileShare */
  update: (
    resourceGroupName: string,
    resourceName: string,
    properties: FileShareUpdate,
    options?: FileSharesUpdateOptionalParams,
  ) => PollerLike<OperationState<FileShare>, FileShare>;
  /** Create or update a file share. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    resource: FileShare,
    options?: FileSharesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<FileShare>, FileShare>;
  /** Get a FileShare */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: FileSharesGetOptionalParams,
  ) => Promise<FileShare>;
}

function _getFileShares(context: FileSharesContext) {
  return {
    checkNameAvailability: (
      location: string,
      body: CheckNameAvailabilityRequest,
      options?: FileSharesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, location, body, options),
    listByParent: (resourceGroupName: string, options?: FileSharesListByParentOptionalParams) =>
      listByParent(context, resourceGroupName, options),
    listBySubscription: (options?: FileSharesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: FileSharesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      properties: FileShareUpdate,
      options?: FileSharesUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      resource: FileShare,
      options?: FileSharesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, resource, options),
    get: (resourceGroupName: string, resourceName: string, options?: FileSharesGetOptionalParams) =>
      get(context, resourceGroupName, resourceName, options),
  };
}

export function _getFileSharesOperations(context: FileSharesContext): FileSharesOperations {
  return {
    ..._getFileShares(context),
  };
}
