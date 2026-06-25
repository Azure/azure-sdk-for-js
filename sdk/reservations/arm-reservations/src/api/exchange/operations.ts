// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPIContext as Client } from "../index.js";
import {
  errorDeserializer,
  ExchangeRequest,
  exchangeRequestSerializer,
  ExchangeOperationResultResponse,
  exchangeOperationResultResponseDeserializer,
} from "../../models/reservations/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ExchangePostOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _postSend(
  context: Client,
  body: ExchangeRequest,
  options: ExchangePostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/exchange{?api%2Dversion}",
    {
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
      body: exchangeRequestSerializer(body),
    });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<ExchangeOperationResultResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return exchangeOperationResultResponseDeserializer(result.body);
}

/** Returns one or more `Reservations` in exchange for one or more `Reservation` purchases. */
export function post(
  context: Client,
  body: ExchangeRequest,
  options: ExchangePostOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExchangeOperationResultResponse>, ExchangeOperationResultResponse> {
  return getLongRunningPoller(context, _postDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _postSend(context, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2022-11-01",
  }) as PollerLike<
    OperationState<ExchangeOperationResultResponse>,
    ExchangeOperationResultResponse
  >;
}
