// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext } from "../../api/networkCloudContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/accessBridges/operations.js";
import {
  AccessBridgesListBySubscriptionOptionalParams,
  AccessBridgesListByResourceGroupOptionalParams,
  AccessBridgesDeleteOptionalParams,
  AccessBridgesUpdateOptionalParams,
  AccessBridgesCreateOrUpdateOptionalParams,
  AccessBridgesGetOptionalParams,
} from "../../api/accessBridges/options.js";
import {
  AccessBridge,
  AccessBridgeAllowedName,
  OperationStatusResult,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AccessBridges operations. */
export interface AccessBridgesOperations {
  /** Get a list of access bridges in the provided subscription. */
  listBySubscription: (
    options?: AccessBridgesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AccessBridge>;
  /** Get a list of access bridges in the provided resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AccessBridgesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AccessBridge>;
  /** Delete the specified access bridge. */
  delete: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    options?: AccessBridgesDeleteOptionalParams,
  ) => PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
  /** Update properties of the provided access bridge, or update tags associated with the access bridge. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    options?: AccessBridgesUpdateOptionalParams,
  ) => PollerLike<OperationState<AccessBridge>, AccessBridge>;
  /** Create a new access bridge or update the properties of the existing access bridge. */
  createOrUpdate: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    accessBridge: AccessBridge,
    options?: AccessBridgesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AccessBridge>, AccessBridge>;
  /** Get the properties of the provided access bridge. */
  get: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    options?: AccessBridgesGetOptionalParams,
  ) => Promise<AccessBridge>;
}

function _getAccessBridges(context: NetworkCloudContext) {
  return {
    listBySubscription: (options?: AccessBridgesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AccessBridgesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      options?: AccessBridgesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accessBridgeName, options),
    update: (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      options?: AccessBridgesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accessBridgeName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      accessBridge: AccessBridge,
      options?: AccessBridgesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accessBridgeName, accessBridge, options),
    get: (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      options?: AccessBridgesGetOptionalParams,
    ) => get(context, resourceGroupName, accessBridgeName, options),
  };
}

export function _getAccessBridgesOperations(context: NetworkCloudContext): AccessBridgesOperations {
  return {
    ..._getAccessBridges(context),
  };
}
