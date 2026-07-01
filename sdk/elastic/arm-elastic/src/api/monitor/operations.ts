// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext as Client } from "../index.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  elasticMonitorUpgradeSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { MonitorUpgradeOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _upgradeSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/upgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options?.body ? options?.body : elasticMonitorUpgradeSerializer(options?.body),
  });
}

export async function _upgradeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance. */
export function upgrade(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: MonitorUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _upgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _upgradeSend(context, resourceGroupName, monitorName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-06-01",
  }) as PollerLike<OperationState<void>, void>;
}
