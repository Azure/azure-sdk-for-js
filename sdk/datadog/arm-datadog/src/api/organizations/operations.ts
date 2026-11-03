// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DatadogMonitorResource,
  datadogMonitorResourceDeserializer,
  resubscribePropertiesSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { OrganizationsResubscribeOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _resubscribeSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: OrganizationsResubscribeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/resubscribe{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.body ? options?.body : resubscribePropertiesSerializer(options?.body),
  });
}

export async function _resubscribeDeserialize(
  result: PathUncheckedResponse,
): Promise<DatadogMonitorResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return datadogMonitorResourceDeserializer(result.body);
}

/** Reinstate integration with your Datadog organization by choosing one of the available subscription plans. */
export function resubscribe(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: OrganizationsResubscribeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource> {
  return getLongRunningPoller(context, _resubscribeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _resubscribeSend(context, resourceGroupName, monitorName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-26-preview",
  }) as PollerLike<OperationState<DatadogMonitorResource>, DatadogMonitorResource>;
}
