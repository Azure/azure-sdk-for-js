// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import { cancel, list, initiate, get } from "../../api/partnerTransfers/operations.js";
import type {
  PartnerTransfersCancelOptionalParams,
  PartnerTransfersListOptionalParams,
  PartnerTransfersInitiateOptionalParams,
  PartnerTransfersGetOptionalParams,
} from "../../api/partnerTransfers/options.js";
import type {
  PartnerTransferDetails,
  PartnerInitiateTransferRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PartnerTransfers operations. */
export interface PartnerTransfersOperations {
  /** Cancels a transfer request. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  cancel: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    transferName: string,
    options?: PartnerTransfersCancelOptionalParams,
  ) => Promise<PartnerTransferDetails>;
  /** Lists the transfer requests sent to a customer. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  list: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    options?: PartnerTransfersListOptionalParams,
  ) => PagedAsyncIterableIterator<PartnerTransferDetails>;
  /** Sends a request to a user in a customer's billing account to transfer billing ownership of their subscriptions. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  initiate: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    transferName: string,
    parameters: PartnerInitiateTransferRequest,
    options?: PartnerTransfersInitiateOptionalParams,
  ) => Promise<PartnerTransferDetails>;
  /** Gets a transfer request by ID. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  get: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    transferName: string,
    options?: PartnerTransfersGetOptionalParams,
  ) => Promise<PartnerTransferDetails>;
}

function _getPartnerTransfers(context: BillingManagementContext) {
  return {
    cancel: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      transferName: string,
      options?: PartnerTransfersCancelOptionalParams,
    ) =>
      cancel(context, billingAccountName, billingProfileName, customerName, transferName, options),
    list: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      options?: PartnerTransfersListOptionalParams,
    ) => list(context, billingAccountName, billingProfileName, customerName, options),
    initiate: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      transferName: string,
      parameters: PartnerInitiateTransferRequest,
      options?: PartnerTransfersInitiateOptionalParams,
    ) =>
      initiate(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        transferName,
        parameters,
        options,
      ),
    get: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      transferName: string,
      options?: PartnerTransfersGetOptionalParams,
    ) => get(context, billingAccountName, billingProfileName, customerName, transferName, options),
  };
}

export function _getPartnerTransfersOperations(
  context: BillingManagementContext,
): PartnerTransfersOperations {
  return {
    ..._getPartnerTransfers(context),
  };
}
