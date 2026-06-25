// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ConnectivityCheckRequest,
  connectivityCheckRequestSerializer,
  ConnectivityCheckResponse,
  connectivityCheckResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ApiManagementServiceResourcesPerformConnectivityCheckAsyncOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

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
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
      body: connectivityCheckRequestSerializer(connectivityCheckRequestParams),
    });
}

export async function _performConnectivityCheckAsyncDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectivityCheckResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
    ["200", "202", "201"],
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
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  ) as PollerLike<OperationState<ConnectivityCheckResponse>, ConnectivityCheckResponse>;
}
