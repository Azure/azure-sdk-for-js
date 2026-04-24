// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type {
  ApiCollectionsAPIApiCollection,
  _ApiCollectionsAPIApiCollectionList,
} from "../../models/apiCollectionsAPI/models.js";
import {
  apiCollectionsAPIApiCollectionDeserializer,
  _apiCollectionsAPIApiCollectionListDeserializer,
} from "../../models/apiCollectionsAPI/models.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  APICollectionsListByResourceGroupOptionalParams,
  APICollectionsListBySubscriptionOptionalParams,
  APICollectionsListByAzureApiManagementServiceOptionalParams,
  APICollectionsOffboardAzureApiManagementApiOptionalParams,
  APICollectionsOnboardAzureApiManagementApiOptionalParams,
  APICollectionsGetByAzureApiManagementServiceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: APICollectionsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/apiCollections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2023-11-15",
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
): Promise<_ApiCollectionsAPIApiCollectionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _apiCollectionsAPIApiCollectionListDeserializer(result.body);
}

/** Gets a list of API collections within a resource group that have been onboarded to Microsoft Defender for APIs. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: APICollectionsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApiCollectionsAPIApiCollection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-11-15" },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: APICollectionsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/apiCollections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2023-11-15",
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
): Promise<_ApiCollectionsAPIApiCollectionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _apiCollectionsAPIApiCollectionListDeserializer(result.body);
}

/** Gets a list of API collections within a subscription that have been onboarded to Microsoft Defender for APIs. */
export function listBySubscription(
  context: Client,
  options: APICollectionsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApiCollectionsAPIApiCollection> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-11-15" },
  );
}

export function _listByAzureApiManagementServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: APICollectionsListByAzureApiManagementServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/providers/Microsoft.Security/apiCollections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": "2023-11-15",
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

export async function _listByAzureApiManagementServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ApiCollectionsAPIApiCollectionList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _apiCollectionsAPIApiCollectionListDeserializer(result.body);
}

/** Gets a list of Azure API Management APIs that have been onboarded to Microsoft Defender for APIs. If an Azure API Management API is onboarded to Microsoft Defender for APIs, the system will monitor the operations within the Azure API Management API for intrusive behaviors and provide alerts for attacks that have been detected. */
export function listByAzureApiManagementService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: APICollectionsListByAzureApiManagementServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApiCollectionsAPIApiCollection> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAzureApiManagementServiceSend(context, resourceGroupName, serviceName, options),
    _listByAzureApiManagementServiceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-11-15" },
  );
}

export function _offboardAzureApiManagementApiSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: APICollectionsOffboardAzureApiManagementApiOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/providers/Microsoft.Security/apiCollections/{apiId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      "api%2Dversion": "2023-11-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _offboardAzureApiManagementApiDeserialize(
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

/** Offboard an Azure API Management API from Microsoft Defender for APIs. The system will stop monitoring the operations within the Azure API Management API for intrusive behaviors. */
export async function offboardAzureApiManagementApi(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: APICollectionsOffboardAzureApiManagementApiOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _offboardAzureApiManagementApiSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    options,
  );
  return _offboardAzureApiManagementApiDeserialize(result);
}

export function _onboardAzureApiManagementApiSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: APICollectionsOnboardAzureApiManagementApiOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/providers/Microsoft.Security/apiCollections/{apiId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      "api%2Dversion": "2023-11-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _onboardAzureApiManagementApiDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiCollectionsAPIApiCollection> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiCollectionsAPIApiCollectionDeserializer(result.body);
}

/** Onboard an Azure API Management API to Microsoft Defender for APIs. The system will start monitoring the operations within the Azure Management API for intrusive behaviors and provide alerts for attacks that have been detected. */
export function onboardAzureApiManagementApi(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: APICollectionsOnboardAzureApiManagementApiOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApiCollectionsAPIApiCollection>, ApiCollectionsAPIApiCollection> {
  return getLongRunningPoller(
    context,
    _onboardAzureApiManagementApiDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _onboardAzureApiManagementApiSend(context, resourceGroupName, serviceName, apiId, options),
      resourceLocationConfig: "location",
      apiVersion: "2023-11-15",
    },
  ) as PollerLike<OperationState<ApiCollectionsAPIApiCollection>, ApiCollectionsAPIApiCollection>;
}

export function _getByAzureApiManagementServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: APICollectionsGetByAzureApiManagementServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/providers/Microsoft.Security/apiCollections/{apiId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      "api%2Dversion": "2023-11-15",
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

export async function _getByAzureApiManagementServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiCollectionsAPIApiCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiCollectionsAPIApiCollectionDeserializer(result.body);
}

/** Gets an Azure API Management API if it has been onboarded to Microsoft Defender for APIs. If an Azure API Management API is onboarded to Microsoft Defender for APIs, the system will monitor the operations within the Azure API Management API for intrusive behaviors and provide alerts for attacks that have been detected. */
export async function getByAzureApiManagementService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: APICollectionsGetByAzureApiManagementServiceOptionalParams = { requestOptions: {} },
): Promise<ApiCollectionsAPIApiCollection> {
  const result = await _getByAzureApiManagementServiceSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    options,
  );
  return _getByAzureApiManagementServiceDeserialize(result);
}
