// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherContext as Client } from "../index.js";
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
import {
  AlertRuleResourcesListByParentOptionalParams,
  AlertRuleResourcesDeleteOptionalParams,
  AlertRuleResourcesCreateOrUpdateOptionalParams,
  AlertRuleResourcesGetOptionalParams,
} from "./options.js";

export function _listByParentSend(
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

export async function _listByParentDeserialize(
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
export function listByParent(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: AlertRuleResourcesListByParentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AlertRuleResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, watcherName, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
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

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a AlertRuleResource */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  alertRuleResourceName: string,
  options: AlertRuleResourcesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    watcherName,
    alertRuleResourceName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
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

export async function _createOrUpdateDeserialize(
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
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  alertRuleResourceName: string,
  resource: AlertRuleResource,
  options: AlertRuleResourcesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<AlertRuleResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    watcherName,
    alertRuleResourceName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AlertRuleResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return alertRuleResourceDeserializer(result.body);
}

/** Get a AlertRuleResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  alertRuleResourceName: string,
  options: AlertRuleResourcesGetOptionalParams = { requestOptions: {} },
): Promise<AlertRuleResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    watcherName,
    alertRuleResourceName,
    options,
  );
  return _getDeserialize(result);
}
