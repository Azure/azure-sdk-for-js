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
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    options?: AccessBridgesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationStatusResult>, OperationStatusResult>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    options?: AccessBridgesDeleteOptionalParams,
  ) => Promise<OperationStatusResult>;
  /** Update properties of the provided access bridge, or update tags associated with the access bridge. Properties and tag updates can be done independently. */
  update: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    options?: AccessBridgesUpdateOptionalParams,
  ) => PollerLike<OperationState<AccessBridge>, AccessBridge>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    options?: AccessBridgesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessBridge>, AccessBridge>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    options?: AccessBridgesUpdateOptionalParams,
  ) => Promise<AccessBridge>;
  /** Create a new access bridge or update the properties of the existing access bridge. */
  createOrUpdate: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    accessBridge: AccessBridge,
    options?: AccessBridgesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AccessBridge>, AccessBridge>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    accessBridge: AccessBridge,
    options?: AccessBridgesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessBridge>, AccessBridge>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accessBridgeName: AccessBridgeAllowedName,
    accessBridge: AccessBridge,
    options?: AccessBridgesCreateOrUpdateOptionalParams,
  ) => Promise<AccessBridge>;
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
    beginDelete: async (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      options?: AccessBridgesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accessBridgeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      options?: AccessBridgesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accessBridgeName, options);
    },
    update: (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      options?: AccessBridgesUpdateOptionalParams,
    ) => update(context, resourceGroupName, accessBridgeName, options),
    beginUpdate: async (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      options?: AccessBridgesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, accessBridgeName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      options?: AccessBridgesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, accessBridgeName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      accessBridge: AccessBridge,
      options?: AccessBridgesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accessBridgeName, accessBridge, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      accessBridge: AccessBridge,
      options?: AccessBridgesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accessBridgeName,
        accessBridge,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accessBridgeName: AccessBridgeAllowedName,
      accessBridge: AccessBridge,
      options?: AccessBridgesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accessBridgeName,
        accessBridge,
        options,
      );
    },
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
