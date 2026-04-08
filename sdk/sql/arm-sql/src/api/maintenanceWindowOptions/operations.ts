// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type { MaintenanceWindowOptions } from "../../models/models.js";
import {
  errorResponseDeserializer,
  maintenanceWindowOptionsDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { MaintenanceWindowOptionsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  maintenanceWindowOptionsName: string,
  options: MaintenanceWindowOptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/maintenanceWindowOptions/current{?api%2Dversion,maintenanceWindowOptionsName}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      maintenanceWindowOptionsName: maintenanceWindowOptionsName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MaintenanceWindowOptions> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return maintenanceWindowOptionsDeserializer(result.body);
}

/** Gets a list of available maintenance windows. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  maintenanceWindowOptionsName: string,
  options: MaintenanceWindowOptionsGetOptionalParams = { requestOptions: {} },
): Promise<MaintenanceWindowOptions> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    maintenanceWindowOptionsName,
    options,
  );
  return _getDeserialize(result);
}
