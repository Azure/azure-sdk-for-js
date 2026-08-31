// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PowerPlatformContext as Client } from "../index.js";
import type {
  PrivateEndpointConnection,
  _PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateEndpointConnectionSerializer,
  privateEndpointConnectionDeserializer,
  _privateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateEndpointConnectionsListByEnterprisePolicyOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByEnterprisePolicySend(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  options: PrivateEndpointConnectionsListByEnterprisePolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerPlatform/enterprisePolicies/{enterprisePolicyName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enterprisePolicyName: enterprisePolicyName,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
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

export async function _listByEnterprisePolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _privateEndpointConnectionListResultDeserializer(result.body);
}

/** List all private endpoint connections on an EnterprisePolicy. */
export function listByEnterprisePolicy(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  options: PrivateEndpointConnectionsListByEnterprisePolicyOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEnterprisePolicySend(context, resourceGroupName, enterprisePolicyName, options),
    _listByEnterprisePolicyDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2020-10-30-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerPlatform/enterprisePolicies/{enterprisePolicyName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enterprisePolicyName: enterprisePolicyName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a private endpoint connection with a given name. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    enterprisePolicyName,
    privateEndpointConnectionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  privateEndpointConnectionName: string,
  parameters: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerPlatform/enterprisePolicies/{enterprisePolicyName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enterprisePolicyName: enterprisePolicyName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateEndpointConnectionSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Approve or reject a private endpoint connection with a given name. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  privateEndpointConnectionName: string,
  parameters: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    enterprisePolicyName,
    privateEndpointConnectionName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PowerPlatform/enterprisePolicies/{enterprisePolicyName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      enterprisePolicyName: enterprisePolicyName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2020-10-30-preview",
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
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Gets a private endpoint connection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  enterprisePolicyName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    enterprisePolicyName,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
