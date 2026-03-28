// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AttestationManagementContext as Client } from "../index.js";
import type {
  PrivateEndpointConnection,
  _PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  privateEndpointConnectionSerializer,
  privateEndpointConnectionDeserializer,
  _privateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  options: PrivateEndpointConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Attestation/attestationProviders/{providerName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
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
): Promise<_PrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _privateEndpointConnectionListResultDeserializer(result.body);
}

/** List all the private endpoint connections associated with the attestation provider. */
export function list(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  options: PrivateEndpointConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, providerName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2021-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Attestation/attestationProviders/{providerName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
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

/** Deletes the specified private endpoint connection associated with the attestation provider. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    providerName,
    privateEndpointConnectionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  privateEndpointConnectionName: string,
  properties: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Attestation/attestationProviders/{providerName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateEndpointConnectionSerializer(properties),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Update the state of specified private endpoint connection associated with the attestation provider. */
export async function create(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  privateEndpointConnectionName: string,
  properties: PrivateEndpointConnection,
  options: PrivateEndpointConnectionsCreateOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _createSend(
    context,
    resourceGroupName,
    providerName,
    privateEndpointConnectionName,
    properties,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Attestation/attestationProviders/{providerName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      providerName: providerName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2021-06-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Gets the specified private endpoint connection associated with the attestation provider. */
export async function get(
  context: Client,
  resourceGroupName: string,
  providerName: string,
  privateEndpointConnectionName: string,
  options: PrivateEndpointConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    providerName,
    privateEndpointConnectionName,
    options,
  );
  return _getDeserialize(result);
}
