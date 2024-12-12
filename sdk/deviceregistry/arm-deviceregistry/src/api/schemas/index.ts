// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeviceRegistryManagementContext as Client,
  SchemasCreateOrReplaceOptionalParams,
  SchemasDeleteOptionalParams,
  SchemasGetOptionalParams,
  SchemasListBySchemaRegistryOptionalParams,
} from "../index.js";
import {
  Schema,
  schemaSerializer,
  schemaDeserializer,
  _SchemaListResult,
  _schemaListResultDeserializer,
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

export function _schemasGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  options: SchemasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
      schemaName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _schemasGetDeserialize(
  result: PathUncheckedResponse,
): Promise<Schema> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return schemaDeserializer(result.body);
}

/** Get a Schema */
export async function schemasGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  options: SchemasGetOptionalParams = { requestOptions: {} },
): Promise<Schema> {
  const result = await _schemasGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    schemaRegistryName,
    schemaName,
    options,
  );
  return _schemasGetDeserialize(result);
}

export function _schemasCreateOrReplaceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  resource: Schema,
  options: SchemasCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
      schemaName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: schemaSerializer(resource),
    });
}

export async function _schemasCreateOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<Schema> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return schemaDeserializer(result.body);
}

/** Create a Schema */
export async function schemasCreateOrReplace(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  resource: Schema,
  options: SchemasCreateOrReplaceOptionalParams = { requestOptions: {} },
): Promise<Schema> {
  const result = await _schemasCreateOrReplaceSend(
    context,
    subscriptionId,
    resourceGroupName,
    schemaRegistryName,
    schemaName,
    resource,
    options,
  );
  return _schemasCreateOrReplaceDeserialize(result);
}

export function _schemasDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  options: SchemasDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas/{schemaName}",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
      schemaName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _schemasDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a Schema */
export async function schemasDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  schemaName: string,
  options: SchemasDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _schemasDeleteSend(
    context,
    subscriptionId,
    resourceGroupName,
    schemaRegistryName,
    schemaName,
    options,
  );
  return _schemasDeleteDeserialize(result);
}

export function _schemasListBySchemaRegistrySend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  options: SchemasListBySchemaRegistryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}/schemas",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _schemasListBySchemaRegistryDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchemaListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _schemaListResultDeserializer(result.body);
}

/** List Schema resources by SchemaRegistry */
export function schemasListBySchemaRegistry(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  options: SchemasListBySchemaRegistryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Schema> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _schemasListBySchemaRegistrySend(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        options,
      ),
    _schemasListBySchemaRegistryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
