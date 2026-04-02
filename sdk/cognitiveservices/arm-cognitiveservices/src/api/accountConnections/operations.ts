// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  ConnectionPropertiesV2BasicResource,
  _ConnectionPropertiesV2BasicResourceArmPaginatedResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  connectionPropertiesV2BasicResourceSerializer,
  connectionPropertiesV2BasicResourceDeserializer,
  connectionUpdateContentSerializer,
  _connectionPropertiesV2BasicResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccountConnectionsListOptionalParams,
  AccountConnectionsDeleteOptionalParams,
  AccountConnectionsUpdateOptionalParams,
  AccountConnectionsCreateOptionalParams,
  AccountConnectionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AccountConnectionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/connections{?api%2Dversion,target,category,includeAll}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
      target: options?.target,
      category: options?.category,
      includeAll: options?.includeAll,
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
): Promise<_ConnectionPropertiesV2BasicResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _connectionPropertiesV2BasicResourceArmPaginatedResultDeserializer(result.body);
}

/** Lists all the available  Cognitive Services account connections under the specified account. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AccountConnectionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectionPropertiesV2BasicResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectionName: string,
  options: AccountConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete Cognitive Services account connection by name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectionName: string,
  options: AccountConnectionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    accountName,
    connectionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectionName: string,
  options: AccountConnectionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["connection"]
      ? options["connection"]
      : connectionUpdateContentSerializer(options["connection"]),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionPropertiesV2BasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectionPropertiesV2BasicResourceDeserializer(result.body);
}

/** Update Cognitive Services account connection under the specified account. */
export async function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectionName: string,
  options: AccountConnectionsUpdateOptionalParams = { requestOptions: {} },
): Promise<ConnectionPropertiesV2BasicResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    accountName,
    connectionName,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectionName: string,
  options: AccountConnectionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["connection"]
      ? options["connection"]
      : connectionPropertiesV2BasicResourceSerializer(options["connection"]),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionPropertiesV2BasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectionPropertiesV2BasicResourceDeserializer(result.body);
}

/** Create or update Cognitive Services account connection under the specified account. */
export async function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectionName: string,
  options: AccountConnectionsCreateOptionalParams = { requestOptions: {} },
): Promise<ConnectionPropertiesV2BasicResource> {
  const result = await _createSend(
    context,
    resourceGroupName,
    accountName,
    connectionName,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectionName: string,
  options: AccountConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
): Promise<ConnectionPropertiesV2BasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return connectionPropertiesV2BasicResourceDeserializer(result.body);
}

/** Lists Cognitive Services account connection by name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  connectionName: string,
  options: AccountConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<ConnectionPropertiesV2BasicResource> {
  const result = await _getSend(context, resourceGroupName, accountName, connectionName, options);
  return _getDeserialize(result);
}
