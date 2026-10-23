// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ClustersUnlinkMigratedEndpointOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _unlinkMigratedEndpointSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersUnlinkMigratedEndpointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/unlinkMigratedEndpoint{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _unlinkMigratedEndpointDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Unlinks the migrated endpoint from an Azure Managed Redis cluster that was migrated from Azure Cache for Redis Enterprise, removing the source cache endpoint that was redirected to this cluster during migration. */
export function unlinkMigratedEndpoint(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersUnlinkMigratedEndpointOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _unlinkMigratedEndpointDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _unlinkMigratedEndpointSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}
