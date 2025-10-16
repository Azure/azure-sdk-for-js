// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MongoClusterManagementContext as Client } from "../index.js";
import type { User, _UserListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  userSerializer,
  userDeserializer,
  _userListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  UsersListByMongoClusterOptionalParams,
  UsersDeleteOptionalParams,
  UsersCreateOrUpdateOptionalParams,
  UsersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByMongoClusterSend(
  context: Client,
  resourceGroupName: string,
  mongoClusterName: string,
  options: UsersListByMongoClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/users{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      mongoClusterName: mongoClusterName,
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

export async function _listByMongoClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_UserListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _userListResultDeserializer(result.body);
}

/** List all the users on a mongo cluster. */
export function listByMongoCluster(
  context: Client,
  resourceGroupName: string,
  mongoClusterName: string,
  options: UsersListByMongoClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<User> {
  return buildPagedAsyncIterator(
    context,
    () => _listByMongoClusterSend(context, resourceGroupName, mongoClusterName, options),
    _listByMongoClusterDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  mongoClusterName: string,
  userName: string,
  options: UsersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/users/{userName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      mongoClusterName: mongoClusterName,
      userName: userName,
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

/** Deletes a mongo cluster user. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  mongoClusterName: string,
  userName: string,
  options: UsersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, mongoClusterName, userName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  mongoClusterName: string,
  userName: string,
  resource: User,
  options: UsersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/users/{userName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      mongoClusterName: mongoClusterName,
      userName: userName,
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
    body: userSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<User> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return userDeserializer(result.body);
}

/** Creates a new user or updates an existing user on a mongo cluster. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  mongoClusterName: string,
  userName: string,
  resource: User,
  options: UsersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<User>, User> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        mongoClusterName,
        userName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<User>, User>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  mongoClusterName: string,
  userName: string,
  options: UsersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/mongoClusters/{mongoClusterName}/users/{userName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      mongoClusterName: mongoClusterName,
      userName: userName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<User> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return userDeserializer(result.body);
}

/** Gets the defintion of a Mongo cluster user. */
export async function get(
  context: Client,
  resourceGroupName: string,
  mongoClusterName: string,
  userName: string,
  options: UsersGetOptionalParams = { requestOptions: {} },
): Promise<User> {
  const result = await _getSend(context, resourceGroupName, mongoClusterName, userName, options);
  return _getDeserialize(result);
}
