// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BlockContext } from "../../api/blockContext.js";
import { AvsVmUpdate, AvsVm } from "../../models/models.js";
import {
  AvsVmsListByStoragePoolOptionalParams,
  AvsVmsDeleteOptionalParams,
  AvsVmsGetOptionalParams,
  AvsVmsUpdateOptionalParams,
} from "../../api/avsVms/options.js";
import { listByStoragePool, $delete, get, update } from "../../api/avsVms/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AvsVms operations. */
export interface AvsVmsOperations {
  /** List AVS VMs by storage pool */
  listByStoragePool: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: AvsVmsListByStoragePoolOptionalParams,
  ) => PagedAsyncIterableIterator<AvsVm>;
  /** Delete an AVS VM */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    storagePoolName: string,
    avsVmId: string,
    options?: AvsVmsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get an AVS VM */
  get: (
    resourceGroupName: string,
    storagePoolName: string,
    avsVmId: string,
    options?: AvsVmsGetOptionalParams,
  ) => Promise<AvsVm>;
  /** Update an AVS VM */
  update: (
    resourceGroupName: string,
    storagePoolName: string,
    avsVmId: string,
    properties: AvsVmUpdate,
    options?: AvsVmsUpdateOptionalParams,
  ) => PollerLike<OperationState<AvsVm>, AvsVm>;
}

function _getAvsVms(context: BlockContext) {
  return {
    listByStoragePool: (
      resourceGroupName: string,
      storagePoolName: string,
      options?: AvsVmsListByStoragePoolOptionalParams,
    ) => listByStoragePool(context, resourceGroupName, storagePoolName, options),
    delete: (
      resourceGroupName: string,
      storagePoolName: string,
      avsVmId: string,
      options?: AvsVmsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storagePoolName, avsVmId, options),
    get: (
      resourceGroupName: string,
      storagePoolName: string,
      avsVmId: string,
      options?: AvsVmsGetOptionalParams,
    ) => get(context, resourceGroupName, storagePoolName, avsVmId, options),
    update: (
      resourceGroupName: string,
      storagePoolName: string,
      avsVmId: string,
      properties: AvsVmUpdate,
      options?: AvsVmsUpdateOptionalParams,
    ) => update(context, resourceGroupName, storagePoolName, avsVmId, properties, options),
  };
}

export function _getAvsVmsOperations(context: BlockContext): AvsVmsOperations {
  return {
    ..._getAvsVms(context),
  };
}
