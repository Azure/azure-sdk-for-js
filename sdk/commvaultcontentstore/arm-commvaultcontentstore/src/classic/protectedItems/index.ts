// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext } from "../../api/contentStoreContext.js";
import {
  restore,
  getRestorePoints,
  listByProtectionGroup,
  get,
} from "../../api/protectedItems/operations.js";
import type {
  ProtectedItemsRestoreOptionalParams,
  ProtectedItemsGetRestorePointsOptionalParams,
  ProtectedItemsListByProtectionGroupOptionalParams,
  ProtectedItemsGetOptionalParams,
} from "../../api/protectedItems/options.js";
import type {
  RestoreProtectionItemRequest,
  RestoreProtectionItemResponse,
  ProtectedItem,
  RestorePoints,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProtectedItems operations. */
export interface ProtectedItemsOperations {
  /** Restore resource for a protected item. */
  restore: (
    resourceGroupName: string,
    cloudAccountName: string,
    protectionGroupName: string,
    protectedItemName: string,
    request: RestoreProtectionItemRequest,
    options?: ProtectedItemsRestoreOptionalParams,
  ) => Promise<RestoreProtectionItemResponse>;
  /** Limits used for creation of resources. */
  getRestorePoints: (
    resourceGroupName: string,
    cloudAccountName: string,
    protectionGroupName: string,
    protectedItemName: string,
    options?: ProtectedItemsGetRestorePointsOptionalParams,
  ) => Promise<RestorePoints>;
  /** List ProtectedItem resources by ProtectionGroup */
  listByProtectionGroup: (
    resourceGroupName: string,
    cloudAccountName: string,
    protectionGroupName: string,
    options?: ProtectedItemsListByProtectionGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectedItem>;
  /** Get a ProtectedItem */
  get: (
    resourceGroupName: string,
    cloudAccountName: string,
    protectionGroupName: string,
    protectedItemName: string,
    options?: ProtectedItemsGetOptionalParams,
  ) => Promise<ProtectedItem>;
}

function _getProtectedItems(context: ContentStoreContext) {
  return {
    restore: (
      resourceGroupName: string,
      cloudAccountName: string,
      protectionGroupName: string,
      protectedItemName: string,
      request: RestoreProtectionItemRequest,
      options?: ProtectedItemsRestoreOptionalParams,
    ) =>
      restore(
        context,
        resourceGroupName,
        cloudAccountName,
        protectionGroupName,
        protectedItemName,
        request,
        options,
      ),
    getRestorePoints: (
      resourceGroupName: string,
      cloudAccountName: string,
      protectionGroupName: string,
      protectedItemName: string,
      options?: ProtectedItemsGetRestorePointsOptionalParams,
    ) =>
      getRestorePoints(
        context,
        resourceGroupName,
        cloudAccountName,
        protectionGroupName,
        protectedItemName,
        options,
      ),
    listByProtectionGroup: (
      resourceGroupName: string,
      cloudAccountName: string,
      protectionGroupName: string,
      options?: ProtectedItemsListByProtectionGroupOptionalParams,
    ) =>
      listByProtectionGroup(
        context,
        resourceGroupName,
        cloudAccountName,
        protectionGroupName,
        options,
      ),
    get: (
      resourceGroupName: string,
      cloudAccountName: string,
      protectionGroupName: string,
      protectedItemName: string,
      options?: ProtectedItemsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        cloudAccountName,
        protectionGroupName,
        protectedItemName,
        options,
      ),
  };
}

export function _getProtectedItemsOperations(
  context: ContentStoreContext,
): ProtectedItemsOperations {
  return {
    ..._getProtectedItems(context),
  };
}
