// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureReservationAPIContext } from "../../api/azureReservationAPIContext.js";
import { post } from "../../api/exchange/operations.js";
import type { ExchangePostOptionalParams } from "../../api/exchange/options.js";
import type {
  ExchangeRequest,
  ExchangeOperationResultResponse,
} from "../../models/reservations/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Exchange operations. */
export interface ExchangeOperations {
  /** Returns one or more `Reservations` in exchange for one or more `Reservation` purchases. */
  post: (
    body: ExchangeRequest,
    options?: ExchangePostOptionalParams,
  ) => PollerLike<OperationState<ExchangeOperationResultResponse>, ExchangeOperationResultResponse>;
  /** @deprecated use post instead */
  beginPost: (
    body: ExchangeRequest,
    options?: ExchangePostOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ExchangeOperationResultResponse>,
      ExchangeOperationResultResponse
    >
  >;
  /** @deprecated use post instead */
  beginPostAndWait: (
    body: ExchangeRequest,
    options?: ExchangePostOptionalParams,
  ) => Promise<ExchangeOperationResultResponse>;
}

function _getExchange(context: AzureReservationAPIContext) {
  return {
    post: (body: ExchangeRequest, options?: ExchangePostOptionalParams) =>
      post(context, body, options),
    beginPost: async (body: ExchangeRequest, options?: ExchangePostOptionalParams) => {
      const poller = post(context, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPostAndWait: async (body: ExchangeRequest, options?: ExchangePostOptionalParams) => {
      return await post(context, body, options);
    },
  };
}

export function _getExchangeOperations(context: AzureReservationAPIContext): ExchangeOperations {
  return {
    ..._getExchange(context),
  };
}
