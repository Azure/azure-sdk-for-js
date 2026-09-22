// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureReservationAPIContext as Client } from "../index.js";
import type {
  CalculateExchangeRequest,
  CalculateExchangeOperationResultResponse,
} from "../../models/reservations/models.js";
import {
  errorDeserializer,
  calculateExchangeRequestSerializer,
  calculateExchangeOperationResultResponseDeserializer,
} from "../../models/reservations/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { CalculateExchangePostOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _postSend(
  context: Client,
  body: CalculateExchangeRequest,
  options: CalculateExchangePostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/calculateExchange{?api%2Dversion}",
    {
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
    body: calculateExchangeRequestSerializer(body),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<CalculateExchangeOperationResultResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return calculateExchangeOperationResultResponseDeserializer(result.body);
}

/** Calculates price for exchanging `Reservations` if there are no policy errors. */
export function post(
  context: Client,
  body: CalculateExchangeRequest,
  options: CalculateExchangePostOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CalculateExchangeOperationResultResponse>,
  CalculateExchangeOperationResultResponse
> {
  return getLongRunningPoller(context, _postDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _postSend(context, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2022-11-01",
  }) as PollerLike<
    OperationState<CalculateExchangeOperationResultResponse>,
    CalculateExchangeOperationResultResponse
  >;
}
