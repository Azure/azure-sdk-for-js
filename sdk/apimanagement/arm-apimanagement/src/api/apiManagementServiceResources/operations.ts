// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { ConnectivityCheckRequest, ConnectivityCheckResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  connectivityCheckRequestSerializer,
  connectivityCheckResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ApiManagementServiceResourcesPerformConnectivityCheckAsyncOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _performConnectivityCheckAsyncSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  connectivityCheckRequestParams: ConnectivityCheckRequest,
  options: ApiManagementServiceResourcesPerformConnectivityCheckAsyncOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/connectivityCheck{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: connectivityCheckRequestSerializer(connectivityCheckRequestParams),
  });
}

export async function _performConnectivityCheckAsyncDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectivityCheckResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectivityCheckResponseDeserializer(result.body);
}

/** Performs a connectivity check between the API Management service and a given destination, and returns metrics for the connection, as well as errors encountered while trying to establish it. */
export function performConnectivityCheckAsync(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  connectivityCheckRequestParams: ConnectivityCheckRequest,
  options: ApiManagementServiceResourcesPerformConnectivityCheckAsyncOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ConnectivityCheckResponse>, ConnectivityCheckResponse> {
  return getLongRunningPoller(
    context,
    _performConnectivityCheckAsyncDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _performConnectivityCheckAsyncSend(
          context,
          resourceGroupName,
          serviceName,
          connectivityCheckRequestParams,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  ) as PollerLike<OperationState<ConnectivityCheckResponse>, ConnectivityCheckResponse>;
}
