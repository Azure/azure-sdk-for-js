// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type { ServerAutomaticTuning } from "../../models/models.js";
import {
  errorResponseDeserializer,
  serverAutomaticTuningSerializer,
  serverAutomaticTuningDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServerAutomaticTuningUpdateOptionalParams,
  ServerAutomaticTuningGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerAutomaticTuning,
  options: ServerAutomaticTuningUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/automaticTuning/current{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serverAutomaticTuningSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerAutomaticTuning> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverAutomaticTuningDeserializer(result.body);
}

/** Update automatic tuning options on server. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ServerAutomaticTuning,
  options: ServerAutomaticTuningUpdateOptionalParams = { requestOptions: {} },
): Promise<ServerAutomaticTuning> {
  const result = await _updateSend(context, resourceGroupName, serverName, parameters, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerAutomaticTuningGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/automaticTuning/current{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<ServerAutomaticTuning> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return serverAutomaticTuningDeserializer(result.body);
}

/** Retrieves server automatic tuning options. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerAutomaticTuningGetOptionalParams = { requestOptions: {} },
): Promise<ServerAutomaticTuning> {
  const result = await _getSend(context, resourceGroupName, serverName, options);
  return _getDeserialize(result);
}
