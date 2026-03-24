// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext as Client } from "../index.js";
import type { ResourceManagementAction } from "../../models/models.js";
import {
  errorResponseDeserializer,
  resourceManagementActionSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ResourceActionsDeleteResourcesOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _deleteResourcesSend(
  context: Client,
  providerNamespace: string,
  resourceActionName: string,
  properties: ResourceManagementAction,
  options: ResourceActionsDeleteResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourceActions/{resourceActionName}/deleteResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceActionName: resourceActionName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: resourceManagementActionSerializer(properties),
  });
}

export async function _deleteResourcesDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes resources. */
export function deleteResources(
  context: Client,
  providerNamespace: string,
  resourceActionName: string,
  properties: ResourceManagementAction,
  options: ResourceActionsDeleteResourcesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteResourcesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteResourcesSend(context, providerNamespace, resourceActionName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-09-01",
  }) as PollerLike<OperationState<void>, void>;
}
