// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type { NetworkManagerConnection } from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  networkManagerConnectionSerializer,
  networkManagerConnectionDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _NetworkManagerConnectionListResult } from "../../models/models.js";
import { _networkManagerConnectionListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagementGroupNetworkManagerConnectionsListOptionalParams,
  ManagementGroupNetworkManagerConnectionsDeleteOptionalParams,
  ManagementGroupNetworkManagerConnectionsCreateOrUpdateOptionalParams,
  ManagementGroupNetworkManagerConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  managementGroupId: string,
  options: ManagementGroupNetworkManagerConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Network/networkManagerConnections{?api%2Dversion,%24top,%24skipToken}",
    {
      managementGroupId: managementGroupId,
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
): Promise<_NetworkManagerConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _networkManagerConnectionListResultDeserializer(result.body);
}

/** List all network manager connections created by this management group. */
export function list(
  context: Client,
  managementGroupId: string,
  options: ManagementGroupNetworkManagerConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkManagerConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, managementGroupId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  managementGroupId: string,
  networkManagerConnectionName: string,
  options: ManagementGroupNetworkManagerConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Network/networkManagerConnections/{networkManagerConnectionName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      networkManagerConnectionName: networkManagerConnectionName,
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

/** Delete specified pending connection created by this management group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  managementGroupId: string,
  networkManagerConnectionName: string,
  options: ManagementGroupNetworkManagerConnectionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    managementGroupId,
    networkManagerConnectionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  managementGroupId: string,
  networkManagerConnectionName: string,
  parameters: NetworkManagerConnection,
  options: ManagementGroupNetworkManagerConnectionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Network/networkManagerConnections/{networkManagerConnectionName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      networkManagerConnectionName: networkManagerConnectionName,
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
    body: networkManagerConnectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkManagerConnection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkManagerConnectionDeserializer(result.body);
}

/** Create a network manager connection on this management group. */
export async function createOrUpdate(
  context: Client,
  managementGroupId: string,
  networkManagerConnectionName: string,
  parameters: NetworkManagerConnection,
  options: ManagementGroupNetworkManagerConnectionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkManagerConnection> {
  const result = await _createOrUpdateSend(
    context,
    managementGroupId,
    networkManagerConnectionName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  managementGroupId: string,
  networkManagerConnectionName: string,
  options: ManagementGroupNetworkManagerConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Network/networkManagerConnections/{networkManagerConnectionName}{?api%2Dversion}",
    {
      managementGroupId: managementGroupId,
      networkManagerConnectionName: networkManagerConnectionName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkManagerConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return networkManagerConnectionDeserializer(result.body);
}

/** Get a specified connection created by this management group. */
export async function get(
  context: Client,
  managementGroupId: string,
  networkManagerConnectionName: string,
  options: ManagementGroupNetworkManagerConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<NetworkManagerConnection> {
  const result = await _getSend(context, managementGroupId, networkManagerConnectionName, options);
  return _getDeserialize(result);
}
