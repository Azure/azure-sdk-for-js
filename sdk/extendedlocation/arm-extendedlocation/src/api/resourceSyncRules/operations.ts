// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CustomLocationsManagementContext as Client } from "../index.js";
import type { ResourceSyncRule, _ResourceSyncRuleListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  resourceSyncRulePropertiesSelectorSerializer,
  resourceSyncRuleSerializer,
  resourceSyncRuleDeserializer,
  _resourceSyncRuleListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ResourceSyncRulesListByCustomLocationIDOptionalParams,
  ResourceSyncRulesDeleteOptionalParams,
  ResourceSyncRulesCreateOrUpdateOptionalParams,
  ResourceSyncRulesGetOptionalParams,
  ResourceSyncRulesUpdateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByCustomLocationIDSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ResourceSyncRulesListByCustomLocationIDOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations/{resourceName}/resourceSyncRules{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
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

export async function _listByCustomLocationIDDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceSyncRuleListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _resourceSyncRuleListResultDeserializer(result.body);
}

/** Gets a list of Resource Sync Rules in the specified subscription. The operation returns properties of each Resource Sync Rule */
export function listByCustomLocationID(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ResourceSyncRulesListByCustomLocationIDOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceSyncRule> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCustomLocationIDSend(context, resourceGroupName, resourceName, options),
    _listByCustomLocationIDDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2021-08-31-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  childResourceName: string,
  options: ResourceSyncRulesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations/{resourceName}/resourceSyncRules/{childResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      childResourceName: childResourceName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the Resource Sync Rule with the specified Resource Sync Rule Name, Custom Location Resource Name, Resource Group, and Subscription Id. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  childResourceName: string,
  options: ResourceSyncRulesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    resourceName,
    childResourceName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  childResourceName: string,
  parameters: ResourceSyncRule,
  options: ResourceSyncRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations/{resourceName}/resourceSyncRules/{childResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      childResourceName: childResourceName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceSyncRuleSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceSyncRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceSyncRuleDeserializer(result.body);
}

/** Creates or updates a Resource Sync Rule in the parent Custom Location, Subscription Id and Resource Group */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  childResourceName: string,
  parameters: ResourceSyncRule,
  options: ResourceSyncRulesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ResourceSyncRule>, ResourceSyncRule> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        resourceName,
        childResourceName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2021-08-31-preview",
  }) as PollerLike<OperationState<ResourceSyncRule>, ResourceSyncRule>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  childResourceName: string,
  options: ResourceSyncRulesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations/{resourceName}/resourceSyncRules/{childResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      childResourceName: childResourceName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ResourceSyncRule> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceSyncRuleDeserializer(result.body);
}

/** Gets the details of the resourceSyncRule with a specified resource group, subscription id Custom Location resource name and Resource Sync Rule name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  childResourceName: string,
  options: ResourceSyncRulesGetOptionalParams = { requestOptions: {} },
): Promise<ResourceSyncRule> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    childResourceName,
    options,
  );
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  childResourceName: string,
  options: ResourceSyncRulesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ExtendedLocation/customLocations/{resourceName}/resourceSyncRules/{childResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      childResourceName: childResourceName,
      "api%2Dversion": context.apiVersion ?? "2021-08-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      priority: options?.priority,
      selector: !options?.selector
        ? options?.selector
        : resourceSyncRulePropertiesSelectorSerializer(options?.selector),
      targetResourceGroup: options?.targetResourceGroup,
      tags: options?.tags,
    },
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ResourceSyncRule> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceSyncRuleDeserializer(result.body);
}

export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  childResourceName: string,
  options: ResourceSyncRulesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ResourceSyncRule>, ResourceSyncRule> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, resourceName, childResourceName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2021-08-31-preview",
  }) as PollerLike<OperationState<ResourceSyncRule>, ResourceSyncRule>;
}
