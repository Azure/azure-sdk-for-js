// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext } from "../../api/blockContext.js";
import { listByStoragePool, $delete, get } from "../../api/avsStorageContainers/operations.js";
import type {
  AvsStorageContainersListByStoragePoolOptionalParams,
  AvsStorageContainersDeleteOptionalParams,
  AvsStorageContainersGetOptionalParams,
} from "../../api/avsStorageContainers/options.js";
import type { AvsStorageContainer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AvsStorageContainers operations. */
export interface AvsStorageContainersOperations {
  /** List AVS storage containers by storage pool */
  listByStoragePool: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: AvsStorageContainersListByStoragePoolOptionalParams,
  ) => PagedAsyncIterableIterator<AvsStorageContainer>;
  /** Delete an AVS storage container */
  delete: (
    resourceGroupName: string,
    storagePoolName: string,
    storageContainerName: string,
    options?: AvsStorageContainersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get an AVS storage container */
  get: (
    resourceGroupName: string,
    storagePoolName: string,
    storageContainerName: string,
    options?: AvsStorageContainersGetOptionalParams,
  ) => Promise<AvsStorageContainer>;
}

function _getAvsStorageContainers(context: BlockContext) {
  return {
    listByStoragePool: (
      resourceGroupName: string,
      storagePoolName: string,
      options?: AvsStorageContainersListByStoragePoolOptionalParams,
    ) => listByStoragePool(context, resourceGroupName, storagePoolName, options),
    delete: (
      resourceGroupName: string,
      storagePoolName: string,
      storageContainerName: string,
      options?: AvsStorageContainersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storagePoolName, storageContainerName, options),
    get: (
      resourceGroupName: string,
      storagePoolName: string,
      storageContainerName: string,
      options?: AvsStorageContainersGetOptionalParams,
    ) => get(context, resourceGroupName, storagePoolName, storageContainerName, options),
  };
}

export function _getAvsStorageContainersOperations(
  context: BlockContext,
): AvsStorageContainersOperations {
  return {
    ..._getAvsStorageContainers(context),
  };
}
