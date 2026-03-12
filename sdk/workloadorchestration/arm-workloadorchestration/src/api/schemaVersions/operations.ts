// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SchemaVersion,
  schemaVersionSerializer,
  schemaVersionDeserializer,
  _SchemaVersionListResult,
  _schemaVersionListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SchemaVersionsListBySchemaOptionalParams,
  SchemaVersionsDeleteOptionalParams,
  SchemaVersionsUpdateOptionalParams,
  SchemaVersionsCreateOrUpdateOptionalParams,
  SchemaVersionsGetOptionalParams,
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
  options: SchemaVersionsListBySchemaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions{?api%2Dversion}",
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
): Promise<_SchemaVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _schemaVersionListResultDeserializer(result.body);
}

/** List by specified resource group */
export function listBySchema(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  options: SchemaVersionsListBySchemaOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SchemaVersion> {
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
  schemaVersionName: string,
  options: SchemaVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions/{schemaVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      schemaVersionName: schemaVersionName,
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

/** Delete a Schema Version Resource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  schemaVersionName: string,
  options: SchemaVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, schemaName, schemaVersionName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  schemaVersionName: string,
  properties: SchemaVersion,
  options: SchemaVersionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions/{schemaVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      schemaVersionName: schemaVersionName,
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
    body: schemaVersionSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SchemaVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schemaVersionDeserializer(result.body);
}

/** update a Schema Version Resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  schemaVersionName: string,
  properties: SchemaVersion,
  options: SchemaVersionsUpdateOptionalParams = { requestOptions: {} },
): Promise<SchemaVersion> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    schemaName,
    schemaVersionName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  schemaVersionName: string,
  resource: SchemaVersion,
  options: SchemaVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions/{schemaVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      schemaVersionName: schemaVersionName,
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
    body: schemaVersionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemaVersion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schemaVersionDeserializer(result.body);
}

/** Create or update a Schema Version Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  schemaVersionName: string,
  resource: SchemaVersion,
  options: SchemaVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SchemaVersion>, SchemaVersion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        schemaName,
        schemaVersionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SchemaVersion>, SchemaVersion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  schemaVersionName: string,
  options: SchemaVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/versions/{schemaVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      schemaVersionName: schemaVersionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SchemaVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return schemaVersionDeserializer(result.body);
}

/** Get a Schema Version Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  schemaVersionName: string,
  options: SchemaVersionsGetOptionalParams = { requestOptions: {} },
): Promise<SchemaVersion> {
  const result = await _getSend(context, resourceGroupName, schemaName, schemaVersionName, options);
  return _getDeserialize(result);
}
