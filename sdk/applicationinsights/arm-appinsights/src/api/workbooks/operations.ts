// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import { CategoryType } from "../../models/applicationInsightsCommonTypes/models.js";
import {
  Workbook,
  workbookSerializer,
  workbookDeserializer,
  workbookErrorDeserializer,
  workbookUpdateParametersSerializer,
  _WorkbooksListResult,
  _workbooksListResultDeserializer,
} from "../../models/workbooksApi/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  WorkbooksListByResourceGroupOptionalParams,
  WorkbooksRevisionGetOptionalParams,
  WorkbooksListRevisionsListOptionalParams,
  WorkbooksListBySubscriptionOptionalParams,
  WorkbooksDeleteOptionalParams,
  WorkbooksUpdateOptionalParams,
  WorkbooksCreateOrUpdateOptionalParams,
  WorkbooksGetOptionalParams,
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
  category: CategoryType,
  options: WorkbooksListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooks{?api%2Dversion,category,tags,sourceId,canFetchContent}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2023-06-01",
      category: category,
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
      sourceId: options?.sourceId,
      canFetchContent: options?.canFetchContent,
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
): Promise<_WorkbooksListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workbookErrorDeserializer(result.body);

    throw error;
  }

  return _workbooksListResultDeserializer(result.body);
}

/** Get all Workbooks defined within a specified resource group and category. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  category: CategoryType,
  options: WorkbooksListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Workbook> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, category, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-06-01" },
  );
}

export function _revisionGetSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  revisionId: string,
  options: WorkbooksRevisionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooks/{resourceName}/revisions/{revisionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      revisionId: revisionId,
      "api%2Dversion": "2023-06-01",
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

export async function _revisionGetDeserialize(result: PathUncheckedResponse): Promise<Workbook> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workbookErrorDeserializer(result.body);

    throw error;
  }

  return workbookDeserializer(result.body);
}

/** Get a single workbook revision defined by its revisionId. */
export async function revisionGet(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  revisionId: string,
  options: WorkbooksRevisionGetOptionalParams = { requestOptions: {} },
): Promise<Workbook> {
  const result = await _revisionGetSend(
    context,
    resourceGroupName,
    resourceName,
    revisionId,
    options,
  );
  return _revisionGetDeserialize(result);
}

export function _listRevisionsListSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbooksListRevisionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooks/{resourceName}/revisions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2023-06-01",
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

export async function _listRevisionsListDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkbooksListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workbookErrorDeserializer(result.body);

    throw error;
  }

  return _workbooksListResultDeserializer(result.body);
}

/** Get the revisions for the workbook defined by its resourceName. */
export function listRevisionsList(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbooksListRevisionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Workbook> {
  return buildPagedAsyncIterator(
    context,
    () => _listRevisionsListSend(context, resourceGroupName, resourceName, options),
    _listRevisionsListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-06-01" },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  category: CategoryType,
  options: WorkbooksListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/workbooks{?api%2Dversion,category,tags,canFetchContent}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2023-06-01",
      category: category,
      tags: !options?.tags
        ? options?.tags
        : options?.tags.map((p: any) => {
            return p;
          }),
      canFetchContent: options?.canFetchContent,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkbooksListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workbookErrorDeserializer(result.body);

    throw error;
  }

  return _workbooksListResultDeserializer(result.body);
}

/** Get all Workbooks defined within a specified subscription and category. */
export function listBySubscription(
  context: Client,
  category: CategoryType,
  options: WorkbooksListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Workbook> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, category, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbooksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooks/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2023-06-01",
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
    error.details = workbookErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a workbook. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbooksDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, resourceName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbooksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooks/{resourceName}{?api%2Dversion,sourceId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2023-06-01",
      sourceId: options?.sourceId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.workbookUpdateParameters
      ? options?.workbookUpdateParameters
      : workbookUpdateParametersSerializer(options?.workbookUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Workbook> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workbookErrorDeserializer(result.body);

    throw error;
  }

  return workbookDeserializer(result.body);
}

/** Updates a workbook that has already been added. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbooksUpdateOptionalParams = { requestOptions: {} },
): Promise<Workbook> {
  const result = await _updateSend(context, resourceGroupName, resourceName, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workbookProperties: Workbook,
  options: WorkbooksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooks/{resourceName}{?api%2Dversion,sourceId}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2023-06-01",
      sourceId: options?.sourceId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workbookSerializer(workbookProperties),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Workbook> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workbookErrorDeserializer(result.body);

    throw error;
  }

  return workbookDeserializer(result.body);
}

/** Create a new workbook. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  workbookProperties: Workbook,
  options: WorkbooksCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Workbook> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    resourceName,
    workbookProperties,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbooksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooks/{resourceName}{?api%2Dversion,canFetchContent}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2023-06-01",
      canFetchContent: options?.canFetchContent,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Workbook> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = workbookErrorDeserializer(result.body);

    throw error;
  }

  return workbookDeserializer(result.body);
}

/** Get a single workbook by its resourceName. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: WorkbooksGetOptionalParams = { requestOptions: {} },
): Promise<Workbook> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
