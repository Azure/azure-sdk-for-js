// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotHubContext as Client } from "../index.js";
import type { FailoverInput } from "../../models/models.js";
import { errorDetailsDeserializer, failoverInputSerializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { IotHubManualFailoverOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _manualFailoverSend(
  context: Client,
  iotHubName: string,
  resourceGroupName: string,
  failoverInput: FailoverInput,
  options: IotHubManualFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{iotHubName}/failover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      iotHubName: iotHubName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: failoverInputSerializer(failoverInput),
  });
}

export async function _manualFailoverDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Manually initiate a failover for the IoT Hub to its secondary region. To learn more, see https://aka.ms/manualfailover */
export function manualFailover(
  context: Client,
  iotHubName: string,
  resourceGroupName: string,
  failoverInput: FailoverInput,
  options: IotHubManualFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _manualFailoverDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _manualFailoverSend(context, iotHubName, resourceGroupName, failoverInput, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}
