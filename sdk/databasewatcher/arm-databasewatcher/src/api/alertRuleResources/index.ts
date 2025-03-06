// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AlertRuleResourcesCreateOrUpdateOptionalParams,
  AlertRuleResourcesDeleteOptionalParams,
  AlertRuleResourcesGetOptionalParams,
  AlertRuleResourcesListByParentOptionalParams,
  DatabaseWatcherContext as Client,
} from "../index.js";
import {
  errorResponseDeserializer,
  AlertRuleResource,
  alertRuleResourceSerializer,
  alertRuleResourceDeserializer,
  _AlertRuleResourceListResult,
  _alertRuleResourceListResultDeserializer,
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

export function _alertRuleResourcesListByParentSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: AlertRuleResourcesListByParentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/alertRuleResources",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _alertRuleResourcesListByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertRuleResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _alertRuleResourceListResultDeserializer(result.body);
}

/** List AlertRuleResource resources by Watcher */
export function alertRuleResourcesListByParent(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: AlertRuleResourcesListByParentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AlertRuleResource> {
  return buildPagedAsyncIterator(
    context,
    () => _alertRuleResourcesListByParentSend(context, resourceGroupName, watcherName, options),
    _alertRuleResourcesListByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _alertRuleResourcesDeleteSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  alertRuleResourceName: string,
  options: AlertRuleResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/alertRuleResources/{alertRuleResourceName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
      alertRuleResourceName,
    )
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _alertRuleResourcesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a AlertRuleResource */
export async function alertRuleResourcesDelete(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  alertRuleResourceName: string,
  options: AlertRuleResourcesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _alertRuleResourcesDeleteSend(
    context,
    resourceGroupName,
    watcherName,
    alertRuleResourceName,
    options,
  );
  return _alertRuleResourcesDeleteDeserialize(result);
}

export function _alertRuleResourcesCreateOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  alertRuleResourceName: string,
  resource: AlertRuleResource,
  options: AlertRuleResourcesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/alertRuleResources/{alertRuleResourceName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
      alertRuleResourceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: alertRuleResourceSerializer(resource),
    });
}

export async function _alertRuleResourcesCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertRuleResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return alertRuleResourceDeserializer(result.body);
}

/** Create a AlertRuleResource */
export async function alertRuleResourcesCreateOrUpdate(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  alertRuleResourceName: string,
  resource: AlertRuleResource,
  options: AlertRuleResourcesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<AlertRuleResource> {
  const result = await _alertRuleResourcesCreateOrUpdateSend(
    context,
    resourceGroupName,
    watcherName,
    alertRuleResourceName,
    resource,
    options,
  );
  return _alertRuleResourcesCreateOrUpdateDeserialize(result);
}

export function _alertRuleResourcesGetSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  alertRuleResourceName: string,
  options: AlertRuleResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/alertRuleResources/{alertRuleResourceName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
      alertRuleResourceName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _alertRuleResourcesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<AlertRuleResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return alertRuleResourceDeserializer(result.body);
}

/** Get a AlertRuleResource */
export async function alertRuleResourcesGet(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  alertRuleResourceName: string,
  options: AlertRuleResourcesGetOptionalParams = { requestOptions: {} },
): Promise<AlertRuleResource> {
  const result = await _alertRuleResourcesGetSend(
    context,
    resourceGroupName,
    watcherName,
    alertRuleResourceName,
    options,
  );
  return _alertRuleResourcesGetDeserialize(result);
}
