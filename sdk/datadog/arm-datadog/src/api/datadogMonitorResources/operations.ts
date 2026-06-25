// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  LatestLinkedSaaSResponse,
  latestLinkedSaaSResponseDeserializer,
  SaaSData,
  saaSDataSerializer,
  DatadogMonitorResource,
  datadogMonitorResourceDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DatadogMonitorResourcesLinkSaaSOptionalParams,
  DatadogMonitorResourcesLatestLinkedSaaSOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _linkSaaSSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  body: SaaSData,
  options: DatadogMonitorResourcesLinkSaaSOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/linkSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
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
      body: saaSDataSerializer(body),
    });
}

export async function _linkSaaSDeserialize(
  result: PathUncheckedResponse,
): Promise<DatadogMonitorResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return datadogMonitorResourceDeserializer(result.body);
}

/** Links a new SaaS to the Datadog organization of the underlying monitor. */
export function linkSaaS(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  body: SaaSData,
  options: DatadogMonitorResourcesLinkSaaSOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource> {
  return getLongRunningPoller(context, _linkSaaSDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _linkSaaSSend(context, resourceGroupName, monitorName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-26-preview",
  }) as PollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource>;
}

export function _latestLinkedSaaSSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: DatadogMonitorResourcesLatestLinkedSaaSOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/latestLinkedSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _latestLinkedSaaSDeserialize(
  result: PathUncheckedResponse,
): Promise<LatestLinkedSaaSResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return latestLinkedSaaSResponseDeserializer(result.body);
}

/** Returns the latest SaaS linked to the Datadog organization of the underlying monitor. */
export async function latestLinkedSaaS(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: DatadogMonitorResourcesLatestLinkedSaaSOptionalParams = { requestOptions: {} },
): Promise<LatestLinkedSaaSResponse> {
  const result = await _latestLinkedSaaSSend(context, resourceGroupName, monitorName, options);
  return _latestLinkedSaaSDeserialize(result);
}
