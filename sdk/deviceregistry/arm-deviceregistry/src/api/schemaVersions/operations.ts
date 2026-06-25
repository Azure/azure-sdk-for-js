// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext as Client } from "../index.js";
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
  SchemaVersionsCreateOrReplaceOptionalParams,
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
  schemaRegistryName: string,
  schemaName: string,
  options: SchemaVersionsListBySchemaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaRegistryName: schemaRegistryName,
      schemaName: schemaName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySchemaDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchemaVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _schemaVersionListResultDeserializer(result.body);
}

/** List SchemaVersion resources by Schema */
export function listBySchema(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  options: SchemaVersionsListBySchemaOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SchemaVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySchemaSend(context, resourceGroupName, schemaRegistryName, schemaName, options),
    _listBySchemaDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  schemaVersionName: string,
  options: SchemaVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions/{schemaVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaRegistryName: schemaRegistryName,
      schemaName: schemaName,
      schemaVersionName: schemaVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a SchemaVersion */
export function $delete(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  schemaVersionName: string,
  options: SchemaVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        schemaRegistryName,
        schemaName,
        schemaVersionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  schemaVersionName: string,
  resource: SchemaVersion,
  options: SchemaVersionsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions/{schemaVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaRegistryName: schemaRegistryName,
      schemaName: schemaName,
      schemaVersionName: schemaVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: schemaVersionSerializer(resource),
    });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemaVersion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return schemaVersionDeserializer(result.body);
}

/** Create a SchemaVersion */
export async function createOrReplace(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  schemaVersionName: string,
  resource: SchemaVersion,
  options: SchemaVersionsCreateOrReplaceOptionalParams = { requestOptions: {} },
): Promise<SchemaVersion> {
  const result = await _createOrReplaceSend(
    context,
    resourceGroupName,
    schemaRegistryName,
    schemaName,
    schemaVersionName,
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
  schemaVersionName: string,
  options: SchemaVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions/{schemaVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schemaRegistryName: schemaRegistryName,
      schemaName: schemaName,
      schemaVersionName: schemaVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SchemaVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return schemaVersionDeserializer(result.body);
}

/** Get a SchemaVersion */
export async function get(
  context: Client,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  schemaVersionName: string,
  options: SchemaVersionsGetOptionalParams = { requestOptions: {} },
): Promise<SchemaVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    schemaRegistryName,
    schemaName,
    schemaVersionName,
    options,
  );
  return _getDeserialize(result);
}
