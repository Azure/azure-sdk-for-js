// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  TagsResource,
  tagsResourceSerializer,
} from "../../models/applicationInsightsCommonTypes/models.js";
import {
  WebTest,
  webTestSerializer,
  webTestDeserializer,
  _WebTestListResult,
  _webTestListResultDeserializer,
} from "../../models/webTestsApi/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  WebTestsListByComponentOptionalParams,
  WebTestsListOptionalParams,
  WebTestsListByResourceGroupOptionalParams,
  WebTestsDeleteOptionalParams,
  WebTestsUpdateTagsOptionalParams,
  WebTestsCreateOrUpdateOptionalParams,
  WebTestsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByComponentSend(
  context: Client,
  componentName: string,
  resourceGroupName: string,
  options: WebTestsListByComponentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{componentName}/webtests{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      componentName: componentName,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2022-06-15",
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

export async function _listByComponentDeserialize(
  result: PathUncheckedResponse,
): Promise<_WebTestListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _webTestListResultDeserializer(result.body);
}

/** Get all Application Insights web tests defined for the specified component. */
export function listByComponent(
  context: Client,
  componentName: string,
  resourceGroupName: string,
  options: WebTestsListByComponentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WebTest> {
  return buildPagedAsyncIterator(
    context,
    () => _listByComponentSend(context, componentName, resourceGroupName, options),
    _listByComponentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-06-15" },
  );
}

export function _listSend(
  context: Client,
  options: WebTestsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Insights/webtests{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2022-06-15",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_WebTestListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _webTestListResultDeserializer(result.body);
}

/** Get all Application Insights web test definitions for the specified subscription. */
export function list(
  context: Client,
  options: WebTestsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WebTest> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-06-15" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: WebTestsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/webtests{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2022-06-15",
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
): Promise<_WebTestListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _webTestListResultDeserializer(result.body);
}

/** Get all Application Insights web tests defined for the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: WebTestsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WebTest> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-06-15" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  webTestName: string,
  options: WebTestsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/webtests/{webTestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      webTestName: webTestName,
      "api%2Dversion": "2022-06-15",
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
    throw createRestError(result);
  }

  return;
}

/** Deletes an Application Insights web test. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  webTestName: string,
  options: WebTestsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, webTestName, options);
  return _$deleteDeserialize(result);
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  webTestName: string,
  webTestTags: TagsResource,
  options: WebTestsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/webtests/{webTestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      webTestName: webTestName,
      "api%2Dversion": "2022-06-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsResourceSerializer(webTestTags),
  });
}

export async function _updateTagsDeserialize(result: PathUncheckedResponse): Promise<WebTest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return webTestDeserializer(result.body);
}

/** Updates the tags associated with an Application Insights web test. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  webTestName: string,
  webTestTags: TagsResource,
  options: WebTestsUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<WebTest> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    webTestName,
    webTestTags,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  webTestName: string,
  webTestDefinition: WebTest,
  options: WebTestsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/webtests/{webTestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      webTestName: webTestName,
      "api%2Dversion": "2022-06-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: webTestSerializer(webTestDefinition),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<WebTest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return webTestDeserializer(result.body);
}

/** Creates or updates an Application Insights web test definition. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  webTestName: string,
  webTestDefinition: WebTest,
  options: WebTestsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<WebTest> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    webTestName,
    webTestDefinition,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  webTestName: string,
  options: WebTestsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/webtests/{webTestName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      webTestName: webTestName,
      "api%2Dversion": "2022-06-15",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WebTest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return webTestDeserializer(result.body);
}

/** Get a specific Application Insights web test definition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  webTestName: string,
  options: WebTestsGetOptionalParams = { requestOptions: {} },
): Promise<WebTest> {
  const result = await _getSend(context, resourceGroupName, webTestName, options);
  return _getDeserialize(result);
}
