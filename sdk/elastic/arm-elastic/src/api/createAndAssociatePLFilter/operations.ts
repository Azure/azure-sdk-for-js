// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext as Client } from "../index.js";
import { resourceProviderDefaultErrorResponseDeserializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { CreateAndAssociatePLFilterCreateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _createSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: CreateAndAssociatePLFilterCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/createAndAssociatePLFilter{?api%2Dversion,name,privateEndpointGuid,privateEndpointName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion,
      name: options?.name,
      privateEndpointGuid: options?.privateEndpointGuid,
      privateEndpointName: options?.privateEndpointName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Create and associate a PL filter with your Elastic monitor resource to control and manage network traffic. */
export function create(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: CreateAndAssociatePLFilterCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, resourceGroupName, monitorName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}
