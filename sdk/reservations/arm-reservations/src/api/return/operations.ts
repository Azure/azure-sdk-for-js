// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureReservationAPIContext as Client } from "../index.js";
import type { ReservationOrderResponse, RefundRequest } from "../../models/reservations/models.js";
import {
  errorDeserializer,
  reservationOrderResponseDeserializer,
  refundRequestSerializer,
} from "../../models/reservations/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ReturnPostOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _postSend(
  context: Client,
  reservationOrderId: string,
  body: RefundRequest,
  options: ReturnPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/return{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      "api%2Dversion": "2022-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: refundRequestSerializer(body),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationOrderResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return reservationOrderResponseDeserializer(result.body);
}

/** Return a reservation and get refund information. */
export function post(
  context: Client,
  reservationOrderId: string,
  body: RefundRequest,
  options: ReturnPostOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReservationOrderResponse>, ReservationOrderResponse> {
  return getLongRunningPoller(context, _postDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _postSend(context, reservationOrderId, body, options),
    resourceLocationConfig: "location",
    apiVersion: "2022-11-01",
  }) as PollerLike<OperationState<ReservationOrderResponse>, ReservationOrderResponse>;
}
