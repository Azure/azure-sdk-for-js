// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { ScopeConnection } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  scopeConnectionSerializer,
  scopeConnectionDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _ScopeConnectionListResult } from "../../models/models.js";
import { _scopeConnectionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScopeConnectionsListOptionalParams,
  ScopeConnectionsDeleteOptionalParams,
  ScopeConnectionsCreateOrUpdateOptionalParams,
  ScopeConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  options: ScopeConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/scopeConnections{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      "api%2Dversion": "2025-05-01",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ScopeConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _scopeConnectionListResultDeserializer(result.body);
}

/** List all scope connections created by this network manager. */
export function list(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  options: ScopeConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScopeConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, networkManagerName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  scopeConnectionName: string,
  options: ScopeConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/scopeConnections/{scopeConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      scopeConnectionName: scopeConnectionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete the pending scope connection created by this network manager. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  scopeConnectionName: string,
  options: ScopeConnectionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    networkManagerName,
    scopeConnectionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  scopeConnectionName: string,
  parameters: ScopeConnection,
  options: ScopeConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/scopeConnections/{scopeConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      scopeConnectionName: scopeConnectionName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: scopeConnectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ScopeConnection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return scopeConnectionDeserializer(result.body);
}

/** Creates or updates scope connection from Network Manager */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  scopeConnectionName: string,
  parameters: ScopeConnection,
  options: ScopeConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ScopeConnection> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    networkManagerName,
    scopeConnectionName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  scopeConnectionName: string,
  options: ScopeConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/scopeConnections/{scopeConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkManagerName: networkManagerName,
      scopeConnectionName: scopeConnectionName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ScopeConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return scopeConnectionDeserializer(result.body);
}

/** Get specified scope connection created by this Network Manager. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkManagerName: string,
  scopeConnectionName: string,
  options: ScopeConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<ScopeConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    networkManagerName,
    scopeConnectionName,
    options,
  );
  return _getDeserialize(result);
}
