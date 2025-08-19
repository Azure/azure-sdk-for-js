// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockContext } from "../../api/blockContext.js";
import { AvsStorageContainer } from "../../models/models.js";
import {
  AvsStorageContainersListByStoragePoolOptionalParams,
  AvsStorageContainersDeleteOptionalParams,
  AvsStorageContainersGetOptionalParams,
} from "../../api/avsStorageContainers/options.js";
import { listByStoragePool, $delete, get } from "../../api/avsStorageContainers/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AvsStorageContainers operations. */
export interface AvsStorageContainersOperations {
  /** List AVS storage containers by storage pool */
  listByStoragePool: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: AvsStorageContainersListByStoragePoolOptionalParams,
  ) => PagedAsyncIterableIterator<AvsStorageContainer>;
  /** Delete an AVS storage container */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
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
