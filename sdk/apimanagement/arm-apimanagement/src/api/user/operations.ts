// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  _UserCollection,
  UserContract,
  UserCreateParameters,
  UserUpdateParameters,
  GenerateSsoUrlResult,
  UserTokenParameters,
  UserTokenResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _userCollectionDeserializer,
  userContractDeserializer,
  userCreateParametersSerializer,
  userUpdateParametersSerializer,
  generateSsoUrlResultDeserializer,
  userTokenParametersSerializer,
  userTokenResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  UserGetSharedAccessTokenOptionalParams,
  UserGenerateSsoUrlOptionalParams,
  UserListByServiceOptionalParams,
  UserDeleteOptionalParams,
  UserUpdateOptionalParams,
  UserCreateOrUpdateOptionalParams,
  UserGetEntityTagOptionalParams,
  UserGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getSharedAccessTokenSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  parameters: UserTokenParameters,
  options: UserGetSharedAccessTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}/token{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: userTokenParametersSerializer(parameters),
  });
}

export async function _getSharedAccessTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<UserTokenResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return userTokenResultDeserializer(result.body);
}

/** Gets the Shared Access Authorization Token for the User. */
export async function getSharedAccessToken(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  parameters: UserTokenParameters,
  options: UserGetSharedAccessTokenOptionalParams = { requestOptions: {} },
): Promise<UserTokenResult> {
  const result = await _getSharedAccessTokenSend(
    context,
    resourceGroupName,
    serviceName,
    userId,
    parameters,
    options,
  );
  return _getSharedAccessTokenDeserialize(result);
}

export function _generateSsoUrlSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserGenerateSsoUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}/generateSsoUrl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _generateSsoUrlDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateSsoUrlResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return generateSsoUrlResultDeserializer(result.body);
}

/** Retrieves a redirection URL containing an authentication token for signing a given user into the developer portal. */
export async function generateSsoUrl(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserGenerateSsoUrlOptionalParams = { requestOptions: {} },
): Promise<GenerateSsoUrlResult> {
  const result = await _generateSsoUrlSend(
    context,
    resourceGroupName,
    serviceName,
    userId,
    options,
  );
  return _generateSsoUrlDeserialize(result);
}

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: UserListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users{?api%2Dversion,%24filter,%24top,%24skip,expandGroups}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      expandGroups: options?.expandGroups,
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_UserCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _userCollectionDeserializer(result.body);
}

/** Lists a collection of registered users in the specified service instance. */
export function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: UserListByServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UserContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServiceSend(context, resourceGroupName, serviceName, options),
    _listByServiceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  ifMatch: string,
  options: UserDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}{?api%2Dversion,deleteSubscriptions,notify,appType}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      deleteSubscriptions: options?.deleteSubscriptions,
      notify: options?.notify,
      appType: options?.appType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
  });
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

/** Deletes specific user. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  ifMatch: string,
  options: UserDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, serviceName, userId, ifMatch, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  ifMatch: string,
  parameters: UserUpdateParameters,
  options: UserUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "if-match": ifMatch,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: userUpdateParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<UserContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return userContractDeserializer(result.body);
}

/** Updates the details of the user specified by its identifier. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  ifMatch: string,
  parameters: UserUpdateParameters,
  options: UserUpdateOptionalParams = { requestOptions: {} },
): Promise<UserContract> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serviceName,
    userId,
    ifMatch,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  parameters: UserCreateParameters,
  options: UserCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}{?api%2Dversion,notify}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      notify: options?.notify,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: userCreateParametersSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<UserContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return userContractDeserializer(result.body);
}

/** Creates or Updates a user. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  parameters: UserCreateParameters,
  options: UserCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<UserContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    userId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityTagDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the entity state (Etag) version of the user specified by its identifier. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(context, resourceGroupName, serviceName, userId, options);
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<UserContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return userContractDeserializer(result.body);
}

/** Gets the details of the user specified by its identifier. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserGetOptionalParams = { requestOptions: {} },
): Promise<UserContract> {
  const result = await _getSend(context, resourceGroupName, serviceName, userId, options);
  return _getDeserialize(result);
}
