// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  list,
  listByReplicationFabrics,
  get,
} from "../../api/replicationStorageClassifications/operations.js";
import type {
  ReplicationStorageClassificationsListOptionalParams,
  ReplicationStorageClassificationsListByReplicationFabricsOptionalParams,
  ReplicationStorageClassificationsGetOptionalParams,
} from "../../api/replicationStorageClassifications/options.js";
import type { StorageClassification } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReplicationStorageClassifications operations. */
export interface ReplicationStorageClassificationsOperations {
  /** Lists the storage classifications in the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationStorageClassificationsListOptionalParams,
  ) => PagedAsyncIterableIterator<StorageClassification>;
  /** Lists the storage classifications available in the specified fabric. */
  listByReplicationFabrics: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationStorageClassificationsListByReplicationFabricsOptionalParams,
  ) => PagedAsyncIterableIterator<StorageClassification>;
  /** Gets the details of the specified storage classification. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    storageClassificationName: string,
    options?: ReplicationStorageClassificationsGetOptionalParams,
  ) => Promise<StorageClassification>;
}

function _getReplicationStorageClassifications(context: SiteRecoveryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationStorageClassificationsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    listByReplicationFabrics: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      options?: ReplicationStorageClassificationsListByReplicationFabricsOptionalParams,
    ) => listByReplicationFabrics(context, resourceGroupName, resourceName, fabricName, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      storageClassificationName: string,
      options?: ReplicationStorageClassificationsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, resourceName, fabricName, storageClassificationName, options),
  };
}

export function _getReplicationStorageClassificationsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationStorageClassificationsOperations {
  return {
    ..._getReplicationStorageClassifications(context),
  };
}
