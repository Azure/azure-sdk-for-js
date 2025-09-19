// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext as Client } from "../index.js";
import { resourceProviderDefaultErrorResponseDeserializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { DetachTrafficFilterUpdateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: DetachTrafficFilterUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/detachTrafficFilter{?api%2Dversion,rulesetId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion,
      rulesetId: options?.rulesetId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Detach an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities. */
export function update(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: DetachTrafficFilterUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, monitorName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}
