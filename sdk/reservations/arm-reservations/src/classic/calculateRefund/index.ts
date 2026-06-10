// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureReservationAPIContext } from "../../api/azureReservationAPIContext.js";
import { post } from "../../api/calculateRefund/operations.js";
import type { CalculateRefundPostOptionalParams } from "../../api/calculateRefund/options.js";
import type {
  CalculateRefundRequest,
  CalculateRefundResponse,
} from "../../models/reservations/models.js";

/** Interface representing a CalculateRefund operations. */
export interface CalculateRefundOperations {
  /** Calculate price for returning `Reservations` if there are no policy errors. */
  post: (
    reservationOrderId: string,
    body: CalculateRefundRequest,
    options?: CalculateRefundPostOptionalParams,
  ) => Promise<CalculateRefundResponse>;
}

function _getCalculateRefund(context: AzureReservationAPIContext) {
  return {
    post: (
      reservationOrderId: string,
      body: CalculateRefundRequest,
      options?: CalculateRefundPostOptionalParams,
    ) => post(context, reservationOrderId, body, options),
  };
}

export function _getCalculateRefundOperations(
  context: AzureReservationAPIContext,
): CalculateRefundOperations {
  return {
    ..._getCalculateRefund(context),
  };
}
