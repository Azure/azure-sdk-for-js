// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeviceRegistryManagementContext as Client,
  SchemaVersionsCreateOrReplaceOptionalParams,
  SchemaVersionsDeleteOptionalParams,
  SchemaVersionsGetOptionalParams,
  SchemaVersionsListBySchemaOptionalParams,
} from "../index.js";
import {
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
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _schemaVersionsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  schemaVersionName: string,
  options: SchemaVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions/{schemaVersionName}",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
      schemaName,
      schemaVersionName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _schemaVersionsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemaVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return schemaVersionDeserializer(result.body);
}

/** Get a SchemaVersion */
export async function schemaVersionsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  schemaVersionName: string,
  options: SchemaVersionsGetOptionalParams = { requestOptions: {} },
): Promise<SchemaVersion> {
  const result = await _schemaVersionsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    schemaRegistryName,
    schemaName,
    schemaVersionName,
    options,
  );
  return _schemaVersionsGetDeserialize(result);
}

export function _schemaVersionsCreateOrReplaceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  schemaVersionName: string,
  resource: SchemaVersion,
  options: SchemaVersionsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions/{schemaVersionName}",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
      schemaName,
      schemaVersionName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: schemaVersionSerializer(resource),
    });
}

export async function _schemaVersionsCreateOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemaVersion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return schemaVersionDeserializer(result.body);
}

/** Create a SchemaVersion */
export async function schemaVersionsCreateOrReplace(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  schemaVersionName: string,
  resource: SchemaVersion,
  options: SchemaVersionsCreateOrReplaceOptionalParams = { requestOptions: {} },
): Promise<SchemaVersion> {
  const result = await _schemaVersionsCreateOrReplaceSend(
    context,
    subscriptionId,
    resourceGroupName,
    schemaRegistryName,
    schemaName,
    schemaVersionName,
    resource,
    options,
  );
  return _schemaVersionsCreateOrReplaceDeserialize(result);
}

export function _schemaVersionsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  schemaVersionName: string,
  options: SchemaVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions/{schemaVersionName}",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
      schemaName,
      schemaVersionName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _schemaVersionsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a SchemaVersion */
export async function schemaVersionsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  schemaVersionName: string,
  options: SchemaVersionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _schemaVersionsDeleteSend(
    context,
    subscriptionId,
    resourceGroupName,
    schemaRegistryName,
    schemaName,
    schemaVersionName,
    options,
  );
  return _schemaVersionsDeleteDeserialize(result);
}

export function _schemaVersionsListBySchemaSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  options: SchemaVersionsListBySchemaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}/schemaVersions",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
      schemaName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _schemaVersionsListBySchemaDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchemaVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _schemaVersionListResultDeserializer(result.body);
}

/** List SchemaVersion resources by Schema */
export function schemaVersionsListBySchema(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  options: SchemaVersionsListBySchemaOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SchemaVersion> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _schemaVersionsListBySchemaSend(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        schemaName,
        options,
      ),
    _schemaVersionsListBySchemaDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
