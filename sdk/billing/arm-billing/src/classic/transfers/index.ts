// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import { cancel, list, initiate, get } from "../../api/transfers/operations.js";
import type {
  TransfersCancelOptionalParams,
  TransfersListOptionalParams,
  TransfersInitiateOptionalParams,
  TransfersGetOptionalParams,
} from "../../api/transfers/options.js";
import type { TransferDetails, InitiateTransferRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Transfers operations. */
export interface TransfersOperations {
  /** Cancels a transfer request. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  cancel: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    transferName: string,
    options?: TransfersCancelOptionalParams,
  ) => Promise<TransferDetails>;
  /** Lists the transfer requests for an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  list: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: TransfersListOptionalParams,
  ) => PagedAsyncIterableIterator<TransferDetails>;
  /** Sends a request to a user in another billing account to transfer billing ownership of their subscriptions. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  initiate: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    transferName: string,
    parameters: InitiateTransferRequest,
    options?: TransfersInitiateOptionalParams,
  ) => Promise<TransferDetails>;
  /** Gets a transfer request by ID. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  get: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    transferName: string,
    options?: TransfersGetOptionalParams,
  ) => Promise<TransferDetails>;
}

function _getTransfers(context: BillingManagementContext) {
  return {
    cancel: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      transferName: string,
      options?: TransfersCancelOptionalParams,
    ) =>
      cancel(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        transferName,
        options,
      ),
    list: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: TransfersListOptionalParams,
    ) => list(context, billingAccountName, billingProfileName, invoiceSectionName, options),
    initiate: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      transferName: string,
      parameters: InitiateTransferRequest,
      options?: TransfersInitiateOptionalParams,
    ) =>
      initiate(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        transferName,
        parameters,
        options,
      ),
    get: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      transferName: string,
      options?: TransfersGetOptionalParams,
    ) =>
      get(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        transferName,
        options,
      ),
  };
}

export function _getTransfersOperations(context: BillingManagementContext): TransfersOperations {
  return {
    ..._getTransfers(context),
  };
}
