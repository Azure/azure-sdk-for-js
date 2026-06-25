// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPIContext as Client } from "../index.js";
import {
  errorDeserializer,
  CalculateRefundRequest,
  calculateRefundRequestSerializer,
  CalculateRefundResponse,
  calculateRefundResponseDeserializer,
} from "../../models/reservations/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { CalculateRefundPostOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  reservationOrderId: string,
  body: CalculateRefundRequest,
  options: CalculateRefundPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/calculateRefund{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      "api%2Dversion": "2022-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: calculateRefundRequestSerializer(body),
    });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<CalculateRefundResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return calculateRefundResponseDeserializer(result.body);
}

/** Calculate price for returning `Reservations` if there are no policy errors. */
export async function post(
  context: Client,
  reservationOrderId: string,
  body: CalculateRefundRequest,
  options: CalculateRefundPostOptionalParams = { requestOptions: {} },
): Promise<CalculateRefundResponse> {
  const result = await _postSend(context, reservationOrderId, body, options);
  return _postDeserialize(result);
}
