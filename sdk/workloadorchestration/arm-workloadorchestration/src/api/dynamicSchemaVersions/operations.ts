// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DynamicSchemaVersion,
  dynamicSchemaVersionSerializer,
  dynamicSchemaVersionDeserializer,
  _DynamicSchemaVersionListResult,
  _dynamicSchemaVersionListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DynamicSchemaVersionsListByDynamicSchemaOptionalParams,
  DynamicSchemaVersionsDeleteOptionalParams,
  DynamicSchemaVersionsUpdateOptionalParams,
  DynamicSchemaVersionsCreateOrUpdateOptionalParams,
  DynamicSchemaVersionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByDynamicSchemaSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  options: DynamicSchemaVersionsListByDynamicSchemaOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions{?api%2Dversion}",
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

export async function _listByDynamicSchemaDeserialize(
  result: PathUncheckedResponse,
): Promise<_DynamicSchemaVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _dynamicSchemaVersionListResultDeserializer(result.body);
}

/** List by Dynamic Schema */
export function listByDynamicSchema(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  options: DynamicSchemaVersionsListByDynamicSchemaOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DynamicSchemaVersion> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDynamicSchemaSend(context, resourceGroupName, schemaName, dynamicSchemaName, options),
    _listByDynamicSchemaDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  dynamicSchemaVersionName: string,
  options: DynamicSchemaVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions/{dynamicSchemaVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      dynamicSchemaName: dynamicSchemaName,
      dynamicSchemaVersionName: dynamicSchemaVersionName,
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

/** Delete a Dynamic Schema Version Resource */
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
  dynamicSchemaVersionName: string,
  options: DynamicSchemaVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        schemaName,
        dynamicSchemaName,
        dynamicSchemaVersionName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  dynamicSchemaVersionName: string,
  properties: DynamicSchemaVersion,
  options: DynamicSchemaVersionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions/{dynamicSchemaVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      dynamicSchemaName: dynamicSchemaName,
      dynamicSchemaVersionName: dynamicSchemaVersionName,
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
    body: dynamicSchemaVersionSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DynamicSchemaVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dynamicSchemaVersionDeserializer(result.body);
}

/** update a Dynamic Schema Version Resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  dynamicSchemaVersionName: string,
  properties: DynamicSchemaVersion,
  options: DynamicSchemaVersionsUpdateOptionalParams = { requestOptions: {} },
): Promise<DynamicSchemaVersion> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    schemaName,
    dynamicSchemaName,
    dynamicSchemaVersionName,
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
  dynamicSchemaVersionName: string,
  resource: DynamicSchemaVersion,
  options: DynamicSchemaVersionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions/{dynamicSchemaVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      dynamicSchemaName: dynamicSchemaName,
      dynamicSchemaVersionName: dynamicSchemaVersionName,
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
    body: dynamicSchemaVersionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DynamicSchemaVersion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dynamicSchemaVersionDeserializer(result.body);
}

/** Create or update a Dynamic Schema Version Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  dynamicSchemaVersionName: string,
  resource: DynamicSchemaVersion,
  options: DynamicSchemaVersionsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DynamicSchemaVersion>, DynamicSchemaVersion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        schemaName,
        dynamicSchemaName,
        dynamicSchemaVersionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DynamicSchemaVersion>, DynamicSchemaVersion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  dynamicSchemaVersionName: string,
  options: DynamicSchemaVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/schemas/{schemaName}/dynamicSchemas/{dynamicSchemaName}/versions/{dynamicSchemaVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaName: schemaName,
      dynamicSchemaName: dynamicSchemaName,
      dynamicSchemaVersionName: dynamicSchemaVersionName,
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
): Promise<DynamicSchemaVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return dynamicSchemaVersionDeserializer(result.body);
}

/** Get a Dynamic Schema Version Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  schemaName: string,
  dynamicSchemaName: string,
  dynamicSchemaVersionName: string,
  options: DynamicSchemaVersionsGetOptionalParams = { requestOptions: {} },
): Promise<DynamicSchemaVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    schemaName,
    dynamicSchemaName,
    dynamicSchemaVersionName,
    options,
  );
  return _getDeserialize(result);
}
