// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPIContext } from "../../api/azureReservationAPIContext.js";
import { post } from "../../api/calculateExchange/operations.js";
import { CalculateExchangePostOptionalParams } from "../../api/calculateExchange/options.js";
import {
  CalculateExchangeRequest,
  CalculateExchangeOperationResultResponse,
} from "../../models/reservations/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CalculateExchange operations. */
export interface CalculateExchangeOperations {
  /** Calculates price for exchanging `Reservations` if there are no policy errors. */
  post: (
    body: CalculateExchangeRequest,
    options?: CalculateExchangePostOptionalParams,
  ) => PollerLike<
    OperationState<CalculateExchangeOperationResultResponse>,
    CalculateExchangeOperationResultResponse
  >;
  /** @deprecated use post instead */
  beginPost: (
    body: CalculateExchangeRequest,
    options?: CalculateExchangePostOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CalculateExchangeOperationResultResponse>,
      CalculateExchangeOperationResultResponse
    >
  >;
  /** @deprecated use post instead */
  beginPostAndWait: (
    body: CalculateExchangeRequest,
    options?: CalculateExchangePostOptionalParams,
  ) => Promise<CalculateExchangeOperationResultResponse>;
}

function _getCalculateExchange(context: AzureReservationAPIContext) {
  return {
    post: (body: CalculateExchangeRequest, options?: CalculateExchangePostOptionalParams) =>
      post(context, body, options),
    beginPost: async (
      body: CalculateExchangeRequest,
      options?: CalculateExchangePostOptionalParams,
    ) => {
      const poller = post(context, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPostAndWait: async (
      body: CalculateExchangeRequest,
      options?: CalculateExchangePostOptionalParams,
    ) => {
      return await post(context, body, options);
    },
  };
}

export function _getCalculateExchangeOperations(
  context: AzureReservationAPIContext,
): CalculateExchangeOperations {
  return {
    ..._getCalculateExchange(context),
  };
}
