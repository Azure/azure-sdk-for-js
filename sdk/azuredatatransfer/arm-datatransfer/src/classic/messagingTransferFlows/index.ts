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
} from "../../api/messagingTransferFlows/operations.js";
import type {
  MessagingTransferFlowsLinkRemoteFlowOptionalParams,
  MessagingTransferFlowsEnableTransferOptionalParams,
  MessagingTransferFlowsDisableTransferOptionalParams,
  MessagingTransferFlowsDeleteOptionalParams,
  MessagingTransferFlowsListBySubscriptionOptionalParams,
  MessagingTransferFlowsListByResourceGroupOptionalParams,
  MessagingTransferFlowsUpdateOptionalParams,
  MessagingTransferFlowsCreateOrUpdateOptionalParams,
  MessagingTransferFlowsGetOptionalParams,
} from "../../api/messagingTransferFlows/options.js";
import type { MessagingTransferFlow, MessagingTransferFlowsPatch } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MessagingTransferFlows operations. */
export interface MessagingTransferFlowsOperations {
  /** Pairs this messaging transfer flow with the messaging transfer flow identified by its remoteTransferFlowResourceId on the other side of the pipeline. Once both sides are linked and approved, data can be transferred between them. */
  linkRemoteFlow: (
    resourceGroupName: string,
    messagingTransferFlowName: string,
    options?: MessagingTransferFlowsLinkRemoteFlowOptionalParams,
  ) => PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow>;
  /** Starts (or resumes) data transfer through the specified messaging transfer flow. The transfer flow must be approved and linked. */
  enableTransfer: (
    resourceGroupName: string,
    messagingTransferFlowName: string,
    options?: MessagingTransferFlowsEnableTransferOptionalParams,
  ) => PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow>;
  /** Stops data transfer through the specified messaging transfer flow. */
  disableTransfer: (
    resourceGroupName: string,
    messagingTransferFlowName: string,
    options?: MessagingTransferFlowsDisableTransferOptionalParams,
  ) => PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow>;
  /** Deletes the MessagingTransferFlow resource. */
  delete: (
    resourceGroupName: string,
    messagingTransferFlowName: string,
    options?: MessagingTransferFlowsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Gets messaging transfer flows in a subscription. */
  listBySubscription: (
    options?: MessagingTransferFlowsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<MessagingTransferFlow>;
  /** Gets messaging transfer flows in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MessagingTransferFlowsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MessagingTransferFlow>;
  /** Updates the MessagingTransferFlow resource. */
  update: (
    resourceGroupName: string,
    messagingTransferFlowName: string,
    messagingTransferFlow: MessagingTransferFlowsPatch,
    options?: MessagingTransferFlowsUpdateOptionalParams,
  ) => PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow>;
  /** Creates or updates the MessagingTransferFlow resource. */
  createOrUpdate: (
    resourceGroupName: string,
    messagingTransferFlowName: string,
    messagingTransferFlow: MessagingTransferFlow,
    options?: MessagingTransferFlowsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MessagingTransferFlow>, MessagingTransferFlow>;
  /** Gets the MessagingTransferFlow resource. */
  get: (
    resourceGroupName: string,
    messagingTransferFlowName: string,
    options?: MessagingTransferFlowsGetOptionalParams,
  ) => Promise<MessagingTransferFlow>;
}

function _getMessagingTransferFlows(context: AzureDataTransferContext) {
  return {
    linkRemoteFlow: (
      resourceGroupName: string,
      messagingTransferFlowName: string,
      options?: MessagingTransferFlowsLinkRemoteFlowOptionalParams,
    ) => linkRemoteFlow(context, resourceGroupName, messagingTransferFlowName, options),
    enableTransfer: (
      resourceGroupName: string,
      messagingTransferFlowName: string,
      options?: MessagingTransferFlowsEnableTransferOptionalParams,
    ) => enableTransfer(context, resourceGroupName, messagingTransferFlowName, options),
    disableTransfer: (
      resourceGroupName: string,
      messagingTransferFlowName: string,
      options?: MessagingTransferFlowsDisableTransferOptionalParams,
    ) => disableTransfer(context, resourceGroupName, messagingTransferFlowName, options),
    delete: (
      resourceGroupName: string,
      messagingTransferFlowName: string,
      options?: MessagingTransferFlowsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, messagingTransferFlowName, options),
    listBySubscription: (options?: MessagingTransferFlowsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MessagingTransferFlowsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    update: (
      resourceGroupName: string,
      messagingTransferFlowName: string,
      messagingTransferFlow: MessagingTransferFlowsPatch,
      options?: MessagingTransferFlowsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, messagingTransferFlowName, messagingTransferFlow, options),
    createOrUpdate: (
      resourceGroupName: string,
      messagingTransferFlowName: string,
      messagingTransferFlow: MessagingTransferFlow,
      options?: MessagingTransferFlowsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        messagingTransferFlowName,
        messagingTransferFlow,
        options,
      ),
    get: (
      resourceGroupName: string,
      messagingTransferFlowName: string,
      options?: MessagingTransferFlowsGetOptionalParams,
    ) => get(context, resourceGroupName, messagingTransferFlowName, options),
  };
}

export function _getMessagingTransferFlowsOperations(
  context: AzureDataTransferContext,
): MessagingTransferFlowsOperations {
  return {
    ..._getMessagingTransferFlows(context),
  };
}
