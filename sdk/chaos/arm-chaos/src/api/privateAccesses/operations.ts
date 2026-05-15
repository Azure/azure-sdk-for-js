// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext as Client } from "../index.js";
import type {
  PrivateAccess,
  PrivateEndpointConnection,
  PrivateAccessPatch,
  _PrivateAccessListResult,
  PrivateLinkResourceListResult,
  _PrivateEndpointConnectionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateAccessSerializer,
  privateAccessDeserializer,
  privateEndpointConnectionDeserializer,
  privateAccessPatchSerializer,
  _privateAccessListResultDeserializer,
  privateLinkResourceListResultDeserializer,
  _privateEndpointConnectionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateAccessesListPrivateEndpointConnectionsOptionalParams,
  PrivateAccessesDeleteAPrivateEndpointConnectionOptionalParams,
  PrivateAccessesGetAPrivateEndpointConnectionOptionalParams,
  PrivateAccessesGetPrivateLinkResourcesOptionalParams,
  PrivateAccessesListAllOptionalParams,
  PrivateAccessesListOptionalParams,
  PrivateAccessesDeleteOptionalParams,
  PrivateAccessesUpdateOptionalParams,
  PrivateAccessesCreateOrUpdateOptionalParams,
  PrivateAccessesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listPrivateEndpointConnectionsSend(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  options: PrivateAccessesListPrivateEndpointConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/privateAccesses/{privateAccessName}/privateEndpointConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateAccessName: privateAccessName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _listPrivateEndpointConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateEndpointConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _privateEndpointConnectionListResultDeserializer(result.body);
}

/** List information about private endpoint connections under a private access resource */
export function listPrivateEndpointConnections(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  options: PrivateAccessesListPrivateEndpointConnectionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateEndpointConnection> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listPrivateEndpointConnectionsSend(context, resourceGroupName, privateAccessName, options),
    _listPrivateEndpointConnectionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _deleteAPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  privateEndpointConnectionName: string,
  options: PrivateAccessesDeleteAPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/privateAccesses/{privateAccessName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateAccessName: privateAccessName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a private endpoint connection under a private access resource. */
export function deleteAPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  privateEndpointConnectionName: string,
  options: PrivateAccessesDeleteAPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _deleteAPrivateEndpointConnectionDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _deleteAPrivateEndpointConnectionSend(
          context,
          resourceGroupName,
          privateAccessName,
          privateEndpointConnectionName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _getAPrivateEndpointConnectionSend(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  privateEndpointConnectionName: string,
  options: PrivateAccessesGetAPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/privateAccesses/{privateAccessName}/privateEndpointConnections/{privateEndpointConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateAccessName: privateAccessName,
      privateEndpointConnectionName: privateEndpointConnectionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getAPrivateEndpointConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateEndpointConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateEndpointConnectionDeserializer(result.body);
}

/** Gets information about a private endpoint connection under a private access resource. */
export async function getAPrivateEndpointConnection(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  privateEndpointConnectionName: string,
  options: PrivateAccessesGetAPrivateEndpointConnectionOptionalParams = { requestOptions: {} },
): Promise<PrivateEndpointConnection> {
  const result = await _getAPrivateEndpointConnectionSend(
    context,
    resourceGroupName,
    privateAccessName,
    privateEndpointConnectionName,
    options,
  );
  return _getAPrivateEndpointConnectionDeserialize(result);
}

export function _getPrivateLinkResourcesSend(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  options: PrivateAccessesGetPrivateLinkResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/privateAccesses/{privateAccessName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateAccessName: privateAccessName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getPrivateLinkResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateLinkResourceListResultDeserializer(result.body);
}

/** Gets the private link resources possible under private access resource */
export async function getPrivateLinkResources(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  options: PrivateAccessesGetPrivateLinkResourcesOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResourceListResult> {
  const result = await _getPrivateLinkResourcesSend(
    context,
    resourceGroupName,
    privateAccessName,
    options,
  );
  return _getPrivateLinkResourcesDeserialize(result);
}

export function _listAllSend(
  context: Client,
  options: PrivateAccessesListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/privateAccesses{?api%2Dversion,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      continuationToken: options?.continuationToken,
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_PrivateAccessListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _privateAccessListResultDeserializer(result.body);
}

/** Get a list of private access resources in a subscription. */
export function listAll(
  context: Client,
  options: PrivateAccessesListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateAccess> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: PrivateAccessesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/privateAccesses{?api%2Dversion,continuationToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      continuationToken: options?.continuationToken,
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
): Promise<_PrivateAccessListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _privateAccessListResultDeserializer(result.body);
}

/** Get a list of private access resources in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: PrivateAccessesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateAccess> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  options: PrivateAccessesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/privateAccesses/{privateAccessName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateAccessName: privateAccessName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a private access */
export function $delete(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  options: PrivateAccessesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, privateAccessName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  properties: PrivateAccessPatch,
  options: PrivateAccessesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/privateAccesses/{privateAccessName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateAccessName: privateAccessName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateAccessPatchSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<PrivateAccess> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateAccessDeserializer(result.body);
}

/** Patch a private access tags */
export function update(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  properties: PrivateAccessPatch,
  options: PrivateAccessesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateAccess>, PrivateAccess> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, privateAccessName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<PrivateAccess>, PrivateAccess>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  resource: PrivateAccess,
  options: PrivateAccessesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/privateAccesses/{privateAccessName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateAccessName: privateAccessName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateAccessSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateAccess> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateAccessDeserializer(result.body);
}

/** Create or update a private access */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  resource: PrivateAccess,
  options: PrivateAccessesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateAccess>, PrivateAccess> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, privateAccessName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<PrivateAccess>, PrivateAccess>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  options: PrivateAccessesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Chaos/privateAccesses/{privateAccessName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateAccessName: privateAccessName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PrivateAccess> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateAccessDeserializer(result.body);
}

/** Get a private access resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  privateAccessName: string,
  options: PrivateAccessesGetOptionalParams = { requestOptions: {} },
): Promise<PrivateAccess> {
  const result = await _getSend(context, resourceGroupName, privateAccessName, options);
  return _getDeserialize(result);
}
