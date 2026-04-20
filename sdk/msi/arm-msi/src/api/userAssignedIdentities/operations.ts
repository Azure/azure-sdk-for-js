// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedServiceIdentityContext as Client } from "../index.js";
import type {
  Identity,
  IdentityUpdate,
  _UserAssignedIdentitiesListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  identitySerializer,
  identityDeserializer,
  identityUpdateSerializer,
  _userAssignedIdentitiesListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  UserAssignedIdentitiesListBySubscriptionOptionalParams,
  UserAssignedIdentitiesListByResourceGroupOptionalParams,
  UserAssignedIdentitiesDeleteOptionalParams,
  UserAssignedIdentitiesUpdateOptionalParams,
  UserAssignedIdentitiesCreateOrUpdateOptionalParams,
  UserAssignedIdentitiesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: UserAssignedIdentitiesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedIdentity/userAssignedIdentities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_UserAssignedIdentitiesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _userAssignedIdentitiesListResultDeserializer(result.body);
}

/** Lists all the userAssignedIdentities available under the specified subscription. */
export function listBySubscription(
  context: Client,
  options: UserAssignedIdentitiesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Identity> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-31-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: UserAssignedIdentitiesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_UserAssignedIdentitiesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _userAssignedIdentitiesListResultDeserializer(result.body);
}

/** Lists all the userAssignedIdentities available under the specified ResourceGroup. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: UserAssignedIdentitiesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Identity> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-31-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: UserAssignedIdentitiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the identity. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: UserAssignedIdentitiesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, resourceName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: IdentityUpdate,
  options: UserAssignedIdentitiesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: identityUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Identity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return identityDeserializer(result.body);
}

/** Update an identity in the specified subscription and resource group. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: IdentityUpdate,
  options: UserAssignedIdentitiesUpdateOptionalParams = { requestOptions: {} },
): Promise<Identity> {
  const result = await _updateSend(context, resourceGroupName, resourceName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: Identity,
  options: UserAssignedIdentitiesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: identitySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Identity> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return identityDeserializer(result.body);
}

/** Create or update an identity in the specified subscription and resource group. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  parameters: Identity,
  options: UserAssignedIdentitiesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Identity> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    resourceName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: UserAssignedIdentitiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-31-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Identity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return identityDeserializer(result.body);
}

/** Gets the identity. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: UserAssignedIdentitiesGetOptionalParams = { requestOptions: {} },
): Promise<Identity> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
