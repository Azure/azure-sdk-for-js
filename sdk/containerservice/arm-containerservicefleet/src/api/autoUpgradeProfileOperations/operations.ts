// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  GenerateResponse,
  generateResponseDeserializer,
} from "../../models/models.js";
import { AutoUpgradeProfileOperationsGenerateUpdateRunOptionalParams } from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _generateUpdateRunSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  autoUpgradeProfileName: string,
  options: AutoUpgradeProfileOperationsGenerateUpdateRunOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/autoUpgradeProfiles/{autoUpgradeProfileName}/generateUpdateRun{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      autoUpgradeProfileName: autoUpgradeProfileName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _generateUpdateRunDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateResponse> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return generateResponseDeserializer(result.body);
}

/** A long-running resource action. */
export function generateUpdateRun(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  autoUpgradeProfileName: string,
  options: AutoUpgradeProfileOperationsGenerateUpdateRunOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<GenerateResponse>, GenerateResponse> {
  return getLongRunningPoller(
    context,
    _generateUpdateRunDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _generateUpdateRunSend(
          context,
          resourceGroupName,
          fleetName,
          autoUpgradeProfileName,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<GenerateResponse>, GenerateResponse>;
}
