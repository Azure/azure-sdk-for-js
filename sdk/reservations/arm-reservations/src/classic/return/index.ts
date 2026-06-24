// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPIContext } from "../../api/azureReservationAPIContext.js";
import { post } from "../../api/return/operations.js";
import { ReturnPostOptionalParams } from "../../api/return/options.js";
import { ReservationOrderResponse, RefundRequest } from "../../models/reservations/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Return operations. */
export interface ReturnOperations {
  /** Return a reservation and get refund information. */
  post: (
    reservationOrderId: string,
    body: RefundRequest,
    options?: ReturnPostOptionalParams,
  ) => PollerLike<OperationState<ReservationOrderResponse>, ReservationOrderResponse>;
  /** @deprecated use post instead */
  beginPost: (
    reservationOrderId: string,
    body: RefundRequest,
    options?: ReturnPostOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReservationOrderResponse>, ReservationOrderResponse>
  >;
  /** @deprecated use post instead */
  beginPostAndWait: (
    reservationOrderId: string,
    body: RefundRequest,
    options?: ReturnPostOptionalParams,
  ) => Promise<ReservationOrderResponse>;
}

function _getReturn(context: AzureReservationAPIContext) {
  return {
    post: (reservationOrderId: string, body: RefundRequest, options?: ReturnPostOptionalParams) =>
      post(context, reservationOrderId, body, options),
    beginPost: async (
      reservationOrderId: string,
      body: RefundRequest,
      options?: ReturnPostOptionalParams,
    ) => {
      const poller = post(context, reservationOrderId, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPostAndWait: async (
      reservationOrderId: string,
      body: RefundRequest,
      options?: ReturnPostOptionalParams,
    ) => {
      return await post(context, reservationOrderId, body, options);
    },
  };
}

export function _getReturnOperations(context: AzureReservationAPIContext): ReturnOperations {
  return {
    ..._getReturn(context),
  };
}
