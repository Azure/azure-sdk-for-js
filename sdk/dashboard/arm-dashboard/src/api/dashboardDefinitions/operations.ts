// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DashboardManagementContext as Client } from "../index.js";
import type { DashboardDefinition, _DashboardDefinitionListResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  dashboardDefinitionSerializer,
  dashboardDefinitionDeserializer,
  _dashboardDefinitionListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DashboardDefinitionsListOptionalParams,
  DashboardDefinitionsDeleteOptionalParams,
  DashboardDefinitionsCreateOptionalParams,
  DashboardDefinitionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  options: DashboardDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}/dashboardDefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dashboardName: dashboardName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
): Promise<_DashboardDefinitionListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _dashboardDefinitionListResponseDeserializer(result.body);
}

/** List all dashboard definitions under the specified dashboard. */
export function list(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  options: DashboardDefinitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DashboardDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, dashboardName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  definitionName: string,
  options: DashboardDefinitionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}/dashboardDefinitions/{definitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dashboardName: dashboardName,
      definitionName: definitionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

/** Delete a dashboard definition. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  definitionName: string,
  options: DashboardDefinitionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    dashboardName,
    definitionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  definitionName: string,
  requestBodyParameters: DashboardDefinition,
  options: DashboardDefinitionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}/dashboardDefinitions/{definitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dashboardName: dashboardName,
      definitionName: definitionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dashboardDefinitionSerializer(requestBodyParameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<DashboardDefinition> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return dashboardDefinitionDeserializer(result.body);
}

/** Create a dashboard definition to update dashboard resource. */
export async function create(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  definitionName: string,
  requestBodyParameters: DashboardDefinition,
  options: DashboardDefinitionsCreateOptionalParams = { requestOptions: {} },
): Promise<DashboardDefinition> {
  const result = await _createSend(
    context,
    resourceGroupName,
    dashboardName,
    definitionName,
    requestBodyParameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  definitionName: string,
  options: DashboardDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}/dashboardDefinitions/{definitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dashboardName: dashboardName,
      definitionName: definitionName,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DashboardDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return dashboardDefinitionDeserializer(result.body);
}

/** Get the properties of a specific dashboard definition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  definitionName: string,
  options: DashboardDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<DashboardDefinition> {
  const result = await _getSend(context, resourceGroupName, dashboardName, definitionName, options);
  return _getDeserialize(result);
}
