// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import { errorResponseDeserializer, Server, serverDeserializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { ServersMigrationCutoverMigrationOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _cutoverMigrationSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersMigrationCutoverMigrationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/cutoverMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _cutoverMigrationDeserialize(result: PathUncheckedResponse): Promise<Server> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverDeserializer(result.body);
}

/** Cutover migration for MySQL import, it will switch source elastic server DNS to flexible server. */
export function cutoverMigration(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersMigrationCutoverMigrationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Server>, Server> {
  return getLongRunningPoller(context, _cutoverMigrationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cutoverMigrationSend(context, resourceGroupName, serverName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-06-01-preview",
  }) as PollerLike<OperationState<Server>, Server>;
}
