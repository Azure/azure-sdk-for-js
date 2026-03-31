// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext as Client } from "../index.js";
import type { PurgeParameters } from "../../models/models.js";
import { errorResponseDeserializer, purgeParametersSerializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { EndpointsPurgeContentOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _purgeContentSend(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  contentFilePaths: PurgeParameters,
  options: EndpointsPurgeContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/frontDoors/{frontDoorName}/purge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      frontDoorName: frontDoorName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: purgeParametersSerializer(contentFilePaths),
  });
}

export async function _purgeContentDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Removes a content from Front Door. */
export function purgeContent(
  context: Client,
  resourceGroupName: string,
  frontDoorName: string,
  contentFilePaths: PurgeParameters,
  options: EndpointsPurgeContentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeContentDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _purgeContentSend(context, resourceGroupName, frontDoorName, contentFilePaths, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-11-01",
  }) as PollerLike<OperationState<void>, void>;
}
