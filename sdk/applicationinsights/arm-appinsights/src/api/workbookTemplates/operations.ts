// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  WorkbookTemplate,
  workbookTemplateSerializer,
  workbookTemplateDeserializer,
  workbookTemplateErrorDeserializer,
  workbookTemplateUpdateParametersSerializer,
  _WorkbookTemplatesListResult,
  _workbookTemplatesListResultDeserializer,
} from "../../models/workbookTemplatesApi/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  WorkbookTemplatesListByResourceGroupOptionalParams,
  WorkbookTemplatesDeleteOptionalParams,
  WorkbookTemplatesUpdateOptionalParams,
  WorkbookTemplatesCreateOrUpdateOptionalParams,
  WorkbookTemplatesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: WorkbookTemplatesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooktemplates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2020-11-20",
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
): Promise<_WorkbookTemplatesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workbookTemplateErrorDeserializer(result.body);

    throw error;
  }

  return _workbookTemplatesListResultDeserializer(result.body);
}

/** Get all Workbook templates defined within a specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: WorkbookTemplatesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkbookTemplate> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2020-11-20" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbookTemplatesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooktemplates/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2020-11-20",
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
    error.details = workbookTemplateErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a workbook template. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbookTemplatesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, resourceName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbookTemplatesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooktemplates/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2020-11-20",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.workbookTemplateUpdateParameters
      ? options?.workbookTemplateUpdateParameters
      : workbookTemplateUpdateParametersSerializer(options?.workbookTemplateUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<WorkbookTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workbookTemplateErrorDeserializer(result.body);

    throw error;
  }

  return workbookTemplateDeserializer(result.body);
}

/** Updates a workbook template that has already been added. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbookTemplatesUpdateOptionalParams = { requestOptions: {} },
): Promise<WorkbookTemplate> {
  const result = await _updateSend(context, resourceGroupName, resourceName, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workbookTemplateProperties: WorkbookTemplate,
  options: WorkbookTemplatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooktemplates/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2020-11-20",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workbookTemplateSerializer(workbookTemplateProperties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkbookTemplate> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workbookTemplateErrorDeserializer(result.body);

    throw error;
  }

  return workbookTemplateDeserializer(result.body);
}

/** Create a new workbook template. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workbookTemplateProperties: WorkbookTemplate,
  options: WorkbookTemplatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<WorkbookTemplate> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    resourceName,
    workbookTemplateProperties,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbookTemplatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooktemplates/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2020-11-20",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkbookTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workbookTemplateErrorDeserializer(result.body);

    throw error;
  }

  return workbookTemplateDeserializer(result.body);
}

/** Get a single workbook template by its resourceName. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbookTemplatesGetOptionalParams = { requestOptions: {} },
): Promise<WorkbookTemplate> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
