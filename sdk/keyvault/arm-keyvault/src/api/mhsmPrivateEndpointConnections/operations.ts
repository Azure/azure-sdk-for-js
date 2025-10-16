// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext as Client } from "../index.js";
import type {
  MhsmPrivateEndpointConnection,
  _MhsmPrivateEndpointConnectionsListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  managedHsmErrorDeserializer,
  mhsmPrivateEndpointConnectionSerializer,
  mhsmPrivateEndpointConnectionDeserializer,
  _mhsmPrivateEndpointConnectionsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MhsmPrivateEndpointConnectionsListByResourceOptionalParams,
  MhsmPrivateEndpointConnectionsDeleteOptionalParams,
  MhsmPrivateEndpointConnectionsPutOptionalParams,
  MhsmPrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: MhsmPrivateEndpointConnectionsListByResourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_MhsmPrivateEndpointConnectionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return _mhsmPrivateEndpointConnectionsListResultDeserializer(result.body);
}

/** The List operation gets information about the private endpoint connections associated with the managed HSM Pool. */
export function listByResource(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: MhsmPrivateEndpointConnectionsListByResourceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<MhsmPrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceSend(context, resourceGroupName, name, options),
    _listByResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: MhsmPrivateEndpointConnectionsDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<MhsmPrivateEndpointConnection> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return mhsmPrivateEndpointConnectionDeserializer(result.body);
}

/** Deletes the specified private endpoint connection associated with the managed hsm pool. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: MhsmPrivateEndpointConnectionsDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<MhsmPrivateEndpointConnection>, MhsmPrivateEndpointConnection> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, name, privateEndpointConnectionName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<MhsmPrivateEndpointConnection>, MhsmPrivateEndpointConnection>;
}

export function _putSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  properties: MhsmPrivateEndpointConnection,
  options: MhsmPrivateEndpointConnectionsPutOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
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
    body: mhsmPrivateEndpointConnectionSerializer(properties),
  });
}

export async function _putDeserialize(
  result: PathUncheckedResponse,
): Promise<MhsmPrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return mhsmPrivateEndpointConnectionDeserializer(result.body);
}

/** Updates the specified private endpoint connection associated with the managed hsm pool. */
export async function put(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  properties: MhsmPrivateEndpointConnection,
  options: MhsmPrivateEndpointConnectionsPutOptionalParams = {
    requestOptions: {},
  },
): Promise<MhsmPrivateEndpointConnection> {
  const result = await _putSend(
    context,
    resourceGroupName,
    name,
    privateEndpointConnectionName,
    properties,
    options,
  );
  return _putDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: MhsmPrivateEndpointConnectionsGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MhsmPrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return mhsmPrivateEndpointConnectionDeserializer(result.body);
}

/** Gets the specified private endpoint connection associated with the managed HSM Pool. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  privateEndpointConnectionName: string,
  options: MhsmPrivateEndpointConnectionsGetOptionalParams = {
    requestOptions: {},
  },
): Promise<MhsmPrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    name,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
