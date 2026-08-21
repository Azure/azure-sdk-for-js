// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPIContext } from "../../api/azureQuotaExtensionAPIContext.js";
import { cancel, list, $delete, createOrUpdate, get } from "../../api/quotaTransfers/operations.js";
import {
  QuotaTransfersCancelOptionalParams,
  QuotaTransfersListOptionalParams,
  QuotaTransfersDeleteOptionalParams,
  QuotaTransfersCreateOrUpdateOptionalParams,
  QuotaTransfersGetOptionalParams,
} from "../../api/quotaTransfers/options.js";
import { QuotaTransfer } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a QuotaTransfers operations. */
export interface QuotaTransfersOperations {
  /**
   * Cancel a Pending quota transfer. Synchronous. Transitions the transfer to Cancelled
   * and returns the refreshed resource envelope.
   */
  cancel: (
    targetProvider: string,
    region: string,
    transferName: string,
    options?: QuotaTransfersCancelOptionalParams,
  ) => Promise<QuotaTransfer>;
  /** List quota transfers at the (subscription, targetProvider, region) scope. */
  list: (
    targetProvider: string,
    region: string,
    options?: QuotaTransfersListOptionalParams,
  ) => PagedAsyncIterableIterator<QuotaTransfer>;
  /**
   * Delete a quota transfer record. Quota is not moved by delete; only the resource entry
   * is removed.
   */
  delete: (
    targetProvider: string,
    region: string,
    transferName: string,
    options?: QuotaTransfersDeleteOptionalParams,
  ) => Promise<void>;
  /**
   * Submit a quota transfer. Idempotent on the URI: a retry with the same body returns the
   * cached outcome and the same `transferId`; a retry with a different financial body
   * returns 409 BodyMismatch.
   */
  createOrUpdate: (
    targetProvider: string,
    region: string,
    transferName: string,
    resource: QuotaTransfer,
    options?: QuotaTransfersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<QuotaTransfer>, QuotaTransfer>;
  /** Get a quota transfer. */
  get: (
    targetProvider: string,
    region: string,
    transferName: string,
    options?: QuotaTransfersGetOptionalParams,
  ) => Promise<QuotaTransfer>;
}

function _getQuotaTransfers(context: AzureQuotaExtensionAPIContext) {
  return {
    cancel: (
      targetProvider: string,
      region: string,
      transferName: string,
      options?: QuotaTransfersCancelOptionalParams,
    ) => cancel(context, targetProvider, region, transferName, options),
    list: (targetProvider: string, region: string, options?: QuotaTransfersListOptionalParams) =>
      list(context, targetProvider, region, options),
    delete: (
      targetProvider: string,
      region: string,
      transferName: string,
      options?: QuotaTransfersDeleteOptionalParams,
    ) => $delete(context, targetProvider, region, transferName, options),
    createOrUpdate: (
      targetProvider: string,
      region: string,
      transferName: string,
      resource: QuotaTransfer,
      options?: QuotaTransfersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, targetProvider, region, transferName, resource, options),
    get: (
      targetProvider: string,
      region: string,
      transferName: string,
      options?: QuotaTransfersGetOptionalParams,
    ) => get(context, targetProvider, region, transferName, options),
  };
}

export function _getQuotaTransfersOperations(
  context: AzureQuotaExtensionAPIContext,
): QuotaTransfersOperations {
  return {
    ..._getQuotaTransfers(context),
  };
}
