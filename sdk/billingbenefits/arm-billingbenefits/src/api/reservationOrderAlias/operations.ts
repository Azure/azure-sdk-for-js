// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ReservationOrderAliasResponse,
  reservationOrderAliasResponseDeserializer,
  ReservationOrderAliasRequest,
  reservationOrderAliasRequestSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ReservationOrderAliasCreateOptionalParams,
  ReservationOrderAliasGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _createSend(
  context: Client,
  reservationOrderAliasName: string,
  body: ReservationOrderAliasRequest,
  options: ReservationOrderAliasCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/reservationOrderAliases/{reservationOrderAliasName}{?api%2Dversion}",
    {
      reservationOrderAliasName: reservationOrderAliasName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: reservationOrderAliasRequestSerializer(body),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationOrderAliasResponse> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return reservationOrderAliasResponseDeserializer(result.body);
}

/** Create a reservation order alias. */
export function create(
  context: Client,
  reservationOrderAliasName: string,
  body: ReservationOrderAliasRequest,
  options: ReservationOrderAliasCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReservationOrderAliasResponse>, ReservationOrderAliasResponse> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, reservationOrderAliasName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<ReservationOrderAliasResponse>, ReservationOrderAliasResponse>;
}

export function _getSend(
  context: Client,
  reservationOrderAliasName: string,
  options: ReservationOrderAliasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/reservationOrderAliases/{reservationOrderAliasName}{?api%2Dversion}",
    {
      reservationOrderAliasName: reservationOrderAliasName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationOrderAliasResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return reservationOrderAliasResponseDeserializer(result.body);
}

/** Get a reservation order alias. */
export async function get(
  context: Client,
  reservationOrderAliasName: string,
  options: ReservationOrderAliasGetOptionalParams = { requestOptions: {} },
): Promise<ReservationOrderAliasResponse> {
  const result = await _getSend(context, reservationOrderAliasName, options);
  return _getDeserialize(result);
}
