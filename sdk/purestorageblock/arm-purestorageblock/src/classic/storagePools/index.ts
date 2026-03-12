// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockContext } from "../../api/blockContext.js";
import {
  StoragePool,
  StoragePoolUpdate,
  StoragePoolHealthInfo,
  AvsConnection,
  AvsStatus,
  StoragePoolEnableAvsConnectionPost,
  StoragePoolFinalizeAvsConnectionPost,
} from "../../models/models.js";
import {
  StoragePoolsRepairAvsConnectionOptionalParams,
  StoragePoolsFinalizeAvsConnectionOptionalParams,
  StoragePoolsDisableAvsConnectionOptionalParams,
  StoragePoolsEnableAvsConnectionOptionalParams,
  StoragePoolsGetAvsStatusOptionalParams,
  StoragePoolsGetAvsConnectionOptionalParams,
  StoragePoolsGetHealthStatusOptionalParams,
  StoragePoolsListBySubscriptionOptionalParams,
  StoragePoolsListByResourceGroupOptionalParams,
  StoragePoolsDeleteOptionalParams,
  StoragePoolsUpdateOptionalParams,
  StoragePoolsCreateOptionalParams,
  StoragePoolsGetOptionalParams,
} from "../../api/storagePools/options.js";
import {
  repairAvsConnection,
  finalizeAvsConnection,
  disableAvsConnection,
  enableAvsConnection,
  getAvsStatus,
  getAvsConnection,
  getHealthStatus,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/storagePools/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StoragePools operations. */
export interface StoragePoolsOperations {
  /** Test and repair, if needed, all configuration elements of the storage pool connection to the AVS instance */
  repairAvsConnection: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: StoragePoolsRepairAvsConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Finalize an already started AVS connection to a specific AVS SDDC */
  finalizeAvsConnection: (
    resourceGroupName: string,
    storagePoolName: string,
    properties: StoragePoolFinalizeAvsConnectionPost,
    options?: StoragePoolsFinalizeAvsConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Disable the existing AVS connection */
  disableAvsConnection: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: StoragePoolsDisableAvsConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Initiate a connection between the storage pool and a specified AVS SDDC resource */
  enableAvsConnection: (
    resourceGroupName: string,
    storagePoolName: string,
    properties: StoragePoolEnableAvsConnectionPost,
    options?: StoragePoolsEnableAvsConnectionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Returns the status of the storage pool connection to AVS */
  getAvsStatus: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: StoragePoolsGetAvsStatusOptionalParams,
  ) => Promise<AvsStatus>;
  /** Returns current information about an on-going connection to an AVS instance */
  getAvsConnection: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: StoragePoolsGetAvsConnectionOptionalParams,
  ) => Promise<AvsConnection>;
  /** Retrieve health metrics of a storage pool */
  getHealthStatus: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: StoragePoolsGetHealthStatusOptionalParams,
  ) => Promise<StoragePoolHealthInfo>;
  /** List storage pools by Azure subscription ID */
  listBySubscription: (
    options?: StoragePoolsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StoragePool>;
  /** List storage pools by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StoragePoolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StoragePool>;
  /** Delete a storage pool */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: StoragePoolsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a storage pool */
  update: (
    resourceGroupName: string,
    storagePoolName: string,
    properties: StoragePoolUpdate,
    options?: StoragePoolsUpdateOptionalParams,
  ) => PollerLike<OperationState<StoragePool>, StoragePool>;
  /** Create a storage pool */
  create: (
    resourceGroupName: string,
    storagePoolName: string,
    resource: StoragePool,
    options?: StoragePoolsCreateOptionalParams,
  ) => PollerLike<OperationState<StoragePool>, StoragePool>;
  /** Get a storage pool */
  get: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: StoragePoolsGetOptionalParams,
  ) => Promise<StoragePool>;
}

function _getStoragePools(context: BlockContext) {
  return {
    repairAvsConnection: (
      resourceGroupName: string,
      storagePoolName: string,
      options?: StoragePoolsRepairAvsConnectionOptionalParams,
    ) => repairAvsConnection(context, resourceGroupName, storagePoolName, options),
    finalizeAvsConnection: (
      resourceGroupName: string,
      storagePoolName: string,
      properties: StoragePoolFinalizeAvsConnectionPost,
      options?: StoragePoolsFinalizeAvsConnectionOptionalParams,
    ) => finalizeAvsConnection(context, resourceGroupName, storagePoolName, properties, options),
    disableAvsConnection: (
      resourceGroupName: string,
      storagePoolName: string,
      options?: StoragePoolsDisableAvsConnectionOptionalParams,
    ) => disableAvsConnection(context, resourceGroupName, storagePoolName, options),
    enableAvsConnection: (
      resourceGroupName: string,
      storagePoolName: string,
      properties: StoragePoolEnableAvsConnectionPost,
      options?: StoragePoolsEnableAvsConnectionOptionalParams,
    ) => enableAvsConnection(context, resourceGroupName, storagePoolName, properties, options),
    getAvsStatus: (
      resourceGroupName: string,
      storagePoolName: string,
      options?: StoragePoolsGetAvsStatusOptionalParams,
    ) => getAvsStatus(context, resourceGroupName, storagePoolName, options),
    getAvsConnection: (
      resourceGroupName: string,
      storagePoolName: string,
      options?: StoragePoolsGetAvsConnectionOptionalParams,
    ) => getAvsConnection(context, resourceGroupName, storagePoolName, options),
    getHealthStatus: (
      resourceGroupName: string,
      storagePoolName: string,
      options?: StoragePoolsGetHealthStatusOptionalParams,
    ) => getHealthStatus(context, resourceGroupName, storagePoolName, options),
    listBySubscription: (options?: StoragePoolsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StoragePoolsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      storagePoolName: string,
      options?: StoragePoolsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storagePoolName, options),
    update: (
      resourceGroupName: string,
      storagePoolName: string,
      properties: StoragePoolUpdate,
      options?: StoragePoolsUpdateOptionalParams,
    ) => update(context, resourceGroupName, storagePoolName, properties, options),
    create: (
      resourceGroupName: string,
      storagePoolName: string,
      resource: StoragePool,
      options?: StoragePoolsCreateOptionalParams,
    ) => create(context, resourceGroupName, storagePoolName, resource, options),
    get: (
      resourceGroupName: string,
      storagePoolName: string,
      options?: StoragePoolsGetOptionalParams,
    ) => get(context, resourceGroupName, storagePoolName, options),
  };
}

export function _getStoragePoolsOperations(context: BlockContext): StoragePoolsOperations {
  return {
    ..._getStoragePools(context),
  };
}
