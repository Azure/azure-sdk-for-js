// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type { ServerBackupV2 } from "../../models/models.js";
import {
  errorResponseDeserializer,
  serverBackupV2Serializer,
  serverBackupV2Deserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { LongRunningBackupCreateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _createSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  backupName: string,
  options: LongRunningBackupCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/backupsV2/{backupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      backupName: backupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["parameters"]
      ? options["parameters"]
      : serverBackupV2Serializer(options["parameters"]),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<ServerBackupV2> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return serverBackupV2Deserializer(result.body);
}

/** Create backup for a given server with specified backup name. */
export function create(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  backupName: string,
  options: LongRunningBackupCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerBackupV2>, ServerBackupV2> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, serverName, backupName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ServerBackupV2>, ServerBackupV2>;
}
