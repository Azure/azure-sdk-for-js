// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  _WorkItemConfigurationsListResult,
  _workItemConfigurationsListResultDeserializer,
  WorkItemConfiguration,
  workItemConfigurationDeserializer,
  workItemConfigurationErrorDeserializer,
  WorkItemCreateConfiguration,
  workItemCreateConfigurationSerializer,
} from "../../models/componentAPIs/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  WorkItemConfigurationsUpdateItemOptionalParams,
  WorkItemConfigurationsGetItemOptionalParams,
  WorkItemConfigurationsDeleteOptionalParams,
  WorkItemConfigurationsGetDefaultOptionalParams,
  WorkItemConfigurationsCreateOptionalParams,
  WorkItemConfigurationsListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _updateItemSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workItemConfigId: string,
  workItemConfigurationProperties: WorkItemCreateConfiguration,
  options: WorkItemConfigurationsUpdateItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/WorkItemConfigs/{workItemConfigId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      workItemConfigId: workItemConfigId,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workItemCreateConfigurationSerializer(workItemConfigurationProperties),
  });
}

export async function _updateItemDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkItemConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return workItemConfigurationDeserializer(result.body);
}

/** Update a work item configuration for an Application Insights component. */
export async function updateItem(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workItemConfigId: string,
  workItemConfigurationProperties: WorkItemCreateConfiguration,
  options: WorkItemConfigurationsUpdateItemOptionalParams = { requestOptions: {} },
): Promise<WorkItemConfiguration> {
  const result = await _updateItemSend(
    context,
    resourceGroupName,
    resourceName,
    workItemConfigId,
    workItemConfigurationProperties,
    options,
  );
  return _updateItemDeserialize(result);
}

export function _getItemSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workItemConfigId: string,
  options: WorkItemConfigurationsGetItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/WorkItemConfigs/{workItemConfigId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      workItemConfigId: workItemConfigId,
      "api%2Dversion": "2015-05-01",
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

export async function _getItemDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkItemConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return workItemConfigurationDeserializer(result.body);
}

/** Gets specified work item configuration for an Application Insights component. */
export async function getItem(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workItemConfigId: string,
  options: WorkItemConfigurationsGetItemOptionalParams = { requestOptions: {} },
): Promise<WorkItemConfiguration> {
  const result = await _getItemSend(
    context,
    resourceGroupName,
    resourceName,
    workItemConfigId,
    options,
  );
  return _getItemDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workItemConfigId: string,
  options: WorkItemConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/WorkItemConfigs/{workItemConfigId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      workItemConfigId: workItemConfigId,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a work item configuration of an Application Insights component. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workItemConfigId: string,
  options: WorkItemConfigurationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    resourceName,
    workItemConfigId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _getDefaultSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkItemConfigurationsGetDefaultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/DefaultWorkItemConfig{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2015-05-01",
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

export async function _getDefaultDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkItemConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return workItemConfigurationDeserializer(result.body);
}

/** Gets default work item configurations that exist for the application */
export async function getDefault(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkItemConfigurationsGetDefaultOptionalParams = { requestOptions: {} },
): Promise<WorkItemConfiguration> {
  const result = await _getDefaultSend(context, resourceGroupName, resourceName, options);
  return _getDefaultDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workItemConfigurationProperties: WorkItemCreateConfiguration,
  options: WorkItemConfigurationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/WorkItemConfigs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workItemCreateConfigurationSerializer(workItemConfigurationProperties),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkItemConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return workItemConfigurationDeserializer(result.body);
}

/** Create a work item configuration for an Application Insights component. */
export async function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workItemConfigurationProperties: WorkItemCreateConfiguration,
  options: WorkItemConfigurationsCreateOptionalParams = { requestOptions: {} },
): Promise<WorkItemConfiguration> {
  const result = await _createSend(
    context,
    resourceGroupName,
    resourceName,
    workItemConfigurationProperties,
    options,
  );
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkItemConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/WorkItemConfigs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2015-05-01",
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
): Promise<_WorkItemConfigurationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workItemConfigurationErrorDeserializer(result.body);

    throw error;
  }

  return _workItemConfigurationsListResultDeserializer(result.body);
}

/** Gets the list work item configurations that exist for the application */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkItemConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkItemConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2015-05-01" },
  );
}
