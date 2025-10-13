// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type { Server } from "../../models/models.js";
import { errorResponseDeserializer, serverDeserializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ServersMigrationCutoverMigrationOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _cutoverMigrationSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersMigrationCutoverMigrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/cutoverMigration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _cutoverMigrationDeserialize(result: PathUncheckedResponse): Promise<Server> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serverDeserializer(result.body);
}

/** Cutover migration for MySQL import, it will switch source elastic server DNS to flexible server. */
export function cutoverMigration(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServersMigrationCutoverMigrationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<Server>, Server> {
  return getLongRunningPoller(context, _cutoverMigrationDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cutoverMigrationSend(context, resourceGroupName, serverName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Server>, Server>;
}
