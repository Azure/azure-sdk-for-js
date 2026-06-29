// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext as Client } from "../index.js";
import type { Api, _ApiListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  apiSerializer,
  apiDeserializer,
  _apiListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApisListOptionalParams,
  ApisDeleteOptionalParams,
  ApisCreateOrUpdateOptionalParams,
  ApisHeadOptionalParams,
  ApisGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  options: ApisListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ApiListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _apiListResultDeserializer(result.body);
}

/** Returns a collection of APIs. */
export function list(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  options: ApisListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Api> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, serviceName, workspaceName, options),
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
  options: ApisDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
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

/** Deletes specified API. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  options: ApisDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
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
  payload: Api,
  options: ApisCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
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
    body: apiSerializer(payload),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Api> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return apiDeserializer(result.body);
}

/** Creates new or updates existing API. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  payload: Api,
  options: ApisCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Api> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
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
  options: ApisHeadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
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

/** Checks if specified API exists. */
export async function head(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  options: ApisHeadOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _headSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
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
  options: ApisGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiCenter/services/{serviceName}/workspaces/{workspaceName}/apis/{apiName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceName: workspaceName,
      apiName: apiName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Api> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return apiDeserializer(result.body);
}

/** Returns details of the API. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceName: string,
  apiName: string,
  options: ApisGetOptionalParams = { requestOptions: {} },
): Promise<Api> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    options,
  );
  return _getDeserialize(result);
}
