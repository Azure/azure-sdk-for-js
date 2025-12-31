// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageDiscoveryContext as Client } from "../index.js";
import type {
  StorageDiscoveryWorkspace,
  StorageDiscoveryWorkspaceUpdate,
  _StorageDiscoveryWorkspaceListResult,
} from "../../models/models.js";
import {
  storageDiscoveryWorkspaceSerializer,
  storageDiscoveryWorkspaceDeserializer,
  errorResponseDeserializer,
  storageDiscoveryWorkspaceUpdateSerializer,
  _storageDiscoveryWorkspaceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  StorageDiscoveryWorkspacesListBySubscriptionOptionalParams,
  StorageDiscoveryWorkspacesListByResourceGroupOptionalParams,
  StorageDiscoveryWorkspacesDeleteOptionalParams,
  StorageDiscoveryWorkspacesUpdateOptionalParams,
  StorageDiscoveryWorkspacesCreateOrUpdateOptionalParams,
  StorageDiscoveryWorkspacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: StorageDiscoveryWorkspacesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces{?api%2Dversion}",
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
): Promise<_StorageDiscoveryWorkspaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _storageDiscoveryWorkspaceListResultDeserializer(result.body);
}

/** List StorageDiscoveryWorkspace resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: StorageDiscoveryWorkspacesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StorageDiscoveryWorkspace> {
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
  options: StorageDiscoveryWorkspacesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces{?api%2Dversion}",
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
): Promise<_StorageDiscoveryWorkspaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _storageDiscoveryWorkspaceListResultDeserializer(result.body);
}

/** List StorageDiscoveryWorkspace resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: StorageDiscoveryWorkspacesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<StorageDiscoveryWorkspace> {
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
  storageDiscoveryWorkspaceName: string,
  options: StorageDiscoveryWorkspacesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageDiscoveryWorkspaceName: storageDiscoveryWorkspaceName,
      "api%2Dversion": context.apiVersion,
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

/** Delete a StorageDiscoveryWorkspace */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  storageDiscoveryWorkspaceName: string,
  options: StorageDiscoveryWorkspacesDeleteOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    storageDiscoveryWorkspaceName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  storageDiscoveryWorkspaceName: string,
  properties: StorageDiscoveryWorkspaceUpdate,
  options: StorageDiscoveryWorkspacesUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageDiscoveryWorkspaceName: storageDiscoveryWorkspaceName,
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
    body: storageDiscoveryWorkspaceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageDiscoveryWorkspace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return storageDiscoveryWorkspaceDeserializer(result.body);
}

/** Update a StorageDiscoveryWorkspace */
export async function update(
  context: Client,
  resourceGroupName: string,
  storageDiscoveryWorkspaceName: string,
  properties: StorageDiscoveryWorkspaceUpdate,
  options: StorageDiscoveryWorkspacesUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<StorageDiscoveryWorkspace> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    storageDiscoveryWorkspaceName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  storageDiscoveryWorkspaceName: string,
  resource: StorageDiscoveryWorkspace,
  options: StorageDiscoveryWorkspacesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageDiscoveryWorkspaceName: storageDiscoveryWorkspaceName,
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
    body: storageDiscoveryWorkspaceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StorageDiscoveryWorkspace> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return storageDiscoveryWorkspaceDeserializer(result.body);
}

/** Create a StorageDiscoveryWorkspace */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  storageDiscoveryWorkspaceName: string,
  resource: StorageDiscoveryWorkspace,
  options: StorageDiscoveryWorkspacesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<StorageDiscoveryWorkspace> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    storageDiscoveryWorkspaceName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageDiscoveryWorkspaceName: string,
  options: StorageDiscoveryWorkspacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageDiscovery/storageDiscoveryWorkspaces/{storageDiscoveryWorkspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageDiscoveryWorkspaceName: storageDiscoveryWorkspaceName,
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
): Promise<StorageDiscoveryWorkspace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return storageDiscoveryWorkspaceDeserializer(result.body);
}

/** Get a StorageDiscoveryWorkspace */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageDiscoveryWorkspaceName: string,
  options: StorageDiscoveryWorkspacesGetOptionalParams = { requestOptions: {} },
): Promise<StorageDiscoveryWorkspace> {
  const result = await _getSend(context, resourceGroupName, storageDiscoveryWorkspaceName, options);
  return _getDeserialize(result);
}
