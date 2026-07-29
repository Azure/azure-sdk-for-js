// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  EndpointModels,
  EndpointModelProperties,
  EndpointResourcePropertiesBasicResource,
  _EndpointResourcePropertiesBasicResourceArmPaginatedResult,
  EndpointKeys,
  AccountApiKeys,
  RegenerateServiceAccountKeyContent,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  endpointModelsDeserializer,
  endpointResourcePropertiesBasicResourceSerializer,
  endpointResourcePropertiesBasicResourceDeserializer,
  _endpointResourcePropertiesBasicResourceArmPaginatedResultDeserializer,
  endpointKeysDeserializer,
  accountApiKeysDeserializer,
  regenerateServiceAccountKeyContentSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EndpointRegenerateKeysOptionalParams,
  EndpointGetModelsOptionalParams,
  EndpointListKeysOptionalParams,
  EndpointListOptionalParams,
  EndpointCreateOrUpdateOptionalParams,
  EndpointGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _regenerateKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  body: RegenerateServiceAccountKeyContent,
  options: EndpointRegenerateKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/endpoints/{endpointName}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: regenerateServiceAccountKeyContentSerializer(body),
  });
}

export async function _regenerateKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<AccountApiKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return accountApiKeysDeserializer(result.body);
}

/** Regenerate account keys */
export async function regenerateKeys(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  body: RegenerateServiceAccountKeyContent,
  options: EndpointRegenerateKeysOptionalParams = { requestOptions: {} },
): Promise<AccountApiKeys> {
  const result = await _regenerateKeysSend(
    context,
    resourceGroupName,
    workspaceName,
    endpointName,
    body,
    options,
  );
  return _regenerateKeysDeserialize(result);
}

export function _getModelsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: EndpointGetModelsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/endpoints/{endpointName}/models{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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

export async function _getModelsDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointModels> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointModelsDeserializer(result.body);
}

/** Get available models under the endpoint resource. */
export function getModels(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: EndpointGetModelsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EndpointModelProperties> {
  return buildPagedAsyncIterator(
    context,
    () => _getModelsSend(context, resourceGroupName, workspaceName, endpointName, options),
    _getModelsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: EndpointListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/endpoints/{endpointName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listKeysDeserialize(result: PathUncheckedResponse): Promise<EndpointKeys> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointKeysDeserializer(result.body);
}

/** List keys for the endpoint resource. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: EndpointListKeysOptionalParams = { requestOptions: {} },
): Promise<EndpointKeys> {
  const result = await _listKeysSend(
    context,
    resourceGroupName,
    workspaceName,
    endpointName,
    options,
  );
  return _listKeysDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: EndpointListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/endpoints{?api%2Dversion,endpointType,includeOnlineEndpoints,includeServerlessEndpoints,includeConnections,%24skip,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      endpointType: options?.endpointType,
      includeOnlineEndpoints: options?.includeOnlineEndpoints ?? false,
      includeServerlessEndpoints: options?.includeServerlessEndpoints ?? false,
      includeConnections: options?.includeConnections ?? false,
      "%24skip": options?.skip,
      "%24expand": options?.expand,
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
): Promise<_EndpointResourcePropertiesBasicResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _endpointResourcePropertiesBasicResourceArmPaginatedResultDeserializer(result.body);
}

/** List All the endpoints under this workspace */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: EndpointListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EndpointResourcePropertiesBasicResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  body: EndpointResourcePropertiesBasicResource,
  options: EndpointCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: endpointResourcePropertiesBasicResourceSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EndpointResourcePropertiesBasicResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointResourcePropertiesBasicResourceDeserializer(result.body);
}

/** Create or update endpoint resource with the specified parameters */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  body: EndpointResourcePropertiesBasicResource,
  options: EndpointCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<EndpointResourcePropertiesBasicResource>,
  EndpointResourcePropertiesBasicResource
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, workspaceName, endpointName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<
    OperationState<EndpointResourcePropertiesBasicResource>,
    EndpointResourcePropertiesBasicResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: EndpointGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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
): Promise<EndpointResourcePropertiesBasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return endpointResourcePropertiesBasicResourceDeserializer(result.body);
}

/** Gets endpoint resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: EndpointGetOptionalParams = { requestOptions: {} },
): Promise<EndpointResourcePropertiesBasicResource> {
  const result = await _getSend(context, resourceGroupName, workspaceName, endpointName, options);
  return _getDeserialize(result);
}
