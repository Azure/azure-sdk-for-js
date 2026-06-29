// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext as Client } from "../index.js";
import { resourceProviderDefaultErrorResponseDeserializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AssociateTrafficFilterAssociateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _associateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: AssociateTrafficFilterAssociateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/associateTrafficFilter{?api%2Dversion,rulesetId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      rulesetId: options?.rulesetId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _associateDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Associate a traffic filter with your Elastic monitor resource to control and manage network traffic. */
export function associate(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: AssociateTrafficFilterAssociateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _associateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _associateSend(context, resourceGroupName, monitorName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-06-01",
  }) as PollerLike<OperationState<void>, void>;
}
