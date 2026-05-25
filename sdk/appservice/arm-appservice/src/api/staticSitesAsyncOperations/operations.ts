// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  StaticSitesOperationStatus,
  staticSitesOperationStatusDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StaticSitesAsyncOperationsGetOperationResultOptionalParams,
  StaticSitesAsyncOperationsGetOperationStatusOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getOperationResultSend(
  context: Client,
  location: string,
  operationId: string,
  options: StaticSitesAsyncOperationsGetOperationResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/staticSitesOperationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getOperationResultDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the result of a static site async operation. */
export function getOperationResult(
  context: Client,
  location: string,
  operationId: string,
  options: StaticSitesAsyncOperationsGetOperationResultOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _getOperationResultDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _getOperationResultSend(context, location, operationId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getOperationStatusSend(
  context: Client,
  location: string,
  operationId: string,
  options: StaticSitesAsyncOperationsGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/staticSitesOperationStatuses/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<StaticSitesOperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return staticSitesOperationStatusDeserializer(result.body);
}

/** Gets the status of a static site async operation. */
export async function getOperationStatus(
  context: Client,
  location: string,
  operationId: string,
  options: StaticSitesAsyncOperationsGetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<StaticSitesOperationStatus> {
  const result = await _getOperationStatusSend(context, location, operationId, options);
  return _getOperationStatusDeserialize(result);
}
