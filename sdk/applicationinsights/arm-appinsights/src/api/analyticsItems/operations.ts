// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  ApplicationInsightsComponentAnalyticsItem,
  applicationInsightsComponentAnalyticsItemSerializer,
  applicationInsightsComponentAnalyticsItemDeserializer,
  ItemScopePath,
  applicationInsightsComponentAnalyticsItemArrayDeserializer,
} from "../../models/analyticsItems/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AnalyticsItemsDeleteOptionalParams,
  AnalyticsItemsPutOptionalParams,
  AnalyticsItemsGetOptionalParams,
  AnalyticsItemsListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  scopePath: ItemScopePath,
  options: AnalyticsItemsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.insights/components/{resourceName}/{scopePath}/item{?api%2Dversion,id,name}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      scopePath: scopePath,
      "api%2Dversion": "2015-05-01",
      id: options?.id,
      name: options?.name,
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

/** Deletes a specific Analytics Items defined within an Application Insights component. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  scopePath: ItemScopePath,
  options: AnalyticsItemsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, resourceName, scopePath, options);
  return _$deleteDeserialize(result);
}

export function _putSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  scopePath: ItemScopePath,
  itemProperties: ApplicationInsightsComponentAnalyticsItem,
  options: AnalyticsItemsPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.insights/components/{resourceName}/{scopePath}/item{?api%2Dversion,overrideItem}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      scopePath: scopePath,
      "api%2Dversion": "2015-05-01",
      overrideItem: options?.overrideItem,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: applicationInsightsComponentAnalyticsItemSerializer(itemProperties),
  });
}

export async function _putDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentAnalyticsItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentAnalyticsItemDeserializer(result.body);
}

/** Adds or Updates a specific Analytics Item within an Application Insights component. */
export async function put(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  scopePath: ItemScopePath,
  itemProperties: ApplicationInsightsComponentAnalyticsItem,
  options: AnalyticsItemsPutOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentAnalyticsItem> {
  const result = await _putSend(
    context,
    resourceGroupName,
    resourceName,
    scopePath,
    itemProperties,
    options,
  );
  return _putDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  scopePath: ItemScopePath,
  options: AnalyticsItemsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.insights/components/{resourceName}/{scopePath}/item{?api%2Dversion,id,name}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      scopePath: scopePath,
      "api%2Dversion": "2015-05-01",
      id: options?.id,
      name: options?.name,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentAnalyticsItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentAnalyticsItemDeserializer(result.body);
}

/** Gets a specific Analytics Items defined within an Application Insights component. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  scopePath: ItemScopePath,
  options: AnalyticsItemsGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentAnalyticsItem> {
  const result = await _getSend(context, resourceGroupName, resourceName, scopePath, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  scopePath: ItemScopePath,
  options: AnalyticsItemsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.insights/components/{resourceName}/{scopePath}{?api%2Dversion,scope,type,includeContent}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      scopePath: scopePath,
      "api%2Dversion": "2015-05-01",
      scope: options?.scope,
      type: options?.type,
      includeContent: options?.includeContent,
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
): Promise<ApplicationInsightsComponentAnalyticsItem[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentAnalyticsItemArrayDeserializer(result.body);
}

/** Gets a list of Analytics Items defined within an Application Insights component. */
export async function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  scopePath: ItemScopePath,
  options: AnalyticsItemsListOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentAnalyticsItem[]> {
  const result = await _listSend(context, resourceGroupName, resourceName, scopePath, options);
  return _listDeserialize(result);
}
