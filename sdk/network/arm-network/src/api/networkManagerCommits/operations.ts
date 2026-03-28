// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { NetworkManagerCommit } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  networkManagerCommitSerializer,
  networkManagerCommitDeserializer,
} from "../../models/microsoft/network/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { NetworkManagerCommitsPostOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _postSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  parameters: NetworkManagerCommit,
  options: NetworkManagerCommitsPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/commit{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkManagerCommitSerializer(parameters),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkManagerCommit> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkManagerCommitDeserializer(result.body);
}

/** Post a Network Manager Commit. */
export function post(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  parameters: NetworkManagerCommit,
  options: NetworkManagerCommitsPostOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkManagerCommit>, NetworkManagerCommit> {
  return getLongRunningPoller(context, _postDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _postSend(context, resourceGroupName, networkManagerName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<NetworkManagerCommit>, NetworkManagerCommit>;
}
