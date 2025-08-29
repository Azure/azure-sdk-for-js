// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  DynamicSchema,
  dynamicSchemaSerializer,
  dynamicSchemaDeserializer,
  errorResponseDeserializer,
  _DynamicSchemaListResult,
  _dynamicSchemaListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DynamicSchemasListBySchemaOptionalParams,
  DynamicSchemasDeleteOptionalParams,
  DynamicSchemasUpdateOptionalParams,
  DynamicSchemasCreateOrUpdateOptionalParams,
  DynamicSchemasGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySchemaSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  options: DynamicSchemasListBySchemaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas{?api%2Dversion}",
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

export async function _listBySchemaDeserialize(
  result: PathUncheckedResponse,
): Promise<_DynamicSchemaListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dynamicSchemaListResultDeserializer(result.body);
}

/** List by Schema */
export function listBySchema(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  options: DynamicSchemasListBySchemaOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DynamicSchema> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySchemaSend(context, resourceGroupName, schemaName, options),
    _listBySchemaDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  options: DynamicSchemasDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      dynamicSchemaName: dynamicSchemaName,
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

/** Delete a DynamicSchema Resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  options: DynamicSchemasDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, schemaName, dynamicSchemaName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  properties: DynamicSchema,
  options: DynamicSchemasUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      dynamicSchemaName: dynamicSchemaName,
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
    body: dynamicSchemaSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<DynamicSchema> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dynamicSchemaDeserializer(result.body);
}

/** update a DynamicSchema Resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  properties: DynamicSchema,
  options: DynamicSchemasUpdateOptionalParams = { requestOptions: {} },
): Promise<DynamicSchema> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    schemaName,
    dynamicSchemaName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  resource: DynamicSchema,
  options: DynamicSchemasCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      dynamicSchemaName: dynamicSchemaName,
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
    body: dynamicSchemaSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DynamicSchema> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dynamicSchemaDeserializer(result.body);
}

/** Create or update a DynamicSchema Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  resource: DynamicSchema,
  options: DynamicSchemasCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DynamicSchema>, DynamicSchema> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        schemaName,
        dynamicSchemaName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DynamicSchema>, DynamicSchema>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  options: DynamicSchemasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      dynamicSchemaName: dynamicSchemaName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DynamicSchema> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dynamicSchemaDeserializer(result.body);
}

/** Get a DynamicSchema Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  options: DynamicSchemasGetOptionalParams = { requestOptions: {} },
): Promise<DynamicSchema> {
  const result = await _getSend(context, resourceGroupName, schemaName, dynamicSchemaName, options);
  return _getDeserialize(result);
}
