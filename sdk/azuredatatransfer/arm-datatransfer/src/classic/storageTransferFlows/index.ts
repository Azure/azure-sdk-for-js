// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext } from "../../api/azureDataTransferContext.js";
import {
  linkRemoteFlow,
  enableTransfer,
  disableTransfer,
  $delete,
  listBySubscription,
  listByResourceGroup,
  update,
  createOrUpdate,
  get,
} from "../../api/storageTransferFlows/operations.js";
import type {
  StorageTransferFlowsLinkRemoteFlowOptionalParams,
  StorageTransferFlowsEnableTransferOptionalParams,
  StorageTransferFlowsDisableTransferOptionalParams,
  StorageTransferFlowsDeleteOptionalParams,
  StorageTransferFlowsListBySubscriptionOptionalParams,
  StorageTransferFlowsListByResourceGroupOptionalParams,
  StorageTransferFlowsUpdateOptionalParams,
  StorageTransferFlowsCreateOrUpdateOptionalParams,
  StorageTransferFlowsGetOptionalParams,
} from "../../api/storageTransferFlows/options.js";
import type { StorageTransferFlow, StorageTransferFlowsPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageTransferFlows operations. */
export interface StorageTransferFlowsOperations {
  /** Pairs this storage transfer flow with the storage transfer flow identified by its remoteTransferFlowResourceId on the other side of the pipeline. Once both sides are linked and approved, data can be transferred between them. */
  linkRemoteFlow: (
    resourceGroupName: string,
    storageTransferFlowName: string,
    options?: StorageTransferFlowsLinkRemoteFlowOptionalParams,
  ) => PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow>;
  /** Starts (or resumes) data transfer through the specified storage transfer flow. The transfer flow must be approved and linked. */
  enableTransfer: (
    resourceGroupName: string,
    storageTransferFlowName: string,
    options?: StorageTransferFlowsEnableTransferOptionalParams,
  ) => PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow>;
  /** Stops data transfer through the specified storage transfer flow. */
  disableTransfer: (
    resourceGroupName: string,
    storageTransferFlowName: string,
    options?: StorageTransferFlowsDisableTransferOptionalParams,
  ) => PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow>;
  /** Deletes the storage transfer flow resource. */
  delete: (
    resourceGroupName: string,
    storageTransferFlowName: string,
    options?: StorageTransferFlowsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets storage transfer flows in a subscription. */
  listBySubscription: (
    options?: StorageTransferFlowsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<StorageTransferFlow>;
  /** Gets storage transfer flows in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StorageTransferFlowsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StorageTransferFlow>;
  /** Updates the StorageTransferFlow resource. */
  update: (
    resourceGroupName: string,
    storageTransferFlowName: string,
    storageTransferFlow: StorageTransferFlowsPatch,
    options?: StorageTransferFlowsUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow>;
  /** Creates or updates the StorageTransferFlow resource. */
  createOrUpdate: (
    resourceGroupName: string,
    storageTransferFlowName: string,
    storageTransferFlow: StorageTransferFlow,
    options?: StorageTransferFlowsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<StorageTransferFlow>, StorageTransferFlow>;
  /** Gets StorageTransferFlow resource. */
  get: (
    resourceGroupName: string,
    storageTransferFlowName: string,
    options?: StorageTransferFlowsGetOptionalParams,
  ) => Promise<StorageTransferFlow>;
}

function _getStorageTransferFlows(context: AzureDataTransferContext) {
  return {
    linkRemoteFlow: (
      resourceGroupName: string,
      storageTransferFlowName: string,
      options?: StorageTransferFlowsLinkRemoteFlowOptionalParams,
    ) => linkRemoteFlow(context, resourceGroupName, storageTransferFlowName, options),
    enableTransfer: (
      resourceGroupName: string,
      storageTransferFlowName: string,
      options?: StorageTransferFlowsEnableTransferOptionalParams,
    ) => enableTransfer(context, resourceGroupName, storageTransferFlowName, options),
    disableTransfer: (
      resourceGroupName: string,
      storageTransferFlowName: string,
      options?: StorageTransferFlowsDisableTransferOptionalParams,
    ) => disableTransfer(context, resourceGroupName, storageTransferFlowName, options),
    delete: (
      resourceGroupName: string,
      storageTransferFlowName: string,
      options?: StorageTransferFlowsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageTransferFlowName, options),
    listBySubscription: (options?: StorageTransferFlowsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StorageTransferFlowsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    update: (
      resourceGroupName: string,
      storageTransferFlowName: string,
      storageTransferFlow: StorageTransferFlowsPatch,
      options?: StorageTransferFlowsUpdateOptionalParams,
    ) => update(context, resourceGroupName, storageTransferFlowName, storageTransferFlow, options),
    createOrUpdate: (
      resourceGroupName: string,
      storageTransferFlowName: string,
      storageTransferFlow: StorageTransferFlow,
      options?: StorageTransferFlowsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        storageTransferFlowName,
        storageTransferFlow,
        options,
      ),
    get: (
      resourceGroupName: string,
      storageTransferFlowName: string,
      options?: StorageTransferFlowsGetOptionalParams,
    ) => get(context, resourceGroupName, storageTransferFlowName, options),
  };
}

export function _getStorageTransferFlowsOperations(
  context: AzureDataTransferContext,
): StorageTransferFlowsOperations {
  return {
    ..._getStorageTransferFlows(context),
  };
}
