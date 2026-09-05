// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import {
  reject,
  approve,
  listBySubscription,
  list,
  get,
} from "../../api/incomingQuotaTransfers/operations.js";
import type {
  IncomingQuotaTransfersRejectOptionalParams,
  IncomingQuotaTransfersApproveOptionalParams,
  IncomingQuotaTransfersListBySubscriptionOptionalParams,
  IncomingQuotaTransfersListOptionalParams,
  IncomingQuotaTransfersGetOptionalParams,
} from "../../api/incomingQuotaTransfers/options.js";
import type { IncomingQuotaTransfer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IncomingQuotaTransfers operations. */
export interface IncomingQuotaTransfersOperations {
  /**
   * Reject a Pending incoming quota transfer. Synchronous. The `If-Match` header value
   * must equal `properties.sourceEtag` returned on a prior GET.
   */
  reject: (
    targetProvider: string,
    region: string,
    transferId: string,
    ifMatch: string,
    options?: IncomingQuotaTransfersRejectOptionalParams,
  ) => Promise<IncomingQuotaTransfer>;
  /**
   * Approve a Pending incoming quota transfer. Long-running. The `If-Match` header value
   * must equal `properties.sourceEtag` returned on a prior GET; a stale value yields
   * 412 SourceResourceModified.
   */
  approve: (
    targetProvider: string,
    region: string,
    transferId: string,
    ifMatch: string,
    options?: IncomingQuotaTransfersApproveOptionalParams,
  ) => PollerLike<OperationState<IncomingQuotaTransfer>, IncomingQuotaTransfer>;
  /**
   * List incoming quota transfers across every targetProvider and region for the
   * subscription.
   */
  listBySubscription: (
    options?: IncomingQuotaTransfersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<IncomingQuotaTransfer>;
  /** List incoming quota transfers at the (subscription, targetProvider, region) scope. */
  list: (
    targetProvider: string,
    region: string,
    options?: IncomingQuotaTransfersListOptionalParams,
  ) => PagedAsyncIterableIterator<IncomingQuotaTransfer>;
  /** Get an incoming quota transfer. */
  get: (
    targetProvider: string,
    region: string,
    transferId: string,
    options?: IncomingQuotaTransfersGetOptionalParams,
  ) => Promise<IncomingQuotaTransfer>;
}

function _getIncomingQuotaTransfers(context: AzureQuotaExtensionAPIContext) {
  return {
    reject: (
      targetProvider: string,
      region: string,
      transferId: string,
      ifMatch: string,
      options?: IncomingQuotaTransfersRejectOptionalParams,
    ) => reject(context, targetProvider, region, transferId, ifMatch, options),
    approve: (
      targetProvider: string,
      region: string,
      transferId: string,
      ifMatch: string,
      options?: IncomingQuotaTransfersApproveOptionalParams,
    ) => approve(context, targetProvider, region, transferId, ifMatch, options),
    listBySubscription: (options?: IncomingQuotaTransfersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (
      targetProvider: string,
      region: string,
      options?: IncomingQuotaTransfersListOptionalParams,
    ) => list(context, targetProvider, region, options),
    get: (
      targetProvider: string,
      region: string,
      transferId: string,
      options?: IncomingQuotaTransfersGetOptionalParams,
    ) => get(context, targetProvider, region, transferId, options),
  };
}

export function _getIncomingQuotaTransfersOperations(
  context: AzureQuotaExtensionAPIContext,
): IncomingQuotaTransfersOperations {
  return {
    ..._getIncomingQuotaTransfers(context),
  };
}
