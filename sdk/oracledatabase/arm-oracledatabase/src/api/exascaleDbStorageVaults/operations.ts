// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  ExascaleDbStorageVault,
  ExascaleDbStorageVaultTagsUpdate,
  _ExascaleDbStorageVaultListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  exascaleDbStorageVaultSerializer,
  exascaleDbStorageVaultDeserializer,
  exascaleDbStorageVaultTagsUpdateSerializer,
  _exascaleDbStorageVaultListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExascaleDbStorageVaultsListBySubscriptionOptionalParams,
  ExascaleDbStorageVaultsListByResourceGroupOptionalParams,
  ExascaleDbStorageVaultsDeleteOptionalParams,
  ExascaleDbStorageVaultsUpdateOptionalParams,
  ExascaleDbStorageVaultsCreateOptionalParams,
  ExascaleDbStorageVaultsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: ExascaleDbStorageVaultsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/exascaleDbStorageVaults{?api%2Dversion}",
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
): Promise<_ExascaleDbStorageVaultListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _exascaleDbStorageVaultListResultDeserializer(result.body);
}

/** List ExascaleDbStorageVault resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: ExascaleDbStorageVaultsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ExascaleDbStorageVault> {
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
  options: ExascaleDbStorageVaultsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exascaleDbStorageVaults{?api%2Dversion}",
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
): Promise<_ExascaleDbStorageVaultListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _exascaleDbStorageVaultListResultDeserializer(result.body);
}

/** List ExascaleDbStorageVault resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ExascaleDbStorageVaultsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ExascaleDbStorageVault> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  exascaleDbStorageVaultName: string,
  options: ExascaleDbStorageVaultsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exascaleDbStorageVaults/{exascaleDbStorageVaultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exascaleDbStorageVaultName: exascaleDbStorageVaultName,
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

/** Delete a ExascaleDbStorageVault */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  exascaleDbStorageVaultName: string,
  options: ExascaleDbStorageVaultsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, exascaleDbStorageVaultName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  exascaleDbStorageVaultName: string,
  properties: ExascaleDbStorageVaultTagsUpdate,
  options: ExascaleDbStorageVaultsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exascaleDbStorageVaults/{exascaleDbStorageVaultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exascaleDbStorageVaultName: exascaleDbStorageVaultName,
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
    body: exascaleDbStorageVaultTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExascaleDbStorageVault> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return exascaleDbStorageVaultDeserializer(result.body);
}

/** Update a ExascaleDbStorageVault */
export function update(
  context: Client,
  resourceGroupName: string,
  exascaleDbStorageVaultName: string,
  properties: ExascaleDbStorageVaultTagsUpdate,
  options: ExascaleDbStorageVaultsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExascaleDbStorageVault>, ExascaleDbStorageVault> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, exascaleDbStorageVaultName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ExascaleDbStorageVault>, ExascaleDbStorageVault>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  exascaleDbStorageVaultName: string,
  resource: ExascaleDbStorageVault,
  options: ExascaleDbStorageVaultsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exascaleDbStorageVaults/{exascaleDbStorageVaultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exascaleDbStorageVaultName: exascaleDbStorageVaultName,
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
    body: exascaleDbStorageVaultSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ExascaleDbStorageVault> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return exascaleDbStorageVaultDeserializer(result.body);
}

/** Create a ExascaleDbStorageVault */
export function create(
  context: Client,
  resourceGroupName: string,
  exascaleDbStorageVaultName: string,
  resource: ExascaleDbStorageVault,
  options: ExascaleDbStorageVaultsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExascaleDbStorageVault>, ExascaleDbStorageVault> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, exascaleDbStorageVaultName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ExascaleDbStorageVault>, ExascaleDbStorageVault>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  exascaleDbStorageVaultName: string,
  options: ExascaleDbStorageVaultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exascaleDbStorageVaults/{exascaleDbStorageVaultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exascaleDbStorageVaultName: exascaleDbStorageVaultName,
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
): Promise<ExascaleDbStorageVault> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return exascaleDbStorageVaultDeserializer(result.body);
}

/** Get a ExascaleDbStorageVault */
export async function get(
  context: Client,
  resourceGroupName: string,
  exascaleDbStorageVaultName: string,
  options: ExascaleDbStorageVaultsGetOptionalParams = { requestOptions: {} },
): Promise<ExascaleDbStorageVault> {
  const result = await _getSend(context, resourceGroupName, exascaleDbStorageVaultName, options);
  return _getDeserialize(result);
}
