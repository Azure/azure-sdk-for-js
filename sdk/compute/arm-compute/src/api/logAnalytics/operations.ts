// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  RequestRateByIntervalInput,
  LogAnalyticsOperationResult,
  ThrottledRequestsInput,
} from "../../models/compute/models.js";
import {
  requestRateByIntervalInputSerializer,
  logAnalyticsOperationResultDeserializer,
  throttledRequestsInputSerializer,
} from "../../models/compute/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LogAnalyticsExportThrottledRequestsOptionalParams,
  LogAnalyticsExportRequestRateByIntervalOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _exportThrottledRequestsSend(
  context: Client,
  location: string,
  parameters: ThrottledRequestsInput,
  options: LogAnalyticsExportThrottledRequestsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getThrottledRequests{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: throttledRequestsInputSerializer(parameters),
  });
}

export async function _exportThrottledRequestsDeserialize(
  result: PathUncheckedResponse,
): Promise<LogAnalyticsOperationResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return logAnalyticsOperationResultDeserializer(result.body);
}

/** Export logs that show total throttled Api requests for this subscription in the given time window. */
export function exportThrottledRequests(
  context: Client,
  location: string,
  parameters: ThrottledRequestsInput,
  options: LogAnalyticsExportThrottledRequestsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LogAnalyticsOperationResult>, LogAnalyticsOperationResult> {
  return getLongRunningPoller(context, _exportThrottledRequestsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _exportThrottledRequestsSend(context, location, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-11-01",
  }) as PollerLike<OperationState<LogAnalyticsOperationResult>, LogAnalyticsOperationResult>;
}

export function _exportRequestRateByIntervalSend(
  context: Client,
  location: string,
  parameters: RequestRateByIntervalInput,
  options: LogAnalyticsExportRequestRateByIntervalOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/logAnalytics/apiAccess/getRequestRateByInterval{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: requestRateByIntervalInputSerializer(parameters),
  });
}

export async function _exportRequestRateByIntervalDeserialize(
  result: PathUncheckedResponse,
): Promise<LogAnalyticsOperationResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return logAnalyticsOperationResultDeserializer(result.body);
}

/** Export logs that show Api requests made by this subscription in the given time window to show throttling activities. */
export function exportRequestRateByInterval(
  context: Client,
  location: string,
  parameters: RequestRateByIntervalInput,
  options: LogAnalyticsExportRequestRateByIntervalOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<LogAnalyticsOperationResult>, LogAnalyticsOperationResult> {
  return getLongRunningPoller(
    context,
    _exportRequestRateByIntervalDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _exportRequestRateByIntervalSend(context, location, parameters, options),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: "2025-11-01",
    },
  ) as PollerLike<OperationState<LogAnalyticsOperationResult>, LogAnalyticsOperationResult>;
}
