// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import { decline, validate, accept, list, get } from "../../api/recipientTransfers/operations.js";
import type {
  RecipientTransfersDeclineOptionalParams,
  RecipientTransfersValidateOptionalParams,
  RecipientTransfersAcceptOptionalParams,
  RecipientTransfersListOptionalParams,
  RecipientTransfersGetOptionalParams,
} from "../../api/recipientTransfers/options.js";
import type {
  RecipientTransferDetails,
  AcceptTransferRequest,
  ValidateTransferListResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecipientTransfers operations. */
export interface RecipientTransfersOperations {
  /** Declines a transfer request. */
  decline: (
    transferName: string,
    options?: RecipientTransfersDeclineOptionalParams,
  ) => Promise<RecipientTransferDetails>;
  /** Validates if a subscription or a reservation can be transferred. Use this operation to validate your subscriptions or reservation before using the accept transfer operation. */
  validate: (
    transferName: string,
    parameters: AcceptTransferRequest,
    options?: RecipientTransfersValidateOptionalParams,
  ) => Promise<ValidateTransferListResponse>;
  /** Accepts a transfer request. */
  accept: (
    transferName: string,
    parameters: AcceptTransferRequest,
    options?: RecipientTransfersAcceptOptionalParams,
  ) => Promise<RecipientTransferDetails>;
  /** Lists the transfer requests received by the caller. */
  list: (
    options?: RecipientTransfersListOptionalParams,
  ) => PagedAsyncIterableIterator<RecipientTransferDetails>;
  /** Gets a transfer request by ID. The caller must be the recipient of the transfer request. */
  get: (
    transferName: string,
    options?: RecipientTransfersGetOptionalParams,
  ) => Promise<RecipientTransferDetails>;
}

function _getRecipientTransfers(context: BillingManagementContext) {
  return {
    decline: (transferName: string, options?: RecipientTransfersDeclineOptionalParams) =>
      decline(context, transferName, options),
    validate: (
      transferName: string,
      parameters: AcceptTransferRequest,
      options?: RecipientTransfersValidateOptionalParams,
    ) => validate(context, transferName, parameters, options),
    accept: (
      transferName: string,
      parameters: AcceptTransferRequest,
      options?: RecipientTransfersAcceptOptionalParams,
    ) => accept(context, transferName, parameters, options),
    list: (options?: RecipientTransfersListOptionalParams) => list(context, options),
    get: (transferName: string, options?: RecipientTransfersGetOptionalParams) =>
      get(context, transferName, options),
  };
}

export function _getRecipientTransfersOperations(
  context: BillingManagementContext,
): RecipientTransfersOperations {
  return {
    ..._getRecipientTransfers(context),
  };
}
