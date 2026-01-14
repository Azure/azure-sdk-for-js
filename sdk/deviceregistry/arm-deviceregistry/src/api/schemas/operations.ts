// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext as Client } from "../index.js";
import type { Schema, _SchemaListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  schemaSerializer,
  schemaDeserializer,
  _schemaListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SchemasListBySchemaRegistryOptionalParams,
  SchemasDeleteOptionalParams,
  SchemasCreateOrReplaceOptionalParams,
  SchemasGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySchemaRegistrySend(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  options: SchemasListBySchemaRegistryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaRegistryName: schemaRegistryName,
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

export async function _listBySchemaRegistryDeserialize(
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

/** List Schema resources by SchemaRegistry */
export function listBySchemaRegistry(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  options: SchemasListBySchemaRegistryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Schema> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySchemaRegistrySend(context, resourceGroupName, schemaRegistryName, options),
    _listBySchemaRegistryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  options: SchemasDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaRegistryName: schemaRegistryName,
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

/** Delete a Schema */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  options: SchemasDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, schemaRegistryName, schemaName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  resource: Schema,
  options: SchemasCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaRegistryName: schemaRegistryName,
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

export async function _createOrReplaceDeserialize(result: PathUncheckedResponse): Promise<Schema> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schemaDeserializer(result.body);
}

/** Create a Schema */
export async function createOrReplace(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  resource: Schema,
  options: SchemasCreateOrReplaceOptionalParams = { requestOptions: {} },
): Promise<Schema> {
  const result = await _createOrReplaceSend(
    context,
    resourceGroupName,
    schemaRegistryName,
    schemaName,
    resource,
    options,
  );
  return _createOrReplaceDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  options: SchemasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaRegistryName: schemaRegistryName,
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

/** Get a Schema */
export async function get(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  options: SchemasGetOptionalParams = { requestOptions: {} },
): Promise<Schema> {
  const result = await _getSend(
    context,
    resourceGroupName,
    schemaRegistryName,
    schemaName,
    options,
  );
  return _getDeserialize(result);
}
