// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  _ApplicationInsightsComponentAPIKeyListResult,
  _applicationInsightsComponentAPIKeyListResultDeserializer,
  ApplicationInsightsComponentAPIKey,
  applicationInsightsComponentAPIKeyDeserializer,
  APIKeyRequest,
  apiKeyRequestSerializer,
} from "../../models/componentAPIs/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  APIKeysGetOptionalParams,
  APIKeysDeleteOptionalParams,
  APIKeysCreateOptionalParams,
  APIKeysListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  keyId: string,
  options: APIKeysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/APIKeys/{keyId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      keyId: keyId,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentAPIKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentAPIKeyDeserializer(result.body);
}

/** Get the API Key for this key id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  keyId: string,
  options: APIKeysGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentAPIKey> {
  const result = await _getSend(context, resourceGroupName, resourceName, keyId, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  keyId: string,
  options: APIKeysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/APIKeys/{keyId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      keyId: keyId,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentAPIKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentAPIKeyDeserializer(result.body);
}

/** Delete an API Key of an Application Insights component. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  keyId: string,
  options: APIKeysDeleteOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentAPIKey> {
  const result = await _$deleteSend(context, resourceGroupName, resourceName, keyId, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  apiKeyProperties: APIKeyRequest,
  options: APIKeysCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/ApiKeys{?api%2Dversion}",
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
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: apiKeyRequestSerializer(apiKeyProperties),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentAPIKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentAPIKeyDeserializer(result.body);
}

/** Create an API Key of an Application Insights component. */
export async function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  apiKeyProperties: APIKeyRequest,
  options: APIKeysCreateOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentAPIKey> {
  const result = await _createSend(
    context,
    resourceGroupName,
    resourceName,
    apiKeyProperties,
    options,
  );
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: APIKeysListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/ApiKeys{?api%2Dversion}",
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApplicationInsightsComponentAPIKeyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _applicationInsightsComponentAPIKeyListResultDeserializer(result.body);
}

/** Gets a list of API keys of an Application Insights component. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: APIKeysListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApplicationInsightsComponentAPIKey> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2015-05-01" },
  );
}
