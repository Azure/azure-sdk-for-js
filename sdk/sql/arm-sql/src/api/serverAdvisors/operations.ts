// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { Advisor } from "../../models/models.js";
import {
  errorResponseDeserializer,
  advisorSerializer,
  advisorDeserializer,
  advisorArrayDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServerAdvisorsListByServerOptionalParams,
  ServerAdvisorsUpdateOptionalParams,
  ServerAdvisorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerAdvisorsListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advisors{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "%24expand": options?.expand,
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

export async function _listByServerDeserialize(result: PathUncheckedResponse): Promise<Advisor[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return advisorArrayDeserializer(result.body);
}

/** Gets a list of server advisors. */
export async function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ServerAdvisorsListByServerOptionalParams = { requestOptions: {} },
): Promise<Advisor[]> {
  const result = await _listByServerSend(context, resourceGroupName, serverName, options);
  return _listByServerDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advisorName: string,
  parameters: Advisor,
  options: ServerAdvisorsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advisors/{advisorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      advisorName: advisorName,
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
    body: advisorSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Advisor> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return advisorDeserializer(result.body);
}

/** Updates a server advisor. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advisorName: string,
  parameters: Advisor,
  options: ServerAdvisorsUpdateOptionalParams = { requestOptions: {} },
): Promise<Advisor> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serverName,
    advisorName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advisorName: string,
  options: ServerAdvisorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/advisors/{advisorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      advisorName: advisorName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Advisor> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return advisorDeserializer(result.body);
}

/** Gets a server advisor. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  advisorName: string,
  options: ServerAdvisorsGetOptionalParams = { requestOptions: {} },
): Promise<Advisor> {
  const result = await _getSend(context, resourceGroupName, serverName, advisorName, options);
  return _getDeserialize(result);
}
