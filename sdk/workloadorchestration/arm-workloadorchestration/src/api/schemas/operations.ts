// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Schema,
  schemaSerializer,
  schemaDeserializer,
  SchemaUpdate,
  schemaUpdateSerializer,
  SchemaVersionWithUpdateType,
  schemaVersionWithUpdateTypeSerializer,
  SchemaVersion,
  schemaVersionDeserializer,
  VersionParameter,
  versionParameterSerializer,
  RemoveVersionResponse,
  removeVersionResponseDeserializer,
  _SchemaListResult,
  _schemaListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SchemasListBySubscriptionOptionalParams,
  SchemasListByResourceGroupOptionalParams,
  SchemasRemoveVersionOptionalParams,
  SchemasCreateVersionOptionalParams,
  SchemasDeleteOptionalParams,
  SchemasUpdateOptionalParams,
  SchemasCreateOrUpdateOptionalParams,
  SchemasGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: SchemasListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Edge/schemas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchemaListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _schemaListResultDeserializer(result.body);
}

/** List by subscription */
export function listBySubscription(
  context: Client,
  options: SchemasListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Schema> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SchemasListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchemaListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _schemaListResultDeserializer(result.body);
}

/** List by specified resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SchemasListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Schema> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _removeVersionSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  body: VersionParameter,
  options: SchemasRemoveVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/removeVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: versionParameterSerializer(body),
  });
}

export async function _removeVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<RemoveVersionResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return removeVersionResponseDeserializer(result.body);
}

/** Remove Schema Version Resource */
export async function removeVersion(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  body: VersionParameter,
  options: SchemasRemoveVersionOptionalParams = { requestOptions: {} },
): Promise<RemoveVersionResponse> {
  const result = await _removeVersionSend(context, resourceGroupName, schemaName, body, options);
  return _removeVersionDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  body: SchemaVersionWithUpdateType,
  options: SchemasCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/createVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: schemaVersionWithUpdateTypeSerializer(body),
  });
}

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemaVersion> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schemaVersionDeserializer(result.body);
}

/** Create a Schema Version Resource */
export function createVersion(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  body: SchemaVersionWithUpdateType,
  options: SchemasCreateVersionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SchemaVersion>, SchemaVersion> {
  return getLongRunningPoller(context, _createVersionDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createVersionSend(context, resourceGroupName, schemaName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SchemaVersion>, SchemaVersion>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  options: SchemasDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      "api%2Dversion": context.apiVersion,
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

/** Delete a Schema Resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  options: SchemasDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, schemaName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  properties: SchemaUpdate,
  options: SchemasUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: schemaUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Schema> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schemaDeserializer(result.body);
}

/** update a Schema Resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  properties: SchemaUpdate,
  options: SchemasUpdateOptionalParams = { requestOptions: {} },
): Promise<Schema> {
  const result = await _updateSend(context, resourceGroupName, schemaName, properties, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  resource: Schema,
  options: SchemasCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
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
    body: schemaSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Schema> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schemaDeserializer(result.body);
}

/** Create or update a Schema Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  resource: Schema,
  options: SchemasCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Schema>, Schema> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, schemaName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Schema>, Schema>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  options: SchemasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Schema> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schemaDeserializer(result.body);
}

/** Get a Schema Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  options: SchemasGetOptionalParams = { requestOptions: {} },
): Promise<Schema> {
  const result = await _getSend(context, resourceGroupName, schemaName, options);
  return _getDeserialize(result);
}
