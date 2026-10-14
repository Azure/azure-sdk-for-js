// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext as Client } from "../index.js";
import type {
  ApiDefinition,
  _ApiDefinitionListResult,
  ApiSpecImportRequest,
  ApiSpecExportResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  apiDefinitionSerializer,
  apiDefinitionDeserializer,
  _apiDefinitionListResultDeserializer,
  apiSpecImportRequestSerializer,
  apiSpecExportResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApiDefinitionsExportSpecificationOptionalParams,
  ApiDefinitionsImportSpecificationOptionalParams,
  ApiDefinitionsListOptionalParams,
  ApiDefinitionsDeleteOptionalParams,
  ApiDefinitionsCreateOrUpdateOptionalParams,
  ApiDefinitionsHeadOptionalParams,
  ApiDefinitionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _exportSpecificationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  options: ApiDefinitionsExportSpecificationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions/{definitionName}/exportSpecification{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      versionName: versionName,
      definitionName: definitionName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
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

export async function _exportSpecificationDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiSpecExportResult> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return apiSpecExportResultDeserializer(result.body);
}

/** Exports the API specification. */
export function exportSpecification(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  options: ApiDefinitionsExportSpecificationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ApiSpecExportResult>, ApiSpecExportResult> {
  return getLongRunningPoller(context, _exportSpecificationDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _exportSpecificationSend(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-06-01-preview",
  }) as PollerLike<OperationState<ApiSpecExportResult>, ApiSpecExportResult>;
}

export function _importSpecificationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  body: ApiSpecImportRequest,
  options: ApiDefinitionsImportSpecificationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions/{definitionName}/importSpecification{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      versionName: versionName,
      definitionName: definitionName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: apiSpecImportRequestSerializer(body),
  });
}

export async function _importSpecificationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Imports the API specification. */
export function importSpecification(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  body: ApiSpecImportRequest,
  options: ApiDefinitionsImportSpecificationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _importSpecificationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _importSpecificationSend(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        definitionName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-06-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  options: ApiDefinitionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      versionName: versionName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
      "%24filter": options?.filter,
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
): Promise<_ApiDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _apiDefinitionListResultDeserializer(result.body);
}

/** Returns a collection of API definitions. */
export function list(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  options: ApiDefinitionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApiDefinition> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        resourceGroupName,
        serviceName,
        workspaceName,
        apiName,
        versionName,
        options,
      ),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2024-06-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  options: ApiDefinitionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions/{definitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      versionName: versionName,
      definitionName: definitionName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
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

/** Deletes specified API definition. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  options: ApiDefinitionsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    versionName,
    definitionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  payload: ApiDefinition,
  options: ApiDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions/{definitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      versionName: versionName,
      definitionName: definitionName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: apiDefinitionSerializer(payload),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiDefinition> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return apiDefinitionDeserializer(result.body);
}

/** Creates new or updates existing API definition. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  payload: ApiDefinition,
  options: ApiDefinitionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ApiDefinition> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    versionName,
    definitionName,
    payload,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _headSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  options: ApiDefinitionsHeadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions/{definitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      versionName: versionName,
      definitionName: definitionName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _headDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Checks if specified API definition exists. */
export async function head(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  options: ApiDefinitionsHeadOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _headSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    versionName,
    definitionName,
    options,
  );
  return _headDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  options: ApiDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}/versions/{versionName}/definitions/{definitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
      versionName: versionName,
      definitionName: definitionName,
      "api%2Dversion": context.apiVersion ?? "2024-06-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ApiDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return apiDefinitionDeserializer(result.body);
}

/** Returns details of the API definition. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  versionName: string,
  definitionName: string,
  options: ApiDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<ApiDefinition> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    versionName,
    definitionName,
    options,
  );
  return _getDeserialize(result);
}
