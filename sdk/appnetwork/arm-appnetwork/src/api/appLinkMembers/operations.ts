// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppLinkContext as Client } from "../index.js";
import type {
  AppLinkMember,
  AppLinkMemberUpdate,
  _AppLinkMemberListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  appLinkMemberSerializer,
  appLinkMemberDeserializer,
  appLinkMemberUpdateSerializer,
  _appLinkMemberListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AppLinkMembersListByAppLinkOptionalParams,
  AppLinkMembersDeleteOptionalParams,
  AppLinkMembersUpdateOptionalParams,
  AppLinkMembersCreateOrUpdateOptionalParams,
  AppLinkMembersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByAppLinkSend(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  options: AppLinkMembersListByAppLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppLink/appLinks/{appLinkName}/appLinkMembers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      appLinkName: appLinkName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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

export async function _listByAppLinkDeserialize(
  result: PathUncheckedResponse,
): Promise<_AppLinkMemberListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _appLinkMemberListResultDeserializer(result.body);
}

/** List AppLinkMember resources by AppLink. */
export function listByAppLink(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  options: AppLinkMembersListByAppLinkOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AppLinkMember> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAppLinkSend(context, resourceGroupName, appLinkName, options),
    _listByAppLinkDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-08-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  appLinkMemberName: string,
  options: AppLinkMembersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppLink/appLinks/{appLinkName}/appLinkMembers/{appLinkMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      appLinkName: appLinkName,
      appLinkMemberName: appLinkMemberName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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

/** Delete an AppLinkMember. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  appLinkMemberName: string,
  options: AppLinkMembersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, appLinkName, appLinkMemberName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  appLinkMemberName: string,
  properties: AppLinkMemberUpdate,
  options: AppLinkMembersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppLink/appLinks/{appLinkName}/appLinkMembers/{appLinkMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      appLinkName: appLinkName,
      appLinkMemberName: appLinkMemberName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: appLinkMemberUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AppLinkMember> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return appLinkMemberDeserializer(result.body);
}

/** Update an AppLinkMember. */
export function update(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  appLinkMemberName: string,
  properties: AppLinkMemberUpdate,
  options: AppLinkMembersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AppLinkMember>, AppLinkMember> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, appLinkName, appLinkMemberName, properties, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<AppLinkMember>, AppLinkMember>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  appLinkMemberName: string,
  resource: AppLinkMember,
  options: AppLinkMembersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppLink/appLinks/{appLinkName}/appLinkMembers/{appLinkMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      appLinkName: appLinkName,
      appLinkMemberName: appLinkMemberName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: appLinkMemberSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AppLinkMember> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return appLinkMemberDeserializer(result.body);
}

/** Create an AppLinkMember. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  appLinkMemberName: string,
  resource: AppLinkMember,
  options: AppLinkMembersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AppLinkMember>, AppLinkMember> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        appLinkName,
        appLinkMemberName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01-preview",
  }) as PollerLike<OperationState<AppLinkMember>, AppLinkMember>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  appLinkMemberName: string,
  options: AppLinkMembersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppLink/appLinks/{appLinkName}/appLinkMembers/{appLinkMemberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      appLinkName: appLinkName,
      appLinkMemberName: appLinkMemberName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AppLinkMember> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return appLinkMemberDeserializer(result.body);
}

/** Get an AppLinkMember. */
export async function get(
  context: Client,
  resourceGroupName: string,
  appLinkName: string,
  appLinkMemberName: string,
  options: AppLinkMembersGetOptionalParams = { requestOptions: {} },
): Promise<AppLinkMember> {
  const result = await _getSend(
    context,
    resourceGroupName,
    appLinkName,
    appLinkMemberName,
    options,
  );
  return _getDeserialize(result);
}
